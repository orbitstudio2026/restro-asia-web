import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { reduced } from '../lib/motion'
import { categories, MENU_PDF } from '../data/menu'
import { Magnetic } from './Magnetic'
import { MaskButton } from './ui/mask-button'

export function Menu() {
  const root = useRef<HTMLElement>(null)
  const tabs = useRef<HTMLDivElement>(null)
  const pill = useRef<HTMLSpanElement>(null)
  const [cat, setCat] = useState(0)
  const [jain, setJain] = useState(false)
  const c = categories[cat]
  const dishes = jain ? c.dishes.filter((d) => d.jain) : c.dishes

  // sliding pill under the active tab
  useLayoutEffect(() => {
    const btn = tabs.current?.querySelectorAll('button')[cat] as HTMLElement | undefined
    if (btn && pill.current) gsap.to(pill.current, { x: btn.offsetLeft, width: btn.offsetWidth, duration: 0.6, ease: 'expo.out' })
  }, [cat])

  useGSAP(() => {
    if (reduced()) return
    gsap.fromTo('.mn-row', { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.04, duration: 0.7, ease: 'expo.out' })
    gsap.fromTo('.mn-hero img', { scale: 1.2, clipPath: 'inset(0 0 100% 0)' }, { scale: 1, clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: 'expo.out' })
  }, { scope: root, dependencies: [cat, jain] })

  useGSAP(() => {
    if (reduced()) return
    gsap.from('.mn-head > *', { y: 40, autoAlpha: 0, stagger: 0.08, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: root.current, start: 'top 88%' } })
  }, { scope: root })

  return (
    <section id="menu" ref={root} className="relative bg-seigaiha py-[clamp(72px,12vw,170px)]">
      <div className="wrap">
        <div className="mn-head flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="label text-vermilion">The 2026 menu</p>
            <h2 className="mt-4 text-[clamp(2.6rem,6vw,5.5rem)]">Something for <em className="text-vermilion">every</em> craving.</h2>
          </div>
          <Magnetic><MaskButton href={MENU_PDF} download variant="primary">Menu &amp; prices (PDF)</MaskButton></Magnetic>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-y border-ink/10 py-4">
          <div ref={tabs} role="tablist" aria-label="Menu categories" className="relative flex max-w-full gap-1 overflow-x-auto [scrollbar-width:none] max-md:[mask-image:linear-gradient(90deg,#000_85%,transparent)]">
            <span ref={pill} aria-hidden className="absolute inset-y-0 left-0 rounded-full bg-ink" />
            {categories.map((k, i) => (
              <button key={k.id} role="tab" aria-selected={i === cat} onClick={() => setCat(i)} className={`label relative z-10 shrink-0 rounded-full px-5 py-3.5 transition-colors duration-300 ${i === cat ? 'text-cream' : 'text-ink/70 hover:text-vermilion'}`}>{k.label}</button>
            ))}
          </div>
          <button role="switch" aria-checked={jain} onClick={() => setJain(!jain)} className="label flex items-center gap-3 text-ink/80">
            <span className={`relative h-7 w-12 rounded-full transition-colors duration-300 ${jain ? 'bg-matcha' : 'bg-ink/15'}`}>
              <span className={`absolute top-1 left-1 h-5 w-5 rounded-full bg-white shadow transition-transform duration-500 ease-spring ${jain ? 'translate-x-5' : ''}`} />
            </span>
            Jain only
          </button>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
          <div className="mn-hero sticky top-28 hidden self-start overflow-hidden rounded-[28px] lg:block">
            <img src={c.img} alt={c.label} className="aspect-[4/5] w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-7 text-cream">
              <p className="font-display text-4xl">{c.label}</p>
              <p className="label mt-2 text-cream/70">{dishes.length} {jain ? 'Jain-friendly ' : ''}items</p>
            </div>
          </div>
          <div>
            {c.note && <p className="mb-6 rounded-2xl bg-cream/70 px-5 py-4 text-[0.9375rem] text-ink-60">{c.note}</p>}
            {dishes.length === 0 && <p className="py-10 text-ink-60">No Jain options in this section — please ask our staff.</p>}
            <ul>
              {dishes.map((d) => (
                <li key={c.id + d.name} className="mn-row group grid cursor-default gap-y-1 border-b border-ink/10 py-6 transition-[padding] duration-500 ease-out-expo hover:pl-4">
                  <h4 className="flex flex-wrap items-center gap-2 text-xl transition-colors group-hover:text-vermilion md:text-2xl">
                    {d.name}
                    {d.jain && <span className="inline-grid h-5 w-5 place-items-center rounded-full bg-matcha font-label text-[.7rem] text-white" title="Available in Jain">J</span>}
                  </h4>
                  {d.desc && <p className="max-w-xl text-[0.9375rem] leading-relaxed text-ink-60 md:text-base">{d.desc}</p>}
                </li>
              ))}
            </ul>
            <p className="label mt-8 text-ink-60">Prices are in the downloadable menu · Please inform staff of allergies</p>
          </div>
        </div>
      </div>
    </section>
  )
}
