import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import WhyHowSection from "@/components/WhyHowSection";
import QuestionsSection from "@/components/QuestionsSection";
import TechnologySection from "@/components/TechnologySection";
import TestimonialSection from "@/components/TestimonialSection";
// import PeopleSection from "@/components/PeopleSection"; // Hidden for now
import ClientsSection from "@/components/ClientsSection";
// import SeenAroundSection from "@/components/SeenAroundSection"; // Hidden for now - photos to be added later
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <WhyHowSection />
      <QuestionsSection />
      <TechnologySection />
      <TestimonialSection />
      {/* <PeopleSection /> */}
      <ClientsSection />
      {/* <SeenAroundSection /> */}
      <Footer />
    </main>
  );
};

export default Index;
