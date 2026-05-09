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
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  font-weight: 600;
  margin-bottom: clamp(1.5rem, 2.5vw, 2.5rem);
}

.exp-header { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 12px; margin-bottom: 8px; }
.exp-company-row { font-size: clamp(0.8rem, 1vw, 0.95rem); color: #6B7280; }
.exp-company { font-weight: 500; color: #1A1A1A; }
.exp-separator { margin: 0 8px; color: #D1D5DB; }
.exp-role { font-size: clamp(0.75rem, 0.9vw, 0.85rem); }
.exp-period { font-family: 'JetBrains Mono', monospace; font-size: clamp(0.7rem, 0.85vw, 0.8rem); color: #9CA3AF; }
.exp-project-title { font-family: 'Noto Serif SC', 'Lora', serif; font-size: clamp(1.1rem, 1.6vw, 1.4rem); margin-bottom: clamp(12px, 2vw, 20px); }
.exp-bullets { list-style: none; padding: 0; margin-bottom: clamp(16px, 2vw, 24px); }
.exp-bullets li { position: relative; padding-left: 16px; font-size: clamp(0.8rem, 0.95vw, 0.9rem); color: #4B5563; line-height: 1.65; margin-bottom: 8px; }
.exp-bullets li::before { content: '—'; position: absolute; left: 0; color: #D1D5DB; }
.exp-tech-row { display: flex; flex-wrap: wrap; gap: 8px; padding-top: clamp(14px, 2vw, 20px); border-top: 1px solid #F0F1F3; }
</style>
