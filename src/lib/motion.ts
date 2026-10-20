/** True when the visitor asked for reduced motion: entrance animations are skipped so content shows at once. */
export const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
