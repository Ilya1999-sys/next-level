import Link from "next/link";
import { screenRegistry } from "@/lib/screens/registry";

export function ScreenNavigation() {
  return (
    <nav
      aria-label="Main screens"
      style={{
        borderBottom: "1px solid var(--border-subtle)",
        background: "var(--surface-elevated)",
      }}
    >
      <div
        style={{
          maxWidth: "var(--layout-content-max-width)",
          margin: "0 auto",
          padding: "var(--space-4) var(--space-8)",
          display: "flex",
          gap: "var(--space-4)",
        }}
      >
        {screenRegistry.main.map((screen) => (
          <Link
            key={screen.route}
            href={screen.route}
            style={{
              padding: "var(--space-2) var(--space-3)",
              borderRadius: "var(--radius-md)",
              color: "var(--text-secondary)",
              border: "1px solid transparent",
            }}
          >
            {screen.title}
          </Link>
        ))}
      </div>
    </nav>
  );
}
