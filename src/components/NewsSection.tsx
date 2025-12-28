import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, ExternalLink, ArrowUpRight } from "lucide-react";

const newsItems = [
  {
    title: "Neuro-Insight Expands Global Research Capabilities",
    date: "December 2024",
    excerpt: "New partnerships strengthen our ability to deliver brain-based insights worldwide.",
    source: "Forbes",
    sourceUrl: "https://forbes.com",
    imageGradient: "from-blue-600 to-purple-600"
  },
  {
    title: "The Future of Advertising Measurement",
    date: "November 2024",
    excerpt: "How neuroscience is reshaping the way we understand ad effectiveness.",
    source: "AdWeek",
    sourceUrl: "https://adweek.com",
    imageGradient: "from-orange-500 to-red-500"
  },
  {
    title: "Annual Neuromarketing Trends Report Released",
    date: "October 2024",
    excerpt: "Key findings from our comprehensive study on consumer brain response patterns.",
    source: "Marketing Week",
    sourceUrl: "https://marketingweek.com",
    imageGradient: "from-emerald-500 to-teal-500"
  },
  {
    title: "How Brain Science is Revolutionizing Brand Strategy",
    date: "September 2024",
    excerpt: "Deep dive into the neural mechanisms that drive brand loyalty and recall.",
    source: "Harvard Business Review",
    sourceUrl: "https://hbr.org",
    imageGradient: "from-rose-500 to-pink-500"
  },
  {
    title: "Neuroscience Meets AI: The Next Frontier",
    date: "August 2024",
    excerpt: "Exploring the convergence of brain research and artificial intelligence in marketing.",
    source: "TechCrunch",
    sourceUrl: "https://techcrunch.com",
    imageGradient: "from-indigo-500 to-blue-500"
  },
  {
    title: "Sustainability Messaging That Actually Works",
    date: "July 2024",
    excerpt: "Research reveals what truly resonates with consumers on environmental issues.",
    source: "The Guardian",
    sourceUrl: "https://theguardian.com",
    imageGradient: "from-green-500 to-lime-500"
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

        {/* Featured News Item */}
        <motion.a
          href={newsItems[0].sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="block mb-8 group"
        >
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 p-8 md:p-12">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className={`absolute inset-0 bg-gradient-to-br ${newsItems[0].imageGradient}`} />
            </div>
            
            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/80 font-medium">
                    Featured
                  </span>
                  <span className="flex items-center gap-1.5 text-white/60 text-sm">
                    <Calendar className="w-4 h-4" />
                    {newsItems[0].date}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                  {newsItems[0].title}
                </h3>
                <p className="text-white/70 text-lg max-w-2xl">
                  {newsItems[0].excerpt}
                </p>
                <div className="flex items-center gap-2 mt-6 text-white/50 text-sm">
                  <ExternalLink className="w-4 h-4" />
                  <span>Read on {newsItems[0].source}</span>
                </div>
              </div>
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors flex-shrink-0">
                <ArrowUpRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              </div>
            </div>
          </div>
        </motion.a>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.slice(1).map((item, index) => (
            <motion.a
              key={item.title}
              href={item.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
              className="group p-6 rounded-2xl bg-background border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300"
            >
              {/* Colored Top Bar */}
              <div className={`h-1 w-16 rounded-full bg-gradient-to-r ${item.imageGradient} mb-5 group-hover:w-full transition-all duration-300`} />
              
              <div className="flex items-center justify-between gap-3 text-muted-foreground text-sm mb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {item.date}
                </div>
                <span className="px-2 py-0.5 bg-muted rounded text-xs font-medium">
                  {item.source}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                {item.title}
              </h3>
              
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {item.excerpt}
              </p>
              
              <div className="flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Read article</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <a 
            href="#" 
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
          >
            View all news & insights
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsSection;
