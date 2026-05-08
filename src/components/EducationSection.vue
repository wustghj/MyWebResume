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
    { opacity: 0, y: 24 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#education-section',
        start: 'top 80%',
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
      <div id="edu-card" class="card">
        <h3 class="edu-school">{{ education.school }}</h3>
        <p class="edu-major">{{ education.major }} · {{ education.degree }}</p>
        <p class="edu-period">{{ education.period }}</p>
      </div>
      <div id="github-card" class="card">
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
.section-heading { font-size: 1.75rem; margin-bottom: 28px; }
.two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

.edu-school { font-size: 1.15rem; margin-bottom: 6px; }
.edu-major { font-size: 0.95rem; color: #6B7280; margin-bottom: 4px; }
.edu-period { font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; color: #9CA3AF; }

.github-title { font-size: 1.15rem; margin-bottom: 8px; }
.github-url { font-family: 'JetBrains Mono', monospace; font-size: 0.9rem; color: #2563EB; text-decoration: none; }
.github-url:hover { text-decoration: underline; }
.github-list { list-style: none; padding: 0; margin-top: 12px; }
.github-list li { font-size: 0.9rem; color: #6B7280; line-height: 1.7; }

@media (max-width: 640px) {
  .two-col { grid-template-columns: 1fr; }
}
</style>
