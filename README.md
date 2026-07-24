# Ilya-NextLevel

Next.js App Router foundation prepared for Figma-driven development.

## Stack

- Node.js runtime
- Next.js App Router
- Figma MCP as design source of truth
- Deployment target: GitHub -> Vercel

## Run

1. Install dependencies:
   `npm install`
2. Start dev server:
   `npm run dev`

## Structure

- `app/` - App Router entrypoints and screen routes
- `components/` - reusable UI and layout blocks
- `lib/figma/` - Figma file/node mapping and token helpers
- `lib/screens/` - route registry and logic-screen lookup
- `data/figma/tokens.json` - token source data (to be filled from Figma)
- `tokens/` - CSS variables consumed by UI

## Figma sync

1. Put raw token data in `data/figma/tokens.json`.
2. Run `npm run tokens:sync` to regenerate `tokens/figma.css`.
3. Keep `.env.local` aligned with `.env.example` for file and node IDs.
