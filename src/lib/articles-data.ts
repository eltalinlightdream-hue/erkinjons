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
  wordType?: "noun" | "verb" | "adjective" | "adverb" | "phrase" | "noun phrase" | "verb phrase";
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
  {
  id: "a4",
  slug: "understanding-planned-obsolescence",
  title: "Understanding Planned Obsolescence: Impact on Consumers and Industries",
  category: "Reading",
  topic: "Business",
  difficulty: "Advanced",
  coverImage:
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
  date: "2026-05-19",
  description:
    "Planned obsolescence is a business strategy where products are intentionally designed to become outdated or useless after a certain period.",
  readingTime: 6,
  content: `
    <p><strong>Planned obsolescence is a strategy to make a product outdated or useless after a set period, boosting future consumer demand for replacements.</strong></p>

    <h2>What Is Planned Obsolescence?</h2>
    <p>Planned obsolescence is a strategy to make a product outdated or useless after a set period, boosting future consumer demand for replacements. Obsolescence happens by releasing a better model or designing a product to fail after a certain period, prompting consumers to prefer newer versions.</p>

    <p>Planned obsolescence is common in tech and fashion, often viewed negatively by consumers, especially if new versions have minor changes. Apple offers a plan for iPhone users to annually swap hardware for a fee, seen as a demand-boosting tactic, though Apple denies this.</p>

    <h2>Key Takeaways</h2>
    <ul>
      <li>Planned obsolescence is a strategy where products are intentionally designed to have a limited lifespan to drive future consumer demand.</li>
      <li>This practice is common in the tech and fashion industries, where new models replace outdated ones regularly.</li>
      <li>Consumers often respond negatively if new versions offer minimal improvements, impacting brand reputation.</li>
      <li>While controversial, planned obsolescence can stimulate technological progress by encouraging frequent upgrades.</li>
      <li>Critics argue this strategy prioritizes profit over satisfaction, but it remains prevalent across various sectors.</li>
    </ul>

    <h2>Industry-Specific Approaches to Planned Obsolescence</h2>
    <p>Some industries are more associated with planned obsolescence. In fashion, nylon stockings run easily, requiring frequent replacements.</p>

    <p>In technology, smartphones typically need replacing every two to three years as hardware wears out and new software becomes incompatible. Software often includes new features and file types that do not work with older versions.</p>

    <p>Computer hardware also sees planned obsolescence as microprocessors follow Moore's Law, doubling transistor count and halving processing cost every two years.</p>

    <p>Finally, planned obsolescence also affects automobile manufacturers, who annually roll out new versions of their models.</p>

    <h2>How Planned Obsolescence Affects Consumer Choices</h2>
    <p>Consumers often dislike planned obsolescence, particularly if new products show little improvement. This strategy can hurt brands' reputations and drive customers away.</p>

    <p>Sometimes, planned obsolescence is not seen negatively, as companies may use it to cut costs, like choosing parts that last five years instead of twenty.</p>

    <h2>Examining Apple's Approach to Planned Obsolescence</h2>
    <p>Apple Inc. has often been at the center of skeptical consumer discourse. The company announced a plan for iPhone users to make direct payments to exchange hardware annually.</p>

    <p>Observers viewed the shorter replacement cycle as a way to boost demand. Skeptics questioned Apple's ability to make significant improvements quickly, a common two- or three-year issue for phone makers.</p>

    <p>Apple denies planned obsolescence, though a Harvard study found iOS upgrades slowed older iPhone processors, not to push new sales. Apple recently settled a 2017 class-action lawsuit over the issue, agreeing to issue payouts to customers and state governments over what has been referred to as "batterygate."</p>

    <p>Although Apple is notorious for this practice, it has not been proved unequivocally. Some economists believe planned obsolescence can drive technological progress, even if it occurs. Besides, other manufacturers, such as the makers of Android phones and tablets, also release new versions of their products annually.</p>

    <h2>The Bottom Line</h2>
    <p>Planned obsolescence is a business strategy where products are designed to have limited lifespans to drive consumer demand for newer models. It is especially prevalent in industries such as technology, fashion, and automotive, often resulting in negative consumer perceptions.</p>

    <p>Although this strategy may control costs and stimulate technological advancement, it also risks damaging brand reputations if improvements are minimal. Apple is a company frequently accused of planned obsolescence, including the "batterygate" incident as a notable case study.</p>

    <p>Planned obsolescence can drive innovation but also attract consumer backlash. It is important for companies to balance these outcomes. Consumers should be aware of planned obsolescence practices to make informed purchasing decisions.</p>
  `,
  vocabulary: [
    {
      word: "planned obsolescence",
      wordType: "noun phrase",
      definition:
        "a business strategy where products are deliberately designed to become outdated or unusable after a certain time",
      example:
        "Planned obsolescence encourages consumers to replace products more frequently.",
    },
    {
      word: "limited lifespan",
      wordType: "noun phrase",
      definition: "a short or fixed period during which something can be used",
      example:
        "Some products are intentionally designed to have a limited lifespan.",
    },
    {
      word: "boost consumer demand",
      wordType: "verb phrase",
      definition: "to increase people’s desire to buy products",
      example:
        "New product releases can boost consumer demand for updated models.",
    },
    {
      word: "demand-boosting tactic",
      wordType: "noun phrase",
      definition: "a method used to increase sales or purchasing behavior",
      example:
        "Annual hardware exchange plans may be seen as a demand-boosting tactic.",
    },
    {
      word: "technological progress",
      wordType: "noun phrase",
      definition: "the development or improvement of technology",
      example:
        "Some economists argue that planned obsolescence can stimulate technological progress.",
    },
    {
      word: "software incompatibility",
      wordType: "noun phrase",
      definition: "a situation where new software does not work with older devices or systems",
      example:
        "Software incompatibility can force consumers to replace old devices.",
    },
    {
      word: "replacement cycle",
      wordType: "noun phrase",
      definition: "the usual period before a product is replaced",
      example:
        "Smartphones often have a two- or three-year replacement cycle.",
    },
    {
      word: "brand reputation",
      wordType: "noun phrase",
      definition: "the way a company is viewed by the public",
      example:
        "Minimal improvements in new products can hurt brand reputation.",
    },
    {
      word: "class-action lawsuit",
      wordType: "noun phrase",
      definition: "a legal case brought by a group of people with the same complaint",
      example:
        "Apple settled a class-action lawsuit related to older iPhone performance.",
    },
    {
      word: "consumer backlash",
      wordType: "noun phrase",
      definition: "a strong negative reaction from customers",
      example:
        "Planned obsolescence can attract consumer backlash.",
    },
  ],
  pronunciation: [
    {
      word: "obsolescence",
      ipa: "/ob-suh-LES-ens/",
      syllables: "ob-so-les-cence",
      tip: "Stress the third syllable: LES.",
    },
    {
      word: "intentionally",
      ipa: "/in-TEN-shuh-nuh-lee/",
      syllables: "in-ten-tion-al-ly",
      tip: "Stress TEN. The middle sounds like 'shuh'.",
    },
    {
      word: "consumer",
      ipa: "/kuhn-SOO-mer/",
      syllables: "con-su-mer",
      tip: "Stress SOO.",
    },
    {
      word: "incompatible",
      ipa: "/in-kuhm-PAT-uh-bul/",
      syllables: "in-com-pat-i-ble",
      tip: "Stress PAT.",
    },
    {
      word: "microprocessors",
      ipa: "/my-kroh-PROH-ses-erz/",
      syllables: "mi-cro-pro-cess-ors",
      tip: "Stress PROH.",
    },
    {
      word: "automobile",
      ipa: "/AW-tuh-moh-beel/",
      syllables: "au-to-mo-bile",
      tip: "Stress AW. The ending sounds like 'beel'.",
    },
    {
      word: "reputation",
      ipa: "/rep-yuh-TAY-shun/",
      syllables: "rep-u-ta-tion",
      tip: "Stress TAY.",
    },
    {
      word: "skeptical",
      ipa: "/SKEP-ti-kul/",
      syllables: "skep-ti-cal",
      tip: "Stress SKEP.",
    },
    {
      word: "unequivocally",
      ipa: "/un-i-KWIV-uh-kuh-lee/",
      syllables: "un-e-quiv-o-cal-ly",
      tip: "Stress KWIV.",
    },
    {
      word: "prevalent",
      ipa: "/PREV-uh-lent/",
      syllables: "prev-a-lent",
      tip: "Stress PREV.",
    },
  ],
},
  {
  id: "a5",
  slug: "understanding-purchasing-power-and-cpi",
  title: "Understanding Purchasing Power and the Consumer Price Index",
  category: "Reading",
  topic: "Business",
  difficulty: "Advanced",
  coverImage:
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80",
  date: "2026-05-19",
  description:
    "Purchasing power describes how much goods or services a unit of money can buy, and how inflation can reduce the real value of currency over time.",
  readingTime: 7,
  content: `
    <p><strong>Purchasing power describes the amount of products or services that a single unit of money can acquire, reflecting the real-world value of currency in the marketplace.</strong></p>

    <h2>What Is Purchasing Power?</h2>
    <p>Purchasing power describes the amount of products or services that a single unit of money can acquire, reflecting the real-world value of currency in the marketplace. It can weaken over time due to inflation. That is because rising prices effectively decrease the number of goods or services that one unit of money can buy.</p>

    <p>Purchasing power is also known as a currency's buying power. In investment terms, purchasing or buying power is the dollar amount of credit available to a customer based on the existing marginable securities in the customer's brokerage account.</p>

    <h2>Key Takeaways</h2>
    <ul>
      <li>Inflation erodes the purchasing power of a currency over time.</li>
      <li>Central banks adjust interest rates to try to keep prices stable and maintain purchasing power.</li>
      <li>One U.S. measure of purchasing power is the Consumer Price Index, or CPI.</li>
      <li>Globalization has linked currencies more closely than ever, so protecting purchasing power worldwide is crucial.</li>
    </ul>

    <h2>Understanding Purchasing Power</h2>
    <p>Purchasing power affects every aspect of economics, from consumers buying goods to investors buying stock to a country's economic prosperity.</p>

    <p>Inflation reduces a currency's purchasing power. Similarly, loss of purchasing power has the same effect as an increase in prices. To measure purchasing power in the traditional economic sense, you could compare the price of a good or service against a price index such as the Consumer Price Index.</p>

    <p>One way to understand purchasing power is to imagine that you worked the same job that your grandfather worked forty years ago. Today, you would need a much higher salary to maintain the same quality of living.</p>

    <p>When a currency's purchasing power decreases due to excessive inflation, serious negative economic consequences can arise. These can include a higher cost of living, higher interest rates that affect the global market, and falling credit ratings. All of these factors can contribute to an economic crisis.</p>

    <h2>Purchasing Power and CPI</h2>
    <p>Governments institute policies and regulations to protect a currency's purchasing power and keep an economy healthy. They also monitor economic data to stay on top of changing conditions. For example, the U.S. Bureau of Labor Statistics measures price changes and announces those changes with CPI.</p>

    <p>CPI is one of the measures of inflation and purchasing power. It calculates the change in the weighted average of prices of consumer goods and services, especially transportation, food, and medical care, at a given time. CPI can point to changes in the cost of living as well as deflation.</p>

    <h2>Purchasing Power Parity</h2>
    <p>A concept related to purchasing power is purchasing power parity, or PPP. PPP is an economic theory that estimates the amount by which an item should be adjusted for parity, given two countries' exchange rates.</p>

    <p>PPP can be used to compare countries' economic activity, income levels, and other relevant data concerning the cost of living, or possible rates of inflation and deflation.</p>

    <h2>Purchasing Power Loss or Gain</h2>
    <p>Purchasing power loss or gain refers to the decrease or increase in how much consumers can buy with a given amount of money. Consumers lose purchasing power when prices increase. They gain purchasing power when prices decrease.</p>

    <p>Causes of purchasing power loss can include government regulations, inflation, and natural and human-made disasters. Causes of purchasing power gain include deflation and technological innovation.</p>

    <h2>Examples of Purchasing Power Loss</h2>
    <p>Historical examples of severe inflation and hyperinflation show how quickly a currency's purchasing power can be destroyed. After World War I, Germany experienced extreme economic hardship and almost unprecedented hyperinflation, partly because of the reparations it had to pay.</p>

    <p>The effects of the loss of purchasing power after the 2008 global financial crisis and the European sovereign debt crisis are remembered to this day. Due to increased globalization and the introduction of the euro, currencies are closely linked, and economic trouble can cross geographic boundaries.</p>

    <h2>Quantitative Easing and Purchasing Power</h2>
    <p>In 2008, the U.S. Federal Reserve kept interest rates near zero and introduced quantitative easing. This policy involved buying government and other market securities to increase the money supply and lower interest rates.</p>

    <p>The increase in capital created more lending and more liquidity. The European Central Bank also used quantitative easing to help stop deflation in the eurozone and support the euro's purchasing power.</p>

    <h2>Protecting Against Purchasing Power Risk</h2>
    <p>Retirees can be particularly aware of purchasing power loss because many live on a fixed amount of money. They need investments that earn a rate of return equal to or greater than inflation, so the value of their savings does not decrease each year.</p>

    <p>Debt securities and fixed-return investments are among the most susceptible to purchasing power risk. Some investments, such as Treasury inflation-protected securities, commodities, oil, and metals, may help protect investors during periods of inflation.</p>

    <h2>The Bottom Line</h2>
    <p>Purchasing power refers to how much you can buy with your money. As prices rise, your money can buy less. As prices drop, your money can buy more.</p>

    <p>Long-time investors know that loss of purchasing power can greatly impact their investments. Rising inflation affects purchasing power by decreasing the number of goods or services people can purchase with their money.</p>

    <p>Investors must look for ways to make a return higher than the current rate of inflation. More advanced investors may track international economies for the potential effect on their long-term investments.</p>
  `,
  vocabulary: [
    {
      word: "purchasing power",
      wordType: "phrase",
      definition: "the amount of goods or services that money can buy",
      example: "Inflation reduces the purchasing power of a currency over time.",
    },
    {
      word: "Consumer Price Index",
      wordType: "phrase",
      definition: "a measure that tracks changes in the prices of common goods and services",
      example: "The Consumer Price Index is often used to measure inflation.",
    },
    {
      word: "inflation",
      wordType: "noun",
      definition: "a general rise in prices over time",
      example: "High inflation means people can buy less with the same amount of money.",
    },
    {
      word: "deflation",
      wordType: "noun",
      definition: "a general fall in prices over time",
      example: "Deflation can increase purchasing power but may slow economic growth.",
    },
    {
      word: "cost of living",
      wordType: "phrase",
      definition: "the amount of money needed to pay for basic expenses",
      example: "A higher cost of living makes it harder for families to save money.",
    },
    {
      word: "hyperinflation",
      wordType: "noun",
      definition: "extremely rapid and uncontrolled inflation",
      example: "Hyperinflation can destroy a currency's purchasing power.",
    },
    {
      word: "quantitative easing",
      wordType: "phrase",
      definition: "a central bank policy that increases money supply by buying securities",
      example: "Quantitative easing was used after the 2008 financial crisis.",
    },
    {
      word: "liquidity",
      wordType: "noun",
      definition: "the availability of money or assets that can easily be used",
      example: "The policy created more liquidity in the financial system.",
    },
    {
      word: "economic stagnation",
      wordType: "phrase",
      definition: "a period when an economy stops growing or grows very slowly",
      example: "High levels of deflation can lead to economic stagnation.",
    },
    {
      word: "inflation-protected securities",
      wordType: "phrase",
      definition: "investments designed to protect value against rising prices",
      example: "Treasury inflation-protected securities may help investors during inflation.",
    },
  ],
  pronunciation: [
    {
      word: "purchasing",
      ipa: "/PUR-chuh-sing/",
      syllables: "pur-chas-ing",
      tip: "Stress the first syllable: PUR.",
    },
    {
      word: "currency",
      ipa: "/KUR-en-see/",
      syllables: "cur-ren-cy",
      tip: "Stress KUR. The final sound is 'see'.",
    },
    {
      word: "inflation",
      ipa: "/in-FLAY-shun/",
      syllables: "in-fla-tion",
      tip: "Stress FLAY.",
    },
    {
      word: "Consumer Price Index",
      ipa: "/kuhn-SOO-mer pryss IN-deks/",
      syllables: "con-su-mer price in-dex",
      tip: "Stress SOO in consumer and IN in index.",
    },
    {
      word: "globalization",
      ipa: "/gloh-buh-luh-ZAY-shun/",
      syllables: "glo-bal-i-za-tion",
      tip: "Stress ZAY.",
    },
    {
      word: "prosperity",
      ipa: "/pro-SPER-uh-tee/",
      syllables: "pros-per-i-ty",
      tip: "Stress SPER.",
    },
    {
      word: "hyperinflation",
      ipa: "/hy-per-in-FLAY-shun/",
      syllables: "hy-per-in-fla-tion",
      tip: "Stress FLAY.",
    },
    {
      word: "unprecedented",
      ipa: "/un-PRES-uh-den-tid/",
      syllables: "un-pre-ce-dent-ed",
      tip: "Stress PRES.",
    },
    {
      word: "quantitative",
      ipa: "/KWON-tuh-tay-tiv/",
      syllables: "quan-ti-ta-tive",
      tip: "Stress KWON.",
    },
    {
      word: "liquidity",
      ipa: "/li-KWID-uh-tee/",
      syllables: "li-quid-i-ty",
      tip: "Stress KWID.",
    },
  ],
},
  {
  id: "a6",
  slug: "latin-america-worlds-most-violent-place",
  title: "400 Murders a Day: Why Latin America Is the World's Most Violent Place",
  category: "Reading",
  topic: "Crime",
  difficulty: "Advanced",
  coverImage:
    "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1600&q=80",
  date: "2026-05-19",
  description:
    "Latin America has a small share of the world's population but a very high share of global homicides, caused by inequality, unemployment, impunity, urbanization, organized crime, drugs, guns, and weak institutions.",
  readingTime: 9,
  content: `
    <p><strong>Latin America is home to about 8% of the world's population but has about one-third of its homicides. In 2016, that meant around 400 homicides a day, or roughly 146,000 a year.</strong></p>

    <h2>Violence Is Not Evenly Distributed</h2>
    <p>Latin America is often described as the world’s most violent region, but the bloodshed is not evenly distributed. Some countries and cities experience far higher homicide rates than others. Mexico, Brazil, Venezuela, Guatemala, El Salvador, Honduras, and Colombia have all struggled with serious violence, although some have seen periods of decline.</p>

    <p>The regional homicide rate has increased over the past decade, but experts argue that there is not one single explanation. Instead, several factors repeatedly correlate with homicide across time and space.</p>

    <h2>Income Inequality</h2>
    <p>Income inequality is strongly connected with homicide. Latin America contains many of the world’s most unequal countries. Large disparities in wealth create competition between rich and poor populations, especially over public goods such as policing, healthcare, and education.</p>

    <p>When public services are weak or unevenly distributed, disadvantaged communities often suffer most. Poor-quality public goods can reinforce inequality and contribute to crime.</p>

    <h2>Unemployment Among Young Men</h2>
    <p>High unemployment, especially among young men, is another major factor. A lack of stable work can push young people toward informal or criminal activity. In some places, rising unemployment has been linked directly to increases in homicide.</p>

    <p>Violence can also damage employment. In areas where homicide rates increase, businesses may leave, investment may fall, and job opportunities may shrink.</p>

    <h2>Low-Quality Education</h2>
    <p>Low-quality education and poor school retention are also associated with violence. Where schools have low enrollment, poor teaching quality, and high absenteeism, rates of lethal violence are often higher.</p>

    <p>The problem is not always the amount of money spent on education. In some countries, education funding is poorly distributed or weakened by corruption, which hinders students’ performance.</p>

    <h2>High Impunity</h2>
    <p>Impunity is one of the most serious problems in the region. In many countries, only a small percentage of murders lead to convictions. When criminals believe they are unlikely to be punished, the cost of killing becomes very low.</p>

    <p>High impunity weakens public trust in police, courts, and the criminal justice system. This is especially serious in areas where institutions are already weak or overwhelmed.</p>

    <h2>Condoning Violence</h2>
    <p>In some communities, people may begin to solve disputes through violence because they do not trust the state to protect them. This can lead to vigilante groups, self-defense groups, and militias.</p>

    <p>Although some groups begin as neighborhood protection organizations, many later become criminal enterprises involved in extortion, illegal services, and organized crime.</p>

    <h2>Weak States and Informality</h2>
    <p>High crime is also connected to weak state control and widespread informality. Wealthier people may buy private security and protect themselves with walls, fences, and guards, while poorer communities are left to defend themselves.</p>

    <p>The private security industry has grown in countries such as Mexico, but weak oversight can create new problems, including corruption, human rights abuses, and excessive force.</p>

    <h2>Unregulated Urbanization</h2>
    <p>Latin America urbanized very quickly. Many people moved into cities before governments could provide proper housing, transport, policing, and public services.</p>

    <p>This produced informal settlements, favelas, and shanty towns in marginalized areas. Rapid urbanization and concentrated disadvantage are strongly linked to crime.</p>

    <h2>Organized Criminal Groups</h2>
    <p>The proliferation of organized criminal groups is another major cause of violence. These groups include cartels, prison gangs, street gangs, transnational gangs, paramilitary groups, militias, and criminal syndicates.</p>

    <p>In Mexico, larger cartels have splintered into smaller groups that often rely on local crimes such as extortion. In Brazil, prison gangs and militias play a major role in the drug trade and urban violence.</p>

    <h2>The Drug Trade</h2>
    <p>The drug trade is connected to much of Latin America’s violence. The region contains the world’s main producers of cocaine, and the profits from drugs are extremely high.</p>

    <p>Because the drug business is incredibly lucrative, criminal groups compete violently for territory, smuggling routes, and local markets. The rise of synthetic drugs has also contributed to violence in some areas.</p>

    <h2>Guns and Alcohol</h2>
    <p>Guns and alcohol are another dangerous combination. In areas where alcohol is easily available and firearms are widespread, violence becomes more likely.</p>

    <p>A large share of homicides in Latin America are gun-related. Illegal firearms, weak regulation, and illicit alcohol markets all contribute to the problem.</p>

    <h2>Crime Clusters in Specific Places</h2>
    <p>Violence is not random. Homicide often clusters in specific neighborhoods, at specific times, and among specific groups. In many cities, a small number of streets or districts account for a very large share of murders.</p>

    <p>This concentration also offers opportunities for intervention. Focused policing, social prevention, youth programs, and urban design can help reduce violence when they target the right places and groups.</p>
  `,
  vocabulary: [
    {
      word: "about one-third of its homicides",
      wordType: "phrase",
      definition: "roughly 33% of the world’s murders happen there",
      example: "Latin America has about one-third of the world’s homicides.",
    },
    {
      word: "bloodshed is not evenly distributed",
      wordType: "phrase",
      definition: "violence is concentrated in certain areas, not spread equally",
      example: "The bloodshed is not evenly distributed across the region.",
    },
    {
      word: "has increased annually over the past decade",
      wordType: "phrase",
      definition: "has risen every year during the last ten years",
      example: "The regional homicide rate has increased annually over the past decade.",
    },
    {
      word: "recent economic slowdown has endangered gains",
      wordType: "phrase",
      definition: "economic problems threaten previously achieved progress",
      example: "The recent economic slowdown has endangered gains in reducing inequality.",
    },
    {
      word: "large disparities in wealth",
      wordType: "phrase",
      definition: "big differences between rich and poor people",
      example: "Large disparities in wealth can create social tension.",
    },
    {
      word: "substandard provision of public goods",
      wordType: "phrase",
      definition: "poor-quality government services such as policing, healthcare, or education",
      example: "Poor neighborhoods often suffer from substandard provision of public goods.",
    },
    {
      word: "high rates of unemployment translate directly to crime",
      wordType: "phrase",
      definition: "more unemployment can clearly lead to more crime",
      example: "In some areas, high rates of unemployment translate directly to crime.",
    },
    {
      word: "a 10-percentage-point increase in homicide rates",
      wordType: "phrase",
      definition: "homicides rise by 10 percentage points in a given population",
      example: "A 10-percentage-point increase in homicide rates can damage local employment.",
    },
    {
      word: "low-quality education and poor school retention",
      wordType: "phrase",
      definition: "weak education systems with many students dropping out",
      example: "Low-quality education and poor school retention are linked to violence.",
    },
    {
      word: "hinder students’ performance",
      wordType: "phrase",
      definition: "make it harder for students to learn or achieve good results",
      example: "Poor teaching methods can hinder students’ performance.",
    },
    {
      word: "inability to hold perpetrators to account",
      wordType: "phrase",
      definition: "failure to punish criminals effectively",
      example: "The inability to hold perpetrators to account increases impunity.",
    },
    {
      word: "impunity undermines public perception of the police",
      wordType: "phrase",
      definition: "lack of punishment reduces trust in law enforcement",
      example: "Impunity undermines public perception of the police and courts.",
    },
    {
      word: "a culture of violence",
      wordType: "phrase",
      definition: "social norms that accept or normalize violence",
      example: "Some communities may develop a culture of violence.",
    },
    {
      word: "proliferation of militia",
      wordType: "phrase",
      definition: "fast spread and growth of unofficial armed groups",
      example: "The proliferation of militia has worsened insecurity in some areas.",
    },
    {
      word: "unregulated urbanization",
      wordType: "phrase",
      definition: "cities growing rapidly without proper planning or control",
      example: "Unregulated urbanization can create unsafe urban areas.",
    },
    {
      word: "rapid informalization and peripheralization",
      wordType: "phrase",
      definition: "people moving into informal housing on the edges of cities",
      example: "Rapid informalization and peripheralization created large informal settlements.",
    },
    {
      word: "surge in population growth",
      wordType: "phrase",
      definition: "a fast and large increase in the number of people",
      example: "A surge in population growth put pressure on public services.",
    },
    {
      word: "the proliferation of organized criminal groups",
      wordType: "phrase",
      definition: "the increasing number of gangs and crime networks",
      example: "The proliferation of organized criminal groups has intensified violence.",
    },
    {
      word: "incredibly lucrative business",
      wordType: "phrase",
      definition: "an extremely profitable activity",
      example: "Drug trafficking is an incredibly lucrative business.",
    },
    {
      word: "clustering presents avenues for intervention",
      wordType: "phrase",
      definition: "concentrated crime patterns create opportunities for targeted solutions",
      example: "Crime clustering presents avenues for intervention by police and communities.",
    },
  ],
  pronunciation: [
    {
      word: "homicides",
      ipa: "/HOM-uh-sydz/",
      syllables: "hom-i-cides",
      tip: "Stress HOM. The ending sounds like 'sydz'.",
    },
    {
      word: "heterogeneous",
      ipa: "/het-uh-roh-JEE-nee-us/",
      syllables: "het-er-o-ge-ne-ous",
      tip: "Stress JEE.",
    },
    {
      word: "inequality",
      ipa: "/in-i-KWOL-uh-tee/",
      syllables: "in-e-qual-i-ty",
      tip: "Stress KWOL.",
    },
    {
      word: "disparities",
      ipa: "/dis-PAIR-uh-teez/",
      syllables: "dis-par-i-ties",
      tip: "Stress PAIR.",
    },
    {
      word: "perpetrators",
      ipa: "/PUR-puh-tray-terz/",
      syllables: "per-pe-tra-tors",
      tip: "Stress PUR.",
    },
    {
      word: "impunity",
      ipa: "/im-PYOO-nuh-tee/",
      syllables: "im-pu-ni-ty",
      tip: "Stress PYOO.",
    },
    {
      word: "vigilante",
      ipa: "/vij-uh-LAN-tee/",
      syllables: "vig-i-lan-te",
      tip: "Stress LAN.",
    },
    {
      word: "urbanization",
      ipa: "/ur-buh-nuh-ZAY-shun/",
      syllables: "ur-ban-i-za-tion",
      tip: "Stress ZAY.",
    },
    {
      word: "proliferation",
      ipa: "/pruh-lif-uh-RAY-shun/",
      syllables: "pro-lif-er-a-tion",
      tip: "Stress RAY.",
    },
    {
      word: "lucrative",
      ipa: "/LOO-kruh-tiv/",
      syllables: "lu-cra-tive",
      tip: "Stress LOO.",
    },
  ],
},
   {
    id: "a4",
    slug: "why-to-study",
    title: "WHY TO STUDY?",
    category: "Reading",
    topic: "Education",
    difficulty: "Intermediate",
    coverImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80",
    date: "2024-08-24",
    description: "Education is a key part of a society’s growth and progress.",
    readingTime: 5,
    content: `
      <p><strong>Do you think attending school and doing projects for your college is a waste of time?</strong> If you do, you might want to reconsider that claim, as education is a key part of a society’s growth and progress.</p>
      <p>When people are educated, they can significantly contribute to their families and society in various aspects and fields, thus creating a stable and stimulating community.</p>
      <h2>Creating More Employment Opportunities</h2>
      <p>Finding a job is not easy, especially in times of economic turmoil. With the right qualifications and educational background, you can increase your chances of landing a fulfilling job and stand out from a pool of applicants.</p>
      <h2>Securing a Higher Income</h2>
      <p>People with higher education and varied experience are more likely to get high-paying, expert jobs. Study hard and acquire knowledge if you would like to lead a comfortable lifestyle.</p>
      <h2>Developing Problem-solving Skills</h2>
      <p>Education teaches us how to develop critical and logical thinking, make independent decisions, and support our opinions with reliable arguments and evidence.</p>
      <h2>Improving the Economy</h2>
      <p>People with good academic backgrounds tend to get well-paid jobs. Education helps countries grow economically because people can apply knowledge wisely and improve other people’s lives.</p>
      <h2>Providing a Prosperous and Happy Life</h2>
      <p>Education helps people gain a better reputation, climb the career ladder, secure financial resources, and create a positive environment for families and communities.</p>
      <h2>Giving Back to the Community</h2>
      <p>Educated people understand the value of a stable and secure community. They are more likely to take part in projects that improve their neighborhood and society.</p>
      <h2>Creating Modern Society</h2>
      <p>Education molds people into leaders with knowledge, emotions, and true values. It helps people differentiate between right and wrong and can reduce the crime rate.</p>
      <h2>Bridging the Borders</h2>
      <p>Digital education helps connect people and organizations around the world. It widens horizons and helps us understand and appreciate each other.</p>
      <h2>Creating Equal Opportunities</h2>
      <p>Education offers the possibility to live independently and protects people against financial storms and wrong decisions.</p>
      <h2>Introducing Empowerment</h2>
      <p>Education turns weakness into strength, improves decision-making capabilities, and teaches people to live in harmony.</p>
    `,
    vocabulary: [
      { word: "economic turmoil", wordType: "collocation", definition: "a period of serious financial or economic problems", example: "Finding a job is harder in times of economic turmoil." },
      { word: "vacant position", wordType: "collocation", definition: "a job that is available", example: "Hundreds of candidates may apply for one vacant position." },
      { word: "educational background", wordType: "collocation", definition: "a person’s education and qualifications", example: "Your educational background can help you get a better job." },
      { word: "fulfilling job", wordType: "collocation", definition: "a job that gives satisfaction", example: "Education can increase your chances of landing a fulfilling job." },
      { word: "pool of applicants", wordType: "collocation", definition: "the group of people applying for a job", example: "Extra qualifications help you stand out from a pool of applicants." },
      { word: "high-paying job", wordType: "collocation", definition: "a job that gives a good salary", example: "Higher education may lead to a high-paying job." },
      { word: "critical thinking", wordType: "collocation", definition: "careful and logical thinking", example: "Education helps students develop critical thinking." },
      { word: "sound decisions", wordType: "collocation", definition: "wise and reliable decisions", example: "Educated people are better able to make sound decisions." },
      { word: "reliable arguments", wordType: "collocation", definition: "arguments supported by evidence", example: "Students learn to use reliable arguments in discussions." },
      { word: "career ladder", wordType: "collocation", definition: "the stages of progress in a career", example: "Education can help people climb the career ladder." },
      { word: "financial security", wordType: "collocation", definition: "having enough money to live safely", example: "A good education may provide financial security." },
      { word: "decision-making capabilities", wordType: "collocation", definition: "the ability to make choices effectively", example: "Education improves people’s decision-making capabilities." },
    ],
    pronunciation: [
      { word: "education", ipa: "/ed-yoo-KAY-shun/", syllables: "ed-u-ca-tion", tip: "Stress the third syllable: KAY." },
      { word: "opportunity", ipa: "/op-er-TOO-nuh-tee/", syllables: "op-por-tu-ni-ty", tip: "Stress TOO." },
      { word: "qualification", ipa: "/kwol-uh-fi-KAY-shun/", syllables: "qual-i-fi-ca-tion", tip: "Stress KAY." },
      { word: "prosperous", ipa: "/PROS-per-us/", syllables: "pros-per-ous", tip: "Stress the first syllable." },
      { word: "community", ipa: "/kuh-MYOO-nuh-tee/", syllables: "com-mu-ni-ty", tip: "Stress MYOO." },
      { word: "empowerment", ipa: "/im-POW-er-ment/", syllables: "em-pow-er-ment", tip: "Stress POW." },
    ],
  },
  {
    id: "a5",
    slug: "studying-101-study-smarter-not-harder",
    title: "Studying 101: Study Smarter Not Harder",
    category: "Reading",
    topic: "Education",
    difficulty: "Intermediate",
    coverImage: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1600&q=80",
    date: "2024-08-24",
    description: "Many students realize that their high school study habits aren’t very effective in college.",
    readingTime: 6,
    content: `
      <p><strong>Do you ever feel like your study habits simply aren’t cutting it?</strong> Many students discover that the habits they used in high school are not always effective in college.</p>
      <p>College classes can be bigger, exams can be worth more, reading can be more intense, and courses can be more rigorous. This means students often need more active and effective study skills.</p>
      <h2>Reading is not studying</h2>
      <p>Simply reading and re-reading texts or notes is not the same as active studying. Re-reading often leads to quick forgetting.</p>
      <p>Learning information requires active engagement, such as making connections to lectures, forming examples, and regulating your own learning.</p>
      <h2>Ideas for active studying</h2>
      <p>Students can create study guides, formulate questions, teach the information aloud, make concept maps, work through problems, and study in terms of question, evidence, and conclusion.</p>
      <h2>Understand the Study Cycle</h2>
      <p>The Study Cycle includes previewing, attending class, reviewing, studying, and checking your understanding. Skipping one stage may mean missing an important learning opportunity.</p>
      <h2>Spacing out is good</h2>
      <p>Distributed practice means studying over several short periods across days and weeks. It helps students learn more deeply and retain information for the long term.</p>
      <h2>It’s good to be intense</h2>
      <p>Short, intensive study sessions can be more effective than long, drawn-out sessions. Self-testing for 30 or 45 minutes can improve attention and memory.</p>
      <h2>Silence isn’t golden</h2>
      <p>Some students concentrate better with background noise. Active studying is also rarely silent because it often requires saying the material aloud.</p>
      <h2>Problems are your friend</h2>
      <p>In technical courses, working and re-working problems is often more important than simply reading the textbook.</p>
      <h2>Reconsider multitasking</h2>
      <p>Research shows that multitasking can increase the time needed to learn material and decrease the quality of learning.</p>
      <h2>Become a teacher</h2>
      <p>Explaining material in your own words helps reveal confusion, strengthen memory, and make connections between concepts.</p>
      <h2>Take control of your calendar</h2>
      <p>Planning your week, checking your available time, and adjusting your tasks can help you stay on top of coursework.</p>
    `,
    vocabulary: [
      { word: "study habits", wordType: "collocation", definition: "regular ways of studying", example: "Good study habits help students perform better." },
      { word: "perform better", wordType: "collocation", definition: "do something more successfully", example: "Students want to perform better on exams." },
      { word: "active engagement", wordType: "collocation", definition: "direct and thoughtful involvement", example: "Learning requires active engagement with the material." },
      { word: "rote memorization", wordType: "collocation", definition: "memorizing by repetition without deep understanding", example: "Rote memorization is not always effective." },
      { word: "concept maps", wordType: "collocation", definition: "diagrams that show relationships between ideas", example: "Concept maps can explain difficult material." },
      { word: "study guide", wordType: "collocation", definition: "notes or questions used for revision", example: "Create a study guide by topic." },
      { word: "distributed practice", wordType: "collocation", definition: "studying in short sessions over time", example: "Distributed practice helps students remember information." },
      { word: "long-term retention", wordType: "collocation", definition: "remembering information for a long time", example: "Spacing out study improves long-term retention." },
      { word: "intensive study session", wordType: "collocation", definition: "a short but focused study period", example: "An intensive study session may last 45 minutes." },
      { word: "background noise", wordType: "collocation", definition: "sound that is present but not the main focus", example: "Some people study better with background noise." },
      { word: "eliminate distractions", wordType: "collocation", definition: "remove things that stop concentration", example: "You should eliminate distractions while studying." },
      { word: "stay on top of coursework", wordType: "phrase", definition: "manage school tasks well and on time", example: "A calendar helps students stay on top of coursework." },
    ],
    pronunciation: [
      { word: "rigorous", ipa: "/RIG-er-us/", syllables: "rig-or-ous", tip: "Stress the first syllable." },
      { word: "actively", ipa: "/AK-tiv-lee/", syllables: "ac-tive-ly", tip: "Stress AK." },
      { word: "metacognition", ipa: "/met-uh-kog-NISH-un/", syllables: "met-a-cog-ni-tion", tip: "Stress NISH." },
      { word: "distributed", ipa: "/di-STRIB-yoo-tid/", syllables: "dis-trib-ut-ed", tip: "Stress STRIB." },
      { word: "procrastination", ipa: "/pro-kras-tuh-NAY-shun/", syllables: "pro-cras-ti-na-tion", tip: "Stress NAY." },
      { word: "multitasking", ipa: "/mul-tee-TASK-ing/", syllables: "mul-ti-task-ing", tip: "Stress TASK." },
    ],
  },
  {
    id: "a6",
    slug: "fitness-is-hard-to-recover-after-birth",
    title: "Fitness is hard to recover after birth",
    category: "Reading",
    topic: "Health",
    difficulty: "Intermediate",
    coverImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1600&q=80",
    date: "2024-08-24",
    description: "Even the fittest women struggle to regain their physical health after being pregnant.",
    readingTime: 3,
    content: `
      <p><strong>Getting back into shape after having a baby is hard, even for women who were fit and strong before becoming pregnant.</strong></p>
      <p>Pregnancy is known to put stress on many parts of the body, including the heart, lungs, muscles and joints. However, little research has assessed the long-term effects of pregnancy on fitness.</p>
      <p>David DeGroot and his colleagues studied 460 women who became pregnant while in the military. Before pregnancy, these women had high levels of fitness because they were active-duty soldiers.</p>
      <p>Even with dedicated training, many of the women struggled to regain their fitness. One year after giving birth, only 30 per cent achieved the same score they had before pregnancy in the US Army Physical Fitness Test.</p>
      <p>By three years after delivery, 75 per cent had matched their pre-pregnancy scores. Sit-up ability and running times declined the most.</p>
      <p>Experts say abdominal muscles are stretched during pregnancy, so sit-ups are especially hard to recover. Running may also slow because it takes time to shed pregnancy weight.</p>
      <p>Lifestyle factors such as lack of time to exercise, disrupted sleep and negative self-image can also hamper new mothers’ fitness recovery.</p>
      <p>Getting fit before pregnancy and staying active during pregnancy can help women regain fitness faster after birth.</p>
    `,
    vocabulary: [
      { word: "get back into shape", wordType: "phrase", definition: "become fit again", example: "It can be hard to get back into shape after pregnancy." },
      { word: "put stress on", wordType: "phrase", definition: "place physical or mental pressure on something", example: "Pregnancy can put stress on the body." },
      { word: "long-term effects", wordType: "collocation", definition: "results that continue for a long time", example: "Researchers studied the long-term effects of pregnancy." },
      { word: "high levels of fitness", wordType: "collocation", definition: "strong physical condition", example: "The soldiers had high levels of fitness before pregnancy." },
      { word: "active-duty soldiers", wordType: "collocation", definition: "soldiers currently serving in the military", example: "The women were active-duty soldiers." },
      { word: "dedicated training", wordType: "collocation", definition: "serious and regular training", example: "Even dedicated training did not help everyone recover quickly." },
      { word: "regain fitness", wordType: "collocation", definition: "recover physical fitness", example: "Many women struggled to regain fitness." },
      { word: "pre-pregnancy scores", wordType: "collocation", definition: "test results from before pregnancy", example: "Some women matched their pre-pregnancy scores after three years." },
      { word: "abdominal muscles", wordType: "collocation", definition: "muscles in the stomach area", example: "Abdominal muscles stretch during pregnancy." },
      { word: "shed excess weight", wordType: "collocation", definition: "lose extra weight", example: "It takes time to shed excess pregnancy weight." },
      { word: "disrupted sleep", wordType: "collocation", definition: "sleep that is frequently interrupted", example: "Disrupted sleep may affect fitness recovery." },
      { word: "negative self-image", wordType: "collocation", definition: "a poor opinion of one’s appearance or body", example: "Negative self-image can hamper recovery." },
    ],
    pronunciation: [
      { word: "pregnancy", ipa: "/PREG-nun-see/", syllables: "preg-nan-cy", tip: "Stress the first syllable." },
      { word: "military", ipa: "/MIL-uh-ter-ee/", syllables: "mil-i-ta-ry", tip: "Stress MIL." },
      { word: "physical", ipa: "/FIZ-i-kul/", syllables: "phys-i-cal", tip: "Stress FIZ." },
      { word: "abdominal", ipa: "/ab-DOM-uh-nul/", syllables: "ab-dom-i-nal", tip: "Stress DOM." },
      { word: "recovery", ipa: "/ri-KUV-er-ee/", syllables: "re-cov-er-y", tip: "Stress KUV." },
      { word: "vigorous", ipa: "/VIG-er-us/", syllables: "vig-or-ous", tip: "Stress VIG." },
    ],
  },
  {
    id: "a7",
    slug: "good-reasons-to-pick-peppers",
    title: "Good Reasons to Pick Peppers",
    category: "Reading",
    topic: "Health",
    difficulty: "Intermediate",
    coverImage: "https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?auto=format&fit=crop&w=1600&q=80",
    date: "2024-08-24",
    description: "Whether sweet or hot, peppers pack a nutrition and flavor punch.",
    readingTime: 4,
    content: `
      <p><strong>If you want to add some zing to your next meal or snack, pick up some peppers.</strong> Fall is when they are at their peak, full of sweet, sharp, or fiery flavor.</p>
      <p>Peppers are low in calories but packed with nutrients. They supply potassium, fiber, and vitamins A and C, which support the immune system.</p>
      <h2>Turn Up the Heat</h2>
      <p>Hot peppers get their heat from capsaicin, a compound that may combat inflammation and promote blood flow. Some research has linked regular hot pepper consumption with a lower risk of cardiovascular disease.</p>
      <h2>Do They Cause Digestive Woes?</h2>
      <p>Spicy peppers do not damage the digestive system, but they can irritate the gastrointestinal tract in some people and cause temporary discomfort such as heartburn or diarrhea.</p>
      <h2>Pick Your Pepper</h2>
      <p>Every pepper has its own unique flavor and heat. Heat is measured on the Scoville scale, from sweet bell peppers to very hot habaneros.</p>
      <p>Sweet peppers can be added raw or sautéed to salads, stir-fries, and sandwiches. Hot peppers can add mild spice or extra fire depending on the type.</p>
      <p>When handling hot peppers, wear gloves and wash your hands and utensils afterward. If food is too hot, dairy products may help cool the burn.</p>
    `,
    vocabulary: [
      { word: "add some zing", wordType: "phrase", definition: "make something more lively or exciting", example: "Peppers can add some zing to a meal." },
      { word: "at their peak", wordType: "phrase", definition: "at their best condition", example: "Peppers are at their peak in fall." },
      { word: "packed with nutrients", wordType: "collocation", definition: "containing many healthy substances", example: "Peppers are packed with nutrients." },
      { word: "immune system", wordType: "collocation", definition: "the body system that fights disease", example: "Vitamin C supports the immune system." },
      { word: "combat inflammation", wordType: "collocation", definition: "fight swelling or irritation in the body", example: "Capsaicin may combat inflammation." },
      { word: "promote blood flow", wordType: "collocation", definition: "help blood move through the body", example: "Hot peppers may promote blood flow." },
      { word: "cardiovascular disease", wordType: "collocation", definition: "disease of the heart or blood vessels", example: "Hot peppers may lower the risk of cardiovascular disease." },
      { word: "digestive system", wordType: "collocation", definition: "the body system that breaks down food", example: "Spicy food does not usually damage the digestive system." },
      { word: "gastrointestinal tract", wordType: "collocation", definition: "the stomach and intestines", example: "Hot peppers may irritate the gastrointestinal tract." },
      { word: "temporary discomfort", wordType: "collocation", definition: "short-lasting unpleasant feeling", example: "Some people feel temporary discomfort after spicy food." },
      { word: "unique flavor", wordType: "collocation", definition: "a special taste", example: "Each pepper has a unique flavor." },
      { word: "cool the burn", wordType: "phrase", definition: "reduce the hot feeling from spicy food", example: "Milk can help cool the burn." },
    ],
    pronunciation: [
      { word: "nutrients", ipa: "/NOO-tree-ents/", syllables: "nu-tri-ents", tip: "Stress NOO." },
      { word: "capsaicin", ipa: "/kap-SAY-sin/", syllables: "cap-sa-i-cin", tip: "Stress SAY." },
      { word: "inflammation", ipa: "/in-fluh-MAY-shun/", syllables: "in-flam-ma-tion", tip: "Stress MAY." },
      { word: "cardiovascular", ipa: "/kar-dee-oh-VAS-kyuh-ler/", syllables: "car-di-o-vas-cu-lar", tip: "Stress VAS." },
      { word: "diarrhea", ipa: "/dye-uh-REE-uh/", syllables: "di-ar-rhe-a", tip: "Stress REE." },
      { word: "habanero", ipa: "/hah-buh-NAIR-oh/", syllables: "ha-ba-ne-ro", tip: "Stress NAIR." },
    ],
  },
  {
    id: "a8",
    slug: "homeworking-shouldnt-be-a-health-risk",
    title: "Homeworking Shouldn’t Be a Health Risk",
    category: "Reading",
    topic: "Work",
    difficulty: "Intermediate",
    coverImage: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?auto=format&fit=crop&w=1600&q=80",
    date: "2024-08-24",
    description: "After rushing to exit the office, employers need to reassess conditions for remote workers.",
    readingTime: 4,
    content: `
      <p><strong>When the office exodus began in March, few were ready.</strong> People left hastily, thinking their offices would only be shut for a couple of weeks.</p>
      <p>As a result, a lot of important equipment was left behind. Many people had to work from sofas, beds, kitchen tables, or even the floor.</p>
      <p>The worst offenders are company-issued laptops used for long stretches without external equipment such as a keyboard, mouse, or larger monitor.</p>
      <p>Experts say this can increase the risk of neck and upper back discomfort. Working this way may be acceptable for a few days, but not for months.</p>
      <p>The sofa may feel comfortable at first, but it encourages people to slump, round their shoulders, and put their head forward, which creates greater strain on the body.</p>
      <p>Employers may not always be legally forced to buy every worker a desk and chair, but they still have a duty of care to protect employees’ health and safety.</p>
      <p>In the medium to long term, employers should conduct proper risk assessments of remote workers’ environments.</p>
    `,
    vocabulary: [
      { word: "office exodus", wordType: "collocation", definition: "a large movement of people leaving offices", example: "The office exodus began suddenly." },
      { word: "left hastily", wordType: "collocation", definition: "left very quickly", example: "Workers left hastily during the lockdown." },
      { word: "important equipment", wordType: "collocation", definition: "tools needed to work properly", example: "Important equipment was left behind." },
      { word: "company-issued laptop", wordType: "collocation", definition: "a laptop provided by an employer", example: "Many people used a company-issued laptop at home." },
      { word: "long stretches", wordType: "collocation", definition: "long periods of time", example: "Using laptops for long stretches can cause discomfort." },
      { word: "external equipment", wordType: "collocation", definition: "extra devices connected to a computer", example: "A keyboard and mouse are useful external equipment." },
      { word: "upper back discomfort", wordType: "collocation", definition: "pain or unpleasant feeling in the upper back", example: "Poor posture can cause upper back discomfort." },
      { word: "greater strain", wordType: "collocation", definition: "more physical pressure", example: "Slumping puts greater strain on the body." },
      { word: "statutory duty", wordType: "collocation", definition: "a duty required by law", example: "Employers have a statutory duty of care." },
      { word: "duty of care", wordType: "collocation", definition: "responsibility to protect someone’s health and safety", example: "Companies have a duty of care for employees." },
      { word: "risk assessment", wordType: "collocation", definition: "a check of possible dangers", example: "Employers should conduct a risk assessment." },
      { word: "remote workers", wordType: "collocation", definition: "people working away from the office", example: "Remote workers need safe working conditions." },
    ],
    pronunciation: [
      { word: "exodus", ipa: "/EK-suh-dus/", syllables: "ex-o-dus", tip: "Stress EK." },
      { word: "equipment", ipa: "/i-KWIP-ment/", syllables: "e-quip-ment", tip: "Stress KWIP." },
      { word: "ergonomic", ipa: "/er-guh-NOM-ik/", syllables: "er-go-nom-ic", tip: "Stress NOM." },
      { word: "postural", ipa: "/POS-cher-uhl/", syllables: "pos-tur-al", tip: "Stress POS." },
      { word: "statutory", ipa: "/STACH-oo-tor-ee/", syllables: "stat-u-to-ry", tip: "Stress STACH." },
      { word: "assessment", ipa: "/uh-SES-ment/", syllables: "as-sess-ment", tip: "Stress SES." },
    ],
  },
  {
    id: "a9",
    slug: "a-sticky-subject",
    title: "A sticky subject",
    category: "Reading",
    topic: "Science",
    difficulty: "Advanced",
    coverImage: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1600&q=80",
    date: "2024-08-24",
    description: "Surfaces rarely get a second thought, but a new book explains the fascinating science behind them.",
    readingTime: 5,
    content: `
      <p><strong>Watching paint dry is not normally exciting, but there is more happening at the surface than meets the eye.</strong></p>
      <p>Laurie Winkless’s book <em>Sticky: The Secret Science of Surfaces</em> explores the forces at play when materials come into contact.</p>
      <p>The book begins by challenging familiar ideas such as stickiness and slipperiness. What matters is the interaction where one surface meets another.</p>
      <p>Paint, for example, depends on chemical reactions: how pigments and binders mix and how the paint dries in the air.</p>
      <p>At the heart of many surface interactions is friction, the force that resists motion when surfaces slide against each other.</p>
      <p>One example is the gecko, whose feet can stick to and unstick from many surfaces, even inverted or slippery ones. Tiny hairs on its toes help switch stickiness on and off.</p>
      <p>Geckos have inspired robots that climb surfaces and adhesive handpads that allow humans to climb glass walls.</p>
      <p>Scientists still do not fully understand friction at every scale, but surface science has already helped us design, build, join, and improve objects in the world around us.</p>
    `,
    vocabulary: [
      { word: "meets the eye", wordType: "phrase", definition: "is immediately visible or obvious", example: "There is more to surfaces than meets the eye." },
      { word: "surface interactions", wordType: "collocation", definition: "ways in which surfaces affect each other", example: "Surface interactions are central to the book." },
      { word: "forces at play", wordType: "collocation", definition: "forces that are active in a situation", example: "The book studies the forces at play between materials." },
      { word: "come into contact", wordType: "collocation", definition: "touch each other", example: "Materials behave differently when they come into contact." },
      { word: "chemical reactions", wordType: "collocation", definition: "processes where substances change", example: "Paint depends on chemical reactions." },
      { word: "pigments and binders", wordType: "collocation", definition: "color particles and substances that hold them together", example: "Pigments and binders affect how paint dries." },
      { word: "resists motion", wordType: "collocation", definition: "works against movement", example: "Friction resists motion." },
      { word: "slide against", wordType: "phrase", definition: "move while touching another surface", example: "Friction occurs when surfaces slide against each other." },
      { word: "electrostatic forces", wordType: "collocation", definition: "forces caused by electric charges", example: "Gecko feet use small electrostatic forces." },
      { word: "adhesive handpads", wordType: "collocation", definition: "sticky pads used by hands", example: "Geckos inspired adhesive handpads." },
      { word: "atomic scale", wordType: "collocation", definition: "the level of atoms", example: "Scientists study friction on the atomic scale." },
      { word: "precision instruments", wordType: "collocation", definition: "tools designed for very accurate work", example: "Surface science may help design precision instruments." },
    ],
    pronunciation: [
      { word: "surface", ipa: "/SUR-fis/", syllables: "sur-face", tip: "Stress SUR." },
      { word: "friction", ipa: "/FRIK-shun/", syllables: "fric-tion", tip: "Stress FRIK." },
      { word: "hydrophilic", ipa: "/hy-droh-FIL-ik/", syllables: "hy-dro-phil-ic", tip: "Stress FIL." },
      { word: "hydrophobic", ipa: "/hy-droh-FOH-bik/", syllables: "hy-dro-pho-bic", tip: "Stress FOH." },
      { word: "electrostatic", ipa: "/i-lek-troh-STAT-ik/", syllables: "e-lec-tro-stat-ic", tip: "Stress STAT." },
      { word: "nanoscale", ipa: "/NAN-oh-skayl/", syllables: "nan-o-scale", tip: "Stress NAN." },
    ],
  },
  {
    id: "a10",
    slug: "quantum-computer-helps-design-a-better-quantum-computer",
    title: "Quantum computer helps design a better quantum computer",
    category: "Reading",
    topic: "Technology",
    difficulty: "Advanced",
    coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1600&q=80",
    date: "2024-08-24",
    description: "A quantum computer has been used to design an improved quantum bit, or qubit.",
    readingTime: 5,
    content: `
      <p><strong>A quantum computer has been used to design an improved quantum bit, or qubit, that could power the next generation of quantum computers.</strong></p>
      <p>As classical computer chips became more complex, it became impractical to design them manually. Computers have long been used to optimize new chip designs.</p>
      <p>However, simulating a quantum processor inside a classical computer is extremely difficult because the required computing resources grow exponentially as each new qubit is added.</p>
      <p>Chao-Yang Lu and colleagues used a quantum algorithm to run simulations. Their research led to a new type of qubit called a plasonium.</p>
      <p>The plasonium is smaller, less noisy, and able to retain its state longer than the team’s current qubit design.</p>
      <p>The team used a variational quantum eigensolver, an algorithm often used in quantum chemistry, to calculate energy levels and improve the circuit design.</p>
      <p>Plasonium qubits are only 240 micrometres long, about 40 per cent of the size of the team’s current transmon design.</p>
      <p>Reducing noise is a vital hurdle for quantum computers because future machines may need millions or billions of qubits to perform useful tasks.</p>
    `,
    vocabulary: [
      { word: "quantum bit", wordType: "collocation", definition: "the basic unit of information in quantum computing", example: "A qubit is a quantum bit." },
      { word: "next generation", wordType: "collocation", definition: "the future version of technology", example: "The qubit could power the next generation of computers." },
      { word: "classical computer chips", wordType: "collocation", definition: "ordinary computer processing chips", example: "Classical computer chips became more complex." },
      { word: "design manually", wordType: "collocation", definition: "create by hand without automated tools", example: "It became impractical to design chips manually." },
      { word: "computing resources", wordType: "collocation", definition: "processing power and memory needed for a task", example: "Quantum simulation needs huge computing resources." },
      { word: "grow exponentially", wordType: "collocation", definition: "increase very rapidly", example: "The resources required grow exponentially." },
      { word: "run simulations", wordType: "collocation", definition: "use a model to test how something behaves", example: "Researchers used a quantum algorithm to run simulations." },
      { word: "retain its state", wordType: "collocation", definition: "keep its condition or information", example: "The new qubit can retain its state longer." },
      { word: "energy levels", wordType: "collocation", definition: "specific amounts of energy in a system", example: "The algorithm calculated energy levels." },
      { word: "physical prototypes", wordType: "collocation", definition: "real test versions of a design", example: "The method avoids building many physical prototypes." },
      { word: "vital hurdle", wordType: "collocation", definition: "a very important obstacle", example: "Reducing noise is a vital hurdle." },
      { word: "useful tasks", wordType: "collocation", definition: "practical jobs or operations", example: "Future quantum computers must carry out useful tasks." },
    ],
    pronunciation: [
      { word: "quantum", ipa: "/KWON-tum/", syllables: "quan-tum", tip: "Stress KWON." },
      { word: "processor", ipa: "/PRO-ses-er/", syllables: "pro-cess-or", tip: "Stress PRO." },
      { word: "algorithm", ipa: "/AL-guh-rith-um/", syllables: "al-go-rithm", tip: "Stress AL." },
      { word: "eigensolver", ipa: "/EYE-gen-sol-ver/", syllables: "ei-gen-sol-ver", tip: "Stress EYE." },
      { word: "micrometre", ipa: "/MY-kroh-mee-ter/", syllables: "mi-cro-me-tre", tip: "Stress MY." },
      { word: "prototype", ipa: "/PROH-tuh-type/", syllables: "pro-to-type", tip: "Stress PROH." },
    ],
  },
  {
    id: "a11",
    slug: "what-to-know-about-the-new-alzheimers-drug",
    title: "What to Know About the New Alzheimer’s Drug",
    category: "Reading",
    topic: "Health",
    difficulty: "Advanced",
    coverImage: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1600&q=80",
    date: "2024-08-24",
    description: "Promising or problematic? How to make sense of the controversy over Aduhelm.",
    readingTime: 5,
    content: `
      <p><strong>The Food and Drug Administration approved aducanumab, known as Aduhelm, the first new drug for Alzheimer’s disease in almost 20 years.</strong></p>
      <p>Some experts consider this a major step, but others disagree, saying there is limited evidence that the drug works and is safe.</p>
      <h2>How does Aduhelm work?</h2>
      <p>The drug is given intravenously once a month. It signals the immune system to break down amyloid plaques, protein clumps in the brain thought to kill brain cells.</p>
      <h2>Does it reduce symptoms?</h2>
      <p>The answer is uncertain because two major clinical trials produced conflicting results. One study suggested slower decline, while the other found no clear benefit.</p>
      <h2>Who is the drug for?</h2>
      <p>It is approved for people in the early stages of Alzheimer’s. Experts say it is unlikely to help people with moderate-to-severe cognitive impairment.</p>
      <h2>Possible side effects</h2>
      <p>In studies, some patients developed brain swelling, sometimes with tiny brain bleeds. Other possible side effects included headaches, confusion, vision changes, nausea, diarrhea, falls, and allergic reactions.</p>
      <h2>Cost and access</h2>
      <p>Insurance coverage is unclear, and treatment may involve high costs because patients also need safety monitoring and brain scans.</p>
      <p>Patients interested in the drug should discuss risks, benefits, and monitoring with an Alzheimer’s disease specialist.</p>
    `,
    vocabulary: [
      { word: "disease progression", wordType: "collocation", definition: "the way a disease gets worse over time", example: "Aduhelm may slow disease progression." },
      { word: "clinical benefit", wordType: "collocation", definition: "real improvement in a patient’s health", example: "Experts questioned the clinical benefit of the drug." },
      { word: "side effects", wordType: "collocation", definition: "unwanted results of a medicine", example: "The drug has possible side effects." },
      { word: "neurological injury", wordType: "collocation", definition: "damage to the brain or nervous system", example: "Some side effects may cause neurological injury." },
      { word: "immune system", wordType: "collocation", definition: "the body system that fights disease", example: "The drug signals the immune system." },
      { word: "amyloid plaques", wordType: "collocation", definition: "protein clumps in the brain linked to Alzheimer’s", example: "Aduhelm targets amyloid plaques." },
      { word: "brain deterioration", wordType: "collocation", definition: "gradual worsening of brain condition", example: "Clearing amyloid could slow brain deterioration." },
      { word: "clinical trials", wordType: "collocation", definition: "research studies that test medical treatments", example: "Two clinical trials had conflicting results." },
      { word: "conflicting results", wordType: "collocation", definition: "results that do not agree", example: "The trials yielded conflicting results." },
      { word: "cognitive impairment", wordType: "collocation", definition: "problems with memory or thinking", example: "The drug is unlikely to help severe cognitive impairment." },
      { word: "brain swelling", wordType: "collocation", definition: "an abnormal increase in brain tissue fluid", example: "Some patients developed brain swelling." },
      { word: "out-of-pocket costs", wordType: "collocation", definition: "money patients pay themselves", example: "Patients may face out-of-pocket costs." },
    ],
    pronunciation: [
      { word: "Alzheimer’s", ipa: "/ALTS-hy-merz/", syllables: "Alz-hei-mer’s", tip: "Stress ALTS." },
      { word: "aducanumab", ipa: "/uh-doo-KAN-yoo-mab/", syllables: "a-du-can-u-mab", tip: "Stress KAN." },
      { word: "intravenously", ipa: "/in-truh-VEE-nus-lee/", syllables: "in-tra-ve-nous-ly", tip: "Stress VEE." },
      { word: "amyloid", ipa: "/AM-uh-loyd/", syllables: "am-y-loid", tip: "Stress AM." },
      { word: "cognitive", ipa: "/KOG-ni-tiv/", syllables: "cog-ni-tive", tip: "Stress KOG." },
      { word: "nausea", ipa: "/NAW-zee-uh/", syllables: "nau-se-a", tip: "Stress NAW." },
    ],
  },
  {
    id: "a12",
    slug: "is-turmeric-good-medicine",
    title: "Is Turmeric Good Medicine?",
    category: "Reading",
    topic: "Health",
    difficulty: "Intermediate",
    coverImage: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1600&q=80",
    date: "2024-08-24",
    description: "The truth about these supplements and inflammation.",
    readingTime: 4,
    content: `
      <p><strong>For hundreds of years, turmeric has been used not just as a flavor enhancer but also as a remedy.</strong></p>
      <p>People have turned to turmeric and curcumin supplements to treat many conditions, especially pain from inflammation linked to osteoarthritis and rheumatoid arthritis.</p>
      <p>However, experts say the evidence is still being debated. Curcumin appears active in preliminary laboratory studies, but there is not yet clear evidence that it is beneficial for people.</p>
      <h2>The science of turmeric</h2>
      <p>One study compared curcumin with diclofenac, a nonsteroidal anti-inflammatory drug used for arthritis pain. It found similar results, but the study had important limitations.</p>
      <p>One reason turmeric supplements may not appear very effective is that curcumin has low bioavailability, meaning very little reaches the bloodstream.</p>
      <p>Some newer supplement formulas are designed to improve absorption. However, higher bioavailability may also increase adverse effects, such as gastrointestinal trouble or interactions with blood-thinning medications.</p>
      <h2>What to try instead</h2>
      <p>For arthritis-related inflammation, doctors may recommend exercise, over-the-counter pain relievers, and dietary changes. Fruits and vegetables contain natural anti-inflammatory compounds and should be part of a healthy diet.</p>
    `,
    vocabulary: [
      { word: "flavor enhancer", wordType: "collocation", definition: "something that improves taste", example: "Turmeric is used as a flavor enhancer." },
      { word: "active component", wordType: "collocation", definition: "the ingredient that creates an effect", example: "Curcumin is an active component of turmeric." },
      { word: "wide variety", wordType: "collocation", definition: "many different types", example: "People use turmeric for a wide variety of ills." },
      { word: "chronic health problems", wordType: "collocation", definition: "health problems that continue for a long time", example: "Some people take supplements for chronic health problems." },
      { word: "preliminary studies", wordType: "collocation", definition: "early research studies", example: "Curcumin appears active in preliminary studies." },
      { word: "clear evidence", wordType: "collocation", definition: "proof that is easy to understand and accept", example: "There is not clear evidence that curcumin helps people." },
      { word: "arthritis pain", wordType: "collocation", definition: "pain caused by arthritis", example: "Diclofenac is used to treat arthritis pain." },
      { word: "placebo group", wordType: "collocation", definition: "a group receiving a fake treatment in a study", example: "The study did not have a placebo group." },
      { word: "low bioavailability", wordType: "collocation", definition: "poor absorption into the bloodstream", example: "Curcumin has low bioavailability." },
      { word: "adverse effects", wordType: "collocation", definition: "harmful or unwanted effects", example: "Better absorption may increase adverse effects." },
      { word: "blood-thinning medications", wordType: "collocation", definition: "medicines that reduce blood clotting", example: "Turmeric may interact with blood-thinning medications." },
      { word: "anti-inflammatory compounds", wordType: "collocation", definition: "substances that reduce inflammation", example: "Fruits and vegetables contain anti-inflammatory compounds." },
    ],
    pronunciation: [
      { word: "turmeric", ipa: "/TUR-mer-ik/", syllables: "tur-mer-ic", tip: "Stress TUR." },
      { word: "curcumin", ipa: "/KUR-kyoo-min/", syllables: "cur-cu-min", tip: "Stress KUR." },
      { word: "osteoarthritis", ipa: "/os-tee-oh-ar-THRY-tis/", syllables: "os-te-o-ar-thri-tis", tip: "Stress THRY." },
      { word: "rheumatoid", ipa: "/ROO-muh-toyd/", syllables: "rheu-ma-toid", tip: "Stress ROO." },
      { word: "bioavailability", ipa: "/by-oh-uh-vay-luh-BIL-uh-tee/", syllables: "bi-o-a-vail-a-bil-i-ty", tip: "Stress BIL." },
      { word: "gastrointestinal", ipa: "/gas-troh-in-TES-tin-ul/", syllables: "gas-tro-in-tes-ti-nal", tip: "Stress TES." },
    ],
  },
  {
    id: "a13",
    slug: "what-secrets-can-baby-black-holes-reveal",
    title: "WHAT SECRETS CAN BABY BLACK HOLES REVEAL?",
    category: "Reading",
    topic: "Space",
    difficulty: "Advanced",
    coverImage: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1600&q=80",
    date: "2024-08-24",
    description: "Feige Wang studies some of the most distant objects ever observed: quasars.",
    readingTime: 5,
    content: `
      <p><strong>When Feige Wang was growing up in Shandong province, China, he liked gazing up at the night sky to look at the stars.</strong></p>
      <p>Now, as a NASA Hubble fellow at the University of Arizona’s Steward Observatory, he studies some of the most distant objects ever observed.</p>
      <p>His targets are quasars: black holes surrounded by disks of gas and stars. Because their light takes billions of years to reach Earth, we see them as they existed long ago.</p>
      <p>In 2021, Wang and his colleagues discovered the farthest quasar yet, called J0313-1806. It is more than 13 billion light-years away.</p>
      <p>This quasar is fascinating because its black hole appears too massive for current theories to explain. Its center is around 1.6 billion times the mass of the sun.</p>
      <p>Some models suggest black holes grow from small seeds left by the first stars, but these explanations cannot fully account for J0313-1806’s size.</p>
      <p>Wang and his colleagues think raw hydrogen may have seeded the massive object, but its true origin remains a mystery.</p>
      <p>Future telescopes may help scientists discover more early quasars and understand how the earliest black holes grew.</p>
    `,
    vocabulary: [
      { word: "night sky", wordType: "collocation", definition: "the sky seen at night", example: "Wang liked gazing at the night sky." },
      { word: "distant objects", wordType: "collocation", definition: "things very far away in space", example: "Quasars are distant objects." },
      { word: "primitive galaxies", wordType: "collocation", definition: "very early galaxies", example: "Quasars are nuclei of primitive galaxies." },
      { word: "nearby matter", wordType: "collocation", definition: "material close to something", example: "Black holes suck in nearby matter." },
      { word: "cosmic time travel", wordType: "collocation", definition: "looking into the past by observing distant light", example: "Distant quasars allow cosmic time travel." },
      { word: "light-years away", wordType: "collocation", definition: "a measure of distance in space", example: "J0313-1806 is more than 13 billion light-years away." },
      { word: "current theories", wordType: "collocation", definition: "scientific explanations accepted now", example: "The quasar challenges current theories." },
      { word: "black hole", wordType: "collocation", definition: "an object whose gravity is so strong that light cannot escape", example: "The quasar contains a massive black hole." },
      { word: "raw hydrogen", wordType: "collocation", definition: "hydrogen gas in a simple natural form", example: "Raw hydrogen may have seeded the black hole." },
      { word: "large-scale environment", wordType: "collocation", definition: "the broad surroundings of an object", example: "Scientists know little about early quasars’ large-scale environment." },
      { word: "current instruments", wordType: "collocation", definition: "tools available now", example: "Observers are limited by current instruments." },
      { word: "next generation", wordType: "collocation", definition: "future and more advanced tools", example: "The next generation of telescopes may reveal more secrets." },
    ],
    pronunciation: [
      { word: "quasar", ipa: "/KWAY-zar/", syllables: "qua-sar", tip: "Stress KWAY." },
      { word: "galaxy", ipa: "/GAL-uk-see/", syllables: "gal-ax-y", tip: "Stress GAL." },
      { word: "immense", ipa: "/ih-MENS/", syllables: "im-mense", tip: "Stress MENS." },
      { word: "astrophysics", ipa: "/as-troh-FIZ-iks/", syllables: "as-tro-phys-ics", tip: "Stress FIZ." },
      { word: "hydrogen", ipa: "/HY-druh-jun/", syllables: "hy-dro-gen", tip: "Stress HY." },
      { word: "observatory", ipa: "/ub-ZUR-vuh-tor-ee/", syllables: "ob-serv-a-to-ry", tip: "Stress ZUR." },
    ],
  },
  {
    id: "a14",
    slug: "stranded-red-mangroves-thrive-inland",
    title: "Stranded red mangroves thrive inland",
    category: "Reading",
    topic: "Environment",
    difficulty: "Advanced",
    coverImage: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1600&q=80",
    date: "2024-08-24",
    description: "Ancient sea level rise displaced a group of normally coastal trees.",
    readingTime: 5,
    content: `
      <p><strong>Nearly 200 kilometers from the sea, red mangroves thrive in the rainforests along the San Pedro Mártir River on the Yucatán Peninsula.</strong></p>
      <p>These tangled trees usually grow in salty coastal water, so scientists wanted to know how they ended up trapped far inland and in freshwater.</p>
      <p>Genetic analyses, vegetation surveys, sediment studies, and sea-level simulations show that the red mangroves are part of a relict ecosystem that has existed for more than 100,000 years.</p>
      <p>During the last interglacial period, warming raised sea levels about nine meters above current levels. The lowlands of what is now the Yucatán Peninsula flooded, and mangrove forests were displaced inland.</p>
      <p>When sea levels later dropped, the trees were left far from the coast. Their survival is remarkable because they are normally adapted to seawater.</p>
      <p>DNA comparisons suggest that the inland mangroves came from about 170 kilometers away along the Gulf of Mexico.</p>
      <p>Other plants in the area also have coastal heritage, and sediments contain coastal gravels, marine shells, and clay rich in shell fragments.</p>
      <p>This relict ecosystem shows the long-term impact of past climate change and may help scientists understand future sea-level rise.</p>
    `,
    vocabulary: [
      { word: "red mangroves", wordType: "collocation", definition: "coastal trees that often grow in salty water", example: "Red mangroves thrive along the river." },
      { word: "Yucatán Peninsula", wordType: "proper noun", definition: "a peninsula in southeastern Mexico", example: "The trees grow on the Yucatán Peninsula." },
      { word: "tangled trees", wordType: "collocation", definition: "trees with twisted or mixed branches and roots", example: "The mangroves are tangled trees." },
      { word: "freshwater", wordType: "noun", definition: "water that is not salty", example: "The mangroves are now found in freshwater." },
      { word: "genetic analyses", wordType: "collocation", definition: "scientific studies of DNA", example: "Genetic analyses helped explain the trees’ origin." },
      { word: "relict ecosystem", wordType: "collocation", definition: "an ecosystem that survived from an earlier period", example: "The mangroves are part of a relict ecosystem." },
      { word: "interglacial period", wordType: "collocation", definition: "a warm period between ice ages", example: "Sea levels rose during the last interglacial period." },
      { word: "sea levels", wordType: "collocation", definition: "the height of the ocean surface", example: "Rising sea levels flooded the lowlands." },
      { word: "coastal heritage", wordType: "collocation", definition: "origin connected with coastal areas", example: "Many plants there have coastal heritage." },
      { word: "marine gastropods", wordType: "collocation", definition: "sea snails or similar mollusks", example: "Sediments contained shells of marine gastropods." },
      { word: "past climate change", wordType: "collocation", definition: "climate change that happened long ago", example: "The ecosystem shows the impact of past climate change." },
      { word: "future sea-level rise", wordType: "collocation", definition: "expected increase in ocean height", example: "The study may help explain future sea-level rise." },
    ],
    pronunciation: [
      { word: "mangrove", ipa: "/MAN-grohv/", syllables: "man-grove", tip: "Stress MAN." },
      { word: "peninsula", ipa: "/puh-NIN-suh-luh/", syllables: "pe-nin-su-la", tip: "Stress NIN." },
      { word: "ecosystem", ipa: "/EE-koh-sis-tum/", syllables: "e-co-sys-tem", tip: "Stress EE." },
      { word: "interglacial", ipa: "/in-ter-GLAY-shul/", syllables: "in-ter-gla-cial", tip: "Stress GLAY." },
      { word: "sediments", ipa: "/SED-uh-ments/", syllables: "sed-i-ments", tip: "Stress SED." },
      { word: "gastropods", ipa: "/GAS-truh-podz/", syllables: "gas-tro-pods", tip: "Stress GAS." },
    ],
  },
];
  {
  id: "a7",
  slug: "why-every-year-feels-like-the-worst-ever",
  title: "Why Every Year Feels Like the Worst Ever",
  category: "Reading",
  topic: "Society",
  difficulty: "Advanced",
  coverImage:
    "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1600&q=80",
  date: "2026-05-19",
  description:
    "Unfettered media consumption can distort our perception of the present and make every year feel worse than it really is.",
  readingTime: 8,
  content: `
    <p><strong>Unfettered media consumption skews our perception of the present. This article explains why every year can feel like the worst ever and how to break the cycle.</strong></p>

    <h2>Addicted to Bad News</h2>
    <p>In 2020, Jenny Eastwood from Auckland, New Zealand, became addicted to bad news. She constantly checked updates about the pandemic, police brutality, protests, conspiracy theories, and politics. Every few minutes, another alarming post appeared on Reddit or Instagram.</p>

    <p>Like many people, she became obsessed with the world’s seemingly increasing danger. This response has roots in human evolution. Stories of fear and peril raise our anxiety and put our brains on high alert. In the past, this helped early humans survive predators and natural disasters. Today, it often leads to doomscrolling: endlessly refreshing social media and online news to stay aware of the latest threats.</p>

    <h2>Why the Present Feels Worse</h2>
    <p>Many tragedies can make the world feel especially frightening: pandemics, wildfires, hurricanes, inequality, protests, political conflict, and social unrest. However, even when positive developments happen, people often focus more strongly on negative events.</p>

    <p>Experts argue that if any year feels like the worst, it is partly because our brains tend to judge the present more harshly than the past. Unrestricted media consumption can distort perception, making it easy to slide into unhealthy patterns of belief.</p>

    <h2>Declinism and Nostalgia Bias</h2>
    <p>The belief that society is getting worse is not new. Even Ancient Athenians complained that their democracy was not what it used to be. Today, this belief is often called declinism or decline bias.</p>

    <p>People often remember the past more positively than it really was. This is known as rosy retrospection or nostalgia bias. When we remember our own past, we usually recall the best moments and forget many ordinary or unpleasant details. As a result, we may compare a highly edited version of the past with a messy and stressful version of the present.</p>

    <h2>Social Media and Doomscrolling</h2>
    <p>Excessive news consumption can cause stress, anxiety, fatigue, and sleep problems. Heavy exposure to frightening media can make people believe the world is more dangerous than it actually is.</p>

    <p>This idea is related to mean world syndrome, a concept developed from research on television viewing. The more people watched violent television, the more likely they were to believe that real life was dangerous. Modern social media is more complicated because it requires active participation, not just passive watching.</p>

    <h2>The Displacement Effect</h2>
    <p>Social media can provide emotional and social support, especially during difficult times. However, it can also create the displacement effect, where online activity replaces healthier activities such as face-to-face communication, exercise, or sleep.</p>

    <p>People who fear missing out may spend more time online, leading to fatigue and digital burnout. Young people may also engage in upward social comparison, which can lead to feelings of inadequacy and low self-esteem.</p>

    <h2>How to Break the Cycle</h2>
    <p>Psychologists suggest that we can learn to control our biases. The first step is to notice how media shifts our perception. When we become mindful of our thought patterns, we can give ourselves a reality check.</p>

    <p>It also helps to put the present into perspective. The pandemic was frightening, but modern science, medicine, and communication have also allowed people to respond in ways that would not have been possible a century ago.</p>

    <p>Taking stock of what we do have can help reduce negativity bias. People do not need to abandon digital life completely, but they should become more aware of what they consume, who they engage with, and how media affects their mental state.</p>
  `,
  vocabulary: [
    {
      word: "unfettered media consumption",
      wordType: "phrase",
      definition: "unrestricted or uncontrolled use of news and media",
      example: "Unfettered media consumption can make the present feel worse than it is.",
    },
    {
      word: "skews our perception",
      wordType: "phrase",
      definition: "distorts or biases the way we see or understand something",
      example: "Constant bad news skews our perception of reality.",
    },
    {
      word: "addicted to bad news",
      wordType: "phrase",
      definition: "compulsively drawn to negative information",
      example: "During the pandemic, many people became addicted to bad news.",
    },
    {
      word: "narratives of the deadly pandemic",
      wordType: "phrase",
      definition: "ongoing stories and reports about a serious disease outbreak",
      example: "She kept checking narratives of the deadly pandemic online.",
    },
    {
      word: "doomscrolling",
      wordType: "noun",
      definition: "endlessly scrolling through negative news on social media",
      example: "Doomscrolling can increase anxiety and stress.",
    },
    {
      word: "constant vigil",
      wordType: "phrase",
      definition: "continuous alertness or watchfulness for danger",
      example: "Bad news keeps the brain in a state of constant vigil.",
    },
    {
      word: "perceived catastrophe",
      wordType: "phrase",
      definition: "a disaster that is believed or expected, whether real or exaggerated",
      example: "People may keep checking updates to prepare for the next perceived catastrophe.",
    },
    {
      word: "rampant social and economic inequality",
      wordType: "phrase",
      definition: "widespread and uncontrolled unfairness in wealth and opportunity",
      example: "The crisis exposed rampant social and economic inequality.",
    },
    {
      word: "highly divisive election year",
      wordType: "phrase",
      definition: "a political period that strongly separates or polarizes people",
      example: "A highly divisive election year made people feel more anxious.",
    },
    {
      word: "slide into unhealthy patterns of belief",
      wordType: "phrase",
      definition: "gradually develop harmful or distorted ways of thinking",
      example: "Too much negative media can make people slide into unhealthy patterns of belief.",
    },
    {
      word: "tame persistent negative beliefs",
      wordType: "phrase",
      definition: "control or manage ongoing pessimistic thoughts",
      example: "Mindfulness can help people tame persistent negative beliefs.",
    },
    {
      word: "rose-colored glasses",
      wordType: "phrase",
      definition: "an overly optimistic or unrealistic view of the past",
      example: "People often look at history through rose-colored glasses.",
    },
    {
      word: "declinism / decline bias",
      wordType: "phrase",
      definition: "the belief that society is getting worse compared to the past",
      example: "Declinism can make people believe every year is worse than the last.",
    },
    {
      word: "see the world through the lens of negativity bias",
      wordType: "phrase",
      definition: "interpret events mainly by focusing on negative aspects",
      example: "Stress can make us see the world through the lens of negativity bias.",
    },
    {
      word: "propensity to interpret events negatively",
      wordType: "phrase",
      definition: "natural tendency to see things in a pessimistic way",
      example: "Some people have a propensity to interpret events negatively.",
    },
    {
      word: "autobiographical memories are biased toward positivity",
      wordType: "phrase",
      definition: "we tend to remember our personal past more positively than it really was",
      example: "Autobiographical memories are biased toward positivity, so the past may seem better.",
    },
    {
      word: "rosy retrospection / nostalgia bias",
      wordType: "phrase",
      definition: "the tendency to remember the past as better than it actually was",
      example: "Rosy retrospection can make the present look worse by comparison.",
    },
    {
      word: "venerating unrealistically positive versions of the past",
      wordType: "phrase",
      definition: "treating an idealized version of history with excessive admiration",
      example: "Historians warn against venerating unrealistically positive versions of the past.",
    },
    {
      word: "mean world syndrome",
      wordType: "phrase",
      definition: "the belief that the world is more dangerous than it really is due to heavy media exposure",
      example: "Violent media can contribute to mean world syndrome.",
    },
    {
      word: "direct correlation",
      wordType: "phrase",
      definition: "a clear relationship where one thing increases or decreases alongside another",
      example: "Researchers found a direct correlation between TV viewing and fear of the world.",
    },
    {
      word: "cultivation theory",
      wordType: "phrase",
      definition: "the idea that long-term media exposure shapes how people perceive reality",
      example: "Cultivation theory explains how media can shape our view of reality.",
    },
    {
      word: "displacement effect",
      wordType: "phrase",
      definition: "when time spent on one activity replaces healthier activities",
      example: "Social media can create a displacement effect by replacing sleep or exercise.",
    },
    {
      word: "conflate the effects",
      wordType: "phrase",
      definition: "wrongly combine or confuse two separate influences",
      example: "Researchers warn us not to conflate the effects of television and social media.",
    },
    {
      word: "active participation",
      wordType: "phrase",
      definition: "engagement that requires involvement rather than passive watching",
      example: "Social media requires active participation.",
    },
    {
      word: "indispensable",
      wordType: "adjective",
      definition: "absolutely necessary or essential",
      example: "For some users, online support became indispensable during the pandemic.",
    },
    {
      word: "panic-prone primate brains",
      wordType: "phrase",
      definition: "human brains that are biologically wired to respond strongly to danger",
      example: "Media gives our panic-prone primate brains more reasons to feel stressed.",
    },
    {
      word: "reality check",
      wordType: "phrase",
      definition: "a moment of reassessment to see things more objectively",
      example: "Taking a break from social media can provide a useful reality check.",
    },
    {
      word: "take stock in what we do have",
      wordType: "phrase",
      definition: "pause to evaluate and appreciate what currently exists",
      example: "We should take stock in what we do have instead of focusing only on problems.",
    },
    {
      word: "put the present into perspective",
      wordType: "phrase",
      definition: "compare current events with the past to see them more realistically",
      example: "Studying history can help us put the present into perspective.",
    },
    {
      word: "long-standing questions",
      wordType: "phrase",
      definition: "issues or concerns that have existed for a long time",
      example: "The relationship between media and fear raises long-standing questions.",
    },
  ],
  pronunciation: [
    {
      word: "unfettered",
      ipa: "/un-FET-erd/",
      syllables: "un-fet-tered",
      tip: "Stress FET. The ending sounds like 'erd'.",
    },
    {
      word: "perception",
      ipa: "/per-SEP-shun/",
      syllables: "per-cep-tion",
      tip: "Stress SEP. The ending sounds like 'shun'.",
    },
    {
      word: "doomscrolling",
      ipa: "/DOOM-skroh-ling/",
      syllables: "doom-scroll-ing",
      tip: "Stress DOOM.",
    },
    {
      word: "catastrophe",
      ipa: "/kuh-TAS-truh-fee/",
      syllables: "ca-tas-tro-phe",
      tip: "Stress TAS. The ending sounds like 'fee'.",
    },
    {
      word: "inequality",
      ipa: "/in-i-KWOL-uh-tee/",
      syllables: "in-e-qual-i-ty",
      tip: "Stress KWOL.",
    },
    {
      word: "declinism",
      ipa: "/di-KLY-niz-um/",
      syllables: "de-clin-ism",
      tip: "Stress KLY.",
    },
    {
      word: "retrospection",
      ipa: "/reh-truh-SPEK-shun/",
      syllables: "ret-ro-spec-tion",
      tip: "Stress SPEK.",
    },
    {
      word: "venerating",
      ipa: "/VEN-uh-ray-ting/",
      syllables: "ven-er-at-ing",
      tip: "Stress VEN.",
    },
    {
      word: "indispensable",
      ipa: "/in-di-SPEN-suh-bul/",
      syllables: "in-dis-pen-sa-ble",
      tip: "Stress SPEN.",
    },
    {
      word: "reassessment",
      ipa: "/ree-uh-SES-ment/",
      syllables: "re-as-sess-ment",
      tip: "Stress SES.",
    },
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
