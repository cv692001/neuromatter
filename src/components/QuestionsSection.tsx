import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

// Organized in 4 columns as requested
const questionColumns = [
  // Front column (first)
  [
    "What causes last-minute consumer hesitation?",
    "Which brand promise speaks best to our consumer?",
  ],
  // Middle column
  [
    "Is the brand actually being processed, or just the entertainment?",
    "Does this creative build memory, or will it be forgotten tomorrow?",
  ],
  // Second last column
  [
    "Where are consumers confused, overloaded, or cognitively fatigued?",
    "Which element is building resistance in consumer's buying process?",
  ],
  // Last column (end)
  [
    "Why did a 'well-tested' campaign fail in-market?",
    "Which scene, message, or frame actually drives purchase intent?",
  ],
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
            Where science meets consumer insight,{" "}
            <span className="block">possibilities are limitless.</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {questionColumns.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-4 md:gap-6">
              {column.map((question, qIndex) => (
                <QuestionCard key={`${colIndex}-${qIndex}`} question={question} index={colIndex * 2 + qIndex} />
              ))}
            </div>
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
