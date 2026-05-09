<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

defineProps<{
  metrics: { value: string; label: string }[]
}>()

let triggers: ScrollTrigger[] = []

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  const boxes = document.querySelectorAll('.metric-box')
  if (!boxes.length) return

  const tl = gsap.fromTo(
    boxes,
    { opacity: 0, scale: 0.8, y: 20 },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'elastic.out(1, 0.4)',
      scrollTrigger: {
        trigger: boxes[0].parentElement!,
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
  <div class="metrics-row">
    <div v-for="m in metrics" :key="m.label" class="metric-box metric-box-hover">
      <div class="metric-value">{{ m.value }}</div>
      <div class="metric-label">{{ m.label }}</div>
    </div>
  </div>
</template>

<style scoped>
.metrics-row {
  display: flex;
  gap: clamp(10px, 1.5vw, 20px);
  flex-wrap: wrap;
  margin: clamp(20px, 2.5vw, 36px) 0;
}

.metric-box {
  background: #F0F4FF;
  border: 1px solid #DBEAFE;
  border-radius: 12px;
  padding: clamp(14px, 1.5vw, 22px) clamp(20px, 2vw, 36px);
  text-align: center;
  flex: 1;
  min-width: clamp(100px, 12vw, 160px);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.metric-value {
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(1.1rem, 1.5vw, 1.6rem);
  font-weight: 600;
  color: #2563EB;
}

.metric-label {
  font-size: clamp(0.65rem, 0.75vw, 0.75rem);
  color: #6B7280;
  margin-top: 5px;
}
</style>
