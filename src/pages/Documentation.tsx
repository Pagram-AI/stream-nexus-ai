import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  Cpu,
  Sparkles,
  Volume2,
  Shield,
  Languages,
  MonitorSmartphone,
  BarChart3,
  Terminal,
  Coins,
  Globe,
  Network,
  Video,
  Layers,
  Code,
  FileText,
  Zap,
  ChevronRight,
} from "lucide-react";
import logo from "@/assets/logo.png";

const sidebarSections = [
  { id: "overview", label: "Overview", icon: BookOpen },
  { id: "getting-started", label: "Getting Started", icon: Zap },
  { id: "architecture", label: "Architecture", icon: Layers },
  { id: "features", label: "Core Features", icon: Sparkles },
  { id: "node-setup", label: "Node Setup", icon: Cpu },
  { id: "tokenomics", label: "Tokenomics", icon: Coins },
  { id: "api-reference", label: "API Reference", icon: Code },
  { id: "sdk", label: "SDK & Libraries", icon: Terminal },
  { id: "faq", label: "FAQ", icon: FileText },
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

const Documentation = () => {
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
              Documentation
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
            <p className="text-sm text-accent font-medium mb-3 uppercase tracking-widest">Overview</p>
            <h1 className="text-3xl md:text-5xl font-heading font-bold mb-6">
              PGRM Protocol <span className="gradient-text">Documentation</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              PGRM is a decentralized AI-powered protocol designed to enhance live video streams in real-time. 
              By leveraging a distributed network of GPU nodes, PGRM delivers AI super-resolution, 
              noise reduction, real-time translation, content moderation, and smart transcoding — all 
              secured and incentivized on-chain.
            </p>
            <div className="glass-card p-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { label: "Active Nodes", value: "100+", icon: Network },
                { label: "Stream Latency", value: "<200ms", icon: Zap },
                { label: "Max Resolution", value: "4K UHD", icon: MonitorSmartphone },
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

          {/* Getting Started */}
          <motion.section id="getting-started" className="mb-20" {...fadeIn}>
            <p className="text-sm text-accent font-medium mb-3 uppercase tracking-widest">Quick Start</p>
            <h2 className="text-2xl md:text-4xl font-heading font-bold mb-6">Getting Started</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Integrate PGRM into your streaming pipeline in minutes. Follow these steps to start 
              enhancing your live streams with AI.
            </p>

            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "Install the SDK",
                  desc: "Add the PGRM SDK to your project using your preferred package manager.",
                  code: "npm install @pgrm/sdk",
                },
                {
                  step: "2",
                  title: "Initialize the Client",
                  desc: "Create a client instance with your API key and desired enhancement pipeline.",
                  code: `import { PGRMClient } from '@pgrm/sdk';

const client = new PGRMClient({
  apiKey: 'YOUR_API_KEY',
  network: 'mainnet',
  enhancements: ['super-resolution', 'noise-reduction'],
});`,
                },
                {
                  step: "3",
                  title: "Connect Your Stream",
                  desc: "Route your RTMP or WebRTC stream through the PGRM network.",
                  code: `const session = await client.createSession({
  input: 'rtmp://your-stream-url',
  outputResolution: '4k',
  enableCaptions: true,
  language: 'en',
});

console.log('Enhanced stream URL:', session.outputUrl);`,
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
                      <CodeBlock title={s.step === "1" ? "Terminal" : "JavaScript"}>
                        {s.code}
                      </CodeBlock>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Architecture */}
          <motion.section id="architecture" className="mb-20" {...fadeIn}>
            <p className="text-sm text-accent font-medium mb-3 uppercase tracking-widest">Architecture</p>
            <h2 className="text-2xl md:text-4xl font-heading font-bold mb-6">Protocol Architecture</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              The PGRM protocol operates as a three-layer architecture designed for maximum decentralization, 
              scalability, and performance.
            </p>

            <div className="space-y-6">
              {[
                {
                  icon: Video,
                  title: "Ingestion Layer",
                  desc: "Accepts RTMP, SRT, and WebRTC streams from any source. The ingestion layer handles authentication, stream validation, and initial routing to the enhancement layer. Supports adaptive bitrate and automatic format detection.",
                },
                {
                  icon: Cpu,
                  title: "Enhancement Layer",
                  desc: "A decentralized network of GPU nodes that apply AI models in real-time. Each node runs a containerized AI pipeline including super-resolution (ESRGAN-based), denoising (trained on 10M+ frames), translation (multi-language NMT), and content moderation (NSFW/violence detection). Nodes are matched to streams via a latency-aware routing algorithm.",
                },
                {
                  icon: Globe,
                  title: "Delivery Layer",
                  desc: "Enhanced streams are packaged into HLS/DASH manifests and distributed via a global CDN of peer nodes. Viewers receive the enhanced stream with sub-200ms additional latency. Delivery nodes are incentivized through micro-payments per segment served.",
                },
              ].map((layer) => (
                <div key={layer.title} className="glass-card hover-glow p-8 flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <layer.icon size={22} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-2">{layer.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{layer.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Core Features */}
          <motion.section id="features" className="mb-20" {...fadeIn}>
            <p className="text-sm text-accent font-medium mb-3 uppercase tracking-widest">Features</p>
            <h2 className="text-2xl md:text-4xl font-heading font-bold mb-6">Core Features</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: Sparkles,
                  title: "AI Super Resolution",
                  desc: "Neural network-based upscaling from 720p to 4K. Uses a custom ESRGAN model trained on 50M+ video frames. Processes at 30fps with GPU acceleration. Supports multiple quality presets: balanced, quality, and ultra.",
                },
                {
                  icon: Volume2,
                  title: "Noise & Audio Enhancement",
                  desc: "Real-time background noise suppression using RNNoise-derived models. Automatic gain control, echo cancellation, and clarity enhancement. Processes audio streams with <10ms additional latency.",
                },
                {
                  icon: Shield,
                  title: "Content Moderation",
                  desc: "Multi-label classification for NSFW, violence, hate speech, and spam detection. Custom moderation rulesets per stream. Configurable actions: blur, mute, flag, or terminate. Reports written on-chain for transparency.",
                },
                {
                  icon: Languages,
                  title: "Live Translation & Captions",
                  desc: "Support for 50+ languages using Whisper-based ASR. Real-time subtitle generation with <2s delay. Neural machine translation for live multilingual streams. WebVTT and embedded caption output.",
                },
                {
                  icon: MonitorSmartphone,
                  title: "Smart Transcoding",
                  desc: "Adaptive bitrate ladder generation based on viewer device and bandwidth. Per-title encoding optimization using AI scene analysis. H.264, H.265, VP9, and AV1 codec support.",
                },
                {
                  icon: BarChart3,
                  title: "Stream Analytics",
                  desc: "Real-time dashboards with viewer count, engagement metrics, and quality scores. AI-powered highlight detection for VOD clipping. Object and scene recognition for metadata tagging.",
                },
              ].map((f) => (
                <div key={f.title} className="glass-card p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <f.icon size={18} className="text-accent" />
                    </div>
                    <h3 className="font-heading font-semibold">{f.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Node Setup */}
          <motion.section id="node-setup" className="mb-20" {...fadeIn}>
            <p className="text-sm text-accent font-medium mb-3 uppercase tracking-widest">Node Operators</p>
            <h2 className="text-2xl md:text-4xl font-heading font-bold mb-6">Running a Node</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Anyone with a compatible GPU can join the PGRM network as a node operator. 
              Nodes process AI enhancement tasks and earn $PGRM tokens as rewards.
            </p>

            <div className="glass-card p-6 mb-6">
              <h3 className="font-heading font-semibold text-lg mb-4">System Requirements</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                {[
                  { label: "GPU", value: "NVIDIA RTX 3070 or higher (8GB+ VRAM)" },
                  { label: "CPU", value: "8-core x86_64 processor" },
                  { label: "RAM", value: "32 GB minimum" },
                  { label: "Storage", value: "500 GB NVMe SSD" },
                  { label: "Network", value: "100 Mbps symmetric, static IP recommended" },
                  { label: "OS", value: "Ubuntu 22.04 LTS / Docker compatible" },
                ].map((req) => (
                  <div key={req.label} className="flex items-start gap-3">
                    <ChevronRight size={14} className="text-accent mt-0.5 shrink-0" />
                    <div>
                      <span className="font-medium text-foreground">{req.label}:</span>{" "}
                      <span className="text-muted-foreground">{req.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <h3 className="font-heading font-semibold text-lg mb-3">Quick Setup</h3>
            <CodeBlock title="Terminal">
{`# Pull the PGRM node image
docker pull pgrm/node:latest

# Initialize your node with staking wallet
pgrm-cli init --wallet <YOUR_WALLET_ADDRESS>

# Start the node
docker run -d \\
  --gpus all \\
  --name pgrm-node \\
  -e WALLET_KEY=<YOUR_PRIVATE_KEY> \\
  -e NETWORK=mainnet \\
  -p 8545:8545 \\
  -p 1935:1935 \\
  pgrm/node:latest

# Check node status
pgrm-cli status`}
            </CodeBlock>

            <div className="glass-card neon-border p-6 mt-6">
              <h4 className="font-heading font-semibold mb-2 gradient-text">Staking Requirements</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Node operators must stake a minimum of <strong className="text-foreground">10,000 $PGRM</strong> tokens 
                to join the network. Staked tokens serve as collateral for honest processing. 
                Validators must stake <strong className="text-foreground">50,000 $PGRM</strong>. 
                Slashing conditions apply for provably dishonest behavior.
              </p>
            </div>

          </motion.section>

          {/* Tokenomics */}
          <motion.section id="tokenomics" className="mb-20" {...fadeIn}>
            <p className="text-sm text-accent font-medium mb-3 uppercase tracking-widest">Token</p>
            <h2 className="text-2xl md:text-4xl font-heading font-bold mb-6">$PGRM Tokenomics</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              The $PGRM token powers the entire protocol economy — from paying for stream enhancement 
              to rewarding node operators and governance voting.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {[
                { label: "Total Supply", value: "1,000,000,000 $PGRM" },
                { label: "Initial Circulating", value: "150,000,000 $PGRM" },
                { label: "Node Rewards", value: "40% of supply over 5 years" },
                { label: "Team & Advisors", value: "15% (2-year vesting, 6-mo cliff)" },
                { label: "Ecosystem Fund", value: "20% for grants and partnerships" },
                { label: "Public Sale", value: "10% at TGE" },
                { label: "Treasury", value: "10% protocol-owned liquidity" },
                { label: "Early Backers", value: "5% (18-month vesting)" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between glass-card px-5 py-4">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className="text-sm font-heading font-semibold">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="glass-card p-6">
              <h3 className="font-heading font-semibold text-lg mb-3">Token Utility</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  "Payment — Creators pay $PGRM to access AI enhancement services on the network.",
                  "Staking — Node operators and validators stake $PGRM as collateral.",
                  "Governance — Token holders vote on protocol upgrades, fee parameters, and treasury allocation.",
                  "Rewards — Nodes earn $PGRM proportional to compute contributed and quality scores.",
                  "Burning — A percentage of enhancement fees are burned, creating deflationary pressure.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <ChevronRight size={14} className="text-accent mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.section>

          {/* API Reference */}
          <motion.section id="api-reference" className="mb-20" {...fadeIn}>
            <p className="text-sm text-accent font-medium mb-3 uppercase tracking-widest">API</p>
            <h2 className="text-2xl md:text-4xl font-heading font-bold mb-6">API Reference</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              The PGRM REST API allows you to manage sessions, query node status, and configure enhancement pipelines programmatically.
            </p>

            <div className="space-y-6">
              {[
                {
                  method: "POST",
                  path: "/v1/sessions",
                  desc: "Create a new enhancement session for an incoming stream.",
                  code: `curl -X POST https://api.pgrm.network/v1/sessions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "inputUrl": "rtmp://your-server/live/stream-key",
    "enhancements": ["super-resolution", "noise-reduction", "captions"],
    "outputResolution": "2160p",
    "captionLanguages": ["en", "es", "ja"]
  }'`,
                },
                {
                  method: "GET",
                  path: "/v1/sessions/:id",
                  desc: "Retrieve details and metrics for an active or completed session.",
                  code: `curl https://api.pgrm.network/v1/sessions/sess_abc123 \\
  -H "Authorization: Bearer YOUR_API_KEY"

# Response
{
  "id": "sess_abc123",
  "status": "active",
  "inputResolution": "1280x720",
  "outputResolution": "3840x2160",
  "activeEnhancements": ["super-resolution", "noise-reduction"],
  "nodeId": "node_xyz789",
  "latencyMs": 145,
  "framesProcessed": 54320
}`,
                },
                {
                  method: "GET",
                  path: "/v1/nodes",
                  desc: "List all available nodes on the network with capacity and performance data.",
                  code: `curl https://api.pgrm.network/v1/nodes \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
                },
                {
                  method: "DELETE",
                  path: "/v1/sessions/:id",
                  desc: "Terminate an active session and release node resources.",
                  code: `curl -X DELETE https://api.pgrm.network/v1/sessions/sess_abc123 \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
                },
              ].map((endpoint) => (
                <div key={endpoint.path + endpoint.method} className="glass-card p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
                        endpoint.method === "POST"
                          ? "bg-green-500/15 text-green-600"
                          : endpoint.method === "DELETE"
                          ? "bg-red-500/15 text-red-500"
                          : "bg-blue-500/15 text-blue-500"
                      }`}
                    >
                      {endpoint.method}
                    </span>
                    <code className="text-sm font-mono text-foreground">{endpoint.path}</code>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{endpoint.desc}</p>
                  <CodeBlock title="cURL">{endpoint.code}</CodeBlock>
                </div>
              ))}
            </div>
          </motion.section>

          {/* SDK */}
          <motion.section id="sdk" className="mb-20" {...fadeIn}>
            <p className="text-sm text-accent font-medium mb-3 uppercase tracking-widest">SDK</p>
            <h2 className="text-2xl md:text-4xl font-heading font-bold mb-6">SDK & Libraries</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Official client libraries for integrating with the PGRM protocol.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { lang: "JavaScript / TypeScript", pkg: "npm install @pgrm/sdk", status: "Stable" },
                { lang: "Python", pkg: "pip install pgrm-sdk", status: "Stable" },
                { lang: "Go", pkg: "go get github.com/pgrm/sdk-go", status: "Beta" },
                { lang: "Rust", pkg: "cargo add pgrm-sdk", status: "Alpha" },
              ].map((sdk) => (
                <div key={sdk.lang} className="glass-card p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-heading font-semibold text-sm">{sdk.lang}</h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        sdk.status === "Stable"
                          ? "bg-green-500/15 text-green-600"
                          : sdk.status === "Beta"
                          ? "bg-yellow-500/15 text-yellow-600"
                          : "bg-orange-500/15 text-orange-500"
                      }`}
                    >
                      {sdk.status}
                    </span>
                  </div>
                  <code className="text-xs font-mono text-muted-foreground bg-secondary/60 px-3 py-1.5 rounded-lg block">
                    {sdk.pkg}
                  </code>
                </div>
              ))}
            </div>
          </motion.section>

          {/* FAQ */}
          <motion.section id="faq" className="mb-12" {...fadeIn}>
            <p className="text-sm text-accent font-medium mb-3 uppercase tracking-widest">FAQ</p>
            <h2 className="text-2xl md:text-4xl font-heading font-bold mb-6">Frequently Asked Questions</h2>

            <div className="space-y-4">
              {[
                {
                  q: "What kind of streams does PGRM support?",
                  a: "PGRM supports RTMP, SRT, and WebRTC input streams. Output is delivered via HLS and DASH for broad viewer compatibility. Any streaming software that supports RTMP (OBS, Streamlabs, vMix, etc.) works out of the box.",
                },
                {
                  q: "How much does it cost to use the network?",
                  a: "Pricing is dynamic and based on network demand, enhancement complexity, and output resolution. Typical costs range from 0.5–5 $PGRM per minute of enhanced streaming. Volume discounts are available through staking-based tier unlocks.",
                },
                {
                  q: "Is the AI processing truly decentralized?",
                  a: "Yes. AI models run on independent GPU nodes operated by community members worldwide. No single entity controls the processing pipeline. Proofs of processing are submitted on-chain and verified by validators.",
                },
                {
                  q: "Can I run a node on consumer hardware?",
                  a: "Yes, any NVIDIA GPU with 8GB+ VRAM can run a node. However, higher-end GPUs (RTX 4080+) will be assigned more tasks and earn proportionally higher rewards due to faster processing and lower latency.",
                },
                {
                  q: "What happens if a node goes offline during processing?",
                  a: "The protocol automatically re-routes the stream to another available node within 500ms. The original node's stake may be partially slashed depending on the disruption severity. Viewers experience minimal interruption.",
                },
                {
                  q: "How do I get $PGRM tokens?",
                  a: "You can earn $PGRM by running a node, or acquire tokens through supported DEXs post-TGE. Check the official channels for the latest exchange listings and liquidity pools.",
                },
              ].map((item, i) => (
                <div key={i} className="glass-card p-6">
                  <h3 className="font-heading font-semibold mb-2">{item.q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Back to home */}
          <div className="text-center pt-8 border-t border-border/30">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <ArrowLeft size={14} /> Back to Home
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Documentation;
