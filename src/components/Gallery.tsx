import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { reduced } from '../lib/motion'
import { asset } from '../lib/asset'
import { LINKS } from '../data/links'
import { useMediaQuery } from '../hooks/useMediaQuery'

// The restaurant's own photographs, retouched with Higgsfield (public/gen/gal-*).
// No photo is ever cropped: each tile takes its photo's exact aspect ratio, and tiles in a row grow in
// proportion to that ratio (flex-grow = ratio x100, so a lone tile still fills its row), so every photo in a row ends up the same height, shown whole.
const P = 1073 / 1600 // portrait files
const L = 1600 / 1073 // landscape files
type Shot = { f: string; t: string; r: number }
const S: Record<string, Shot> = {
  wok: { f: 'gal-wok-noodles', t: 'Wok-tossed noodles', r: P },
  spicy: { f: 'gal-spicy-ramen', t: 'Spicy ramen', r: L },
  green: { f: 'gal-green-rice', t: 'Green rice bowl', r: L },
  curry: { f: 'gal-curry-noodles', t: 'Coconut curry noodles', r: P },
  soup: { f: 'gal-curry-soup', t: 'Coconut curry soup', r: P },
  crispy: { f: 'gal-crispy-ramen', t: 'Crispy ramen bowl', r: L },
}
const DESKTOP_ROWS = [[S.wok, S.spicy, S.curry], [S.green, S.soup, S.crispy]]
const PHONE_ROWS = [[S.wok, S.curry], [S.spicy], [S.soup], [S.green], [S.crispy]]

export function Gallery() {
  const root = useRef<HTMLElement>(null)
  const phone = useMediaQuery('(max-width: 767px)')
  const rows = phone ? PHONE_ROWS : DESKTOP_ROWS
  useGSAP(() => {
    if (reduced()) return
    // reveal only: the clip ends at 0% so the full photo is visible, and the image itself is never scaled
    gsap.utils.toArray<HTMLElement>('.gl-item').forEach((el) => {
      gsap.fromTo(el, { clipPath: 'inset(14% 14% 14% 14% round 28px)' }, { clipPath: 'inset(0% 0% 0% 0% round 28px)', ease: 'expo.out', duration: 1.4, scrollTrigger: { trigger: el, start: 'top 90%' } })
    })
    gsap.from('.gl-head > *', { y: 40, autoAlpha: 0, stagger: 0.08, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: root.current, start: 'top 88%' } })
  }, { scope: root, dependencies: [phone], revertOnUpdate: true })
  return (
    <section id="gallery" ref={root} className="bg-ink py-[clamp(72px,12vw,170px)] text-cream">
      <div className="wrap">
        <div className="gl-head mb-14 flex flex-wrap items-end justify-between gap-6">
          <h2 className="text-[clamp(2.6rem,6vw,5.5rem)]">Good food, <em className="text-gold">good mood.</em></h2>
          <a href={LINKS.instagram} target="_blank" rel="noopener" className="label text-gold underline underline-offset-8">@restroasia_official</a>
        </div>
        <div className="flex flex-col gap-3 md:gap-4">
          {rows.map((row, i) => (
            <div key={i} className="flex gap-3 md:gap-4">
              {row.map(({ f, t, r }) => (
                <figure key={f} style={{ flex: `${r * 100} 1 0%`, aspectRatio: r }} className="gl-item group relative min-w-0 overflow-hidden rounded-[20px] bg-ink md:rounded-[28px]" data-cursor="View">
                  <img src={asset(`gen/${f}.webp`)} alt={t} loading="lazy" className="block h-full w-full object-contain transition-[filter] duration-700 group-hover:saturate-125" />
                  <figcaption className="label absolute bottom-4 left-4 translate-y-2 rounded-full bg-ink/60 px-3 py-2 text-cream opacity-0 transition-[opacity,transform] duration-500 group-hover:translate-y-0 group-hover:opacity-100">{t}</figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
