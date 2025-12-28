import { motion } from "framer-motion";
import { Mail, Linkedin, Twitter, Instagram, Youtube, Send, ArrowRight } from "lucide-react";
import { useState } from "react";

const socialLinks = [
  { name: "LinkedIn", icon: Linkedin, url: "https://linkedin.com/company/neuromatter" },
  { name: "Twitter", icon: Twitter, url: "https://twitter.com/neuromatter" },
  { name: "Instagram", icon: Instagram, url: "https://instagram.com/neuromatter" },
  { name: "YouTube", icon: Youtube, url: "https://youtube.com/@neuromatter" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
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
      <div className="section-padding pb-16">
        <div className="container-custom">
          {/* Big Centered Text */}
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-section-dark-foreground/90 leading-tight tracking-tight">
              Powered by
            </h2>
            <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Neuromatter Group
              </span>
            </h2>
          </motion.div>

          {/* Contact & Subscribe Row */}
          <motion.div 
            className="grid md:grid-cols-2 gap-12 lg:gap-20 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Email Contact */}
            <div className="text-center md:text-left">
              <h3 className="text-section-dark-foreground/60 text-sm uppercase tracking-widest mb-4">
                Get in Touch
              </h3>
              <a 
                href="mailto:hello@neuromatter.com"
                className="group inline-flex items-center gap-3 text-2xl md:text-3xl font-semibold text-section-dark-foreground hover:text-blue-400 transition-colors"
              >
                <Mail className="w-7 h-7 opacity-60 group-hover:opacity-100 transition-opacity" />
                hello@neuromatter.com
              </a>
              <p className="text-section-dark-foreground/50 mt-4 max-w-md">
                Ready to unlock the power of neuroscience for your brand? Let's talk.
              </p>
            </div>

            {/* Newsletter Subscribe */}
            <div className="text-center md:text-left">
              <h3 className="text-section-dark-foreground/60 text-sm uppercase tracking-widest mb-4">
                Stay Updated
              </h3>
              <form onSubmit={handleSubscribe} className="relative max-w-md mx-auto md:mx-0">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-6 py-4 pr-14 rounded-full bg-section-dark-foreground/5 border border-section-dark-foreground/20 text-section-dark-foreground placeholder:text-section-dark-foreground/40 text-base focus:outline-none focus:border-blue-400/50 transition-colors"
                  required
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center hover:scale-105 transition-transform"
                >
                  {isSubscribed ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      ✓
                    </motion.div>
                  ) : (
                    <Send className="w-4 h-4 text-white" />
                  )}
                </button>
              </form>
              {isSubscribed && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-sm mt-3"
                >
                  Thanks for subscribing!
                </motion.p>
              )}
              <p className="text-section-dark-foreground/40 text-sm mt-3">
                Monthly insights on neuromarketing. No spam, unsubscribe anytime.
              </p>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-section-dark-foreground/60 text-sm uppercase tracking-widest mb-6">
              Connect With Us
            </h3>
            <div className="flex justify-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-section-dark-foreground/5 border border-section-dark-foreground/10 flex items-center justify-center hover:bg-section-dark-foreground/10 hover:border-section-dark-foreground/30 transition-all group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5 text-section-dark-foreground/60 group-hover:text-section-dark-foreground transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Office Locations */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {['New York', 'London', 'Sydney', 'Singapore'].map((city) => (
              <div key={city}>
                <p className="text-section-dark-foreground/80 font-medium">{city}</p>
                <p className="text-section-dark-foreground/40 text-sm">Office</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-section-dark-foreground/10 py-8 px-6 md:px-12 lg:px-20">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo & Copyright */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                <span className="text-white font-bold text-sm">NM</span>
              </div>
              <p className="text-section-dark-foreground/40 text-sm">
                © {currentYear} Neuromatter Group. All rights reserved.
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
