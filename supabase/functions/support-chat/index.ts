import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

const SYSTEM_PROMPT = `You are the official Pagram AI (PGRM) Support Assistant.

About Pagram AI:
- PGRM is a decentralized AI livestreaming and compute marketplace protocol.
- Users can run nodes to contribute GPU/CPU compute and earn rewards.
- The platform supports EVM and Solana wallet authentication.
- Key pages on the website: Home (/), Documentation (/docs), Run a Node (/run-node), Node Dashboard (/node-dashboard), Connect Wallet (/connect-wallet).
- Node operators install a Python agent (see /docs and the Node Agent README) which reports stats to the dashboard.
- Official Telegram: https://t.me/Pagramai_official

Your job:
1. Answer visitor questions about PGRM, running nodes, wallets, staking tiers, earnings, and the dashboard.
2. Help users troubleshoot common issues (agent not connecting, wallet not registering, dashboard empty, etc.).
3. When you don't know something specific, recommend checking /docs or the Telegram channel.
4. Be concise, friendly, and use markdown formatting (lists, code blocks for commands).
5. If a user wants to formally report a bug, ask for: wallet address (optional), what they were doing, what went wrong, and any error messages — then summarize it back so they can share it with the team via Telegram.

Never make up technical details you aren't sure about. Keep responses short unless detail is requested.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "messages must be an array" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit reached. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please contact the team." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("support-chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
