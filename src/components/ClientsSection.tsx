import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

// Using placeholder logos with brand names
const clients = [
  "Google",
  "Amazon",
  "Facebook",
  "TikTok",
  "Spotify",
  "Mastercard",
  "Coca-Cola",
  "T-Mobile",
  "NY Times",
  "Samsung",
  "Nestle",
  "Subway",
];

const ClientsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
        </motion.div>

        {/* Logo Grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 md:gap-12 items-center justify-items-center">
          {clients.map((client, index) => (
            <motion.div
              key={client}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="logo-item flex items-center justify-center h-16 px-4"
            >
              <span className="text-muted-foreground font-semibold text-sm md:text-base whitespace-nowrap">
                {client}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
