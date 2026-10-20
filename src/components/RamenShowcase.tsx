import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ramens, categories } from '../data/menu'
import { waLink } from './Nav'
import { Magnetic } from './Magnetic'

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
    const P = Array.from({ length: 70 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * 2.2 + 0.4, s: Math.random() * 0.5 + 0.15, a: Math.random() * Math.PI * 2 }))
    const loop = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of P) {
        p.y -= p.s / h * 2; p.a += 0.01
        if (p.y < -0.05) { p.y = 1.05; p.x = Math.random() }
        const x = p.x * w + Math.sin(p.a) * 18, y = p.y * h
        const alpha = Math.sin(Math.PI * p.y) * 0.55
        ctx.beginPath(); ctx.arc(x, y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(253,235,173,${alpha})`; ctx.shadowBlur = 12; ctx.shadowColor = 'rgba(217,164,65,.8)'; ctx.fill()
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
const ingredients = [
  // left-side items stay in the top band: they drift upward and must never cross the text.
  // On mobile the text sits low, so items starting below 40% are hidden there.
  { x: '6%', y: '10%', d: 1.4, s: 110, k: 'chilli' }, { x: '86%', y: '12%', d: 0.8, s: 84, k: 'tofu' },
  { x: '70%', y: '92%', d: 1.1, s: 96, k: 'corn' }, { x: '76%', y: '66%', d: 1.6, s: 130, k: 'bokchoy' },
  { x: '28%', y: '6%', d: 0.6, s: 54, k: 'shiitake' }, { x: '62%', y: '88%', d: 0.9, s: 64, k: 'anise' },
  { x: '93%', y: '44%', d: 1.2, s: 60, k: 'shiitake' }, { x: '16%', y: '2%', d: 0.7, s: 58, k: 'anise' },
  { x: '46%', y: '90%', d: 1.3, s: 50, k: 'tofu' }, { x: '58%', y: '4%', d: 1.0, s: 70, k: 'chilli' },
]
function Ingredient({ k }: { k: string }) {
  return <img src={`/gen/ing-${k}.webp`} alt="" className="h-full w-full object-contain" draggable={false} />
}

const fusion = categories[0].dishes.slice(0, 5)
const authentic = categories[0].dishes.slice(5)

export function RamenShowcase() {
  const root = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const n = ramens.length

  useGSAP(() => {
    const steps = n - 1
    gsap.set(ramens.slice(1).map((_, i) => `.rm-t-${i + 1} .rm-l`).join(','), { yPercent: 110 })
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: '.rm-pin', start: 'top top', end: `+=${steps * 100 + 60}%`, pin: true, scrub: 0.8, anticipatePin: 1,
        onUpdate: (s) => setActive(Math.min(steps, Math.round(s.progress * (steps + 0.6) - 0.1))),
      },
    })
    tl.to('.rm-spin', { rotate: 220, duration: steps + 0.6 }, 0)
    gsap.utils.toArray<HTMLElement>('.rm-ing').forEach((el) => {
      const d = +el.dataset.d!
      tl.to(el, { yPercent: -260 * d, rotate: 140 * d * (Math.random() > 0.5 ? 1 : -1), duration: steps + 0.6 }, 0)
    })
    for (let i = 1; i <= steps; i++) {
      const r = ramens[i], at = i - 0.75
      tl.to(root.current, { '--from': r.from, '--to': r.to, '--glow': r.glow, duration: 0.75, ease: 'power1.inOut' }, at)
        .to(`.rm-bowl-${i - 1}`, { scale: 0.6, rotate: -50, autoAlpha: 0, filter: 'blur(8px)', duration: 0.5, ease: 'power2.in' }, at)
        .fromTo(`.rm-bowl-${i}`, { scale: 1.35, rotate: 60, autoAlpha: 0, filter: 'blur(8px)' }, { scale: 1, rotate: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 0.6, ease: 'power3.out' }, at + 0.25)
        .to(`.rm-t-${i - 1} .rm-l`, { yPercent: -110, duration: 0.4, stagger: 0.05, ease: 'power2.in' }, at)
        .fromTo(`.rm-t-${i} .rm-l`, { yPercent: 110 }, { yPercent: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out' }, at + 0.35)
    }
    gsap.from('.rm-row', { y: 30, autoAlpha: 0, stagger: 0.05, duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: '.rm-cols', start: 'top 80%' } })
  }, { scope: root })

  // Pointer parallax on the bowl (desktop)
  const tilt = (e: React.MouseEvent) => {
    const x = e.clientX / innerWidth - 0.5, y = e.clientY / innerHeight - 0.5
    gsap.to('.rm-tilt', { rotateY: x * 14, rotateX: -y * 14, x: x * 20, y: y * 20, duration: 1, ease: 'power3.out' })
  }

  const first = ramens[0]
  return (
    <section id="ramen" ref={root} className="relative bg-ink text-cream" style={{ '--from': first.from, '--to': first.to, '--glow': first.glow } as React.CSSProperties}>
      <div className="rm-pin relative h-[100svh] overflow-hidden" onMouseMove={tilt}>
        <div aria-hidden className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 55%, var(--to) 0%, var(--from) 62%, #0b0504 100%)' }} />
        <div aria-hidden className="absolute left-1/2 top-[55%] h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-[90px]" style={{ background: 'var(--glow)' }} />
        <div aria-hidden className="absolute inset-0 opacity-[.07] mix-blend-overlay [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22><filter id=%22n%22><feTurbulence baseFrequency=%22.9%22/></filter><rect width=%22160%22 height=%22160%22 filter=%22url(%23n)%22/></svg>')]" />
        <Steam />
        {ingredients.map((g, i) => (
          <div key={i} className={`rm-ing pointer-events-none absolute z-0 drop-shadow-[0_18px_22px_rgba(0,0,0,.45)] ${parseFloat(g.y) >= 40 ? 'max-lg:hidden' : ''}`} data-d={g.d} style={{ left: g.x, top: g.y, width: g.s, height: g.s }}><Ingredient k={g.k} /></div>
        ))}

        <div className="wrap relative z-10 grid h-full items-center gap-6 pt-20 pb-24 lg:pb-0 lg:grid-cols-[1fr_minmax(0,1.1fr)] xl:grid-cols-[1fr_minmax(0,1.1fr)_auto]">
          {/* text */}
          <div className="relative z-10 order-2 min-h-[230px] lg:order-1 lg:min-h-[320px]">
            <p className="label mb-5 text-cream/70">The signature · Ramen {String(active + 1).padStart(2, '0')}/{String(n).padStart(2, '0')}</p>
            {ramens.map((r, i) => (
              <div key={r.id} className={`rm-t-${i} absolute inset-x-0 top-10`} aria-hidden={i !== active}>
                <h2 className="overflow-hidden text-[clamp(2.4rem,5vw,4.8rem)] font-extrabold"><span className="rm-l block">{r.name}</span></h2>
                <div className="mt-4 overflow-hidden"><p className={`rm-l max-w-sm text-cream/80`}>{r.mood}</p></div>
                <div className="mt-6 flex items-center gap-5 overflow-hidden">
                  <span className={`rm-l font-display text-4xl text-gold`}>₹{r.price}</span>
                  <span className={`rm-l`}>
                    <Magnetic><a tabIndex={i === active ? 0 : -1} href={waLink(`Hi Restro~Asia! I'd like to order ${r.name}.`)} target="_blank" rel="noopener" className="btn btn-gold !py-3">Order on WhatsApp</a></Magnetic>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* bowl */}
          <div className="order-1 mx-auto w-[min(72vmin,560px)] [perspective:1200px] lg:order-2" data-cursor="Slurp">
            <div className="rm-tilt relative aspect-square">
              <div className="rm-spin absolute inset-0">
                {ramens.map((r, i) => (
                  <img key={r.id} src={r.img} alt={i === active ? r.name : ''} className={`rm-bowl-${i} absolute inset-0 h-full w-full object-contain drop-shadow-[0_40px_50px_rgba(0,0,0,.55)] ${i ? 'invisible opacity-0' : ''}`} />
                ))}
              </div>
              <div aria-hidden className="pointer-events-none absolute -inset-5 rounded-full border border-gold/40" />
              <div aria-hidden className="pointer-events-none absolute -inset-10 rounded-full border border-dashed border-cream/15 [animation:spin_40s_linear_infinite]" />
            </div>
          </div>

          {/* progress */}
          <ol className="order-3 hidden flex-col gap-4 xl:flex" aria-label="Ramen showcase progress">
            {ramens.map((r, i) => (
              <li key={r.id} className={`label flex items-center gap-3 transition-all duration-500 ${i === active ? 'text-cream' : 'text-cream/40'}`}>
                <span className={`h-px bg-gold transition-all duration-500 ${i === active ? 'w-10' : 'w-4'}`} />{r.name.replace(' Ramen', '')}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* full ramen list */}
      <div className="rm-sub relative pt-[clamp(80px,10vw,140px)] pb-[clamp(96px,12vw,160px)]">
        <div className="wrap text-center">
          <p className="label text-gold">Every bowl on the menu</p>
          <h3 className="mt-4 text-[clamp(2rem,4vw,3.6rem)]">The <em className="text-gold">ramen</em> menu</h3>
        </div>
        <div className="rm-cols wrap mt-16 grid gap-14 md:grid-cols-2">
          {[['Japanese fusion', fusion], ['Authentic Japanese', authentic]].map(([t, list]) => (
            <div key={t as string}>
              <p className="label mb-4 border-b border-cream/15 pb-4 text-cream/60">{t as string}{t === 'Authentic Japanese' && ' · veg & mushroom broth'}</p>
              {(list as typeof fusion).map((d) => (
                <a key={d.name} href={waLink(`Hi Restro~Asia! I'd like to order ${d.name}.`)} target="_blank" rel="noopener" data-cursor="Order" className="rm-row group grid grid-cols-[1fr_auto] gap-x-6 border-b border-cream/10 py-5 transition-[padding] duration-500 ease-out-expo hover:pl-3">
                  <span className="font-display text-xl transition-colors group-hover:text-gold">{d.name}{d.jain && <span className="ml-2 inline-grid h-5 w-5 place-items-center rounded-full bg-matcha align-middle font-label text-[.6rem] text-white" title="Available in Jain">J</span>}</span>
                  <span className="row-span-2 self-center font-display text-xl text-gold">₹{d.price}</span>
                  <span className="mt-1 text-sm text-cream/60">{d.desc}</span>
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
