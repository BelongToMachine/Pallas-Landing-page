import { createOpenAI } from "@ai-sdk/openai";
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from "ai";
import { PALLAS_SUPPORT_INSTRUCTIONS } from "@/lib/ai/pallas-support";
import { checkSupportRateLimit } from "@/lib/ai/support-rate-limit";

export const maxDuration = 30;

const MAX_MESSAGES = 12;
const MAX_MESSAGE_CHARACTERS = 4_000;
const MAX_TOTAL_CHARACTERS = 16_000;
const MAX_REQUEST_BYTES = 200_000;

type TextMessage = UIMessage & {
  role: "user" | "assistant";
  parts: Array<{ type: "text"; text: string }>;
};

function invalidRequest(message: string, status = 400): Response {
  return Response.json({ error: message }, { status });
}

function sanitizeMessages(value: unknown): TextMessage[] | Response {
  if (!Array.isArray(value) || value.length === 0 || value.length > 24) {
    return invalidRequest("Invalid chat history.");
  }

  const sanitized: TextMessage[] = [];
  let totalCharacters = 0;

  for (const [index, candidate] of value.slice(-MAX_MESSAGES).entries()) {
    if (!candidate || typeof candidate !== "object") continue;

    const message = candidate as Record<string, unknown>;
    if (message.role !== "user" && message.role !== "assistant") continue;
    if (!Array.isArray(message.parts)) continue;

    const text = message.parts
      .filter(
        (part): part is { type: "text"; text: string } =>
          Boolean(part) &&
          typeof part === "object" &&
          (part as Record<string, unknown>).type === "text" &&
          typeof (part as Record<string, unknown>).text === "string",
      )
      .map((part) => part.text)
      .join("\n")
      .trim();

    if (!text) continue;
    if (text.length > MAX_MESSAGE_CHARACTERS) {
      return invalidRequest("A message is too long.", 413);
    }

    totalCharacters += text.length;

    sanitized.push({
      id: typeof message.id === "string" ? message.id : `message-${index}`,
      role: message.role,
      parts: [{ type: "text", text }],
    });
  }

  if (sanitized.length === 0 || sanitized.at(-1)?.role !== "user") {
    return invalidRequest("Send a text question to continue.");
  }

  while (totalCharacters > MAX_TOTAL_CHARACTERS && sanitized.length > 1) {
    const removed = sanitized.shift();
    totalCharacters -= removed?.parts[0]?.text.length ?? 0;
  }

  return sanitized;
}

function createDeepSeekFetch() {
  return async (input: RequestInfo | URL, init?: RequestInit) => {
    if (!init?.body || typeof init.body !== "string") {
      return fetch(input, init);
    }

    try {
      const body = JSON.parse(init.body) as Record<string, unknown>;
      body.thinking = { type: "disabled" };
      delete body.reasoning_effort;

      return fetch(input, { ...init, body: JSON.stringify(body) });
    } catch {
      return fetch(input, init);
    }
  };
}

export async function POST(request: Request) {
  const rateLimit = await checkSupportRateLimit(request);
  if (!rateLimit.allowed) {
    return Response.json(
      { error: "Too many questions. Please try again in a few minutes." },
      {
        status: 429,
        headers: rateLimit.retryAfterSeconds
          ? { "Retry-After": String(rateLimit.retryAfterSeconds) }
          : undefined,
      },
    );
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_REQUEST_BYTES) {
    return invalidRequest("The conversation is too large.", 413);
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return invalidRequest("Invalid JSON body.");
  }

  if (new TextEncoder().encode(rawBody).byteLength > MAX_REQUEST_BYTES) {
    return invalidRequest("The conversation is too large.", 413);
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return invalidRequest("Invalid JSON body.");
  }

  if (!body || typeof body !== "object") {
    return invalidRequest("Invalid chat request.");
  }

  const messages = sanitizeMessages((body as Record<string, unknown>).messages);
  if (messages instanceof Response) return messages;

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "Support chat is not configured." },
      { status: 503 },
    );
  }

  const deepseek = createOpenAI({
    name: "deepseek",
    apiKey,
    baseURL: process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com",
    fetch: createDeepSeekFetch(),
  });

  const result = streamText({
    model: deepseek.chat("deepseek-flash"),
    instructions: PALLAS_SUPPORT_INSTRUCTIONS,
    messages: await convertToModelMessages(messages),
    maxOutputTokens: 500,
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
