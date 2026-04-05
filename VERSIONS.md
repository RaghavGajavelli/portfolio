# raghavgajavelli.com — Version History

---

## v1.0 — April 4, 2026
**Tag:** `v1.0` | **Commit:** `478960d`
**State:** Hero-only. Clean single screen.

### What's in this version
- Full-screen Spline 3D robot animation (prod.spline.design/kZDDjO5HuC9GJUM2)
- Raining letters background — amber flicker, brand character pool
- TextScramble cycling: RAGHAV GAJAVELLI → PRODUCT × SYSTEMS → CREATIVE × STORY → AMSTERDAM · NL → DESIGN THINKING
- Eyebrow: "Tech × Creativity × Human Story"
- LiquidButton "Get in Touch" → mailto
- Social icons: Email, LinkedIn, Instagram, YouTube, GitHub
- Gyroscope parallax on mobile (3 depth layers, RAF lerp)
- iOS Safari chrome-safe positioning (bottom-32 on mobile)
- Robot shifted up -10% on mobile for better real estate
- Full SEO: JSON-LD Person schema, Open Graph, sitemap.xml, robots.txt, llms.txt
- Google Search Console verified + sitemap submitted + indexing requested
- Domain: raghavgajavelli.com (Squarespace DNS → Vercel)

### Components built but not on page (ready for v2.0)
- `ScrollShowcase` — ContainerScroll 3D tilt with project cards dashboard
- `PortraitGallery` — curtain reveal B&W + colour portraits with parallax
- `CinematicBreak` — full-bleed landscape video with grain + timecode overlay
- `ReelStrip` — phone-frame portrait reels + Amsterdam landscape video

### To restore this version
```bash
git checkout v1.0
```

---

## v2.0 — April 5, 2026
**Tag:** `v2.0` | **Commit:** `b769d15`
**State:** Hero + scroll showcase with 4 animated work tiles.

### What's in this version
**Scroll Showcase (new)**
- `ContainerScroll` 3D tilt-to-flat animation — offset `["start end", "end start"]` for full viewport runway
- 2×2 grid of `CardWithPaths` work tiles inside the card frame
- Raining background at 35% opacity continues into scroll section for visual continuity
- Section eyebrow: "The Work" / headline: "Systems. Stories. Built to last."

**CardWithPaths component**
- Idle state: eyebrow (accent colour) + title (white, semibold) + animated SVG icon (centred) + stat line
- Hover state: `FloatingPaths` animated SVG bezier paths at 40% opacity + cursor spotlight radial gradient + description text
- `AnimatePresence mode="wait"` crossfade between idle and hover states
- Corner glow: subtle accent radial at 6% rest → 15% on hover
- View button: hidden until V3 project pages are built

**Animated SVG icons**
- `NeuralNetIcon` — neural network nodes + pulsing edges (AI Products / Booking.com tile)
- `ApertureIcon` — rotating aperture blades + pulsing centre dot (Photography tile)
- `WritingIcon` — broadcast signal concentric rings pulsing outward (Writing tile)
- `ArchitectureIcon` — stacked layer rects + upward-flowing dots (Architecture tile)
- All icons: SVG-native `feGaussianBlur + feMerge` glow filter on glowing elements
- All icons: `linearGradient` between 2 of 3 brand colours — no direct hex values
- Hydration-safe: `APERTURE_BLADES` precomputed at module level with `Math.round(n * 1000) / 1000`
- `FloatingPaths`: `PATH_DURATIONS` deterministic array replaces `Math.random()`

**3-colour palette discipline**
- Amber `#f59e0b` + Violet `#818cf8` + Silver `#94a3b8` — max 3, gradients between any two for 3D depth

**Card content**
- AI Products / Booking.com: "Design AI Products at Booking.com — 10,000+ agents, real outcomes. Enterprise scale, human design."
- Photography / Portrait Experience: "Photographing 10 entrepreneurs across the Netherlands..."
- Writing / Enough is Enough: "AI, systems, and clarity for people done waiting..."
- Architecture / System Design: "17 years designing complex systems across enterprise..."

**Hero improvements**
- CTA button: amber radial glow bloom behind LiquidButton + `font-semibold text-white`
- Social icons: `border-white/[0.18]` + `text-white/45` at rest → amber tint + amber glow ring on hover
- Spline robot fade-in: 0.8s → 0.4s

### To restore this version
```bash
git checkout v2.0
```

---

<!-- Next version goes here -->
