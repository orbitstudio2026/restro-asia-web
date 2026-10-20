const items = ['Ramen', 'Sushi', 'Bowls', 'Wok', 'Dim sum', 'Mocktails', 'Jain friendly']
export function Marquee() {
  const row = [...items, ...items]
  return (
    <div className="overflow-hidden border-y border-cream/10 bg-ink py-7 text-cream" aria-hidden>
      <div className="flex w-max [animation:marquee_28s_linear_infinite] hover:[animation-play-state:paused]">
        {[0, 1].map((k) => (
          <div key={k} className="flex">
            {row.map((t, i) => (
              <span key={i} className="flex items-center font-display text-[clamp(2rem,5vw,4.2rem)] leading-none">
                <span className={i % 2 ? 'italic text-gold' : ''}>{t}</span><span className="mx-[.6em] text-vermilion text-[.5em]">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
