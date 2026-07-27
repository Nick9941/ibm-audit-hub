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

  // ─── Similar Risk Links ─────────────────────────────────────────────────────

  function linkSimilarRisk(riskA, riskB) {
    setData(prev => {
      const next = deepClone(prev)

      function findRisk(d, fId, pId, raId) {
        return d[fId]?.programs.find(p => p.id === pId)
          ?.riskAreas.find(r => r.id === raId)
      }

      const raA = findRisk(next, riskA.functionId, riskA.programId, riskA.id)
      const raB = findRisk(next, riskB.functionId, riskB.programId, riskB.id)

      if (raA && raB) {
        if (!raA.linkedSimilarRisks) raA.linkedSimilarRisks = []
        if (!raB.linkedSimilarRisks) raB.linkedSimilarRisks = []

        if (!raA.linkedSimilarRisks.some(s => s.id === `sim-risk-${riskB.id}`)) {
          raA.linkedSimilarRisks.push({
            id: `sim-risk-${riskB.id}`,
            riskId: riskB.id,
            name: riskB.name,
            programName: riskB.programName,
            functionName: riskB.functionName,
            description: riskB.description,
            similarity: '',
          })
        }
        if (!raB.linkedSimilarRisks.some(s => s.id === `sim-risk-${riskA.id}`)) {
          raB.linkedSimilarRisks.push({
            id: `sim-risk-${riskA.id}`,
            riskId: riskA.id,
            name: riskA.name,
            programName: riskA.programName,
            functionName: riskA.functionName,
            description: riskA.description,
            similarity: '',
          })
        }
      }
      return next
    })
    logTrail(trailEntry('Linked', 'Similar Risk', `${riskA.name} ↔ ${riskB.name}`))
  }

  function removeSimilarRisk(riskA, simId, linkedRiskId) {
    setData(prev => {
      const next = deepClone(prev)

      function findRisk(d, fId, pId, raId) {
        return d[fId]?.programs.find(p => p.id === pId)
          ?.riskAreas.find(r => r.id === raId)
      }

      const raA = findRisk(next, riskA.functionId, riskA.programId, riskA.id)
      if (raA?.linkedSimilarRisks) {
        raA.linkedSimilarRisks = raA.linkedSimilarRisks.filter(s => s.id !== simId)
      }

      // Remove reciprocal link
      if (linkedRiskId) {
        Object.values(next).forEach(fn => {
          fn.programs.forEach(p => p.riskAreas.forEach(ra => {
            if (ra.id === linkedRiskId && ra.linkedSimilarRisks) {
              ra.linkedSimilarRisks = ra.linkedSimilarRisks.filter(s => s.id !== `sim-risk-${riskA.id}`)
            }
          }))
        })
      }
      return next
    })
    logTrail(trailEntry('Unlinked', 'Similar Risk', riskA.name))
  }

  function updateSimilarRiskNote(riskA, simId, similarity) {
    setData(prev => {
      const next = deepClone(prev)
      const ra = next[riskA.functionId]?.programs.find(p => p.id === riskA.programId)
        ?.riskAreas.find(r => r.id === riskA.id)
      if (ra?.linkedSimilarRisks) {
        const sim = ra.linkedSimilarRisks.find(s => s.id === simId)
        if (sim) sim.similarity = similarity
      }
      return next
    })
  }

  // ─── Similar Test Links ─────────────────────────────────────────────────────

  // Links two tests as "similar" — writes to both sides automatically
  function linkSimilarTest(testA, testB) {
    setData(prev => {
      const next = deepClone(prev)

      function findTemplate(d, fId, pId, raId, coId, ctrlId, ttId) {
        return d[fId]?.programs.find(p => p.id === pId)
          ?.riskAreas.find(r => r.id === raId)
          ?.controlObjectives.find(o => o.id === coId)
          ?.controls.find(c => c.id === ctrlId)
          ?.testTemplates.find(t => t.id === ttId)
      }

      const ttA = findTemplate(next, testA.functionId, testA.programId, testA.riskAreaId, testA.objectiveId, testA.controlId, testA.id)
      const ttB = findTemplate(next, testB.functionId, testB.programId, testB.riskAreaId, testB.objectiveId, testB.controlId, testB.id)

      if (ttA && ttB) {
        if (!ttA.similarTests) ttA.similarTests = []
        if (!ttB.similarTests) ttB.similarTests = []

        const alreadyLinkedOnA = ttA.similarTests.some(s => s.id === `sim-linked-${testB.id}`)
        const alreadyLinkedOnB = ttB.similarTests.some(s => s.id === `sim-linked-${testA.id}`)

        if (!alreadyLinkedOnA) {
          ttA.similarTests.push({
            id: `sim-linked-${testB.id}`,
            name: testB.name,
            program: testB.programName,
            overview: testB.description,
            similarity: 'Manually linked by user.',
            pdfUrl: testB.pdfUrl || null,
          })
        }
        if (!alreadyLinkedOnB) {
          ttB.similarTests.push({
            id: `sim-linked-${testA.id}`,
            name: testA.name,
            program: testA.programName,
            overview: testA.description,
            similarity: 'Manually linked by user.',
            pdfUrl: testA.pdfUrl || null,
          })
        }
      }
      return next
    })
    logTrail(trailEntry('Linked', 'Similar Test', `${testA.name} ↔ ${testB.name}`))
  }

  // Removes a similar test link from both sides
  function removeSimilarTest(testA, simId, linkedTestId) {
    setData(prev => {
      const next = deepClone(prev)

      function findTemplate(d, fId, pId, raId, coId, ctrlId, ttId) {
        return d[fId]?.programs.find(p => p.id === pId)
          ?.riskAreas.find(r => r.id === raId)
          ?.controlObjectives.find(o => o.id === coId)
          ?.controls.find(c => c.id === ctrlId)
          ?.testTemplates.find(t => t.id === ttId)
      }

      // Remove from testA
      const ttA = findTemplate(next, testA.functionId, testA.programId, testA.riskAreaId, testA.objectiveId, testA.controlId, testA.id)
      if (ttA?.similarTests) ttA.similarTests = ttA.similarTests.filter(s => s.id !== simId)

      // Remove the reciprocal link from the linked test
      if (linkedTestId) {
        Object.values(next).forEach(fn => {
          fn.programs.forEach(p => p.riskAreas.forEach(ra => ra.controlObjectives.forEach(co => co.controls.forEach(ctrl => {
            const tt = ctrl.testTemplates.find(t => t.id === linkedTestId)
            if (tt?.similarTests) tt.similarTests = tt.similarTests.filter(s => s.id !== `sim-linked-${testA.id}`)
          }))))
        })
      }
      return next
    })
    logTrail(trailEntry('Unlinked', 'Similar Test', testA.name))
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

  function updateCommentStatus(nodeId, commentId, status) {
    setComments(prev => ({
      ...prev,
      [nodeId]: (prev[nodeId] || []).map(c =>
        c.id === commentId ? { ...c, status } : c
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

  function getOpenIssueCount(nodeId) {
    return (comments[nodeId] || []).filter(c => !c.parentId && c.status !== 'Resolved').length
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
      linkSimilarRisk,
      removeSimilarRisk,
      updateSimilarRiskNote,
      linkSimilarTest,
      removeSimilarTest,
      addComment,
      editComment,
      updateCommentStatus,
      deleteComment,
      getCommentCount,
      getOpenIssueCount,
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
