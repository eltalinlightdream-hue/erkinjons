import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { SiteLayout } from "@/components/site-layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Clock,
  ArrowLeft,
  BookmarkPlus,
  Bookmark,
  BookmarkPlus as BPIcon,
  Highlighter,
  Eraser,
  Volume2,
} from "lucide-react";
import { findArticle, ARTICLES, DIFFICULTY_STYLES } from "@/lib/articles-data";
import { useAuth } from "@/hooks/use-auth";
import { SaveVocabModal } from "@/components/save-vocab-modal";
import { recordArticleRead, toggleBookmark, listBookmarks } from "@/lib/bookmarks.functions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/articles/$slug")({
  head: ({ params }) => {
    const a = findArticle(params.slug);
    return {
      meta: [
        { title: a ? `${a.title} — Abduraimov Erkinjon` : "Article not found" },
        { name: "description", content: a?.description ?? "Article" },
        { property: "og:title", content: a?.title ?? "Article" },
        { property: "og:description", content: a?.description ?? "" },
        ...(a?.coverImage ? [{ property: "og:image", content: a.coverImage }] : []),
      ],
    };
  },
  component: ArticleView,
  notFoundComponent: () => (
    <SiteLayout>
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold mb-2">Article not found</h1>
        <Link to="/articles" className="text-secondary">← Back to articles</Link>
      </div>
    </SiteLayout>
  ),
});

type TabKey = "article" | "vocabulary" | "pronunciation";

