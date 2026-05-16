import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/site-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shuffle, CheckCircle2, XCircle, Mic, BookOpen, Headphones, RotateCcw, Timer } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/practice")({
  head: () => ({
    meta: [
      { title: "Online IELTS Practice — Abduraimov Erkinjon" },
      { name: "description", content: "Free interactive IELTS practice: Speaking Part 2 cue-card randomizer, reading and listening mini-quizzes, and timed speaking prep." },
      { property: "og:title", content: "IELTS Online Practice" },
      { property: "og:description", content: "Interactive tools to prepare for IELTS Speaking, Reading and Listening." },
    ],
  }),
  component: Practice,
});

const CUE_CARDS = [
  { topic: "Describe a person who taught you something important.", points: ["Who they are", "What they taught you", "How they taught it", "Why it was important"] },
  { topic: "Describe a place you would like to visit in the future.", points: ["Where it is", "How you know about it", "What you would do there", "Why you want to visit"] },
  { topic: "Describe a skill you would like to learn.", points: ["What the skill is", "How you would learn it", "How long it would take", "Why you want to learn it"] },
  { topic: "Describe a book that made a strong impression on you.", points: ["What the book is", "When you read it", "What it is about", "Why it made an impression"] },
  { topic: "Describe a memorable journey you took.", points: ["Where you went", "Who you went with", "What you did", "Why it was memorable"] },
  { topic: "Describe a piece of technology you find useful.", points: ["What it is", "How often you use it", "What you use it for", "Why it is useful"] },
  { topic: "Describe a time you helped someone.", points: ["Who you helped", "What the situation was", "How you helped", "How you felt afterwards"] },
  { topic: "Describe a tradition in your country.", points: ["What the tradition is", "When it takes place", "What people do", "Why it is important"] },
];

const READING_QUIZ = {
  passage:
    "The honeybee is one of the most extensively studied insects on the planet. Beyond producing honey, bees pollinate roughly one-third of the food crops humans consume. In recent decades, however, bee populations in Europe and North America have declined sharply. Researchers attribute the loss to a combination of pesticide use, habitat fragmentation, and a parasitic mite known as Varroa destructor. Some farmers have begun renting bee colonies during pollination seasons, while urban beekeeping projects in cities such as London and New York have grown rapidly since 2010.",
  questions: [
    {
      q: "Bees are responsible for pollinating most of the food eaten worldwide.",
      a: "FALSE",
      explain: "The passage says 'roughly one-third', which is not 'most'.",
    },
    {
      q: "Bee numbers have decreased in both Europe and North America.",
      a: "TRUE",
      explain: "The passage explicitly states populations 'in Europe and North America have declined sharply'.",
    },
    {
      q: "Urban beekeeping is more profitable than rural beekeeping.",
      a: "NOT GIVEN",
      explain: "The passage does not compare profitability of urban vs rural beekeeping.",
    },
  ] as const,
};

const LISTENING_QUIZ = [
  { q: "The meeting will take place on the ____ floor.", a: "third", hint: "An ordinal number." },
  { q: "The registration fee is $____ per person.", a: "45", hint: "A two-digit number." },
  { q: "Participants should bring a ____ and a notebook.", a: "pen", hint: "A common writing tool." },
];

function Practice() {
  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-3 bg-accent">Free • No sign-up required</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Online IELTS Practice</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hands-on tools to rehearse Speaking Part 2, sharpen Reading skills, and train your ear for Listening.
          </p>
        </div>

        <Tabs defaultValue="speaking" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="speaking"><Mic className="w-4 h-4 mr-2" /> Speaking</TabsTrigger>
            <TabsTrigger value="reading"><BookOpen className="w-4 h-4 mr-2" /> Reading</TabsTrigger>
            <TabsTrigger value="listening"><Headphones className="w-4 h-4 mr-2" /> Listening</TabsTrigger>
          </TabsList>

          <TabsContent value="speaking" className="mt-6">
            <SpeakingCueCard />
          </TabsContent>
          <TabsContent value="reading" className="mt-6">
            <ReadingQuiz />
          </TabsContent>
          <TabsContent value="listening" className="mt-6">
            <ListeningQuiz />
          </TabsContent>
        </Tabs>
      </section>
    </SiteLayout>
  );
}

