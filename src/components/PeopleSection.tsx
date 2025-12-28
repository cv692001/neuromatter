import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const teamMembers = [
  { name: "Team Member 1", role: "CEO & Founder", image: "/placeholder.svg" },
  { name: "Team Member 2", role: "Chief Science Officer", image: "/placeholder.svg" },
  { name: "Team Member 3", role: "Head of Research", image: "/placeholder.svg" },
  { name: "Team Member 4", role: "Director of Analytics", image: "/placeholder.svg" },
];

const PeopleSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="people" className="section-padding bg-background">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg text-foreground mb-6">
            Our People
          </h2>
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
            A team of neuroscientists, researchers, and marketing experts dedicated to unlocking the power of the brain.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-muted overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">
                {member.name}
              </h3>
              <p className="text-muted-foreground text-sm">
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PeopleSection;
