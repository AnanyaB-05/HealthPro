import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import DiseasePrediction from "@/components/DiseasePrediction";
import DiseaseLibrary from "@/components/DiseaseLibrary";
import MentalHealthChat from "@/components/MentalHealthChat";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <DiseasePrediction />
      <DiseaseLibrary />
      <MentalHealthChat />
    </div>
  );
};

export default Index;