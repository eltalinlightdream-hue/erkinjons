import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Youtube, Play, FileText, Download, Lock } from "lucide-react";
import { useState } from "react";
import { PremiumGate } from "@/components/premium-gate";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/videos")({
  head: () => ({ meta: [
    { title: "Video Lessons — Abduraimov Erkinjon YouTube Library" },
    { name: "description", content: "All IELTS YouTube lessons grouped into playlists — Writing, Speaking, Reading, Listening and Grammar." },
  ]}),
  component: Videos,
});

type Attachment = { name: string; premium?: boolean };
type Video = { id: string; title: string; duration: string; premium?: boolean; attachments?: Attachment[] };
type Playlist = { title: string; description: string; videos: Video[] };

const PLAYLISTS: Playlist[] = [
  { title: "Writing Task 1 Lessons", description: "Bar charts, line graphs, pie charts, maps, processes — all covered.", videos: [
    { id: "dQw4w9WgXcQ", title: "Task 1 — How to describe a line graph", duration: "12:34", attachments: [{ name: "Line-graph-template.pdf" }, { name: "Sample-answers.pdf", premium: true }] },
    { id: "dQw4w9WgXcQ", title: "Task 1 — Process diagrams made easy", duration: "9:11", attachments: [{ name: "Process-vocabulary.pdf" }] },
    { id: "dQw4w9WgXcQ", title: "Task 1 — Comparing two charts (Band 8)", duration: "15:02", premium: true, attachments: [{ name: "Comparison-phrases.pdf", premium: true }] },
  ]},
  { title: "Writing Task 2 Lessons", description: "Essay structures, common question types and band-8 examples.", videos: [
    { id: "dQw4w9WgXcQ", title: "Task 2 — The 4-paragraph framework", duration: "14:20", attachments: [{ name: "Essay-skeleton.pdf" }] },
    { id: "dQw4w9WgXcQ", title: "Task 2 — Opinion essays from scratch", duration: "11:45" },
    { id: "dQw4w9WgXcQ", title: "Task 2 — Discuss both views essays", duration: "13:08", premium: true },
  ]},
  { title: "Speaking Practice", description: "Real questions, model answers and pronunciation drills.", videos: [
    { id: "dQw4w9WgXcQ", title: "Part 2 — 'Describe a person who inspired you'", duration: "8:30", attachments: [{ name: "Part2-cue-card-pack.pdf" }] },
    { id: "dQw4w9WgXcQ", title: "Part 3 — Common follow-up topics", duration: "10:15", premium: true },
  ]},
  { title: "Reading Strategies", description: "Question-type by question-type breakdown.", videos: [
    { id: "dQw4w9WgXcQ", title: "True/False/Not Given decoded", duration: "9:50" },
    { id: "dQw4w9WgXcQ", title: "Matching headings — fast technique", duration: "7:42" },
  ]},
  { title: "Listening Tips", description: "Section-by-section technique and common traps.", videos: [
    { id: "dQw4w9WgXcQ", title: "Section 1 — How to never miss a number", duration: "6:20" },
    { id: "dQw4w9WgXcQ", title: "Section 4 — Academic lecture notes", duration: "11:00", premium: true },
  ]},
  { title: "Grammar & Vocabulary", description: "Build the language base that powers a 7+.", videos: [
    { id: "dQw4w9WgXcQ", title: "10 collocations every IELTS candidate needs", duration: "8:05" },
    { id: "dQw4w9WgXcQ", title: "Tenses for Writing Task 1", duration: "12:40", attachments: [{ name: "Tense-cheatsheet.pdf" }] },
  ]},
];

function Videos() {
  const [active, setActive] = useState<Video | null>(null);
  const { profile, deviceConflict } = useAuth();
  const isPremium = !!profile?.is_premium && !deviceConflict;

  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Video Lessons</h1>
            <p className="text-muted-foreground text-lg">Organised into playlists — just like my YouTube channel.</p>
          </div>
          <a href="http://www.youtube.com/@erkinjon_s" target="_blank" rel="noreferrer">
            <Button className="bg-[#FF0000] hover:bg-[#FF0000]/90 text-white"><Youtube className="w-4 h-4 mr-2" /> Visit Full Channel</Button>
          </a>
        </div>

        <div className="space-y-12">
          {PLAYLISTS.map((pl) => (
            <div key={pl.title}>
              <div className="flex items-baseline justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-2xl font-bold">{pl.title}</h2>
                  <p className="text-sm text-muted-foreground">{pl.description}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{pl.videos.length} videos</span>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-3 -mx-4 px-4 snap-x">
                {pl.videos.map((v, i) => {
                  const locked = v.premium && !isPremium;
                  return (
                    <button key={i} onClick={() => setActive(v)} className="snap-start shrink-0 w-72 text-left group">
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-muted border border-border">
                        <img src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`} alt={v.title} className="w-full h-full object-cover" loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                          <span className="text-white text-xs bg-black/60 px-2 py-0.5 rounded">{v.duration}</span>
                        </div>
                        <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                          <span className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                            {locked ? <Lock className="w-5 h-5 text-foreground" /> : <Play className="w-6 h-6 text-foreground fill-current ml-1" />}
                          </span>
                        </span>
                        {locked && <span className="absolute top-2 right-2 text-[10px] font-semibold bg-gradient-gold text-primary-foreground px-2 py-0.5 rounded">PREMIUM</span>}
                      </div>
                      <h3 className="font-medium text-sm mt-2 line-clamp-2 group-hover:text-secondary transition-colors">{v.title}</h3>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader><DialogTitle>{active?.title}</DialogTitle></DialogHeader>
          {active && (
            <div className="space-y-5">
              {active.premium && !isPremium ? (
                <PremiumGate label="This video is Premium">
                  <div className="aspect-video bg-muted rounded-xl" />
                </PremiumGate>
              ) : (
                <div className="aspect-video rounded-xl overflow-hidden bg-black">
                  <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${active.id}`} title={active.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                </div>
              )}

              {active.attachments && active.attachments.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2 text-sm">Attached files</h4>
                  <div className="space-y-2">
                    {active.attachments.map((a, i) => {
                      const locked = a.premium && !isPremium;
                      return (
                        <div key={i} className="flex items-center gap-3 bg-accent/60 rounded-xl p-3">
                          <span className="w-9 h-9 rounded-lg bg-card flex items-center justify-center">
                            {locked ? <Lock className="w-4 h-4 text-gold" /> : <FileText className="w-4 h-4 text-secondary" />}
                          </span>
                          <span className="flex-1 text-sm font-medium truncate">{a.name}</span>
                          <Button size="sm" variant={locked ? "outline" : "default"} disabled={locked}>
                            {locked ? "Premium" : <><Download className="w-3.5 h-3.5 mr-1.5" />Download</>}
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </SiteLayout>
  );
}
