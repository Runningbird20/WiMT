import { useEffect, useState } from 'react'
import './App.css'

const pages = ['Home', 'Events', 'Members', 'Contact'] as const

function currentPage() {
  const hash = window.location.hash.slice(1).toLowerCase()
  return pages.find((page) => page.toLowerCase() === hash) ?? 'Home'
}

function App() {
  const [view, setView] = useState(() => ({ page: currentPage(), rotation: 0 }))

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

  return (
    <main className="home" aria-label={`WiMT ${view.page}`}>
      <header className="page-header">
        <div className="fader-panel">
          <div className="fader-caption">
            <span><i aria-hidden="true" /> WiMT · CHANNEL SELECT</span>
          </div>
          <nav className="page-nav" data-current={view.page.toLowerCase()} aria-label="Main navigation">
            <div className="fader-scale" aria-hidden="true" />
            <div className="fader-slot" aria-hidden="true" />
            <div className="fader-cap" aria-hidden="true"><span /></div>
            {pages.map((page, index) => (
              <a
                key={page}
                href={`#${page.toLowerCase()}`}
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
      <section
        key={view.page}
        id={view.page.toLowerCase()}
        className={`page-content${view.rotation ? ' page-content-enter' : ''}`}
        aria-label={view.page}
        aria-live="polite"
      >
        <p className="page-eyebrow">WiMT</p>
        <h1>{view.page}</h1>
      </section>
      <div className="record-position">
        <div className="record" aria-hidden="true" style={{ transform: `rotate(${view.rotation}deg)` }}>
          <span className="record-track">WiMT · SIDE A</span>
          <div className="record-label">
            <span className="record-title">{view.page}</span>
            <span className="record-caption">SIDE A · 33⅓ RPM</span>
            <span className="record-hole" />
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
