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
  date: string; // YYYY-MM-DD
  description: string;
  readingTime: number; // minutes
  content: string; // HTML
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
      { word: "notwithstanding", ipa: "/ˌnɒtwɪðˈstændɪŋ/", syllables: "not-with-stand-ing", tip: "Common mistake: students stress the first syllable. Stress goes on STAND." },
      { word: "conversely", ipa: "/ˈkɒnvɜːsli/", syllables: "con-verse-ly", tip: "Don't say 'con-VER-suh-ly'. Three syllables only." },
      { word: "cohesion", ipa: "/kəʊˈhiːʒən/", syllables: "co-he-sion", tip: "The 'si' sounds like 'zh' (as in 'measure'), not 's'." },
      { word: "paraphrase", ipa: "/ˈpærəfreɪz/", syllables: "par-a-phrase", tip: "Stress the first syllable, not the last." },
      { word: "criteria", ipa: "/kraɪˈtɪəriə/", syllables: "cri-te-ri-a", tip: "Plural of 'criterion'. Don't say 'one criteria'." },
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
      { word: "sceptical", ipa: "/ˈskɛptɪkəl/", syllables: "skep-ti-cal", tip: "Starts with a hard 'sk' sound, not 'sep'." },
      { word: "paraphrase", ipa: "/ˈpærəfreɪz/", syllables: "par-a-phrase", tip: "The 'ph' is an 'f' sound." },
      { word: "candidate", ipa: "/ˈkændɪdət/", syllables: "can-di-date", tip: "The final 'date' is reduced to 'dət', not 'dayt'." },
      { word: "academic", ipa: "/ˌækəˈdɛmɪk/", syllables: "ac-a-dem-ic", tip: "Stress the third syllable: ac-a-DEM-ic." },
      { word: "vocabulary", ipa: "/vəˈkæbjʊləri/", syllables: "vo-cab-u-lar-y", tip: "Don't drop the 'u' — five syllables, not four." },
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
