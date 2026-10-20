import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

// All Higgsfield-generated (public/gen)
const shots = [
  ['gal-interior', 'Lantern-lit dining room', 'col-span-2 md:col-span-7 md:row-span-2'],
  ['gal-dumplings', 'Dragon pockets', 'md:col-span-5'],
  ['gal-mojito', 'Sapphire mojito', 'md:col-span-5 md:row-span-2'],
  ['ramen-kimchi', 'Kimchi ramen', 'md:col-span-4 md:row-span-2 !bg-lacquer [&_img]:object-contain [&_img]:p-6'],
  ['gal-plating', 'Plated to order', 'md:col-span-3 md:row-span-2'],
  ['gal-padthai', 'Pad thai noodles', 'md:col-span-4'],
  ['gal-potrice', 'Clay pot rice', 'md:col-span-5'],
  ['menu-noodles', 'Wok-fired hakka', 'md:col-span-4'],
]

export function Gallery() {
  const root = useRef<HTMLElement>(null)
  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>('.gl-item').forEach((el) => {
      gsap.fromTo(el, { clipPath: 'inset(18% 18% 18% 18% round 28px)' }, { clipPath: 'inset(0% 0% 0% 0% round 28px)', ease: 'expo.out', duration: 1.4, scrollTrigger: { trigger: el, start: 'top 88%' } })
      gsap.fromTo(el.querySelector('img'), { yPercent: -8, scale: 1.18 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } })
    })
    gsap.from('.gl-head > *', { y: 40, autoAlpha: 0, stagger: 0.08, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: root.current, start: 'top 75%' } })
  }, { scope: root })
  return (
    <section id="gallery" ref={root} className="bg-ink py-[clamp(96px,12vw,170px)] text-cream">
      <div className="wrap">
        <div className="gl-head mb-14 flex flex-wrap items-end justify-between gap-6">
          <h2 className="text-[clamp(2.6rem,6vw,5.5rem)]">Good food, <em className="text-gold">good mood.</em></h2>
          <a href="https://www.instagram.com/restroasia_official/" target="_blank" rel="noopener" className="label text-gold underline underline-offset-8">@restroasia_official ↗</a>
        </div>
        <div className="grid grid-flow-dense auto-rows-[220px] grid-cols-2 gap-4 md:grid-cols-12 md:auto-rows-[240px]">
          {shots.map(([f, t, cls]) => (
            <figure key={f} className={`gl-item group relative overflow-hidden rounded-[28px] bg-ink ${cls}`} data-cursor="View">
              <img src={`/gen/${f}.webp`} alt={t} loading="lazy" className="h-full w-full object-cover transition-[filter] duration-700 group-hover:saturate-125" />
              <figcaption className="label absolute bottom-4 left-4 translate-y-2 rounded-full bg-ink/60 px-3 py-2 text-cream opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">{t}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
