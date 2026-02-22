  import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";

const OfferingsPage = () => {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <section className="section-padding bg-section-dark flex-1 flex items-center justify-center">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <h1 className="heading-lg text-section-dark-foreground mb-4">
              Work in progress
            </h1>
            <p className="text-section-dark-foreground/70 body-md mb-10">
              We're building something great. Our offerings will be here soon.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-section-dark-foreground font-medium hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default OfferingsPage;
