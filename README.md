# Pagram AI (PGRM)

Pagram AI is a decentralized AI livestreaming and compute marketplace protocol. Node operators contribute GPU/CPU compute and earn rewards for powering real-time AI workloads — 4K upscaling, noise reduction, live translation, and moderation.

## Tech Stack

- **Frontend:** React 18 + Vite + TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Animation:** Framer Motion
- **Backend:** Supabase (Postgres, Edge Functions, Auth)
- **Wallets:** EVM + Solana

## Getting Started

```bash
# Install dependencies
bun install

# Start the dev server
bun run dev

# Build for production
bun run build
```

The app runs on [http://localhost:8080](http://localhost:8080).

## Project Structure

```
src/
├── components/      # Reusable UI components and landing sections
├── pages/           # Route-level pages (Home, Docs, Run a Node, Dashboard, Connect Wallet)
├── hooks/           # Custom React hooks
├── integrations/    # Supabase client and generated types
└── lib/             # Utilities

supabase/
└── functions/       # Edge functions (node-stats, support-chat)

public/
└── pgrm_node_agent.py    # Python agent for node operators
```

## Node Agent

Operators can run the Python agent in `public/pgrm_node_agent.py` to report hardware metrics and tasks to the dashboard. See `public/NODE_AGENT_README.md` for setup instructions.

## Links

- Telegram: https://t.me/Pagramai_official
