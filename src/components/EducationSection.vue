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
