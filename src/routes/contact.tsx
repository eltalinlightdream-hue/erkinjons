import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { Card } from "@/components/ui/card";
import { Youtube, Send, MapPin, Mail, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Abduraimov Erkinjon" },
      { name: "description", content: "Get in touch with Erkinjon for IELTS coaching, premium access, or general questions." },
      { property: "og:title", content: "Contact — Abduraimov Erkinjon" },
      { property: "og:description", content: "Reach Erkinjon via Telegram or YouTube." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-16 max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Get in touch</h1>
          <p className="text-lg text-muted-foreground">The fastest way to reach me is on Telegram. I usually reply within a day.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <a href="https://t.me/augustus_flores" target="_blank" rel="noreferrer">
            <Card className="p-6 hover:shadow-warm hover:-translate-y-1 transition-all h-full">
              <span className="w-12 h-12 rounded-xl bg-[#229ED9]/10 flex items-center justify-center mb-4">
                <Send className="w-5 h-5 text-[#229ED9]" />
              </span>
              <h3 className="font-semibold text-lg mb-1">Telegram</h3>
              <p className="text-sm text-muted-foreground mb-2">Best for quick questions, lesson scheduling, and premium access.</p>
              <p className="text-sm font-medium text-secondary">@augustus_flores</p>
            </Card>
          </a>
          <a href="http://www.youtube.com/@erkinjon_s" target="_blank" rel="noreferrer">
            <Card className="p-6 hover:shadow-warm hover:-translate-y-1 transition-all h-full">
              <span className="w-12 h-12 rounded-xl bg-[#FF0000]/10 flex items-center justify-center mb-4">
                <Youtube className="w-5 h-5 text-[#FF0000]" />
              </span>
              <h3 className="font-semibold text-lg mb-1">YouTube</h3>
              <p className="text-sm text-muted-foreground mb-2">Subscribe for weekly IELTS strategy lessons in Uzbek and English.</p>
              <p className="text-sm font-medium text-secondary">@erkinjon_s</p>
            </Card>
          </a>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 gap-5">
          <Card className="p-6">
            <span className="w-12 h-12 rounded-xl bg-sage/10 flex items-center justify-center mb-4">
              <MapPin className="w-5 h-5 text-sage" />
            </span>
            <h3 className="font-semibold mb-1">Based in</h3>
            <p className="text-sm text-muted-foreground">Fergana Region, Uzbekistan. Lessons available online and in person.</p>
          </Card>
          <Card className="p-6">
            <span className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
              <MessageCircle className="w-5 h-5 text-gold" />
            </span>
            <h3 className="font-semibold mb-1">Response time</h3>
            <p className="text-sm text-muted-foreground">Within 24 hours on weekdays. Weekend replies may be slower.</p>
          </Card>
        </div>
      </section>
    </SiteLayout>
  );
}