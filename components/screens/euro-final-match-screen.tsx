"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { CollapseIcon, DsIcon, IconButton, TagMood } from "@/components/ui/ds";
import { HIGHLIGHTS } from "@/lib/media/highlights";
import { HighlightIframe } from "@/components/ui/highlight-iframe";

const CAMERAS = ["Player", "Referee", "Behind goal", "Drone"] as const;
type HudKey = "score" | "mode" | "facts" | "health" | "rate";

const PORTUGAL = [
  { name: "Cristiano Ronaldo", number: "№7", position: "Forward", rating: 10 },
  { name: "Pepe", number: "№3", position: "Defender", rating: 9 },
  { name: "Eder", number: "№9", position: "Forward", rating: 10 },
  { name: "Rui Patricio", number: "№1", position: "Goalkeeper", rating: 8 },
];

const FRANCE = [
  { name: "Antoine Griezmann", number: "№7", position: "Forward", rating: 8 },
  { name: "Paul Pogba", number: "№6", position: "Midfielder", rating: 7 },
  { name: "Hugo Lloris", number: "№1", position: "Goalkeeper", rating: 7 },
];

const SMART_FACTS = [
  {
    tournament: "EURO—2016",
    title: "Eder from extra time",
    desc: "Eder’s extra-time goal beat host nation France in the final.",
  },
  {
    tournament: "EURO—2016",
    title: "Captain leaves the pitch",
    desc: "Cristiano Ronaldo was injured and substituted in the final match against France.",
  },
  {
    tournament: "EURO—2016",
    title: "One regular-time win",
    desc: "Portugal needed one regular-time victory over Wales in the entire tournament.",
  },
];

