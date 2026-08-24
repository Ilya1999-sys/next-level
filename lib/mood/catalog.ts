import { useMood } from "@/components/mood/mood-provider";
import { HIGHLIGHTS, type HighlightClip } from "@/lib/media/highlights";
import type { MixMark } from "@/components/ui/card-graphics";

export const BARCELONA_MARKS: MixMark[] = [
  { type: "bar", tone: "accent", height: 100 },
  { type: "bar", tone: "muted", height: 48 },
  { type: "bar", tone: "accent", height: 88 },
  { type: "dot", tone: "muted" },
  { type: "dot", tone: "accent" },
  { type: "dot", tone: "muted" },
  { type: "bar", tone: "accent", height: 42 },
  { type: "bar", tone: "muted", height: 10 },
];

export const WINS_MARKS: MixMark[] = [
  { type: "dot", tone: "accent" },
  { type: "dot", tone: "muted" },
  { type: "bar", tone: "accent", height: 100 },
  { type: "bar", tone: "muted", height: 100 },
  { type: "dot", tone: "accent" },
  { type: "dot", tone: "muted" },
];

export const PORTUGAL_GOALS = [1, 1, 4, 5, 6, 8, 9];
export const FRANCE_GOALS = [2, 4, 4, 6, 11, 13, 13];

export const CROATIA_BARS = [
  { left: 676, right: 460, leftLabel: "676 passes", rightLabel: "460 passes" },
  { left: 142, right: 148, leftLabel: "142 km", rightLabel: "148 km" },
  { left: 59, right: 41, leftLabel: "59% ball possession", rightLabel: "41% ball possession" },
];

export const FRANCE_MINUTES = [8, 12, 18, 30, 37, 45, 52, 58, 67, 75, 82, 90, 97, 105];
export const PORTUGAL_MINUTES = [16, 45, 52, 78, 92, 102, 109];

export type StoryCard = {
  year: string;
  title: string;
  href?: string;
  accent?: boolean;
  video: HighlightClip;
};

export type FactCard = {
  title: string;
  value: string;
  text: string;
  tournament?: string;
  dots?: { total: number; filled: number; columns?: number };
  marks?: MixMark[];
};

type Catalog = {
  barcelona: StoryCard;
  zidane: StoryCard;
  portugal: StoryCard;
  facts: FactCard[];
  extraFacts: FactCard[];
  live: { place: string; chips: string[]; fans: string };
  tournament: StoryCard & {
    stats: Array<{ value: string; label: string; accent?: boolean }>;
  };
};

const SHARED_CARDS = {
  barcelona: {
    year: "/2009",
    title: "Path to the final: “Barcelona”.",
    video: HIGHLIGHTS.barcelona,
  },
  zidane: {
    year: "/2006",
    title: "The incredible Zidane at the World Cup and the tragedy in the final.",
    video: HIGHLIGHTS.zidane,
  },
  portugal: {
    year: "/2016",
    title: "Portugal's first victory in a major tournament.",
    href: "/portugal-2016",
    accent: true,
    video: HIGHLIGHTS.portugal2016,
  },
  tournament: {
    year: "/2008",
    title: "Russia, incredible comebacks and golden Spain",
    video: HIGHLIGHTS.euro2008,
    stats: [
      { value: "77", label: "goals scored", accent: true },
      { value: "31", label: "matches played" },
      { value: "12", label: "Spain scored" },
    ],
  },
};

const CATALOG: Record<string, Catalog> = {
  nostalgia: {
    ...SHARED_CARDS,
    facts: [
      { title: "Favorite player fact", value: "5", text: "Killian Mbappe scored goals in one match" },
      {
        title: "Nostalgia fact",
        value: "15",
        text: "Champions League Cups won by Real Madrid",
        dots: { total: 24, filled: 15, columns: 8 },
      },
    ],
    extraFacts: [
      {
        title: "Nostalgia fact",
        value: "18",
        text: "years ago, you watched your first Switzerland — Turkey match",
        tournament: "EURO—2008",
      },
      { title: "Favorite player fact", value: "976", text: "Cristiano Ronaldo has scored the most goals in his career so far" },
    ],
    live: {
      place: "Barcelona",
      chips: ["The Benzema Extravaganza in 2021", "How Germany went to the championship in 2014"],
      fans: "324 fans discussions",
    },
  },
  drama: {
    ...SHARED_CARDS,
    facts: [
      { title: "Favorite player fact", value: "5", text: "Killian Mbappe scored goals in one match" },
      {
        title: "Drama fact",
        value: "15",
        text: "Champions League Cups won by Real Madrid",
        dots: { total: 24, filled: 15, columns: 8 },
      },
    ],
    extraFacts: [
      {
        title: "Drama fact",
        value: "18",
        text: "years ago, you watched your first Switzerland — Turkey match",
        tournament: "EURO—2008",
      },
      { title: "Favorite player fact", value: "976", text: "Cristiano Ronaldo has scored the most goals in his career so far" },
    ],
    live: {
      place: "Saint-Denis",
      chips: ["Eder from nowhere", "If Ronaldo stays on the pitch"],
      fans: "412 fans discussions",
    },
  },
  legends: {
    ...SHARED_CARDS,
    facts: [
      { title: "Favorite player fact", value: "5", text: "Killian Mbappe scored goals in one match" },
      {
        title: "Legend fact",
        value: "15",
        text: "Champions League Cups won by Real Madrid",
        dots: { total: 24, filled: 15, columns: 8 },
      },
    ],
    extraFacts: [
      {
        title: "Legend fact",
        value: "18",
        text: "years ago, you watched your first Switzerland — Turkey match",
        tournament: "EURO—2008",
      },
      { title: "Favorite player fact", value: "976", text: "Cristiano Ronaldo has scored the most goals in his career so far" },
    ],
    live: {
      place: "Lisbon archive",
      chips: ["Ronaldo with the trophy", "Golden generation night"],
      fans: "198 fans discussions",
    },
  },
};

export function useMoodCatalog() {
  const { mood } = useMood();
  return CATALOG[mood];
}
