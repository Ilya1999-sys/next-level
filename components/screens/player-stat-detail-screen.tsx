"use client";

import { useMemo, useState } from "react";
import { FigmaButton } from "@/components/ui/figma-primitives";
import { VideoCard } from "@/components/shared/video-card";

const playerAssets = {
  avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=180&q=80",
  life1: "https://www.figma.com/api/mcp/asset/6287d05d-fd09-4362-922f-1fba71530b3f",
  life2: "https://www.figma.com/api/mcp/asset/26d487d4-95cb-4632-9232-cb52f7aad028",
  life3: "https://www.figma.com/api/mcp/asset/7afc937d-cb4c-416a-8d44-c86ea5bb26f7",
  life4: "https://www.figma.com/api/mcp/asset/06d2146f-64c3-4b46-bfe5-8338416727e9",
  videoPoster: "https://www.figma.com/api/mcp/asset/d9028484-8657-4a8a-bdee-3e002a2674ae",
};

type VoteOption = "yes" | "no";

export function PlayerStatDetailScreen() {
  const [selection, setSelection] = useState<VoteOption | null>(null);
  const [baseVotes, setBaseVotes] = useState({ yes: 23156, no: 11410 });
  const [bonuses, setBonuses] = useState(840);

  const totalVotes = baseVotes.yes + baseVotes.no;
  const yesPercent = Math.round((baseVotes.yes / totalVotes) * 100);
  const noPercent = 100 - yesPercent;

  const potentialPoints = useMemo(() => (selection === "yes" ? 120 : selection === "no" ? 90 : 0), [selection]);

  function submitVote(option: VoteOption) {
    setBaseVotes((prev) => {
      if (selection === option) {
        return prev;
      }
      if (!selection) {
        return { ...prev, [option]: prev[option] + 1 };
      }
      return {
        ...prev,
        [selection]: Math.max(prev[selection] - 1, 0),
        [option]: prev[option] + 1,
      };
    });
    setSelection(option);
  }

  return (
    <main className="screen-root" style={{ display: "grid", gridTemplateColumns: "400px 1fr", gap: 28, alignItems: "start" }}>
      <aside style={{ width: 400, display: "grid", gap: 20 }}>
        <article className="panel" style={{ padding: 20, minHeight: 168, display: "grid", gap: 20, alignContent: "center" }}>
          <div style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: 20, alignItems: "center" }}>
            <img src={playerAssets.avatar} alt="Kylian Mbappe" style={{ width: 80, height: 80, borderRadius: 40, objectFit: "cover" }} />
            <div style={{ display: "grid", gap: 6 }}>
              <span style={{ color: "var(--accent-yellow)", fontWeight: 700, fontSize: "var(--font-size-sm)" }}>
                #9 FORWARD • REAL MADRID
              </span>
              <h1 style={{ margin: 0, fontSize: 32, lineHeight: 1 }}>
                Kylian MBAPPE
              </h1>
              <span style={{ color: "var(--text-tertiary)", fontSize: "var(--font-size-sm)" }}>
                FRANCE NATIONAL TEAM • LA LIGA
              </span>
            </div>
          </div>
        </article>

        <article className="panel" style={{ padding: 20, minHeight: 310, display: "grid", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--accent-yellow)" }} />
            <span style={{ color: "var(--accent-yellow)", fontWeight: 700, fontSize: "var(--font-size-sm)" }}>FAN PREDICTION</span>
          </div>
          <h2 style={{ margin: 0, fontSize: 22, lineHeight: 1.2 }}>{`Will Mbappe break Ronaldo's Champions League record this season?`}</h2>

          <div style={{ display: "grid", gap: 12 }}>
            <div style={{ display: "grid", gap: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--font-size-md)" }}>
                <span>Yes</span>
                <span style={{ color: "var(--accent-yellow)" }}>{yesPercent}% voted</span>
              </div>
              <div style={{ height: 10, borderRadius: 5, background: "var(--surface-muted)" }}>
                <div style={{ width: `${yesPercent}%`, height: "100%", borderRadius: 5, background: "var(--accent-yellow)" }} />
              </div>
            </div>

            <div style={{ display: "grid", gap: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--font-size-md)" }}>
                <span>No</span>
                <span style={{ color: "var(--text-secondary)" }}>{noPercent}% voted</span>
              </div>
              <div style={{ height: 10, borderRadius: 5, background: "var(--surface-muted)" }}>
                <div style={{ width: `${noPercent}%`, height: "100%", borderRadius: 5, background: "rgba(255,255,255,0.3)" }} />
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <button
              type="button"
              onClick={() => submitVote("yes")}
              className="button-secondary"
              style={{
                flex: 1,
                color: selection === "yes" ? "var(--text-primary)" : "var(--accent-yellow)",
                borderColor: selection === "yes" ? "var(--accent-yellow)" : "rgba(255,255,255,0.15)",
                background: "rgba(255,255,255,0.06)",
              }}
            >
              Yes, he will
            </button>
            <button
              type="button"
              onClick={() => submitVote("no")}
              className="button-secondary"
              style={{
                flex: 1,
                color: selection === "no" ? "var(--text-primary)" : "var(--accent-yellow)",
                borderColor: selection === "no" ? "var(--accent-yellow)" : "rgba(255,255,255,0.15)",
                background: "rgba(255,255,255,0.06)",
              }}
            >
              No, not yet
            </button>
          </div>

          <div style={{ display: "grid", gap: 4 }}>
            <span style={{ color: "var(--text-tertiary)", fontSize: "var(--font-size-sm)" }}>
              {totalVotes.toLocaleString()} votes cast • LIVE POLL
            </span>
            <span style={{ color: "var(--accent-yellow)", fontSize: "var(--font-size-sm)" }}>
              {selection ? `If your prediction is correct: +${potentialPoints} points` : "Vote to see potential points reward"}
            </span>
            {selection && (
              <button
                type="button"
                onClick={() => {
                  setSelection(null);
                }}
                style={{
                  marginTop: 4,
                  width: "fit-content",
                  border: "none",
                  background: "transparent",
                  color: "var(--text-secondary)",
                  fontSize: "var(--font-size-sm)",
                  textDecoration: "underline",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                Change my vote
              </button>
            )}
          </div>
        </article>

        <article className="panel" style={{ padding: 24, minHeight: 409, display: "grid", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--accent-yellow)" }} />
            <span style={{ color: "var(--accent-yellow)", fontWeight: 700, fontSize: "var(--font-size-sm)" }}>PERSONAL LIFE</span>
          </div>
          <h3 style={{ margin: 0, fontSize: 20 }}>Beyond the pitch</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
            {[playerAssets.life1, playerAssets.life2, playerAssets.life3, playerAssets.life4].map((image, index) => (
              <img
                key={`${image}-${index}`}
                src={image}
                alt="Mbappe personal moment"
                style={{ width: "100%", height: 96, objectFit: "cover", borderRadius: 12 }}
              />
            ))}
          </div>
          <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: "var(--font-size-md)" }}>
            Grew up in Bondy, started at AS Monaco aged 16.
          </p>
          <FigmaButton variant="secondary">Learn more</FigmaButton>
        </article>
      </aside>

      <section style={{ display: "grid", gap: 20 }}>
        <VideoCard
          src="https://assets.mixkit.co/videos/43483/43483-720.mp4"
          poster={playerAssets.videoPoster}
          eyebrow="PLAYER FACTS & VOICE"
          title="Mbappe's tactical breakdown"
          description="Watch Mbappe's top-moment style reel with smooth playback and analysis context."
          mediaAspectRatio="1332 / 620"
          mediaMinHeight={520}
          mediaMaxHeight={760}
          contentMinHeight={182}
          footer={
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <FigmaButton variant="secondary">Play audio analysis</FigmaButton>
              <span style={{ color: "var(--accent-yellow)", fontSize: "var(--font-size-sm)" }}>Bonuses: {bonuses}</span>
            </div>
          }
        />
      </section>
    </main>
  );
}
