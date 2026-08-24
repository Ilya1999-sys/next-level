export type VkClip = {
  oid: number;
  id: number;
  hash?: string;
};

export const HIGHLIGHTS = {
  barcelona: { oid: -16945832, id: 151940438 },
  zidane: { oid: -16945832, id: 456239716 },
  portugal2016: { oid: -8722610, id: 456259499 },
  euro2008: { oid: -135826836, id: 456241767 },
  croatia: { oid: -16945832, id: 456239392 },
  france2016: { oid: -8722610, id: 456259499 },
  hungary: { oid: -16945832, id: 456239214 },
  wales: { oid: -76104733, id: 456259932 },
} as const satisfies Record<string, VkClip>;

export function vkEmbedSrc(
  clip: VkClip,
  options?: { controls?: boolean; autoplay?: boolean }
) {
  const params = new URLSearchParams({
    oid: String(clip.oid),
    id: String(clip.id),
    hd: "2",
    autoplay: options?.autoplay === false ? "0" : "1",
    js_api: "1",
    mute: "1",
  });

  if (clip.hash) params.set("hash", clip.hash);
  if (!options?.controls) params.set("loop", "1");

  return `https://vk.com/video_ext.php?${params.toString()}`;
}
