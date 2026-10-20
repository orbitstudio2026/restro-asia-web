import { links } from './Nav'
import { Logo } from './Lantern'
import { scrollToId } from '../hooks/useLenis'
import { MENU_PDF } from '../data/menu'

export function Footer() {
  return (
    <footer className="overflow-hidden bg-lacquer pt-20 pb-28 text-cream md:pb-10">
      <div className="wrap">
        <div className="flex flex-wrap justify-between gap-10">
          <nav className="flex flex-wrap gap-x-8 gap-y-3" aria-label="Footer">
            {links.map(([h, l]) => <a key={h} href={h} onClick={(e) => { e.preventDefault(); scrollToId(h) }} className="label text-cream/70 hover:text-gold">{l}</a>)}
            <a href={MENU_PDF} download className="label text-gold">Download menu ↓</a>
          </nav>
          <p className="label text-cream/50">Cash · UPI · Debit accepted</p>
        </div>
        <div className="mt-16 flex justify-center">
          <Logo className="ft-logo w-[min(78vw,720px)] transition-transform duration-1000 ease-out-expo hover:scale-[1.03]" />
        </div>
        <div className="mt-8 flex flex-wrap justify-between gap-4 border-t border-cream/15 pt-6 text-[0.8125rem] text-cream/55">
          <span>© {new Date().getFullYear()} Restro~Asia · Flavours of Indo Chinese &amp; Beyond</span>
          <span>Download the menu for prices</span>
        </div>
      </div>
    </footer>
  )
}
