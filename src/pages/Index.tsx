import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import WhyHowSection from "@/components/WhyHowSection";
import TechBehindSection from "@/components/TechBehindSection";
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
      <TechBehindSection />
      {/* <PeopleSection /> */}
      <ClientsSection />
      {/* <SeenAroundSection /> */}
      <Footer />
    </main>
  );
};

export default Index;
