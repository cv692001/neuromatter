import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import NMLogo from "./NMLogo";

const navItems = [
  { name: "Capabilities", href: "#capabilities" },
  { 
    name: "Offerings", 
    href: "#offerings",
    hasDropdown: true,
    dropdownItems: [
      { name: "Consumer Research", href: "#consumer-research" },
      { name: "Ad Testing", href: "#ad-testing" },
      { name: "Brand Strategy", href: "#brand-strategy" },
      { name: "Content Optimization", href: "#content-optimization" },
      { name: "UX Research", href: "#ux-research" },
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <>
      {/* Desktop - Side Navigation */}
      <nav className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-50 flex-col gap-3">
        {/* Logo at top */}
        <motion.a
          href="/"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className={`
            w-12 h-12 rounded-full flex items-center justify-center mb-4
            transition-all duration-300
            ${scrolled 
              ? 'bg-white shadow-lg border border-gray-200' 
              : 'bg-white/10 backdrop-blur-md border border-white/20'
            }
          `}
        >
          <NMLogo size="sm" variant={scrolled ? "dark" : "light"} />
        </motion.a>

        {/* Nav Items */}
        {navItems.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="relative group"
            onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <a
              href={item.href}
              onClick={(e) => !item.hasDropdown && handleNavClick(e, item.href)}
              className={`
                w-12 h-12 rounded-full flex items-center justify-center
                transition-all duration-300 relative
                ${scrolled 
                  ? 'bg-white shadow-lg border border-gray-200 text-gray-600 hover:text-black hover:scale-110' 
                  : 'bg-white/10 backdrop-blur-md border border-white/20 text-white/70 hover:text-white hover:bg-white/20 hover:scale-110'
                }
              `}
            >
              <span className="text-xs font-bold">{item.name.slice(0, 2).toUpperCase()}</span>
            </a>
            
            {/* Tooltip */}
            <div className={`
              absolute left-full ml-3 top-1/2 -translate-y-1/2 
              px-3 py-1.5 rounded-lg whitespace-nowrap
              opacity-0 group-hover:opacity-100 pointer-events-none
              transition-all duration-200 transform translate-x-2 group-hover:translate-x-0
              ${scrolled 
                ? 'bg-black text-white' 
                : 'bg-white text-black'
              }
            `}>
              <span className="text-sm font-medium">{item.name}</span>
              {item.hasDropdown && <ChevronRight className="w-3 h-3 inline ml-1" />}
            </div>

            {/* Dropdown */}
            {item.hasDropdown && (
              <AnimatePresence>
                {activeDropdown === item.name && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="absolute left-full ml-3 top-0 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden min-w-[200px] pointer-events-auto"
                  >
                    {item.dropdownItems?.map((dropdownItem) => (
                      <a
                        key={dropdownItem.name}
                        href={dropdownItem.href}
                        onClick={(e) => handleNavClick(e, dropdownItem.href)}
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-black transition-colors"
                      >
                        {dropdownItem.name}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </motion.div>
        ))}

        {/* Contact Button */}
        <motion.a
          href="#contact"
          onClick={(e) => handleNavClick(e, "#contact")}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className={`
            w-12 h-12 rounded-full flex items-center justify-center mt-4
            transition-all duration-300 font-bold text-xs
            ${scrolled 
              ? 'bg-black text-white hover:scale-110' 
              : 'bg-white text-black hover:scale-110'
            }
          `}
        >
          GO
        </motion.a>
      </nav>

      {/* Mobile - Top Bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 p-4">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`
            flex items-center justify-between h-14 px-4 rounded-2xl
            transition-all duration-300
            ${scrolled 
              ? 'bg-white shadow-lg border border-gray-200' 
              : 'bg-white/10 backdrop-blur-md border border-white/20'
            }
          `}
        >
          <a href="/" className="flex items-center">
            <NMLogo size="sm" variant={scrolled ? "dark" : "light"} />
          </a>
          
          <button
            className={`
              p-2 rounded-full transition-colors
              ${scrolled ? 'hover:bg-gray-100 text-gray-700' : 'hover:bg-white/10 text-white'}
            `}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </motion.div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
            >
              <nav className="p-3">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 font-medium"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    onClick={(e) => handleNavClick(e, item.href)}
                  >
                    {item.name}
                  </motion.a>
                ))}
                <motion.a
                  href="#contact"
                  className="block mt-2 px-4 py-3 bg-black text-white text-center font-semibold rounded-xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  onClick={(e) => handleNavClick(e, "#contact")}
                >
                  Contact Us
                </motion.a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
