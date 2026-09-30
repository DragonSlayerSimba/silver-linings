# Silver Linings — Project Doc

A new website for **Silver Linings**, a hand-crafted mud cafe in Bir (Suja, Himachal Pradesh). Not a template site: creative, fun, beautiful and warming. This doc is the running source of truth for the brief, brand, decisions and progress. Update it as we go.

---

## 1. Brief

> "Nestled in lush greenery, Silver Linings is a hand-crafted mud cafe designed to be your sanctuary from the storm. Step inside our raw, earthy walls, breathe in the fresh forest air, and find the bright side of your day with a comforting cup of specialty coffee and our signature, hand-crafted desserts."

**Goals**

- Feel like the place: mud walls, wood, greenery, mountain light. Warm, not slick.
- Playful and alive: ambient/seasonal backgrounds, motion, small delights.
- Fast on hill-town mobile networks. Prerendered for SEO ("cafe in Bir").
- Everything important controlled from a config file; content in data files.

**Owner/maintainer:** the developer (us). No CMS or hand-over concerns.

---

## 2. Brand

### Theme: Mud Cafe

Colour palette drawn from the building itself: window colours, furniture and wood tones, greenery, with silver as the accent (the "lining").

Palette to define in `@theme` (to be tuned once we see photos):

| Token  | Idea                                   |
| ------ | -------------------------------------- |
| clay   | terracotta / mud walls                 |
| wood   | warm furniture browns                  |
| moss   | deep greens from the garden            |
| leaf   | brighter greenery                      |
| sky    | window / mountain sky blue-grey        |
| sunset | amber-to-rose for evening mode         |
| silver | the accent: strokes, highlights, hover |
| cream  | paper / milk background                |

### Seasonal / ambient backgrounds

Three moods, selectable in config (auto by date/time, or forced):

- **Greenery** — daytime, leaves, soft light
- **Rain** — monsoon, drops on glass, muted palette
- **Sunset** — golden hour, warm gradient shift on scroll

### Taglines (sprinkle throughout, hero rotates them)

- Every cloud hides a spark
- Silver lining in a cup
- Finding the silver lining one cup at a time.
- Cup half full
- Storm passes, coffee stays
- ✨ A sanctuary of mud, moss, and morning magic.
- ☕ Earthy roots, bright brews. Find your silver lining in the wild.
- Sunsets, seedlings and silver linings

### Logo concepts (no files yet; draft as SVG)

1. **The Clay Cup & Cloud** — rustic textured terracotta cup silhouette; steam rises into a soft dark storm-cloud outlined with a sharp, clean silver stroke.
2. **The Golden/Silver Hour Monogram** — circular emblem: silhouette of the mud building among trees, framed in a split crescent, half organic moss texture, half sleek silver.

---

## 3. Sections (page structure)

1. **Hero / top scroll** — main element, rotating tagline, ambient background.
2. **Menu** — with animated icons (Rive/Lottie) per category/item.
3. **Silver Linings: Down the Memory Lane** — story and photos over time.
4. **Social scroll** — curated posts (Instagram etc.) as a horizontal scroll.
5. **Made with love in Bir / the mountains** — small section of items sold.
6. **Events** — "Every day is an event when you believe in silver linings." Collage, including the artists' market.
7. **Find us** — hours, address, map, contact.

---

## 4. Facts (from the cafe; verify before launch)

- **Address:** Bir Colony Road, Suja, Himachal Pradesh 176077 — near the paragliding landing site
- **Hours:** 09:00–19:00, closed Wednesdays
- **Phone:** +91 83509 74903
- **Domain:** silverliningscafe.site
- **Menu categories:** Bakes & Desserts (Banoffee Pie ₹180, Cocoa Mud Cups ₹150, Pancakes ₹130–170), Coffee & Teas (Espresso ₹80–110, Cappuccino ₹120, Masala Chai ₹60), Smoothies & Juices (₹150–180), Breakfast (eggs ₹100–150), Starters (Momos ₹100–180, Spring rolls ₹120–150), Mains (Burgers ₹100–150, Pizzas ₹220–270, Pasta ₹150, Noodles ₹130–150)

---

### From the cafe's Instagram (2026-09-24)

