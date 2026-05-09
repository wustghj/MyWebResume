<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { useTypewriter } from '@/composables/useTypewriter'
import { personalInfo } from '@/data/resume'

const subtitleRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  tl.fromTo('.hero-name', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.15 })
  tl.fromTo('.hero-name-en', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.3')
  tl.fromTo('.hero-title-wrap', { opacity: 0 }, { opacity: 1, duration: 0.3 }, '-=0.1')
  tl.fromTo('.hero-tagline', { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.1')
  tl.fromTo('.hero-links', { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2')

  tl.call(() => {
    useTypewriter(subtitleRef, personalInfo.title, { duration: 1.5, delay: 0 })
  }, undefined, '+=0')
})
</script>

<template>
  <section data-section-id="hero" class="hero-card">
    <div class="hero-dot-grid" />
    <div class="hero-blob" />
    <div class="hero-content">
      <h1 class="hero-name">{{ personalInfo.name }}</h1>
      <p class="hero-name-en">{{ personalInfo.nameEn }}</p>
      <p class="hero-title-wrap">
        <span ref="subtitleRef" class="typewriter-text"></span><span class="cursor-blink">|</span>
      </p>
      <p class="hero-tagline">{{ personalInfo.tagline }}</p>
      <div class="hero-links">
        <a :href="personalInfo.pdfPath" target="_blank" class="hero-link">View Resume PDF</a>
        <a :href="`https://${personalInfo.github}`" target="_blank" class="hero-link">GitHub</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-card {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #FAFAFA 0%, #F0F4FF 100%);
  border: 1px solid #E8ECF2;
  border-radius: 12px;
  padding: 48px 40px;
  margin-top: 8px;
  margin-bottom: 16px;
}

.hero-dot-grid {
  position: absolute;
  top: -30%;
  right: -8%;
  width: 280px;
  height: 280px;
  background-image: radial-gradient(circle, #DBEAFE 1px, transparent 1px);
  background-size: 18px 18px;
  opacity: 0.5;
  border-radius: 50%;
  pointer-events: none;
}

.hero-blob {
  position: absolute;
  bottom: 8%;
  right: 22%;
  width: 80px;
  height: 80px;
  background: #DBEAFE;
  border-radius: 50%;
  opacity: 0.15;
  filter: blur(24px);
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-name {
  font-size: clamp(1.75rem, 3.5vw, 1.75rem);
  font-weight: 700;
  letter-spacing: 0.02em;
  margin-bottom: 2px;
}

.hero-name-en {
  font-size: 13px;
  color: #9CA3AF;
  margin-bottom: 14px;
}

.hero-title-wrap {
  font-size: 14px;
  font-family: 'JetBrains Mono', monospace;
  color: #2563EB;
  margin-bottom: 10px;
  min-height: 1.5rem;
}

.cursor-blink {
  animation: blink 0.8s step-end infinite;
}

.hero-tagline {
  font-size: 13px;
  color: #6B7280;
  max-width: 480px;
  line-height: 1.6;
  margin-bottom: 20px;
}

.hero-links {
  display: flex;
  gap: 20px;
}

.hero-link {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: #2563EB;
  text-decoration: none;
  padding-bottom: 2px;
  border-bottom: 1px solid #2563EB;
  transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);
}

.hero-link:hover {
  color: #1D4ED8;
  border-bottom-width: 2px;
  padding-bottom: 1px;
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .hero-card {
    padding: 32px 24px;
    border-radius: 0;
    border-left: none;
    border-right: none;
    margin-top: 0;
  }
  .hero-dot-grid {
    width: 180px;
    height: 180px;
    top: -20%;
    right: -15%;
  }
}
</style>
