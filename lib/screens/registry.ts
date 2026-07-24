type ScreenConfig = {
  id: string;
  title: string;
  route: `/${string}`;
  description: string;
  figmaNodeId?: string;
};

const mainScreens: ScreenConfig[] = [
  {
    id: "home",
    title: "Home",
    route: "/",
    description: "Mood-based match discovery and editorial feed.",
    figmaNodeId: "126:438",
  },
  {
    id: "match",
    title: "Matches",
    route: "/match",
    description: "Replay-focused match watching with smart and chill modes.",
    figmaNodeId: "126:505",
  },
  {
    id: "stats",
    title: "Stats",
    route: "/player-stats",
    description: "Player stats, fan prediction, and unlockable rewards.",
    figmaNodeId: "126:488",
  },
];

export const screenRegistry = {
  main: mainScreens,
  defaultRoute: "/",
};

export function getScreenConfig(route: ScreenConfig["route"]) {
  const screen = mainScreens.find((item) => item.route === route);

  if (!screen) {
    throw new Error(`Unknown screen route: ${route}`);
  }

  return screen;
}
