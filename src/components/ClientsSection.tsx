import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

// Client data with neuromarketing use case descriptions and logo URLs
const clients = [
  {
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    description: "Optimized ad formats using neural response data to maximize viewer attention and recall."
  },
  {
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    description: "Enhanced product page layouts based on eye-tracking and emotional engagement patterns."
  },
  {
    name: "Coca-Cola",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg",
    description: "Measured subconscious brand associations to refine global advertising campaigns."
  },
  {
    name: "Apple",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    description: "Pioneered emotional branding by decoding the neural pathways that create cult-like brand loyalty and premium perception."
  },
  {
    name: "Spotify",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg",
    description: "Analyzed listener brain responses to personalize music recommendations and ads."
  },
  {
    name: "Netflix",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    description: "Optimized thumbnail and trailer effectiveness using attention and memory metrics."
  },
];

// Companies for the "many more" section with logos
const moreCompanies = [
  { name: "TikTok", logo: "https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg" },
  { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
  { name: "Nike", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" },
  { name: "Pepsi", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Pepsi_logo_2014.svg" },
];

const ClientsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="work" className="section-padding bg-background pb-8">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg text-foreground">
            Use the same neuroscience-driven approaches{" "}
            <span className="block">that top brands rely on</span>
          </h2>
          <p className="body-md text-muted-foreground mt-6 max-w-2xl mx-auto">
            Leading brands connect with their consumers at a subconscious level to influence their decision making
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
              className="group relative bg-card border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start gap-5">
                {/* Logo */}
                <div className="w-16 h-12 flex items-center justify-center flex-shrink-0">
                  <img 
                    src={client.logo} 
                    alt={client.name}
                    className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                
                {/* Content - Description only, no name */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {client.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Many More Section with Real Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-4 bg-muted/50 rounded-full">
            <div className="flex -space-x-3">
              {moreCompanies.map((company, i) => (
                <div 
                  key={company.name}
                  className="w-10 h-10 rounded-full bg-white border-2 border-background flex items-center justify-center overflow-hidden shadow-sm"
                  style={{ zIndex: moreCompanies.length - i }}
                >
                  <img 
                    src={company.logo} 
                    alt={company.name}
                    className="w-6 h-6 object-contain"
                  />
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
