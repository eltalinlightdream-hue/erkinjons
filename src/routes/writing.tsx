import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Edit3, RotateCcw, Youtube } from "lucide-react";
import { useState } from "react";
import {
  getTestProgressMeta,
  ProgressStatus,
  TEST_PROGRESS_OPTIONS,
  useTestStatus,
} from "@/hooks/use-test-status";
import { TestProgressBadge, TestProgressSelect } from "@/components/test-progress-controls";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/writing")({
  head: () => ({ meta: [
    { title: "IELTS Writing вЂ” Task 1 & Task 2 | Abduraimov Erkinjon" },
    { name: "description", content: "IELTS Writing Task 1 and Task 2 practice and lessons." },
  ]}),
  component: Writing,
});

type WritingTask = {
  id: string;
  type: "t1" | "t2";
  label: string;
  title: string;
  description: string;
};

const TASKS: WritingTask[] = [
  {
    id: "writing-task-1-academic-report",
    type: "t1",
    label: "Task 1",
    title: "Academic report practice",
    description: "Plan and write a clear overview for a chart, map, table, or process question.",
  },
  {
    id: "writing-task-1-letter",
    type: "t1",
    label: "Task 1",
    title: "Letter practice",
    description: "Practise formal, semi-formal, and informal letters with a direct purpose.",
  },
  {
    id: "writing-task-2-opinion",
    type: "t2",
    label: "Task 2",
    title: "Opinion essay practice",
    description: "Build a position, support it with examples, and finish with a controlled conclusion.",
  },
  {
    id: "writing-task-2-discussion",
    type: "t2",
    label: "Task 2",
    title: "Discussion essay practice",
    description: "Compare two views, organize balanced paragraphs, and state your own opinion.",
  },
];

const TYPE_FILTERS = [
  { value: "all", label: "All tasks" },
  { value: "t1", label: "Task 1" },
  { value: "t2", label: "Task 2" },
] as const;

function Writing() {
  const [typeFilter, setTypeFilter] = useState<(typeof TYPE_FILTERS)[number]["value"]>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | ProgressStatus>("all");
  const { statuses, statusFor, setTestStatus, resetTest } = useTestStatus(TASKS.map((task) => task.id));

  const visible = TASKS.filter((task) => {
    const matchesType = typeFilter === "all" || task.type === typeFilter;
    const matchesStatus = statusFilter === "all" || statusFor(task.id) === statusFilter;
    return matchesType && matchesStatus;
  });

  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-12 max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">IELTS Writing</h1>

        <div className="flex items-center justify-between bg-accent rounded-2xl px-6 py-4 mb-8 gap-4 flex-wrap">
          <div>
            <p className="font-semibold text-base">Want to watch Writing lessons?</p>
            <p className="text-sm text-muted-foreground">I have dedicated Writing playlists on my Video Lessons page.</p>
          </div>
          <Link to="/videos">
            <Button className="bg-[#FF0000] hover:bg-[#FF0000]/90 text-white shrink-0">
              <Youtube className="w-4 h-4 mr-2" /> Watch Video Lessons
            </Button>
          </Link>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {TYPE_FILTERS.map((filter) => (
            <Button
              key={filter.value}
              variant={typeFilter === filter.value ? "default" : "outline"}
              size="sm"
              onClick={() => setTypeFilter(filter.value)}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={statusFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("all")}
          >
            All statuses
          </Button>
          {TEST_PROGRESS_OPTIONS.map((option) => (
            <Button
              key={option.value}
              variant={statusFilter === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="text-muted-foreground py-12 text-center">No writing tasks match this filter.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {visible.map((task) => {
              const status = statuses[task.id];
              const progressStatus = statusFor(task.id);
              const progressMeta = getTestProgressMeta(progressStatus);

              return (
                <Card
                  key={task.id}
                  className={cn("p-6 flex flex-col transition-colors", progressMeta.cardClassName)}
                >
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-accent text-foreground">
                        {task.label}
                      </Badge>
                      <TestProgressBadge status={progressStatus} detail={status} />
                    </div>
                    {progressStatus !== "not_done" && (
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-muted-foreground"
                        onClick={() => resetTest(task.id)}
                        aria-label="Reset status"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <h3 className="font-serif text-xl font-semibold mb-2 leading-snug">{task.title}</h3>
                  <p className="text-sm text-muted-foreground mb-5 flex-1">{task.description}</p>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <TestProgressSelect
                      value={progressStatus}
                      onChange={(next) => setTestStatus(task.id, next)}
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      className="sm:w-40"
                      onClick={() => {
                        if (progressStatus === "not_done") void setTestStatus(task.id, "not_completed");
                      }}
                    >
                      <Edit3 className="w-4 h-4 mr-1" />
                      Practice
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
