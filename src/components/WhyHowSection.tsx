import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

const sections = [
  {
    id: "why",
    title: "Why?",
    tagline: "90% of decision-making takes place in the subconscious.",
    description:
      "Most tools access only the conscious, relying on unreliable, self-reported data. This creates a challenge when predicting anything: from national elections to movie performance to new product success.",
    link: { text: "See how we're different.", href: "#news" },
  },
  {
    id: "how",
    title: "How?",
    tagline: "Using EEG to access decision-making neural process",
    description:
      "NeuroMatter uses EEG (electroencephalography) to measure real-time cortical activity as individuals are exposed to marketing stimuli—directly accessing the neural processes that drive decision-making.",
    link: { text: "Check out our tech.", href: "#technology" },
  },
  {
    id: "sowhat",
    title: "So What?",
    tagline: "Over 50% of ad spend is wasted. We exist to change that.",
    description:
      "The industry accepts that over 50% of marketing spend is wasted (~₹145 Cr in India alone). Using EEG, we generate brain metrics for each ad stimulus, revealing subconscious effectiveness on brain and enabling significantly higher ROAS.",
    link: { text: "Check out the truth.", href: "#work" },
  },
];

const WhyHowSection = () => {
  return (
    <section id="difference" className="section-padding bg-section-dark">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {sections.map((section, index) => (
            <FlipCard key={section.id} section={section} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface FlipCardProps {
  section: (typeof sections)[0];
  index: number;
}

const FlipCard = ({ section, index }: FlipCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="flex flex-col"
    >
      {/* Flip Card Container */}
      <div 
        className="relative h-[320px] md:h-[360px] perspective-1000 cursor-pointer mb-6"
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
      >
        <div 
          className={`
            relative w-full h-full transition-all duration-700 transform-style-3d
            ${isFlipped ? 'rotate-y-180' : ''}
          `}
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Front Side */}
          <div 
            className={`
              absolute inset-0 backface-hidden rounded-2xl border border-white/20 p-8 
              flex flex-col justify-center items-center text-center transition-all duration-300
              ${isFlipped ? 'bg-neutral-400/40' : 'bg-gradient-to-br from-white/10 to-white/5'}
            `}
            style={{ backfaceVisibility: 'hidden' }}
          >
            <h3 className="text-section-dark-foreground text-5xl md:text-6xl font-bold mb-6">
              {section.title}
            </h3>
            <p className="text-section-dark-foreground/80 text-lg md:text-xl font-medium leading-relaxed max-w-xs">
              {section.tagline}
            </p>
            
            {/* Hover hint */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center">
              <span className="text-section-dark-foreground/40 text-xs uppercase tracking-widest">
                Hover to learn more
              </span>
            </div>
          </div>

          {/* Back Side */}
          <div 
            className="absolute inset-0 backface-hidden rounded-2xl bg-neutral-400/35 border border-neutral-300/40 p-8 flex flex-col justify-center transition-all duration-300"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <h4 className="text-section-dark-foreground text-xl font-semibold mb-4">
              {section.title}
            </h4>
            <p className="text-section-dark-foreground/80 text-base leading-relaxed">
              {section.description}
            </p>
          </div>
        </div>
      </div>

      {/* Link below the card - stays visible on both sides */}
      <a
        href={section.link.href}
        className="text-section-dark-foreground underline hover:no-underline transition-all text-sm font-medium text-center"
      >
        {section.link.text}
      </a>
    </motion.div>
  );
};

export default WhyHowSection;
