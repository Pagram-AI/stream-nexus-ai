import { motion } from "framer-motion";
import { ArrowRight, Server } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section id="cta" className="section-padding relative">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[150px]" />
      </div>
      <div className="container mx-auto relative z-10">
        <motion.div
          className="glass-card neon-border neon-glow p-12 md:p-20 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Start Streaming <span className="gradient-text">Smarter</span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Join the decentralized AI streaming revolution. Enhance your streams or earn by running a node.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-medium bg-primary text-primary-foreground hover:opacity-90 transition-all neon-glow">
              Launch App <ArrowRight size={16} />
            </button>
            <Link to="/run-node" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-medium border border-border/60 text-foreground hover:bg-secondary/50 transition-all">
              <Server size={16} /> Become a Node Operator
            </Link>
          </div>

          <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="Enter your email for updates"
              className="flex-1 px-4 py-2.5 rounded-lg bg-secondary/60 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
            />
            <button className="px-4 py-2.5 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:opacity-90 transition-opacity">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
