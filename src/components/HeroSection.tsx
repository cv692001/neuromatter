import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-particles.jpg";

const rotatingWords = ["measure.", "decode.", "predict.", "optimize."];

const HeroSection = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToContent = () => {
    const nextSection = document.getElementById("about");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20 px-4 md:px-8">
      {/* Hero Container with rounded corners */}
      <div className="relative w-full max-w-[calc(100%-2rem)] md:max-w-[calc(100%-4rem)] h-[calc(100vh-6rem)] md:h-[calc(100vh-8rem)] rounded-2xl md:rounded-3xl overflow-hidden">
        {/* Background Image */}
        <img 
          src={heroImage}
          alt="Neural network visualization"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <h1 className="text-white heading-xl flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <span>We</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWordIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block"
                >
                  {rotatingWords[currentWordIndex]}
                </motion.span>
              </AnimatePresence>
            </h1>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.button
            onClick={scrollToContent}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            aria-label="Scroll to content"
          >
            <div className="w-12 h-12 rounded-full border-2 border-white/50 flex items-center justify-center hover:border-white transition-colors">
              <ChevronDown className="w-6 h-6 text-white" />
            </div>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
