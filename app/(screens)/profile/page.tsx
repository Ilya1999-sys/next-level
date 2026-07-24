export default function ProfilePage() {
  return (
    <main className="screen-root" style={{ display: "grid", placeItems: "start center" }}>
      <section className="panel" style={{ width: 520, padding: 24, display: "grid", gap: 16 }}>
        <header style={{ display: "grid", gap: 8 }}>
          <h1 style={{ margin: 0, fontSize: "var(--font-size-2xl)" }}>Profile</h1>
          <p style={{ margin: 0, color: "var(--text-secondary)" }}>
            Placeholder profile panel aligned with the Home visual style.
          </p>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "72px 1fr", gap: 14, alignItems: "center" }}>
          <div style={{ width: 72, height: 72, borderRadius: 36, background: "rgba(255,255,255,0.15)" }} />
          <div style={{ display: "grid", gap: 4 }}>
            <strong>Anywatch User</strong>
            <span style={{ color: "var(--text-tertiary)", fontSize: "var(--font-size-sm)" }}>
              Favorites: Mbappé, Real Madrid, Ghana 2010 archive
            </span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          {[
            ["Bonuses", "840"],
            ["Unlocked cards", "6"],
            ["Predictions won", "12"],
          ].map(([label, value]) => (
            <article
              key={label}
              style={{
                borderRadius: "var(--radius-md)",
                padding: 12,
                background: "var(--surface-muted)",
                border: "1px solid var(--border-subtle)",
                display: "grid",
                gap: 4,
              }}
            >
              <span style={{ color: "var(--text-tertiary)", fontSize: "var(--font-size-sm)" }}>{label}</span>
              <strong style={{ color: "var(--accent-yellow)" }}>{value}</strong>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
