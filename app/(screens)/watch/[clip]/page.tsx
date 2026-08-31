import { notFound } from "next/navigation";
import { EuroFinalMatchScreen } from "@/components/screens/euro-final-match-screen";
import { HIGHLIGHTS, watchRouteBySlug, WATCH_ROUTES } from "@/lib/media/highlights";

type WatchPageProps = {
  params: Promise<{ clip: string }>;
};

export function generateStaticParams() {
  return Object.values(WATCH_ROUTES).map((route) => ({ clip: route.slug }));
}

export default async function WatchPage({ params }: WatchPageProps) {
  const { clip: slug } = await params;
  const route = watchRouteBySlug(slug);

  if (!route) notFound();

  const clip = HIGHLIGHTS[route.clip];

  return <EuroFinalMatchScreen clip={clip} backHref={route.backHref} title={clip.about} />;
}
