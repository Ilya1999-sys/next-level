import Link from "next/link";
import type { ReactNode } from "react";

const ICONS = [
  "home",
  "games",
  "cup",
  "stats",
  "my-club",
  "exit",
  "score",
  "notification",
  "next",
  "back",
  "collapse",
  "plus",
  "minus",
] as const;

export type DsIconName = (typeof ICONS)[number];

export function DsIcon({ name }: { name: DsIconName }) {
  return <span className={`ds-icon ds-icon--${name}`} aria-hidden="true" />;
}

export function TagMood({
  selected,
  children,
  onClick,
}: {
  selected?: boolean;
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button type="button" className="tag-mood type-button-1" data-selected={selected ? "true" : "false"} onClick={onClick}>
      {children}
    </button>
  );
}

export function IconButton({
  selected,
  inverted,
  badge,
  href,
  onClick,
  label,
  children,
}: {
  selected?: boolean;
  inverted?: boolean;
  badge?: string;
  href?: string;
  onClick?: () => void;
  label: string;
  children: ReactNode;
}) {
  const className = "icon-btn";
  const content = (
    <>
      {children}
      {badge ? <span className="icon-badge">{badge}</span> : null}
    </>
  );

  if (href) {
    return (
      <Link href={href} aria-label={label} className={className} data-selected={selected ? "true" : "false"} data-inverted={inverted ? "true" : "false"}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      aria-label={label}
      className={className}
      data-selected={selected ? "true" : "false"}
      data-inverted={inverted ? "true" : "false"}
      onClick={onClick}
    >
      {content}
    </button>
  );
}

export function NextArrow() {
  return <DsIcon name="next" />;
}

export function IconHome() {
  return <DsIcon name="home" />;
}

export function IconGames() {
  return <DsIcon name="games" />;
}

export function IconCup() {
  return <DsIcon name="cup" />;
}

export function IconStats() {
  return <DsIcon name="stats" />;
}

export function IconClub() {
  return <DsIcon name="my-club" />;
}

export function IconStar() {
  return <DsIcon name="score" />;
}

export function IconBell() {
  return <DsIcon name="notification" />;
}

export function IconExit() {
  return <DsIcon name="exit" />;
}

export function IconBack() {
  return <DsIcon name="back" />;
}

export function CollapseIcon({ direction }: { direction: "up" | "down" | "left" | "right" }) {
  return <span className={`ds-icon ds-icon--collapse ds-icon-rotate-${direction}`} aria-hidden="true" />;
}

export function DotGrid({ total, filled, columns = 6 }: { total: number; filled: number; columns?: number }) {
  return (
    <div className="dot-grid" style={{ ["--cols" as string]: columns }}>
      {Array.from({ length: total }).map((_, index) => (
        <span key={index} className="stat-dot" data-on={index < filled ? "true" : "false"} />
      ))}
    </div>
  );
}

export function CircleStat({ value, label, accent }: { value: string; label: string; accent?: boolean }) {
  return (
    <div className="circle-stat" data-accent={accent ? "true" : "false"}>
      <p className="type-h2 fact-number">{value}</p>
      <p className="type-t3">{label}</p>
    </div>
  );
}
