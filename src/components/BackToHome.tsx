import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export function BackToHome() {
  return (
    <Link
      to="/home"
      className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium text-foreground hover:bg-accent/30 transition-colors"
    >
      <ArrowLeft className="h-4 w-4" />
      Back to Home
    </Link>
  );
}
