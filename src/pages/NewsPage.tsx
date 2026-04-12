import { useEffect } from "react";
import Header from "@/components/Header";
import NewsSection from "@/components/NewsSection";
import Footer from "@/components/Footer";

const NewsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-16 md:pt-20">
        <NewsSection />
      </div>
      <Footer />
    </main>
  );
};

export default NewsPage;
