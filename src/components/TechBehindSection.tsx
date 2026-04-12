import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const components = [
  {
    video: "/tech-emotiv-insight.mp4",
    poster: "/tech-emotiv-insight-poster.jpg",
    description:
      "The EEG technology Headset wore by your target audience to capture and analyze subconscious brain activity.",
    borderColor: "border-blue-500/30",
  },
  {
    video: "/tech-brainviz.mp4",
    poster: "/tech-brainviz-poster.jpg",
    description:
      "Dynamic visualization of multi-regional brain activity and neural fluctuations captured upon viewing the advertisement.",
    borderColor: "border-amber-500/30",
  },
  {
    video: "/tech-emotivpro.mp4",
    poster: "/tech-emotivpro-poster.jpg",
    description:
      "Visualizing the subconscious: Multi-regional brain activity triggered by your advertisement.",
    borderColor: "border-purple-500/30",
  },
];

const VideoCard = ({
  item,
  index,
  isInView,
}: {
  item: (typeof components)[number];
  index: number;
  isInView: boolean;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isInView && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [isInView]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`rounded-2xl overflow-hidden border ${item.borderColor} bg-white/[0.03] backdrop-blur-sm hover:border-opacity-60 transition-all duration-300 group
        flex flex-row md:flex-col`}
    >
      {/* Video */}
      <div className="relative w-2/5 md:w-full aspect-square md:aspect-[16/10] overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 flex-shrink-0">
        <video
          ref={videoRef}
          src={item.video}
          poster={item.poster}
          muted
          loop
          playsInline
          autoPlay
          className="w-full h-full object-cover"
        />
      </div>

      {/* Description: beside video on mobile, below on desktop */}
      <div className="p-4 md:p-5 flex-1 flex flex-col justify-center md:items-center">
        <p className="text-section-dark-foreground/60 text-sm leading-relaxed md:text-center">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
};

const TechBehindSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="section-padding bg-section-dark">
      <div className="container-custom">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold text-center text-section-dark-foreground mb-10 md:mb-14"
        >
          Technology Behind It
        </motion.h2>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {components.map((item, index) => (
            <VideoCard
              key={item.video}
              item={item}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechBehindSection;
