import { useEffect, useState } from 'react'
import { Logo } from './Lantern'
import { Magnetic } from './Magnetic'
import { scrollToId } from '../hooks/useLenis'
import { MENU_PDF, WHATSAPP } from '../data/menu'
import { MaskButton } from './ui/mask-button'

export const links = [
  ['#story', 'Story'], ['#ramen', 'Ramen'], ['#menu', 'Menu'], ['#gallery', 'Gallery'], ['#founder', 'Founder'], ['#reviews', 'Reviews'], ['#visit', 'Visit'],
] as const

export const waLink = (text: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    let last = 0
    const on = () => { const y = scrollY; setScrolled(y > 40); setHidden(y > last && y > 600); last = y }
    addEventListener('scroll', on, { passive: true }); return () => removeEventListener('scroll', on)
  }, [])
  const go = (id: string) => (e: React.MouseEvent) => { e.preventDefault(); setOpen(false); scrollToId(id) }
  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,padding] duration-500 ease-out-expo ${hidden && !open ? '-translate-y-full' : ''} ${scrolled ? 'bg-ink/80 backdrop-blur-xl py-3' : 'py-6'}`}>
        <div className="wrap flex items-center gap-8 text-cream">
          <a href="#top" onClick={go('#top')} className="shrink-0" aria-label="Restro~Asia home"><Logo className={`transition-[width] duration-500 ease-out-expo ${scrolled ? 'w-[104px]' : 'w-[132px] md:w-[150px]'}`} /></a>
          <nav className="mx-auto hidden gap-7 lg:flex" aria-label="Sections">
            {links.map(([h, l]) => (
              <a key={h} href={h} onClick={go(h)} className="group label relative py-2 text-cream/75 transition-colors hover:text-cream">
                {l}<span className="absolute inset-x-0 -bottom-0.5 h-px origin-right scale-x-0 bg-gold transition-transform duration-500 ease-out-expo group-hover:origin-left group-hover:scale-x-100" />
              </a>
            ))}
          </nav>
          <div className="ml-auto hidden items-center gap-3 md:flex lg:ml-0">
            <Magnetic><MaskButton href={MENU_PDF} download variant="cream" size="sm">Menu PDF</MaskButton></Magnetic>
            <Magnetic><MaskButton href={waLink('Hi Restro~Asia! I would like to reserve a table.')} target="_blank" rel="noopener" variant="primary" size="sm">Reserve</MaskButton></Magnetic>
          </div>
          <button onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'} data-burger className="ml-auto grid h-12 w-12 place-items-center rounded-full border border-cream/30 lg:hidden md:ml-0">
            <span className={`block h-px w-5 bg-cream transition-transform ${open ? 'translate-y-[3px] rotate-45' : '-translate-y-[3px]'}`} />
            <span className={`absolute block h-px w-5 bg-cream transition-transform ${open ? '-rotate-45' : 'translate-y-[3px]'}`} />
          </button>
        </div>
      </header>
      <div className={`fixed inset-0 z-40 bg-lacquer text-cream transition-[clip-path] duration-700 ease-in-out-expo lg:hidden ${open ? '[clip-path:circle(150%_at_100%_0)]' : '[clip-path:circle(0%_at_100%_0)] pointer-events-none'}`}>
        <nav className="wrap flex h-full flex-col justify-center gap-2" aria-label="Mobile">
          {links.map(([h, l], i) => (
            <a key={h} href={h} onClick={go(h)} style={{ transitionDelay: open ? `${150 + i * 50}ms` : '0ms' }} className={`font-display text-5xl transition-[transform,opacity] duration-700 ease-out-expo ${open ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>{l}</a>
          ))}
          <div className="mt-10 flex flex-wrap gap-3">
            <MaskButton href={MENU_PDF} download variant="cream">Menu PDF</MaskButton>
            <MaskButton href={waLink('Hi Restro~Asia! I would like to reserve a table.')} target="_blank" rel="noopener" variant="primary">WhatsApp</MaskButton>
          </div>
        </nav>
      </div>
    </>
  )
}
