import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site-layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, ArrowRight, Search } from "lucide-react";
import { ARTICLES, ArticleCategory } from "@/lib/articles-data";

export const Route = createFileRoute("/articles")({
  head: () => ({ meta: [
    { title: "Articles — Abduraimov Erkinjon" },
    { name: "description", content: "IELTS strategy, vocabulary, and grammar articles for Band 7+ candidates." },
    { property: "og:title", content: "IELTS Articles" },
    { property: "og:description", content: "Strategy, vocabulary and grammar guides for Band 7+." },
  ]}),
  component: Articles,
});

const CATEGORIES: ("All" | ArticleCategory)[] = ["All", "Vocabulary", "Grammar", "Reading", "General"];

function Articles() {
  const [activeCategory, setActiveCategory] = useState<"All" | ArticleCategory>("All");
  const [search, setSearch] = useState("");

  const filtered = ARTICLES.filter((a) => {
    const matchesCategory = activeCategory === "All" || a.category === activeCategory;
    const matchesSearch = search.trim() === "" ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Articles</h1>
          <p className="text-lg text-muted-foreground">Short, practical reads on IELTS strategy, vocabulary and grammar — with a vocabulary set at the end of each piece.</p>
        </div>

        {/* Search */}
        <div className="relative mb-5 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <Button
              key={cat}
              size="sm"
              variant={activeCategory === cat ? "default" : "outline"}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-muted-foreground text-center py-16">No articles found. Try a different search or category.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {filtered.map((a) => (
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
        )}
      </section>
    </SiteLayout>
  );
}
