import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { BookOpen, Mic, Headphones, PenLine, Youtube, Crown, Star, ArrowRight, Newspaper } from "lucide-react";

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
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-warm" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-16 w-80 h-80 rounded-full bg-sage/20 blur-3xl" />
        <div className="relative container mx-auto px-4 py-20 md:py-32 max-w-5xl text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border text-xs font-medium text-muted-foreground mb-6 shadow-soft">
            <Star className="w-3.5 h-3.5 text-gold fill-current" /> Taught by an IELTS Band 8.0 teacher from Uzbekistan
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
            Master IELTS with <span className="text-transparent bg-clip-text bg-gradient-gold">guided practice</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Friendly lessons, real exam strategies, and structured practice — built for Uzbek learners who want a real score jump.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/reading"><Button size="lg" className="bg-gradient-gold text-primary-foreground shadow-warm hover:opacity-90 h-12 px-7">Start Practicing Free <ArrowRight className="ml-1 w-4 h-4" /></Button></Link>
            <Link to="/premium"><Button size="lg" variant="outline" className="h-12 px-7 border-border">Get Premium Access</Button></Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Everything you need to reach Band 7+</h2>
          <p className="text-muted-foreground">From free strategy guides to premium model answers, every resource is built for the real test.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 max-w-6xl mx-auto">
          {FEATURES.map((f) => (
            <div key={f.title} className="bg-card rounded-2xl p-6 border border-border hover:shadow-warm hover:-translate-y-1 transition-all">
              <span className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5 text-secondary" />
              </span>
              <h3 className="font-semibold text-lg mb-1.5">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-gold rounded-3xl p-10 md:p-14 text-center text-primary-foreground shadow-warm">
          <Mic className="w-10 h-10 mx-auto mb-4 opacity-90" />
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Ready to start practicing?</h2>
          <p className="opacity-90 max-w-xl mx-auto mb-6">Join free, try the practice tools, and watch your first lesson — no card required.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/auth"><Button size="lg" variant="secondary" className="bg-background text-foreground h-12 px-7">Create Free Account</Button></Link>
            <Link to="/videos"><Button size="lg" variant="outline" className="h-12 px-7 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"><Headphones className="w-4 h-4 mr-2" />Watch a Lesson</Button></Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
