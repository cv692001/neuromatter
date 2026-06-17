import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Video, Brain, Users, FileBarChart, ArrowRight, Gauge, Film, ListChecks } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useScrollToHash } from "@/hooks/useScrollToHash";

const components = [
  {
    title: "Emotiv Insight",
    video: "/tech-emotiv-insight.mp4",
    poster: "/tech-emotiv-insight-poster.jpg",
    description:
      "The EEG technology Headset wore by your target audience to capture and analyze subconscious brain activity.",
    gradient: "from-blue-500 to-cyan-500",
    borderColor: "border-blue-500/30",
  },
  {
    title: "Brainviz",
    video: "/tech-brainviz.mp4",
    poster: "/tech-brainviz-poster.jpg",
    description:
      "Dynamic visualization of multi-regional brain activity and neural fluctuations captured upon viewing the advertisement.",
    gradient: "from-amber-500 to-orange-500",
    borderColor: "border-amber-500/30",
  },
  {
    title: "EmotivPRO",
    video: "/tech-emotivpro.mp4",
    poster: "/tech-emotivpro-poster.jpg",
    description:
      "Visualizing the subconscious: Multi-regional brain activity triggered by your advertisement.",
    gradient: "from-purple-500 to-pink-500",
    borderColor: "border-purple-500/30",
  },
];

