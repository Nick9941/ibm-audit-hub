import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auditData } from '../data/condensedData'
import ibmLogo from '../assets/ibm logo.png'

function countStats(functionData) {
  const programs = functionData.programs.length

  const riskAreas = functionData.programs.reduce((sum, p) =>
    sum + p.riskAreas.length, 0)

  const tests = functionData.programs.reduce((sum, p) =>
    sum + p.riskAreas.reduce((s2, ra) =>
      s2 + ra.specificRisks.reduce((s3, sr) =>
        s3 + sr.controlObjectives.reduce((s4, co) =>
          s4 + co.controls.reduce((s5, ctrl) =>
            s5 + ctrl.controlTypes.reduce((s6, ct) =>
              s6 + ct.testTemplates.length, 0), 0), 0), 0), 0), 0)

  return { programs, riskAreas, tests }
}

const functionOrder = [
  { id: 'finance',       label: 'Finance' },
  { id: 'accounting',    label: 'Accounting' },
  { id: 'manufacturing', label: 'Manufacturing and Parts' },
  { id: 'marketing',     label: 'Marketing' },
  { id: 'it',            label: 'Information Technology' },
]

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

  return (
    <div className="home-page">
      <div className="home-container">
        <div className="home-brand">
          <img className="brand-logo" src={ibmLogo} alt="IBM" />
          <div className="brand-divider" aria-hidden="true"></div>
          <div className="brand-text">Corporate Assurance & Advisory Services</div>
        </div>
        <h1 className="home-title">IBM Audit Hub</h1>
        <p className="home-subtitle">
          Navigate through business functions to explore comprehensive risk frameworks
        </p>

        <div className="function-selector">
          <label htmlFor="function-select" className="selector-label">
            Select Business Function
          </label>
          <select
            id="function-select"
            value={selectedFunction}
            onChange={handleFunctionChange}
            className="function-dropdown"
          >
            <option value="">Choose a function...</option>
            <option value="finance">Finance</option>
            <option value="accounting">Accounting</option>
            <option value="manufacturing">Manufacturing and Parts</option>
            <option value="marketing">Marketing</option>
            <option value="it">Information Technology</option>
          </select>
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
                <h3>{label}</h3>
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

        <div className="hierarchy-info">
          <h2>7-Level Hierarchy</h2>
          <div className="hierarchy-levels">
            <div className="level">1. Program</div>
            <div className="arrow">↓</div>
            <div className="level">2. Risk Area</div>
            <div className="arrow">↓</div>
            <div className="level">3. Specific Risk</div>
            <div className="arrow">↓</div>
            <div className="level">4. Control Objective</div>
            <div className="arrow">↓</div>
            <div className="level">5. Control</div>
            <div className="arrow">↓</div>
            <div className="level">6. Control Type</div>
            <div className="arrow">↓</div>
            <div className="level">7. Test Template</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage

// Made with Bob
