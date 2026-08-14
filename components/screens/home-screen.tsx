"use client";

import Link from "next/link";
import { AppChrome } from "@/components/navigation/app-chrome";
import { useMoodCatalog } from "@/lib/mood/catalog";
import { DotGrid, IconButton, NextArrow } from "@/components/ui/ds";

export function HomeScreen() {
  const catalog = useMoodCatalog();
  const [leftTop, leftBottom, featured, brazil] = catalog.teams;

  return (
    <AppChrome crumbs={["Home"]}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 0.8fr) minmax(0, 1fr) minmax(0, 1fr)",
          gap: 8,
          minHeight: 488,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <TeamCard card={leftTop} height={240} />
          <TeamCard card={leftBottom} height={240} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {catalog.facts.map((fact) => (
            <article key={`${fact.title}-${fact.value}`} className="fact-card" style={{ flex: fact.dots ? 1 : undefined }}>
              <div style={{ display: "grid", gap: 28 }}>
                <div className="fact-head">
                  <p className="type-t1">{fact.title}</p>
                  {fact.tournament ? (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                      <span className="dot-live" />
                      <span className="type-t1">{fact.tournament}</span>
                    </span>
                  ) : null}
                </div>
                <div className="fact-row">
                  <p className="type-h2">{fact.value}</p>
                  <p className="type-t2">{fact.text}</p>
                </div>
              </div>
              {fact.dots ? <DotGrid total={fact.dots.total} filled={fact.dots.filled} columns={fact.dots.columns} /> : null}
            </article>
          ))}
        </div>
        <TeamCard card={featured} tall />
      </div>

      <article className="ds-card" style={{ padding: 20, display: "grid", gap: 12 }}>
        <div className="card-top" style={{ padding: 0 }}>
          <div className="year-team">
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <span className="dot-live" />
              <span className="type-t1">Live</span>
            </span>
            <p className="type-t1">{catalog.live.place}</p>
          </div>
          <IconButton label="Open discussion">
            <NextArrow />
          </IconButton>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {catalog.live.chips.map((chip) => (
              <span key={chip} className="discussion-chip type-t3">
                {chip}
              </span>
            ))}
          </div>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <span className="dot-live" />
            <span className="type-t1">{catalog.live.fans}</span>
          </span>
        </div>
      </article>

      <article className="ds-card tournir-card">
        <img className="player-art" data-pose="run" src={catalog.tournament.image} alt="" style={{ position: "absolute", right: -70, top: 80, width: 400, height: 320, objectFit: "contain" }} />
        <div className="card-top" style={{ padding: 0, marginBottom: 20 }}>
          <div className="year-team" style={{ maxWidth: "70%" }}>
            <p className="type-t1">{catalog.tournament.year}</p>
            <p className="type-t1">{catalog.tournament.title}</p>
          </div>
          <IconButton label="Open tournament">
            <NextArrow />
          </IconButton>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-end", minHeight: 160 }}>
          {catalog.tournament.stats.map((stat) => (
            <div key={stat.label} className="circle-stat" data-accent={stat.accent ? "true" : "false"}>
              <p className="type-h2">{stat.value}</p>
              <p className="type-t3">{stat.label}</p>
            </div>
          ))}
        </div>
      </article>

      <div style={{ display: "flex", gap: 8, minHeight: 240 }}>
        <TeamCard card={brazil} fill />
        <article className="fact-card" style={{ flex: 1 }}>
          <div style={{ display: "grid", gap: 28 }}>
            <p className="type-t1">{catalog.comeback.title}</p>
            <div className="fact-row">
              <p className="type-h2">{catalog.comeback.value}</p>
              <p className="type-t2">{catalog.comeback.text}</p>
            </div>
          </div>
          {catalog.comeback.dots ? (
            <DotGrid total={catalog.comeback.dots.total} filled={catalog.comeback.dots.filled} columns={catalog.comeback.dots.columns} />
          ) : null}
        </article>
      </div>
    </AppChrome>
  );
}

function TeamCard({
  card,
  height,
  tall,
  fill,
}: {
  card: ReturnType<typeof useMoodCatalog>["teams"][number];
  height?: number;
  tall?: boolean;
  fill?: boolean;
}) {
  const inner = (
    <article
      className="ds-card"
      data-accent={card.accent ? "true" : "false"}
      style={{ height: height ?? (tall ? "100%" : fill ? "100%" : undefined), minHeight: fill ? 240 : undefined, display: "flex", flexDirection: "column" }}
    >
      <div className="card-top">
        <div className="year-team">
          <p className={card.accent ? "type-h3" : "type-t1"}>{card.year}</p>
          <p className={card.accent ? "type-h3" : "type-t1"}>{card.team}</p>
        </div>
        <span className="icon-btn" data-inverted={card.accent ? "true" : "false"} aria-hidden="true">
          <NextArrow />
        </span>
      </div>
      <img className="player-art" data-pose={card.pose} src={card.image} alt={`${card.team} ${card.year}`} style={{ flex: 1, minHeight: 140, objectFit: card.objectFit ?? "cover" }} />
    </article>
  );

  if (card.href) {
    return (
      <Link href={card.href} style={{ display: "block", height: tall || fill ? "100%" : undefined }}>
        {inner}
      </Link>
    );
  }

  return inner;
}
