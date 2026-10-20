import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { reduced } from '../lib/motion'
import { waLink } from './Nav'
import { Magnetic } from './Magnetic'
import { MENU_PDF } from '../data/menu'
import { asset } from '../lib/asset'
import { MaskButton } from './ui/mask-button'

// Vesu address confirmed on the Google Maps listing.
const ADDRESS = 'G3 Western Business Park, Opp. S.D. Jain School, Vesu, Surat'
const channels = [
  ['Google Maps', 'https://www.google.com/maps/place/Restro+Asia/@21.1507567,72.7731751,17z'],
  ['Swiggy', 'https://www.swiggy.com/menu/780093?source=sharing'],
  ['Zomato', 'https://link.zomato.com/xqzv/rshare?id=57340316305631f2'],
  ['Instagram', 'https://www.instagram.com/restroasia_official/'],
  ['Facebook', 'https://www.facebook.com/profile.php?id=61551257160291'],
]

export function Visit() {
  const root = useRef<HTMLElement>(null)
  const [f, setF] = useState({ name: '', date: '', time: '', guests: '2', jain: false, occasion: 'Dinner' })
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setF({ ...f, [k]: e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value })
  const msg = `Hi Restro~Asia! I'd like to reserve a table.\nName: ${f.name || '—'}\nDate: ${f.date || '—'}  Time: ${f.time || '—'}\nGuests: ${f.guests}\nOccasion: ${f.occasion}${f.jain ? '\nJain food required' : ''}`
  useGSAP(() => {
    if (reduced()) return
    gsap.from('.vs-a > *', { y: 40, autoAlpha: 0, stagger: 0.08, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: root.current, start: 'top 88%' } })
  }, { scope: root })
  const field = 'peer w-full border-0 border-b border-cream/25 bg-transparent px-0 py-4 text-cream placeholder:text-cream/35 focus:border-gold focus:outline-none [color-scheme:dark]'
  return (
    <section id="visit" ref={root} className="relative isolate overflow-hidden bg-ink py-[clamp(72px,12vw,170px)] text-cream">
      <div aria-hidden className="absolute inset-0 -z-10 bg-cover bg-center opacity-40" style={{ backgroundImage: `url(${asset('gen/bg-lanterns.webp')})` }} />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-ink via-ink/70 to-ink" />
      <div className="wrap grid gap-16 lg:grid-cols-2">
        <div className="vs-a">
          <p className="label text-gold">Visit &amp; reserve</p>
          <h2 className="mt-4 text-[clamp(2.6rem,6vw,5.5rem)]">You should come and <em className="text-gold">taste</em> for yourself.</h2>
          <address className="mt-10 not-italic text-cream/80">{ADDRESS}</address>
          <p className="mt-4"><a href="tel:+919737020808" className="font-display text-3xl hover:text-gold">+91 97370 20808</a></p>
          <p className="mt-1"><a href="mailto:restroasiaofficial@gmail.com" className="text-cream/70 hover:text-gold">restroasiaofficial@gmail.com</a></p>
          <div className="mt-10 flex flex-wrap gap-3">
            {channels.map(([l, h]) => <a key={l} href={h} target="_blank" rel="noopener" className="label rounded-full border border-cream/20 px-5 py-3.5 transition-[transform,border-color,color] duration-300 hover:-translate-y-0.5 hover:border-gold hover:text-gold">{l}</a>)}
          </div>
          <div className="mt-12 rounded-[28px] border border-gold/30 p-7">
            <p className="label text-gold">Parties &amp; catering</p>
            <p className="mt-3 text-cream/75">Kitty parties, birthdays and small gatherings, plus outdoor catering. Free delivery within 3 km, subject to availability.</p>
            <a href={waLink('Hi Restro~Asia! I would like to enquire about a party / catering order.')} target="_blank" rel="noopener" className="label mt-5 inline-block text-gold underline underline-offset-8">Enquire on WhatsApp</a>
          </div>
        </div>

        <form className="rounded-[28px] bg-cream/[.04] p-8 ring-1 ring-cream/10 md:p-12" onSubmit={(e) => { e.preventDefault(); window.open(waLink(msg), '_blank', 'noopener') }}>
          <p className="font-display text-3xl">Book a table</p>
          <p className="mt-2 text-[0.9375rem] text-cream/65">We’ll open WhatsApp with your request filled in — just hit send.</p>
          <div className="mt-8 grid gap-x-8 gap-y-2 sm:grid-cols-2">
            <label className="sm:col-span-2"><span className="label text-cream/60">Name</span><input required className={field} value={f.name} onChange={set('name')} placeholder="Your name" autoComplete="name" /></label>
            <label><span className="label text-cream/60">Date</span><input type="date" required className={field} value={f.date} onChange={set('date')} /></label>
            <label><span className="label text-cream/60">Time</span><input type="time" className={field} value={f.time} onChange={set('time')} /></label>
            <label><span className="label text-cream/60">Guests</span>
              <select className={field} value={f.guests} onChange={set('guests')}>{['1', '2', '3', '4', '5', '6', '7', '8', '10+'].map((g) => <option key={g} className="bg-ink">{g}</option>)}</select></label>
            <label><span className="label text-cream/60">Occasion</span>
              <select className={field} value={f.occasion} onChange={set('occasion')}>{['Dinner', 'Lunch', 'Birthday', 'Kitty party', 'Date night', 'Business'].map((g) => <option key={g} className="bg-ink">{g}</option>)}</select></label>
          </div>
          <label className="mt-6 flex cursor-pointer items-center gap-3">
            <input type="checkbox" checked={f.jain} onChange={set('jain')} className="h-5 w-5 accent-matcha" />
            <span className="text-cream/80">We need Jain food</span>
          </label>
          <pre className="mt-8 whitespace-pre-wrap rounded-2xl bg-ink/60 p-5 font-body text-[0.9375rem] text-cream/65" aria-live="polite">{msg}</pre>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Magnetic><MaskButton type="submit" variant="primary">Send on WhatsApp</MaskButton></Magnetic>
            <a href={MENU_PDF} download className="label text-cream/70 underline decoration-gold underline-offset-8 hover:text-cream">Menu PDF</a>
          </div>
          <p className="mt-6 text-[0.8125rem] text-cream/55">Reservations recommended, not mandatory · Tables held 15 minutes past booking time.</p>
        </form>
      </div>
    </section>
  )
}
