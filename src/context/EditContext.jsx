import React, { createContext, useContext, useState } from 'react'
import { auditData as originalData } from '../data/condensedData'

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

function timestamp() {
  return new Date().toISOString()
}

function trailEntry(action, entity, name, user = 'Auditor') {
  return { id: `trail-${Date.now()}-${Math.random()}`, action, entity, name, user, at: timestamp() }
}

const EditContext = createContext(null)

export function EditProvider({ children }) {
  const [data, setData] = useState(() => deepClone(originalData))
  const [auditTrail, setAuditTrail] = useState([])
  // comments keyed by nodeId  { [nodeId]: Comment[] }
  // Comment: { id, parentId|null, author, text, type, at, edited }
  const [comments, setComments] = useState({})

  function logTrail(entry) {
    setAuditTrail(prev => [entry, ...prev])
  }

  // ─── Program ────────────────────────────────────────────────────────────────

  function updateProgram(functionId, programId, fields) {
    setData(prev => {
      const next = deepClone(prev)
      const prog = next[functionId].programs.find(p => p.id === programId)
      if (prog) Object.assign(prog, fields)
      return next
    })
    logTrail(trailEntry('Updated', 'Program', fields.name || programId))
  }

  function addProgram(functionId, name, description) {
    setData(prev => {
      const next = deepClone(prev)
      const id = `${functionId}-prog-${Date.now()}`
      next[functionId].programs.push({ id, name, description, riskAreas: [] })
      return next
    })
    logTrail(trailEntry('Created', 'Program', name))
  }

  // ─── Risk Area ──────────────────────────────────────────────────────────────

  function addRiskArea(functionId, programId, name, description) {
    setData(prev => {
      const next = deepClone(prev)
      const prog = next[functionId].programs.find(p => p.id === programId)
      if (prog) {
        const id = `ra-${Date.now()}`
        prog.riskAreas.push({ id, name, description, controlObjectives: [] })
      }
      return next
    })
    logTrail(trailEntry('Created', 'Risk Area', name))
  }

  function updateRiskArea(functionId, programId, riskAreaId, fields) {
    setData(prev => {
      const next = deepClone(prev)
      const prog = next[functionId].programs.find(p => p.id === programId)
      const ra = prog?.riskAreas.find(r => r.id === riskAreaId)
      if (ra) Object.assign(ra, fields)
      return next
    })
    logTrail(trailEntry('Updated', 'Risk Area', fields.name || riskAreaId))
  }

  // Returns count of dependent controls + tests; caller uses this for confirm dialog
  function getRiskAreaDependencyCount(functionId, programId, riskAreaId) {
    const prog = data[functionId]?.programs.find(p => p.id === programId)
    const ra = prog?.riskAreas.find(r => r.id === riskAreaId)
    if (!ra) return 0
    return ra.controlObjectives.reduce((s, co) =>
      s + co.controls.reduce((s2, c) => s2 + 1 + c.testTemplates.length, 0), 0)
  }

  function deleteRiskArea(functionId, programId, riskAreaId, name) {
    setData(prev => {
      const next = deepClone(prev)
      const prog = next[functionId].programs.find(p => p.id === programId)
      if (prog) prog.riskAreas = prog.riskAreas.filter(r => r.id !== riskAreaId)
      return next
    })
    logTrail(trailEntry('Deleted', 'Risk Area', name || riskAreaId))
  }

  // ─── Control Objective ──────────────────────────────────────────────────────

  function addControlObjective(functionId, programId, riskAreaId, name, description) {
    setData(prev => {
      const next = deepClone(prev)
      const prog = next[functionId].programs.find(p => p.id === programId)
      const ra = prog?.riskAreas.find(r => r.id === riskAreaId)
      if (ra) {
        const id = `co-${Date.now()}`
        ra.controlObjectives.push({ id, name, description, controls: [] })
      }
      return next
    })
    logTrail(trailEntry('Created', 'Control Objective', name))
  }

  // ─── Control ────────────────────────────────────────────────────────────────

  function addControl(functionId, programId, riskAreaId, objectiveId, name, description) {
    setData(prev => {
      const next = deepClone(prev)
      const prog = next[functionId].programs.find(p => p.id === programId)
      const ra = prog?.riskAreas.find(r => r.id === riskAreaId)
      const obj = ra?.controlObjectives.find(o => o.id === objectiveId)
      if (obj) {
        const id = `ctrl-${Date.now()}`
        obj.controls.push({ id, name, description, testTemplates: [] })
      }
      return next
    })
    logTrail(trailEntry('Created', 'Control', name))
  }

  function updateControl(functionId, programId, riskAreaId, objectiveId, controlId, fields) {
    setData(prev => {
      const next = deepClone(prev)
      const prog = next[functionId].programs.find(p => p.id === programId)
      const ra = prog?.riskAreas.find(r => r.id === riskAreaId)
      const obj = ra?.controlObjectives.find(o => o.id === objectiveId)
      const ctrl = obj?.controls.find(c => c.id === controlId)
      if (ctrl) Object.assign(ctrl, fields)
      return next
    })
    logTrail(trailEntry('Updated', 'Control', fields.name || controlId))
  }

  function getControlDependencyCount(functionId, programId, riskAreaId, objectiveId, controlId) {
    const prog = data[functionId]?.programs.find(p => p.id === programId)
    const ra = prog?.riskAreas.find(r => r.id === riskAreaId)
    const obj = ra?.controlObjectives.find(o => o.id === objectiveId)
    const ctrl = obj?.controls.find(c => c.id === controlId)
    return ctrl?.testTemplates.length ?? 0
  }

  function deleteControl(functionId, programId, riskAreaId, objectiveId, controlId, name) {
    setData(prev => {
      const next = deepClone(prev)
      const prog = next[functionId].programs.find(p => p.id === programId)
      const ra = prog?.riskAreas.find(r => r.id === riskAreaId)
      const obj = ra?.controlObjectives.find(o => o.id === objectiveId)
      if (obj) obj.controls = obj.controls.filter(c => c.id !== controlId)
      return next
    })
    logTrail(trailEntry('Deleted', 'Control', name || controlId))
  }

  // ─── Test Template ──────────────────────────────────────────────────────────

  function addTestTemplate(functionId, programId, riskAreaId, objectiveId, controlId, name, description, steps) {
    setData(prev => {
      const next = deepClone(prev)
      const prog = next[functionId].programs.find(p => p.id === programId)
      const ra = prog?.riskAreas.find(r => r.id === riskAreaId)
      const obj = ra?.controlObjectives.find(o => o.id === objectiveId)
      const ctrl = obj?.controls.find(c => c.id === controlId)
      if (ctrl) {
        const id = `tt-${Date.now()}`
        ctrl.testTemplates.push({ id, name, description, steps: steps.filter(s => s.trim()) })
      }
      return next
    })
    logTrail(trailEntry('Created', 'Test', name))
  }

  function updateTestTemplate(functionId, programId, riskAreaId, objectiveId, controlId, templateId, fields) {
    setData(prev => {
      const next = deepClone(prev)
      const prog = next[functionId].programs.find(p => p.id === programId)
      const ra = prog?.riskAreas.find(r => r.id === riskAreaId)
      const obj = ra?.controlObjectives.find(o => o.id === objectiveId)
      const ctrl = obj?.controls.find(c => c.id === controlId)
      const tt = ctrl?.testTemplates.find(t => t.id === templateId)
      if (tt) Object.assign(tt, fields)
      return next
    })
    logTrail(trailEntry('Updated', 'Test', fields.name || templateId))
  }

  function deleteTestTemplate(functionId, programId, riskAreaId, objectiveId, controlId, templateId, name) {
    setData(prev => {
      const next = deepClone(prev)
      const prog = next[functionId].programs.find(p => p.id === programId)
      const ra = prog?.riskAreas.find(r => r.id === riskAreaId)
      const obj = ra?.controlObjectives.find(o => o.id === objectiveId)
      const ctrl = obj?.controls.find(c => c.id === controlId)
      if (ctrl) ctrl.testTemplates = ctrl.testTemplates.filter(t => t.id !== templateId)
      return next
    })
    logTrail(trailEntry('Deleted', 'Test', name || templateId))
  }

  // ─── Comments ───────────────────────────────────────────────────────────────

  function addComment(nodeId, author, text, type, parentId = null) {
    const comment = {
      id: `cmt-${Date.now()}-${Math.random()}`,
      parentId,
      author,
      text,
      type,
      at: timestamp(),
      edited: false,
    }
    setComments(prev => ({ ...prev, [nodeId]: [...(prev[nodeId] || []), comment] }))
  }

  function editComment(nodeId, commentId, text) {
    setComments(prev => ({
      ...prev,
      [nodeId]: (prev[nodeId] || []).map(c =>
        c.id === commentId ? { ...c, text, edited: true } : c
      ),
    }))
  }

  function deleteComment(nodeId, commentId) {
    setComments(prev => ({
      ...prev,
      [nodeId]: (prev[nodeId] || []).filter(c => c.id !== commentId && c.parentId !== commentId),
    }))
  }

  function getCommentCount(nodeId) {
    return (comments[nodeId] || []).length
  }

  // ─── Reset ──────────────────────────────────────────────────────────────────

  function resetData() {
    setData(deepClone(originalData))
    setAuditTrail([])
    setComments({})
  }

  return (
    <EditContext.Provider value={{
      data,
      auditTrail,
      comments,
      updateProgram,
      addProgram,
      addRiskArea,
      updateRiskArea,
      getRiskAreaDependencyCount,
      deleteRiskArea,
      addControlObjective,
      addControl,
      updateControl,
      getControlDependencyCount,
      deleteControl,
      addTestTemplate,
      updateTestTemplate,
      deleteTestTemplate,
      addComment,
      editComment,
      deleteComment,
      getCommentCount,
      resetData,
    }}>
      {children}
    </EditContext.Provider>
  )
}

export function useEditData() {
  return useContext(EditContext)
}

// Made with Bob
