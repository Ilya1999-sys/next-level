"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMood, type Mood } from "@/components/mood/mood-provider";
import {
  IconBell,
  IconButton,
  IconClub,
  IconCup,
  IconExit,
  IconGames,
  IconHome,
  IconProfile,
  IconStar,
  IconStats,
  TagMood,
} from "@/components/ui/ds";
import type { ReactNode } from "react";

const MOODS: Array<{ id: Mood; label: string }> = [
  { id: "drama", label: "Drama" },
  { id: "legends", label: "Legends" },
  { id: "nostalgia", label: "Nostalgia" },
];

export function AppChrome({ crumbs, children }: { crumbs: string[]; children: ReactNode }) {
  const pathname = usePathname();
  const { mood, setMood } = useMood();

  return (
    <div className="page-shell">
      <header className="top-menu">
        <div className="top-menu-brand">
          <Link href="/" className="logo-a" aria-label="Home">
            <img src="/figma/logo.svg" alt="" width={88} height={44} />
          </Link>
          <div className="top-menu-copy">
            <p className="type-h1">Your mood, your match</p>
            <div className="crumbs type-t2">
              {crumbs.map((crumb, index) => (
                <span key={`${crumb}-${index}`}>
                  {index > 0 ? " / " : null}
                  {crumb === "Home" ? <Link href="/">Home</Link> : crumb}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="mood-row">
          {MOODS.map((item) => (
            <TagMood key={item.id} selected={mood === item.id} onClick={() => setMood(item.id)}>
              {item.label}
            </TagMood>
          ))}
        </div>
      </header>

      <div className="page-body">
        <aside className="left-menu">
          <div className="left-menu-group">
            <IconButton href="/" label="Home" selected={pathname === "/"}>
              <IconHome />
            </IconButton>
            <IconButton href="/portugal-2016" label="Games" selected={pathname.startsWith("/match") || pathname.startsWith("/portugal-2016")}>
              <IconGames />
            </IconButton>
            <IconButton href="/player-stats" label="Cup">
              <IconCup />
            </IconButton>
            <IconButton href="/player-stats" label="Stats" selected={pathname.startsWith("/player-stats")}>
              <IconStats />
            </IconButton>
            <IconButton href="/team/real-madrid" label="My club">
              <IconClub />
            </IconButton>
          </div>
          <div className="left-menu-group">
            <IconButton href="/profile" label="Favorites" badge="2">
              <IconStar />
            </IconButton>
            <IconButton href="/notifications" label="Notifications" badge="2">
              <IconBell />
            </IconButton>
            <IconButton href="/" label="Exit">
              <IconExit />
            </IconButton>
            <IconButton href="/profile" label="Profile">
              <IconProfile />
            </IconButton>
          </div>
        </aside>
        <div className="cards-all">{children}</div>
      </div>
    </div>
  );
}
