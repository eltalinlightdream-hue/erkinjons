import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { GraduationCap, Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign In - Abduraimov Erkinjon" },
      { name: "description", content: "Sign in or create your free account." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const nav = useNavigate();
  const { user, refreshProfile } = useAuth();
  const [mode, setMode] = useState<"tabs" | "forgot">("tabs");

  useEffect(() => {
    if (user) nav({ to: "/account" });
  }, [user, nav]);

  return (
    <SiteLayout>
      <section className="container mx-auto max-w-md px-4 py-16">
        <div className="mb-8 text-center">
          <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-gold shadow-warm">
            <GraduationCap className="h-7 w-7 text-primary-foreground" />
          </span>
          <h1 className="text-3xl font-bold">Welcome</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "forgot"
              ? "Reset your password"
              : "Sign in or create an account to track your progress."}
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-warm">
          {mode === "forgot" ? (
            <ForgotPasswordForm onBack={() => setMode("tabs")} />
          ) : (
            <Tabs defaultValue="signin">
              <TabsList className="grid w-full grid-cols-2 bg-accent">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="signin" className="mt-6">
                <SignInForm
                  onForgot={() => setMode("forgot")}
                  onReady={async () => {
                    await refreshProfile();
                    nav({ to: "/account" });
                  }}
                />
              </TabsContent>
              <TabsContent value="signup" className="mt-6">
                <SignUpForm
                  onReady={async () => {
                    await refreshProfile();
                    nav({ to: "/account" });
                  }}
                />
              </TabsContent>
            </Tabs>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          By signing up you agree to use this platform for personal IELTS practice.
        </p>
      </section>
    </SiteLayout>
  );
}

function validatePassword(pw: string): string | null {
  if (pw.length < 4 || pw.length > 6) return "Password must be 4–6 characters.";
  return null;
}

function SignInForm({
  onForgot,
  onReady,
}: {
  onForgot: () => void;
  onReady: () => Promise<void>;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <form
      className="space-y-4"
      onSubmit={async (event) => {
        event.preventDefault();
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim().toLowerCase(),
          password,
        });
        if (error) {
          setLoading(false);
          toast.error("Incorrect email or password. Please try again.");
          return;
        }
        toast.success("Welcome back!");
        await onReady();
        setLoading(false);
      }}
    >
      <div>
        <Label htmlFor="signin-email">Email</Label>
        <Input
          id="signin-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <Label htmlFor="signin-password">Password</Label>
          <button
            type="button"
            onClick={onForgot}
            className="text-xs text-primary hover:underline"
          >
            Forgot password?
          </button>
        </div>
        <Input
          id="signin-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
      </div>
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-gold text-primary-foreground"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign In"}
      </Button>
    </form>
  );
}

function SignUpForm({ onReady }: { onReady: () => Promise<void> }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <form
      className="space-y-4"
      onSubmit={async (event) => {
        event.preventDefault();
        const pwError = validatePassword(password);
        if (pwError) {
          toast.error(pwError);
          return;
        }
        const cleanName = fullName.trim();
        if (!cleanName) {
          toast.error("Please enter your full name.");
          return;
        }
        setLoading(true);
        const cleanEmail = email.trim().toLowerCase();

        const { data, error } = await supabase.auth.signUp({
          email: cleanEmail,
          password,
          options: {
            data: { full_name: cleanName },
            emailRedirectTo: `${window.location.origin}/account`,
          },
        });

        if (error) {
          setLoading(false);
          const msg = error.message.toLowerCase();
          if (
            msg.includes("already") ||
            msg.includes("registered") ||
            msg.includes("exists")
          ) {
            toast.error("An account with this email already exists. Please sign in.");
          } else {
            toast.error(error.message);
          }
          return;
        }

        // With email confirmation disabled, a session is returned immediately.
        if (!data.session) {
          // Defensive: attempt sign-in if session not returned
          const { error: signInErr } = await supabase.auth.signInWithPassword({
            email: cleanEmail,
            password,
          });
          if (signInErr) {
            setLoading(false);
            toast.error(signInErr.message);
            return;
          }
        }

        // Best-effort: ensure profile row exists with full name
        try {
          const { data: userResp } = await supabase.auth.getUser();
          if (userResp.user) {
            await supabase
              .from("profiles")
              .upsert(
                { id: userResp.user.id, full_name: cleanName, email: cleanEmail },
                { onConflict: "id" },
              );
          }
        } catch {
          // ignore — trigger usually handles it
        }

        toast.success("Account created!");
        await onReady();
        setLoading(false);
      }}
    >
      <div>
        <Label htmlFor="signup-name">Full name</Label>
        <Input
          id="signup-name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          autoComplete="name"
          required
        />
      </div>
      <div>
        <Label htmlFor="signup-email">Email</Label>
        <Input
          id="signup-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
      </div>
      <div>
        <Label htmlFor="signup-password">Password</Label>
        <Input
          id="signup-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          minLength={4}
          maxLength={6}
          required
        />
        <p className="mt-1 text-xs text-muted-foreground">4–6 characters</p>
      </div>
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-gold text-primary-foreground"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Account"}
      </Button>
    </form>
  );
}

function ForgotPasswordForm({ onBack }: { onBack: () => void }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="space-y-4 text-center">
        <p className="text-sm">
          If an account exists for <strong>{email}</strong>, a password reset link has
          been sent. Please check your inbox.
        </p>
        <Button variant="outline" className="w-full" onClick={onBack}>
          Back to sign in
        </Button>
      </div>
    );
  }

  return (
    <form
      className="space-y-4"
      onSubmit={async (event) => {
        event.preventDefault();
        setLoading(true);
        const { error } = await supabase.auth.resetPasswordForEmail(
          email.trim().toLowerCase(),
          { redirectTo: `${window.location.origin}/reset-password` },
        );
        setLoading(false);
        if (error) {
          toast.error(error.message);
          return;
        }
        setSent(true);
      }}
    >
      <button
        type="button"
        onClick={onBack}
        className="mb-2 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3 w-3" /> Back
      </button>
      <div>
        <Label htmlFor="forgot-email">Email address</Label>
        <Input
          id="forgot-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
      </div>
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-gold text-primary-foreground"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send Reset Link"}
      </Button>
    </form>
  );
}