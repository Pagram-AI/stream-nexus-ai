import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft, Cpu, Activity, Zap, Coins, Thermometer, HardDrive,
  Wifi, WifiOff, Clock, TrendingUp, RefreshCw, Play, Pause, Settings,
  CheckCircle2, AlertTriangle, XCircle, ChevronDown, ChevronUp,
} from "lucide-react";
import logo from "@/assets/logo.png";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { useNodeDashboardData } from "@/hooks/useNodeDashboardData";

const fadeIn = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

const StatCard = ({
  icon: Icon, label, value, sub, trend,
}: {
  icon: React.ElementType; label: string; value: string; sub?: string;
  trend?: "up" | "down" | "neutral";
}) => (
  <motion.div className="glass-card hover-glow p-5" {...fadeIn}>
    <div className="flex items-start justify-between mb-3">
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon size={20} className="text-accent" />
      </div>
      {trend && (
        <span className={`text-xs font-medium flex items-center gap-1 ${
          trend === "up" ? "text-green-500" : trend === "down" ? "text-red-400" : "text-muted-foreground"
        }`}>
          {trend === "up" ? <TrendingUp size={12} /> : trend === "down" ? <ChevronDown size={12} /> : null}
          {sub}
        </span>
      )}
    </div>
    <p className="text-2xl font-heading font-bold">{value}</p>
    <p className="text-xs text-muted-foreground mt-1">{label}</p>
  </motion.div>
);

