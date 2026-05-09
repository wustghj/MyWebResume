<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { useTypewriter } from '@/composables/useTypewriter'
import { personalInfo } from '@/data/resume'

const subtitleRef = ref<HTMLElement | null>(null)
const heroCard = ref<HTMLElement | null>(null)
let tl: gsap.core.Timeline | null = null

onMounted(() => {
  // Initial load animation
  tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  tl.fromTo('.hero-name', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.15 })
  tl.fromTo('.hero-name-en', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
  tl.fromTo('.hero-title-wrap', { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2')
  tl.fromTo('.hero-tagline', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
  tl.fromTo('.hero-links', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')

  tl.call(() => {
    useTypewriter(subtitleRef, personalInfo.title, { duration: 1.5, delay: 0 })
  })

  // Parallax on scroll
  const onScroll = () => {
    if (!heroCard.value) return
    const scrollY = window.scrollY
    const cardTop = heroCard.value.getBoundingClientRect().top + scrollY
    const offset = scrollY - cardTop
    const heroHeight = heroCard.value.offsetHeight

    if (offset > -heroHeight && offset < heroHeight) {
      const pct = offset / heroHeight
      const grid = heroCard.value.querySelector('.hero-dot-grid') as HTMLElement
      const blob = heroCard.value.querySelector('.hero-blob') as HTMLElement
      if (grid) {
        grid.style.transform = `translate(${pct * 30}px, ${pct * 20}px)`
      }
      if (blob) {
        blob.style.transform = `translate(${pct * -40}px, ${pct * -30}px) scale(${1 + pct * 0.3})`
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true })

  onUnmounted(() => {
    tl?.kill()
    window.removeEventListener('scroll', onScroll)
  })
})
</script>

<template>
  <section data-section-id="hero" ref="heroCard" class="hero-card">
    <div class="hero-dot-grid" />
    <div class="hero-blob" />
    <div class="hero-gradient" />
    <div class="hero-content">
      <h1 class="hero-name">{{ personalInfo.name }}</h1>
      <p class="hero-name-en">{{ personalInfo.nameEn }}</p>
      <p class="hero-title-wrap">
        <span ref="subtitleRef" class="typewriter-text"></span><span class="cursor-blink">|</span>
      </p>
      <p class="hero-tagline">{{ personalInfo.tagline }}</p>
      <div class="hero-links">
        <a :href="personalInfo.pdfPath" target="_blank" class="hero-link">
          View Resume PDF
          <span class="hero-link-arrow">→</span>
        </a>
        <a :href="`https://${personalInfo.github}`" target="_blank" class="hero-link">
          GitHub
          <span class="hero-link-arrow">→</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-card {
  position: relative;
  overflow: hidden;
  background: linear-gradient(160deg, #FAFAFA 0%, #F0F4FF 40%, #FAFAFA 100%);
  border: 1px solid #E8ECF2;
  border-radius: 16px;
  padding: clamp(48px, 6vw, 96px) clamp(32px, 5vw, 80px);
  margin-top: clamp(12px, 2vw, 32px);
  margin-bottom: clamp(24px, 3vw, 48px);
}

.hero-dot-grid {
  position: absolute;
  top: -20%;
  right: -5%;
  width: clamp(300px, 35vw, 500px);
  height: clamp(300px, 35vw, 500px);
  background-image: radial-gradient(circle, #DBEAFE 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.4;
  border-radius: 50%;
  pointer-events: none;
  will-change: transform;
}

.hero-blob {
  position: absolute;
  bottom: 10%;
  right: 25%;
  width: clamp(80px, 10vw, 160px);
  height: clamp(80px, 10vw, 160px);
  background: #2563EB;
  border-radius: 50%;
  opacity: 0.06;
  filter: blur(40px);
  pointer-events: none;
  will-change: transform;
}

.hero-gradient {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 20% 50%, rgba(37, 99, 235, 0.03) 0%, transparent 60%);
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-name {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  letter-spacing: 0.01em;
  margin-bottom: 4px;
  line-height: 1.15;
}

.hero-name-en {
  font-size: clamp(0.85rem, 1.2vw, 1.1rem);
  color: #9CA3AF;
  margin-bottom: clamp(16px, 2vw, 24px);
}

.hero-title-wrap {
  font-size: clamp(0.95rem, 1.4vw, 1.2rem);
  font-family: 'JetBrains Mono', monospace;
  color: #2563EB;
  margin-bottom: clamp(12px, 1.5vw, 20px);
  min-height: 1.8rem;
}

.cursor-blink {
  animation: blink 0.8s step-end infinite;
}

.hero-tagline {
  font-size: clamp(0.9rem, 1.1vw, 1.05rem);
  color: #6B7280;
  max-width: min(540px, 50vw);
  line-height: 1.65;
  margin-bottom: clamp(24px, 3vw, 36px);
}

.hero-links {
  display: flex;
  gap: clamp(20px, 3vw, 32px);
  flex-wrap: wrap;
}

.hero-link {
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(0.8rem, 1vw, 0.9rem);
  color: #2563EB;
  text-decoration: none;
  padding: 8px 0;
  border-bottom: 1px solid #2563EB;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.hero-link-arrow {
  display: inline-block;
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.hero-link:hover {
  color: #1D4ED8;
  border-bottom-width: 2px;
  gap: 8px;
}

.hero-link:hover .hero-link-arrow {
  transform: translateX(3px);
}

@media (max-width: 768px) {
  .hero-card {
    border-radius: 0;
    border-left: none;
    border-right: none;
    margin-top: 0;
  }
}
</style>
