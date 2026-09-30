import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const WINDOW_MS = 5 * 60 * 1000;
const REQUESTS_PER_WINDOW = 10;

type LocalLimit = { count: number; resetAt: number };
type SupportRateLimitResult = { allowed: boolean; retryAfterSeconds?: number };

const localLimits = new Map<string, LocalLimit>();
let redisRateLimit: Ratelimit | null = null;
let redisUnavailableNoticeLogged = false;

function getClientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function hasRedisConfig(): boolean {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  return Boolean(url && token && /^https?:\/\//.test(url));
}

function getRedisRateLimit(): Ratelimit {
  if (redisRateLimit) return redisRateLimit;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    throw new Error("Upstash Redis is not configured");
  }

  redisRateLimit = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(REQUESTS_PER_WINDOW, "5 m"),
    analytics: false,
    prefix: "pallas:support-chat",
  });

  return redisRateLimit;
}

function checkLocalLimit(key: string): SupportRateLimitResult {
  const now = Date.now();
  const existing = localLimits.get(key);

  if (!existing || now >= existing.resetAt) {
    localLimits.set(key, { count: 1, resetAt: now + WINDOW_MS });

    if (localLimits.size > 2_000) {
      for (const [entryKey, entry] of localLimits) {
        if (now >= entry.resetAt) localLimits.delete(entryKey);
      }

      while (localLimits.size > 2_000) {
        const oldestKey = localLimits.keys().next().value;
        if (!oldestKey) break;
        localLimits.delete(oldestKey);
      }
    }

    return { allowed: true };
  }

  if (existing.count >= REQUESTS_PER_WINDOW) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  return { allowed: true };
}

export async function checkSupportRateLimit(
  request: Request,
): Promise<SupportRateLimitResult> {
  const key = getClientIp(request);

  if (!hasRedisConfig()) return checkLocalLimit(key);

  try {
    const result = await getRedisRateLimit().limit(key);
    return {
      allowed: result.success,
      retryAfterSeconds: Math.max(1, Math.ceil((result.reset - Date.now()) / 1000)),
    };
  } catch (error) {
    if (!redisUnavailableNoticeLogged) {
      redisUnavailableNoticeLogged = true;
      console.warn(
        "[api/ai/support] Redis rate limiting is unavailable; using a per-instance limit.",
        error,
      );
    }

    return checkLocalLimit(key);
  }
}
