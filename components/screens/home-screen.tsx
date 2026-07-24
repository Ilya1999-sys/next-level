import Link from "next/link";
import { FigmaButton } from "@/components/ui/figma-primitives";

const ASSETS = {
  domeBg: "https://www.figma.com/api/mcp/asset/7dffffb7-b139-4fa2-8f91-c6bdfa273342",
  moodEmotional: "https://www.figma.com/api/mcp/asset/92704901-039f-4457-980f-a075cfe4320c",
  moodFresh: "https://www.figma.com/api/mcp/asset/6463bcf5-6e70-43d0-8534-a40823beda3d",
  moodGreat: "https://www.figma.com/api/mcp/asset/36c1d958-5e50-4654-ad7c-06ee5a519543",
  moodNostalgia: "https://www.figma.com/api/mcp/asset/940c823b-6f3e-4d9f-81bb-cea539cdb0e6",
  avatarPlayer:
    "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=120&q=80",
  avatarTeam:
    "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=120&q=80",
  stackedAvatars: "https://www.figma.com/api/mcp/asset/7ca86a80-4555-4c52-bb09-e5a0814553d0",
};

const CATEGORY_IMAGES = [
  "https://www.figma.com/api/mcp/asset/07ee2349-26fa-484a-8cef-15117939bd1b",
  "https://www.figma.com/api/mcp/asset/913edf99-c3ce-4096-83dc-f0e1f329b7bf",
  "https://www.figma.com/api/mcp/asset/1d7c5927-55ac-498f-b1a9-d8d4083a60ae",
  "https://www.figma.com/api/mcp/asset/9ecafb2d-f529-4bb5-90b8-bc7e86db756b",
  "https://www.figma.com/api/mcp/asset/8f7fc883-cc69-4ce6-a504-e26ffe13c6da",
  "https://www.figma.com/api/mcp/asset/4bc672a5-a90b-4981-adaa-0fe6ef546052",
  "https://www.figma.com/api/mcp/asset/394b2fa2-31b4-4a23-940c-851083e4dfdc",
  "https://www.figma.com/api/mcp/asset/6ac60e64-dfb3-4405-8deb-831bd7ce41fb",
  "https://www.figma.com/api/mcp/asset/7a17e472-1046-4d7e-8787-54521409af88",
  "https://www.figma.com/api/mcp/asset/ef755f5e-e394-4d5f-9c3a-9275fe682289",
  "https://www.figma.com/api/mcp/asset/4117ab50-98f9-43b8-b18a-6d41eec11aed",
  "https://www.figma.com/api/mcp/asset/8edfe13d-b175-46c5-8aec-9eac593eac2d",
  "https://www.figma.com/api/mcp/asset/44e39ad4-9db0-4d64-8f8e-77b6087eba92",
  "https://www.figma.com/api/mcp/asset/ed668f05-8902-43db-821a-f0312d613537",
  "https://www.figma.com/api/mcp/asset/270be296-bd12-412a-bf1f-9c0705d80464",
];

type MoodCardProps = {
  title: string;
  tag: string;
  imageUrl: string;
  top: number;
  left: number;
  highlighted?: boolean;
  cta: string;
  href?: string;
};

function MoodCard({ title, tag, imageUrl, top, left, highlighted, cta, href }: MoodCardProps) {
  const inner = (
    <article
      style={{
        position: "absolute",
        top,
        left,
        width: 200,
        padding: 12,
        borderRadius: "var(--radius-xl)",
        border: "1px solid var(--border-subtle)",
        background: highlighted ? "var(--accent-yellow)" : "var(--surface-elevated)",
        color: highlighted ? "var(--surface-background)" : "var(--text-primary)",
        display: "grid",
        gap: 10,
        boxShadow: "0px 12px 12px rgba(0, 0, 0, 0.4)",
      }}
    >
      <img
        src={imageUrl}
        alt={title}
        style={{ width: "100%", height: 110, objectFit: "cover", borderRadius: "var(--radius-md)" }}
      />
      <div style={{ display: "grid", gap: 6 }}>
        <span
          style={{
            width: "fit-content",
            borderRadius: "var(--radius-pill)",
            border: `1px solid ${highlighted ? "var(--surface-background)" : "var(--accent-yellow)"}`,
            padding: "4px 10px",
            fontSize: "var(--font-size-sm)",
            fontWeight: 700,
            color: highlighted ? "var(--surface-background)" : "var(--accent-yellow)",
          }}
        >
          {tag}
        </span>
        <strong style={{ fontSize: "var(--font-size-lg)", lineHeight: 1.2 }}>{title}</strong>
        <FigmaButton variant={highlighted ? "primary-black" : "secondary"} fullWidth element="span">
          {cta}
        </FigmaButton>
      </div>
    </article>
  );

  if (href) {
    return <Link href={href}>{inner}</Link>;
  }

  return inner;
}

type CategoryRowProps = {
  title: string;
  items: Array<{ title: string; imageUrl: string }>;
};

