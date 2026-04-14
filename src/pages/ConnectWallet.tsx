import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Wallet,
  Shield,
  CheckCircle2,
  AlertTriangle,
  BarChart3,
} from "lucide-react";
import logo from "@/assets/logo.png";
import { supabase } from "@/integrations/supabase/client";

const fadeIn = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const ConnectWallet = () => {
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState("");
  const [walletType, setWalletType] = useState<"evm" | "solana">("evm");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleConnect = async () => {
    if (!walletAddress.trim()) {
      setStatus("error");
      setErrorMessage("Please enter your wallet address.");
      return;
    }

    const trimmed = walletAddress.trim().toLowerCase();

    // Basic validation
    const isEvm = /^0x[a-fA-F0-9]{40}$/.test(walletAddress.trim());
    const isSolana = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(walletAddress.trim());

    if (walletType === "evm" && !isEvm) {
      setStatus("error");
      setErrorMessage("Invalid EVM wallet address.");
      return;
    }
    if (walletType === "solana" && !isSolana) {
      setStatus("error");
      setErrorMessage("Invalid Solana wallet address.");
      return;
    }

    setStatus("loading");

    try {
      const { data, error } = await supabase
        .from("node_registrations")
        .select("id")
        .eq("wallet_address", trimmed)
        .maybeSingle();

      if (error) {
        setStatus("error");
        setErrorMessage("Failed to verify wallet. Please try again.");
        return;
      }

      if (!data) {
        setStatus("error");
        setErrorMessage(
          "This wallet is not registered in the node program. Please register on the Run a Node page first."
        );
        return;
      }

      // Wallet is registered — store in session and navigate
      sessionStorage.setItem("pgrm_wallet", trimmed);
      navigate("/node-dashboard");
    } catch {
      setStatus("error");
      setErrorMessage("An unexpected error occurred.");
    }
  };

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
              Connect Wallet
            </span>
          </div>
          <Link
            to="/run-node"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={14} /> Back to Run a Node
          </Link>
        </div>
      </header>

      <main className="pt-24 pb-16 px-4 flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <motion.div className="w-full max-w-md" {...fadeIn}>
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Wallet size={32} className="text-accent" />
            </div>
            <h1 className="text-2xl md:text-3xl font-heading font-bold mb-2">
              Connect Your <span className="gradient-text">Wallet</span>
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your registered wallet address to access the Node Dashboard.
            </p>
          </div>

          <div className="glass-card neon-border p-8 space-y-6">
            {/* Wallet type selector */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Wallet Type</label>
              <div className="flex gap-3">
                {(["evm", "solana"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setWalletType(type);
                      setStatus("idle");
                    }}
                    className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      walletType === type
                        ? "bg-primary text-primary-foreground"
                        : "glass-card text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {type === "evm" ? "EVM (MetaMask)" : "Solana (Phantom)"}
                  </button>
                ))}
              </div>
            </div>

            {/* Wallet address input */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Wallet Address</label>
              <input
                type="text"
                value={walletAddress}
                onChange={(e) => {
                  setWalletAddress(e.target.value);
                  setStatus("idle");
                }}
                placeholder={walletType === "evm" ? "0x..." : "Enter Solana address..."}
                className="w-full px-4 py-3 rounded-xl bg-secondary/60 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm font-mono"
                onKeyDown={(e) => e.key === "Enter" && handleConnect()}
              />
            </div>

            {/* Error message */}
            {status === "error" && (
              <div className="flex items-start gap-2 text-sm text-destructive">
                <AlertTriangle size={16} className="mt-0.5 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Connect button */}
            <button
              onClick={handleConnect}
              disabled={status === "loading"}
              className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {status === "loading" ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <BarChart3 size={16} />
                  Access Dashboard
                </>
              )}
            </button>

            {/* Register link */}
            <div className="text-center pt-2 border-t border-border/30">
              <p className="text-xs text-muted-foreground">
                Don't have a registered wallet?{" "}
                <Link to="/run-node" className="text-accent hover:underline font-medium">
                  Register on the Run a Node page
                </Link>
              </p>
            </div>
          </div>

          {/* Security note */}
          <div className="flex items-center justify-center gap-2 mt-6 text-xs text-muted-foreground">
            <Shield size={14} className="text-accent" />
            <span>Your wallet address is only used for verification. No private keys required.</span>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default ConnectWallet;
