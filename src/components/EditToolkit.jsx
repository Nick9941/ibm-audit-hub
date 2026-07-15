import React, { useState } from 'react'
import { useEditData } from '../context/EditContext'

const BLANK_RA   = { name: '', description: '' }
const BLANK_CTRL = { riskAreaId: '', objectiveId: '', name: '', description: '' }
const BLANK_TEST = { riskAreaId: '', objectiveId: '', controlId: '', name: '', description: '', steps: ['', '', ''] }

function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="et-confirm-overlay" onClick={onCancel}>
      <div className="et-confirm-box" onClick={e => e.stopPropagation()}>
        <p className="et-confirm-msg">{message}</p>
        <div className="et-confirm-actions">
          <button className="et-confirm-yes" onClick={onConfirm}>Delete</button>
          <button className="et-confirm-no"  onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

function TrailEntry({ entry }) {
  const colors = { Created: '#10b981', Updated: '#4f7ecf', Deleted: '#ef4444' }
  return (
    <div className="et-trail-entry">
      <span className="et-trail-badge" style={{ background: colors[entry.action] || '#6b7280' }}>
        {entry.action}
      </span>
      <span className="et-trail-entity">{entry.entity}</span>
      <span className="et-trail-name">"{entry.name}"</span>
      <span className="et-trail-who">by {entry.user}</span>
      <span className="et-trail-time">{new Date(entry.at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</span>
    </div>
  )
}

function EditToolkit({ functionId, currentProgram, onClose }) {
  const {
    updateProgram,
    addRiskArea, updateRiskArea, getRiskAreaDependencyCount, deleteRiskArea,
    addControl, updateControl, getControlDependencyCount, deleteControl,
    addTestTemplate, updateTestTemplate, deleteTestTemplate,
    auditTrail, resetData,
  } = useEditData()

  const [activeTab, setActiveTab] = useState('riskArea')
  const [toast, setToast]         = useState('')
  const [confirm, setConfirm]     = useState(null) // { message, onConfirm }

  // ── Risk Area forms ──────────────────────────────────────────────────────────
  const [raForm,    setRaForm]    = useState(BLANK_RA)
  const [raEditId,  setRaEditId]  = useState('')
  const [raEditForm,setRaEditForm]= useState(BLANK_RA)

  // ── Control forms ────────────────────────────────────────────────────────────
  const [ctrlForm,    setCtrlForm]    = useState(BLANK_CTRL)
  const [ctrlEditId,  setCtrlEditId]  = useState('')
  const [ctrlEditCtx, setCtrlEditCtx] = useState({ riskAreaId: '', objectiveId: '' })
  const [ctrlEditForm,setCtrlEditForm]= useState({ name: '', description: '' })

  // ── Test forms ───────────────────────────────────────────────────────────────
  const [testForm,     setTestForm]     = useState(BLANK_TEST)
  const [testEditId,   setTestEditId]   = useState('')
  const [testEditCtx,  setTestEditCtx]  = useState({ riskAreaId: '', objectiveId: '', controlId: '' })
  const [testEditForm, setTestEditForm] = useState({ name: '', description: '', steps: [] })

  // ── Program form ─────────────────────────────────────────────────────────────
  const [progForm, setProgForm] = useState({ name: currentProgram?.name || '', description: currentProgram?.description || '' })

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  function askConfirm(message, onConfirm) {
    setConfirm({ message, onConfirm })
  }

  // ── Program ──────────────────────────────────────────────────────────────────
  function handleUpdateProgram() {
    if (!progForm.name.trim()) return
    updateProgram(functionId, currentProgram.id, { name: progForm.name, description: progForm.description })
    showToast('Program updated')
  }

  // ── Risk Area ─────────────────────────────────────────────────────────────────
  function handleAddRiskArea() {
    if (!raForm.name.trim()) return
    addRiskArea(functionId, currentProgram.id, raForm.name, raForm.description)
    setRaForm(BLANK_RA)
    showToast('Risk Area added')
  }

  function startEditRa(ra) {
    setRaEditId(ra.id)
    setRaEditForm({ name: ra.name, description: ra.description })
  }

  function handleUpdateRa() {
    if (!raEditForm.name.trim()) return
    updateRiskArea(functionId, currentProgram.id, raEditId, raEditForm)
    setRaEditId('')
    showToast('Risk Area updated')
  }

  function handleDeleteRa(ra) {
    const depCount = getRiskAreaDependencyCount(functionId, currentProgram.id, ra.id)
    const msg = depCount > 0
      ? `"${ra.name}" has ${depCount} dependent record(s). Delete everything?`
      : `Delete Risk Area "${ra.name}"?`
    askConfirm(msg, () => {
      deleteRiskArea(functionId, currentProgram.id, ra.id, ra.name)
      showToast('Risk Area deleted')
      setConfirm(null)
    })
  }

  // ── Control ───────────────────────────────────────────────────────────────────
  function handleAddControl() {
    if (!ctrlForm.name.trim() || !ctrlForm.riskAreaId || !ctrlForm.objectiveId) return
    addControl(functionId, currentProgram.id, ctrlForm.riskAreaId, ctrlForm.objectiveId, ctrlForm.name, ctrlForm.description)
    setCtrlForm(BLANK_CTRL)
    showToast('Control added')
  }

  function startEditCtrl(riskAreaId, objectiveId, ctrl) {
    setCtrlEditId(ctrl.id)
    setCtrlEditCtx({ riskAreaId, objectiveId })
    setCtrlEditForm({ name: ctrl.name, description: ctrl.description })
  }

  function handleUpdateCtrl() {
    if (!ctrlEditForm.name.trim()) return
    updateControl(functionId, currentProgram.id, ctrlEditCtx.riskAreaId, ctrlEditCtx.objectiveId, ctrlEditId, ctrlEditForm)
    setCtrlEditId('')
    showToast('Control updated')
  }

  function handleDeleteCtrl(riskAreaId, objectiveId, ctrl) {
    const depCount = getControlDependencyCount(functionId, currentProgram.id, riskAreaId, objectiveId, ctrl.id)
    const msg = depCount > 0
      ? `"${ctrl.name}" has ${depCount} test(s). Delete everything?`
      : `Delete Control "${ctrl.name}"?`
    askConfirm(msg, () => {
      deleteControl(functionId, currentProgram.id, riskAreaId, objectiveId, ctrl.id, ctrl.name)
      showToast('Control deleted')
      setConfirm(null)
    })
  }

  // ── Test ──────────────────────────────────────────────────────────────────────
  function handleAddTest() {
    if (!testForm.name.trim() || !testForm.controlId) return
    addTestTemplate(
      functionId, currentProgram.id,
      testForm.riskAreaId, testForm.objectiveId, testForm.controlId,
      testForm.name, testForm.description, testForm.steps
    )
    setTestForm(BLANK_TEST)
    showToast('Test added')
  }

  function startEditTest(riskAreaId, objectiveId, controlId, tt) {
    setTestEditId(tt.id)
    setTestEditCtx({ riskAreaId, objectiveId, controlId })
    setTestEditForm({ name: tt.name, description: tt.description, steps: [...tt.steps] })
  }

  function handleUpdateTest() {
    if (!testEditForm.name.trim()) return
    updateTestTemplate(
      functionId, currentProgram.id,
      testEditCtx.riskAreaId, testEditCtx.objectiveId, testEditCtx.controlId,
      testEditId, testEditForm
    )
    setTestEditId('')
    showToast('Test updated')
  }

  function handleDeleteTest(riskAreaId, objectiveId, controlId, tt) {
    askConfirm(`Delete Test "${tt.name}"?`, () => {
      deleteTestTemplate(functionId, currentProgram.id, riskAreaId, objectiveId, controlId, tt.id, tt.name)
      showToast('Test deleted')
      setConfirm(null)
    })
  }

  // ── Helpers ───────────────────────────────────────────────────────────────────
  const riskAreas = currentProgram.riskAreas || []

  const objsFor = (raId) => riskAreas.find(r => r.id === raId)?.controlObjectives || []
  const ctrlsFor = (raId, objId) => objsFor(raId).find(o => o.id === objId)?.controls || []

  const tabs = [
    { id: 'riskArea', label: 'Risk Areas' },
    { id: 'control',  label: 'Controls'   },
    { id: 'test',     label: 'Tests'       },
    { id: 'trail',    label: 'Audit Trail' },
  ]

  return (
    <div className="edit-toolkit">
      {confirm && (
        <ConfirmDialog
          message={confirm.message}
          onConfirm={confirm.onConfirm}
          onCancel={() => setConfirm(null)}
        />
      )}

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

        {/* ── Risk Areas ─────────────────────────────────────────────────────── */}
        {activeTab === 'riskArea' && (
          <div>
            <p className="edit-form-title">Add Risk Area</p>
            <div className="edit-form">
              <label className="edit-label">Name</label>
              <input className="edit-input" placeholder="e.g. Revenue Recognition" value={raForm.name}
                onChange={e => setRaForm(f => ({ ...f, name: e.target.value }))} />
              <label className="edit-label">Description</label>
              <textarea className="edit-textarea" placeholder="Describe the risk area..." value={raForm.description}
                onChange={e => setRaForm(f => ({ ...f, description: e.target.value }))} />
              <button className="edit-btn" onClick={handleAddRiskArea}>+ Add Risk Area</button>
            </div>

            {riskAreas.length > 0 && (
              <div className="et-list">
                <p className="edit-form-title" style={{ marginTop: '1rem' }}>Existing Risk Areas</p>
                {riskAreas.map(ra => (
                  <div key={ra.id} className="et-list-item">
                    {raEditId === ra.id ? (
                      <div className="edit-form">
                        <input className="edit-input" value={raEditForm.name}
                          onChange={e => setRaEditForm(f => ({ ...f, name: e.target.value }))} />
                        <textarea className="edit-textarea" value={raEditForm.description}
                          onChange={e => setRaEditForm(f => ({ ...f, description: e.target.value }))} />
                        <div className="et-item-actions">
                          <button className="edit-btn" onClick={handleUpdateRa}>Save</button>
                          <button className="edit-btn-secondary" onClick={() => setRaEditId('')}>Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="et-item-name">{ra.name}</div>
                        <div className="et-item-actions">
                          <button className="et-edit-btn" onClick={() => startEditRa(ra)}>Edit</button>
                          <button className="et-delete-btn" onClick={() => handleDeleteRa(ra)}>Delete</button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Controls ───────────────────────────────────────────────────────── */}
        {activeTab === 'control' && (
          <div>
            <p className="edit-form-title">Add Control</p>
            <div className="edit-form">
              <label className="edit-label">Risk Area</label>
              <select className="edit-input" value={ctrlForm.riskAreaId}
                onChange={e => setCtrlForm(f => ({ ...f, riskAreaId: e.target.value, objectiveId: '' }))}>
                <option value="">Select risk area…</option>
                {riskAreas.map(ra => <option key={ra.id} value={ra.id}>{ra.name}</option>)}
              </select>

              {ctrlForm.riskAreaId && (
                <>
                  <label className="edit-label">Control Objective</label>
                  <select className="edit-input" value={ctrlForm.objectiveId}
                    onChange={e => setCtrlForm(f => ({ ...f, objectiveId: e.target.value }))}>
                    <option value="">Select objective…</option>
                    {objsFor(ctrlForm.riskAreaId).map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
                  </select>
                </>
              )}

              <label className="edit-label">Control Name</label>
              <input className="edit-input" placeholder="e.g. Monthly Reconciliation" value={ctrlForm.name}
                onChange={e => setCtrlForm(f => ({ ...f, name: e.target.value }))} />
              <label className="edit-label">Description</label>
              <textarea className="edit-textarea" placeholder="Describe the control..." value={ctrlForm.description}
                onChange={e => setCtrlForm(f => ({ ...f, description: e.target.value }))} />
              <button className="edit-btn" onClick={handleAddControl}>+ Add Control</button>
            </div>

            {riskAreas.flatMap(ra =>
              ra.controlObjectives.flatMap(obj => obj.controls.map(ctrl => ({ ra, obj, ctrl })))
            ).length > 0 && (
              <div className="et-list">
                <p className="edit-form-title" style={{ marginTop: '1rem' }}>Existing Controls</p>
                {riskAreas.map(ra =>
                  ra.controlObjectives.map(obj =>
                    obj.controls.map(ctrl => (
                      <div key={ctrl.id} className="et-list-item">
                        <div className="et-item-context">{ra.name} › {obj.name}</div>
                        {ctrlEditId === ctrl.id ? (
                          <div className="edit-form">
                            <input className="edit-input" value={ctrlEditForm.name}
                              onChange={e => setCtrlEditForm(f => ({ ...f, name: e.target.value }))} />
                            <textarea className="edit-textarea" value={ctrlEditForm.description}
                              onChange={e => setCtrlEditForm(f => ({ ...f, description: e.target.value }))} />
                            <div className="et-item-actions">
                              <button className="edit-btn" onClick={handleUpdateCtrl}>Save</button>
                              <button className="edit-btn-secondary" onClick={() => setCtrlEditId('')}>Cancel</button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="et-item-name">{ctrl.name}</div>
                            <div className="et-item-actions">
                              <button className="et-edit-btn" onClick={() => startEditCtrl(ra.id, obj.id, ctrl)}>Edit</button>
                              <button className="et-delete-btn" onClick={() => handleDeleteCtrl(ra.id, obj.id, ctrl)}>Delete</button>
                            </div>
                          </>
                        )}
                      </div>
                    ))
                  )
                )}
              </div>
            )}
          </div>
        )}

        {/* ── Tests ──────────────────────────────────────────────────────────── */}
        {activeTab === 'test' && (
          <div>
            <p className="edit-form-title">Add Test</p>
            <div className="edit-form">
              <label className="edit-label">Risk Area</label>
              <select className="edit-input" value={testForm.riskAreaId}
                onChange={e => setTestForm(f => ({ ...f, riskAreaId: e.target.value, objectiveId: '', controlId: '' }))}>
                <option value="">Select risk area…</option>
                {riskAreas.map(ra => <option key={ra.id} value={ra.id}>{ra.name}</option>)}
              </select>

              {testForm.riskAreaId && (
                <>
                  <label className="edit-label">Control Objective</label>
                  <select className="edit-input" value={testForm.objectiveId}
                    onChange={e => setTestForm(f => ({ ...f, objectiveId: e.target.value, controlId: '' }))}>
                    <option value="">Select objective…</option>
                    {objsFor(testForm.riskAreaId).map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
                  </select>
                </>
              )}

              {testForm.objectiveId && (
                <>
                  <label className="edit-label">Control</label>
                  <select className="edit-input" value={testForm.controlId}
                    onChange={e => setTestForm(f => ({ ...f, controlId: e.target.value }))}>
                    <option value="">Select control…</option>
                    {ctrlsFor(testForm.riskAreaId, testForm.objectiveId).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </>
              )}

              <label className="edit-label">Test Name</label>
              <input className="edit-input" placeholder="e.g. Sample Revenue Transactions" value={testForm.name}
                onChange={e => setTestForm(f => ({ ...f, name: e.target.value }))} />
              <label className="edit-label">Description</label>
              <textarea className="edit-textarea" placeholder="Describe the test..." value={testForm.description}
                onChange={e => setTestForm(f => ({ ...f, description: e.target.value }))} />
              <label className="edit-label">Steps</label>
              {testForm.steps.map((step, i) => (
                <input key={i} className="edit-input" placeholder={`Step ${i + 1}…`} value={step}
                  onChange={e => setTestForm(f => ({ ...f, steps: f.steps.map((s, j) => j === i ? e.target.value : s) }))} />
              ))}
              <button className="edit-btn-secondary" onClick={() => setTestForm(f => ({ ...f, steps: [...f.steps, ''] }))}>+ Add Step</button>
              <button className="edit-btn" onClick={handleAddTest}>+ Add Test</button>
            </div>

            {riskAreas.flatMap(ra =>
              ra.controlObjectives.flatMap(obj =>
                obj.controls.flatMap(ctrl => ctrl.testTemplates.map(tt => ({ ra, obj, ctrl, tt })))
              )
            ).length > 0 && (
              <div className="et-list">
                <p className="edit-form-title" style={{ marginTop: '1rem' }}>Existing Tests</p>
                {riskAreas.map(ra =>
                  ra.controlObjectives.map(obj =>
                    obj.controls.map(ctrl =>
                      ctrl.testTemplates.map(tt => (
                        <div key={tt.id} className="et-list-item">
                          <div className="et-item-context">{ra.name} › {ctrl.name}</div>
                          {testEditId === tt.id ? (
                            <div className="edit-form">
                              <input className="edit-input" value={testEditForm.name}
                                onChange={e => setTestEditForm(f => ({ ...f, name: e.target.value }))} />
                              <textarea className="edit-textarea" value={testEditForm.description}
                                onChange={e => setTestEditForm(f => ({ ...f, description: e.target.value }))} />
                              {testEditForm.steps.map((s, i) => (
                                <input key={i} className="edit-input" value={s}
                                  onChange={e => setTestEditForm(f => ({ ...f, steps: f.steps.map((v, j) => j === i ? e.target.value : v) }))} />
                              ))}
                              <div className="et-item-actions">
                                <button className="edit-btn" onClick={handleUpdateTest}>Save</button>
                                <button className="edit-btn-secondary" onClick={() => setTestEditId('')}>Cancel</button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="et-item-name">{tt.name}</div>
                              <div className="et-item-actions">
                                <button className="et-edit-btn" onClick={() => startEditTest(ra.id, obj.id, ctrl.id, tt)}>Edit</button>
                                <button className="et-delete-btn" onClick={() => handleDeleteTest(ra.id, obj.id, ctrl.id, tt)}>Delete</button>
                              </div>
                            </>
                          )}
                        </div>
                      ))
                    )
                  )
                )}
              </div>
            )}
          </div>
        )}

        {/* ── Audit Trail ────────────────────────────────────────────────────── */}
        {activeTab === 'trail' && (
          <div>
            <p className="edit-form-title">Audit Trail</p>
            {auditTrail.length === 0 && (
              <p className="et-empty">No changes recorded yet.</p>
            )}
            <div className="et-trail-list">
              {auditTrail.map(entry => <TrailEntry key={entry.id} entry={entry} />)}
            </div>
          </div>
        )}

        <div className="edit-reset">
          <button className="edit-btn-reset" onClick={() => { resetData(); showToast('Data reset to default') }}>
            ↺ Reset All Changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditToolkit

// Made with Bob
