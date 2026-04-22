import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  items: FAQItem[];
  variant?: "light" | "dark";
}

function useFAQJsonLd(items: FAQItem[]) {
  useEffect(() => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [items]);
}

const FAQSection = ({ items, variant = "light" }: FAQSectionProps) => {
  const isDark = variant === "dark";
  useFAQJsonLd(items);

  return (
    <section
      className={`section-padding ${isDark ? "bg-section-dark" : "bg-background"}`}
    >
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14"
        >
          <h2
            className={`heading-md ${isDark ? "text-section-dark-foreground" : "text-foreground"}`}
          >
            Frequently Asked Questions
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {items.map((item, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className={`border-b ${isDark ? "border-white/10" : "border-foreground/10"}`}
              >
                <AccordionTrigger
                  className={`text-left text-base md:text-lg font-medium py-5 hover:no-underline ${
                    isDark
                      ? "text-section-dark-foreground/90 hover:text-section-dark-foreground"
                      : "text-foreground/90 hover:text-foreground"
                  }`}
                >
                  {item.question}
                </AccordionTrigger>
                <AccordionContent
                  className={`text-sm md:text-base leading-relaxed ${
                    isDark
                      ? "text-section-dark-foreground/60"
                      : "text-foreground/60"
                  }`}
                >
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
