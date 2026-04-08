import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Brain, BookOpen, Heart, ArrowRight, TrendingUp, Shield, Sparkles, BarChart3 } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Activity,
      title: "Disease Prediction",
      description: "AI-powered risk assessment for diabetes, heart disease and more with actionable insights.",
      href: "/predict",
      gradient: "from-primary to-primary-dark",
    },
    {
      icon: Brain,
      title: "Mental Health",
      description: "Talk to our AI chatbot for emotional support, stress relief and wellness guidance.",
      href: "/mental-health",
      gradient: "from-secondary to-tertiary",
    },
    {
      icon: BookOpen,
      title: "Disease Library",
      description: "Comprehensive information on diseases, symptoms, treatments and prevention methods.",
      href: "/disease-library",
      gradient: "from-tertiary to-primary",
    },
  ];

  const stats = [
    { value: "10+", label: "Diseases Covered", icon: Shield },
    { value: "AI", label: "Powered Chatbot", icon: Sparkles },
    { value: "24/7", label: "Available Support", icon: Heart },
    { value: "Free", label: "Health Reports", icon: BarChart3 },
  ];

  return (
    <div className="pt-20 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary">
              <Sparkles className="w-4 h-4" />
              AI-Powered Healthcare Platform
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Your Health,{" "}
              <span className="text-gradient">Predicted & Protected</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Advanced machine learning for disease prediction combined with AI-powered mental health support.
              Get early diagnosis, preventive care, and emotional wellness in one platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" onClick={() => navigate("/predict")} className="bg-gradient-primary border-0 gap-2 px-8 h-12 text-base">
                <TrendingUp className="w-5 h-5" />
                Start Health Assessment
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/mental-health")} className="gap-2 px-8 h-12 text-base">
                <Brain className="w-5 h-5" />
                Chat with AI
              </Button>
            </div>
          </div>

          {/* Stats bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map((stat, i) => (
              <div key={i} className="text-center p-4 rounded-2xl glass">
                <stat.icon className="h-5 w-5 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground">Everything You Need</h2>
          <p className="text-muted-foreground mt-2">Comprehensive health tools powered by artificial intelligence</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <Card
                key={i}
                className="group cursor-pointer hover:shadow-large transition-all duration-300 border-border/50 overflow-hidden"
                onClick={() => navigate(feature.href)}
              >
                <CardContent className="p-8 space-y-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center`}>
                    <Icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-card-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                    Explore <ArrowRight className="w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-3xl bg-gradient-primary p-12 text-center text-primary-foreground">
          <h2 className="text-3xl font-bold mb-3">Ready to Take Control of Your Health?</h2>
          <p className="text-primary-foreground/80 mb-6 max-w-lg mx-auto">
            Start with a free health assessment and discover personalized insights powered by AI.
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => navigate("/predict")}
            className="gap-2 px-8 h-12"
          >
            Get Started Now <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Hero;
