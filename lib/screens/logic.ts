import { logicScreens } from "@/data/screens/logic-screens";

export function getLogicScreen(screenId: string) {
  return logicScreens.find((screen) => screen.id === screenId) ?? null;
}

export function getAllLogicScreenIds() {
  return logicScreens.map((screen) => screen.id);
}
