# Design notes from chat

Source of truth: Figma file `F3RebM3vrX7z9Pe1DDgDP8`, collection **design**.

If a later chat asks to change UI, use **only** existing Figma component variants, styles, and variables. Do not invent new tokens, radii, or type styles.

## 2026-09-02 — equal-height fact rows, France timeline, on-accent tokens

1. Horizontal card rows (`.cards-compact-grid`) stretch to the tallest item. Text-only facts: title at the top, number + description at the bottom (`margin-top: auto`). Title + fact + chart (dot-grid / mix-chart): number + description stay on the title with `--size-fact-title-gap` (`space/l`); leftover height goes to the chart. Title + fact + description (no chart, e.g. Player files): title top-left, fact + description bottom-left and left-aligned, padding `space/l`, inner gap `space/s`. Number + description sit in one row, text vertically centered to the number, while the copy fits in two lines; three or more lines stack the copy under the number. A wide card plus two short facts can sit as one left column and a stacked pair on the right when internals do not overlap. Sparse story cards (mix-chart, banner circles) do not stretch empty: the row stays 100% wide, the graphic hugs, and a sibling fact from the catalog fills the leftover track. Do not add copy inside an existing story card.
2. France 1-0 timeline is a 403×462 graphic, left-aligned with “Match review”, T2 labels, dots at Figma offsets. Muted marks use `elements/accent-secondary-dark-bg`.
3. Wins-fact mix marks use `radius/s` on 24px dots and 72px bars, grouped with `space/xl` between clusters.
4. Match Mode chips use `--bg-accent-primary` when selected (blue in Nostalgia). Left-nav selected stays `--bg-accent-secondary`.


1. Match-view team icons (`team-icon`) sit on `--bg-cards-elements` (`323:3928`). Crests use multiply so the circle follows the mood token.
2. Rate / Health follow the match layout: label+chevron on the team toggle, Portugal open, France collapsed, 40px crest orbs on `--bg-cards-elements`, Rate has +/−, Health is score-only.
3. Drama / Legends now change **colors and effects only** (no type, size, or layout). Drama: dark broadcast, red grain/scan, vignette. Legends: warm archive, gold inset, film grain. Nostalgia stays on Figma `design` tokens.

## 2026-08-18 — comments vs discussion, LIVE, hover video, match panels

1. Design comments go to Git immediately (preview branch). Discussion-only items stay in chat and are not shipped.
2. LIVE discussion card hugs its content (`flex: 0 0 auto`, padding 20, gap 12). Chips stay `nowrap` and wrap to a new row if needed instead of clipping the card height.
3. Top logo and the `Home` crumb always link to `/`.
4. Player-card hover no longer translates the photo. On hover (Drama / Legends / Nostalgia) the still + labels hide and a muted looping match clip fills the card; the arrow button stays.
5. Player photos fill the remaining card width (`width: 100%`, `object-cover`). Featured cards use the same fill instead of a fixed 642 crop that overflowed.
6. Fact numbers (`15`, `6—5`, `9-5`, match `0 - 0`) are `whitespace-nowrap` and do not shrink.
7. Match HUD: Smart facts closed = opaque + label + chevron up. Open = glass, title at top, three `--bg-cards-elements` fact cards, chevron-only collapse at the bottom (`310:5667`). Rate / Health (`310:4144`): Rate has +/−, Health is score-only; Portugal starts open, France (and Mode in Health) start collapsed.

## 2026-08-17 — regular type, hug/fill facts, Figma photos

1. Only **Cartograph Mono CF Regular** and **Geneva Regular**. All type styles use weight 400; bold/semibold faces are not loaded.
2. Home facts (`323:3871`): Champions League card is `flex: 1` (fill the 488 row). Mbappe and Switzerland—Turkey cards are hug. Tournament facts (`323:3890`): Wins fact fills, Final and Ronaldo hug.
3. Player photos fill the card width (`object-cover`). Hover replaces the still with a match clip; the arrow stays.
4. **Legends** uses the color Figma photos (`327:2228`, `327:2532`) by default. Nostalgia keeps the stipple set. Drama rest is stipple; hover crossfades to the color set.

## 2026-08-17 — fonts, chrome, cards, moods

