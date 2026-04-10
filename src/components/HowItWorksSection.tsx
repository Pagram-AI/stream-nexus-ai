import { motion } from "framer-motion";
import { Video, Network, Cpu, Globe } from "lucide-react";

const steps = [
  { icon: Video, title: "Creator Streams", desc: "Stream content using any platform — OBS, browser, or mobile app." },
  { icon: Network, title: "Protocol Routes", desc: "The protocol intelligently routes the stream to available GPU nodes." },
  { icon: Cpu, title: "AI Enhances", desc: "Nodes apply upscaling, noise reduction, captions, moderation, and more." },
  { icon: Globe, title: "Global Delivery", desc: "Enhanced stream is delivered to viewers worldwide in optimal quality." },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="section-padding">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-accent font-medium mb-3 uppercase tracking-widest">How It Works</p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Stream → Enhance → Deliver
          </h2>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              className={`relative flex items-start gap-6 mb-12 last:mb-0 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <div className="flex-1 md:text-right hidden md:block">
                {i % 2 === 0 && (
                  <div className="glass-card hover-glow p-6">
                    <h3 className="font-heading font-semibold text-lg mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                )}
              </div>

              {/* Node */}
              <div className="relative z-10 w-12 h-12 rounded-full bg-secondary border-2 border-primary/40 flex items-center justify-center shrink-0">
                <step.icon size={18} className="text-accent" />
              </div>

              <div className="flex-1">
                {i % 2 !== 0 ? (
                  <div className="glass-card hover-glow p-6 hidden md:block">
                    <h3 className="font-heading font-semibold text-lg mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                ) : null}
                {/* Mobile always show */}
                <div className="glass-card hover-glow p-6 md:hidden">
                  <h3 className="font-heading font-semibold text-lg mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
