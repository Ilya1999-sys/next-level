"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { CollapseIcon, DsIcon, IconButton, TagMood } from "@/components/ui/ds";

const EURO_2016_FINAL = "https://assets.mixkit.co/videos/43483/43483-720.mp4";
const CAMERAS = ["Player", "Referee", "Behind goal", "Drone"] as const;

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
  const [scoreOpen, setScoreOpen] = useState(false);
  const [modeOpen, setModeOpen] = useState(false);
  const [factsOpen, setFactsOpen] = useState(false);
  const [healthOpen, setHealthOpen] = useState(false);
  const [rateOpen, setRateOpen] = useState(false);
  const [rateFranceOpen, setRateFranceOpen] = useState(false);
  const [ratePortugalOpen, setRatePortugalOpen] = useState(true);
  const [healthFranceOpen, setHealthFranceOpen] = useState(false);
  const [healthPortugalOpen, setHealthPortugalOpen] = useState(true);
  const [camera, setCamera] = useState<(typeof CAMERAS)[number]>("Player");
  const [ratings, setRatings] = useState<Record<string, number>>(() =>
    Object.fromEntries([...PORTUGAL, ...FRANCE].map((player) => [player.name, player.rating]))
  );

  function bump(name: string, delta: number) {
    setRatings((prev) => ({ ...prev, [name]: Math.min(10, Math.max(0, prev[name] + delta)) }));
  }

  return (
    <div className="match-stage">
      <video className="match-video" autoPlay muted loop playsInline poster="/figma/match-bg.png">
        <source src={EURO_2016_FINAL} type="video/mp4" />
      </video>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <div
          className={scoreOpen ? "glass-panel" : "opaque-panel"}
          data-tone={scoreOpen ? undefined : "page"}
          style={{ borderRadius: scoreOpen ? "var(--radius-l)" : "var(--radius-xs)", padding: 12, display: "flex", gap: 28, alignItems: "center" }}
        >
          {scoreOpen ? (
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
          <button type="button" className="collapse-label" onClick={() => setScoreOpen((value) => !value)} aria-label="Toggle score">
            <CollapseIcon direction={scoreOpen ? "left" : "right"} />
          </button>
        </div>

        <div
          className={modeOpen ? "glass-panel" : "opaque-panel"}
          style={{ borderRadius: modeOpen ? "var(--radius-l)" : "var(--radius-s)", padding: modeOpen ? 20 : 8, display: "grid", gap: 28, justifyItems: "center" }}
        >
          {modeOpen ? (
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
          <button type="button" className="collapse-label" onClick={() => setModeOpen((value) => !value)}>
            <span className="type-t1">Mode</span>
            <CollapseIcon direction={modeOpen ? "up" : "down"} />
          </button>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 12 }}>
        <MatchDrawer open={factsOpen} onToggle={() => setFactsOpen((value) => !value)} label="smart facts" variant="facts">
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

        <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
          <MatchDrawer open={healthOpen} onToggle={() => setHealthOpen((value) => !value)} label="Health players" variant="health">
            <p className="type-t1">Health players</p>
            <TeamBlock
              name="Portugal"
              open={healthPortugalOpen}
              onToggle={() => setHealthPortugalOpen((value) => !value)}
              crest="/figma/team-por.png"
              players={PORTUGAL.map((player) => ({ ...player, value: ratings[player.name] }))}
            />
            <TeamBlock
              name="France"
              open={healthFranceOpen}
              onToggle={() => setHealthFranceOpen((value) => !value)}
              crest="/figma/team-fra.png"
              players={FRANCE.map((player) => ({ ...player, value: ratings[player.name] }))}
            />
          </MatchDrawer>

          <MatchDrawer open={rateOpen} onToggle={() => setRateOpen((value) => !value)} label="Rate players" variant="rate">
            <p className="type-t1">Rate players</p>
            <TeamBlock
              name="Portugal"
              open={ratePortugalOpen}
              onToggle={() => setRatePortugalOpen((value) => !value)}
              crest="/figma/team-por.png"
              players={PORTUGAL.map((player) => ({ ...player, value: ratings[player.name] }))}
              rate
              onRate={bump}
            />
            <TeamBlock
              name="France"
              open={rateFranceOpen}
              onToggle={() => setRateFranceOpen((value) => !value)}
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
