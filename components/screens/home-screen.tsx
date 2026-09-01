"use client";

import { AppChrome } from "@/components/navigation/app-chrome";
import {
  BARCELONA_GROUPS,
  FRANCE_GOALS,
  PORTUGAL_GOALS,
  useMoodCatalog,
} from "@/lib/mood/catalog";
import { DotGrid, IconButton, NextArrow } from "@/components/ui/ds";
import { CircleRow, LineChart, MixChart } from "@/components/ui/card-graphics";
import { GraphicHoverCard } from "@/components/ui/hover-player-card";
import { watchHref } from "@/lib/media/highlights";

export function HomeScreen() {
  const catalog = useMoodCatalog();
  const [playerFact, clubFact] = catalog.facts;

  return (
    <AppChrome crumbs={["Home"]}>
      <div className="row-split home-top-grid">
        <div className="home-left-stack">
          <GraphicHoverCard
            year={catalog.barcelona.year}
            title={catalog.barcelona.title}
            watchHref={watchHref("barcelona")}
          >
            <MixChart groups={BARCELONA_GROUPS} />
          </GraphicHoverCard>
          <GraphicHoverCard year={catalog.zidane.year} title={catalog.zidane.title} watchHref={watchHref("zidane")}>
            <CircleRow
              stats={[
                { value: "3", label: "Zidane goals", accent: true },
                { value: "0", label: "France defeats" },
              ]}
            />
          </GraphicHoverCard>
          <article className="fact-card fact-card--fill">
            <div className="fact-copy">
              <div className="fact-head">
                <p className="type-t1">{playerFact.title}</p>
              </div>
              <div className="fact-row">
                <p className="type-h2 fact-number">{playerFact.value}</p>
                <p className="type-t2">{playerFact.text}</p>
              </div>
            </div>
          </article>
        </div>
        <GraphicHoverCard
          featured
          accent
          hoverVideo
          year={catalog.portugal.year}
          title={catalog.portugal.title}
          video={catalog.portugal.video}
          href={catalog.portugal.href}
          watchHref={watchHref("portugal2016")}
        >
          <LineChart portugal={PORTUGAL_GOALS} france={FRANCE_GOALS} accent />
        </GraphicHoverCard>
      </div>

      <div className="row-facts-split row-facts-split--2-3 home-facts-grid">
        <article className={clubFact.dots ? "fact-card fact-card--fill" : "fact-card"}>
          <div className="fact-copy">
            <div className="fact-head">
              <p className="type-t1">{clubFact.title}</p>
            </div>
            <div className="fact-row">
              <p className="type-h2 fact-number">{clubFact.value}</p>
              <p className="type-t2">{clubFact.text}</p>
            </div>
          </div>
          {clubFact.dots ? <DotGrid total={clubFact.dots.total} filled={clubFact.dots.filled} columns={clubFact.dots.columns} /> : null}
        </article>
        <div className="col-stack home-extra-stack">
          {catalog.extraFacts.map((fact) => (
            <article key={`${fact.title}-${fact.value}`} className="fact-card">
              <div className="fact-copy">
                <div className="fact-head">
                  <p className="type-t1">{fact.title}</p>
                  {fact.tournament ? (
                    <span className="live-flag">
                      <span className="dot-live" />
                      <span className="type-t1">{fact.tournament}</span>
                    </span>
                  ) : null}
                </div>
                <div className="fact-row">
                  <p className="type-h2 fact-number">{fact.value}</p>
                  <p className="type-t2">{fact.text}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <article className="ds-card discussion-card">
        <div className="card-top" style={{ padding: 0 }}>
          <div className="year-team">
            <span className="live-flag">
              <span className="dot-live" />
              <span className="type-t1">Live</span>
            </span>
            <p className="type-t1">{catalog.live.place}</p>
          </div>
          <IconButton label="Open discussion" href="/forum/match-discussion">
            <NextArrow />
          </IconButton>
        </div>
        <div className="discussion-body">
          <div className="discussion-chips">
            {catalog.live.chips.map((chip) => (
              <span key={chip} className="discussion-chip type-t3">
                {chip}
              </span>
            ))}
          </div>
          <span className="live-flag">
            <span className="dot-live" />
            <span className="type-t1">{catalog.live.fans}</span>
          </span>
        </div>
      </article>

      <GraphicHoverCard
        banner
        year={catalog.tournament.year}
        title={catalog.tournament.title}
        watchHref={watchHref("euro2008")}
      >
        <CircleRow stats={catalog.tournament.stats} />
      </GraphicHoverCard>
    </AppChrome>
  );
}
