import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PremiumGate } from "@/components/premium-gate";

export const Route = createFileRoute("/speaking")({
  head: () => ({ meta: [
    { title: "IELTS Speaking — Parts 1, 2 & 3 | Augustus IELTS" },
    { name: "description", content: "Topic cards, model answers and tips for IELTS Speaking Parts 1, 2 and 3." },
  ]}),
  component: Speaking,
});

const TOPICS = {
  p1: [
    { q: "Do you live in a house or a flat?", a: "Actually, I live in a flat on the fourth floor of a relatively new building in the centre of the city. It's compact but cosy, and the location means I can walk pretty much anywhere..." },
    { q: "Do you enjoy cooking?", a: "I'd say I'm getting there. I used to rely on my mum's cooking, but since I moved out, I've started experimenting — mostly with traditional Uzbek dishes like plov and lagman..." },
    { q: "What kind of weather do you prefer?", a: "I'm definitely a fan of warm weather. There's something about long sunny days that just lifts my mood..." },
  ],
  p2: [
    { q: "Describe a person who has had an important influence on your life.\n— who this person is\n— how you met them\n— what kind of influence they had\n— and explain why this influence was important to you.",
      a: "I'd like to talk about my English teacher from secondary school, Mr. Otabek. I first met him when I was about thirteen, and at that point I genuinely thought English was just a school subject I had to survive..." },
    { q: "Describe a place you visited that left a strong impression on you.",
      a: "The place I want to describe is Samarkand — specifically the Registan square. I went there with my family a couple of summers ago..." },
  ],
  p3: [
    { q: "How has technology changed the way we learn languages?",
      a: "Technology has completely reshaped language learning. A decade ago, you needed textbooks, a teacher and a classroom. Now, with apps, podcasts and AI tutors, learners have round-the-clock access to authentic content..." },
    { q: "Do you think traditional teaching methods are still effective?",
      a: "I think traditional methods still have real value, especially for building discipline and depth. However, the most effective approach blends both worlds — structured classroom instruction with the flexibility of digital tools..." },
  ],
};

const TIPS = [
  { t: "Fluency over perfection", d: "Examiners reward natural flow more than complex grammar. Don't pause to find the 'perfect' word — paraphrase." },
  { t: "Use collocations", d: "Phrases like 'broaden my horizons', 'a long-standing tradition', 'plays a pivotal role' instantly raise your score." },
  { t: "Structure Part 2", d: "30s intro → 60s main story → 30s reflection. Practise with a timer until 2 minutes feels natural." },
  { t: "Extend Part 3 answers", d: "Opinion → reason → example → counterpoint. Two-sentence answers cap your score at 6." },
];

function Speaking() {
  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-12 max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">IELTS Speaking</h1>
        <p className="text-muted-foreground mb-8 text-lg">Topic cards, model answers and the techniques that actually move your band.</p>

        <Tabs defaultValue="p1">
          <TabsList className="bg-accent">
            <TabsTrigger value="p1">Part 1</TabsTrigger>
            <TabsTrigger value="p2">Part 2</TabsTrigger>
            <TabsTrigger value="p3">Part 3</TabsTrigger>
          </TabsList>

          {(["p1","p2","p3"] as const).map((k, idx) => (
            <TabsContent key={k} value={k} className="mt-6">
              <Accordion type="single" collapsible className="space-y-3">
                {TOPICS[k].map((t, i) => (
                  <AccordionItem key={i} value={`${k}-${i}`} className="bg-card border border-border rounded-2xl px-5">
                    <AccordionTrigger className="text-left font-medium hover:no-underline whitespace-pre-wrap">{t.q}</AccordionTrigger>
                    <AccordionContent>
                      {idx === 0 ? (
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{t.a}</p>
                      ) : (
                        <PremiumGate label="Model answer · Premium">
                          <p className="leading-relaxed whitespace-pre-wrap">{t.a}</p>
                        </PremiumGate>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Speaking Tips</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {TIPS.map((t) => (
              <div key={t.t} className="bg-gradient-warm rounded-2xl p-5 border border-border">
                <h3 className="font-semibold mb-1.5">{t.t}</h3>
                <p className="text-sm text-muted-foreground">{t.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
