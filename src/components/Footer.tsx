import { motion } from "framer-motion";

// Placeholder logo - same as header
const logoPlaceholder = "/placeholder.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-section-dark py-16 px-6 md:px-12 lg:px-20">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 mb-12">
          {/* Logo */}
          <motion.a 
            href="/"
            className="flex items-center"
            whileHover={{ scale: 1.02 }}
          >
            <img 
              src={logoPlaceholder}
              alt="Neuro-Insight Logo"
              className="w-12 h-12 object-contain"
            />
          </motion.a>

          {/* Newsletter Signup */}
          <div className="flex flex-col gap-4 w-full lg:w-auto">
            <p className="text-section-dark-foreground text-lg font-medium">
              Keep up with Neuro-Insight
            </p>
            <p className="text-section-dark-foreground/60 text-sm max-w-md">
              Subscribe to our monthly newsletter for company updates and to stay up to date on the latest in the world of neuromarketing!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 rounded-full bg-section-dark-foreground/10 border border-section-dark-foreground/20 text-section-dark-foreground placeholder:text-section-dark-foreground/40 text-sm focus:outline-none focus:border-section-dark-foreground/50 transition-colors min-w-[250px]"
              />
              <button className="btn-outline border-section-dark-foreground text-section-dark-foreground hover:bg-section-dark-foreground hover:text-section-dark text-sm py-3 px-8 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="border-t border-section-dark-foreground/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright & Powered By */}
            <div className="flex flex-col gap-1 text-center md:text-left">
              <p className="text-section-dark-foreground/40 text-sm">
                © {currentYear} Neuro-Insight. All rights reserved.
              </p>
              <p className="text-section-dark-foreground/60 text-sm">
                Powered by <span className="text-section-dark-foreground/80 font-medium">Neuromatter Group</span>
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6 text-section-dark-foreground/40 text-sm">
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
