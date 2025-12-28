import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

// Placeholder logo - replace with your own PNG
const logoPlaceholder = "/placeholder.svg";

const navItems = [
  { name: "Capabilities", href: "#capabilities" },
  { name: "Work", href: "#work" },
  { name: "Difference", href: "#difference" },
  { name: "Technology", href: "#technology" },
  { name: "People", href: "#people" },
  { name: "News", href: "#news" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const sectionId = href.replace("#", "");
    const section = document.getElementById(sectionId);
    
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-nav">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20 px-6 md:px-12 lg:px-20">
          {/* Logo - Editable PNG */}
          <a href="/" className="flex items-center">
            <img 
              src={logoPlaceholder}
              alt="Neuro-Insight Logo"
              className="w-10 h-10 object-contain"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="nav-link"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Contact Button */}
          <div className="hidden lg:block">
            <a 
              href="#contact" 
              onClick={(e) => handleNavClick(e, "#contact")}
              className="btn-outline text-xs py-2 px-5"
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-nav-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-nav-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-nav border-t border-border"
          >
            <nav className="flex flex-col py-6 px-6">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="nav-link py-3 border-b border-border last:border-b-0"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.name}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                className="btn-primary mt-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                onClick={(e) => handleNavClick(e, "#contact")}
              >
                Contact
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
