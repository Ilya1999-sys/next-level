"use client";

import type { SyntheticEvent } from "react";
import { highlightEmbedSrc, type HighlightClip } from "@/lib/media/highlights";

export function HighlightIframe({
  clip,
  title,
}: {
  clip: HighlightClip;
  title: string;
}) {
  function handleLoad(event: SyntheticEvent<HTMLIFrameElement>) {
    const win = event.currentTarget.contentWindow;
    if (!win) return;
    const send = (payload: Record<string, unknown>) => {
      win.postMessage(JSON.stringify(payload), "*");
    };
    send({ method: "setVolume", value: 0 });
    send({ method: "play" });
    send({ type: "player:mute", data: {} });
    send({ type: "player:play", data: {} });
    send({ type: "player:setVolume", data: { volume: 0 } });
  }

  return (
    <iframe
      src={highlightEmbedSrc(clip)}
      title={title}
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
      tabIndex={-1}
      onLoad={handleLoad}
    />
  );
}
