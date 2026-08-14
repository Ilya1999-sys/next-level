# Design notes from chat

Source of truth: Figma file `F3RebM3vrX7z9Pe1DDgDP8`, collection **design**.

If a later chat asks to change UI, use **only** existing Figma component variants, styles, and variables. Do not invent new tokens, radii, or type styles.

## 2026-08-14 — rebuild from new concept

1. Site uses **all variables from Figma mode `design`**.
2. Components come from page `components` (`112:2`).
3. Home is `323:3871`.
4. Arrow on card `/2016 Portugal` → `/portugal-2016` (`323:3890`).
5. Arrow on card `Match review 1-0 France` → `/portugal-2016/france` (`323:3918`). Background is **video** of Euro 2016 final Portugal vs France, not the still.
6. Opened match overlays: `323:3928`. Collapse controls toggle panels. **Closed** panels use opaque `--bg-cards` (score closed uses `--bg-page`). **Open** panels use glass `--bg-cards-glass` (`#00000066`) + screen blur 20px from left-menu. Figma `effect/glass/frost` is `4` (shader units); CSS blur follows the 20px used on screens.
7. Player illustrations from `323:6707` must “continue the pose” on card hover (`lift` / `run` / `celebrate`).
8. Top menu moods (`302:1993`):
   - **Nostalgia** — Figma as drawn, accent `--bg-accent-primary` `#012fff`.
   - **Drama** — red accent `#e10600` (explicit chat instruction; no red token in current design collection).
   - **Legends** — yellow accent; exact hex pending a later reference. Until then use `--bg-accent-tretiary` `#e1fb5c`.
   Mood also changes card lineup and player-illustration filter.
9. Keep this file updated after each design comment.
10. Ship via git push so Vercel rebuilds.
11. Fonts from Figma: primary **Cartograph Mono CF**, secondary **Geneva**. Cartograph is not on Google Fonts; load **IBM Plex Mono** as `--font-ibm-plex-mono` while keeping the Figma family name first in CSS.

## Implementation notes

- Icons are Figma paths from `278:1302`, with the component-set chrome stripped so `currentColor` works on inverted buttons.
- Closed match HUD labels stay white on `--bg-cards`; closed score uses `--bg-page` and `--text-primary`.
- Open rate-player scores in range 8–10 use `--main-success` `#4ecc91`.
- Euro 2016 final footage cannot be hosted as official broadcast; the match stage uses a Mixkit football clip as a stand-in over `match-bg.png`.
- Profile / player-face exports from Figma came back empty; profile shows initials `IP`, rating rows use letter orbs, team crests use `team-por.png` / `team-fra.png`.
- Drop licensed **Cartograph Mono CF** files into the project later if you want the exact Figma face on Vercel; until then IBM Plex Mono is the webfont.

## Tokens (design mode)

Colors: `elements/icons`, `elements/accent`, `text/primary`, `text/secondary`, `bg/cards`, `bg/cards-elements`, `bg/cards-glass`, `bg/page`, `bg/accent-primary`, `bg/accent-secondary`, `bg/accent-tretiary`, `main/success`.

Type: `type/font-family-primary`, `type/font-family-secondary`, sizes/weights/line-heights/letter-spacings for H1–H3, T1–T3, button-1.

Space: `xs 4`, `s 8`, `m 12`, `l 20`, `xl 28`.

Radius: `xs 12`, `s 20`, `m 32`, `l 40`, `xl 999`.

Glass effects: `effect/glass/frost|refraction|depth|dispersion|splay` (value `4` in Figma).
