import React, { useState } from 'react'
import { useEditData } from '../context/EditContext'

function EditToolkit({ functionId, currentProgram, onClose }) {
  const { updateProgram, addProgram, addRiskArea, addSpecificRisk, addControl, addTestTemplate, resetData } = useEditData()

  const [activeTab, setActiveTab] = useState('program')

  // Form states
  const [programForm, setProgramForm] = useState({ name: currentProgram?.name || '', description: currentProgram?.description || '' })
  const [riskAreaForm, setRiskAreaForm] = useState({ name: '', description: '' })
  const [specificRiskForm, setSpecificRiskForm] = useState({ riskAreaId: currentProgram?.riskAreas?.[0]?.id || '', name: '', description: '' })
  const [controlForm, setControlForm] = useState({ riskAreaId: '', specificRiskId: '', objectiveId: '', name: '', description: '' })
  const [testForm, setTestForm] = useState({ riskAreaId: '', specificRiskId: '', objectiveId: '', controlId: '', controlTypeId: '', name: '', description: '', steps: ['', '', ''] })
  const [toast, setToast] = useState('')

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  function handleUpdateProgram() {
    if (!programForm.name.trim()) return
    updateProgram(functionId, currentProgram.id, { name: programForm.name, description: programForm.description })
    showToast('Program updated')
  }

  function handleAddRiskArea() {
    if (!riskAreaForm.name.trim()) return
    addRiskArea(functionId, currentProgram.id, riskAreaForm.name, riskAreaForm.description)
    setRiskAreaForm({ name: '', description: '' })
    showToast('Risk area added')
  }

  function handleAddSpecificRisk() {
    if (!specificRiskForm.riskAreaId || !specificRiskForm.name.trim()) return
    const ra = currentProgram.riskAreas.find(r => r.id === specificRiskForm.riskAreaId)
    if (!ra) return
    addSpecificRisk(functionId, currentProgram.id, specificRiskForm.riskAreaId, specificRiskForm.name, specificRiskForm.description)
    setSpecificRiskForm(f => ({ ...f, name: '', description: '' }))
    showToast('Specific risk added')
  }

  function handleAddTestTemplate() {
    if (!testForm.name.trim() || !testForm.controlTypeId) return
    addTestTemplate(
      functionId, currentProgram.id,
      testForm.riskAreaId, testForm.specificRiskId,
      testForm.objectiveId, testForm.controlId,
      testForm.controlTypeId,
      testForm.name, testForm.description,
      testForm.steps
    )
    setTestForm(f => ({ ...f, name: '', description: '', steps: ['', '', ''] }))
    showToast('Test template added')
  }

  const tabs = [
    { id: 'program', label: 'Program' },
    { id: 'riskArea', label: 'Risk Area' },
    { id: 'specificRisk', label: 'Specific Risk' },
    { id: 'test', label: 'Test Template' },
  ]

  return (
    <div className="edit-toolkit">
      <div className="edit-toolkit-header">
        <span className="edit-toolkit-title">✏️ Edit Toolkit</span>
        <button className="edit-toolkit-close" onClick={onClose}>✕</button>
      </div>

      {toast && <div className="edit-toast">{toast}</div>}

      <div className="edit-tabs">
        {tabs.map(t => (
          <button
            key={t.id}
            className={`edit-tab ${activeTab === t.id ? 'active' : ''}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="edit-panel">

        {/* Program tab */}
        {activeTab === 'program' && (
          <div className="edit-form">
            <p className="edit-form-title">Edit Program Name & Description</p>
            <label className="edit-label">Program Name</label>
            <input className="edit-input" value={programForm.name} onChange={e => setProgramForm(f => ({ ...f, name: e.target.value }))} />
            <label className="edit-label">Description</label>
            <textarea className="edit-textarea" value={programForm.description} onChange={e => setProgramForm(f => ({ ...f, description: e.target.value }))} />
            <button className="edit-btn" onClick={handleUpdateProgram}>Save Changes</button>
          </div>
        )}

        {/* Risk Area tab */}
        {activeTab === 'riskArea' && (
          <div className="edit-form">
            <p className="edit-form-title">Add New Risk Area</p>
            <label className="edit-label">Risk Area Name</label>
            <input className="edit-input" placeholder="e.g. Accounts Receivable Risk" value={riskAreaForm.name} onChange={e => setRiskAreaForm(f => ({ ...f, name: e.target.value }))} />
            <label className="edit-label">Description</label>
            <textarea className="edit-textarea" placeholder="Describe the risk area..." value={riskAreaForm.description} onChange={e => setRiskAreaForm(f => ({ ...f, description: e.target.value }))} />
            <button className="edit-btn" onClick={handleAddRiskArea}>Add Risk Area</button>
          </div>
        )}

        {/* Specific Risk tab */}
        {activeTab === 'specificRisk' && (
          <div className="edit-form">
            <p className="edit-form-title">Add Specific Risk</p>
            <label className="edit-label">Under Risk Area</label>
            <select className="edit-input" value={specificRiskForm.riskAreaId} onChange={e => setSpecificRiskForm(f => ({ ...f, riskAreaId: e.target.value }))}>
              <option value="">Select risk area...</option>
              {currentProgram.riskAreas.map(ra => (
                <option key={ra.id} value={ra.id}>{ra.name}</option>
              ))}
            </select>
            <label className="edit-label">Risk Name</label>
            <input className="edit-input" placeholder="e.g. Unauthorised Access" value={specificRiskForm.name} onChange={e => setSpecificRiskForm(f => ({ ...f, name: e.target.value }))} />
            <label className="edit-label">Description</label>
            <textarea className="edit-textarea" placeholder="Describe the specific risk..." value={specificRiskForm.description} onChange={e => setSpecificRiskForm(f => ({ ...f, description: e.target.value }))} />
            <button className="edit-btn" onClick={handleAddSpecificRisk}>Add Specific Risk</button>
          </div>
        )}

        {/* Test Template tab */}
        {activeTab === 'test' && (
          <div className="edit-form">
            <p className="edit-form-title">Add Test Template</p>
            <label className="edit-label">Risk Area</label>
            <select className="edit-input" value={testForm.riskAreaId} onChange={e => {
              setTestForm(f => ({ ...f, riskAreaId: e.target.value, specificRiskId: '', objectiveId: '', controlId: '', controlTypeId: '' }))
            }}>
              <option value="">Select risk area...</option>
              {currentProgram.riskAreas.map(ra => (
                <option key={ra.id} value={ra.id}>{ra.name}</option>
              ))}
            </select>

            {testForm.riskAreaId && (() => {
              const ra = currentProgram.riskAreas.find(r => r.id === testForm.riskAreaId)
              return (
                <>
                  <label className="edit-label">Specific Risk</label>
                  <select className="edit-input" value={testForm.specificRiskId} onChange={e => setTestForm(f => ({ ...f, specificRiskId: e.target.value, objectiveId: '', controlId: '', controlTypeId: '' }))}>
                    <option value="">Select specific risk...</option>
                    {ra.specificRisks.map(sr => <option key={sr.id} value={sr.id}>{sr.name}</option>)}
                  </select>
                </>
              )
            })()}

            {testForm.specificRiskId && (() => {
              const ra = currentProgram.riskAreas.find(r => r.id === testForm.riskAreaId)
              const sr = ra?.specificRisks.find(s => s.id === testForm.specificRiskId)
              return (
                <>
                  <label className="edit-label">Control Objective</label>
                  <select className="edit-input" value={testForm.objectiveId} onChange={e => setTestForm(f => ({ ...f, objectiveId: e.target.value, controlId: '', controlTypeId: '' }))}>
                    <option value="">Select objective...</option>
                    {sr?.controlObjectives.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
                  </select>
                </>
              )
            })()}

            {testForm.objectiveId && (() => {
              const ra = currentProgram.riskAreas.find(r => r.id === testForm.riskAreaId)
              const sr = ra?.specificRisks.find(s => s.id === testForm.specificRiskId)
              const obj = sr?.controlObjectives.find(o => o.id === testForm.objectiveId)
              return (
                <>
                  <label className="edit-label">Control</label>
                  <select className="edit-input" value={testForm.controlId} onChange={e => setTestForm(f => ({ ...f, controlId: e.target.value, controlTypeId: '' }))}>
                    <option value="">Select control...</option>
                    {obj?.controls.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </>
              )
            })()}

            {testForm.controlId && (() => {
              const ra = currentProgram.riskAreas.find(r => r.id === testForm.riskAreaId)
              const sr = ra?.specificRisks.find(s => s.id === testForm.specificRiskId)
              const obj = sr?.controlObjectives.find(o => o.id === testForm.objectiveId)
              const ctrl = obj?.controls.find(c => c.id === testForm.controlId)
              return (
                <>
                  <label className="edit-label">Control Type</label>
                  <select className="edit-input" value={testForm.controlTypeId} onChange={e => setTestForm(f => ({ ...f, controlTypeId: e.target.value }))}>
                    <option value="">Select control type...</option>
                    {ctrl?.controlTypes.map(ct => <option key={ct.id} value={ct.id}>{ct.name}</option>)}
                  </select>
                </>
              )
            })()}

            <label className="edit-label">Test Name</label>
            <input className="edit-input" placeholder="e.g. Sample Reconciliation Test" value={testForm.name} onChange={e => setTestForm(f => ({ ...f, name: e.target.value }))} />
            <label className="edit-label">Description</label>
            <textarea className="edit-textarea" placeholder="Describe the test..." value={testForm.description} onChange={e => setTestForm(f => ({ ...f, description: e.target.value }))} />
            <label className="edit-label">Steps (one per line)</label>
            {testForm.steps.map((step, i) => (
              <input key={i} className="edit-input" placeholder={`Step ${i + 1}...`} value={step} onChange={e => setTestForm(f => ({ ...f, steps: f.steps.map((s, j) => j === i ? e.target.value : s) }))} />
            ))}
            <button className="edit-btn-secondary" onClick={() => setTestForm(f => ({ ...f, steps: [...f.steps, ''] }))}>+ Add Step</button>
            <button className="edit-btn" onClick={handleAddTestTemplate}>Add Test Template</button>
          </div>
        )}

        <div className="edit-reset">
          <button className="edit-btn-reset" onClick={() => { resetData(); showToast('Data reset to default') }}>↺ Reset All Changes</button>
        </div>
      </div>
    </div>
  )
}

export default EditToolkit

// Made with Bob
