import { motion } from "framer-motion";

const phases = [
  {
    phase: "Phase 1",
    title: "Foundation",
    items: ["AI engine core development", "OBS plugin beta", "Testnet launch"],
    status: "active",
  },
  {
    phase: "Phase 2",
    title: "Network & Governance",
    items: ["Node operator onboarding", "Mainnet launch", "DAO governance framework"],
    status: "upcoming",
  },
  {
    phase: "Phase 3",
    title: "Expansion",
    items: ["Mobile SDK", "AI avatar streaming", "Enterprise partnerships"],
    status: "upcoming",
  },
];

const RoadmapSection = () => {
  return (
    <section id="roadmap" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/3 to-transparent" />
      <div className="container mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-accent font-medium mb-3 uppercase tracking-widest">Roadmap</p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            The Path Forward
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {phases.map((p, i) => (
            <motion.div
              key={p.phase}
              className={`glass-card p-8 relative overflow-hidden ${
                p.status === "active" ? "neon-border neon-glow" : ""
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              {p.status === "active" && (
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-medium">
                  Active
                </div>
              )}
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">{p.phase}</p>
              <h3 className="font-heading font-semibold text-xl mb-4 gradient-text">{p.title}</h3>
              <ul className="space-y-2">
                {p.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
