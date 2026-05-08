<script setup lang="ts">
defineProps<{
  sections: { id: string; label: string }[]
  activeSection: string
}>()

function scrollTo(id: string) {
  const el = document.querySelector(`[data-section-id="${id}"]`)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <nav class="sidebar">
    <ul class="nav-list">
      <li
        v-for="s in sections"
        :key="s.id"
        class="nav-item"
        :class="{ active: activeSection === s.id }"
        @click="scrollTo(s.id)"
      >
        <span class="nav-dot" />
        <span class="nav-label">{{ s.label }}</span>
      </li>
    </ul>
  </nav>

  <nav class="mobile-nav">
    <ul class="mobile-nav-list">
      <li
        v-for="s in sections"
        :key="s.id"
        class="mobile-nav-item"
        :class="{ active: activeSection === s.id }"
        @click="scrollTo(s.id)"
      >
        <span class="mobile-nav-dot" />
        <span class="mobile-nav-label">{{ s.label }}</span>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.sidebar {
  position: fixed;
  left: calc((100vw - 640px) / 2 - 80px);
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
}

.nav-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 6px 8px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.nav-item:hover .nav-label {
  opacity: 1;
  color: #2563EB;
}

.nav-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #D1D5DB;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.nav-item.active .nav-dot {
  background: #2563EB;
  box-shadow: 0 0 8px rgba(37, 99, 235, 0.4);
  transform: scale(1.3);
}

.nav-label {
  font-size: 13px;
  color: #6B7280;
  opacity: 0;
  transition: opacity 0.2s ease;
  white-space: nowrap;
}

.nav-item.active .nav-label {
  opacity: 1;
  color: #2563EB;
}

/* Mobile nav */
.mobile-nav {
  display: none;
}

@media (max-width: 1024px) {
  .sidebar {
    display: none;
  }

  .mobile-nav {
    display: block;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(8px);
    border-top: 1px solid #E5E7EB;
    z-index: 100;
    padding: 8px 0 env(safe-area-inset-bottom, 8px);
  }

  .mobile-nav-list {
    display: flex;
    justify-content: center;
    gap: 24px;
    list-style: none;
  }

  .mobile-nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    padding: 4px 8px;
    min-width: 48px;
  }

  .mobile-nav-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #D1D5DB;
    transition: all 0.2s ease;
  }

  .mobile-nav-item.active .mobile-nav-dot {
    background: #2563EB;
    box-shadow: 0 0 6px rgba(37, 99, 235, 0.4);
  }

  .mobile-nav-label {
    font-size: 11px;
    color: #6B7280;
  }

  .mobile-nav-item.active .mobile-nav-label {
    color: #2563EB;
  }
}
</style>
