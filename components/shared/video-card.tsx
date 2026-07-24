import type { ReactNode } from "react";

type VideoCardProps = {
  title: string;
  eyebrow: string;
  description: string;
  src: string;
  poster?: string;
  footer?: ReactNode;
  mediaAspectRatio?: string;
  mediaMinHeight?: number;
  mediaMaxHeight?: number;
  contentMinHeight?: number;
};

export function VideoCard({
  title,
  eyebrow,
  description,
  src,
  poster,
  footer,
  mediaAspectRatio = "1332 / 420",
  mediaMinHeight = 300,
  mediaMaxHeight = 430,
  contentMinHeight = 182,
}: VideoCardProps) {
  return (
    <article className="panel" style={{ overflow: "hidden" }}>
      <div
        style={{
          width: "100%",
          aspectRatio: mediaAspectRatio,
          minHeight: mediaMinHeight,
          maxHeight: mediaMaxHeight,
          background: "rgba(255,255,255,0.05)",
        }}
      >
        <video
          controls
          preload="metadata"
          poster={poster}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            objectFit: "cover",
            background: "#000",
          }}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div style={{ padding: 24, minHeight: contentMinHeight, display: "grid", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--accent-yellow)" }} />
          <span style={{ color: "var(--accent-yellow)", fontWeight: 700, fontSize: "var(--font-size-sm)" }}>
            {eyebrow}
          </span>
        </div>
        <h3 style={{ margin: 0 }}>{title}</h3>
        <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: "var(--font-size-md)" }}>{description}</p>
        {footer}
      </div>
    </article>
  );
}
