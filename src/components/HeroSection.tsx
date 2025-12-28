import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const rotatingWords = ["measure.", "decode.", "predict.", "optimize."];

// Particle class for the brain animation
class Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  speed: number;
  angle: number;
  
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.baseX = x;
    this.baseY = y;
    this.size = Math.random() * 2 + 0.5;
    this.speed = Math.random() * 0.02 + 0.01;
    this.angle = Math.random() * Math.PI * 2;
  }
  
  update() {
    this.angle += this.speed;
    const range = 3;
    this.x = this.baseX + Math.cos(this.angle) * range;
    this.y = this.baseY + Math.sin(this.angle) * range;
  }
  
  draw(ctx: CanvasRenderingContext2D, opacity: number) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity * (0.3 + Math.random() * 0.4)})`;
    ctx.fill();
  }
}

const HeroSection = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();

  // Word rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Canvas particle animation - brain/neural network effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
        initParticles();
      }
    };

    const initParticles = () => {
      particlesRef.current = [];
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const maxRadius = Math.min(canvas.width, canvas.height) * 0.4;
      
      // Create particles in a spherical/brain-like distribution
      for (let i = 0; i < 2000; i++) {
        // Use gaussian-like distribution for denser center
        const angle = Math.random() * Math.PI * 2;
        const radiusRandom = Math.random();
        const radius = maxRadius * Math.sqrt(radiusRandom); // sqrt for uniform disk distribution
        
        // Add some 3D-like depth variation
        const depthFactor = Math.cos(angle * 2) * 0.3 + 0.7;
        const adjustedRadius = radius * depthFactor;
        
        const x = centerX + Math.cos(angle) * adjustedRadius * (0.8 + Math.random() * 0.4);
        const y = centerY + Math.sin(angle) * adjustedRadius * (0.8 + Math.random() * 0.4);
        
        particlesRef.current.push(new Particle(x, y));
      }
      
      // Add scattered particles around the edges
      for (let i = 0; i < 500; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = maxRadius * (0.9 + Math.random() * 0.5);
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        particlesRef.current.push(new Particle(x, y));
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const maxRadius = Math.min(canvas.width, canvas.height) * 0.4;
      
      particlesRef.current.forEach(particle => {
        particle.update();
        
        // Calculate distance from center for opacity falloff
        const dx = particle.x - centerX;
        const dy = particle.y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const opacity = Math.max(0, 1 - distance / (maxRadius * 1.5));
        
        particle.draw(ctx, opacity);
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
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
        {/* Canvas for particle animation */}
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />

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
