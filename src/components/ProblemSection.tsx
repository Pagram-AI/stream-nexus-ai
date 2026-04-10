import { motion } from "framer-motion";
import { AlertTriangle, DollarSign, Lock, Brain } from "lucide-react";

const problems = [
  {
    icon: AlertTriangle,
    title: "Poor Quality",
    desc: "Streams suffer from compression artifacts, low resolution, and inconsistent quality across devices.",
  },
  {
    icon: DollarSign,
    title: "High Infrastructure Cost",
    desc: "Centralized CDNs charge exorbitant fees for transcoding and global delivery at scale.",
  },
  {
    icon: Lock,
    title: "Centralized Control",
    desc: "A handful of corporations control the entire streaming pipeline, creating single points of failure.",
  },
  {
    icon: Brain,
    title: "No Real-Time Intelligence",
    desc: "Traditional streams lack AI-powered moderation, translation, and enhancement capabilities.",
  },
];

const ProblemSection = () => {
  return (
    <section className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />
      <div className="container mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-accent font-medium mb-3 uppercase tracking-widest">The Problem</p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Livestreaming Is Broken
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            The current infrastructure wasn't built for the demands of modern, intelligent streaming.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((item, i) => (
            <motion.div
              key={item.title}
              className="glass-card hover-glow p-6 flex flex-col gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <item.icon size={20} className="text-destructive" />
              </div>
              <h3 className="font-heading font-semibold text-lg">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
