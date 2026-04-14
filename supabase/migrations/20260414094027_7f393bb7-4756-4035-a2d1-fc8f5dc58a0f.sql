
CREATE TABLE public.node_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_address TEXT NOT NULL UNIQUE,
  wallet_type TEXT NOT NULL CHECK (wallet_type IN ('evm', 'solana')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.node_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can register a wallet"
ON public.node_registrations
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can check if a wallet is registered"
ON public.node_registrations
FOR SELECT
USING (true);
