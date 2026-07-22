import { Heart } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const cls = size === "lg" ? "text-3xl" : size === "sm" ? "text-lg" : "text-xl";
  return (
    <Link to="/home" className={`inline-flex items-center gap-2 font-bold ${cls} text-primary`}>
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
        <Heart className="h-5 w-5" />
      </span>
      HealthPro
    </Link>
  );
}
