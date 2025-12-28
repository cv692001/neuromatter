import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Zap, BarChart3 } from "lucide-react";

const TechnologySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="technology" className="section-padding bg-section-dark">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg text-section-dark-foreground mb-6">
            Our Technology
          </h2>
          <p className="body-lg text-section-dark-foreground/70 max-w-2xl mx-auto">
            Steady State Topography (SST) - the world's most advanced brain imaging methodology for marketing applications.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Brain,
              title: "SST Brain Imaging",
              description: "Patented technology that measures second-by-second brain response with millisecond precision."
            },
            {
              icon: Zap,
              title: "Real-time Analysis",
              description: "Instant insights into memory encoding, emotional engagement, and attention patterns."
            },
            {
              icon: BarChart3,
              title: "Predictive Analytics",
              description: "Transform brain data into actionable predictions for campaign effectiveness."
            }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="p-8 rounded-2xl bg-section-dark-foreground/5 border border-section-dark-foreground/10 hover:border-section-dark-foreground/20 transition-colors"
            >
              <item.icon className="w-10 h-10 text-section-dark-foreground/80 mb-4" />
              <h3 className="text-xl font-semibold text-section-dark-foreground mb-3">
                {item.title}
              </h3>
              <p className="text-section-dark-foreground/60">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
