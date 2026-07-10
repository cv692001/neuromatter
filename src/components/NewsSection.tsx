import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, ArrowUpRight } from "lucide-react";

// Featured article
const featuredArticle = {
  title: "Neurobranding in India: Hidden Insights & Emerging Trends",
  excerpt: "Exploring how neurobranding is shaping India's diverse market landscape.",
  source: "Pen Paper Prachetan",
  sourceUrl: "https://www.penpaperprachetan.com/post/neurobranding-in-india-exploring-hidden-insights-and-emerging-trends-in-a-richly-diverse-market-d",
};

// Blog posts (internal, in-depth articles)
const blogPosts = [
  {
    title:
      "Top 5 Best Neuromarketing Agencies in India (2026 Edition): Top Companies Transforming Consumer Decision-Making",
    excerpt:
      "Most agencies guess. The best neuromarketing agencies in India measure your consumer's brain. Here are the top 5 in 2026, ranked by actual neuroscience, not hype.",
    href: "/best-neuromarketing-agency-india",
  },
  {
    title:
      "Top 5 Best Conversion Rate Optimization Agencies in India Using Consumer Psychology Strategies",
    excerpt:
      "Most CRO agencies test buttons. The best conversion rate optimization agencies in India rewire how your visitor's brain decides. See our 2026 ranked list.",
    href: "/best-conversion-rate-optimization-agencies-india",
  },
];

// Other news articles
const newsItems = [
  {
    title: "Mapping Neuromarketing in India",
    excerpt: "Research trends and implementation challenges in Indian neuromarketing.",
    source: "JMSR Online",
    sourceUrl: "https://jmsr-online.com/article/mapping-neuromarketing-in-india-a-bibliometric-and-network-analysis-of-research-trends-drivers-and-implementation-challenges-305/",
    colorGradient: "from-emerald-500 to-teal-500"
  },
  {
    title: "Mindhunters: Neuromarketing in Brand Strategy",
    excerpt: "How brands decode consumer behavior with neuroscience.",
    source: "Brand Equity",
    sourceUrl: "https://brandequity.economictimes.indiatimes.com/news/marketing/mindhunters/123933893",
    colorGradient: "from-orange-500 to-red-500"
  },
  {
    title: "Is India Ready for Neuroscience-Backed Ads?",
    excerpt: "The state of neuroscience-driven advertising in India.",
    source: "Financial Express",
    sourceUrl: "https://www.financialexpress.com/business/brandwagon-is-india-ready-for-neuroscience-backed-advertising-3694893/",
    colorGradient: "from-indigo-500 to-blue-500"
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
          className="text-center mb-10"
        >
          <h2 className="heading-lg text-foreground mb-4">
            News & Blogs
          </h2>
          <p className="text-muted-foreground">
            Latest in neuromarketing
          </p>
        </motion.div>

        {/* Featured News Item */}
        <motion.a
          href={featuredArticle.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="block mb-6 group"
        >
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <span className="text-white/50 text-xs font-medium mb-2 block">
                  {featuredArticle.source}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                  {featuredArticle.title}
                </h3>
                <p className="text-white/60 text-sm">
                  {featuredArticle.excerpt}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors flex-shrink-0">
                <ArrowUpRight className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </motion.a>

        {/* News Grid - Same format as featured */}
        <div className="grid md:grid-cols-3 gap-4">
          {newsItems.map((item, index) => (
            <motion.a
              key={item.title}
              href={item.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
              className="group p-5 rounded-xl bg-background border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              {/* Colored Top Bar - elongates on hover */}
              <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${item.colorGradient} mb-4 group-hover:w-full transition-all duration-300`} />
              
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <span className="text-muted-foreground text-xs font-medium mb-2 block">
                    {item.source}
                  </span>
                  <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {item.excerpt}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors flex-shrink-0">
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Blogs */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-xl md:text-2xl font-bold text-foreground mt-14 mb-6"
        >
          Blogs
        </motion.h3>

        <div className="grid gap-4">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.href}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            >
              <Link to={post.href} className="block group">
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 p-6 md:p-8">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <span className="text-white/50 text-xs font-medium mb-2 block">
                        Neuromatter Blog
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-white/60 text-sm">{post.excerpt}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors flex-shrink-0">
                      <ArrowUpRight className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
