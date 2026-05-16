import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { SiteLayout } from "@/components/site-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, LogOut, User as UserIcon, Smartphone, AlertTriangle, Calendar, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import { getDeviceFingerprint } from "@/lib/fingerprint";
import { resetDevice } from "@/lib/premium.functions";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "My Account — Abduraimov Erkinjon" },
      { name: "description", content: "Manage your IELTS account, premium status, and device binding." },
    ],
  }),
  component: Account,
});

function Account() {
  const { user, profile, loading, signOut, refreshProfile, deviceConflict } = useAuth();
  const navigate = useNavigate();
  const resetFn = useServerFn(resetDevice);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [loading, user, navigate]);

  if (loading || !user) {
    return (
      <SiteLayout>
        <div className="container mx-auto px-4 py-24 text-center">
          <Loader2 className="w-6 h-6 animate-spin mx-auto text-muted-foreground" />
        </div>
      </SiteLayout>
    );
  }

  const onResetDevice = async () => {
    setBusy(true);
    try {
      await resetFn({ data: { deviceFingerprint: getDeviceFingerprint() } });
      toast.success("This device is now bound to your account.");
      await refreshProfile();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not reset device.");
    } finally {
      setBusy(false);
    }
  };

  const initials = (profile?.full_name || user.email || "?")
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const activated = profile?.activated_at ? new Date(profile.activated_at).toLocaleDateString() : null;

  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="flex flex-wrap items-center gap-4 mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-gold flex items-center justify-center text-primary-foreground text-xl font-semibold shadow-warm">
            {initials}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold">{profile?.full_name || "Welcome back"}</h1>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <Button variant="outline" onClick={() => signOut()}>
            <LogOut className="w-4 h-4 mr-2" /> Sign out
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Premium status */}
          <Card className={`p-6 ${profile?.is_premium ? "bg-gradient-warm border-gold/30" : ""}`}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-serif text-xl font-semibold">Membership</h2>
              {profile?.is_premium ? (
                <Badge className="bg-gold/15 text-gold border-gold/30"><Crown className="w-3 h-3 mr-1" /> Premium</Badge>
              ) : (
                <Badge variant="secondary" className="bg-accent">Free</Badge>
              )}
            </div>
            {profile?.is_premium ? (
              <>
                <p className="text-sm text-muted-foreground mb-2">You have full access to all premium materials.</p>
                {activated && (
                  <p className="text-xs text-muted-foreground inline-flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" /> Activated on {activated}
                  </p>
                )}
              </>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-4">
                  You're on the free plan. Upgrade to unlock model answers, PDFs and worksheets.
                </p>
                <Link to="/premium">
                  <Button className="bg-gradient-gold text-primary-foreground w-full">
                    <Crown className="w-4 h-4 mr-2" /> Go Premium
                  </Button>
                </Link>
              </>
            )}
          </Card>

          {/* Profile */}
          <Card className="p-6">
            <h2 className="font-serif text-xl font-semibold mb-3">Profile</h2>
            <div className="space-y-3 text-sm">
              <Row icon={<UserIcon className="w-4 h-4" />} label="Name" value={profile?.full_name || "—"} />
              <Row icon={<UserIcon className="w-4 h-4" />} label="Email" value={user.email ?? "—"} />
            </div>
          </Card>

          {/* Device binding */}
          {profile?.is_premium && (
            <Card className={`p-6 md:col-span-2 ${deviceConflict ? "border-destructive/40 bg-destructive/5" : ""}`}>
              <div className="flex items-start gap-3 mb-3">
                <span className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${deviceConflict ? "bg-destructive/15" : "bg-sage/15"}`}>
                  {deviceConflict ? <AlertTriangle className="w-5 h-5 text-destructive" /> : <Smartphone className="w-5 h-5 text-sage" />}
                </span>
                <div className="flex-1">
                  <h2 className="font-serif text-xl font-semibold">Device binding</h2>
                  <p className="text-sm text-muted-foreground">
                    Premium accounts are limited to a single device to protect material from being shared.
                  </p>
                </div>
              </div>
              {deviceConflict ? (
                <>
                  <p className="text-sm mb-4">
                    This account is currently bound to a different device. If this <strong>is</strong> your new device, you can rebind it below — but only do this once per change.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button onClick={onResetDevice} disabled={busy} variant="destructive">
                      {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : "Bind to this device"}
                    </Button>
                    <a href="https://t.me/augustus_flores" target="_blank" rel="noreferrer">
                      <Button variant="outline">Contact teacher</Button>
                    </a>
                  </div>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">
                  This device is currently bound to your premium account. To switch devices, contact me on Telegram.
                </p>
              )}
            </Card>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
      <span className="inline-flex items-center gap-2 text-muted-foreground">{icon} {label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}