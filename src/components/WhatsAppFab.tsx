import { waLink } from './Nav'
import { MENU_PDF } from '../data/menu'

const msg = 'Hi Restro~Asia! I have a question.'
const Icon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.4-.3Z" /></svg>
)

export function WhatsAppFab() {
  return (
    <>
      <a href={waLink(msg)} target="_blank" rel="noopener" aria-label="Chat on WhatsApp" className="group fixed bottom-6 right-6 z-40 hidden h-16 w-16 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_14px_30px_-8px_rgba(37,211,102,.6)] transition-transform duration-500 ease-spring hover:scale-110 md:grid">
        <span aria-hidden className="absolute inset-0 rounded-full bg-[#25D366] [animation:pulse-ring_2.2s_ease-out_infinite]" />
        <span className="relative"><Icon /></span>
        <span className="label pointer-events-none absolute right-[calc(100%+12px)] whitespace-nowrap rounded-full bg-ink px-4 py-2.5 text-cream opacity-0 transition-opacity duration-300 group-hover:opacity-100">Chat with us</span>
      </a>
      <nav aria-label="Quick actions" className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-3 overflow-hidden rounded-full bg-ink/90 text-cream shadow-2xl ring-1 ring-cream/10 backdrop-blur-xl md:hidden">
        <a href="tel:+919737020808" className="label py-4 text-center">Call</a>
        <a href={waLink(msg)} target="_blank" rel="noopener" className="label flex items-center justify-center gap-2 bg-[#25D366] py-4 text-white"><Icon />WhatsApp</a>
        <a href={MENU_PDF} download className="label py-4 text-center">Menu</a>
      </nav>
    </>
  )
}
