"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Mood = "nostalgia" | "drama" | "legends";

const MoodContext = createContext<{
  mood: Mood;
  setMood: (mood: Mood) => void;
}>({
  mood: "nostalgia",
  setMood: () => undefined,
});

export function MoodProvider({ children }: { children: ReactNode }) {
  const [mood, setMoodState] = useState<Mood>("nostalgia");

  useEffect(() => {
    const stored = window.localStorage.getItem("ilya-mood");
    const next = stored === "nostalgia" || stored === "drama" || stored === "legends" ? stored : "nostalgia";
    setMoodState(next);
    document.documentElement.dataset.mood = next;
  }, []);

  const setMood = (next: Mood) => {
    setMoodState(next);
    window.localStorage.setItem("ilya-mood", next);
    document.documentElement.dataset.mood = next;
  };

  const value = useMemo(() => ({ mood, setMood }), [mood]);
  return <MoodContext.Provider value={value}>{children}</MoodContext.Provider>;
}

export function useMood() {
  return useContext(MoodContext);
}
