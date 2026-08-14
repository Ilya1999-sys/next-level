"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { CollapseIcon, DsIcon, IconButton, TagMood } from "@/components/ui/ds";

const EURO_2016_FINAL = "https://assets.mixkit.co/videos/43483/43483-720.mp4";
const CAMERAS = ["Player", "Referee", "Behind goal", "Drone"] as const;

const PORTUGAL = [
  { name: "Cristiano Ronaldo", meta: "№7 / Forward", rating: 10 },
  { name: "Pepe", meta: "№3 / Defender", rating: 9 },
  { name: "Eder", meta: "№9 / Forward", rating: 10 },
  { name: "Rui Patricio", meta: "№1 / Goalkeeper", rating: 8 },
];

const FRANCE = [
  { name: "Antoine Griezmann", meta: "№7 / Forward", rating: 8 },
  { name: "Paul Pogba", meta: "№6 / Midfielder", rating: 7 },
  { name: "Hugo Lloris", meta: "№1 / Goalkeeper", rating: 7 },
];

const FACTS = [
  "Eder’s extra-time goal beat host nation France in the final.",
  "Cristiano Ronaldo was injured and substituted in the final match against France.",
  "Portugal needed one regular-time victory over Wales in the entire tournament.",
];

export function EuroFinalMatchScreen() {
  const router = useRouter();
  const [scoreOpen, setScoreOpen] = useState(false);
  const [modeOpen, setModeOpen] = useState(false);
  const [factsOpen, setFactsOpen] = useState(false);
  const [healthOpen, setHealthOpen] = useState(false);
  const [rateOpen, setRateOpen] = useState(false);
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
                <div style={{ textAlign: "center" }}>
                  <p className="type-h2">0 - 0</p>
                  <p className="type-t2">18:45</p>
                </div>
                <TeamBadge code="Fra" src="/figma/team-fra.png" reverse />
              </div>
            </>
          ) : (
            <div style={{ textAlign: "center" }}>
              <p className="type-h2">0 - 0</p>
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
        <OverlayPanel open={factsOpen} onToggle={() => setFactsOpen((value) => !value)} label="Smart facts">
          <div style={{ display: "grid", gap: 12, width: 560 }}>
            {FACTS.map((fact) => (
              <p key={fact} className="type-t2">
                {fact}
              </p>
            ))}
          </div>
        </OverlayPanel>

        <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
          <OverlayPanel open={healthOpen} onToggle={() => setHealthOpen((value) => !value)} label="Health players">
            <div style={{ display: "grid", gap: 8, width: 420 }}>
              {[...PORTUGAL, ...FRANCE].map((player) => (
                <div key={player.name} style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                  <span className="type-t1">{player.name}</span>
                  <span className="type-t2">{player.meta}</span>
                </div>
              ))}
            </div>
          </OverlayPanel>

          <OverlayPanel open={rateOpen} onToggle={() => setRateOpen((value) => !value)} label="Rate players" width={500}>
            <p className="type-t1">Rate players</p>
            <p className="type-t2">Portugal</p>
            {PORTUGAL.map((player) => (
              <RatingRow key={player.name} {...player} value={ratings[player.name]} onChange={(delta) => bump(player.name, delta)} />
            ))}
            <p className="type-t2">France</p>
            {FRANCE.map((player) => (
              <RatingRow key={player.name} {...player} value={ratings[player.name]} onChange={(delta) => bump(player.name, delta)} />
            ))}
          </OverlayPanel>
        </div>
      </div>
    </div>
  );
}

function OverlayPanel({
  open,
  onToggle,
  label,
  children,
  width,
}: {
  open: boolean;
  onToggle: () => void;
  label: string;
  children: ReactNode;
  width?: number;
}) {
  return (
    <div
      className={open ? "glass-panel" : "opaque-panel"}
      style={{
        borderRadius: open ? "var(--radius-m)" : "var(--radius-xs)",
        padding: open ? 20 : 8,
        display: "grid",
        gap: 20,
        width: open ? width : undefined,
      }}
    >
      {open ? children : null}
      <button type="button" className="collapse-label" onClick={onToggle}>
        <span className="type-t1">{label}</span>
        <CollapseIcon direction={open ? "down" : "up"} />
      </button>
    </div>
  );
}

function TeamBadge({ code, src, reverse }: { code: string; src: string; reverse?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, flexDirection: reverse ? "row-reverse" : "row" }}>
      <img className="profile-orb" src={src} alt={code} width={72} height={72} />
      <p className="type-h3">{code}</p>
    </div>
  );
}

function RatingRow({
  name,
  meta,
  value,
  onChange,
}: {
  name: string;
  meta: string;
  value: number;
  onChange: (delta: number) => void;
}) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 12, alignItems: "center", width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span className="profile-orb" style={{ width: 40, height: 40, fontSize: 12 }}>
          {name.slice(0, 1)}
        </span>
        <div>
          <p className="type-h3">{name}</p>
          <p className="type-t2">{meta}</p>
        </div>
      </div>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
        <button type="button" className="collapse-label" aria-label={`Lower rating for ${name}`} onClick={() => onChange(-1)}>
          <DsIcon name="minus" />
        </button>
        <span className="score-icon type-h3" data-range={value >= 8 ? "high" : "mid"}>
          {value}
        </span>
        <button type="button" className="collapse-label" aria-label={`Raise rating for ${name}`} onClick={() => onChange(1)}>
          <DsIcon name="plus" />
        </button>
      </div>
    </div>
  );
}
