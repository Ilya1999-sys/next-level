import { CircleStat } from "@/components/ui/ds";

export type MixMark = {
  type: "bar" | "dot" | "line";
  tone: "accent" | "muted";
  height?: number;
};

function MixMarkNode({ mark, grouped }: { mark: MixMark; grouped: boolean }) {
  if (mark.type === "dot") return <span className="mix-dot" data-tone={mark.tone} />;
  if (mark.type === "line") return <span className="mix-line" data-tone={mark.tone} />;
  return (
    <span
      className="mix-bar"
      data-tone={mark.tone}
      style={{ height: grouped ? `${mark.height}px` : `${mark.height ?? 70}%` }}
    />
  );
}

export function MixChart({
  marks,
  groups,
}: {
  marks?: MixMark[];
  groups?: MixMark[][];
}) {
  if (groups) {
    return (
      <div className="mix-chart" data-grouped="true" aria-hidden="true">
        {groups.map((cluster, clusterIndex) => (
          <div key={clusterIndex} className="mix-cluster">
            {cluster.map((mark, index) => (
              <MixMarkNode key={index} mark={mark} grouped />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mix-chart" aria-hidden="true">
      {(marks ?? []).map((mark, index) => (
        <MixMarkNode key={index} mark={mark} grouped={false} />
      ))}
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
  const width = 403;
  const height = 462;
  const xs = [71.5, 119.5, 167.5, 215.5, 263.5, 311.5, 360];
  const yTop = 18;
  const yBottom = 354;
  const ticks = [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

  function yOf(value: number) {
    return yTop + ((max - value) / (max - min)) * (yBottom - yTop);
  }

  function points(series: number[]) {
    return series.map((value, index) => `${xs[index]},${yOf(value)}`).join(" ");
  }

  return (
    <div className="line-chart" data-accent={accent ? "true" : "false"}>
      <svg viewBox={`0 0 ${width} ${height}`} className="line-chart-svg" aria-hidden="true">
        {ticks.map((tick) => (
          <text key={tick} x={19} y={yOf(tick) + 4} textAnchor="end" className="line-chart-tick">
            {tick}
          </text>
        ))}
        <line x1={23} y1={0} x2={23} y2={379} className="line-chart-axis" />
        <line x1={23} y1={379} x2={403} y2={379} className="line-chart-axis" />
        <polyline fill="none" className="line-chart-france" points={points(france)} />
        <polyline fill="none" className="line-chart-portugal" points={points(portugal)} />
        {france.map((value, index) => (
          <circle key={`f-${index}`} cx={xs[index]} cy={yOf(value)} r="6" className="line-chart-france-dot" />
        ))}
        {portugal.map((value, index) => (
          <circle key={`p-${index}`} cx={xs[index]} cy={yOf(value)} r="6" className="line-chart-portugal-dot" />
        ))}
        {xs.map((x, index) => (
          <text key={`x-${index}`} x={x} y={396} textAnchor="middle" className="line-chart-tick">
            {index + 1}
          </text>
        ))}
      </svg>
      <div className="line-chart-legend">
        <span>
          <i className="legend-swatch legend-swatch--portugal" /> Portugal goals
        </span>
        <span>
          <i className="legend-swatch legend-swatch--france" /> France goals
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
