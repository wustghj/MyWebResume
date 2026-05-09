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
  cards.forEach((card, i) => {
    const dir = i % 2 === 0 ? 60 : -60
    const tl = gsap.fromTo(
      card,
      { opacity: 0, y: 60, x: dir, scale: 0.94, rotateY: dir > 0 ? 2 : -2 },
      {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        rotateY: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
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
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  font-weight: 600;
  margin-bottom: clamp(1.5rem, 2.5vw, 2.5rem);
}
</style>
