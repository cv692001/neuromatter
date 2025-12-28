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
    link: { text: "See how we're different.", href: "#difference" },
  },
  {
    id: "how",
    title: "How?",
    highlight: "Neuro-Insight leverages proprietary tech, Steady State Topography (SST).",
    description:
      "Neuro-Insight leverages proprietary technology, Steady State Topography (SST), to bypass conscious filters by going straight to the source of all decision-making — the brain. SST™ is patented, validated, trusted, and respected by science and businesses.",
    link: { text: "Check out our tech.", href: "#technology" },
  },
  {
    id: "sowhat",
    title: "So What?",
    highlight: "SST has an 86% correlation with in-market sales.",
    description:
      "Our industry has long accepted that over 50% of marketing spend is wasted — that's around $400 billion in the US alone. SST has an 86% correlation with in-market sales making your marketing dollars work harder and providing your consumers with what they truly need.",
    link: { text: "Check out our work.", href: "#work" },
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
