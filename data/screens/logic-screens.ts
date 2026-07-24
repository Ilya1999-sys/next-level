export type LogicScreen = {
  id: string;
  title: string;
  description: string;
  sections: Array<{
    id: string;
    heading: string;
    body: string;
  }>;
};

export const logicScreens: LogicScreen[] = [
  {
    id: "sample-flow",
    title: "Sample Flow Screen",
    description: "Generated from logic description registry.",
    sections: [
      {
        id: "intro",
        heading: "How to use",
        body: "Add new entries in data/screens/logic-screens.ts and bind Figma nodes in lib/figma/manifest.ts.",
      },
    ],
  },
];
