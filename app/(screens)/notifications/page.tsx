export default function NotificationsPage() {
  return (
    <main className="screen-root" style={{ display: "grid", placeItems: "start center" }}>
      <section className="panel" style={{ width: 520, padding: 24, display: "grid", gap: 14 }}>
        <h1 style={{ margin: 0, fontSize: "var(--font-size-2xl)" }}>Notifications</h1>
        <p style={{ margin: 0, color: "var(--text-secondary)" }}>
          Your match reminders, discussion mentions, and reward updates will appear here.
        </p>
        <div style={{ display: "grid", gap: 10 }}>
          {[
            "Ghana 2010 replay starts in 10 minutes.",
            "3 new comments in Match discussion.",
            "You earned +25 bonus points for yesterday's vote.",
          ].map((item) => (
            <article
              key={item}
              style={{
                borderRadius: "var(--radius-md)",
                padding: 12,
                background: "var(--surface-muted)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              {item}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
