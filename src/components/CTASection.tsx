import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles } from "lucide-react";
import EmailCaptureBar from "./EmailCaptureBar";

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 md:py-20 px-6 md:px-12 lg:px-20 bg-background">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-10 md:p-16"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
          </div>
          
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-white/80 text-sm font-medium">Ready to unlock consumer insights?</span>
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-wide">
              JOIN THE WAITLIST TODAY
            </h2>
            
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8">
              Enter your details below &amp; our team will contact you shortly
            </p>

            <EmailCaptureBar variant="lightOnDark" className="max-w-md" showLabel={false} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
