import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

// Real guest reviews from the current restroasia.com
const reviews = [
  ['Best Chinese cuisine… superb taste… very hygienic… and service all time great… must visit.', 'Mihir Shah'],
  ['Authentic Chinese food! Kimchi is to die for. Ask for extra hot sauce. Very friendly host and staff — just ask if you want to try authentic Asian food.', 'Vaibhav Chokhawala'],
  ['Best food I have tasted, specially Chinese food.', 'Prince Jariwala'],
]

export function Reviews() {
  const root = useRef<HTMLElement>(null)
  useGSAP(() => {
    gsap.from('.rv-card', { y: 80, rotate: (i) => (i - 1) * 4, autoAlpha: 0, stagger: 0.12, duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: root.current, start: 'top 70%' } })
  }, { scope: root })
  const tilt = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    gsap.to(e.currentTarget, { rotateY: ((e.clientX - r.left) / r.width - 0.5) * 10, rotateX: -((e.clientY - r.top) / r.height - 0.5) * 10, duration: 0.6, ease: 'power3.out' })
  }
  const reset = (e: React.MouseEvent<HTMLElement>) => gsap.to(e.currentTarget, { rotateX: 0, rotateY: 0, duration: 0.8, ease: 'elastic.out(1,.5)' })
  return (
    <section id="reviews" ref={root} className="relative bg-lacquer bg-[url(/gen/bg-lacquer.webp)] bg-cover bg-center py-[clamp(96px,12vw,170px)] text-cream">
      <div className="wrap">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <h2 className="text-[clamp(2.6rem,6vw,5.5rem)]">Guests <em className="text-gold">say</em> it best.</h2>
          <a href="https://maps.app.goo.gl/UzCcCDu2piZTtMJv6" target="_blank" rel="noopener" className="btn btn-ghost text-cream">All Google reviews ↗</a>
        </div>
        <div className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 [perspective:1000px] [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
          {reviews.map(([q, n]) => (
            <figure key={n} onMouseMove={tilt} onMouseLeave={reset} className="rv-card flex w-[85%] shrink-0 snap-center flex-col justify-between rounded-[28px] border border-cream/15 bg-cream/[.04] p-8 md:w-auto">
              <div><span className="font-display text-7xl leading-none text-gold">“</span><blockquote className="mt-2 font-display text-2xl leading-snug">{q}</blockquote></div>
              <figcaption className="label mt-10 flex items-center gap-3 text-cream/70"><span className="h-px w-8 bg-gold" />{n}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
