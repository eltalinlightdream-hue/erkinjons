import { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Lock, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export function PremiumGate({ children, label = "Premium content" }: { children: ReactNode; label?: string }) {
  const { profile, deviceConflict, user } = useAuth();
  const unlocked = !!profile?.is_premium && !deviceConflict;
  if (unlocked) return <>{children}</>;
  return (
    <div className="relative rounded-2xl border border-border bg-card overflow-hidden">
      <div className="pointer-events-none select-none blur-sm opacity-40 p-6 max-h-64 overflow-hidden">
        {children}
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-gradient-to-b from-background/40 to-background/95">
        <span className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center shadow-warm mb-3">
          <Lock className="w-5 h-5 text-primary-foreground" />
        </span>
        <p className="text-sm font-semibold mb-1">{label}</p>
        <p className="text-xs text-muted-foreground mb-4 max-w-xs">Unlock model answers, PDFs, video attachments and more with Premium Access.</p>
        <Link to={user ? "/premium" : "/auth"}>
          <Button size="sm" className="bg-gradient-gold text-primary-foreground"><Crown className="w-4 h-4 mr-1" /> Unlock with Premium</Button>
        </Link>
      </div>
    </div>
  );
}
