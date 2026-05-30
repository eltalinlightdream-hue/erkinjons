import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Headphones, Lock, Crown, RotateCcw } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import {
  getTestProgressMeta,
  ProgressStatus,
  TEST_PROGRESS_OPTIONS,
  useTestStatus,
} from "@/hooks/use-test-status";
import { TestProgressBadge, TestProgressSelect } from "@/components/test-progress-controls";

export const Route = createFileRoute("/listening")({
  head: () => ({
    meta: [
      { title: "IELTS Listening | Abduraimov Erkinjon" },
      { name: "description", content: "IELTS Listening practice tests — Section 1 to Section 4." },
    ],
  }),
  component: Listening,
});

type ListeningTest = {
  id: string;
  title: string;
  section: 0 | 1 | 2 | 3 | 4;
  description: string;
  questions: number;
  htmlFile: string;
  audioFile?: string;
  isPremium: boolean;
};

const TESTS: ListeningTest[] = [
  {
    id: "v9-test-1",
    title: "Vol 9 Test 1 — Accommodation & Dormancy",
    section: 0,
    description: "Full 40-question test: accommodation details, Spring Down School, forensic linguistics, and dormancy.",
    questions: 40,
    htmlFile: "/passages/VOL9_TEST_1_Full.html",
    audioFile: "/passages/audio/fulltest1.mp3",
    isPremium: false,
  },
  {
    id: "v9-test-2",
    title: "Vol 9 Test 2 — Poppy Reserve & Office Design",
    section: 0,
    description: "Full 40-question test: Sandcastle poppy reserve, Iron Age village, debate organisation, and office design.",
    questions: 40,
    htmlFile: "/passages/VOL9_TEST_2_Full.html",
    audioFile: "/passages/audio/fulltest2.mp3",
    isPremium: false,
  },
  {
    id: "v9-test-3",
    title: "Vol 9 Test 3 — Great Sandcastle Center & Food Safety",
    section: 0,
    description: "Full 40-question test: Sandcastle outdoor centre, vacation jobs, voice training for drama, and food safety standards.",
    questions: 40,
    htmlFile: "/passages/VOL9_TEST_3_Full.html",
    audioFile: "/passages/audio/fulltest3.mp3",
    isPremium: false,
  },
  {
    id: "v9-test-4",
    title: "Vol 9 Test 4 — Guitar Workshop & Digital Technology",
    section: 0,
    description: "Full 40-question test: guitar course booking, Denford Festival, action research, and digital technology in education.",
    questions: 40,
    htmlFile: "/passages/VOL9_TEST_4_Full.html",
    audioFile: "/passages/audio/fulltest4.mp3",
    isPremium: false,
  },
  {
    id: "v9-test-5",
    title: "Vol 9 Test 5 — Tea Tasting & Whale Sharks",
    section: 0,
    description: "Full 40-question test: tea taster career, Pioneer Historical Village, waste disposal, and whale shark conservation.",
    questions: 40,
    htmlFile: "/passages/VOL9_TEST_5_Full.html",
    audioFile: "/passages/audio/fulltest5.mp3",
    isPremium: false,
  },
  {
    id: "v9-test-6",
    title: "Vol 9 Test 6 — Kiwi Air Complaint & Patagon People",
    section: 0,
    description: "Full 40-question test: Kiwi Air complaint form, Linwood apartments, bicycle history, and the Patagon people.",
    questions: 40,
    htmlFile: "/passages/VOL9_TEST_6_Full.html",
    audioFile: "/passages/audio/fulltest6.mp3",
    isPremium: false,
  },
  {
    id: "v9-test-7",
    title: "Vol 9 Test 7 — Car Servicing & Chocozine",
    section: 0,
    description: "Full 40-question test: car service form, Rosedale Library, Samuel Prout artist, and Chocozine case study.",
    questions: 40,
    htmlFile: "/passages/VOL9_TEST_7_Full.html",
    audioFile: "/passages/audio/fulltest7.mp3",
    isPremium: false,
  },
  {
    id: "v9-test-8",
    title: "Vol 9 Test 8 — Medical Call & Berber Nomads",
    section: 0,
    description: "Full 40-question test: medical call record, outdoor education trip, Stone Point NZ, and Berber rural development.",
    questions: 40,
    htmlFile: "/passages/VOL9_TEST_8_Full.html",
    audioFile: "/passages/audio/fulltest8.mp3",
    isPremium: false,
  },
  {
    id: "s4-dormancy",
    title: "Dormancy",
    section: 4,
    description:
      "A lecture on animal dormancy — insects, the African lungfish, snails, and the Arctic ground squirrel.",
    questions: 10,
    htmlFile: "/passages/Dormancy_Section_4.html",
    audioFile: "/passages/audio/part-4-dormancy.mp3",
    isPremium: false,
  },
  {
  id: "t24-part1",
  title: "Greek Island Holidays",
  section: 1,
  description: "A conversation about Greek island holidays and apartments in Arillas.",
  questions: 10,
  htmlFile: "/passages/TEST_24_Part1.html",
  audioFile: "/passages/audio/test24section1.mp4",
  isPremium: false,
},
{
  id: "t24-part2",
  title: "Aspen Ski Resort",
  section: 2,
  description: "A talk about Aspen Ski Resort near Cumbia.",
  questions: 10,
  htmlFile: "/passages/TEST_24_Part2.html",
  audioFile: "/passages/audio/test24section2.mp4",
  isPremium: false,
},
  {
  id: "t1-part1",
  title: "London Relocation Services",
  section: 1,
  description: "A conversation about moving to London and finding a suitable property.",
  questions: 10,
  htmlFile: "/passages/TEST_1_Part1.html",
  audioFile: "/passages/audio/test1section1.mp4",
  isPremium: false,
},
{
  id: "t1-part2",
  title: "Canadian Festival Theatre",
  section: 2,
  description: "A talk about a Canadian theatre festival and its arrangements.",
  questions: 10,
  htmlFile: "/passages/TEST_1_Part2.html",
  audioFile: "/passages/audio/test1section2.mp4",
  isPremium: false,
},
{
  id: "t1-part3",
  title: "Water Pumps Dissertation",
  section: 3,
  description: "A discussion about research for a dissertation on water pumps.",
  questions: 10,
  htmlFile: "/passages/TEST_1_Part3.html",
  audioFile: "/passages/audio/test1section3.mp4",
  isPremium: false,
},
{
  id: "t1-part4",
  title: "Food Safety Standards",
  section: 4,
  description: "A lecture about food safety standards and related practices.",
  questions: 10,
  htmlFile: "/passages/TEST_1_Part4.html",
  audioFile: "/passages/audio/test1section4.mp4",
  isPremium: false,
},
{
  id: "t2-part1",
  title: "Getting a Job with an Airline",
  section: 1,
  description: "A conversation about applying for work with an airline.",
  questions: 10,
  htmlFile: "/passages/TEST_2_Part1.html",
  audioFile: "/passages/audio/test2section1.mp4",
  isPremium: false,
},
{
  id: "t2-part2",
  title: "Hospitality Scholarships",
  section: 2,
  description: "A talk about scholarships in hospitality studies.",
  questions: 10,
  htmlFile: "/passages/TEST_2_Part2.html",
  audioFile: "/passages/audio/test2section2.mp4",
  isPremium: false,
},
{
  id: "t2-part3",
  title: "Education House",
  section: 3,
  description: "A discussion about Education House and student-related plans.",
  questions: 10,
  htmlFile: "/passages/TEST_2_Part3.html",
  audioFile: "/passages/audio/test2section3.mp4",
  isPremium: false,
},
{
  id: "t2-part4",
  title: "Textiles with Business Studies",
  section: 4,
  description: "A lecture about textiles and business studies.",
  questions: 10,
  htmlFile: "/passages/TEST_2_Part4.html",
  audioFile: "/passages/audio/test2section4.mp4",
  isPremium: false,
},
  {
  id: "t3-part1",
  title: "Campsites",
  section: 1,
  description: "A conversation about campsites and booking details.",
  questions: 10,
  htmlFile: "/passages/TEST_3_Part1.html",
  audioFile: "/passages/audio/test3section1.mp4",
  isPremium: false,
},
{
  id: "t3-part2",
  title: "Starting a Business",
  section: 2,
  description: "A talk about starting and managing a business.",
  questions: 10,
  htmlFile: "/passages/TEST_3_Part2.html",
  audioFile: "/passages/audio/test3section2.mp4",
  isPremium: false,
},
{
  id: "t3-part3",
  title: "Dolphin Presentation",
  section: 3,
  description: "A discussion about preparing a presentation on dolphins.",
  questions: 10,
  htmlFile: "/passages/TEST_3_Part3.html",
  audioFile: "/passages/audio/test3section3.mp4",
  isPremium: false,
},
{
  id: "t3-part4",
  title: "Tyre Recycling",
  section: 4,
  description: "A lecture about tyre recycling and environmental uses.",
  questions: 10,
  htmlFile: "/passages/TEST_3_Part4.html",
  audioFile: "/passages/audio/test3section4.mp4",
  isPremium: false,
},
{
  id: "t4-part1",
  title: "Sailing Courses",
  section: 1,
  description: "A conversation about sailing courses and course options.",
  questions: 10,
  htmlFile: "/passages/TEST_4_Part1.html",
  audioFile: "/passages/audio/test4section1.mp4",
  isPremium: false,
},
{
  id: "t4-part2",
  title: "Stanley Island",
  section: 2,
  description: "A talk about Stanley Island and visitor information.",
  questions: 10,
  htmlFile: "/passages/TEST_4_Part2.html",
  audioFile: "/passages/audio/test4section2.mp4",
  isPremium: false,
},
{
  id: "t4-part3",
  title: "Absence from Work",
  section: 3,
  description: "A discussion about absence from work and related research.",
  questions: 10,
  htmlFile: "/passages/TEST_4_Part3.html",
  audioFile: "/passages/audio/test4section3.mp4",
  isPremium: false,
},
{
  id: "t4-part4",
  title: "Transhumance",
  section: 4,
  description: "A lecture about transhumance and traditional animal migration.",
  questions: 10,
  htmlFile: "/passages/TEST_4_Part4.html",
  audioFile: "/passages/audio/test4section4.mp4",
  isPremium: false,
},
{
  id: "t24-part3",
  title: "Nursing Course Feedback",
  section: 3,
  description: "A discussion about feedback on a nursing course.",
  questions: 10,
  htmlFile: "/passages/TEST_24_Part3.html",
  audioFile: "/passages/audio/test24section3.mp4",
  isPremium: false,
},
{
  id: "t24-part4",
  title: "Dinner Affects the Environment",
  section: 4,
  description: "A lecture about how food production and dinner choices affect the environment.",
  questions: 10,
  htmlFile: "/passages/TEST_24_Part4.html",
  audioFile: "/passages/audio/test24section4.mp4",
  isPremium: false,
},
{
  id: "t25-part1",
  title: "Hotel Renovation",
  section: 1,
  description: "A conversation about renovation plans for a hotel.",
  questions: 10,
  htmlFile: "/passages/TEST_25_Part1.html",
  audioFile: "/passages/audio/test25section1.mp4",
  isPremium: false,
},
{
  id: "t25-part2",
  title: "Melbourne Zoo",
  section: 2,
  description: "A talk for visitors at Melbourne Zoo.",
  questions: 10,
  htmlFile: "/passages/TEST_25_Part2.html",
  audioFile: "/passages/audio/test25section2.mp4",
  isPremium: false,
},
{
  id: "t25-part3",
  title: "Maori Carving",
  section: 3,
  description: "A student discussion about Maori greenstone tikis and traditional tools.",
  questions: 10,
  htmlFile: "/passages/TEST_25_Part3.html",
  audioFile: "/passages/audio/test25section3.mp4",
  isPremium: false,
},
{
  id: "t25-part4",
  title: "Suburbs",
  section: 4,
  description: "A lecture about suburban life and development.",
  questions: 10,
  htmlFile: "/passages/TEST_25_Part4.html",
  audioFile: "/passages/audio/test25section4.mp4",
  isPremium: false,
},
{
  id: "t26-part1",
  title: "Doctor Appointment",
  section: 1,
  description: "A phone conversation with a doctor about headaches and medical history.",
  questions: 10,
  htmlFile: "/passages/TEST_26_Part1.html",
  audioFile: "/passages/audio/test26section1.mp4",
  isPremium: false,
},
{
  id: "t26-part2",
  title: "Campus Orientation",
  section: 2,
  description: "A campus orientation talk for new students.",
  questions: 10,
  htmlFile: "/passages/TEST_26_Part2.html",
  audioFile: "/passages/audio/test26section2.mp4",
  isPremium: false,
},
{
  id: "t26-part3",
  title: "Field Trip Report",
  section: 3,
  description: "A tutor and student discuss a draft field trip report.",
  questions: 10,
  htmlFile: "/passages/TEST_26_Part3.html",
  audioFile: "/passages/audio/test26section3.mp4",
  isPremium: false,
},
{
  id: "t26-part4",
  title: "Surtsey Island",
  section: 4,
  description: "A lecture about the formation and ecology of Surtsey Island.",
  questions: 10,
  htmlFile: "/passages/TEST_26_Part4.html",
  audioFile: "/passages/audio/test26section4.mp4",
  isPremium: false,
},
{
  id: "t28-part1",
  title: "Theatre Booking",
  section: 1,
  description: "A phone conversation about booking theatre tickets.",
  questions: 10,
  htmlFile: "/passages/TEST_28_Part1.html",
  audioFile: "/passages/audio/test28section1.mp4",
  isPremium: false,
},
{
  id: "t28-part2",
  title: "Choirs",
  section: 2,
  description: "A radio programme about local choirs and workplace singing groups.",
  questions: 10,
  htmlFile: "/passages/TEST_28_Part2.html",
  audioFile: "/passages/audio/test28section2.mp4",
  isPremium: false,
},
{
  id: "t28-part3",
  title: "Tourism Research",
  section: 3,
  description: "A student discussion about a tourism research project.",
  questions: 10,
  htmlFile: "/passages/TEST_28_Part3.html",
  audioFile: "/passages/audio/test28section3.mp4",
  isPremium: false,
},
{
  id: "t28-part4",
  title: "Working as a Patent Attorney",
  section: 4,
  description: "A careers talk about working as a patent attorney.",
  questions: 10,
  htmlFile: "/passages/TEST_28_Part4.html",
  audioFile: "/passages/audio/test28section4.mp4",
  isPremium: false,
},
];

