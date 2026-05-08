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
  padding-top: 48px;
  padding-bottom: 48px;
  border-top: 1px solid #E5E7EB;
}

.footer-text {
  font-size: 0.9rem;
  color: #6B7280;
  margin-bottom: 4px;
}

.footer-email {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  color: #2563EB;
  text-decoration: none;
}

.footer-email:hover {
  text-decoration: underline;
}
</style>
