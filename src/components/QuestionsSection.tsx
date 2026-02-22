import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const questions = [
  "What causes last-minute consumer hesitation?",
  "Which brand promise speaks best to our consumer?",
  "Is the brand actually being processed, or just the entertainment?",
  "Which element is building resistance in consumer's buying process?",
  "Where are consumers confused, overloaded, or cognitively fatigued?",
  "Does this creative build memory, or will it be forgotten tomorrow?",
  'Why did a "well-tested" campaign fail in-market?',
  "Which scene, message, or frame actually drives purchase intent?",
];

const AUTOPLAY_DELAY_MS = 4000;

const QuestionsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [api, setApi] = useState<CarouselApi>(undefined);

  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => {
      api.scrollNext();
    }, AUTOPLAY_DELAY_MS);
    return () => clearInterval(interval);
  }, [api]);

  return (
    <section id="capabilities" className="section-padding bg-background">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h2 className="heading-lg text-foreground max-w-4xl mx-auto text-center">
            <span className="whitespace-nowrap">Where science meets consumer insight,</span>{" "}
            <span className="block">possibilities are limitless</span>
          </h2>
        </motion.div>

        <Carousel
          opts={{ loop: true, align: "start" }}
          setApi={setApi}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {questions.map((question, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/4"
              >
                <div className="bg-card p-4 md:p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-border h-full flex items-center justify-center min-h-[100px]">
                  <p className="text-card-foreground text-sm md:text-base font-medium text-center leading-relaxed">
                    {question}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default QuestionsSection;
