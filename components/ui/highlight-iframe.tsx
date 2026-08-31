"use client";

import { useEffect, useRef, useState, type SyntheticEvent } from "react";
import {
  highlightEmbedSrc,
  hostedPlayerSrc,
  isDirectVideoUrl,
  type HighlightClip,
} from "@/lib/media/highlights";

function fileSrc(clip: HighlightClip) {
  if (clip.hosted && isDirectVideoUrl(clip.hosted)) return clip.hosted;
  return clip.src;
}

function iframeSrc(clip: HighlightClip) {
  if (clip.hosted && !isDirectVideoUrl(clip.hosted)) return hostedPlayerSrc(clip.hosted);
  if (clip.embed) return highlightEmbedSrc(clip.embed);
  return null;
}

function initialMode(clip: HighlightClip): "file" | "embed" {
  if (clip.hosted) return isDirectVideoUrl(clip.hosted) ? "file" : "embed";
  return clip.embed ? "embed" : "file";
}

export function HighlightIframe({
  clip,
  title,
}: {
  clip: HighlightClip;
  title: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mode, setMode] = useState<"file" | "embed">(() => initialMode(clip));

  useEffect(() => {
    setMode(initialMode(clip));
  }, [clip]);

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
  }, [clip.src, clip.hosted, mode]);

  function handleEmbedLoad(event: SyntheticEvent<HTMLIFrameElement>) {
    const win = event.currentTarget.contentWindow;
    if (!win) return;
    const send = (payload: Record<string, unknown>) => {
      win.postMessage(JSON.stringify(payload), "*");
    };
    send({ event: "command", func: "mute", args: [] });
    send({ event: "command", func: "playVideo", args: [] });
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
        src={fileSrc(clip)}
        title={title}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        onError={() => {
          if (iframeSrc(clip)) setMode("embed");
        }}
      />
    );
  }

  const src = iframeSrc(clip);
  if (!src) return null;

  return (
    <iframe
      src={src}
      title={title}
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
      tabIndex={-1}
      onLoad={handleEmbedLoad}
    />
  );
}
