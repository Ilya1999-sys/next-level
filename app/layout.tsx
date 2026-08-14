import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "@/app/globals.css";
import { MoodProvider } from "@/components/mood/mood-provider";
import { RouteTransition } from "@/components/motion/route-transition";

const cartographFallback = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ibm-plex-mono",
});

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
      <body className={cartographFallback.variable}>
        <MoodProvider>
          <RouteTransition>{children}</RouteTransition>
        </MoodProvider>
      </body>
    </html>
  );
}
