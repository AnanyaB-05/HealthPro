import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Logo } from "@/components/Logo";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
});

const COUNTRIES = [
  "United States", "United Kingdom", "Canada", "Australia", "India", "Germany",
  "France", "Spain", "Italy", "Brazil", "Mexico", "Japan", "China", "South Korea",
  "Singapore", "Netherlands", "Sweden", "Norway", "Denmark", "Finland", "Ireland",
  "New Zealand", "South Africa", "Nigeria", "Kenya", "Egypt", "UAE", "Saudi Arabia",
  "Pakistan", "Bangladesh", "Indonesia", "Philippines", "Vietnam", "Thailand",
  "Malaysia", "Argentina", "Chile", "Colombia", "Other",
];

function passwordStrength(pw: string): { score: number; label: string; color: string } {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (pw.length >= 12) score++;
  const map = [
    { label: "Too weak", color: "bg-destructive" },
    { label: "Weak", color: "bg-destructive" },
    { label: "Fair", color: "bg-yellow-500" },
    { label: "Good", color: "bg-accent" },
    { label: "Strong", color: "bg-accent" },
    { label: "Very strong", color: "bg-accent" },
  ];
  return { score, ...map[Math.min(score, 5)] };
}

function SignupPage() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirm: "",
    gender: "",
    age: "",
    locality: "",
    country: "",
    agree: false,
  });
  const [loading, setLoading] = useState(false);

  const pw = useMemo(() => passwordStrength(form.password), [form.password]);

  function update<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.fullName.trim()) return toast.error("Please enter your full name");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return toast.error("Invalid email");
    if (form.password.length < 8) return toast.error("Password must be at least 8 characters");
    if (form.password !== form.confirm) return toast.error("Passwords do not match");
    if (!form.gender) return toast.error("Please select gender");
    const ageNum = parseInt(form.age, 10);
    if (!ageNum || ageNum < 1 || ageNum > 120) return toast.error("Enter a valid age");
    if (!form.locality.trim()) return toast.error("Please enter your locality");
    if (!form.country) return toast.error("Please select your country");
    if (!form.agree) return toast.error("You must accept the Terms & Conditions");

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        emailRedirectTo: `${window.location.origin}/home`,
        data: {
          full_name: form.fullName,
          gender: form.gender,
          age: String(ageNum),
          locality: form.locality,
          country: form.country,
        },
      },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Account created! Welcome to HealthPro.");
    nav({ to: "/home" });
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "linear-gradient(rgba(15, 23, 42, 0.65), rgba(15, 23, 42, 0.65)), url('/b.png')",
      }}
    >
      <div className="min-h-screen flex items-center justify-center px-4 py-10">
        <Toaster richColors position="top-center" />
        <div className="w-full max-w-2xl">
          <Card className="p-8 shadow-2xl backdrop-blur-md bg-slate-950/70 border border-white/10 text-white">
            <div className="flex justify-center mb-6">
              <Logo size="lg" />
            </div>
            <h1 className="text-2xl font-bold">Create your account</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Join HealthPro to access personalized health insights.
            </p>
            <form onSubmit={submit} className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={form.password} onChange={(e) => update("password", e.target.value)} />
                {form.password && (
                  <div className="mt-2">
                    <div className="flex h-1.5 gap-1">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`flex-1 rounded ${i < pw.score ? pw.color : "bg-muted"}`}
                        />
                      ))}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{pw.label}</p>
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="confirm">Confirm Password</Label>
                <Input id="confirm" type="password" value={form.confirm} onChange={(e) => update("confirm", e.target.value)} />
              </div>
              <div>
                <Label>Gender</Label>
                <Select value={form.gender} onValueChange={(v) => update("gender", v)}>
                  <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                    <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" min={1} max={120} value={form.age} onChange={(e) => update("age", e.target.value)} />
              </div>
              <div>
                <Label htmlFor="locality">Locality / City</Label>
                <Input id="locality" value={form.locality} onChange={(e) => update("locality", e.target.value)} />
              </div>
              <div>
                <Label>Country</Label>
                <Select value={form.country} onValueChange={(v) => update("country", v)}>
                  <SelectTrigger><SelectValue placeholder="Select country" /></SelectTrigger>
                  <SelectContent className="max-h-72">
                    {COUNTRIES.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="sm:col-span-2 flex items-start gap-2">
                <Checkbox id="agree" checked={form.agree} onCheckedChange={(v) => update("agree", v === true)} />
                <Label htmlFor="agree" className="text-sm font-normal leading-snug">
                  I accept the Terms & Conditions and Privacy Policy. I understand HealthPro is not a substitute for professional medical advice.
                </Label>
              </div>
              <div className="sm:col-span-2">
                <Button type="submit" disabled={loading} className="w-full">
                  {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Create Account
                </Button>
              </div>
            </form>
            <p className="mt-6 text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
