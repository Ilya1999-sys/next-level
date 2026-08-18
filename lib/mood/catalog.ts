import { useMood } from "@/components/mood/mood-provider";

export const MATCH_VIDEO = {
  duel: "https://assets.mixkit.co/videos/43483/43483-720.mp4",
  dribble: "https://assets.mixkit.co/videos/43484/43484-720.mp4",
  penalty: "https://assets.mixkit.co/videos/43492/43492-720.mp4",
  goal: "https://assets.mixkit.co/videos/43499/43499-720.mp4",
  bicycle: "https://assets.mixkit.co/videos/2916/2916-720.mp4",
} as const;

export type TeamCard = {
  year: string;
  team: string;
  image: string;
  href?: string;
  accent?: boolean;
  objectFit?: "cover" | "contain";
  video?: string;
};

export type FactCard = {
  title: string;
  value: string;
  text: string;
  tournament?: string;
  dots?: { total: number; filled: number; columns?: number };
};

type Catalog = {
  teams: TeamCard[];
  facts: FactCard[];
  live: { place: string; chips: string[]; fans: string };
  tournament: {
    year: string;
    title: string;
    image: string;
    stats: Array<{ value: string; label: string; accent?: boolean }>;
  };
  comeback: FactCard;
};

const CATALOG: Record<string, Catalog> = {
  nostalgia: {
    teams: [
      { year: "/2009", team: "Barcelona", image: "/figma/barcelona.png", video: MATCH_VIDEO.dribble },
      { year: "/2006", team: "France", image: "/figma/france-2006.png", objectFit: "contain", video: MATCH_VIDEO.penalty },
      { year: "/2016", team: "Portugal", image: "/figma/portugal-2016.png", href: "/portugal-2016", accent: true, video: MATCH_VIDEO.duel },
      { year: "/2014", team: "Brazil", image: "/figma/brazil-2014.png", objectFit: "contain", video: MATCH_VIDEO.bicycle },
    ],
    facts: [
      { title: "Nostalgia fact", value: "15", text: "Champions League Cups won by Real Madrid", dots: { total: 12, filled: 8 } },
      { title: "Favorite player fact", value: "5", text: "Killian Mbappe scored goals in one match" },
      { title: "Nostalgia fact", value: "18", text: "years ago, you watched your first Switzerland — Turkey match", tournament: "EURO—2008" },
    ],
    live: {
      place: "Barcelona",
      chips: ["The Benzema Extravaganza in 2021", "How Germany went to the championship in 2014"],
      fans: "324 fans discussions",
    },
    tournament: {
      year: "/2008",
      title: "Russia, incredible comebacks and golden Spain",
      image: "/figma/russia-2008.png",
      stats: [
        { value: "77", label: "goals scored", accent: true },
        { value: "31", label: "matches played" },
        { value: "12", label: "Spain scored" },
      ],
    },
    comeback: {
      title: "Fantastic comeback",
      value: "6—5",
      text: "Barcelona bounced back in the match with PSG after a 0-4 defeat",
      dots: { total: 22, filled: 11, columns: 11 },
    },
  },
  drama: {
    teams: [
      { year: "/2016", team: "France", image: "/figma/france-final.png", href: "/portugal-2016/france", accent: true, video: MATCH_VIDEO.duel },
      { year: "/2006", team: "Italy", image: "/figma/france-2006.png", objectFit: "contain", video: MATCH_VIDEO.penalty },
      { year: "/2014", team: "Brazil", image: "/figma/brazil-2014.png", video: MATCH_VIDEO.goal },
      { year: "/2008", team: "Russia", image: "/figma/russia-2008.png", objectFit: "contain", video: MATCH_VIDEO.bicycle },
    ],
    facts: [
      { title: "Drama fact", value: "109", text: "Eder scored the only goal in extra time of the final", dots: { total: 12, filled: 1 } },
      { title: "Favorite player fact", value: "1", text: "Ronaldo left the final injured and still became champion" },
      { title: "Drama fact", value: "0-4", text: "Barcelona trailed PSG by four before the comeback night", tournament: "UCL" },
    ],
    live: {
      place: "Saint-Denis",
      chips: ["Eder from nowhere", "If Ronaldo stays on the pitch"],
      fans: "412 fans discussions",
    },
    tournament: {
      year: "/2016",
      title: "Portugal grind, extra time, and one late strike",
      image: "/figma/portugal-hero.png",
      stats: [
        { value: "1", label: "final goal", accent: true },
        { value: "120", label: "minutes played" },
        { value: "9", label: "Portugal goals" },
      ],
    },
    comeback: {
      title: "Impossible night",
      value: "6—1",
      text: "Portugal overturned drama into a European title",
      dots: { total: 22, filled: 9, columns: 11 },
    },
  },
  legends: {
    teams: [
      { year: "/2016", team: "Portugal", image: "/figma/portugal-2016.png", href: "/portugal-2016", accent: true, video: MATCH_VIDEO.duel },
      { year: "/2009", team: "Barcelona", image: "/figma/barcelona.png", video: MATCH_VIDEO.dribble },
      { year: "/2006", team: "France", image: "/figma/france-2006.png", objectFit: "contain", video: MATCH_VIDEO.penalty },
      { year: "/2014", team: "Brazil", image: "/figma/brazil-2014.png", objectFit: "contain", video: MATCH_VIDEO.bicycle },
    ],
    facts: [
      { title: "Legend fact", value: "25", text: "minutes Ronaldo stayed on the pitch in the final", dots: { total: 12, filled: 10 } },
      { title: "Favorite player fact", value: "7", text: "Ronaldo number, still the icon of that night" },
      { title: "Legend fact", value: "15", text: "Real Madrid European Cups in the museum", tournament: "UCL" },
    ],
    live: {
      place: "Lisbon archive",
      chips: ["Ronaldo with the trophy", "Golden generation night"],
      fans: "198 fans discussions",
    },
    tournament: {
      year: "/2016",
      title: "A captain, a trophy, a country in gold",
      image: "/figma/portugal-hero.png",
      stats: [
        { value: "1", label: "European title", accent: true },
        { value: "7", label: "Ronaldo" },
        { value: "2016", label: "France" },
      ],
    },
    comeback: {
      title: "Legend night",
      value: "1—0",
      text: "Eder wrote Portugal into the book of European champions",
      dots: { total: 22, filled: 16, columns: 11 },
    },
  },
};

export function useMoodCatalog() {
  const { mood } = useMood();
  return CATALOG[mood];
}
