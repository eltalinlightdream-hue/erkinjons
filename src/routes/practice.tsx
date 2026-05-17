import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { Card } from "@/components/ui/card";
import { Headphones, BookOpen, PenLine, Mic, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/practice")({
  head: () => ({ meta: [
    { title: "Practice — Abduraimov Erkinjon" },
    { name: "description", content: "Four practice areas: Listening, Reading, Writing and Speaking." },
  ]}),
  component: Practice,
});

const SECTIONS = [
  { to: "/listening", title: "Listening", icon: Headphones, desc: "Practice with full IELTS listening tests", tint: "bg-sage/15 text-sage" },
  { to: "/reading",   title: "Reading",   icon: BookOpen,   desc: "Academic reading passages with questions", tint: "bg-gold/15 text-gold" },
  { to: "/writing",   title: "Writing",   icon: PenLine,    desc: "Task 1 and Task 2 guided practice", tint: "bg-secondary/15 text-secondary" },
  { to: "/speaking",  title: "Speaking",  icon: Mic,        desc: "Model answers and topic practice", tint: "bg-accent text-foreground" },
] as const;

function Practice() {
  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Practice</h1>
          <p className="text-lg text-muted-foreground">Pick a skill and start — every section is built around real IELTS question types.</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {SECTIONS.map((s) => (
            <Link key={s.to} to={s.to}>
              <Card className="p-6 h-full hover:shadow-warm hover:-translate-y-1 transition-all flex flex-col">
                <span className={`w-12 h-12 rounded-xl ${s.tint} flex items-center justify-center mb-4`}>
                  <s.icon className="w-5 h-5" />
                </span>
                <h2 className="font-serif text-xl font-semibold mb-1">{s.title}</h2>
                <p className="text-sm text-muted-foreground mb-4 flex-1">{s.desc}</p>
                <span className="text-sm font-medium text-secondary inline-flex items-center gap-1">
                  Start <ArrowRight className="w-4 h-4" />
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}