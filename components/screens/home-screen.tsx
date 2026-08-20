"use client";

import { AppChrome } from "@/components/navigation/app-chrome";
import {
  BARCELONA_MARKS,
  FRANCE_GOALS,
  PORTUGAL_GOALS,
  useMoodCatalog,
} from "@/lib/mood/catalog";
import { DotGrid, IconButton, NextArrow } from "@/components/ui/ds";
import { CircleRow, LineChart, MixChart } from "@/components/ui/card-graphics";
import { GraphicHoverCard } from "@/components/ui/hover-player-card";

export function HomeScreen() {
  const catalog = useMoodCatalog();

  return (
    <AppChrome crumbs={["Home"]}>
      <div className="row-488">
        <div className="col-stack col-stack--240">
          <GraphicHoverCard year={catalog.barcelona.year} title={catalog.barcelona.title} youtube={catalog.barcelona.youtube}>
            <MixChart marks={BARCELONA_MARKS} />
          </GraphicHoverCard>
          <GraphicHoverCard year={catalog.zidane.year} title={catalog.zidane.title} youtube={catalog.zidane.youtube}>
            <CircleRow
              stats={[
                { value: "3", label: "Zidane goals", accent: true },
                { value: "0", label: "France defeats" },
              ]}
            />
          </GraphicHoverCard>
        </div>
        <div className="col-facts">
          {catalog.facts.map((fact) => (
            <article key={`${fact.title}-${fact.value}`} className={fact.dots ? "fact-card fact-card--fill" : "fact-card"}>
              <div className="fact-copy">
                <div className="fact-head">
                  <p className="type-t1">{fact.title}</p>
                </div>
                <div className="fact-row">
                  <p className="type-h2 fact-number">{fact.value}</p>
                  <p className="type-t2">{fact.text}</p>
                </div>
              </div>
              {fact.dots ? <DotGrid total={fact.dots.total} filled={fact.dots.filled} columns={fact.dots.columns} /> : null}
            </article>
          ))}
        </div>
        <GraphicHoverCard
          featured
          accent
          year={catalog.portugal.year}
          title={catalog.portugal.title}
          youtube={catalog.portugal.youtube}
          href={catalog.portugal.href}
        >
          <LineChart portugal={PORTUGAL_GOALS} france={FRANCE_GOALS} accent />
        </GraphicHoverCard>
      </div>

      <div className="row-facts-split">
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

      <GraphicHoverCard banner year={catalog.tournament.year} title={catalog.tournament.title} youtube={catalog.tournament.youtube}>
        <CircleRow stats={catalog.tournament.stats} />
      </GraphicHoverCard>
    </AppChrome>
  );
}
