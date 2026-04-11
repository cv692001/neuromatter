import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-background">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="heading-lg text-foreground mb-8">
            <span className="block">A homegrown initiative</span>
            <span className="block">building India's first</span>
            <span className="block">neuromarketing lab.</span>
          </h2>
          <p className="body-lg text-muted-foreground max-w-3xl mx-auto">
            Neuromarketing is the process of identifying how consumer&apos;s make decisions towards your brand.
            <br />
            It is done by testing your ad on human brain responses and analysing how it feels, perceives and remembers your brand.
          </p>
          <div className="mt-8 max-w-3xl mx-auto space-y-4">
            <p className="text-lg md:text-xl font-semibold italic text-foreground leading-relaxed px-4 py-5 rounded-xl border-2 border-black bg-background transition-colors duration-300 hover:bg-black hover:text-white cursor-default dark:border-white/90 dark:hover:bg-black dark:hover:text-white">
              We don&apos;t ask customers what they think
              <br />
              we examine what is actually happening in their mind.
            </p>
            <p className="text-center text-lg md:text-xl font-semibold italic text-foreground">
              Through BCI tech and Neuroscience Analytics
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
