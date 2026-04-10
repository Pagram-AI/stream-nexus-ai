const Footer = () => {
  return (
    <footer className="border-t border-border/30 py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <span className="font-heading font-bold text-lg gradient-text">StreamAI</span>
            <p className="text-xs text-muted-foreground mt-2">Decentralized AI livestream enhancement protocol.</p>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-sm mb-3">Protocol</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Whitepaper</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">GitHub</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-sm mb-3">Community</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Telegram</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Discord</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-sm mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Brand Kit</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border/30 pt-6 text-center text-xs text-muted-foreground">
          © 2026 StreamAI Protocol. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
