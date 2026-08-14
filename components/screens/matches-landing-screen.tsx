import Link from "next/link";
import { FigmaButton } from "@/components/ui/figma-primitives";

const CATEGORY_DATA = [
  {
    title: "Online",
    matches: [
      {
        title: "Madrid training feed",
        subtitle: "Live now",
        cover: "https://images.unsplash.com/photo-1543357480-c60d40007a3f?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "France tactical room",
        subtitle: "Live now",
        cover: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "PSG post-match room",
        subtitle: "Live now",
        cover: "https://images.unsplash.com/photo-1556056504-5c7696c4c28d?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
  {
    title: "Interesting",
    matches: [
      {
        title: "USA vs Ghana 2010",
        subtitle: "World Cup round of 16",
        href: "/match/usa-vs-ghana-2010",
        cover: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "Arsenal vs City analytics",
        subtitle: "Data review",
        cover: "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "Ajax 1995 full replay",
        subtitle: "Classic archive",
        cover: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
  {
    title: "Emotional",
    matches: [
      {
        title: "Last-minute finals",
        subtitle: "Iconic moments",
        cover: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "National anthem tunnel",
        subtitle: "Pre-game atmosphere",
        cover: "https://images.unsplash.com/photo-1570498839593-e565b39455fc?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "Derby crowd reactions",
        subtitle: "Fan reactions",
        cover: "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
  {
    title: "Many goals",
    matches: [
      {
        title: "France 4-3 classics",
        subtitle: "High scoring reels",
        cover: "https://images.unsplash.com/photo-1518604666860-9ed391f76460?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "Champions League 7-goal games",
        subtitle: "Goal storm",
        cover: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "Golden boot archive",
        subtitle: "Top scorers",
        cover: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
  {
    title: "Incredible comebacks",
    matches: [
      {
        title: "Historic extra-time turnarounds",
        subtitle: "Story mode",
        cover: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "Underdog reversals",
        subtitle: "Momentum shifts",
        cover: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "Second-half miracles",
        subtitle: "Must-watch",
        cover: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
];

function MatchCard({
  title,
  subtitle,
  href,
  cover,
}: {
  title: string;
  subtitle: string;
  href?: string;
  cover: string;
}) {
  const content = (
    <article
      className="stat-card"
      style={{
        width: 320,
        minWidth: 320,
        gap: 10,
        borderRadius: "var(--radius-xl)",
      }}
    >
      <div
        style={{
          width: "100%",
          height: 138,
          borderRadius: "var(--radius-md)",
          background: `linear-gradient(180deg, var(--surface-muted), rgba(8,8,13,0.65)), url(${cover}) center/cover no-repeat`,
          border: "1px solid var(--border-subtle)",
        }}
      />
      <strong style={{ fontSize: "var(--font-size-lg)" }}>{title}</strong>
      <span style={{ color: "var(--text-secondary)", fontSize: "var(--font-size-sm)" }}>{subtitle}</span>
      <FigmaButton variant="secondary" element="span">
        Open match
      </FigmaButton>
    </article>
  );

  if (!href) return content;
  return <Link href={href}>{content}</Link>;
}

export function MatchesLandingScreen() {
  return (
    <main className="screen-root" style={{ display: "grid", gap: 16 }}>
      <header className="panel" style={{ padding: 24, display: "grid", gap: 8 }}>
        <span style={{ color: "var(--accent-yellow)", fontWeight: 700, fontSize: "var(--font-size-sm)" }}>
          MATCHES
        </span>
        <h1 style={{ margin: 0, fontSize: "var(--font-size-2xl)" }}>Choose your next football story</h1>
        <p style={{ margin: 0, color: "var(--text-secondary)" }}>
          Explore live sessions, emotional archives, goal-heavy games, and iconic comebacks.
        </p>
      </header>

      {CATEGORY_DATA.map((category) => (
        <section key={category.title} className="panel" style={{ padding: 20, display: "grid", gap: 12 }}>
          <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ margin: 0, fontSize: "var(--font-size-xl)" }}>{category.title}</h2>
            <FigmaButton variant="secondary">More</FigmaButton>
          </header>
          <div style={{ display: "flex", gap: 14, overflowX: "auto", paddingBottom: 6 }}>
            {category.matches.map((match) => (
              <MatchCard key={match.title} {...match} />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
