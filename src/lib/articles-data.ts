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
    id: "a1",
    slug: "task-2-cohesion-words",
    title: "10 Cohesion Words That Lift Your Task 2 Score",
    category: "Vocabulary",
    topic: "Education",
    difficulty: "Intermediate",
    coverImage:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1600&q=80",
    date: "2026-04-12",
    description:
      "Examiners reward clear linking between ideas. Here are ten cohesion devices Band 7+ writers actually use — with sample sentences.",
    readingTime: 6,
    content: `
      <p>Cohesion is one of the four criteria in IELTS Writing Task 2. Many students rely on the same three or four linkers — <em>firstly, secondly, in conclusion</em> — and lose marks for an overly mechanical style.</p>
      <h2>Why cohesion matters</h2>
      <p>The band descriptors for Coherence and Cohesion at Band 7 say you must use <strong>a range of cohesive devices appropriately</strong>. The key word is <em>range</em>. Repeating <em>moreover</em> in every paragraph is the opposite.</p>
      <h2>Ten phrases worth memorising</h2>
      <ol>
        <li><strong>What is more</strong> — adds a stronger second point.</li>
        <li><strong>By the same token</strong> — links two parallel ideas.</li>
        <li><strong>Conversely</strong> — introduces a sharp contrast.</li>
        <li><strong>To put it another way</strong> — paraphrases your own argument.</li>
        <li><strong>Granted that</strong> — concedes a counter-point before refuting it.</li>
        <li><strong>On the whole</strong> — softer alternative to <em>in conclusion</em>.</li>
        <li><strong>In light of this</strong> — signals a consequence.</li>
        <li><strong>To a large extent</strong> — hedges your opinion.</li>
        <li><strong>Notwithstanding</strong> — formal version of <em>despite</em>.</li>
        <li><strong>Be that as it may</strong> — academic version of <em>however</em>.</li>
      </ol>
      <p>Pick three or four, practise them in your next essay, and let them become natural. Don't try to use all ten in one piece — it sounds forced.</p>
    `,
    vocabulary: [
      { word: "cohesion", wordType: "noun", definition: "the way ideas in a text are connected logically", example: "Strong cohesion helps the reader follow your argument easily." },
      { word: "conversely", wordType: "adverb", definition: "in contrast; the opposite is also true", example: "Some students prefer essays; conversely, others enjoy speaking tasks." },
      { word: "notwithstanding", wordType: "adverb", definition: "in spite of (formal)", example: "Notwithstanding the weather, the exam went ahead." },
      { word: "to concede", wordType: "verb", definition: "to admit that something is true, often reluctantly", example: "I will concede that exam stress is unavoidable." },
    ],
    pronunciation: [
      { word: "notwithstanding", ipa: "/ЛЊnЙ’twЙЄГ°Л€stГ¦ndЙЄЕ‹/", syllables: "not-with-stand-ing", tip: "Common mistake: students stress the first syllable. Stress goes on STAND." },
      { word: "conversely", ipa: "/Л€kЙ’nvЙњЛђsli/", syllables: "con-verse-ly", tip: "Don't say 'con-VER-suh-ly'. Three syllables only." },
      { word: "cohesion", ipa: "/kЙ™КЉЛ€hiЛђК’Й™n/", syllables: "co-he-sion", tip: "The 'si' sounds like 'zh' (as in 'measure'), not 's'." },
      { word: "paraphrase", ipa: "/Л€pГ¦rЙ™freЙЄz/", syllables: "par-a-phrase", tip: "Stress the first syllable, not the last." },
      { word: "criteria", ipa: "/kraЙЄЛ€tЙЄЙ™riЙ™/", syllables: "cri-te-ri-a", tip: "Plural of 'criterion'. Don't say 'one criteria'." },
    ],
  },
  {
    id: "a2",
    slug: "reading-passage-3-strategy",
    title: "How to Survive Reading Passage 3 (Without Panicking)",
    category: "Reading",
    topic: "Education",
    difficulty: "Advanced",
    coverImage:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=1600&q=80",
    date: "2026-04-28",
    description:
      "Passage 3 is dense, abstract and time-pressured. This is the exact 22-minute plan I teach my Band 7+ students.",
    readingTime: 8,
    content: `
      <p>Passage 3 is where most candidates lose marks. The text is longer, the vocabulary is more academic, and the question types — especially Matching Headings and True / False / Not Given — punish careless reading.</p>
      <h2>The 22-minute breakdown</h2>
      <ul>
        <li><strong>0–2 min:</strong> Skim the title, subtitle and first sentence of each paragraph. Don't read every word.</li>
        <li><strong>2–5 min:</strong> Read the questions and underline keywords.</li>
        <li><strong>5–18 min:</strong> Scan paragraph by paragraph, answering as you go.</li>
        <li><strong>18–22 min:</strong> Transfer answers and review the questions you skipped.</li>
      </ul>
      <h2>Common traps</h2>
      <p>Examiners love to test paraphrasing. If the text says <em>"researchers were sceptical"</em>, the question may say <em>"experts doubted"</em>. Train your eye for synonyms — not exact word matches.</p>
      <p>Another trap is the <strong>"Not Given"</strong> answer. If a statement <em>could be true</em> but the passage never says so, it is Not Given, not True. This is the single biggest source of mistakes.</p>
      <h2>One golden rule</h2>
      <p>Never spend more than 90 seconds on one question. Mark it, move on, come back if time allows.</p>
    `,
    vocabulary: [
      { word: "to skim", wordType: "verb", definition: "to read quickly to get the main idea", example: "Skim the first sentence of each paragraph before answering." },
      { word: "to scan", wordType: "verb", definition: "to look for specific information quickly", example: "Scan the passage for dates and numbers." },
      { word: "sceptical", wordType: "adjective", definition: "doubtful; not easily convinced", example: "Scientists were sceptical of the new theory." },
      { word: "paraphrase", wordType: "noun", definition: "to express the same meaning using different words", example: "The question paraphrases the original sentence." },
    ],
    pronunciation: [
      { word: "sceptical", ipa: "/Л€skЙ›ptЙЄkЙ™l/", syllables: "skep-ti-cal", tip: "Starts with a hard 'sk' sound, not 'sep'." },
      { word: "paraphrase", ipa: "/Л€pГ¦rЙ™freЙЄz/", syllables: "par-a-phrase", tip: "The 'ph' is an 'f' sound." },
      { word: "candidate", ipa: "/Л€kГ¦ndЙЄdЙ™t/", syllables: "can-di-date", tip: "The final 'date' is reduced to 'dЙ™t', not 'dayt'." },
      { word: "academic", ipa: "/ЛЊГ¦kЙ™Л€dЙ›mЙЄk/", syllables: "ac-a-dem-ic", tip: "Stress the third syllable: ac-a-DEM-ic." },
      { word: "vocabulary", ipa: "/vЙ™Л€kГ¦bjКЉlЙ™ri/", syllables: "vo-cab-u-lar-y", tip: "Don't drop the 'u' — five syllables, not four." },
    ],
  },
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
