"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { IconButton, NextArrow } from "@/components/ui/ds";
import { HighlightIframe } from "@/components/ui/highlight-iframe";
import type { HighlightClip } from "@/lib/media/highlights";

export function GraphicHoverCard({
  href,
  watchHref,
  hoverVideo = false,
  accent,
  featured,
  banner,
  video,
  year,
  title,
  children,
}: {
  href?: string;
  watchHref?: string;
  hoverVideo?: boolean;
  accent?: boolean;
  featured?: boolean;
  banner?: boolean;
  video?: HighlightClip;
  year: string;
  title: string;
  children: ReactNode;
}) {
  const [armed, setArmed] = useState(false);
  const canHover = Boolean(hoverVideo && video);

  function enter() {
    if (!canHover) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setArmed(true);
  }

  const heading = (
    <>
      <p className={accent ? "type-h3" : "type-t1"}>{year}</p>
      <p className={accent ? "type-h3" : "type-t1"}>{title}</p>
    </>
  );

  return (
    <div
      className="card-link"
      onMouseEnter={canHover ? enter : undefined}
      onFocus={canHover ? enter : undefined}
    >
      <article
        className={`ds-card team-card ${featured ? "team-card--featured" : ""} ${banner ? "team-card--banner" : ""}`}
        data-accent={accent ? "true" : "false"}
        data-hover-video={canHover ? "true" : "false"}
      >
        {armed && video ? (
          <div className="card-hover-frame">
            <HighlightIframe clip={video} title={`${year} ${title} highlights`} />
          </div>
        ) : null}
        {href ? <Link href={href} className="card-link-hit" tabIndex={-1} aria-hidden="true" /> : null}
        <div className="card-top">
          {href ? (
            <Link href={href} className="year-team card-hover-static">
              {heading}
            </Link>
          ) : (
            <div className="year-team card-hover-static">{heading}</div>
          )}
          {watchHref ? (
            <IconButton label={`Watch ${title}`} href={watchHref} inverted={accent}>
              <NextArrow />
            </IconButton>
          ) : (
            <span className="icon-btn" data-inverted={accent ? "true" : "false"} aria-hidden="true">
              <NextArrow />
            </span>
          )}
        </div>
        <div className="card-hover-static graphic-slot">{children}</div>
      </article>
    </div>
  );
}
