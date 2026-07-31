import React, { useState, useMemo } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
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
  { id: 'chq_controller',        label: 'CHQ Controller' },
  { id: 'treasury',              label: 'Treasury' },
  { id: 'ibm_financing',         label: 'IBM Financing' },
  { id: 'tax',                   label: 'Tax' },
  { id: 'global_procurement',    label: 'Global Procurement' },
  { id: 'human_resources',       label: 'Human Resources' },
  { id: 'ibm_infrastructure',    label: 'IBM Infrastructure' },
  { id: 'marketing_comms',       label: 'Marketing and Communications' },
  { id: 'global_sales',          label: 'Global Sales' },
  { id: 'quote_to_cash',         label: 'Quote to Cash and Operations' },
  { id: 'global_sales_incentives', label: 'Global Sales Incentives' },
  { id: 'global_real_estate',    label: 'IBM Global Real Estate' },
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
            out.push({ type: 'Risk Area', name: ra.name, path: `/risk-library?q=${encodeURIComponent(ra.name)}` })
          ra.controlObjectives.forEach(co =>
            co.controls.forEach(ctrl => {
              if (ctrl.name.toLowerCase().includes(q))
                out.push({ type: 'Control', name: ctrl.name, path: `/test-library?q=${encodeURIComponent(ctrl.name)}` })
              ctrl.testTemplates.forEach(tt => {
                if (tt.name.toLowerCase().includes(q))
                  out.push({ type: 'Test', name: tt.name, path: `/test-library?q=${encodeURIComponent(tt.name)}` })
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
          <Link to="/" className="brand-logo-link">
            <img className="brand-logo" src={ibmLogo} alt="IBM — Home" />
          </Link>
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
