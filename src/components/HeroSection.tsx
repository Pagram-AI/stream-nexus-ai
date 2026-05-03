import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";

const NetworkBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 grid-bg opacity-40" />
    <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[120px] animate-pulse-glow" />
    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/8 blur-[100px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-neon-purple/5 blur-[150px]" />
    {/* Floating nodes */}
    {[
      { top: "20%", left: "15%", delay: 0 },
      { top: "60%", left: "80%", delay: 1 },
      { top: "30%", left: "70%", delay: 2 },
      { top: "75%", left: "25%", delay: 0.5 },
      { top: "45%", left: "90%", delay: 1.5 },
      { top: "15%", left: "55%", delay: 2.5 },
    ].map((node, i) => (
      <motion.div
        key={i}
        className="absolute node-dot"
        style={{ top: node.top, left: node.left }}
        animate={{ y: [-5, 5, -5], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, delay: node.delay }}
      />
    ))}
  </div>
);

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center section-padding pt-32">
      <NetworkBackground />
      <div className="container mx-auto relative z-10 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border/50 bg-secondary/50 text-xs text-muted-foreground mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-glow" />
            Decentralized AI Streaming Protocol
          </div>
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl font-heading font-bold leading-tight mb-6 text-balance"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          Powering the Future of{" "}
          <span className="gradient-text">Intelligent Livestreaming</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-balance"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          A decentralized network of AI-powered nodes that enhance live video
          streams in real-time — from 720p to 4K, with noise reduction,
          translation, and moderation, all on-chain.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          <Link
            to="/run-node"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-medium border border-border/60 text-foreground hover:bg-secondary/50 transition-all"
          >
            <Play size={16} /> Run a Node
          </Link>
        </motion.div>

        <motion.div
          className="mt-16 flex items-center justify-center gap-8 text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <span>100+ Active Nodes</span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span>Sub-second Latency</span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span>4K AI Upscaling</span>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