- **Opened 13 October 2016.** Instagram account starts 2 Feb 2018. Owner/chef: Harish Thakur (bio, "master chef" post).
- Buildings: original mud house with slate roof (2016); stone room beside it built May–Aug 2018; roofed gate with red signs Dec 2020–Jan 2021; chalkboard interior by June 2021.
- Plastic Reduction Program: bottle wall from own waste (2018), community water filters at the landing site with Cloudbase Foundation and Deer Park Institute (2019).
- Events history: Bir Tibetan colony talk (30 Apr 2018), coffee-shop jazz with Deer Park (18 Oct 2018), art pop-up market weekends (Mar 2025), Gunehr Sound Museum evening (May 2025).

### From the counter photo (2026-09-24)

- Counter logo reads "Silver Linings · Bir · since 2016 · Sip. Savor. Smile." — a real tagline and founding year for Memory Lane.
- Dessert counter labels: Walnut Brownie, Banoffee Dreams, Mangoffee Pie, Tea Cake, Persimmon Pie, Blueberry Cheesecake, Strawberry Pie.

## 5. Tech stack (decided 2026-09-10)

Chosen on project fit, not familiarity. The animation layer does the heavy lifting and is framework-agnostic; the framework's job is small output, prerendering and staying out of the way.

| Layer       | Choice                                      | Why                                                                                                                                                                                                                           |
| ----------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework   | **SvelteKit** (Svelte 5, runes), TypeScript | One-line prerender, built-in transitions, scoped CSS, tiny bundles                                                                                                                                                            |
| Styling     | **Tailwind v4**, CSS-first `@theme`         | Palette/fonts/spacing tokens live in one CSS file                                                                                                                                                                             |
| Scroll/anim | **GSAP + ScrollTrigger**, **Lenis**         | Scroll choreography (sunset shift, parallax), smooth scroll                                                                                                                                                                   |
| Micro-anim  | Svelte transitions                          | Fades, tagline swaps, no library needed                                                                                                                                                                                       |
| WebGL       | Threlte / Three.js (optional, later)        | Only if volumetric clouds/rain earn their weight                                                                                                                                                                              |
| Icons       | **Rive** (Lottie fallback)                  | Tiny animated icons with state machines                                                                                                                                                                                       |
| Config      | `site.config.ts` validated with **Zod**     | Palette, season mode, taglines, hours, contact, section order/toggles                                                                                                                                                         |
| Content     | Typed TS/JSON files                         | Menu, events, memory lane, shop items, curated social posts                                                                                                                                                                   |
| Hosting     | **Cloudflare Workers (static assets)**      | Free static hosting, strong edge presence for Indian mobile users. Code on GitHub, deploy on push. Cloudflare now steers new projects to Workers rather than Pages; GitHub Pages is the fallback if we want one fewer service |

**Considered and rejected**

- React Router 7 framework mode — runner-up. Mature and familiar, but larger bundles and React's rendering model fights direct DOM animation.
- Astro + React islands — islands are the wrong shape for page-wide animation.
- Next.js / TanStack Start — app frameworks; this site has no data/server needs.
- Nuxt — comparable to SvelteKit, slightly larger output; no reason to prefer.
- Site builders (Webflow/Framer/WordPress) — flatten the creative brief.

---

## 6. Plan

### Done

**Session 1 (2026-09-15) — scaffold**
SvelteKit + Svelte 5 + Tailwind v4, Zod-validated `site.config.ts`, typed content files, seven section components, CSS ambient background (greenery / rain / sunset), Lenis + GSAP wired, photo-derived palette, hero crossfading five cafe photos, Theme lab switcher.

**Session 2 (2026-09-24) — menu, photos, memory lane, mobile**

- Menu: transcribed from the chalkboards (14 categories, ~80 items), Zod schema, `menu` block in config, `/menu` page (Food / Drinks / Bakes chalk tabs, sticky category rail with scroll-spy, dotted leaders, Veg / Vegan / Egg filter, deep links, print-clean), home teaser (counter tile crossfading the six featured dishes, hover-to-pin, favourites list, chalk chip rows). SVG category icons with light motion. House Cookies added to Bakes.
- Photos: Instagram export (Sep 2025–Sep 2026) and the full account (403 posts, 2018–2026) reviewed; the cafe's own posts captured at ~1090px. **Site rule: the cafe's own photos everywhere except Moments**, which is visitors' stories credited by handle.
- Memory Lane: horizontal strip of 14 dated polaroids, Oct 2016 → Jun 2021, photo + chalk date only. Opening date **13 Oct 2016** confirmed from the account.
- Moments: drone shot first, then ten visitor stories. Events: Artists' Market + the 2018 Tibetan Colony talk. Shop: Shunya pickles, two postcard sets.
- Decided by eye: hero = original five photos; menu photos = original six + counter; Bhalu and Romeo third in memory lane; no captions on hero slides or memory cards; section padding 64 / 48px; Find Us photo removed.
- Mobile pass at 390 and 360 wide: tile overflow fixed; findings below.

