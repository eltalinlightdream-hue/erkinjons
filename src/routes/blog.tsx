import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Abduraimov Erkinjon" },
      { name: "description", content: "IELTS tips, strategy breakdowns, and study guides for Uzbek learners." },
      { property: "og:title", content: "IELTS Blog — Abduraimov Erkinjon" },
      { property: "og:description", content: "Practical IELTS articles and study guides." },
    ],
  }),
  component: Blog,
});

const POSTS = [
  {
    slug: "task-2-framework",
    title: "The 4-Paragraph Framework for IELTS Writing Task 2",
    excerpt: "A repeatable structure for opinion, discussion, and problem-solution essays — with timing tips.",
    tag: "Writing",
    date: "May 10, 2026",
    read: "8 min",
  },
  {
    slug: "speaking-part-2",
    title: "How to Stretch Speaking Part 2 to Two Full Minutes",
    excerpt: "Most students run out of ideas by 45 seconds. Here's the cue-card method I teach in every class.",
    tag: "Speaking",
    date: "May 3, 2026",
    read: "6 min",
  },
  {
    slug: "true-false-not-given",
    title: "True / False / Not Given — Stop Losing Easy Points",
    excerpt: "A clear decision tree for the hardest reading question type, with three worked examples.",
    tag: "Reading",
    date: "Apr 26, 2026",
    read: "7 min",
  },
  {
    slug: "listening-map-labelling",
    title: "Listening Map Labelling: 5 Phrases You Must Know",
    excerpt: "Directional language trips up half of all candidates. Master these five expressions and never miss again.",
    tag: "Listening",
    date: "Apr 18, 2026",
    read: "5 min",
  },
  {
    slug: "common-grammar-mistakes",
    title: "The 7 Grammar Mistakes That Cap Your Score at Band 6",
    excerpt: "Examiners notice these instantly. Fix them and you immediately unlock Band 7+ in writing and speaking.",
    tag: "Grammar",
    date: "Apr 10, 2026",
    read: "9 min",
  },
  {
    slug: "study-plan-30-days",
    title: "A 30-Day IELTS Study Plan for Working Students",
    excerpt: "One hour a day, six days a week — a realistic plan to lift your score by 0.5–1.0 band in a month.",
    tag: "Strategy",
    date: "Apr 1, 2026",
    read: "10 min",
  },
];

function Blog() {
  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">IELTS Blog</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Strategy guides, study plans, and grammar deep-dives — written for Uzbek learners aiming for Band 7+.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {POSTS.map((p) => (
            <Card key={p.slug} className="p-6 flex flex-col hover:shadow-warm hover:-translate-y-1 transition-all">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="secondary" className="bg-accent text-foreground">{p.tag}</Badge>
                <span className="text-xs text-muted-foreground inline-flex items-center gap-1"><Clock className="w-3 h-3" /> {p.read}</span>
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2 leading-snug">{p.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 flex-1">{p.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
                <span className="inline-flex items-center gap-1"><Calendar className="w-3 h-3" /> {p.date}</span>
                <Link to="/blog" className="inline-flex items-center gap-1 text-secondary font-medium">Read <ArrowRight className="w-3 h-3" /></Link>
              </div>
            </Card>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-12">More articles coming soon — subscribe on Telegram to be notified.</p>
      </section>
    </SiteLayout>
  );
}