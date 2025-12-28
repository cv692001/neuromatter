import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const events = [
  "SXSW",
  "Cannes Lions",
  "CES",
  "Forbes CMO Summit",
  "Effie Awards",
  "AdWeek",
  "UN Conference",
  "Ad Age",
];

const SeenAroundSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-section-dark overflow-hidden">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="heading-lg text-section-dark-foreground">
            You may have seen us{" "}
            <span className="block">around…</span>
          </h2>
        </motion.div>

        {/* Marquee Effect */}
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee">
            {[...events, ...events].map((event, index) => (
              <div
                key={`${event}-${index}`}
                className="flex-shrink-0 mx-8 md:mx-12"
              >
                <span className="text-section-dark-foreground/60 text-lg md:text-xl font-medium whitespace-nowrap hover:text-section-dark-foreground transition-colors">
                  {event}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeenAroundSection;
