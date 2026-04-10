import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import NodeEconomySection from "@/components/NodeEconomySection";
import UseCasesSection from "@/components/UseCasesSection";
import RoadmapSection from "@/components/RoadmapSection";
import EcosystemSection from "@/components/EcosystemSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <HowItWorksSection />
      <NodeEconomySection />
      <UseCasesSection />
      <RoadmapSection />
      <EcosystemSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
