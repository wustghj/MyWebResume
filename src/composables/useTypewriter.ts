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
      gsap.fromTo(
        el,
        { text: '' },
        {
          text,
          duration,
          delay,
          ease: 'none',
        },
      )
    })

    gsap.delayedCall(delay + duration, () => {
      el.style.setProperty('--cursor-visible', '1')
    })
  })

  onUnmounted(() => {
    ctx?.revert()
  })
}
