<script setup lang="ts">
defineProps<{
  metrics: { value: string; label: string }[]
}>()
</script>

<template>
  <div class="metrics-row">
    <div v-for="m in metrics" :key="m.label" class="metric-box">
      <div class="metric-value">{{ m.value }}</div>
      <div class="metric-label">{{ m.label }}</div>
    </div>
  </div>
</template>

<style scoped>
.metrics-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin: 16px 0;
}

.metric-box {
  background: #DBEAFE;
  border-radius: 8px;
  padding: 12px 20px;
  text-align: center;
  flex: 1;
  min-width: 120px;
}

.metric-value {
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.25rem;
  font-weight: 600;
  color: #2563EB;
}

.metric-label {
  font-size: 0.8rem;
  color: #6B7280;
  margin-top: 4px;
}
</style>
