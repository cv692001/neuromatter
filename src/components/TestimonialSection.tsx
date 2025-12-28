import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

const TestimonialSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-section-dark">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <Quote className="w-12 h-12 text-section-dark-foreground/30 mx-auto mb-8" />
          
          <blockquote className="text-section-dark-foreground heading-md mb-8 leading-relaxed">
            "It's nothing short of game-changing.
          </blockquote>
          
          <p className="text-section-dark-foreground/80 body-md mb-8 max-w-3xl mx-auto">
            It's a staple of our business, in fact, mandatory for my team. It has allowed 
            us to run real-time optimizations prior to putting work out into the market. 
            The partnership has meant that we have changed the way we look at our advertising.
            <br /><br />
            It removes the debate and the gut instinct and gives you pure facts and science 
            in your decision-making as a brand leader. Neuro-Insight takes the guesswork out."
          </p>

          <div className="space-y-1">
            <p className="text-section-dark-foreground font-semibold">Nick Drake</p>
            <p className="text-section-dark-foreground/60 text-sm">
              Vice President of Global Marketing at Google
            </p>
            <p className="text-section-dark-foreground/40 text-xs">
              (written as CMO of T-Mobile)
            </p>
          </div>

          <motion.a
            href="#work"
            className="inline-block mt-10 btn-outline border-section-dark-foreground text-section-dark-foreground hover:bg-section-dark-foreground hover:text-section-dark"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Client Work
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialSection;
