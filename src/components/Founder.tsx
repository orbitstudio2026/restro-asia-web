import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { reduced } from '../lib/motion'
import { founder } from '../data/founder'
import { Mark } from './Lantern'

export function Founder() {
  const root = useRef<HTMLElement>(null)
  useGSAP(() => {
    if (reduced()) return
    gsap.fromTo('.fd-frame rect', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 2, ease: 'expo.inOut', scrollTrigger: { trigger: root.current, start: 'top 88%' } })
    gsap.from('.fd-portrait', { clipPath: 'inset(100% 0 0 0 round 999px 999px 24px 24px)', duration: 1.6, ease: 'expo.out', scrollTrigger: { trigger: root.current, start: 'top 88%' } })
    // gentle parallax that passes through centre (0) when the section is mid-screen
    gsap.fromTo('.fd-portrait > *', { yPercent: -4 }, { yPercent: 4, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } })
    gsap.from('.fd-txt > *', { y: 40, autoAlpha: 0, stagger: 0.1, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: '.fd-txt', start: 'top 80%' } })
  }, { scope: root })
  const ph = (s: string, fallback: string) => s || fallback
  return (
    <section id="founder" ref={root} className="relative overflow-hidden bg-cream py-[clamp(72px,12vw,170px)]">
      <div className="wrap grid items-center gap-16 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)]">
        <div className="relative mx-auto w-full max-w-[460px]">
          <svg className="fd-frame pointer-events-none absolute -inset-4 z-10 h-[calc(100%+2rem)] w-[calc(100%+2rem)] text-vermilion" viewBox="0 0 100 125" preserveAspectRatio="none" aria-hidden>
            <rect x=".5" y=".5" width="99" height="124" rx="49.5" fill="none" stroke="currentColor" strokeWidth=".3" pathLength={1} strokeDasharray={1} vectorEffect="non-scaling-stroke" />
          </svg>
          <div className="fd-portrait arch relative aspect-[4/5] overflow-hidden bg-lacquer">
            {founder.photo
              ? <img src={founder.photo} alt={`${founder.name}, founder of Restro~Asia`} className="absolute inset-x-0 -top-[5%] h-[110%] w-full object-cover object-center" />
              : <div className="absolute inset-0 grid place-items-center text-gold"><div className="text-center"><Mark className="mx-auto w-28 opacity-80" /><p className="label mt-6 text-cream/60">Founder portrait</p></div></div>}
          </div>
        </div>
        <div className="fd-txt">
          <p className="label text-vermilion">Meet the founder</p>
          <blockquote className="mt-6 text-[clamp(1.5rem,3vw,2.6rem)] font-semibold leading-[1.25] tracking-[-.01em]">
            “{ph(founder.quote, 'Founder quote goes here — one line about why they started Restro~Asia.')}”
          </blockquote>
          {founder.story && <p className="mt-8 max-w-xl text-ink-60">{founder.story}</p>}
          <div className="mt-10 border-t border-ink/15 pt-8">
            <div>
              <p className="font-display text-3xl">{ph(founder.name, 'Founder name')}</p>
              <p className="label mt-1 text-ink-60">{founder.role}{founder.yearOpened ? ` · Since ${founder.yearOpened}` : ''}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
