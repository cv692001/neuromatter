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
            A homegrown initiative building{" "}
            <span className="block">India's first neuromarketing</span>
            <span className="block">and brain insights</span>
            <span className="block">resource.</span>
          </h2>
          <p className="body-lg text-muted-foreground max-w-3xl mx-auto">
            Our goal is simple — help organisations truly understand their customer's minds by applying{" "}
            <strong className="text-foreground">BCI tech and neuroscience based analytics</strong>{" "}
            for Marketing Strategies.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
