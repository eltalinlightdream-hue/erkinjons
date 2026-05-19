import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { GraduationCap, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { ensureUserProfile } from "@/lib/auth.functions";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign In - Abduraimov Erkinjon" },
      { name: "description", content: "Sign in or create your free Abduraimov Erkinjon account." },
    ],
  }),
  component: Auth,
});

function Auth() {
  const nav = useNavigate();
  const { user, refreshProfile } = useAuth();
  const ensureProfile = useServerFn(ensureUserProfile);

  useEffect(() => {
    if (user) nav({ to: "/account" });
  }, [user, nav]);

  async function syncProfile(fullName = "") {
    try {
      await ensureProfile({ data: { fullName } });
      await refreshProfile();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not prepare your profile.");
    }
  }

  return (
    <SiteLayout>
      <section className="container mx-auto max-w-md px-4 py-16">
        <div className="mb-8 text-center">
          <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-gold shadow-warm">
            <GraduationCap className="h-7 w-7 text-primary-foreground" />
          </span>
          <h1 className="text-3xl font-bold">Welcome</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in or create an account to track your progress.
          </p>
        </div>

        <Tabs defaultValue="signin">
          <TabsList className="grid w-full grid-cols-2 bg-accent">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin" className="mt-6">
            <SignInForm onReady={() => syncProfile()} />
          </TabsContent>
          <TabsContent value="signup" className="mt-6">
            <SignUpForm onReady={(fullName) => syncProfile(fullName)} />
          </TabsContent>
        </Tabs>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-background px-2 text-muted-foreground">or</span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={async () => {
            const { error } = await supabase.auth.signInWithOAuth({
              provider: "google",
              options: { redirectTo: `${window.location.origin}/account` },
            });
            if (error) toast.error(error.message);
          }}
        >
          Continue with Google
        </Button>
      </section>
    </SiteLayout>
  );
}

function SignInForm({ onReady }: { onReady: () => Promise<void> }) {
  const nav = useNavigate();
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
          toast.error(error.message);
          return;
        }

        await onReady();
        setLoading(false);
        toast.success("Welcome back!");
        nav({ to: "/account" });
      }}
    >
      <div>
        <Label htmlFor="signin-email">Email</Label>
        <Input
          id="signin-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
        />
      </div>
      <div>
        <Label htmlFor="signin-password">Password</Label>
        <Input
          id="signin-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          required
        />
      </div>
      <Button type="submit" disabled={loading} className="w-full bg-gradient-gold text-primary-foreground">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign In"}
      </Button>
    </form>
  );
}

function SignUpForm({ onReady }: { onReady: (fullName: string) => Promise<void> }) {
  const nav = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <form
      className="space-y-4"
      onSubmit={async (event) => {
        event.preventDefault();
        setLoading(true);
        const cleanEmail = email.trim().toLowerCase();
        const cleanName = fullName.trim();

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
          toast.error(error.message);
          return;
        }

        if (data.session) {
          await onReady(cleanName);
          setLoading(false);
          toast.success("Account created!");
          nav({ to: "/account" });
          return;
        }

        setLoading(false);
        toast.success("Account created. Please check your email to confirm your address.");
      }}
    >
      <div>
        <Label htmlFor="signup-name">Full name</Label>
        <Input
          id="signup-name"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
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
          onChange={(event) => setEmail(event.target.value)}
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
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="new-password"
          minLength={6}
          required
        />
      </div>
      <Button type="submit" disabled={loading} className="w-full bg-gradient-gold text-primary-foreground">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Account"}
      </Button>
    </form>
  );
}
