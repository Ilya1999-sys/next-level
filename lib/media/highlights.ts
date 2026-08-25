export type VkClip = {
  provider?: "vk";
  oid: number;
  id: number;
  hash?: string;
};

export type DzenClip = {
  provider: "dzen";
  id: string;
};

export type RutubeClip = {
  provider: "rutube";
  id: string;
};

export type DailymotionClip = {
  provider: "dailymotion";
  id: string;
};

export type HighlightClip = VkClip | DzenClip | RutubeClip | DailymotionClip;

export const HIGHLIGHTS = {
  barcelona: { oid: -16945832, id: 151940438 },
  zidane: { oid: -16945832, id: 456239716 },
  portugal2016: { oid: -8722610, id: 456259499 },
  euro2008: { oid: -135826836, id: 456241767 },
  croatia: { oid: -16945832, id: 456239392 },
  france2016: { oid: -8722610, id: 456259499 },
  hungary: { oid: -16945832, id: 456239214 },
  wales: { oid: -76104733, id: 456259932 },
} as const satisfies Record<string, HighlightClip>;

function vkEmbedSrc(clip: VkClip) {
  const params = new URLSearchParams({
    oid: String(clip.oid),
    id: String(clip.id),
    hd: "3",
    autoplay: "1",
    js_api: "1",
    mute: "1",
    loop: "1",
  });

  if (clip.hash) params.set("hash", clip.hash);
  return `https://vk.com/video_ext.php?${params.toString()}`;
}

export function highlightEmbedSrc(clip: HighlightClip) {
  if (clip.provider === "dzen") {
    return `https://dzen.ru/embed/${clip.id}?autoplay=1&muted=1`;
  }
  if (clip.provider === "rutube") {
    return `https://rutube.ru/play/embed/${clip.id}?autoplay=1&mute=1&quality=1`;
  }
  if (clip.provider === "dailymotion") {
    return `https://www.dailymotion.com/embed/video/${clip.id}?autoplay=1&mute=1&queue-enable=false`;
  }
  return vkEmbedSrc(clip);
}
