import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Cpu,
  Activity,
  Zap,
  Coins,
  Thermometer,
  HardDrive,
  Wifi,
  WifiOff,
  Clock,
  TrendingUp,
  BarChart3,
  RefreshCw,
  Play,
  Pause,
  Settings,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import logo from "@/assets/logo.png";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Simulated data generators
const generatePerformanceData = () =>
  Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    gpu: Math.floor(55 + Math.random() * 35),
    cpu: Math.floor(30 + Math.random() * 40),
    memory: Math.floor(40 + Math.random() * 30),
  }));

const generateEarningsData = () =>
  Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - 6 + i);
    return {
      day: d.toLocaleDateString("en", { weekday: "short" }),
      earned: parseFloat((8 + Math.random() * 12).toFixed(2)),
      tasks: Math.floor(40 + Math.random() * 60),
    };
  });

const generateTaskHistory = () =>
  Array.from({ length: 12 }, (_, i) => ({
    time: `${(i * 2).toString().padStart(2, "0")}:00`,
    completed: Math.floor(3 + Math.random() * 8),
    failed: Math.floor(Math.random() * 2),
  }));

const fadeIn = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

const StatCard = ({
  icon: Icon,
  label,
  value,
  sub,
  trend,
  color = "accent",
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  sub?: string;
  trend?: "up" | "down" | "neutral";
  color?: string;
}) => (
  <motion.div className="glass-card hover-glow p-5" {...fadeIn}>
    <div className="flex items-start justify-between mb-3">
      <div className={`w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center`}>
        <Icon size={20} className="text-accent" />
      </div>
      {trend && (
        <span
          className={`text-xs font-medium flex items-center gap-1 ${
            trend === "up" ? "text-green-500" : trend === "down" ? "text-red-400" : "text-muted-foreground"
          }`}
        >
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
  const [nodeStatus, setNodeStatus] = useState<"online" | "paused" | "offline">("online");
  const [perfData, setPerfData] = useState(generatePerformanceData);
  const [earningsData] = useState(generateEarningsData);
  const [taskData] = useState(generateTaskHistory);
  const [gpuTemp, setGpuTemp] = useState(67);
  const [uptime, setUptime] = useState(0);
  const [expandedLog, setExpandedLog] = useState(false);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setGpuTemp(65 + Math.floor(Math.random() * 10));
      setUptime((prev) => prev + 1);
      setPerfData(generatePerformanceData());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const formatUptime = (seconds: number) => {
    const d = Math.floor(seconds / 86400);
    const h = Math.floor((seconds % 86400) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${d}d ${h}h ${m}m`;
  };

  const logs = [
    { time: "14:32:01", level: "info", msg: "Task SR-4821 completed — 4K upscale, 28 frames processed" },
    { time: "14:31:45", level: "info", msg: "New task assigned: super-resolution batch #4821" },
    { time: "14:30:12", level: "warn", msg: "GPU memory usage exceeded 85% — throttling queue" },
    { time: "14:28:55", level: "info", msg: "Task NR-1093 completed — noise reduction, 12s audio" },
    { time: "14:27:30", level: "info", msg: "Heartbeat acknowledged by orchestrator" },
    { time: "14:25:01", level: "info", msg: "Task MOD-772 completed — content moderation scan" },
    { time: "14:22:18", level: "error", msg: "Task TR-445 failed — translation model timeout, retrying" },
    { time: "14:20:00", level: "info", msg: "Epoch reward: 2.45 $PGRM credited to wallet" },
  ];

  const statusColor =
    nodeStatus === "online"
      ? "text-green-400"
      : nodeStatus === "paused"
      ? "text-yellow-400"
      : "text-red-400";

  const StatusIcon =
    nodeStatus === "online" ? CheckCircle2 : nodeStatus === "paused" ? AlertTriangle : XCircle;

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
              to="/docs"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={14} /> Back to Docs
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
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
              <span className="capitalize">{nodeStatus}</span>
            </div>
            <button
              onClick={() => setNodeStatus(nodeStatus === "online" ? "paused" : "online")}
              className="glass-card hover-glow px-4 py-2 text-sm font-medium flex items-center gap-2 transition-colors hover:text-foreground text-muted-foreground"
            >
              {nodeStatus === "online" ? <Pause size={14} /> : <Play size={14} />}
              {nodeStatus === "online" ? "Pause" : "Resume"}
            </button>
            <button className="glass-card hover-glow px-3 py-2 text-muted-foreground hover:text-foreground transition-colors">
              <Settings size={16} />
            </button>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Coins} label="Total Earned" value="847.32 $PGRM" sub="+12.4%" trend="up" />
          <StatCard icon={Zap} label="Tasks Completed" value="3,291" sub="+8.2%" trend="up" />
          <StatCard icon={Clock} label="Uptime" value={formatUptime(uptime + 432000)} sub="99.7%" trend="up" />
          <StatCard icon={Activity} label="Network Rank" value="#42" sub="of 127" trend="neutral" />
        </div>

        {/* GPU + System info row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          {/* GPU Performance chart */}
          <motion.div className="glass-card p-6 lg:col-span-2" {...fadeIn}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-semibold">GPU & CPU Utilization (24h)</h3>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <RefreshCw size={14} />
              </button>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={perfData}>
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
                <Tooltip
                  contentStyle={{
                    background: "hsl(260, 10%, 97%)",
                    border: "1px solid hsl(260, 10%, 88%)",
                    borderRadius: "0.75rem",
                    fontSize: "12px",
                  }}
                />
                <Area type="monotone" dataKey="gpu" stroke="hsl(250, 85%, 55%)" fill="url(#gpuGrad)" strokeWidth={2} name="GPU" />
                <Area type="monotone" dataKey="cpu" stroke="hsl(195, 100%, 40%)" fill="url(#cpuGrad)" strokeWidth={2} name="CPU" />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex items-center gap-6 mt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-2"><span className="w-3 h-1 rounded bg-primary inline-block" /> GPU</span>
              <span className="flex items-center gap-2"><span className="w-3 h-1 rounded bg-accent inline-block" /> CPU</span>
            </div>
          </motion.div>

          {/* System stats */}
          <motion.div className="glass-card p-6 space-y-5" {...fadeIn}>
            <h3 className="font-heading font-semibold">System Health</h3>
            {[
              { icon: Thermometer, label: "GPU Temp", value: `${gpuTemp}°C`, warn: gpuTemp > 75 },
              { icon: Cpu, label: "GPU Load", value: `${perfData[perfData.length - 1]?.gpu ?? 0}%` },
              { icon: HardDrive, label: "Disk Usage", value: "234 / 500 GB" },
              { icon: Activity, label: "Memory", value: `${perfData[perfData.length - 1]?.memory ?? 0}%` },
              {
                icon: nodeStatus === "online" ? Wifi : WifiOff,
                label: "Network",
                value: nodeStatus === "online" ? "Connected" : "Disconnected",
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
          {/* Weekly earnings */}
          <motion.div className="glass-card p-6" {...fadeIn}>
            <h3 className="font-heading font-semibold mb-4">Weekly Earnings</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(260, 10%, 88%)" strokeOpacity={0.4} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(260, 10%, 45%)" }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(260, 10%, 45%)" }} tickLine={false} axisLine={false} unit=" $PGRM" />
                <Tooltip
                  contentStyle={{
                    background: "hsl(260, 10%, 97%)",
                    border: "1px solid hsl(260, 10%, 88%)",
                    borderRadius: "0.75rem",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="earned" fill="hsl(250, 85%, 55%)" radius={[6, 6, 0, 0]} name="Earned" />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-between mt-4 text-sm">
              <span className="text-muted-foreground">This Week</span>
              <span className="font-heading font-bold text-foreground">
                {earningsData.reduce((a, b) => a + b.earned, 0).toFixed(2)} $PGRM
              </span>
            </div>
          </motion.div>

          {/* Task distribution */}
          <motion.div className="glass-card p-6" {...fadeIn}>
            <h3 className="font-heading font-semibold mb-4">Task Distribution (24h)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={taskData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(260, 10%, 88%)" strokeOpacity={0.4} />
                <XAxis dataKey="time" tick={{ fontSize: 11, fill: "hsl(260, 10%, 45%)" }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(260, 10%, 45%)" }} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(260, 10%, 97%)",
                    border: "1px solid hsl(260, 10%, 88%)",
                    borderRadius: "0.75rem",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="completed" fill="hsl(195, 100%, 40%)" radius={[6, 6, 0, 0]} name="Completed" stackId="a" />
                <Bar dataKey="failed" fill="hsl(0, 84%, 60%)" radius={[6, 6, 0, 0]} name="Failed" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex items-center gap-6 mt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-2"><span className="w-3 h-1 rounded bg-accent inline-block" /> Completed</span>
              <span className="flex items-center gap-2"><span className="w-3 h-1 rounded bg-destructive inline-block" /> Failed</span>
            </div>
          </motion.div>
        </div>

        {/* Staking info */}
        <motion.div className="glass-card neon-border p-6 mb-8" {...fadeIn}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-heading font-semibold text-lg mb-1">
                <span className="gradient-text">Staking Status</span>
              </h3>
              <p className="text-sm text-muted-foreground">
                You have <strong className="text-foreground">25,000 $PGRM</strong> staked · Tier:{" "}
                <strong className="text-foreground">Professional</strong>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="glass-card px-4 py-2 text-sm">
                <span className="text-muted-foreground">APY: </span>
                <span className="font-heading font-bold text-green-500">18.4%</span>
              </div>
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                Stake More
              </button>
            </div>
          </div>
          {/* Staking progress */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>25,000 / 50,000 $PGRM (Validator Tier)</span>
              <span>50%</span>
            </div>
            <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full" style={{ width: "50%" }} />
            </div>
          </div>
        </motion.div>

        {/* Activity log */}
        <motion.div className="glass-card p-6" {...fadeIn}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold">Activity Log</h3>
            <button
              onClick={() => setExpandedLog(!expandedLog)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              {expandedLog ? "Show Less" : "Show All"}
              {expandedLog ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>
          <div className="space-y-1 font-mono text-xs">
            {(expandedLog ? logs : logs.slice(0, 5)).map((log, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 px-3 py-2 rounded-lg ${
                  log.level === "error"
                    ? "bg-destructive/5"
                    : log.level === "warn"
                    ? "bg-yellow-500/5"
                    : "hover:bg-secondary/40"
                } transition-colors`}
              >
                <span className="text-muted-foreground shrink-0">{log.time}</span>
                <span
                  className={`shrink-0 uppercase font-semibold ${
                    log.level === "error"
                      ? "text-destructive"
                      : log.level === "warn"
                      ? "text-yellow-500"
                      : "text-accent"
                  }`}
                >
                  {log.level}
                </span>
                <span className="text-foreground/80">{log.msg}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default NodeDashboard;
