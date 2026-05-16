import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Youtube, Play, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getChannelPlaylists } from "@/lib/youtube.functions";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/videos")({
  head: () => ({ meta: [
    { title: "Video Lessons — Abduraimov Erkinjon YouTube Library" },
    { name: "description", content: "All IELTS YouTube lessons grouped into playlists — Writing, Speaking, Reading, Listening and Grammar." },
  ]}),
  component: Videos,
});

const CHANNEL_URL = "http://www.youtube.com/@erkinjon_s";

type ActiveVideo = { id: string; title: string };

function Videos() {
  const [active, setActive] = useState<ActiveVideo | null>(null);
  const fetchPlaylists = useServerFn(getChannelPlaylists);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["youtube-playlists"],
    queryFn: () => fetchPlaylists(),
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });

  const unavailable = isError || (data && !data.ok);

  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Video Lessons</h1>
            <p className="text-muted-foreground text-lg">Pulled live from my YouTube channel — organised into playlists.</p>
          </div>
          <a href={CHANNEL_URL} target="_blank" rel="noreferrer">
            <Button className="bg-[#FF0000] hover:bg-[#FF0000]/90 text-white"><Youtube className="w-4 h-4 mr-2" /> Visit Full Channel</Button>
          </a>
        </div>

        {isLoading && (
          <div className="space-y-12">
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <Skeleton className="h-6 w-64 mb-4" />
                <div className="flex gap-4 overflow-hidden">
                  {[1, 2, 3, 4].map((j) => (
                    <Skeleton key={j} className="w-72 aspect-video shrink-0 rounded-xl" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {unavailable && (
          <div className="rounded-2xl border border-border bg-card p-10 text-center">
            <AlertCircle className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">Videos temporarily unavailable</h2>
            <p className="text-muted-foreground mb-6">Visit the channel directly to watch all lessons.</p>
            <a href={CHANNEL_URL} target="_blank" rel="noreferrer">
              <Button className="bg-[#FF0000] hover:bg-[#FF0000]/90 text-white"><Youtube className="w-4 h-4 mr-2" /> Open YouTube Channel</Button>
            </a>
          </div>
        )}

        {data?.ok && data.playlists.length === 0 && (
          <p className="text-muted-foreground text-center py-12">No playlists found on this channel yet.</p>
        )}

        {data?.ok && data.playlists.length > 0 && (
        <div className="space-y-12">
          {data.playlists.map((pl) => (
            <div key={pl.id}>
              <div className="flex items-baseline justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-2xl font-bold">{pl.title}</h2>
                  {pl.description && <p className="text-sm text-muted-foreground line-clamp-2 max-w-2xl">{pl.description}</p>}
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{pl.videos.length} videos</span>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-3 -mx-4 px-4 snap-x">
                {pl.videos.map((v) => (
                    <button key={v.id} onClick={() => setActive({ id: v.id, title: v.title })} className="snap-start shrink-0 w-72 text-left group">
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-muted border border-border">
                        <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover" loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                          {v.duration && <span className="text-white text-xs bg-black/60 px-2 py-0.5 rounded">{v.duration}</span>}
                        </div>
                        <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                          <span className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                            <Play className="w-6 h-6 text-foreground fill-current ml-1" />
                          </span>
                        </span>
                      </div>
                      <h3 className="font-medium text-sm mt-2 line-clamp-2 group-hover:text-secondary transition-colors">{v.title}</h3>
                    </button>
                ))}
                {pl.videos.length === 0 && <p className="text-sm text-muted-foreground">No videos in this playlist yet.</p>}
              </div>
            </div>
          ))}
        </div>
        )}
      </section>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader><DialogTitle>{active?.title}</DialogTitle></DialogHeader>
          {active && (
            <div className="space-y-5">
              <div className="aspect-video rounded-xl overflow-hidden bg-black">
                <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${active.id}`} title={active.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-sm">Attached files</h4>
                <div className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                  No files attached to this lesson yet.
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </SiteLayout>
  );
}
