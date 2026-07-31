// Script to restructure condensedData.js from business functions to process owners
// Run with: node scripts/restructure-data.mjs
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const srcFile = join(__dirname, '../src/data/condensedData.js')
const content = readFileSync(srcFile, 'utf8')
const lines = content.split('\n')

// Lines 1-70 are the helpers (0-indexed: 0-69)
const headerLines = lines.slice(0, 70)

function extractProgramsContent(startLine) {
  let progLine = -1
  for (let i = startLine; i < lines.length; i++) {
    if (/programs:\s*\[/.test(lines[i])) { progLine = i; break }
  }
  if (progLine < 0) return []

  let depth = 0
  let inArray = false
  let programs = []
  let currentProg = []

  for (let i = progLine; i < lines.length; i++) {
    const line = lines[i]
    if (!inArray) {
      if (/programs:\s*\[/.test(line)) {
        inArray = true
        depth = 1
        continue
      }
    } else {
      for (const ch of line) {
        if (ch === '[' || ch === '{') depth++
        if (ch === ']' || ch === '}') depth--
      }
      if (depth === 0) {
        if (currentProg.length > 0) programs.push(currentProg.join('\n'))
        break
      }
      if (depth === 1 && (/^\s*\},?\s*$/.test(line) || /^\s*\}\s*$/.test(line))) {
        currentProg.push(line)
        programs.push(currentProg.join('\n'))
        currentProg = []
      } else {
        currentProg.push(line)
      }
    }
  }
  return programs
}

const financePrograms    = extractProgramsContent(74)
const accountingPrograms = extractProgramsContent(253)
const mfgPrograms        = extractProgramsContent(891)
const marketingPrograms  = extractProgramsContent(997)
const itPrograms         = extractProgramsContent(1228)

function getName(prog) {
  const m = prog.match(/name:\s*"([^"]+)"/)
  return m ? m[1] : ''
}

// Map program name to program content
const progByName = {}
for (const p of [...financePrograms, ...accountingPrograms, ...mfgPrograms, ...marketingPrograms, ...itPrograms]) {
  progByName[getName(p)] = p
}

