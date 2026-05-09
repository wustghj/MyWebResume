<script setup lang="ts">
import { personalInfo } from '@/data/resume'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer section-padding">
    <p class="footer-text">{{ personalInfo.name }} &copy; {{ year }}</p>
    <a :href="`mailto:${personalInfo.email}`" class="footer-email">{{ personalInfo.email }}</a>
  </footer>
</template>

<style scoped>
.footer {
  text-align: center;
  padding-top: clamp(24px, 3vw, 40px);
  padding-bottom: clamp(24px, 3vw, 40px);
  border-top: 1px solid #E8ECF2;
}

.footer-text {
  font-size: clamp(0.7rem, 0.85vw, 0.8rem);
  color: #6B7280;
  margin-bottom: 6px;
}

.footer-email {
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(0.65rem, 0.8vw, 0.75rem);
  color: #2563EB;
  text-decoration: none;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  border-bottom: 1px solid transparent;
}

.footer-email:hover {
  border-bottom-color: #2563EB;
}
</style>
