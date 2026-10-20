import { useState } from 'react'
import { useLenis } from './hooks/useLenis'
import { Loader } from './components/Loader'
import { Cursor } from './components/Cursor'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { Story } from './components/Story'
import { RamenShowcase } from './components/RamenShowcase'
import { Menu } from './components/Menu'
import { Gallery } from './components/Gallery'
import { Founder } from './components/Founder'
import { Reviews } from './components/Reviews'
import { Visit } from './components/Visit'
import { Footer } from './components/Footer'
import { WhatsAppFab } from './components/WhatsAppFab'

export default function App() {
  const [ready, setReady] = useState(false)
  useLenis(ready)
  return (
    <>
      <Loader onDone={() => setReady(true)} />
      <Cursor />
      <Nav />
      <main>
        <Hero ready={ready} />
        <Marquee />
        <Story />
        <RamenShowcase />
        <Menu />
        <Gallery />
        <Founder />
        <Reviews />
        <Visit />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  )
}
