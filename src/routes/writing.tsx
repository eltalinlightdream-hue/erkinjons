import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PremiumGate } from "@/components/premium-gate";
import { TrendingUp } from "lucide-react";

export const Route = createFileRoute("/writing")({
  head: () => ({ meta: [
    { title: "IELTS Writing — Task 1 & Task 2 | Abduraimov Erkinjon" },
    { name: "description", content: "Strategies, sample questions and model answers for IELTS Writing Task 1 and Task 2." },
  ]}),
  component: Writing,
});

const TIPS_T1 = [
  { title: "Spend 20 minutes max", desc: "Task 1 is worth 1/3 of your Writing score. Don't let it eat into Task 2 time." },
  { title: "Paraphrase the prompt", desc: "Your first sentence should restate the question in different words — synonyms + structure changes." },
  { title: "Group, don't list", desc: "Identify 2–3 key trends or features and group your data points around them." },
  { title: "No opinions", desc: "Task 1 is a report. Only describe what you see, never explain why or give your view." },
];
const TIPS_T2 = [
  { title: "Plan for 3 minutes", desc: "A clear plan saves you 5+ minutes of rewriting later. Decide your position before you start." },
  { title: "4-paragraph structure", desc: "Intro → Body 1 → Body 2 → Conclusion. Each body paragraph = 1 main idea + explanation + example." },
  { title: "Answer fully", desc: "If the question has two parts, address both. Half-answers cap your score at Band 6." },
  { title: "Use cohesive devices", desc: "However, furthermore, in contrast — but use them naturally. Overuse hurts your score." },
];

const SAMPLES_T1 = [
  { q: "The chart below shows the percentage of households in different income brackets in the UK in 1980 and 2020. Summarise the information by selecting and reporting the main features." },
  { q: "The diagram illustrates the process by which bricks are manufactured for the building industry." },
];
const SAMPLES_T2 = [
  { q: "Some people believe that university education should be free for all students. Others think students should pay the full cost. Discuss both views and give your opinion." },
  { q: "In many countries, the gap between rich and poor is widening. What are the causes of this, and what measures can be taken to reduce the gap?" },
];

const BANDS = [
  { band: 6, color: "bg-muted text-foreground", label: "Competent — gets the message across with some errors" },
  { band: 7, color: "bg-sage text-white", label: "Good — clear, organised, with mostly accurate grammar" },
  { band: 8, color: "bg-gradient-gold text-primary-foreground", label: "Very good — natural, precise, sophisticated control" },
];

function Writing() {
  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-12 max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">IELTS Writing</h1>
        <p className="text-muted-foreground mb-8 text-lg">Master both tasks with strategies, sample prompts and full model answers.</p>

        <Tabs defaultValue="t1">
          <TabsList className="bg-accent">
            <TabsTrigger value="t1">Task 1</TabsTrigger>
            <TabsTrigger value="t2">Task 2</TabsTrigger>
          </TabsList>

          {[{ key: "t1", tips: TIPS_T1, samples: SAMPLES_T1 }, { key: "t2", tips: TIPS_T2, samples: SAMPLES_T2 }].map((s) => (
            <TabsContent key={s.key} value={s.key} className="space-y-10 mt-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Strategy</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {s.tips.map((t) => (
                    <div key={t.title} className="bg-card rounded-2xl p-5 border border-border">
                      <h3 className="font-semibold mb-1.5">{t.title}</h3>
                      <p className="text-sm text-muted-foreground">{t.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Sample questions</h2>
                <div className="space-y-3">
                  {s.samples.map((q, i) => (
                    <div key={i} className="bg-gradient-warm rounded-2xl p-5 border border-border">
                      <p className="text-sm leading-relaxed">{q.q}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Model answer (Band 8)</h2>
                <PremiumGate label="Model answer · Premium">
                  <div className="prose prose-sm max-w-none">
                    <p>The chart compares household income distribution in the UK across four decades. Overall, the proportion of households in the lowest bracket fell considerably while the middle and upper brackets expanded, reflecting steady economic mobility...</p>
                    <p>In 1980, nearly 40% of households fell into the lowest income bracket, compared with only 22% in 2020. Conversely, the proportion in the highest bracket more than doubled, rising from 8% to 19%...</p>
                    <p>Meanwhile, the middle-income bracket remained the largest segment in both years, though its composition shifted noticeably towards upper-middle earners...</p>
                  </div>
                </PremiumGate>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-gold" /> Band Score Progression</h2>
          <p className="text-muted-foreground mb-6 text-sm">Where most learners are — and where we want you to land.</p>
          <div className="grid sm:grid-cols-3 gap-4">
            {BANDS.map((b) => (
              <div key={b.band} className={`rounded-2xl p-6 ${b.color} shadow-soft`}>
                <div className="text-5xl font-bold mb-2">{b.band}</div>
                <p className="text-sm opacity-90">{b.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
