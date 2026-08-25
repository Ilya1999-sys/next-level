export type HighlightClip = {
  src: string;
  about: string;
};

export const HIGHLIGHTS = {
  barcelona: {
    src: "/media/highlights/barcelona-2009-ucl.mp4",
    about: "2009 UEFA Champions League: Barcelona path to the final vs Manchester United",
  },
  zidane: {
    src: "/media/highlights/zidane-2006-wc-final.mp4",
    about: "2006 FIFA World Cup final: Zidane, France vs Italy",
  },
  portugal2016: {
    src: "/media/highlights/portugal-2016-euro.mp4",
    about: "UEFA Euro 2016: Portugal’s first major tournament victory",
  },
  euro2008: {
    src: "/media/highlights/euro-2008-spain-russia.mp4",
    about: "UEFA Euro 2008: Spain champions, Russia comebacks",
  },
  croatia: {
    src: "/media/highlights/portugal-croatia-2016.mp4",
    about: "UEFA Euro 2016 round of 16: Portugal 1-0 Croatia",
  },
  france2016: {
    src: "/media/highlights/portugal-france-2016.mp4",
    about: "UEFA Euro 2016 final: Portugal 1-0 France",
  },
  hungary: {
    src: "/media/highlights/portugal-hungary-2016.mp4",
    about: "UEFA Euro 2016 group stage: Portugal 3-3 Hungary",
  },
  wales: {
    src: "/media/highlights/portugal-wales-2016.mp4",
    about: "UEFA Euro 2016 semi-final: Portugal 2-0 Wales",
  },
  usaGhana2010: {
    src: "/media/highlights/usa-ghana-2010.mp4",
    about: "2010 FIFA World Cup round of 16: USA vs Ghana",
  },
} as const satisfies Record<string, HighlightClip>;
