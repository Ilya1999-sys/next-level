"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState, type ReactNode } from "react";
import { useMood, type Mood } from "@/components/mood/mood-provider";
import {
  IconBell,
  IconButton,
  IconClose,
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

const MOODS: Array<{ id: Mood; label: string }> = [
  { id: "drama", label: "Drama" },
  { id: "legends", label: "Legends" },
  { id: "nostalgia", label: "Nostalgia" },
];

function NavLabel({ children }: { children: string }) {
  return <span className="nav-label type-t1">{children}</span>;
}

export function AppChrome({ crumbs, children }: { crumbs: string[]; children: ReactNode }) {
  const pathname = usePathname();
  const { mood, setMood } = useMood();
  const [menuOpen, setMenuOpen] = useState(false);
  const navId = useId();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <div className="page-shell">
      <header className="top-menu">
        <div className="top-menu-brand">
          <button
            type="button"
            className="menu-toggle icon-btn"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls={navId}
            onClick={() => setMenuOpen(true)}
          >
            <span className="burger" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
          <Link href="/" className="logo-a" aria-label="Home">
            <img src="/figma/logo.svg" alt="" />
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
        <div className="mood-row mood-row--header">
          {MOODS.map((item) => (
            <TagMood key={item.id} selected={mood === item.id} onClick={() => setMood(item.id)}>
              {item.label}
            </TagMood>
          ))}
        </div>
      </header>

      <div className="page-body">
        <aside id={navId} className="left-menu" data-open={menuOpen ? "true" : "false"}>
          <button
            type="button"
            className="menu-close icon-btn"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <IconClose />
          </button>
          <div className="left-menu-group">
            <IconButton href="/" label="Home" selected={pathname === "/"}>
              <IconHome />
              <NavLabel>Home</NavLabel>
            </IconButton>
            <IconButton
              href="/portugal-2016"
              label="Games"
              selected={
                pathname.startsWith("/match") ||
                pathname.startsWith("/portugal-2016") ||
                pathname.startsWith("/watch") ||
                pathname.startsWith("/forum")
              }
            >
              <IconGames />
              <NavLabel>Games</NavLabel>
            </IconButton>
            <IconButton href="/tournaments" label="Cup" selected={pathname.startsWith("/tournaments")}>
              <IconCup />
              <NavLabel>Cup</NavLabel>
            </IconButton>
            <IconButton href="/player-stats" label="Stats" selected={pathname.startsWith("/player-stats")}>
              <IconStats />
              <NavLabel>Stats</NavLabel>
            </IconButton>
            <IconButton href="/team/real-madrid" label="My club" selected={pathname.startsWith("/team")}>
              <IconClub />
              <NavLabel>My club</NavLabel>
            </IconButton>
          </div>
          <div className="left-menu-group">
            <IconButton href="/notifications" label="Notifications" badge="2" selected={pathname.startsWith("/notifications")}>
              <IconBell />
              <NavLabel>Notifications</NavLabel>
            </IconButton>
            <IconButton href="/favorites" label="Favorites" badge="2" selected={pathname.startsWith("/favorites")}>
              <IconStar />
              <NavLabel>Favorites</NavLabel>
            </IconButton>
            <IconButton href="/" label="Exit">
              <IconExit />
              <NavLabel>Exit</NavLabel>
            </IconButton>
            <IconButton href="/profile" label="Profile" selected={pathname.startsWith("/profile")}>
              <IconProfile />
              <NavLabel>Profile</NavLabel>
            </IconButton>
          </div>
          <div className="mood-row mood-row--menu">
            <p className="type-t1">View mode</p>
            {MOODS.map((item) => (
              <TagMood key={item.id} selected={mood === item.id} onClick={() => setMood(item.id)}>
                {item.label}
              </TagMood>
            ))}
          </div>
        </aside>
        <div className="cards-all">{children}</div>
      </div>
    </div>
  );
}
