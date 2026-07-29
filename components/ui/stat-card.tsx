"use client";

type StatCardProps = {
  label: string;
  value: string;
};

export function StatCard({ label, value }: StatCardProps) {
  return (
    <div
      style={{
        boxSizing: "border-box",
        width: 120,
        minHeight: 77,
        padding: "12px 20px",
        display: "grid",
        gap: 4,
        borderRadius: "var(--radius-xl)",
        border: "1px solid var(--border-subtle)",
        background: "var(--surface-muted)",
      }}
    >
      <span
        style={{
          color: "var(--text-primary)",
          opacity: 0.4,
          fontSize: "var(--font-size-sm)",
          lineHeight: "var(--line-height-t2)",
          letterSpacing: "var(--letter-spacing-t2)",
          fontWeight: "var(--font-weight-regular)",
        }}
      >
        {label}
      </span>
      <span
        style={{
          color: "var(--main-default)",
          fontSize: "var(--font-size-2xl)",
          lineHeight: "var(--line-height-h2)",
          letterSpacing: "var(--letter-spacing-h2)",
          fontWeight: "var(--font-weight-black)",
        }}
      >
        {value}
      </span>
    </div>
  );
}
