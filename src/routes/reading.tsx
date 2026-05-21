import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Lock, Crown, BookOpen, RotateCcw, Search } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import {
  getTestProgressMeta,
  ProgressStatus,
  TEST_PROGRESS_OPTIONS,
  useTestStatus,
} from "@/hooks/use-test-status";
import { TestProgressBadge, TestProgressSelect } from "@/components/test-progress-controls";

export const Route = createFileRoute("/reading")({
  head: () => ({
    meta: [
      { title: "IELTS Reading Practice | Abduraimov Erkinjon" },
      { name: "description", content: "IELTS Reading passages вЂ” Passage 1, 2 and 3 practice." },
    ],
  }),
  component: Reading,
});

type Passage = {
  id: string;
  title: string;
  passageNumber: 1 | 2 | 3;
  description?: string;
  htmlFile?: string;
  content?: string;
  isPremium: boolean;
};

const PASSAGES: Passage[] = [
  {
    id: "p3-piraha",
    title: "The PirahГЈ People of Brazil",
    passageNumber: 3,
    isPremium: true,
    description:
      "An academic passage about the remarkable linguistic and cultural uniqueness of the PirahГЈ tribe in the Amazon rainforest.",
    htmlFile: "/passages/Day_1_Passage_3_Piraha.html",
  },
  {
    id: "p2-tv-advertising",
    title: "Children's Comprehension of Television Advertising",
    passageNumber: 2,
    isPremium: false,
    description:
      "An academic passage examining how children understand and are influenced by TV commercials, and the techniques advertisers use to target them.",
    htmlFile: "/passages/Passage_2_TV_Advertising.html",
  },
  {
    id: "p1-thames-tunnel",
    title: "Tunnelling under the Thames",
    passageNumber: 1,
    isPremium: false,
    description:
      "An academic passage about the remarkable engineering challenges behind building the world's first tunnel beneath a navigable river in 19th-century London.",
    htmlFile: "/passages/Tunnelling_under_the_Thames.html",
  },
  {
  id: "p1-trans-atlantic-telegraph-cable",
  title: "How the First Trans-Atlantic Telegraph Cable Was Laid",
  passageNumber: 1,
  isPremium: false,
  description:
    "A passage about the challenges, materials, funding and impact of laying the first trans-Atlantic telegraph cable.",
  htmlFile: "/passages/how_the_first_trans_atlantic_telegraph_cable_was_laid_passage1.html",
},
{
  id: "p2-removing-unwanted-noise",
  title: "Removing Unwanted Noise",
  passageNumber: 2,
  isPremium: false,
  description:
    "A passage about methods and technologies used to reduce unwanted noise and improve sound quality.",
  htmlFile: "/passages/removing_unwanted_noise_passage2.html",
},
{
  id: "p3-decisions-decisions",
  title: "Decisions, Decisions",
  passageNumber: 3,
  isPremium: false,
  description:
    "A passage about how people make decisions and the psychological factors that influence choices.",
  htmlFile: "/passages/decisions_decisions_passage3.html",
},
{
  id: "p1-discovering-purple",
  title: "Discovering Purple",
  passageNumber: 1,
  isPremium: false,
  description:
    "A passage about the history and scientific discovery of purple dye and its importance in industry.",
  htmlFile: "/passages/discovering_purple_passage1.html",
},
{
  id: "p2-beachcombing-early-humans-africa",
  title: "Beachcombing for Early Humans in Africa",
  passageNumber: 2,
  isPremium: false,
  description:
    "A passage about archaeological evidence of early humans in Africa and what coastal discoveries reveal about their lives.",
  htmlFile: "/passages/beachcombing_for_early_humans_in_africa_passage2.html",
},
{
  id: "p3-rewards-scientific-achievement",
  title: "Rewards for Scientific Achievement",
  passageNumber: 3,
  isPremium: false,
  description:
    "A passage about prizes and recognition given for scientific discoveries and achievements.",
  htmlFile: "/passages/the_bug_picture_passage3.html",
},
{
  id: "p1-bug-picture",
  title: "The Bug Picture",
  passageNumber: 1,
  isPremium: false,
  description:
    "A passage about insects, colours, and scientific observation of small natural details.",
  htmlFile: "/passages/the_bug_picture_passage3.html",
},
{
  id: "p2-remarkable-power-placebos",
  title: "The Remarkable Power of Placebos",
  passageNumber: 2,
  isPremium: false,
  description:
    "A passage about placebo effects and how expectations can influence symptoms and treatment outcomes.",
  htmlFile: "/passages/the_remarkable_power_of_placebos_passage2.html",
},
{
  id: "p2-dingo-debate",
  title: "The Dingo Debate",
  passageNumber: 2,
  isPremium: false,
  description:
    "A passage discussing the ecological role of dingoes in Australia and the debate over controlling their numbers.",
  htmlFile: "/passages/the_dingo_debate_passage2.html",
},
{
  id: "p3-pacific-navigation-voyaging",
  title: "Pacific Navigation and Voyaging",
  passageNumber: 3,
  isPremium: false,
  description:
    "A passage about how Pacific islanders navigated across vast ocean distances using traditional knowledge and canoe voyaging.",
  htmlFile: "/passages/pacific_navigation_and_voyaging_passage3.html",
},
{
  id: "p2-insect-decision-making",
  title: "Insect Decision-Making",
  passageNumber: 2,
  isPremium: false,
  description:
    "A passage about how insects such as bees and ants make collective decisions and organise group behaviour.",
  htmlFile: "/passages/insect_decision_making_passage2.html",
},
{
  id: "p3-learning-to-walk",
  title: "Learning to Walk",
  passageNumber: 3,
  isPremium: false,
  description:
    "A passage about the effects of walking surfaces on the body and how uneven ground may benefit health.",
  htmlFile: "/passages/learning_to_walk_passage3.html",
},
{
  id: "p3-hidden-lives-solitary-bees",
  title: "The Hidden Lives of Solitary Bees",
  passageNumber: 3,
  isPremium: false,
  description:
    "A passage about solitary bees, their nesting habits, pollination role and threats from pesticides.",
  htmlFile: "/passages/the_hidden_lives_of_solitary_bees_passage3.html",
},
{
  id: "p2-undoing-our-emotions",
  title: "Undoing Our Emotions",
  passageNumber: 2,
  isPremium: false,
  description:
    "A passage about positive emotions, stress recovery and the psychological effects of emotional states.",
  htmlFile: "/passages/undoing_our_emotions_passage2.html",
},
{
  id: "p2-chinstrap-penguin-population",
  title: "Chinstrap Penguin Population in the Last 50 Years",
  passageNumber: 2,
  isPremium: false,
  description:
    "A passage about the decline of chinstrap penguins in Antarctica and the role of climate change in changing ecosystems.",
  htmlFile: "/passages/chinstrap_penguin_population_in_the_last_50_years_passage2.html",
},
{
  id: "p2-developmental-tasks-adolescence",
  title: "Developmental Tasks of Normal Adolescence",
  passageNumber: 2,
  isPremium: false,
  description:
    "A passage about the physical, intellectual, social and emotional changes adolescents experience while growing into adulthood.",
  htmlFile: "/passages/developmental_tasks_of_normal_adolescence_passage2.html",
},
{
  id: "p3-fluoridation-controversy",
  title: "The Fluoridation Controversy",
  passageNumber: 3,
  isPremium: false,
  description:
    "A passage about the debate over adding fluoride to public water supplies and the scientific and social arguments involved.",
  htmlFile: "/passages/the_fluoridation_controversy_passage3.html",
},
{
  id: "p1-father-of-english-geology",
  title: "The Father of English Geology",
  passageNumber: 1,
  isPremium: false,
  description:
    "A passage about a key figure in the development of English geology and the study of Earth’s history.",
  htmlFile: "/passages/the_father_of_english_geology_passage1.html",
},
{
  id: "p2-whats-happening-to-our-food",
  title: "What's Happening to Our Food?",
  passageNumber: 2,
  isPremium: false,
  description:
    "A passage about changes in food production, food quality and concerns about modern diets.",
  htmlFile: "/passages/what_s_happening_to_our_food_passage2.html",
},
{
  id: "p3-rewilding",
  title: "Rewilding",
  passageNumber: 3,
  isPremium: false,
  description:
    "A passage about restoring natural ecosystems and bringing back missing species to improve biodiversity.",
  htmlFile: "/passages/rewilding_passage3.html",
},
{
  id: "p1-early-photographic-processes",
  title: "Early Photographic Processes",
  passageNumber: 1,
  isPremium: false,
  description:
    "A passage about the development of early photography and the scientific processes behind photographic images.",
  htmlFile: "/passages/early_photographic_processes_passage1.html",
},
{
  id: "p3-planet-earths-blue-heart",
  title: "Planet Earth's Blue Heart",
  passageNumber: 3,
  isPremium: false,
  description:
    "A passage about oceans, water systems and their importance to life on Earth.",
  htmlFile: "/passages/planet_earth_s_blue_heart_passage3.html",
},
  {
    id: "p3-business-innovation",
    title: "Business Innovation",
    passageNumber: 3,
    isPremium: false,
    description:
      "As new 'wonder products' are getting harder and harder to find, what should companies do to survive in today's ever more competitive markets?",
    htmlFile: "/passages/gemini-code-1778993342900.html",
  },
  {
    id: "p1-katherine-mansfield",
    title: "Katherine Mansfield",
    passageNumber: 1,
    isPremium: false,
    description:
      "Katherine Mansfield was a modernist writer of short fiction who was born and brought up in New Zealand.",
    htmlFile: "/passages/gemini-code-1778994470958.html",
  },
  {
    id: "p2-the-tasmanian-tiger",
    title: "The Tasmanian Tiger",
    passageNumber: 2,
    isPremium: false,
    description:
      "The Tasmanian tiger, or thylocine, was a carnivorous marsupial (a meat-eating mammal which carries its young in a pouch).",
    htmlFile: "/passages/gemini-code-1778995279738.html",
  },
  {
  id: "p1-our-vanishing-night",
  title: "Our Vanishing Night",
  passageNumber: 1,
  isPremium: false,
  description:
    "A passage about light pollution, its effects on the night sky, wildlife, and human understanding of darkness.",
  htmlFile: "/passages/our_vanishing_night_passage1.html",
},
{
  id: "p1-isle-of-eigg",
  title: "Reducing Electricity Consumption on the Isle of Eigg",
  passageNumber: 1,
  isPremium: false,
  description:
    "A passage explaining how the Isle of Eigg reduced electricity use through renewable energy, demand control, and community action.",
  htmlFile: "/passages/reducing_electricity_consumption_isle_of_eigg_passage1.html",
},
{
  id: "p1-forgotten-forest",
  title: "The Forgotten Forest",
  passageNumber: 1,
  isPremium: false,
  description:
    "A passage about the longleaf pine forest in the southern United States and efforts to restore this endangered ecosystem.",
  htmlFile: "/passages/the_forgotten_forest_passage1.html",
},
{
  id: "p1-communicating-in-colour",
  title: "Communicating In Colour",
  passageNumber: 1,
  isPremium: false,
  description:
    "A passage examining how chameleons use colour for communication, camouflage, rivalry, and attracting mates.",
  htmlFile: "/passages/communicating_in_colour_passage1.html",
},
  {
  id: "p1-sleep-hunter-gatherers",
  title: "Sleep Study on Modern-Day Hunter-Gatherers Dispels Popular Notions",
  passageNumber: 1,
  isPremium: false,
  description:
    "A passage about research into the sleep patterns of modern hunter-gatherer societies and what they reveal about human sleep.",
  htmlFile: "/passages/sleep_hunter_gatherers_passage1.html",
},
{
  id: "p1-traffic-jams",
  title: "Traffic Jams",
  passageNumber: 1,
  isPremium: false,
  description:
    "A passage explaining why traffic jams happen, how traffic-flow theory studies them, and why congestion is difficult to solve.",
  htmlFile: "/passages/traffic_passage1.html",
},
{
  id: "p1-gold-rush",
  title: "Historical Impact of the California Gold Rush",
  passageNumber: 1,
  isPremium: false,
  description:
    "A passage about how the California Gold Rush transformed migration, transport, industry, agriculture, and the environment.",
  htmlFile: "/passages/gold_rush_passage1.html",
},
{
  id: "p1-mungo-lady-man",
  title: "Mungo Lady and Mungo Man",
  passageNumber: 1,
  isPremium: false,
  description:
    "A passage about archaeological discoveries at Lake Mungo and debates about early Australian history and human origins.",
  htmlFile: "/passages/mungo_lady_passage1.html",
},
{
  id: "p1-business-cards",
  title: "The Importance of Business Cards",
  passageNumber: 1,
  isPremium: false,
  description:
    "A passage discussing the history, cultural role, and continuing importance of business cards in modern professional life.",
  htmlFile: "/passages/business_cards_passage1.html",
},
{
  id: "p1-english-canal-system",
  title: "The English Canal System",
  passageNumber: 1,
  isPremium: false,
  description:
    "A passage about the development of England’s inland canal network and its importance during the Industrial Revolution.",
  htmlFile: "/passages/canal_passage1.html",
},
{
  id: "p1-ice-cream-history",
  title: "The History of Ice Cream",
  passageNumber: 1,
  isPremium: false,
  description:
    "A passage tracing the origins and development of ice cream from ancient frozen desserts to modern industrial production.",
  htmlFile: "/passages/ice_cream_passage1.html",
},
{
  id: "p1-thomas-cole",
  title: "Thomas Cole: American Nature Painter",
  passageNumber: 1,
  isPremium: false,
  description:
    "A passage about Thomas Cole, America’s first major landscape artist, and his role in painting and protecting nature.",
  htmlFile: "/passages/thomas_cole_passage1.html",
},
{
  id: "p1-computer-games-preschoolers",
  title: "Computer Games for Preschoolers: Nintendo's Research and Design Process",
  passageNumber: 1,
  isPremium: false,
  description:
    "A passage about Nintendo’s research and design process for creating computer games suitable for preschool children.",
  htmlFile: "/passages/game_research_passage1.html",
},
{
  id: "p1-media-literacy",
  title: "The Media Literacy of Children: A Review of Research Literature",
  passageNumber: 1,
  isPremium: false,
  description:
    "A passage reviewing research on children’s media literacy, including access, understanding, creativity, barriers, and support.",
  htmlFile: "/passages/media_literacy_passage1.html",
},
{
  id: "p1-rufous-hare-wallaby",
  title: "The Rufous Hare-Wallaby",
  passageNumber: 1,
  isPremium: false,
  description:
    "A passage about the decline, captive breeding, and conservation efforts to save the Australian rufous hare-wallaby.",
  htmlFile: "/passages/the_rufous_hare_wallaby_passage1.html",
},
{
  id: "p1-secrets-of-the-swarm",
  title: "Secrets of the Swarm",
  passageNumber: 1,
  isPremium: false,
  description:
    "A passage exploring how ants, bees, termites, and other swarms make collective decisions and what humans can learn from them.",
  htmlFile: "/passages/secrets_of_the_swarm_passage1.html",
},
{
  id: "p1-story-of-silk",
  title: "The Story of Silk",
  passageNumber: 1,
  isPremium: false,
  description:
    "A passage tracing the history of silk from ancient China to the Silk Road and the development of global silk production.",
  htmlFile: "/passages/the_story_of_silk_passage1.html",
},
  {
    id: "p1-radiocarbon-dating",
    title: "Radiocarbon Dating вЂ” The Profile of Nancy Athfield",
    passageNumber: 1,
    isPremium: false,
    description:
      "Have you ever picked up a small stone off the ground and wondered how old it was?",
    htmlFile: "/passages/IELTS_Radiocarbon_Dating_Nancy_Athfield_Test.html",
  },
  {
    id: "p2-the-return-of-monkey-life",
    title: "The Return of Monkey life",
    passageNumber: 2,
    isPremium: false,
    description: "The recovery and life of monkeys in Northern Costa Rica",
    htmlFile: "/passages/IELTS_Passage2_Return_of_Monkey_Life_Test.html",
  },
  {
    id: "p1-the-sound-of-dolphin",
    title: "The Sound of Dolphin",
    passageNumber: 1,
    isPremium: false,
    description:
      "Each and every dolphin has a different sound just like you and me, a sound that other dolphins recognize as a particular individual.",
    htmlFile: "/passages/IELTS_The_Sound_of_Dolphin_Test.html",
  },
  {
    id: "p1-morse-code",
    title: "Morse code",
    passageNumber: 1,
    isPremium: false,
    description:
      "Morse code is being replaced by a new satellite-based system for sending distress calls at sea. Its dots and dashes have had a good run for their money.",
    htmlFile: "/passages/IELTS_Passage1_Morse_Code_Test.html",
  },
  {
  id: "p2-agribots",
  title: "The Rise of Agribots",
  passageNumber: 2,
  isPremium: false,
  description:
    "A passage about the use of robots and automation in farming, showing how agribots may change modern agriculture.",
  htmlFile: "/passages/agribots_part2.html",
},
{
  id: "p2-being-bored",
  title: "Why Being Bored Is Stimulating – and Useful, Too",
  passageNumber: 2,
  isPremium: false,
  description:
    "A passage exploring boredom as an emotion and explaining how it may be connected to creativity, attention, and human behaviour.",
  htmlFile: "/passages/being_bored_part2.html",
},
{
  id: "p2-big-cats",
  title: "Bring Back the Big Cats",
  passageNumber: 2,
  isPremium: false,
  description:
    "A passage about rewilding in Britain and the possible return of vanished native animals such as the lynx.",
  htmlFile: "/passages/big_cats_part2.html",
},
{
  id: "p2-human-laughter",
  title: "The Science of Human Laughter",
  passageNumber: 2,
  isPremium: false,
  description:
    "A passage examining why humans laugh, how laughter affects relationships, and what science reveals about humour.",
  htmlFile: "/passages/human_laught_part2.html",
},
{
  id: "p2-lost-city",
  title: "The Lost City",
  passageNumber: 2,
  isPremium: false,
  description:
    "A passage about Hiram Bingham’s encounter with Machu Picchu and the history behind the famous Inca site.",
  htmlFile: "/passages/lost_city_part2.html",
},
{
  id: "p2-mapping",
  title: "Revolutions in Mapping",
  passageNumber: 2,
  isPremium: false,
  description:
    "A passage about the development of mapmaking, from early scientific cartography to modern digital and satellite mapping.",
  htmlFile: "/passages/mapping_part2.html",
},
{
  id: "p2-robots",
  title: "Dawn of the Robots",
  passageNumber: 2,
  isPremium: false,
  description:
    "A passage discussing recent progress in robotics and artificial intelligence, including driverless cars and future robot applications.",
  htmlFile: "/passages/robots_part2.html",
},
{
  id: "p2-whales",
  title: "Whale Strandings",
  passageNumber: 2,
  isPremium: false,
  description:
    "A passage investigating why whales become stranded on beaches and the possible causes behind mass strandings.",
  htmlFile: "/passages/whales_part2.html",
},
  {
    id: "p1-why-good-ideas-fail",
    title: "Why Good ideas fail?",
    passageNumber: 1,
    isPremium: false,
    description:
      "Hypothetical case study: As part of a marketing course, two marketing experts comment on a hypothetical case study involving TF, a fictional retail giant specializing home furnishing. The experts give concrete solutions and advice to assist students.",
    htmlFile: "/passages/IELTS_Why_Good_Ideas_Fail_Test.html",
  },
  {
    id: "p1-thomas-young-the-last-true-know-it-all",
    title: "Thomas Young: The last true know-it-all",
    passageNumber: 1,
    isPremium: false,
    description:
      "Thomas Young (1773-1829) contributed 63 articles to the Encyclopedia Britannica, including 46 biographical entries (mostly on scientists and classicists) and substantial essays on вЂњBridge,вЂќ вЂњChromatics,вЂќ вЂњEgypt,вЂќ вЂњLanguagesвЂќ and вЂњTidesвЂќ.",
    htmlFile: "/passages/IELTS_Passage1_Thomas_Young_Test.html",
  },
  {
    id: "p3-what-do-babies-know",
    title: "What do Babies know?",
    passageNumber: 3,
    isPremium: false,
    description:
      "As Daniel Haworth is settled into a high chair and wheeled behind a black screen, a sudden look of worry furrows his 9-month-old brow.",
    htmlFile: "/passages/IELTS_Passage3_What_Do_Babies_Know_Test.html",
  },
  {
    id: "p1-malaria-italy",
    title: "Malaria Italy",
    passageNumber: 1,
    isPremium: false,
    description:
      "Mal-aria. Bad air. Even the world is Italian, and this horrible disease marked the life of those in the peninsula for thousands of years. ",
    htmlFile: "/passages/IELTS_Malaria_Italy_Test.html",
  },
   {
    id: "p1-ambergris",
    title: "Ambergris",
    passageNumber: 1,
    isPremium: false,
    description:
      "Ambergris was used to perfume cosmetics in the days of ancient Mesopotamia and almost every civilization on the earth has a brush with ambergris.",
    htmlFile: "/passages/IELTS_Passage1_Ambergris_Test.html",
  },
   {
    id: "p3-mite-harvestmen",
    title: "Mite Harvestmen",
    passageNumber: 3,
    isPremium: false,
    description:
      "Few people have heard of the mite harvestman, and fewer still would recognize it at close range.",
    htmlFile: "/passages/IELTS_Passage3_Mite_Harvestmen_Test.html",
  },
  {
    id: "p3-verbal-and-non-verbal",
    title: "Verbal and Non-verbal Messages",
    passageNumber: 3,
    isPremium: false,
    description:
      "A study of non-verbal communication carried out in 1967 continues to be widely quoted today.",
    htmlFile: "/passages/verbal_and_non-verbal_CDI_standalone.html",
  },
  {
    id: "p1-guitar",
    title: "The History of the Guitar",
    passageNumber: 1,
    isPremium: false,
    description:
      "An overview of the origins of the modern guitar.",
    htmlFile: "/passages/Guitar_CDI_standalone.html",
  },
  {
    id: "p2-intelligence",
    title: "Intelligent Behavior in Birds",
    passageNumber: 2,
    isPremium: false,
    description:
      "Many people are aware of the intelligence of chimpanzees and other mammals.",
    htmlFile: "/passages/Intelligence_CDI_standalone.html",
  },
  {
    id: "p2-urban",
    title: "Urban Regeneration",
    passageNumber: 2,
    isPremium: false,
    description:
      "Just over a kilometre south of Berlin's Potsdamer Platz, near the left bank of the Landwehr Canal, an extensive, triangular-shaped area of waste ground once separated the neighbourhoods of Kreuzberg to the east and Schöneberg to the west.",
    htmlFile: "/passages/Urban_CDI_standalone.html",
  },
  {
    id: "p1-burgess-shale",
    title: "The Burgess Shale Fossils",
    passageNumber: 1,
    isPremium: false,
    description:
      "Fauna vanished with a whimper, not a bang.",
    htmlFile: "/passages/Burgess_shale_CDI_standalone.html",
  },
  {
    id: "p3-conformity",
    title: "Conformity",
    passageNumber: 3,
    isPremium: false,
    description:
      "A review of conformity and some of the studies that have been done on it.",
    htmlFile: "/passages/Conformity_CDI_standalone.html",
  },
  {
    id: "p1-survivor-story",
    title: "A Survivor's Story",
    passageNumber: 1,
    isPremium: false,
    description:
      "One native bird in New Zealand that has managed to survive the introduction of non-native species.",
    htmlFile: "/passages/Survivor_story_CDI_standalone.html",
  },
  {
    id: "p1-feeding-the-world",
    title: "Feeding the World",
    passageNumber: 1,
    isPremium: false,
    description:
      "Feeding the world while nurturing the planet doesn’t necessarily mean going back to nature, Andy Coghlan reports.",
    htmlFile: "/passages/Feeding_the_world_CDI_standalone.html",
  },
  {
    id: "p2-music",
    title: "Classical Music Over the Centuries",
    passageNumber: 2,
    isPremium: false,
    description:
      "The production of any great art form, and classical music is no exception, does not usually occur in a society dominated by the basic material demands of food and shelter.",
    htmlFile: "/passages/Music_CDI_standalone.html",
  },
  {
    id: "p3-map",
    title: "Mapping the Mind",
    passageNumber: 3,
    isPremium: false,
    description:
      "Dr Simon Hanson reviews Rita Carter’s book Mapping the Mind.",
    htmlFile: "/passages/Map_CDI_standalone.html",
  },
  {
    id: "p2-species",
    title: "The Impact of Invasive Species",
    passageNumber: 2,
    isPremium: false,
    description:
      "Invasive species are among the leading threats to the native wildlife of most countries, with approximately 42 percent of endangered species at risk from them.",
    htmlFile: "/passages/Species_CDI_standalone.html",
  },
  {
    id: "p1-chocolate",
    title: "Chocolate for the Masses",
    passageNumber: 1,
    isPremium: false,
    description:
      "For almost three thousand years, chocolate was a drink of the elite and the wealthy, originally in South America and later on in Europe.",
    htmlFile: "/passages/Chocalate_CDI_standalone.html",
  },
  {
    id: "p3-asian-space",
    title: "Asian Space",
    passageNumber: 3,
    isPremium: false,
    description:
      "Planet Earth is today circled by scores of satellites, orbiting like tiny moons after being sent aloft by rockets to perform a variety of useful tasks.",
    htmlFile: "/passages/Asian_space_CDI_standalone.html",
  },
  {
    id: "p2-how-to-be-happy",
    title: "How to Be Happy",
    passageNumber: 2,
    isPremium: false,
    description:
      "Psychiatrist Tony Fernando was walking down the street when he saw a group of young homeless men sitting on the footpath.",
    htmlFile: "/passages/How_to_be_happy_CDI_standalone.html",
  },
  {
    id: "p1-frozen-food",
    title: "Clarence Birdseye and Frozen Food",
    passageNumber: 1,
    isPremium: false,
    description:
      "Born in 1886 in New York, the American naturalist Clarence Birdseye had an instinctive curiosity, a love of food, and a strong entrepreneurial streak.",
    htmlFile: "/passages/Frozen_food_CDI_standalone.html",
  },
  {
    id: "p3-lost-animals",
    title: "The Lost Animals of Australia",
    passageNumber: 3,
    isPremium: false,
    description:
      "The history of Australia's animals over the past 50,000 years has been largely one of extinction.",
    htmlFile: "/passages/Lost_animals_CDI_standalone.html",
  },
  {
    id: "p1-antarctic",
    title: "Antarctica Exploration and Research",
    passageNumber: 1,
    isPremium: false,
    description:
      "The modern scientific age in Antarctica really began with the introduction of aircraft in the 1920s.",
    htmlFile: "/passages/Antarctic_CDI_standalone.html",
  },
  {
    id: "p2-population",
    title: "Effects of Changes in World Population",
    passageNumber: 2,
    isPremium: false,
    description:
      "Human fertility rates around the world are dropping for a variety of complex reasons.",
    htmlFile: "/passages/Population_CDI_standalone.html",
  },
  {
    id: "p1-carnivorous-plants",
    title: "Carnivorous Plants",
    passageNumber: 1,
    isPremium: false,
    description:
      "They attract insects and then eat their flesh.",
    htmlFile: "/passages/CarnCarnivorous_Plants_CDI_standalone.html",
  },
  {
    id: "p2-bird-migration",
    title: "Bird Migration",
    passageNumber: 2,
    isPremium: false,
    description:
      "Birds have many unique design features that enable them to perform such amazing feats of endurance.",
    htmlFile: "/passages/IELTS_Passage2_Bird_Migration_Test.html",
  },
  {
    id: "p3-global-warming-in-new-zealand",
    title: "Global Warming in New Zealand",
    passageNumber: 3,
    isPremium: false,
    description:
      "For many environmentalists, the world seems to be getting warmer.",
    htmlFile: "/passages/IELTS_Passage3_Global_Warming_NZ_Test.html",
  },
  {
    id: "p1-nintendo-preschoolers",
    title: "Nintendo Preschoolers",
    passageNumber: 1,
    isPremium: false,
    description:
      "Designing computer games for young children is a daunting task for game producers, who, for a long time, have concentrated on more hard core game fans.",
    htmlFile: "/passages/IELTS_Passage1_Nintendo_Preschoolers_Test.html",
  },
  {
    id: "p3-accidental-scientists",
    title: "Accidental Scientists",
    passageNumber: 3,
    isPremium: false,
    description:
      "A paradox lies close to the heart of scientific discovery. If you know just what you are looking for, finding it can hardly count as a discovery, since it was fully anticipated.",
    htmlFile: "/passages/IELTS_Accidental_Scientists_Test_CDI_Layout_v5.html",
  },
  {
    id: "p1-medicine",
    title: "Traditional Maori Medicine",
    passageNumber: 1,
    isPremium: false,
    description: "The Maori are the indigenous people of the islands of New Zealand.",
    htmlFile: "/passages/Medicine_CDI_standalone.html",
  },
  {
    id: "p3-teaching",
    title: "Research into Teaching Styles",
    passageNumber: 3,
    isPremium: false,
    description:
      "Prior to 1960, most inquiries into pupils' learning skills explored the relationship between factors such as children's social background, personality or measured intelligence and their achievement in various school subjects.",
    htmlFile: "/passages/Teaching_CDI_standalone.html",
  },
  {
    id: "p1-reef-fish",
    title: "Reef Fish Study",
    passageNumber: 1,
    isPremium: false,
    description:
      "Tom Holmes examines the relationship between size and survival in fish on Australia’s Great Barrier Reef.",
    htmlFile: "/passages/reef_fish_2_CDI_standalone.html",
  },
  {
    id: "p1-dolls",
    title: "Dolls Through the Ages",
    passageNumber: 1,
    isPremium: false,
    description: "What is today a simple children’s toy has a surprisingly rich history.",
    htmlFile: "/passages/Dolls_2_CDI_standalone.html",
  },
  {
    id: "p3-living-dunes",
    title: "Living Dunes",
    passageNumber: 3,
    isPremium: false,
    description:
      "Things don’t come much stranger than heaps of sand that can move and sing of their own accord.",
    htmlFile: "/passages/Living_dunes_CDI_standalone.html",
  },
  {
    id: "p2-playing-with-science",
    title: "Playing with Science",
    passageNumber: 2,
    isPremium: false,
    description: "Is science always a serious matter?",
    htmlFile: "/passages/Playing_with_science_2_CDI_standalone.html",
  },
  {
    id: "p1-thomas-cole",
    title: "Thomas Cole: American Nature Painter",
    passageNumber: 1,
    isPremium: false,
    description: "Thomas Cole (1801–1848) was America’s first major landscape artist.",
    htmlFile: "/passages/Thomas_cole_2_CDI_standalone.html",
  },
  {
    id: "p2-attraction-of-video-games",
    title: "The Attraction of Video Games",
    passageNumber: 2,
    isPremium: false,
    description:
      "The world's love of video games has much to do with people's desires and motives.",
    htmlFile: "/passages/Attraction_of_video_games_CDI_standalone.html",
  },
  {
    id: "p1-sleep-study-hunter-gatherers",
    title: "Sleep Study on Modern-Day Hunter-Gatherers",
    passageNumber: 1,
    isPremium: false,
    description:
      "The sleep troubles common in modern life have long been blamed on our industrial society, from the city lights, long work hours and commutes, to caffeine and the Internet.",
    htmlFile: "/passages/Sleep_Study_on_Modern_Day_Hunter_Gatherers_2_CDI_standalone.html",
  },
  {
    id: "p3-tuatara",
    title: "The Tuatara: Past and Future",
    passageNumber: 3,
    isPremium: false,
    description:
      "The New Zealand species of lizard, the tuatara, is firmly embedded in the national psyche.",
    htmlFile: "/passages/Tuatura_CDI_standalone.html",
  },
  {
    id: "p2-biophilic-design",
    title: "Biophilic Design",
    passageNumber: 2,
    isPremium: false,
    description:
      "Biophilic design, a movement related to green architecture, has gained much momentum within the building community in recent years.",
    htmlFile: "/passages/Biophilic_design_CDI_standalone.html",
  },
  {
    id: "p1-humans-and-food",
    title: "A Brief History of Humans and Food",
    passageNumber: 1,
    isPremium: false,
    description:
      "During the journey from our hunter-gatherer ancestors to the present day there have been three seismic changes that have had an impact on the food we eat.",
    htmlFile: "/passages/Humans_and_Food_CDI_standalone.html",
  },
  {
    id: "p2-arts",
    title: "Why Do We Need the Arts?",
    passageNumber: 2,
    isPremium: false,
    description:
      "Imagine a world in which people spend hours working in offices or factories, and then go home in the evening to sit down to dinner.",
    htmlFile: "/passages/ARTS_CDI_standalone.html",
  },
  {
    id: "p3-mahy",
    title: "The New Zealand Writer Margaret Mahy",
    passageNumber: 3,
    isPremium: false,
    description:
      "In a career spanning some fifty years, Margaret Mahy has come to occupy a unique place in New Zealand writing with innovative fiction and original characterisation.",
    htmlFile: "/passages/Mahy_CDI_standalone.html",
  },
  {
    id: "p3-headphones",
    title: "Some Views on the Use of Headphones",
    passageNumber: 3,
    isPremium: false,
    description:
      "Whether wearing headphones at work, or in other areas of everyday life, is a good thing or a bad thing has generated a lot of research and opinion.",
    htmlFile: "/passages/Headphones_CDI_standalone.html",
  },
  {
    id: "p2-celebrities",
    title: "A Study of Western Celebrity",
    passageNumber: 2,
    isPremium: false,
    description:
      "In our celebrity-obsessed culture, TV shows, internet blogs, and even newspapers are often full of the latest news, gossip and scandals about current celebrities.",
    htmlFile: "/passages/Celebrities_CDI_standalone.html",
  },
  {
    id: "p1-building-castle",
    title: "Building a Castle",
    passageNumber: 1,
    isPremium: false,
    description: "Guédelon is no ordinary building site.",
    htmlFile: "/passages/Building_castle_CDI_standalone.html",
  },
  {
    id: "p3-game-theory",
    title: "Game Theory",
    passageNumber: 3,
    isPremium: false,
    description:
      "According to game theory, our chances of success in negotiations are based on the choices of others.",
    htmlFile: "/passages/Game_theory_CDI_standalone.html",
  },
  {
    id: "p2-ideal-homes",
    title: "Ideal Homes",
    passageNumber: 2,
    isPremium: false,
    description:
      "The traditional kampung houses of Malaysia do not need air-conditioning.",
    htmlFile: "/passages/Ideal_CDI_standalone.html",
  },
];

