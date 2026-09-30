import { Resend } from "resend";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { checkContactRateLimit } from "@/lib/ai/contact-rate-limit";
import { isSiteLocale, localeNames } from "@/lib/i18n";

export const dynamic = "force-dynamic";

const MAX_REQUEST_BYTES = 16_000;
const headerText = (max: number) =>
  z.string().trim().min(1).max(max).refine((value) => !/[\r\n]/.test(value));
const requestSchema = z.object({
  name: headerText(100),
  email: z.string().trim().email().max(200),
  company: z.string().trim().max(100).optional().default(""),
  inquiry: z.string().trim().min(1).max(2_000),
  intent: z.enum(["demo", "private-deployment", "other"]),
  subject: headerText(180),
  message: z.string().trim().min(20).max(5_000),
  locale: z.string().optional(),
  website: z.string().max(200).optional(),
});

async function readJson(request: Request): Promise<unknown | Response> {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_REQUEST_BYTES) {
    return Response.json({ error: "request_too_large" }, { status: 413 });
  }
  let body: string;
  try {
    body = await request.text();
  } catch {
    return Response.json({ error: "invalid_request" }, { status: 400 });
  }
  if (new TextEncoder().encode(body).byteLength > MAX_REQUEST_BYTES) {
    return Response.json({ error: "request_too_large" }, { status: 413 });
  }
  try {
    return JSON.parse(body) as unknown;
  } catch {
    return Response.json({ error: "invalid_request" }, { status: 400 });
  }
}

function getErrorDetails(error: unknown) {
  if (!error || typeof error !== "object") return { message: String(error) };
  const value = error as Record<string, unknown>;
  return {
    name: typeof value.name === "string" ? value.name : undefined,
    message: typeof value.message === "string" ? value.message : undefined,
    code: typeof value.code === "string" ? value.code : undefined,
    statusCode: typeof value.statusCode === "number" ? value.statusCode : undefined,
  };
}

export async function POST(request: Request) {
  const rawBody = await readJson(request);
  if (rawBody instanceof Response) return rawBody;

  const parsed = requestSchema.safeParse(rawBody);
  if (!parsed.success) {
    return Response.json(
      { error: "invalid_request", fields: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  // Quietly discard automated submissions caught by the hidden honeypot.
  if (parsed.data.website?.trim()) return Response.json({ success: true });

  const rateLimit = await checkContactRateLimit(request, "send-email");
  if (!rateLimit.allowed) {
    return Response.json(
      { error: "rate_limited" },
      {
        status: 429,
        headers: rateLimit.retryAfterSeconds
          ? { "Retry-After": String(rateLimit.retryAfterSeconds) }
          : undefined,
      },
    );
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const configuredFrom = process.env.CONTACT_FROM_EMAIL?.trim();
  const fromEmail =
    configuredFrom && z.string().email().safeParse(configuredFrom).success
      ? configuredFrom
      : process.env.NODE_ENV !== "production"
        ? "onboarding@resend.dev"
        : null;
  const configuredRecipient = process.env.CONTACT_RECIPIENT_EMAIL?.trim();
  const recipient = configuredRecipient || "jie.craft@outlook.com";
  const validRecipient = z.string().email().safeParse(recipient).success;

  if (!apiKey || !fromEmail || !validRecipient) {
    console.error("[api/contact/send] email service is not configured", {
      hasApiKey: Boolean(apiKey),
      hasFromEmail: Boolean(fromEmail),
      hasValidRecipient: validRecipient,
      environment: process.env.NODE_ENV,
    });
    return Response.json({ error: "email_not_configured" }, { status: 503 });
  }

  const requestId = randomUUID();
  const suppliedKey = request.headers.get("idempotency-key")?.trim();
  const idempotencyKey =
    suppliedKey && suppliedKey.length <= 256 && !/[\r\n]/.test(suppliedKey)
      ? suppliedKey
      : requestId;
  const locale = isSiteLocale(parsed.data.locale) ? parsed.data.locale : "en";
  const intentLabel = {
    demo: "Product demo",
    "private-deployment": "Enterprise private deployment",
    other: "General inquiry",
  }[parsed.data.intent];

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send(
      {
        from: `Pallas Website <${fromEmail}>`,
        to: [recipient],
        replyTo: parsed.data.email,
        subject: `[Pallas ${intentLabel}] ${parsed.data.subject}`,
        text: [
          `Name: ${parsed.data.name}`,
          `Email: ${parsed.data.email}`,
          parsed.data.company ? `Company: ${parsed.data.company}` : "",
          `Inquiry type: ${intentLabel}`,
          `Website language: ${localeNames[locale]}`,
          "",
          parsed.data.message,
          "",
          "Original inquiry:",
          parsed.data.inquiry,
        ]
          .filter(Boolean)
          .join("\n"),
      },
      { idempotencyKey },
    );

    if (error) {
      console.error("[api/contact/send] Resend rejected the message", {
        requestId,
        ...getErrorDetails(error),
      });
      return Response.json({ error: "send_failed", requestId }, { status: 502 });
    }

    return Response.json({ success: true, id: data?.id });
  } catch (error) {
    console.error("[api/contact/send] send failed", {
      requestId,
      ...getErrorDetails(error),
    });
    return Response.json({ error: "send_failed", requestId }, { status: 502 });
  }
}
