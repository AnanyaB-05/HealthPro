import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Brain, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white mb-8">
            <Shield className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">AI-Powered Healthcare Platform</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Your Health,
            <br />
            <span className="bg-white bg-clip-text text-transparent">
              Predicted & Protected
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Advanced machine learning for disease prediction combined with AI-powered mental health support. 
            Get early diagnosis, preventive care, and emotional wellness in one integrated platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 transition-smooth px-8 py-6 text-lg font-semibold rounded-xl"
              onClick={() => navigate('/predict')}
            >
              Start Health Assessment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 transition-smooth px-8 py-6 text-lg rounded-xl"
              onClick={() => navigate('/mental-health')}
            >
              Talk to Mental Health AI
            </Button>
          </div>

          {/* Feature Icons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <Activity className="h-12 w-12 text-white mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Disease Prediction</h3>
              <p className="text-white/80">ML algorithms predict diabetes, heart disease, and more</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <Brain className="h-12 w-12 text-white mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Mental Health AI</h3>
              <p className="text-white/80">NLP-powered chatbot for emotional support</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <Shield className="h-12 w-12 text-white mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Holistic Care</h3>
              <p className="text-white/80">Complete physical and mental health platform</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;