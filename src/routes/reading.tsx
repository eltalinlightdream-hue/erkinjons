import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Lock, Crown, BookOpen, ExternalLink } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/reading")({
  head: () => ({ meta: [
    { title: "IELTS Reading Practice | Abduraimov Erkinjon" },
    { name: "description", content: "IELTS Reading passages — Passage 1, 2 and 3 practice." },
  ]}),
  component: Reading,
});

type Passage = {
  id: string;
  title: string;
  passageNumber: 1 | 2 | 3;
  description?: string;
  htmlFile?: string;
  content?: string;
};

const PASSAGES: Passage[] = [
  {
    id: "p3-piraha",
    title: "The Pirahã People of Brazil",
    passageNumber: 3,
    description: "An academic passage about the remarkable linguistic and cultural uniqueness of the Pirahã tribe in the Amazon rainforest.",
    htmlFile: "/passages/Day_1_Passage_3_Piraha.html",
  },
  {
    id: "p2-tv-advertising",
    title: "Children's Comprehension of Television Advertising",
    passageNumber: 2,
    description: "An academic passage examining how children understand and are influenced by TV commercials, and the techniques advertisers use to target them.",
    htmlFile: "/passages/Passage_2_TV_Advertising.html",
  },
  {
    id: "p1-thames-tunnel",
    title: "Tunnelling under the Thames",
    passageNumber: 1,
    description: "An academic passage about the remarkable engineering challenges behind building the world's first tunnel beneath a navigable river in 19th-century London.",
    htmlFile: "/passages/Tunnelling_under_the_Thames.html",
  },
  {
  id: "p3-business-innovation",
  title: "Business Innovation",
  passageNumber: 3,
  description: "As new 'wonder products' are getting harder and harder to find, what should companies do to survive in today's ever more competitive markets?",
  htmlFile: "/passages/gemini-code-1778993342900.html",
},
  {
  id: "p1-katherine-mansfield",
  title: "Katherine Mansfield",
  passageNumber: 1,
  description: "Katherine Mansfield was a modernist writer of short fiction who was born and brought up in New Zealand.",
  htmlFile: "/passages/gemini-code-1778994470958.html",
},
  {
  id: "p2-the-tasmanian-tiger",
  title: "The Tasmanian Tiger",
  passageNumber: 2,
  description: "The Tasmanian tiger, or thylocine, was a carnivorous marsupial (a meat-eating mammal which carries its young in a pouch).",
  htmlFile: "/passages/gemini-code-1778995279738.html",
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
  const [active, setActive] = useState<Passage | null>(null);
  const { profile, deviceConflict, user } = useAuth();
  const isPremium = !!profile?.is_premium && !deviceConflict;

  const visible = filter === "all" ? PASSAGES : PASSAGES.filter((p) => String(p.passageNumber) === filter);

  function handleOpen(p: Passage) {
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
        <p className="text-muted-foreground mb-2">Filter by passage type and open any passage in a clean reader view.</p>
        <p className="text-sm text-muted-foreground mb-8 italic">
          ⏱ Recommended time: Passage 1 &amp; 2 — 20 min &nbsp;|&nbsp; Passage 3 — 22 min
        </p>

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
          <p className="text-muted-foreground py-12 text-center">No passages in this category yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {visible.map((p) => {
              const locked = p.passageNumber > 3 && !isPremium;
              return (
                <Card key={p.id} className="p-6 flex flex-col relative overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="bg-accent text-foreground">P{p.passageNumber}</Badge>
                    {locked && <Lock className="w-4 h-4 text-muted-foreground" />}
                    {p.htmlFile && !locked && (
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                  <h3 className={cn("font-serif text-xl font-semibold mb-2 leading-snug", locked && "blur-sm select-none")}>
                    {p.title}
                  </h3>
                  {p.description && (
                    <p className={cn("text-sm text-muted-foreground mb-5 flex-1", locked && "blur-sm select-none")}>
                      {p.description}
                    </p>
                  )}
                  {locked ? (
                    <Link to={user ? "/premium" : "/auth"}>
                      <Button size="sm" className="w-full bg-gradient-gold text-primary-foreground">
                        <Crown className="w-4 h-4 mr-1" /> Unlock with Premium
                      </Button>
                    </Link>
                  ) : (
                    <Button size="sm" variant="outline" className="w-full" onClick={() => handleOpen(p)}>
                      <BookOpen className="w-4 h-4 mr-1" />
                      {p.htmlFile ? "Open Full Test" : "Open"}
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
              {active && <Badge variant="secondary" className="bg-accent text-foreground">Passage {active.passageNumber}</Badge>}
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
