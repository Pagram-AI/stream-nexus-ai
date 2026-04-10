import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const steps = [
  { label: "Stream Input", color: "bg-accent" },
  { label: "Decentralized Nodes", color: "bg-primary" },
  { label: "AI Processing", color: "bg-neon-purple" },
  { label: "Enhanced Output", color: "bg-accent" },
];

const SolutionSection = () => {
  return (
    <section className="section-padding relative">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-accent font-medium mb-3 uppercase tracking-widest">The Solution</p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Decentralized AI Enhancement
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Our protocol routes live streams through a network of GPU-powered nodes that apply AI enhancements in real-time.
          </p>
        </motion.div>

        {/* Pipeline diagram */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-center">
              <div className="glass-card neon-border p-6 text-center min-w-[160px]">
                <div className={`w-3 h-3 rounded-full ${step.color} mx-auto mb-3`} />
                <p className="font-heading font-medium text-sm">{step.label}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:flex items-center px-2 text-muted-foreground">
                  <div className="w-8 h-px bg-border" />
                  <ArrowRight size={14} />
                </div>
              )}
            </div>
          ))}
        </motion.div>

        {/* Key benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[
            { title: "Scalable", desc: "Nodes auto-scale to meet demand across the globe." },
            { title: "Decentralized", desc: "No single point of failure. Censorship-resistant by design." },
            { title: "Real-Time AI", desc: "Sub-second latency AI enhancement on every stream." },
          ].map((b, i) => (
            <motion.div
              key={b.title}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <h3 className="font-heading font-semibold gradient-text text-lg mb-2">{b.title}</h3>
              <p className="text-sm text-muted-foreground">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
