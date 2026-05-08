import { onMounted, onUnmounted, type Ref } from 'vue'
import gsap from 'gsap'

export function useTypewriter(
  elementRef: Ref<HTMLElement | null>,
  text: string,
  options?: { duration?: number; delay?: number },
): void {
  const { duration = 1.5, delay = 0.3 } = options ?? {}
  let ctx: ReturnType<typeof gsap.context> | null = null

  onMounted(() => {
    const el = elementRef.value
    if (!el) return

    ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay })

      // Animate a counter from 0 to text.length to simulate typing
      const obj = { charCount: 0 }
      tl.to(obj, {
        charCount: text.length,
        duration,
        ease: 'none',
        onUpdate: () => {
          el.textContent = text.slice(0, Math.round(obj.charCount))
        },
      })
    })
  })

  onUnmounted(() => {
    ctx?.revert()
  })
}
