import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const rotatingWords = ["measure.", "decode.", "predict.", "optimize."];

// Enhanced Neural Network Animation
const HeroSection = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const nodesRef = useRef<any[]>([]);
  const connectionsRef = useRef<any[]>([]);
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Word rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Enhanced Neural Network Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
        initNeuralNetwork();
      }
    };

    const initNeuralNetwork = () => {
      nodesRef.current = [];
      connectionsRef.current = [];
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const maxRadius = Math.min(canvas.width, canvas.height) * 0.42;
      
      // Create neural nodes in concentric circles (brain-like structure)
      const layers = [
        { count: 1, radius: 0, nodeSize: 8 },
        { count: 8, radius: maxRadius * 0.15, nodeSize: 6 },
        { count: 16, radius: maxRadius * 0.3, nodeSize: 5 },
        { count: 24, radius: maxRadius * 0.45, nodeSize: 4 },
        { count: 32, radius: maxRadius * 0.6, nodeSize: 3 },
        { count: 48, radius: maxRadius * 0.75, nodeSize: 2.5 },
        { count: 64, radius: maxRadius * 0.9, nodeSize: 2 },
        { count: 80, radius: maxRadius * 1.05, nodeSize: 1.5 },
      ];
      
      layers.forEach((layer) => {
        for (let i = 0; i < layer.count; i++) {
          const angle = (Math.PI * 2 * i) / layer.count + Math.random() * 0.3;
          const radiusVariation = layer.radius * (0.9 + Math.random() * 0.2);
          const x = centerX + Math.cos(angle) * radiusVariation;
          const y = centerY + Math.sin(angle) * radiusVariation;
          
          nodesRef.current.push({
            x,
            y,
            baseX: x,
            baseY: y,
            size: layer.nodeSize,
            speed: 0.5 + Math.random() * 1.5,
            phase: Math.random() * Math.PI * 2,
            pulsePhase: Math.random() * Math.PI * 2,
            layer: layers.indexOf(layer),
          });
        }
      });
      
      // Create connections between nearby nodes
      nodesRef.current.forEach((node, i) => {
        nodesRef.current.forEach((otherNode, j) => {
          if (i < j) {
            const dx = node.x - otherNode.x;
            const dy = node.y - otherNode.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Connect nodes within certain distance
            if (distance < maxRadius * 0.25 && Math.random() > 0.3) {
              connectionsRef.current.push({
                from: i,
                to: j,
                distance,
                pulseOffset: Math.random() * Math.PI * 2,
              });
            }
          }
        });
      });
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      
      timeRef.current += 0.016;
      
      // Create gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.6
      );
      gradient.addColorStop(0, '#0a0a0a');
      gradient.addColorStop(0.5, '#050505');
      gradient.addColorStop(1, '#000000');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Update node positions with organic movement
      nodesRef.current.forEach(node => {
        const time = timeRef.current;
        const wobble = Math.sin(time * node.speed + node.phase) * 3;
        const wobble2 = Math.cos(time * node.speed * 0.7 + node.phase) * 2;
        
        node.x = node.baseX + wobble;
        node.y = node.baseY + wobble2;
        
        // Mouse interaction - nodes move away from cursor
        const dx = mouseRef.current.x - node.x;
        const dy = mouseRef.current.y - node.y;
        const mouseDistance = Math.sqrt(dx * dx + dy * dy);
        if (mouseDistance < 100) {
          const force = (100 - mouseDistance) / 100;
          node.x -= dx * force * 0.1;
          node.y -= dy * force * 0.1;
        }
      });
      
      // Draw connections with pulsing effect
      connectionsRef.current.forEach(conn => {
        const fromNode = nodesRef.current[conn.from];
        const toNode = nodesRef.current[conn.to];
        
        const pulse = Math.sin(timeRef.current * 2 + conn.pulseOffset) * 0.5 + 0.5;
        const baseOpacity = 0.08 + pulse * 0.12;
        
        // Distance from center affects opacity
        const avgX = (fromNode.x + toNode.x) / 2;
        const avgY = (fromNode.y + toNode.y) / 2;
        const distFromCenter = Math.sqrt((avgX - centerX) ** 2 + (avgY - centerY) ** 2);
        const maxRadius = Math.min(canvas.width, canvas.height) * 0.45;
        const centerFactor = Math.max(0, 1 - distFromCenter / maxRadius);
        
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.strokeStyle = `rgba(120, 180, 255, ${baseOpacity * centerFactor})`;
        ctx.lineWidth = 0.5 + pulse * 0.5;
        ctx.stroke();
        
        // Draw pulse traveling along connection
        const pulsePos = (timeRef.current * 0.5 + conn.pulseOffset) % 1;
        const pulseX = fromNode.x + (toNode.x - fromNode.x) * pulsePos;
        const pulseY = fromNode.y + (toNode.y - fromNode.y) * pulsePos;
        
        if (Math.random() > 0.97) {
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(100, 200, 255, ${0.6 * centerFactor})`;
          ctx.fill();
        }
      });
      
      // Draw nodes with glow effect
      nodesRef.current.forEach(node => {
        const distFromCenter = Math.sqrt((node.x - centerX) ** 2 + (node.y - centerY) ** 2);
        const maxRadius = Math.min(canvas.width, canvas.height) * 0.45;
        const centerFactor = Math.max(0, 1 - distFromCenter / maxRadius);
        
        const pulse = Math.sin(timeRef.current * 3 + node.pulsePhase) * 0.3 + 0.7;
        const size = node.size * pulse;
        
        // Outer glow
        const glowGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, size * 4);
        glowGradient.addColorStop(0, `rgba(80, 160, 255, ${0.3 * centerFactor})`);
        glowGradient.addColorStop(1, 'rgba(80, 160, 255, 0)');
        ctx.beginPath();
        ctx.arc(node.x, node.y, size * 4, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();
        
        // Core node
        ctx.beginPath();
        ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
        const coreOpacity = (0.6 + pulse * 0.4) * centerFactor;
        ctx.fillStyle = `rgba(200, 230, 255, ${coreOpacity})`;
        ctx.fill();
      });
      
      // Add floating particles
      for (let i = 0; i < 3; i++) {
        const particleX = centerX + Math.cos(timeRef.current * 0.5 + i * 2) * 150;
        const particleY = centerY + Math.sin(timeRef.current * 0.3 + i * 2) * 100;
        
        ctx.beginPath();
        ctx.arc(particleX, particleY, 1, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(150, 200, 255, 0.5)';
        ctx.fill();
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20 px-4 md:px-8">
      {/* Hero Container with rounded corners */}
      <div className="relative w-full max-w-[calc(100%-2rem)] md:max-w-[calc(100%-4rem)] h-[calc(100vh-6rem)] md:h-[calc(100vh-8rem)] rounded-2xl md:rounded-3xl overflow-hidden">
        {/* Canvas for neural network animation */}
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 w-full h-full cursor-crosshair"
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/60 text-sm md:text-base uppercase tracking-[0.3em] mb-6"
          >
            Neuroscience powered Branding Decisions
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <h1 className="text-white heading-xl flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <span className="font-light">We</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWordIndex}
                  initial={{ opacity: 0, y: 40, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -40, rotateX: 90 }}
                  transition={{ 
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="inline-block font-bold bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent"
                >
                  {rotatingWords[currentWordIndex]}
                </motion.span>
              </AnimatePresence>
            </h1>
          </motion.div>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-white/50 text-lg md:text-xl mt-8 max-w-xl"
          >
            Decode the secrets of Human Subconscious Mind to engage with your audience in a deeper way
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 mt-10"
          >
            <a 
              href="#news" 
              className="inline-flex items-center justify-center text-center px-8 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-all duration-300 hover:scale-105 min-w-0"
            >
              News
            </a>
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center text-center px-8 py-3 border-2 border-white/30 text-white font-medium rounded-full hover:border-white/60 hover:bg-white/10 transition-all duration-300 min-w-0"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