const FILTERS = [
  { v: "all", label: "All" },
  { v: "full", label: "Full tests" },
  { v: "1", label: "Section 1" },
  { v: "2", label: "Section 2" },
  { v: "3", label: "Section 3" },
  { v: "4", label: "Section 4" },
] as const;

function Listening() {
  const [filter, setFilter] = useState<"all" | "full" | "1" | "2" | "3" | "4">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | ProgressStatus>("all");
  const { profile, deviceConflict, user } = useAuth();
  const isPremium = !!profile?.is_premium && !deviceConflict;

  const testIds = TESTS.map((t) => t.id);
  const { statuses, statusFor, setTestStatus, resetTest } = useTestStatus(testIds);

  const sectionCounts = {
    all: TESTS.length,
    full: TESTS.filter((t) => t.section === 0).length,
    "1": TESTS.filter((t) => t.section === 1).length,
    "2": TESTS.filter((t) => t.section === 2).length,
    "3": TESTS.filter((t) => t.section === 3).length,
    "4": TESTS.filter((t) => t.section === 4).length,
  };

  const visible = TESTS.filter((t) => {
    const matchesSection =
      filter === "all" || (filter === "full" ? t.section === 0 : String(t.section) === filter);
    const matchesStatus = statusFilter === "all" || statusFor(t.id) === statusFilter;
    return matchesSection && matchesStatus;
  });

  function openTest(test: ListeningTest) {
    if (statusFor(test.id) === "not_done") {
      void setTestStatus(test.id, "not_completed");
    }
    window.open(test.htmlFile, "_blank");
  }

  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-12 max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">IELTS Listening</h1>
        <p className="text-muted-foreground mb-2">
          Full listening tests with built-in audio player, timer, and answer checker.
        </p>
        <p className="text-sm text-muted-foreground italic mb-8">
          Time: Sections 1-4 — 30 min total | Each section approx. 7-8 min
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {FILTERS.map((f) => (
            <Button
              key={f.v}
              variant={filter === f.v ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f.v)}
            >
              {f.label} ({sectionCounts[f.v]})
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
          <p className="text-muted-foreground py-12 text-center">No tests in this section yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {visible.map((t) => {
              const locked = t.isPremium && !isPremium;
              const status = statuses[t.id];
              const progressStatus = statusFor(t.id);
              const isFinished = progressStatus === "finished";
              const progressMeta = getTestProgressMeta(progressStatus);

              return (
                <Card
                  key={t.id}
                  className={cn(
                    "p-6 flex flex-col relative overflow-hidden transition-colors",
                    progressMeta.cardClassName,
                  )}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-accent text-foreground">
                        {t.section === 0 ? "Full test" : `Section ${t.section}`}
                      </Badge>
                      <TestProgressBadge status={progressStatus} detail={status} />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{t.questions} questions</span>
                      {locked && <Lock className="w-4 h-4 text-muted-foreground" />}
                    </div>
                  </div>

                  <h3
                    className={cn(
                      "font-serif text-xl font-semibold mb-2 leading-snug",
                      locked && "blur-sm select-none",
                    )}
                  >
                    {t.title}
                  </h3>

                  <p
                    className={cn(
                      "text-sm text-muted-foreground mb-5 flex-1",
                      locked && "blur-sm select-none",
                    )}
                  >
                    {t.description}
                  </p>

                  {status?.completedAt && (
                    <p className="text-xs text-muted-foreground mb-3">
                      Completed {new Date(status.completedAt).toLocaleDateString()}
                    </p>
                  )}

                  {!locked && (
                    <div className="mb-3">
                      <TestProgressSelect
                        value={progressStatus}
                        onChange={(next) => setTestStatus(t.id, next)}
                      />
                    </div>
                  )}

                  {locked ? (
                    <Link to={user ? "/premium" : "/auth"}>
                      <Button size="sm" className="w-full bg-gradient-gold text-primary-foreground">
                        <Crown className="w-4 h-4 mr-1" /> Unlock with Premium
                      </Button>
                    </Link>
                  ) : isFinished ? (
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1" onClick={() => openTest(t)}>
                        <Headphones className="w-4 h-4 mr-1" /> Review
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 text-muted-foreground"
                        onClick={() => resetTest(t.id)}
                      >
                        <RotateCcw className="w-4 h-4 mr-1" /> Redo
                      </Button>
                    </div>
                  ) : (
                    <Button size="sm" variant="outline" className="w-full" onClick={() => openTest(t)}>
                      <Headphones className="w-4 h-4 mr-1" />
                      {progressStatus === "not_completed" ? "Continue Test" : "Start Test"}
                    </Button>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
