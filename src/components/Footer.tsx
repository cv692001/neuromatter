import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Instagram, MapPin, Sparkles } from "lucide-react";
import NMLogo from "./NMLogo";
import EmailCaptureBar from "./EmailCaptureBar";

const socialLinks = [
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://in.linkedin.com/company/neuromatter",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://www.instagram.com/neuro_matter/",
  },
];

const Footer = () => {
  return (
    <footer className="bg-section-dark overflow-hidden">
      {/* Main Content */}
      <div className="px-6 md:px-12 lg:px-20 py-10 md:py-12">
        <div className="container-custom">
          {/* Brand + Waitlist — side by side */}
          <div id="contact" className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-10">
            {/* Left: Brand Text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block">
                <span className="text-section-dark-foreground/50 text-sm font-medium tracking-wide">
                  Powered by
                </span>
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold leading-none tracking-tight mt-1">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Neuromatter
                  </span>
                </div>
                <div className="text-right mt-1">
                  <span className="text-4xl md:text-5xl lg:text-6xl font-bold leading-none tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                    Group
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Right: Join the Waitlist */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 md:p-10">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
                </div>
                <div className="relative z-10 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-5">
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                    <span className="text-white/80 text-sm font-medium">Ready to unlock consumer insights?</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-wide">
                    JOIN THE WAITLIST TODAY
                  </h2>
                  <p className="text-white/60 text-sm md:text-base mb-6">
                    Enter your details below &amp; our team will contact you shortly
                  </p>
                  <EmailCaptureBar variant="lightOnDark" className="max-w-sm" showLabel={false} />
                </div>
              </div>
            </motion.div>
          </div>

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
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-9 h-9 rounded-full bg-section-dark-foreground/5 border border-section-dark-foreground/10 flex items-center justify-center hover:bg-section-dark-foreground/10 hover:border-section-dark-foreground/30 transition-all group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-4 h-4 text-section-dark-foreground/60 group-hover:text-section-dark-foreground transition-colors" />
                </motion.a>
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
