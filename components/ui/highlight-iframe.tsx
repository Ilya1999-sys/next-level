"use client";

import type { SyntheticEvent } from "react";
import { vkEmbedSrc, type VkClip } from "@/lib/media/highlights";

export function HighlightIframe({
  clip,
  title,
  controls,
}: {
  clip: VkClip;
  title: string;
  controls?: boolean;
}) {
  function handleLoad(event: SyntheticEvent<HTMLIFrameElement>) {
    const win = event.currentTarget.contentWindow;
    if (!win) return;
    const send = (payload: Record<string, unknown>) => {
      win.postMessage(JSON.stringify(payload), "*");
    };
    send({ method: "setVolume", value: 0 });
    send({ method: "play" });
  }

  return (
    <iframe
      src={vkEmbedSrc(clip, { controls, autoplay: true })}
      title={title}
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      referrerPolicy="origin"
      allowFullScreen={Boolean(controls)}
      tabIndex={-1}
      onLoad={handleLoad}
    />
  );
}
