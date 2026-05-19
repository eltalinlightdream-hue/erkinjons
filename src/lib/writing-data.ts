export type TaskType =
  | "Bar Chart" | "Pie Chart" | "Table" | "Line Graph"
  | "Map" | "Process Diagram"
  | "Opinion" | "Discussion" | "Problem-Solution";

export interface WritingTask {
  id: string;
  task: 1 | 2;
  type: TaskType;
  title: string;
  description: string;
  prompt: string;
  image?: string;
  minWords: number;
  timeMinutes: number;
}

export const WRITING_TASKS: WritingTask[] = [
  {
    id: "t1-teacher-salaries",
    task: 1,
    type: "Table",
    title: "Salaries of school teachers",
    description: "The table below shows the salaries of secondary/high school teachers in 2009.",
    prompt: "The table below shows the salaries of secondary/high school teachers in five countries in 2009. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    minWords: 150,
    timeMinutes: 20,
  },
  {
    id: "t1-energy-consumption",
    task: 1,
    type: "Bar Chart",
    title: "Household energy consumption",
    description: "The bar chart shows household energy consumption by fuel type.",
    prompt: "The bar chart below shows household energy consumption by fuel type in four countries between 2000 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    minWords: 150,
    timeMinutes: 20,
  },
  {
    id: "t1-internet-users",
    task: 1,
    type: "Line Graph",
    title: "Internet users by region",
    description: "The line graph shows the percentage of internet users across regions.",
    prompt: "The line graph below shows the percentage of internet users in four different regions of the world from 2000 to 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    minWords: 150,
    timeMinutes: 20,
  },
  {
    id: "t1-transport-share",
    task: 1,
    type: "Pie Chart",
    title: "Transport mode share",
    description: "The pie charts show the proportion of transport modes used in a city.",
    prompt: "The pie charts below show the proportion of different transport modes used by commuters in a European city in 1990 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    image: "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=800&q=80",
    minWords: 150,
    timeMinutes: 20,
  },
  {
    id: "t1-village-map",
    task: 1,
    type: "Map",
    title: "Changes to a village",
    description: "The maps show changes to a village between 1980 and today.",
    prompt: "The two maps below show a small coastal village in 1980 and the same village today. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80",
    minWords: 150,
    timeMinutes: 20,
  },
  {
    id: "t1-chocolate-process",
    task: 1,
    type: "Process Diagram",
    title: "How chocolate is produced",
    description: "The diagram shows the stages in the production of chocolate.",
    prompt: "The diagram below shows the stages and equipment used in the production of chocolate from cocoa beans. Summarise the information by selecting and reporting the main features.",
    image: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=800&q=80",
    minWords: 150,
    timeMinutes: 20,
  },
  {
    id: "t2-technology-education",
    task: 2,
    type: "Opinion",
    title: "Technology in education",
    description: "Some people believe that technology has made education better. Others disagree.",
    prompt: "Some people believe that the use of technology has improved the quality of education. Others argue that technology has had a negative impact on learning. Discuss both views and give your own opinion.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
    minWords: 250,
    timeMinutes: 40,
  },
  {
    id: "t2-remote-work",
    task: 2,
    type: "Discussion",
    title: "Working from home",
    description: "Some say remote work benefits employees; others say it harms collaboration.",
    prompt: "Some people think that working from home benefits employees and employers. Others believe it damages teamwork and productivity. Discuss both views and give your own opinion.",
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80",
    minWords: 250,
    timeMinutes: 40,
  },
  {
    id: "t2-city-traffic",
    task: 2,
    type: "Problem-Solution",
    title: "Traffic congestion in cities",
    description: "Traffic congestion is a major problem in many cities.",
    prompt: "Traffic congestion is becoming a serious problem in many large cities around the world. What are the main causes of this problem and what measures could be taken to solve it?",
    image: "https://images.unsplash.com/photo-1502920514313-52581002a659?w=800&q=80",
    minWords: 250,
    timeMinutes: 40,
  },
  {
    id: "t2-plastic-waste",
    task: 2,
    type: "Problem-Solution",
    title: "Plastic waste",
    description: "Plastic pollution is harming the environment globally.",
    prompt: "Plastic waste is causing serious damage to the environment and to wildlife. What are the causes of this problem and what solutions can governments and individuals take?",
    image: "https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=800&q=80",
    minWords: 250,
    timeMinutes: 40,
  },
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