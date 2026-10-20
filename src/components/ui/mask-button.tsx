// Source: 21st.dev — "Mask Button" by lucasbassetti (https://21st.dev/@lucasbassetti/components/mask-button)
// Adapted for Restro~Asia: renders as a link or a button, brand colour variants, the "nature" ink-blot
// sprite is self-hosted (public/ui/mask-nature.png) and its keyframes live in src/index.css.
// The face layer is masked by a 23-frame sprite; hover plays the frames so the face wipes away like ink
// lifting off paper and reveals the under layer. Ghost variants run the other way (the ink spreads in).
import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { asset } from '../../lib/asset'

export type MaskButtonVariant = 'primary' | 'cream' | 'ghost'
export type MaskButtonSize = 'sm' | 'md'

// under = what the hover reveals; face = the masked layer seen at rest (inverted for ghost)
const VARIANTS: Record<MaskButtonVariant, { under: string; face: string; reverse?: boolean }> = {
  primary: { under: 'bg-ink text-cream', face: 'bg-gold text-ink' },
  cream: { under: 'bg-gold text-ink', face: 'bg-cream text-ink' },
  ghost: { under: 'bg-transparent text-cream ring-1 ring-inset ring-cream/70', face: 'bg-cream text-ink', reverse: true },
}
const SIZES: Record<MaskButtonSize, string> = {
  sm: 'px-5 py-3 text-[.75rem]',
  md: 'px-7 py-4 text-[.8rem]',
}

type Common = { variant?: MaskButtonVariant; size?: MaskButtonSize; className?: string; children: ReactNode }
type AsLink = Common & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
type AsButton = Common & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }

export const MaskButton = forwardRef<HTMLAnchorElement & HTMLButtonElement, AsLink | AsButton>(function MaskButton(
  { variant = 'primary', size = 'md', className, children, ...rest }, ref,
) {
  const v = VARIANTS[variant]
  const cls = cn(
    'mask-btn group relative isolate inline-flex select-none items-center justify-center overflow-hidden whitespace-nowrap rounded-full',
    'font-label font-bold uppercase tracking-[.12em] leading-none [-webkit-tap-highlight-color:transparent]',
    'transition-[scale] duration-100 active:scale-[.96] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold',
    v.under, SIZES[size], className,
  )
  const face = (
    <span aria-hidden className={cn('mask-btn-face absolute inset-0 z-[1] flex items-center justify-center', v.face, v.reverse && 'is-reverse')}
      style={{ ['--mask-img' as string]: `url("${asset('ui/mask-nature.png')}")` }}>
      {children}
    </span>
  )
  const label = <span className="relative z-0">{children}</span>
  if ('href' in rest && rest.href !== undefined) {
    return <a ref={ref} className={cls} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>{label}{face}</a>
  }
  return <button ref={ref} type="button" className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>{label}{face}</button>
})

export default MaskButton
