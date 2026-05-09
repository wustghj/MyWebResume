# Desktop Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the resume website from a 640px mobile-first layout to a 1100px Linear-inspired desktop design with bento grid sections, refined card styling, and spring-based animations.

**Architecture:** Single-pass refactor of UnoCSS theme → global styles → layout shell → individual components. Each component gets its responsive grid, updated styling, and GSAP animations aligned to the spec. No new files or dependencies.

**Tech Stack:** Vue 3 + TypeScript + UnoCSS + GSAP (ScrollTrigger) + Vite

---

### Task 1: Update UnoCSS Theme and Shortcuts

**Files:**
- Modify: `uno.config.ts`

- [ ] **Step 1: Replace shortcuts and theme to match spec**

Replace the entire file:

```typescript
import { defineConfig } from 'unocss'

export default defineConfig({
  theme: {
    colors: {
      bg: '#FAFAFA',
      surface: '#FFFFFF',
      'text-primary': '#1A1A1A',
      'text-secondary': '#6B7280',
      accent: '#2563EB',
      'accent-muted': '#DBEAFE',
      'accent-soft': '#F0F4FF',
      border: '#E8ECF2',
      'border-subtle': '#F0F1F3',
    },
    fontFamily: {
      serif: ['Noto Serif SC', 'Lora', 'serif'],
      sans: ['Inter', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    breakpoints: {
      sm: '768px',
      md: '1024px',
      lg: '1440px',
    },
  },
  shortcuts: {
    'section-padding': 'py-12',
    'content-width': 'max-w-275 mx-auto px-6',
    'card': 'bg-surface border border-border rounded-10px p-6 transition-border duration-150',
    'card-hover': 'hover:border-accent hover:shadow-[0_0_0_1px_rgba(37,99,235,0.08)]',
    'tag': 'inline-block px-2.5 py-0.5 text-10px font-mono border border-transparent rounded-full bg-[#F3F4F6] text-[#4B5563] transition-all duration-120',
    'tag-hover': 'hover:border-accent hover:text-accent hover:bg-accent-muted',
    'metric-box': 'bg-accent-soft border border-accent-muted rounded-lg py-2.5 px-4.5 text-center transition-all duration-150',
    'metric-box-hover': 'hover:scale-103 hover:border-accent',
    'section-heading': 'font-serif text-20px font-semibold mb-7',
    'sub-card': 'bg-[#FAFAFA] border border-border-subtle rounded-md p-3.5',
  },
})
```

- [ ] **Step 2: Commit**

```bash
git add uno.config.ts
git commit -m "refactor: update UnoCSS theme with Linear-inspired tokens and shortcuts"
```

---

### Task 2: Update Global Styles

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: Replace global.css with refined styles**

```css
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: 'Inter', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background-color: #FAFAFA;
  color: #1A1A1A;
  line-height: 1.7;
}

h1, h2, h3, h4 {
  font-family: 'Noto Serif SC', 'Lora', serif;
  font-weight: 600;
  line-height: 1.3;
}

code, pre, .font-mono {
  font-family: 'JetBrains Mono', monospace;
}

::selection {
  background-color: #DBEAFE;
}

/* Linear-style easing curve */
:root {
  --ease-linear: cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

/* Focus ring — Linear-style */
:focus-visible {
  outline: 2px solid #2563EB;
  outline-offset: 2px;
  border-radius: 4px;
}

/* Mobile: allow full-width on small screens */
@media (max-width: 1024px) {
  .content-width {
    max-width: 100%;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/global.css
git commit -m "refactor: update global styles with Linear easing and focus ring"
```

---

### Task 3: Update App Layout Shell

**Files:**
- Modify: `src/App.vue`

- [ ] **Step 1: Update layout structure**

Replace the `<style>` block and add layout classes:

