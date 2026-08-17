"use client";

import Link from "next/link";
import { AppChrome } from "@/components/navigation/app-chrome";
import { DotGrid, NextArrow } from "@/components/ui/ds";
import { PlayerFigure } from "@/components/ui/player-figure";

const MATCHES = [
  { title: "3-3 Hungary", image: "/figma/hungary.png", pose: "run" as const },
  { title: "1:0 Croatia", image: "/figma/croatia.png", pose: "run" as const },
  { title: "1-0 France", image: "/figma/france-final.png", href: "/portugal-2016/france", accent: true, pose: "celebrate" as const },
  { title: "2:0 Wales", image: "/figma/wales.png", pose: "lift" as const },
];

export function Portugal2016Screen() {
  return (
    <AppChrome crumbs={["Home", "Portugal-2016"]}>
      <article className="ds-card tournament-hero">
        <PlayerFigure className="tournament-hero-photo" variant="hero" src="/figma/portugal-hero.png" pose="celebrate" alt="Portugal win Euro 2016" fit="cover" />
        <div className="tournament-hero-copy">
          <p className="type-h2">Portugal win Euro</p>
          <p className="type-t3">
            Cristiano Ronaldo was injured and substituted in the final match against France. And the &quot;golden goal&quot; was scored by the striker of the Russian championship.
          </p>
          <div className="tournament-hero-stats">
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
      </article>

      <div className="row-488">
        <div className="col-stack col-stack--240">
          <MatchCard {...MATCHES[0]} />
          <MatchCard {...MATCHES[1]} />
        </div>
        <div className="col-facts">
          <article className="fact-card">
            <p className="type-t1">Final fact</p>
            <div className="fact-row">
              <p className="type-h2">109</p>
              <p className="type-t2">Eder’s extra-time goal beat host nation France in the final.</p>
            </div>
          </article>
          <article className="fact-card fact-card--fill">
            <p className="type-t1">Wins fact</p>
            <div className="fact-row">
              <p className="type-h2">1</p>
              <p className="type-t2">regular-time victory over Wales in the entire tournament</p>
            </div>
            <DotGrid total={9} filled={1} columns={3} />
          </article>
          <article className="fact-card">
            <p className="type-t1">Ronaldo fact</p>
            <div className="fact-row">
              <p className="type-h2">25</p>
              <p className="type-t2">Cristiano Ronaldo played for a few minutes in the final of the tournament and then watched the match from the sidelines</p>
            </div>
          </article>
        </div>
        <MatchCard {...MATCHES[2]} featured />
      </div>

      <article className="ds-card discussion-card">
        <div className="card-top" style={{ padding: 0 }}>
          <div className="year-team">
            <span className="live-flag">
              <span className="dot-live" />
              <span className="type-t1">Live</span>
            </span>
            <p className="type-t1">Portugal-2016</p>
          </div>
          <span className="icon-btn" aria-hidden="true">
            <NextArrow />
          </span>
        </div>
        <div className="discussion-body">
          <div className="discussion-chips">
            <span className="discussion-chip type-t3">Ronaldo goals on tournir</span>
            <span className="discussion-chip type-t3">And if the rules hadn&apos;t changed...</span>
          </div>
          <span className="live-flag">
            <span className="dot-live" />
            <span className="type-t1">21 fans discussions</span>
          </span>
        </div>
      </article>

      <div className="row-goals">
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
  pose,
  featured,
}: {
  title: string;
  image: string;
  href?: string;
  accent?: boolean;
  pose?: "lift" | "run" | "celebrate";
  featured?: boolean;
}) {
  const inner = (
    <article className="ds-card team-card" data-accent={accent ? "true" : "false"}>
      <div className="card-top">
        <div className="year-team">
          <p className={accent ? "type-h3" : "type-t1"}>Match review</p>
          <p className={accent ? "type-h3" : "type-t1"}>{title}</p>
        </div>
        <span className="icon-btn" data-inverted={accent ? "true" : "false"} aria-hidden="true">
          <NextArrow />
        </span>
      </div>
      <PlayerFigure src={image} pose={pose} alt={title} variant={featured ? "featured" : "card"} />
    </article>
  );

  if (!href) return inner;
  return (
    <Link href={href} className="card-link">
      {inner}
    </Link>
  );
}
