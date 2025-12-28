import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const events = [
  { name: "UN Conference", image: "/placeholder.svg" },
  { name: "Cannes Lions", image: "/placeholder.svg" },
  { name: "SXSW", image: "/placeholder.svg" },
  { name: "Forbes CMO Summit", image: "/placeholder.svg" },
  { name: "Effie Awards", image: "/placeholder.svg" },
  { name: "Ad Age", image: "/placeholder.svg" },
  { name: "AdWeek", image: "/placeholder.svg" },
  { name: "CES", image: "/placeholder.svg" },
  { name: "Brilliant Minds", image: "/placeholder.svg" },
  { name: "IPA", image: "/placeholder.svg" },
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
          className="text-center mb-16"
        >
          <h2 className="heading-lg text-section-dark-foreground">
            You may have seen us{" "}
            <span className="block">around…</span>
          </h2>
        </motion.div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center gap-4"
            >
              {/* Image Placeholder */}
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg bg-section-dark-foreground/10 border border-section-dark-foreground/20 flex items-center justify-center overflow-hidden hover:border-section-dark-foreground/40 transition-colors">
                <img 
                  src={event.image} 
                  alt={event.name}
                  className="w-16 h-16 md:w-20 md:h-20 object-contain opacity-60"
                />
              </div>
              {/* Event Name */}
              <span className="text-section-dark-foreground/80 text-sm md:text-base font-medium text-center">
                {event.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SeenAroundSection;
