import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useEditData } from '../context/EditContext'

function RiskLibraryPage() {
  const { data, updateRiskArea, addControlObjective } = useEditData()
  const [searchParams] = useSearchParams()

  const [query, setQuery] = useState(() => searchParams.get('q') || '')

  useEffect(() => {
    const q = searchParams.get('q')
    if (q) setQuery(q)
  }, [searchParams])
  const [drawerStack, setDrawerStack] = useState([])
  const [expandedSimilar, setExpandedSimilar] = useState(null)

  // Description edit state
  const [editingDesc, setEditingDesc] = useState(false)
  const [draftDesc, setDraftDesc] = useState('')

  // Add control objective state
  const [addingObj, setAddingObj] = useState(false)
  const [newObjName, setNewObjName] = useState('')
  const [newObjDesc, setNewObjDesc] = useState('')

  const allRisks = Object.entries(data).flatMap(([functionId, functionData]) =>
    functionData.programs.flatMap(program =>
      program.riskAreas.map(riskArea => ({
        ...riskArea,
        functionId,
        programId: program.id,
        functionName: functionData.name,
        functionColor: functionData.color,
        programName: program.name,
        programUrl: program.pdfUrl,
      }))
    )
  )

  // Current drawer risk resolved from live data
  const drawerRiskId = drawerStack[drawerStack.length - 1] ?? null
  const drawerRisk = drawerRiskId ? allRisks.find(r => r.id === drawerRiskId) ?? null : null

  // Similar risks: same name, different program
  const similarRisks = drawerRisk
    ? allRisks.filter(r => r.name === drawerRisk.name && r.id !== drawerRisk.id)
    : []

  const q = query.toLowerCase()
  const filtered = allRisks.filter(r =>
    r.name.toLowerCase().includes(q) ||
    r.description.toLowerCase().includes(q) ||
    r.functionName.toLowerCase().includes(q) ||
    r.programName.toLowerCase().includes(q)
  )

  function resetEditState() {
    setEditingDesc(false); setDraftDesc('')
    setAddingObj(false); setNewObjName(''); setNewObjDesc('')
  }

  function openDrawer(risk, e) {
    e.stopPropagation()
    setDrawerStack([risk.id])
    setExpandedSimilar(null)
    resetEditState()
  }

  function closeDrawer() {
    setDrawerStack([])
    setExpandedSimilar(null)
    resetEditState()
  }

  function navigateToSimilar(risk) {
    setDrawerStack(prev => [...prev, risk.id])
    setExpandedSimilar(null)
    resetEditState()
  }

  function drawerGoBack() {
    setDrawerStack(prev => prev.slice(0, -1))
    setExpandedSimilar(null)
    resetEditState()
  }

  function toggleSimilar(id) {
    setExpandedSimilar(prev => prev === id ? null : id)
  }

  function saveDesc() {
    if (!drawerRisk || !draftDesc.trim()) return
    updateRiskArea(drawerRisk.functionId, drawerRisk.programId, drawerRisk.id, { description: draftDesc.trim() })
    setEditingDesc(false)
  }

  function saveNewObj() {
    if (!drawerRisk || !newObjName.trim()) return
    addControlObjective(drawerRisk.functionId, drawerRisk.programId, drawerRisk.id, newObjName.trim(), newObjDesc.trim())
    setAddingObj(false); setNewObjName(''); setNewObjDesc('')
  }

  function removeObjective(objId) {
    if (!drawerRisk) return
    const updated = drawerRisk.controlObjectives.filter(o => o.id !== objId)
    updateRiskArea(drawerRisk.functionId, drawerRisk.programId, drawerRisk.id, { controlObjectives: updated })
  }

  return (
    <div className="library-page">
      <div className="library-header">
        <h1 className="library-title">Risk Library</h1>
        <p className="library-subtitle">All risk areas across all audit programs</p>
        <div className="library-search-bar">
          <input
            type="text"
            placeholder="Search risks..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="library-search-input"
          />
          {query && (
            <span className="library-search-count">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
          )}
        </div>
      </div>

      <div className="library-grid">
        {filtered.map(risk => (
          <div
            key={risk.id}
            className="library-card"
            style={{ borderColor: risk.functionColor, position: 'relative' }}
          >
            <div className="library-card-tag" style={{ background: risk.functionColor }}>
              {risk.functionName}
            </div>
            <div className="library-card-meta">{risk.programName}</div>
            <h3 className="library-card-title">{risk.name}</h3>
            <p className="library-card-desc">{risk.description}</p>
            <Link
              to={`/function/${risk.functionId}`}
              className="library-card-link"
              style={{ color: risk.functionColor }}
            >
              View Program →
            </Link>
            <button
              className="test-summary-btn"
              onClick={e => openDrawer(risk, e)}
              aria-label="Open risk summary"
              style={{ borderColor: risk.functionColor, color: risk.functionColor }}
            >
              +
            </button>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="library-no-results">No risk areas match "{query}"</p>
        )}
      </div>

      {/* ── Risk Summary Drawer ── */}
      {drawerRisk && (
        <>
          <div className="test-drawer-overlay" onClick={closeDrawer} />
          <aside
            className="test-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Risk Summary"
          >
            {/* Header */}
            <div className="test-drawer-header" style={{ borderBottomColor: drawerRisk.functionColor }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="test-drawer-tag-row">
                  <div className="test-drawer-tag" style={{ background: drawerRisk.functionColor }}>
                    {drawerRisk.functionName}
                  </div>
                  {drawerStack.length > 1 && (
                    <button className="test-drawer-back" onClick={drawerGoBack}>
                      ← Back
                    </button>
                  )}
                </div>
                <div className="test-drawer-meta">{drawerRisk.programName}</div>
                <h2 className="test-drawer-title">{drawerRisk.name}</h2>
              </div>
              <button className="test-drawer-close" onClick={closeDrawer} aria-label="Close">✕</button>
            </div>

            {/* Body */}
            <div className="test-drawer-body">

              {/* Risk Description */}
              <section className="test-drawer-section">
                <h3 className="test-drawer-section-title" style={{ color: drawerRisk.functionColor }}>
                  <span className="test-drawer-section-icon">⚠️</span>
                  Risk Description
                  {!editingDesc && (
                    <button
                      className="risk-drawer-edit-btn"
                      onClick={() => { setEditingDesc(true); setDraftDesc(drawerRisk.description) }}
                      title="Edit description"
                    >✏️</button>
                  )}
                </h3>
                {editingDesc ? (
                  <div className="risk-drawer-edit-block">
                    <textarea
                      className="risk-drawer-textarea"
                      value={draftDesc}
                      onChange={e => setDraftDesc(e.target.value)}
                      rows={4}
                      autoFocus
                    />
                    <div className="risk-drawer-edit-actions">
                      <button className="test-drawer-add-save" onClick={saveDesc} style={{ background: drawerRisk.functionColor }}>Save</button>
                      <button className="test-drawer-add-cancel" onClick={() => setEditingDesc(false)}>✕</button>
                    </div>
                  </div>
                ) : (
                  <p className="risk-drawer-desc">{drawerRisk.description}</p>
                )}
              </section>

              {/* Control Objectives */}
              <section className="test-drawer-section">
                <h3 className="test-drawer-section-title" style={{ color: drawerRisk.functionColor }}>
                  <span className="test-drawer-section-icon">🛡️</span>
                  Control Objectives
                  {drawerRisk.controlObjectives?.length > 0 && (
                    <span className="test-drawer-count" style={{ background: drawerRisk.functionColor }}>
                      {drawerRisk.controlObjectives.length}
                    </span>
                  )}
                </h3>
                {drawerRisk.controlObjectives?.length > 0 && (
                  <ul className="risk-drawer-objectives-list">
                    {drawerRisk.controlObjectives.map(obj => (
                      <li key={obj.id} className="risk-drawer-objective-item">
                        <div className="risk-drawer-objective-row">
                          <span className="risk-drawer-objective-name">{obj.name}</span>
                          <button
                            className="test-drawer-item-remove"
                            onClick={() => removeObjective(obj.id)}
                            title="Remove"
                            style={{ opacity: 1 }}
                          >✕</button>
                        </div>
                        {obj.description && (
                          <p className="risk-drawer-objective-desc">{obj.description}</p>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
                {addingObj ? (
                  <div className="risk-drawer-add-obj-block">
                    <input
                      className="test-drawer-add-input"
                      placeholder="Objective name..."
                      value={newObjName}
                      onChange={e => setNewObjName(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Escape') { setAddingObj(false); setNewObjName(''); setNewObjDesc('') }}}
                      autoFocus
                    />
                    <input
                      className="test-drawer-add-input"
                      placeholder="Objective description (optional)..."
                      value={newObjDesc}
                      onChange={e => setNewObjDesc(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') saveNewObj(); if (e.key === 'Escape') { setAddingObj(false); setNewObjName(''); setNewObjDesc('') }}}
                    />
                    <div className="test-drawer-add-row" style={{ marginTop: '0.4rem' }}>
                      <button className="test-drawer-add-save" onClick={saveNewObj} style={{ background: drawerRisk.functionColor }}>Add</button>
                      <button className="test-drawer-add-cancel" onClick={() => { setAddingObj(false); setNewObjName(''); setNewObjDesc('') }}>✕</button>
                    </div>
                  </div>
                ) : (
                  <button className="test-drawer-add-btn" onClick={() => setAddingObj(true)} style={{ color: drawerRisk.functionColor, borderColor: drawerRisk.functionColor }}>
                    + Add Control Objective
                  </button>
                )}
              </section>

              {/* Similar Risks */}
              <section className="test-drawer-section">
                <h3 className="test-drawer-section-title" style={{ color: drawerRisk.functionColor }}>
                  <span className="test-drawer-section-icon">🔗</span>
                  Similar Risks
                  {similarRisks.length > 0 && (
                    <span className="test-drawer-count" style={{ background: drawerRisk.functionColor }}>
                      {similarRisks.length}
                    </span>
                  )}
                </h3>
                {similarRisks.length > 0 ? (
                  <ul className="test-drawer-similar-list">
                    {similarRisks.map(sim => (
                      <li key={sim.id} className="test-drawer-similar-item">
                        <div className="test-drawer-similar-row">
                          <div className="test-drawer-similar-info">
                            <span className="test-drawer-similar-name">{sim.name}</span>
                            <span className="test-drawer-similar-program">{sim.programName}</span>
                          </div>
                          <button
                            className={`test-drawer-similar-btn${expandedSimilar === sim.id ? ' open' : ''}`}
                            onClick={() => toggleSimilar(sim.id)}
                            aria-expanded={expandedSimilar === sim.id}
                            aria-label="Show details"
                            style={{ borderColor: drawerRisk.functionColor, color: drawerRisk.functionColor }}
                          >
                            {expandedSimilar === sim.id ? '−' : '+'}
                          </button>
                        </div>
                        {expandedSimilar === sim.id && (
                          <div className="test-drawer-similar-expanded">
                            <p className="test-drawer-similar-overview">{sim.description}</p>
                            <button
                              className="test-drawer-similar-link test-drawer-similar-nav"
                              onClick={() => navigateToSimilar(sim)}
                              style={{ color: drawerRisk.functionColor }}
                            >
                              View {sim.name} in {sim.programName} →
                            </button>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="test-drawer-similar-empty">No similar risks found in other programs.</p>
                )}
              </section>

            </div>
          </aside>
        </>
      )}
    </div>
  )
}

export default RiskLibraryPage

// Made with Bob