const FILTERS = [
  { v: "all", label: "All" },
  { v: "1", label: "Passage 1" },
  { v: "2", label: "Passage 2" },
  { v: "3", label: "Passage 3" },
] as const;

function Reading() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["v"]>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | ProgressStatus>("all");
  const [search, setSearch] = useState("");
  const [active, setActive] = useState<Passage | null>(null);

  const { profile, deviceConflict, user } = useAuth();
  const isPremium = !!profile?.is_premium && !deviceConflict;

  const passageIds = PASSAGES.map((p) => p.id);
  const { statuses, statusFor, setTestStatus, resetTest } = useTestStatus(passageIds);

  // BUG FIX: the PASSAGES list contains entries that share the same title /
  // htmlFile (e.g. "The Bug Picture" appears twice), which made the search
  // results show duplicates. Deduplicate by a normalised title + htmlFile key
  // before returning the filtered list.
  const searchedPassages = (() => {
    const query = search.trim().toLowerCase();
    const matched = PASSAGES.filter((p) => {
      if (!query) return true;
      return (
        p.title.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query) ||
        p.id.toLowerCase().includes(query)
      );
    });
    const seen = new Set<string>();
    return matched.filter((p) => {
      const key = `${p.title.trim().toLowerCase()}|${p.htmlFile ?? ""}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  })();

  const visible = searchedPassages.filter((p) => {
    const matchesPassage = filter === "all" || String(p.passageNumber) === filter;
    const matchesStatus = statusFilter === "all" || statusFor(p.id) === statusFilter;
    return matchesPassage && matchesStatus;
  });

  const passageCounts = {
    all: PASSAGES.length,
    "1": PASSAGES.filter((p) => p.passageNumber === 1).length,
    "2": PASSAGES.filter((p) => p.passageNumber === 2).length,
    "3": PASSAGES.filter((p) => p.passageNumber === 3).length,
  } as const;

  const statusCounts = {
    all: searchedPassages.length,
    not_done: searchedPassages.filter((p) => statusFor(p.id) === "not_done").length,
    not_completed: searchedPassages.filter((p) => statusFor(p.id) === "not_completed").length,
    finished: searchedPassages.filter((p) => statusFor(p.id) === "finished").length,
  } as const;

  function handleOpen(p: Passage) {
    if (statusFor(p.id) === "not_done") {
      void setTestStatus(p.id, "not_completed");
    }

    if (p.htmlFile) {
      const url = new URL(p.htmlFile, window.location.origin);
      url.searchParams.set("testId", p.id);
      window.open(url.toString(), "_blank");
    } else {
      setActive(p);
    }
  }

  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-12 max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">IELTS Reading Practice</h1>
        <p className="text-muted-foreground mb-2">
          Filter by passage type and open any passage in a clean reader view.
        </p>
        <p className="text-sm text-muted-foreground mb-8 italic">
          ⏱ Recommended time: Passage 1 &amp; 2 — 20 min &nbsp;|&nbsp; Passage 3 — 22 min
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {FILTERS.map((f) => (
            <Button
              key={f.v}
              variant={filter === f.v ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f.v)}
            >
              {f.label} ({passageCounts[f.v]})
            </Button>
          ))}
        </div>

        <div className="relative mb-6 w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search reading passages..."
            className="h-10 pl-9"
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={statusFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("all")}
          >
            All statuses ({statusCounts.all})
          </Button>
          {TEST_PROGRESS_OPTIONS.map((option) => (
            <Button
              key={option.value}
              variant={statusFilter === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(option.value)}
            >
              {option.label} ({statusCounts[option.value]})
            </Button>
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="text-muted-foreground py-12 text-center">
            No passages match your filters.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {visible.map((p) => {
              const locked = p.isPremium && !isPremium;
              const status = statuses[p.id];
              const progressStatus = statusFor(p.id);
              const isFinished = progressStatus === "finished";
              const progressMeta = getTestProgressMeta(progressStatus);

              return (
                <Card
                  key={p.id}
                  className={cn(
                    "p-6 flex flex-col relative overflow-hidden transition-colors",
                    progressMeta.cardClassName,
                  )}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-accent text-foreground">
                        P{p.passageNumber}
                      </Badge>
                      <TestProgressBadge status={progressStatus} detail={status} />
                    </div>
                    {locked && <Lock className="w-4 h-4 text-muted-foreground" />}
                  </div>

                  <h3
                    className={cn(
                      "font-serif text-xl font-semibold mb-2 leading-snug",
                      locked && "blur-sm select-none",
                    )}
                  >
                    {p.title}
                  </h3>

                  {p.description && (
                    <p
                      className={cn(
                        "text-sm text-muted-foreground mb-5 flex-1",
                        locked && "blur-sm select-none",
                      )}
                    >
                      {p.description}
                    </p>
                  )}

                  {status?.completedAt && (
                    <p className="text-xs text-muted-foreground mb-3">
                      Completed {new Date(status.completedAt).toLocaleDateString()}
                    </p>
                  )}

                  {!locked && (
                    <div className="mb-3">
                      <TestProgressSelect
                        value={progressStatus}
                        onChange={(next) => setTestStatus(p.id, next)}
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
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleOpen(p)}
                      >
                        <BookOpen className="w-4 h-4 mr-1" /> Review
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 text-muted-foreground"
                        onClick={() => resetTest(p.id)}
                      >
                        <RotateCcw className="w-4 h-4 mr-1" /> Redo
                      </Button>
                    </div>
                  ) : (
                    <Button size="sm" variant="outline" className="w-full" onClick={() => handleOpen(p)}>
                      <BookOpen className="w-4 h-4 mr-1" />
                      {progressStatus === "not_completed" ? "Continue Test" : p.htmlFile ? "Open Full Test" : "Open"}
                    </Button>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </section>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              {active && (
                <Badge variant="secondary" className="bg-accent text-foreground">
                  Passage {active.passageNumber}
                </Badge>
              )}
            </div>
            <DialogTitle className="font-serif text-2xl">{active?.title}</DialogTitle>
          </DialogHeader>
          {active && (
            <article
              className="prose prose-neutral max-w-none mt-4 text-base leading-relaxed"
              dangerouslySetInnerHTML={{ __html: active.content ?? "" }}
            />
          )}
        </DialogContent>
      </Dialog>
    </SiteLayout>
  );
}
