# Desktop Layout Optimization & Visual Redesign

## Summary

Redesign the resume website for desktop screens while maintaining excellent mobile UX. Apply Linear-inspired design principles (refined spacing, subtle borders, clean hierarchy) to a light theme. The core change: widen the layout from 640px to 1100px and restructure sections into multi-column grids that leverage desktop screen space.

## Layout

### Content Width

- Desktop (>=1024px): `max-width: 1100px`, centered
- Tablet (768-1024px): `max-width: 100%`, 2-column where practical
- Mobile (<768px): full-width single column, identical to current mobile behavior

### Page Structure

Fixed sidebar (48px, dots only) on the left, labels appear on hover/active. Main content area centered with 1100px max-width. Sections flow vertically with 16px gaps (tight, Linear-like).

### Section Grids

| Section | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| Hero | Card, natural height | Card, natural height | Card, natural height |
| Skills | 4-column grid | 2-column grid | 1-column stack |
| Experience | Full-width card, sub-sections 2-col | Full-width card, sub-sections 1-col | 1-column stack |
| Internship | 2-col with Education/OS | 1-col | 1-col |
| Education/OS | 2-col (side-by-side) | 1-col stack | 1-col stack |

### Breakpoints

- `<768px`: mobile single column
- `768-1024px`: tablet, 2-col skills
- `>=1024px`: full desktop layout
- `>=1440px`: content capped at 1100px, extra side whitespace

## Visual Style (Linear-inspired, Light Theme)

### Colors

- `bg`: #FAFAFA (page background)
- `surface`: #FFFFFF (card backgrounds)
- `text-primary`: #1A1A1A (headings)
- `text-secondary`: #6B7280 (body)
- `accent`: #2563EB (primary blue, links, active states)
- `accent-muted`: #DBEAFE (light blue backgrounds, metric boxes)
- `border`: #E8ECF2 (card borders — slightly cooler than current #E5E7EB)

### Cards

