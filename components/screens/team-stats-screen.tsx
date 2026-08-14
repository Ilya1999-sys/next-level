"use client";

import { useState } from "react";
import { FigmaButton } from "@/components/ui/figma-primitives";

const TEAM_ASSETS = {
  hero: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=1800&q=80",
  badge:
    "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=120&q=80",
};

const keyMoments = [
  { title: "La Decima", detail: "Historic 10th UCL title in Lisbon, 2014." },
  { title: "15 Champions Leagues", detail: "Most decorated club in European competition." },
  { title: "Galacticos Era", detail: "Global football brand with iconic world stars." },
];

export function TeamStatsScreen() {
  const [vote, setVote] = useState<"yes" | "no" | null>(null);

  return (
    <main className="screen-root" style={{ display: "grid", gridTemplateColumns: "400px 1fr", gap: 28 }}>
      <aside style={{ display: "grid", gap: 20 }}>
        <article className="panel" style={{ padding: 20, display: "grid", gap: 10 }}>
          <div style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: 20, alignItems: "center" }}>
            <img src={TEAM_ASSETS.badge} alt="Real Madrid crest" style={{ width: 80, height: 80, borderRadius: 40, objectFit: "cover" }} />
            <div style={{ display: "grid", gap: 6 }}>
              <span style={{ color: "var(--accent-yellow)", fontWeight: 700, fontSize: "var(--font-size-sm)" }}>
                CLUB PROFILE
              </span>
              <h1 style={{ margin: 0, fontSize: "var(--font-size-2xl)", lineHeight: "var(--line-height-h2)" }}>Real Madrid</h1>
              <span style={{ color: "var(--text-tertiary)", fontSize: "var(--font-size-sm)" }}>
                Santiago Bernabeu • La Liga
              </span>
            </div>
          </div>
        </article>

        <article className="panel" style={{ padding: 24, display: "grid", gap: 12 }}>
          <span style={{ color: "var(--accent-yellow)", fontWeight: 700, fontSize: "var(--font-size-sm)" }}>
            FAN PREDICTION
          </span>
          <h2 style={{ margin: 0 }}>Will Real Madrid reach another Champions League final this season?</h2>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: "var(--font-size-md)" }}>
              <span>Yes</span>
              <span style={{ color: "var(--accent-yellow)" }}>72% voted</span>
            </div>
            <div style={{ height: 10, background: "var(--surface-muted)", borderRadius: "var(--radius-sm)" }}>
              <div style={{ width: "72%", height: "100%", background: "var(--main-default)", borderRadius: "var(--radius-sm)" }} />
            </div>
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: "var(--font-size-md)" }}>
              <span>No</span>
              <span style={{ color: "var(--text-secondary)" }}>28% voted</span>
            </div>
            <div style={{ height: 10, background: "var(--surface-muted)", borderRadius: "var(--radius-sm)" }}>
              <div style={{ width: "28%", height: "100%", background: "var(--surface-heavy)", borderRadius: "var(--radius-sm)" }} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button type="button" className="button-secondary" style={{ flex: 1 }} onClick={() => setVote("yes")}>
              Yes, they will
            </button>
            <button type="button" className="button-secondary" style={{ flex: 1 }} onClick={() => setVote("no")}>
              No, not this season
            </button>
          </div>
          {vote && (
            <span style={{ color: "var(--text-secondary)", fontSize: "var(--font-size-sm)" }}>
              You voted: {vote === "yes" ? "Yes" : "No"}.
            </span>
          )}
        </article>
      </aside>

      <section style={{ display: "grid", gap: 20 }}>
        <article className="panel" style={{ overflow: "hidden" }}>
          <div
            style={{
              minHeight: 420,
              background: `linear-gradient(180deg, rgba(8,8,13,0.15), rgba(8,8,13,0.7)), url(${TEAM_ASSETS.hero}) center/cover no-repeat`,
              display: "grid",
              placeItems: "center",
            }}
          >
            <button
              type="button"
              className="button-primary"
              style={{ borderRadius: "var(--radius-md)", width: 64, height: 64, padding: 0, fontSize: "var(--font-size-xl)" }}
            >
              ▶
            </button>
          </div>
          <div style={{ padding: 24, display: "grid", gap: 12 }}>
            <span style={{ color: "var(--accent-yellow)", fontWeight: 700, fontSize: "var(--font-size-sm)" }}>
              TEAM HIGHLIGHT REEL
            </span>
            <h3 style={{ margin: 0 }}>Real Madrid: Legacy and elite moments</h3>
            <p style={{ margin: 0, color: "var(--text-secondary)" }}>
              Relive iconic goals, tactical masterclasses, and historic Champions League nights.
            </p>
            <FigmaButton>Play highlights</FigmaButton>
          </div>
        </article>

        <article className="panel" style={{ padding: 24, display: "grid", gap: 14 }}>
          <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <strong>Key team moments</strong>
            <span style={{ color: "var(--accent-yellow)" }}>Real Madrid archive</span>
          </header>
          <div className="cards-grid">
            {keyMoments.map((moment) => (
              <article key={moment.title} className="stat-card">
                <strong>{moment.title}</strong>
                <span style={{ color: "var(--text-secondary)", fontSize: "var(--font-size-md)" }}>{moment.detail}</span>
              </article>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
