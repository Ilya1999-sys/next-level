"use client";

import { useMemo, useState } from "react";
import { FigmaButton } from "@/components/ui/figma-primitives";
import { StatCard } from "@/components/ui/stat-card";

const PLAYER_ASSETS = {
  heroPhoto: "https://www.figma.com/api/mcp/asset/9e161120-c1ce-4e18-80d0-ea5356219ab0",
  featured: "https://www.figma.com/api/mcp/asset/98463c79-2d19-41c0-96b2-5b31e2a38426",
  card1: "https://www.figma.com/api/mcp/asset/064fcf20-75d3-4640-9664-a093656b7994",
  card2: "https://www.figma.com/api/mcp/asset/7fa1705d-6d71-4026-bcc8-35eed62a8b45",
  card3: "https://www.figma.com/api/mcp/asset/5e609242-dfae-46fe-b054-405e0ecc80e8",
  card4: "https://www.figma.com/api/mcp/asset/5db4c06f-08c8-449d-8a23-3679275d76b1",
  card5: "https://www.figma.com/api/mcp/asset/e883f266-24bb-4c8d-89e4-353c0ecc9fa6",
  card6: "https://www.figma.com/api/mcp/asset/66d85a9b-ab40-469e-8825-5c940e92655e",
  card7: "https://www.figma.com/api/mcp/asset/3d5ce26c-f340-466c-977f-0fb255487644",
  card8: "https://www.figma.com/api/mcp/asset/faaeaa88-a662-4aaa-b119-495e3e65f0dd",
  card9: "https://www.figma.com/api/mcp/asset/0d930d18-15bf-4736-bedc-2c800f00a3db",
};

const TAGS = ["All Moments", "Brilliant Goals", "Nostalgia", "Emotional Finals", "Missed Chances", "Winning Moments"] as const;

type MomentCategory = Exclude<(typeof TAGS)[number], "All Moments">;

type MomentCardData = {
  id: string;
  category: MomentCategory;
  title: string;
  meta: string;
  image: string;
  size: "small" | "large";
};

const HERO_STATS = [
  { label: "Goals", value: "25" },
  { label: "Assists", value: "15" },
  { label: "Rating", value: "8.7" },
  { label: "Matches", value: "48" },
] as const;

const MOMENTS: MomentCardData[] = [
  { id: "bg-1", category: "Brilliant Goals", title: "Hat-trick vs Bayern", meta: "UCL Knockout • 82:14", image: PLAYER_ASSETS.featured, size: "large" },
  { id: "bg-2", category: "Brilliant Goals", title: "Outside-foot finish in Clasico", meta: "La Liga • 64:09", image: PLAYER_ASSETS.card1, size: "small" },
  { id: "nost-1", category: "Nostalgia", title: "Monaco breakout sprint replay", meta: "Archive Clip • 2016", image: PLAYER_ASSETS.card8, size: "small" },
  { id: "nost-2", category: "Nostalgia", title: "First UCL knockout winner", meta: "Flashback • 2017", image: PLAYER_ASSETS.card9, size: "small" },
  { id: "win-1", category: "Winning Moments", title: "Match winner at Bernabeu", meta: "League Decider • 1-0", image: PLAYER_ASSETS.card4, size: "small" },
  { id: "miss-1", category: "Missed Chances", title: "One-on-one denied by near post", meta: "xG 0.78 • Tactical Breakdown", image: PLAYER_ASSETS.card3, size: "small" },
  { id: "emo-1", category: "Emotional Finals", title: "Final whistle tears after comeback", meta: "Cup Final • Full Stadium", image: PLAYER_ASSETS.card2, size: "small" },
  { id: "bg-3", category: "Brilliant Goals", title: "Volley strike from edge of box", meta: "UCL Night • 56:02", image: PLAYER_ASSETS.card5, size: "small" },
  { id: "nost-3", category: "Nostalgia", title: "Teenage sprint through midfield", meta: "Monaco Era • 2016", image: PLAYER_ASSETS.card8, size: "small" },
  { id: "win-2", category: "Winning Moments", title: "Semi-final dagger in transition", meta: "UCL Semi • 73:55", image: PLAYER_ASSETS.card5, size: "small" },
  { id: "emo-2", category: "Emotional Finals", title: "Captain lift with France", meta: "International Final • 90+4", image: PLAYER_ASSETS.card7, size: "small" },
  { id: "win-3", category: "Winning Moments", title: "Stoppage-time winner at home", meta: "League Classic • 90+2", image: PLAYER_ASSETS.card1, size: "large" },
  { id: "miss-2", category: "Missed Chances", title: "Volley over in stoppage time", meta: "Late Pressure • 88:31", image: PLAYER_ASSETS.card6, size: "small" },
  { id: "emo-3", category: "Emotional Finals", title: "Tribute goal celebration", meta: "Cup Night • 34:27", image: PLAYER_ASSETS.card2, size: "small" },
];

