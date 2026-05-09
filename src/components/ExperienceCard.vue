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
  margin-bottom: 20px;
}

.exp-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 6px;
}

.exp-company-row {
  font-size: 13px;
  color: #6B7280;
}

.exp-company {
  font-weight: 500;
  color: #1A1A1A;
}

.exp-separator {
  margin: 0 6px;
  color: #D1D5DB;
}

.exp-role {
  font-size: 12px;
}

.exp-period {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: #9CA3AF;
}

.exp-project-title {
  font-family: 'Noto Serif SC', 'Lora', serif;
  font-size: 1.15rem;
  font-weight: 600;
  margin-bottom: 2px;
}

.exp-subtitle {
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
}

.exp-sub-sections {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 16px;
}

.sub-card {
  background: #FAFAFA;
  border: 1px solid #F0F1F3;
  border-radius: 6px;
  padding: 14px;
}

.exp-sub-title {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 6px;
  color: #1F2937;
}

.exp-bullets {
  list-style: none;
  padding: 0;
  margin-bottom: 10px;
}

.exp-bullets li {
  position: relative;
  padding-left: 14px;
  font-size: 11px;
  color: #4B5563;
  line-height: 1.6;
  margin-bottom: 4px;
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
  gap: 4px;
}

.exp-tech-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding-top: 14px;
  border-top: 1px solid #F0F1F3;
}

.exp-tech-tag {
  font-size: 10px;
  background: #FAFAFA;
}

@media (max-width: 768px) {
  .exp-sub-sections {
    grid-template-columns: 1fr;
  }
}
</style>
