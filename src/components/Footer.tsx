import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Twitter, Instagram, Youtube, Send, MapPin } from "lucide-react";
import { useState } from "react";
import NMLogo from "./NMLogo";

const socialLinks = [
  { name: "LinkedIn", icon: Linkedin },
  { name: "Twitter", icon: Twitter },
  { name: "Instagram", icon: Instagram },
  { name: "YouTube", icon: Youtube },
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer id="contact" className="bg-section-dark overflow-hidden">
      {/* Main Content */}
      <div className="px-6 md:px-12 lg:px-20 py-10 md:py-12">
        <div className="container-custom">
          {/* Centered Brand Text */}
          <motion.div 
            className="flex justify-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block text-left">
              <span className="text-section-dark-foreground/50 text-sm font-medium tracking-wide">
                Powered by
              </span>
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold leading-none tracking-tight mt-1">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Neuromatter
                </span>
              </div>
              <div className="flex justify-end mt-1">
                <span className="text-4xl md:text-5xl lg:text-6xl font-bold leading-none tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                  Group
                </span>
              </div>
            </div>
          </motion.div>

          {/* Stay Updated - Compact */}
          <motion.div 
            className="max-w-sm mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-section-dark-foreground/60 text-xs uppercase tracking-widest mb-3 text-center">
              Stay Updated
            </h3>
            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2.5 pr-11 rounded-full bg-section-dark-foreground/5 border border-section-dark-foreground/20 text-section-dark-foreground placeholder:text-section-dark-foreground/40 text-sm focus:outline-none focus:border-blue-400/50 transition-colors"
                required
              />
              <button 
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center hover:scale-105 transition-transform"
              >
                {isSubscribed ? (
                  <span className="text-white text-xs">✓</span>
                ) : (
                  <Send className="w-3.5 h-3.5 text-white" />
                )}
              </button>
            </form>
          </motion.div>

          {/* Middle Row: Contact + Social + Location */}
          <motion.div 
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 py-6 border-t border-b border-section-dark-foreground/10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Contact Info - Compact */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <a 
                href="mailto:Contact@neuromatter.com"
                className="group inline-flex items-center gap-2 text-sm font-medium text-section-dark-foreground hover:text-blue-400 transition-colors"
              >
                <Mail className="w-4 h-4 opacity-60" />
                Contact@neuromatter.com
              </a>
              <span className="hidden sm:block text-section-dark-foreground/20">|</span>
              <a 
                href="tel:+918302771619"
                className="group inline-flex items-center gap-2 text-sm font-medium text-section-dark-foreground/80 hover:text-blue-400 transition-colors"
              >
                <Phone className="w-4 h-4 opacity-60" />
                +91 8302771619
              </a>
            </div>

            {/* Social Links - Compact */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.div
                  key={social.name}
                  className="w-9 h-9 rounded-full bg-section-dark-foreground/5 border border-section-dark-foreground/10 flex items-center justify-center hover:bg-section-dark-foreground/10 hover:border-section-dark-foreground/30 transition-all group cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-4 h-4 text-section-dark-foreground/60 group-hover:text-section-dark-foreground transition-colors" />
                </motion.div>
              ))}
            </div>

            {/* Location */}
            <div className="inline-flex items-center gap-2 text-section-dark-foreground/60 text-sm">
              <MapPin className="w-4 h-4" />
              <span>HSR Layout, Bengaluru</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-section-dark-foreground/10 py-5 px-6 md:px-12 lg:px-20">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo & Copyright */}
            <div className="flex items-center gap-3">
              <NMLogo size="sm" />
              <p className="text-section-dark-foreground/40 text-xs">
                © 2026 Neuromatter Group. All rights reserved.
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-4 text-section-dark-foreground/40 text-xs">
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
