import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Package, Layers, Crown, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import { useScrollToHash } from "@/hooks/useScrollToHash";

const offeringsFAQs = [
  {
    question: "Why are my ads getting clicks but no conversions?",
    answer:
      "Your ad grabbed attention—but something after that is breaking trust or clarity. Neuromarketing helps you find that exact drop-off point.",
  },
  {
    question: "How much does neuromarketing cost in India?",
    answer:
      "It can start from around ₹50K for basic analysis and go up depending on depth. Some companies also offer smaller audits to get started without big investment.",
  },
  {
    question: "Do I really need neuromarketing?",
    answer:
      "If you're spending on ads, branding, or a website—yes. Otherwise you're making decisions based on assumptions.",
  },
];

const levels = [
  {
    level: 1,
    id: "conversion-diagnostics",
    title: "Conversion Diagnostics",
    subtitle: "Evaluate & validate creative assets before they go live",
    icon: Package,
    gradient: "from-emerald-500 to-teal-500",
    borderColor: "border-emerald-500/30",
    accentColor: "text-emerald-400",
    accentBg: "bg-emerald-500/10",
    image: "/offerings-diagnostics.png",
    services: [
      "Packaging Designs / Product Images",
      "Brand Logos (Evaluation of Options)",
      "Splash Screens / Key Hero Screens",
      "Full-Length Ad Creative",
    ],
  },
  {
    level: 2,
    id: "conversion-architecture",
    title: "Conversion Architecture",
    subtitle: "Architect high-converting digital experiences",
    icon: Layers,
    gradient: "from-orange-500 to-amber-500",
    borderColor: "border-orange-500/30",
    accentColor: "text-orange-400",
    accentBg: "bg-orange-500/10",
    image: "/offerings-architecture.png",
    services: [
      "Pricing & Plan Pages",
      "High-Value E-commerce Product Pages (PDP + Gallery)",
      "Decoding Highest Drop-Off Segments",
      "End-to-End Ad Campaign",
    ],
  },
  {
    level: 3,
    id: "market-command",
    title: "Market Command",
    subtitle: "Dominate your market with full-spectrum neuro strategy",
    icon: Crown,
    gradient: "from-indigo-500 to-purple-500",
    borderColor: "border-indigo-500/30",
    accentColor: "text-indigo-400",
    accentBg: "bg-indigo-500/10",
    image: "/offerings-command.png",
    services: [
      "Product Launch (Overall Launch Package)",
      "Multi-Asset Launches (Ads + Landing + Pricing + PDP)",
      "Turnaround for Low-Performing SKUs",
    ],
  },
];

const OfferingsPage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useScrollToHash();

  return (
    <main className="min-h-screen">
      <Header />

      <section className="pt-24 md:pt-28 pb-10 md:pb-14 px-6 md:px-12 lg:px-20 bg-section-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-10 md:mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm text-section-dark-foreground/70">
                Neuroscience-Powered Services
              </span>
            </div>
            <h1 className="heading-lg text-section-dark-foreground mb-4">
              Our Offerings
            </h1>
            <p className="body-md text-section-dark-foreground/60 max-w-2xl mx-auto">
              Three tiers of neuromarketing intelligence, from creative diagnostics to full market domination.
            </p>
          </motion.div>

          {/* 3-Column Grid */}
          <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            {levels.map((level, index) => (
              <motion.div
                key={level.level}
                id={level.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`scroll-mt-24 rounded-2xl overflow-hidden border ${level.borderColor} bg-white/[0.03] backdrop-blur-sm flex flex-col hover:border-opacity-60 transition-all duration-300 group`}
              >
                {/* Image Header */}
                <div className="relative h-40 lg:h-44 overflow-hidden">
                  <img
                    src={level.image}
                    alt={level.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${level.gradient} flex items-center justify-center flex-shrink-0`}>
                        <level.icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <span className={`text-[10px] font-bold uppercase tracking-widest bg-gradient-to-r ${level.gradient} bg-clip-text text-transparent`}>
                          Level {level.level}
                        </span>
                        <h3 className="text-lg font-bold text-white leading-tight">
                          {level.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <p className="text-section-dark-foreground/50 text-sm mb-5 leading-relaxed">
                    {level.subtitle}
                  </p>

                  <div className="space-y-3 flex-1">
                    {level.services.map((service, sIdx) => (
                      <motion.div
                        key={service}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.3 + index * 0.15 + sIdx * 0.08 }}
                        className={`flex gap-3 p-3 rounded-lg ${level.accentBg} transition-colors`}
                      >
                        <CheckCircle2 className={`w-4 h-4 ${level.accentColor} flex-shrink-0 mt-0.5`} />
                        <span className="text-section-dark-foreground/90 text-sm font-medium leading-snug">
                          {service}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-10 md:mt-14"
          >
            <p className="text-section-dark-foreground/50 text-sm mb-4">
              Ready to decode your consumers?
            </p>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-primary bg-gradient-to-r from-indigo-500 to-purple-500 border-0 hover:opacity-90"
            >
              Get in Touch
            </button>
          </motion.div>
        </div>
      </section>

      <FAQSection items={offeringsFAQs} variant="dark" />

      <Footer />
    </main>
  );
};

export default OfferingsPage;
