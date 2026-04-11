import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const sections = [
  {
    id: "why",
    title: "Why?",
    highlight: "Because your customers are confused",
    description:
      "As customers make decisions first and justify them later, we shape your branding to make that subconscious decision in your favour within a single glance.",
    link: { text: "See how we're different.", href: "#news" },
  },
  {
    id: "how",
    title: "How?",
    highlight: "Using EEG to examine customer's brain signal with millisecond precision",
    description:
      "Neuromatter uses EEG (electroencephalography) to measure each millisecond of customer's brain signal while they view your ad. This pinpoints what strengthens your impact and what creates friction in their decision-making.",
    link: { text: "Check out our tech.", href: "#technology" },
  },
  {
    id: "sowhat",
    title: "So What?",
    highlight: "Alter Costs, Conversions and TOMA metrics",
    description:
      "So you eliminate what hurts conversions, accelerate growth through stronger recall, cut wasted spend, and build a branding playbook tailored to your audience and market.",
    link: { text: "Check out the truth.", href: "#work" },
  },
];

const WhyHowSection = () => {
  return (
    <section id="difference" className="section-padding bg-section-dark">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-8 md:gap-10 max-w-5xl mx-auto">
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
      className="w-full max-w-sm mx-auto md:max-w-none"
    >
      <div className="group relative aspect-square w-full rounded-xl border-2 border-section-dark-foreground/25 bg-section-dark overflow-hidden shadow-sm transition-shadow duration-300 hover:shadow-lg hover:border-section-dark-foreground/40">
        {/* Front: heading + subheading only */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 p-6 text-center transition-opacity duration-300 ease-out md:group-hover:opacity-0 md:group-hover:pointer-events-none">
          <h3 className="text-section-dark-foreground text-3xl md:text-4xl xl:text-5xl font-extrabold tracking-tight">
            {section.title}
          </h3>
          <p className="text-section-dark-foreground font-bold text-base md:text-lg leading-snug max-w-[18rem]">
            {section.highlight}
          </p>
        </div>

        {/* Back: body + link — visible on top when hovering the square (md+) */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 p-5 md:p-6 text-center opacity-0 transition-opacity duration-300 ease-out overflow-y-auto overscroll-contain md:group-hover:opacity-100 md:group-hover:z-30">
          <p className="text-section-dark-foreground/90 body-md text-sm leading-relaxed">
            {section.description}
          </p>
          <a
            href={section.link.href}
            className="text-section-dark-foreground underline hover:no-underline transition-all text-sm font-medium shrink-0"
          >
            {section.link.text}
          </a>
        </div>
      </div>

      {/* Small screens: no hover — show detail copy under the square */}
      <div className="md:hidden mt-4 space-y-3 px-1 text-center">
        <p className="text-section-dark-foreground/80 body-md text-sm leading-relaxed">{section.description}</p>
        <a
          href={section.link.href}
          className="text-section-dark-foreground underline text-sm font-medium inline-block"
        >
          {section.link.text}
        </a>
      </div>
    </motion.div>
  );
};

export default WhyHowSection;
