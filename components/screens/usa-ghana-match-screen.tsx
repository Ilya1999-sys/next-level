"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { FigmaButton, FigmaPill } from "@/components/ui/figma-primitives";

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [camera, setCamera] = useState<(typeof cameraModes)[number]>("Behind goal");
  const [mode, setMode] = useState<"Chill" | "Smart">("Smart");
  const [paused, setPaused] = useState(false);
  const [showReplayOverlay, setShowReplayOverlay] = useState(false);
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

  function pauseMatch() {
    videoRef.current?.pause();
    setPaused(true);
    setShowReplayOverlay(true);
  }

  function continueMatch() {
    void videoRef.current?.play();
    setPaused(false);
    setShowReplayOverlay(false);
  }

  return (
    <main
      className="screen-root"
      style={{
        minHeight: "calc(100vh - 72px)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        onPlay={() => {
          setPaused(false);
          setShowReplayOverlay(false);
        }}
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
          background:
            "linear-gradient(150deg, rgba(8,8,13,0.8) 24%, rgba(8,8,13,0.05) 40%, rgba(8,8,13,0.62) 72%)",
          zIndex: 1,
        }}
      />

      <div style={{ position: "relative", zIndex: 2, display: "grid", gap: 20 }}>
        <div style={{ display: "grid", justifyItems: "center", gap: 10 }}>
          <span className="title-small">View from</span>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
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

        <article className="panel" style={{ margin: "0 auto", padding: "16px 32px", display: "grid", gap: 6, minWidth: 672 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: 20 }}>
            <div>
              <strong style={{ fontSize: 20 }}>USA</strong>
              <div style={{ fontSize: "var(--font-size-sm)", color: "var(--text-tertiary)" }}>HOME</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ color: "var(--accent-yellow)", fontWeight: 900, fontSize: "var(--font-size-hero-score)" }}>1</span>
              <span style={{ fontSize: 36 }}>-</span>
              <span style={{ fontWeight: 900, fontSize: "var(--font-size-hero-score)" }}>2</span>
            </div>
            <div style={{ textAlign: "right" }}>
              <strong style={{ fontSize: 20 }}>Ghana</strong>
              <div style={{ fontSize: "var(--font-size-sm)", color: "var(--text-tertiary)" }}>AWAY</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "center" }}>
            <span style={{ background: "var(--accent-red)", borderRadius: 4, fontSize: 10, fontWeight: 700, padding: "3px 10px" }}>
              REPLAY
            </span>
            <strong style={{ fontSize: 22 }}>90:00+</strong>
            <span style={{ color: "var(--text-tertiary)", fontSize: "var(--font-size-sm)" }}>World Cup 2010</span>
          </div>
        </article>
      </div>

      <div style={{ position: "relative", zIndex: 2, flex: 1, display: "grid", alignItems: "center" }}>
        {showReplayOverlay && (
          <article
            className="panel"
            style={{ position: "relative", width: 820, margin: "0 auto", padding: 32, display: "grid", gap: 16, textAlign: "center" }}
          >
            <button
              type="button"
              aria-label="Close replay panel"
              onClick={continueMatch}
              style={{
                position: "absolute",
                right: 16,
                top: 12,
                border: "none",
                background: "transparent",
                color: "var(--text-secondary)",
                fontSize: 22,
                cursor: "pointer",
              }}
            >
              ×
            </button>
            <span
              style={{
                width: "fit-content",
                margin: "0 auto",
                background: "var(--accent-yellow)",
                color: "var(--surface-background)",
                padding: "4px 12px",
                borderRadius: "var(--radius-pill)",
                fontSize: "var(--font-size-sm)",
                fontWeight: 700,
              }}
            >
              GYAN'S WINNER • 82:00
            </span>
            <h1 style={{ margin: 0, fontSize: 40 }}>Replay Ghana&apos;s winning goal in FIFA</h1>
            <p style={{ margin: 0, color: "var(--text-secondary)" }}>
              Step into Gyan&apos;s boots. Can you score this legendary goal?
            </p>
            <Link
              href="/match/usa-vs-ghana-2010/fifa"
              className="button-primary"
              style={{ width: "fit-content", margin: "0 auto", padding: "18px 40px", borderRadius: "var(--radius-pill)" }}
            >
              Start playing
            </Link>
          </article>
        )}
      </div>

      <div style={{ position: "absolute", left: 26, bottom: 26, zIndex: 3 }}>
        {!paused ? (
          <button
            type="button"
            onClick={pauseMatch}
            className="button-primary"
            style={{ borderRadius: "var(--radius-pill)", padding: "12px 20px", display: "inline-flex", alignItems: "center", gap: 8 }}
          >
            ❚❚ Pause
          </button>
        ) : (
          <button
            type="button"
            onClick={continueMatch}
            className="button-primary"
            style={{ borderRadius: "var(--radius-pill)", padding: "12px 20px", display: "inline-flex", alignItems: "center", gap: 8 }}
          >
            ▶ Continue
          </button>
        )}
      </div>

      <div style={{ position: "relative", zIndex: 2, display: "grid", gap: 18 }}>
        {mode === "Smart" && !showReplayOverlay && (
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20 }}>
            <div style={{ display: "flex", gap: 20 }}>
              {facts.map((fact) => (
                <article key={fact} className="panel" style={{ width: 420, padding: 14, display: "grid", gap: 8 }}>
                  <span
                    style={{
                      background: "var(--accent-yellow)",
                      color: "var(--surface-background)",
                      borderRadius: 20,
                      width: "fit-content",
                      padding: "3px 8px",
                      fontSize: 9,
                      fontWeight: 700,
                    }}
                  >
                    SMART FACT
                  </span>
                  <strong style={{ fontSize: "var(--font-size-lg)" }}>{fact}</strong>
                </article>
              ))}
            </div>

            <article className="panel" style={{ width: 320, padding: 20, display: "grid", gap: 12 }}>
              <header style={{ display: "flex", justifyContent: "space-between" }}>
                <strong style={{ fontSize: "var(--font-size-md)" }}>Rate players</strong>
                <span style={{ fontSize: "var(--font-size-sm)", color: "var(--text-tertiary)" }}>1-10 scale</span>
              </header>

              {(Object.keys(playersByTeam) as Array<keyof typeof playersByTeam>).map((team) => (
                <div key={team} style={{ display: "grid", gap: 10 }}>
                  <strong style={{ fontSize: "var(--font-size-sm)" }}>{team}</strong>
                  {playersByTeam[team].map((player) => (
                    <div
                      key={player}
                      style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: 8 }}
                    >
                      <span style={{ fontSize: "var(--font-size-md)" }}>{player}</span>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                        <button
                          type="button"
                          onClick={() => changeRating(player, -1)}
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: 6,
                            border: "1px solid var(--border-subtle)",
                            background: "rgba(255,255,255,0.06)",
                            color: "var(--text-secondary)",
                            cursor: "pointer",
                          }}
                        >
                          -
                        </button>
                        <span
                          className="panel"
                          style={{
                            minWidth: 36,
                            textAlign: "center",
                            borderRadius: 10,
                            padding: "6px 8px",
                            fontSize: "var(--font-size-sm)",
                            color: "var(--accent-yellow)",
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
                            borderRadius: 6,
                            border: "1px solid var(--border-subtle)",
                            background: "rgba(255,255,255,0.06)",
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
                style={{ width: "100%" }}
                onClick={() => setSubmitted(true)}
              >
                Submit ratings
              </button>
              {submitted && (
                <span style={{ color: "var(--accent-yellow)", fontSize: "var(--font-size-sm)" }}>
                  Ratings submitted. Thanks for your match insight.
                </span>
              )}
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