### Open, in order

1. **Phone navigation** — header nav is `hidden sm:flex` with nothing in its place. Menu button + sheet, or a bottom bar.
2. **Theme lab picks** — accent / surface / header / photo / text / board / memory. Only brick accent is stated. Then `switcher: false` and delete the losers.
3. **Mobile**: home page ~8,100px tall (shop cards, menu tile); 30px tap targets on chips and mood buttons; Theme lab should start collapsed on phones; Events eyebrow wraps.
4. **Find Us**: a map where the gate photo was.
5. **Content from the owners**: real food prices (drinks are real); originals of the 24 + 22 captured posts or an all-time Instagram export; the logo vector (the Instagram profile picture is the emblem); what happened Oct 2016 → Feb 2018; Artists' Market dates.
6. **Rights**: the ten visitor photos in Moments need a yes from each poster before launch.
7. Type and spacing tune on the chosen theme; copy pass on all section text.

### Later

- Logo SVG drafts (emblem exists; trace or get the vector)
- GSAP scroll choreography (sunset shift, section reveals); pinned horizontal scroll for Memory Lane
- Rive icons replacing the SVG set, key by key
- Golden-hour and rain photos for the hero
- Cloudflare Workers static deploy + domain (GitHub repo as source)

---

## 7. How the code is organised

- `site.config.ts` (root) — everything configurable; validated by `src/lib/config/schema.ts` (Zod). Import as `$config`. Includes the `menu` presentation block (currency, showPrices, tabs, filters, featured refs, tile interval) and `theme` (lab defaults + `switcher`).
- `src/content/*.ts` — content, import as `$content`. `menu.ts` is wrapped in `defineMenu()` from `src/lib/config/menu-schema.ts` (group → category → item; category tags/add-ons merge into items; ids default to slugs). `memories.ts`, `social.ts`, `events.ts`, `shop.ts`, `hero.ts` name photos as `{ file, alt, credit? }`.
- `src/lib/photos.ts` — resolves `{section, file}` to enhanced-img pictures for memory / events / social / shop. Hero and menu keep their own globs (different widths).
- `src/lib/menu.ts` — menu read through config: tab groups, featured items, filters, board colour classes.
- `src/lib/components/menu/` — `MenuBoard.svelte` (full menu), `MenuItemRow.svelte`, `CategoryIcon.svelte` (SVG icons keyed by `icon`).
- `src/lib/components/sections/*.svelte` — one per section; `+page.svelte` renders them in config order. `Menu.svelte` is the home teaser; `src/routes/menu/+page.svelte` is the full menu.
- `src/routes/layout.css` — Tailwind v4 `@theme inline` tokens; colours map to `--sl-*` variables injected by `+layout.svelte` from the config palette. Fonts: Fraunces, Nunito Sans, Caveat (chalk).
- `src/lib/theme.svelte.ts` + `ThemeSwitcher.svelte` — runtime theme choices and the dev panel.
- `src/lib/season.svelte.ts`, `components/ambient/AmbientBackground.svelte` — mood by month/hour, three cross-fading layers.
- `src/lib/motion/smooth-scroll.ts` — Lenis + GSAP ticker; skipped under prefers-reduced-motion.
- `src/lib/assets/photos/{hero,menu,memory,social,events,shop}/` — only files in use; enhanced-img emits avif/webp at build.
- `reources/` (git-ignored) — raw photos, the Instagram export, `instagram-picks/` (catalogue, review pages, staged crops), `dev/mobile-harness.html` (copy into `static/` to test phone widths).
- Node 24 required (`.node-version`, `engines`); `n` is installed with `N_PREFIX=~/.n`.
- Deploy target: static `build/`. Cloudflare Workers static assets (or GitHub Pages).

---

## 8. Open questions

- Fonts chosen provisionally: Fraunces + Nunito Sans. Swap in `layout.css` if they don't feel right on screen.
- Social feed: curated posts in a data file vs. an embed widget. Leaning curated.
- Photos and logo files: none yet. Build with placeholders/SVG until provided.
- Single page vs. a few routes (e.g. `/menu`). Leaning single page with anchors.

---

