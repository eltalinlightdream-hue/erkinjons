import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, RotateCcw } from "lucide-react";
import { useState } from "react";
import {
  getTestProgressMeta,
  ProgressStatus,
  TEST_PROGRESS_OPTIONS,
  useTestStatus,
} from "@/hooks/use-test-status";
import { TestProgressBadge, TestProgressSelect } from "@/components/test-progress-controls";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/speaking")({
  head: () => ({ meta: [
    { title: "IELTS Speaking вЂ” Part 1, 2 & 3 | Abduraimov Erkinjon" },
    { name: "description", content: "IELTS Speaking practice for all three parts." },
  ]}),
  component: Speaking,
});

type SpeakingTask = {
  id: string;
  part: "p1" | "p2" | "p3";
  label: string;
  title: string;
  description: string;
};

const TASKS: SpeakingTask[] = [
  {
    id: "speaking-part-1-familiar-topics",
    part: "p1",
    label: "Part 1",
    title: "Familiar topics",
    description: "Answer short questions about work, study, home, hobbies, and daily routines.",
  },
  {
    id: "speaking-part-2-cue-card",
    part: "p2",
    label: "Part 2",
    title: "Cue card response",
    description: "Prepare for one minute, then speak for up to two minutes with clear structure.",
  },
  {
    id: "speaking-part-3-discussion",
    part: "p3",
    label: "Part 3",
    title: "Extended discussion",
    description: "Develop opinions, compare ideas, and explain reasons with natural follow-up answers.",
  },
];

const PART_FILTERS = [
  { value: "all", label: "All parts" },
  { value: "p1", label: "Part 1" },
  { value: "p2", label: "Part 2" },
  { value: "p3", label: "Part 3" },
] as const;

function Speaking() {
  const [partFilter, setPartFilter] = useState<(typeof PART_FILTERS)[number]["value"]>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | ProgressStatus>("all");
  const { statuses, statusFor, setTestStatus, resetTest } = useTestStatus(TASKS.map((task) => task.id));

  const visible = TASKS.filter((task) => {
    const matchesPart = partFilter === "all" || task.part === partFilter;
    const matchesStatus = statusFilter === "all" || statusFor(task.id) === statusFilter;
    return matchesPart && matchesStatus;
  });

  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-12 max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">IELTS Speaking</h1>

        <div className="flex flex-wrap gap-2 mb-4">
          {PART_FILTERS.map((filter) => (
            <Button
              key={filter.value}
              variant={partFilter === filter.value ? "default" : "outline"}
              size="sm"
              onClick={() => setPartFilter(filter.value)}
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
          <p className="text-muted-foreground py-12 text-center">No speaking tasks match this filter.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
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

                  <div className="flex flex-col gap-2">
                    <TestProgressSelect
                      value={progressStatus}
                      onChange={(next) => setTestStatus(task.id, next)}
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        if (progressStatus === "not_done") void setTestStatus(task.id, "not_completed");
                      }}
                    >
                      <Mic className="w-4 h-4 mr-1" />
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
