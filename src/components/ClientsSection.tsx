import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronRight } from "lucide-react";

// Client data with neuromarketing use case descriptions
const clients = [
  {
    name: "Google",
    logo: "G",
    color: "from-blue-500 to-green-500",
    description: "Optimized ad formats using neural response data to maximize viewer attention and recall."
  },
  {
    name: "Amazon",
    logo: "A",
    color: "from-orange-500 to-yellow-500",
    description: "Enhanced product page layouts based on eye-tracking and emotional engagement patterns."
  },
  {
    name: "Coca-Cola",
    logo: "C",
    color: "from-red-600 to-red-500",
    description: "Measured subconscious brand associations to refine global advertising campaigns."
  },
  {
    name: "Samsung",
    logo: "S",
    color: "from-blue-600 to-indigo-500",
    description: "Tested product launch content for emotional resonance across diverse markets."
  },
  {
    name: "Spotify",
    logo: "S",
    color: "from-green-500 to-emerald-500",
    description: "Analyzed listener brain responses to personalize music recommendations and ads."
  },
  {
    name: "Netflix",
    logo: "N",
    color: "from-red-500 to-rose-600",
    description: "Optimized thumbnail and trailer effectiveness using attention and memory metrics."
  },
];

const ClientsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredClient, setHoveredClient] = useState<string | null>(null);

  return (
    <section id="work" className="section-padding bg-background">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg text-foreground">
            Work with us and you will be{" "}
            <span className="block">in excellent company.</span>
          </h2>
          <p className="body-md text-muted-foreground mt-6 max-w-2xl mx-auto">
            Leading brands trust our neuroscience-backed insights to transform their marketing strategies
          </p>
        </motion.div>

        {/* Client Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredClient(client.name)}
              onMouseLeave={() => setHoveredClient(null)}
              className="group relative bg-card border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start gap-5">
                {/* Logo Placeholder */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${client.color} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-white font-bold text-xl">{client.logo}</span>
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {client.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    {client.description}
                  </p>
                </div>
              </div>
              
              {/* Hover indicator */}
              <motion.div 
                className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{ x: hoveredClient === client.name ? 0 : -5 }}
              >
                <ChevronRight className="w-5 h-5 text-primary" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Many More Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-muted/50 rounded-full">
            <div className="flex -space-x-2">
              {['TikTok', 'Meta', 'Apple', 'Nike'].map((brand, i) => (
                <div 
                  key={brand}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 border-2 border-background flex items-center justify-center"
                  style={{ zIndex: 4 - i }}
                >
                  <span className="text-white text-xs font-semibold">{brand[0]}</span>
                </div>
              ))}
            </div>
            <span className="text-muted-foreground font-medium">
              and <span className="text-foreground font-semibold">many more...</span>
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground mt-4">
            Join 200+ global brands leveraging neuroscience for better marketing
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ClientsSection;