## 9. Photo findings (2026-09-15, `reources/silver-current/`, 15 photos, overcast midday)

Sampled pixel averages from the photos. Nothing applied yet; the config still has the guessed palette.

### What the cafe actually looks like

| Surface                       | Sampled    | Character                                                     |
| ----------------------------- | ---------- | ------------------------------------------------------------- |
| Mud wall in sun               | `#987e60`  | sandy ochre, low saturation. **Not terracotta.**              |
| Floor                         | `#80655d`  | dusty oxblood                                                 |
| Counter, tables               | `#5d3629`  | dark chocolate                                                |
| Signboard                     | ~`#a3322a` | hand-painted brick red, the brand's own colour for its name   |
| Window / door frames          | ~`#8b93c4` | periwinkle lavender blue, the most distinctive colour on site |
| Slate roof tiles              | `#b0b1bc`  | cool grey = the "silver"                                      |
| Corrugated roof over the gate | teal green | small accent                                                  |
| Grass, corn                   | `#7d8730`  | olive yellow-green                                            |
| Shrubs, ferns                 | `#506e20`  | deep leaf                                                     |
| Overcast sky                  | `#e0e2ef`  | pale blue-grey                                                |
| Stone path, plaster           | `#c4bcb1`  | warm putty                                                    |
| Cushions                      | `#a7958e`  | dusty rose                                                    |

Screens dull colour; lift saturation/lightness a notch rather than use raw samples.

### Candidate palette (to try, not decided)

| Token      | Current guess | Photo-derived | Role                      |
| ---------- | ------------- | ------------- | ------------------------- |
| cream      | `#f6efe4`     | `#f1e9dc`     | page background (plaster) |
| clay       | `#b8613d`     | `#b08a5e`     | mud wall, section bands   |
| wood       | `#6b4526`     | `#5e3a2c`     | counter chocolate         |
| brick      | —             | `#a8362c`     | signboard red             |
| periwinkle | —             | `#8d95c8`     | window frames             |
| moss       | `#3f5a3a`     | `#4d6a26`     | shrub green               |
| leaf       | `#8cab5e`     | `#93a04a`     | grass olive               |
| sky        | `#9fb4c2`     | `#dfe3ee`     | overcast                  |
| silver     | `#c9ccd1`     | `#b7b9c3`     | slate roof                |
| ink        | `#2b211b`     | `#2d2019`     | text                      |

Sunset pair unchanged: no evening photos yet.

### UI decisions to test by eye, all options, not by discussion

1. **Accent colour:** brick red is the front-runner (user, 2026-09-15). Periwinkle and silver dropped as accents (periwinkle stays for the rain mood, silver for strokes). Now comparing brick against two woods sampled from the photos: **table** (`#856453` tabletops, lifted to `#7a4a38`) and **log** (`#756859` gate posts, lifted to `#6e5f4f`).
2. **Page background:** (a) cream paper with ochre wall bands, (b) whole page ochre with cream cards, (c) hybrid: ochre hero, cream below.
3. **Greens:** (a) olive from the photos, (b) emerald as currently guessed, (c) desaturated sage between them.

**Built 2026-09-15:** `theme` block in `site.config.ts` holds the three axes (`accent`, `surface`, `greens` + `greenSets`) and `switcher: true` shows the "Theme lab" panel bottom-left, which flips accent/surface/greens/mood live and remembers the choice in localStorage. Components use the `accent` and `surface` role tokens instead of hard-coded colours. Palette in config is now the photo-derived one; the old emerald greens live on as the `emerald` green set. Set `switcher: false` and delete the losing options once decided.

### Hero review (screenshot, 2026-09-15)

Problems seen: nav invisible over dark beams; photo looked sepia (overcast + ochre tint + fade); title over the busiest part of the frame; caption floating; eyebrow and scroll hint too faint; wordmark twice; right half empty.

Fixed outright: header wordmark hidden over the hero and fades in on scroll; caption moved to the bottom-right corner with the scroll hint; eyebrow/scroll contrast raised; gate photo leads the rotation.

Under test in the Theme lab (greens and mood rows removed; greens fixed to olive, mood toggle stays in the footer):

| Row    | Options                                                                                                                                                                 |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Header | **scrim** (dark top gradient + light nav, cream bar after scroll) · **frosted** (blurred pill always) · **hidden** (nav appears after the hero)                         |
| Photo  | **natural** (untouched, fades into page only under the text) · **dark** (bottom darkening, light text) · **tint** (light page-colour wash)                              |
| Text   | **left** (bottom-left, taller fade) · **center** (centred under the roof line, radial fade) · **panel** (solid cream panel bleeding off the left edge, photo untouched) |

