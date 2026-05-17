import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Headphones, Lock, Crown, RotateCcw, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useTestStatus } from "@/hooks/use-test-status";

export const Route = createFileRoute("/listening")({
  head: () => ({
    meta: [
      { title: "IELTS Listening | Abduraimov Erkinjon" },
      { name: "description", content: "IELTS Listening practice tests — Section 1 to Section 4." },
    ],
  }),
  component: Listening,
});

type ListeningTest = {
  id: string;
  title: string;
  section: 1 | 2 | 3 | 4;
  description: string;
  questions: number;
  htmlFile: string;
  audioFile?: string;
  isPremium: boolean;
};

const TESTS: ListeningTest[] = [
  {
    id: "s4-dormancy",
    title: "Dormancy",
    section: 4,
    description:
      "A lecture on animal dormancy — insects, the African lungfish, snails, and the Arctic ground squirrel.",
    questions: 10,
    htmlFile: "/passages/Dormancy_Section_4.html",
    audioFile: "/audio/part 4 dormancy.mp3",
    isPremium: false,
  },
];

const FILTERS = [
  { v: "all", label: "All" },
  { v: "1", label: "Section 1" },
  { v: "2", label: "Section 2" },
  { v: "3", label: "Section 3" },
  { v: "4", label: "Section 4" },
] as const;

function Listening() {
  const [filter, setFilter] = useState<"all" | "1" | "2" | "3" | "4">("all");
  const { profile, deviceConflict, user } = useAuth();
  const isPremium = !!profile?.is_premium && !deviceConflict;

  const testIds = TESTS.map((t) => t.id);
  const { statuses, resetTest } = useTestStatus(testIds);

  const visible =
    filter === "all" ? TESTS : TESTS.filter((t) => String(t.section) === filter);

  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-12 max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">IELTS Listening</h1>
        <p className="text-muted-foreground mb-2">
          Full listening tests with built-in audio player, timer, and answer checker.
        </p>
        <p className="text-sm text-muted-foreground italic mb-8">
          ⏱ Recommended time: Sections 1–4 — 30 min total &nbsp;|&nbsp; Each section approx. 7–8 min
        </p>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {FILTERS.map((f) => (
            <Button
              key={f.v}
              variant={filter === f.v ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f.v)}
            >
              {f.label}
            </Button>
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="text-muted-foreground py-12 text-center">No tests in this section yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {visible.map((t) => {
              const locked = t.isPremium && !isPremium;
              const status = statuses[t.id];
              const completed = !!status?.completed;

              return (
                <Card
                  key={t.id}
                  className={cn(
                    "p-6 flex flex-col relative overflow-hidden transition-colors",
                    completed && "border-green-500/40 bg-green-500/5"
                  )}
                >
                  {/* Top row */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-accent text-foreground">
                        Section {t.section}
                      </Badge>
                      {completed && (
                        <Badge className="bg-green-600 text-white text-xs gap-1 flex items-center">
                          <CheckCircle2 className="w-3 h-3" />
                          {status.score}/{status.total}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{t.questions} questions</span>
                      {locked && <Lock className="w-4 h-4 text-muted-foreground" />}
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className={cn(
                      "font-serif text-xl font-semibold mb-2 leading-snug",
                      locked && "blur-sm select-none"
                    )}
                  >
                    {t.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={cn(
                      "text-sm text-muted-foreground mb-5 flex-1",
                      locked && "blur-sm select-none"
                    )}
                  >
                    {t.description}
                  </p>

                  {/* Last completed date */}
                  {completed && (
                    <p className="text-xs text-muted-foreground mb-3">
                      Completed {new Date(status.completedAt).toLocaleDateString()}
                    </p>
                  )}

                  {/* Action buttons */}
                  {locked ? (
                    <Link to={user ? "/premium" : "/auth"}>
                      <Button size="sm" className="w-full bg-gradient-gold text-primary-foreground">
                        <Crown className="w-4 h-4 mr-1" /> Unlock with Premium
                      </Button>
                    </Link>
                  ) : completed ? (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => window.open(t.htmlFile, "_blank")}
                      >
                        <Headphones className="w-4 h-4 mr-1" /> Review
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 text-muted-foreground"
                        onClick={() => resetTest(t.id)}
                      >
                        <RotateCcw className="w-4 h-4 mr-1" /> Redo
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full"
                      onClick={() => window.open(t.htmlFile, "_blank")}
                    >
                      <Headphones className="w-4 h-4 mr-1" /> Start Test
                    </Button>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
