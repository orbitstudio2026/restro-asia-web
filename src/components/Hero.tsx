import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { reduced } from '../lib/motion'
import { Magnetic } from './Magnetic'
import { waLink } from './Nav'
import { MENU_PDF } from '../data/menu'
import { scrollToId } from '../hooks/useLenis'
import { asset } from '../lib/asset'

const split = (s: string) => s.split('').map((c, i) => <span key={i} className="ch inline-block will-change-transform">{c === ' ' ? ' ' : c}</span>)

export function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null)
  useGSAP(() => {
    if (!ready) return
    if (reduced()) return
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
    tl.from('.ch', { yPercent: 115, rotate: 6, duration: 1.2, stagger: 0.022 })
      .from('.hero-fade', { y: 24, autoAlpha: 0, duration: 1, stagger: 0.08 }, '-=0.9')
      .from('.hero-arch', { clipPath: 'inset(100% 0 0 0 round 999px 999px 24px 24px)', scale: 1.15, duration: 1.6 }, 0.1)
      .from('.hero-float', { scale: 0, autoAlpha: 0, duration: 1.2, stagger: 0.12, ease: 'back.out(1.6)' }, 0.6)
    // phones: no scroll parallax or bobbing — the photos and badge stay where they land
    if (window.matchMedia('(max-width: 1023px)').matches) return
    gsap.to('.hero-arch img', { yPercent: 12, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } })
    gsap.utils.toArray<HTMLElement>('.hero-float').forEach((el, i) => {
      gsap.to(el, { yPercent: -60 - i * 40, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } })
      gsap.to(el.firstElementChild, { y: 10, duration: 2.6 + i, yoyo: true, repeat: -1, ease: 'sine.inOut' })
    })
  }, { scope: root, dependencies: [ready] })

  return (
    <section id="top" ref={root} className="relative min-h-[100svh] overflow-hidden bg-lacquer text-cream">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(900px_600px_at_75%_35%,rgba(201,40,45,.55),transparent_60%),radial-gradient(700px_500px_at_5%_95%,rgba(217,164,65,.18),transparent_60%)]" />
      <div className="wrap relative grid min-h-[100svh] items-center gap-12 pt-32 pb-16 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <p className="hero-fade label mb-8 text-gold">Surat · Flavours of Indo Chinese &amp; Beyond</p>
          <h1 className="text-[clamp(3.2rem,8.6vw,8.5rem)] leading-[.98]" aria-label="Making food tasty.">
            <span className="block overflow-hidden pb-2" aria-hidden>{split('Making')}</span>
            <span className="block overflow-hidden pb-2" aria-hidden>{split('food ')}<em className="text-gold">{split('tasty.')}</em></span>
          </h1>
          <p className="hero-fade mt-8 max-w-md text-lg text-cream/75">Wok-fired classics, slow-simmered ramen, sushi and bowls — with Jain options across the menu.</p>
          <div className="hero-fade mt-10 flex flex-wrap gap-4">
            <Magnetic><a href={waLink('Hi Restro~Asia! I would like to reserve a table.')} target="_blank" rel="noopener" className="btn btn-primary">Reserve on WhatsApp <span aria-hidden>→</span></a></Magnetic>
            <Magnetic><a href="#menu" onClick={(e) => { e.preventDefault(); scrollToId('#menu') }} className="btn btn-ghost text-cream">Explore the menu</a></Magnetic>
            <a href={MENU_PDF} download className="hero-fade label self-center text-cream/70 underline decoration-gold underline-offset-8 hover:text-cream">Download menu (PDF)</a>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[520px]">
          <div className="hero-arch arch aspect-[4/5] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,.6)]" data-cursor="Ramen">
            <img src={asset('gen/hero-ramen.webp')} alt="Steaming vegetarian ramen with chopsticks lifting noodles" className="h-[115%] w-full object-cover" fetchPriority="high" />
          </div>
          <div className="hero-float absolute -left-10 bottom-10 w-32 md:w-40"><img src={asset('gen/menu-soups.webp')} alt="" className="aspect-square rounded-full object-cover ring-4 ring-lacquer" /></div>
          <div className="hero-float absolute -right-6 top-16 w-24 md:w-32"><img src={asset('gen/menu-sushi.webp')} alt="" className="aspect-square rounded-full object-cover ring-4 ring-lacquer" /></div>
          <div className="hero-float absolute -bottom-6 right-6 h-32 w-32">
            <svg viewBox="0 0 100 100" className="h-full w-full [animation:spin_18s_linear_infinite]" aria-hidden>
              <defs><path id="circ" d="M50 50m-38 0a38 38 0 1 1 76 0a38 38 0 1 1-76 0" /></defs>
              <circle cx="50" cy="50" r="49" fill="#D9A441" />
              <text className="fill-ink" style={{ font: '800 8.2px Manrope', letterSpacing: '2.2px' }}><textPath href="#circ">RAMEN · SUSHI · BOWLS · WOK · </textPath></text>
            </svg>
            <span className="absolute inset-0 grid place-items-center font-display text-2xl text-ink">✦</span>
          </div>
        </div>
      </div>
      <div className="hero-fade absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"><span className="label text-cream/50">Scroll</span><span className="h-10 w-px origin-top bg-gold/70 [animation:sway_2s_ease-in-out_infinite]" /></div>
    </section>
  )
}
