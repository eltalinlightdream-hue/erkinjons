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
  htmlFile?: string;   // if set, opens standalone HTML in new tab
  content?: string;    // raw HTML for inline passages
};

const PASSAGES: Passage[] = [
  {
    id: "p1-bees",
    title: "The Life of Urban Bees",
    passageNumber: 1,
    description: "A short factual passage about beekeeping in modern cities.",
    content: `
      <p>Urban beekeeping has grown rapidly in the last decade. Once confined to rural areas, hives are now found on rooftops across <strong>London, New York and Tokyo</strong>.</p>
      <p>Researchers argue that city bees often produce more honey than their countryside counterparts because of the diversity of flowering plants in parks and gardens.</p>
      <p>However, critics warn that overcrowding may put pressure on wild pollinators.</p>
    `,
  },
  {
    id: "p2-sleep",
    title: "Why We Sleep",
    passageNumber: 2,
    description: "A medium-difficulty passage on the science of sleep.",
    content: `
      <p>For centuries, sleep was considered a passive state. Recent neuroscience has overturned this view entirely.</p>
      <p>During <em>REM sleep</em>, the brain consolidates memories, processes emotions and even prunes unused neural connections.</p>
      <p>Chronic sleep deprivation has been linked to cardiovascular disease, depression and impaired learning.</p>
    `,
  },
  {
    id: "p3-archaeology",
    title: "Reconstructing Ancient Diets",
    passageNumber: 3,
    description: "A challenging passage on isotope analysis in archaeology.",
    content: `
      <p>Stable isotope analysis allows archaeologists to reconstruct what people ate thousands of years ago by examining trace elements preserved in bone collagen.</p>
      <p>The ratio of carbon-13 to carbon-12, for instance, distinguishes between consumers of <strong>C3 plants</strong> such as wheat and <strong>C4 plants</strong> such as millet.</p>
      <p>Combined with nitrogen ratios, researchers can also estimate the proportion of marine versus terrestrial protein in ancient diets.</p>
    `,
  },
  {
    id: "p3-piraha",
    title: "The Pirahã People of Brazil",
    passageNumber: 3,
    description: "An academic passage about the remarkable linguistic and cultural uniqueness of the Pirahã tribe in the Amazon rainforest.",
    htmlFile: "/passages/Day_1_Passage_3_Piraha.html",
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
              const locked = p.passageNumber !== 1 && !isPremium;
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

      {/* Inline reader dialog — only for passages without htmlFile */}
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
