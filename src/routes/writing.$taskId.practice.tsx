import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Eraser, Maximize2, Minimize2, Menu } from "lucide-react";
import { getWritingTask, getWritingProgress, saveWritingProgress } from "@/lib/writing-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/writing/$taskId/practice")({
  component: WritingPractice,
});

function countWords(s: string) {
  const t = s.trim();
  if (!t) return 0;
  return t.split(/\s+/).length;
}

function formatTime(sec: number) {
  const m = Math.floor(sec / 60).toString().padStart(2, "0");
  const s = (sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function WritingPractice() {
  const { taskId } = Route.useParams();
  const navigate = useNavigate();
  const task = getWritingTask(taskId);

  const [text, setText] = useState("");
  const [secondsLeft, setSecondsLeft] = useState((task?.timeMinutes ?? 20) * 60);
  const [leftWidth, setLeftWidth] = useState(50); // percent
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  // Load saved draft
  useEffect(() => {
    if (!task) return;
    const saved = getWritingProgress(task.id);
    if (saved.text) setText(saved.text);
  }, [task]);

  // Countdown
  useEffect(() => {
    if (!task) return;
    const i = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(i);
  }, [task]);

  // Drag-resize
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!draggingRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const pct = ((e.clientX - rect.left) / rect.width) * 100;
      setLeftWidth(Math.min(75, Math.max(25, pct)));
    };
    const onUp = () => {
      draggingRef.current = false;
      document.body.style.userSelect = "";
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch {
      /* ignore */
    }
  }, []);

  if (!task) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <p className="mb-4">Task not found.</p>
          <Button onClick={() => navigate({ to: "/writing" })}>Back to Writing</Button>
        </div>
      </div>
    );
  }

  const words = countWords(text);
  const remaining = Math.max(0, task.minWords - words);
  const wordsReached = words >= task.minWords;
  const partLabel = `Part ${task.task}`;
  const subInstruction =
    task.task === 1
      ? "You should spend about 20 minutes on this task. Write at least 150 words."
      : "You should spend about 40 minutes on this task. Write at least 250 words.";

  const handleSubmit = () => {
    saveWritingProgress(task.id, { status: "completed", text, words });
    navigate({ to: "/writing" });
  };

  const handleExit = () => {
    if (text.trim().length > 0) {
      saveWritingProgress(task.id, { status: "in_progress", text, words });
    }
    navigate({ to: "/writing" });
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-background text-foreground">
      {/* Top header */}
      <header className="flex items-center justify-between border-b bg-card px-4 h-12 shrink-0">
        <div className="font-semibold text-sm">{partLabel}</div>
        <div
          className={cn(
            "font-mono text-lg font-bold tabular-nums",
            secondsLeft <= 60 && "text-red-600",
          )}
        >
          {formatTime(secondsLeft)}
        </div>
        <div className="flex items-center gap-1">
          <Button size="icon" variant="ghost" onClick={toggleFullscreen} aria-label="Fullscreen">
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
          <Button size="icon" variant="ghost" aria-label="Menu">
            <Menu className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Main split */}
      <div
        ref={containerRef}
        className="flex-1 flex flex-col md:flex-row overflow-hidden"
      >
        {/* Left: question */}
        <div
          className="overflow-auto p-6 bg-card md:border-r border-b md:border-b-0"
          style={
            typeof window !== "undefined" && window.innerWidth >= 768
              ? { width: `${leftWidth}%` }
              : undefined
          }
        >
          <h2 className="font-bold text-lg mb-1">{partLabel}</h2>
          <p className="text-sm text-muted-foreground mb-4">{subInstruction}</p>
          <p className="text-[15px] leading-relaxed mb-5 whitespace-pre-wrap">{task.prompt}</p>
          {task.image && (
            <img
              src={task.image}
              alt={task.title}
              className="w-full rounded-lg border"
            />
          )}
        </div>

        {/* Drag handle (desktop only) */}
        <div
          onMouseDown={() => {
            draggingRef.current = true;
            document.body.style.userSelect = "none";
          }}
          className="hidden md:block w-1.5 cursor-col-resize bg-border hover:bg-primary/40 transition-colors shrink-0"
        />

        {/* Right: editor */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start writing your answer here..."
            className="flex-1 w-full resize-none p-6 text-[15px] leading-relaxed bg-background focus:outline-none font-sans"
          />
          <div className="flex items-center justify-between px-4 py-2 border-t bg-card">
            <Button variant="ghost" size="sm" onClick={() => setText("")}>
              <Eraser className="w-4 h-4 mr-1" /> Clear
            </Button>
            <div
              className={cn(
                "text-sm font-medium tabular-nums",
                wordsReached ? "text-emerald-600" : "text-muted-foreground",
              )}
            >
              Words: {words} ({remaining} to go · min {task.minWords})
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <footer className="flex items-center justify-between border-t bg-card px-4 h-12 shrink-0">
        <div className="font-semibold text-sm">{partLabel}</div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExit}>
            Exit & Save
          </Button>
          <Button
            size="sm"
            onClick={handleSubmit}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            Submit
          </Button>
        </div>
      </footer>
    </div>
  );
}
