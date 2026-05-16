import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { Youtube, Send, GraduationCap, MapPin, Award } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About — Abduraimov Erkinjon" },
    { name: "description", content: "Meet Erkinjon — an IELTS Band 8.0 teacher from Fergana, Uzbekistan." },
  ]}),
  component: About,
});

function About() {
  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Me</h1>
          <p className="text-lg text-muted-foreground">Teacher, learner, and lifelong fan of the English language.</p>
        </div>

        <div className="grid md:grid-cols-[280px,1fr] gap-10 items-start">
          <div className="bg-gradient-warm rounded-3xl aspect-[4/5] flex items-center justify-center shadow-soft border border-border">
            <GraduationCap className="w-24 h-24 text-secondary opacity-60" />
          </div>
          <div className="space-y-5">
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 text-sm bg-accent px-3 py-1.5 rounded-full"><Award className="w-4 h-4 text-gold" /> IELTS 8.0 overall</span>
              <span className="inline-flex items-center gap-1.5 text-sm bg-accent px-3 py-1.5 rounded-full"><MapPin className="w-4 h-4 text-sage" /> Fergana, Uzbekistan</span>
            </div>
            <h2 className="text-2xl font-bold">Hi, I'm Erkinjon 👋</h2>
            <p className="text-muted-foreground leading-relaxed">
              I'm an English teacher at a private educational center in the Fergana region of Uzbekistan. I scored a Band 8.0 overall on IELTS, but more importantly, I've spent years helping Uzbek students do the same.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              My teaching philosophy is simple: real practice beats endless theory. Every lesson I make — free or premium — is built around the actual question types and band descriptors used by examiners. No shortcuts, no magic tricks, just structured work that pays off.
            </p>
            <p className="text-muted-foreground leading-relaxed italic">
              "If you can explain it simply, you understand it well enough to teach it."
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a href="http://www.youtube.com/@erkinjon_s" target="_blank" rel="noreferrer" className="flex-1">
                <Button className="w-full bg-[#FF0000] hover:bg-[#FF0000]/90 text-white h-12"><Youtube className="w-5 h-5 mr-2" /> YouTube Channel</Button>
              </a>
              <a href="https://t.me/augustus_flores" target="_blank" rel="noreferrer" className="flex-1">
                <Button className="w-full bg-[#229ED9] hover:bg-[#229ED9]/90 text-white h-12"><Send className="w-5 h-5 mr-2" /> Telegram Channel</Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
