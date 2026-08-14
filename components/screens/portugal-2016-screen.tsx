"use client";

import Link from "next/link";
import { AppChrome } from "@/components/navigation/app-chrome";
import { DotGrid, NextArrow } from "@/components/ui/ds";

const MATCHES = [
  { title: "3-3 Hungary", image: "/figma/hungary.png", pose: "run" as const },
  { title: "1:0 Croatia", image: "/figma/croatia.png", pose: "run" as const },
  { title: "1-0 France", image: "/figma/france-final.png", href: "/portugal-2016/france", accent: true, pose: "celebrate" as const },
  { title: "2:0 Wales", image: "/figma/wales.png", pose: "lift" as const },
];

export function Portugal2016Screen() {
  return (
    <AppChrome crumbs={["Home", "Portugal-2016"]}>
      <article className="ds-card" style={{ minHeight: 280, display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 20, padding: 28 }}>
        <div style={{ display: "grid", gap: 20, alignContent: "start" }}>
          <p className="type-h3">Portugal win Euro</p>
          <p className="type-t3">
            Cristiano Ronaldo was injured and substituted in the final match against France. And the &quot;golden goal&quot; was scored by the striker of the Russian championship.
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <div className="circle-stat" data-accent="true">
              <p className="type-h2">9</p>
              <p className="type-t3">goals scored</p>
            </div>
            <div className="circle-stat">
              <p className="type-h2">1</p>
              <p className="type-t3">wins</p>
            </div>
            <div className="circle-stat">
              <p className="type-h2">3</p>
              <p className="type-t3">tops scored</p>
            </div>
          </div>
        </div>
        <img className="player-art" data-pose="celebrate" src="/figma/portugal-hero.png" alt="Portugal win Euro 2016" style={{ width: "100%", height: "100%", minHeight: 220, objectFit: "contain" }} />
      </article>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.1fr", gap: 8, minHeight: 360 }}>
        <div style={{ display: "grid", gap: 8 }}>
          <MatchCard {...MATCHES[0]} />
          <MatchCard {...MATCHES[1]} />
        </div>
        <div style={{ display: "grid", gap: 8 }}>
          <article className="fact-card">
            <p className="type-t1">Final fact</p>
            <div className="fact-row">
              <p className="type-h2">109</p>
              <p className="type-t2">Eder’s extra-time goal beat host nation France in the final.</p>
            </div>
          </article>
          <article className="fact-card">
            <p className="type-t1">Wins fact</p>
            <div className="fact-row">
              <p className="type-h2">1</p>
              <p className="type-t2">regular-time victory over Wales in the entire tournament</p>
            </div>
            <DotGrid total={12} filled={1} />
          </article>
          <article className="fact-card">
            <p className="type-t1">Ronaldo fact</p>
            <div className="fact-row">
              <p className="type-h2">25</p>
              <p className="type-t2">Cristiano Ronaldo played for a few minutes in the final of the tournament and then watched the match from the sidelines</p>
            </div>
          </article>
        </div>
        <MatchCard {...MATCHES[2]} tall />
      </div>

      <article className="ds-card" style={{ padding: 20, display: "grid", gap: 12 }}>
        <div className="card-top" style={{ padding: 0 }}>
          <div className="year-team">
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <span className="dot-live" />
              <span className="type-t1">Live</span>
            </span>
            <p className="type-t1">Portugal-2016</p>
          </div>
          <span className="icon-btn" aria-hidden="true">
            <NextArrow />
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <span className="discussion-chip type-t3">Ronaldo goals on tournir</span>
            <span className="discussion-chip type-t3">And if the rules hadn&apos;t changed...</span>
          </div>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <span className="dot-live" />
            <span className="type-t1">21 fans discussions</span>
          </span>
        </div>
      </article>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 8 }}>
        <article className="fact-card">
          <p className="type-t1">Goals scored and missed</p>
          <div className="fact-row">
            <p className="type-h2">9-5</p>
            <p className="type-t2">The total difference between goals scored and conceded by the Portuguese national team</p>
          </div>
          <DotGrid total={22} filled={9} columns={11} />
        </article>
        <MatchCard {...MATCHES[3]} />
      </div>
    </AppChrome>
  );
}

function MatchCard({
  title,
  image,
  href,
  accent,
  tall,
  pose,
}: {
  title: string;
  image: string;
  href?: string;
  accent?: boolean;
  tall?: boolean;
  pose?: "lift" | "run" | "celebrate";
}) {
  const inner = (
    <article className="ds-card" data-accent={accent ? "true" : "false"} style={{ minHeight: tall ? 360 : 160, height: "100%", display: "flex", flexDirection: "column" }}>
      <div className="card-top">
        <p className={accent ? "type-h3" : "type-t1"}>{title}</p>
        <span className="icon-btn" data-inverted={accent ? "true" : "false"} aria-hidden="true">
          <NextArrow />
        </span>
      </div>
      <img className="player-art" data-pose={pose} src={image} alt={title} style={{ flex: 1, minHeight: 120, objectFit: "cover" }} />
    </article>
  );

  if (!href) return inner;
  return (
    <Link href={href} style={{ display: "block", height: "100%" }}>
      {inner}
    </Link>
  );
}
