"use client";

import Link from "next/link";
import { useRef } from "react";
import { NextArrow } from "@/components/ui/ds";
import { PlayerFigure } from "@/components/ui/player-figure";

export function HoverPlayerCard({
  href,
  accent,
  featured,
  image,
  fit,
  video,
  year,
  team,
  alt,
}: {
  href?: string;
  accent?: boolean;
  featured?: boolean;
  image: string;
  fit?: "cover" | "contain";
  video?: string;
  year: string;
  team: string;
  alt: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  function play() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    void videoRef.current?.play();
  }

  function stop() {
    const el = videoRef.current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
  }

  const inner = (
    <article className="ds-card team-card" data-accent={accent ? "true" : "false"} data-hover-video={video ? "true" : "false"}>
      {video ? (
        <video ref={videoRef} className="card-hover-video" muted loop playsInline preload="metadata">
          <source src={video} type="video/mp4" />
        </video>
      ) : null}
      <div className="card-top">
        <div className="year-team card-hover-static">
          <p className={accent ? "type-h3" : "type-t1"}>{year}</p>
          <p className={accent ? "type-h3" : "type-t1"}>{team}</p>
        </div>
        <span className="icon-btn" data-inverted={accent ? "true" : "false"} aria-hidden="true">
          <NextArrow />
        </span>
      </div>
      <div className="card-hover-static player-slot">
        <PlayerFigure variant={featured ? "featured" : "card"} src={image} alt={alt} fit={fit ?? "cover"} />
      </div>
    </article>
  );

  if (href) {
    return (
      <Link href={href} className="card-link" onMouseEnter={play} onMouseLeave={stop} onFocus={play} onBlur={stop}>
        {inner}
      </Link>
    );
  }

  return (
    <div className="card-link" onMouseEnter={play} onMouseLeave={stop} onFocus={play} onBlur={stop}>
      {inner}
    </div>
  );
}
