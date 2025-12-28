import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import WhyHowSection from "@/components/WhyHowSection";
import QuestionsSection from "@/components/QuestionsSection";
import TestimonialSection from "@/components/TestimonialSection";
import ClientsSection from "@/components/ClientsSection";
import SeenAroundSection from "@/components/SeenAroundSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <WhyHowSection />
      <QuestionsSection />
      <TestimonialSection />
      <ClientsSection />
      <SeenAroundSection />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Index;
