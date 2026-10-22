import { useSyncExternalStore } from 'react'

/** Live media-query match: re-renders when the viewport crosses the breakpoint (resize, rotate, DevTools device mode). */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query)
      mq.addEventListener('change', onChange)
      return () => mq.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}
