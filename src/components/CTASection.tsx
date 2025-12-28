import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="heading-lg text-foreground mb-8">
            See what we can do for you.
          </h2>
          
          <motion.a
            href="#capabilities"
            className="btn-primary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Learn More
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
