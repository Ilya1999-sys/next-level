"use client";

import { useEffect, useRef } from "react";
import type { HighlightClip } from "@/lib/media/highlights";

export function HighlightIframe({
  clip,
  title,
  onError,
}: {
  clip: HighlightClip;
  title: string;
  onError?: () => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = true;
    const play = () => {
      void el.play().catch(() => undefined);
    };
    play();
    el.addEventListener("canplay", play);
    return () => el.removeEventListener("canplay", play);
  }, [clip.src]);

  return (
    <video
      ref={ref}
      src={clip.src}
      title={title}
      muted
      loop
      playsInline
      autoPlay
      preload="auto"
      onError={onError}
    />
  );
}
