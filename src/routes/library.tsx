import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { BackToHome } from "@/components/BackToHome";
import { DISEASES, type Disease } from "@/lib/diseases";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, BookOpen, AlertTriangle, ShieldCheck, Stethoscope, AlertCircle, ClipboardList } from "lucide-react";

export const Route = createFileRoute("/library")({
  component: LibraryPage,
});

function LibraryPage() {
  const nav = useNavigate();
  const { user, loading } = useAuth();
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<Disease>(DISEASES[0]);

  useEffect(() => {
    if (!loading && !user) nav({ to: "/login" });
  }, [loading, user, nav]);

  const filtered = useMemo(
    () =>
      DISEASES.filter((d) => d.name.toLowerCase().includes(q.toLowerCase())).sort((a, b) =>
        a.name.localeCompare(b.name),
      ),
    [q],
  );

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
            <BookOpen className="h-5 w-5 text-primary" />
            Disease Library
          </h1>
          <div className="w-32" />
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 grid gap-6 lg:grid-cols-[320px_1fr]">
        {/* Left: list */}
        <Card className="p-4 h-[calc(100vh-9rem)] flex flex-col">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search diseases…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="pl-9"
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">{filtered.length} diseases</p>
          <ScrollArea className="mt-3 flex-1 -mr-2 pr-2">
            <ul className="space-y-1">
              {filtered.map((d) => (
                <li key={d.name}>
                  <button
                    onClick={() => setSelected(d)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selected.name === d.name
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "hover:bg-accent/30"
                    }`}
                  >
                    {d.name}
                  </button>
                </li>
              ))}
              {filtered.length === 0 && (
                <li className="text-sm text-muted-foreground px-3 py-4">No results.</li>
              )}
            </ul>
          </ScrollArea>
        </Card>

        {/* Right: details */}
        <Card className="p-6 lg:p-8 h-[calc(100vh-9rem)] overflow-y-auto">
          <h2 className="text-3xl font-bold text-foreground">{selected.name}</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">{selected.overview}</p>

          <Section icon={<AlertCircle className="h-5 w-5" />} title="Symptoms" items={selected.symptoms} tone="primary" />
          <Section icon={<ShieldCheck className="h-5 w-5" />} title="Prevention" items={selected.preventions} tone="accent" />
          <Section icon={<Stethoscope className="h-5 w-5" />} title="Treatment" items={selected.treatment} tone="primary" />
          <Section icon={<AlertTriangle className="h-5 w-5" />} title="When to See a Doctor" items={selected.whenToSeeDoctor} tone="destructive" />
          <Section icon={<ClipboardList className="h-5 w-5" />} title="Risk Factors" items={selected.riskFactors} tone="muted" />
        </Card>
      </main>
      </div>
    </div>
  );
}

function Section({
  icon,
  title,
  items,
  tone,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
  tone: "primary" | "accent" | "destructive" | "muted";
}) {
  const toneCls =
    tone === "primary"
      ? "bg-primary/10 text-primary"
      : tone === "accent"
      ? "bg-accent/20 text-accent-foreground"
      : tone === "destructive"
      ? "bg-destructive/10 text-destructive"
      : "bg-muted text-muted-foreground";
  return (
    <div className="mt-6">
      <h3 className="flex items-center gap-2 text-lg font-bold text-foreground">
        <span className={`inline-flex h-8 w-8 items-center justify-center rounded-md ${toneCls}`}>
          {icon}
        </span>
        {title}
      </h3>
      <ul className="mt-3 space-y-1.5 list-disc list-inside text-sm leading-relaxed text-foreground/90">
        {items.map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ul>
    </div>
  );
}
