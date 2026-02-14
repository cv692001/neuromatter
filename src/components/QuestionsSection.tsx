import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const questions = [
  "How do we make our products stand out at stores?",
  "Which product to include in the next line extension?",
  "What media buy will be most effective for our ad?",
  "Which brand interactions build subconscious trust or doubt?",
  "What makes for the most effective sonic branding?",
  "What is the best way to get users most engaged?",
  "What causes last-minute consumer hesitation?",
  "Which brand promise speaks best to our consumer?",
];

const QuestionsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="capabilities" className="section-padding bg-background">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="heading-lg text-foreground max-w-4xl mx-auto">
            When our tech meets your consumer,{" "}
            <span className="block">the possibilities are limitless.</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {questions.map((question, index) => (
            <QuestionCard key={index} question={question} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface QuestionCardProps {
  question: string;
  index: number;
}

const QuestionCard = ({ question, index }: QuestionCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow card-hover border border-border h-full flex items-center justify-center min-h-[120px]"
    >
      <p className="text-card-foreground text-sm md:text-base font-medium text-center leading-relaxed">
        {question}
      </p>
    </motion.div>
  );
};

export default QuestionsSection;
