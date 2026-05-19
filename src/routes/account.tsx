import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { SiteLayout } from "@/components/site-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Crown, LogOut, User as UserIcon, Smartphone, AlertTriangle,
  Calendar, Loader2, BookOpen, BarChart2, Flame, Trophy,
  Bookmark, Lock, Send, Eye, EyeOff, CheckCircle2
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import { getDeviceFingerprint } from "@/lib/fingerprint";
import { resetDevice } from "@/lib/premium.functions";
import { ensureUserProfile } from "@/lib/auth.functions";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "My Account — Abduraimov Erkinjon" },
      { name: "description", content: "Manage your IELTS account, premium status, and progress." },
    ],
  }),
  component: Account,
});

// ─── Types ────────────────────────────────────────────────────────────────────
type TestResult = { id: string; passage_title: string; score: number; total: number; band: number | null; completed_at: string };
type BookmarkItem = { id: string; type: string; reference_id: string; title?: string; created_at: string };
type LeaderboardEntry = { user_id: string; name: string; tests: number; avg_band: number };

// ─── Helpers ──────────────────────────────────────────────────────────────────
function daysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

function isInRange(dateStr: string, fromISO: string) {
  return new Date(dateStr) >= new Date(fromISO);
}

function getWeekStart() {
  const d = new Date();
  d.setDate(d.getDate() - d.getDay());
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

function bandColor(band: number) {
  if (band >= 7) return "text-green-600";
  if (band >= 5.5) return "text-yellow-600";
  return "text-red-500";
}

// ─── Activity Heatmap ────────────────────────────────────────────────────────
function ActivityHeatmap({ results }: { results: TestResult[] }) {
  const weeks = 15;
  const days: { date: string; count: number }[] = [];
  for (let i = weeks * 7 - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const count = results.filter(r => r.completed_at.startsWith(dateStr)).length;
    days.push({ date: dateStr, count });
  }
  const grouped: { date: string; count: number }[][] = [];
  for (let i = 0; i < days.length; i += 7) grouped.push(days.slice(i, i + 7));

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-1">
        {grouped.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((day) => (
              <div
                key={day.date}
                title={`${day.date}: ${day.count} test${day.count !== 1 ? "s" : ""}`}
                className={`w-4 h-4 rounded-sm border border-border ${
                  day.count === 0 ? "bg-muted" :
                  day.count === 1 ? "bg-green-200" :
                  day.count === 2 ? "bg-green-400" : "bg-green-600"
                }`}
              />
            ))}
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-2">Last 15 weeks of test activity</p>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
function Account() {
  const { user, profile, loading, signOut, refreshProfile, deviceConflict } = useAuth();
  const navigate = useNavigate();
  const resetFn = useServerFn(resetDevice);
  const ensureProfile = useServerFn(ensureUserProfile);
  const [busy, setBusy] = useState(false);

  // Password change
  const [showPwForm, setShowPwForm] = useState(false);
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [pwBusy, setPwBusy] = useState(false);

  // Stats
  const [results, setResults] = useState<TestResult[]>([]);
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [vocabCount, setVocabCount] = useState(0);
  const [articlesRead, setArticlesRead] = useState(0);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [loading, user, navigate]);

  useEffect(() => {
    if (!user) return;
    void ensureProfile({
      data: {
        fullName: String(user.user_metadata?.full_name ?? user.user_metadata?.name ?? ""),
      },
    }).then(() => refreshProfile()).catch(() => undefined);
    loadStats();
  }, [user]);

  async function loadStats() {
    setStatsLoading(true);
    try {
      const [resR, bkmR, vocR, artR, lbR] = await Promise.all([
        supabase.from("test_results").select("*").eq("user_id", user!.id).order("completed_at", { ascending: false }),
        supabase.from("bookmarks").select("*").eq("user_id", user!.id).order("created_at", { ascending: false }),
        supabase.from("vocabulary_words").select("id", { count: "exact" }).eq("user_id", user!.id),
        supabase.from("articles_read").select("id", { count: "exact" }).eq("user_id", user!.id),
        supabase.from("test_results").select("user_id, band, profiles(full_name)").gte("completed_at", getWeekStart()),
      ]);
      if (resR.data) setResults(resR.data);
      if (bkmR.data) setBookmarks(bkmR.data);
      if (vocR.count !== null) setVocabCount(vocR.count);
      if (artR.count !== null) setArticlesRead(artR.count);

      // Build leaderboard
      if (lbR.data) {
        const map: Record<string, { name: string; bands: number[] }> = {};
        lbR.data.forEach((r: any) => {
          const uid = r.user_id;
          const name = r.profiles?.full_name?.split(" ")[0] || "Student";
          if (!map[uid]) map[uid] = { name, bands: [] };
          map[uid].bands.push(r.band);
        });
        const lb: LeaderboardEntry[] = Object.entries(map).map(([uid, v]) => ({
          user_id: uid,
          name: v.name,
          tests: v.bands.length,
          avg_band: Math.round((v.bands.reduce((a, b) => a + b, 0) / v.bands.length) * 10) / 10,
        })).sort((a, b) => b.avg_band - a.avg_band || b.tests - a.tests).slice(0, 10);
        setLeaderboard(lb);
      }
    } catch (e) {
      // silently fail — stats are non-critical
    } finally {
      setStatsLoading(false);
    }
  }

  async function changePassword() {
    if (newPw !== confirmPw) { toast.error("New passwords don't match."); return; }
    if (newPw.length < 6) { toast.error("Password must be at least 6 characters."); return; }
    setPwBusy(true);
    const { error } = await supabase.auth.updateUser({ password: newPw });
    setPwBusy(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Password updated successfully!");
    setShowPwForm(false);
    setCurrentPw(""); setNewPw(""); setConfirmPw("");
  }

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
    .split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase();

  const activated = profile?.activated_at ? new Date(profile.activated_at).toLocaleDateString() : null;

  // Stats computed
  const weekStart = getWeekStart();
  const day15 = daysAgo(15);
  const monthStart = daysAgo(30);

  const testsThisWeek = results.filter(r => isInRange(r.completed_at, weekStart)).length;
  const tests15Days = results.filter(r => isInRange(r.completed_at, day15)).length;
  const testsThisMonth = results.filter(r => isInRange(r.completed_at, monthStart)).length;

  const recentBands = results.slice(0, 5).map(r => r.band ?? 0);
  const avgBand = recentBands.length ? (recentBands.reduce((a, b) => a + b, 0) / recentBands.length).toFixed(1) : "—";

  // Streak: consecutive days with at least 1 test
  let streak = 0;
  for (let i = 0; i < 30; i++) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const ds = d.toISOString().split("T")[0];
    if (results.some(r => r.completed_at.startsWith(ds))) streak++;
    else if (i > 0) break;
  }

  const myRank = leaderboard.findIndex(e => e.user_id === user.id) + 1;

  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-12 max-w-5xl space-y-8">

        {/* Header */}
        <div className="flex flex-wrap items-center gap-4">
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

        {/* Row 1: Membership + Profile */}
        <div className="grid md:grid-cols-2 gap-5">

          {/* Membership */}
          <Card className={`p-6 ${profile?.is_premium ? "bg-gradient-warm border-gold/30" : ""}`}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-serif text-xl font-semibold">Membership</h2>
              {profile?.is_premium
                ? <Badge className="bg-gold/15 text-gold border-gold/30"><Crown className="w-3 h-3 mr-1" /> Premium</Badge>
                : <Badge variant="secondary" className="bg-accent">Free</Badge>}
            </div>
            {profile?.is_premium ? (
              <>
                <p className="text-sm text-muted-foreground mb-2">You have full access to all premium materials.</p>
                {activated && <p className="text-xs text-muted-foreground inline-flex items-center gap-1.5"><Calendar className="w-3 h-3" /> Activated on {activated}</p>}
              </>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-4">Upgrade to unlock model answers, PDFs and worksheets.</p>
                <a href="https://t.me/augustus_at" target="_blank" rel="noreferrer">
                  <Button className="bg-gradient-gold text-primary-foreground w-full">
                    <Send className="w-4 h-4 mr-2" /> Contact to Upgrade
                  </Button>
                </a>
              </>
            )}
          </Card>

          {/* Profile + Password */}
          <Card className="p-6">
            <h2 className="font-serif text-xl font-semibold mb-3">Profile</h2>
            <div className="space-y-3 text-sm mb-4">
              <Row icon={<UserIcon className="w-4 h-4" />} label="Name" value={profile?.full_name || "—"} />
              <Row icon={<UserIcon className="w-4 h-4" />} label="Email" value={user.email ?? "—"} />
            </div>

            {!showPwForm ? (
              <Button variant="outline" size="sm" onClick={() => setShowPwForm(true)}>
                <Lock className="w-4 h-4 mr-2" /> Change Password
              </Button>
            ) : (
              <div className="space-y-3 border-t border-border pt-4">
                <p className="text-sm font-semibold">Change Password</p>
                <div>
                  <Label htmlFor="newpw">New Password</Label>
                  <div className="relative">
                    <Input id="newpw" type={showPw ? "text" : "password"} value={newPw} onChange={e => setNewPw(e.target.value)} minLength={6} />
                    <button type="button" className="absolute right-2 top-2 text-muted-foreground" onClick={() => setShowPw(!showPw)}>
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="confirmpw">Confirm New Password</Label>
                  <Input id="confirmpw" type={showPw ? "text" : "password"} value={confirmPw} onChange={e => setConfirmPw(e.target.value)} />
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={changePassword} disabled={pwBusy}>
                    {pwBusy ? <Loader2 className="w-4 h-4 animate-spin" /> : <><CheckCircle2 className="w-4 h-4 mr-1" /> Save</>}
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setShowPwForm(false)}>Cancel</Button>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Device binding */}
        {profile?.is_premium && (
          <Card className={`p-6 ${deviceConflict ? "border-destructive/40 bg-destructive/5" : ""}`}>
            <div className="flex items-start gap-3 mb-3">
              <span className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${deviceConflict ? "bg-destructive/15" : "bg-sage/15"}`}>
                {deviceConflict ? <AlertTriangle className="w-5 h-5 text-destructive" /> : <Smartphone className="w-5 h-5 text-sage" />}
              </span>
              <div className="flex-1">
                <h2 className="font-serif text-xl font-semibold">Connected Device</h2>
                <p className="text-sm text-muted-foreground">Premium accounts are limited to one device.</p>
              </div>
            </div>
            {deviceConflict ? (
              <>
                <p className="text-sm mb-4">This account is bound to a different device. If this is your new device, you can rebind it below.</p>
                <div className="flex flex-wrap gap-2">
                  <Button onClick={onResetDevice} disabled={busy} variant="destructive">
                    {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : "Bind to this device"}
                  </Button>
                  <a href="https://t.me/augustus_at" target="_blank" rel="noreferrer">
                    <Button variant="outline">Contact teacher</Button>
                  </a>
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">✅ This device (current) — bound to your premium account.</p>
            )}
          </Card>
        )}

        {/* Stats */}
        <div>
          <h2 className="font-serif text-2xl font-bold mb-4">My Progress</h2>
          {statsLoading ? (
            <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>
          ) : (
            <>
              {/* Summary cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <StatCard icon={<BarChart2 className="w-5 h-5 text-secondary" />} label="Tests this week" value={String(testsThisWeek)} />
                <StatCard icon={<BarChart2 className="w-5 h-5 text-secondary" />} label="Tests (15 days)" value={String(tests15Days)} />
                <StatCard icon={<BarChart2 className="w-5 h-5 text-secondary" />} label="Tests this month" value={String(testsThisMonth)} />
                <StatCard icon={<Trophy className="w-5 h-5 text-gold" />} label="Avg Band" value={String(avgBand)} />
                <StatCard icon={<Flame className="w-5 h-5 text-orange-500" />} label="Day streak" value={`${streak} day${streak !== 1 ? "s" : ""}`} />
                <StatCard icon={<BookOpen className="w-5 h-5 text-secondary" />} label="Articles read" value={String(articlesRead)} />
                <StatCard icon={<BookOpen className="w-5 h-5 text-secondary" />} label="Vocab words" value={String(vocabCount)} />
                <StatCard icon={<Bookmark className="w-5 h-5 text-secondary" />} label="Bookmarks" value={String(bookmarks.length)} />
              </div>

              {/* Activity heatmap */}
              <Card className="p-6 mb-6">
                <h3 className="font-semibold mb-4">Activity</h3>
                <ActivityHeatmap results={results} />
              </Card>

              {/* Recent tests */}
              {results.length > 0 && (
                <Card className="p-6 mb-6">
                  <h3 className="font-semibold mb-4">Recent Tests</h3>
                  <div className="space-y-2">
                    {results.slice(0, 8).map(r => (
                      <div key={r.id} className="flex items-center justify-between py-2 border-b border-border last:border-0 text-sm">
                        <span className="text-muted-foreground truncate max-w-[60%]">{r.passage_title}</span>
                        <div className="flex items-center gap-3">
                          <span>{r.score}/{r.total}</span>
                          <span className={`font-bold ${bandColor(r.band ?? 0)}`}>Band {r.band ?? "—"}</span>
                          <span className="text-xs text-muted-foreground">{new Date(r.completed_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </>
          )}
        </div>

        {/* Leaderboard */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-gold" />
            <h2 className="font-serif text-xl font-semibold">Weekly Leaderboard</h2>
            {myRank > 0 && <Badge variant="secondary" className="ml-auto">You: #{myRank}</Badge>}
          </div>
          {leaderboard.length === 0 ? (
            <p className="text-sm text-muted-foreground">No tests completed this week yet. Be the first!</p>
          ) : (
            <div className="space-y-2">
              {leaderboard.map((entry, i) => (
                <div key={entry.user_id} className={`flex items-center gap-3 py-2 px-3 rounded-lg text-sm ${entry.user_id === user.id ? "bg-accent border border-border font-semibold" : ""}`}>
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? "bg-yellow-400 text-white" : i === 1 ? "bg-gray-300 text-gray-800" : i === 2 ? "bg-amber-600 text-white" : "bg-muted text-muted-foreground"}`}>
                    {i + 1}
                  </span>
                  <span className="flex-1">{entry.name}{entry.user_id === user.id ? " (you)" : ""}</span>
                  <span className="text-muted-foreground">{entry.tests} test{entry.tests !== 1 ? "s" : ""}</span>
                  <span className={`font-bold ${bandColor(entry.avg_band)}`}>Band {entry.avg_band}</span>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Bookmarks */}
        {bookmarks.length > 0 && (
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Bookmark className="w-5 h-5 text-secondary" />
              <h2 className="font-serif text-xl font-semibold">Bookmarks</h2>
            </div>
            <div className="space-y-2">
              {bookmarks.map(b => (
                <div key={b.id} className="flex items-center justify-between py-2 border-b border-border last:border-0 text-sm">
                  <span className="text-muted-foreground capitalize">{b.type}</span>
                  <span className="font-medium">{b.title || b.reference_id}</span>
                  <span className="text-xs text-muted-foreground">{new Date(b.created_at).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          </Card>
        )}

      </section>
    </SiteLayout>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
      <span className="inline-flex items-center gap-2 text-muted-foreground">{icon} {label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <Card className="p-4 flex flex-col gap-2">
      <div className="flex items-center gap-2">{icon}<span className="text-xs text-muted-foreground">{label}</span></div>
      <span className="text-2xl font-bold">{value}</span>
    </Card>
  );
}
