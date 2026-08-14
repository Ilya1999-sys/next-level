import Link from "next/link";
import { FigmaButton } from "@/components/ui/figma-primitives";

const favoritePlayers = [
  { name: "Kylian Mbappe", team: "Real Madrid", trend: "+12%" },
  { name: "Vinicius Jr", team: "Real Madrid", trend: "+8%" },
  { name: "Jude Bellingham", team: "Real Madrid", trend: "+10%" },
];

const favoriteTeams = [
  { name: "Real Madrid", metric: "xG per match", value: "2.18" },
  { name: "France NT", metric: "Win rate", value: "74%" },
  { name: "PSG Archive", metric: "Highlights watched", value: "31" },
];

const watchedMatches = [
  { title: "Ghana 2010 documentary", status: "Watched", minutes: "48 min" },
  { title: "PSG vs Monaco highlights", status: "In progress", minutes: "19 min" },
  { title: "Mbappe tactical breakdown", status: "Rewatch", minutes: "12 min" },
];

export function PlayerStatsScreen() {
  return (
    <main className="screen-root" style={{ display: "grid", gap: 20 }}>
      <header className="panel" style={{ padding: 24, display: "grid", gap: 8 }}>
        <span style={{ color: "var(--accent-yellow)", fontWeight: 700, fontSize: "var(--font-size-sm)" }}>
          STATS HUB
        </span>
        <h1 style={{ margin: 0, fontSize: "var(--font-size-2xl)" }}>Your football statistics overview</h1>
        <p style={{ margin: 0, color: "var(--text-secondary)", maxWidth: 760 }}>
          Track favorite players, clubs, and watched content. Use this page as the entry point into deep player statistics.
        </p>
      </header>

      <section style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 20 }}>
        <article className="panel" style={{ padding: 24, display: "grid", gap: 14 }}>
          <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <strong>Favorite players</strong>
            <span style={{ color: "var(--accent-yellow)", fontSize: "var(--font-size-sm)" }}>Live trends</span>
          </header>
          <div style={{ display: "grid", gap: 10 }}>
            {favoritePlayers.map((player, index) => (
              <div
                key={player.name}
                style={{
                  borderRadius: "var(--radius-md)",
                  padding: "var(--space-3)",
                  background: "var(--surface-muted)",
                  border: "1px solid var(--border-subtle)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "grid", gap: 2 }}>
                  <strong>{player.name}</strong>
                  <span style={{ color: "var(--text-tertiary)", fontSize: "var(--font-size-sm)" }}>{player.team}</span>
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <span style={{ color: "var(--accent-yellow)" }}>{player.trend}</span>
                  {index === 0 ? (
                    <Link href="/player-stats/mbappe">
                      <FigmaButton variant="secondary" element="span">
                        Open profile
                      </FigmaButton>
                    </Link>
                  ) : (
                    <FigmaButton variant="secondary">Details</FigmaButton>
                  )}
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="panel" style={{ padding: 24, display: "grid", gap: 14 }}>
          <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <strong>Favorite teams</strong>
            <span style={{ color: "var(--text-tertiary)", fontSize: "var(--font-size-sm)" }}>This week</span>
          </header>
          <div style={{ display: "grid", gap: 10 }}>
            {favoriteTeams.map((team) => (
              <div
                key={team.name}
                style={{
                  borderRadius: "var(--radius-md)",
                  padding: "var(--space-3)",
                  background: "var(--surface-muted)",
                  border: "1px solid var(--border-subtle)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "grid", gap: 2 }}>
                  <strong>{team.name}</strong>
                  <span style={{ color: "var(--text-tertiary)", fontSize: "var(--font-size-sm)" }}>{team.metric}</span>
                </div>
                <strong style={{ color: "var(--accent-yellow)" }}>{team.value}</strong>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="panel" style={{ padding: 24, display: "grid", gap: 14 }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <strong>Watched matches and reels</strong>
          <span style={{ color: "var(--text-tertiary)", fontSize: "var(--font-size-sm)" }}>Recent activity</span>
        </header>
        <div className="cards-grid">
          {watchedMatches.map((match) => (
            <article key={match.title} className="stat-card">
              <div style={{ height: 84, borderRadius: "var(--radius-sm)", background: "var(--surface-heavy)" }} />
              <strong>{match.title}</strong>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)", fontSize: "var(--font-size-sm)" }}>
                <span>{match.status}</span>
                <span>{match.minutes}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
