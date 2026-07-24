"use client";

import { useMemo, useState } from "react";

type Post = {
  id: string;
  user: string;
  text: string;
  time: string;
};

const initialPosts: Post[] = [
  {
    id: "p1",
    user: "@PremierFan92",
    text: "What a second half! Mbappé was unstoppable and the transitions were elite.",
    time: "2m ago",
  },
  {
    id: "p2",
    user: "@GhanaLegend",
    text: "Who else is rewatching 2010 tonight? The tempo shift after halftime is still wild.",
    time: "5m ago",
  },
  {
    id: "p3",
    user: "@NostalgiaScout",
    text: "That behind-goal replay angle made the winner look even more dramatic.",
    time: "9m ago",
  },
];

export function ForumDiscussionScreen() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [message, setMessage] = useState("");

  const activeUsers = useMemo(() => 324 + posts.length, [posts.length]);

  function sendMessage() {
    const trimmed = message.trim();
    if (!trimmed) return;
    setPosts((prev) => [
      {
        id: `p-${Date.now()}`,
        user: "@You",
        text: trimmed,
        time: "just now",
      },
      ...prev,
    ]);
    setMessage("");
  }

  return (
    <main className="screen-root" style={{ display: "grid", gap: 20 }}>
      <header className="panel" style={{ padding: 20, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "grid", gap: 4 }}>
          <h1 style={{ margin: 0, fontSize: "var(--font-size-2xl)" }}>Match discussion</h1>
          <span style={{ color: "var(--text-secondary)", fontSize: "var(--font-size-md)" }}>
            Ghana 2010 documentary thread
          </span>
        </div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--accent-yellow)" }} />
          <strong style={{ color: "var(--accent-yellow)", fontSize: "var(--font-size-sm)" }}>LIVE</strong>
          <span style={{ color: "var(--text-secondary)", fontSize: "var(--font-size-sm)" }}>{activeUsers} active</span>
        </div>
      </header>

      <section style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 20 }}>
        <article className="panel" style={{ padding: 20, display: "grid", gap: 12 }}>
          <h2 style={{ margin: 0, fontSize: "var(--font-size-xl)" }}>Main thread</h2>
          <div style={{ display: "grid", gap: 10, maxHeight: 520, overflow: "auto", paddingRight: 4 }}>
            {posts.map((post, index) => (
              <div
                key={post.id}
                style={{
                  borderRadius: 12,
                  padding: 12,
                  background: index === 0 ? "rgba(245,200,66,0.14)" : "var(--surface-muted)",
                  border: `1px solid ${index === 0 ? "rgba(245,200,66,0.35)" : "var(--border-subtle)"}`,
                  display: "grid",
                  gap: 6,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <strong style={{ fontSize: "var(--font-size-md)" }}>{post.user}</strong>
                  <span style={{ color: "var(--text-tertiary)", fontSize: "var(--font-size-sm)" }}>{post.time}</span>
                </div>
                <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: "var(--font-size-md)" }}>{post.text}</p>
              </div>
            ))}
          </div>
        </article>

        <aside className="panel" style={{ padding: 20, display: "grid", gap: 12, alignContent: "start" }}>
          <h3 style={{ margin: 0 }}>Post a reply</h3>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Share your take on this match moment..."
            style={{
              width: "100%",
              minHeight: 140,
              borderRadius: 12,
              border: "1px solid var(--border-subtle)",
              background: "var(--surface-muted)",
              color: "var(--text-primary)",
              padding: 12,
              fontFamily: "inherit",
              fontSize: "var(--font-size-md)",
              resize: "vertical",
            }}
          />
          <button type="button" className="button-secondary" style={{ width: "100%" }} onClick={sendMessage}>
            Send message
          </button>
          <div style={{ borderTop: "1px solid var(--border-subtle)", marginTop: 4, paddingTop: 12, display: "grid", gap: 8 }}>
            <strong style={{ fontSize: "var(--font-size-md)" }}>Active conversation</strong>
            <span style={{ color: "var(--text-secondary)", fontSize: "var(--font-size-sm)" }}>
              Most discussed: how replay camera mode changes perception of the winning goal.
            </span>
          </div>
        </aside>
      </section>
    </main>
  );
}
