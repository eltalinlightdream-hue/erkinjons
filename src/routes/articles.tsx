import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight } from "lucide-react";
import { ARTICLES } from "@/lib/articles-data";

export const Route = createFileRoute("/articles")({
  head: () => ({ meta: [
    { title: "Articles — Abduraimov Erkinjon" },
    { name: "description", content: "IELTS strategy, vocabulary, and grammar articles for Band 7+ candidates." },
    { property: "og:title", content: "IELTS Articles" },
    { property: "og:description", content: "Strategy, vocabulary and grammar guides for Band 7+." },
  ]}),
  component: Articles,
});

function Articles() {
  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Articles</h1>
          <p className="text-lg text-muted-foreground">Short, practical reads on IELTS strategy, vocabulary and grammar — with a vocabulary set at the end of each piece.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {ARTICLES.map((a) => (
            <Link key={a.id} to="/articles/$slug" params={{ slug: a.slug }}>
              <Card className="p-6 h-full hover:shadow-warm hover:-translate-y-1 transition-all flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary" className="bg-accent text-foreground">{a.category}</Badge>
                  <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {a.readingTime} min read
                  </span>
                </div>
                <h2 className="font-serif text-xl font-semibold mb-2 leading-snug">{a.title}</h2>
                <p className="text-sm text-muted-foreground mb-4 flex-1">{a.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{new Date(a.date).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}</span>
                  <span className="text-secondary font-medium inline-flex items-center gap-1">Read <ArrowRight className="w-3 h-3" /></span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}