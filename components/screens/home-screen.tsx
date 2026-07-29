import Link from "next/link";
import { FigmaButton } from "@/components/ui/figma-primitives";

const ASSETS = {
  heroMain: "https://www.figma.com/api/mcp/asset/5db4c06f-08c8-449d-8a23-3679275d76b1",
  hero1: "https://www.figma.com/api/mcp/asset/e883f266-24bb-4c8d-89e4-353c0ecc9fa6",
  hero2: "https://www.figma.com/api/mcp/asset/66d85a9b-ab40-469e-8825-5c940e92655e",
  hero3: "https://www.figma.com/api/mcp/asset/3d5ce26c-f340-466c-977f-0fb255487644",
  hero4: "https://www.figma.com/api/mcp/asset/e883f266-24bb-4c8d-89e4-353c0ecc9fa6",
  nostalgia1: "https://www.figma.com/api/mcp/asset/faaeaa88-a662-4aaa-b119-495e3e65f0dd",
  nostalgia2: "https://www.figma.com/api/mcp/asset/0d930d18-15bf-4736-bedc-2c800f00a3db",
  nostalgia3: "https://www.figma.com/api/mcp/asset/014142d5-41bd-4320-a1f6-b7c726fe27cc",
  nostalgia4: "https://www.figma.com/api/mcp/asset/99c4c2e3-7213-4edb-97e1-7f774c8166ed",
  emotional1: "https://www.figma.com/api/mcp/asset/1a1987d5-6f6b-48aa-8a24-0c973e304790",
  emotional2: "https://www.figma.com/api/mcp/asset/4eaf143d-cc41-4bb6-b52b-7f52dc0ed9cd",
  emotional3: "https://www.figma.com/api/mcp/asset/68b85103-cc03-433c-a3e8-1a76358410ed",
  emotional4: "https://www.figma.com/api/mcp/asset/67285caf-cac8-49c9-9cb1-e8b9239a2f40",
  avatarPlayer: "https://www.figma.com/api/mcp/asset/3136cbe5-2920-4a5d-867f-0d7b5f9cdc26",
  avatarTeam: "https://www.figma.com/api/mcp/asset/3136cbe5-2920-4a5d-867f-0d7b5f9cdc26",
  stackedAvatars: "https://www.figma.com/api/mcp/asset/c883b169-bf1f-42cf-b833-c78a77bf50d8",
};

const HERO_CARDS = [
  { title: "Comeback of the season", subtitle: "Comeback of the season", tag: "Emotional", image: ASSETS.hero1 },
  { title: "Mbappe's legendary hat-trick", subtitle: "Comeback of the season", tag: "Great", image: ASSETS.hero2 },
  { title: "PSG vs Monaco highlights", subtitle: "Comeback of the season", tag: "Fresh", image: ASSETS.hero3 },
  { title: "Comeback of the season", subtitle: "Comeback of the season", tag: "Emotional", image: ASSETS.hero4 },
] as const;

const NOSTALGIA = [
  { title: "Ghana 2010", image: ASSETS.nostalgia1 },
  { title: "Brazil 2002", image: ASSETS.nostalgia2 },
  { title: "Barca 2009", image: ASSETS.nostalgia3 },
  { title: "Italy 2006", image: ASSETS.nostalgia4 },
] as const;

const EMOTIONAL = [
  { title: "Comeback of the season", image: ASSETS.emotional1 },
  { title: "Last-minute winners", image: ASSETS.emotional2 },
  { title: "Derby drama", image: ASSETS.emotional3 },
  { title: "Champions League finals", image: ASSETS.emotional4 },
] as const;

