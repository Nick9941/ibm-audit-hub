import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { auditData } from '../data/condensedData'

function DetailPage() {
  const { functionId, path } = useParams()
  const navigate = useNavigate()
  const functionData = auditData[functionId]

  if (!functionData) {
    return <div>Function not found</div>
  }

  // Parse the path to find the specific item
  const [type, id] = path.split('/')
  let item = null
  let breadcrumb = [functionData.name]

  // Navigate through the data structure to find the item
  if (type === 'program') {
    item = functionData.programs.find(p => p.id === id)
    if (item) breadcrumb.push(item.name)
  } else if (type === 'riskArea') {
    for (const program of functionData.programs) {
      const found = program.riskAreas.find(ra => ra.id === id)
      if (found) {
        item = found
        breadcrumb.push(program.name, item.name)
        break
      }
    }
  } else if (type === 'objective') {
    for (const program of functionData.programs) {
      for (const riskArea of program.riskAreas) {
        const found = riskArea.controlObjectives.find(co => co.id === id)
        if (found) {
          item = found
          breadcrumb.push(program.name, riskArea.name, item.name)
          break
        }
      }
    }
  } else if (type === 'control') {
    for (const program of functionData.programs) {
      for (const riskArea of program.riskAreas) {
        for (const objective of riskArea.controlObjectives) {
          const found = objective.controls.find(c => c.id === id)
          if (found) {
            item = found
            breadcrumb.push(program.name, riskArea.name, objective.name, item.name)
            break
          }
        }
      }
    }
  } else if (type === 'testTemplate') {
    for (const program of functionData.programs) {
      for (const riskArea of program.riskAreas) {
        for (const objective of riskArea.controlObjectives) {
          for (const control of objective.controls) {
            const found = control.testTemplates.find(tt => tt.id === id)
            if (found) {
              item = found
              breadcrumb.push(program.name, riskArea.name, objective.name, control.name, item.name)
              break
            }
          }
        }
      }
    }
  }

  if (!item) {
    return <div>Item not found</div>
  }

  const getLevelName = (type) => {
    const levels = {
      program: 'Program',
      riskArea: 'Risk Area',
      objective: 'Control Objective',
      control: 'Control',
      testTemplate: 'Test'
    }
    return levels[type] || type
  }

  const getLevelNumber = (type) => {
    const numbers = { program: '1', riskArea: '2', objective: '3', control: '4', testTemplate: '5' }
    return numbers[type] || '?'
  }

  return (
    <div className="detail-page">
      <div className="detail-header">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>
        <Link to="/" className="home-link">Home</Link>
      </div>

      <div className="breadcrumb">
        {breadcrumb.map((crumb, index) => (
          <span key={index}>
            {index > 0 && <span className="breadcrumb-separator"> › </span>}
            <span className="breadcrumb-item">{crumb}</span>
          </span>
        ))}
      </div>

      <div className="detail-container" style={{ borderColor: functionData.color }}>
        <div className="detail-level-badge" style={{ backgroundColor: functionData.color }}>
          Level {getLevelNumber(type)}: {getLevelName(type)}
        </div>

        <h1 className="detail-title">{item.name}</h1>
        <p className="detail-description">{item.description}</p>

        {type === 'testTemplate' && item.steps && (
          <div className="test-steps">
            <h2>Test Steps</h2>
            <ol className="steps-list">
              {item.steps.map((step, index) => (
                <li key={index} className="step-item">{step}</li>
              ))}
            </ol>
          </div>
        )}

        {type === 'control' && item.testTemplates && (
          <div className="related-items">
            <h2>Tests ({item.testTemplates.length})</h2>
            <div className="related-grid">
              {item.testTemplates.map(template => (
                <div
                  key={template.id}
                  className="related-card"
                  onClick={() => navigate(`/detail/${functionId}/testTemplate/${template.id}`)}
                >
                  <h3>{template.name}</h3>
                  <p>{template.description}</p>
                  <div className="card-footer">
                    {template.steps.length} steps
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {type === 'objective' && item.controls && (
          <div className="related-items">
            <h2>Controls ({item.controls.length})</h2>
            <div className="related-grid">
              {item.controls.map(control => (
                <div
                  key={control.id}
                  className="related-card"
                  onClick={() => navigate(`/detail/${functionId}/control/${control.id}`)}
                >
                  <h3>{control.name}</h3>
                  <p>{control.description}</p>
                  <div className="card-footer">
                    {control.testTemplates.length} tests
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {type === 'riskArea' && item.controlObjectives && (
          <div className="related-items">
            <h2>Control Objectives ({item.controlObjectives.length})</h2>
            <div className="related-grid">
              {item.controlObjectives.map(obj => (
                <div
                  key={obj.id}
                  className="related-card"
                  onClick={() => navigate(`/detail/${functionId}/objective/${obj.id}`)}
                >
                  <h3>{obj.name}</h3>
                  <p>{obj.description}</p>
                  <div className="card-footer">
                    {obj.controls.length} controls
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {type === 'program' && item.riskAreas && (
          <div className="related-items">
            <h2>Risk Areas ({item.riskAreas.length})</h2>
            <div className="related-grid">
              {item.riskAreas.map(area => (
                <div
                  key={area.id}
                  className="related-card"
                  onClick={() => navigate(`/detail/${functionId}/riskArea/${area.id}`)}
                >
                  <h3>{area.name}</h3>
                  <p>{area.description}</p>
                  <div className="card-footer">
                    {area.controlObjectives.length} control objectives
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="detail-actions">
        <button onClick={() => navigate(`/function/${functionId}`)} className="action-button">
          View Full Flowchart
        </button>
        <Link to="/" className="action-button secondary">
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default DetailPage

// Made with Bob
