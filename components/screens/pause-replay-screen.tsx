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
        padding: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background:
          "linear-gradient(180deg, rgba(8,8,13,0.2), rgba(8,8,13,0.6)), url(https://www.figma.com/api/mcp/asset/d7f3dd32-7446-4a05-9f96-3e2a8b8b8158) center/cover no-repeat",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 40px 0 40px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", borderRadius: "var(--radius-xs)", overflow: "hidden" }}>
          <span style={{ background: "var(--surface-background)", color: "var(--text-primary)", padding: "6px 10px", fontSize: "var(--font-size-xl)", fontWeight: "var(--font-weight-bold)" }}>
            HOME
          </span>
          <span style={{ background: "var(--text-primary)", color: "var(--surface-background)", padding: "6px 12px", fontSize: "var(--font-size-2xl)", fontWeight: "var(--font-weight-black)" }}>
            0 - AWAY 0
          </span>
        </div>
        <strong style={{ color: "var(--text-primary)", fontSize: "var(--font-size-2xl)" }}>90:00+</strong>
      </div>

      <div style={{ display: "grid", gap: 12, justifyItems: "center", paddingTop: "var(--space-5)", paddingBottom: "var(--space-5)" }}>
        <span className="title-small">VIEW FROM</span>
        <div style={{ display: "flex", gap: "var(--space-2)" }}>
          {cameraModes.map((item) => (
            <button key={item} type="button" onClick={() => setCamera(item)} style={{ border: 0, background: "none", padding: 0, cursor: "pointer" }}>
              <FigmaPill active={camera === item}>{item}</FigmaPill>
            </button>
          ))}
        </div>
      </div>

      <article className="panel" style={{ margin: "20px auto 0", width: 820, height: 250, padding: "var(--space-10)", display: "grid", gap: "var(--space-5)", textAlign: "center", alignContent: "center", justifyItems: "center" }}>
        <span style={{ width: "fit-content", margin: "0 auto", background: "var(--main-default)", color: "var(--text-on-accent)", padding: "4px 12px", borderRadius: "var(--radius-pill)", fontSize: "var(--font-size-xs)" }}>
          GYAN'S WINNER • 82:00
        </span>
        <h1 style={{ margin: 0, fontSize: "var(--font-size-xl)", lineHeight: "var(--line-height-t2)" }}>Replay Ghana&apos;s winning goal in FIFA</h1>
        <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: "var(--font-size-lg)" }}>Step into Gyan&apos;s boots. Can you score this legendary goal?</p>
        <Link href="/match/usa-vs-ghana-2010/fifa" className="button-primary" style={{ width: "fit-content", margin: "0 auto", padding: "16px 32px", borderRadius: "var(--radius-pill)" }}>
          Start playing
        </Link>
      </article>

      <div style={{ marginTop: "auto", paddingBottom: "var(--space-5)", display: "grid", justifyItems: "center" }}>
        <div className="panel" style={{ padding: "var(--space-2)", borderRadius: "var(--radius-pill)", display: "flex", gap: 4, background: "var(--surface-secondary)" }}>
          {(["Chill", "Smart"] as const).map((item) => (
            <button key={item} type="button" onClick={() => setMode(item)} style={{ border: 0, background: "none", padding: 0, cursor: "pointer" }}>
              <FigmaPill active={mode === item}>{item}</FigmaPill>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
