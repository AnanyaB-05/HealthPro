import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Activity, Brain, Shield, ArrowRight, Sparkles, Heart } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fun gradient background with multiple colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-cyan-500/20 to-pink-500/20" />
      
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-violet-400/30 to-purple-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-rose-500/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }} />
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }} />
        <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.5s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center space-y-10 animate-fade-in">
          {/* Fun Badge with sparkles */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-violet-500/20 via-cyan-500/20 to-pink-500/20 border-2 border-violet-400/30 backdrop-blur-md shadow-lg">
            <Sparkles className="w-5 h-5 text-violet-400 animate-pulse" />
            <span className="text-sm font-bold bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">
              AI-Powered Healthcare Revolution
            </span>
            <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
          </div>

          {/* Main heading with playful gradient */}
          <h1 className="text-6xl md:text-8xl font-black leading-tight">
            <span className="bg-gradient-to-r from-violet-600 via-cyan-500 to-pink-600 bg-clip-text text-transparent drop-shadow-2xl">
              Your Health,
            </span>
            <br />
            <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-orange-500 bg-clip-text text-transparent drop-shadow-2xl">
              Predicted & Protected
            </span>
          </h1>

          {/* Subheading with emphasis */}
          <p className="text-xl md:text-2xl text-foreground/80 max-w-4xl mx-auto leading-relaxed font-medium">
            Advanced machine learning for disease prediction combined with
            AI-powered mental health support. Get early diagnosis, preventive
            care, and emotional wellness in one{" "}
            <span className="bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent font-bold">
              integrated platform
            </span>
            .
          </p>

          {/* Creative CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-6">
            <Button
              size="lg"
              onClick={() => navigate("/predict")}
              className="group relative px-8 py-6 text-lg font-bold bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white rounded-2xl shadow-2xl hover:shadow-violet-500/50 transition-all duration-300 hover:scale-110 border-0"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Heart className="w-6 h-6 group-hover:scale-125 transition-transform" />
                Start Health Assessment
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-violet-600 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity" />
            </Button>

            <Button
              size="lg"
              onClick={() => navigate("/mental-health")}
              className="group relative px-8 py-6 text-lg font-bold bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white rounded-2xl shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 hover:scale-110 border-0"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Brain className="w-6 h-6 group-hover:rotate-12 group-hover:scale-125 transition-transform" />
                Mental Health Support
                <Sparkles className="w-6 h-6 group-hover:rotate-180 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-pink-600 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity" />
            </Button>
          </div>

          {/* Creative Feature Cards with gradients */}
          <div className="grid md:grid-cols-3 gap-8 pt-20 max-w-6xl mx-auto">
            <div className="group relative p-8 rounded-3xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 backdrop-blur-xl border-2 border-violet-400/30 hover:border-violet-400/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/30 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-400/0 to-purple-400/0 group-hover:from-violet-400/10 group-hover:to-purple-400/10 rounded-3xl transition-all duration-500" />
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                  <Activity className="w-8 h-8 text-white animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  Disease Prediction
                </h3>
                <p className="text-foreground/70 text-lg">
                  ML algorithms predict diabetes, heart disease, and more
                </p>
              </div>
            </div>

            <div className="group relative p-8 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl border-2 border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 to-blue-400/0 group-hover:from-cyan-400/10 group-hover:to-blue-400/10 rounded-3xl transition-all duration-500" />
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                  <Brain className="w-8 h-8 text-white animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  Mental Health AI
                </h3>
                <p className="text-foreground/70 text-lg">
                  NLP-powered chatbot for emotional support
                </p>
              </div>
            </div>

            <div className="group relative p-8 rounded-3xl bg-gradient-to-br from-pink-500/10 to-rose-500/10 backdrop-blur-xl border-2 border-pink-400/30 hover:border-pink-400/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/30 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400/0 to-rose-400/0 group-hover:from-pink-400/10 group-hover:to-rose-400/10 rounded-3xl transition-all duration-500" />
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                  <Shield className="w-8 h-8 text-white animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  Holistic Care
                </h3>
                <p className="text-foreground/70 text-lg">
                  Complete physical and mental health platform
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
