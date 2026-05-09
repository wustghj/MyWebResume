<script setup lang="ts">
defineProps<{
  metrics: { value: string; label: string }[]
}>()
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
  gap: 10px;
  flex-wrap: wrap;
  margin: 18px 0;
}

.metric-box {
  background: #F0F4FF;
  border: 1px solid #DBEAFE;
  border-radius: 8px;
  padding: 10px 18px;
  text-align: center;
  flex: 1;
  min-width: 100px;
  transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);
}

.metric-value {
  font-family: 'JetBrains Mono', monospace;
  font-size: 1rem;
  font-weight: 600;
  color: #2563EB;
}

.metric-label {
  font-size: 10px;
  color: #6B7280;
  margin-top: 3px;
}
</style>
