import React, { useState, useMemo } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import FlowchartPage from './pages/FlowchartPage'
import DetailPage from './pages/DetailPage'
import ProgramListPage from './pages/ProgramListPage'
import RiskLibraryPage from './pages/RiskLibraryPage'
import TestLibraryPage from './pages/TestLibraryPage'
import NavMenu from './components/NavMenu'
import AuditChatbot from './components/AuditChatbot'
import AskAuditPage from './pages/AskAuditPage'
import { EditProvider } from './context/EditContext'
import ibmLogo from './assets/ibm logo.png'
import { auditData } from './data/condensedData'

const functionOrder = [
  { id: 'finance',       label: 'Finance' },
  { id: 'accounting',    label: 'Accounting' },
  { id: 'manufacturing', label: 'Manufacturing and Parts' },
  { id: 'marketing',     label: 'Marketing' },
  { id: 'it',            label: 'Information Technology' },
]

function HeaderSearch() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    const out = []
    functionOrder.forEach(({ id, label }) => {
      const fn = auditData[id]
      if (!fn) return
      if (label.toLowerCase().includes(q) || fn.description.toLowerCase().includes(q))
        out.push({ type: 'Function', name: label, path: `/function/${id}` })
      fn.programs.forEach(p => {
        if (p.name.toLowerCase().includes(q))
          out.push({ type: 'Program', name: p.name, path: `/function/${id}` })
        p.riskAreas.forEach(ra => {
          if (ra.name.toLowerCase().includes(q))
            out.push({ type: 'Risk Area', name: ra.name, path: `/function/${id}` })
          ra.controlObjectives.forEach(co =>
            co.controls.forEach(ctrl => {
              if (ctrl.name.toLowerCase().includes(q))
                out.push({ type: 'Control', name: ctrl.name, path: `/function/${id}` })
              ctrl.testTemplates.forEach(tt => {
                if (tt.name.toLowerCase().includes(q))
                  out.push({ type: 'Test', name: tt.name, path: `/function/${id}` })
              })
            })
          )
        })
      })
    })
    return out.slice(0, 8)
  }, [query])

  function go(path) {
    navigate(path)
    setQuery('')
  }

  return (
    <div className="header-search-wrap">
      <div className="header-search-box">
        <span className="header-search-icon">🔍</span>
        <input
          className="header-search-input"
          placeholder="Search…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          autoComplete="off"
        />
        {query && (
          <button className="header-search-clear" onClick={() => setQuery('')}>✕</button>
        )}
      </div>
      {query && (
        <div className="header-search-results">
          {results.length === 0 && (
            <div className="header-search-empty">No results for "{query}"</div>
          )}
          {results.map((r, i) => (
            <div key={i} className="header-search-result" onClick={() => go(r.path)}>
              <span className="hp-search-type">{r.type}</span>
              <span className="hp-search-name">{r.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function App() {
  return (
    <EditProvider>
    <div className="app">
      <header className="site-header">
        <div className="site-header-left">
          <img className="brand-logo" src={ibmLogo} alt="IBM" />
          <div className="brand-divider" />
          <span className="brand-text">Corporate Assurance & Advisory Services</span>
        </div>
        <HeaderSearch />
        <NavMenu />
      </header>
      <div className="page-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/function/:functionId" element={<FlowchartPage />} />
          <Route path="/detail/:functionId/:path" element={<DetailPage />} />
          <Route path="/programs" element={<ProgramListPage />} />
          <Route path="/risk-library" element={<RiskLibraryPage />} />
          <Route path="/test-library" element={<TestLibraryPage />} />
          <Route path="/ask-audit" element={<AskAuditPage />} />
        </Routes>
      </div>
      <AuditChatbot />
    </div>
    </EditProvider>
  )
}

export default App

// Made with Bob
