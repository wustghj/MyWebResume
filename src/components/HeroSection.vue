<script setup lang="ts">
import { ref } from 'vue'
import { useTypewriter } from '@/composables/useTypewriter'
import { personalInfo } from '@/data/resume'

const subtitleRef = ref<HTMLElement | null>(null)
useTypewriter(subtitleRef, personalInfo.title, { duration: 1.5, delay: 0.3 })
</script>

<template>
  <section data-section-id="hero" class="hero">
    <div class="hero-bg" />
    <h1 class="hero-name">{{ personalInfo.name }}</h1>
    <p class="hero-name-en">{{ personalInfo.nameEn }}</p>
    <p class="hero-title">
      <span ref="subtitleRef" class="typewriter-text"></span><span class="cursor-blink">|</span>
    </p>
    <p class="hero-tagline">{{ personalInfo.tagline }}</p>
    <div class="hero-links">
      <a :href="personalInfo.pdfPath" target="_blank" class="hero-link">View Resume PDF</a>
      <a :href="`https://${personalInfo.github}`" target="_blank" class="hero-link">GitHub</a>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  top: -50%;
  right: -30%;
  width: 600px;
  height: 600px;
  background-image: radial-gradient(circle, #DBEAFE 1px, transparent 1px);
  background-size: 24px 24px;
  opacity: 0.5;
  pointer-events: none;
}

.hero-name {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 700;
  letter-spacing: 0.02em;
  margin-bottom: 4px;
}

.hero-name-en {
  font-size: 1.1rem;
  color: #6B7280;
  margin-bottom: 16px;
}

.hero-title {
  font-size: 1.4rem;
  font-family: 'JetBrains Mono', monospace;
  color: #2563EB;
  margin-bottom: 16px;
  min-height: 2rem;
}

.cursor-blink {
  animation: blink 1s step-end infinite;
}

.hero-tagline {
  font-size: 1.05rem;
  color: #6B7280;
  max-width: 480px;
  line-height: 1.7;
  margin-bottom: 28px;
}

.hero-links {
  display: flex;
  gap: 20px;
}

.hero-link {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  color: #2563EB;
  text-decoration: none;
  padding-bottom: 2px;
  border-bottom: 1px solid #2563EB;
  transition: all 0.2s ease;
}

.hero-link:hover {
  color: #1D4ED8;
  border-color: #1D4ED8;
  padding-bottom: 4px;
}
</style>
