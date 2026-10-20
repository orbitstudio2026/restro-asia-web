import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { reduced } from '../lib/motion'
import { reviews, mentions, GOOGLE_RATING, type Review } from '../data/reviews'
import { asset } from '../lib/asset'

const GOOGLE_URL = 'https://www.google.com/maps/place/Restro+Asia/@21.1507567,72.7731751,17z'

function Card({ r }: { r: Review }) {
  return (
    <figure className="mx-3 flex w-[300px] shrink-0 flex-col justify-between rounded-[28px] border border-cream/15 bg-ink/55 p-8 transition-[border-color,transform] duration-500 ease-out-expo hover:-translate-y-1.5 hover:border-gold/60 sm:w-[380px] lg:w-[440px]">
      <div><span className="font-display text-6xl leading-none text-gold">“</span><blockquote className="mt-1 font-display text-xl leading-snug md:text-2xl">{r.quote}</blockquote></div>
      <figcaption className="label mt-8 flex items-center gap-3 text-cream/70"><span className="h-px w-8 bg-gold" />{r.name}<span className="text-cream/40">· {r.source}</span></figcaption>
    </figure>
  )
}

/** Seamless marquee: the set is rendered twice and the track slides by exactly one set (-50%).
 *  Each review appears once per set, and a set is wider than the screen, so no card is ever on screen twice. */
function Marquee({ children, reverse = false, seconds }: { children: React.ReactNode; reverse?: boolean; seconds: number }) {
  return (
    <div className="group flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)]">
      <div className="flex w-max group-hover:[animation-play-state:paused]" style={{ animation: `${reverse ? 'marquee-rev' : 'marquee'} ${seconds}s linear infinite` }}>
        <div className="flex">{children}</div>
        <div className="flex" aria-hidden>{children}</div>
      </div>
    </div>
  )
}

export function Reviews() {
  const root = useRef<HTMLElement>(null)
  useGSAP(() => {
    if (reduced()) return
    gsap.from('.rv-head > *, .rv-rows > *', { y: 40, opacity: 0.15, stagger: 0.08, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: root.current, start: 'top bottom' } })
  }, { scope: root })
  return (
    <section id="reviews" ref={root} className="relative overflow-hidden bg-lacquer bg-cover bg-center py-[clamp(72px,12vw,170px)] text-cream" style={{ backgroundImage: `url(${asset('gen/bg-lacquer.webp')})` }}>
      <div className="rv-head wrap mb-14 flex flex-wrap items-end justify-between gap-6">
        <h2 className="text-[clamp(2.6rem,6vw,5.5rem)]">Guests <em className="text-gold">say</em> it best.</h2>
        <a href={GOOGLE_URL} target="_blank" rel="noopener" className="flex items-center gap-4 rounded-full border border-cream/20 py-2 pr-6 pl-2 transition-colors hover:border-gold">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-gold font-display text-lg font-semibold text-ink">{GOOGLE_RATING.score}</span>
          <span><span className="block font-display text-cream">★ rated on Google</span><span className="label text-cream/70">{GOOGLE_RATING.count} Google reviews ↗</span></span>
        </a>
      </div>
      <div className="rv-rows grid gap-8">
        <Marquee seconds={60}>{reviews.map((r) => <Card key={r.name} r={r} />)}</Marquee>
        <div>
          <p className="label wrap mb-4 text-gold">What guests mention most on Google</p>
          <Marquee reverse seconds={45}>
            {mentions.map(([t, n]) => (
              <span key={t} className="mx-2 flex shrink-0 items-center gap-3 rounded-full border border-gold/30 bg-ink/30 py-3 pr-3 pl-6 font-display text-xl whitespace-nowrap md:text-2xl">
                {t}<span className="grid h-8 min-w-8 place-items-center rounded-full bg-gold/90 px-2 font-label text-[13px] text-ink">{n}</span>
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  )
}