const POLLS = [
  { id: "next-goal", title: "Will he score a goal in the next match?", votes: 2847, points: "+150 PTS", options: ["Yes", "No"] },
  { id: "ucl-title", title: "Will he win the Champions League 2026-2027?", votes: 5942, points: "+300 PTS", options: ["Yes", "No"] },
  { id: "fifty-contrib", title: "Will he score more than 50 points this season (goals + assists)?", votes: 3384, points: "+300 PTS", options: ["Yes", "No"] },
  { id: "goals-range", title: "How many goals will he score this season?", votes: 3563, points: "+250 PTS", options: ["20-25 goals", "26-30 goals", "31+ goals"] },
] as const;

function MomentCard({ moment }: { moment: MomentCardData }) {
  if (moment.size === "large") {
    return (
      <article
        className="panel"
        style={{
          boxSizing: "border-box",
          gridColumn: "span 2",
          gridRow: "span 2",
          height: 683.25,
          padding: "var(--space-5)",
          display: "grid",
          gap: "var(--space-5)",
          background: "var(--accent-yellow)",
        }}
      >
        <img src={moment.image} alt={moment.title} style={{ width: "100%", height: 472.25, objectFit: "cover", borderRadius: "var(--radius-sm)" }} />
        <div style={{ display: "grid", gap: 12 }}>
          <span
            style={{
              width: "fit-content",
              borderRadius: "var(--radius-pill)",
              border: "1px solid var(--surface-background)",
              color: "var(--surface-background)",
              padding: "4px 10px",
              fontSize: "var(--font-size-xs)",
            }}
          >
            {moment.category}
          </span>
          <div style={{ display: "grid", gap: 8 }}>
            <strong style={{ color: "var(--surface-background)", fontSize: "var(--font-size-2xl)" }}>{moment.title}</strong>
            <span style={{ color: "var(--surface-background)", fontSize: "var(--font-size-lg)" }}>{moment.meta}</span>
          </div>
        </div>
        <FigmaButton variant="primary-black" fullWidth>
          Watch
        </FigmaButton>
      </article>
    );
  }

  return (
    <article className="panel" style={{ boxSizing: "border-box", height: 331.625, padding: "var(--space-3)", display: "grid", gap: 12, background: "var(--surface-background)" }}>
      <img src={moment.image} alt={moment.title} style={{ width: "100%", height: 200.625, objectFit: "cover", borderRadius: "var(--radius-md)" }} />
      <div style={{ display: "grid", gap: 12, padding: 8 }}>
        <span
          style={{
            width: "fit-content",
            borderRadius: "var(--radius-pill)",
            border: "1px solid var(--accent-yellow)",
            color: "var(--accent-yellow)",
            padding: "4px 10px",
            fontSize: "var(--font-size-xs)",
          }}
        >
          {moment.category}
        </span>
        <div style={{ display: "grid", gap: 4 }}>
          <strong style={{ fontSize: "var(--font-size-lg)", color: "var(--text-primary)" }}>{moment.title}</strong>
          <span style={{ color: "var(--text-secondary)", fontSize: "var(--font-size-sm)" }}>{moment.meta}</span>
        </div>
      </div>
    </article>
  );
}

