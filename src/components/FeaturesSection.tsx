import { motion } from "framer-motion";
import { Sparkles, Volume2, Shield, Languages, MonitorSmartphone, BarChart3 } from "lucide-react";

const features = [
  { icon: Sparkles, title: "AI Super Resolution", desc: "Upscale 720p streams to stunning 4K quality using neural networks in real-time." },
  { icon: Volume2, title: "Noise & Audio Enhancement", desc: "Remove background noise and enhance audio clarity with AI-powered processing." },
  { icon: Shield, title: "Real-Time Moderation", desc: "Automatic content filtering and moderation powered by on-chain AI models." },
  { icon: Languages, title: "Live Translation & Captions", desc: "Multilingual captions and real-time translation for global audiences." },
  { icon: MonitorSmartphone, title: "Smart Transcoding", desc: "Dynamic format adaptation for every device and bandwidth condition." },
  { icon: BarChart3, title: "Analytics & Recognition", desc: "Object recognition, scene analysis, and real-time stream analytics." },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/3 to-transparent" />
      <div className="container mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-accent font-medium mb-3 uppercase tracking-widest">Features</p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            AI-Powered Stream Enhancement
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Every stream is enhanced through our decentralized AI pipeline.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="glass-card hover-glow p-8 group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <f.icon size={22} className="text-accent" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
