import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export type ContactRateLimitKind = "generate-email" | "send-email";

type LimitResult = { allowed: boolean; retryAfterSeconds?: number };
type LocalLimit = { count: number; resetAt: number };

const limits: Record<
  ContactRateLimitKind,
  { requests: number; windowMs: number; window: "10 m" | "1 d" }
> = {
  "generate-email": { requests: 5, windowMs: 10 * 60 * 1000, window: "10 m" },
  "send-email": { requests: 3, windowMs: 24 * 60 * 60 * 1000, window: "1 d" },
};

const localLimits = new Map<string, LocalLimit>();
const upstashLimiters: Partial<Record<ContactRateLimitKind, Ratelimit>> = {};
let redisUnavailableNoticeLogged = false;

function getClientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function checkLocalLimit(
  request: Request,
  kind: ContactRateLimitKind,
): LimitResult {
  const now = Date.now();
  const config = limits[kind];
  const key = `${kind}:${getClientIp(request)}`;
  const existing = localLimits.get(key);

  if (!existing || now >= existing.resetAt) {
    localLimits.set(key, { count: 1, resetAt: now + config.windowMs });
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

  if (existing.count >= config.requests) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  return { allowed: true };
}

function getUpstashLimiter(kind: ContactRateLimitKind): Ratelimit | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token || !/^https?:\/\//.test(url)) return null;

  if (!upstashLimiters[kind]) {
    const config = limits[kind];
    upstashLimiters[kind] = new Ratelimit({
      redis: new Redis({ url, token }),
      limiter: Ratelimit.slidingWindow(config.requests, config.window),
      analytics: false,
      prefix: `pallas:contact:${kind}`,
    });
  }

  return upstashLimiters[kind] ?? null;
}

export async function checkContactRateLimit(
  request: Request,
  kind: ContactRateLimitKind,
): Promise<LimitResult> {
  const limiter = getUpstashLimiter(kind);
  if (!limiter) return checkLocalLimit(request, kind);

  try {
    const result = await limiter.limit(getClientIp(request));
    return {
      allowed: result.success,
      retryAfterSeconds: Math.max(1, Math.ceil((result.reset - Date.now()) / 1000)),
    };
  } catch (error) {
    if (!redisUnavailableNoticeLogged) {
      redisUnavailableNoticeLogged = true;
      console.warn(
        "[api/contact] Redis rate limiting is unavailable; using a per-instance limit.",
        error,
      );
    }
    return checkLocalLimit(request, kind);
  }
}
