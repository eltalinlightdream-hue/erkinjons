import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { BookOpen, PenLine, Youtube, Crown, Star, ArrowRight, Newspaper } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Abduraimov Erkinjon — Master IELTS with Guided Practice" },
      { name: "description", content: "Free IELTS materials, online practice, video lessons and premium guidance from a Band 8.0 teacher in Uzbekistan." },
    ],
  }),
  component: Index,
});

const FEATURES = [
  { icon: BookOpen, title: "Free Materials", desc: "Tips, model answers and downloadable PDFs across all four IELTS skills." },
  { icon: PenLine, title: "Online Practice", desc: "Real IELTS prompts, mini-quizzes, and a Part 2 topic randomizer." },
  { icon: Newspaper, title: "Articles", desc: "Read helpful IELTS articles, study advice, and practical language-learning tips." },
  { icon: Crown, title: "Premium Membership", desc: "Unlock model answers, premium PDFs, and exclusive video lessons." },
  { icon: Youtube, title: "YouTube Lessons", desc: "Watch full playlists on Writing, Speaking, Reading, Listening and Grammar." },
];

function Index() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-warm" />
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-30 blur-3xl" style={{ background: "radial-gradient(circle, #F5D5CB 0%, #EAC4D5 60%, transparent 100%)" }} />
        <div className="absolute -bottom-28 -left-12 w-72 h-72 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #4A9B7A 0%, transparent 70%)" }} />

        <div className="relative container mx-auto px-4 py-24 md:py-36 max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card border border-border text-xs font-medium text-muted-foreground mb-7 shadow-soft">
            <Star className="w-3.5 h-3.5 text-[#C07850] fill-current" />
            Taught by an IELTS Band 8.0 teacher from Uzbekistan
          </span>
          <h1 className="text-4xl md:text-[3.5rem] font-bold tracking-tight mb-5 leading-[1.12]">
            Master IELTS with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-primary">guided practice</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            Friendly lessons, real exam strategies, and structured practice — built for Uzbek learners who want a real score jump.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/reading">
              <Button size="lg" className="bg-gradient-primary text-white shadow-warm hover:opacity-90 h-12 px-8 rounded-xl">
                Start Practicing Free <ArrowRight className="ml-1.5 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/premium">
              <Button size="lg" variant="outline" className="h-12 px-8 rounded-xl border-border hover:bg-muted/60">
                Get Premium Access
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent 0%, #F5D5CB 30%, #4A9B7A 70%, transparent 100%)" }} />

      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-xl mx-auto mb-14">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Everything you need to reach Band 7+</h2>
          <p className="text-muted-foreground text-sm md:text-base">From free strategy guides to premium model answers, every resource is built for the real test.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="bg-card rounded-xl p-5 border border-border shadow-card hover:shadow-warm hover:-translate-y-0.5 transition-all duration-200 group"
            >
              <span className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: "linear-gradient(135deg, #F5D5CB 0%, #EDE9E2 100%)" }}>
                <f.icon className="w-4.5 h-4.5 text-primary" style={{ width: "1.1rem", height: "1.1rem" }} />
              </span>
              <h3 className="font-semibold text-base mb-1.5">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
