import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export let lenis: Lenis | null = null

export function useLenis(enabled: boolean) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (t: number) => lenis?.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => { gsap.ticker.remove(tick); lenis?.destroy(); lenis = null }
  }, [])

  useEffect(() => {
    if (!lenis) return
    enabled ? lenis.start() : lenis.stop()
  }, [enabled])
}

export function scrollToId(id: string) {
  const el = document.querySelector(id)
  if (!el) return
  if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -20, duration: 1.6 })
  else el.scrollIntoView({ behavior: 'smooth' })
}
