import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const text = 'Oriental food is not just food — it is an experience of many cultures. We balance traditional and modern tastes, delightful veggies and delicious sauces, with one motto: serve you better, with quality food and love. Restro~Asia is not just a restaurant. It’s an emotion.'

export function Story() {
  const root = useRef<HTMLElement>(null)
  useGSAP(() => {
    gsap.fromTo('.sw', { opacity: 0.14 }, { opacity: 1, stagger: 0.05, ease: 'none', scrollTrigger: { trigger: '.story-p', start: 'top 80%', end: 'bottom 45%', scrub: 0.6 } })
    gsap.from('.stat', { y: 40, autoAlpha: 0, stagger: 0.1, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.stats', start: 'top 85%' } })
    gsap.utils.toArray<HTMLElement>('.num').forEach((el) => {
      const o = { v: 0 }
      gsap.to(o, { v: +el.dataset.to!, duration: 2, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' }, onUpdate: () => { el.textContent = String(Math.round(o.v)) } })
    })
  }, { scope: root })
  return (
    <section id="story" ref={root} className="relative bg-paper bg-[url(/gen/bg-paper.webp)] bg-cover bg-center py-[clamp(96px,14vw,180px)]">
      <div className="wrap grid gap-12 lg:grid-cols-[200px_1fr]">
        <p className="label text-vermilion">Our story</p>
        <div>
          <p className="story-p max-w-[22ch] font-display text-[clamp(2rem,4.4vw,4.2rem)] leading-[1.08] tracking-[-.02em] md:max-w-[26ch]">
            {text.split(' ').map((w, i) => <span key={i} className={`sw ${/emotion|experience/.test(w) ? 'italic text-vermilion' : ''}`}>{w} </span>)}
          </p>
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
          <span className="num font-display text-6xl font-semibold text-vermilion md:text-7xl" data-to={n}>{n}</span>
          <p className="mt-2 text-ink-60">{l}</p>
        </div>
      ))}
    </div>
  )
}
