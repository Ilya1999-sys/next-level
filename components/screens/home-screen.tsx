"use client";

import { AppChrome } from "@/components/navigation/app-chrome";
import { useMoodCatalog } from "@/lib/mood/catalog";
import { DotGrid, IconButton, NextArrow } from "@/components/ui/ds";
import { HoverPlayerCard } from "@/components/ui/hover-player-card";
import { PlayerFigure } from "@/components/ui/player-figure";

export function HomeScreen() {
  const catalog = useMoodCatalog();
  const [leftTop, leftBottom, featured, brazil] = catalog.teams;

  return (
    <AppChrome crumbs={["Home"]}>
      <div className="row-488">
        <div className="col-stack col-stack--240">
          <HoverPlayerCard
            year={leftTop.year}
            team={leftTop.team}
            image={leftTop.image}
            fit={leftTop.objectFit}
            video={leftTop.video}
            href={leftTop.href}
            accent={leftTop.accent}
            alt={`${leftTop.team} ${leftTop.year}`}
          />
          <HoverPlayerCard
            year={leftBottom.year}
            team={leftBottom.team}
            image={leftBottom.image}
            fit={leftBottom.objectFit}
            video={leftBottom.video}
            href={leftBottom.href}
            accent={leftBottom.accent}
            alt={`${leftBottom.team} ${leftBottom.year}`}
          />
        </div>
        <div className="col-facts">
          {catalog.facts.map((fact) => (
            <article key={`${fact.title}-${fact.value}`} className={fact.dots ? "fact-card fact-card--fill" : "fact-card"}>
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
              {fact.dots ? <DotGrid total={fact.dots.total} filled={fact.dots.filled} columns={fact.dots.columns} /> : null}
            </article>
          ))}
        </div>
        <HoverPlayerCard
          featured
          year={featured.year}
          team={featured.team}
          image={featured.image}
          fit={featured.objectFit}
          video={featured.video}
          href={featured.href}
          accent={featured.accent}
          alt={`${featured.team} ${featured.year}`}
        />
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
          <IconButton label="Open discussion">
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

      <article className="ds-card tournir-card">
        <PlayerFigure className="tournir-figure" variant="float" src={catalog.tournament.image} alt="" fit="contain" />
        <div className="card-top" style={{ padding: 0, marginBottom: 20, position: "relative", zIndex: 1 }}>
          <div className="year-team" style={{ maxWidth: "70%" }}>
            <p className="type-t1">{catalog.tournament.year}</p>
            <p className="type-t1">{catalog.tournament.title}</p>
          </div>
          <IconButton label="Open tournament">
            <NextArrow />
          </IconButton>
        </div>
        <div className="tournir-stats" style={{ position: "relative", zIndex: 1 }}>
          {catalog.tournament.stats.map((stat) => (
            <div key={stat.label} className="circle-stat" data-accent={stat.accent ? "true" : "false"}>
              <p className="type-h2 fact-number">{stat.value}</p>
              <p className="type-t3">{stat.label}</p>
            </div>
          ))}
        </div>
      </article>

      <div className="row-bottom">
        <HoverPlayerCard
          year={brazil.year}
          team={brazil.team}
          image={brazil.image}
          fit={brazil.objectFit}
          video={brazil.video}
          href={brazil.href}
          accent={brazil.accent}
          alt={`${brazil.team} ${brazil.year}`}
        />
        <article className="fact-card">
          <div className="fact-copy">
            <p className="type-t1">{catalog.comeback.title}</p>
            <div className="fact-row">
              <p className="type-h2 fact-number">{catalog.comeback.value}</p>
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
