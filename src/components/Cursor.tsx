import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

/** Custom cursor ring. Elements opt in with data-cursor="Label". Disabled on touch. */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState('')
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const x = gsap.quickTo(ring.current, 'x', { duration: 0.35, ease: 'power3' })
    const y = gsap.quickTo(ring.current, 'y', { duration: 0.35, ease: 'power3' })
    let px = -100, py = -100
    const update = (el: Element | null) => {
      const t = el?.closest?.('[data-cursor]') as HTMLElement | null
      const interactive = el?.closest?.('a,button,[role=tab]')
      setLabel(t?.dataset.cursor ?? '')
      ring.current?.classList.toggle('is-big', !!t)
      ring.current?.classList.toggle('is-link', !!interactive && !t)
    }
    const move = (e: MouseEvent) => { px = e.clientX; py = e.clientY; x(px); y(py); update(e.target as Element) }
    // content moves under a still pointer while scrolling — re-check what's beneath it
    const scroll = () => update(document.elementFromPoint(px, py))
    window.addEventListener('mousemove', move)
    window.addEventListener('scroll', scroll, { passive: true })
    document.documentElement.classList.add('has-cursor')
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('scroll', scroll); document.documentElement.classList.remove('has-cursor') }
  }, [])
  return (
    <div ref={ring} aria-hidden className="ra-cursor pointer-events-none fixed left-0 top-0 z-[90] -ml-3 -mt-3 grid h-6 w-6 place-items-center rounded-full border border-gold/90 mix-blend-normal opacity-0 transition-[width,height,margin,background,opacity] duration-300 [.has-cursor_&]:opacity-100">
      <span className="label !text-[.7rem] text-ink opacity-0 transition-opacity">{label}</span>
    </div>
  )
}
