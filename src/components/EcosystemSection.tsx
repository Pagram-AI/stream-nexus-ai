import { motion } from "framer-motion";

const integrations = [
  "OBS Studio", "Twitch", "YouTube Live", "MetaMask", "WalletConnect", "Developer API", "Discord", "Streamlabs"
];

const EcosystemSection = () => {
  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-accent font-medium mb-3 uppercase tracking-widest">Ecosystem</p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Seamless Integrations
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Works with the tools and platforms you already use.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
          {integrations.map((name, i) => (
            <motion.div
              key={name}
              className="glass-card hover-glow px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-default"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              {name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;
