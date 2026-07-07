import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function NavMenu() {
  const [open, setOpen] = useState(false)

  return (
    <div className="nav-menu">
      <button
        className="hamburger-btn"
        onClick={() => setOpen(!open)}
        aria-label="Open navigation menu"
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      {open && (
        <>
          <div className="nav-overlay" onClick={() => setOpen(false)} />
          <div className="nav-drawer">
            <div className="nav-drawer-header">
              <span className="nav-drawer-title">Navigation</span>
              <button className="nav-close-btn" onClick={() => setOpen(false)} aria-label="Close menu">✕</button>
            </div>
            <nav className="nav-links">
              <Link to="/" className="nav-link" onClick={() => setOpen(false)}>
                Home
              </Link>
              <Link to="/programs" className="nav-link" onClick={() => setOpen(false)}>
                Program List
              </Link>
              <Link to="/risk-library" className="nav-link" onClick={() => setOpen(false)}>
                Risk Library
              </Link>
              <Link to="/test-library" className="nav-link" onClick={() => setOpen(false)}>
                Test Library
              </Link>
              <div className="nav-divider" />
              <Link to="/ask-audit" className="nav-link nav-link-highlight" onClick={() => setOpen(false)}>
                Ask Audit
              </Link>
            </nav>
          </div>
        </>
      )}
    </div>
  )
}

export default NavMenu

// Made with Bob
