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

## Animations (GSAP + ScrollTrigger)

### Scroll Reveals
- Skills grid: stagger 80ms, opacity+fade-up 16px + scale 0.98→1
- Experience cards: stagger 150ms, opacity+fade-up 30px + scale
- Metrics: scale-in with slight elastic ease for visual impact
- Internship/Education: same fade-up pattern

### Micro-interactions
- Card hover: border color transition 150ms ease
- Tag hover: background/text color transition 150ms ease
- Nav dot: scale + glow transition 200ms ease
- Links: border-bottom expands on hover 200ms ease

### Hero Typewriter
- Keep existing GSAP typewriter implementation (unchanged)
- Keep blink cursor animation (unchanged)

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
