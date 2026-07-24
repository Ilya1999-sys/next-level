"use client";

import Link from "next/link";
import { useState } from "react";
import { FigmaPill } from "@/components/ui/figma-primitives";

const cameraModes = ["Player", "Referee", "Behind goal", "Drone"] as const;

export function PauseReplayScreen() {
  const [camera, setCamera] = useState<(typeof cameraModes)[number]>("Behind goal");
  const [mode, setMode] = useState<"Chill" | "Smart">("Smart");

  return (
    <main
      className="screen-root"
      style={{
        minHeight: "calc(100vh - 72px)",
        display: "grid",
        alignContent: "space-between",
        background:
          "linear-gradient(180deg, rgba(8,8,13,0.2), rgba(8,8,13,0.6)), url(https://www.figma.com/api/mcp/asset/1b76cfb3-2432-418d-8fff-bf705cbe0b0b) center/cover no-repeat",
      }}
    >
      <div style={{ display: "grid", justifyItems: "center", gap: 20 }}>
        <span className="title-small">View from</span>
        <div style={{ display: "flex", gap: 8 }}>
          {cameraModes.map((item) => (
            <button key={item} type="button" onClick={() => setCamera(item)} style={{ border: 0, background: "none", padding: 0 }}>
              <FigmaPill active={camera === item}>{item}</FigmaPill>
            </button>
          ))}
        </div>
      </div>

      <article className="panel" style={{ margin: "0 auto", width: 820, padding: 32, display: "grid", gap: 16, textAlign: "center" }}>
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
        <Link href="/match" className="button-primary" style={{ width: "fit-content", margin: "0 auto", padding: "18px 40px", borderRadius: "var(--radius-pill)" }}>
          Start playing
        </Link>
      </article>

      <div style={{ display: "grid", justifyItems: "center" }}>
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