function MiniMoodCard({ title, subtitle, tag, image }: { title: string; subtitle: string; tag: string; image: string }) {
  return (
    <article
      className="panel"
      style={{
        padding: "var(--space-3)",
        display: "grid",
        gap: "var(--space-3)",
        height: 321,
      }}
    >
      <img src={image} alt={title} style={{ width: "100%", height: 201, objectFit: "cover", borderRadius: "var(--radius-md)" }} />
      <div style={{ display: "grid", gap: "var(--space-2)" }}>
        <span style={{ width: "fit-content", borderRadius: "var(--radius-pill)", border: "1px solid var(--main-default)", padding: "4px 10px", fontSize: "var(--font-size-xs)", color: "var(--main-default)" }}>
          {tag}
        </span>
        <strong style={{ fontSize: "var(--font-size-lg)", lineHeight: "var(--line-height-t1)" }}>{title}</strong>
        <span style={{ color: "var(--text-secondary)", fontSize: "var(--font-size-sm)" }}>{subtitle}</span>
      </div>
    </article>
  );
}

function CategoryRow({ title, items }: { title: string; items: Array<{ title: string; image: string }> }) {
  return (
    <section style={{ display: "grid", gap: "var(--space-5)" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ margin: 0, fontSize: "var(--font-size-xl)", lineHeight: "var(--line-height-h3)" }}>{title}</h3>
        <span style={{ color: "var(--main-default)", fontSize: "var(--font-size-md)", fontWeight: "var(--font-weight-semibold)" }}>More</span>
      </header>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "var(--space-5)" }}>
        {items.map((item) => (
          <article key={item.title} className="panel" style={{ padding: "var(--space-3)", display: "grid", gap: "var(--space-3)", minHeight: 274 }}>
            <img src={item.image} alt={item.title} style={{ width: "100%", height: 201, objectFit: "cover", borderRadius: "var(--radius-md)" }} />
            <strong style={{ fontSize: "var(--font-size-lg)", lineHeight: "var(--line-height-t1)" }}>{item.title}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

type EditorialFactCardProps = {
  title: string;
  subject: string;
  description: string;
  href: string;
  avatarUrl: string;
};

function EditorialFactCard({ title, subject, description, href, avatarUrl }: EditorialFactCardProps) {
  return (
    <article className="panel" style={{ width: "100%", padding: "var(--space-5)", display: "grid", gap: "var(--space-3)" }}>
      <h3 style={{ margin: 0, fontSize: "var(--font-size-md)", fontWeight: 600 }}>{title}</h3>
      <div style={{ display: "grid", gridTemplateColumns: "60px 1fr", gap: "var(--space-3)", alignItems: "center" }}>
        <img src={avatarUrl} alt={subject} style={{ width: 60, height: 60, borderRadius: 30, objectFit: "cover" }} />
        <div style={{ display: "grid", gap: "var(--space-1)" }}>
          <strong style={{ fontSize: "var(--font-size-md)" }}>{subject}</strong>
          <p style={{ margin: 0, fontSize: "var(--font-size-sm)", color: "var(--text-tertiary)" }}>{description}</p>
        </div>
      </div>
      <Link href={href}>
        <FigmaButton variant="secondary" fullWidth element="span">
          Learn more
        </FigmaButton>
      </Link>
    </article>
  );
}

function DiscussionCard() {
  return (
    <article className="panel" style={{ width: "100%", padding: "var(--space-5)", display: "grid", gap: "var(--space-3)" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ margin: 0, fontSize: "var(--font-size-md)", fontWeight: 700 }}>Match discussion</h3>
        <span style={{ fontSize: "var(--font-size-sm)", color: "var(--accent-yellow)", fontWeight: 700 }}>LIVE</span>
      </header>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <img src={ASSETS.stackedAvatars} alt="Fans avatars" style={{ width: 68, height: 28 }} />
        <span style={{ fontSize: "var(--font-size-sm)" }}>324 fans discussing</span>
      </div>
      {[
        { user: "@PremierFan92", text: "What a second half! Mbappé was unstoppable..." },
        { user: "@GhanaLegend", text: "Who else is rewatching 2010 tonight?" },
      ].map((comment) => (
        <div
          key={comment.user}
          style={{
            borderRadius: "var(--radius-sm)",
            padding: "var(--space-2)",
            background: "var(--surface-muted)",
            display: "grid",
            gap: 4,
          }}
        >
          <strong style={{ fontSize: "var(--font-size-xs)" }}>{comment.user}</strong>
          <span style={{ fontSize: "var(--font-size-xs)", color: "var(--text-secondary)" }}>{comment.text}</span>
        </div>
      ))}
      <Link href="/forum/match-discussion">
        <FigmaButton variant="secondary" fullWidth element="span">
          Learn more
        </FigmaButton>
      </Link>
    </article>
  );
}

export function HomeScreen() {
  return (
    <main
      className="screen-root"
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 4fr) minmax(0, 1fr)",
        gap: "var(--space-10)",
        paddingTop: "var(--space-5)",
        paddingBottom: "var(--space-5)",
      }}
    >
      <section style={{ minWidth: 0, display: "grid", gap: "var(--space-10)" }}>
        <header style={{ display: "grid", gap: "var(--space-1)" }}>
          <span style={{ fontSize: "var(--font-size-xs)", fontWeight: "var(--font-weight-regular)", color: "var(--text-tertiary)" }}>
            CURATED FOR YOU
          </span>
          <h1 style={{ margin: 0, fontSize: "var(--font-size-3xl)", lineHeight: "var(--line-height-h1)", fontWeight: 900, letterSpacing: "var(--letter-spacing-h1)" }}>
            YOUR MOOD, YOUR MATCH
          </h1>
          <span style={{ fontSize: "var(--font-size-sm)", fontWeight: 600, color: "var(--main-default)" }}>
            Choose your mood
          </span>
        </header>

        <section className="panel" style={{ padding: "var(--space-5)", display: "grid", gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1fr)", gap: "var(--space-3)" }}>
          <Link href="/match/usa-vs-ghana-2010">
            <article
              style={{
                background: "var(--main-default)",
                borderRadius: "var(--radius-lg)",
                padding: "var(--space-5)",
                height: 661,
                display: "grid",
                gap: "var(--space-5)",
              }}
            >
              <img src={ASSETS.heroMain} alt="Ghana 2010 documentary" style={{ width: "100%", height: 444, objectFit: "cover", borderRadius: "var(--radius-sm)" }} />
              <div style={{ display: "grid", gap: "var(--space-2)" }}>
                <span style={{ width: "fit-content", borderRadius: "var(--radius-pill)", border: "1px solid var(--text-on-accent)", padding: "4px 10px", fontSize: "var(--font-size-xs)", color: "var(--text-on-accent)" }}>
                  Nostalgia
                </span>
                <strong style={{ color: "var(--text-on-accent)", fontSize: "var(--font-size-lg)", lineHeight: "var(--line-height-t1)" }}>Ghana 2010 documentary</strong>
                <span style={{ color: "var(--text-on-accent)", fontSize: "var(--font-size-lg)", opacity: 0.8 }}>Comeback of the season</span>
              </div>
              <FigmaButton variant="primary-black" fullWidth element="span">
                Watch
              </FigmaButton>
            </article>
          </Link>

          <div style={{ display: "grid", gap: "var(--space-5)" }}>
            <MiniMoodCard {...HERO_CARDS[0]} />
            <MiniMoodCard {...HERO_CARDS[2]} />
          </div>
          <div style={{ display: "grid", gap: "var(--space-5)" }}>
            <MiniMoodCard {...HERO_CARDS[1]} />
            <MiniMoodCard {...HERO_CARDS[3]} />
          </div>
        </section>

        <CategoryRow title="Nostalgia" items={NOSTALGIA.map((item) => ({ ...item }))} />
        <CategoryRow title="Emotional" items={EMOTIONAL.map((item) => ({ ...item }))} />
      </section>

      <aside style={{ width: "100%", display: "grid", gap: "var(--space-3)", alignContent: "start" }}>
        <EditorialFactCard
          title="Favorite player fact"
          subject="Kylian Mbappé"
          description="Kylian Mbappé has scored in 5 consecutive Champions League matches."
          href="/player-stats/mbappe"
          avatarUrl={ASSETS.avatarPlayer}
        />
        <EditorialFactCard
          title="Favorite team fact"
          subject="Real Madrid"
          description="Real Madrid have won 15 Champions League titles, more than any other club."
          href="/team/real-madrid"
          avatarUrl={ASSETS.avatarTeam}
        />
        <DiscussionCard />
      </aside>
    </main>
  );
}
