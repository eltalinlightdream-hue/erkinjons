export type TaskType =
  | "Bar Chart" | "Pie Chart" | "Table" | "Line Graph"
  | "Map" | "Process Diagram"
  | "Opinion" | "Discussion" | "Problem-Solution"
  | "Agree/Disagree" | "Advantages/Disadvantages"
  | "Cause/Effect/Solution" | "Positive/Negative Development"
  | "Two-Part Question";

export interface WritingTask {
  id: string;
  task: 1 | 2;
  type: TaskType;
  title: string;
  description: string;
  prompt: string;
  image?: string;
  htmlFile?: string;
  minWords: number;
  timeMinutes: number;
}

export const WRITING_TASKS: WritingTask[] = [
];

export function getWritingTask(id: string): WritingTask | undefined {
  return WRITING_TASKS.find((t) => t.id === id);
}

export type WritingStatus = "not_started" | "in_progress" | "completed";

export interface WritingProgress {
  status: WritingStatus;
  text?: string;
  words?: number;
  updatedAt?: number;
}

const STORAGE_KEY = "writing-progress-v1";

function readAll(): Record<string, WritingProgress> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function getWritingProgress(taskId: string): WritingProgress {
  return readAll()[taskId] ?? { status: "not_started" };
}

export function getAllWritingProgress(): Record<string, WritingProgress> {
  return readAll();
}

export function saveWritingProgress(taskId: string, progress: WritingProgress) {
  if (typeof window === "undefined") return;
  const all = readAll();
  all[taskId] = { ...progress, updatedAt: Date.now() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  window.dispatchEvent(new CustomEvent("writing-progress-changed"));
}