function ArticleView() {
  const { slug } = Route.useParams();
  const article = findArticle(slug);
  const { user } = useAuth();
  const recordRead = useServerFn(recordArticleRead);
  const toggle = useServerFn(toggleBookmark);
  const fetchBookmarks = useServerFn(listBookmarks);
  const qc = useQueryClient();
  const [saveOpen, setSaveOpen] = useState<null | { word: string; definition: string; example: string }>(null);
  const [tab, setTab] = useState<TabKey>("article");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user && article) {
      recordRead({ data: { slug: article.slug } }).catch(() => {});
    }
  }, [user, article, recordRead]);

  const { data: bookmarks } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: () => fetchBookmarks(),
    enabled: !!user,
  });
  const isBookmarked = !!bookmarks?.find((b) => b.type === "article" && b.reference_id === slug);

  const onBookmark = async () => {
    if (!user) {
      toast.error("Sign in to bookmark.");
      return;
    }
    await toggle({ data: { type: "article", referenceId: slug } });
    qc.invalidateQueries({ queryKey: ["bookmarks"] });
  };

  // Highlighting
  const applyHighlight = (color: "yellow" | "blue") => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0 || sel.isCollapsed) {
      toast.message("Select some text first.");
      return;
    }
    const range = sel.getRangeAt(0);
    // Ensure selection is within article body
    if (!contentRef.current?.contains(range.commonAncestorContainer)) {
      toast.message("Select text inside the article.");
      return;
    }
    try {
      const span = document.createElement("span");
      span.dataset.highlight = color;
      span.className =
        color === "yellow"
          ? "bg-yellow-200 dark:bg-yellow-500/30 rounded px-0.5"
          : "bg-sky-200 dark:bg-sky-500/30 rounded px-0.5";
      range.surroundContents(span);
      sel.removeAllRanges();
    } catch {
      toast.error("Try selecting a smaller range of text.");
    }
  };

  // Right-click on highlighted text → clear
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("[data-highlight]") as HTMLElement | null;
      if (!target) return;
      e.preventDefault();
      const parent = target.parentNode;
      if (!parent) return;
      while (target.firstChild) parent.insertBefore(target.firstChild, target);
      parent.removeChild(target);
    };
    el.addEventListener("contextmenu", handler);
    return () => el.removeEventListener("contextmenu", handler);
  }, [tab]);

  if (!article) {
    return (
      <SiteLayout>
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-3xl font-bold mb-2">Article not found</h1>
          <Link to="/articles" className="text-secondary">← Back to articles</Link>
        </div>
      </SiteLayout>
    );
  }

  const cover =
    article.coverImage ||
    "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=1600&q=80";

  return (
    <SiteLayout>
      {/* Hero */}
      <div className="relative w-full h-[42vh] min-h-[280px] max-h-[480px] overflow-hidden">
        <img
          src={cover}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "blur(2px)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-8 max-w-4xl">
            <Link
              to="/articles"
              className="text-sm text-white/90 hover:text-white inline-flex items-center gap-1 mb-4 drop-shadow"
            >
              <ArrowLeft className="w-4 h-4" /> All articles
            </Link>
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <Badge variant="secondary" className="bg-accent text-foreground">{article.topic}</Badge>
              <Badge variant="outline" className={DIFFICULTY_STYLES[article.difficulty]}>
                {article.difficulty}
              </Badge>
              <span className="text-xs text-white/90 inline-flex items-center gap-1 drop-shadow">
                <Clock className="w-3 h-3" /> {article.readingTime} min
              </span>
              <span className="text-xs text-white/90 drop-shadow">
                {new Date(article.date).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight text-white drop-shadow-lg max-w-3xl">
              {article.title}
            </h1>
          </div>
        </div>

        {/* Bookmark in top right */}
        <div className="absolute top-4 right-4">
          <Button size="sm" variant="secondary" onClick={onBookmark}>
            {isBookmarked ? (
              <><Bookmark className="w-4 h-4 mr-1 fill-current" /> Saved</>
            ) : (
              <><BookmarkPlus className="w-4 h-4 mr-1" /> Bookmark</>
            )}
          </Button>
        </div>
      </div>

      {/* Sticky tabs */}
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 max-w-4xl flex gap-1 overflow-x-auto">
          {([
            { k: "article", label: "Article" },
            { k: "vocabulary", label: `Vocabulary (${article.vocabulary.length})` },
            { k: "pronunciation", label: "Read Aloud" },
          ] as { k: TabKey; label: string }[]).map(({ k, label }) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={cn(
                "px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                tab === k
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <article className="container mx-auto px-4 py-10 max-w-3xl">
        {tab === "article" && (
          <>
            {/* Highlight toolbar */}
            <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-2 bg-card border rounded-full p-2 shadow-lg">
              <Button
                size="icon"
                variant="ghost"
                title="Yellow highlight"
                onClick={() => applyHighlight("yellow")}
                className="rounded-full"
              >
                <Highlighter className="w-4 h-4 text-yellow-600" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                title="Blue highlight"
                onClick={() => applyHighlight("blue")}
                className="rounded-full"
              >
                <Highlighter className="w-4 h-4 text-sky-600" />
              </Button>
            </div>

            {/* Mobile highlight bar */}
            <div className="md:hidden mb-4 flex items-center gap-2 text-sm text-muted-foreground">
              <span>Highlight:</span>
              <Button size="sm" variant="outline" onClick={() => applyHighlight("yellow")}>
                <Highlighter className="w-4 h-4 mr-1 text-yellow-600" /> Yellow
              </Button>
              <Button size="sm" variant="outline" onClick={() => applyHighlight("blue")}>
                <Highlighter className="w-4 h-4 mr-1 text-sky-600" /> Blue
              </Button>
            </div>

            <div
              ref={contentRef}
              className="prose prose-neutral dark:prose-invert max-w-none text-base leading-relaxed [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:my-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
            <p className="mt-8 text-xs text-muted-foreground inline-flex items-center gap-1">
              <Eraser className="w-3 h-3" /> Tip: right-click a highlight to clear it.
            </p>
          </>
        )}

        {tab === "vocabulary" && (
          <section>
            <p className="text-sm text-muted-foreground mb-5">
              {article.vocabulary.length} words in this article
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {article.vocabulary.map((v) => (
                <Card key={v.word} className="p-5 flex flex-col">
                  <div className="flex items-center justify-between mb-2 gap-2">
                    <h3 className="font-serif text-2xl font-semibold">{v.word}</h3>
                    {v.wordType && (
                      <Badge variant="outline" className="text-[10px] uppercase">
                        {v.wordType}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm mb-2">{v.definition}</p>
                  {v.example && (
                    <p className="text-sm italic text-muted-foreground mb-4">"{v.example}"</p>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-auto self-start"
                    onClick={() => setSaveOpen(v)}
                  >
                    <BPIcon className="w-4 h-4 mr-1" /> Save to Vocabulary
                  </Button>
                </Card>
              ))}
            </div>
          </section>
        )}

        {tab === "pronunciation" && (
          <section>
            <h2 className="font-serif text-2xl font-semibold mb-2">Pronunciation Guide</h2>
            <p className="text-sm text-muted-foreground mb-6">
              {article.pronunciation.length} difficult words from this article.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {article.pronunciation.map((p) => (
                <Card key={p.word} className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-serif text-2xl font-bold">{p.word}</h3>
                    <Button size="sm" variant="ghost" disabled title="Audio coming soon">
                      <Volume2 className="w-4 h-4 mr-1" /> Audio soon
                    </Button>
                  </div>
                  <p className="font-mono text-sm text-secondary mb-1">{p.ipa}</p>
                  <p className="text-sm text-muted-foreground mb-3">
                    Syllables: <span className="font-medium text-foreground">{p.syllables}</span>
                  </p>
                  <p className="text-xs text-muted-foreground bg-muted/50 rounded p-2">
                    💡 {p.tip}
                  </p>
                </Card>
              ))}
            </div>

            <Card className="mt-8 p-6 bg-accent/40">
              <h3 className="font-serif text-lg font-semibold mb-3">Practice tip</h3>
              <ul className="text-sm space-y-2 list-disc pl-5">
                <li>
                  <strong>Stress the content words</strong> (nouns, verbs, adjectives) and reduce function words (the, of, and). Native English has a strong stress-timed rhythm.
                </li>
                <li>
                  <strong>Connected speech:</strong> link final consonants to next vowels, e.g. "an apple" → "a-napple". It sounds natural and improves fluency.
                </li>
                <li>
                  Record yourself reading the article aloud, then compare against the IPA above. Focus on one or two words per session — don't try to fix everything at once.
                </li>
              </ul>
            </Card>
          </section>
        )}
      </article>

      {saveOpen && (
        <SaveVocabModal
          open={!!saveOpen}
          onClose={() => setSaveOpen(null)}
          word={saveOpen.word}
          definition={saveOpen.definition}
          example={saveOpen.example}
        />
      )}
    </SiteLayout>
  );
}

// Used by SSG to know about all article slugs
export const _allSlugs = ARTICLES.map((a) => a.slug);
