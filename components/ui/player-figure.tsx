type PlayerPose = "lift" | "run" | "celebrate";

export function figmaColorSrc(src: string) {
  if (!src.startsWith("/figma/") || src.includes("/color/")) return src;
  return src.replace("/figma/", "/figma/color/");
}

export function PlayerFigure({
  src,
  pose = "lift",
  alt,
  fit = "cover",
  variant = "card",
  className,
}: {
  src: string;
  pose?: PlayerPose;
  alt: string;
  fit?: "cover" | "contain";
  variant?: "card" | "featured" | "hero" | "float";
  className?: string;
}) {
  const colorSrc = figmaColorSrc(src);
  const stageClass = ["player-stage", variant !== "card" ? `player-stage--${variant}` : "", className].filter(Boolean).join(" ");

  return (
    <div className={stageClass} data-pose={pose} data-fit={fit}>
      <img className="player-art player-art--ink" src={src} alt={alt} />
      <img className="player-art player-art--color" src={colorSrc} alt="" aria-hidden="true" />
    </div>
  );
}
