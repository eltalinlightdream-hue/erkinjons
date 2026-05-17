import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { SiteLayout } from "@/components/site-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Send, Lock, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import { getDeviceFingerprint } from "@/lib/fingerprint";
import { redeemActivationCode } from "@/lib/premium.functions";

export const Route = createFileRoute("/premium")({
  head: () => ({
    meta: [
      { title: "Premium Access — Abduraimov Erkinjon" },
      { name: "description", content: "Unlock all model answers, premium PDFs, video attachments and 1-on-1 feedback channels." },
      { property: "og:title", content: "Premium IELTS Access" },
      { property: "og:description", content: "Unlock all premium IELTS materials and lessons." },
    ],
  }),
  component: Premium,
});

const FEATURES = [
  "Full library of Band 8.0+ model answers (Writing Task 1 & 2)",
  "Speaking Part 1, 2, 3 model answers with audio cues",
  "Premium PDFs: vocabulary lists, grammar packs, exam strategies",
  "Attached worksheets on every video lesson",
  "Priority replies on Telegram",
  "Lifetime access — no monthly fee",
];

function Premium() {
  const { user, profile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const redeem = useServerFn(redeemActivationCode);
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);

  const isPremium = !!profile?.is_premium;

  const onRedeem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate({ to: "/auth" });
      return;
    }
    if (!code.trim()) return;
    setBusy(true);
    try {
      await redeem({ data: { code: code.trim(), deviceFingerprint: getDeviceFingerprint() } });
      toast.success("Premium activated! Welcome aboard.");
      setCode("");
      await refreshProfile();
      navigate({ to: "/account" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Could not redeem code.";
      toast.error(msg);
    } finally {
      setBusy(false);
    }
  };

  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-3 bg-gold/10 text-gold border-gold/30">
            <Crown className="w-3 h-3 mr-1" /> Premium Access
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Go from Band 6 to Band 7+</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            One-time payment. Lifetime access. All my premium IELTS material in one place.
          </p>
        </div>

        <div className="grid md:grid-cols-[1.2fr,1fr] gap-6">
          <Card className="p-8 bg-gradient-warm border-gold/30">
            <h2 className="font-serif text-2xl font-semibold mb-1">What you get</h2>
            <p className="text-sm text-muted-foreground mb-5">Everything below, unlocked instantly.</p>
            <ul className="space-y-3 mb-6">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <span className="w-5 h-5 rounded-full bg-sage/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-sage" />
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <div className="pt-5 border-t border-border">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-4xl font-bold">40,000 UZS</span>
                <span className="text-sm text-muted-foreground line-through">50,000</span>
              </div>
              <p className="text-xs text-muted-foreground">One-time payment. Lifetime access. One device per account.</p>
            </div>
          </Card>

          <Card className="p-8">
            {isPremium ? (
              <div className="text-center py-6">
                <span className="w-14 h-14 rounded-2xl bg-gradient-gold inline-flex items-center justify-center mb-4 shadow-warm">
                  <Crown className="w-6 h-6 text-primary-foreground" />
                </span>
                <h3 className="font-serif text-xl font-semibold mb-2">You're Premium 🎉</h3>
                <p className="text-sm text-muted-foreground mb-5">Enjoy full access to every model answer, PDF and worksheet.</p>
                <Link to="/account"><Button variant="outline" className="w-full">Go to my account</Button></Link>
              </div>
            ) : (
              <>
                <h3 className="font-serif text-xl font-semibold mb-1">Step 1 — Pay via Telegram</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Message me on Telegram to pay (Payme / Click / cash). I'll send you a personal activation code right after.
                </p>
                <a href="https://t.me/augustus_flores" target="_blank" rel="noreferrer">
                  <Button className="w-full bg-[#229ED9] hover:bg-[#229ED9]/90 text-white mb-6">
                    <Send className="w-4 h-4 mr-2" /> Message on Telegram
                  </Button>
                </a>

                <h3 className="font-serif text-xl font-semibold mb-1">Step 2 — Redeem your code</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Already have a code? Enter it below to unlock instantly.
                </p>
                <form onSubmit={onRedeem} className="space-y-3">
                  <Input
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    placeholder="ABCD-1234"
                    className="font-mono tracking-wider uppercase"
                    autoComplete="off"
                  />
                  <Button type="submit" disabled={busy || !code.trim()} className="w-full bg-gradient-gold text-primary-foreground">
                    {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Lock className="w-4 h-4 mr-2" /> {user ? "Activate Premium" : "Sign in to activate"}</>}
                  </Button>
                </form>
                {!user && (
                  <p className="text-xs text-muted-foreground mt-3 text-center">
                    You need an account first. <Link to="/auth" className="text-secondary font-medium">Create one →</Link>
                  </p>
                )}
              </>
            )}
          </Card>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-8 max-w-xl mx-auto">
          Each activation code binds your account to a single device. If you change devices, contact me on Telegram and I'll reset it for you within 24 hours.
        </p>
      </section>
    </SiteLayout>
  );
}
