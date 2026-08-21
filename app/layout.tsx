import type { Metadata } from "next";
import "@/app/globals.css";
import { MoodProvider } from "@/components/mood/mood-provider";
import { RouteTransition } from "@/components/motion/route-transition";

export const metadata: Metadata = {
  title: "Your mood, your match",
  description: "Next.js App Router foundation synced with Figma design variables.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-mood="nostalgia">
      <head>
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </head>
      <body>
        <MoodProvider>
          <RouteTransition>{children}</RouteTransition>
        </MoodProvider>
      </body>
    </html>
  );
}
