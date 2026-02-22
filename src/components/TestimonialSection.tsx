import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

const TestimonialSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-section-dark">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <Quote className="w-12 h-12 text-section-dark-foreground/30 mx-auto mb-8" />
          
          <blockquote className="text-section-dark-foreground heading-md mb-6 leading-relaxed">
            "The emotional side of a product is the brand."
          </blockquote>
          
          <div className="mb-8">
            <p className="text-section-dark-foreground/60 text-lg font-medium">
              — Piyush Pandey
            </p>
            <p className="text-section-dark-foreground/40 text-sm mt-1">
              Iconic Indian Ad Filmmaker and CCO, Ogilvy India
            </p>
          </div>
          
          <p className="text-section-dark-foreground/80 body-md max-w-2xl mx-auto text-center text-balance">
            That's precisely what neuromarketing helps decode! The emotional and subconscious 
            reactions that drive real consumer choice, replacing intuition & gut instinct with 
            pure facts and evidence-based decision-making for brand leaders.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialSection;