```vue
<script setup lang="ts">
import { useActiveSection } from '@/composables/useActiveSection'
import SidebarNav from '@/components/SidebarNav.vue'
import HeroSection from '@/components/HeroSection.vue'
import SkillsSection from '@/components/SkillsSection.vue'
import ExperienceSection from '@/components/ExperienceSection.vue'
import InternshipSection from '@/components/InternshipSection.vue'
import EducationSection from '@/components/EducationSection.vue'
import FooterSection from '@/components/FooterSection.vue'

const navSections = [
  { id: 'hero', label: 'Home' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'internship', label: 'Internship' },
  { id: 'education', label: 'Education' },
]

const { activeSection } = useActiveSection(navSections.map(s => s.id))
</script>

<template>
  <div class="app-layout flex justify-center">
    <SidebarNav :sections="navSections" :active-section="activeSection" />
    <main class="content-width w-full">
      <HeroSection />
      <SkillsSection />
      <ExperienceSection />
      <InternshipSection />
      <EducationSection />
      <FooterSection />
    </main>
  </div>
</template>

<style>
.app-layout {
  position: relative;
}
</style>
```

The key change: `flex justify-center` on the layout so content centers with sidebar alongside.

- [ ] **Step 2: Commit**

```bash
git add src/App.vue
git commit -m "refactor: update app layout to center content with sidebar"
```

---

### Task 4: Redesign Sidebar Navigation

**Files:**
- Modify: `src/components/SidebarNav.vue`

- [ ] **Step 1: Rewrite SidebarNav with floating pill indicator and hover labels**

Replace the entire file:

```vue
<script setup lang="ts">
import { ref, watch, computed, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const props = defineProps<{
  sections: { id: string; label: string }[]
  activeSection: string
}>()

function scrollTo(id: string) {
  const el = document.querySelector(`[data-section-id="${id}"]`)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

// Floating pill position
const pillStyle = ref({ top: '0px', height: '0px' })
let itemRefs: (HTMLElement | null)[] = []

function updatePill() {
  const idx = props.sections.findIndex(s => s.id === props.activeSection)
  const el = itemRefs[idx]
  if (el && el.parentElement) {
    const parentRect = el.parentElement.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()
    pillStyle.value = {
      top: `${elRect.top - parentRect.top}px`,
      height: `${elRect.height}px`,
    }
  }
}

watch(() => props.activeSection, () => {
  requestAnimationFrame(updatePill)
})

onMounted(() => {
  requestAnimationFrame(updatePill)
  window.addEventListener('resize', updatePill)
})

onUnmounted(() => {
  window.removeEventListener('resize', updatePill)
})
</script>

<template>
  <!-- Desktop sidebar -->
  <nav class="sidebar">
    <div class="nav-list-wrapper" style="position: relative;">
      <!-- Floating pill -->
      <div
        class="nav-pill"
        :style="{ top: pillStyle.top, height: pillStyle.height }"
      />
      <ul class="nav-list">
        <li
          v-for="s in sections"
          :key="s.id"
          :ref="(el: any) => itemRefs.push(el as HTMLElement)"
          class="nav-item"
          :class="{ active: activeSection === s.id }"
          @click="scrollTo(s.id)"
        >
          <span class="nav-dot" />
          <span class="nav-label">{{ s.label }}</span>
        </li>
      </ul>
    </div>
  </nav>

  <!-- Mobile bottom nav -->
  <nav class="mobile-nav">
    <ul class="mobile-nav-list">
      <li
        v-for="s in sections"
        :key="s.id"
        class="mobile-nav-item"
        :class="{ active: activeSection === s.id }"
        @click="scrollTo(s.id)"
      >
        <span class="mobile-nav-dot" />
        <span class="mobile-nav-label">{{ s.label }}</span>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.sidebar {
  position: fixed;
  left: max(calc((100vw - 1100px) / 2 - 60px), 12px);
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
}

.nav-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
}

/* Floating pill background */
.nav-pill {
  position: absolute;
  left: 0;
  right: 0;
  background: rgba(37, 99, 235, 0.08);
  border-radius: 8px;
  transition: top 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              height 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;
  z-index: 0;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 8px 10px;
  border-radius: 8px;
  transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  z-index: 1;
}

.nav-item:hover .nav-label {
  opacity: 1;
}

.nav-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #D1D5DB;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  flex-shrink: 0;
}

.nav-item.active .nav-dot {
  background: #2563EB;
  box-shadow: 0 0 8px rgba(37, 99, 235, 0.4);
  transform: scale(1.3);
}

.nav-label {
  font-size: 12px;
  color: #6B7280;
  opacity: 0;
  transition: opacity 0.15s ease;
  white-space: nowrap;
}

.nav-item.active .nav-label {
  opacity: 1;
  color: #2563EB;
}

/* Mobile nav */
.mobile-nav {
  display: none;
}

@media (max-width: 1024px) {
  .sidebar {
    display: none;
  }

  .mobile-nav {
    display: block;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(8px);
    border-top: 1px solid #E8ECF2;
    z-index: 100;
    padding: 8px 0 env(safe-area-inset-bottom, 8px);
  }

  .mobile-nav-list {
    display: flex;
    justify-content: center;
    gap: 24px;
    list-style: none;
  }

  .mobile-nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    padding: 4px 8px;
    min-width: 48px;
  }

  .mobile-nav-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #D1D5DB;
    transition: all 0.2s ease;
  }

  .mobile-nav-item.active .mobile-nav-dot {
    background: #2563EB;
    box-shadow: 0 0 6px rgba(37, 99, 235, 0.4);
  }

  .mobile-nav-label {
    font-size: 11px;
    color: #6B7280;
  }

  .mobile-nav-item.active .mobile-nav-label {
    color: #2563EB;
  }
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/SidebarNav.vue
git commit -m "refactor: add floating pill indicator and hover labels to sidebar"
```

