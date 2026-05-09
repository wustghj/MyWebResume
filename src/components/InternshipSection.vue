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
