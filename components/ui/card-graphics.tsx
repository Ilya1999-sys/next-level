import { CircleStat } from "@/components/ui/ds";

export type MixMark = {
  type: "bar" | "dot";
  tone: "accent" | "muted";
  height?: number;
};

export function MixChart({ marks }: { marks: MixMark[] }) {
  return (
    <div className="mix-chart" aria-hidden="true">
      {marks.map((mark, index) =>
        mark.type === "dot" ? (
          <span key={index} className="mix-dot" data-tone={mark.tone} />
        ) : (
          <span key={index} className="mix-bar" data-tone={mark.tone} style={{ height: `${mark.height ?? 70}%` }} />
        )
      )}
    </div>
  );
}

export function CircleRow({
  stats,
}: {
  stats: Array<{ value: string; label: string; accent?: boolean }>;
}) {
  return (
    <div className="circle-row">
      {stats.map((stat) => (
        <CircleStat key={stat.label} value={stat.value} label={stat.label} accent={stat.accent} />
      ))}
    </div>
  );
}

export function LineChart({
  portugal,
  france,
  accent,
}: {
  portugal: number[];
  france: number[];
  accent?: boolean;
}) {
  const max = 13;
  const min = 1;
  const width = 320;
  const height = 280;
  const padX = 36;
  const padY = 18;
  const innerW = width - padX - 16;
  const innerH = height - padY - 36;
  const seriesGap = 10;

  function point(value: number, index: number, total: number, offsetX = 0) {
    const x = padX + (index / (total - 1)) * innerW + offsetX;
    const y = padY + ((max - value) / (max - min)) * innerH;
    return `${x},${y}`;
  }

  const ticks = [13, 12, 11, 9, 8, 7, 6, 5, 4, 3, 2, 1];

  return (
    <div className="line-chart" data-accent={accent ? "true" : "false"}>
      <svg viewBox={`0 0 ${width} ${height}`} className="line-chart-svg" aria-hidden="true">
        {ticks.map((tick) => {
          const y = padY + ((max - tick) / (max - min)) * innerH;
          return (
            <text key={tick} x={8} y={y + 4} className="line-chart-tick">
              {tick}
            </text>
          );
        })}
        <line x1={padX} y1={padY + innerH} x2={padX + innerW} y2={padY + innerH} className="line-chart-axis" />
        <polyline fill="none" className="line-chart-france" points={france.map((value, index) => point(value, index, france.length, seriesGap / 2)).join(" ")} />
        <polyline fill="none" className="line-chart-portugal" points={portugal.map((value, index) => point(value, index, portugal.length, -seriesGap / 2)).join(" ")} />
        {france.map((value, index) => {
          const [x, y] = point(value, index, france.length, seriesGap / 2).split(",");
          return <circle key={`f-${index}`} cx={x} cy={y} r="4" className="line-chart-france-dot" />;
        })}
        {portugal.map((value, index) => {
          const [x, y] = point(value, index, portugal.length, -seriesGap / 2).split(",");
          return <circle key={`p-${index}`} cx={x} cy={y} r="4.5" className="line-chart-portugal-dot" />;
        })}
        {portugal.map((_, index) => (
          <text key={`x-${index}`} x={padX + (index / (portugal.length - 1)) * innerW} y={height - 8} textAnchor="middle" className="line-chart-tick">
            {index + 1}
          </text>
        ))}
      </svg>
      <div className="line-chart-legend">
        <span>
          <i className="legend-dot legend-dot--portugal" /> Portugal goals
        </span>
        <span>
          <i className="legend-dot legend-dot--france" /> France goals
        </span>
      </div>
    </div>
  );
}

export function StatBars({
  rows,
}: {
  rows: Array<{ left: number; right: number; leftLabel: string; rightLabel: string }>;
}) {
  return (
    <div className="stat-bars">
      {rows.map((row) => {
        const max = Math.max(row.left, row.right, 1);
        return (
          <div key={row.leftLabel} className="stat-bar-pair">
            <div className="stat-bar-row">
              <span className="stat-bar stat-bar--track" style={{ width: `${(row.left / max) * 100}%` }} />
              <span className="stat-bar-label type-t3">{row.leftLabel}</span>
            </div>
            <div className="stat-bar-row">
              <span className="stat-bar stat-bar--fill" style={{ width: `${(row.right / max) * 100}%` }} />
              <span className="stat-bar-label type-t3">{row.rightLabel}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function GoalTimeline({
  left,
  right,
  highlight,
}: {
  left: number[];
  right: number[];
  highlight: number;
}) {
  function y(minute: number) {
    return `${8 + ((minute - 1) / 119) * 84}%`;
  }

  function stagger(minutes: number[]) {
    const offset: number[] = minutes.map(() => 0);
    for (let i = 1; i < minutes.length; i++) {
      if (minutes[i] - minutes[i - 1] < 10) {
        offset[i] = offset[i - 1] <= 0 ? 16 : -16;
        if (offset[i - 1] === 0) offset[i - 1] = -16;
      }
    }
    return offset;
  }

  const ticks = [120, 105, 90, 75, 60, 45, 30, 15, 1];
  const leftOffset = stagger(left);
  const rightOffset = stagger(right);

  return (
    <div className="goal-timeline" aria-hidden="true">
      <div className="goal-timeline-axis">
        {ticks.map((tick) => (
          <span key={tick}>{tick}</span>
        ))}
      </div>
      <div className="goal-timeline-col">
        {left.map((minute, index) => (
          <span
            key={`l-${minute}`}
            className="goal-dot"
            style={{ bottom: y(minute), left: `calc(50% + ${leftOffset[index]}px)` }}
          />
        ))}
        <span className="goal-timeline-caption type-t3">France</span>
      </div>
      <div className="goal-timeline-col">
        {right.map((minute, index) => (
          <span
            key={`r-${minute}`}
            className="goal-dot"
            data-large={minute === highlight ? "true" : "false"}
            style={{ bottom: y(minute), left: `calc(50% + ${rightOffset[index]}px)` }}
          />
        ))}
        <span className="goal-timeline-caption type-t3">Portugal</span>
      </div>
    </div>
  );
}
