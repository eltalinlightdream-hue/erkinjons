import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import { GraduationCap } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [
    { title: "Sign In — Abduraimov Erkinjon" },
    { name: "description", content: "Sign in or create your free Abduraimov Erkinjon account." },
  ]}),
  component: Auth,
});

function Auth() {
  const nav = useNavigate();
  const { user } = useAuth();
  useEffect(() => { if (user) nav({ to: "/account" }); }, [user, nav]);

  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-16 max-w-md">
        <div className="text-center mb-8">
          <span className="inline-flex w-14 h-14 rounded-2xl bg-gradient-gold items-center justify-center mb-4 shadow-warm"><GraduationCap className="w-7 h-7 text-primary-foreground" /></span>
          <h1 className="text-3xl font-bold">Welcome</h1>
          <p className="text-muted-foreground text-sm mt-1">Sign in or create an account to track your progress.</p>
        </div>
        <Tabs defaultValue="signin">
          <TabsList className="grid grid-cols-2 w-full bg-accent">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin" className="mt-6"><SignInForm /></TabsContent>
          <TabsContent value="signup" className="mt-6"><SignUpForm /></TabsContent>
        </Tabs>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
          <div className="relative flex justify-center text-xs"><span className="bg-background px-2 text-muted-foreground">or</span></div>
        </div>

        <Button variant="outline" className="w-full" onClick={async () => {
          const r = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/account" });
          if (r.error) toast.error(r.error.message);
        }}>
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.5 12.27c0-.79-.07-1.54-.2-2.27H12v4.29h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.1Z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.98.66-2.24 1.06-3.72 1.06-2.86 0-5.28-1.93-6.15-4.52H2.18v2.84A11 11 0 0 0 12 23Z"/><path fill="#FBBC05" d="M5.85 14.12a6.61 6.61 0 0 1 0-4.24V7.04H2.18a11 11 0 0 0 0 9.92l3.67-2.84Z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.65l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.04l3.67 2.84C6.72 7.3 9.14 5.38 12 5.38Z"/></svg>
          Continue with Google
        </Button>
      </section>
    </SiteLayout>
  );
}

function SignInForm() {
  const [email, setEmail] = useState(""); const [pw, setPw] = useState(""); const [loading, setLoading] = useState(false);
  return (
    <form className="space-y-4" onSubmit={async (e) => {
      e.preventDefault(); setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password: pw });
      setLoading(false);
      if (error) toast.error(error.message); else toast.success("Welcome back!");
    }}>
      <div><Label htmlFor="ei">Email</Label><Input id="ei" type="email" value={email} onChange={e => setEmail(e.target.value)} required /></div>
      <div><Label htmlFor="pi">Password</Label><Input id="pi" type="password" value={pw} onChange={e => setPw(e.target.value)} required /></div>
      <Button type="submit" disabled={loading} className="w-full bg-gradient-gold text-primary-foreground">{loading ? "Signing in..." : "Sign In"}</Button>
    </form>
  );
}
function SignUpForm() {
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [pw, setPw] = useState(""); const [loading, setLoading] = useState(false);
  return (
    <form className="space-y-4" onSubmit={async (e) => {
      e.preventDefault(); setLoading(true);
      const { error } = await supabase.auth.signUp({
        email, password: pw,
        options: { data: { full_name: name }, emailRedirectTo: window.location.origin + "/account" },
      });
      setLoading(false);
      if (error) toast.error(error.message);
      else toast.success("Account created!", { description: "Check your email to confirm your address." });
    }}>
      <div><Label htmlFor="nm">Full name</Label><Input id="nm" value={name} onChange={e => setName(e.target.value)} required /></div>
      <div><Label htmlFor="eu">Email</Label><Input id="eu" type="email" value={email} onChange={e => setEmail(e.target.value)} required /></div>
      <div><Label htmlFor="pu">Password</Label><Input id="pu" type="password" value={pw} onChange={e => setPw(e.target.value)} required minLength={6} /></div>
      <Button type="submit" disabled={loading} className="w-full bg-gradient-gold text-primary-foreground">{loading ? "Creating..." : "Create Account"}</Button>
    </form>
  );
}
