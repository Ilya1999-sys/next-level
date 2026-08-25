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
  barcelona: { provider: "rutube", id: "a432b31d97c1fa87a0adc671d52dc926" },
  zidane: { oid: -16945832, id: 456239716 },
  portugal2016: { provider: "rutube", id: "ec8e8b9b25377a81e1fee3b757de45fa" },
  euro2008: { oid: -135826836, id: 456241767 },
  croatia: { provider: "rutube", id: "07595d662cc859e1ef95778cef3be3f1" },
  france2016: { provider: "dailymotion", id: "x7q204o" },
  hungary: { oid: -16945832, id: 456239214 },
  wales: { provider: "dailymotion", id: "x4jmmp8" },
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
    return `https://rutube.ru/play/embed/${clip.id}?autoplay=1&mute=1&autostartmute=true&quality=1`;
  }
  if (clip.provider === "dailymotion") {
    const params = new URLSearchParams({
      autoplay: "1",
      mute: "1",
      "queue-enable": "false",
      "ui-start-screen-info": "0",
      "ui-logo": "0",
      "endscreen-enable": "false",
      "sharing-enable": "false",
      quality: "1080",
    });
    return `https://www.dailymotion.com/embed/video/${clip.id}?${params.toString()}`;
  }
  return vkEmbedSrc(clip);
}
