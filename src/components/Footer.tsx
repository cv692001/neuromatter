import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-section-dark py-12 px-6 md:px-12 lg:px-20">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-10 h-10 bg-section-dark-foreground rounded-full flex items-center justify-center">
              <span className="text-section-dark font-bold text-lg">N</span>
            </div>
            <span className="text-section-dark-foreground font-semibold">
              Neuro-Insight
            </span>
          </motion.div>

          {/* Newsletter Signup */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <p className="text-section-dark-foreground/60 text-sm">
              Keep up with Neuro-Insight
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-full bg-section-dark-foreground/10 border border-section-dark-foreground/20 text-section-dark-foreground placeholder:text-section-dark-foreground/40 text-sm focus:outline-none focus:border-section-dark-foreground/50 transition-colors"
              />
              <button className="btn-outline border-section-dark-foreground text-section-dark-foreground hover:bg-section-dark-foreground hover:text-section-dark text-xs py-2">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-section-dark-foreground/10 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-section-dark-foreground/40 text-sm">
            <p>© {currentYear} Neuro-Insight. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-section-dark-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-section-dark-foreground transition-colors">
                Cookie Policy
              </a>
              <a href="#" className="hover:text-section-dark-foreground transition-colors">
                Terms of Use
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
