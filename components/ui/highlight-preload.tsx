import { HIGHLIGHTS, hostedPlayerSrc } from "@/lib/media/highlights";

export function HighlightPreload() {
  const urls = [...new Set(Object.values(HIGHLIGHTS).map((clip) => clip.hosted).filter((url): url is string => Boolean(url)))];

  return (
    <>
      <link rel="preconnect" href="https://kinescope.io" />
      <link rel="dns-prefetch" href="https://kinescope.io" />
      {urls.map((url) => (
        <link key={url} rel="prefetch" href={hostedPlayerSrc(url)} as="document" />
      ))}
    </>
  );
}
