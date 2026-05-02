import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Cpu,
  HardDrive,
  Wifi,
  Monitor,
  Server,
  ChevronRight,
  Shield,
  Coins,
  CheckCircle2,
  AlertTriangle,
  Terminal,
  Download,
  Settings,
  Play,
  BarChart3,
  Wrench,
  Zap,
} from "lucide-react";
import logo from "@/assets/logo.png";
import { supabase } from "@/integrations/supabase/client";

const sidebarSections = [
  { id: "overview", label: "Overview", icon: Cpu },
  { id: "requirements", label: "Requirements", icon: Server },
  { id: "installation", label: "Installation", icon: Download },
  { id: "python-agent", label: "Python Agent", icon: Terminal },
  { id: "configuration", label: "Configuration", icon: Settings },
  { id: "launching", label: "Launch Node", icon: Play },
  { id: "staking", label: "Staking", icon: Coins },
  { id: "monitoring", label: "Monitoring", icon: BarChart3 },
  { id: "troubleshooting", label: "Troubleshooting", icon: Wrench },
  { id: "rewards", label: "Rewards & Earnings", icon: Zap },
];

const fadeIn = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const CodeBlock = ({ children, title }: { children: string; title?: string }) => (
  <div className="rounded-xl border border-border/60 overflow-hidden my-4">
    {title && (
      <div className="bg-secondary/80 px-4 py-2 text-xs font-mono text-muted-foreground border-b border-border/40">
        {title}
      </div>
    )}
    <pre className="bg-card/60 p-4 overflow-x-auto text-sm font-mono text-foreground/90 leading-relaxed">
      <code>{children}</code>
    </pre>
  </div>
);

