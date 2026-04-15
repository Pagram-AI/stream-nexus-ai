import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface NodeStats {
  totalEarned: string;
  totalTasks: number;
  completedTasks: number;
  failedTasks: number;
  uptimePercent: string;
  gpuTemp: number;
  gpuLoad: number;
  cpuLoad: number;
  memoryUsage: number;
  diskUsed: number;
  diskTotal: number;
  isOnline: boolean;
  networkRank: number;
  totalNodes: number;
}

export interface NodeStaking {
  stakedAmount: number;
  tier: string;
  apy: number;
  nextTierThreshold: number;
}

export interface PerfPoint {
  time: string;
  gpu: number;
  cpu: number;
  memory: number;
}

export interface EarningsPoint {
  day: string;
  earned: number;
  tasks: number;
}

export interface TaskDistPoint {
  time: string;
  completed: number;
  failed: number;
}

export interface LogEntry {
  time: string;
  level: string;
  msg: string;
  type: string;
  status: string;
}

export interface NodeDashboardData {
  performance: PerfPoint[];
  earnings: EarningsPoint[];
  tasks: LogEntry[];
  taskDistribution: TaskDistPoint[];
  stats: NodeStats;
  staking: NodeStaking | null;
}

const emptyData: NodeDashboardData = {
  performance: [],
  earnings: [],
  tasks: [],
  taskDistribution: [],
  stats: {
    totalEarned: "0.00",
    totalTasks: 0,
    completedTasks: 0,
    failedTasks: 0,
    uptimePercent: "0.0",
    gpuTemp: 0,
    gpuLoad: 0,
    cpuLoad: 0,
    memoryUsage: 0,
    diskUsed: 0,
    diskTotal: 0,
    isOnline: false,
    networkRank: 0,
    totalNodes: 0,
  },
  staking: null,
};

export function useNodeDashboardData(walletAddress: string | null) {
  const [data, setData] = useState<NodeDashboardData>(emptyData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!walletAddress) return;

    try {
      setError(null);
      const { data: responseData, error: fnError } = await supabase.functions.invoke("node-stats", {
        method: "GET",
        body: undefined,
        headers: { "Content-Type": "application/json" },
      });

      // supabase.functions.invoke doesn't support query params, so we use fetch directly
      const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
      const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
      const url = `https://${projectId}.supabase.co/functions/v1/node-stats?wallet=${encodeURIComponent(walletAddress)}`;

      const response = await fetch(url, {
        headers: {
          "Authorization": `Bearer ${anonKey}`,
          "apikey": anonKey,
        },
      });

      if (!response.ok) {
        const errBody = await response.text();
        throw new Error(`API error ${response.status}: ${errBody}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err: any) {
      console.error("Failed to fetch node data:", err);
      setError(err.message || "Failed to fetch node data");
    } finally {
      setLoading(false);
    }
  }, [walletAddress]);

  useEffect(() => {
    fetchData();
    // Refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  return { data, loading, error, refresh: fetchData };
}
