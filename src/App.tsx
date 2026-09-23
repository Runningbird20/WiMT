import { useEffect, useRef, useState } from 'react'
import siteLogo from './assets/voices-in-music-tech-logo.png'
import './App.css'

const pages = ['Home', 'Events', 'Members', 'Contact'] as const
type Page = (typeof pages)[number]

function currentPage(): Page {
  const hash = window.location.hash.slice(1).toLowerCase()
  return pages.find((page) => page.toLowerCase() === hash) ?? 'Home'
}

function App() {
  const [view, setView] = useState<{ page: Page; rotation: number }>(() => ({
    page: currentPage(),
    rotation: 0,
  }))
  const [dragPosition, setDragPosition] = useState<number | null>(null)
  const navRef = useRef<HTMLElement>(null)
  const dragInfoRef = useRef<{
    startX: number
    startPos: number
    didMove: boolean
  } | null>(null)

  useEffect(() => {
    const onHashChange = () => {
      const page = currentPage()
      setView((previous) => previous.page === page
        ? previous
        : { page, rotation: previous.rotation + 360 })
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const currentIndex = pages.indexOf(view.page)
  const isDragging = dragPosition !== null

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return
    event.currentTarget.setPointerCapture(event.pointerId)
    const startPos = 12.5 + currentIndex * 25
    dragInfoRef.current = {
      startX: event.clientX,
      startPos,
      didMove: false,
    }
    setDragPosition(startPos)
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragInfoRef.current || !navRef.current) return
    const deltaX = event.clientX - dragInfoRef.current.startX
    if (Math.abs(deltaX) > 3) {
      dragInfoRef.current.didMove = true
    }
    const rect = navRef.current.getBoundingClientRect()
    if (rect.width <= 0) return
    const deltaPercent = (deltaX / rect.width) * 100
    const clamped = Math.max(12.5, Math.min(87.5, dragInfoRef.current.startPos + deltaPercent))
    setDragPosition(clamped)
  }

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragInfoRef.current) return
    try {
      event.currentTarget.releasePointerCapture(event.pointerId)
    } catch {
      // Ignore if capture was lost
    }

    const { didMove, startPos } = dragInfoRef.current
    const finalPos = dragPosition ?? startPos
    dragInfoRef.current = null
    setDragPosition(null)

    if (didMove) {
      const targetIndex = Math.min(
        pages.length - 1,
        Math.max(0, Math.round((finalPos - 12.5) / 25))
      )
      const targetPage = pages[targetIndex]
      if (targetPage !== view.page) {
        if (window.location.hash === `#${targetPage.toLowerCase()}`) {
          setView((prev) => ({ page: targetPage, rotation: prev.rotation + 360 }))
        } else {
          window.location.hash = targetPage.toLowerCase()
        }
      }
    } else {
      setView((prev) => ({ ...prev, rotation: prev.rotation + 360 }))
    }
  }

  const handlePointerCancel = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragInfoRef.current) {
      try {
        event.currentTarget.releasePointerCapture(event.pointerId)
      } catch {
        // Ignore
      }
      dragInfoRef.current = null
      setDragPosition(null)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    let nextIndex = currentIndex
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = Math.min(pages.length - 1, currentIndex + 1)
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = Math.max(0, currentIndex - 1)
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = pages.length - 1
    } else {
      return
    }
    event.preventDefault()
    const targetPage = pages[nextIndex]
    if (targetPage === view.page) {
      setView((prev) => ({ ...prev, rotation: prev.rotation + 360 }))
    } else if (window.location.hash === `#${targetPage.toLowerCase()}`) {
      setView((prev) => ({ page: targetPage, rotation: prev.rotation + 360 }))
    } else {
      window.location.hash = targetPage.toLowerCase()
    }
  }

  return (
    <main className="home" aria-label={`ViMT ${view.page}`}>
      <div className="site-brand">
        <img src={siteLogo} alt="Voices in Music Tech" width="2060" height="763" />
      </div>
      <header className="page-header">
        <div className="fader-panel">
          <div className="fader-caption">
            <span><i aria-hidden="true" /> ViMT · CHANNEL SELECT</span>
          </div>
          <nav
            ref={navRef}
            className={`page-nav${isDragging ? ' is-dragging' : ''}`}
            data-current={view.page.toLowerCase()}
            aria-label="Main navigation"
          >
            <div className="fader-scale" aria-hidden="true" />
            <div className="fader-slot" aria-hidden="true" />
            <div
              className={`fader-cap${isDragging ? ' is-dragging' : ''}`}
              role="slider"
              tabIndex={0}
              aria-label="Channel select"
              aria-valuemin={0}
              aria-valuemax={3}
              aria-valuenow={currentIndex}
              aria-valuetext={view.page}
              style={dragPosition !== null ? { left: `${dragPosition}%` } : undefined}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerCancel}
              onKeyDown={handleKeyDown}
            >
              <span />
            </div>
            {pages.map((page, index) => (
              <a
                key={page}
                href={`#${page.toLowerCase()}`}
                draggable={false}
                aria-current={view.page === page ? 'page' : undefined}
                onClick={(event) => {
                  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
                  if (view.page === page) {
                    event.preventDefault()
                    setView((previous) => ({ ...previous, rotation: previous.rotation + 360 }))
                  }
                }}
              >
                <span className="fader-value" aria-hidden="true">{['−∞', '−10', '0', '+10'][index]}</span>
                <span className="fader-page">{page}</span>
              </a>
            ))}
          </nav>
          <span className="panel-screw screw-left" aria-hidden="true" />
          <span className="panel-screw screw-right" aria-hidden="true" />
        </div>
      </header>
      <div className="record-position">
        <div className="record" style={{ transform: `rotate(${view.rotation}deg)` }}>
          <span className="record-track" aria-hidden="true">ViMT · SIDE A · 33⅓ RPM</span>
          <section key={view.page} className="page-content" aria-label={view.page} aria-live="polite">
            <h1>{view.page === 'Home' ? 'Welcome to ViMT!' : view.page}</h1>
            <div className="record-copy">
              {view.page === 'Home' && (<>
                <article className="record-section"><h2>All are welcome</h2><p>We support underrepresented voices in music technology. All are welcome!</p><h3>Our mission</h3><p>Identify, connect, and support underrepresented voices in music technology.</p></article>
                <article className="record-section"><h2>Share your achievements</h2><p>We highlight community achievements at every club meeting. Contact <a href="#members">Jalyn or Dion</a> to learn more.</p><p>Get involved at our <a href="#events">events</a>. We look forward to seeing you!</p></article>
                <article className="record-section"><h2>Join the crew</h2><p>Help with logistics or design. Fill out the <a href="https://forms.cloud.microsoft/r/RKWu2n6y9j">ViMT Interest form</a> and we’ll contact you with more information.</p></article>
                <article className="record-section"><h2>Stay connected</h2><p className="social-links"><a href="https://www.instagram.com/vimt_gt/">Our Instagram ↗</a><a href="mailto:vimt.gt@outlook.com">vimt.gt@outlook.com</a></p></article>
              </>)}
              {view.page === 'Events' && (<>
                <article className="record-section"><h2>Kickoff Karaoke Mixer</h2><p>Saturday, September 26</p><p>Time &amp; location: Coming soon</p></article>
                <article className="record-section"><h2>October Monthly Meeting</h2><p>Date, time &amp; location: Coming soon</p><p>Meeting details: Coming soon</p></article>
                <article className="record-section"><h2>Monthly meetings</h2><p>Recurring meeting week: Coming soon</p><p>We look forward to seeing you at our events!</p></article>
                <article className="record-section"><h2>Make it happen</h2><p>Interested in cohosting an event? Contact <a href="#members">Jalyn or Dion</a>.</p><p>Join our logistics or design crew through the <a href="https://forms.cloud.microsoft/r/RKWu2n6y9j">ViMT Interest form</a>.</p></article>
              </>)}
              {view.page === 'Members' && (<>
                <article className="record-section"><h2>Jalyn <span>she/her</span></h2><h3>President</h3><p><a href="mailto:jfisher79@gatech.edu">jfisher79@gatech.edu</a></p></article>
                <article className="record-section"><h2>Dion <span>she/they</span></h2><h3>Vice President &amp; Logistics Chair</h3><p><a href="mailto:ebackus6@gatech.edu">ebackus6@gatech.edu</a></p></article>
                <article className="record-section"><h2>Community achievements</h2><p>We highlight achievements at each club meeting. Contact Jalyn or Dion to learn more or share yours.</p></article>
                <article className="record-section"><h2>Meet the community</h2><p>More member profiles: Coming soon</p><p>All are welcome!</p></article>
              </>)}
              {view.page === 'Contact' && (<>
                <article className="record-section"><h2>Cohost an event</h2><p>Help us reach more people. To cohost an event, contact Jalyn (she/her), our President, or Dion (she/they), our Vice President and Logistics Chair.</p></article>
                <article className="record-section"><h2>Contact the team</h2><p>Jalyn: <a href="mailto:jfisher79@gatech.edu">jfisher79@gatech.edu</a></p><p>Dion: <a href="mailto:ebackus6@gatech.edu">ebackus6@gatech.edu</a></p></article>
                <article className="record-section"><h2>Join the crew</h2><p>Help with logistics or design. Fill out the <a href="https://forms.cloud.microsoft/r/RKWu2n6y9j">ViMT Interest form</a> and we’ll contact you with more information.</p></article>
                <article className="record-section"><h2>Stay connected</h2><p className="social-links"><a href="https://www.instagram.com/vimt_gt/">Our Instagram ↗</a><a href="mailto:vimt.gt@outlook.com">vimt.gt@outlook.com</a></p></article>
              </>)}
            </div>
          </section>
          <div className="record-label" aria-hidden="true">
            <span className="record-hole" />
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
