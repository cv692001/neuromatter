import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { Brain, Zap, BarChart3, Activity } from "lucide-react";

const TechnologySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="technology" className="section-padding bg-section-dark overflow-hidden">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full mb-6"
          >
            <Activity className="w-4 h-4 text-white/70" />
            <span className="text-white/70 text-sm font-medium">Advanced Neurotechnology</span>
          </motion.div>
          
          <h2 className="heading-lg text-section-dark-foreground mb-6">
            Our Technology
          </h2>
          <p className="body-lg text-section-dark-foreground/70 max-w-2xl mx-auto">
            Advanced brain imaging methodology for marketing applications powered by neuroscience.
          </p>
        </motion.div>

        {/* Main Visual + Features Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Brain Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <BrainVisualization isInView={isInView} />
          </motion.div>

          {/* Right: Feature List */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {[
              {
                icon: Brain,
                title: "BCI-EEG Brain Imaging",
                description: "Cutting-edge technology that measures second-by-second brain response with millisecond precision.",
              },
              {
                icon: Zap,
                title: "Real-time Analysis",
                description: "Instant insights into memory encoding, emotional engagement, and attention patterns.",
              },
              {
                icon: BarChart3,
                title: "Predictive Analytics",
                description: "Transform brain data into actionable predictions for campaign effectiveness.",
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.15 }}
                className="group flex gap-5 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-white/10">
                  <item.icon className="w-6 h-6 text-white/80" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-section-dark-foreground mb-1 group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-section-dark-foreground/60 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Brain Visualization Component with animated waves
const BrainVisualization = ({ isInView }: { isInView: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!isInView) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };

    resize();
    window.addEventListener('resize', resize);

    let time = 0;
    const waves: { offset: number; amplitude: number; frequency: number; opacity: number }[] = [
      { offset: 0, amplitude: 20, frequency: 0.02, opacity: 0.6 },
      { offset: 50, amplitude: 15, frequency: 0.025, opacity: 0.4 },
      { offset: 100, amplitude: 25, frequency: 0.015, opacity: 0.3 },
      { offset: 150, amplitude: 18, frequency: 0.03, opacity: 0.2 },
    ];

    const animate = () => {
      ctx.fillStyle = 'rgba(20, 20, 20, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerY = canvas.height / 2;

      waves.forEach((wave) => {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${wave.opacity})`;
        ctx.lineWidth = 2;

        for (let x = 0; x < canvas.width; x++) {
          const y = centerY + wave.offset + 
            Math.sin((x * wave.frequency) + time * 2) * wave.amplitude +
            Math.sin((x * wave.frequency * 0.5) + time * 1.5) * (wave.amplitude * 0.5);
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      });

      // Add glowing dots at peaks
      waves.forEach((wave, i) => {
        const x = (time * 50 + i * 100) % canvas.width;
        const y = centerY + wave.offset + 
          Math.sin((x * wave.frequency) + time * 2) * wave.amplitude;
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 8);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${wave.opacity})`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fill();
      });

      time += 0.016;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isInView]);

  return (
    <div className="relative aspect-square max-w-md mx-auto">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-full blur-3xl" />
      
      {/* Brain outline SVG */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <Brain className="w-48 h-48 text-white" />
      </div>
      
      {/* EEG Wave Canvas */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full rounded-3xl"
      />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-section-dark via-transparent to-transparent rounded-3xl" />
      
      {/* Corner accents */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/30 rounded-tl-lg" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white/30 rounded-tr-lg" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white/30 rounded-bl-lg" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/30 rounded-br-lg" />
      
      {/* Label */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full border border-white/10">
        <span className="text-xs text-white/70 uppercase tracking-wider">Live EEG Signal</span>
      </div>
    </div>
  );
};

export default TechnologySection;
