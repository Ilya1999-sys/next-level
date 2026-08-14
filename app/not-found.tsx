import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "var(--space-8)",
      }}
    >
      <div style={{ display: "grid", gap: "var(--space-4)", textAlign: "center" }}>
        <h1 style={{ margin: 0 }}>Screen not found</h1>
        <p style={{ margin: 0, color: "var(--text-secondary)" }}>
          This route is not mapped in the current screen registry.
        </p>
        <Link href="/">Go home</Link>
      </div>
    </main>
  );
}
