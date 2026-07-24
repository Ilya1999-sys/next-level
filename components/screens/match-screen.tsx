"use client";

import Link from "next/link";
import { useState } from "react";
import { FigmaPill } from "@/components/ui/figma-primitives";

const cameraModes = ["Player", "Referee", "Behind goal", "Drone"] as const;
const matchFacts = [
  "Ghana became only the 3rd African team to reach the World Cup quarter-finals.",
  "Asamoah Gyan's extra-time goal sealed the 2-1 comeback victory.",
];

export function MatchScreen() {
  const [camera, setCamera] = useState<(typeof cameraModes)[number]>("Behind goal");
  const [mode, setMode] = useState<"Chill" | "Smart">("Smart");

  return (
    <main
      className="screen-root"
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "calc(100vh - 72px)",
        background:
          "linear-gradient(150deg, rgba(8,8,13,0.8) 25%, rgba(8,8,13,0) 45%, rgba(8,8,13,0.65) 75%), url(https://www.figma.com/api/mcp/asset/1f214c1e-7aa3-48e6-82f0-52d8204a42ba) center/cover no-repeat",
      }}
    >
      <div style={{ display: "grid", justifyItems: "center", gap: 20 }}>
        <div style={{ display: "grid", gap: 10, justifyItems: "center" }}>
          <span className="title-small">View from</span>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
            {cameraModes.map((item) => (
              <button key={item} type="button" onClick={() => setCamera(item)} style={{ border: 0, background: "none", padding: 0 }}>
                <FigmaPill active={camera === item}>{item}</FigmaPill>
              </button>
            ))}
          </div>
        </div>

        <article className="panel" style={{ padding: "16px 32px", display: "grid", gap: 6, minWidth: 672 }}>
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
            <span style={{ background: "var(--accent-red)", borderRadius: 4, fontSize: 10, fontWeight: 700, padding: "3px 10px" }}>REPLAY</span>
            <strong style={{ fontSize: 22 }}>90:00+</strong>
            <span style={{ color: "var(--text-tertiary)", fontSize: "var(--font-size-sm)" }}>World Cup 2010</span>
          </div>
        </article>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
        <article className="panel" style={{ width: 320, padding: 20, display: "grid", gap: 12 }}>
          <header style={{ display: "flex", justifyContent: "space-between" }}>
            <strong style={{ fontSize: "var(--font-size-md)" }}>Rate players</strong>
            <span style={{ fontSize: "var(--font-size-sm)", color: "var(--text-tertiary)" }}>1-10 scale</span>
          </header>
          {[
            { team: "USA", players: ["Tim Howard", "Landon Donovan", "Clint Dempsey"] },
            { team: "Ghana", players: ["Asamoah Gyan", "Kevin-Prince Boateng", "Sulley Muntari"] },
          ].map((block) => (
            <div key={block.team} style={{ display: "grid", gap: 10 }}>
              <strong style={{ fontSize: "var(--font-size-sm)" }}>{block.team}</strong>
              {block.players.map((player) => (
                <div key={player} style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: "var(--font-size-md)" }}>{player}</span>
                  <span className="panel" style={{ borderRadius: 10, padding: "6px 8px", fontSize: "var(--font-size-sm)" }}>
                    8
                  </span>
                </div>
              ))}
            </div>
          ))}
          <button type="button" className="button-primary" style={{ width: "100%" }}>
            Submit ratings
          </button>
          <Link href="/match/pause" className="button-secondary" style={{ textAlign: "center" }}>
            Pause and replay
          </Link>
        </article>
      </div>

      <div style={{ marginTop: 28, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
        <div style={{ display: "flex", gap: 20 }}>
          {(mode === "Smart" ? matchFacts : [matchFacts[0]]).map((fact) => (
            <article key={fact} className="panel" style={{ width: 420, padding: 14, display: "grid", gap: 8 }}>
              <span style={{ background: "var(--accent-yellow)", color: "var(--surface-background)", borderRadius: 20, width: "fit-content", padding: "3px 8px", fontSize: 9, fontWeight: 700 }}>
                SMART FACT
              </span>
              <strong style={{ fontSize: "var(--font-size-lg)" }}>{fact}</strong>
            </article>
          ))}
        </div>

        <div className="panel" style={{ padding: 6, borderRadius: "var(--radius-pill)", display: "flex", gap: 4 }}>
          {(["Chill", "Smart"] as const).map((item) => (
            <button key={item} type="button" onClick={() => setMode(item)} style={{ border: 0, background: "none", padding: 0 }}>
              <FigmaPill active={mode === item}>{item}</FigmaPill>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
