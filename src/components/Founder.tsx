import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { founder } from '../data/founder'
import { Logo, Mark } from './Lantern'

export function Founder() {
  const root = useRef<HTMLElement>(null)
  useGSAP(() => {
    gsap.fromTo('.fd-frame rect', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 2, ease: 'expo.inOut', scrollTrigger: { trigger: root.current, start: 'top 70%' } })
    gsap.from('.fd-portrait', { clipPath: 'inset(100% 0 0 0 round 999px 999px 24px 24px)', duration: 1.6, ease: 'expo.out', scrollTrigger: { trigger: root.current, start: 'top 70%' } })
    gsap.to('.fd-portrait > *', { yPercent: -10, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } })
    gsap.from('.fd-txt > *', { y: 40, autoAlpha: 0, stagger: 0.1, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: '.fd-txt', start: 'top 80%' } })
  }, { scope: root })
  const ph = (s: string, fallback: string) => s || fallback
  return (
    <section id="founder" ref={root} className="relative overflow-hidden bg-cream py-[clamp(96px,12vw,170px)]">
      <div className="wrap grid items-center gap-16 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)]">
        <div className="relative mx-auto w-full max-w-[460px]">
          <svg className="fd-frame pointer-events-none absolute -inset-4 z-10 h-[calc(100%+2rem)] w-[calc(100%+2rem)] text-vermilion" viewBox="0 0 100 125" preserveAspectRatio="none" aria-hidden>
            <rect x=".5" y=".5" width="99" height="124" rx="49.5" fill="none" stroke="currentColor" strokeWidth=".3" pathLength={1} strokeDasharray={1} vectorEffect="non-scaling-stroke" />
          </svg>
          <div className="fd-portrait arch relative aspect-[4/5] overflow-hidden bg-lacquer">
            {founder.photo
              ? <img src={founder.photo} alt={founder.name} className="h-[115%] w-full object-cover" />
              : <div className="grid h-[115%] place-items-center text-gold"><div className="text-center"><Mark className="mx-auto w-28 opacity-80" /><p className="label mt-6 text-cream/60">Founder portrait</p></div></div>}
          </div>
        </div>
        <div className="fd-txt">
          <p className="label text-vermilion">Meet the founder</p>
          <blockquote className="mt-6 font-display text-[clamp(2rem,4vw,3.6rem)] italic leading-[1.1]">
            “{ph(founder.quote, 'Founder quote goes here — one line about why they started Restro~Asia.')}”
          </blockquote>
          <p className="mt-8 max-w-xl text-ink-60">{ph(founder.story, 'Two or three sentences on the founder’s journey, inspiration and what makes the kitchen special. Provided by the owner.')}</p>
          <div className="mt-10 flex items-center gap-5 border-t border-ink/15 pt-8">
            <Logo tone="ink" alt="" className="w-28" />
            <div>
              <p className="font-display text-2xl">{ph(founder.name, 'Founder name')}</p>
              <p className="label mt-1 text-ink-60">{founder.role}{founder.yearOpened ? ` · Since ${founder.yearOpened}` : ''}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
