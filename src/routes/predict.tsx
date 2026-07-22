import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { BackToHome } from "@/components/BackToHome";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Activity, RotateCcw, Stethoscope } from "lucide-react";

export const Route = createFileRoute("/predict")({
  component: PredictPage,
});

type Form = {
  age: string; gender: string;
  systolic: string; diastolic: string;
  cholesterol: string; heartRate: string; fbs: string; bmi: string;
  smoking: string; alcohol: string; activity: string;
  familyHistory: boolean; diabetes: string;
  stress: number; sleep: string;
};

const initial: Form = {
  age: "", gender: "", systolic: "", diastolic: "", cholesterol: "",
  heartRate: "", fbs: "", bmi: "", smoking: "", alcohol: "", activity: "",
  familyHistory: false, diabetes: "", stress: 5, sleep: "",
};

type Prediction = {
  name: string; percent: number; level: "Low" | "Moderate" | "High" | "Very High";
  description: string; actions: string[]; consult: boolean;
};

function clamp(n: number, lo = 0, hi = 100) { return Math.max(lo, Math.min(hi, n)); }
function level(p: number): Prediction["level"] {
  if (p < 25) return "Low";
  if (p < 50) return "Moderate";
  if (p < 75) return "High";
  return "Very High";
}

function predict(f: Form): Prediction[] {
  const age = +f.age || 0;
  const sys = +f.systolic || 0;
  const dia = +f.diastolic || 0;
  const hr = +f.heartRate || 0;
  const fbs = +f.fbs || 0;
  const bmi = +f.bmi || 0;
  const sleep = +f.sleep || 7;

  const chol = f.cholesterol; const smoke = f.smoking; const alc = f.alcohol;
  const act = f.activity; const dia2 = f.diabetes;
  const stress = f.stress;

  // Cardiovascular (Framingham-inspired heuristic)
  let cv = 0;
  cv += age >= 65 ? 30 : age >= 55 ? 22 : age >= 45 ? 14 : age >= 35 ? 7 : 2;
  cv += sys >= 160 ? 20 : sys >= 140 ? 14 : sys >= 130 ? 8 : sys >= 120 ? 3 : 0;
  cv += chol === "High" ? 15 : chol === "Borderline High" ? 8 : 0;
  cv += smoke === "Current" ? 18 : smoke === "Former" ? 6 : 0;
  cv += f.familyHistory ? 12 : 0;
  cv += dia2 !== "No" && dia2 ? 10 : 0;
  cv += bmi >= 30 ? 8 : bmi >= 25 ? 4 : 0;
  cv -= act === "Very Active" ? 8 : act === "Active" ? 5 : act === "Moderate" ? 2 : 0;
  cv = clamp(cv);

  // Type 2 Diabetes (FINDRISC-inspired)
  let db = 0;
  db += age >= 65 ? 20 : age >= 55 ? 14 : age >= 45 ? 9 : 3;
  db += bmi >= 30 ? 20 : bmi >= 25 ? 10 : 0;
  db += fbs >= 126 ? 30 : fbs >= 100 ? 15 : 0;
  db += act === "Sedentary" ? 12 : act === "Moderate" ? 4 : 0;
  db += f.familyHistory ? 8 : 0;
  db += dia2 === "Pre-diabetic" ? 25 : 0;
  db = clamp(db);

  // Hypertension
  let ht = 0;
  ht += sys >= 140 || dia >= 90 ? 50 : sys >= 130 || dia >= 80 ? 30 : sys >= 120 ? 12 : 0;
  ht += age >= 55 ? 15 : age >= 40 ? 8 : 0;
  ht += bmi >= 30 ? 12 : bmi >= 25 ? 6 : 0;
  ht += alc === "High" ? 12 : alc === "Moderate" ? 5 : 0;
  ht += stress >= 7 ? 8 : 0;
  ht = clamp(ht);

  // Stroke
  let st = 0;
  st += Math.round(cv * 0.55);
  st += sys >= 160 ? 15 : sys >= 140 ? 8 : 0;
  st += smoke === "Current" ? 8 : 0;
  st += age >= 65 ? 10 : 0;
  st = clamp(st);

  // High Cholesterol
  let hc = 0;
  hc += chol === "High" ? 70 : chol === "Borderline High" ? 45 : 15;
  hc += bmi >= 30 ? 10 : bmi >= 25 ? 5 : 0;
  hc += act === "Sedentary" ? 8 : 0;
  hc += age >= 50 ? 8 : 0;
  hc = clamp(hc);

  // Obesity complications
  let ob = 0;
  ob += bmi >= 35 ? 80 : bmi >= 30 ? 55 : bmi >= 25 ? 25 : 5;
  ob += act === "Sedentary" ? 10 : 0;
  ob += sleep < 6 ? 5 : 0;
  ob = clamp(ob);

  // Respiratory
  let rp = 0;
  rp += smoke === "Current" ? 50 : smoke === "Former" ? 20 : 5;
  rp += age >= 60 ? 15 : age >= 45 ? 8 : 0;
  rp += hr > 100 ? 8 : 0;
  rp = clamp(rp);

  return [
    {
      name: "Cardiovascular / Heart Disease",
      percent: cv, level: level(cv),
      description: "Risk of coronary artery disease, heart attack, or other cardiac events.",
      actions: ["Aim for 150 min moderate exercise weekly", "Adopt a heart-healthy (Mediterranean) diet", "Manage blood pressure and cholesterol", "Quit smoking"],
      consult: cv >= 50,
    },
    {
      name: "Type 2 Diabetes",
      percent: db, level: level(db),
      description: "Risk of developing high blood sugar and insulin resistance.",
      actions: ["Reduce refined carbs and sugar", "Maintain healthy weight", "Annual blood glucose screening", "Strength + cardio exercise"],
      consult: db >= 50,
    },
    {
      name: "Hypertension",
      percent: ht, level: level(ht),
      description: "Risk of chronically elevated blood pressure.",
      actions: ["Limit sodium to <2,300 mg/day", "Practice stress management", "Limit alcohol", "Home BP monitoring"],
      consult: ht >= 50,
    },
    {
      name: "Stroke",
      percent: st, level: level(st),
      description: "Risk of disruption of blood supply to the brain.",
      actions: ["Control blood pressure", "Manage atrial fibrillation if present", "Quit smoking", "Maintain healthy cholesterol"],
      consult: st >= 50,
    },
    {
      name: "High Cholesterol",
      percent: hc, level: level(hc),
      description: "Risk of elevated LDL and total cholesterol levels.",
      actions: ["Limit saturated fats", "Eat more soluble fiber (oats, beans)", "Lipid panel every 4-6 years", "Regular aerobic exercise"],
      consult: hc >= 50,
    },
    {
      name: "Obesity Complications",
      percent: ob, level: level(ob),
      description: "Risk of weight-related complications (joint, metabolic, cardiovascular).",
      actions: ["Aim for sustainable 5-10% weight loss", "Track calories and portions", "Strength training 2-3x/week", "Improve sleep quality"],
      consult: ob >= 60,
    },
    {
      name: "Respiratory Issues",
      percent: rp, level: level(rp),
      description: "Risk of chronic lung conditions (COPD, asthma exacerbation).",
      actions: ["Quit smoking and avoid secondhand smoke", "Get pneumonia and flu vaccines", "Avoid air pollutants", "Pulmonary function testing if symptomatic"],
      consult: rp >= 50,
    },
  ];
}

