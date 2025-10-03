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
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button 
              className="group relative px-8 py-6 bg-white text-primary font-bold text-lg rounded-2xl overflow-hidden shadow-large hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={() => navigate('/predict')}
            >
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <span className="relative flex items-center gap-3">
                Start Health Assessment
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
            
            <button 
              className="group relative px-8 py-6 font-bold text-lg rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105"
              onClick={() => navigate('/mental-health')}
            >
              <div className="absolute inset-0 bg-white/20 backdrop-blur-md border-2 border-white/40 rounded-2xl"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <span className="relative flex items-center gap-3 text-white">
                <Brain className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                Talk to Mental Health AI
              </span>
            </button>
          </div>

          {/* Feature Icons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="group bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-large cursor-pointer">
              <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-6 transition-transform duration-300">
                <Activity className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Disease Prediction</h3>
              <p className="text-white/80 text-sm">ML algorithms predict diabetes, heart disease, and more</p>
            </div>
            
            <div className="group bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-large cursor-pointer">
              <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-6 transition-transform duration-300">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Mental Health AI</h3>
              <p className="text-white/80 text-sm">NLP-powered chatbot for emotional support</p>
            </div>
            
            <div className="group bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-large cursor-pointer">
              <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-6 transition-transform duration-300">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Holistic Care</h3>
              <p className="text-white/80 text-sm">Complete physical and mental health platform</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;