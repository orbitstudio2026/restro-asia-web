import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { reduced } from '../lib/motion'
import { MaskedTextReveal } from './ui/text-reveal-mask'


export function Story() {
  const root = useRef<HTMLElement>(null)
  useGSAP(() => {
    if (reduced()) return
    gsap.from('.stat', { y: 40, autoAlpha: 0, stagger: 0.1, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.stats', start: 'top 85%' } })
    gsap.utils.toArray<HTMLElement>('.num').forEach((el) => {
      const o = { v: 0 }
      gsap.to(o, { v: +el.dataset.to!, duration: 2, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' }, onUpdate: () => { el.textContent = String(Math.round(o.v)) } })
    })
  }, { scope: root })
  return (
    <section id="story" ref={root} className="relative bg-seigaiha py-[clamp(72px,14vw,180px)]">
      <div className="wrap grid gap-12 lg:grid-cols-[200px_1fr]">
        <p className="label text-vermilion">Our story</p>
        <div>
          {/* 21st.dev Text Reveal (Mask): words rise out of a line mask as the paragraph enters view */}
          <MaskedTextReveal
            splitBy="words"
            stagger={0.035}
            duration={0.9}
            viewportMargin="0px 0px -15% 0px"
            className="max-w-[28ch] font-body text-[clamp(1.5rem,3.6vw,3.4rem)] font-semibold leading-[1.22] tracking-[-.02em] md:max-w-[30ch] [&_strong]:font-display [&_strong]:font-normal [&_strong]:text-vermilion"
          >
            Oriental food is not just food — it is an <strong>experience</strong> of many cultures. We balance traditional and modern tastes, delightful veggies and delicious sauces, with one motto: serve you better, with quality food and love. Restro~Asia is not just a restaurant. It’s an <strong>emotion.</strong>
          </MaskedTextReveal>
          <StatsRow />
        </div>
      </div>
    </section>
  )
}

import { categories } from '../data/menu'
function StatsRow() {
  const all = categories.flatMap((c) => c.dishes)
  const stats = [
    [all.length, 'Dishes & drinks on the 2026 menu'],
    [all.filter((d) => d.jain).length, 'Jain-friendly dishes'],
    [categories[0].dishes.length, 'Ramen bowls'],
  ] as const
  return (
    <div className="stats mt-20 grid gap-8 border-t border-ink/15 pt-10 sm:grid-cols-3">
      {stats.map(([n, l]) => (
        <div key={l} className="stat">
          <span className="num font-body text-6xl font-extrabold tracking-tight text-vermilion md:text-7xl" data-to={n}>{n}</span>
          <p className="mt-2 text-ink-60">{l}</p>
        </div>
      ))}
    </div>
  )
}
