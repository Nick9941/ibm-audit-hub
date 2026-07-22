import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useEditData } from '../context/EditContext'
import EditToolkit from '../components/EditToolkit'
import CommentLog from '../components/CommentLog'
import bannerImg from '../assets/banner.jpg'


function ExpandableObjective({ objective, color, onOpen }) {
  return (
    <div
      className="flow-node objective-node"
      style={{ borderColor: color }}
    >
      <div className="objective-header">
        <h5
          style={{ margin: 0, flex: 1, cursor: objective.pdfUrl ? 'pointer' : 'default' }}
          onClick={() => onOpen && onOpen(objective)}
        >{objective.name}</h5>
        {(objective.fullText || objective.pdfUrl) && (
          <button
            className="objective-expand-btn"
            onClick={e => { e.stopPropagation(); onOpen && onOpen(objective) }}
            title="Open PDF"
          >+</button>
        )}
      </div>
      <p className="small-text" style={{ marginTop: '4px' }}>{objective.description}</p>
    </div>
  )
}

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
  const { data, deleteRiskArea, deleteControl, deleteTestTemplate } = useEditData()
  const functionData = data[functionId]

  const [selectedProgram, setSelectedProgram] = useState(functionData?.programs[0]?.id || '')
  const [selectedRiskArea, setSelectedRiskArea] = useState('')
  const [editMode, setEditMode] = useState(false)

  if (!functionData) {
    return <div>Function not found</div>
  }

  const navigateToDetail = (path) => {
    navigate(`/detail/${functionId}/${path}`)
  }

  const currentProgram = functionData.programs.find(p => p.id === selectedProgram) || functionData.programs[0]
  const hasProgramDetails = currentProgram?.riskAreas?.length > 0

  const openProgramResource = () => {
    const url = currentProgram?.pdfUrl || functionData?.pdfUrl
    if (url) { window.open(url, '_blank'); return }
    navigateToDetail(`program/${currentProgram.id}`)
  }

  const openRiskAreaResource = (riskArea) => {
    const url = riskArea?.pdfUrl || currentProgram?.pdfUrl || functionData?.pdfUrl
    if (url) { window.open(url, '_blank'); return }
    navigateToDetail(`riskArea/${riskArea.id}`)
  }

  const openObjectiveResource = (objective) => {
    const url = objective?.pdfUrl || currentProgram?.pdfUrl || functionData?.pdfUrl
    if (url) { window.open(url, '_blank') }
  }

  const openControlResource = (control) => {
    const url = control?.pdfUrl || currentProgram?.pdfUrl || functionData?.pdfUrl
    if (url) { window.open(url, '_blank') }
  }

  const openTestResource = (template) => {
    const url = template?.pdfUrl || currentProgram?.pdfUrl || functionData?.pdfUrl
    if (url) { window.open(url, '_blank') }
  }

  return (
    <div className={`flowchart-page ${editMode ? 'with-toolkit' : ''}`}>
      <div className="flowchart-header" style={{ backgroundImage: `url(${bannerImg})` }}>
        <div className="flowchart-header-inner">
          <div className="flowchart-header-row">
            <button
              className={`edit-mode-btn ${editMode ? 'active' : ''}`}
              onClick={() => setEditMode(m => !m)}
            >
              {editMode ? '✕ Close Toolkit' : '✏️ Edit Toolkit'}
            </button>
          </div>
          <h1>{functionData.name}</h1>
          <p className="function-description">{functionData.description}</p>

          <div className="program-selector">
            <label htmlFor="program-select">Select Program:</label>
            <select
              id="program-select"
              value={selectedProgram}
              onChange={(e) => { setSelectedProgram(e.target.value); setSelectedRiskArea('') }}
              className="program-dropdown"
            >
              {functionData.programs.map(program => (
                <option key={program.id} value={program.id}>
                  {program.name}
                </option>
              ))}
            </select>
          </div>

          {hasProgramDetails && (
            <div className="program-selector">
              <label htmlFor="risk-area-select">Filter Risk Area:</label>
              <select
                id="risk-area-select"
                value={selectedRiskArea}
                onChange={(e) => setSelectedRiskArea(e.target.value)}
                className="program-dropdown"
              >
                <option value="">Select a risk area...</option>
                {currentProgram.riskAreas.map(ra => (
                  <option key={ra.id} value={ra.id}>{ra.name}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      <div className="flowchart-body">
        <div className="flow-diagram-container">
          {!hasProgramDetails ? (
            <div className="flow-level">
              <div
                className="flow-node program-node"
                style={{ borderColor: functionData.color, backgroundColor: `${functionData.color}15`, cursor: currentProgram?.pdfUrl ? 'pointer' : 'default' }}
                onClick={currentProgram?.pdfUrl ? openProgramResource : undefined}
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
                  <CommentLog nodeId={currentProgram.id} label="Program Comments" />
                </div>
              </div>

              <div className="flow-arrow">↓</div>

              {/* Level 2: Risk Area */}
              <div className="flow-level">
                <div className="level-label">Level 2: Risk Area</div>
                <div className="flow-nodes-row">
                  {currentProgram.riskAreas.filter(ra => ra.id === selectedRiskArea).map(riskArea => (
                    <div key={riskArea.id} className="flow-column">
                        <div
                          className="flow-node risk-area-node"
                          style={{ borderColor: functionData.color }}
                          onClick={() => openRiskAreaResource(riskArea)}
                        >
                          {editMode && <DeleteBtn onClick={() => deleteRiskArea(functionId, currentProgram.id, riskArea.id, riskArea.name)} />}
                          <h4>{riskArea.name}</h4>
                          <p>{riskArea.description}</p>
                          <CommentLog nodeId={riskArea.id} label="Risk Area Comments" />
                        </div>

                      <div className="flow-arrow">↓</div>

                      {/* Level 3: Control & Control Objective (merged) */}
                      {riskArea.controlObjectives.map(objective => (
                        <div key={objective.id} className="flow-sub-column">
                          <div className="level-label-small">Level 3: Control &amp; Control Objective</div>
                          <div
                            className="flow-node control-node"
                            style={{ borderColor: functionData.color }}
                          >
                            <div className="objective-header">
                              <h5
                                style={{ margin: 0, flex: 1, cursor: objective.pdfUrl ? 'pointer' : 'default' }}
                                onClick={() => openObjectiveResource(objective)}
                              >{objective.name}</h5>
                              {(objective.fullText || objective.pdfUrl) && (
                                <button
                                  className="objective-expand-btn"
                                  onClick={e => { e.stopPropagation(); openObjectiveResource(objective) }}
                                  title="Open PDF"
                                >+</button>
                              )}
                            </div>
                            <p className="small-text" style={{ marginTop: '4px' }}>{objective.description}</p>
                            {objective.controls && objective.controls.length > 0 && (
                              <div className="merged-controls">
                                {objective.controls.map(control => (
                                  <div key={control.id} className="merged-control-item"
                                    style={{ cursor: control.pdfUrl ? 'pointer' : 'default' }}
                                    onClick={() => openControlResource(control)}>
                                    {editMode && <DeleteBtn onClick={() => deleteControl(functionId, currentProgram.id, riskArea.id, objective.id, control.id, control.name)} />}
                                    <strong>{control.name}</strong>
                                    <p className="small-text">{control.description}</p>
                                    <CommentLog nodeId={control.id} label="Control Comments" />
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {objective.controls && objective.controls.some(c => c.testTemplates.length > 0) && (
                            <div className="flow-arrow-small">↓</div>
                          )}

                          {/* Level 4: Test Templates */}
                          {objective.controls.map(control => (
                            control.testTemplates.length > 0 && (
                              <div key={control.id} className="flow-sub-column">
                                <div className="level-label-small">Level 4: Tests</div>
                                <div className="test-templates-flow">
                                  {control.testTemplates.map(template => (
                                    <div
                                      key={template.id}
                                      className="flow-node test-template-node"
                                      style={{ borderColor: functionData.color, cursor: template.pdfUrl ? 'pointer' : 'default' }}
                                      onClick={() => openTestResource(template)}
                                    >
                                      {editMode && <DeleteBtn onClick={() => deleteTestTemplate(functionId, currentProgram.id, riskArea.id, objective.id, control.id, template.id, template.name)} />}
                                      <strong>{template.name}</strong>
                                      <p className="small-text">{template.description}</p>
                                      <CommentLog nodeId={template.id} label="Test Comments" />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )
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
