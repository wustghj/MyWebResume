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
