export type ArticleCategory = "Vocabulary" | "Grammar" | "Reading" | "General";
export type ArticleTopic =
  | "Environment"
  | "Education"
  | "Crime"
  | "Technology"
  | "Health"
  | "Society"
  | "Science"
  | "Business"
  | "Culture";
export type ArticleDifficulty = "Beginner" | "Intermediate" | "Advanced";

export const TOPICS: ArticleTopic[] = [
  "Environment",
  "Education",
  "Crime",
  "Technology",
  "Health",
  "Society",
  "Science",
  "Business",
  "Culture",
];

export const DIFFICULTIES: ArticleDifficulty[] = ["Beginner", "Intermediate", "Advanced"];

export interface VocabItem {
  word: string;
  definition: string;
  example: string;
  wordType?: "noun" | "verb" | "adjective" | "adverb" | "phrase";
}

export interface PronunciationItem {
  word: string;
  ipa: string;
  syllables: string;
  tip: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: ArticleCategory;
  topic: ArticleTopic;
  difficulty: ArticleDifficulty;
  coverImage?: string;
  date: string;
  description: string;
  readingTime: number;
  content: string;
  vocabulary: VocabItem[];
  pronunciation: PronunciationItem[];
}

export const ARTICLES: Article[] = [
  {
    id: "a3",
    slug: "young-peoples-mental-health-worse-today",
    title: "Is young people’s mental health really worse today than it was decades ago?",
    category: "Reading",
    topic: "Health",
    difficulty: "Advanced",
    coverImage:
      "https://images.unsplash.com/photo-1493836512294-502baa1986e2?auto=format&fit=crop&w=1600&q=80",
    date: "2024-08-24",
    description:
      "Smartphones, covid-19, social media and climate change may all be affecting the mental health of children and young adults.",
    readingTime: 5,
    content: `
      <p><strong>Smartphones, covid-19, social media and climate change may all be affecting the mental health of children and young adults, reports Carissa Wong.</strong></p>
      <p>Young people’s mental health “has entered a dangerous phase” and “now might be our last chance to act”, scientists have written in the journal <em>The Lancet Psychiatry</em>. They argue that accumulating evidence indicates a steady decline in the mental health of people aged 12 to 25 over the past two decades, with covid-19 causing a recent major plummet.</p>
      <p>Aside from the pandemic, some also point the finger at climate change and smartphones, arguing that these affect younger people more than their older counterparts, or even didn’t exist to the same extent when the latter were children.</p>
      <p>Another argument asks whether a rise in youth mental health issues just comes down to increased awareness of these problems and a reduced stigma around them, which may prompt young people to answer related surveys more honestly and seek out diagnoses.</p>
      <h2>Statistics suggest a real change</h2>
      <p>Whatever the causes, statistics signal that a change has occurred in recent years. In England, for example, surveys suggest that 20 per cent of children aged 8 to 16 had a probable mental health condition in 2023, while just under 13 per cent of 5 to 19-year-olds had at least one mental health condition in 2017. Statistics from other countries, including the US and Australia, tell a similar story, with poor mental health also seeming to increasingly affect young adults.</p>
      <h2>The smartphone question</h2>
      <p>One thing that didn’t widely exist two decades ago was smartphones. Although often blamed for rising rates of depression and anxiety among young people, the data is generally inconclusive. But recently, a randomised controlled trial, the best kind of scientific evidence, of 181 children and adolescents found that giving up smartphones and reducing other forms of screen time to a maximum of 3 hours a week for 14 days was associated with improved psychological symptoms.</p>
      <p>It could be that the problem is less to do with smartphones themselves than what young people are using them for. Studies have linked social media, which is often accessed via these devices, to online bullying, self-harm behaviour and suicide ideation. However, “it’s really important that we don’t just put it all in one bucket and say social media is bad”, says Emily Simonoff at King’s College London.</p>
      <p>Sites like Facebook and Instagram can help young people connect with others during a phase of life where a sense of social belonging is especially important, says Karen Mansfield at the University of Oxford.</p>
      <h2>The pressure of recent crises</h2>
      <p>Another factor is that people who were children two decades ago didn’t have to contend with the covid-19 lockdowns at a young age. While these affected all of society, children and teenagers can’t shape their environments like many adults can, so may have felt particularly out of control, says Simonoff. It also left many young people feeling unsupported and lonely, she says.</p>
      <p>A surge in youth mental health problems at this time has been linked to the shift to remote learning, but for some, returning to schools may have actually worsened their mental health. A recent study found that going back to school was associated with increased psychiatric emergency department visits among children and teens in Italy.</p>
      <blockquote>“Stresses - like the pandemic, like climate change - they’re compounding each other.”</blockquote>
      <p>“A lot of children, for example, who were very anxious at school, were actually quite happy to be at home, to learn online, to have their parents supporting them,” says Mansfield.</p>
      <h2>Climate change and eco-anxiety</h2>
      <p>Another global crisis widely thought to harm youth mental health is climate change. Beyond its physical effects, such as heat-related deaths and extreme weather events, its mental health consequences have been dubbed eco-anxiety, which seems to disproportionately affect young people.</p>
      <p>Researchers at Stanford University in California recently found that among people aged 18 and older in the state, the younger ones were more likely to experience mental health symptoms related to climate change.</p>
      <p>Global warming is especially concerning for young people, who have more years ahead of them than older people, says Emma Lawrance at Imperial College London. They also feel frustrated that they have been left with a crisis they didn’t create, she says. “There is a sense of betrayal and understandable anger that disrupts their sense of a positive vision of the future.”</p>
      <p>Beyond existential worries, exposure to extreme heat in early childhood has been linked to brain changes that may harm mental health, says Lawrance.</p>
      <h2>No single cause</h2>
      <p>All this hints that the decline in youth mental health isn’t just the result of improved awareness. “In terms of recent history, I’d say it’s really getting worse,” says Mansfield.</p>
      <p>Ultimately, it is unlikely that any single factor is to blame. “Uncertainties and stresses - like the pandemic, like climate change - they’re compounding each other,” says Lawrance.</p>
      <p>When it comes to rectifying some of these issues, experts want youth mental health to be a catalyst for action. “Young people are picking up on things that are happening in the world, and the fact they’re not OK is a reflection of these trends in the world that are not OK,” says Lawrance. “It’s the canary in the coal mine.”</p>
      <p><em>If you need support: UK Samaritans: 116 123 (Samaritans.org); US 988 Suicide &amp; Crisis Lifeline: 988 (988lifeline.org).</em></p>
    `,
    vocabulary: [
      { word: "plummet", wordType: "noun", definition: "a sudden and large fall or decrease", example: "Researchers reported a recent major plummet in young people’s mental health." },
      { word: "stigma", wordType: "noun", definition: "a negative social attitude attached to something", example: "Reduced stigma may encourage young people to seek diagnoses." },
      { word: "inconclusive", wordType: "adjective", definition: "not leading to a clear answer or decision", example: "The data on smartphones and anxiety is generally inconclusive." },
      { word: "ideation", wordType: "noun", definition: "the formation of ideas or thoughts, often used clinically", example: "Some studies link social media use with suicide ideation." },
      { word: "to contend with", wordType: "phrase", definition: "to deal with a difficult problem or situation", example: "Young people had to contend with lockdowns at a young age." },
      { word: "eco-anxiety", wordType: "noun", definition: "anxiety caused by concern about environmental damage and climate change", example: "Climate change has mental health consequences such as eco-anxiety." },
      { word: "existential", wordType: "adjective", definition: "related to existence, meaning, or survival", example: "Climate change can create existential worries for young people." },
      { word: "catalyst", wordType: "noun", definition: "something that causes or speeds up change", example: "Experts want youth mental health to be a catalyst for action." },
    ],
    pronunciation: [
      { word: "psychiatry", ipa: "/sai-KY-uh-tree/", syllables: "psy-chi-a-try", tip: "The 'ps' starts with an 's' sound. Stress the second syllable: KY." },
      { word: "adolescents", ipa: "/ad-uh-LES-ents/", syllables: "ad-o-les-cents", tip: "Stress 'les'. The final sound is 'sents', not 'skents'." },
      { word: "inconclusive", ipa: "/in-kuhn-KLOO-siv/", syllables: "in-con-clu-sive", tip: "Stress the third syllable: CLU." },
      { word: "ideation", ipa: "/eye-dee-AY-shun/", syllables: "i-de-a-tion", tip: "Stress the 'a' sound before '-tion': ay." },
      { word: "psychiatric", ipa: "/sai-kee-AT-rik/", syllables: "psy-chi-at-ric", tip: "Stress 'at'. Keep the final syllable short." },
      { word: "existential", ipa: "/eg-zi-STEN-shul/", syllables: "ex-is-ten-tial", tip: "Stress 'sten'. The ending sounds like 'shul'." },
    ],
  },
];

export function findArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export const DIFFICULTY_STYLES: Record<ArticleDifficulty, string> = {
  Beginner: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800",
  Intermediate: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800",
  Advanced: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800",
};