export function EuroFinalMatchScreen() {
  const router = useRouter();
  const [open, setOpen] = useState<Record<HudKey, boolean>>({
    score: false,
    mode: false,
    facts: false,
    health: false,
    rate: false,
  });
  const [rateTeam, setRateTeam] = useState<"portugal" | "france" | null>("portugal");
  const [healthTeam, setHealthTeam] = useState<"portugal" | "france" | null>("portugal");
  const [camera, setCamera] = useState<(typeof CAMERAS)[number]>("Player");
  const [ratings, setRatings] = useState<Record<string, number>>(() =>
    Object.fromEntries([...PORTUGAL, ...FRANCE].map((player) => [player.name, player.rating]))
  );

  function toggleHud(key: HudKey) {
    setOpen((prev) => {
      const nextOpen = !prev[key];
      const next = { ...prev, [key]: nextOpen };
      if (!nextOpen) return next;
      if (key === "facts") {
        next.score = false;
        next.health = false;
        next.rate = false;
      }
      if (key === "health" || key === "rate") {
        next.facts = false;
        next.mode = false;
        if (key === "health") next.rate = false;
        if (key === "rate") next.health = false;
      }
      if (key === "score") next.facts = false;
      if (key === "mode") {
        next.health = false;
        next.rate = false;
      }
      return next;
    });
  }

  function bump(name: string, delta: number) {
    setRatings((prev) => ({ ...prev, [name]: Math.min(10, Math.max(0, prev[name] + delta)) }));
  }

  function toggleTeam(panel: "rate" | "health", team: "portugal" | "france") {
    const current = panel === "rate" ? rateTeam : healthTeam;
    const set = panel === "rate" ? setRateTeam : setHealthTeam;
    set(current === team ? null : team);
  }

  return (
    <div className="match-stage">
      <div className="match-video match-video--embed">
        <HighlightIframe clip={HIGHLIGHTS.france2016} title="EURO 2016 final highlights: Portugal 1-0 France" />
      </div>
      <p className="match-credit type-t3">
        Match footage is used for an educational non-commercial study project. Sources are not presented as original broadcasts.
      </p>

      <div className="match-hud-top">
        <div
          className={open.score ? "glass-panel" : "opaque-panel"}
          data-tone={open.score ? undefined : "page"}
          style={{ borderRadius: open.score ? "var(--radius-l)" : "var(--radius-xs)", padding: 12, display: "flex", gap: 28, alignItems: "center" }}
        >
          {open.score ? (
            <>
              <IconButton label="Back" onClick={() => router.push("/portugal-2016")}>
                <DsIcon name="back" />
              </IconButton>
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <TeamBadge code="Por" src="/figma/team-por.png" />
                <div className="match-score" style={{ textAlign: "center" }}>
                  <p className="type-h2 fact-number">
                    0 <span>-</span> 0
                  </p>
                  <p className="type-t2">18:45</p>
                </div>
                <TeamBadge code="Fra" src="/figma/team-fra.png" reverse />
              </div>
            </>
          ) : (
            <div className="match-score" style={{ textAlign: "center" }}>
              <p className="type-h2 fact-number">0 - 0</p>
              <p className="type-t2">18:45</p>
            </div>
          )}
          <button type="button" className="collapse-label" onClick={() => toggleHud("score")} aria-label="Toggle score">
            <CollapseIcon direction={open.score ? "left" : "right"} />
          </button>
        </div>

        <div
          className={open.mode ? "glass-panel" : "opaque-panel"}
          style={{ borderRadius: open.mode ? "var(--radius-l)" : "var(--radius-s)", padding: open.mode ? 20 : 8, display: "grid", gap: 28, justifyItems: "center" }}
        >
          {open.mode ? (
            <>
              <p className="type-t1" style={{ textAlign: "center" }}>
                View mode
              </p>
              <div style={{ display: "grid", gap: 12, width: 147 }}>
                {CAMERAS.map((item) => (
                  <TagMood key={item} selected={camera === item} onClick={() => setCamera(item)}>
                    {item}
                  </TagMood>
                ))}
              </div>
            </>
          ) : null}
          <button type="button" className="collapse-label" onClick={() => toggleHud("mode")}>
            <span className="type-t1">Mode</span>
            <CollapseIcon direction={open.mode ? "up" : "down"} />
          </button>
        </div>
      </div>

      <div className="match-hud-bottom">
        <MatchDrawer open={open.facts} onToggle={() => toggleHud("facts")} label="smart facts" variant="facts">
          <p className="type-t1">smart facts</p>
          <div className="smart-facts-list">
            {SMART_FACTS.map((fact) => (
              <article key={fact.title} className="smart-fact-card">
                <span className="live-flag">
                  <span className="dot-live" />
                  <span className="type-t1">{fact.tournament}</span>
                </span>
                <div className="smart-fact-copy">
                  <p className="type-h3">{fact.title}</p>
                  <p className="type-t2">{fact.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </MatchDrawer>

        <div className="match-hud-right">
          <MatchDrawer open={open.health} onToggle={() => toggleHud("health")} label="Health players" variant="health">
            <p className="type-t1">Health players</p>
            <TeamBlock
              name="Portugal"
              open={healthTeam === "portugal"}
              onToggle={() => toggleTeam("health", "portugal")}
              crest="/figma/team-por.png"
              players={PORTUGAL.map((player) => ({ ...player, value: ratings[player.name] }))}
            />
            <TeamBlock
              name="France"
              open={healthTeam === "france"}
              onToggle={() => toggleTeam("health", "france")}
              crest="/figma/team-fra.png"
              players={FRANCE.map((player) => ({ ...player, value: ratings[player.name] }))}
            />
          </MatchDrawer>

          <MatchDrawer open={open.rate} onToggle={() => toggleHud("rate")} label="Rate players" variant="rate">
            <p className="type-t1">Rate players</p>
            <TeamBlock
              name="Portugal"
              open={rateTeam === "portugal"}
              onToggle={() => toggleTeam("rate", "portugal")}
              crest="/figma/team-por.png"
              players={PORTUGAL.map((player) => ({ ...player, value: ratings[player.name] }))}
              rate
              onRate={bump}
            />
            <TeamBlock
              name="France"
              open={rateTeam === "france"}
              onToggle={() => toggleTeam("rate", "france")}
              crest="/figma/team-fra.png"
              players={FRANCE.map((player) => ({ ...player, value: ratings[player.name] }))}
              rate
              onRate={bump}
            />
          </MatchDrawer>
        </div>
      </div>
    </div>
  );
}

function MatchDrawer({
  open,
  onToggle,
  label,
  variant,
  children,
}: {
  open: boolean;
  onToggle: () => void;
  label: string;
  variant: "facts" | "rate" | "health";
  children: ReactNode;
}) {
  return (
    <div className={`${open ? "glass-panel" : "opaque-panel"} match-drawer match-drawer--${variant} ${open ? "match-drawer--open" : "match-drawer--closed"}`}>
      {open ? children : null}
      <button type="button" className="collapse-label" onClick={onToggle} aria-label={open ? `Collapse ${label}` : `Open ${label}`}>
        {open ? null : <span className="type-t1">{label}</span>}
        <CollapseIcon direction={open ? "down" : "up"} />
      </button>
    </div>
  );
}

function TeamBlock({
  name,
  open,
  onToggle,
  players = [],
  crest,
  rate,
  onRate,
}: {
  name: string;
  open: boolean;
  onToggle: () => void;
  players?: Array<{ name: string; number: string; position: string; value: number }>;
  crest?: string;
  rate?: boolean;
  onRate?: (name: string, delta: number) => void;
}) {
  return (
    <div className={open ? "team-block" : "team-block team-block--closed"}>
      <button type="button" className="collapse-label" onClick={onToggle} aria-label={`${open ? "Collapse" : "Expand"} ${name}`}>
        <span className="type-t1">{name}</span>
        <CollapseIcon direction={open ? "up" : "down"} />
      </button>
      {open
        ? players.map((player) => (
            <PlayerRow
              key={player.name}
              {...player}
              crest={crest}
              rate={rate}
              onRate={onRate ? (delta) => onRate(player.name, delta) : undefined}
            />
          ))
        : null}
    </div>
  );
}

function PlayerRow({
  name,
  number,
  position,
  value,
  crest,
  rate,
  onRate,
}: {
  name: string;
  number: string;
  position: string;
  value: number;
  crest?: string;
  rate?: boolean;
  onRate?: (delta: number) => void;
}) {
  return (
    <div className="player-row">
      <div className="player-row-meta">
        <span className="team-icon team-icon--player">
          {crest ? <img src={crest} alt="" /> : name.slice(0, 1)}
        </span>
        <div className="player-row-copy">
          <p className="type-h3">{name}</p>
          <p className="type-t2">
            {number} / {position}
          </p>
        </div>
      </div>
      <div className="rating-controls">
        {rate ? (
          <button type="button" className="rate-btn" aria-label={`Lower rating for ${name}`} onClick={() => onRate?.(-1)}>
            <DsIcon name="minus" />
          </button>
        ) : null}
        <span className="score-icon type-h3" data-range={value >= 8 ? "high" : "mid"}>
          {value}
        </span>
        {rate ? (
          <button type="button" className="rate-btn" aria-label={`Raise rating for ${name}`} onClick={() => onRate?.(1)}>
            <DsIcon name="plus" />
          </button>
        ) : null}
      </div>
    </div>
  );
}

function TeamBadge({ code, src, reverse }: { code: string; src: string; reverse?: boolean }) {
  return (
    <div className={reverse ? "score-team score-team--reverse" : "score-team"}>
      <span className="team-icon">
        <img src={src} alt="" />
      </span>
      <p className="type-h3">{code}</p>
    </div>
  );
}
