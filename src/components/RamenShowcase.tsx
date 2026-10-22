import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { reduced } from '../lib/motion'
import { ramens, categories } from '../data/menu'
import { waLink } from './Nav'
import { Magnetic } from './Magnetic'
import { asset } from '../lib/asset'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { MaskButton } from './ui/mask-button'

/** Rising steam / ember particles. Pauses when offscreen. */
function Steam() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current!, ctx = c.getContext('2d')!
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let w = 0, h = 0, raf = 0, on = false
    const dpr = Math.min(devicePixelRatio, 2)
    const size = () => { w = c.clientWidth; h = c.clientHeight; c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0) }
    size(); addEventListener('resize', size)
    const P = Array.from({ length: 48 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * 2.2 + 0.4, s: Math.random() * 0.5 + 0.15, a: Math.random() * Math.PI * 2 }))
    const loop = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of P) {
        p.y -= p.s / h * 2; p.a += 0.01
        if (p.y < -0.05) { p.y = 1.05; p.x = Math.random() }
        const x = p.x * w + Math.sin(p.a) * 18, y = p.y * h
        const alpha = Math.sin(Math.PI * p.y) * 0.55
        ctx.beginPath(); ctx.arc(x, y, p.r * 3.2, 0, Math.PI * 2); ctx.fillStyle = `rgba(217,164,65,${alpha * 0.18})`; ctx.fill()
        ctx.beginPath(); ctx.arc(x, y, p.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(253,235,173,${alpha})`; ctx.fill()
      }
      raf = requestAnimationFrame(loop)
    }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting && !on) { on = true; loop() } else if (!e.isIntersecting) { on = false; cancelAnimationFrame(raf) } })
    io.observe(c)
    return () => { io.disconnect(); cancelAnimationFrame(raf); removeEventListener('resize', size) }
  }, [])
  return <canvas ref={ref} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden />
}

/** Floating ingredient line-art + shapes; each drifts at its own depth. */
// Higgsfield-generated cutouts (public/gen/ing-*.webp); size in px, d = parallax depth
// x/y are the CENTRE of each item. Positions are clamped (see style below) so an item is always fully on
// screen, and the scroll move is a small drift that returns, so nothing ever leaves the view.
// Left-side items sit above the text; right-side items sit above or below the progress list.
// On mobile the text sits low, so items centred at 40% or lower are hidden there.
// Phones: the same 8 items sit small and static on an even ring just behind the bowl rim (see MobileRing).
const ingredients = [
  { x: '8%', y: '17%', d: 1.2, s: 96, k: 'chilli' },
  { x: '30%', y: '15%', d: 0.6, s: 56, k: 'shiitake' },
  { x: '50%', y: '14%', d: 0.9, s: 66, k: 'chilli' },
  { x: '86%', y: '17%', d: 0.8, s: 84, k: 'tofu' },
  { x: '93%', y: '33%', d: 1.1, s: 60, k: 'shiitake' },
  { x: '88%', y: '78%', d: 1.4, s: 118, k: 'bokchoy' },
  { x: '68%', y: '86%', d: 1.0, s: 90, k: 'corn' },
  { x: '48%', y: '84%', d: 0.7, s: 54, k: 'anise' },
]
const MOBILE = '(max-width: 1023px)'
// distance to keep from the screen edge: half the item rotated (√2 ≈ 1.42 → 0.71·size) plus its drift
const edge = (s: number, d: number) => Math.round(s * 0.71 + 30 * d)
function Ingredient({ k }: { k: string }) {
  return <img src={asset(`gen/ing-${k}.webp`)} alt="" className="h-full w-full object-contain" draggable={false} />
}

const fusion = categories[0].dishes.slice(0, 5)
const authentic = categories[0].dishes.slice(5)

// Phones: tiny ingredients evenly spaced (every 45°) on an ellipse just outside the bowl rim, drawn under
// the bowl so they read as background. Sizes ≈ 1/14 of the bowl. Static — nothing moves on phones.
const RING_SIZES = [24, 18, 22, 20, 26, 19, 23, 21]
function MobileRing() {
  return (
    <>
      {ingredients.map((g, i) => {
        const a = ((i * 45 + 22.5) * Math.PI) / 180
        const size = RING_SIZES[i]
        return (
          <div key={i} aria-hidden className="pointer-events-none absolute z-0 opacity-85 drop-shadow-[0_6px_8px_rgba(0,0,0,.45)]"
            style={{ left: `${50 + 52 * Math.cos(a)}%`, top: `${50 + 56 * Math.sin(a)}%`, width: size, height: size, transform: 'translate(-50%, -50%)' }}>
            <Ingredient k={g.k} />
          </div>
        )
      })}
    </>
  )
}

export function RamenShowcase() {
  const root = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  // live breakpoint: crossing it rebuilds the scene (useGSAP below depends on it)
  const mobile = useMediaQuery(MOBILE)
  const n = ramens.length

  useGSAP(() => {
    const steps = n - 1
    const total = steps + 0.6
    const touch = window.matchMedia('(pointer: coarse)').matches
    setActive(0)
    gsap.set(ramens.slice(1).map((_, i) => `.rm-t-${i + 1} .rm-l`).join(','), { yPercent: 110 })
    gsap.set(ramens.slice(1).map((_, i) => `.rm-bg-${i + 1}`).join(','), { autoAlpha: 0 })
    if (!reduced()) gsap.from('.rm-row', { y: 30, autoAlpha: 0, stagger: 0.05, duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: '.rm-cols', start: 'top 80%' } })

    if (mobile) {
      // Phones: a scrubbed timeline freezes half-way when the thumb stops, cutting the text in two.
      // Here scroll only chooses which bowl is showing; every change is a short, complete animation.
      gsap.set('.rm-tilt', { clearProps: 'transform' })
      let cur = 0
      const go = (i: number) => {
        if (i === cur) return
        const prev = cur, dir = i > prev ? 1 : -1
        cur = i
        setActive(i)
        ramens.forEach((_, j) => gsap.to(`.rm-bg-${j}`, { autoAlpha: j === i ? 1 : 0, duration: 0.7, ease: 'power1.inOut', overwrite: 'auto' }))
        gsap.to(`.rm-bowl-${prev}`, { scale: 0.85, rotate: -25 * dir, autoAlpha: 0, duration: 0.35, ease: 'power2.in', overwrite: 'auto' })
        gsap.fromTo(`.rm-bowl-${i}`, { scale: 1.12, rotate: 25 * dir, autoAlpha: 0 }, { scale: 1, rotate: 0, autoAlpha: 1, duration: 0.6, delay: 0.12, ease: 'power3.out', overwrite: 'auto' })
        gsap.to(`.rm-t-${prev} .rm-l`, { yPercent: -110 * dir, duration: 0.3, stagger: 0.03, ease: 'power2.in', overwrite: 'auto' })
        gsap.fromTo(`.rm-t-${i} .rm-l`, { yPercent: 110 * dir }, { yPercent: 0, duration: 0.5, stagger: 0.05, delay: 0.2, ease: 'power3.out', overwrite: 'auto' })
      }
      ScrollTrigger.create({
        trigger: '.rm-pin', start: 'top top', end: `+=${steps * 80 + 40}%`, pin: true, anticipatePin: 1,
        onUpdate: (st) => go(Math.min(steps, Math.floor(st.progress * n))),
      })
      return
    }
    // each ramen settles at a rest point; snapping there keeps every bowl fully on screen
    const rests = [0, ...ramens.slice(1).map((_, i) => (i + 1.2) / total), 1]
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: '.rm-pin', start: 'top top', end: `+=${steps * 90 + 60}%`, pin: true, scrub: 1, anticipatePin: 1,
        // snapping fights a thumb on touch screens, so it is desktop-only
        snap: touch ? undefined : { snapTo: rests, duration: { min: 0.3, max: 0.9 }, delay: 0.08, ease: 'power2.inOut', directional: true },
        onUpdate: (s) => setActive(Math.min(steps, Math.max(0, Math.round(s.progress * total - 0.15)))),
      },
    })
    tl.to('.rm-spin', { rotate: 90, duration: total }, 0)
    gsap.utils.toArray<HTMLElement>('.rm-ing').forEach((el, k) => {  // desktop only: phones keep them still
      const d = +el.dataset.d!
      const dir = k % 2 ? 1 : -1
      // a drift that rises, swings and settles back: at most ~50px from home, so it stays in view
      tl.to(el, { keyframes: { y: [0, -46 * d, 14 * d, -28 * d, 0], x: [0, 18 * dir * d, -10 * dir * d, 12 * dir * d, 0], rotate: [0, 40 * dir * d, -20 * dir * d, 30 * dir * d, 0], easeEach: 'sine.inOut' }, duration: total }, 0)
    })
    for (let i = 1; i <= steps; i++) {
      const at = i - 0.75
      tl.to(`.rm-bg-${i}`, { autoAlpha: 1, duration: 0.8, ease: 'power1.inOut' }, at)
        .to(`.rm-bowl-${i - 1}`, { scale: 0.7, rotate: -40, autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, at)
        .fromTo(`.rm-bowl-${i}`, { scale: 1.25, rotate: 45, autoAlpha: 0 }, { scale: 1, rotate: 0, autoAlpha: 1, duration: 0.6, ease: 'power3.out' }, at + 0.25)
        .to(`.rm-t-${i - 1} .rm-l`, { yPercent: -110, duration: 0.4, stagger: 0.05, ease: 'power2.in' }, at)
        .fromTo(`.rm-t-${i} .rm-l`, { yPercent: 110 }, { yPercent: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out' }, at + 0.35)
    }
  }, { scope: root, dependencies: [mobile], revertOnUpdate: true })

  // Pointer parallax on the bowl (desktop)
  const tiltTo = useRef<((v: number) => void)[]>([])
  useEffect(() => {
    const el = root.current!.querySelector('.rm-tilt')
    tiltTo.current = (['rotateY', 'rotateX', 'x', 'y'] as const).map((p) => gsap.quickTo(el, p, { duration: 1, ease: 'power3.out' }))
  }, [])
  const tilt = (e: React.MouseEvent) => {
    const x = e.clientX / innerWidth - 0.5, y = e.clientY / innerHeight - 0.5
    const [ry, rx, tx, ty] = tiltTo.current
    ry?.(x * 12); rx?.(-y * 12); tx?.(x * 18); ty?.(y * 18)
  }

  return (
    <section id="ramen" ref={root} className="relative bg-ink text-cream">
      <div className="rm-pin relative h-[100svh] overflow-hidden [--bx:50%] lg:[--bx:64%]" onMouseMove={tilt}>
        {/* one colour world per bowl, stacked and cross-faded */}
        {ramens.map((r, i) => (
          <div key={r.id} aria-hidden className={`rm-bg-${i} absolute inset-0 will-change-[opacity]`}
            style={{ background: `radial-gradient(38% 46% at var(--bx) 55%, ${r.glow}66 0%, transparent 70%), radial-gradient(circle at var(--bx) 55%, ${r.to} 0%, ${r.from} 62%, #050302 100%)` }} />
        ))}
        <div aria-hidden className="absolute inset-0 opacity-[.07] mix-blend-overlay [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22><filter id=%22n%22><feTurbulence baseFrequency=%22.9%22/></filter><rect width=%22160%22 height=%22160%22 filter=%22url(%23n)%22/></svg>')]" />
        <Steam />
        {!mobile && ingredients.map((g, i) => {
          const { x, y, s: size } = g
          const e = edge(size, g.d)
          return (
            <div key={i} className="rm-ing pointer-events-none absolute z-0 will-change-transform drop-shadow-[0_18px_22px_rgba(0,0,0,.45)]" data-d={g.d}
              style={{ left: `clamp(${e}px, ${x}, calc(100% - ${e}px))`, top: `clamp(${e + 76}px, ${y}, calc(100% - ${e + 8}px))`, width: size, height: size, margin: `${-size / 2}px 0 0 ${-size / 2}px` }}>
              <div className="h-full w-full [animation:bob_5s_ease-in-out_infinite]" style={{ animationDelay: `${-i * 0.7}s` }}><Ingredient k={g.k} /></div>
            </div>
          )
        })}

        <div className="wrap relative z-10 grid h-full items-center gap-6 pt-20 pb-24 lg:pb-0 lg:grid-cols-[1fr_minmax(0,1.15fr)]">
          {/* text */}
          <div className="relative z-10 order-2 min-h-[230px] lg:order-1 lg:min-h-[320px]">
            <p className="label mb-5 text-cream/70">The signature · Ramen {String(active + 1).padStart(2, '0')}/{String(n).padStart(2, '0')}</p>
            {ramens.map((r, i) => (
              <div key={r.id} className={`rm-t-${i} absolute inset-x-0 top-10`} aria-hidden={i !== active}>
                <h2 className="-my-2 overflow-hidden py-2 text-[clamp(2.4rem,5vw,4.8rem)] leading-[1.08]"><span className="rm-l block">{r.name}</span></h2>
                <div className="mt-4 overflow-hidden"><p className={`rm-l max-w-sm text-cream/80`}>{r.mood}</p></div>
                <div className="mt-6 flex items-center gap-5 overflow-hidden">
                  <span className={`rm-l`}>
                    <Magnetic><MaskButton tabIndex={i === active ? 0 : -1} href={waLink(`Hi Restro~Asia! I'd like to order ${r.name}.`)} target="_blank" rel="noopener" variant="primary" size="sm">Order on WhatsApp</MaskButton></Magnetic>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* bowl */}
          <div className="order-1 mx-auto w-[min(84vmin,660px)] [perspective:1200px] lg:order-2" data-cursor="Slurp">
            <div className="rm-tilt relative aspect-square">
              {mobile && <MobileRing />}
              <div className="rm-spin absolute inset-0 will-change-transform">
                {ramens.map((r, i) => (
                  <img key={r.id} src={r.img} alt={i === active ? r.name : ''} className={`rm-bowl-${i} absolute inset-0 h-full w-full object-contain drop-shadow-[0_40px_50px_rgba(0,0,0,.55)] ${i ? 'invisible opacity-0' : ''}`} />
                ))}
              </div>
              <div aria-hidden className="pointer-events-none absolute -inset-5 rounded-full border border-gold/40" />
              <div aria-hidden className="pointer-events-none absolute -inset-10 rounded-full border border-dashed border-cream/15 [animation:spin_40s_linear_infinite]" />
            </div>
          </div>

          {/* progress */}
          <ol className="absolute bottom-10 left-[clamp(20px,4vw,56px)] hidden gap-6 lg:flex" aria-label="Ramen showcase progress">
            {ramens.map((r, i) => (
              <li key={r.id} className={`label flex items-center gap-3 transition-colors duration-500 ${i === active ? 'text-cream' : 'text-cream/40'}`}>
                <span className={`h-px bg-gold transition-[width] duration-500 ${i === active ? 'w-10' : 'w-4'}`} />{r.name.replace(' Ramen', '')}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* full ramen list */}
      <div className="rm-sub relative pt-[clamp(64px,10vw,140px)] pb-[clamp(72px,12vw,160px)]">
        <div className="wrap text-center">
          <p className="label text-gold">Every bowl on the menu</p>
          <h3 className="mt-4 text-[clamp(2rem,4vw,3.6rem)]">The <em className="text-gold">ramen</em> menu</h3>
        </div>
        <div className="rm-cols wrap mt-16 grid gap-14 md:grid-cols-2">
          {[['Japanese fusion', fusion], ['Authentic Japanese', authentic]].map(([t, list]) => (
            <div key={t as string}>
              <p className="label mb-4 border-b border-cream/15 pb-4 text-cream/60">{t as string}{t === 'Authentic Japanese' && ' · veg & mushroom broth'}</p>
              {(list as typeof fusion).map((d) => (
                <a key={d.name} href={waLink(`Hi Restro~Asia! I'd like to order ${d.name}.`)} target="_blank" rel="noopener" data-cursor="Order" className="rm-row group grid border-b border-cream/10 py-5 transition-[padding] duration-500 ease-out-expo hover:pl-3">
                  <span className="font-display text-xl tracking-wide transition-colors group-hover:text-gold">{d.name}{d.jain && <span className="ml-2 inline-grid h-5 w-5 place-items-center rounded-full bg-matcha align-middle font-label text-[.6rem] text-white" title="Available in Jain">J</span>}</span>
                  <span className="mt-1 text-[0.9375rem] leading-relaxed text-cream/65 md:text-base">{d.desc}</span>
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
