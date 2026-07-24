import { notFound } from "next/navigation";
import { ScreenShell } from "@/components/layout/screen-shell";
import { getLogicScreen } from "@/lib/screens/logic";

type GeneratedScreenPageProps = {
  params: Promise<{ screenId: string }>;
};

export default async function GeneratedScreenPage({
  params,
}: GeneratedScreenPageProps) {
  const { screenId } = await params;
  const screen = getLogicScreen(screenId);

  if (!screen) {
    notFound();
  }

  return (
    <ScreenShell title={screen.title} description={screen.description}>
      <div style={{ display: "grid", gap: "var(--space-4)" }}>
        {screen.sections.map((section) => (
          <article key={section.id} style={{ display: "grid", gap: "var(--space-2)" }}>
            <h2 style={{ margin: 0, fontSize: "var(--font-size-md)" }}>{section.heading}</h2>
            <p style={{ margin: 0, color: "var(--text-secondary)" }}>{section.body}</p>
          </article>
        ))}
      </div>
    </ScreenShell>
  );
}
