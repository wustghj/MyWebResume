import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export function useActiveSection(sectionIds: string[]): { activeSection: Ref<string> } {
  const activeSection = ref(sectionIds[0] ?? '')

  let observer: IntersectionObserver | null = null

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            activeSection.value = entry.target.getAttribute('data-section-id') ?? ''
          }
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
    )

    for (const id of sectionIds) {
      const el = document.querySelector(`[data-section-id="${id}"]`)
      if (el) observer.observe(el)
    }
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { activeSection }
}
