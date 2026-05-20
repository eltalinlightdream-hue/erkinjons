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
  image?: string;
  htmlFile: string;
  prompt?: string;
  minWords?: number;
  timeMinutes?: number;
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
   {
    id: "task2_1",
    task: 2,
    type: "Advantages/Disadvantages",
    title: "Home Education vs Schooling",
    description: "A Task 2 essay about whether educating children at home has more advantages than disadvantages compared with formal schooling.",
    prompt: "In some countries, many people choose to educate children at home by themselves instead of sending them to school.\nDo you think the advantages outweigh the disadvantages?",
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
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
    image: "",
    htmlFile: "/writing/task2_29.html",
    minWords: 250,
    timeMinutes: 40,
  }
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
                <div className="relative aspect-[16/10] bg-muted flex items-center justify-center">
                  {task.image ? (
                    <img
                      src={task.image}
                      alt={task.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="text-4xl font-bold text-muted-foreground">
                      Task {task.task}
                    </div>
                  )}
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
                  <div className="relative aspect-[16/10] bg-muted flex items-center justify-center">
                    {task.image ? (
                      <img
                        src={task.image}
                        alt={task.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="text-4xl font-bold text-muted-foreground">
                        Task {task.task}
                      </div>
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