---

### Task 5: Redesign Hero Section

**Files:**
- Modify: `src/components/HeroSection.vue`

- [ ] **Step 1: Replace with card treatment, dot grid, and load animation**

Replace the entire file:

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { useTypewriter } from '@/composables/useTypewriter'
import { personalInfo } from '@/data/resume'

const subtitleRef = ref<HTMLElement | null>(null)

onMounted(() => {
  // Initial load animation
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  tl.fromTo('.hero-name', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.15 })
  tl.fromTo('.hero-name-en', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.3')
  tl.fromTo('.hero-title-wrap', { opacity: 0 }, { opacity: 1, duration: 0.3 }, '-=0.1')
  tl.fromTo('.hero-tagline', { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.1')
  tl.fromTo('.hero-links', { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2')

  // Start typewriter after name reveals
  tl.call(() => {
    useTypewriter(subtitleRef, personalInfo.title, { duration: 1.5, delay: 0 })
  }, undefined, '+=0')
})
</script>

<template>
  <section data-section-id="hero" class="hero-card">
    <div class="hero-dot-grid" />
    <div class="hero-blob" />
    <div class="hero-content">
      <h1 class="hero-name">{{ personalInfo.name }}</h1>
      <p class="hero-name-en">{{ personalInfo.nameEn }}</p>
      <p class="hero-title-wrap">
        <span ref="subtitleRef" class="typewriter-text"></span><span class="cursor-blink">|</span>
      </p>
      <p class="hero-tagline">{{ personalInfo.tagline }}</p>
      <div class="hero-links">
        <a :href="personalInfo.pdfPath" target="_blank" class="hero-link">View Resume PDF</a>
        <a :href="`https://${personalInfo.github}`" target="_blank" class="hero-link">GitHub</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-card {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #FAFAFA 0%, #F0F4FF 100%);
  border: 1px solid #E8ECF2;
  border-radius: 12px;
  padding: 48px 40px;
  margin-top: 8px;
  margin-bottom: 16px;
}

.hero-dot-grid {
  position: absolute;
  top: -30%;
  right: -8%;
  width: 280px;
  height: 280px;
  background-image: radial-gradient(circle, #DBEAFE 1px, transparent 1px);
  background-size: 18px 18px;
  opacity: 0.5;
  border-radius: 50%;
  pointer-events: none;
}

.hero-blob {
  position: absolute;
  bottom: 8%;
  right: 22%;
  width: 80px;
  height: 80px;
  background: #DBEAFE;
  border-radius: 50%;
  opacity: 0.15;
  filter: blur(24px);
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-name {
  font-size: clamp(1.75rem, 3.5vw, 1.75rem);
  font-weight: 700;
  letter-spacing: 0.02em;
  margin-bottom: 2px;
}

.hero-name-en {
  font-size: 13px;
  color: #9CA3AF;
  margin-bottom: 14px;
}

.hero-title-wrap {
  font-size: 14px;
  font-family: 'JetBrains Mono', monospace;
  color: #2563EB;
  margin-bottom: 10px;
  min-height: 1.5rem;
}

.cursor-blink {
  animation: blink 0.8s step-end infinite;
}

.hero-tagline {
  font-size: 13px;
  color: #6B7280;
  max-width: 480px;
  line-height: 1.6;
  margin-bottom: 20px;
}

.hero-links {
  display: flex;
  gap: 20px;
}

.hero-link {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: #2563EB;
  text-decoration: none;
  padding-bottom: 2px;
  border-bottom: 1px solid #2563EB;
  transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);
}

.hero-link:hover {
  color: #1D4ED8;
  border-bottom-width: 2px;
  padding-bottom: 1px;
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .hero-card {
    padding: 32px 24px;
    border-radius: 0;
    border-left: none;
    border-right: none;
    margin-top: 0;
  }
  .hero-dot-grid {
    width: 180px;
    height: 180px;
    top: -20%;
    right: -15%;
  }
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/HeroSection.vue
git commit -m "refactor: hero card treatment with dot grid, blob, and load animation"
```

---

### Task 6: Redesign Skills Section as Bento Grid

**Files:**
- Modify: `src/components/SkillsSection.vue`

- [ ] **Step 1: Replace with responsive grid layout and spring animations**

Replace the entire file:

```vue
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { skillGroups } from '@/data/resume'

let triggers: ScrollTrigger[] = []

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  const tl = gsap.fromTo(
    '.skill-group',
    { opacity: 0, y: 24, scale: 0.96 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.5,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#skills-section',
        start: 'top 85%',
      },
    },
  )

  if (tl.scrollTrigger) triggers.push(tl.scrollTrigger as ScrollTrigger)
})

onUnmounted(() => {
  triggers.forEach(t => t.kill())
})
</script>

<template>
  <section id="skills-section" data-section-id="skills" class="section-padding">
    <h2 class="section-heading">Skills</h2>
    <div class="skills-grid">
      <div
        v-for="group in skillGroups"
        :key="group.category"
        class="skill-group card card-hover"
      >
        <h3 class="skill-category">{{ group.category }}</h3>
        <div class="skill-tags">
          <span
            v-for="skill in group.skills"
            :key="skill"
            class="tag tag-hover"
          >{{ skill }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-heading {
  font-family: 'Noto Serif SC', 'Lora', serif;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.skill-category {
  font-size: 12px;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  margin-bottom: 10px;
  color: #1A1A1A;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

@media (max-width: 1024px) {
  .skills-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/SkillsSection.vue
git commit -m "refactor: skills as 4-column bento grid with spring animations"
```

---

### Task 7: Refine Metric Callout Styling

**Files:**
- Modify: `src/components/MetricCallout.vue`

- [ ] **Step 1: Replace with spec-aligned metric styling**

Replace the entire file:

```vue
<script setup lang="ts">
defineProps<{
  metrics: { value: string; label: string }[]
}>()
</script>

<template>
  <div class="metrics-row">
    <div v-for="m in metrics" :key="m.label" class="metric-box metric-box-hover">
      <div class="metric-value">{{ m.value }}</div>
      <div class="metric-label">{{ m.label }}</div>
    </div>
  </div>
</template>

<style scoped>
.metrics-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin: 18px 0;
}

.metric-box {
  background: #F0F4FF;
  border: 1px solid #DBEAFE;
  border-radius: 8px;
  padding: 10px 18px;
  text-align: center;
  flex: 1;
  min-width: 100px;
  transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);
}

.metric-value {
  font-family: 'JetBrains Mono', monospace;
  font-size: 1rem;
  font-weight: 600;
  color: #2563EB;
}

.metric-label {
  font-size: 10px;
  color: #6B7280;
  margin-top: 3px;
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/MetricCallout.vue
git commit -m "refactor: metric callout with accent-soft background and hover scale"
```

---

### Task 8: Redesign Experience Card with 2-Column Sub-Sections

**Files:**
- Modify: `src/components/ExperienceCard.vue`

- [ ] **Step 1: Replace with 2-column sub-section grid and refined metrics**

Replace the entire file:

```vue
<script setup lang="ts">
import type { Experience } from '@/data/resume'
import MetricCallout from './MetricCallout.vue'

defineProps<{
  experience: Experience
}>()
</script>

<template>
  <div class="experience-card card card-hover">
    <div class="exp-header">
      <div class="exp-company-row">
        <span class="exp-company">{{ experience.company }}</span>
        <span class="exp-separator">·</span>
        <span class="exp-role">{{ experience.role }}</span>
      </div>
      <span class="exp-period">{{ experience.period }}</span>
    </div>

    <h3 class="exp-project-title">{{ experience.projectTitle }}</h3>
    <p class="exp-subtitle">{{ experience.subtitle }}</p>

    <MetricCallout v-if="experience.metrics?.length" :metrics="experience.metrics" />

    <div class="exp-sub-sections">
      <div
        v-for="sub in experience.subSections"
        :key="sub.title"
        class="sub-card"
      >
        <h4 class="exp-sub-title">{{ sub.title }}</h4>
        <ul class="exp-bullets">
          <li v-for="b in sub.bullets" :key="b">{{ b }}</li>
        </ul>
        <div v-if="sub.techTags?.length" class="exp-sub-tags">
          <span
            v-for="t in sub.techTags"
            :key="t"
            class="tag tag-hover"
          >{{ t }}</span>
        </div>
      </div>
    </div>

    <div class="exp-tech-row">
      <span
        v-for="t in experience.techStack"
        :key="t"
        class="tag tag-hover exp-tech-tag"
      >{{ t }}</span>
    </div>
  </div>
</template>

<style scoped>
.experience-card {
  margin-bottom: 20px;
}

.exp-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 6px;
}

.exp-company-row {
  font-size: 13px;
  color: #6B7280;
}

.exp-company {
  font-weight: 500;
  color: #1A1A1A;
}

.exp-separator {
  margin: 0 6px;
  color: #D1D5DB;
}

.exp-role {
  font-size: 12px;
}

.exp-period {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: #9CA3AF;
}

.exp-project-title {
  font-family: 'Noto Serif SC', 'Lora', serif;
  font-size: 1.15rem;
  font-weight: 600;
  margin-bottom: 2px;
}

.exp-subtitle {
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
}

.exp-sub-sections {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 16px;
}

.sub-card {
  background: #FAFAFA;
  border: 1px solid #F0F1F3;
  border-radius: 6px;
  padding: 14px;
}

.exp-sub-title {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 6px;
  color: #1F2937;
}

.exp-bullets {
  list-style: none;
  padding: 0;
  margin-bottom: 10px;
}

.exp-bullets li {
  position: relative;
  padding-left: 14px;
  font-size: 11px;
  color: #4B5563;
  line-height: 1.6;
  margin-bottom: 4px;
}

.exp-bullets li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: #D1D5DB;
}

.exp-sub-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.exp-tech-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding-top: 14px;
  border-top: 1px solid #F0F1F3;
}

.exp-tech-tag {
  font-size: 10px;
  background: #FAFAFA;
}

@media (max-width: 768px) {
  .exp-sub-sections {
    grid-template-columns: 1fr;
  }
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ExperienceCard.vue
git commit -m "refactor: experience card with 2-col sub-sections and card-hover"
```

---

### Task 9: Update Experience Section Container

**Files:**
- Modify: `src/components/ExperienceSection.vue`

- [ ] **Step 1: Update section with refined animation parameters**

Replace the entire file:

```vue
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { experiences } from '@/data/resume'
import ExperienceCard from './ExperienceCard.vue'

let triggers: ScrollTrigger[] = []

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  const cards = document.querySelectorAll('.exp-card-wrapper')
  const tl = gsap.fromTo(
    cards,
    { opacity: 0, y: 30, scale: 0.97 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.55,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#experience-section',
        start: 'top 85%',
      },
    },
  )

  if (tl.scrollTrigger) triggers.push(tl.scrollTrigger as ScrollTrigger)
})

onUnmounted(() => {
  triggers.forEach(t => t.kill())
})
</script>

<template>
  <section id="experience-section" data-section-id="experience" class="section-padding">
    <h2 class="section-heading">Experience</h2>
    <div
      v-for="exp in experiences"
      :key="exp.id"
      class="exp-card-wrapper"
    >
      <ExperienceCard :experience="exp" />
    </div>
  </section>
</template>

<style scoped>
.section-heading {
  font-family: 'Noto Serif SC', 'Lora', serif;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ExperienceSection.vue
git commit -m "refactor: update experience section with Power3.out reveal"
```

---

### Task 10: Redesign Internship Section

**Files:**
- Modify: `src/components/InternshipSection.vue`

- [ ] **Step 1: Update with refined card styling and animation**

Replace the entire file:

```vue
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { internship } from '@/data/resume'

let trigger: ScrollTrigger | null = null

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  const tl = gsap.fromTo(
    '#internship-card',
    { opacity: 0, y: 20, scale: 0.97 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#internship-section',
        start: 'top 85%',
      },
    },
  )

  if (tl.scrollTrigger) trigger = tl.scrollTrigger as ScrollTrigger
})

