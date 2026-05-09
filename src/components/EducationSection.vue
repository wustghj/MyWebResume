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
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  font-weight: 600;
  margin-bottom: clamp(1.5rem, 2.5vw, 2.5rem);
}

.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(14px, 1.5vw, 24px);
}

.edu-school {
  font-family: 'Noto Serif SC', 'Lora', serif;
  font-size: clamp(1.1rem, 1.5vw, 1.4rem);
  margin-bottom: 8px;
}

.edu-major {
  font-size: clamp(0.8rem, 0.95vw, 0.9rem);
  color: #6B7280;
  margin-bottom: 6px;
}

.edu-period {
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(0.7rem, 0.85vw, 0.8rem);
  color: #9CA3AF;
}

.github-title {
  font-family: 'Noto Serif SC', 'Lora', serif;
  font-size: clamp(1.1rem, 1.5vw, 1.4rem);
  margin-bottom: 10px;
}

.github-url {
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(0.75rem, 0.9vw, 0.85rem);
  color: #2563EB;
  text-decoration: none;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  border-bottom: 1px solid transparent;
}

.github-url:hover {
  border-bottom-color: #2563EB;
}

.github-list {
  list-style: none;
  padding: 0;
  margin-top: 14px;
}

.github-list li {
  font-size: clamp(0.75rem, 0.9vw, 0.85rem);
  color: #6B7280;
  line-height: 1.65;
}

@media (max-width: 768px) {
  .two-col { grid-template-columns: 1fr; }
}
</style>
