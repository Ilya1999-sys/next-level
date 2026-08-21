export const HIGHLIGHTS = {
  barcelona: "PaOheYo-upE",
  zidane: "Nlsm0RlC8zI",
  portugal2016: "8Kzy6u3Kdgg",
  euro2008: "I5ZQSHj1UKk",
  croatia: "wtzdYiH7qVc",
  france2016: "8Kzy6u3Kdgg",
  hungary: "32WzVigKjU0",
  wales: "5IewKxLuiFM",
} as const;

export function youtubeEmbedSrc(
  id: string,
  options?: { controls?: boolean; autoplay?: boolean; origin?: string }
) {
  const params = new URLSearchParams({
    autoplay: options?.autoplay === false ? "0" : "1",
    mute: "1",
    controls: options?.controls ? "1" : "0",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    iv_load_policy: "3",
    fs: options?.controls ? "1" : "0",
  });

  if (options?.origin) {
    params.set("origin", options.origin);
  }

  return `https://www.youtube.com/embed/${id}?${params.toString()}`;
}
