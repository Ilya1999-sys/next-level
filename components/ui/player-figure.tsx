type PlayerPose = "lift" | "run" | "celebrate";

export function PlayerFigure({
  src,
  pose = "lift",
  alt,
  fit = "cover",
  className,
}: {
  src: string;
  pose?: PlayerPose;
  alt: string;
  fit?: "cover" | "contain";
  className?: string;
}) {
  const split = pose === "run" || pose === "celebrate";

  return (
    <div className={`player-stage${className ? ` ${className}` : ""}`} data-pose={pose} data-fit={fit}>
      <img className="player-art player-art--base" data-pose={pose} src={src} alt={alt} />
      {split ? (
        <>
          <img className="player-art player-art--left" data-pose={pose} src={src} alt="" aria-hidden="true" />
          <img className="player-art player-art--right" data-pose={pose} src={src} alt="" aria-hidden="true" />
        </>
      ) : null}
    </div>
  );
}
