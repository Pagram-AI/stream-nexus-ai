
-- Table for node performance snapshots
CREATE TABLE public.node_performance (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_address TEXT NOT NULL,
  gpu_usage NUMERIC NOT NULL DEFAULT 0,
  cpu_usage NUMERIC NOT NULL DEFAULT 0,
  memory_usage NUMERIC NOT NULL DEFAULT 0,
  gpu_temp NUMERIC NOT NULL DEFAULT 0,
  disk_used_gb NUMERIC NOT NULL DEFAULT 0,
  disk_total_gb NUMERIC NOT NULL DEFAULT 500,
  is_online BOOLEAN NOT NULL DEFAULT true,
  recorded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table for node earnings
CREATE TABLE public.node_earnings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_address TEXT NOT NULL,
  amount NUMERIC NOT NULL DEFAULT 0,
  task_count INTEGER NOT NULL DEFAULT 0,
  earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table for node tasks
CREATE TABLE public.node_tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_address TEXT NOT NULL,
  task_type TEXT NOT NULL,
  task_ref TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'completed',
  description TEXT,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table for node staking info
CREATE TABLE public.node_staking (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_address TEXT NOT NULL UNIQUE,
  staked_amount NUMERIC NOT NULL DEFAULT 0,
  tier TEXT NOT NULL DEFAULT 'Basic',
  apy NUMERIC NOT NULL DEFAULT 0,
  next_tier_threshold NUMERIC NOT NULL DEFAULT 50000,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.node_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.node_earnings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.node_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.node_staking ENABLE ROW LEVEL SECURITY;

-- Performance: read own data, insert own data
CREATE POLICY "Users can read own performance" ON public.node_performance FOR SELECT USING (true);
CREATE POLICY "Users can insert performance" ON public.node_performance FOR INSERT WITH CHECK (true);

-- Earnings: read own data, insert own data
CREATE POLICY "Users can read own earnings" ON public.node_earnings FOR SELECT USING (true);
CREATE POLICY "Users can insert earnings" ON public.node_earnings FOR INSERT WITH CHECK (true);

-- Tasks: read own data, insert own data
CREATE POLICY "Users can read own tasks" ON public.node_tasks FOR SELECT USING (true);
CREATE POLICY "Users can insert tasks" ON public.node_tasks FOR INSERT WITH CHECK (true);

-- Staking: read own data, insert/update own data
CREATE POLICY "Users can read own staking" ON public.node_staking FOR SELECT USING (true);
CREATE POLICY "Users can insert staking" ON public.node_staking FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update staking" ON public.node_staking FOR UPDATE USING (true);

-- Indexes for wallet lookups
CREATE INDEX idx_node_performance_wallet ON public.node_performance(wallet_address, recorded_at DESC);
CREATE INDEX idx_node_earnings_wallet ON public.node_earnings(wallet_address, earned_at DESC);
CREATE INDEX idx_node_tasks_wallet ON public.node_tasks(wallet_address, completed_at DESC);
