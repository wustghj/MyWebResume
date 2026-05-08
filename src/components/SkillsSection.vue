<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { skillGroups } from '@/data/resume'

let triggers: ScrollTrigger[] = []

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  const groups = document.querySelectorAll('.skill-group')
  const tl = gsap.fromTo(
    groups,
    { opacity: 0, y: 24 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#skills-section',
        start: 'top 75%',
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
  <section id="skills-section" data-section-id="skills" class="pt-8 pb-24">
    <h2 class="section-heading">Skills</h2>
    <div class="skills-grid">
      <div
        v-for="group in skillGroups"
        :key="group.category"
        class="skill-group card"
      >
        <h3 class="skill-category">{{ group.category }}</h3>
        <div class="skill-tags">
          <span
            v-for="skill in group.skills"
            :key="skill"
            class="tag skill-tag"
          >{{ skill }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-heading {
  font-size: 1.75rem;
  margin-bottom: 28px;
}

.skills-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.skill-category {
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  margin-bottom: 12px;
  color: #1A1A1A;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-tag {
  transition: all 0.2s ease;
  cursor: default;
}

.skill-tag:hover {
  border-color: #2563EB;
  color: #2563EB;
  background: #DBEAFE;
}
</style>