// Helper to inject processNumber into a program block
function injectProcessNumber(progContent, processNumber) {
  // Insert processNumber after the first `id:` line inside the program object
  return progContent.replace(/(id:\s*"[^"]+",$)/, `$1\n        processNumber: "${processNumber}",`)
}

// Add processNumber to programs (using a simple regex insertion)
function addProcNum(name, num) {
  if (progByName[name]) {
    progByName[name] = injectProcessNumber(progByName[name], num)
  }
}

// Inject process numbers from the provided data
addProcNum('Accounting Fixed Assets', '10-40-00')
addProcNum('Accounting', '10-06-00 / 10-05-00') // Accounting Consolidation + GL Close
addProcNum('Accounts Payable', '18-10-00')
addProcNum('Accounts Receivable', '52-40-00')
addProcNum('IBM Financing Accounting', '10-20-00')
addProcNum('Cost Accounting', '10-50-00')
addProcNum('Intercompany Accounting', '10-30-00')
addProcNum('Income Tax', '15-20-00')
addProcNum('Indirect Tax', '15-10-00')
addProcNum('Treasury Operations', '12-00-00')
addProcNum('Credit Risk Management', '13-10-00')
addProcNum('Risk and Insurance Management', '13-20-00')
addProcNum('Pension Asset Management', '14-00-00')
addProcNum('Travel and Expense', '18-15-00')
addProcNum('Management of Disbursements', '18-05-00')
addProcNum('Procurement', '44-20-00')
addProcNum('GL Physical Logistics', '32-10-00')
addProcNum('GL Trade Compliance', '32-30-00')
addProcNum('Manufacturing', '54-00-00')
addProcNum('Parts Logistics', '32-20-00')
addProcNum('CRM for Hardware and Software', '30-00-00')
addProcNum('Marketing', '50-20-00')
addProcNum('Communications and Brand Marketing', '50-50-00')
addProcNum('Corporate Social Responsibility', '18-80-00')
addProcNum('ESG Reporting', '51-00-00')
addProcNum('Global Sales Incentives', '58-00-00')
addProcNum('Quote to Cash', '52-00-00')
addProcNum('CRM for Services', '60-00-00 / 62-10-00')
addProcNum('IBM Global Real Estate', '48-10-00')
addProcNum('Opportunity Management', '60-10-00')
addProcNum('Global Compensation', '40-20-00')
addProcNum('Payroll', '18-20-00')

function prog(name) {
  return progByName[name] || `/* MISSING: ${name} */`
}

// Build the new auditData structure
const newAuditData = `export const auditData = {
  // ─────────────────────────────────────────────
  // CHQ CONTROLLER
  // ─────────────────────────────────────────────
  chq_controller: {
    name: "CHQ Controller",
    description: "General ledger close, accounting consolidation, fixed assets, intercompany accounting, IBM financing accounting, and cost accounting",
    color: "#3b82f6",
    processNumbers: "10-05-00 · 10-06-00 · 10-40-00 · 10-30-00 · 10-20-00 · 10-50-00",
    pdfUrl: PDF.accounting,
    programs: [
${prog('Accounting')},
${prog('Accounting Fixed Assets')},
${prog('Intercompany Accounting')},
${prog('IBM Financing Accounting')},
${prog('Cost Accounting')},
    ]
  },

  // ─────────────────────────────────────────────
  // TREASURY
  // ─────────────────────────────────────────────
  treasury: {
    name: "Treasury",
    description: "Treasury operations, risk and insurance management, and pension asset management",
    color: "#7c3aed",
    processNumbers: "12-00-00 · 13-20-00 · 14-00-00",
    pdfUrl: PDF.treasury,
    programs: [
${prog('Treasury Operations')},
${prog('Risk and Insurance Management')},
${prog('Pension Asset Management')},
    ]
  },

  // ─────────────────────────────────────────────
  // IBM FINANCING
  // ─────────────────────────────────────────────
  ibm_financing: {
    name: "IBM Financing",
    description: "Credit risk management, client financing, and commercial financing",
    color: "#0891b2",
    processNumbers: "13-10-00",
    pdfUrl: PDF.creditRisk,
    programs: [
${prog('Credit Risk Management')},
    ]
  },

  // ─────────────────────────────────────────────
  // TAX
  // ─────────────────────────────────────────────
  tax: {
    name: "Tax",
    description: "Income taxes and indirect taxes",
    color: "#dc2626",
    processNumbers: "15-20-00 · 15-10-00",
    pdfUrl: PDF.incomeTax,
    programs: [
${prog('Income Tax')},
${prog('Indirect Tax')},
    ]
  },

  // ─────────────────────────────────────────────
  // GLOBAL PROCUREMENT
  // ─────────────────────────────────────────────
  global_procurement: {
    name: "Global Procurement",
    description: "Accounts payable, general procurement, physical logistics, and trade compliance",
    color: "#059669",
    processNumbers: "18-10-00 · 44-20-00 · 32-10-00 · 32-30-00",
    pdfUrl: PDF.accountsPayable,
    programs: [
${prog('Accounts Payable')},
${prog('Procurement')},
${prog('GL Physical Logistics')},
${prog('GL Trade Compliance')},
    ]
  },

  // ─────────────────────────────────────────────
  // HUMAN RESOURCES
  // ─────────────────────────────────────────────
  human_resources: {
    name: "Human Resources",
    description: "Payroll, travel and expense, management of disbursements, and global compensation",
    color: "#d97706",
    processNumbers: "18-20-00 · 18-15-00 · 18-05-00 · 40-20-00",
    pdfUrl: PDF.payroll,
    programs: [
${prog('Payroll')},
${prog('Travel and Expense')},
${prog('Management of Disbursements')},
${prog('Global Compensation')},
    ]
  },

  // ─────────────────────────────────────────────
  // IBM INFRASTRUCTURE
  // ─────────────────────────────────────────────
  ibm_infrastructure: {
    name: "IBM Infrastructure",
    description: "Manufacturing operations, parts logistics, and supply chain management",
    color: "#0ea5e9",
    processNumbers: "54-00-00 · 32-20-00",
    pdfUrl: PDF.manufacturing,
    programs: [
${prog('Manufacturing')},
${prog('Parts Logistics')},
    ]
  },

  // ─────────────────────────────────────────────
  // MARKETING AND COMMUNICATIONS
  // ─────────────────────────────────────────────
  marketing_comms: {
    name: "Marketing and Communications",
    description: "Marketing, communications, ESG reporting, and corporate social responsibility",
    color: "#db2777",
    processNumbers: "50-20-00 · 50-50-00 · 51-00-00 · 18-80-00",
    pdfUrl: PDF.marketing,
    programs: [
${prog('Marketing')},
${prog('Communications and Brand Marketing')},
${prog('ESG Reporting')},
${prog('Corporate Social Responsibility')},
    ]
  },

  // ─────────────────────────────────────────────
  // GLOBAL SALES
  // ─────────────────────────────────────────────
  global_sales: {
    name: "Global Sales",
    description: "CRM for hardware and software, CRM for services, and opportunity management",
    color: "#16a34a",
    processNumbers: "30-00-00 · 60-00-00 · 60-10-00",
    pdfUrl: PDF.crmHW,
    programs: [
${prog('CRM for Hardware and Software')},
${prog('CRM for Services')},
${prog('Opportunity Management')},
    ]
  },

  // ─────────────────────────────────────────────
  // QUOTE TO CASH AND OPERATIONS
  // ─────────────────────────────────────────────
  quote_to_cash: {
    name: "Quote to Cash and Operations",
    description: "Quote to cash and accounts receivable",
    color: "#7c5cd8",
    processNumbers: "52-00-00 · 52-40-00",
    pdfUrl: PDF.quoteToCash,
    programs: [
${prog('Quote to Cash')},
${prog('Accounts Receivable')},
    ]
  },

  // ─────────────────────────────────────────────
  // GLOBAL SALES INCENTIVES
  // ─────────────────────────────────────────────
  global_sales_incentives: {
    name: "Global Sales Incentives",
    description: "Sales incentive plan deployment, manual adjustments, accruals, and access management",
    color: "#ea580c",
    processNumbers: "58-00-00",
    pdfUrl: PDF.salesIncentives,
    programs: [
${prog('Global Sales Incentives')},
    ]
  },

  // ─────────────────────────────────────────────
  // GLOBAL REAL ESTATE
  // ─────────────────────────────────────────────
  global_real_estate: {
    name: "IBM Global Real Estate",
    description: "Lease transactions, lease administration, design and construction, and facilities operations",
    color: "#64748b",
    processNumbers: "48-10-00",
    pdfUrl: PDF.realEstate,
    programs: [
${prog('IBM Global Real Estate')},
    ]
  },
}
`

const newContent = [...headerLines, newAuditData].join('\n')
writeFileSync(srcFile, newContent, 'utf8')
console.log('Done! File written successfully.')
console.log('New line count:', newContent.split('\n').length)
