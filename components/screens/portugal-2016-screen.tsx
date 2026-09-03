"use client";

import { AppChrome } from "@/components/navigation/app-chrome";
import { HIGHLIGHTS, watchHref } from "@/lib/media/highlights";
import { CROATIA_BARS, WINS_MARKS } from "@/lib/mood/catalog";
import { CircleRow, GoalTimeline, MixChart, StatBars } from "@/components/ui/card-graphics";
import { FactRow } from "@/components/ui/fact-row";
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

      <div className="row-split tournament-top-grid">
        <div className="tournament-left-stack">
          <GraphicHoverCard year="Match review" title="1:0 Croatia" watchHref={watchHref("croatia")}>
            <StatBars rows={CROATIA_BARS} />
          </GraphicHoverCard>
          <GraphicHoverCard year="Match review" title="3-3 Hungary" watchHref={watchHref("hungary")}>
            <CircleRow
              stats={[
                { value: "19", label: "shots on goal", accent: true },
                { value: "90%", label: "pass accuracy" },
                { value: "9", label: "corners" },
              ]}
            />
          </GraphicHoverCard>
        </div>
        <GraphicHoverCard
          featured
          accent
          hoverVideo
          year="Match review"
          title="1-0 France"
          href="/portugal-2016/france"
          watchHref="/portugal-2016/france"
          video={HIGHLIGHTS.france2016}
        >
          <GoalTimeline />
        </GraphicHoverCard>
      </div>

      <div className="row-facts-split tournament-facts-grid">
        <article className="fact-card fact-card--fill">
          <div className="fact-copy">
            <p className="type-t1">Wins fact</p>
            <FactRow value="1" text="regular-time victory over Wales in the entire tournament" />
          </div>
          <MixChart groups={WINS_MARKS} />
        </article>
        <div className="col-stack">
          <article className="fact-card">
            <div className="fact-copy">
              <p className="type-t1">Final fact</p>
              <FactRow value="109" text="Eder’s extra-time goal beat host nation France in the final." />
            </div>
          </article>
          <article className="fact-card">
            <div className="fact-copy">
              <p className="type-t1">Ronaldo fact</p>
              <FactRow
                value="25"
                text="Cristiano Ronaldo played for a few minutes in the final of the tournament and then watched the match from the sidelines"
              />
            </div>
          </article>
        </div>
      </div>

      <div className="row-goals">
        <article className="fact-card">
          <div className="fact-copy">
            <p className="type-t1">Goals scored and missed</p>
            <FactRow value="9-5" text="The total difference between goals scored and conceded by the Portuguese national team" />
          </div>
          <DotGrid total={22} filled={9} columns={11} />
        </article>
        <GraphicHoverCard year="Match review" title="2:0 Wales" watchHref={watchHref("wales")}>
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
