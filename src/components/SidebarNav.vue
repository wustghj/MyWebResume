<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  sections: { id: string; label: string }[]
  activeSection: string
}>()

function scrollTo(id: string) {
  const el = document.querySelector(`[data-section-id="${id}"]`)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

// Floating pill position
const pillStyle = ref({ top: '0px', height: '0px' })
const sidebarLeft = ref('12px')
const itemRefMap = new Map<string, HTMLElement>()

function updatePosition() {
  const content = document.querySelector('.content-width')
  if (content) {
    const rect = content.getBoundingClientRect()
    sidebarLeft.value = `${Math.max(rect.left - 56, 12)}px`
  }
}

function setItemRef(id: string) {
  return (el: any) => {
    if (el) itemRefMap.set(id, el as HTMLElement)
  }
}

function updatePill() {
  const el = itemRefMap.get(props.activeSection)
  if (el && el.parentElement) {
    const parentRect = el.parentElement.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()
    pillStyle.value = {
      top: `${elRect.top - parentRect.top}px`,
      height: `${elRect.height}px`,
    }
  }
}

watch(() => props.activeSection, () => {
  requestAnimationFrame(updatePill)
})

const onResize = () => {
  requestAnimationFrame(() => {
    updatePosition()
    updatePill()
  })
}

onMounted(() => {
  requestAnimationFrame(() => {
    updatePosition()
    updatePill()
  })
  window.addEventListener('resize', onResize)
  window.addEventListener('scroll', updatePosition, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
  window.removeEventListener('scroll', updatePosition)
})
</script>

<template>
  <!-- Desktop sidebar -->
  <nav class="sidebar" :style="{ left: sidebarLeft }">
    <div class="nav-list-wrapper" style="position: relative;">
      <!-- Floating pill -->
      <div
        class="nav-pill"
        :style="{ top: pillStyle.top, height: pillStyle.height }"
      />
      <ul class="nav-list">
        <li
          v-for="s in sections"
          :key="s.id"
          :ref="setItemRef(s.id)"
          class="nav-item"
          :class="{ active: activeSection === s.id }"
          @click="scrollTo(s.id)"
        >
          <span class="nav-dot" />
          <span class="nav-label">{{ s.label }}</span>
        </li>
      </ul>
    </div>
  </nav>

  <!-- Mobile bottom nav -->
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
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  transition: left 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.nav-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
}

/* Floating pill background */
.nav-pill {
  position: absolute;
  left: 0;
  right: 0;
  background: rgba(37, 99, 235, 0.08);
  border-radius: 8px;
  transition: top 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              height 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;
  z-index: 0;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 8px 10px;
  border-radius: 8px;
  transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  z-index: 1;
}

.nav-item:hover .nav-label {
  opacity: 1;
}

.nav-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #D1D5DB;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  flex-shrink: 0;
}

.nav-item.active .nav-dot {
  background: #2563EB;
  box-shadow: 0 0 8px rgba(37, 99, 235, 0.4);
  transform: scale(1.3);
}

.nav-label {
  font-size: 12px;
  color: #6B7280;
  opacity: 0;
  transition: opacity 0.15s ease;
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
    border-top: 1px solid #E8ECF2;
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
