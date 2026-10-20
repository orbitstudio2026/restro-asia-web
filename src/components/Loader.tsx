import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Logo, Mark } from './Lantern'

export function Loader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const counter = { v: 0 }
    const tl = gsap.timeline({ onComplete: () => { root.current!.style.display = 'none' } })
    tl.from('.ld-mark', { clipPath: 'inset(100% 0 0 0)', y: 20, duration: reduce ? 0.01 : 1.2, ease: 'expo.out' }, 0)
      .from('.ld-logo', { autoAlpha: 0, y: 16, duration: reduce ? 0.01 : 0.9, ease: 'expo.out' }, 0.35)
    tl.to(counter, { v: 100, duration: reduce ? 0.01 : 1.8, ease: 'power2.inOut', delay: 0, onUpdate: () => { root.current!.querySelector('.count')!.textContent = String(Math.round(counter.v)).padStart(3, '0') } })
      .to('.ld-inner', { autoAlpha: 0, y: -20, duration: 0.4 })
      .add(onDone)
      .to('.ld-l', { xPercent: -100, duration: 1.1, ease: 'expo.inOut' }, '<')
      .to('.ld-r', { xPercent: 100, duration: 1.1, ease: 'expo.inOut' }, '<')
  }, { scope: root })
  return (
    <div ref={root} className="fixed inset-0 z-[100] text-cream" aria-label="Loading">
      <div className="ld-l absolute inset-y-0 left-0 w-1/2 bg-lacquer" />
      <div className="ld-r absolute inset-y-0 right-0 w-1/2 bg-lacquer" />
      <div className="ld-inner absolute inset-0 grid place-items-center">
        <div className="flex flex-col items-center gap-6">
          <div className="ld-mark w-24 md:w-28"><Mark className="w-full" /></div>
          <div className="ld-logo w-56 md:w-72"><Logo className="w-full" /></div>
          <span className="count label text-gold/80">000</span>
        </div>
      </div>
    </div>
  )
}