- Background: white, 1px solid border (#E8ECF2), 10px border-radius
- No shadow by default (flat, clean)
- Hover: border shifts to accent color, subtle 1px ring (`box-shadow: 0 0 0 1px rgba(37,99,235,0.1)`)
- Hero card: gradient background (white → subtle blue tint) with dot-grid pattern overlay
- Sub-section cards: #FAFAFA background, 1px #F0F1F3 border, 6px radius

### Typography

- Headings: Noto Serif SC / Lora (serif)
- Body: Inter / PingFang SC (sans-serif)
- Code/data: JetBrains Mono (monospace)
- Scale: Hero name 28px → Section title 20px → Card title 16px → Body 13px → Meta 11px

### Metrics

- Background: #F0F4FF with 1px #DBEAFE border, 8px radius
- Value: JetBrains Mono, 16px, #2563EB, weight 600
- Label: 10px, #6B7280

### Tags

- Default: #F3F4F6 background, monospace 10px, rounded-full, 1px transparent border
- Hover: border → accent, text → accent, background → #DBEAFE

### Decorative Elements

- Hero: dot-grid radial-gradient in top-right (16px spacing, #DBEAFE dots, 50% opacity)
- Hero: subtle blue blur blob (80px, #DBEAFE at 15% opacity, blur 20px) in bottom area
- Section dividers: 1px #F0F1F3 border-top on tech stack rows

## Navigation

### Desktop (>=1024px)
- Fixed sidebar on left, positioned relative to content area
- Dots only by default (8px, rounded, #D1D5DB)
- Active dot: accent color, 1.3x scale, glow ring (0 0 8px rgba(37,99,235,0.4))
- Labels appear on hover with opacity transition
- Hidden when viewport too narrow for sidebar + content

### Tablet/Mobile (<=1024px)
- Bottom bar: horizontal dots + compact labels
- White background with backdrop-blur, top border
- Safe area inset padding

## Animations & Motion Design (Linear-inspired)

### Philosophy

Every motion should feel intentional and satisfying — never sluggish, never jarring. Linear uses spring physics for natural-feeling transitions that have a bit of "bounce" at the end. Animations are quick (100-250ms for micro, 300-500ms for reveals) so they feel responsive rather than decorative.

### Easing

- **Spring (GSAP `elastic.out(1, 0.5)`)**: scale-in effects, metric callouts, active indicators
- **Power3.out (GSAP)**: scroll reveals, card entrances — fast start, gentle settle
- **Power2.out**: hover transitions, color changes — smooth, no overshoot
- **CSS `cubic-bezier(0.16, 1, 0.3, 1)`**: UI micro-interactions (Linear's signature curve — quick snap with slight deceleration)

### Scroll-Triggered Reveals (GSAP + ScrollTrigger)

| Element | Animation | Duration | Stagger | Easing |
|---------|-----------|----------|---------|--------|
| Hero content (name, title, tagline) | Fade up 20px, opacity 0→1 | 0.6s | 0.1s | Power3.out |
| Skills grid cards | Fade up 24px, opacity 0→1, scale 0.96→1 | 0.5s | 0.08s | Power3.out |
| Experience cards | Fade up 30px, opacity 0→1, scale 0.97→1 | 0.55s | 0.12s | Power3.out |
| Metric callouts (inside cards) | Scale 0.9→1, opacity 0→1 | 0.4s | 0.06s | elastic.out(1, 0.5) |
| Sub-section cards (inside experience) | Fade up 16px, opacity 0→1 | 0.35s | 0.05s | Power2.out |
| Internship card | Fade up 20px, opacity 0→1 | 0.5s | — | Power3.out |
| Education / Open Source cards | Fade up 20px, opacity 0→1 | 0.45s | 0.08s | Power3.out |

All reveals use `start: 'top 85%'` so cards animate just as they enter the viewport — feels responsive, not pre-loaded.

### Hover Micro-Interactions

- **Cards**: border #E8ECF2 → #2563EB, plus `box-shadow: 0 0 0 1px rgba(37,99,235,0.08)` ring. 150ms, `cubic-bezier(0.16, 1, 0.3, 1)`
- **Skill/tech tags**: background fills #DBEAFE from #F3F4F6, text darkens. 120ms, `cubic-bezier(0.16, 1, 0.3, 1)`
- **Nav dots**: scale 1→1.4, glow ring appears. spring-like 200ms
- **Links (hero, footer)**: border-bottom width 1px→2px, slight Y shift -1px. 150ms
- **Metric boxes**: subtle scale 1→1.03 on hover with border highlight. 150ms

### Sidebar Navigation

- Active dot indicator: slides between sections with spring physics (GSAP `power2.inOut`, 300ms). Uses a floating highlight pill instead of just color change — more Linear-like.
- Dot hover: expands slightly + shows label text with 100ms fade-in
- Snaps to nearest section on fast scroll, no debounce delay

### Page-Level Polish

- **Initial load**: hero content fades in on mount (no scroll needed). Name first (0.15s delay), then typewriter starts (0.3s delay), tagline and links fade in after typewriter begins.
- **Smooth scroll**: `scroll-behavior: smooth` (already set) — keep this for nav clicks
- **Focus ring**: any interactive element on keyboard focus gets a 2px accent ring with 2px offset, animated in (like Linear's command menu focus style)

### Hero Typewriter

- Keep existing GSAP typewriter implementation (unchanged)
- Blink cursor: keep, but use 0.8s step-end (slightly faster, more modern)
- After typing completes, cursor can pause for 2s, then disappear (CSS transition opacity)

## Implementation Notes

### Files to Modify
- `uno.config.ts` — update shortcuts, add breakpoints, refine theme
- `src/styles/global.css` — update responsive rules
- `src/App.vue` — update layout structure
- `src/components/HeroSection.vue` — card treatment, dot grid bg, remove 80vh
- `src/components/SkillsSection.vue` — grid layout, responsive columns
- `src/components/ExperienceSection.vue` — wider cards
- `src/components/ExperienceCard.vue` — 2-col sub-sections, inline metrics
- `src/components/MetricCallout.vue` — refined metric box styling
- `src/components/InternshipSection.vue` — layout restructure
- `src/components/EducationSection.vue` — layout restructure
- `src/components/SidebarNav.vue` — reposition for wider content
- `src/components/FooterSection.vue` — minor refinements

### What Stays the Same
- All data in `src/data/resume.ts`
- GSAP typewriter composable
- Active section composable
- Vue 3 + TypeScript + UnoCSS + Vite stack
- Font loading from Google Fonts
- PDF link
- Mobile bottom nav pattern (dressed up visually)

### Scope Boundaries
- No dark mode (deferred)
- No new sections or content changes
- No new dependencies
