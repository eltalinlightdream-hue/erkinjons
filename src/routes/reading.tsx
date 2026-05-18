import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Lock, Crown, BookOpen, RotateCcw } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import {
  getTestProgressMeta,
  ProgressStatus,
  TEST_PROGRESS_OPTIONS,
  useTestStatus,
} from "@/hooks/use-test-status";
import { TestProgressBadge, TestProgressSelect } from "@/components/test-progress-controls";

export const Route = createFileRoute("/reading")({
  head: () => ({
    meta: [
      { title: "IELTS Reading Practice | Abduraimov Erkinjon" },
      { name: "description", content: "IELTS Reading passages вЂ” Passage 1, 2 and 3 practice." },
    ],
  }),
  component: Reading,
});

type Passage = {
  id: string;
  title: string;
  passageNumber: 1 | 2 | 3;
  description?: string;
  htmlFile?: string;
  content?: string;
  isPremium: boolean;
};

const PASSAGES: Passage[] = [
  {
    id: "p3-piraha",
    title: "The PirahГЈ People of Brazil",
    passageNumber: 3,
    isPremium: true,
    description:
      "An academic passage about the remarkable linguistic and cultural uniqueness of the PirahГЈ tribe in the Amazon rainforest.",
    htmlFile: "/passages/Day_1_Passage_3_Piraha.html",
  },
  {
    id: "p2-tv-advertising",
    title: "Children's Comprehension of Television Advertising",
    passageNumber: 2,
    isPremium: false,
    description:
      "An academic passage examining how children understand and are influenced by TV commercials, and the techniques advertisers use to target them.",
    htmlFile: "/passages/Passage_2_TV_Advertising.html",
  },
  {
    id: "p1-thames-tunnel",
    title: "Tunnelling under the Thames",
    passageNumber: 1,
    isPremium: false,
    description:
      "An academic passage about the remarkable engineering challenges behind building the world's first tunnel beneath a navigable river in 19th-century London.",
    htmlFile: "/passages/Tunnelling_under_the_Thames.html",
  },
  {
    id: "p3-business-innovation",
    title: "Business Innovation",
    passageNumber: 3,
    isPremium: false,
    description:
      "As new 'wonder products' are getting harder and harder to find, what should companies do to survive in today's ever more competitive markets?",
    htmlFile: "/passages/gemini-code-1778993342900.html",
  },
  {
    id: "p1-katherine-mansfield",
    title: "Katherine Mansfield",
    passageNumber: 1,
    isPremium: false,
    description:
      "Katherine Mansfield was a modernist writer of short fiction who was born and brought up in New Zealand.",
    htmlFile: "/passages/gemini-code-1778994470958.html",
  },
  {
    id: "p2-the-tasmanian-tiger",
    title: "The Tasmanian Tiger",
    passageNumber: 2,
    isPremium: false,
    description:
      "The Tasmanian tiger, or thylocine, was a carnivorous marsupial (a meat-eating mammal which carries its young in a pouch).",
    htmlFile: "/passages/gemini-code-1778995279738.html",
  },
  {
    id: "p1-radiocarbon-dating",
    title: "Radiocarbon Dating вЂ” The Profile of Nancy Athfield",
    passageNumber: 1,
    isPremium: false,
    description:
      "Have you ever picked up a small stone off the ground and wondered how old it was?",
    htmlFile: "/passages/IELTS_Radiocarbon_Dating_Nancy_Athfield_Test.html",
  },
  {
    id: "p2-the-return-of-monkey-life",
    title: "The Return of Monkey life",
    passageNumber: 2,
    isPremium: true,
    description: "The recovery and life of monkeys in Northern Costa Rica",
    htmlFile: "/passages/IELTS_Passage2_Return_of_Monkey_Life_Test.html",
  },
  {
    id: "p1-the-sound-of-dolphin",
    title: "The Sound of Dolphin",
    passageNumber: 1,
    isPremium: false,
    description:
      "Each and every dolphin has a different sound just like you and me, a sound that other dolphins recognize as a particular individual.",
    htmlFile: "/passages/IELTS_The_Sound_of_Dolphin_Test.html",
  },
  {
    id: "p1-morse-code",
    title: "Morse code",
    passageNumber: 1,
    isPremium: false,
    description:
      "Morse code is being replaced by a new satellite-based system for sending distress calls at sea. Its dots and dashes have had a good run for their money.",
    htmlFile: "/passages/IELTS_Passage1_Morse_Code_Test.html",
  },
  {
    id: "p1-why-good-ideas-fail",
    title: "Why Good ideas fail?",
    passageNumber: 1,
    isPremium: false,
    description:
      "Hypothetical case study: As part of a marketing course, two marketing experts comment on a hypothetical case study involving TF, a fictional retail giant specializing home furnishing. The experts give concrete solutions and advice to assist students.",
    htmlFile: "/passages/IELTS_Why_Good_Ideas_Fail_Test.html",
  },
  {
    id: "p1-thomas-young-the-last-true-know-it-all",
    title: "Thomas Young: The last true know-it-all",
    passageNumber: 1,
    isPremium: false,
    description:
      "Thomas Young (1773-1829) contributed 63 articles to the Encyclopedia Britannica, including 46 biographical entries (mostly on scientists and classicists) and substantial essays on вЂњBridge,вЂќ вЂњChromatics,вЂќ вЂњEgypt,вЂќ вЂњLanguagesвЂќ and вЂњTidesвЂќ.",
    htmlFile: "/passages/IELTS_Passage1_Thomas_Young_Test.html",
  },
  {
    id: "p3-what-do-babies-know",
    title: "What do Babies know?",
    passageNumber: 3,
    isPremium: true,
    description:
      "As Daniel Haworth is settled into a high chair and wheeled behind a black screen, a sudden look of worry furrows his 9-month-old brow.",
    htmlFile: "/passages/IELTS_Passage3_What_Do_Babies_Know_Test.html",
  },
  {
    id: "p1-malaria-italy",
    title: "Malaria Italy",
    passageNumber: 1,
    isPremium: true,
    description:
      "Mal-aria. Bad air. Even the world is Italian, and this horrible disease marked the life of those in the peninsula for thousands of years. ",
    htmlFile: "/passages/IELTS_Malaria_Italy_Test.html",
  },
   {
    id: "p1-ambergris",
    title: "Ambergris",
    passageNumber: 1,
    isPremium: false,
    description:
      "Ambergris was used to perfume cosmetics in the days of ancient Mesopotamia and almost every civilization on the earth has a brush with ambergris.",
    htmlFile: "/passages/IELTS_Passage1_Ambergris_Test.html",
  },
   {
    id: "p3-mite-harvestmen",
    title: "Mite Harvestmen",
    passageNumber: 3,
    isPremium: true,
    description:
      "Few people have heard of the mite harvestman, and fewer still would recognize it at close range.",
    htmlFile: "/passages/IELTS_Passage3_Mite_Harvestmen_Test.html",
  },
  {
    id: "p2-bird-migration",
    title: "Bird Migration",
    passageNumber: 2,
    isPremium: false,
    description:
      "Birds have many unique design features that enable them to perform such amazing feats of endurance.",
    htmlFile: "/passages/IELTS_Passage2_Bird_Migration_Test.html",
  },
  {
    id: "p3-global-warming-in-new-zealand",
    title: "Global Warming in New Zealand",
    passageNumber: 3,
    isPremium: false,
    description:
      "For many environmentalists, the world seems to be getting warmer.",
    htmlFile: "/passages/IELTS_Passage3_Global_Warming_NZ_Test.html",
  },
  {
    id: "p1-nintendo-preschoolers",
    title: "Nintendo Preschoolers",
    passageNumber: 1,
    isPremium: false,
    description:
      "Designing computer games for young children is a daunting task for game producers, who, for a long time, have concentrated on more hard core game fans.",
    htmlFile: "/passages/IELTS_Passage1_Nintendo_Preschoolers_Test.html",
  },
];

