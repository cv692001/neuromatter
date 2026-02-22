import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const sections = [
  {
    id: "why",
    title: "Why?",
    highlight: "90% of decision-making takes place in the subconscious.",
    description:
      "Most tools access only the conscious, relying on unreliable, self-reported data. This creates a challenge when predicting anything: from national elections to movie performance to new product success.",
    link: { text: "See how we're different.", href: "#news" },
  },
  {
    id: "how",
    title: "How?",
    highlight: "Using EEG to access decision-making neural process",
    description:
      "NeuroMatter uses EEG (electroencephalography) to measure real-time cortical activity as individuals are exposed to marketing stimuli—directly accessing the neural processes that drive decision-making.",
    link: { text: "Check out our tech.", href: "#technology" },
  },
  {
    id: "sowhat",
    title: "So What?",
    highlight: "Over 50% of ad spend is wasted. We exist to change that.",
    description:
      "The industry accepts that over 50% of marketing spend is wasted because audiences don't always resonate with the marketer's script. Using EEG, we generate brain metrics for each ad stimulus, revealing subconscious effectiveness on audience's brain and enabling significantly higher ROAS.",
    link: { text: "Check out the truth.", href: "#work" },
  },
];

const WhyHowSection = () => {
  return (
    <section id="difference" className="section-padding bg-section-dark">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 items-stretch">
          {sections.map((section, index) => (
            <SectionCard key={section.id} section={section} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface SectionCardProps {
  section: (typeof sections)[0];
  index: number;
}

const SectionCard = ({ section, index }: SectionCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="flex flex-col h-full min-h-0"
    >
      <h3 className="text-section-dark-foreground heading-md mb-4">{section.title}</h3>
      <p className="text-section-dark-foreground font-semibold mb-4">
        {section.highlight}
      </p>
      <p className="text-section-dark-foreground/70 body-md mb-6 flex-1 min-h-0">
        {section.description}
      </p>
      <a
        href={section.link.href}
        className="text-section-dark-foreground underline hover:no-underline transition-all text-sm font-medium mt-auto"
      >
        {section.link.text}
      </a>
    </motion.div>
  );
};

export default WhyHowSection;
