import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import NMLogo from "./NMLogo";

const navItems = [
  { name: "Capabilities", href: "#capabilities" },
  { 
    name: "Offerings", 
    href: "#offerings",
    hasDropdown: true,
    dropdownItems: [
      { name: "Consumer Research", href: "#consumer-research", description: "Deep insights into consumer behavior" },
      { name: "Ad Testing", href: "#ad-testing", description: "Measure ad effectiveness with neuroscience" },
      { name: "Brand Strategy", href: "#brand-strategy", description: "Build stronger brand connections" },
      { name: "Content Optimization", href: "#content-optimization", description: "Maximize content engagement" },
      { name: "UX Research", href: "#ux-research", description: "Enhance user experiences" },
    ]
  },
  { name: "Work", href: "#work" },
  { name: "Difference", href: "#difference" },
  { name: "Technology", href: "#technology" },
  { name: "News", href: "#news" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const sectionId = href.replace("#", "");
    const section = document.getElementById(sectionId);
    
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-nav">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20 px-6 md:px-12 lg:px-20">
          {/* Logo - NM */}
          <a href="/" className="flex items-center">
            <NMLogo size="md" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <div 
                key={item.name} 
                className="relative"
                onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={item.href}
                  onClick={(e) => !item.hasDropdown && handleNavClick(e, item.href)}
                  className="nav-link flex items-center gap-1"
                >
                  {item.name}
                  {item.hasDropdown && (
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                  )}
                </a>
                
                {/* Dropdown Menu */}
                {item.hasDropdown && (
                  <AnimatePresence>
                    {activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                      >
                        <div className="p-2">
                          {item.dropdownItems?.map((dropdownItem, idx) => (
                            <a
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              onClick={(e) => handleNavClick(e, dropdownItem.href)}
                              className="block px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors group"
                            >
                              <span className="block text-sm font-semibold text-gray-900 group-hover:text-primary">
                                {dropdownItem.name}
                              </span>
                              <span className="block text-xs text-gray-500 mt-0.5">
                                {dropdownItem.description}
                              </span>
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
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
                <div key={item.name}>
                  <motion.a
                    href={item.href}
                    className="nav-link py-3 border-b border-border flex items-center justify-between"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={(e) => {
                      if (item.hasDropdown) {
                        e.preventDefault();
                        setActiveDropdown(activeDropdown === item.name ? null : item.name);
                      } else {
                        handleNavClick(e, item.href);
                      }
                    }}
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                    )}
                  </motion.a>
                  
                  {/* Mobile Dropdown */}
                  {item.hasDropdown && activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 border-b border-border"
                    >
                      {item.dropdownItems?.map((dropdownItem) => (
                        <a
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          onClick={(e) => handleNavClick(e, dropdownItem.href)}
                          className="block py-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {dropdownItem.name}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </div>
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
