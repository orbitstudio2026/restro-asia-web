export function Lantern({ className = '', draw = false }: { className?: string; draw?: boolean }) {
  return (
    <svg viewBox="0 0 120 200" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {[
        'M60 0v34', 'M60 34 108 82 60 130 12 82Z', 'M60 52 90 82 60 112 30 82Z', 'M60 130v26', 'M52 156h16l-3 30M60 156v34M55 156l-3 30',
      ].map((d, i) => <path key={i} d={d} pathLength={1} className={draw ? 'lantern-draw' : undefined} style={draw ? { strokeDasharray: 1, strokeDashoffset: 1 } : undefined} />)}
      <path d="M60 68 74 82 60 96 46 82Z" fill="currentColor" className={draw ? 'lantern-fill' : undefined} style={draw ? { opacity: 0 } : undefined} />
    </svg>
  )
}

export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`font-display font-semibold tracking-[.32em] inline-flex items-center ${className}`}>
      RESTRO<i className="not-italic text-gold tracking-normal mx-[.2em]">~</i>ASIA
    </span>
  )
}

type LogoTone = 'cream' | 'ink' | 'vermilion'
/** Official Restro~Asia lockup (from "logo Restro Asia.png"), trimmed & recoloured in public/brand. */
export function Logo({ tone = 'cream', className = '', alt = 'Restro~Asia — Flavours of Indo Chinese & Beyond' }: { tone?: LogoTone; className?: string; alt?: string }) {
  return <img src={`/brand/logo-${tone}.webp`} alt={alt} width={900} height={428} className={`h-auto ${className}`} decoding="async" />
}
export function Mark({ tone = 'cream', className = '' }: { tone?: 'cream' | 'vermilion'; className?: string }) {
  return <img src={`/brand/mark-${tone}.webp`} alt="" aria-hidden width={360} height={499} className={`h-auto ${className}`} decoding="async" />
}
