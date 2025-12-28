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
    highlight: "NeuroMatter leverages EEG (electroencephalography) technology.",
    description:
      "NeuroMatter leverages EEG (electroencephalography) to capture rapid fluctuations in cortical electrical activity via scalp sensors to go straight to the source of decision making — the brain.",
    link: { text: "Check out our tech.", href: "#technology" },
  },
  {
    id: "sowhat",
    title: "So What?",
    highlight: "Over 50% of marketing spend is wasted.",
    description:
      "Our industry has long accepted that over 50% of marketing spend is wasted — that's around ₹1.45 billion in India alone. Through EEG technology, you receive exact scores for each marketing stimuli, indicating what works more on consumers as per your defined objectives.",
    link: { text: "Check out the truth.", href: "#work" },
  },
];

const WhyHowSection = () => {
  return (
    <section id="difference" className="section-padding bg-section-dark">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
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
      className="flex flex-col"
    >
      <h3 className="text-section-dark-foreground heading-md mb-4">{section.title}</h3>
      <p className="text-section-dark-foreground font-semibold mb-4">
        {section.highlight}
      </p>
      <p className="text-section-dark-foreground/70 body-md mb-6 flex-1">
        {section.description}
      </p>
      <a
        href={section.link.href}
        className="text-section-dark-foreground underline hover:no-underline transition-all text-sm font-medium"
      >
        {section.link.text}
      </a>
    </motion.div>
  );
};

export default WhyHowSection;
