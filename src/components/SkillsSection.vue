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
