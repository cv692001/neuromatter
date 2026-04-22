import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import WhyHowSection from "@/components/WhyHowSection";
import TechBehindSection from "@/components/TechBehindSection";
import QuestionsSection from "@/components/QuestionsSection";
import TestimonialSection from "@/components/TestimonialSection";
// import PeopleSection from "@/components/PeopleSection"; // Hidden for now
import ClientsSection from "@/components/ClientsSection";
// import SeenAroundSection from "@/components/SeenAroundSection"; // Hidden for now - photos to be added later
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const landingFAQs = [
  {
    question: "What is neuromarketing?",
    answer:
      "Neuromarketing is a way to understand what people actually feel and notice—not just what they say. It tracks attention, emotion, and reactions to your ads, website, or branding so you can design things that truly work.",
  },
  {
    question: "How is neuromarketing different from A/B testing?",
    answer:
      "A/B testing shows you what worked. Neuromarketing shows you why it worked (or didn't). It helps you fix problems before wasting budget on trials.",
  },
  {
    question: "Why do customers say one thing but do another?",
    answer:
      "Because decisions are mostly subconscious. People say logical things, but they act based on emotions, attention, and instincts. Neuromarketing helps you see that hidden layer.",
  },
  {
    question: "Can neuromarketing increase conversions?",
    answer:
      "Yes—by showing exactly where users lose interest, get confused, or don't engage. Fix those points → better clicks, better conversions.",
  },
];

const Index = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <WhyHowSection />
      <TechBehindSection />
      <QuestionsSection />
      <TestimonialSection />
      {/* <PeopleSection /> */}
      <ClientsSection />
      {/* <SeenAroundSection /> */}
      <FAQSection items={landingFAQs} variant="light" />
      <Footer />
    </main>
  );
};

export default Index;
