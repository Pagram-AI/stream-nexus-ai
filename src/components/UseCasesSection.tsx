import { motion } from "framer-motion";
import { Mic, Gamepad2, Building2, Music, GraduationCap } from "lucide-react";

const cases = [
  { icon: Mic, title: "Content Creators", desc: "Enhance every stream with 4K upscaling, noise cancellation, and live captions." },
  { icon: Gamepad2, title: "Gaming Streamers", desc: "Ultra-low latency AI enhancement for competitive and entertainment gaming." },
  { icon: Building2, title: "Enterprises", desc: "Secure, scalable streaming infrastructure for corporate communications." },
  { icon: Music, title: "Events & Concerts", desc: "Broadcast live events globally with cinema-quality AI enhancement." },
  { icon: GraduationCap, title: "Education & Webinars", desc: "Real-time translation and captions for accessible global education." },
];

const UseCasesSection = () => {
  return (
    <section id="use-cases" className="section-padding">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-accent font-medium mb-3 uppercase tracking-widest">Use Cases</p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Built for Every Stream
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {cases.map((c, i) => (
            <motion.div
              key={c.title}
              className="glass-card hover-glow p-6 flex items-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                <c.icon size={18} className="text-accent" />
              </div>
              <div>
                <h3 className="font-heading font-semibold mb-1">{c.title}</h3>
                <p className="text-sm text-muted-foreground">{c.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
