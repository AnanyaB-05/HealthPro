import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { LogOut, BookOpen, Brain, Activity, User, MapPin } from "lucide-react";

export const Route = createFileRoute("/home")({
  component: HomePage,
});

function HomePage() {
  const nav = useNavigate();
  const { user, profile, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) nav({ to: "/login" });
  }, [loading, user, nav]);

  async function logout() {
    await supabase.auth.signOut();
    toast.success("Signed out");
    nav({ to: "/login" });
  }

  const firstName = profile?.full_name?.split(" ")[0] ?? "there";

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "linear-gradient(rgba(15, 23, 42, 0.6), rgba(15, 23, 42, 0.6)), url('/a.jpg')",
      }}
    >
      <div className="min-h-screen bg-slate-950/60">
        <Toaster richColors position="top-center" />
        <header className="border-b border-border bg-card/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 flex flex-wrap items-center justify-between gap-4">
          <Logo />
          {profile && (
            <Card className="px-4 py-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
              <div className="flex items-center gap-1.5">
                <User className="h-4 w-4 text-primary" />
                <span className="font-semibold">{profile.full_name}</span>
              </div>
              <span className="text-muted-foreground">
                {profile.age ? `${profile.age} yrs` : ""}{profile.gender ? ` · ${profile.gender}` : ""}
              </span>
              {(profile.locality || profile.country) && (
                <span className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  {[profile.locality, profile.country].filter(Boolean).join(", ")}
                </span>
              )}
              <Button size="sm" variant="outline" onClick={logout}>
                <LogOut className="h-4 w-4 mr-1.5" />
                Logout
              </Button>
            </Card>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12">
        <section className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Welcome, {firstName}!
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            HealthPro is your personal health companion. Explore our disease library, talk to our
            empathetic mental health AI, or get a personalized disease risk prediction based on
            your health data — all in one place.
          </p>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-3">
          <FeatureCard
            to="/library"
            icon={<BookOpen className="h-7 w-7" />}
            title="Disease Library"
            desc="Browse 50+ common diseases with symptoms, prevention tips, treatment options, and warning signs."
            tone="primary"
          />
          <FeatureCard
            to="/chat"
            icon={<Brain className="h-7 w-7" />}
            title="Mental Health AI Chatbot"
            desc="Talk with our empathetic AI for emotional support, mood-aware conversation, and crisis resources."
            tone="accent"
          />
          <FeatureCard
            to="/predict"
            icon={<Activity className="h-7 w-7" />}
            title="Disease Prediction"
            desc="Enter your health metrics to assess risk for heart disease, diabetes, stroke and more."
            tone="primary"
          />
        </section>

        <p className="mt-12 text-center text-xs text-muted-foreground max-w-2xl mx-auto">
          HealthPro provides health information for educational purposes only and is not a
          substitute for professional medical advice, diagnosis, or treatment.
        </p>
      </main>
      </div>
    </div>
  );
}

function FeatureCard({
  to,
  icon,
  title,
  desc,
  tone,
}: {
  to: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  tone: "primary" | "accent";
}) {
  const bg = tone === "primary" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground";
  return (
    <Link
      to={to}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
    >
      <Card className="h-full p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
        <div className={`inline-flex h-14 w-14 items-center justify-center rounded-xl ${bg} shadow-sm`}>
          {icon}
        </div>
        <h3 className="mt-5 text-xl font-bold text-foreground">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
        <div className="mt-4 text-sm font-semibold text-primary group-hover:underline">
          Open →
        </div>
      </Card>
    </Link>
  );
}
