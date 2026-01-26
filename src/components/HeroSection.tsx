import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const rotatingWords = ["measure.", "decode.", "predict.", "optimize."];

// Neural Network Animation
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

  // Neural Network Canvas Animation
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
        { count: 6, radius: maxRadius * 0.15, nodeSize: 6 },
        { count: 12, radius: maxRadius * 0.3, nodeSize: 5 },
        { count: 18, radius: maxRadius * 0.45, nodeSize: 4 },
        { count: 24, radius: maxRadius * 0.6, nodeSize: 3 },
        { count: 32, radius: maxRadius * 0.75, nodeSize: 2.5 },
        { count: 40, radius: maxRadius * 0.9, nodeSize: 2 },
        { count: 48, radius: maxRadius * 1.05, nodeSize: 1.5 },
      ];
      
      layers.forEach((layer) => {
        for (let i = 0; i < layer.count; i++) {
          const angle = (Math.PI * 2 * i) / layer.count + Math.random() * 0.3;
          const radiusVariation = layer.radius * (0.9 + Math.random() * 0.2);
          const x = centerX + Math.cos(angle) * radiusVariation;
          const y = centerY + Math.sin(angle) * radiusVariation;
          
          // Assign random brightness - some very bright, some dim
          const brightnessRoll = Math.random();
          let brightness: number;
          if (brightnessRoll > 0.85) {
            brightness = 1.0; // Very bright (15%)
          } else if (brightnessRoll > 0.6) {
            brightness = 0.7; // Medium bright (25%)
          } else {
            brightness = 0.3; // Dim (60%)
          }
          
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
            brightness,
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
            
            // Connect nodes within certain distance - more connections
            if (distance < maxRadius * 0.2 && Math.random() > 0.2) {
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
      
      // Create gradient background with subtle blue ambient glow
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.7
      );
      gradient.addColorStop(0, '#0d0d12'); // Slight blue tint in center
      gradient.addColorStop(0.3, '#080810');
      gradient.addColorStop(0.6, '#050508');
      gradient.addColorStop(1, '#000000');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add ambient blue glow in the center
      const ambientGlow = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.min(canvas.width, canvas.height) * 0.5
      );
      ambientGlow.addColorStop(0, 'rgba(50, 80, 150, 0.15)');
      ambientGlow.addColorStop(0.4, 'rgba(40, 70, 140, 0.08)');
      ambientGlow.addColorStop(1, 'rgba(30, 50, 120, 0)');
      ctx.fillStyle = ambientGlow;
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
      
      // Draw connections with INTENSE pulsing glow effect
      connectionsRef.current.forEach(conn => {
        const fromNode = nodesRef.current[conn.from];
        const toNode = nodesRef.current[conn.to];
        
        const pulse = Math.sin(timeRef.current * 2 + conn.pulseOffset) * 0.5 + 0.5;
        const baseOpacity = 0.15 + pulse * 0.2; // Much brighter
        
        // Distance from center affects opacity
        const avgX = (fromNode.x + toNode.x) / 2;
        const avgY = (fromNode.y + toNode.y) / 2;
        const distFromCenter = Math.sqrt((avgX - centerX) ** 2 + (avgY - centerY) ** 2);
        const maxRadius = Math.min(canvas.width, canvas.height) * 0.45;
        const centerFactor = Math.max(0, 1 - distFromCenter / maxRadius);
        
        // Glow effect on connections
        ctx.save();
        ctx.shadowColor = 'rgba(100, 150, 255, 0.8)';
        ctx.shadowBlur = 12;
        
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.strokeStyle = `rgba(120, 160, 255, ${(baseOpacity * 2.5) * centerFactor})`;
        ctx.lineWidth = 1 + pulse * 1.5;
        ctx.stroke();
        ctx.restore();
        
        // Draw pulse traveling along connection - larger and brighter
        const pulsePos = (timeRef.current * 0.5 + conn.pulseOffset) % 1;
        const pulseX = fromNode.x + (toNode.x - fromNode.x) * pulsePos;
        const pulseY = fromNode.y + (toNode.y - fromNode.y) * pulsePos;
        
        if (Math.random() > 0.92) {
          // Glowing traveling pulse
          const pulseGlow = ctx.createRadialGradient(pulseX, pulseY, 0, pulseX, pulseY, 8);
          pulseGlow.addColorStop(0, `rgba(200, 220, 255, ${1.0 * centerFactor})`);
          pulseGlow.addColorStop(0.4, `rgba(150, 180, 255, ${0.6 * centerFactor})`);
          pulseGlow.addColorStop(1, 'rgba(100, 150, 255, 0)');
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 8, 0, Math.PI * 2);
          ctx.fillStyle = pulseGlow;
          ctx.fill();
        }
      });
      
      // Draw nodes with glow effect - INTENSE illumination
      nodesRef.current.forEach(node => {
        const distFromCenter = Math.sqrt((node.x - centerX) ** 2 + (node.y - centerY) ** 2);
        const maxRadius = Math.min(canvas.width, canvas.height) * 0.45;
        const centerFactor = Math.max(0, 1 - distFromCenter / maxRadius);
        
        const pulse = Math.sin(timeRef.current * 3 + node.pulsePhase) * 0.3 + 0.7;
        const size = node.size * pulse;
        const brightness = node.brightness || 0.5;
        
        // LARGE outer glow - royal blue tint - much bigger and brighter
        const glowSize = size * (8 + brightness * 12); // Much bigger glow
        const glowGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowSize);
        glowGradient.addColorStop(0, `rgba(100, 150, 255, ${1.0 * centerFactor * brightness})`);
        glowGradient.addColorStop(0.2, `rgba(80, 130, 255, ${0.8 * centerFactor * brightness})`);
        glowGradient.addColorStop(0.5, `rgba(65, 105, 225, ${0.4 * centerFactor * brightness})`);
        glowGradient.addColorStop(1, 'rgba(65, 105, 225, 0)');
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();
        
        // Secondary glow layer for extra intensity
        const glow2Size = size * (4 + brightness * 6);
        const glow2Gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glow2Size);
        glow2Gradient.addColorStop(0, `rgba(150, 180, 255, ${0.9 * centerFactor * brightness})`);
        glow2Gradient.addColorStop(0.5, `rgba(100, 140, 255, ${0.4 * centerFactor * brightness})`);
        glow2Gradient.addColorStop(1, 'rgba(80, 120, 255, 0)');
        ctx.beginPath();
        ctx.arc(node.x, node.y, glow2Size, 0, Math.PI * 2);
        ctx.fillStyle = glow2Gradient;
        ctx.fill();
        
        // Core node - very bright
        ctx.beginPath();
        ctx.arc(node.x, node.y, size * 1.2, 0, Math.PI * 2);
        const coreOpacity = (0.5 + brightness * 0.5 + pulse * 0.1) * centerFactor;
        ctx.fillStyle = `rgba(200, 220, 255, ${coreOpacity})`;
        ctx.fill();
        
        // Hot white center point - for all visible nodes
        if (brightness > 0.3) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, size * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${coreOpacity * brightness * 1.2})`;
          ctx.fill();
        }
      });
      
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20 px-4 md:px-8 lg:pl-24">
      {/* Hero Container with rounded corners */}
      <div className="relative w-full max-w-[calc(100%-2rem)] md:max-w-[calc(100%-4rem)] h-[calc(100vh-6rem)] md:h-[calc(100vh-8rem)] rounded-2xl md:rounded-3xl overflow-hidden">
        {/* Canvas for neural network animation */}
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 w-full h-full cursor-crosshair"
        />

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50 z-[5]" />
        
        {/* Center vignette for text area */}
        <div className="absolute inset-0 z-[6]" style={{
          background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(0,0,0,0.7) 0%, transparent 70%)'
        }} />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/80 text-sm md:text-base uppercase tracking-[0.3em] mb-6 font-medium drop-shadow-lg"
          >
            Neuroscience Powered Marketing Insights
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <h1 className="text-white heading-xl flex flex-col sm:flex-row items-center gap-2 sm:gap-4 drop-shadow-2xl">
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
                  className="inline-block font-bold text-white"
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
            className="text-white/70 text-lg md:text-xl mt-8 max-w-xl drop-shadow-lg"
          >
            Decode the secrets of human mind to drive Strategic Branding decisions
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-10"
          >
            <a 
              href="#contact" 
              className="px-10 py-4 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-2xl"
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
