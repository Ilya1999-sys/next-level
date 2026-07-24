import type { ReactNode } from "react";

type ScreenShellProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function ScreenShell({ title, description, children }: ScreenShellProps) {
  return (
    <main
      style={{
        maxWidth: "var(--layout-content-max-width)",
        margin: "0 auto",
        padding: "var(--space-8)",
        display: "grid",
        gap: "var(--space-6)",
      }}
    >
      <header style={{ display: "grid", gap: "var(--space-2)" }}>
        <h1
          style={{
            margin: 0,
            fontSize: "var(--font-size-3xl)",
            lineHeight: "var(--line-height-tight)",
          }}
        >
          {title}
        </h1>
        <p
          style={{
            margin: 0,
            color: "var(--text-secondary)",
            fontSize: "var(--font-size-md)",
            lineHeight: "var(--line-height-normal)",
          }}
        >
          {description}
        </p>
      </header>
      <section
        style={{
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--border-subtle)",
          background: "var(--surface-elevated)",
          padding: "var(--space-6)",
        }}
      >
        {children}
      </section>
    </main>
  );
}
