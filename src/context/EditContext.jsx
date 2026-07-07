import React, { createContext, useContext, useState } from 'react'
import { auditData as originalData } from '../data/condensedData'

// Deep clone the original data so edits don't mutate the source
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

const EditContext = createContext(null)

export function EditProvider({ children }) {
  const [data, setData] = useState(() => deepClone(originalData))

  // --- Update helpers ---

  function updateProgram(functionId, programId, fields) {
    setData(prev => {
      const next = deepClone(prev)
      const prog = next[functionId].programs.find(p => p.id === programId)
      if (prog) Object.assign(prog, fields)
      return next
    })
  }

  function addProgram(functionId, name, description) {
    setData(prev => {
      const next = deepClone(prev)
      const id = `${functionId}-prog-${Date.now()}`
      next[functionId].programs.push({ id, name, description, riskAreas: [] })
      return next
    })
  }

  function updateRiskArea(functionId, programId, riskAreaId, fields) {
    setData(prev => {
      const next = deepClone(prev)
      const prog = next[functionId].programs.find(p => p.id === programId)
      const ra = prog?.riskAreas.find(r => r.id === riskAreaId)
      if (ra) Object.assign(ra, fields)
      return next
    })
  }

  function addRiskArea(functionId, programId, name, description) {
    setData(prev => {
      const next = deepClone(prev)
      const prog = next[functionId].programs.find(p => p.id === programId)
      if (prog) {
        const id = `ra-${Date.now()}`
        prog.riskAreas.push({ id, name, description, specificRisks: [] })
      }
      return next
    })
  }

  function addSpecificRisk(functionId, programId, riskAreaId, name, description) {
    setData(prev => {
      const next = deepClone(prev)
      const prog = next[functionId].programs.find(p => p.id === programId)
      const ra = prog?.riskAreas.find(r => r.id === riskAreaId)
      if (ra) {
        const id = `sr-${Date.now()}`
        ra.specificRisks.push({ id, name, description, controlObjectives: [] })
      }
      return next
    })
  }

  function addControl(functionId, programId, riskAreaId, specificRiskId, objectiveId, name, description) {
    setData(prev => {
      const next = deepClone(prev)
      const prog = next[functionId].programs.find(p => p.id === programId)
      const ra = prog?.riskAreas.find(r => r.id === riskAreaId)
      const sr = ra?.specificRisks.find(s => s.id === specificRiskId)
      const obj = sr?.controlObjectives.find(o => o.id === objectiveId)
      if (obj) {
        const id = `ctrl-${Date.now()}`
        obj.controls.push({
          id, name, description,
          controlTypes: [
            { id: `ct-${Date.now()}`, name: 'Detective Control', description: '', testTemplates: [] },
            { id: `ct-${Date.now()}-2`, name: 'Preventive Control', description: '', testTemplates: [] },
          ]
        })
      }
      return next
    })
  }

  function addTestTemplate(functionId, programId, riskAreaId, specificRiskId, objectiveId, controlId, controlTypeId, name, description, steps) {
    setData(prev => {
      const next = deepClone(prev)
      const prog = next[functionId].programs.find(p => p.id === programId)
      const ra = prog?.riskAreas.find(r => r.id === riskAreaId)
      const sr = ra?.specificRisks.find(s => s.id === specificRiskId)
      const obj = sr?.controlObjectives.find(o => o.id === objectiveId)
      const ctrl = obj?.controls.find(c => c.id === controlId)
      const ct = ctrl?.controlTypes.find(t => t.id === controlTypeId)
      if (ct) {
        const id = `tt-${Date.now()}`
        ct.testTemplates.push({ id, name, description, steps: steps.filter(s => s.trim()) })
      }
      return next
    })
  }

  function deleteRiskArea(functionId, programId, riskAreaId) {
    setData(prev => {
      const next = deepClone(prev)
      const prog = next[functionId].programs.find(p => p.id === programId)
      if (prog) prog.riskAreas = prog.riskAreas.filter(r => r.id !== riskAreaId)
      return next
    })
  }

  function deleteSpecificRisk(functionId, programId, riskAreaId, specificRiskId) {
    setData(prev => {
      const next = deepClone(prev)
      const prog = next[functionId].programs.find(p => p.id === programId)
      const ra = prog?.riskAreas.find(r => r.id === riskAreaId)
      if (ra) ra.specificRisks = ra.specificRisks.filter(s => s.id !== specificRiskId)
      return next
    })
  }

  function deleteControl(functionId, programId, riskAreaId, specificRiskId, objectiveId, controlId) {
    setData(prev => {
      const next = deepClone(prev)
      const prog = next[functionId].programs.find(p => p.id === programId)
      const ra = prog?.riskAreas.find(r => r.id === riskAreaId)
      const sr = ra?.specificRisks.find(s => s.id === specificRiskId)
      const obj = sr?.controlObjectives.find(o => o.id === objectiveId)
      if (obj) obj.controls = obj.controls.filter(c => c.id !== controlId)
      return next
    })
  }

  function deleteTestTemplate(functionId, programId, riskAreaId, specificRiskId, objectiveId, controlId, controlTypeId, templateId) {
    setData(prev => {
      const next = deepClone(prev)
      const prog = next[functionId].programs.find(p => p.id === programId)
      const ra = prog?.riskAreas.find(r => r.id === riskAreaId)
      const sr = ra?.specificRisks.find(s => s.id === specificRiskId)
      const obj = sr?.controlObjectives.find(o => o.id === objectiveId)
      const ctrl = obj?.controls.find(c => c.id === controlId)
      const ct = ctrl?.controlTypes.find(t => t.id === controlTypeId)
      if (ct) ct.testTemplates = ct.testTemplates.filter(t => t.id !== templateId)
      return next
    })
  }

  function resetData() {
    setData(deepClone(originalData))
  }

  return (
    <EditContext.Provider value={{
      data,
      updateProgram,
      addProgram,
      updateRiskArea,
      addRiskArea,
      addSpecificRisk,
      addControl,
      addTestTemplate,
      deleteRiskArea,
      deleteSpecificRisk,
      deleteControl,
      deleteTestTemplate,
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
