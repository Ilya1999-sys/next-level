"use client";

import { useMemo, useState } from "react";
import { FigmaPill } from "@/components/ui/figma-primitives";

const cameraModes = ["Player", "Referee", "Behind goal", "Drone"] as const;

const playersByTeam = {
  USA: ["Tim Howard", "Landon Donovan", "Clint Dempsey"],
  Ghana: ["Asamoah Gyan", "Kevin-Prince Boateng", "Sulley Muntari"],
} as const;

type PlayerName = (typeof playersByTeam)[keyof typeof playersByTeam][number];

function defaultRatings() {
  const ratings: Record<PlayerName, number> = {
    "Tim Howard": 8,
    "Landon Donovan": 8,
    "Clint Dempsey": 8,
    "Asamoah Gyan": 8,
    "Kevin-Prince Boateng": 8,
    "Sulley Muntari": 8,
  };
  return ratings;
}

export function UsaGhanaMatchScreen() {
  const [camera, setCamera] = useState<(typeof cameraModes)[number]>("Behind goal");
  const [mode, setMode] = useState<"Chill" | "Smart">("Smart");
  const [submitted, setSubmitted] = useState(false);
  const [ratings, setRatings] = useState<Record<PlayerName, number>>(defaultRatings);

  const facts = useMemo(
    () => [
      "Ghana became only the 3rd African team to reach the World Cup quarter-finals.",
      "Asamoah Gyan's extra-time goal sealed the legendary 2-1 comeback victory.",
    ],
    []
  );

  function changeRating(player: PlayerName, delta: -1 | 1) {
    setRatings((prev) => {
      const next = Math.min(10, Math.max(1, prev[player] + delta));
      return { ...prev, [player]: next };
    });
  }

  return (
    <main
      className="screen-root"
      style={{
        minHeight: "calc(100vh - 72px)",
        padding: 0,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      >
        <source src="https://assets.mixkit.co/videos/43483/43483-720.mp4" type="video/mp4" />
      </video>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(150deg, rgba(8,8,13,0.8) 25%, rgba(8,8,13,0) 33%, rgba(8,8,13,0.65) 50%)",
          zIndex: 1,
        }}
      />

      <div style={{ position: "relative", zIndex: 2, display: "grid", gap: 12 }}>
        <div style={{ display: "grid", justifyItems: "center", gap: 12, paddingTop: "var(--space-5)", paddingBottom: "var(--space-5)" }}>
          <span className="title-small">View from</span>
          <div style={{ display: "flex", gap: 8, flexWrap: "nowrap", justifyContent: "center" }}>
            {cameraModes.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCamera(item)}
                style={{ border: 0, background: "none", padding: 0, cursor: "pointer" }}
              >
                <FigmaPill active={camera === item}>{item}</FigmaPill>
              </button>
            ))}
          </div>
        </div>

        <article className="panel" style={{ margin: "0 40px 0 auto", padding: "20px 40px", display: "grid", gap: 12, width: 630 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: 20 }}>
            <div>
              <strong style={{ fontSize: "var(--font-size-xl)" }}>USA</strong>
              <div style={{ fontSize: "var(--font-size-sm)", color: "var(--text-tertiary)" }}>HOME</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ color: "var(--accent-yellow)", fontWeight: 900, fontSize: "var(--font-size-hero-score)" }}>1</span>
              <span style={{ fontSize: "var(--font-size-2xl)" }}>-</span>
              <span style={{ fontWeight: 900, fontSize: "var(--font-size-hero-score)" }}>2</span>
            </div>
            <div style={{ textAlign: "right" }}>
              <strong style={{ fontSize: "var(--font-size-xl)" }}>Ghana</strong>
              <div style={{ fontSize: "var(--font-size-sm)", color: "var(--text-tertiary)" }}>AWAY</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "center" }}>
            <span
              style={{
                background: "var(--main-error)",
                borderRadius: "var(--radius-xs)",
                fontSize: "var(--font-size-xs)",
                fontWeight: 700,
                padding: "3px 10px",
              }}
            >
              REPLAY
            </span>
            <strong style={{ fontSize: "var(--font-size-xl)" }}>90:00+</strong>
            <span style={{ color: "var(--text-tertiary)", fontSize: "var(--font-size-sm)" }}>World Cup 2010</span>
          </div>
        </article>
      </div>

      <div style={{ position: "relative", zIndex: 2, flex: 1 }} />

      <div style={{ position: "relative", zIndex: 2, display: "grid", gap: 20, paddingBottom: "var(--space-5)" }}>
        {mode === "Smart" && (
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12, paddingRight: "var(--space-10)" }}>
            <div style={{ display: "flex", gap: "var(--space-10)" }}>
              {facts.map((fact) => (
                <article key={fact} className="panel" style={{ width: 420, height: 118, padding: "12px 20px", display: "grid", gap: "var(--space-2)" }}>
                  <span
                    style={{
                      background: "var(--main-default)",
                      color: "var(--text-on-accent)",
                      borderRadius: "var(--radius-pill)",
                      width: "fit-content",
                      padding: "3px 8px",
                      fontSize: "var(--font-size-xs)",
                      fontWeight: 700,
                    }}
                  >
                    SMART FACT
                  </span>
                  <strong style={{ fontSize: "var(--font-size-lg)" }}>{fact}</strong>
                  <span style={{ fontSize: "var(--font-size-xs)", color: "var(--text-secondary)" }}>
                    {fact.includes("quarter-finals") ? "World Cup History" : "South Africa 2010"}
                  </span>
                </article>
              ))}
            </div>

            <article className="panel" style={{ width: 320, height: 485, padding: 0, display: "grid", gap: 0, alignContent: "start" }}>
              <div style={{ padding: "20px 20px 12px", display: "flex", justifyContent: "space-between" }}>
                <strong style={{ fontSize: "var(--font-size-sm)", color: "var(--text-primary)" }}>• RATE PLAYERS</strong>
                <span style={{ fontSize: "var(--font-size-xs)", color: "var(--text-tertiary)" }}>1-10 SCALE</span>
              </div>
              <div style={{ padding: "12px 20px", display: "grid", gap: "var(--space-3)" }}>
              {(Object.keys(playersByTeam) as Array<keyof typeof playersByTeam>).map((team) => (
                <div key={team} style={{ display: "grid", gap: "var(--space-2)" }}>
                  <strong style={{ fontSize: "var(--font-size-xs)", color: "var(--text-secondary)" }}>• {team}</strong>
                  {playersByTeam[team].map((player) => (
                    <div
                      key={player}
                      style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: 8 }}
                    >
                      <div style={{ display: "grid", gap: "var(--space-1)" }}>
                        <span style={{ fontSize: "var(--font-size-xs)", color: "var(--text-primary)" }}>{player}</span>
                        <span style={{ fontSize: "var(--font-size-xs)", color: "var(--text-secondary)" }}>
                          #{player.includes("Tim Howard") ? "1 • Goalkeeper" : player.includes("Donovan") ? "10 • Forward" : player.includes("Dempsey") ? "8 • Midfielder" : player.includes("Gyan") ? "3 • Forward" : player.includes("Boateng") ? "23 • Midfielder" : "11 • Midfielder"}
                        </span>
                      </div>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                        <button
                          type="button"
                          onClick={() => changeRating(player, -1)}
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: "var(--radius-sm)",
                            border: "1px solid var(--border-subtle)",
                            background: "var(--surface-muted)",
                            color: "var(--text-secondary)",
                            cursor: "pointer",
                          }}
                        >
                          -
                        </button>
                        <span
                          style={{
                            minWidth: 36,
                            textAlign: "center",
                            borderRadius: "var(--radius-md)",
                            border: "1px solid var(--main-subtle)",
                            background: "var(--main-subtle)",
                            padding: "6px 8px",
                            fontSize: "var(--font-size-md)",
                            color: "var(--main-default)",
                          }}
                        >
                          {ratings[player]}
                        </span>
                        <button
                          type="button"
                          onClick={() => changeRating(player, 1)}
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: "var(--radius-sm)",
                            border: "1px solid var(--border-subtle)",
                            background: "var(--surface-muted)",
                            color: "var(--text-secondary)",
                            cursor: "pointer",
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}

              <button
                type="button"
                className="button-primary"
                style={{ width: "100%", marginTop: "var(--space-2)" }}
                onClick={() => setSubmitted(true)}
              >
                Submit ratings
              </button>
              {submitted && (
                <span style={{ color: "var(--main-default)", fontSize: "var(--font-size-sm)" }}>
                  Ratings submitted. Thanks for your match insight.
                </span>
              )}
              </div>
            </article>
          </div>
        )}

        <div style={{ display: "grid", justifyItems: "center" }}>
          <div className="panel" style={{ padding: 6, borderRadius: "var(--radius-pill)", display: "flex", gap: 4 }}>
            {(["Chill", "Smart"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setMode(item)}
                style={{ border: 0, background: "none", padding: 0, cursor: "pointer" }}
              >
                <FigmaPill active={mode === item}>{item}</FigmaPill>
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
