import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Youtube } from "lucide-react";
import { useEffect, useState } from "react";
import {
  WRITING_TASKS,
  getAllWritingProgress,
  type WritingStatus,
} from "@/lib/writing-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/writing")({
  head: () => ({
    meta: [
      { title: "IELTS Writing — Task 1 & Task 2 | Abduraimov Erkinjon" },
      { name: "description", content: "IELTS Writing Task 1 and Task 2 practice." },
    ],
  }),
  component: Writing,
});

const STATUS_META: Record<WritingStatus, { label: string; className: string }> = {
  not_started: { label: "Not started", className: "bg-muted text-muted-foreground border-border" },
  in_progress: { label: "In Progress", className: "bg-amber-100 text-amber-900 border-amber-300" },
  completed: { label: "Completed", className: "bg-emerald-100 text-emerald-900 border-emerald-300" },
};

function Writing() {
  const [tab, setTab] = useState<1 | 2>(1);
  const [progress, setProgress] = useState<Record<string, { status: WritingStatus }>>({});

  useEffect(() => {
    const refresh = () => setProgress(getAllWritingProgress());
    refresh();
    window.addEventListener("writing-progress-changed", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("writing-progress-changed", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const visible = WRITING_TASKS.filter((t) => t.task === tab);

  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-12 max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">IELTS Writing</h1>

        <div className="flex items-center justify-between bg-accent rounded-2xl px-6 py-4 mb-8 gap-4 flex-wrap">
          <div>
            <p className="font-semibold text-base">Want to watch Writing lessons?</p>
            <p className="text-sm text-muted-foreground">
              I have dedicated Writing playlists on my Video Lessons page.
            </p>
          </div>
          <Link to="/videos">
            <Button className="bg-[#FF0000] hover:bg-[#FF0000]/90 text-white shrink-0">
              <Youtube className="w-4 h-4 mr-2" /> Watch Video Lessons
            </Button>
          </Link>
        </div>

        <div className="inline-flex rounded-xl bg-muted p-1 mb-8">
          {[1, 2].map((n) => (
            <button
              key={n}
              onClick={() => setTab(n as 1 | 2)}
              className={cn(
                "px-6 py-2 rounded-lg text-sm font-semibold transition-colors",
                tab === n
                  ? "bg-background shadow text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Task {n}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((task) => {
            const status = progress[task.id]?.status ?? "not_started";
            const meta = STATUS_META[status];
            return (
              <Link
                key={task.id}
                to="/writing/$taskId"
                params={{ taskId: task.id }}
                className="block"
              >
                <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow">
                  <div className="relative aspect-[16/10] bg-muted">
                    {task.image && (
                      <img
                        src={task.image}
                        alt={task.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    )}
                    <span
                      className={cn(
                        "absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full border",
                        meta.className,
                      )}
                    >
                      {meta.label}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <Badge variant="secondary" className="self-start mb-2 bg-accent text-foreground">
                      {task.type}
                    </Badge>
                    <h3 className="font-serif text-lg font-semibold leading-snug mb-2">
                      {task.title}
                    </h3>
                    <p className="text-sm text-muted-foreground flex-1">{task.description}</p>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </SiteLayout>
  );
}
