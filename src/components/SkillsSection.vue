<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { skillGroups } from '@/data/resume'

let triggers: ScrollTrigger[] = []

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  const groups = document.querySelectorAll('.skill-group')
  groups.forEach((group, i) => {
    const isEven = i % 2 === 0
    const tl = gsap.fromTo(
      group,
      {
        opacity: 0,
        y: 50,
        x: isEven ? -40 : 40,
        scale: 0.92,
      },
      {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        duration: 0.65,
        delay: i * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: group,
          start: 'top 90%',
        },
      },
    )
    if (tl.scrollTrigger) triggers.push(tl.scrollTrigger as ScrollTrigger)
  })
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
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  font-weight: 600;
  margin-bottom: clamp(1.5rem, 2.5vw, 2.5rem);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: clamp(14px, 1.5vw, 24px);
}

.skill-category {
  font-size: clamp(0.8rem, 1vw, 0.95rem);
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  margin-bottom: clamp(12px, 1.5vw, 18px);
  color: #1A1A1A;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(6px, 0.8vw, 10px);
}

@media (max-width: 1024px) {
  .skills-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>
