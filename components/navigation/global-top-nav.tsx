"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Matches", href: "/match" },
  { label: "Leagues" },
  { label: "Stats", href: "/player-stats" },
  { label: "My club" },
] as const;

export function GlobalTopNav() {
  const pathname = usePathname();

  return (
    <header
      style={{
        height: 72,
        padding: "20px 40px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "var(--radius-md)",
            background: "var(--main-default)",
            color: "var(--text-on-accent)",
            display: "grid",
            placeItems: "center",
            fontWeight: "var(--font-weight-black)",
            fontSize: "var(--font-size-xl)",
          }}
        >
          A
        </div>
        <div style={{ display: "grid", gap: 2 }}>
          <strong style={{ fontSize: "var(--font-size-lg)", letterSpacing: "var(--letter-spacing-t1)" }}>ANYWATCH</strong>
          <span style={{ fontSize: "var(--font-size-xs)", color: "var(--text-tertiary)" }}>
            MATCH DOME
          </span>
        </div>
      </Link>

      <div style={{ flex: 1 }} />

      <nav
        aria-label="Main navigation"
        style={{
          display: "flex",
          gap: 4,
          padding: 6,
          borderRadius: "var(--radius-pill)",
          background: "var(--surface-elevated)",
        }}
      >
        {navItems.map((item) => {
          const href = "href" in item ? item.href : undefined;
          const isActive = href ? pathname === href || pathname.startsWith(`${href}/`) : false;

          if (!href) {
            return (
              <span key={item.label} className="top-nav-pill" data-disabled="true">
                {item.label}
              </span>
            );
          }

          return (
            <Link key={href} href={href} className="top-nav-pill" data-active={isActive ? "true" : "false"}>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div style={{ flex: 1 }} />

      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div className="top-utility-group">
          <Link
            href="/notifications"
            aria-label="Open notifications"
            title="Notifications"
            className="top-utility-control"
            style={{
              width: 36,
              height: 36,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "var(--font-size-md)",
              fontWeight: 700,
            }}
          >
            🔔
          </Link>
          <div
            title="Bonuses"
            className="top-utility-control"
            style={{
              minWidth: 58,
              padding: "8px 12px",
              fontWeight: 700,
              fontSize: "var(--font-size-md)",
              textAlign: "center",
            }}
          >
            +840
          </div>
        </div>
        <Link
          href="/profile"
          aria-label="Open profile"
          title="Profile"
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            display: "inline-flex",
            overflow: "hidden",
            border: "1px solid var(--border-subtle)",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=120&q=80"
            alt="Profile avatar"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Link>
      </div>
    </header>
  );
}
