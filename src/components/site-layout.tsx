import { ReactNode, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X, Youtube, Send, GraduationCap, LogOut, User as UserIcon, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/writing", label: "Writing" },
  { to: "/speaking", label: "Speaking" },
  { to: "/reading-listening", label: "Reading & Listening" },
  { to: "/videos", label: "Video Lessons" },
  { to: "/practice", label: "Practice" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { user, profile, signOut, deviceConflict } = useAuth();
  const loc = useLocation();

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
            {NAV.map((n) => (
              <Link key={n.to} to={n.to}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors",
                  loc.pathname === n.to && "text-foreground bg-accent/80"
                )}>{n.label}</Link>
            ))}
          </nav>
          <div className="hidden lg:flex items-center gap-2">
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
              {NAV.map((n) => (
                <Link key={n.to} to={n.to} onClick={() => setOpen(false)}
                  className="py-2 text-sm font-medium">{n.label}</Link>
              ))}
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
              <li><Link to="/writing" className="hover:text-foreground">Writing</Link></li>
              <li><Link to="/speaking" className="hover:text-foreground">Speaking</Link></li>
              <li><Link to="/videos" className="hover:text-foreground">Video Lessons</Link></li>
              <li><Link to="/practice" className="hover:text-foreground">Practice</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Connect</h4>
            <div className="flex flex-col gap-2">
              <a href="http://www.youtube.com/@erkinjon_s" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                <Youtube className="w-4 h-4 text-[#FF0000]" /> YouTube Channel
              </a>
              <a href="https://t.me/augustus_flores" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                <Send className="w-4 h-4 text-[#229ED9]" /> Telegram Channel
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
