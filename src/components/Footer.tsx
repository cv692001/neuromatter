import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Phone, Linkedin, Instagram, MapPin, Sparkles } from "lucide-react";
import NMLogo from "./NMLogo";
import EmailCaptureBar from "./EmailCaptureBar";

const socialLinks = [
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://in.linkedin.com/company/neuromatter",
    className: "bg-[#0A66C2] hover:bg-[#0a5cb0] border-transparent",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://www.instagram.com/neuro_matter/",
    className:
      "bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5] hover:opacity-90 border-transparent",
  },
];

const quickLinks = [
  { name: "What is Neuromarketing", href: "#about" },
  { name: "Offerings", href: "/offerings", isRoute: true },
  { name: "Technology", href: "/technology", isRoute: true },
  { name: "News", href: "/news", isRoute: true },
  { name: "Blogs", href: "/news", isRoute: true },
  { name: "FAQs", href: "#faq" },
];

// Second tier — sub-topics that deep-link into sections of the main pages.
const subLinkGroups = [
  {
    title: "Offerings",
    links: [
      { name: "Conversion Diagnostics", pathname: "/offerings", hash: "#conversion-diagnostics" },
      { name: "Conversion Architecture", pathname: "/offerings", hash: "#conversion-architecture" },
      { name: "Market Command", pathname: "/offerings", hash: "#market-command" },
    ],
  },
  {
    title: "Technology",
    links: [
      { name: "The Components", pathname: "/technology", hash: "#components" },
      { name: "The Framework", pathname: "/technology", hash: "#framework" },
      { name: "Performance Report", pathname: "/technology", hash: "#performance-report" },
    ],
  },
];

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleQuickLink = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    isRoute?: boolean
  ) => {
    e.preventDefault();

    if (isRoute) {
      navigate(href);
      window.scrollTo(0, 0);
      return;
    }

    const sectionId = href.replace("#", "");
    if (location.pathname === "/") {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/${href}`);
    }
  };

  return (
    <footer className="bg-section-dark overflow-hidden">
      {/* Main Content */}
      <div className="px-6 md:px-12 lg:px-20 py-10 md:py-12">
        <div className="container-custom">
          {/* Brand + Contact — side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start mb-10">
            {/* Left: Brand + Links (mobile: below contact) */}
            <div className="order-2 md:order-1">
              {/* Brand Text */}
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

              {/* Quick Links */}
              <motion.div
                className="mt-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <h3 className="text-section-dark-foreground font-semibold text-sm tracking-wide uppercase mb-4">
                  Quick Links
                </h3>
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                  {quickLinks.map((link) =>
                    link.isRoute ? (
                      <Link
                        key={link.name}
                        to={link.href}
                        onClick={() => window.scrollTo(0, 0)}
                        className="text-sm text-section-dark-foreground/60 hover:text-section-dark-foreground transition-colors"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => handleQuickLink(e, link.href, link.isRoute)}
                        className="text-sm text-section-dark-foreground/60 hover:text-section-dark-foreground transition-colors"
                      >
                        {link.name}
                      </a>
                    )
                  )}
                </div>

                {/* Sub-topics of the main categories */}
                <div className="mt-6 pt-6 border-t border-section-dark-foreground/10 grid grid-cols-2 gap-x-4 gap-y-6">
                  {subLinkGroups.map((group) => (
                    <div key={group.title}>
                      <h4 className="text-section-dark-foreground/70 text-xs font-semibold uppercase tracking-wide mb-3">
                        {group.title}
                      </h4>
                      <div className="flex flex-col gap-2">
                        {group.links.map((link) => (
                          <Link
                            key={link.name}
                            to={{ pathname: link.pathname, hash: link.hash }}
                            className="text-sm text-section-dark-foreground/50 hover:text-section-dark-foreground transition-colors"
                          >
                            {link.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right: Contact Us (mobile: on top) */}
            <motion.div
              id="contact"
              className="order-1 md:order-2 scroll-mt-24"
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
                    CONTACT US TODAY
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

            {/* Social Links - Coloured brand logos */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all shadow-sm ${social.className}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-4 h-4 text-white" />
                </motion.a>
              ))}
            </div>

            {/* Location */}
            <div className="inline-flex items-start gap-2 text-section-dark-foreground/60 text-sm md:max-w-xs">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
              <span>
                No.1794, 36/3, 27th Main Rd, near Power Station, 2nd Sector, ITI
                Layout, HSR Layout, Bengaluru, Karnataka 560102
              </span>
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
              <NMLogo size="sm" src="/neuromatter-logo-white.png" />
              <p className="text-section-dark-foreground/40 text-xs">
                © 2026 Neuromatter Group. All rights reserved.
              </p>
            </div>

            {/* Legal Links — separated by dots */}
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-section-dark-foreground/40 text-xs">
              <Link to="/privacy" className="hover:text-section-dark-foreground transition-colors">
                Privacy Policy
              </Link>
              <span aria-hidden="true" className="text-section-dark-foreground/30">
                &middot;
              </span>
              <a href="#" className="hover:text-section-dark-foreground transition-colors">
                Cookie Policy
              </a>
              <span aria-hidden="true" className="text-section-dark-foreground/30">
                &middot;
              </span>
              <Link to="/terms" className="hover:text-section-dark-foreground transition-colors">
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
