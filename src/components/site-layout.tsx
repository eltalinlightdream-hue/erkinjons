import { ReactNode, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { Menu, X, Youtube, Send, GraduationCap, LogOut, User as UserIcon, Crown, ChevronDown, Bell, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { dueCount } from "@/lib/vocabulary.functions";

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
  const fetchDue = useServerFn(dueCount);
  const { data: due } = useQuery({
    queryKey: ["due-count"],
    queryFn: async () => {
      try {
        return await fetchDue();
      } catch {
        return { count: 0 } as any;
      }
    },
    enabled: !!user,
    refetchInterval: 60_000,
    retry: false,
  });
  const isActive = (p: string) => loc.pathname === p;
  const practiceActive = PRACTICE_LINKS.some((l) => isActive(l.to)) || isActive("/practice");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="w-9 h-9 rounded-xl bg-gradient-gold flex items-center justify-center shadow-soft">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </span>
            <span className="font-serif text-lg font-semibold tracking-tight">Abduraimov Erkinjon</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-1">
            <Link to="/" className={cn("px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors", isActive("/") && "text-foreground bg-accent/80")}>Home</Link>

            <div className="relative group">
              <Link to="/practice" className={cn("px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors inline-flex items-center gap-1", practiceActive && "text-foreground bg-accent/80")}>
                Practice <ChevronDown className="w-3.5 h-3.5" />
              </Link>
              <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                <div className="bg-card border border-border rounded-xl shadow-warm py-2 min-w-[180px]">
                  {PRACTICE_LINKS.map((l) => (
                    <Link key={l.to} to={l.to} className={cn("block px-4 py-2 text-sm hover:bg-accent/60", isActive(l.to) && "bg-accent/80 font-medium")}>{l.label}</Link>
                  ))}
                </div>
              </div>
            </div>

            <Link to="/videos" className={cn("px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors", isActive("/videos") && "text-foreground bg-accent/80")}>Video Lessons</Link>
            <Link to="/articles" className={cn("px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors", isActive("/articles") && "text-foreground bg-accent/80")}>Articles</Link>
            <Link to="/contact-about" className={cn("px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors", isActive("/contact-about") && "text-foreground bg-accent/80")}>Contact &amp; About</Link>
          </nav>
          <div className="hidden lg:flex items-center gap-2">
            {user && due && due.count > 0 && (
              <Link to="/vocabulary" className="relative inline-flex items-center p-2 rounded-md hover:bg-accent/60" aria-label="Vocabulary due">
                <Bell className="w-4 h-4 text-secondary" />
                <span className="absolute -top-0.5 -right-0.5 bg-gold text-primary-foreground text-[10px] font-bold rounded-full min-w-[16px] h-4 px-1 flex items-center justify-center">{due.count}</span>
              </Link>
            )}
            {user ? (
              <>
                {profile?.is_premium && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-gold bg-gold/10 px-2 py-1 rounded-md">
                    <Crown className="w-3 h-3" /> Premium
                  </span>
                )}
                <Link to="/account">
                  <Button variant="ghost" size="sm"><UserIcon className="w-4 h-4 mr-1" /> Account</Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={() => signOut()}><LogOut className="w-4 h-4" /></Button>
              </>
            ) : (
              <>
                <Link to="/auth"><Button variant="ghost" size="sm">Sign In</Button></Link>
                <Link to="/premium"><Button size="sm" className="bg-gradient-gold text-primary-foreground shadow-soft hover:opacity-90">Go Premium</Button></Link>
              </>
            )}
          </div>
          <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <div className="lg:hidden border-t border-border bg-background">
            <div className="container mx-auto px-4 py-3 flex flex-col gap-1">
              <Link to="/" onClick={() => setOpen(false)} className="py-2 text-sm font-medium">Home</Link>
              <Link to="/practice" onClick={() => setOpen(false)} className="py-2 text-sm font-medium">Practice</Link>
              <div className="pl-4 flex flex-col">
                {PRACTICE_LINKS.map((l) => (
                  <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="py-1.5 text-sm text-muted-foreground">{l.label}</Link>
                ))}
              </div>
              <Link to="/videos" onClick={() => setOpen(false)} className="py-2 text-sm font-medium">Video Lessons</Link>
              <Link to="/articles" onClick={() => setOpen(false)} className="py-2 text-sm font-medium">Articles</Link>
              <Link to="/vocabulary" onClick={() => setOpen(false)} className="py-2 text-sm font-medium">Vocabulary</Link>
              <Link to="/contact-about" onClick={() => setOpen(false)} className="py-2 text-sm font-medium">Contact &amp; About</Link>
              <div className="pt-3 border-t border-border mt-2 flex flex-col gap-2">
                {user ? (
                  <>
                    <Link to="/account" onClick={() => setOpen(false)}><Button variant="outline" className="w-full">Account</Button></Link>
                    <Button variant="ghost" onClick={() => { signOut(); setOpen(false); }}>Sign out</Button>
                  </>
                ) : (
                  <>
                    <Link to="/auth" onClick={() => setOpen(false)}><Button variant="outline" className="w-full">Sign In</Button></Link>
                    <Link to="/premium" onClick={() => setOpen(false)}><Button className="w-full bg-gradient-gold text-primary-foreground">Go Premium</Button></Link>
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

      <footer className="border-t border-border bg-muted/40 mt-16">
        <div className="container mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-lg bg-gradient-gold flex items-center justify-center"><GraduationCap className="w-4 h-4 text-primary-foreground" /></span>
              <span className="font-serif text-lg font-semibold">Abduraimov Erkinjon</span>
            </div>
            <p className="text-sm text-muted-foreground">Guided IELTS preparation from a Band 8.0 teacher in Fergana, Uzbekistan.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Explore</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/practice" className="hover:text-foreground">Practice</Link></li>
              <li><Link to="/videos" className="hover:text-foreground">Video Lessons</Link></li>
              <li><Link to="/articles" className="hover:text-foreground">Articles</Link></li>
              <li><Link to="/vocabulary" className="hover:text-foreground">Vocabulary Practice</Link></li>
              <li><Link to="/premium" className="hover:text-foreground">Premium</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Connect</h4>
            <div className="flex flex-col gap-2">
              <a href="https://www.youtube.com/@erkinjon_writes" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                <Youtube className="w-4 h-4 text-[#FF0000]" /> YouTube Channel
              </a>
              <a href="https://t.me/augustus_flores" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                <Send className="w-4 h-4 text-[#229ED9]" /> Telegram Channel
              </a>
              <a href="https://t.me/augustus_at" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                <MessageCircle className="w-4 h-4 text-secondary" /> Personal Telegram
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Abduraimov Erkinjon. Made with care in Uzbekistan.
        </div>
      </footer>
    </div>
  );
}
