import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { BackToHome } from "@/components/BackToHome";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Brain, Send, Loader2, Phone, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/chat")({
  component: ChatPage,
});

type Msg = { role: "user" | "assistant"; content: string };

const CRISIS_KEYWORDS = [
  "suicide", "suicidal", "kill myself", "end my life", "want to die",
  "self harm", "self-harm", "hurt myself", "cutting myself", "no reason to live",
];

function detectCrisis(text: string): boolean {
  const t = text.toLowerCase();
  return CRISIS_KEYWORDS.some((k) => t.includes(k));
}

function ChatPage() {
  const nav = useNavigate();
  const { user, profile, loading } = useAuth();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [showCrisis, setShowCrisis] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading && !user) nav({ to: "/login" });
  }, [loading, user, nav]);

  useEffect(() => {
    if (profile && messages.length === 0) {
      const first = profile.full_name.split(" ")[0];
      setMessages([
        {
          role: "assistant",
          content: `Hi ${first}, I'm HealthPro — a safe space to talk about how you're feeling. How are you doing today, and what's on your mind?`,
        },
      ]);
    }
  }, [profile, messages.length]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending]);

  async function send() {
    const text = input.trim();
    if (!text || sending) return;

    if (detectCrisis(text)) setShowCrisis(true);

    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setSending(true);

    try {
      const { data, error } = await supabase.functions.invoke("mental-health-chat", {
        body: { messages: next, userName: profile?.full_name?.split(" ")[0] },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch (e) {
      toast.error((e as Error).message || "Failed to get response");
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: "I'm having trouble connecting right now. Please try again in a moment — I'm still here for you.",
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void send();
    }
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "linear-gradient(rgba(15, 23, 42, 0.6), rgba(15, 23, 42, 0.6)), url('/c.png')",
      }}
    >
      <div className="min-h-screen bg-slate-950/70">
        <Toaster richColors position="top-center" />
        <header className="border-b border-border bg-card/80 backdrop-blur sticky top-0 z-10">
          <div className="mx-auto max-w-4xl px-4 py-3 flex items-center justify-between">
            <BackToHome />
            <h1 className="text-lg font-bold flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              Mental Health Companion
            </h1>
            <div className="w-32" />
          </div>
        </header>

        <main className="mx-auto max-w-4xl px-4 py-6">
          {showCrisis && <CrisisBanner onDismiss={() => setShowCrisis(false)} />}

          <Card className="flex flex-col h-[calc(100vh-12rem)] overflow-hidden">
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {messages.map((m, i) => (
                <Bubble key={i} msg={m} />
              ))}
              {sending && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  HealthPro is typing…
                </div>
              )}
            </div>

            <div className="border-t border-border p-3 sm:p-4 bg-card">
              <div className="flex gap-2 items-end">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Share what's on your mind…"
                  rows={2}
                  className="resize-none"
                />
                <Button onClick={() => void send()} disabled={sending || !input.trim()} size="lg">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                In crisis? Call 988 (US) or your local emergency services immediately.
              </p>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}

function Bubble({ msg }: { msg: Msg }) {
  const isUser = msg.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? "bg-primary text-primary-foreground rounded-br-sm"
            : "bg-secondary text-secondary-foreground rounded-bl-sm"
        }`}
      >
        {msg.content}
      </div>
    </div>
  );
}

function CrisisBanner({ onDismiss }: { onDismiss: () => void }) {
  return (
    <Card className="mb-4 border-destructive bg-destructive/5 p-4">
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
        <div className="flex-1 text-sm">
          <p className="font-bold text-destructive">You are not alone — please reach out now.</p>
          <ul className="mt-2 space-y-1 text-foreground">
            <li className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5" />
              <strong>US:</strong> Call or text <strong>988</strong> (Suicide & Crisis Lifeline)
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5" />
              <strong>US:</strong> Text <strong>HOME</strong> to <strong>741741</strong> (Crisis Text Line)
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5" />
              <strong>UK:</strong> Call <strong>116 123</strong> (Samaritans)
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5" />
              <strong>International:</strong>{" "}
              <a className="underline" href="https://findahelpline.com" target="_blank" rel="noreferrer">
                findahelpline.com
              </a>
            </li>
          </ul>
          <button onClick={onDismiss} className="mt-3 text-xs underline text-muted-foreground">
            Dismiss
          </button>
        </div>
      </div>
    </Card>
  );
}
