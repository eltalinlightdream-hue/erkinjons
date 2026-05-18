import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { SiteLayout } from "@/components/site-layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, Search, Sparkles } from "lucide-react";
import {
  ARTICLES,
  ArticleTopic,
  ArticleDifficulty,
  TOPICS,
  DIFFICULTIES,
  DIFFICULTY_STYLES,
} from "@/lib/articles-data";

export const Route = createFileRoute("/articles")({
  head: () => ({
    meta: [
      { title: "Articles — Abduraimov Erkinjon" },
      { name: "description", content: "IELTS reading articles by topic and difficulty, with vocabulary and pronunciation practice." },
      { property: "og:title", content: "IELTS Articles" },
      { property: "og:description", content: "Reading practice by topic and difficulty." },
    ],
  }),
  component: Articles,
});

const TOPIC_FILTERS: ("All" | ArticleTopic)[] = ["All", ...TOPICS];
const DIFFICULTY_FILTERS: ("All" | ArticleDifficulty)[] = ["All", ...DIFFICULTIES];

const TOPIC_FALLBACK_IMAGES: Record<ArticleTopic, string> = {
  Environment: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80",
  Education: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80",
  Crime: "https://images.unsplash.com/photo-1453873531674-2151bcd01707?auto=format&fit=crop&w=1600&q=80",
  Technology: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
  Health: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1600&q=80",
  Society: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=80",
  Science: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1600&q=80",
  Business: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
  Culture: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1600&q=80",
};

function Articles() {
  const [topic, setTopic] = useState<"All" | ArticleTopic>("All");
  const [difficulty, setDifficulty] = useState<"All" | ArticleDifficulty>("All");
  const [search, setSearch] = useState("");

  // Sort newest first; mark first 10 as "new"
  const sorted = useMemo(
    () => [...ARTICLES].sort((a, b) => b.date.localeCompare(a.date)),
    [],
  );
  const newIds = new Set(sorted.slice(0, 10).map((a) => a.id));

  const filtered = sorted.filter((a) => {
    const matchesTopic = topic === "All" || a.topic === topic;
    const matchesDifficulty = difficulty === "All" || a.difficulty === difficulty;
    const matchesSearch =
      search.trim() === "" ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.description.toLowerCase().includes(search.toLowerCase());
    return matchesTopic && matchesDifficulty && matchesSearch;
  });

  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Articles</h1>
          <p className="text-lg text-muted-foreground">
            Reading practice by topic and difficulty — each with key vocabulary and pronunciation tips.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Topic filter row */}
        <div className="mb-3">
          <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Topic</p>
          <div className="flex flex-wrap gap-2">
            {TOPIC_FILTERS.map((t) => (
              <Button
                key={t}
                size="sm"
                variant={topic === t ? "default" : "outline"}
                onClick={() => setTopic(t)}
              >
                {t}
              </Button>
            ))}
          </div>
        </div>

        {/* Difficulty filter row */}
        <div className="mb-8">
          <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Difficulty</p>
          <div className="flex flex-wrap gap-2">
            {DIFFICULTY_FILTERS.map((d) => (
              <Button
                key={d}
                size="sm"
                variant={difficulty === d ? "default" : "outline"}
                onClick={() => setDifficulty(d)}
              >
                {d}
              </Button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="text-muted-foreground text-center py-16">
            No articles match those filters.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((a) => {
              const img = a.coverImage || TOPIC_FALLBACK_IMAGES[a.topic];
              const isNew = newIds.has(a.id);
              return (
                <Link key={a.id} to="/articles/$slug" params={{ slug: a.slug }}>
                  <Card className="h-full hover:shadow-warm hover:-translate-y-1 transition-all overflow-hidden flex flex-col">
                    <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                      <img
                        src={img}
                        alt={a.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      {isNew && (
                        <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-amber-400 text-amber-950 text-xs font-semibold px-2.5 py-1 shadow">
                          <Sparkles className="w-3 h-3" /> New
                        </span>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <Badge variant="secondary" className="bg-accent text-foreground">
                          {a.topic}
                        </Badge>
                        <Badge variant="outline" className={DIFFICULTY_STYLES[a.difficulty]}>
                          {a.difficulty}
                        </Badge>
                      </div>
                      <h2 className="font-serif text-lg font-semibold mb-2 leading-snug">
                        {a.title}
                      </h2>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                        {a.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {a.readingTime} min
                        </span>
                        <span>
                          {new Date(a.date).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <Badge variant="outline" className="text-[10px]">
                          {a.category}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
