"use client";

import { youtubeEmbedSrc } from "@/lib/media/highlights";

export function HighlightIframe({
  id,
  title,
  controls,
}: {
  id: string;
  title: string;
  controls?: boolean;
}) {
  return (
    <iframe
      src={youtubeEmbedSrc(id, { controls })}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen={Boolean(controls)}
      tabIndex={-1}
    />
  );
}
