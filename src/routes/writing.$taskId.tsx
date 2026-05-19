import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, GraduationCap } from "lucide-react";
import { getWritingTask } from "@/lib/writing-data";

export const Route = createFileRoute("/writing/$taskId")({
  component: WritingTaskMode,
});

function WritingTaskMode() {
  const { taskId } = Route.useParams();
  const navigate = useNavigate();
  const task = getWritingTask(taskId);

  if (!task) {
    return (
      <SiteLayout>
        <section className="container mx-auto px-4 py-16 max-w-3xl text-center">
          <h1 className="text-2xl font-bold mb-4">Task not found</h1>
          <Link to="/writing">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Writing
            </Button>
          </Link>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-12 max-w-3xl">
        <Link to="/writing" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Writing
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold mb-2">{task.title}</h1>
        <p className="text-muted-foreground mb-8">Choose how you want to practice</p>

        <div className="grid sm:grid-cols-2 gap-5">
          <button
            onClick={() =>
              navigate({ to: "/writing/$taskId/practice", params: { taskId: task.id } })
            }
            className="text-left"
          >
            <Card className="p-6 border-2 border-emerald-500/60 hover:border-emerald-500 hover:shadow-lg transition-all h-full">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Self Practice</h3>
                  <p className="text-sm text-emerald-700 font-medium mb-2">Exam Simulation</p>
                  <p className="text-sm text-muted-foreground">Free · Timed · Word count</p>
                </div>
              </div>
            </Card>
          </button>
        </div>
      </section>
    </SiteLayout>
  );
}