const VideoCard = ({
  item,
  index,
  isInView,
}: {
  item: (typeof components)[number];
  index: number;
  isInView: boolean;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isInView && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [isInView]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`rounded-2xl overflow-hidden border ${item.borderColor} bg-white/[0.03] backdrop-blur-sm flex flex-col hover:border-opacity-60 transition-all duration-300 group`}
    >
      {/* Video */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
        <video
          ref={videoRef}
          src={item.video}
          poster={item.poster}
          muted
          loop
          playsInline
          autoPlay
          className="w-full h-full object-cover"
        />
      </div>

      {/* Description */}
      <div className="p-5 flex-1 flex flex-col items-center">
        <p className="text-section-dark-foreground/60 text-sm leading-relaxed text-center">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
};

const reportCategories = [
  {
    title: "Prioritised Performance Metrics",
    icon: Gauge,
    gradient: "from-rose-500 to-orange-500",
    border: "border-rose-500/30",
    glow: "bg-rose-500/10",
    points: [
      "Overall Neuro Effectiveness Score",
      "Attention & Memory Encoding rankings",
      "Emotional Valence breakdown across segments",
      "Benchmarked against category norms",
    ],
  },
  {
    title: "Frame-by-Frame Breakdown",
    icon: Film,
    gradient: "from-sky-500 to-blue-500",
    border: "border-sky-500/30",
    glow: "bg-sky-500/10",
    points: [
      "Second-by-second neural response timeline",
      "Peak attention & drop-off moments identified",
      "Memory-encoding hotspots mapped to each frame",
      "Visual saliency overlay on key scenes",
    ],
  },
  {
    title: "Detailed Phase-wise Actionables",
    icon: ListChecks,
    gradient: "from-emerald-500 to-green-500",
    border: "border-emerald-500/30",
    glow: "bg-emerald-500/10",
    points: [
      "Pre-launch optimisation recommendations",
      "Creative edits prioritised by neural impact",
      "Media-spend allocation guidance per phase",
      "Post-launch measurement framework",
    ],
  },
];

const TechnologyPage = () => {
  const ref = useRef(null);
  const frameworkRef = useRef(null);
  const reportRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const frameworkInView = useInView(frameworkRef, { once: true, margin: "-50px" });
  const reportInView = useInView(reportRef, { once: true, margin: "-50px" });

  useScrollToHash();

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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-sm text-section-dark-foreground/70">
                Neuroscience-Powered Stack
              </span>
            </div>
            <h1 className="heading-lg text-section-dark-foreground mb-4">
              Technology
            </h1>
            <p className="body-md text-section-dark-foreground/60 max-w-2xl mx-auto">
              Advanced brain imaging methodology for marketing applications, powered by three decades of neuroscience research.
            </p>
          </motion.div>

          {/* Section Heading */}
          <motion.h2
            id="components"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="scroll-mt-24 text-2xl md:text-3xl font-bold text-center text-section-dark-foreground mb-10 md:mb-14"
          >
            The Components
          </motion.h2>

          {/* Video Cards — 3 columns side by side */}
          <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {components.map((item, index) => (
              <VideoCard
                key={item.title}
                item={item}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>

          {/* The Framework */}
          <div ref={frameworkRef} id="framework" className="scroll-mt-24 mt-20 md:mt-28">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={frameworkInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-2xl md:text-3xl font-bold text-center text-section-dark-foreground mb-10 md:mb-14"
            >
              The Framework
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-5 max-w-5xl mx-auto">
              {[
                {
                  step: 1,
                  title: "You Give",
                  description: "You share your marketing stimuli with us",
                  icon: Video,
                  gradient: "from-yellow-400 to-amber-500",
                  border: "border-yellow-500/30",
                  glow: "bg-yellow-500/10",
                },
                {
                  step: 2,
                  title: "Technology",
                  description: "Audience wears EEG Machine & we analyse their brain response",
                  icon: Brain,
                  gradient: "from-blue-400 to-cyan-500",
                  border: "border-blue-500/30",
                  glow: "bg-blue-500/10",
                },
                {
                  step: 3,
                  title: "Process",
                  description: "Team of Neuroscientists & Marketers join hands to draw conclusions from brain-data of target audience",
                  icon: Users,
                  gradient: "from-emerald-400 to-teal-500",
                  border: "border-emerald-500/30",
                  glow: "bg-emerald-500/10",
                },
                {
                  step: 4,
                  title: "You Receive",
                  description: "Recommendation Report with insights",
                  icon: FileBarChart,
                  gradient: "from-purple-400 to-pink-500",
                  border: "border-purple-500/30",
                  glow: "bg-purple-500/10",
                },
              ].map((item, index) => (
                <div key={item.step} className="flex items-stretch">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={frameworkInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.12 }}
                    className={`flex-1 rounded-2xl border ${item.border} bg-white/[0.03] backdrop-blur-sm p-6 flex flex-col items-center text-center relative group hover:bg-white/[0.06] transition-colors`}
                  >
                    {/* Step number */}
                    <span className={`text-[11px] font-bold uppercase tracking-widest bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent mb-4`}>
                      Step {item.step}
                    </span>

                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-2xl ${item.glow} flex items-center justify-center mb-5`}>
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center`}>
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-section-dark-foreground mb-2">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-section-dark-foreground/50 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>

                  {/* Arrow between cards (desktop only, not after last) */}
                  {index < 3 && (
                    <div className="hidden md:flex items-center px-1">
                      <ArrowRight className="w-4 h-4 text-section-dark-foreground/20" />
                    </div>
                  )}
                </div>
              ))}
            </div>


          </div>

          {/* Performance Report & Actionable Recommendations */}
          <div ref={reportRef} id="performance-report" className="scroll-mt-24 mt-20 md:mt-28">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={reportInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-2xl md:text-3xl font-bold text-center text-section-dark-foreground mb-4"
            >
              Performance Report & Actionable Recommendations
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={reportInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-section-dark-foreground/50 text-sm text-center max-w-2xl mx-auto mb-10 md:mb-14"
            >
              Every engagement culminates in a comprehensive report. Here's what you walk away with.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {reportCategories.map((cat, index) => (
                <motion.div
                  key={cat.title}
                  initial={{ opacity: 0, y: 35 }}
                  animate={reportInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className={`rounded-2xl border ${cat.border} bg-white/[0.03] backdrop-blur-sm p-7 flex flex-col hover:bg-white/[0.06] transition-colors`}
                >
                  {/* Icon + Title */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className={`w-12 h-12 rounded-xl ${cat.glow} flex items-center justify-center flex-shrink-0`}>
                      <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${cat.gradient} flex items-center justify-center`}>
                        <cat.icon className="w-4.5 h-4.5 text-white" />
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-section-dark-foreground leading-snug">
                      {cat.title}
                    </h3>
                  </div>

                  {/* Bullet points */}
                  <ul className="space-y-3 flex-1">
                    {cat.points.map((point, pIdx) => (
                      <motion.li
                        key={point}
                        initial={{ opacity: 0, x: -10 }}
                        animate={reportInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 + pIdx * 0.06 }}
                        className="flex gap-3 items-start"
                      >
                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${cat.gradient} flex-shrink-0`} />
                        <span className="text-section-dark-foreground/60 text-sm leading-relaxed">
                          {point}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default TechnologyPage;
