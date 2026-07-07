import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { auditData } from '../data/condensedData'

function RiskLibraryPage() {
  const [query, setQuery] = useState('')

  const allRisks = Object.entries(auditData).flatMap(([functionId, functionData]) =>
    functionData.programs.flatMap(program =>
      program.riskAreas.flatMap(riskArea =>
        riskArea.specificRisks.map(risk => ({
          ...risk,
          functionId,
          functionName: functionData.name,
          functionColor: functionData.color,
          programName: program.name,
          riskAreaName: riskArea.name
        }))
      )
    )
  )

  const q = query.toLowerCase()
  const filtered = allRisks.filter(r =>
    r.name.toLowerCase().includes(q) ||
    r.description.toLowerCase().includes(q) ||
    r.functionName.toLowerCase().includes(q) ||
    r.programName.toLowerCase().includes(q) ||
    r.riskAreaName.toLowerCase().includes(q)
  )

  return (
    <div className="library-page">
      <div className="library-header">
        <Link to="/" className="back-button">← Back to Home</Link>
        <h1 className="library-title">Risk Library</h1>
        <p className="library-subtitle">All specific risks across all audit programs</p>
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
            style={{ borderColor: risk.functionColor }}
          >
            <div className="library-card-tag" style={{ background: risk.functionColor }}>
              {risk.functionName}
            </div>
            <div className="library-card-meta">{risk.programName} › {risk.riskAreaName}</div>
            <h3 className="library-card-title">{risk.name}</h3>
            <p className="library-card-desc">{risk.description}</p>
            <Link
              to={`/function/${risk.functionId}`}
              className="library-card-link"
              style={{ color: risk.functionColor }}
            >
              View Program →
            </Link>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="library-no-results">No risks match "{query}"</p>
        )}
      </div>
    </div>
  )
}

export default RiskLibraryPage

// Made with Bob
