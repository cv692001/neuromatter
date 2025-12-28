import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar } from "lucide-react";

const newsItems = [
  {
    title: "Neuro-Insight Expands Global Research Capabilities",
    date: "December 2024",
    excerpt: "New partnerships strengthen our ability to deliver brain-based insights worldwide."
  },
  {
    title: "The Future of Advertising Measurement",
    date: "November 2024",
    excerpt: "How neuroscience is reshaping the way we understand ad effectiveness."
  },
  {
    title: "Annual Neuromarketing Trends Report Released",
    date: "October 2024",
    excerpt: "Key findings from our comprehensive study on consumer brain response patterns."
  },
];

const NewsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="news" className="section-padding bg-muted/30">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg text-foreground mb-6">
            News & Insights
          </h2>
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest developments in neuromarketing and our company news.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="p-6 rounded-2xl bg-background border border-border hover:border-primary/30 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                <Calendar className="w-4 h-4" />
                {item.date}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {item.excerpt}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
