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

export type YoutubeClip = {
  provider: "youtube";
  id: string;
};

export type EmbedClip = VkClip | DzenClip | RutubeClip | DailymotionClip | YoutubeClip;

export type HighlightClip = {
  src: string;
  about: string;
  embed?: EmbedClip;
  hosted?: string;
};

function hostedUrl(value: string | undefined, fallback?: string) {
  return value?.trim() || fallback;
}

export const HIGHLIGHTS = {
  barcelona: {
    src: "/media/highlights/barcelona-2009-ucl.mp4",
    about: "2009 UEFA Champions League: Barcelona path to the final vs Manchester United",
    embed: { provider: "youtube", id: "NkR_CBgZ8YA" },
    hosted: hostedUrl(process.env.NEXT_PUBLIC_VIDEO_BARCELONA, "https://kinescope.io/aiAQEuMpLgLgmbH2BXPTbJ"),
  },
  zidane: {
    src: "/media/highlights/zidane-2006-wc-final.mp4",
    about: "2006 FIFA World Cup final: Zidane, France vs Italy",
    embed: { provider: "youtube", id: "Nlsm0RlC8zI" },
    hosted: hostedUrl(process.env.NEXT_PUBLIC_VIDEO_ZIDANE, "https://kinescope.io/iZX4hceJyJsjw1dDqXvW1D"),
  },
  portugal2016: {
    src: "/media/highlights/portugal-2016-euro.mp4",
    about: "UEFA Euro 2016: Portugal’s first major tournament victory",
    embed: { provider: "youtube", id: "tLFzGcfcIjc" },
    hosted: hostedUrl(process.env.NEXT_PUBLIC_VIDEO_PORTUGAL2016, "https://kinescope.io/5qKPNVkdiVW24Zd6p7dvzy"),
  },
  euro2008: {
    src: "/media/highlights/euro-2008-spain-russia.mp4",
    about: "UEFA Euro 2008: Spain champions, Russia comebacks",
    embed: { oid: -135826836, id: 456241767 },
    hosted: hostedUrl(process.env.NEXT_PUBLIC_VIDEO_EURO2008, "https://kinescope.io/mqAAhhVuecQi9TaqYXRTsh"),
  },
  croatia: {
    src: "/media/highlights/portugal-croatia-2016.mp4",
    about: "UEFA Euro 2016 round of 16: Portugal 1-0 Croatia",
    embed: { provider: "rutube", id: "07595d662cc859e1ef95778cef3be3f1" },
    hosted: hostedUrl(process.env.NEXT_PUBLIC_VIDEO_CROATIA, "https://kinescope.io/gkYueWhGiCdYWFiw96bxE7"),
  },
  france2016: {
    src: "/media/highlights/portugal-france-2016.mp4",
    about: "UEFA Euro 2016 final: Portugal 1-0 France",
    embed: { provider: "youtube", id: "tLFzGcfcIjc" },
    hosted: hostedUrl(process.env.NEXT_PUBLIC_VIDEO_FRANCE2016, "https://kinescope.io/5qKPNVkdiVW24Zd6p7dvzy"),
  },
  hungary: {
    src: "/media/highlights/portugal-hungary-2016.mp4",
    about: "UEFA Euro 2016 group stage: Portugal 3-3 Hungary",
    embed: { oid: -16945832, id: 456239214 },
    hosted: hostedUrl(process.env.NEXT_PUBLIC_VIDEO_HUNGARY, "https://kinescope.io/c1CA24qRc65yVEwjxzU7fy"),
  },
  wales: {
    src: "/media/highlights/portugal-wales-2016.mp4",
    about: "UEFA Euro 2016 semi-final: Portugal 2-0 Wales",
    embed: { provider: "dailymotion", id: "x4jmmp8" },
    hosted: hostedUrl(process.env.NEXT_PUBLIC_VIDEO_WALES, "https://kinescope.io/oSoZxUhHdkN71VHKXKQf9d"),
  },
  usaGhana2010: {
    src: "/media/highlights/usa-ghana-2010.mp4",
    about: "2010 FIFA World Cup round of 16: USA vs Ghana",
    hosted: hostedUrl(process.env.NEXT_PUBLIC_VIDEO_USAGHANA2010),
  },
} as const satisfies Record<string, HighlightClip>;

export type HighlightKey = keyof typeof HIGHLIGHTS;

export const WATCH_ROUTES = {
  barcelona: { clip: "barcelona", backHref: "/", slug: "barcelona" },
  zidane: { clip: "zidane", backHref: "/", slug: "zidane" },
  portugal2016: { clip: "portugal2016", backHref: "/", slug: "portugal2016" },
  euro2008: { clip: "euro2008", backHref: "/", slug: "euro2008" },
  croatia: { clip: "croatia", backHref: "/portugal-2016", slug: "croatia" },
  hungary: { clip: "hungary", backHref: "/portugal-2016", slug: "hungary" },
  wales: { clip: "wales", backHref: "/portugal-2016", slug: "wales" },
  france2016: { clip: "france2016", backHref: "/portugal-2016", slug: "france2016" },
  usaGhana2010: { clip: "usaGhana2010", backHref: "/match", slug: "usa-ghana-2010" },
} as const satisfies Record<HighlightKey, { clip: HighlightKey; backHref: string; slug: string }>;

export function watchHref(key: HighlightKey) {
  return `/watch/${WATCH_ROUTES[key].slug}`;
}

export function watchRouteBySlug(slug: string) {
  return Object.values(WATCH_ROUTES).find((route) => route.slug === slug);
}

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

export function isDirectVideoUrl(url: string) {
  return /\.(mp4|webm|ogg|m3u8)(\?|#|$)/i.test(url);
}

function youtubeIdFromUrl(url: string) {
  const watch = url.match(/[?&]v=([A-Za-z0-9_-]{11})/);
  if (watch) return watch[1];
  const short = url.match(/youtu\.be\/([A-Za-z0-9_-]{11})/);
  if (short) return short[1];
  const embed = url.match(/youtube(?:-nocookie)?\.com\/embed\/([A-Za-z0-9_-]{11})/);
  return embed?.[1];
}

export function youtubeEmbedSrc(id: string) {
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    loop: "1",
    playlist: id,
    controls: "0",
    modestbranding: "1",
    playsinline: "1",
    rel: "0",
    fs: "0",
    iv_load_policy: "3",
    enablejsapi: "1",
  });
  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}

export function hostedPlayerSrc(url: string) {
  const youtubeId = youtubeIdFromUrl(url);
  if (youtubeId) return youtubeEmbedSrc(youtubeId);

  const kinescope = url.match(/kinescope\.io\/(?:embed\/)?([A-Za-z0-9_-]+)/);
  if (kinescope) {
    return `https://kinescope.io/embed/${kinescope[1]}?autoplay=1&muted=1&loop=true`;
  }

  const vimeo = url.match(/(?:player\.)?vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) {
    return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1&muted=1&background=1&loop=1`;
  }

  return url;
}

export function highlightEmbedSrc(clip: EmbedClip) {
  if (clip.provider === "youtube") return youtubeEmbedSrc(clip.id);
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