const NodeDashboard = () => {
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [expandedLog, setExpandedLog] = useState(false);

  useEffect(() => {
    const wallet = sessionStorage.getItem("pgrm_wallet");
    if (!wallet) {
      navigate("/connect-wallet", { replace: true });
    } else {
      setWalletAddress(wallet);
    }
  }, [navigate]);

  const { data, loading, error, refresh } = useNodeDashboardData(walletAddress);

  const stats = data.stats;
  const isOnline = stats.isOnline;

  const statusColor = isOnline ? "text-green-400" : "text-red-400";
  const StatusIcon = isOnline ? CheckCircle2 : XCircle;
  const statusLabel = isOnline ? "online" : "offline";

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="animate-spin mx-auto mb-4 text-accent" size={32} />
          <p className="text-muted-foreground">Loading node data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30 backdrop-blur-2xl">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="PGRM" className="h-[5.75rem]" />
            </Link>
            <span className="text-xs text-muted-foreground border-l border-border/50 pl-4 hidden sm:inline">
              Node Dashboard
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/run-node"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={14} /> To Nodes
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Error banner */}
        {error && (
          <div className="mb-4 p-4 glass-card border border-destructive/30 text-destructive text-sm rounded-xl">
            <AlertTriangle className="inline mr-2" size={14} />
            {error}
          </div>
        )}

        {/* Top controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-heading font-bold">
              Node <span className="gradient-text">Dashboard</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Monitor your node performance, earnings, and network status in real-time.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 glass-card px-4 py-2 text-sm font-medium ${statusColor}`}>
              <StatusIcon size={16} />
              <span className="capitalize">{statusLabel}</span>
            </div>
            <button
              onClick={refresh}
              className="glass-card hover-glow px-4 py-2 text-sm font-medium flex items-center gap-2 transition-colors hover:text-foreground text-muted-foreground"
            >
              <RefreshCw size={14} /> Refresh
            </button>
            <button className="glass-card hover-glow px-3 py-2 text-muted-foreground hover:text-foreground transition-colors">
              <Settings size={16} />
            </button>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={Coins}
            label="Total Earned"
            value={`${stats.totalEarned} $PGRM`}
            sub={stats.totalTasks > 0 ? `${stats.completedTasks} completed` : "No data yet"}
            trend={Number(stats.totalEarned) > 0 ? "up" : "neutral"}
          />
          <StatCard
            icon={Zap}
            label="Tasks Completed"
            value={stats.completedTasks.toLocaleString()}
            sub={stats.failedTasks > 0 ? `${stats.failedTasks} failed` : "0 failed"}
            trend={stats.completedTasks > 0 ? "up" : "neutral"}
          />
          <StatCard
            icon={Clock}
            label="Uptime"
            value={`${stats.uptimePercent}%`}
            sub={`${data.performance.length} snapshots`}
            trend={Number(stats.uptimePercent) > 95 ? "up" : Number(stats.uptimePercent) > 0 ? "neutral" : "down"}
          />
          <StatCard
            icon={Activity}
            label="Network Nodes"
            value={stats.totalNodes.toString()}
            sub="registered"
            trend="neutral"
          />
        </div>

        {/* GPU + System info row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          {/* GPU Performance chart */}
          <motion.div className="glass-card p-6 lg:col-span-2" {...fadeIn}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-semibold">GPU & CPU Utilization</h3>
              <button onClick={refresh} className="text-muted-foreground hover:text-foreground transition-colors">
                <RefreshCw size={14} />
              </button>
            </div>
            {data.performance.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={data.performance}>
                  <defs>
                    <linearGradient id="gpuGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(250, 85%, 55%)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(250, 85%, 55%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="cpuGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(195, 100%, 40%)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(195, 100%, 40%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(260, 10%, 88%)" strokeOpacity={0.4} />
                  <XAxis dataKey="time" tick={{ fontSize: 11, fill: "hsl(260, 10%, 45%)" }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(260, 10%, 45%)" }} tickLine={false} axisLine={false} domain={[0, 100]} unit="%" />
                  <Tooltip contentStyle={{ background: "hsl(260, 10%, 97%)", border: "1px solid hsl(260, 10%, 88%)", borderRadius: "0.75rem", fontSize: "12px" }} />
                  <Area type="monotone" dataKey="gpu" stroke="hsl(250, 85%, 55%)" fill="url(#gpuGrad)" strokeWidth={2} name="GPU" />
                  <Area type="monotone" dataKey="cpu" stroke="hsl(195, 100%, 40%)" fill="url(#cpuGrad)" strokeWidth={2} name="CPU" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[220px] flex items-center justify-center text-muted-foreground text-sm">
                No performance data reported yet. Start your node to begin tracking.
              </div>
            )}
            <div className="flex items-center gap-6 mt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-2"><span className="w-3 h-1 rounded bg-primary inline-block" /> GPU</span>
              <span className="flex items-center gap-2"><span className="w-3 h-1 rounded bg-accent inline-block" /> CPU</span>
            </div>
          </motion.div>

          {/* System stats */}
          <motion.div className="glass-card p-6 space-y-5" {...fadeIn}>
            <h3 className="font-heading font-semibold">System Health</h3>
            {[
              { icon: Thermometer, label: "GPU Temp", value: stats.gpuTemp > 0 ? `${stats.gpuTemp}°C` : "—", warn: stats.gpuTemp > 75 },
              { icon: Cpu, label: "GPU Load", value: stats.gpuLoad > 0 ? `${stats.gpuLoad}%` : "—" },
              { icon: HardDrive, label: "Disk Usage", value: stats.diskTotal > 0 ? `${stats.diskUsed} / ${stats.diskTotal} GB` : "—" },
              { icon: Activity, label: "Memory", value: stats.memoryUsage > 0 ? `${stats.memoryUsage}%` : "—" },
              {
                icon: isOnline ? Wifi : WifiOff,
                label: "Network",
                value: data.performance.length > 0 ? (isOnline ? "Connected" : "Disconnected") : "No data",
              },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-sm">
                  <s.icon size={16} className={`${"warn" in s && s.warn ? "text-yellow-400" : "text-accent"}`} />
                  <span className="text-muted-foreground">{s.label}</span>
                </div>
                <span className={`text-sm font-medium ${"warn" in s && s.warn ? "text-yellow-400" : ""}`}>
                  {s.value}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Earnings + Tasks row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          <motion.div className="glass-card p-6" {...fadeIn}>
            <h3 className="font-heading font-semibold mb-4">Recent Earnings</h3>
            {data.earnings.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={data.earnings}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(260, 10%, 88%)" strokeOpacity={0.4} />
                    <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(260, 10%, 45%)" }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "hsl(260, 10%, 45%)" }} tickLine={false} axisLine={false} unit=" $PGRM" />
                    <Tooltip contentStyle={{ background: "hsl(260, 10%, 97%)", border: "1px solid hsl(260, 10%, 88%)", borderRadius: "0.75rem", fontSize: "12px" }} />
                    <Bar dataKey="earned" fill="hsl(250, 85%, 55%)" radius={[6, 6, 0, 0]} name="Earned" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="flex items-center justify-between mt-4 text-sm">
                  <span className="text-muted-foreground">Recent Total</span>
                  <span className="font-heading font-bold text-foreground">
                    {data.earnings.reduce((a, b) => a + b.earned, 0).toFixed(2)} $PGRM
                  </span>
                </div>
              </>
            ) : (
              <div className="h-[200px] flex items-center justify-center text-muted-foreground text-sm">
                No earnings recorded yet.
              </div>
            )}
          </motion.div>

          <motion.div className="glass-card p-6" {...fadeIn}>
            <h3 className="font-heading font-semibold mb-4">Task Distribution (24h)</h3>
            {data.taskDistribution.some((t) => t.completed > 0 || t.failed > 0) ? (
              <>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={data.taskDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(260, 10%, 88%)" strokeOpacity={0.4} />
                    <XAxis dataKey="time" tick={{ fontSize: 11, fill: "hsl(260, 10%, 45%)" }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "hsl(260, 10%, 45%)" }} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ background: "hsl(260, 10%, 97%)", border: "1px solid hsl(260, 10%, 88%)", borderRadius: "0.75rem", fontSize: "12px" }} />
                    <Bar dataKey="completed" fill="hsl(195, 100%, 40%)" radius={[6, 6, 0, 0]} name="Completed" stackId="a" />
                    <Bar dataKey="failed" fill="hsl(0, 84%, 60%)" radius={[6, 6, 0, 0]} name="Failed" stackId="a" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="flex items-center gap-6 mt-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-2"><span className="w-3 h-1 rounded bg-accent inline-block" /> Completed</span>
                  <span className="flex items-center gap-2"><span className="w-3 h-1 rounded bg-destructive inline-block" /> Failed</span>
                </div>
              </>
            ) : (
              <div className="h-[200px] flex items-center justify-center text-muted-foreground text-sm">
                No tasks completed in the last 24 hours.
              </div>
            )}
          </motion.div>
        </div>

        {/* Staking info */}
        <motion.div className="glass-card neon-border p-6 mb-8" {...fadeIn}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-heading font-semibold text-lg mb-1">
                <span className="gradient-text">Staking Status</span>
              </h3>
              {data.staking ? (
                <p className="text-sm text-muted-foreground">
                  You have <strong className="text-foreground">{data.staking.stakedAmount.toLocaleString()} $PGRM</strong> staked · Tier:{" "}
                  <strong className="text-foreground">{data.staking.tier}</strong>
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">No staking data found. Stake $PGRM to earn rewards.</p>
              )}
            </div>
            <div className="flex items-center gap-3">
              {data.staking && (
                <div className="glass-card px-4 py-2 text-sm">
                  <span className="text-muted-foreground">APY: </span>
                  <span className="font-heading font-bold text-green-500">{data.staking.apy}%</span>
                </div>
              )}
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                Stake More
              </button>
            </div>
          </div>
          {data.staking && (
            <div className="mt-4">
              <div className="flex justify-between text-xs text-muted-foreground mb-2">
                <span>{data.staking.stakedAmount.toLocaleString()} / {data.staking.nextTierThreshold.toLocaleString()} $PGRM (Next Tier)</span>
                <span>{Math.min(100, Math.round((data.staking.stakedAmount / data.staking.nextTierThreshold) * 100))}%</span>
              </div>
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                  style={{ width: `${Math.min(100, (data.staking.stakedAmount / data.staking.nextTierThreshold) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </motion.div>

        {/* Activity log */}
        <motion.div className="glass-card p-6" {...fadeIn}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold">Activity Log</h3>
            {data.tasks.length > 5 && (
              <button
                onClick={() => setExpandedLog(!expandedLog)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                {expandedLog ? "Show Less" : "Show All"}
                {expandedLog ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            )}
          </div>
          {data.tasks.length > 0 ? (
            <div className="space-y-1 font-mono text-xs">
              {(expandedLog ? data.tasks : data.tasks.slice(0, 5)).map((log, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 px-3 py-2 rounded-lg ${
                    log.level === "error" ? "bg-destructive/5" : log.level === "warn" ? "bg-yellow-500/5" : "hover:bg-secondary/40"
                  } transition-colors`}
                >
                  <span className="text-muted-foreground shrink-0">{log.time}</span>
                  <span className={`shrink-0 uppercase font-semibold ${
                    log.level === "error" ? "text-destructive" : log.level === "warn" ? "text-yellow-500" : "text-accent"
                  }`}>
                    {log.level}
                  </span>
                  <span className="text-foreground/80">{log.msg}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No activity recorded yet. Start your node to see logs here.</p>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default NodeDashboard;
