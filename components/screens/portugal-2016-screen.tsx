"use client";

import { AppChrome } from "@/components/navigation/app-chrome";
import { MATCH_VIDEO } from "@/lib/mood/catalog";
import { DotGrid, NextArrow } from "@/components/ui/ds";
import { HoverPlayerCard } from "@/components/ui/hover-player-card";
import { PlayerFigure } from "@/components/ui/player-figure";

const MATCHES = [
  { title: "3-3 Hungary", image: "/figma/hungary.png", video: MATCH_VIDEO.goal },
  { title: "1:0 Croatia", image: "/figma/croatia.png", video: MATCH_VIDEO.dribble },
  { title: "1-0 France", image: "/figma/france-final.png", href: "/portugal-2016/france", accent: true, video: MATCH_VIDEO.duel },
  { title: "2:0 Wales", image: "/figma/wales.png", video: MATCH_VIDEO.bicycle },
];

export function Portugal2016Screen() {
  return (
    <AppChrome crumbs={["Home", "Portugal-2016"]}>
      <article className="ds-card tournament-hero">
        <PlayerFigure className="tournament-hero-photo" variant="hero" src="/figma/portugal-hero.png" alt="Portugal win Euro 2016" fit="cover" />
        <div className="tournament-hero-copy">
          <p className="type-h2">Portugal win Euro</p>
          <p className="type-t3">
            Cristiano Ronaldo was injured and substituted in the final match against France. And the &quot;golden goal&quot; was scored by the striker of the Russian championship.
          </p>
          <div className="tournament-hero-stats">
            <div className="circle-stat" data-accent="true">
              <p className="type-h2 fact-number">9</p>
              <p className="type-t3">goals scored</p>
            </div>
            <div className="circle-stat">
              <p className="type-h2 fact-number">1</p>
              <p className="type-t3">wins</p>
            </div>
            <div className="circle-stat">
              <p className="type-h2 fact-number">3</p>
              <p className="type-t3">tops scored</p>
            </div>
          </div>
        </div>
      </article>

      <div className="row-488">
        <div className="col-stack col-stack--240">
          <HoverPlayerCard year="Match review" team={MATCHES[0].title} image={MATCHES[0].image} video={MATCHES[0].video} alt={MATCHES[0].title} />
          <HoverPlayerCard year="Match review" team={MATCHES[1].title} image={MATCHES[1].image} video={MATCHES[1].video} alt={MATCHES[1].title} />
        </div>
        <div className="col-facts">
          <article className="fact-card">
            <div className="fact-copy">
              <p className="type-t1">Final fact</p>
              <div className="fact-row">
                <p className="type-h2 fact-number">109</p>
                <p className="type-t2">Eder’s extra-time goal beat host nation France in the final.</p>
              </div>
            </div>
          </article>
          <article className="fact-card fact-card--fill">
            <div className="fact-copy">
              <p className="type-t1">Wins fact</p>
              <div className="fact-row">
                <p className="type-h2 fact-number">1</p>
                <p className="type-t2">regular-time victory over Wales in the entire tournament</p>
              </div>
            </div>
            <DotGrid total={9} filled={1} columns={3} />
          </article>
          <article className="fact-card">
            <div className="fact-copy">
              <p className="type-t1">Ronaldo fact</p>
              <div className="fact-row">
                <p className="type-h2 fact-number">25</p>
                <p className="type-t2">Cristiano Ronaldo played for a few minutes in the final of the tournament and then watched the match from the sidelines</p>
              </div>
            </div>
          </article>
        </div>
        <HoverPlayerCard
          featured
          year="Match review"
          team={MATCHES[2].title}
          image={MATCHES[2].image}
          href={MATCHES[2].href}
          accent={MATCHES[2].accent}
          video={MATCHES[2].video}
          alt={MATCHES[2].title}
        />
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
          <div className="fact-copy">
            <p className="type-t1">Goals scored and missed</p>
            <div className="fact-row">
              <p className="type-h2 fact-number">9-5</p>
              <p className="type-t2">The total difference between goals scored and conceded by the Portuguese national team</p>
            </div>
          </div>
          <DotGrid total={22} filled={9} columns={11} />
        </article>
        <HoverPlayerCard year="Match review" team={MATCHES[3].title} image={MATCHES[3].image} video={MATCHES[3].video} alt={MATCHES[3].title} />
      </div>
    </AppChrome>
  );
}
