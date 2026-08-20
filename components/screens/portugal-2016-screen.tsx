"use client";

import { AppChrome } from "@/components/navigation/app-chrome";
import { HIGHLIGHTS } from "@/lib/media/highlights";
import { CROATIA_BARS, FRANCE_MINUTES, PORTUGAL_MINUTES, WINS_MARKS } from "@/lib/mood/catalog";
import { CircleRow, GoalTimeline, MixChart, StatBars } from "@/components/ui/card-graphics";
import { DotGrid } from "@/components/ui/ds";
import { GraphicHoverCard } from "@/components/ui/hover-player-card";

export function Portugal2016Screen() {
  return (
    <AppChrome crumbs={["Home", "Portugal-2016"]}>
      <article className="ds-card tournament-hero">
        <div className="tournament-hero-copy">
          <p className="type-h2">Portugal win Euro</p>
          <p className="type-t3">
            Cristiano Ronaldo was injured and substituted in the final match against France. And the &quot;golden goal&quot; was
            scored by the striker of the Russian championship.
          </p>
        </div>
        <CircleRow
          stats={[
            { value: "9", label: "goals scored", accent: true },
            { value: "1", label: "wins" },
            { value: "3", label: "tops scored" },
          ]}
        />
      </article>

      <div className="row-488">
        <div className="col-stack col-stack--240">
          <GraphicHoverCard year="Match review" title="1:0 Croatia" youtube={HIGHLIGHTS.croatia}>
            <StatBars rows={CROATIA_BARS} />
          </GraphicHoverCard>
          <GraphicHoverCard year="Match review" title="3-3 Hungary" youtube={HIGHLIGHTS.hungary}>
            <CircleRow
              stats={[
                { value: "19", label: "shots on goal", accent: true },
                { value: "90%", label: "pass accuracy" },
                { value: "9", label: "corners" },
              ]}
            />
          </GraphicHoverCard>
        </div>
        <div className="col-facts">
          <article className="fact-card fact-card--fill">
            <div className="fact-copy">
              <p className="type-t1">Wins fact</p>
              <div className="fact-row">
                <p className="type-h2 fact-number">1</p>
                <p className="type-t2">regular-time victory over Wales in the entire tournament</p>
              </div>
            </div>
            <MixChart marks={WINS_MARKS} />
          </article>
          <article className="fact-card">
            <div className="fact-copy">
              <p className="type-t1">Final fact</p>
              <div className="fact-row">
                <p className="type-h2 fact-number">109</p>
                <p className="type-t2">Eder’s extra-time goal beat host nation France in the final.</p>
              </div>
            </div>
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
        <GraphicHoverCard
          featured
          accent
          year="Match review"
          title="1-0 France"
          href="/portugal-2016/france"
          youtube={HIGHLIGHTS.france2016}
        >
          <GoalTimeline left={FRANCE_MINUTES} right={PORTUGAL_MINUTES} highlight={109} />
        </GraphicHoverCard>
      </div>

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
        <GraphicHoverCard year="Match review" title="2:0 Wales" youtube={HIGHLIGHTS.wales}>
          <CircleRow
            stats={[
              { value: "17", label: "shots on goal", accent: true },
              { value: "46%", label: "ball possession" },
            ]}
          />
        </GraphicHoverCard>
      </div>
    </AppChrome>
  );
}
