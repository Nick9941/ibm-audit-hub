import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useEditData } from '../context/EditContext'
import EditToolkit from '../components/EditToolkit'

function DeleteBtn({ onClick }) {
  return (
    <button
      className="flow-delete-btn"
      onClick={e => { e.stopPropagation(); onClick() }}
      title="Remove"
    >✕</button>
  )
}

function FlowchartPage() {
  const { functionId } = useParams()
  const navigate = useNavigate()
  const { data, deleteRiskArea, deleteSpecificRisk, deleteControl, deleteTestTemplate } = useEditData()
  const functionData = data[functionId]

  const [selectedProgram, setSelectedProgram] = useState(functionData?.programs[0]?.id || '')
  const [editMode, setEditMode] = useState(false)

  if (!functionData) {
    return <div>Function not found</div>
  }

  const navigateToDetail = (path) => {
    navigate(`/detail/${functionId}/${path}`)
  }

  const currentProgram = functionData.programs.find(p => p.id === selectedProgram) || functionData.programs[0]
  const hasProgramDetails = currentProgram?.riskAreas?.length > 0
  const isAccountingProgram = functionId === 'accounting' && currentProgram?.id === 'acc-prog-1'
  const mockPdfBase = '/ACCOUNTING%20MOCK%20PROGRAM.pdf'

  const openProgramResource = () => {
    if (isAccountingProgram) {
      window.open(mockPdfBase, '_blank')
      return
    }
    navigateToDetail(`program/${currentProgram.id}`)
  }

  const openRiskAreaResource = (riskArea) => {
    if (isAccountingProgram) {
      window.open(`${mockPdfBase}#page=3`, '_blank')
      return
    }
    navigateToDetail(`riskArea/${riskArea.id}`)
  }

  return (
    <div className={`flowchart-page ${editMode ? 'with-toolkit' : ''}`}>
      <div className="flowchart-header">
        <div className="flowchart-header-row">
          <Link to="/" className="back-button">← Back to Home</Link>
          <button
            className={`edit-mode-btn ${editMode ? 'active' : ''}`}
            onClick={() => setEditMode(m => !m)}
          >
            {editMode ? '✕ Close Toolkit' : '✏️ Edit Toolkit'}
          </button>
        </div>
        <h1 style={{ color: functionData.color }}>{functionData.name}</h1>
        <p className="function-description">{functionData.description}</p>

        <div className="program-selector">
          <label htmlFor="program-select">Select Program:</label>
          <select
            id="program-select"
            value={selectedProgram}
            onChange={(e) => setSelectedProgram(e.target.value)}
            className="program-dropdown"
            style={{ borderColor: functionData.color }}
          >
            {functionData.programs.map(program => (
              <option key={program.id} value={program.id}>
                {program.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flowchart-body">
        <div className="flow-diagram-container">
          {!hasProgramDetails ? (
            <div className="flow-level">
              <div
                className="flow-node program-node"
                style={{ borderColor: functionData.color, backgroundColor: `${functionData.color}15` }}
                onClick={isAccountingProgram ? openProgramResource : undefined}
              >
                <h3>{currentProgram.name}</h3>
                <p>{currentProgram.description}</p>
              </div>
            </div>
          ) : (
            <>
              {/* Level 1: Program */}
              <div className="flow-level">
                <div className="level-label">Level 1: Program</div>
                <div
                  className="flow-node program-node"
                  style={{ borderColor: functionData.color, backgroundColor: `${functionData.color}15` }}
                  onClick={openProgramResource}
                >
                  <h3>{currentProgram.name}</h3>
                  <p>{currentProgram.description}</p>
                </div>
              </div>

              <div className="flow-arrow">↓</div>

              {/* Level 2: Risk Area */}
              <div className="flow-level">
                <div className="level-label">Level 2: Risk Area</div>
                <div className="flow-nodes-row">
                  {currentProgram.riskAreas.map(riskArea => (
                    <div key={riskArea.id} className="flow-column">
                        <div
                          className="flow-node risk-area-node"
                          style={{ borderColor: functionData.color }}
                          onClick={() => openRiskAreaResource(riskArea)}
                        >
                          {editMode && <DeleteBtn onClick={() => deleteRiskArea(functionId, currentProgram.id, riskArea.id)} />}
                          <h4>{riskArea.name}</h4>
                          <p>{riskArea.description}</p>
                        </div>

                      <div className="flow-arrow">↓</div>

                      {/* Level 3: Specific Risk */}
                      {riskArea.specificRisks.map(specificRisk => (
                        <div key={specificRisk.id} className="flow-sub-column">
                          <div className="level-label-small">Level 3: Specific Risk</div>
                          <div
                            className="flow-node specific-risk-node"
                            style={{ borderColor: functionData.color }}
                            onClick={() => navigateToDetail(`specificRisk/${specificRisk.id}`)}
                          >
                            {editMode && <DeleteBtn onClick={() => deleteSpecificRisk(functionId, currentProgram.id, riskArea.id, specificRisk.id)} />}
                            <h5>{specificRisk.name}</h5>
                            <p className="small-text">{specificRisk.description}</p>
                          </div>

                          <div className="flow-arrow-small">↓</div>

                          {/* Level 4: Control Objective */}
                          {specificRisk.controlObjectives.map(objective => (
                            <div key={objective.id} className="flow-sub-column">
                              <div className="level-label-small">Level 4: Control Objective</div>
                              <div
                                className="flow-node objective-node"
                                style={{ borderColor: functionData.color }}
                                onClick={() => navigateToDetail(`objective/${objective.id}`)}
                              >
                                <h6>{objective.name}</h6>
                                <p className="small-text">{objective.description}</p>
                              </div>

                              <div className="flow-arrow-small">↓</div>

                              {/* Level 5: Control */}
                              {objective.controls.map(control => (
                                <div key={control.id} className="flow-sub-column">
                                  <div className="level-label-small">Level 5: Control</div>
                                  <div
                                    className="flow-node control-node"
                                    style={{ borderColor: functionData.color }}
                                    onClick={() => navigateToDetail(`control/${control.id}`)}
                                  >
                                    {editMode && <DeleteBtn onClick={() => deleteControl(functionId, currentProgram.id, riskArea.id, specificRisk.id, objective.id, control.id)} />}
                                    <h6>{control.name}</h6>
                                    <p className="small-text">{control.description}</p>
                                  </div>

                                  <div className="flow-arrow-small">↓</div>

                                  {/* Level 6: Control Types */}
                                  <div className="control-types-row">
                                    {control.controlTypes.map(controlType => (
                                      <div key={controlType.id} className="control-type-column">
                                        <div className="level-label-small">Level 6: {controlType.name}</div>
                                        <div
                                          className="flow-node control-type-node"
                                          style={{ borderColor: functionData.color }}
                                          onClick={() => navigateToDetail(`controlType/${controlType.id}`)}
                                        >
                                          <h6>{controlType.name}</h6>
                                          <p className="small-text">{controlType.description}</p>
                                        </div>

                                        <div className="flow-arrow-small">↓</div>

                                        {/* Level 7: Test Templates */}
                                        <div className="level-label-small">Level 7: Test Templates</div>
                                        <div className="test-templates-flow">
                                          {controlType.testTemplates.map(template => (
                                            <div
                                              key={template.id}
                                              className="flow-node test-template-node"
                                              style={{ borderColor: functionData.color }}
                                              onClick={() => navigateToDetail(`testTemplate/${template.id}`)}
                                            >
                                              {editMode && <DeleteBtn onClick={() => deleteTestTemplate(functionId, currentProgram.id, riskArea.id, specificRisk.id, objective.id, control.id, controlType.id, template.id)} />}
                                              <strong>{template.name}</strong>
                                              <div className="steps-count">{template.steps.length} steps</div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {editMode && (
          <EditToolkit
            functionId={functionId}
            currentProgram={currentProgram}
            onClose={() => setEditMode(false)}
          />
        )}
      </div>
    </div>
  )
}

export default FlowchartPage

// Made with Bob
