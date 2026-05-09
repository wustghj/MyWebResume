<script setup lang="ts">
import type { Experience } from '@/data/resume'
import MetricCallout from './MetricCallout.vue'

defineProps<{
  experience: Experience
}>()
</script>

<template>
  <div class="experience-card card card-hover">
    <div class="exp-header">
      <div class="exp-company-row">
        <span class="exp-company">{{ experience.company }}</span>
        <span class="exp-separator">·</span>
        <span class="exp-role">{{ experience.role }}</span>
      </div>
      <span class="exp-period">{{ experience.period }}</span>
    </div>

    <h3 class="exp-project-title">{{ experience.projectTitle }}</h3>
    <p class="exp-subtitle">{{ experience.subtitle }}</p>

    <MetricCallout v-if="experience.metrics?.length" :metrics="experience.metrics" />

    <div class="exp-sub-sections">
      <div
        v-for="sub in experience.subSections"
        :key="sub.title"
        class="sub-card"
      >
        <h4 class="exp-sub-title">{{ sub.title }}</h4>
        <ul class="exp-bullets">
          <li v-for="b in sub.bullets" :key="b">{{ b }}</li>
        </ul>
        <div v-if="sub.techTags?.length" class="exp-sub-tags">
          <span
            v-for="t in sub.techTags"
            :key="t"
            class="tag tag-hover"
          >{{ t }}</span>
        </div>
      </div>
    </div>

    <div class="exp-tech-row">
      <span
        v-for="t in experience.techStack"
        :key="t"
        class="tag tag-hover exp-tech-tag"
      >{{ t }}</span>
    </div>
  </div>
</template>

<style scoped>
.experience-card {
  margin-bottom: clamp(20px, 2.5vw, 36px);
}

.exp-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 8px;
}

.exp-company-row {
  font-size: clamp(0.8rem, 1vw, 0.95rem);
  color: #6B7280;
}

.exp-company {
  font-weight: 500;
  color: #1A1A1A;
}

.exp-separator {
  margin: 0 8px;
  color: #D1D5DB;
}

.exp-role {
  font-size: clamp(0.75rem, 0.9vw, 0.85rem);
}

.exp-period {
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(0.7rem, 0.85vw, 0.8rem);
  color: #9CA3AF;
}

.exp-project-title {
  font-family: 'Noto Serif SC', 'Lora', serif;
  font-size: clamp(1.2rem, 1.8vw, 1.6rem);
  font-weight: 600;
  margin-bottom: 6px;
}

.exp-subtitle {
  font-size: clamp(0.8rem, 0.95vw, 0.9rem);
  color: #6B7280;
  margin-bottom: 8px;
}

.exp-sub-sections {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(12px, 1.5vw, 20px);
  margin-bottom: clamp(16px, 2vw, 28px);
}

.sub-card {
  background: #FAFAFA;
  border: 1px solid #F0F1F3;
  border-radius: 8px;
  padding: clamp(16px, 2vw, 24px);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.sub-card:hover {
  border-color: #DBEAFE;
  background: #F0F4FF;
}

.exp-sub-title {
  font-family: 'Inter', sans-serif;
  font-size: clamp(0.8rem, 0.95vw, 0.9rem);
  font-weight: 600;
  margin-bottom: 8px;
  color: #1F2937;
}

.exp-bullets {
  list-style: none;
  padding: 0;
  margin-bottom: 12px;
}

.exp-bullets li {
  position: relative;
  padding-left: 16px;
  font-size: clamp(0.75rem, 0.9vw, 0.85rem);
  color: #4B5563;
  line-height: 1.65;
  margin-bottom: 6px;
}

.exp-bullets li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: #D1D5DB;
}

.exp-sub-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.exp-tech-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding-top: clamp(14px, 2vw, 20px);
  border-top: 1px solid #F0F1F3;
}

.exp-tech-tag {
  font-size: clamp(0.65rem, 0.8vw, 0.75rem);
  background: #FAFAFA;
}

@media (max-width: 768px) {
  .exp-sub-sections {
    grid-template-columns: 1fr;
  }
}
</style>
