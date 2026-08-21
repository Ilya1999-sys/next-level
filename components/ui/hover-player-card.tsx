"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { NextArrow } from "@/components/ui/ds";
import { HighlightIframe } from "@/components/ui/highlight-iframe";

export function GraphicHoverCard({
  href,
  accent,
  featured,
  banner,
  youtube,
  year,
  title,
  children,
}: {
  href?: string;
  accent?: boolean;
  featured?: boolean;
  banner?: boolean;
  youtube?: string;
  year: string;
  title: string;
  children: ReactNode;
}) {
  const [hover, setHover] = useState(false);
  function enter() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setHover(true);
  }

  const inner = (
    <article
      className={`ds-card team-card ${featured ? "team-card--featured" : ""} ${banner ? "team-card--banner" : ""}`}
      data-accent={accent ? "true" : "false"}
      data-hover-video={youtube ? "true" : "false"}
    >
      {hover && youtube ? (
        <div className="card-hover-frame">
          <HighlightIframe id={youtube} title={`${year} ${title} highlights`} />
        </div>
      ) : null}
      <div className="card-top">
        <div className="year-team card-hover-static">
          <p className={accent ? "type-h3" : "type-t1"}>{year}</p>
          <p className={accent ? "type-h3" : "type-t1"}>{title}</p>
        </div>
        <span className="icon-btn" data-inverted={accent ? "true" : "false"} aria-hidden="true">
          <NextArrow />
        </span>
      </div>
      <div className="card-hover-static graphic-slot">{children}</div>
    </article>
  );

  const events = {
    onMouseEnter: enter,
    onMouseLeave: () => setHover(false),
    onFocus: enter,
    onBlur: () => setHover(false),
  };

  if (href) {
    return (
      <Link href={href} className="card-link" {...events}>
        {inner}
      </Link>
    );
  }

  return (
    <div className="card-link" {...events}>
      {inner}
    </div>
  );
}
