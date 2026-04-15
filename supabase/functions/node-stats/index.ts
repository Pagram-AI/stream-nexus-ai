import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const walletAddress = url.searchParams.get("wallet");
    const action = url.searchParams.get("action") || "get";

    if (!walletAddress) {
      return new Response(JSON.stringify({ error: "wallet parameter required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    if (req.method === "POST" && action === "report") {
      // Node agent reports stats
      const body = await req.json();
      const { gpu_usage, cpu_usage, memory_usage, gpu_temp, disk_used_gb, disk_total_gb, is_online } = body;

      const { error } = await supabase.from("node_performance").insert({
        wallet_address: walletAddress,
        gpu_usage: gpu_usage ?? 0,
        cpu_usage: cpu_usage ?? 0,
        memory_usage: memory_usage ?? 0,
        gpu_temp: gpu_temp ?? 0,
        disk_used_gb: disk_used_gb ?? 0,
        disk_total_gb: disk_total_gb ?? 500,
        is_online: is_online ?? true,
      });

      if (error) throw error;

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (req.method === "POST" && action === "report-task") {
      const body = await req.json();
      const { task_type, task_ref, status, description } = body;

      const { error } = await supabase.from("node_tasks").insert({
        wallet_address: walletAddress,
        task_type: task_type ?? "general",
        task_ref: task_ref ?? `TASK-${Date.now()}`,
        status: status ?? "completed",
        description: description ?? "",
      });

      if (error) throw error;

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (req.method === "POST" && action === "report-earnings") {
      const body = await req.json();
      const { amount, task_count } = body;

      const { error } = await supabase.from("node_earnings").insert({
        wallet_address: walletAddress,
        amount: amount ?? 0,
        task_count: task_count ?? 0,
      });

      if (error) throw error;

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // GET: Fetch all node data for dashboard
    const [perfResult, earningsResult, tasksResult, stakingResult] = await Promise.all([
      supabase
        .from("node_performance")
        .select("*")
        .eq("wallet_address", walletAddress)
        .order("recorded_at", { ascending: false })
        .limit(24),
      supabase
        .from("node_earnings")
        .select("*")
        .eq("wallet_address", walletAddress)
        .order("earned_at", { ascending: false })
        .limit(7),
      supabase
        .from("node_tasks")
        .select("*")
        .eq("wallet_address", walletAddress)
        .order("completed_at", { ascending: false })
        .limit(50),
      supabase
        .from("node_staking")
        .select("*")
        .eq("wallet_address", walletAddress)
        .single(),
    ]);

    const performance = (perfResult.data || []).reverse();
    const earnings = (earningsResult.data || []).reverse();
    const tasks = tasksResult.data || [];
    const staking = stakingResult.data || null;

    // Compute aggregates
    const totalEarned = earnings.reduce((sum, e) => sum + Number(e.amount), 0);
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.status === "completed").length;
    const failedTasks = tasks.filter((t) => t.status === "failed").length;

    const latestPerf = performance.length > 0 ? performance[performance.length - 1] : null;

    // Compute uptime from performance snapshots
    const onlineSnapshots = performance.filter((p) => p.is_online).length;
    const uptimePercent = performance.length > 0 ? ((onlineSnapshots / performance.length) * 100).toFixed(1) : "0.0";

    // Get registered node count for rank
    const { count: totalNodes } = await supabase
      .from("node_registrations")
      .select("*", { count: "exact", head: true });

    const response = {
      performance: performance.map((p) => ({
        time: new Date(p.recorded_at).toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit", hour12: false }),
        gpu: Number(p.gpu_usage),
        cpu: Number(p.cpu_usage),
        memory: Number(p.memory_usage),
      })),
      earnings: earnings.map((e) => ({
        day: new Date(e.earned_at).toLocaleDateString("en", { weekday: "short" }),
        earned: Number(e.amount),
        tasks: e.task_count,
      })),
      tasks: tasks.slice(0, 20).map((t) => ({
        time: new Date(t.completed_at).toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }),
        level: t.status === "failed" ? "error" : t.status === "warning" ? "warn" : "info",
        msg: `Task ${t.task_ref} ${t.status} — ${t.description || t.task_type}`,
        type: t.task_type,
        status: t.status,
      })),
      taskDistribution: computeTaskDistribution(tasks),
      stats: {
        totalEarned: totalEarned.toFixed(2),
        totalTasks,
        completedTasks,
        failedTasks,
        uptimePercent,
        gpuTemp: latestPerf ? Number(latestPerf.gpu_temp) : 0,
        gpuLoad: latestPerf ? Number(latestPerf.gpu_usage) : 0,
        cpuLoad: latestPerf ? Number(latestPerf.cpu_usage) : 0,
        memoryUsage: latestPerf ? Number(latestPerf.memory_usage) : 0,
        diskUsed: latestPerf ? Number(latestPerf.disk_used_gb) : 0,
        diskTotal: latestPerf ? Number(latestPerf.disk_total_gb) : 500,
        isOnline: latestPerf ? latestPerf.is_online : false,
        networkRank: 0, // Will be computed if we add ranking logic
        totalNodes: totalNodes || 0,
      },
      staking: staking
        ? {
            stakedAmount: Number(staking.staked_amount),
            tier: staking.tier,
            apy: Number(staking.apy),
            nextTierThreshold: Number(staking.next_tier_threshold),
          }
        : null,
    };

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("node-stats error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

function computeTaskDistribution(tasks: any[]) {
  // Group tasks by 2-hour blocks in the last 24 hours
  const now = new Date();
  const blocks: { time: string; completed: number; failed: number }[] = [];

  for (let i = 0; i < 12; i++) {
    const blockStart = new Date(now.getTime() - (11 - i) * 2 * 60 * 60 * 1000);
    const blockEnd = new Date(blockStart.getTime() + 2 * 60 * 60 * 1000);
    const label = `${blockStart.getHours().toString().padStart(2, "0")}:00`;

    const blockTasks = tasks.filter((t) => {
      const d = new Date(t.completed_at);
      return d >= blockStart && d < blockEnd;
    });

    blocks.push({
      time: label,
      completed: blockTasks.filter((t) => t.status === "completed").length,
      failed: blockTasks.filter((t) => t.status === "failed").length,
    });
  }

  return blocks;
}