function SpeakingCueCard() {
  const [idx, setIdx] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  const card = CUE_CARDS[idx];

  const shuffle = () => {
    let next = idx;
    while (next === idx) next = Math.floor(Math.random() * CUE_CARDS.length);
    setIdx(next);
    setSeconds(0);
    setRunning(false);
  };

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <Card className="p-6 md:p-8 bg-gradient-warm border-border">
      <div className="flex items-center justify-between mb-5">
        <Badge variant="secondary" className="bg-card">Part 2 cue card</Badge>
        <div className="inline-flex items-center gap-2 text-sm font-mono bg-card px-3 py-1 rounded-md border border-border">
          <Timer className="w-4 h-4 text-secondary" /> {mm}:{ss}
        </div>
      </div>
      <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-5 leading-snug">{card.topic}</h2>
      <p className="text-sm text-muted-foreground mb-2 font-medium">You should say:</p>
      <ul className="space-y-1.5 mb-6">
        {card.points.map((p) => (
          <li key={p} className="flex items-start gap-2 text-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => setRunning((r) => !r)} className="bg-gradient-gold text-primary-foreground">
          {running ? "Pause timer" : "Start 2-min timer"}
        </Button>
        <Button variant="outline" onClick={shuffle}><Shuffle className="w-4 h-4 mr-2" /> New topic</Button>
        <Button variant="ghost" onClick={() => { setSeconds(0); setRunning(false); }}><RotateCcw className="w-4 h-4 mr-2" /> Reset</Button>
      </div>
      <p className="text-xs text-muted-foreground mt-5">Tip: you have 1 minute to prepare and up to 2 minutes to speak. Cover all four bullet points.</p>
    </Card>
  );
}

function ReadingQuiz() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);

  const options = ["TRUE", "FALSE", "NOT GIVEN"] as const;

  const score = READING_QUIZ.questions.reduce(
    (acc, q, i) => acc + (answers[i] === q.a ? 1 : 0),
    0,
  );

  return (
    <div className="grid md:grid-cols-2 gap-5">
      <Card className="p-6">
        <Badge variant="secondary" className="mb-3 bg-accent">Passage</Badge>
        <p className="text-sm leading-relaxed">{READING_QUIZ.passage}</p>
      </Card>
      <Card className="p-6">
        <Badge variant="secondary" className="mb-3 bg-accent">True / False / Not Given</Badge>
        <ol className="space-y-5">
          {READING_QUIZ.questions.map((q, i) => {
            const picked = answers[i];
            const correct = checked && picked === q.a;
            const wrong = checked && picked && picked !== q.a;
            return (
              <li key={i}>
                <p className="text-sm font-medium mb-2">{i + 1}. {q.q}</p>
                <div className="flex flex-wrap gap-2">
                  {options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => !checked && setAnswers((a) => ({ ...a, [i]: opt }))}
                      className={cn(
                        "px-3 py-1.5 rounded-md text-xs font-semibold border transition-colors",
                        picked === opt
                          ? "border-secondary bg-secondary/10 text-secondary"
                          : "border-border bg-card hover:bg-accent",
                        checked && opt === q.a && "border-sage bg-sage/10 text-sage",
                        checked && picked === opt && opt !== q.a && "border-destructive bg-destructive/10 text-destructive",
                      )}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {checked && (
                  <p className={cn("text-xs mt-2 flex items-start gap-1.5", correct ? "text-sage" : wrong ? "text-destructive" : "text-muted-foreground")}>
                    {correct ? <CheckCircle2 className="w-3.5 h-3.5 mt-0.5" /> : wrong ? <XCircle className="w-3.5 h-3.5 mt-0.5" /> : null}
                    <span><strong>{q.a}.</strong> {q.explain}</span>
                  </p>
                )}
              </li>
            );
          })}
        </ol>
        <div className="mt-6 flex gap-2 items-center">
          {!checked ? (
            <Button onClick={() => setChecked(true)} disabled={Object.keys(answers).length < READING_QUIZ.questions.length} className="bg-gradient-gold text-primary-foreground">Check answers</Button>
          ) : (
            <>
              <span className="text-sm font-semibold">Score: {score} / {READING_QUIZ.questions.length}</span>
              <Button variant="outline" size="sm" onClick={() => { setAnswers({}); setChecked(false); }}>Try again</Button>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}

function ListeningQuiz() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const score = LISTENING_QUIZ.reduce((acc, q, i) => acc + (answers[i]?.trim().toLowerCase() === q.a ? 1 : 0), 0);

  return (
    <Card className="p-6">
      <Badge variant="secondary" className="mb-3 bg-accent">Form completion (Section 1 style)</Badge>
      <p className="text-sm text-muted-foreground mb-5">
        Imagine a registration call. Fill the gaps with what you would expect to hear — this drills your <strong>spelling and number listening</strong> skills.
      </p>
      <ol className="space-y-4">
        {LISTENING_QUIZ.map((q, i) => {
          const picked = answers[i] ?? "";
          const correct = checked && picked.trim().toLowerCase() === q.a;
          const wrong = checked && picked && !correct;
          return (
            <li key={i}>
              <label className="text-sm font-medium block mb-1.5">{i + 1}. {q.q}</label>
              <input
                value={picked}
                onChange={(e) => !checked && setAnswers((a) => ({ ...a, [i]: e.target.value }))}
                placeholder={q.hint}
                className={cn(
                  "w-full px-3 py-2 rounded-md border bg-card text-sm",
                  correct && "border-sage",
                  wrong && "border-destructive",
                  !checked && "border-border focus:border-secondary outline-none",
                )}
              />
              {checked && (
                <p className={cn("text-xs mt-1.5 inline-flex items-center gap-1", correct ? "text-sage" : "text-destructive")}>
                  {correct ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />} Answer: <strong className="ml-1">{q.a}</strong>
                </p>
              )}
            </li>
          );
        })}
      </ol>
      <div className="mt-6 flex gap-2 items-center">
        {!checked ? (
          <Button onClick={() => setChecked(true)} className="bg-gradient-gold text-primary-foreground">Check answers</Button>
        ) : (
          <>
            <span className="text-sm font-semibold">Score: {score} / {LISTENING_QUIZ.length}</span>
            <Button variant="outline" size="sm" onClick={() => { setAnswers({}); setChecked(false); }}>Try again</Button>
          </>
        )}
      </div>
    </Card>
  );
}