const FILTERS = [
  { v: "all", label: "All" },
  { v: "1", label: "Passage 1" },
  { v: "2", label: "Passage 2" },
  { v: "3", label: "Passage 3" },
] as const;

function Reading() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["v"]>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | ProgressStatus>("all");
  const [active, setActive] = useState<Passage | null>(null);
  const { profile, deviceConflict, user } = useAuth();
  const isPremium = !!profile?.is_premium && !deviceConflict;

  const passageIds = PASSAGES.map((p) => p.id);
  const { statuses, statusFor, setTestStatus, resetTest } = useTestStatus(passageIds);

  const visible = PASSAGES.filter((p) => {
    const matchesPassage = filter === "all" || String(p.passageNumber) === filter;
    const matchesStatus = statusFilter === "all" || statusFor(p.id) === statusFilter;
    return matchesPassage && matchesStatus;
  });

  function handleOpen(p: Passage) {
    if (statusFor(p.id) === "not_done") {
      void setTestStatus(p.id, "not_completed");
    }
    if (p.htmlFile) {
      window.open(p.htmlFile, "_blank");
    } else {
      setActive(p);
    }
  }

  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-12 max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">IELTS Reading Practice</h1>
        <p className="text-muted-foreground mb-2">
          Filter by passage type and open any passage in a clean reader view.
        </p>
        <p className="text-sm text-muted-foreground mb-8 italic">
          вЏ± Recommended time: Passage 1 &amp; 2 вЂ” 20 min &nbsp;|&nbsp; Passage 3 вЂ” 22 min
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
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

        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={statusFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("all")}
          >
            All statuses
          </Button>
          {TEST_PROGRESS_OPTIONS.map((option) => (
            <Button
              key={option.value}
              variant={statusFilter === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="text-muted-foreground py-12 text-center">No passages in this category yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {visible.map((p) => {
              const locked = p.isPremium && !isPremium;
              const status = statuses[p.id];
              const progressStatus = statusFor(p.id);
              const isFinished = progressStatus === "finished";
              const progressMeta = getTestProgressMeta(progressStatus);

              return (
                <Card
                  key={p.id}
                  className={cn(
                    "p-6 flex flex-col relative overflow-hidden transition-colors",
                    progressMeta.cardClassName,
                  )}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-accent text-foreground">
                        P{p.passageNumber}
                      </Badge>
                      <TestProgressBadge status={progressStatus} detail={status} />
                    </div>
                    {locked && <Lock className="w-4 h-4 text-muted-foreground" />}
                  </div>

                  <h3
                    className={cn(
                      "font-serif text-xl font-semibold mb-2 leading-snug",
                      locked && "blur-sm select-none",
                    )}
                  >
                    {p.title}
                  </h3>

                  {p.description && (
                    <p
                      className={cn(
                        "text-sm text-muted-foreground mb-5 flex-1",
                        locked && "blur-sm select-none",
                      )}
                    >
                      {p.description}
                    </p>
                  )}

                  {status?.completedAt && (
                    <p className="text-xs text-muted-foreground mb-3">
                      Completed {new Date(status.completedAt).toLocaleDateString()}
                    </p>
                  )}

                  {!locked && (
                    <div className="mb-3">
                      <TestProgressSelect
                        value={progressStatus}
                        onChange={(next) => setTestStatus(p.id, next)}
                      />
                    </div>
                  )}

                  {locked ? (
                    <Link to={user ? "/premium" : "/auth"}>
                      <Button size="sm" className="w-full bg-gradient-gold text-primary-foreground">
                        <Crown className="w-4 h-4 mr-1" /> Unlock with Premium
                      </Button>
                    </Link>
                  ) : isFinished ? (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleOpen(p)}
                      >
                        <BookOpen className="w-4 h-4 mr-1" /> Review
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 text-muted-foreground"
                        onClick={() => resetTest(p.id)}
                      >
                        <RotateCcw className="w-4 h-4 mr-1" /> Redo
                      </Button>
                    </div>
                  ) : (
                    <Button size="sm" variant="outline" className="w-full" onClick={() => handleOpen(p)}>
                      <BookOpen className="w-4 h-4 mr-1" />
                      {progressStatus === "not_completed" ? "Continue Test" : p.htmlFile ? "Open Full Test" : "Open"}
                    </Button>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </section>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              {active && (
                <Badge variant="secondary" className="bg-accent text-foreground">
                  Passage {active.passageNumber}
                </Badge>
              )}
            </div>
            <DialogTitle className="font-serif text-2xl">{active?.title}</DialogTitle>
          </DialogHeader>
          {active && (
            <article
              className="prose prose-neutral max-w-none mt-4 text-base leading-relaxed"
              dangerouslySetInnerHTML={{ __html: active.content ?? "" }}
            />
          )}
        </DialogContent>
      </Dialog>
    </SiteLayout>
  );
}