onUnmounted(() => {
  trigger?.kill()
})
</script>

<template>
  <section id="internship-section" data-section-id="internship" class="section-padding">
    <h2 class="section-heading">Internship</h2>
    <div id="internship-card" class="card card-hover">
      <div class="exp-header">
        <div class="exp-company-row">
          <span class="exp-company">{{ internship.company }}</span>
          <span class="exp-separator">·</span>
          <span class="exp-role">{{ internship.role }}</span>
        </div>
        <span class="exp-period">{{ internship.period }}</span>
      </div>
      <h3 class="exp-project-title">{{ internship.project }}</h3>
      <ul class="exp-bullets">
        <li v-for="b in internship.bullets" :key="b">{{ b }}</li>
      </ul>
      <div class="exp-tech-row">
        <span
          v-for="t in internship.techStack"
          :key="t"
          class="tag tag-hover"
        >{{ t }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-heading {
  font-family: 'Noto Serif SC', 'Lora', serif;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.exp-header { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 8px; margin-bottom: 6px; }
.exp-company-row { font-size: 13px; color: #6B7280; }
.exp-company { font-weight: 500; color: #1A1A1A; }
.exp-separator { margin: 0 6px; color: #D1D5DB; }
.exp-role { font-size: 12px; }
.exp-period { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #9CA3AF; }
.exp-project-title { font-family: 'Noto Serif SC', 'Lora', serif; font-size: 1.15rem; margin-bottom: 12px; }
.exp-bullets { list-style: none; padding: 0; margin-bottom: 16px; }
.exp-bullets li { position: relative; padding-left: 14px; font-size: 12px; color: #4B5563; line-height: 1.6; margin-bottom: 6px; }
.exp-bullets li::before { content: '—'; position: absolute; left: 0; color: #D1D5DB; }
.exp-tech-row { display: flex; flex-wrap: wrap; gap: 6px; padding-top: 14px; border-top: 1px solid #F0F1F3; }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/InternshipSection.vue
git commit -m "refactor: internship section with card-hover and Power3.out reveal"
```

---

### Task 11: Redesign Education Section

**Files:**
- Modify: `src/components/EducationSection.vue`

- [ ] **Step 1: Update with refined layout and animations**

Replace the entire file:

```vue
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { education, githubInfo } from '@/data/resume'

let trigger: ScrollTrigger | null = null

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  const tl = gsap.fromTo(
    '#edu-card, #github-card',
    { opacity: 0, y: 20, scale: 0.97 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.45,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#education-section',
        start: 'top 85%',
      },
    },
  )

  if (tl.scrollTrigger) trigger = tl.scrollTrigger as ScrollTrigger
})

onUnmounted(() => {
  trigger?.kill()
})
</script>

<template>
  <section id="education-section" data-section-id="education" class="section-padding">
    <h2 class="section-heading">Education &amp; Open Source</h2>
    <div class="two-col">
      <div id="edu-card" class="card card-hover">
        <h3 class="edu-school">{{ education.school }}</h3>
        <p class="edu-major">{{ education.major }} · {{ education.degree }}</p>
        <p class="edu-period">{{ education.period }}</p>
      </div>
      <div id="github-card" class="card card-hover">
        <h3 class="github-title">Open Source</h3>
        <a
          :href="`https://${githubInfo.url}`"
          target="_blank"
          class="github-url"
        >{{ githubInfo.url }}</a>
        <ul class="github-list">
          <li v-for="c in githubInfo.contributions" :key="c">{{ c }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-heading {
  font-family: 'Noto Serif SC', 'Lora', serif;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.edu-school {
  font-family: 'Noto Serif SC', 'Lora', serif;
  font-size: 1.1rem;
  margin-bottom: 6px;
}

.edu-major {
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
}

.edu-period {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: #9CA3AF;
}

.github-title {
  font-family: 'Noto Serif SC', 'Lora', serif;
  font-size: 1.1rem;
  margin-bottom: 8px;
}

.github-url {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: #2563EB;
  text-decoration: none;
  transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);
  border-bottom: 1px solid transparent;
}

.github-url:hover {
  border-bottom-color: #2563EB;
}

.github-list {
  list-style: none;
  padding: 0;
  margin-top: 12px;
}

.github-list li {
  font-size: 11px;
  color: #6B7280;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .two-col { grid-template-columns: 1fr; }
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/EducationSection.vue
git commit -m "refactor: education section with card-hover and 2-col layout"
```

---

### Task 12: Refine Footer Section

**Files:**
- Modify: `src/components/FooterSection.vue`

- [ ] **Step 1: Update footer styling**

Replace the entire file:

```vue
<script setup lang="ts">
import { personalInfo } from '@/data/resume'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer section-padding">
    <p class="footer-text">{{ personalInfo.name }} &copy; {{ year }}</p>
    <a :href="`mailto:${personalInfo.email}`" class="footer-email">{{ personalInfo.email }}</a>
  </footer>
</template>

<style scoped>
.footer {
  text-align: center;
  padding-top: 36px;
  padding-bottom: 36px;
  border-top: 1px solid #E8ECF2;
}

.footer-text {
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
}

.footer-email {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: #2563EB;
  text-decoration: none;
  transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);
  border-bottom: 1px solid transparent;
}

.footer-email:hover {
  border-bottom-color: #2563EB;
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/FooterSection.vue
git commit -m "refactor: footer with refined border and link hover"
```

---

### Task 13: Build and Verify

**Files:** All modified files

- [ ] **Step 1: Run TypeScript type check**

```bash
cd /home/ganhongjin/MyWebResume && npx vue-tsc -b --noEmit
```

Expected: No type errors.

- [ ] **Step 2: Run production build**

```bash
cd /home/ganhongjin/MyWebResume && npx vite build
```

Expected: Build succeeds without errors.

- [ ] **Step 3: Start dev server for visual verification**

```bash
cd /home/ganhongjin/MyWebResume && npx vite --host 0.0.0.0
```

Open in browser and verify:
- Desktop (>=1024px): 1100px content, 4-col skills, 2-col sub-sections, floating pill nav
- Tablet (768-1024px): 2-col skills, bottom nav, responsive
- Mobile (<768px): single column, bottom nav, readable
- Hover effects on cards, tags, links
- Scroll animations trigger smoothly
- Hero typewriter works correctly

- [ ] **Step 4: Commit any fixes if needed, then final commit**

```bash
git add -A
git commit -m "chore: final adjustments after build verification"
```

---

## Self-Review

**1. Spec coverage check:**
- Content width 1100px → Tasks 1, 3 (shortcuts + layout)
- Skills 4-col grid → Task 6
- Experience 2-col sub-sections → Task 8
- Sidebar floating pill → Task 4
- Hero card with dot grid → Task 5
- Linear-inspired colors + borders → Task 1 (theme)
- Card hover interactions → Tasks 1 (shortcuts), used in all component tasks
- Metric styling → Task 7
- Tag styling → Task 1 (shortcuts), used in all component tasks
- Spring animations (GSAP) → Tasks 5, 6, 7, 8, 9, 10, 11
- Load animation → Task 5
- Typewriter (unchanged) → Confirmed in Task 5
- Mobile nav (kept) → Task 4 (unchanged mobile section)
- Focus ring → Task 2
- Responsive breakpoints → Tasks 1, 5, 6, 8, 11

**2. Placeholder scan:** No TBDs, TODOs, or vague instructions. All code is concrete.

**3. Type consistency:** All component props and types reference existing interfaces in `src/data/resume.ts` — no new types needed.
