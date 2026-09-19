import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const StartupsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="startups" className="section-padding bg-section-dark">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="heading-lg text-section-dark-foreground mb-8">
            Built for Startups Scaling in High-Uncertainty Markets
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="body-lg text-section-dark-foreground/80">
              Early-stage growth creates pressure at every level. Investors
              expect momentum, customer attention becomes harder to earn, and
              marketing decisions become increasingly expensive to get wrong.
            </p>
            <p className="body-lg text-section-dark-foreground/80">
              Neuromatter gives founders a deeper layer of consumer intelligence
              by revealing what consumers actually notice, what emotionally
              stays with them, and what subconsciously pushes them away. Not
              another marketing opinion, just a clearer signal beneath the
              noise.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StartupsSection;
