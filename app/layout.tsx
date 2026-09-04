import type { Metadata, Viewport } from "next";
import "@/app/globals.css";
import { MoodProvider } from "@/components/mood/mood-provider";
import { HighlightPreload } from "@/components/ui/highlight-preload";

export const metadata: Metadata = {
  title: "Your mood, your match",
  description: "Next.js App Router foundation synced with Figma design variables.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const moodBootScript =
  '(function(){try{var m=localStorage.getItem("ilya-mood");if(m==="drama"||m==="legends"||m==="nostalgia"){document.documentElement.dataset.mood=m;}}catch(e){}})();';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-mood="nostalgia" suppressHydrationWarning>
      <head>
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <script dangerouslySetInnerHTML={{ __html: moodBootScript }} />
        <HighlightPreload />
      </head>
      <body>
        <MoodProvider>{children}</MoodProvider>
      </body>
    </html>
  );
}
