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
}
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
