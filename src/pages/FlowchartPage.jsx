import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useEditData } from '../context/EditContext'
import EditToolkit from '../components/EditToolkit'
import CommentLog from '../components/CommentLog'


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
  const [selectedRiskArea, setSelectedRiskArea] = useState('all')
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
  const isIntercompanyProgram = functionId === 'accounting' && currentProgram?.id === 'acc-prog-3'
  const mockPdfBase = '/ACCOUNTING%20MOCK%20PROGRAM.pdf'
  const intercompanyPdfBase = '/Intercompany%20Accounting%2010-30-00(2).pdf'

  const openProgramResource = () => {
    if (isAccountingProgram) {
      window.open(mockPdfBase, '_blank')
      return
    }
    if (isIntercompanyProgram) {
      window.open(intercompanyPdfBase, '_blank')
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
            onChange={(e) => { setSelectedProgram(e.target.value); setSelectedRiskArea('all') }}
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

        {hasProgramDetails && (
          <div className="program-selector">
            <label htmlFor="risk-area-select">Filter Risk Area:</label>
            <select
              id="risk-area-select"
              value={selectedRiskArea}
              onChange={(e) => setSelectedRiskArea(e.target.value)}
              className="program-dropdown"
              style={{ borderColor: functionData.color }}
            >
              <option value="all">All Risk Areas</option>
              {currentProgram.riskAreas.map(ra => (
                <option key={ra.id} value={ra.id}>{ra.name}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="flowchart-body">
        <div className="flow-diagram-container">
          {!hasProgramDetails ? (
            <div className="flow-level">
              <div
                className="flow-node program-node"
                style={{ borderColor: functionData.color, backgroundColor: `${functionData.color}15`, cursor: (isAccountingProgram || isIntercompanyProgram) ? 'pointer' : 'default' }}
                onClick={(isAccountingProgram || isIntercompanyProgram) ? openProgramResource : undefined}
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
                  {currentProgram.riskAreas.filter(ra => selectedRiskArea === 'all' || ra.id === selectedRiskArea).map(riskArea => (
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

                      {/* Level 3: Control Objective */}
                      {riskArea.controlObjectives.map(objective => (
                        <div key={objective.id} className="flow-sub-column">
                          <div className="level-label-small">Level 3: Control Objective</div>
                          <div
                            className="flow-node objective-node"
                            style={{ borderColor: functionData.color }}
                            onClick={() => navigateToDetail(`objective/${objective.id}`)}
                          >
                            <h5>{objective.name}</h5>
                            <p className="small-text">{objective.description}</p>
                          </div>

                          <div className="flow-arrow-small">↓</div>

                          {/* Level 4: Control */}
                          {objective.controls.map(control => (
                            <div key={control.id} className="flow-sub-column">
                              <div className="level-label-small">Level 4: Control</div>
                              <div
                                className="flow-node control-node"
                                style={{ borderColor: functionData.color }}
                                onClick={() => navigateToDetail(`control/${control.id}`)}
                              >
                                {editMode && <DeleteBtn onClick={() => deleteControl(functionId, currentProgram.id, riskArea.id, objective.id, control.id, control.name)} />}
                                <h6>{control.name}</h6>
                                <p className="small-text">{control.description}</p>
                                <CommentLog nodeId={control.id} label="Control Comments" />
                              </div>

                              <div className="flow-arrow-small">↓</div>

                              {/* Level 5: Test Templates */}
                              <div className="level-label-small">Level 5: Tests</div>
                              <div className="test-templates-flow">
                                {control.testTemplates.map(template => (
                                  <div
                                    key={template.id}
                                    className="flow-node test-template-node"
                                    style={{ borderColor: functionData.color }}
                                    onClick={() => navigateToDetail(`testTemplate/${template.id}`)}
                                  >
                                    {editMode && <DeleteBtn onClick={() => deleteTestTemplate(functionId, currentProgram.id, riskArea.id, objective.id, control.id, template.id, template.name)} />}
                                    <strong>{template.name}</strong>
                                    <div className="steps-count">{template.steps.length} steps</div>
                                    <CommentLog nodeId={template.id} label="Test Comments" />
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
