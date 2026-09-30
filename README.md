# Pallas landing page

Next.js marketing site for Pallas, organized as a Bun workspace.

## Run locally

```bash
bun install
bun run dev
```

The site runs at [http://localhost:3000](http://localhost:3000).

## AI support chat

The floating Pallas support chat uses DeepSeek on the server. Set `DEEPSEEK_API_KEY` in `apps/web/.env.local` for local development and in the Vercel project's environment variables for deployment. The key is only read by the server route and is never exposed to browser code.

Chat history stays in the visitor's current browser session and is not stored in a database. For shared rate limits across Vercel instances, also set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`. Without these, the chat uses a per-instance fallback limit.

## Workspace layout

- `apps/web` — Next.js site and App Router routes
- `packages/ui` — shared UI components
- `packages/shared` — shared utilities
