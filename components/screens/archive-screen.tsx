"use client";

import Link from "next/link";
import { AppChrome } from "@/components/navigation/app-chrome";
import { CircleRow, MixChart } from "@/components/ui/card-graphics";
import { DotGrid, IconButton, NextArrow } from "@/components/ui/ds";
import { GraphicHoverCard } from "@/components/ui/hover-player-card";
import { BARCELONA_MARKS } from "@/lib/mood/catalog";
import { HIGHLIGHTS } from "@/lib/media/highlights";
import type { ReactNode } from "react";

export function ArchiveShell({ crumbs, children }: { crumbs: string[]; children: ReactNode }) {
  return <AppChrome crumbs={crumbs}>{children}</AppChrome>;
}

export function FactBlock({
  title,
  value,
  text,
  tournament,
  dots,
  fill,
}: {
  title: string;
  value: string;
  text: string;
  tournament?: string;
  dots?: { total: number; filled: number; columns?: number };
  fill?: boolean;
}) {
  return (
    <article className={fill ? "fact-card fact-card--fill" : "fact-card"}>
      <div className="fact-copy">
        <div className="fact-head">
          <p className="type-t1">{title}</p>
          {tournament ? (
            <span className="live-flag">
              <span className="dot-live" />
              <span className="type-t1">{tournament}</span>
            </span>
          ) : null}
        </div>
        <div className="fact-row">
          <p className="type-h2 fact-number">{value}</p>
          <p className="type-t2">{text}</p>
        </div>
      </div>
      {dots ? <DotGrid total={dots.total} filled={dots.filled} columns={dots.columns} /> : null}
    </article>
  );
}

export function LiveCard({ place, chips, fans, href }: { place: string; chips: string[]; fans: string; href?: string }) {
  return (
    <article className="ds-card discussion-card">
      <div className="card-top" style={{ padding: 0 }}>
        <div className="year-team">
          <span className="live-flag">
            <span className="dot-live" />
            <span className="type-t1">Live</span>
          </span>
          <p className="type-t1">{place}</p>
        </div>
        <IconButton label="Open discussion" href={href ?? "/forum/match-discussion"}>
          <NextArrow />
        </IconButton>
      </div>
      <div className="discussion-body">
        <div className="discussion-chips">
          {chips.map((chip) => (
            <span key={chip} className="discussion-chip type-t3">
              {chip}
            </span>
          ))}
        </div>
        <span className="live-flag">
          <span className="dot-live" />
          <span className="type-t1">{fans}</span>
        </span>
      </div>
    </article>
  );
}

export function PlayerStatsScreen() {
  return (
    <ArchiveShell crumbs={["Home", "Stats"]}>
      <article className="ds-card tournament-hero">
        <div className="tournament-hero-copy">
          <p className="type-h2">Your archive stats</p>
          <p className="type-t3">Favorite players, clubs and watched nights, assembled from the same Nostalgia cards.</p>
        </div>
        <CircleRow
          stats={[
            { value: "976", label: "Ronaldo goals", accent: true },
            { value: "5", label: "Mbappe in one match" },
            { value: "15", label: "Madrid UCL" },
          ]}
        />
      </article>
      <div className="row-facts-split">
        <FactBlock title="Favorite player fact" value="5" text="Killian Mbappe scored goals in one match" />
        <FactBlock title="Club fact" value="15" text="Champions League Cups won by Real Madrid" dots={{ total: 18, filled: 8, columns: 6 }} />
      </div>
      <div className="row-goals">
        <GraphicHoverCard year="/2016" title="Open Portugal Euro archive" href="/portugal-2016" youtube={HIGHLIGHTS.portugal2016} accent>
          <CircleRow stats={[{ value: "9", label: "Portugal goals", accent: true }, { value: "1", label: "regular-time win" }]} />
        </GraphicHoverCard>
        <article className="ds-card" style={{ padding: "var(--space-l)", display: "grid", gap: "var(--space-m)", alignContent: "center" }}>
          <p className="type-t1">Player files</p>
          <Link href="/player-stats/mbappe" className="type-h3">
            Kylian Mbappe →
          </Link>
          <p className="type-t2">Goals, rating and the nights you keep rewatching.</p>
        </article>
      </div>
    </ArchiveShell>
  );
}

