import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useEditData } from '../context/EditContext'

function RiskLibraryPage() {
  const { data, updateRiskArea, addControlObjective, linkSimilarRisk, removeSimilarRisk, updateSimilarRiskNote } = useEditData()
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

  // Editing "why it's similar" — keyed by sim.id
  const [editingSimilarity, setEditingSimilarity] = useState(null)
  const [similarityDraft, setSimilarityDraft] = useState('')

  // Risk picker modal
  const [showPicker, setShowPicker] = useState(false)
  const [pickerQuery, setPickerQuery] = useState('')

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

  // Merge auto-detected (same name) + manually linked, deduplicated
  const linkedSimilarRisks = drawerRisk?.linkedSimilarRisks || []
  const linkedRiskIds = new Set(linkedSimilarRisks.map(s => s.riskId))

  const autoSimilarRisks = drawerRisk
    ? allRisks.filter(r => r.name === drawerRisk.name && r.id !== drawerRisk.id && !linkedRiskIds.has(r.id))
    : []

  // Combined list — manual links first (have full similarity field), then auto
  const allSimilarRisks = [
    ...linkedSimilarRisks.map(s => ({ ...s, isLinked: true })),
    ...autoSimilarRisks.map(r => ({ id: `auto-${r.id}`, riskId: r.id, name: r.name, programName: r.programName, functionName: r.functionName, description: r.description, similarity: '', isLinked: false, isAuto: true, _risk: r })),
  ]

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
    setEditingSimilarity(null); setSimilarityDraft('')
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

  function navigateToSimilar(sim) {
    const target = sim._risk || allRisks.find(r => r.id === sim.riskId)
    if (!target) return
    setDrawerStack(prev => [...prev, target.id])
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

  function saveSimilarityNote(sim) {
    if (!drawerRisk || !similarityDraft.trim()) return
    if (sim.isLinked) {
      updateSimilarRiskNote(drawerRisk, sim.id, similarityDraft.trim())
    } else {
      // Auto-detected: convert to a manual link first with the note
      linkSimilarRisk(drawerRisk, sim._risk)
      // Note will be updated after linking — we set it immediately via a separate call
      // The link will appear in linkedSimilarRisks next render; write note there
      const newSimId = `sim-risk-${sim.riskId}`
      updateSimilarRiskNote(drawerRisk, newSimId, similarityDraft.trim())
    }
    setEditingSimilarity(null)
    setSimilarityDraft('')
  }

  function handleUnlinkRisk(sim) {
    if (!drawerRisk || !sim.isLinked) return
    removeSimilarRisk(drawerRisk, sim.id, sim.riskId)
  }

  function openPicker() { setShowPicker(true); setPickerQuery('') }
  function closePicker() { setShowPicker(false); setPickerQuery('') }

  function handleLinkRisk(targetRisk) {
    if (!drawerRisk) return
    linkSimilarRisk(drawerRisk, targetRisk)
    closePicker()
  }

  // Risks available to pick — exclude self and already shown
  const shownRiskIds = new Set([
    drawerRisk?.id,
    ...linkedSimilarRisks.map(s => s.riskId),
    ...autoSimilarRisks.map(r => r.id),
  ])

  const pq = pickerQuery.toLowerCase()
  const pickerRisks = allRisks.filter(r =>
    !shownRiskIds.has(r.id) &&
    (
      r.name.toLowerCase().includes(pq) ||
      r.programName.toLowerCase().includes(pq) ||
      r.functionName.toLowerCase().includes(pq) ||
      r.description.toLowerCase().includes(pq)
    )
  )

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
                  {allSimilarRisks.length > 0 && (
                    <span className="test-drawer-count" style={{ background: drawerRisk.functionColor }}>
                      {allSimilarRisks.length}
                    </span>
                  )}
                </h3>
                {allSimilarRisks.length > 0 && (
                  <ul className="test-drawer-similar-list">
                    {allSimilarRisks.map(sim => (
                      <li key={sim.id} className="test-drawer-similar-item">
                        <div className="test-drawer-similar-row">
                          <div className="test-drawer-similar-info">
                            <span className="test-drawer-similar-name">{sim.name}</span>
                            <span className="test-drawer-similar-program">{sim.programName}</span>
                          </div>
                          <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
                            <button
                              className={`test-drawer-similar-btn${expandedSimilar === sim.id ? ' open' : ''}`}
                              onClick={() => toggleSimilar(sim.id)}
                              aria-expanded={expandedSimilar === sim.id}
                              aria-label="Show details"
                              style={{ borderColor: drawerRisk.functionColor, color: drawerRisk.functionColor }}
                            >
                              {expandedSimilar === sim.id ? '−' : '+'}
                            </button>
                            {sim.isLinked && (
                              <button
                                className="test-drawer-unlink-btn"
                                onClick={() => handleUnlinkRisk(sim)}
                                title="Remove link"
                                aria-label="Remove similar risk link"
                              >✕</button>
                            )}
                          </div>
                        </div>
                        {expandedSimilar === sim.id && (
                          <div className="test-drawer-similar-expanded">
                            <p className="test-drawer-similar-overview">{sim.description}</p>
                            <div className="test-drawer-similar-similarity">
                              <div className="test-drawer-similarity-label-row">
                                <span className="test-drawer-similar-similarity-label">Why it's similar</span>
                                {editingSimilarity !== sim.id && (
                                  <button
                                    className="test-drawer-similarity-edit-btn"
                                    onClick={() => { setEditingSimilarity(sim.id); setSimilarityDraft(sim.similarity || '') }}
                                    title="Edit"
                                  >✏️</button>
                                )}
                              </div>
                              {editingSimilarity === sim.id ? (
                                <>
                                  <textarea
                                    className="test-drawer-similarity-textarea"
                                    value={similarityDraft}
                                    onChange={e => setSimilarityDraft(e.target.value)}
                                    rows={3}
                                    autoFocus
                                  />
                                  <div className="test-drawer-add-row" style={{ marginTop: '0.4rem' }}>
                                    <button className="test-drawer-add-save" onClick={() => saveSimilarityNote(sim)} style={{ background: drawerRisk.functionColor }}>Save</button>
                                    <button className="test-drawer-add-cancel" onClick={() => { setEditingSimilarity(null); setSimilarityDraft('') }}>✕</button>
                                  </div>
                                </>
                              ) : (
                                <p>{sim.similarity || <em style={{ color: '#9ca3af' }}>No description yet — click ✏️ to add one.</em>}</p>
                              )}
                            </div>
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
                )}
                {allSimilarRisks.length === 0 && (
                  <p className="test-drawer-similar-empty">No similar risks linked yet.</p>
                )}
                <button
                  className="test-drawer-add-btn"
                  onClick={openPicker}
                  style={{ color: drawerRisk.functionColor, borderColor: drawerRisk.functionColor }}
                >
                  + Link Similar Risk
                </button>
              </section>

            </div>
          </aside>
        </>
      )}

      {/* ── Risk Picker Modal ── */}
      {showPicker && drawerRisk && (
        <>
          <div className="sim-picker-overlay" onClick={closePicker} />
          <div className="sim-picker-modal" role="dialog" aria-modal="true" aria-label="Link Similar Risk">
            <div className="sim-picker-header">
              <div>
                <h2 className="sim-picker-title">Link Similar Risk</h2>
                <p className="sim-picker-sub">Linking to <strong>{drawerRisk.name}</strong> — the link will appear on both risks automatically.</p>
              </div>
              <button className="sim-picker-close" onClick={closePicker} aria-label="Close">✕</button>
            </div>
            <div className="sim-picker-search-wrap">
              <input
                className="sim-picker-search"
                placeholder="Search by name, program, or function…"
                value={pickerQuery}
                onChange={e => setPickerQuery(e.target.value)}
                autoFocus
              />
            </div>
            <div className="sim-picker-list">
              {pickerRisks.length === 0 && (
                <p className="sim-picker-empty">
                  {pickerQuery ? `No risks match "${pickerQuery}"` : 'All risks are already linked.'}
                </p>
              )}
              {pickerRisks.map(r => (
                <div key={r.id} className="sim-picker-item">
                  <div className="sim-picker-item-info">
                    <span className="sim-picker-item-tag" style={{ background: r.functionColor }}>{r.functionName}</span>
                    <span className="sim-picker-item-program">{r.programName}</span>
                    <span className="sim-picker-item-name">{r.name}</span>
                    <span className="sim-picker-item-desc">{r.description}</span>
                  </div>
                  <button
                    className="sim-picker-link-btn"
                    onClick={() => handleLinkRisk(r)}
                    style={{ background: drawerRisk.functionColor }}
                  >
                    Link
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default RiskLibraryPage

// Made with Bob
