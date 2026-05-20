import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { GraduationCap, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Reset Password - Abduraimov Erkinjon" },
      { name: "description", content: "Set a new password for your account." },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const nav = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  // Supabase auto-detects the recovery token from the URL hash on load.
  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") {
        setReady(true);
      }
    });
    // also check if a session already exists
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <SiteLayout>
      <section className="container mx-auto max-w-md px-4 py-16">
        <div className="mb-8 text-center">
          <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-gold shadow-warm">
            <GraduationCap className="h-7 w-7 text-primary-foreground" />
          </span>
          <h1 className="text-3xl font-bold">Reset Password</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Choose a new password for your account.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-warm">
          <form
            className="space-y-4"
            onSubmit={async (event) => {
              event.preventDefault();
              if (password.length < 4 || password.length > 6) {
                toast.error("Password must be 4–6 characters.");
                return;
              }
              if (password !== confirm) {
                toast.error("Passwords do not match.");
                return;
              }
              if (!ready) {
                toast.error("Reset link is invalid or expired. Request a new one.");
                return;
              }
              setLoading(true);
              const { error } = await supabase.auth.updateUser({ password });
              setLoading(false);
              if (error) {
                toast.error(error.message);
                return;
              }
              await supabase.auth.signOut();
              toast.success("Password updated! You can now sign in.");
              nav({ to: "/auth" });
            }}
          >
            <div>
              <Label htmlFor="new-password">New password</Label>
              <Input
                id="new-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={4}
                maxLength={6}
                autoComplete="new-password"
                required
              />
              <p className="mt-1 text-xs text-muted-foreground">4–6 characters</p>
            </div>
            <div>
              <Label htmlFor="confirm-password">Confirm new password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                minLength={4}
                maxLength={6}
                autoComplete="new-password"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-gold text-primary-foreground"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Update Password"}
            </Button>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}