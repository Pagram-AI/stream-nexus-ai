import { motion } from "framer-motion";
import { Cpu, Coins, ShieldCheck, ArrowRight } from "lucide-react";

const NodeEconomySection = () => {
  return (
    <section id="node-economy" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />
      <div className="container mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-accent font-medium mb-3 uppercase tracking-widest">Node Economy</p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Earn by Powering the Network
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            GPU node operators earn tokens for processing streams. Validators secure the network.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: Cpu, title: "Provide Compute", desc: "Run a node with your GPU to process AI-enhanced streams and earn rewards." },
            { icon: Coins, title: "Earn Tokens", desc: "Get paid in $STREAM tokens for every stream processed on the network." },
            { icon: ShieldCheck, title: "Validate & Secure", desc: "Stake tokens to become a validator and secure the decentralized network." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              className="glass-card hover-glow p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <item.icon size={28} className="text-accent mb-5" />
              <h3 className="font-heading font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Token loop */}
        <motion.div
          className="glass-card neon-border p-8 md:p-12 max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="font-heading font-semibold text-xl mb-4 gradient-text">Token Incentive Loop</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-sm text-muted-foreground">
            <span className="px-3 py-1.5 rounded-lg bg-secondary">Creators Pay</span>
            <ArrowRight size={14} className="hidden md:block text-accent" />
            <span className="px-3 py-1.5 rounded-lg bg-secondary">Nodes Process</span>
            <ArrowRight size={14} className="hidden md:block text-accent" />
            <span className="px-3 py-1.5 rounded-lg bg-secondary">Validators Verify</span>
            <ArrowRight size={14} className="hidden md:block text-accent" />
            <span className="px-3 py-1.5 rounded-lg bg-secondary">Rewards Distributed</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NodeEconomySection;
