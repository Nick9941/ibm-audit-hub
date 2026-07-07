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
  } else if (type === 'specificRisk') {
    for (const program of functionData.programs) {
      for (const riskArea of program.riskAreas) {
        const found = riskArea.specificRisks.find(sr => sr.id === id)
        if (found) {
          item = found
          breadcrumb.push(program.name, riskArea.name, item.name)
          break
        }
      }
    }
  } else if (type === 'objective') {
    for (const program of functionData.programs) {
      for (const riskArea of program.riskAreas) {
        for (const specificRisk of riskArea.specificRisks) {
          const found = specificRisk.controlObjectives.find(co => co.id === id)
          if (found) {
            item = found
            breadcrumb.push(program.name, riskArea.name, specificRisk.name, item.name)
            break
          }
        }
      }
    }
  } else if (type === 'control') {
    for (const program of functionData.programs) {
      for (const riskArea of program.riskAreas) {
        for (const specificRisk of riskArea.specificRisks) {
          for (const objective of specificRisk.controlObjectives) {
            const found = objective.controls.find(c => c.id === id)
            if (found) {
              item = found
              breadcrumb.push(program.name, riskArea.name, specificRisk.name, objective.name, item.name)
              break
            }
          }
        }
      }
    }
  } else if (type === 'controlType') {
    for (const program of functionData.programs) {
      for (const riskArea of program.riskAreas) {
        for (const specificRisk of riskArea.specificRisks) {
          for (const objective of specificRisk.controlObjectives) {
            for (const control of objective.controls) {
              const found = control.controlTypes.find(ct => ct.id === id)
              if (found) {
                item = found
                breadcrumb.push(program.name, riskArea.name, specificRisk.name, objective.name, control.name, item.name)
                break
              }
            }
          }
        }
      }
    }
  } else if (type === 'testTemplate') {
    for (const program of functionData.programs) {
      for (const riskArea of program.riskAreas) {
        for (const specificRisk of riskArea.specificRisks) {
          for (const objective of specificRisk.controlObjectives) {
            for (const control of objective.controls) {
              for (const controlType of control.controlTypes) {
                const found = controlType.testTemplates.find(tt => tt.id === id)
                if (found) {
                  item = found
                  breadcrumb.push(program.name, riskArea.name, specificRisk.name, objective.name, control.name, controlType.name, item.name)
                  break
                }
              }
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
      specificRisk: 'Specific Risk',
      objective: 'Control Objective',
      control: 'Control',
      controlType: 'Control Type',
      testTemplate: 'Test Template'
    }
    return levels[type] || type
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
          Level {type === 'program' ? '1' : type === 'riskArea' ? '2' : type === 'specificRisk' ? '3' : type === 'objective' ? '4' : type === 'control' ? '5' : type === 'controlType' ? '6' : '7'}: {getLevelName(type)}
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

        {type === 'controlType' && item.testTemplates && (
          <div className="related-items">
            <h2>Test Templates ({item.testTemplates.length})</h2>
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

        {type === 'control' && item.controlTypes && (
          <div className="related-items">
            <h2>Control Types ({item.controlTypes.length})</h2>
            <div className="related-grid">
              {item.controlTypes.map(ct => (
                <div 
                  key={ct.id}
                  className="related-card"
                  onClick={() => navigate(`/detail/${functionId}/controlType/${ct.id}`)}
                >
                  <h3>{ct.name}</h3>
                  <p>{ct.description}</p>
                  <div className="card-footer">
                    {ct.testTemplates.length} test templates
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
                    {control.controlTypes.length} control types
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {type === 'specificRisk' && item.controlObjectives && (
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

        {type === 'riskArea' && item.specificRisks && (
          <div className="related-items">
            <h2>Specific Risks ({item.specificRisks.length})</h2>
            <div className="related-grid">
              {item.specificRisks.map(risk => (
                <div 
                  key={risk.id}
                  className="related-card"
                  onClick={() => navigate(`/detail/${functionId}/specificRisk/${risk.id}`)}
                >
                  <h3>{risk.name}</h3>
                  <p>{risk.description}</p>
                  <div className="card-footer">
                    {risk.controlObjectives.length} control objectives
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
                    {area.specificRisks.length} specific risks
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
