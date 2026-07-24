import Link from "next/link";

export function FifaInterfaceScreen() {
  return (
    <main
      className="screen-root"
      style={{
        minHeight: "calc(100vh - 72px)",
        display: "grid",
        alignContent: "space-between",
        background:
          "linear-gradient(170deg, rgba(8,8,13,0.72), rgba(8,8,13,0.4)), url(https://images.unsplash.com/photo-1570498839593-e565b39455fc?auto=format&fit=crop&w=1600&q=80) center/cover no-repeat",
      }}
    >
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link
          href="/match/usa-vs-ghana-2010"
          className="button-secondary"
          style={{ borderRadius: "var(--radius-pill)", padding: "10px 16px" }}
        >
          ← Back to match
        </Link>
        <div className="panel" style={{ padding: "8px 14px", borderRadius: 14 }}>
          <strong style={{ color: "var(--accent-yellow)" }}>FIFA Replay Interface</strong>
        </div>
      </header>

      <section style={{ display: "grid", justifyItems: "center", gap: 12 }}>
        <article className="panel" style={{ width: 720, padding: 24, textAlign: "center", display: "grid", gap: 10 }}>
          <h1 style={{ margin: 0, fontSize: "var(--font-size-2xl)" }}>USA vs Ghana - 82:00 Replay</h1>
          <p style={{ margin: 0, color: "var(--text-secondary)" }}>
            Standard FIFA control state loaded. Complete the moment, then return to the match stream.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
            <button type="button" className="button-primary">
              Resume scenario
            </button>
            <Link href="/match/usa-vs-ghana-2010" className="button-secondary">
              Exit to broadcast
            </Link>
          </div>
        </article>
      </section>

      <footer style={{ display: "grid", justifyItems: "center" }}>
        <div className="panel" style={{ padding: "8px 12px", borderRadius: 12 }}>
          <span style={{ color: "var(--text-tertiary)", fontSize: "var(--font-size-sm)" }}>
            Controls synchronized with replay state
          </span>
        </div>
      </footer>
    </main>
  );
}
