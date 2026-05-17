import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Youtube, Send, GraduationCap, MapPin, Award, PenLine, MessageCircle, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/contact-about")({
  head: () => ({ meta: [
    { title: "Contact & About — Abduraimov Erkinjon" },
    { name: "description", content: "Meet Erkinjon and choose the best way to get in touch — YouTube, Telegram channel, or personal Telegram." },
    { property: "og:title", content: "Contact & About — Abduraimov Erkinjon" },
    { property: "og:description", content: "IELTS Band 8.0 teacher from Fergana, Uzbekistan." },
  ]}),
  component: ContactAbout,
});

const CONTACTS = [
  {
    title: "YouTube Channel",
    desc: "Weekly IELTS lessons in Uzbek and English.",
    label: "Visit Channel",
    href: "https://www.youtube.com/@erkinjon_writes",
    icon: Youtube,
    tint: "bg-[#FF0000]/10 text-[#FF0000]",
    btn: "bg-[#FF0000] hover:bg-[#FF0000]/90 text-white",
  },
  {
    title: "Telegram Channel",
    desc: "Daily tips and free materials.",
    label: "Open Channel",
    href: "https://t.me/augustus_flores",
    icon: Send,
    tint: "bg-[#229ED9]/10 text-[#229ED9]",
    btn: "bg-[#229ED9] hover:bg-[#229ED9]/90 text-white",
  },
  {
    title: "Personal Telegram",
    desc: "Premium subscriptions, course questions, personal enquiries.",
    label: "Message Me",
    href: "https://t.me/augustus_at",
    icon: MessageCircle,
    tint: "bg-secondary/15 text-secondary",
    btn: "bg-gradient-gold text-primary-foreground",
  },
];

function ContactAbout() {
  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Contact &amp; About</h1>
          <p className="text-lg text-muted-foreground">A little about me, and the easiest ways to get in touch.</p>
        </div>

        {/* About */}
        <div className="grid md:grid-cols-[280px,1fr] gap-10 items-start mb-20">
          <div className="bg-gradient-warm rounded-3xl aspect-[4/5] flex items-center justify-center shadow-soft border border-border">
            <GraduationCap className="w-24 h-24 text-secondary opacity-60" />
          </div>
          <div className="space-y-5">
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 text-sm bg-accent px-3 py-1.5 rounded-full"><Award className="w-4 h-4 text-gold" /> IELTS 8.0 overall</span>
              <span className="inline-flex items-center gap-1.5 text-sm bg-accent px-3 py-1.5 rounded-full"><PenLine className="w-4 h-4 text-gold" /> Writing 8.0 — all criteria</span>
              <span className="inline-flex items-center gap-1.5 text-sm bg-accent px-3 py-1.5 rounded-full"><MapPin className="w-4 h-4 text-sage" /> Fergana, Uzbekistan</span>
            </div>
            <h2 className="text-2xl font-bold">Hi, I'm Erkinjon 👋</h2>
            <p className="text-muted-foreground leading-relaxed">
              I'm an English teacher at a private educational center in the Fergana region of Uzbekistan. I scored a Band 8.0 overall on IELTS — including a Band 8 in Writing with no criterion below 8 — and I've spent years helping Uzbek students reach their own target scores.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              My teaching philosophy is simple: real practice beats endless theory. Every lesson I make — free or premium — is built around the actual question types and band descriptors used by examiners. No shortcuts, no magic tricks, just structured work that pays off.
            </p>
            <p className="text-muted-foreground leading-relaxed italic">
              "If you can explain it simply, you understand it well enough to teach it."
            </p>
          </div>
        </div>

        {/* Contact */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Get in touch</h2>
          <p className="text-muted-foreground">Pick the channel that fits your question.</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-5">
          {CONTACTS.map((c) => (
            <Card key={c.title} className="p-6 flex flex-col">
              <span className={`w-12 h-12 rounded-xl ${c.tint} flex items-center justify-center mb-4`}>
                <c.icon className="w-5 h-5" />
              </span>
              <h3 className="font-serif text-lg font-semibold mb-1">{c.title}</h3>
              <p className="text-sm text-muted-foreground mb-5 flex-1">{c.desc}</p>
              <a href={c.href} target="_blank" rel="noreferrer">
                <Button className={`w-full ${c.btn}`}>{c.label} <ArrowRight className="w-4 h-4 ml-1" /></Button>
              </a>
            </Card>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}