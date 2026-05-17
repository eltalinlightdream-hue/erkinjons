import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { SiteLayout } from "@/components/site-layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ArrowLeft, BookmarkPlus, Bookmark, BookmarkPlus as BPIcon } from "lucide-react";
import { findArticle, ARTICLES } from "@/lib/articles-data";
import { useAuth } from "@/hooks/use-auth";
import { SaveVocabModal } from "@/components/save-vocab-modal";
import { recordArticleRead, toggleBookmark, listBookmarks } from "@/lib/bookmarks.functions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const Route = createFileRoute("/articles/$slug")({
  head: ({ params }) => {
    const a = findArticle(params.slug);
    return { meta: [
      { title: a ? `${a.title} — Abduraimov Erkinjon` : "Article not found" },
      { name: "description", content: a?.description ?? "Article" },
      { property: "og:title", content: a?.title ?? "Article" },
      { property: "og:description", content: a?.description ?? "" },
    ]};
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

function ArticleView() {
  const { slug } = Route.useParams();
  const article = findArticle(slug);
  const { user } = useAuth();
  const recordRead = useServerFn(recordArticleRead);
  const toggle = useServerFn(toggleBookmark);
  const fetchBookmarks = useServerFn(listBookmarks);
  const qc = useQueryClient();
  const [saveOpen, setSaveOpen] = useState<null | { word: string; definition: string; example: string }>(null);

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
    if (!user) { toast.error("Sign in to bookmark."); return; }
    await toggle({ data: { type: "article", referenceId: slug } });
    qc.invalidateQueries({ queryKey: ["bookmarks"] });
  };

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

  return (
    <SiteLayout>
      <article className="container mx-auto px-4 py-12 max-w-3xl">
        <Link to="/articles" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1 mb-6">
          <ArrowLeft className="w-4 h-4" /> All articles
        </Link>
        <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="bg-accent text-foreground">{article.category}</Badge>
            <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
              <Clock className="w-3 h-3" /> {article.readingTime} min read
            </span>
            <span className="text-xs text-muted-foreground">{new Date(article.date).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}</span>
          </div>
          <Button size="sm" variant="outline" onClick={onBookmark}>
            {isBookmarked ? <><Bookmark className="w-4 h-4 mr-1 fill-current" /> Saved</> : <><BookmarkPlus className="w-4 h-4 mr-1" /> Bookmark</>}
          </Button>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">{article.title}</h1>
        <div
          className="prose prose-neutral max-w-none text-base leading-relaxed [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:my-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {article.vocabulary.length > 0 && (
          <section className="mt-12">
            <h2 className="font-serif text-2xl font-semibold mb-4">Key Vocabulary</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {article.vocabulary.map((v) => (
                <Card key={v.word} className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-serif text-lg font-semibold">{v.word}</h3>
                    <Button size="sm" variant="outline" onClick={() => setSaveOpen(v)}>
                      <BPIcon className="w-4 h-4 mr-1" /> Save
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{v.definition}</p>
                  {v.example && <p className="text-sm italic text-muted-foreground">"{v.example}"</p>}
                </Card>
              ))}
            </div>
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