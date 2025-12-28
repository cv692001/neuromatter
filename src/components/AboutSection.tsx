import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-background">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="heading-lg text-foreground mb-8">
            We are the world's{" "}
            <span className="block">preeminent neuromarketing</span>
            <span className="block">and neuroanalytics</span>
            <span className="block">resource.</span>
          </h2>
          <p className="body-lg text-muted-foreground max-w-3xl mx-auto">
            We've been measuring memory for over three decades and we've{" "}
            <strong className="text-foreground">discovered, tested, and proven</strong>{" "}
            that long-term memory encoding is the best predictor of future behavior.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
