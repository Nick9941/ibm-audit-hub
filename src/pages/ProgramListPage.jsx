import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { auditData } from '../data/condensedData'

function ProgramListPage() {
  const [query, setQuery] = useState('')

  const allPrograms = Object.entries(auditData).flatMap(([functionId, functionData]) =>
    functionData.programs.map(program => ({
      ...program,
      functionId,
      functionName: functionData.name,
      functionColor: functionData.color
    }))
  )

  const q = query.toLowerCase()
  const filtered = allPrograms.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.functionName.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q)
  )

  return (
    <div className="library-page">
      <div className="library-header">
        <Link to="/" className="back-button">← Back to Home</Link>
        <h1 className="library-title">Program List</h1>
        <p className="library-subtitle">All audit programs across business functions</p>
        <div className="library-search-bar">
          <input
            type="text"
            placeholder="Search programs..."
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
        {filtered.map(program => (
          <div
            key={program.id}
            className="library-card"
            style={{ borderColor: program.functionColor }}
          >
            <div className="library-card-tag" style={{ background: program.functionColor }}>
              {program.functionName}
            </div>
            <h3 className="library-card-title">{program.name}</h3>
            <p className="library-card-desc">{program.description}</p>
            <Link
              to={`/function/${program.functionId}`}
              className="library-card-link"
              style={{ color: program.functionColor }}
            >
              View Program →
            </Link>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="library-no-results">No programs match "{query}"</p>
        )}
      </div>
    </div>
  )
}

export default ProgramListPage

// Made with Bob