function CategoryRow({ title, items }: CategoryRowProps) {
  return (
    <section
      style={{
        border: "1px solid #404046",
        borderRadius: "var(--radius-xl)",
        padding: 16,
        display: "grid",
        gap: 10,
      }}
    >
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="title-small" style={{ color: "var(--text-muted)" }}>
          {title}
        </span>
        <FigmaButton variant="secondary">More</FigmaButton>
      </header>
      <div style={{ display: "flex", gap: 14, overflow: "hidden" }}>
        {items.map((item) => (
          <article
            key={item.title}
            style={{
              width: 220,
              minWidth: 220,
              height: 120,
              borderRadius: 8,
              padding: 12,
              background: "var(--surface-elevated)",
              display: "grid",
              gap: 10,
            }}
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              style={{ width: "100%", height: 70, objectFit: "cover", borderRadius: 4 }}
            />
            <strong style={{ fontSize: "var(--font-size-md)", lineHeight: 1.2 }}>{item.title}</strong>
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
    <article
      style={{
        width: "100%",
        borderRadius: "var(--radius-xl)",
        padding: 22,
        background: "var(--surface-elevated)",
        display: "grid",
        gap: 14,
      }}
    >
      <h3 style={{ margin: 0, fontSize: "var(--font-size-md)", fontWeight: 600 }}>{title}</h3>
      <div style={{ display: "grid", gridTemplateColumns: "60px 1fr", gap: 14, alignItems: "center" }}>
        <img src={avatarUrl} alt={subject} style={{ width: 60, height: 60, borderRadius: 30, objectFit: "cover" }} />
        <div style={{ display: "grid", gap: 4 }}>
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
    <article
      style={{
        width: "100%",
        borderRadius: "var(--radius-xl)",
        padding: 22,
        background: "var(--surface-elevated)",
        display: "grid",
        gap: 14,
      }}
    >
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ margin: 0, fontSize: "var(--font-size-md)", fontWeight: 700 }}>Match discussion</h3>
        <span style={{ fontSize: "var(--font-size-sm)", color: "var(--accent-yellow)", fontWeight: 700 }}>LIVE</span>
      </header>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <img src={ASSETS.stackedAvatars} alt="Fans avatars" style={{ width: 68, height: 28 }} />
        <span style={{ fontSize: 12 }}>324 fans discussing</span>
      </div>
      {[
        { user: "@PremierFan92", text: "What a second half! Mbappé was unstoppable..." },
        { user: "@GhanaLegend", text: "Who else is rewatching 2010 tonight?" },
      ].map((comment) => (
        <div
          key={comment.user}
          style={{
            borderRadius: 10,
            padding: 10,
            background: "var(--surface-muted)",
            display: "grid",
            gap: 4,
          }}
        >
          <strong style={{ fontSize: 11 }}>{comment.user}</strong>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.8)" }}>{comment.text}</span>
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
  const rails = [
    {
      title: "Nostalgia",
      items: ["Ghana 2010", "Brazil 2002", "Ajax 1995", "Barça 2009", "Italy 2006"],
    },
    {
      title: "Fresh",
      items: ["PSG vs Monaco", "Arsenal vs City", "Madrid vs Barça", "Juventus vs Napoli", "Liverpool vs Chelsea"],
    },
    {
      title: "Emotional",
      items: ["Comeback of the season", "Last-minute winners", "Derby drama", "Champions League finals", "Cup upsets"],
    },
  ] as const;

  return (
    <main style={{ display: "flex", alignItems: "flex-start", width: "100%", paddingLeft: 80 }}>
      <section style={{ flex: 1, minWidth: 0, paddingTop: 20, paddingRight: 40, paddingBottom: 40, display: "grid", gap: 12 }}>
        <header style={{ display: "grid", gap: 4, paddingBottom: 16 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.38)", letterSpacing: 3 }}>
            CURATED FOR YOU
          </span>
          <h1 style={{ margin: 0, fontSize: 48, fontWeight: 900, letterSpacing: -1 }}>YOUR MOOD, YOUR MATCH</h1>
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--accent-yellow)", letterSpacing: 2 }}>
            Choose your mood
          </span>
        </header>

        <section
          style={{
            height: 580,
            borderRadius: 30,
            border: "1px solid var(--border-subtle)",
            background: "rgba(255,255,255,0.02)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <img
            src={ASSETS.domeBg}
            alt="Events dome"
            style={{ position: "absolute", inset: -1, width: "calc(100% + 2px)", height: "calc(100% + 2px)", objectFit: "cover", opacity: 0.55 }}
          />

          <MoodCard
            title="Comeback of the season"
            tag="Emotional"
            imageUrl={ASSETS.moodEmotional}
            top={77}
            left={126}
            cta="Watch"
          />
          <MoodCard
            title="PSG vs Monaco highlights"
            tag="Fresh"
            imageUrl={ASSETS.moodFresh}
            top={30}
            left={1109}
            cta="Watch highlights"
          />
          <MoodCard
            title="Mbappé's legendary hat-trick"
            tag="Great"
            imageUrl={ASSETS.moodGreat}
            top={305}
            left={859}
            cta="Watch highlights"
          />
          <MoodCard
            title="Ghana 2010 documentary"
            tag="Nostalgia"
            imageUrl={ASSETS.moodNostalgia}
            top={152}
            left={535}
            highlighted
            cta="Watch"
            href="/match/usa-vs-ghana-2010"
          />
        </section>

        <div style={{ display: "grid", gap: 16 }}>
          {rails.map((rail, railIndex) => (
            <CategoryRow
              key={rail.title}
              title={rail.title}
              items={rail.items.map((title, itemIndex) => ({
                title,
                imageUrl: CATEGORY_IMAGES[railIndex * 5 + itemIndex],
              }))}
            />
          ))}
        </div>
      </section>

      <aside
        style={{
          width: 380,
          padding: "0 20px",
          display: "grid",
          gap: 14,
          alignSelf: "flex-start",
        }}
      >
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