export function PlayerStatDetailScreen() {
  return (
    <ArchiveShell crumbs={["Home", "Stats", "Mbappe"]}>
      <article className="ds-card tournament-hero">
        <div className="tournament-hero-copy">
          <p className="type-h2">Kylian Mbappe</p>
          <p className="type-t3">Favorite player file: pace, finishing, and the nights that turned a forward into an archive icon.</p>
        </div>
        <CircleRow
          stats={[
            { value: "25", label: "goals", accent: true },
            { value: "15", label: "assists" },
            { value: "8.7", label: "rating" },
          ]}
        />
      </article>
      <div className="row-facts-split">
        <FactBlock title="Favorite player fact" value="5" text="Goals scored in one match" />
        <FactBlock title="Nostalgia fact" value="48" text="matches tracked in this archive season" dots={{ total: 12, filled: 8 }} />
      </div>
    </ArchiveShell>
  );
}

export function TeamStatsScreen() {
  return (
    <ArchiveShell crumbs={["Home", "My club"]}>
      <article className="ds-card tournament-hero">
        <div className="tournament-hero-copy">
          <p className="type-h2">Real Madrid</p>
          <p className="type-t3">Santiago Bernabeu archive: European nights, galacticos, and the 15 cups in the museum.</p>
        </div>
        <CircleRow
          stats={[
            { value: "15", label: "UCL titles", accent: true },
            { value: "36", label: "La Liga" },
            { value: "8", label: "Club World Cups" },
          ]}
        />
      </article>
      <FactBlock title="Club fact" value="15" text="Champions League Cups won by Real Madrid" fill dots={{ total: 18, filled: 8, columns: 6 }} />
      <GraphicHoverCard banner year="/2009" title="Path to the final: “Barcelona”." youtube={HIGHLIGHTS.barcelona}>
        <MixChart marks={BARCELONA_MARKS} />
      </GraphicHoverCard>
    </ArchiveShell>
  );
}

export function ProfileScreen() {
  return (
    <ArchiveShell crumbs={["Home", "Profile"]}>
      <article className="ds-card tournament-hero">
        <div className="tournament-hero-copy">
          <p className="type-h2">Ilya Polikarpov</p>
          <p className="type-t3">Favorites: Mbappe, Real Madrid, Portugal 2016, Ghana 2010 archive nights.</p>
        </div>
        <CircleRow
          stats={[
            { value: "840", label: "bonuses", accent: true },
            { value: "6", label: "unlocked cards" },
            { value: "12", label: "predictions won" },
          ]}
        />
      </article>
      <div className="row-facts-split">
        <FactBlock title="Watch fact" value="31" text="highlights watched this month" />
        <FactBlock title="Club fact" value="15" text="Real Madrid European Cups in the museum" tournament="UCL" />
      </div>
    </ArchiveShell>
  );
}

export function NotificationsScreen() {
  return (
    <ArchiveShell crumbs={["Home", "Notifications"]}>
      <FactBlock title="Reminder" value="10" text="minutes until a Portugal 2016 rewatch starts" tournament="EURO—2016" />
      <FactBlock title="Discussion" value="3" text="new comments in the match forum" />
      <FactBlock title="Reward" value="25" text="bonus points earned for yesterday’s vote" />
      <LiveCard place="Portugal-2016" chips={["Ronaldo goals on tournir", "And if the rules hadn't changed..."]} fans="21 fans discussions" />
    </ArchiveShell>
  );
}

export function ForumDiscussionScreen() {
  return (
    <ArchiveShell crumbs={["Home", "Forum"]}>
      <LiveCard
        place="Portugal-2016"
        chips={["Eder from extra time", "If Ronaldo stays on the pitch", "One regular-time win"]}
        fans="324 fans discussions"
      />
      <div className="row-facts-split">
        <FactBlock title="Thread fact" value="109" text="The minute everyone still argues about in the final." />
        <FactBlock title="Crowd fact" value="412" text="fans joined the Saint-Denis archive room" />
      </div>
    </ArchiveShell>
  );
}

