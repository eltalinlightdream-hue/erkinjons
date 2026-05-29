import { ReactNode, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Menu, X, Youtube, Send, GraduationCap, LogOut, User as UserIcon, Crown, ChevronDown, Bell, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

const PRACTICE_LINKS = [
  { to: "/listening" as const, label: "Listening" },
  { to: "/reading" as const, label: "Reading" },
  { to: "/writing" as const, label: "Writing" },
  { to: "/speaking" as const, label: "Speaking" },
];

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { user, profile, signOut, deviceConflict } = useAuth();
  const loc = useLocation();
  const { data: due } = useQuery({
    queryKey: ["due-count", user?.id],
    queryFn: async () => {
      if (!user) return { count: 0 };
      const { count, error } = await supabase
        .from("vocabulary_words")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id)
        .lte("next_review", new Date().toISOString());
      if (error) return { count: 0 };
      return { count: count ?? 0 };
    },
    enabled: !!user,
    refetchInterval: 60_000,
    retry: false,
  });
  const isActive = (p: string) => loc.pathname === p;
  const practiceActive = PRACTICE_LINKS.some((l) => isActive(l.to)) || isActive("/practice");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="h-[3px] w-full" style={{ background: "linear-gradient(90deg, #F5D5CB 0%, #EAC4D5 45%, #4A9B7A 100%)" }} />

      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2.5 group">
            <span className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-soft">
              <GraduationCap className="w-4 h-4 text-white" />
            </span>
            <span className="font-serif text-[1.05rem] font-semibold tracking-tight text-foreground">
              Abduraimov Erkinjon
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5">
            <Link
              to="/"
              className={cn(
                "px-3.5 py-2 rounded-md text-sm font-medium transition-colors",
                isActive("/")
                  ? "text-primary bg-primary/8 font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              )}
            >
              Home
            </Link>

            <div className="relative group">
              <Link
                to="/practice"
                className={cn(
                  "px-3.5 py-2 rounded-md text-sm font-medium transition-colors inline-flex items-center gap-1",
                  practiceActive
                    ? "text-primary bg-primary/8 font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                )}
              >
                Practice <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </Link>
              <div className="absolute left-0 top-full pt-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                <div className="bg-card border border-border rounded-xl shadow-warm py-1.5 min-w-[170px]">
                  {PRACTICE_LINKS.map((l) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      className={cn(
                        "block px-4 py-2 text-sm transition-colors",
                        isActive(l.to)
                          ? "bg-accent/70 text-foreground font-medium"
                          : "text-muted-foreground hover:bg-accent/40 hover:text-foreground"
                      )}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              to="/videos"
              className={cn(
                "px-3.5 py-2 rounded-md text-sm font-medium transition-colors",
                isActive("/videos")
                  ? "text-primary bg-primary/8 font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              )}
            >
              Video Lessons
            </Link>
            <Link
              to="/articles"
              className={cn(
                "px-3.5 py-2 rounded-md text-sm font-medium transition-colors",
                isActive("/articles")
                  ? "text-primary bg-primary/8 font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              )}
            >
              Articles
            </Link>
            <Link
              to="/contact-about"
              className={cn(
                "px-3.5 py-2 rounded-md text-sm font-medium transition-colors",
                isActive("/contact-about")
                  ? "text-primary bg-primary/8 font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              )}
            >
              Contact &amp; About
            </Link>
          </nav>

          <div className="hidden lg:flex items-center gap-1.5">
            {user && due && due.count > 0 && (
              <Link
                to="/vocabulary"
                className="relative inline-flex items-center p-2 rounded-md hover:bg-muted/60 transition-colors"
                aria-label="Vocabulary due"
              >
                <Bell className="w-4 h-4 text-secondary" />
                <span className="absolute -top-0.5 -right-0.5 bg-[#C07850] text-white text-[10px] font-bold rounded-full min-w-[16px] h-4 px-1 flex items-center justify-center">
                  {due.count}
                </span>
              </Link>
            )}
            {user ? (
              <>
                {profile?.is_premium && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#C07850] bg-[#C07850]/10 px-2.5 py-1 rounded-full border border-[#C07850]/20">
                    <Crown className="w-3 h-3" /> Premium
                  </span>
                )}
                <Link to="/account">
                  <Button variant="ghost" size="sm" className="text-sm h-8">
                    <UserIcon className="w-3.5 h-3.5 mr-1.5" /> Account
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" className="h-8" onClick={() => signOut()}>
                  <LogOut className="w-3.5 h-3.5" />
                </Button>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost" size="sm" className="text-sm h-8">Sign In</Button>
                </Link>
                <Link to="/premium">
                  <Button size="sm" className="bg-gradient-primary text-white shadow-soft hover:opacity-90 h-8 text-sm rounded-lg">
                    Go Premium
                  </Button>
                </Link>
              </>
            )}
          </div>

          <button className="lg:hidden p-2 rounded-md hover:bg-muted/60 transition-colors" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden border-t border-border bg-background">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-0.5">
              <Link to="/" onClick={() => setOpen(false)} className={cn("py-2.5 px-3 rounded-md text-sm font-medium transition-colors", isActive("/") ? "text-primary bg-primary/8" : "hover:bg-muted/60")}>Home</Link>
              <Link to="/practice" onClick={() => setOpen(false)} className={cn("py-2.5 px-3 rounded-md text-sm font-medium transition-colors", practiceActive ? "text-primary bg-primary/8" : "hover:bg-muted/60")}>Practice</Link>
              <div className="pl-5 flex flex-col">
                {PRACTICE_LINKS.map((l) => (
                  <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="py-2 text-sm text-muted-foreground hover:text-foreground">{l.label}</Link>
                ))}
              </div>
              <Link to="/videos" onClick={() => setOpen(false)} className={cn("py-2.5 px-3 rounded-md text-sm font-medium transition-colors", isActive("/videos") ? "text-primary bg-primary/8" : "hover:bg-muted/60")}>Video Lessons</Link>
              <Link to="/articles" onClick={() => setOpen(false)} className={cn("py-2.5 px-3 rounded-md text-sm font-medium transition-colors", isActive("/articles") ? "text-primary bg-primary/8" : "hover:bg-muted/60")}>Articles</Link>
              <Link to="/vocabulary" onClick={() => setOpen(false)} className={cn("py-2.5 px-3 rounded-md text-sm font-medium transition-colors", isActive("/vocabulary") ? "text-primary bg-primary/8" : "hover:bg-muted/60")}>Vocabulary</Link>
              <Link to="/contact-about" onClick={() => setOpen(false)} className={cn("py-2.5 px-3 rounded-md text-sm font-medium transition-colors", isActive("/contact-about") ? "text-primary bg-primary/8" : "hover:bg-muted/60")}>Contact &amp; About</Link>
              <div className="pt-4 border-t border-border mt-2 flex flex-col gap-2">
                {user ? (
                  <>
                    <Link to="/account" onClick={() => setOpen(false)}>
                      <Button variant="outline" className="w-full">Account</Button>
                    </Link>
                    <Button variant="ghost" onClick={() => { signOut(); setOpen(false); }}>Sign out</Button>
                  </>
                ) : (
                  <>
                    <Link to="/auth" onClick={() => setOpen(false)}>
                      <Button variant="outline" className="w-full">Sign In</Button>
                    </Link>
                    <Link to="/premium" onClick={() => setOpen(false)}>
                      <Button className="w-full bg-gradient-primary text-white">Go Premium</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {deviceConflict && (
        <div className="bg-destructive/10 border-b border-destructive/30 text-destructive">
          <div className="container mx-auto px-4 py-3 text-sm font-medium">
            ⚠ This premium account is active on another device. Please log out from your other device first, or contact the teacher to reset.
          </div>
        </div>
      )}

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border/60 bg-muted/30 mt-16">
        <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent 0%, #F5D5CB 30%, #4A9B7A 70%, transparent 100%)" }} />
        <div className="container mx-auto px-4 py-12 grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-soft">
                <GraduationCap className="w-4 h-4 text-white" />
              </span>
              <span className="font-serif text-base font-semibold">Abduraimov Erkinjon</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Guided IELTS preparation from a Band 8.0 teacher in Fergana, Uzbekistan.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm tracking-wide uppercase text-muted-foreground/80">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/practice" className="text-muted-foreground hover:text-primary transition-colors">Practice</Link></li>
              <li><Link to="/videos" className="text-muted-foreground hover:text-primary transition-colors">Video Lessons</Link></li>
              <li><Link to="/articles" className="text-muted-foreground hover:text-primary transition-colors">Articles</Link></li>
              <li><Link to="/vocabulary" className="text-muted-foreground hover:text-primary transition-colors">Vocabulary Practice</Link></li>
              <li><Link to="/premium" className="text-muted-foreground hover:text-primary transition-colors">Premium</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm tracking-wide uppercase text-muted-foreground/80">Connect</h4>
            <div className="flex flex-col gap-2.5">
              <a href="https://www.youtube.com/@erkinjon_writes" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Youtube className="w-4 h-4 text-[#FF0000]" /> YouTube Channel
              </a>
              <a href="https://t.me/augustus_flores" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Send className="w-4 h-4 text-[#229ED9]" /> Telegram Channel
              </a>
              <a href="https://t.me/augustus_at" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <MessageCircle className="w-4 h-4 text-secondary" /> Personal Telegram
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-border/50 py-5 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Abduraimov Erkinjon. Made with care in Uzbekistan.
        </div>
      </footer>
    </div>
  );
}
