import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useEditData } from '../context/EditContext'

// Maps test ID prefix → human-readable group label
const GROUP_LABELS = {
  'SD001': 'Separation of Duties',
  'CA001': 'Accounting Controls & Measurements',
  'DI001': 'Data Integrity',
  'PI001': 'Physical Inventory / Process',
  'PI002': 'Manual Ledger Entries',
  'PI003': 'Miscodes',
  'PI004': 'Consolidation & Reporting',
  'PI005': 'AIW Segmentation',
  'PI007': 'Spreadsheet Controls',
  'IA001': 'Intercompany Processing',
  'IA002': 'Intercompany Settlements',
  'IA003': 'ICA Controls',
  'IT001': 'IT / Tax Controls',
  'IT002': 'IT Accounting Controls',
  'RC001': 'Revenue & Cost Recognition',
  'RA001': 'Insurance Risk Analysis',
  'RA005': 'Vendor Contracts',
  'RA006': 'Insurance Claims',
}

function getGroupPrefix(testName) {
  const match = testName.match(/^([A-Z]{2}\d{3})/)
  return match ? match[1] : null
}

function TestLibraryPage() {
  const { data, updateTestTemplate, linkSimilarTest, removeSimilarTest } = useEditData()

  const [searchParams] = useSearchParams()

  const [query, setQuery] = useState(() => searchParams.get('q') || '')
  const [groupFilter, setGroupFilter] = useState('')

  useEffect(() => {
    const q = searchParams.get('q')
    if (q) setQuery(q)
  }, [searchParams])
  const [drawerStack, setDrawerStack] = useState([])   // navigation history
  const [expandedSimilar, setExpandedSimilar] = useState(null)

  // current drawer is the top of the stack
  const drawerTestId = drawerStack[drawerStack.length - 1] ?? null

  // Add-form state per section
  const [addingStep, setAddingStep] = useState(false)
  const [newStep, setNewStep] = useState('')
  const [addingSource, setAddingSource] = useState(false)
  const [newSource, setNewSource] = useState('')
  const [addingEvidence, setAddingEvidence] = useState(false)
  const [newEvidence, setNewEvidence] = useState('')

  // Similar test picker
  const [showPicker, setShowPicker] = useState(false)
  const [pickerQuery, setPickerQuery] = useState('')

  // Editing "why it's similar" — keyed by sim.id
  const [editingSimilarity, setEditingSimilarity] = useState(null) // sim.id being edited
  const [similarityDraft, setSimilarityDraft] = useState('')

  const allTests = Object.entries(data).flatMap(([functionId, functionData]) =>
    functionData.programs.flatMap(program =>
      program.riskAreas.flatMap(riskArea =>
        riskArea.controlObjectives.flatMap(objective =>
          objective.controls.flatMap(control =>
            control.testTemplates.map(template => ({
              ...template,
              functionId,
              programId: program.id,
              riskAreaId: riskArea.id,
              objectiveId: objective.id,
              controlId: control.id,
              functionName: functionData.name,
              functionColor: functionData.color,
              programName: program.name,
              controlName: control.name
            }))
          )
        )
      )
    )
  )

  // Always resolve drawer from live data so edits appear immediately
  const drawerTest = drawerTestId ? allTests.find(t => t.id === drawerTestId) ?? null : null

  function openDrawer(test, e) {
    e.stopPropagation()
    setDrawerStack([test.id])
    setExpandedSimilar(null)
    setAddingStep(false); setNewStep('')
    setAddingSource(false); setNewSource('')
    setAddingEvidence(false); setNewEvidence('')
  }

  function closeDrawer() {
    setDrawerStack([])
    setExpandedSimilar(null)
    setAddingStep(false); setNewStep('')
    setAddingSource(false); setNewSource('')
    setAddingEvidence(false); setNewEvidence('')
  }

  function navigateToSimilar(sim) {
    const target = allTests.find(t => t.name === sim.name && t.programName === sim.program)
    if (!target) return
    setDrawerStack(prev => [...prev, target.id])
    setExpandedSimilar(null)
    setAddingStep(false); setNewStep('')
    setAddingSource(false); setNewSource('')
    setAddingEvidence(false); setNewEvidence('')
  }

  function drawerGoBack() {
    setDrawerStack(prev => prev.slice(0, -1))
    setExpandedSimilar(null)
    setAddingStep(false); setNewStep('')
    setAddingSource(false); setNewSource('')
    setAddingEvidence(false); setNewEvidence('')
  }

  function toggleSimilar(id) {
    setExpandedSimilar(prev => prev === id ? null : id)
  }

  function openPicker() { setShowPicker(true); setPickerQuery('') }
  function closePicker() { setShowPicker(false); setPickerQuery('') }

  function handleLinkTest(targetTest) {
    if (!drawerTest) return
    linkSimilarTest(drawerTest, targetTest)
    closePicker()
  }

  function saveSimilarity(sim) {
    if (!drawerTest || !similarityDraft.trim()) return
    const updated = (drawerTest.similarTests || []).map(s =>
      s.id === sim.id ? { ...s, similarity: similarityDraft.trim() } : s
    )
    updateTestTemplate(
      drawerTest.functionId, drawerTest.programId, drawerTest.riskAreaId,
      drawerTest.objectiveId, drawerTest.controlId, drawerTest.id,
      { similarTests: updated }
    )
    setEditingSimilarity(null)
    setSimilarityDraft('')
  }

  function handleUnlinkTest(sim) {
    if (!drawerTest) return
    // Extract the original test id from the sim id if it was a manual link
    const linkedTestId = sim.id.startsWith('sim-linked-') ? sim.id.replace('sim-linked-', '') : null
    removeSimilarTest(drawerTest, sim.id, linkedTestId)
  }

  // Tests available to link: exclude self and already-linked
  const alreadyLinkedIds = new Set([
    drawerTest?.id,
    ...(drawerTest?.similarTests?.map(s => s.id.replace('sim-linked-', '')) ?? []),
    ...(drawerTest?.similarTests?.map(s => {
      const t = allTests.find(t => t.name === s.name && t.programName === s.program)
      return t?.id
    }).filter(Boolean) ?? []),
  ])

  const pq = pickerQuery.toLowerCase()
  const pickerTests = allTests.filter(t =>
    t.id !== drawerTest?.id &&
    !alreadyLinkedIds.has(t.id) &&
    (
      t.name.toLowerCase().includes(pq) ||
      t.programName.toLowerCase().includes(pq) ||
      t.functionName.toLowerCase().includes(pq) ||
      t.description.toLowerCase().includes(pq)
    )
  )

  function saveStep() {
    if (!newStep.trim() || !drawerTest) return
    const current = drawerTest.stepsPerformed || []
    updateTestTemplate(
      drawerTest.functionId, drawerTest.programId, drawerTest.riskAreaId,
      drawerTest.objectiveId, drawerTest.controlId, drawerTest.id,
      { stepsPerformed: [...current, newStep.trim()] }
    )
    setNewStep(''); setAddingStep(false)
  }

  function saveSource() {
    if (!newSource.trim() || !drawerTest) return
    const current = drawerTest.dataSources || []
    updateTestTemplate(
      drawerTest.functionId, drawerTest.programId, drawerTest.riskAreaId,
      drawerTest.objectiveId, drawerTest.controlId, drawerTest.id,
      { dataSources: [...current, newSource.trim()] }
    )
    setNewSource(''); setAddingSource(false)
  }

  function saveEvidence() {
    if (!newEvidence.trim() || !drawerTest) return
    const current = drawerTest.evidence || []
    updateTestTemplate(
      drawerTest.functionId, drawerTest.programId, drawerTest.riskAreaId,
      drawerTest.objectiveId, drawerTest.controlId, drawerTest.id,
      { evidence: [...current, newEvidence.trim()] }
    )
    setNewEvidence(''); setAddingEvidence(false)
  }

  function removeStep(index) {
    if (!drawerTest) return
    const updated = (drawerTest.stepsPerformed || []).filter((_, i) => i !== index)
    updateTestTemplate(
      drawerTest.functionId, drawerTest.programId, drawerTest.riskAreaId,
      drawerTest.objectiveId, drawerTest.controlId, drawerTest.id,
      { stepsPerformed: updated }
    )
  }

  function removeSource(index) {
    if (!drawerTest) return
    const updated = (drawerTest.dataSources || []).filter((_, i) => i !== index)
    updateTestTemplate(
      drawerTest.functionId, drawerTest.programId, drawerTest.riskAreaId,
      drawerTest.objectiveId, drawerTest.controlId, drawerTest.id,
      { dataSources: updated }
    )
  }

  function removeEvidence(index) {
    if (!drawerTest) return
    const updated = (drawerTest.evidence || []).filter((_, i) => i !== index)
    updateTestTemplate(
      drawerTest.functionId, drawerTest.programId, drawerTest.riskAreaId,
      drawerTest.objectiveId, drawerTest.controlId, drawerTest.id,
      { evidence: updated }
    )
  }

  // Build sorted group options from tests that have a known prefix
  const groupOptions = [...new Set(
    allTests
      .map(t => getGroupPrefix(t.name))
      .filter(p => p && GROUP_LABELS[p])
  )]
    .sort((a, b) => GROUP_LABELS[a].localeCompare(GROUP_LABELS[b]))

  const q = query.toLowerCase()
  const filtered = allTests.filter(t => {
    const matchesSearch =
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.functionName.toLowerCase().includes(q) ||
      t.programName.toLowerCase().includes(q) ||
      t.controlName.toLowerCase().includes(q) ||
      t.steps.some(s => s.toLowerCase().includes(q))
    const matchesGroup = !groupFilter || getGroupPrefix(t.name) === groupFilter
    return matchesSearch && matchesGroup
  })

  return (
    <div className="library-page">
      <div className="library-header">
        <h1 className="library-title">Test Library</h1>
        <p className="library-subtitle">All test templates across all audit programs</p>
        <div className="library-search-bar">
          <input
            type="text"
            placeholder="Search tests..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="library-search-input"
          />
          <select
            className="library-group-filter"
            value={groupFilter}
            onChange={e => setGroupFilter(e.target.value)}
            aria-label="Filter by test group"
          >
            <option value="">All Groups</option>
            {groupOptions.map(prefix => (
              <option key={prefix} value={prefix}>
                {GROUP_LABELS[prefix]}
              </option>
            ))}
          </select>
          {(query || groupFilter) && (
            <span className="library-search-count">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
          )}
        </div>
      </div>

      <div className="library-grid">
        {filtered.map(test => (
          <div
            key={test.id}
            className="library-card"
            style={{ borderColor: test.functionColor, position: 'relative' }}
          >
            <div className="library-card-tag" style={{ background: test.functionColor }}>
              {test.functionName}
            </div>
            <div className="library-card-meta">{test.programName} › {test.controlName}</div>
            <h3 className="library-card-title">{test.name}</h3>
            <p className="library-card-desc">{test.description}</p>
            <div className="library-card-steps">
              <strong>{test.steps.length} steps</strong>
              <ul>
                {test.steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
            </div>
            <button
              className="test-summary-btn"
              onClick={e => openDrawer(test, e)}
              aria-label="Open test summary"
              style={{ borderColor: test.functionColor, color: test.functionColor }}
            >
              +
            </button>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="library-no-results">No tests match "{query}"</p>
        )}
      </div>

      {/* ── Test Summary Drawer ── */}
      {drawerTest && (
        <>
          <div className="test-drawer-overlay" onClick={closeDrawer} />
          <aside
            className="test-drawer"
            style={{ '--drawer-accent': drawerTest.functionColor }}
            role="dialog"
            aria-modal="true"
            aria-label="Test Summary"
          >
            {/* Header */}
            <div className="test-drawer-header" style={{ borderBottomColor: drawerTest.functionColor }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="test-drawer-tag-row">
                  <div className="test-drawer-tag" style={{ background: drawerTest.functionColor }}>
                    {drawerTest.functionName}
                  </div>
                  {drawerStack.length > 1 && (
                    <button className="test-drawer-back" onClick={drawerGoBack}>
                      ← Back
                    </button>
                  )}
                </div>
                <div className="test-drawer-meta">{drawerTest.programName} › {drawerTest.controlName}</div>
                <h2 className="test-drawer-title">{drawerTest.name}</h2>
                <p className="test-drawer-desc">{drawerTest.description}</p>
              </div>
              <button className="test-drawer-close" onClick={closeDrawer} aria-label="Close">✕</button>
            </div>

            {/* Body */}
            <div className="test-drawer-body">

              {/* Steps Performed */}
              <section className="test-drawer-section">
                <h3 className="test-drawer-section-title" style={{ color: drawerTest.functionColor }}>
                  <span className="test-drawer-section-icon">📋</span>
                  Steps Performed
                  {drawerTest.stepsPerformed?.length > 0 && (
                    <span className="test-drawer-count" style={{ background: drawerTest.functionColor }}>
                      {drawerTest.stepsPerformed.length}
                    </span>
                  )}
                </h3>
                {drawerTest.stepsPerformed?.length > 0 && (
                  <ol className="test-drawer-steps-list">
                    {drawerTest.stepsPerformed.map((step, i) => (
                      <li key={i} className="test-drawer-step-item">
                        <span className="test-drawer-step-num" style={{ background: drawerTest.functionColor }}>{i + 1}</span>
                        <span className="test-drawer-item-text">{step}</span>
                        <button className="test-drawer-item-remove" onClick={() => removeStep(i)} aria-label="Remove step" title="Remove">✕</button>
                      </li>
                    ))}
                  </ol>
                )}
                {addingStep ? (
                  <div className="test-drawer-add-row">
                    <input
                      className="test-drawer-add-input"
                      placeholder="Describe the step..."
                      value={newStep}
                      onChange={e => setNewStep(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') saveStep(); if (e.key === 'Escape') { setAddingStep(false); setNewStep('') }}}
                      autoFocus
                    />
                    <button className="test-drawer-add-save" onClick={saveStep} style={{ background: drawerTest.functionColor }}>Add</button>
                    <button className="test-drawer-add-cancel" onClick={() => { setAddingStep(false); setNewStep('') }}>✕</button>
                  </div>
                ) : (
                  <button className="test-drawer-add-btn" onClick={() => setAddingStep(true)} style={{ color: drawerTest.functionColor, borderColor: drawerTest.functionColor }}>
                    + Add Step
                  </button>
                )}
              </section>

              {/* Data Sources */}
              <section className="test-drawer-section">
                <h3 className="test-drawer-section-title" style={{ color: drawerTest.functionColor }}>
                  <span className="test-drawer-section-icon">🗂️</span>
                  Data Sources Evaluated
                  {drawerTest.dataSources?.length > 0 && (
                    <span className="test-drawer-count" style={{ background: drawerTest.functionColor }}>
                      {drawerTest.dataSources.length}
                    </span>
                  )}
                </h3>
                {drawerTest.dataSources?.length > 0 && (
                  <ul className="test-drawer-source-list">
                    {drawerTest.dataSources.map((src, i) => (
                      <li key={i} className="test-drawer-source-item">
                        <span className="test-drawer-source-dot" style={{ background: drawerTest.functionColor }} />
                        <span className="test-drawer-item-text">{src}</span>
                        <button className="test-drawer-item-remove" onClick={() => removeSource(i)} aria-label="Remove source" title="Remove">✕</button>
                      </li>
                    ))}
                  </ul>
                )}
                {addingSource ? (
                  <div className="test-drawer-add-row">
                    <input
                      className="test-drawer-add-input"
                      placeholder="Name the data source..."
                      value={newSource}
                      onChange={e => setNewSource(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') saveSource(); if (e.key === 'Escape') { setAddingSource(false); setNewSource('') }}}
                      autoFocus
                    />
                    <button className="test-drawer-add-save" onClick={saveSource} style={{ background: drawerTest.functionColor }}>Add</button>
                    <button className="test-drawer-add-cancel" onClick={() => { setAddingSource(false); setNewSource('') }}>✕</button>
                  </div>
                ) : (
                  <button className="test-drawer-add-btn" onClick={() => setAddingSource(true)} style={{ color: drawerTest.functionColor, borderColor: drawerTest.functionColor }}>
                    + Add Data Source
                  </button>
                )}
              </section>

              {/* Evidence */}
              <section className="test-drawer-section">
                <h3 className="test-drawer-section-title" style={{ color: drawerTest.functionColor }}>
                  <span className="test-drawer-section-icon">📎</span>
                  Evidence
                  {drawerTest.evidence?.length > 0 && (
                    <span className="test-drawer-count" style={{ background: drawerTest.functionColor }}>
                      {drawerTest.evidence.length}
                    </span>
                  )}
                </h3>
                {drawerTest.evidence?.length > 0 && (
                  <ul className="test-drawer-evidence-list">
                    {drawerTest.evidence.map((ev, i) => (
                      <li key={i} className="test-drawer-evidence-item">
                        <span className="test-drawer-evidence-icon">✓</span>
                        <span className="test-drawer-item-text">{ev}</span>
                        <button className="test-drawer-item-remove" onClick={() => removeEvidence(i)} aria-label="Remove evidence" title="Remove">✕</button>
                      </li>
                    ))}
                  </ul>
                )}
                {addingEvidence ? (
                  <div className="test-drawer-add-row">
                    <input
                      className="test-drawer-add-input"
                      placeholder="Describe the evidence..."
                      value={newEvidence}
                      onChange={e => setNewEvidence(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') saveEvidence(); if (e.key === 'Escape') { setAddingEvidence(false); setNewEvidence('') }}}
                      autoFocus
                    />
                    <button className="test-drawer-add-save" onClick={saveEvidence} style={{ background: drawerTest.functionColor }}>Add</button>
                    <button className="test-drawer-add-cancel" onClick={() => { setAddingEvidence(false); setNewEvidence('') }}>✕</button>
                  </div>
                ) : (
                  <button className="test-drawer-add-btn" onClick={() => setAddingEvidence(true)} style={{ color: drawerTest.functionColor, borderColor: drawerTest.functionColor }}>
                    + Add Evidence
                  </button>
                )}
              </section>

              {/* Same Test (identical test, different program) */}
              {drawerTest.sameTests?.length > 0 && (
                <section className="test-drawer-section">
                  <h3 className="test-drawer-section-title" style={{ color: drawerTest.functionColor }}>
                    <span className="test-drawer-section-icon">🔁</span>
                    Same Test
                    <span className="test-drawer-count" style={{ background: drawerTest.functionColor }}>
                      {drawerTest.sameTests.length}
                    </span>
                  </h3>
                  <p className="test-drawer-same-note">See how other auditors use this test in other programs.</p>
                  <ul className="test-drawer-similar-list">
                    {drawerTest.sameTests.map(same => (
                      <li key={same.id} className="test-drawer-similar-item">
                        <div className="test-drawer-similar-row">
                          <div className="test-drawer-similar-info">
                            <span className="test-drawer-similar-name">{same.name}</span>
                            <span className="test-drawer-similar-program">{same.program}</span>
                          </div>
                          <button
                            className={`test-drawer-similar-btn${expandedSimilar === same.id ? ' open' : ''}`}
                            onClick={() => toggleSimilar(same.id)}
                            aria-expanded={expandedSimilar === same.id}
                            aria-label="Show overview"
                            style={{ borderColor: drawerTest.functionColor, color: drawerTest.functionColor }}
                          >
                            {expandedSimilar === same.id ? '−' : '+'}
                          </button>
                        </div>
                        {expandedSimilar === same.id && (
                          <div className="test-drawer-similar-expanded">
                            <p className="test-drawer-similar-overview">{same.overview}</p>
                            <button
                              className="test-drawer-similar-link test-drawer-similar-nav"
                              onClick={() => navigateToSimilar(same)}
                              style={{ color: drawerTest.functionColor }}
                            >
                              View {same.name} in {same.program} →
                            </button>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Similar Tests */}
              <section className="test-drawer-section">
                <h3 className="test-drawer-section-title" style={{ color: drawerTest.functionColor }}>
                  <span className="test-drawer-section-icon">🔗</span>
                  Similar Tests
                  {drawerTest.similarTests?.length > 0 && (
                    <span className="test-drawer-count" style={{ background: drawerTest.functionColor }}>
                      {drawerTest.similarTests.length}
                    </span>
                  )}
                </h3>
                {drawerTest.similarTests?.length > 0 && (
                  <ul className="test-drawer-similar-list">
                    {drawerTest.similarTests.map(sim => (
                      <li key={sim.id} className="test-drawer-similar-item">
                        <div className="test-drawer-similar-row">
                          <div className="test-drawer-similar-info">
                            <span className="test-drawer-similar-name">{sim.name}</span>
                            <span className="test-drawer-similar-program">{sim.program}</span>
                          </div>
                          <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
                            <button
                              className={`test-drawer-similar-btn${expandedSimilar === sim.id ? ' open' : ''}`}
                              onClick={() => toggleSimilar(sim.id)}
                              aria-expanded={expandedSimilar === sim.id}
                              aria-label="Show overview"
                              style={{ borderColor: drawerTest.functionColor, color: drawerTest.functionColor }}
                            >
                              {expandedSimilar === sim.id ? '−' : '+'}
                            </button>
                            <button
                              className="test-drawer-unlink-btn"
                              onClick={() => handleUnlinkTest(sim)}
                              title="Remove link"
                              aria-label="Remove similar test link"
                            >✕</button>
                          </div>
                        </div>
                        {expandedSimilar === sim.id && (
                          <div className="test-drawer-similar-expanded">
                            <p className="test-drawer-similar-overview">{sim.overview}</p>
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
                                    <button className="test-drawer-add-save" onClick={() => saveSimilarity(sim)} style={{ background: drawerTest.functionColor }}>Save</button>
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
                              style={{ color: drawerTest.functionColor }}
                            >
                              View {sim.name} in {sim.program} →
                            </button>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
                {!drawerTest.similarTests?.length && (
                  <p className="test-drawer-similar-empty">No similar tests linked yet.</p>
                )}
                <button
                  className="test-drawer-add-btn"
                  onClick={openPicker}
                  style={{ color: drawerTest.functionColor, borderColor: drawerTest.functionColor }}
                >
                  + Link Similar Test
                </button>
              </section>

            </div>
          </aside>
        </>
      )}

      {/* ── Similar Test Picker Modal ── */}
      {showPicker && drawerTest && (
        <>
          <div className="sim-picker-overlay" onClick={closePicker} />
          <div className="sim-picker-modal" role="dialog" aria-modal="true" aria-label="Link Similar Test">
            <div className="sim-picker-header">
              <div>
                <h2 className="sim-picker-title">Link Similar Test</h2>
                <p className="sim-picker-sub">Linking to <strong>{drawerTest.name}</strong> — the link will appear on both tests automatically.</p>
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
              {pickerTests.length === 0 && (
                <p className="sim-picker-empty">
                  {pickerQuery ? `No tests match "${pickerQuery}"` : 'All tests are already linked.'}
                </p>
              )}
              {pickerTests.map(t => (
                <div key={t.id} className="sim-picker-item">
                  <div className="sim-picker-item-info">
                    <span className="sim-picker-item-tag" style={{ background: t.functionColor }}>{t.functionName}</span>
                    <span className="sim-picker-item-program">{t.programName}</span>
                    <span className="sim-picker-item-name">{t.name}</span>
                    <span className="sim-picker-item-desc">{t.description}</span>
                  </div>
                  <button
                    className="sim-picker-link-btn"
                    onClick={() => handleLinkTest(t)}
                    style={{ background: drawerTest.functionColor }}
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

export default TestLibraryPage

// Made with Bob
