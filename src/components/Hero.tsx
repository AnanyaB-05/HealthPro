import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Activity, Brain, Shield, ArrowRight, Sparkles, Heart } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center space-y-10 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-foreground">
              AI-Powered Healthcare Revolution
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-6xl md:text-8xl font-black leading-tight">
            <span className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Your Health,
            </span>
            <br />
            <span className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Predicted & Protected
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Advanced machine learning for disease prediction combined with
            AI-powered mental health support. Get early diagnosis, preventive
            care, and emotional wellness in one integrated platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-6">
            <Button
              size="lg"
              onClick={() => navigate("/predict")}
              className="px-8 py-6 text-lg font-semibold"
            >
              <Heart className="w-6 h-6" />
              Start Health Assessment
              <ArrowRight className="w-6 h-6" />
            </Button>

            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate("/mental-health")}
              className="px-8 py-6 text-lg font-semibold"
            >
              <Brain className="w-6 h-6" />
              Mental Health Support
              <Sparkles className="w-6 h-6" />
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 pt-20 max-w-6xl mx-auto">
            <div className="p-8 rounded-3xl bg-card backdrop-blur-xl border border-border hover:border-primary/50 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Activity className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-card-foreground">
                Disease Prediction
              </h3>
              <p className="text-muted-foreground text-lg">
                ML algorithms predict diabetes, heart disease, and more
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-card backdrop-blur-xl border border-border hover:border-primary/50 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Brain className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-card-foreground">
                Mental Health AI
              </h3>
              <p className="text-muted-foreground text-lg">
                NLP-powered chatbot for emotional support
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-card backdrop-blur-xl border border-border hover:border-primary/50 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-card-foreground">
                Holistic Care
              </h3>
              <p className="text-muted-foreground text-lg">
                Complete physical and mental health platform
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
