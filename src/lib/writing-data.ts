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
  {
    id: "task2_1",
    task: 2,
    type: "Advantages/Disadvantages",
    title: "Home Education vs Schooling",
    description: "A Task 2 essay about whether educating children at home has more advantages than disadvantages compared with formal schooling.",
    prompt: "In some countries, many people choose to educate children at home by themselves instead of sending them to school.\nDo you think the advantages outweigh the disadvantages?",
    image: "https://source.unsplash.com/1200x800/?homeschooling%2Ceducation%2Cchildren",
    htmlFile: "/writing/task2_1.html",
    minWords: 250,
    timeMinutes: 40,
  },
  {
    id: "task2_2",
    task: 2,
    type: "Agree/Disagree",
    title: "Younger Leaders in Organizations",
    description: "A Task 2 essay about whether younger people would make better leaders and directors in organizations.",
    prompt: "Leaders and directors in an organization are normally older people. Some people think younger leaders would be better.\nDo you agree or disagree?",
    image: "https://source.unsplash.com/1200x800/?young%2Cleader%2Cbusiness",
    htmlFile: "/writing/task2_2.html",
    minWords: 250,
    timeMinutes: 40,
  },
  {
    id: "task2_3",
    task: 2,
    type: "Agree/Disagree",
    title: "Watching Live Performances Online",
    description: "A Task 2 essay about whether watching live performances online is preferable to attending events in person.",
    prompt: "These days people prefer to watch live performances, such as shows and concerts, on TV or computer online rather than go to the place of that event.\nTo what extent do you agree or disagree?",
    image: "https://source.unsplash.com/1200x800/?online%2Cconcert%2Cperformance",
    htmlFile: "/writing/task2_3.html",
    minWords: 250,
    timeMinutes: 40,
  },
  {
    id: "task2_4",
    task: 2,
    type: "Agree/Disagree",
    title: "Group Activities and Life Skills",
    description: "A Task 2 essay about whether team activities teach more important life skills than individual activities.",
    prompt: "Group or team activities can teach more important skills for life than activities which are done alone.\nDo you agree or disagree?",
    image: "https://source.unsplash.com/1200x800/?teamwork%2Cgroup%2Cactivity",
    htmlFile: "/writing/task2_4.html",
    minWords: 250,
    timeMinutes: 40,
  },
  {
    id: "task2_5",
    task: 2,
    type: "Discussion",
    title: "Women in Police and Military Forces",
    description: "A Task 2 discussion essay about whether women should have equal roles in the police and military.",
    prompt: "Some people believe that women should play an equal role to men in a country's police force or military force such as the army, while others think women are not suitable for this kind of job.\nDiscuss both views and give your opinion.",
    image: "https://source.unsplash.com/1200x800/?women%2Cmilitary%2Cpolice",
    htmlFile: "/writing/task2_5.html",
    minWords: 250,
    timeMinutes: 40,
  },
  {
    id: "task2_6",
    task: 2,
    type: "Agree/Disagree",
    title: "Public Spaces in Towns and Cities",
    description: "A Task 2 essay about the importance of large public spaces such as squares and parks in urban areas.",
    prompt: "It is important for all towns and cities to have large public spaces such as squares and parks.\nTo what extent do you agree or disagree with this statement?",
    image: "https://source.unsplash.com/1200x800/?city%2Cpark%2Cpublic-space",
    htmlFile: "/writing/task2_6.html",
    minWords: 250,
    timeMinutes: 40,
  },
  {
    id: "task2_7",
    task: 2,
    type: "Agree/Disagree",
    title: "Copying Others in Fashion and Consumer Goods",
    description: "A Task 2 essay about whether fashion and consumer goods show that people naturally copy one another.",
    prompt: "The tendency of human beings to copy one another is shown in the popularity of areas such as fashion and consumer goods.\nTo what extent do you agree or disagree?",
    image: "https://source.unsplash.com/1200x800/?fashion%2Cshopping%2Cconsumer",
    htmlFile: "/writing/task2_7.html",
    minWords: 250,
    timeMinutes: 40,
  },
  {
    id: "task2_8",
    task: 2,
    type: "Positive/Negative Development",
    title: "Internet as a Source of World News",
    description: "A Task 2 essay about whether using the internet instead of newspapers and TV for world news is a positive or negative change.",
    prompt: "Nowadays, people use the internet instead of newspapers and TV programs to learn about world news.\nIs this a positive or negative development?",
    image: "https://source.unsplash.com/1200x800/?internet%2Cnews%2Cmedia",
    htmlFile: "/writing/task2_8.html",
    minWords: 250,
    timeMinutes: 40,
  },
  {
    id: "task2_9",
    task: 2,
    type: "Agree/Disagree",
    title: "Traditional Ideas and Modern Life",
    description: "A Task 2 essay about whether traditional ideas from older generations are useful for preparing young people for modern life.",
    prompt: "The older generations tend to have very traditional ideas about how people should live, think and behave. However, some people believe that these ideas are not helpful in preparing younger generations for modern life.\nTo what extent do you agree or disagree with this view?",
    image: "https://source.unsplash.com/1200x800/?generation%2Ctradition%2Cfamily",
    htmlFile: "/writing/task2_9.html",
    minWords: 250,
    timeMinutes: 40,
  },
  {
    id: "task2_10",
    task: 2,
    type: "Agree/Disagree",
    title: "Family Values and School Knowledge",
    description: "A Task 2 essay about whether school knowledge is more important than family values for children’s success.",
    prompt: "Learning values from parents and family is important in children’s success, but knowledge gained at school is more important.\nDo you agree or disagree?",
    image: "https://source.unsplash.com/1200x800/?family%2Cschool%2Cchildren",
    htmlFile: "/writing/task2_10.html",
    minWords: 250,
    timeMinutes: 40,
  },
  {
    id: "task2_11",
    task: 2,
    type: "Discussion",
    title: "International Business and National Identity",
    description: "A Task 2 discussion essay about whether international business contact benefits people or harms national identity.",
    prompt: "Many people go to other countries to do business and contact with people. While some think that this contact is positive, others believe that it has a negative impact on the identities of citizens.\nDiscuss both views and give your own opinion.",
    image: "https://source.unsplash.com/1200x800/?international%2Cbusiness%2Cculture",
    htmlFile: "/writing/task2_11.html",
    minWords: 250,
    timeMinutes: 40,
  },
  {
    id: "task2_12",
    task: 2,
    type: "Agree/Disagree",
    title: "Longer Holidays for Employees",
    description: "A Task 2 essay about whether longer annual holidays improve employees’ performance at work.",
    prompt: "Employers should give their staff at least four weeks of holiday in a year, as longer holidays make employees better at their job.\nTo what extent do you agree or disagree? Give any relevant examples or experience.",
    image: "https://source.unsplash.com/1200x800/?holiday%2Cwork%2Cemployee",
    htmlFile: "/writing/task2_12.html",
    minWords: 250,
    timeMinutes: 40,
  },
  {
    id: "task2_13",
    task: 2,
    type: "Cause/Effect/Solution",
    title: "Unhealthy Eating Habits and Obesity",
    description: "A Task 2 cause-and-solution essay about unhealthy eating habits, obesity, and ways to improve diets.",
    prompt: "In many countries, people's eating habits are leading to obesity and other health problems.\nWhy do so many people have unhealthy eating habits? What is the most effective way to help people improve their eating habits?",
    image: "https://source.unsplash.com/1200x800/?healthy%2Ceating%2Cobesity",
    htmlFile: "/writing/task2_13.html",
    minWords: 250,
    timeMinutes: 40,
  },
  {
    id: "task2_14",
    task: 2,
    type: "Positive/Negative Development",
    title: "Affordable International Travel",
    description: "A Task 2 essay about whether easier and more affordable international travel is a positive or negative development.",
    prompt: "It has become easier and more affordable for people to visit other countries.\nIs it a positive or negative development?",
    image: "https://source.unsplash.com/1200x800/?travel%2Cairport%2Ctourism",
    htmlFile: "/writing/task2_14.html",
    minWords: 250,
    timeMinutes: 40,
  },
  {
    id: "task2_15",
    task: 2,
    type: "Agree/Disagree",
    title: "More Good News in the Media",
    description: "A Task 2 essay about whether news media should report more positive stories.",
    prompt: "The media should include more stories which report good news.\nTo what extent do you agree or disagree?",
    image: "https://source.unsplash.com/1200x800/?good%2Cnews%2Cmedia",
    htmlFile: "/writing/task2_15.html",
    minWords: 250,
    timeMinutes: 40,
  },
  {
    id: "task2_16",
    task: 2,
    type: "Agree/Disagree",
    title: "Fashion and Consumer Goods",
    description: "A Task 2 essay about whether the popularity of fashion and consumer goods proves that people copy each other.",
    prompt: "The tendency for human beings to copy one another is shown in the popularity of fashion in clothes and other consumer goods.\nDo you agree or disagree?",
    image: "https://source.unsplash.com/1200x800/?fashion%2Cclothes%2Cconsumer",
    htmlFile: "/writing/task2_16.html",
    minWords: 250,
    timeMinutes: 40,
  },
  {
    id: "task2_17",
    task: 2,
    type: "Agree/Disagree",
    title: "Understanding Cultures Through Multinational Work",
    description: "A Task 2 essay about whether working for a multinational organisation is the best way to understand other cultures.",
    prompt: "The best way to understand other cultures is working for a multinational organisation.\nDo you agree or disagree?",
    image: "https://source.unsplash.com/1200x800/?multinational%2Coffice%2Cculture",
    htmlFile: "/writing/task2_17.html",
    minWords: 250,
    timeMinutes: 40,
  },
  {
    id: "task2_18",
    task: 2,
    type: "Cause/Effect/Solution",
    title: "Fewer Students Choosing Science",
    description: "A Task 2 cause-and-effect essay about why fewer students choose science subjects and how this affects society.",
    prompt: "It is observed that in many countries not enough students are choosing to study science subjects.\nWhat are the causes of this trend, and what are the effects on society?",
    image: "https://source.unsplash.com/1200x800/?science%2Cstudents%2Claboratory",
    htmlFile: "/writing/task2_18.html",
    minWords: 250,
    timeMinutes: 40,
  },
  {
    id: "task2_19",
    task: 2,
    type: "Agree/Disagree",
    title: "Technology and Free Time",
    description: "A Task 2 essay about whether modern technology has really given people more free time.",
    prompt: "It was predicted that with the development of technology, people in the 21st century would have much more free time than in the past.\nTo what extent has this prediction come true?",
    image: "https://source.unsplash.com/1200x800/?technology%2Cfree-time%2Crelax",
    htmlFile: "/writing/task2_19.html",
    minWords: 250,
    timeMinutes: 40,
  },
  {
    id: "task2_20",
    task: 2,
    type: "Agree/Disagree",
    title: "Good News Stories in the Media",
    description: "A Task 2 essay about whether media organisations should include more good news stories.",
    prompt: "The media should include more stories which report good news.\nTo what extent do you agree or disagree?",
    image: "https://source.unsplash.com/1200x800/?positive%2Cnews%2Cnewspaper",
    htmlFile: "/writing/task2_20.html",
    minWords: 250,
    timeMinutes: 40,
  },
  {
    id: "task2_21",
    task: 2,
    type: "Two-Part Question",
    title: "Travelling to Other Countries",
    description: "A Task 2 two-part essay about why people travel abroad and whether this trend is positive or negative.",
    prompt: "Many people are travelling to other countries.\nWhy? Is it a positive or negative development?",
    image: "https://source.unsplash.com/1200x800/?travel%2Ccountries%2Ctourists",
    htmlFile: "/writing/task2_21.html",
    minWords: 250,
    timeMinutes: 40,
  },
  {
    id: "task2_22",
    task: 2,
    type: "Cause/Effect/Solution",
    title: "Problems of Growing Major Cities",
    description: "A Task 2 problem-and-solution essay about the challenges caused by the growth of major cities.",
    prompt: "As major cities continue to grow, so do their problems.\nWhat problems may this cause? What are the solutions for these problems?",
    image: "https://source.unsplash.com/1200x800/?megacity%2Curban%2Ctraffic",
    htmlFile: "/writing/task2_22.html",
    minWords: 250,
    timeMinutes: 40,
  },
  {
    id: "task2_23",
    task: 2,
    type: "Two-Part Question",
    title: "The Growing Influence of News",
    description: "A Task 2 two-part essay about why the news has become more influential and whether this is positive or negative.",
    prompt: "The news has an increasing impact on people's lives and has never been this influential before.\nWhy is this the case? Is this a positive or negative development?",
    image: "https://source.unsplash.com/1200x800/?news%2Ctelevision%2Cpeople",
    htmlFile: "/writing/task2_23.html",
    minWords: 250,
    timeMinutes: 40,
  },
  {
    id: "task2_24",
    task: 2,
    type: "Agree/Disagree",
    title: "Museums and National Culture",
    description: "A Task 2 essay about whether museums and galleries should focus mainly on national history and culture.",
    prompt: "Museums and art galleries should concentrate on works that show the history and culture of their own country rather than works from other parts of the world.\nTo what extent do you agree or disagree?",
    image: "https://source.unsplash.com/1200x800/?museum%2Cart%2Cculture",
    htmlFile: "/writing/task2_24.html",
    minWords: 250,
    timeMinutes: 40,
  },
  {
    id: "task2_25",
    task: 2,
    type: "Cause/Effect/Solution",
    title: "Exercise and Older People",
    description: "A Task 2 cause-and-solution essay about why elderly people may not exercise enough and how to encourage them.",
    prompt: "Many old people do not get enough exercise.\nWhy? What can be done?",
    image: "https://source.unsplash.com/1200x800/?elderly%2Cexercise%2Chealth",
    htmlFile: "/writing/task2_25.html",
    minWords: 250,
    timeMinutes: 40,
  },
  {
    id: "task2_26",
    task: 2,
    type: "Discussion",
    title: "Technology and Crime",
    description: "A Task 2 discussion essay about whether technology reduces crime or creates new opportunities for crime.",
    prompt: "Some people think technology development decreases crimes, while others believe it actually encourages crimes.\nDiscuss both views and give your own opinion.",
    image: "https://source.unsplash.com/1200x800/?technology%2Csecurity%2Ccrime",
    htmlFile: "/writing/task2_26.html",
    minWords: 250,
    timeMinutes: 40,
  },
  {
    id: "task2_27",
    task: 2,
    type: "Agree/Disagree",
    title: "Producing Food Locally",
    description: "A Task 2 essay about whether countries should produce most of their own food and reduce food imports.",
    prompt: "Some people suggest that a country should try to produce all the food for its population and import as little food as possible.\nTo what extent do you agree or disagree?",
    image: "https://source.unsplash.com/1200x800/?farming%2Cfood%2Cagriculture",
    htmlFile: "/writing/task2_27.html",
    minWords: 250,
    timeMinutes: 40,
  },
  {
    id: "task2_28",
    task: 2,
    type: "Agree/Disagree",
    title: "Social Skills and Qualifications",
    description: "A Task 2 essay about whether social skills are as important as qualifications for success at work.",
    prompt: "Many employers are employing people with good social skills as well as good qualifications.\nDo you agree or disagree that good social skills are as important as good qualifications to succeed in a job?",
    image: "https://source.unsplash.com/1200x800/?social%2Cskills%2Cjob",
    htmlFile: "/writing/task2_28.html",
    minWords: 250,
    timeMinutes: 40,
  },
  {
    id: "task2_29",
    task: 2,
    type: "Agree/Disagree",
    title: "Free University Education",
    description: "A Task 2 essay about whether university education should be free for everyone regardless of financial background.",
    prompt: "Some people believe that university education should be free, as everyone has a right to study regardless of financial background.\nTo what extent do you agree or disagree?",
    image: "https://source.unsplash.com/1200x800/?university%2Cstudents%2Ceducation",
    htmlFile: "/writing/task2_29.html",
    minWords: 250,
    timeMinutes: 40,
  }
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