Config defaults in `theme.hero`; runtime choice in `theme.svelte.ts`; Header and Hero components carry the CSS per `data-photo` / `data-text` attributes.

### Non-colour findings

- The dessert counter carries a **circular logo with the building drawn inside**: real reference for logo concept 2 (monogram).
- Signboard lettering is a tall, swashy hand-painted serif. Fraunces with the wonk axis on is close; keep the font choice for now.
- Motifs to echo in sections: chalkboard menu, Tibetan prayer-flag bunting, string bulbs, slate tile pattern, rattan/cane chairs, hand-painted canvases, stone path, corn field behind the terrace, purple basil bush.
- Real desserts not in our content: walnut brownie, tea cake, persimmon pie, mangoffee pie, blueberry cheesecake, strawberry pie, banoffee dreams.
- Juice board: kiwi, watermelon, ABC, carrot, pineapple, orange. Chalkboard: burgers, pasta, soups, salads, sandwiches, pizza, pancake.
- There is an "OPEN" sign and a GST number on the gate; the entrance is a slate-roofed wooden arch with the name board. Strong hero image candidate.
- All photos are overcast; we still need golden-hour and rain shots for the sunset and rain moods, and interior shots with lights on.

## Log

- **2026-09-24** — Hero reverted to the five originals; menu photo picker built, used, and removed (original six kept). Memory Lane strip layout added.
- **2026-09-24** — Export candidates wired into every section as placeholders to judge in place; review page at `reources/instagram-picks/index.html` for anything not yet placed.
- **2026-09-24** — Section padding cut from 112px to 64px desktop / 48px phone; Find Us gate photo removed (duplicate of the hero slide; a map goes there later).
- **2026-09-24** — Mobile analysis done; tile overflow fixed; six findings listed in §6.
- **2026-09-24** — Moments, Events and Shop rebuilt from 22 more of the cafe's own posts; visitor photos removed site-wide.
- **2026-09-24** — 24 of the cafe's own posts captured at full size; Memory Lane rebuilt as the cafe's own 2016–2021 story; opening date 13 Oct 2016 confirmed; postcards added to the shop.
- **2026-09-24** — Instagram account crawled through the user's logged-in Chrome; 403 posts catalogued and dated; own-post thumbnails and picker built for memory lane.
- **2026-09-24** — Instagram export reviewed; real dish photos replace stock; picks staged by section; logo found in the profile picture.
- **2026-09-24** — Counter tile made a crossfading set with hover-to-pin from the favourites; set changed from desserts to the featured items; stock test photos from Commons replace the blurry label crops; mud cups flagged as not on the boards.
- **2026-09-24** — Second teaser review: chips back, board treatment made a Theme lab row (slate/wood/none), caption fix.
- **2026-09-24** — Teaser reviewed from a screenshot; rebuilt as counter tile + list + chalk lines.
- **2026-09-24** — Menu built: schema, transcription from the boards, `/menu` page and home teaser. Chalk colours (slate, chalk pink/yellow/green) and Caveat lettering added to the palette. Food prices placeholders. Still nothing committed.

- **2026-09-07** — Brief and brainstorm captured. Old site reviewed for facts only.
- **2026-09-10** — Stack discussed and decided: SvelteKit + Tailwind v4 + GSAP/Lenis + Rive, config-driven, Cloudflare Pages. This doc created.
- **2026-09-15** — Hosting discussed: GitHub for source, Cloudflare Workers static assets (successor to Pages) for serving. GitHub Pages viable fallback.
- **2026-09-15** — Session ended after the hero lab. Nothing decided, nothing committed. Next: pick options by eye.
- **2026-09-15** — Hero screenshot reviewed; header/photo/text treatments added to the Theme lab, greens and mood rows removed.
- **2026-09-15** — Hero now crossfades five placeholder photos via enhanced-img; hero list in `src/content/hero.ts`.
- **2026-09-15** — Analysed 15 cafe photos; findings in §9. Built the Theme lab switcher so the three UI decisions get picked by eye. Palette in config now photo-derived.
- **2026-09-15** — Scaffolded. Config schema, content skeleton, theme, layout shell, all seven sections, ambient background, Lenis/GSAP. `check`, `lint`, `build` all clean. Not yet committed.
