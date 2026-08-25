"use client";

import { useEffect, useRef, useState, type SyntheticEvent } from "react";
import { highlightEmbedSrc, type HighlightClip } from "@/lib/media/highlights";

export function HighlightIframe({
  clip,
  title,
}: {
  clip: HighlightClip;
  title: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mode, setMode] = useState<"file" | "embed">(clip.embed ? "embed" : "file");

  useEffect(() => {
    let cancelled = false;
    fetch(clip.src, { method: "HEAD" })
      .then((res) => {
        if (!cancelled && res.ok) setMode("file");
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [clip.src]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || mode !== "file") return;
    el.muted = true;
    const play = () => {
      void el.play().catch(() => undefined);
    };
    play();
    el.addEventListener("canplay", play);
    return () => el.removeEventListener("canplay", play);
  }, [clip.src, mode]);

  function handleEmbedLoad(event: SyntheticEvent<HTMLIFrameElement>) {
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
    send({ command: "mute" });
    send({ command: "play" });
    win.postMessage("play", "*");
  }

  if (mode === "file") {
    return (
      <video
        ref={videoRef}
        src={clip.src}
        title={title}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        onError={() => {
          if (clip.embed) setMode("embed");
        }}
      />
    );
  }

  if (!clip.embed) return null;

  return (
    <iframe
      src={highlightEmbedSrc(clip.embed)}
      title={title}
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
      tabIndex={-1}
      onLoad={handleEmbedLoad}
    />
  );
}
