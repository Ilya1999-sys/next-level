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
    if (stored === "nostalgia" || stored === "drama" || stored === "legends") {
      setMoodState(stored);
    }
  }, []);

  const setMood = (next: Mood) => {
    setMoodState(next);
    window.localStorage.setItem("ilya-mood", next);
  };

  useEffect(() => {
    document.documentElement.dataset.mood = mood;
  }, [mood]);

  const value = useMemo(() => ({ mood, setMood }), [mood]);
  return <MoodContext.Provider value={value}>{children}</MoodContext.Provider>;
}

export function useMood() {
  return useContext(MoodContext);
}