function PredictPage() {
  const nav = useNavigate();
  const { user, loading } = useAuth();
  const [form, setForm] = useState<Form>(initial);
  const [results, setResults] = useState<Prediction[] | null>(null);

  useEffect(() => {
    if (!loading && !user) nav({ to: "/login" });
  }, [loading, user, nav]);

  function update<K extends keyof Form>(k: K, v: Form[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setResults(predict(form));
  }

  function reset() { setForm(initial); setResults(null); }

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "linear-gradient(rgba(15, 23, 42, 0.6), rgba(15, 23, 42, 0.6)), url('/d.png')",
      }}
    >
      <div className="min-h-screen bg-slate-950/70">
        <header className="border-b border-border bg-card/80 backdrop-blur sticky top-0 z-10">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <BackToHome />
          <h1 className="text-lg font-bold flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Disease Risk Prediction
          </h1>
          <div className="w-32" />
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 grid gap-6 lg:grid-cols-2">
        {/* Left: form */}
        <Card className="p-6 h-fit">
          <h2 className="text-xl font-bold">Your Health Data</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Enter the most accurate values you have for the best prediction.
          </p>
          <form onSubmit={submit} className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Age</Label>
              <Input type="number" min={1} max={120} value={form.age} onChange={(e) => update("age", e.target.value)} required />
            </div>
            <div>
              <Label>Gender</Label>
              <Select value={form.gender} onValueChange={(v) => update("gender", v)}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Systolic BP (mmHg)</Label>
              <Input type="number" value={form.systolic} onChange={(e) => update("systolic", e.target.value)} />
            </div>
            <div>
              <Label>Diastolic BP (mmHg)</Label>
              <Input type="number" value={form.diastolic} onChange={(e) => update("diastolic", e.target.value)} />
            </div>
            <div>
              <Label>Cholesterol Level</Label>
              <Select value={form.cholesterol} onValueChange={(v) => update("cholesterol", v)}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Normal">Normal</SelectItem>
                  <SelectItem value="Borderline High">Borderline High</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Heart Rate (BPM)</Label>
              <Input type="number" value={form.heartRate} onChange={(e) => update("heartRate", e.target.value)} />
            </div>
            <div>
              <Label>Fasting Blood Sugar (mg/dL)</Label>
              <Input type="number" value={form.fbs} onChange={(e) => update("fbs", e.target.value)} />
            </div>
            <div>
              <Label>BMI</Label>
              <Input type="number" step="0.1" value={form.bmi} onChange={(e) => update("bmi", e.target.value)} />
            </div>
            <div>
              <Label>Smoking Status</Label>
              <Select value={form.smoking} onValueChange={(v) => update("smoking", v)}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Never">Never</SelectItem>
                  <SelectItem value="Former">Former</SelectItem>
                  <SelectItem value="Current">Current</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Alcohol Consumption</Label>
              <Select value={form.alcohol} onValueChange={(v) => update("alcohol", v)}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="None">None</SelectItem>
                  <SelectItem value="Moderate">Moderate</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Physical Activity</Label>
              <Select value={form.activity} onValueChange={(v) => update("activity", v)}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sedentary">Sedentary</SelectItem>
                  <SelectItem value="Moderate">Moderate</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Very Active">Very Active</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Diabetes Status</Label>
              <Select value={form.diabetes} onValueChange={(v) => update("diabetes", v)}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="No">No</SelectItem>
                  <SelectItem value="Pre-diabetic">Pre-diabetic</SelectItem>
                  <SelectItem value="Type 1">Type 1</SelectItem>
                  <SelectItem value="Type 2">Type 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between rounded-md border border-border p-3">
              <Label className="font-normal">Family history of heart disease</Label>
              <Switch checked={form.familyHistory} onCheckedChange={(v) => update("familyHistory", v)} />
            </div>
            <div>
              <Label>Sleep (hours/night)</Label>
              <Input type="number" step="0.5" value={form.sleep} onChange={(e) => update("sleep", e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <Label>Stress Level: <span className="text-primary font-bold">{form.stress}/10</span></Label>
              <Slider min={1} max={10} step={1} value={[form.stress]} onValueChange={(v) => update("stress", v[0])} className="mt-3" />
            </div>
            <div className="sm:col-span-2 flex gap-2 pt-2">
              <Button type="submit" className="flex-1">Predict Disease Risk</Button>
              <Button type="button" variant="outline" onClick={reset}>
                <RotateCcw className="h-4 w-4 mr-1.5" /> Reset
              </Button>
            </div>
          </form>
        </Card>

        {/* Right: results */}
        <Card className="p-6 h-fit lg:sticky lg:top-20">
          <h2 className="text-xl font-bold">Risk Assessment</h2>
          {!results ? (
            <div className="mt-10 text-center text-muted-foreground">
              <Activity className="h-12 w-12 mx-auto opacity-30" />
              <p className="mt-3 text-sm">Fill in your health data and click <strong>Predict</strong> to see your risk assessment.</p>
            </div>
          ) : (
            <div className="mt-5 space-y-4 max-h-[calc(100vh-12rem)] overflow-y-auto pr-1">
              {results.map((r) => <RiskCard key={r.name} r={r} />)}
              <p className="text-xs text-muted-foreground pt-2">
                These predictions are educational estimates based on established health-risk
                heuristics (Framingham, FINDRISC). Always consult a qualified medical professional.
              </p>
            </div>
          )}
        </Card>
      </main>
      </div>
    </div>
  );
}

function RiskCard({ r }: { r: Prediction }) {
  const tone =
    r.level === "Low" ? "text-accent-foreground bg-accent/20"
    : r.level === "Moderate" ? "text-yellow-800 bg-yellow-100 dark:text-yellow-200 dark:bg-yellow-900/30"
    : r.level === "High" ? "text-orange-800 bg-orange-100 dark:text-orange-200 dark:bg-orange-900/30"
    : "text-destructive bg-destructive/10";
  return (
    <div className="rounded-lg border border-border p-4">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-bold text-foreground">{r.name}</h3>
        <span className={`shrink-0 text-xs font-bold px-2 py-1 rounded-full ${tone}`}>{r.level}</span>
      </div>
      <div className="mt-2 flex items-center gap-3">
        <Progress value={r.percent} className="h-2 flex-1" />
        <span className="text-sm font-bold tabular-nums">{r.percent}%</span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{r.description}</p>
      <ul className="mt-3 text-sm list-disc list-inside space-y-1 text-foreground/90">
        {r.actions.map((a, i) => <li key={i}>{a}</li>)}
      </ul>
      {r.consult && (
        <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-destructive">
          <Stethoscope className="h-4 w-4" /> Consult a doctor soon.
        </div>
      )}
    </div>
  );
}
