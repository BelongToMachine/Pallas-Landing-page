import { createOpenAI } from "@ai-sdk/openai";

export const PALLAS_MODEL_ID = "deepseek-flash";

/** Shared model configuration for the support chat and email-draft agent. */
export function getPallasModel() {
  const apiKey = process.env.DEEPSEEK_API_KEY?.trim();
  if (!apiKey) return null;

  const provider = createOpenAI({
    name: "deepseek",
    apiKey,
    baseURL: process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com",
    fetch: async (input: RequestInfo | URL, init?: RequestInit) => {
      if (!init?.body || typeof init.body !== "string") {
        return fetch(input, init);
      }

      try {
        const body = JSON.parse(init.body) as Record<string, unknown>;
        body.thinking = { type: "disabled" };
        delete body.reasoning_effort;

        const responseFormat = body.response_format;
        if (
          typeof responseFormat === "object" &&
          responseFormat !== null &&
          "type" in responseFormat &&
          responseFormat.type === "json_schema"
        ) {
          body.response_format = { type: "json_object" };
        }

        return fetch(input, { ...init, body: JSON.stringify(body) });
      } catch {
        return fetch(input, init);
      }
    },
  });

  return provider.chat(PALLAS_MODEL_ID);
}
