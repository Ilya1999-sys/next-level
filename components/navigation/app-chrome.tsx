"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState, type ReactNode } from "react";
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

const MOODS: Array<{ id: Mood; label: string }> = [
  { id: "drama", label: "Drama" },
  { id: "legends", label: "Legends" },
  { id: "nostalgia", label: "Nostalgia" },
];

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
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls={navId}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="burger" data-open={menuOpen ? "true" : "false"} aria-hidden="true">
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
        <div className="mood-row">
          {MOODS.map((item) => (
            <TagMood key={item.id} selected={mood === item.id} onClick={() => setMood(item.id)}>
              {item.label}
            </TagMood>
          ))}
        </div>
      </header>

      <div className="page-body">
        <button
          type="button"
          className="menu-backdrop"
          aria-label="Close menu"
          data-open={menuOpen ? "true" : "false"}
          onClick={() => setMenuOpen(false)}
        />
        <aside id={navId} className="left-menu" data-open={menuOpen ? "true" : "false"}>
          <div className="left-menu-group">
            <IconButton href="/" label="Home" selected={pathname === "/"}>
              <IconHome />
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
            </IconButton>
            <IconButton href="/tournaments" label="Cup" selected={pathname.startsWith("/tournaments")}>
              <IconCup />
            </IconButton>
            <IconButton href="/player-stats" label="Stats" selected={pathname.startsWith("/player-stats")}>
              <IconStats />
            </IconButton>
            <IconButton href="/team/real-madrid" label="My club" selected={pathname.startsWith("/team")}>
              <IconClub />
            </IconButton>
          </div>
          <div className="left-menu-group">
            <IconButton href="/notifications" label="Notifications" badge="2" selected={pathname.startsWith("/notifications")}>
              <IconBell />
            </IconButton>
            <IconButton href="/favorites" label="Favorites" badge="2" selected={pathname.startsWith("/favorites")}>
              <IconStar />
            </IconButton>
            <IconButton href="/" label="Exit">
              <IconExit />
            </IconButton>
            <IconButton href="/profile" label="Profile" selected={pathname.startsWith("/profile")}>
              <IconProfile />
            </IconButton>
          </div>
        </aside>
        <div className="cards-all">{children}</div>
      </div>
    </div>
  );
}
