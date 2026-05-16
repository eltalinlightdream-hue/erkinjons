import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PremiumGate } from "@/components/premium-gate";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";

export const Route = createFileRoute("/reading-listening")({
  head: () => ({ meta: [
    { title: "IELTS Reading & Listening | Abduraimov Erkinjon" },
    { name: "description", content: "Strategies per question type, plus downloadable PDF practice." },
  ]}),
  component: Page,
});

const R_TIPS = [
  { t: "Skim, then scan", d: "1 minute for the gist, then scan for keywords." },
  { t: "True / False / Not Given", d: "If the text says nothing about the claim → 'Not Given'. Don't infer." },
  { t: "Matching headings", d: "First and last sentences carry the main idea 80% of the time." },
  { t: "Watch the time", d: "60 minutes, 40 questions. Max 20 minutes per passage." },
];
const L_TIPS = [
  { t: "Read ahead", d: "Use preview pauses to underline keywords and predict answer types." },
  { t: "Mind the trap", d: "Speakers self-correct. Wait for the final version." },
  { t: "Spelling counts", d: "A correct answer spelled wrong = 0." },
  { t: "Map labelling", d: "Orient yourself before the audio starts." },
];
const PDFS = [
  { title: "Reading Practice Pack 1", desc: "3 passages with answer keys", premium: false },
  { title: "Listening Section 3 Drill", desc: "Academic discussion practice", premium: false },
  { title: "Premium Reading Bundle (10 tests)", desc: "Cambridge-style mocks", premium: true },
  { title: "Listening Maps Mega Pack", desc: "Map labelling drills", premium: true },
];

function Page() {
  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-12 max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">Reading & Listening</h1>
        <p className="text-muted-foreground mb-8 text-lg">Targeted strategies and downloadable practice.</p>
        <Tabs defaultValue="reading">
          <TabsList className="bg-accent"><TabsTrigger value="reading">Reading</TabsTrigger><TabsTrigger value="listening">Listening</TabsTrigger></TabsList>
          {[{ k: "reading", tips: R_TIPS }, { k: "listening", tips: L_TIPS }].map((s) => (
            <TabsContent key={s.k} value={s.k} className="mt-6">
              <div className="grid sm:grid-cols-2 gap-4">
                {s.tips.map((t) => (
                  <div key={t.t} className="bg-card rounded-2xl p-5 border border-border">
                    <h3 className="font-semibold mb-1.5">{t.t}</h3>
                    <p className="text-sm text-muted-foreground">{t.d}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Downloadable PDFs</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {PDFS.map((p) => {
              const card = (
                <div className="bg-card rounded-2xl p-5 border border-border flex gap-4 items-start">
                  <span className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center shrink-0"><FileText className="w-5 h-5 text-secondary" /></span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold">{p.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{p.desc}</p>
                    <Button size="sm" variant="outline"><Download className="w-4 h-4 mr-1.5" /> Download</Button>
                  </div>
                </div>
              );
              return p.premium ? <PremiumGate key={p.title} label={`${p.title} · Premium`}>{card}</PremiumGate> : <div key={p.title}>{card}</div>;
            })}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