export function MatchesLandingScreen() {
  return (
    <ArchiveShell crumbs={["Home", "Matches"]}>
      <article className="ds-card tournament-hero">
        <div className="tournament-hero-copy">
          <p className="type-h2">Match archive</p>
          <p className="type-t3">Hover a card with an arrow to play the review. Open Portugal 2016 to walk the path to the final.</p>
        </div>
        <CircleRow
          stats={[
            { value: "8", label: "reviews", accent: true },
            { value: "3", label: "tournaments" },
            { value: "1", label: "final night" },
          ]}
        />
      </article>
      <div className="row-goals">
        <GraphicHoverCard year="/2016" title="Portugal's first victory in a major tournament." href="/portugal-2016" youtube={HIGHLIGHTS.portugal2016} accent>
          <CircleRow stats={[{ value: "1", label: "European title", accent: true }, { value: "9", label: "goals scored" }]} />
        </GraphicHoverCard>
        <GraphicHoverCard year="/2010" title="USA vs Ghana, World Cup round of 16" href="/match/usa-vs-ghana-2010" youtube={HIGHLIGHTS.zidane}>
          <CircleRow stats={[{ value: "2", label: "extra-time drama", accent: true }, { value: "1", label: "Ghana winner" }]} />
        </GraphicHoverCard>
      </div>
    </ArchiveShell>
  );
}

export function UsaGhanaMatchScreen() {
  return (
    <ArchiveShell crumbs={["Home", "Matches", "USA–Ghana"]}>
      <article className="ds-card tournament-hero">
        <div className="tournament-hero-copy">
          <p className="type-h2">USA vs Ghana 2010</p>
          <p className="type-t3">World Cup round of 16 in Rustenburg: extra time, one strike, and an archive night that still gets reopened.</p>
        </div>
        <CircleRow
          stats={[
            { value: "2-1", label: "final", accent: true },
            { value: "120", label: "minutes" },
            { value: "2010", label: "South Africa" },
          ]}
        />
      </article>
      <div className="row-facts-split">
        <FactBlock title="Archive fact" value="3" text="Ghana reached a World Cup quarter-final" tournament="WC—2010" />
        <FactBlock title="Drama fact" value="1" text="extra-time goal ended the USA run" />
      </div>
    </ArchiveShell>
  );
}

export function PauseReplayScreen() {
  return (
    <ArchiveShell crumbs={["Home", "Pause"]}>
      <FactBlock title="Paused fact" value="109" text="Eder’s extra-time goal is the frame this archive keeps coming back to." />
      <LiveCard place="Saint-Denis" chips={["Replay the winner", "Captain leaves the pitch"]} fans="198 fans discussions" href="/portugal-2016/france" />
      <GraphicHoverCard banner year="Match review" title="1-0 France" href="/portugal-2016/france" youtube={HIGHLIGHTS.france2016} accent>
        <CircleRow stats={[{ value: "1", label: "golden goal", accent: true }, { value: "0", label: "France" }]} />
      </GraphicHoverCard>
    </ArchiveShell>
  );
}

export function FifaInterfaceScreen() {
  return (
    <ArchiveShell crumbs={["Home", "Matches", "USA–Ghana", "Angles"]}>
      <article className="ds-card tournament-hero">
        <div className="tournament-hero-copy">
          <p className="type-h2">View modes</p>
          <p className="type-t3">Player, referee, behind goal and drone — the same HUD language as the Euro 2016 final night.</p>
        </div>
        <CircleRow
          stats={[
            { value: "4", label: "cameras", accent: true },
            { value: "2010", label: "Rustenburg" },
            { value: "16", label: "round" },
          ]}
        />
      </article>
      <div className="row-facts-split">
        <FactBlock title="Angle fact" value="1" text="behind-goal replay that made the winner look even more dramatic" />
        <FactBlock title="Archive fact" value="48" text="minutes of documentary still on the watchlist" />
      </div>
    </ArchiveShell>
  );
}
