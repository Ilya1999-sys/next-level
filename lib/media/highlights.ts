export const HIGHLIGHTS = {
  barcelona: "NkR_CBgZ8YA",
  zidane: "9RCh6XvDLTI",
  portugal2016: "8Kzy6u3Kdgg",
  euro2008: "I5ZQSHj1UKk",
  croatia: "wtzdYiH7qVc",
  france2016: "8Kzy6u3Kdgg",
  hungary: "32WzVigKjU0",
  wales: "5IewKxLuiFM",
} as const;

export function youtubeEmbedSrc(
  id: string,
  options?: { controls?: boolean; autoplay?: boolean }
) {
  const params = new URLSearchParams({
    autoplay: options?.autoplay === false ? "0" : "1",
    mute: "1",
    controls: options?.controls ? "1" : "0",
    loop: "1",
    playlist: id,
    modestbranding: "1",
    rel: "0",
    playsinline: "1",
    iv_load_policy: "3",
    disablekb: options?.controls ? "0" : "1",
    fs: options?.controls ? "1" : "0",
  });

  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}