const RunNode = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [walletType, setWalletType] = useState<"evm" | "solana">("evm");
  const [registrationStatus, setRegistrationStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [registrationMessage, setRegistrationMessage] = useState("");

  const handleRegister = async () => {
    if (!walletAddress.trim()) {
      setRegistrationStatus("error");
      setRegistrationMessage("Please enter a wallet address.");
      return;
    }

    // Basic validation
    const isEvm = /^0x[a-fA-F0-9]{40}$/.test(walletAddress.trim());
    const isSolana = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(walletAddress.trim());

    if (walletType === "evm" && !isEvm) {
      setRegistrationStatus("error");
      setRegistrationMessage("Invalid EVM wallet address. Must start with 0x followed by 40 hex characters.");
      return;
    }
    if (walletType === "solana" && !isSolana) {
      setRegistrationStatus("error");
      setRegistrationMessage("Invalid Solana wallet address.");
      return;
    }

    setRegistrationStatus("loading");
    try {
      const { error } = await supabase
        .from("node_registrations")
        .insert({ wallet_address: walletAddress.trim().toLowerCase(), wallet_type: walletType });

      if (error) {
        if (error.code === "23505") {
          setRegistrationStatus("error");
          setRegistrationMessage("This wallet is already registered! You can access your dashboard.");
        } else {
          setRegistrationStatus("error");
          setRegistrationMessage("Registration failed. Please try again.");
        }
      } else {
        setRegistrationStatus("success");
        setRegistrationMessage("Wallet registered successfully! You can now access your Node Dashboard.");
      }
    } catch {
      setRegistrationStatus("error");
      setRegistrationMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30 backdrop-blur-2xl">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="PGRM" className="h-[5.75rem]" />
            </Link>
            <span className="text-xs text-muted-foreground border-l border-border/50 pl-4 hidden sm:inline">
              Run a Node
            </span>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={14} /> Back to Home
          </Link>
        </div>
      </header>

      <div className="pt-20 flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0 border-r border-border/30 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto p-6">
          <nav className="space-y-1">
            {sidebarSections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors group"
              >
                <s.icon size={15} className="text-accent/70 group-hover:text-accent transition-colors" />
                {s.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 max-w-4xl mx-auto px-4 md:px-8 py-12 pb-24">
          {/* Overview */}
          <motion.section id="overview" className="mb-20" {...fadeIn}>
            <p className="text-sm text-accent font-medium mb-3 uppercase tracking-widest">Node Operator Guide</p>
            <h1 className="text-3xl md:text-5xl font-heading font-bold mb-6">
              Run a <span className="gradient-text">PGRM Node</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Become a vital part of the PGRM decentralized network by running a node. Node operators 
              contribute GPU computing power to enhance live video streams with AI in real-time and earn 
              $PGRM token rewards for every task processed.
            </p>
            <div className="glass-card p-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { label: "Avg. Monthly Earnings", value: "~2,500 $PGRM", icon: Coins },
                { label: "Network Uptime", value: "99.7%", icon: Zap },
                { label: "Active Operators", value: "100+", icon: Server },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <stat.icon size={18} className="text-accent" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-lg">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Requirements */}
          <motion.section id="requirements" className="mb-20" {...fadeIn}>
            <p className="text-sm text-accent font-medium mb-3 uppercase tracking-widest">Prerequisites</p>
            <h2 className="text-2xl md:text-4xl font-heading font-bold mb-6">System Requirements</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Ensure your machine meets these minimum specifications before setting up a PGRM node. 
              Higher specs will allow you to process more streams simultaneously and earn greater rewards.
            </p>

            <div className="space-y-4 mb-8">
              <h3 className="font-heading font-semibold text-lg">Minimum Requirements</h3>
              <div className="glass-card p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  {[
                    { icon: Cpu, label: "GPU", value: "NVIDIA RTX 3070 or equivalent (8GB+ VRAM)" },
                    { icon: Monitor, label: "CPU", value: "8-core x86_64 processor (Intel i7 / AMD Ryzen 7+)" },
                    { icon: HardDrive, label: "RAM", value: "32 GB DDR4 minimum" },
                    { icon: HardDrive, label: "Storage", value: "500 GB NVMe SSD" },
                    { icon: Wifi, label: "Network", value: "100 Mbps symmetric, static IP recommended" },
                    { icon: Server, label: "OS", value: "Ubuntu 22.04 LTS or Docker-compatible Linux" },
                  ].map((req) => (
                    <div key={req.label} className="flex items-start gap-3">
                      <req.icon size={16} className="text-accent mt-0.5 shrink-0" />
                      <div>
                        <span className="font-medium text-foreground">{req.label}:</span>{" "}
                        <span className="text-muted-foreground">{req.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-heading font-semibold text-lg">Recommended (High-Performance)</h3>
              <div className="glass-card neon-border p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  {[
                    { icon: Cpu, label: "GPU", value: "NVIDIA RTX 4090 / A100 (24GB+ VRAM)" },
                    { icon: Monitor, label: "CPU", value: "16-core (Intel i9 / AMD Ryzen 9 / Threadripper)" },
                    { icon: HardDrive, label: "RAM", value: "64 GB DDR5" },
                    { icon: HardDrive, label: "Storage", value: "1 TB NVMe SSD (Gen4)" },
                    { icon: Wifi, label: "Network", value: "1 Gbps symmetric, dedicated IP" },
                    { icon: Server, label: "OS", value: "Ubuntu 22.04 LTS with NVIDIA Container Toolkit" },
                  ].map((req) => (
                    <div key={req.label} className="flex items-start gap-3">
                      <req.icon size={16} className="text-accent mt-0.5 shrink-0" />
                      <div>
                        <span className="font-medium text-foreground">{req.label}:</span>{" "}
                        <span className="text-muted-foreground">{req.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass-card p-6 mt-6 border-l-4 border-l-accent">
              <div className="flex items-start gap-3">
                <AlertTriangle size={18} className="text-accent mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-heading font-semibold mb-1">Important Note</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    NVIDIA CUDA drivers must be installed and compatible with your GPU. AMD GPUs are not currently 
                    supported. Ensure your system has <strong className="text-foreground">Docker 24+</strong> and 
                    the <strong className="text-foreground">NVIDIA Container Toolkit</strong> installed.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Installation */}
          <motion.section id="installation" className="mb-20" {...fadeIn}>
            <p className="text-sm text-accent font-medium mb-3 uppercase tracking-widest">Setup</p>
            <h2 className="text-2xl md:text-4xl font-heading font-bold mb-6">Installation</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Follow these steps to install and set up your PGRM node from scratch.
            </p>

            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "Install Docker & NVIDIA Container Toolkit",
                  desc: "First, make sure Docker and the NVIDIA Container Toolkit are installed on your system.",
                  code: `# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add your user to the docker group
sudo usermod -aG docker $USER

# Install NVIDIA Container Toolkit
distribution=$(. /etc/os-release; echo $ID$VERSION_ID)
curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | \\
  sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg
curl -s -L https://nvidia.github.io/libnvidia-container/$distribution/libnvidia-container.list | \\
  sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | \\
  sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list

sudo apt-get update && sudo apt-get install -y nvidia-container-toolkit
sudo nvidia-ctk runtime configure --runtime=docker
sudo systemctl restart docker`,
                },
                {
                  step: "2",
                  title: "Verify GPU Access in Docker",
                  desc: "Confirm that Docker can access your NVIDIA GPU.",
                  code: `docker run --rm --gpus all nvidia/cuda:12.2.0-base-ubuntu22.04 nvidia-smi

# You should see your GPU listed with driver and CUDA version`,
                },
                {
                  step: "3",
                  title: "Install the PGRM CLI",
                  desc: "Download and install the PGRM command-line interface for node management.",
                  code: `# Download the latest PGRM CLI
curl -fsSL https://releases.pgrm.network/cli/install.sh | bash

# Verify installation
pgrm-cli --version

# Expected output: pgrm-cli v1.x.x`,
                },
                {
                  step: "4",
                  title: "Pull the PGRM Node Image",
                  desc: "Download the official PGRM node Docker image from the registry.",
                  code: `# Pull the latest stable node image
docker pull pgrm/node:latest

# Verify the image
docker images | grep pgrm`,
                },
              ].map((s) => (
                <div key={s.step} className="glass-card p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-sm font-bold text-primary">
                      {s.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-lg mb-1">{s.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{s.desc}</p>
                      <CodeBlock title="Terminal">{s.code}</CodeBlock>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Python Agent */}
          <motion.section id="python-agent" className="mb-20" {...fadeIn}>
            <p className="text-sm text-accent font-medium mb-3 uppercase tracking-widest">Lightweight Agent</p>
            <h2 className="text-2xl md:text-4xl font-heading font-bold mb-6">Python Node Agent</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Prefer a lightweight setup without Docker? Run the PGRM Python agent to report real hardware 
              metrics (CPU, memory, GPU, disk) directly to the network.
            </p>

            <div className="space-y-6">
              <div className="glass-card p-6">
                <h3 className="font-heading font-semibold text-lg mb-3">Requirements</h3>
                <p className="text-sm text-muted-foreground mb-3">Python 3.8+ and an NVIDIA GPU (optional but recommended).</p>
                <CodeBlock title="requirements.txt">
{`psutil>=5.9.0
GPUtil>=1.4.0`}
                </CodeBlock>
              </div>

              <div className="glass-card p-6">
                <h3 className="font-heading font-semibold text-lg mb-3">Quick Start</h3>
                <CodeBlock title="Terminal">
{`# Download the agent
curl -O https://pgrm.network/pgrm_node_agent.py
curl -O https://pgrm.network/requirements.txt

# Install dependencies
pip install -r requirements.txt

# Run the agent with your registered wallet
python pgrm_node_agent.py --wallet <YOUR_WALLET_ADDRESS>`}
                </CodeBlock>
              </div>

              <div className="glass-card p-6">
                <h3 className="font-heading font-semibold text-lg mb-3">Run as a Background Service</h3>
                <CodeBlock title="systemd (Linux)">
{`sudo tee /etc/systemd/system/pgrm-agent.service << 'EOF'
[Unit]
Description=PGRM Node Agent
After=network.target

[Service]
Type=simple
ExecStart=/usr/bin/python3 /opt/pgrm/pgrm_node_agent.py --wallet YOUR_WALLET
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl enable pgrm-agent
sudo systemctl start pgrm-agent`}
                </CodeBlock>
              </div>

              <div className="glass-card p-6">
                <h3 className="font-heading font-semibold text-lg mb-3">CLI Options</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  {[
                    { flag: "--wallet", desc: "Your registered wallet address (required)" },
                    { flag: "--interval", desc: "Report interval in seconds (default: 30)" },
                    { flag: "--simulate-tasks", desc: "Demo mode: also report synthetic tasks + earnings" },
                  ].map((opt) => (
                    <div key={opt.flag} className="flex items-start gap-3">
                      <code className="text-accent text-xs bg-secondary/60 px-2 py-0.5 rounded shrink-0">{opt.flag}</code>
                      <span className="text-muted-foreground">{opt.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <a
                  href="/pgrm_node_agent.py"
                  download
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  <Download size={16} /> Download Agent
                </a>
                <a
                  href="/requirements.txt"
                  download
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-secondary/60 transition-colors"
                >
                  <Download size={16} /> requirements.txt
                </a>
              </div>
            </div>
          </motion.section>

          {/* Configuration */}
          <motion.section id="configuration" className="mb-20" {...fadeIn}>
            <p className="text-sm text-accent font-medium mb-3 uppercase tracking-widest">Configure</p>
            <h2 className="text-2xl md:text-4xl font-heading font-bold mb-6">Node Configuration</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Initialize your node and configure it to connect to the PGRM network.
            </p>

            <div className="space-y-6">
              <div className="glass-card p-6">
                <h3 className="font-heading font-semibold text-lg mb-3">Initialize Your Node</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Run the initialization command with your wallet address. This creates a local configuration file 
                  and registers your node identity on the network.
                </p>
                <CodeBlock title="Terminal">
{`# Initialize node with your wallet address
pgrm-cli init --wallet <YOUR_WALLET_ADDRESS>

# This creates ~/.pgrm/config.yaml with your node configuration`}
                </CodeBlock>
              </div>

              <div className="glass-card p-6">
                <h3 className="font-heading font-semibold text-lg mb-3">Configuration File</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  After initialization, review and customize your node configuration at <code className="text-accent">~/.pgrm/config.yaml</code>.
                </p>
                <CodeBlock title="~/.pgrm/config.yaml">
{`# PGRM Node Configuration
node:
  name: "my-pgrm-node"
  region: "us-east-1"        # Your geographic region
  network: "mainnet"          # mainnet or testnet

wallet:
  address: "0x..."            # Your wallet address
  
gpu:
  max_streams: 4              # Max concurrent streams to process
  quality_preset: "balanced"  # balanced | quality | ultra
  vram_limit: "7GB"           # Leave headroom for system

enhancements:
  super_resolution: true
  noise_reduction: true
  live_captions: true
  content_moderation: true
  translation: false          # Enable if GPU has 12GB+ VRAM

network:
  port: 8545                  # API port
  rtmp_port: 1935             # RTMP ingestion port
  webrtc_port: 8443           # WebRTC port
  max_bandwidth: "500mbps"    # Bandwidth cap

logging:
  level: "info"               # debug | info | warn | error
  file: "/var/log/pgrm/node.log"`}
                </CodeBlock>
              </div>

              <div className="glass-card p-6">
                <h3 className="font-heading font-semibold text-lg mb-3">Environment Variables</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Set the following environment variables for sensitive configuration. Never put private keys in config files.
                </p>
                <CodeBlock title="Terminal">
{`# Create an .env file for your node
cat > ~/.pgrm/.env << 'EOF'
PGRM_WALLET_KEY=<YOUR_PRIVATE_KEY>
PGRM_NETWORK=mainnet
PGRM_NODE_NAME=my-pgrm-node
PGRM_MAX_STREAMS=4
PGRM_LOG_LEVEL=info
EOF

# Secure the file
chmod 600 ~/.pgrm/.env`}
                </CodeBlock>
              </div>
            </div>
          </motion.section>

          {/* Launching */}
          <motion.section id="launching" className="mb-20" {...fadeIn}>
            <p className="text-sm text-accent font-medium mb-3 uppercase tracking-widest">Launch</p>
            <h2 className="text-2xl md:text-4xl font-heading font-bold mb-6">Launch Your Node</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Start your PGRM node and begin processing AI enhancement tasks on the network.
            </p>

            <div className="space-y-6">
              <div className="glass-card p-6">
                <h3 className="font-heading font-semibold text-lg mb-3">Start the Node</h3>
                <CodeBlock title="Terminal">
{`# Start the PGRM node with GPU access
docker run -d \\
  --gpus all \\
  --name pgrm-node \\
  --restart unless-stopped \\
  --env-file ~/.pgrm/.env \\
  -v ~/.pgrm/config.yaml:/app/config.yaml:ro \\
  -v /var/log/pgrm:/app/logs \\
  -p 8545:8545 \\
  -p 1935:1935 \\
  -p 8443:8443 \\
  pgrm/node:latest`}
                </CodeBlock>
              </div>

              <div className="glass-card p-6">
                <h3 className="font-heading font-semibold text-lg mb-3">Verify Node Status</h3>
                <CodeBlock title="Terminal">
{`# Check if the node is running
docker ps | grep pgrm-node

# Check node status via CLI
pgrm-cli status

# Expected output:
# Node ID:      pgrm-node-abc123
# Status:       ONLINE
# GPU:          NVIDIA RTX 4090 (24GB VRAM)
# Streams:      0/4 active
# Staking:      10,000 $PGRM staked
# Uptime:       0d 0h 5m
# Earnings:     0 $PGRM (session)`}
                </CodeBlock>
              </div>

              <div className="glass-card p-6">
                <h3 className="font-heading font-semibold text-lg mb-3">View Logs</h3>
                <CodeBlock title="Terminal">
{`# Follow live logs
docker logs -f pgrm-node

# Or view log file
tail -f /var/log/pgrm/node.log

# Check for errors
pgrm-cli logs --level error --last 1h`}
                </CodeBlock>
              </div>
            </div>
          </motion.section>

          {/* Staking */}
          <motion.section id="staking" className="mb-20" {...fadeIn}>
            <p className="text-sm text-accent font-medium mb-3 uppercase tracking-widest">Staking</p>
            <h2 className="text-2xl md:text-4xl font-heading font-bold mb-6">Staking Requirements</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Node operators must stake $PGRM tokens to participate in the network. Staked tokens 
              act as collateral guaranteeing honest processing behavior.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {[
                {
                  title: "Standard Node",
                  amount: "10,000 $PGRM",
                  features: ["Process up to 4 concurrent streams", "Earn base task rewards", "Standard priority routing", "Community support"],
                },
                {
                  title: "Validator Node",
                  amount: "50,000 $PGRM",
                  features: ["Validate other nodes' work", "Earn validation + task rewards", "Priority stream routing", "Governance voting rights"],
                },
              ].map((tier) => (
                <div key={tier.title} className="glass-card hover-glow p-6">
                  <h3 className="font-heading font-semibold text-lg mb-2">{tier.title}</h3>
                  <p className="text-2xl font-heading font-bold gradient-text mb-4">{tier.amount}</p>
                  <ul className="space-y-2">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 size={14} className="text-accent shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="glass-card p-6">
              <h3 className="font-heading font-semibold text-lg mb-3">Stake Tokens via CLI</h3>
              <CodeBlock title="Terminal">
{`# Check your wallet balance
pgrm-cli wallet balance

# Stake tokens to activate your node
pgrm-cli stake --amount 10000

# Verify staking status
pgrm-cli stake status

# Unstake (7-day cooldown period)
pgrm-cli unstake --amount 10000`}
              </CodeBlock>
            </div>

            <div className="glass-card p-6 mt-6 border-l-4 border-l-destructive">
              <div className="flex items-start gap-3">
                <Shield size={18} className="text-destructive mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-heading font-semibold mb-1">Slashing Conditions</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Staked tokens may be partially slashed for provably dishonest behavior such as: returning 
                    unprocessed frames, submitting falsified quality proofs, extended downtime during committed 
                    sessions, or collusion with other nodes. Slashing is enforced on-chain via fraud proofs.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Monitoring */}
          <motion.section id="monitoring" className="mb-20" {...fadeIn}>
            <p className="text-sm text-accent font-medium mb-3 uppercase tracking-widest">Monitor</p>
            <h2 className="text-2xl md:text-4xl font-heading font-bold mb-6">Monitoring & Management</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Keep track of your node's performance, earnings, and health with built-in monitoring tools.
            </p>

            <div className="space-y-6">
              <div className="glass-card p-6">
                <h3 className="font-heading font-semibold text-lg mb-3">Dashboard</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Access the built-in web dashboard to monitor your node in real-time.
                </p>
                <CodeBlock title="Terminal">
{`# Open the node dashboard (runs on port 8545 by default)
# Visit: http://localhost:8545/dashboard

# Or use CLI for quick stats
pgrm-cli stats

# Output:
# ┌─────────────────────────────────┐
# │  PGRM Node Dashboard            │
# ├─────────────────────────────────┤
# │  Status:    ONLINE               │
# │  GPU Usage: 67%                  │
# │  VRAM:      5.2/8.0 GB           │
# │  Streams:   3/4 active           │
# │  Today:     42 tasks completed   │
# │  Earnings:  85 $PGRM (24h)       │
# │  Uptime:    12d 4h 23m           │
# └─────────────────────────────────┘`}
                </CodeBlock>
              </div>

              <div className="glass-card p-6">
                <h3 className="font-heading font-semibold text-lg mb-3">Health Checks</h3>
                <CodeBlock title="Terminal">
{`# Run a comprehensive health check
pgrm-cli health

# Check GPU performance benchmark
pgrm-cli benchmark --duration 60

# Test network connectivity to protocol
pgrm-cli ping --target mainnet`}
                </CodeBlock>
              </div>

              <div className="glass-card p-6">
                <h3 className="font-heading font-semibold text-lg mb-3">Updating Your Node</h3>
                <CodeBlock title="Terminal">
{`# Check for updates
pgrm-cli update --check

# Pull latest node image
docker pull pgrm/node:latest

# Restart with new image
docker stop pgrm-node && docker rm pgrm-node

# Re-run the docker run command from the Launch section`}
                </CodeBlock>
              </div>
            </div>
          </motion.section>

          {/* Troubleshooting */}
          <motion.section id="troubleshooting" className="mb-20" {...fadeIn}>
            <p className="text-sm text-accent font-medium mb-3 uppercase tracking-widest">Help</p>
            <h2 className="text-2xl md:text-4xl font-heading font-bold mb-6">Troubleshooting</h2>

            <div className="space-y-4">
              {[
                {
                  issue: "Node shows OFFLINE status after starting",
                  solution: "Ensure ports 8545, 1935, and 8443 are open in your firewall. Check that your wallet has the minimum staking balance. Run `pgrm-cli diagnose` for a detailed connectivity report.",
                },
                {
                  issue: "GPU not detected by Docker",
                  solution: "Verify NVIDIA drivers are installed with `nvidia-smi`. Ensure the NVIDIA Container Toolkit is properly configured: `sudo nvidia-ctk runtime configure --runtime=docker && sudo systemctl restart docker`.",
                },
                {
                  issue: "High VRAM usage causing crashes",
                  solution: "Reduce `max_streams` in your config.yaml. Lower the `quality_preset` from 'ultra' to 'balanced'. Disable translation if running on 8GB VRAM cards.",
                },
                {
                  issue: "Low earnings compared to expected",
                  solution: "Check your node's quality score with `pgrm-cli quality`. Ensure stable network connectivity — frequent disconnections reduce your routing priority. Consider upgrading to recommended hardware specs.",
                },
                {
                  issue: "Docker container keeps restarting",
                  solution: "Check logs with `docker logs pgrm-node`. Common causes: invalid wallet key in .env, config.yaml syntax error, or insufficient disk space. Run `pgrm-cli validate-config` to check your configuration.",
                },
              ].map((item) => (
                <div key={item.issue} className="glass-card p-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle size={16} className="text-accent mt-1 shrink-0" />
                    <div>
                      <h3 className="font-heading font-semibold mb-2">{item.issue}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.solution}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Rewards */}
          <motion.section id="rewards" className="mb-20" {...fadeIn}>
            <p className="text-sm text-accent font-medium mb-3 uppercase tracking-widest">Earn</p>
            <h2 className="text-2xl md:text-4xl font-heading font-bold mb-6">Rewards & Earnings</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Node operators are rewarded with $PGRM tokens for every AI enhancement task they process. 
              Earnings depend on your hardware, uptime, and quality score.
            </p>

            <div className="glass-card p-6 mb-6">
              <h3 className="font-heading font-semibold text-lg mb-4">Reward Structure</h3>
              <div className="space-y-3 text-sm">
                {[
                  { task: "AI Super Resolution (per minute)", reward: "0.5 $PGRM" },
                  { task: "Noise Reduction (per minute)", reward: "0.3 $PGRM" },
                  { task: "Live Captions & Translation (per minute)", reward: "0.4 $PGRM" },
                  { task: "Content Moderation (per minute)", reward: "0.2 $PGRM" },
                  { task: "Validation (per proof verified)", reward: "0.1 $PGRM" },
                  { task: "Uptime Bonus (daily, 99%+ uptime)", reward: "10 $PGRM" },
                ].map((r) => (
                  <div key={r.task} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                    <span className="text-muted-foreground">{r.task}</span>
                    <span className="font-heading font-semibold text-foreground">{r.reward}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="font-heading font-semibold text-lg mb-3">Claim Rewards</h3>
              <CodeBlock title="Terminal">
{`# View pending rewards
pgrm-cli rewards

# Claim all pending rewards to your wallet
pgrm-cli rewards claim

# View earnings history
pgrm-cli rewards history --period 30d`}
              </CodeBlock>
            </div>

            <div className="glass-card neon-border p-6 mt-6">
              <h4 className="font-heading font-semibold mb-2 gradient-text">Quality Score Multiplier</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your node's quality score (0-100) acts as an earnings multiplier. Nodes that consistently 
                deliver high-quality enhancements, maintain 99%+ uptime, and respond quickly to task 
                assignments receive up to a <strong className="text-foreground">2x reward multiplier</strong>. 
                Check your score anytime with <code className="text-accent">pgrm-cli quality</code>.
              </p>
            </div>
          </motion.section>

          {/* Register Wallet Section */}
          <motion.section id="register" className="mb-20" {...fadeIn}>
            <p className="text-sm text-accent font-medium mb-3 uppercase tracking-widest">Get Started</p>
            <h2 className="text-2xl md:text-4xl font-heading font-bold mb-6">
              Register Your <span className="gradient-text">Wallet</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Register your wallet address to join the PGRM node operator program. Once registered, you'll 
              get access to the Node Dashboard to monitor your performance and earnings.
            </p>

            <div className="glass-card neon-border p-8">
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Wallet Type</label>
                  <div className="flex gap-3">
                    {(["evm", "solana"] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setWalletType(type)}
                        className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
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

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Wallet Address</label>
                  <input
                    type="text"
                    value={walletAddress}
                    onChange={(e) => {
                      setWalletAddress(e.target.value);
                      setRegistrationStatus("idle");
                    }}
                    placeholder={walletType === "evm" ? "0x..." : "Enter Solana address..."}
                    className="w-full px-4 py-3 rounded-xl bg-secondary/60 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm font-mono"
                  />
                </div>

                {registrationStatus !== "idle" && registrationStatus !== "loading" && (
                  <div className={`flex items-center gap-2 text-sm ${
                    registrationStatus === "success" ? "text-green-500" : "text-destructive"
                  }`}>
                    {registrationStatus === "success" ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
                    {registrationMessage}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleRegister}
                    disabled={registrationStatus === "loading"}
                    className="bg-primary text-primary-foreground px-6 py-3 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {registrationStatus === "loading" ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Registering...
                      </>
                    ) : (
                      <>
                        <Shield size={16} />
                        Register Wallet
                      </>
                    )}
                  </button>
                  
                  <Link
                    to="/connect-wallet"
                    className="glass-card hover-glow px-6 py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <BarChart3 size={16} />
                    View Node Dashboard
                  </Link>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Bottom nav */}
          <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-border/30">
            <Link
              to="/docs"
              className="flex-1 glass-card hover-glow p-5 flex items-center gap-3 group"
            >
              <ArrowLeft size={16} className="text-accent" />
              <div>
                <p className="text-xs text-muted-foreground">Previous</p>
                <p className="font-heading font-semibold group-hover:text-accent transition-colors">Documentation</p>
              </div>
            </Link>
            <Link
              to="/"
              className="flex-1 glass-card hover-glow p-5 flex items-center justify-end gap-3 text-right group"
            >
              <div>
                <p className="text-xs text-muted-foreground">Back to</p>
                <p className="font-heading font-semibold group-hover:text-accent transition-colors">Home</p>
              </div>
              <ChevronRight size={16} className="text-accent" />
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RunNode;
