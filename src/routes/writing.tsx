import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Youtube, ExternalLink } from "lucide-react";
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
  in_progress:  { label: "In Progress", className: "bg-amber-100 text-amber-900 border-amber-300" },
  completed:    { label: "Completed",   className: "bg-emerald-100 text-emerald-900 border-emerald-300" },
};

// ── HTML-based practice tasks (open in new tab, no routing needed) ──────────
type HtmlTask = {
  id: string;
  task: 1 | 2;
  type: string;
  title: string;
  description: string;
  image: string;
  htmlFile: string;
};

const HTML_TASKS: HtmlTask[] = [
  {
    id: "html-t1-water-use",
    task: 1,
    type: "Pie Chart",
    title: "Residential Water Use",
    description: "The charts below show information on residential water use in 1988 and 2008.",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80",
    htmlFile: "/passages/task1_1.html",
  },
  {
    id: "html-t1-female-parliament-members",
    task: 1,
    type: "Line Graph",
    title: "Female Members of Parliament",
    description: "The graph shows the percentage of female members of parliament in five European countries from 2000 to 2012.",
    image: "/writing-images/government_funding.png",
    htmlFile: "/passages/task1_2.html",
  },
  {
    id: "html-t1-uk-steel-industry",
    task: 1,
    type: "Line Graphs",
    title: "UK Steel Industry",
    description: "The line graphs show changes in UK steel demand, production, imports and employment from 1970 to 2000.",
    image: "/writing-images/task3.jpg",
    htmlFile: "/passages/task1_3.html",
  },
  {
    id: "html-t1-uk-steel-employment",
    task: 1,
    type: "Mixed Graphs",
    title: "Value Changes and Employment in the UK Steel Industry",
    description: "The charts illustrate value changes and employment status in the UK steel industry between 1970 and 2000.",
    image: "/writing-images/task1_3.jpg",
    htmlFile: "/passages/task1_4.html",
  },
  {
    id: "html-t1-clothing-import-prices",
    task: 1,
    type: "Bar Chart",
    title: "Average Price of Imported Clothing",
    description: "The bar chart compares the average cost of clothing imported into the European Union from six countries in 1997 and 2003.",
    image: "/writing-images/task1_4.jpg",
    htmlFile: "/passages/task1_5.html",
  },
  {
    id: "html-t1-milk-production",
    task: 1,
    type: "Table",
    title: "Milk Production in Four Countries",
    description: "The table shows the production of milk in the Netherlands, Australia, Tanzania and Guatemala in 1990, 2000 and 2010.",
    image: "/writing-images/task1_6.jpg",
    htmlFile: "/passages/task1_6.html",
  },
  {
    id: "html-t1-milk-production-countries",
    task: 1,
    type: "Table",
    title: "Annual Milk Production",
    description: "The table compares annual milk production in four countries across three years: 1990, 2000 and 2010.",
    image: "/writing-images/task1_7.jpg",
    htmlFile: "/passages/task1_7.html",
  },
  {
    id: "html-t1-aluminium-recycling",
    task: 1,
    type: "Process Diagram",
    title: "Recycling Aluminium Drink Cans",
    description: "The diagram shows the stages in the recycling of aluminium drink cans over a six-week process.",
    image: "/writing-images/task1_8.jpg",
    htmlFile: "/passages/task1_8.html",
  },
  {
    id: "html-t1-communication-methods",
    task: 1,
    type: "Line Graph",
    title: "Communication Methods",
    description: "The line graph shows the percentage of people who used five different communication methods between 1998 and 2008.",
    image: "/writing-images/task1_9.jpg",
    htmlFile: "/passages/task1_9.html",
  },
  {
    id: "html-t1-films-and-ticket-sales",
    task: 1,
    type: "Bar Charts",
    title: "Films Released and Cinema Ticket Sales",
    description: "The charts show the percentages of films released and cinema ticket sales by genre in 1996 and 2000.",
    image: "/writing-images/task1_10.jpg",
    htmlFile: "/passages/task1_10.html",
  },
];

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

  const visibleTasks = WRITING_TASKS.filter((t) => t.task === tab);
  const visibleHtml  = HTML_TASKS.filter((t) => t.task === tab);

  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-12 max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">IELTS Writing</h1>

        {/* Video banner */}
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

        {/* Tab switcher */}
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

          {/* ── HTML practice tasks (open in new tab) ── */}
          {visibleHtml.map((task) => (
            <button
              key={task.id}
              onClick={() => window.open(task.htmlFile, "_blank")}
              className="block text-left"
            >
              <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative aspect-[16/10] bg-muted">
                  <img
                    src={task.image}
                    alt={task.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full border bg-muted text-muted-foreground border-border">
                    Not started
                  </span>
                  <span className="absolute top-3 right-3 bg-black/50 text-white rounded-full p-1">
                    <ExternalLink className="w-3 h-3" />
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
                  <p className="text-xs text-muted-foreground mt-3 inline-flex items-center gap-1">
                    <ExternalLink className="w-3 h-3" /> Opens full practice simulator
                  </p>
                </div>
              </Card>
            </button>
          ))}

          {/* ── Lovable route-based tasks ── */}
          {visibleTasks.map((task) => {
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
