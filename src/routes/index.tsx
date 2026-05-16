import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { BookOpen, Mic, Headphones, PenLine, Youtube, Crown, Star, ArrowRight, GraduationCap } from "lucide-react";

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
  { icon: Crown, title: "Premium Membership", desc: "Unlock model answers, premium PDFs, and exclusive video lessons." },
  { icon: Youtube, title: "YouTube Lessons", desc: "Watch full playlists on Writing, Speaking, Reading, Listening and Grammar." },
];

const TESTIMONIALS = [
  { name: "Dilnoza", score: "Band 7.5", quote: "Erkinjon's Task 2 framework finally made writing feel simple. I jumped from 6.0 to 7.5 in three months." },
  { name: "Akmal", score: "Band 7.0", quote: "The speaking topics and model answers helped me sound natural. Best teacher in Fergana." },
  { name: "Sevinch", score: "Band 8.0", quote: "His YouTube lessons are gold. I watched every Writing Task 1 video before my exam." },
  { name: "Jasur", score: "Band 7.0", quote: "Clear, patient, and so encouraging. The Premium PDFs were worth every cent." },
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

      {/* Teacher intro */}
      <section className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="grid md:grid-cols-[auto,1fr] gap-8 items-center bg-card rounded-3xl p-8 md:p-10 border border-border shadow-soft">
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-gradient-gold flex items-center justify-center mx-auto md:mx-0">
            <GraduationCap className="w-14 h-14 text-primary-foreground" />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Meet Erkinjon</h2>
            <p className="text-muted-foreground leading-relaxed">
              Hi — I'm an English teacher at a private educational center in Fergana, Uzbekistan, with an IELTS 8.0 overall. I've helped hundreds of Uzbek students reach Band 7+ through structured, no-nonsense practice. This site is everything I wish I had when I was preparing.
            </p>
            <Link to="/about"><Button variant="link" className="px-0 mt-2 text-secondary">Read my story →</Button></Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Everything you need to reach Band 7+</h2>
          <p className="text-muted-foreground">From free strategy guides to premium model answers, every resource is built for the real test.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
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

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Students reaching their target</h2>
          <p className="text-muted-foreground">Real scores from real Uzbek learners.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-gradient-warm rounded-2xl p-6 border border-border">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-gold fill-current" />)}
              </div>
              <p className="text-sm leading-relaxed mb-4">"{t.quote}"</p>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold">{t.name}</span>
                <span className="text-secondary font-semibold">{t.score}</span>
              </div>
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
