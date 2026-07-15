import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { auditData } from '../data/condensedData'

const ACCOUNTING_CONTROLS_PROGRAMS = ['Intercompany Accounting', 'Corporate Social Responsibility']

function TestLibraryPage() {
  const [query, setQuery] = useState('')

  const allTests = Object.entries(auditData).flatMap(([functionId, functionData]) =>
    functionData.programs.flatMap(program =>
      program.riskAreas.flatMap(riskArea =>
        riskArea.controlObjectives.flatMap(objective =>
          objective.controls.flatMap(control =>
            control.testTemplates.map(template => ({
              ...template,
              functionId,
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

  const q = query.toLowerCase()
  const filtered = allTests.filter(t =>
    t.name.toLowerCase().includes(q) ||
    t.description.toLowerCase().includes(q) ||
    t.functionName.toLowerCase().includes(q) ||
    t.programName.toLowerCase().includes(q) ||
    t.controlName.toLowerCase().includes(q) ||
    t.steps.some(s => s.toLowerCase().includes(q))
  )

  return (
    <div className="library-page">
      <div className="library-header">
        <Link to="/" className="back-button">← Back to Home</Link>
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
          {query && (
            <span className="library-search-count">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
          )}
        </div>
      </div>

      <div className="library-grid">
        {'accounting controls'.includes(q) || q === '' ? (
          <div className="library-card" style={{ borderColor: '#4f7ecf' }}>
            <div
              className="library-card-tag program-tag-hoverable"
              style={{ background: '#4f7ecf' }}
              tabIndex={0}
              role="button"
              aria-label="View relevant programs"
            >
              Relevant Programs
              <div className="program-indicator-tooltip" role="tooltip">
                <span className="program-indicator-tooltip-title">Programs</span>
                <ul className="program-indicator-tooltip-list">
                  {ACCOUNTING_CONTROLS_PROGRAMS.map(p => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="library-card-meta">Accounting Controls</div>
            <h3 className="library-card-title">Accounting Controls</h3>
            <p className="library-card-desc">Comprehensive controls across key accounting processes and financial operations.</p>
            <div className="library-card-steps">
              <strong>4 steps</strong>
              <ul>
                <li>Identify applicable accounting processes</li>
                <li>Review relevant controls for each process</li>
                <li>Assess control design and operating effectiveness</li>
                <li>Document findings and remediation actions</li>
              </ul>
            </div>
          </div>
        ) : null}
        {filtered.map(test => (
          <div
            key={test.id}
            className="library-card"
            style={{ borderColor: test.functionColor }}
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
          </div>
        ))}
        {filtered.length === 0 && !('accounting controls'.includes(q)) && (
          <p className="library-no-results">No tests match "{query}"</p>
        )}
      </div>
    </div>
  )
}

export default TestLibraryPage

// Made with Bob