1. Load **Cartograph Mono CF** (400/600/700/900 woff2) and **Geneva** from `/fonts`. No IBM Plex Mono.
2. Left menu fills the remaining viewport height (`100dvh` page shell). The two `left-menu-group` blocks stay fully visible; extra height is the gap between them (`justify-content: space-between`). Cards scroll in `.cards-all`.
3. Card heights from Home `323:3871` and Tournament `323:3890`: first row `488` / `0.8fr 1fr 1fr`, small cards `240`, featured `488` with image `642` clipped, tournament padding `28`, image `400×320` at `right: -70; top: 120`, stats row `200`, circles `120–160`. Tournament hero is photo left `2fr` / copy right `3fr`, H2 title, match row same `488`, labels “Match review” + score, wins fact `3×3` dots.
4. Player hover plays a match clip inside the card. The arrow button stays; year/team and the photo hide.
5. **Drama** accent `#FF0901`. **Legends** accent `#FF9E01`. Resting player art stays grayscale; hover reveals the color set under the match clip. Current Figma PNG exports are near-grayscale stipple, so color only appears if a later export has chroma.
6. Preview deploys from branch `cursor/home-player-figma-layout`. Unique hashed Vercel URLs do not update; production alias updates only on Production (`main`).

## 2026-08-14 — rebuild from new concept

1. Site uses **all variables from Figma mode `design`**.
2. Components come from page `components` (`112:2`).
3. Home is `323:3871`.
4. Arrow on card `/2016 Portugal` → `/portugal-2016` (`323:3890`).
5. Arrow on card `Match review 1-0 France` → `/portugal-2016/france` (`323:3918`). Background is **video** of Euro 2016 final Portugal vs France, not the still.
6. Opened match overlays: `323:3928`. Collapse controls toggle panels. **Closed** panels use opaque `--bg-cards` (score closed uses `--bg-page`). **Open** panels use glass `--bg-cards-glass` (`#00000066`) + screen blur 20px from left-menu. Figma `effect/glass/frost` is `4` (shader units); CSS blur follows the 20px used on screens.
7. Player illustrations from `323:6707` show stills at rest. On card hover the still is replaced by a match video; the arrow stays.
8. Top menu moods (`302:1993`):
   - **Nostalgia** — Figma as drawn, accent `--bg-accent-primary` `#012fff`.
   - **Drama** — red accent `#FF0901`.
   - **Legends** — orange accent `#FF9E01` (Home `327:2228`, Tournament `327:2532`).
   Mood also changes card lineup and player-illustration filter.
9. Keep this file updated after each design comment.
10. Ship via git push so Vercel rebuilds. After every push, paste the preview URL in chat: https://next-level-git-cursor-home-player-figma-layout-next-level-1999.vercel.app/ (branch `cursor/home-player-figma-layout`). Do not send hashed unique deployment URLs.
11. Fonts from Figma: primary **Cartograph Mono CF Regular**, secondary **Geneva Regular**, served from `/public/fonts`. All UI type is weight 400.

## Implementation notes

- Icons are Figma paths from `278:1302`, with the component-set chrome stripped so `currentColor` works on inverted buttons.
- Closed match HUD labels stay white on `--bg-cards`; closed score uses `--bg-page` and `--text-primary`.
- Open rate-player scores in range 8–10 use `--main-success` `#4ecc91`.
- Euro 2016 final footage cannot be hosted as official broadcast; the match stage and card hover clips use Mixkit football videos as stand-ins over `match-bg.png`.
- Profile exports from Figma came back empty; profile shows initials `IP`. Match-view crests use `team-por.png` / `team-fra.png` on `--bg-cards-elements`.
- Cartograph Mono CF and Geneva files live in `public/fonts` and are declared in `tokens/fonts.css`.

## Tokens (design mode)

Colors: `elements/icons`, `elements/accent`, `elements/accent-primary-dark-bg` (`#ffffff`), `elements/accent-secondary-dark-bg` (`#ffffff4d`, white 30% on accent), `text/primary`, `text/secondary`, `bg/cards`, `bg/cards-elements`, `bg/cards-glass`, `bg/page`, `bg/accent-primary`, `bg/accent-secondary`, `bg/accent-tretiary`, `main/success`.

Type: `type/font-family-primary`, `type/font-family-secondary`, sizes/weights/line-heights/letter-spacings for H1–H3, T1–T3, button-1.

Space: `xs 4`, `s 8`, `m 12`, `l 20`, `xl 28`.

Radius: `xs 12`, `s 20`, `m 32`, `l 40`, `xl 999`.

Glass effects: `effect/glass/frost|refraction|depth|dispersion|splay` (value `4` in Figma).
