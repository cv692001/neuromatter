import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useScrollToHash } from "@/hooks/useScrollToHash";
import { useSEO } from "@/hooks/use-seo";
import { PAGE_SEO } from "@/lib/site-config";

interface Person {
  name: string;
  initials: string;
  image?: string;
  imageSide: "left" | "right";
  role: string;
  points: string[];
  gradient: string;
  border: string;
  glow: string;
}

const mentors: Person[] = [
  {
    name: "Mr. Bikramjeet Ghosh",
    initials: "BG",
    image: "/mentor-bikramjeet-ghosh-bw.jpg",
    imageSide: "left",
    role: "ex-Ogilvy (Creative Director)",
    points: [
      "Former ECD across major agency networks (Ogilvy, MullenLowe Lintas) with two decades of APAC brand experience.",
      "Seasoned Strategy Officer and mentor who has built global brands like Unilever, Nike, and Lenovo.",
    ],
    gradient: "from-blue-500 to-cyan-500",
    border: "border-blue-500/30",
    glow: "bg-blue-500/10",
  },
  {
    name: "Jayanth Govindraj",
    initials: "JG",
    image: "/mentor-jayanth-govindraj.jpg",
    imageSide: "right",
    role: "ex-WPP Creative (National Planning Director)",
    points: [
      "Strategic leader with deep expertise at the intersection of neuroscience, human behavior, and marketing.",
      "Focused on leveraging data and cognitive research to understand what truly drives consumer choices.",
    ],
    gradient: "from-purple-500 to-pink-500",
    border: "border-purple-500/30",
    glow: "bg-purple-500/10",
  },
];

const founder: Person = {
  name: "Vaishvi Bansal",
  initials: "VB",
  image: "/founder-vaishvi-bansal-v2.jpg",
  imageSide: "left",
  role: "Founder, Neuromatter",
  points: [
    "Founder of Neuromatter, previously built and exited StarYup Capitals before transitioning into Venture Capital.",
    "On a mission to eliminate guesswork in advertising by testing how customer brains actually respond to brands.",
  ],
  gradient: "from-amber-500 to-orange-500",
  border: "border-amber-500/30",
  glow: "bg-amber-500/10",
};

const PersonCard = ({
  person,
  index,
  isInView,
}: {
  person: Person;
  index: number;
  isInView: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 35 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, delay: index * 0.15 }}
    className={`rounded-2xl border ${person.border} bg-white/[0.03] backdrop-blur-sm overflow-hidden flex flex-col ${person.imageSide === "right" ? "sm:flex-row-reverse" : "sm:flex-row"} hover:bg-white/[0.06] transition-colors`}
  >
    {/* Photo, bleeding to the card's edges; monogram until one is supplied */}
    <div className={`relative w-full sm:w-2/5 aspect-[4/5] sm:aspect-auto sm:min-h-[20rem] ${person.glow} flex-shrink-0 flex items-center justify-center`}>
      {person.image ? (
        <img
          src={person.image}
          alt={person.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${person.gradient} flex items-center justify-center`}>
          <span className="text-white font-bold text-2xl">{person.initials}</span>
        </div>
      )}
    </div>

    <div className="flex-1 min-w-0 p-7 flex flex-col justify-center">
      {/* Name */}
      <div className="mb-5">
        <h3 className="text-lg font-bold text-section-dark-foreground leading-snug">
          {person.name}
        </h3>
        <p className={`text-sm font-semibold bg-gradient-to-r ${person.gradient} bg-clip-text text-transparent`}>
          {person.role}
        </p>
      </div>

      {/* Bullet points */}
      <ul className="space-y-3">
        {person.points.map((point) => (
          <li key={point} className="flex gap-3 items-start">
            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${person.gradient} flex-shrink-0`} />
            <span className="text-section-dark-foreground/60 text-sm leading-relaxed">
              {point}
            </span>
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
);

const AboutPage = () => {
  const mentorsRef = useRef(null);
  const founderRef = useRef(null);
  const mentorsInView = useInView(mentorsRef, { once: true, margin: "-50px" });
  const founderInView = useInView(founderRef, { once: true, margin: "-50px" });

  useScrollToHash();
  useSEO(PAGE_SEO["/about-us"]);

  return (
    <main className="min-h-screen">
      <Header />

      <section className="pt-24 md:pt-28 pb-14 md:pb-20 px-6 md:px-12 lg:px-20 bg-section-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-8 md:mb-12"
          >
            <h1 className="heading-lg text-section-dark-foreground mb-4">
              About Us
            </h1>
          </motion.div>

          {/* Mentors */}
          <div ref={mentorsRef} id="mentors" className="scroll-mt-24">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={mentorsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-2xl md:text-3xl font-bold text-center text-section-dark-foreground mb-10 md:mb-14"
            >
              Mentors
            </motion.h2>

            <div className="flex flex-col gap-12 lg:gap-16 max-w-3xl mx-auto">
              {mentors.map((mentor, index) => (
                <PersonCard
                  key={mentor.name}
                  person={mentor}
                  index={index}
                  isInView={mentorsInView}
                />
              ))}
            </div>
          </div>

          {/* Founder */}
          <div ref={founderRef} id="founder" className="scroll-mt-24 mt-20 md:mt-28">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={founderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-2xl md:text-3xl font-bold text-center text-section-dark-foreground mb-10 md:mb-14"
            >
              Founder
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={founderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto flex flex-col items-center text-center"
            >
              {/* Photo */}
              <div className={`w-60 sm:w-80 aspect-[5/6] rounded-2xl overflow-hidden border ${founder.border} mb-8`}>
                <img
                  src={founder.image}
                  alt={founder.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name */}
              <h3 className="text-xl md:text-2xl font-bold text-section-dark-foreground leading-snug">
                {founder.name}
              </h3>
              <p className={`text-sm font-semibold bg-gradient-to-r ${founder.gradient} bg-clip-text text-transparent mb-5`}>
                {founder.role}
              </p>

              {/* Description */}
              <div className="space-y-3">
                {founder.points.map((point) => (
                  <p key={point} className="text-section-dark-foreground/60 text-sm md:text-base leading-relaxed">
                    {point}
                  </p>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AboutPage;