export function PlayerStatDetailScreen() {
  const [activeTag, setActiveTag] = useState<(typeof TAGS)[number]>("All Moments");
  const [selectedVotes, setSelectedVotes] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Record<string, Record<string, number>>>(() =>
    Object.fromEntries(
      POLLS.map((poll) => [
        poll.id,
        Object.fromEntries(
          poll.options.map((option, index) => {
            const remainder = Math.max(1, poll.votes - 400 * poll.options.length);
            const base = Math.round(remainder / poll.options.length);
            return [option, base + index * 37];
          })
        ),
      ])
    )
  );

  const filteredMoments = useMemo(() => {
    if (activeTag === "All Moments") {
      return MOMENTS;
    }
    const categoryMoments = MOMENTS.filter((moment) => moment.category === activeTag);
    return categoryMoments.map((moment, index) => ({
      ...moment,
      size: index === 0 ? "large" : "small",
    }));
  }, [activeTag]);

  function submitVote(pollId: string, option: string) {
    setResults((prev) => {
      const current = { ...prev[pollId] };
      const previous = selectedVotes[pollId];
      if (previous) {
        current[previous] = Math.max(0, current[previous] - 1);
      }
      current[option] = (current[option] ?? 0) + 1;
      return { ...prev, [pollId]: current };
    });
    setSelectedVotes((prev) => ({ ...prev, [pollId]: option }));
  }

  return (
    <main className="screen-root" style={{ display: "grid", gridTemplateColumns: "minmax(0, 4fr) minmax(0, 1fr)", gap: "var(--space-10)", alignItems: "start" }}>
      <section style={{ minWidth: 0, display: "grid", gap: "var(--space-10)" }}>
        <article className="panel" style={{ boxSizing: "border-box", padding: "var(--space-5)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-10)" }}>
          <div style={{ minWidth: 0, flex: 1, display: "grid", gridTemplateColumns: "200px minmax(0, 1fr)", gap: "var(--space-5)", alignItems: "center" }}>
            <img src={PLAYER_ASSETS.heroPhoto} alt="Kylian Mbappe" style={{ width: 200, height: 138, borderRadius: "var(--radius-lg)", objectFit: "cover" }} />
            <div style={{ display: "grid", gap: "var(--space-2)" }}>
              <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center" }}>
                <span style={{ borderRadius: "var(--radius-sm)", background: "var(--main-subtle)", color: "var(--main-default)", fontSize: "var(--font-size-xs)", padding: "4px 10px" }}>
                  FORWARD • REAL MADRID
                </span>
                <span style={{ borderRadius: "var(--radius-sm)", background: "var(--surface-medium)", color: "var(--text-primary)", fontSize: "var(--font-size-xs)", padding: "4px 8px" }}>
                  #9
                </span>
              </div>
              <h1 style={{ margin: 0, fontSize: "var(--font-size-2xl)", lineHeight: "var(--line-height-h2)", letterSpacing: "var(--letter-spacing-h2)" }}>
                Kylian MBAPPE
              </h1>
              <span style={{ color: "var(--text-tertiary)", fontSize: "var(--font-size-md)", fontWeight: "var(--font-weight-semibold)" }}>
                FRANCE NATIONAL TEAM • LA LIGA ESPANA
              </span>
            </div>
          </div>
          <div style={{ display: "inline-flex", gap: 12, flexShrink: 0 }}>
            {HERO_STATS.map((stat) => (
              <StatCard key={stat.label} label={stat.label} value={stat.value} />
            ))}
          </div>
        </article>

        <section style={{ display: "grid", gap: "var(--space-5)" }}>
          <div style={{ minHeight: 43, display: "flex", flexWrap: "nowrap", gap: "var(--space-3)", overflowX: "auto" }}>
            {TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                style={{
                  boxSizing: "border-box",
                  height: 43,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "var(--radius-pill)",
                  border: activeTag === tag ? "none" : "1px solid var(--border-default)",
                  background: activeTag === tag ? "var(--main-default)" : "var(--surface-overlay)",
                  color: activeTag === tag ? "var(--text-on-accent)" : "var(--text-primary)",
                  padding: "12px 40px",
                  fontSize: "var(--font-size-md)",
                  fontWeight: "var(--font-weight-semibold)",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                {tag}
              </button>
            ))}
          </div>

          <section
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: "var(--space-5)",
              gridAutoFlow: "dense",
              alignItems: "start",
            }}
          >
            {filteredMoments.map((moment) => (
              <MomentCard key={moment.id} moment={moment} />
            ))}
          </section>
        </section>
      </section>

      <aside style={{ minWidth: 0, display: "grid", gap: "var(--space-5)", alignContent: "start" }}>
        <div style={{ display: "grid", gap: "var(--space-1)" }}>
          <h3 style={{ margin: 0, fontSize: "var(--font-size-xl)" }}>Fan Zone Arena</h3>
          <span style={{ color: "var(--text-secondary)", fontSize: "var(--font-size-sm)" }}>Predict outcomes & claim digital rewards</span>
        </div>

        <article className="panel" style={{ padding: "var(--space-5)", display: "grid", gap: "var(--space-5)" }}>
          <span style={{ color: "var(--main-default)", fontSize: "var(--font-size-xs)" }}>VIP Perks</span>
          <span style={{ color: "var(--text-secondary)", fontSize: "var(--font-size-xs)" }}>
            Earn points to unlock: Early highlights, Personal life events, Expert transfer insights.
          </span>
        </article>

        {POLLS.map((poll) => {
          const pollResults = results[poll.id] ?? {};
          const selected = selectedVotes[poll.id];
          const totalVotes = Object.values(pollResults).reduce((sum, count) => sum + count, 0);
          const showResults = Boolean(selected);

          return (
            <article key={poll.id} className="panel" style={{ padding: "var(--space-5)", display: "grid", gap: "var(--space-5)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "var(--main-default)", fontSize: "var(--font-size-xs)" }}>FAN PREDICTION</span>
                <span style={{ color: "var(--main-default)", fontSize: "var(--font-size-xs)", border: "1px solid var(--main-default)", borderRadius: "var(--radius-sm)", padding: "4px 8px", background: "var(--main-subtle)" }}>
                  {poll.points}
                </span>
              </div>

              <p style={{ margin: 0, color: "var(--text-primary)", fontSize: "var(--font-size-lg)", lineHeight: "var(--line-height-t1)" }}>{poll.title}</p>

              {!showResults ? (
                <div style={{ display: "grid", gridTemplateColumns: poll.options.length === 2 ? "1fr 1fr" : "1fr", gap: 8 }}>
                  {poll.options.map((option) => (
                    <button key={option} type="button" onClick={() => submitVote(poll.id, option)} className="button-secondary" style={{ height: 43, justifyContent: "center" }}>
                      {option}
                    </button>
                  ))}
                </div>
              ) : (
                <div style={{ display: "grid", gap: 8 }}>
                  {poll.options.map((option) => {
                    const count = pollResults[option] ?? 0;
                    const percent = totalVotes ? Math.round((count / totalVotes) * 100) : 0;
                    const isSelected = selected === option;
                    return (
                      <div key={option} style={{ display: "grid", gap: 4 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--font-size-xs)" }}>
                          <span style={{ color: isSelected ? "var(--main-default)" : "var(--text-primary)", fontWeight: isSelected ? 700 : 500 }}>{option}</span>
                          <span style={{ color: "var(--text-secondary)" }}>{count.toLocaleString()} ({percent}%)</span>
                        </div>
                        <div style={{ height: 8, borderRadius: "var(--radius-pill)", background: "var(--surface-muted)", overflow: "hidden" }}>
                          <div style={{ width: `${percent}%`, height: "100%", background: isSelected ? "var(--main-default)" : "var(--surface-heavy)" }} />
                        </div>
                      </div>
                    );
                  })}
                  <span style={{ color: "var(--main-default)", fontSize: "var(--font-size-xs)" }}>You voted for: {selected}</span>
                </div>
              )}

              <span style={{ color: "var(--text-tertiary)", fontSize: "var(--font-size-xs)" }}>{totalVotes.toLocaleString()} votes cast • LIVE POLL</span>
            </article>
          );
        })}
      </aside>
    </main>
  );
}
