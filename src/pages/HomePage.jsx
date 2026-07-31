import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auditData } from '../data/condensedData'

function countStats(functionData) {
  const programs = functionData.programs.length

  const riskAreas = functionData.programs.reduce((sum, p) =>
    sum + p.riskAreas.length, 0)

  const tests = functionData.programs.reduce((sum, p) =>
    sum + p.riskAreas.reduce((s2, ra) =>
      s2 + ra.controlObjectives.reduce((s3, co) =>
        s3 + co.controls.reduce((s4, ctrl) =>
          s4 + ctrl.testTemplates.length, 0), 0), 0), 0)

  return { programs, riskAreas, tests }
}

const functionOrder = [
  { id: 'chq_controller',          label: 'CHQ Controller' },
  { id: 'treasury',                label: 'Treasury' },
  { id: 'ibm_financing',           label: 'IBM Financing' },
  { id: 'tax',                     label: 'Tax' },
  { id: 'global_procurement',      label: 'Global Procurement' },
  { id: 'human_resources',         label: 'Human Resources' },
  { id: 'ibm_infrastructure',      label: 'IBM Infrastructure' },
  { id: 'marketing_comms',         label: 'Marketing and Communications' },
  { id: 'global_sales',            label: 'Global Sales' },
  { id: 'quote_to_cash',           label: 'Quote to Cash and Operations' },
  { id: 'global_sales_incentives', label: 'Global Sales Incentives' },
  { id: 'global_real_estate',      label: 'IBM Global Real Estate' },
]

const fnIcons = {
  chq_controller:          '📒',
  treasury:                '💰',
  ibm_financing:           '🏦',
  tax:                     '📋',
  global_procurement:      '🛒',
  human_resources:         '👥',
  ibm_infrastructure:      '🏭',
  marketing_comms:         '📣',
  global_sales:            '🤝',
  quote_to_cash:           '💵',
  global_sales_incentives: '🎯',
  global_real_estate:      '🏢',
}

function HomePage() {
  const [selectedFunction, setSelectedFunction] = useState('')
  const navigate = useNavigate()

  const handleFunctionChange = (e) => {
    const functionId = e.target.value
    setSelectedFunction(functionId)
    if (functionId) {
      navigate(`/function/${functionId}`)
    }
  }

  // Aggregate totals for KPI strip
  const totals = functionOrder.reduce(
    (acc, { id }) => {
      const fn = auditData[id]
      if (!fn) return acc
      const { programs, riskAreas, tests } = countStats(fn)
      acc.programs  += programs
      acc.riskAreas += riskAreas
      acc.tests     += tests
      return acc
    },
    { programs: 0, riskAreas: 0, tests: 0 }
  )

  return (
    <div className="home-page">
      {/* ── Hero ───────────────────────────────────── */}
      <div className="home-container">
        <h1 className="home-title">IBM Audit Hub</h1>
        <p className="home-subtitle">Navigate through process owners to explore comprehensive risk frameworks</p>

        {/* ── Dropdown selector ──────────────────── */}
        <div className="function-selector">
          <label htmlFor="function-select" className="selector-label">
            Select Process Owner
          </label>
          <select
            id="function-select"
            value={selectedFunction}
            onChange={handleFunctionChange}
            className="function-dropdown"
          >
            <option value="">Choose a process owner...</option>
            {functionOrder.map(({ id, label }) => (
              <option key={id} value={id}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Body ───────────────────────────────────── */}
      <div className="hp-body">

        {/* KPI strip */}
        <div className="hp-section">
          <div className="hp-kpi-row">
            <div className="hp-kpi-card">
              <div className="hp-kpi-icon" style={{ background: '#eef3fb' }}>📁</div>
              <div>
                <div className="hp-kpi-value">{functionOrder.length}</div>
                <div className="hp-kpi-label">Process Owners</div>
              </div>
            </div>
            <div className="hp-kpi-card">
              <div className="hp-kpi-icon" style={{ background: '#eef3fb' }}>📋</div>
              <div>
                <div className="hp-kpi-value">{totals.programs}</div>
                <div className="hp-kpi-label">Audit Programs</div>
              </div>
            </div>
            <div className="hp-kpi-card">
              <div className="hp-kpi-icon" style={{ background: '#eef3fb' }}>⚠️</div>
              <div>
                <div className="hp-kpi-value">{totals.riskAreas}</div>
                <div className="hp-kpi-label">Risk Areas</div>
              </div>
            </div>
            <div className="hp-kpi-card">
              <div className="hp-kpi-icon" style={{ background: '#eef3fb' }}>✅</div>
              <div>
                <div className="hp-kpi-value">{totals.tests}</div>
                <div className="hp-kpi-label">Test Templates</div>
              </div>
            </div>
          </div>
        </div>

        {/* Process Owner cards */}
        <div className="hp-section">
          <div className="hp-section-header">
            <h2 className="hp-section-title">Process Owners</h2>
          </div>
          <div className="info-cards">
            {functionOrder.map(({ id, label }) => {
              const fn = auditData[id]
              if (!fn) return null
              const { programs, riskAreas, tests } = countStats(fn)
              return (
                <div
                  key={id}
                  className="info-card"
                  style={{ borderColor: fn.color, cursor: 'pointer' }}
                  onClick={() => navigate(`/function/${id}`)}
                >
                  <h3>{fnIcons[id]} {label}</h3>
                  {fn.processNumbers && (
                    <div className="hp-card-process-num">{fn.processNumbers}</div>
                  )}
                  <p>{fn.description}</p>
                  <ul>
                    <li>{programs} Program{programs !== 1 ? 's' : ''}</li>
                    <li>{riskAreas} Risk Area{riskAreas !== 1 ? 's' : ''}</li>
                    <li>{tests} Test Template{tests !== 1 ? 's' : ''}</li>
                  </ul>
                </div>
              )
            })}
          </div>
        </div>

        {/* Hierarchy */}
        <div className="hp-section">
          <div className="hierarchy-info">
            <h2>4-Level Hierarchy</h2>
            <div className="hierarchy-levels">
              <div className="level">1. Program</div>
              <div className="arrow">↓</div>
              <div className="level">2. Risk Area</div>
              <div className="arrow">↓</div>
              <div className="level">3. Control &amp; Control Objective</div>
              <div className="arrow">↓</div>
              <div className="level">4. Test</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default HomePage

// Made with Bob
