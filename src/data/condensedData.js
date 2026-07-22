// Condensed audit risk data - 4-level hierarchy: Program > Risk Area > Control Objective & Control > Test

const PDF = {
  accounting:        '/Audit%20Programs%20-%20Word%20Documents/Accounting%2010-00-00.pdf',
  fixedAssets:       '/Audit%20Programs%20-%20Word%20Documents/Accounting%20Fixed%20Assets%2010-40-00%20(New).pdf',
  intercompany:      '/Audit%20Programs%20-%20Word%20Documents/Intercompany%20Accounting%2010-30-00.pdf',
  ibmFinancing:      '/Audit%20Programs%20-%20Word%20Documents/IBM%20Financing%20Accounting%2010-20-00.pdf',
  costAccounting:    '/Audit%20Programs%20-%20Word%20Documents/Cost%20Accounting%2010-50-00.pdf',
  incomeTax:         '/Audit%20Programs%20-%20Word%20Documents/Income%20Taxes%2015-20-00.pdf',
  indirectTax:       '/Audit%20Programs%20-%20Word%20Documents/Indirect%20Taxes%2015-10-00.pdf',
  accountsPayable:   '/Audit%20Programs%20-%20Word%20Documents/Accounts%20Payable%2018-10-00.pdf',
  accountsReceivable:'/Audit%20Programs%20-%20Word%20Documents/Accounts%20Receivable%2052-40-00.pdf',
  payroll:           '/Audit%20Programs%20-%20Word%20Documents/Payroll%2018-20-00.pdf',
  treasury:          '/Audit%20Programs%20-%20Word%20Documents/Treasury%20Operations%2012-00-00.pdf',
  creditRisk:        '/Audit%20Programs%20-%20Word%20Documents/Credit%20Risk%20Management%2013-10-00%20(New).pdf',
  riskInsurance:     '/Audit%20Programs%20-%20Word%20Documents/Risk%20and%20Insurance%20Management%2013-20-00.pdf',
  pension:           '/Audit%20Programs%20-%20Word%20Documents/Pension%20Asset%20Management%2014-00-00.pdf',
  travelExpense:     '/Audit%20Programs%20-%20Word%20Documents/Travel%20and%20Expense%2018-15-00.pdf',
  mod:               '/Audit%20Programs%20-%20Word%20Documents/Management%20of%20Disbursements%20(MOD)%2018-05-00.pdf',
  manufacturing:     '/Audit%20Programs%20-%20Word%20Documents/Manufacturing%2054-00-00.pdf',
  physLogistics:     '/Audit%20Programs%20-%20Word%20Documents/GL%20-%20Physical%20Logistics%2032-10-00.pdf',
  partsLogistics:    '/Audit%20Programs%20-%20Word%20Documents/Parts%20Logistics%2032-20-00.pdf',
  tradeCompliance:   '/Audit%20Programs%20-%20Word%20Documents/GL%20-%20Trade%20Compliance%2032-30-00.pdf',
  crmHW:             '/Audit%20Programs%20-%20Word%20Documents/CRM%20for%20Hardware%20and%20Software%2030-00-00.pdf',
  crmServices:       '/Audit%20Programs%20-%20Word%20Documents/CRM%20for%20Services%2060-00-00.pdf',
  marketing:         '/Audit%20Programs%20-%20Word%20Documents/Marketing%2050-20-00.pdf',
  commsBrand:        '/Audit%20Programs%20-%20Word%20Documents/Communications%20and%20Brand%20Marketing%2050-50-00.pdf',
  procurement:       '/Audit%20Programs%20-%20Word%20Documents/Procurement%2044-00-00.pdf',
  salesIncentives:   '/Audit%20Programs%20-%20Word%20Documents/Global%20Sales%20Incentives%2058-00-00.pdf',
  quoteToCash:       '/Audit%20Programs%20-%20Word%20Documents/Quote%20To%20Cash%2052-00-00.pdf',
  esgReporting:      '/Audit%20Programs%20-%20Word%20Documents/ESG%20Reporting%2051-00-00.pdf',
  csr:               '/Audit%20Programs%20-%20Word%20Documents/Corporate%20Social%20Responsibility%2051-10-00.pdf',
  realEstate:        '/Audit%20Programs%20-%20Word%20Documents/IBM%20Global%20Real%20Estate%2048-10-00.pdf',
  envMgmt:           '/Audit%20Programs%20-%20Word%20Documents/Environmental%20Management%2047-10-00.pdf',
  globalComp:        '/Audit%20Programs%20-%20Word%20Documents/Global%20Compensation%2040-20-00.pdf',
  oppMgmt:           '/Audit%20Programs%20-%20Word%20Documents/Opportunity%20Management%2060-10-00.pdf',
}

// Helper: build a simple control objective with one control+test, all linking to a PDF
function co(id, coName, coDesc, ctrlName, ctrlDesc, testName, testDesc, pdfUrl) {
  return {
    id: `${id}-co-1`,
    name: coName,
    description: coDesc,
    fullText: null,
    pdfUrl,
    controls: [
      {
        id: `${id}-ctrl-1`,
        name: ctrlName,
        description: ctrlDesc,
        pdfUrl,
        testTemplates: [
          {
            id: `${id}-tt-1`,
            name: testName,
            description: testDesc,
            pdfUrl,
            steps: []
          }
        ]
      }
    ]
  }
}

function ra(id, name, desc, objectives) {
  return { id, name, description: desc, controlObjectives: objectives }
}

export const auditData = {
  // ─────────────────────────────────────────────
  // FINANCE
  // ─────────────────────────────────────────────
  finance: {
    name: "Finance",
    description: "Financial operations, treasury, tax, and risk management",
    color: "#3b82f6",
    pdfUrl: PDF.treasury,
    programs: [
      {
        id: "fin-prog-1",
        name: "Treasury Operations",
        description: "Cash management, investments, foreign exchange, and bank guarantees",
        pdfUrl: PDF.treasury,
        riskAreas: [
          ra("fin-p1-ra-1","Cash Management and Forecast","Risks related to cash flow forecasting and bank reconciliations",[
            co("fin-p1-ra-1","Cash Management","Ensure cash accounts are managed, forecast accurately, and reconciled timely","Cash Flow Forecasting","Verify treasury cash forecasting process avoids overdrafts and optimises deployment","CM002.P – Cash Flow Forecasting","Compare cash projections with actual results and review overdraft prevention controls",PDF.treasury + "#page=19")
          ]),
          ra("fin-p1-ra-2","Investment and Borrowing","Risks related to investment portfolio and borrowing management",[
            co("fin-p1-ra-2","Investment Portfolio","Ensure investment transactions are authorised and compliant with corporate policy","Valuation and Control of Portfolio","Verify investment portfolio is properly valued and controlled","IP001.P – Portfolio Valuation","Review investment valuations, authorisations, and policy compliance",PDF.treasury + "#page=27")
          ]),
          ra("fin-p1-ra-3","Foreign Exchange and Hedging","Risks related to FX transactions and derivative instruments",[
            co("fin-p1-ra-3","Foreign Exchange Management","Ensure FX transactions are authorised, executed at competitive rates, and recorded accurately","Foreign Exchange Transactions","Review FX transactions for proper authorisation and accurate ledger recording","FX001.P – FX Transactions","Test sample of FX transactions for authorisation, rate accuracy, and timely recording",PDF.treasury + "#page=40")
          ]),
          ra("fin-p1-ra-4","Bank Guarantees","Risks related to issuance and management of bank guarantees",[
            co("fin-p1-ra-4","Bank Guarantees","Ensure bank guarantees are properly authorised and tracked","Bank Guarantees","Validate bank guarantee issuance process and management reporting","BG001.P – Bank Guarantees","Review sample of bank guarantees for proper approval, documentation, and monitoring",PDF.treasury + "#page=63")
          ]),
          ra("fin-p1-ra-5","Counterparty Limits","Risks related to counterparty credit exposure",[
            co("fin-p1-ra-5","Counterparty Risk","Ensure counterparty credit limits are established, monitored, and enforced","Credit Risk Management Reports","Determine adequacy of controls through management reports such as daily activity reports","CR001.P – Counterparty Limits","Review counterparty limit reports, breaches, and management response actions",PDF.treasury + "#page=54")
          ]),
          ra("fin-p1-ra-6","Disbursements, Manual Payments and Factoring","Risks related to wire transfers, manual payments, and factoring arrangements",
            [
              {
                id: "fin-p1-ra-6-co-1",
                name: "Disbursements, Manual Payments and Factoring",
                description: "Ensure disbursements, manual payments, and factoring are properly authorised, documented, and recorded.",
                pdfUrl: PDF.treasury + "#page=45",
                controls: [
                  { id: "fin-p1-ra-6-ctrl-1", name: "Disbursement and Manual Payment Controls", description: "Verify wire transfers and manual payments are authorised and recorded accurately", pdfUrl: PDF.treasury + "#page=45", testTemplates: [
                    { id: "fin-p1-ra-6-tt-1", name: "CM003.S – Wire Transfer Controls", description: "Review wire transfer authorisation and segregation of duties", pdfUrl: PDF.treasury + "#page=45", steps: [] },
                    { id: "fin-p1-ra-6-tt-2", name: "CM005.S – Manual Payment Controls", description: "Review manual payment process for proper approval and documentation", pdfUrl: PDF.treasury + "#page=47", steps: [] },
                    { id: "fin-p1-ra-6-tt-3", name: "CM007.S – Factoring Arrangements", description: "Verify factoring arrangements are properly authorised and recorded", pdfUrl: PDF.treasury + "#page=49", steps: [] },
                    { id: "fin-p1-ra-6-tt-4", name: "IT001.P – IT Controls for Payments", description: "Review IT application controls supporting disbursement processing", pdfUrl: PDF.treasury + "#page=51", steps: [] },
                    { id: "fin-p1-ra-6-tt-5", name: "SR001.P – Systems Reconciliation", description: "Verify payment system reconciliations are performed timely and completely", pdfUrl: PDF.treasury + "#page=52", steps: [] },
                  ]}
                ]
              }
            ]
          ),
          ra("fin-p1-ra-7","Bank Administration, Data Protection and Bank Fees","Risks related to bank account administration, fee accuracy, and data security",[
            {
              id: "fin-p1-ra-7-co-1",
              name: "Bank Administration and Data Protection",
              description: "Ensure bank accounts are properly administered, fees are reviewed for accuracy, and banking data is protected.",
              pdfUrl: PDF.treasury + "#page=33",
              controls: [
                { id: "fin-p1-ra-7-ctrl-1", name: "Bank Account Administration Controls", description: "Verify bank accounts are set up with proper authorisation and access controls", pdfUrl: PDF.treasury + "#page=33", testTemplates: [
                  { id: "fin-p1-ra-7-tt-1", name: "CM001.P – Bank Account Administration", description: "Review bank account opening, closing, and signatory controls", pdfUrl: PDF.treasury + "#page=33", steps: [] },
                  { id: "fin-p1-ra-7-tt-2", name: "IP003.P – Data Protection", description: "Verify sensitive banking data is protected per IBM data privacy guidelines", pdfUrl: PDF.treasury + "#page=35", steps: [] },
                ]}
              ]
            }
          ]),
          ra("fin-p1-ra-8","Acquisitions","Risks related to cash and treasury controls for acquired entities",[
            co("fin-p1-ra-8","Acquisition Integration Controls","Verify treasury controls are extended to acquired entities in a timely and complete manner","Acquisition Cash Controls","Review integration of acquired entity bank accounts and treasury systems","AI001.P – Acquisition Integration","Verify acquired entity treasury processes are integrated per IBM requirements with proper oversight",PDF.treasury + "#page=67")
          ]),
          ra("fin-p1-ra-9","Accounting Reconciliations","Risks related to treasury account reconciliation accuracy and timeliness",[
            co("fin-p1-ra-9","Treasury Reconciliations","Ensure all treasury accounts are reconciled on a timely basis with appropriate management oversight","Accounting Reconciliation Controls","Review treasury reconciliation process and management approval","CM004.P – Treasury Reconciliations","Select sample of treasury account reconciliations and verify timeliness, completeness, and management approval",PDF.treasury + "#page=30")
          ]),
          {
            id: "fin-p1-ra-10",
            name: "Cybersecurity and Payment Systems",
            description: "Risks related to cybersecurity controls protecting treasury and payment systems",
            controlObjectives: [
              {
                id: "fin-p1-ra-10-co-1",
                name: "Cybersecurity and Payment Systems",
                description: "Ensure payment systems are protected against cyber threats and access is appropriately controlled.",
                pdfUrl: PDF.treasury + "#page=56",
                controls: [
                  { id: "fin-p1-ra-10-ctrl-1", name: "Cybersecurity Controls for Treasury", description: "Verify cybersecurity controls protect treasury payment systems", pdfUrl: PDF.treasury + "#page=56", testTemplates: [
                    { id: "fin-p1-ra-10-tt-1", name: "CM001.P – Cybersecurity Access Controls", description: "Review access management controls for treasury systems and payment platforms", pdfUrl: PDF.treasury + "#page=56", steps: [] },
                    { id: "fin-p1-ra-10-tt-2", name: "CM003.S – Payment System Security", description: "Verify payment system security controls and incident response procedures", pdfUrl: PDF.treasury + "#page=58", steps: [] },
                  ]}
                ]
              }
            ]
          },
          ra("fin-p1-ra-11","Business Continuity","Risks related to treasury operations continuity during disruption",[
            co("fin-p1-ra-11","Business Continuity Planning","Ensure treasury has a documented and tested business continuity plan","Business Continuity Controls","Review BCP documentation, testing frequency, and management sign-off","BC001.S – Business Continuity","Verify treasury BCP is documented, tested periodically, and critical processes can continue during disruption",PDF.treasury + "#page=71")
          ]),
        ]
      },
      {
        id: "fin-prog-2",
        name: "Credit Risk Management",
        description: "Credit evaluation, restructured arrangements, and account monitoring",
        pdfUrl: PDF.creditRisk,
        riskAreas: [
          ra("fin-p2-ra-1","Credit Evaluation","Risks related to client and commercial financing credit assessments",[
            co("fin-p2-ra-1","Credit Evaluation","Verify credit evaluation ensures financing risk is effectively managed","Credit Evaluation","Verify credit evaluation process for end customers and dealers","CE001.P – Credit Evaluation","Test sample of credit evaluations for consistency of methodology and risk rating accuracy",PDF.creditRisk + "#page=9")
          ]),
          ra("fin-p2-ra-2","Restructured Credit Arrangements","Risks related to high-risk account restructuring",[
            co("fin-p2-ra-2","Restructured Credit","Determine if high-risk accounts comply with restructured agreement terms","Restructured Credit Arrangements","Review high-risk account compliance with restructured credit terms and conditions","RC001.P – Restructured Arrangements","Select sample of restructured accounts and verify monitoring, compliance, and management review",PDF.creditRisk + "#page=14")
          ]),
          ra("fin-p2-ra-3","Account Monitoring","Risks related to special handling of focus accounts",[
            co("fin-p2-ra-3","Special Handling","Determine adequacy of focus account and lessons-learned process","Special Handling Process","Analyse circumstances leading to losses and identify prevention opportunities","SH001.P – Special Handling","Review focus account reports, loss analysis, and corrective action plans",PDF.creditRisk + "#page=18")
          ]),
        ]
      },
      {
        id: "fin-prog-3",
        name: "Risk and Insurance Management",
        description: "Insurance policies, captives management, vendor management, and disbursements",
        pdfUrl: PDF.riskInsurance,
        riskAreas: [
          ra("fin-p3-ra-1","Insurance Policies","Risks related to insurance placement and premium justification",[
            co("fin-p3-ra-1","Insurance Risk","Ascertain whether insurance placements have appropriate management approval and justify premium spend","Insurance Risk Analysis","Assess process for identifying and approving insurance placements","RA001.P – Insurance Risk Analysis","Review insurance programme approvals, premium analysis, and management sign-off",PDF.riskInsurance + "#page=9")
          ]),
          ra("fin-p3-ra-2","Vendor Management","Risks related to outsourced risk management contracts",[
            co("fin-p3-ra-2","Vendor Contracts","Determine if outsourced RIM contracts include detailed scopes and appropriate business/legal clauses","Vendor/Supplier Contracts","Review contracts for scope, clauses, and performance measurement","RA005.P – Vendor Contracts","Sample outsourced RIM contracts for completeness, performance metrics, and renewal controls",PDF.riskInsurance + "#page=14")
          ]),
          ra("fin-p3-ra-3","Insurance Claims","Risks related to claim filing, recording, and reimbursement",[
            co("fin-p3-ra-3","Claims Management","Ensure all applicable loss claims are filed timely with proper reconciliation","Insurance Claims","Review claims filing process and reimbursement reconciliation","RA006.P – Insurance Claims","Test sample of claims for timely filing, contractual reimbursement, and activity reconciliation",PDF.riskInsurance + "#page=16")
          ]),
        ]
      },
      {
        id: "fin-prog-4",
        name: "Pension Asset Management",
        description: "Plan valuation, cash movements, asset allocation, and vendor management",
        pdfUrl: PDF.pension,
        riskAreas: [
          ra("fin-p4-ra-1","Plan Valuation and Reconciliations","Risks related to accurate valuation of pension plan assets",[
            co("fin-p4-ra-1","Plan Valuation","Gain assurance plan assets are valued accurately through independent sources and reconciliations","Plan Valuation","Verify reconciliations between custodians, trustees, and investment managers","FA001.P – Plan Valuation","Select sample of plan valuations and test accuracy, independence, and timely reconciliation",PDF.pension + "#page=13")
          ]),
          ra("fin-p4-ra-2","External Cash Movements","Risks related to cash transactions within and outside pension funds",[
            co("fin-p4-ra-2","Cash Movement Controls","Determine if cash transactions are properly authorised and comply with pension policies","Cash Movement within and Outside Pension Funds","Validate authorisation of all cash movements in and out of pension fund accounts","CM001.P – Cash Movements","Review sample of cash transactions for proper authorisation and policy compliance",PDF.pension + "#page=20")
          ]),
          ra("fin-p4-ra-3","Asset Allocation Rebalancing","Risks related to deviation from investment policy",[
            co("fin-p4-ra-3","Asset Allocation","Ensure assets are allocated and rebalanced within approved tolerance ranges","Asset Allocation and Rebalancing","Verify rebalancing activities reflect participant selections and approved tolerances","FA003.P – Asset Allocation","Test rebalancing transactions for policy compliance, documentation, and management approval",PDF.pension + "#page=15")
          ]),
          ra("fin-p4-ra-4","Vendor Management","Risks related to investment manager contracts and fees",[
            co("fin-p4-ra-4","Contract Administration","Validate contracts for investment managers and vendors were properly negotiated and include required FIN175 terms","Administer Contracts","Review investment manager contract terms, renewals, and fee accuracy","VM001.P – Contract Administration","Sample investment manager contracts for completeness, renewal controls, and fee validation",PDF.pension + "#page=25")
          ]),
          ra("fin-p4-ra-5","Access Management and Data Protection","Risks related to access controls and data privacy for pension systems",[
            co("fin-p4-ra-5","Pension Access Controls","Ensure pension system access is controlled appropriately and sensitive data is protected per IBM guidelines","Access Management Controls","Review pension system access controls, SOD assessment, and data protection measures","GO006.S – Access Management and Data Protection","Review pension system user access, SOD conflicts, and data classification and protection controls",PDF.pension + "#page=30")
          ]),
          ra("fin-p4-ra-6","Investment Manager Compliance","Risks related to investment manager adherence to mandates and regulatory requirements",[
            co("fin-p4-ra-6","Investment Manager Compliance","Verify investment managers operate within approved mandates and comply with applicable regulations","Investment Manager Mandate Compliance","Review investment manager compliance reports and benchmark performance","VM004.P – Investment Manager Compliance","Select investment managers and verify mandate compliance, regulatory reporting, and benchmark adherence",PDF.pension + "#page=28")
          ]),
          ra("fin-p4-ra-7","Intra-fund Transfers","Risks related to authorisation and accuracy of transfers between pension funds",[
            co("fin-p4-ra-7","Intra-fund Transfer Controls","Determine if intra-fund transfers are properly authorised and executed per IBM pension policies","Intra-fund Transfer Authorisation","Review authorisation process for fund-to-fund transfers and reconciliation","CM001.P – Intra-fund Transfers","Select sample of intra-fund transfers and verify proper authorisation, documentation, and timely settlement",PDF.pension + "#page=22")
          ]),
          {
            id: "fin-p4-ra-8",
            name: "Compliance (Derivatives / Securities / FATCA)",
            description: "Risks related to regulatory compliance for derivative instruments, securities, and FATCA reporting",
            controlObjectives: [
              {
                id: "fin-p4-ra-8-co-1",
                name: "Derivatives, Securities and FATCA Compliance",
                description: "Ensure pension plan complies with derivative, securities, and FATCA reporting requirements.",
                pdfUrl: PDF.pension + "#page=32",
                controls: [
                  { id: "fin-p4-ra-8-ctrl-1", name: "Regulatory Compliance Controls", description: "Verify compliance with derivative, securities, and FATCA regulations", pdfUrl: PDF.pension + "#page=32", testTemplates: [
                    { id: "fin-p4-ra-8-tt-1", name: "GO004.S – Derivatives Compliance", description: "Review derivative instrument controls and regulatory reporting", pdfUrl: PDF.pension + "#page=32", steps: [] },
                    { id: "fin-p4-ra-8-tt-2", name: "GO005.S – Securities Compliance", description: "Verify securities transactions comply with applicable regulations", pdfUrl: PDF.pension + "#page=34", steps: [] },
                    { id: "fin-p4-ra-8-tt-3", name: "GO007.S – FATCA Compliance", description: "Verify FATCA reporting obligations are met for pension plan assets", pdfUrl: PDF.pension + "#page=36", steps: [] },
                  ]}
                ]
              }
            ]
          },
        ]
      },
    ]
  },

  // ─────────────────────────────────────────────
  // ACCOUNTING
  // ─────────────────────────────────────────────
  accounting: {
    name: "Accounting",
    description: "General accounting, tax, fixed assets, and disbursements",
    color: "#60a5fa",
    pdfUrl: PDF.accounting,
    programs: [
      {
        id: "acc-prog-1",
        name: "Accounting",
        description: "General ledger close, consolidation, and revenue recognition",
        pdfUrl: PDF.accounting,
        riskAreas: [
          ra("acc-p1-ra-1","Spreadsheets","Risks related to spreadsheet controls and management review",[
            co("acc-p1-ra-1","Spreadsheet Controls","Verify process ensures spreadsheets are reviewed and approved by management","Spreadsheets","Verify spreadsheet inventory, annual review, and ASCA certification where required","PI007.P – Spreadsheets","Request spreadsheet inventory and select sample to test management review, calculations, and certification",PDF.accounting + "#page=13")
          ]),
          {
            id: "acc-p1-ra-2",
            name: "Accounting Consolidation",
            description: "Risks related to worldwide consolidation accuracy, AIW segmentation, and elimination entries",
            controlObjectives: [
              {
                id: "acc-p1-ra-2-co-1",
                name: "Worldwide Consolidation and AIW Segmentation",
                description: "Verify ledger data is recorded and reviewed for accuracy during worldwide consolidation and AIW segmentation is correct.",
                pdfUrl: PDF.accounting + "#page=13",
                controls: [
                  { id: "acc-p1-ra-2-ctrl-1", name: "Consolidation and Segmentation Controls", description: "Review WCA controls ensuring accuracy of ledger data including AIW segmentation", pdfUrl: PDF.accounting + "#page=13", testTemplates: [
                    { id: "acc-p1-ra-2-tt-1", name: "PI004.P – Worldwide Consolidation", description: "Review tie-out reports, elimination entries, and inter-company float analysis for accuracy", pdfUrl: PDF.accounting + "#page=13", steps: [] },
                    { id: "acc-p1-ra-2-tt-2", name: "PI005.P – AIW Segmentation", description: "Verify AIW segmentation is correctly applied during consolidation processing", pdfUrl: PDF.accounting + "#page=15", steps: [] },
                  ]}
                ]
              },
              {
                id: "acc-p1-ra-2-co-2",
                name: "Cash Flow and Intercompany Eliminations",
                description: "Ensure cash flow statements are accurate and intercompany float and eliminations are properly processed.",
                pdfUrl: PDF.accounting + "#page=16",
                controls: [
                  { id: "acc-p1-ra-2-ctrl-2", name: "Cash Flow and Elimination Controls", description: "Review cash flow statement preparation and intercompany elimination entries", pdfUrl: PDF.accounting + "#page=16", testTemplates: [
                    { id: "acc-p1-ra-2-tt-3", name: "PI002.P – Cash Flow Statement", description: "Verify cash flow statement accuracy and supporting reconciliations", pdfUrl: PDF.accounting + "#page=16", steps: [] },
                    { id: "acc-p1-ra-2-tt-4", name: "PI004.P – Intercompany Float and Eliminations", description: "Review intercompany float analysis and confirm elimination entries are complete", pdfUrl: PDF.accounting + "#page=13", steps: [] },
                  ]}
                ]
              },
              {
                id: "acc-p1-ra-2-co-3",
                name: "Year-End Tie Outs, Consolidation Entries and AIW Allocation",
                description: "Ensure year-end tie-outs are completed, consolidation entries are accurate, and AIW allocations are correct.",
                pdfUrl: PDF.accounting + "#page=17",
                controls: [
                  { id: "acc-p1-ra-2-ctrl-3", name: "Year-End Controls", description: "Review year-end tie-out process, consolidation entries, and AIW allocation methodology", pdfUrl: PDF.accounting + "#page=17", testTemplates: [
                    { id: "acc-p1-ra-2-tt-5", name: "PI004.P – Year-End Tie Outs", description: "Verify year-end tie-out reports are completed and signed off by management", pdfUrl: PDF.accounting + "#page=17", steps: [] },
                    { id: "acc-p1-ra-2-tt-6", name: "PI004.P – Consolidation Entries", description: "Review consolidation journal entries for accuracy and proper authorisation", pdfUrl: PDF.accounting + "#page=13", steps: [] },
                    { id: "acc-p1-ra-2-tt-7", name: "PI004.P – AIW Allocation", description: "Verify AIW allocation methodology is applied consistently and approved", pdfUrl: PDF.accounting + "#page=13", steps: [] },
                    { id: "acc-p1-ra-2-tt-8", name: "PI004.P – Force Balancing", description: "Identify any force balancing entries and verify proper authorisation and justification", pdfUrl: PDF.accounting + "#page=13", steps: [] },
                  ]}
                ]
              }
            ]
          },
          ra("acc-p1-ra-3","Account Reconciliations","Risks related to balance sheet reconciliation performance and content",[
            co("acc-p1-ra-3","Reconciliation Performance","Ensure all balance sheet accounts are reconciled per approved frequency with valid documentation","Account Reconciliation Performance","Validate reconciliations performed on time with proper management approvals","BS001.P – Reconciliation Performance","Review selected reconciliations for timeliness, completeness, and management approval evidence",PDF.accounting + "#page=9")
          ]),
          ra("acc-p1-ra-4","Ledger Entries and Accruals","Risks related to manual ledger entry controls and accrual accuracy",[
            co("acc-p1-ra-4","Manual Ledger Entry","Verify only properly authorised manual entries are posted to the general ledger","Manual Ledger Entry Controls","Select sample of journal entries to test authorisation, documentation, and coding accuracy","PI002.P – Manual Ledger Entries","Review journal vouchers for correct coding, proper approval, and supporting documentation",PDF.accounting + "#page=13")
          ]),
          {
            id: "acc-p1-ra-5",
            name: "Contract Review and Revenue Recognition",
            description: "Risks related to proper revenue recognition and cost/revenue matching under GAAP",
            controlObjectives: [
              {
                id: "acc-p1-ra-5-co-1",
                name: "Revenue Recognition and Cost/Revenue Matching",
                description: "Ensure revenue is recognised in accordance with GAAP and IBM practices, and costs are matched to revenue.",
                pdfUrl: PDF.accounting + "#page=23",
                controls: [
                  { id: "acc-p1-ra-5-ctrl-1", name: "Revenue and Cost Controls", description: "Review revenue recognition and cost/revenue matching controls for all major revenue categories", pdfUrl: PDF.accounting + "#page=23", testTemplates: [
                    { id: "acc-p1-ra-5-tt-1", name: "RR001.P – Revenue Recognition", description: "Select sample of revenue items covering all major categories and test recognition criteria and timing", pdfUrl: PDF.accounting + "#page=23", steps: [] },
                    { id: "acc-p1-ra-5-tt-2", name: "RR002.P – Cost/Revenue Matching", description: "Verify costs are properly matched to recognised revenue across all contract types", pdfUrl: PDF.accounting + "#page=25", steps: [] },
                  ]}
                ]
              }
            ]
          },
          {
            id: "acc-p1-ra-6",
            name: "Access Management and Separation of Duties",
            description: "Risks related to segregation of duties, access management, and data protection in ledger processes",
            controlObjectives: [
              {
                id: "acc-p1-ra-6-co-1",
                name: "Access Management, SOD and Data Protection",
                description: "Ensure adequate SOD and access controls exist in ledger processes, and sensitive financial data is protected.",
                pdfUrl: PDF.accounting + "#page=13",
                controls: [
                  { id: "acc-p1-ra-6-ctrl-1", name: "SOD and Access Controls", description: "Review SOD assessment, system access rights, and data protection measures", pdfUrl: PDF.accounting + "#page=13", testTemplates: [
                    { id: "acc-p1-ra-6-tt-1", name: "AM001.P – Access Management", description: "Review general ledger system access controls and periodic revalidation", pdfUrl: PDF.accounting + "#page=13", steps: [] },
                    { id: "acc-p1-ra-6-tt-2", name: "PI001.P – Separation of Duties", description: "Request SOD assessment and validate conflicts are eliminated, mitigated, or accepted with documented rationale", pdfUrl: PDF.accounting + "#page=13", steps: [] },
                    { id: "acc-p1-ra-6-tt-3", name: "DI004.P – Data Protection", description: "Verify financial data is classified and protected per IBM data privacy and security guidelines", pdfUrl: PDF.accounting + "#page=13", steps: [] },
                  ]}
                ]
              }
            ]
          },
          ra("acc-p1-ra-7","Miscodes","Risks related to misclassified financial data",[
            co("acc-p1-ra-7","Miscode Controls","Determine whether controls ensure miscodes are properly reviewed and approved for processing","Miscodes / Errors","Review default account activity and verify appropriate miscode correction procedures","PI003.P – Miscodes","Identify miscodes sitting in default accounts and verify business justification for uncorrected items",PDF.accounting + "#page=13")
          ]),
        ]
      },
      {
        id: "acc-prog-2",
        name: "Accounting Fixed Assets",
        description: "Asset capitalisation, WIP, physical inventory, and retirements",
        pdfUrl: PDF.fixedAssets,
        riskAreas: [
          ra("acc-p2-ra-1","Asset Capitalisation","Risks related to timely and accurate asset capitalisation",[
            co("acc-p2-ra-1","Capitalisation Controls","Evaluate controls when assets are capitalised ensuring timely classification and documentation","Capitalisation Calculations and Classification","Review recent capitalisations for timeliness, correct classification, and assigned owner","AC001.P – Capitalisation","Select sample of capitalisations and verify supporting documentation, proper classification, and assigned owner",PDF.fixedAssets + "#page=8")
          ]),
          ra("acc-p2-ra-2","Work In Process Capitalisation","Risks related to WIP assets aged beyond expected timelines",[
            co("acc-p2-ra-2","WIP Controls","Evaluate controls for assets in progress ensuring timely capitalisation or expensing","Work-in-Process","Review WIP asset aging and verify capitalisation or expense decisions meet corporate requirements","WI001.P – Work-in-Process","Identify aged WIP items and verify that actions were taken in accordance with capitalisation guidelines",PDF.fixedAssets + "#page=10")
          ]),
          ra("acc-p2-ra-3","Physical Inventory Taking","Risks related to accuracy of physical asset counts",[
            co("acc-p2-ra-3","Physical Inventory","Review PIT results to determine required actions were processed timely and accurately","Worldwide Property Control","Verify final PIT results reported to country CFO and required actions taken","PI001.P – Physical Inventory","Review PIT reconciliation, discrepancy investigation, and management approval of results",PDF.fixedAssets + "#page=14")
          ]),
          ra("acc-p2-ra-4","Asset Retirement","Risks related to timely and accurate processing of asset disposals",[
            co("acc-p2-ra-4","Retirement Controls","Evaluate that asset retirements are processed timely and accurately with proper documentation","Approvals / Recording","Review retirement processing for consistency with asset owner requests and documentation","AR001.P – Asset Retirements","Sample asset retirements and verify disposal authorisations, timing, and proceeds recording",PDF.fixedAssets + "#page=16")
          ]),
          ra("acc-p2-ra-5","Data Integrity","Risks related to financial data integrity in the fixed assets sub-ledger",[
            co("acc-p2-ra-5","Data Integrity","Determine if financial data integrity items are addressed timely with appropriate management oversight","Data Integrity","Review data integrity items and validate timely accurate processing","DI001.P – Data Integrity","Identify open data integrity items and verify management visibility, action plans, and resolution timelines",PDF.fixedAssets + "#page=12")
          ]),
          ra("acc-p2-ra-6","Separation of Duties","Risks related to SOD in fixed asset processes",[
            {
              id: "acc-p2-ra-6-co-1",
              name: "SOD Assessment",
              description: "Ensure proper SOD so no single individual can control activities within the fixed asset process",
              fullText: null,
              pdfUrl: PDF.fixedAssets + "#page=18",
              controls: [
                {
                  id: "acc-p2-ra-6-ctrl-1",
                  name: "Separation of Duties",
                  description: "Review SOD assessment and verify secondary controls for identified conflicts",
                  pdfUrl: PDF.fixedAssets + "#page=18",
                  testTemplates: [
                    {
                      id: "acc-p2-ra-6-tt-1",
                      name: "SD001.P – Separation of Duties",
                      description: "Request SOD assessment and verify conflicts are resolved with appropriate mitigating controls",
                      pdfUrl: PDF.fixedAssets + "#page=18",
                      steps: [],
                      stepsPerformed: [
                        "Obtain the most recent SOD assessment for the Fixed Assets process from the process owner",
                        "Confirm the assessment covers all key roles: asset creation, disposal, transfer, and depreciation adjustment",
                        "Identify all SOD conflicts flagged in the assessment and document each conflict by role and function",
                        "For each conflict, verify a secondary mitigating control is documented and operational",
                        "Select a sample of three conflicts and test whether the mitigating control was applied during the review period",
                        "Confirm the SOD assessment has been reviewed and approved by management within the last 12 months",
                        "Review user access listings and cross-reference against the SOD conflict matrix",
                        "Verify that any terminated employees have been promptly removed from system access",
                        "Confirm quarterly access recertification was completed and signed off by the access owner",
                        "Document any unmitigated conflicts or overdue recertifications as findings"
                      ],
                      dataSources: [
                        "SOD Assessment Report (Fixed Assets)",
                        "User Access Listing — Fixed Asset System",
                        "Access Recertification Sign-off Sheets",
                        "Mitigating Control Evidence Log"
                      ],
                      evidence: [
                        "Completed SOD assessment covering all fixed asset roles, approved by management",
                        "Documented secondary controls for each identified SOD conflict",
                        "Sample testing confirmation that mitigating controls operated effectively",
                        "User access listing with terminated employee removals evidenced",
                        "Quarterly access recertification completed and signed off by access owner"
                      ],
                      sameTests: [
                        {
                          id: "same-sd001-intercompany",
                          name: "SD001.P – Separation of Duties",
                          program: "Intercompany Accounting",
                          overview: "The identical SD001.P test applied to the Intercompany Accounting process. Covers CIAS entry, approval, and reconciliation roles. Steps, data sources, and evidence requirements are the same — only the in-scope process roles differ.",
                          pdfUrl: PDF.intercompany + "#page=26"
                        }
                      ],
                      similarTests: [
                        {
                          id: "sim-sd001-ar",
                          name: "SD001.P – AR SOD",
                          program: "Accounts Receivable",
                          overview: "Reviews the SOD matrix for the AR and cash application process, ensuring no individual can both post receipts and adjust AR balances. Focuses on the risk of undetected write-offs or misapplied cash, and tests that secondary controls such as supervisory review and system access restrictions are operating effectively.",
                          similarity: "Both tests apply the SD001.P structure — conflict identification, mitigating control verification, and access recertification testing. Fixed Assets centres on asset lifecycle roles; AR SOD centres on the cash posting and AR adjustment conflict, making the specific risk (misappropriation of cash vs. fictitious assets) distinct while the audit methodology is directly transferable.",
                          pdfUrl: "/Audit%20Programs%20-%20Word%20Documents/Accounts%20Receivable%2052-40-00.pdf#page=28"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]),
        ]
      },
      {
        id: "acc-prog-3",
        name: "Intercompany Accounting",
        description: "Intercompany reconciliations, agreements, float, and separation of duties",
        pdfUrl: PDF.intercompany,
        riskAreas: [
          {
            id: "acc-p3-ra-1",
            name: "General Accounting Controls",
            description: "Controls over general accounting processes within intercompany transactions",
            controlObjectives: [
              {
                id: "acc-p3-ra-1-co-1",
                name: "Intercompany Transactions",
                description: "To determine if intercompany accounts are properly reconciled and that transactions are recorded in accordance with GAAP and accounting instructions.",
                fullText: "To determine if:\n• Intercompany accounts are properly reconciled and that transactions are recorded in accordance with GAAP and accounting instructions.\n• Accruals and provisions provide the proper valuation of assets, liabilities, income, and expense for the accounting period and assure adequate control was exercised for any charges made during the reporting process.\n• All adjustments (netting, write-offs) are processed with the proper level of authorization and are consistent with IBM policies and practices.\n• Controls are in place to ensure miscodes are properly reviewed and approved for processing in the ledger.\n• Proper separation of duties exists so that no one individual can control activities within a process in a way that would result in the misuse or diversion of company funds without detection.\n• There are adequate controls to protect against unauthorized and/or inappropriate CIAS entries.\n• Effective controls exist that assure all information passed from feeder systems to CIAS and further to the ledger system CLS FDW/iERP, and that any exceptions are highlighted and properly resolved.\n• Accruals are processed timely, particularly at year end.\n• Settlements of Interco charges are made accurately and on a timely basis.",
                pdfUrl: PDF.intercompany + "#page=11",
                controls: [
                  {
                    id: "acc-p3-ra-1-ctrl-1",
                    name: "Accounting Controls",
                    description: "Verify accounting controls are operating effectively over intercompany transactions",
                    pdfUrl: PDF.intercompany + "#page=13",
                    testTemplates: [
                      { id: "acc-p3-ra-1-tt-1", name: "Accounting Controls", description: "Test effectiveness of accounting controls over intercompany transactions (IT002.P)", pdfUrl: PDF.intercompany + "#page=13", steps: [] }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "acc-p3-ra-2",
            name: "Intercompany Import Reconciliation",
            description: "Reconciliation of intercompany transactions imported across systems",
            controlObjectives: [
              {
                id: "acc-p3-ra-2-co-1",
                name: "Intercompany Transactions",
                description: "To determine if intercompany accounts are properly reconciled and that transactions are recorded in accordance with GAAP and accounting instructions.",
                fullText: "To determine if:\n• Intercompany accounts are properly reconciled and that transactions are recorded in accordance with GAAP and accounting instructions.\n• Accruals and provisions provide the proper valuation of assets, liabilities, income, and expense for the accounting period and assure adequate control was exercised for any charges made during the reporting process.\n• All adjustments (netting, write-offs) are processed with the proper level of authorization and are consistent with IBM policies and practices.\n• Controls are in place to ensure miscodes are properly reviewed and approved for processing in the ledger.\n• Proper separation of duties exists so that no one individual can control activities within a process in a way that would result in the misuse or diversion of company funds without detection.\n• There are adequate controls to protect against unauthorized and/or inappropriate CIAS entries.\n• Effective controls exist that assure all information passed from feeder systems to CIAS and further to the ledger system CLS FDW/iERP, and that any exceptions are highlighted and properly resolved.\n• Accruals are processed timely, particularly at year end.\n• Settlements of Interco charges are made accurately and on a timely basis.",
                pdfUrl: PDF.intercompany + "#page=11",
                controls: [
                  {
                    id: "acc-p3-ra-2-ctrl-1",
                    name: "Accounting Controls",
                    description: "Verify accounting controls are operating effectively over intercompany import reconciliation",
                    pdfUrl: PDF.intercompany + "#page=12",
                    testTemplates: [
                      { id: "acc-p3-ra-2-tt-1", name: "Intercompany Reconciliations", description: "Ensure intercompany accounts are properly reconciled and transactions recorded per GAAP (IT001.P)", pdfUrl: PDF.intercompany + "#page=12", steps: [] }
                    ]
                  }
                ]
              }
            ]
          },
          ra("acc-p3-ra-3","Intercompany Payables and Receivables","Management and accuracy of intercompany payables and receivables balances",[
            {
              id: "acc-p3-ra-3-co-1",
              name: "Accounting Controls and Measurements",
              description: "Determine if a complete set of measurements exists to properly reflect overall status and exception conditions",
              fullText: null,
              pdfUrl: PDF.intercompany + "#page=17",
              controls: [
                {
                  id: "acc-p3-ra-3-ctrl-1",
                  name: "Accounting Controls and Measurements",
                  description: "Review key indicators defined in KI Measurement Charts and validate measurements",
                  pdfUrl: PDF.intercompany + "#page=17",
                  testTemplates: [
                    {
                      id: "acc-p3-ra-3-tt-1",
                      name: "CA001.P – Accounting Controls and Measurements",
                      description: "Review all 11 KI items and validate their accuracy, completeness, and management review evidence",
                      pdfUrl: PDF.intercompany + "#page=17",
                      steps: [],
                      stepsPerformed: [
                        "Obtain the current KI Measurement Chart from the Controller or Finance lead",
                        "Verify all 11 KI items are populated and up to date for the period under review",
                        "Cross-reference each KI value against source ledger data in CLS FDW/iERP",
                        "Confirm management review sign-off is present for each KI item",
                        "Identify any KI items flagged as exceptions and trace to resolution documentation",
                        "Verify exception log entries are complete and approved at the appropriate level",
                        "Review prior-period KI values to assess trend and consistency",
                        "Test three KI items in detail — agree balances back to trial balance extracts",
                        "Confirm accrual KIs reflect year-end cut-off requirements",
                        "Document any KI items with missing or incomplete management sign-off",
                        "Summarise findings and prepare draft observations for management review"
                      ],
                      dataSources: [
                        "KI Measurement Charts (current period)",
                        "CLS FDW / iERP Ledger Extract",
                        "Management Sign-off Sheets",
                        "Exception Log Register"
                      ],
                      evidence: [
                        "Completed KI Measurement Chart with all 11 items populated",
                        "Management sign-off sheets evidencing review of each KI",
                        "Ledger reconciliation tie-out for sampled KI balances",
                        "Exception log showing resolution of flagged items"
                      ],
                      similarTests: [
                        {
                          id: "sim-pc001-csr",
                          name: "PC001.P – CSR Performance Controls",
                          program: "Corporate Social Responsibility",
                          overview: "Reviews the CSR KPI measurement report, validating that all defined KPIs are populated, compared against success criteria, reviewed by management, and that any exceptions below target have documented remediation plans.",
                          similarity: "Both tests ensure that a defined set of Key-Indicator (KI) or KPI measurements is collected, compared against success criteria, reviewed by management, and that any exceptions have documented remediation plans. The methodology is directly transferable — the difference is domain: CA001.P covers financial ledger KIs, while PC001.P covers CSR/sustainability KPIs.",
                          pdfUrl: PDF.csr + "#page=10"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]),
          ra("acc-p3-ra-3b","Intercompany Settlements","Risks related to accurate and timely settlement of intercompany charges",[
            co("acc-p3-ra-3b","Settlement Controls","Ensure settlements of intercompany charges are executed accurately and on a timely basis per authorisations","Intercompany Settlement Process","Review settlement execution controls and reconciliation of intercompany accounts","IA002.P – Intercompany Settlements","Verify intercompany charge settlements are made accurately and on time per established authorisations and policies",PDF.intercompany + "#page=21")
          ]),
          {
            id: "acc-p3-ra-4",
            name: "Intercompany Agreements",
            description: "Completeness and compliance of intercompany agreements and contracts",
            controlObjectives: [
              {
                id: "acc-p3-ra-4-co-1",
                name: "Intercompany Transactions",
                description: "To determine if intercompany accounts are properly reconciled and that transactions are recorded in accordance with GAAP and accounting instructions.",
                fullText: "To determine if:\n• Intercompany accounts are properly reconciled and that transactions are recorded in accordance with GAAP and accounting instructions.\n• Accruals and provisions provide the proper valuation of assets, liabilities, income, and expense for the accounting period and assure adequate control was exercised for any charges made during the reporting process.\n• All adjustments (netting, write-offs) are processed with the proper level of authorization and are consistent with IBM policies and practices.\n• Controls are in place to ensure miscodes are properly reviewed and approved for processing in the ledger.\n• Proper separation of duties exists so that no one individual can control activities within a process in a way that would result in the misuse or diversion of company funds without detection.\n• There are adequate controls to protect against unauthorized and/or inappropriate CIAS entries.\n• Effective controls exist that assure all information passed from feeder systems to CIAS and further to the ledger system CLS FDW/iERP, and that any exceptions are highlighted and properly resolved.\n• Accruals are processed timely, particularly at year end.\n• Settlements of Interco charges are made accurately and on a timely basis.",
                pdfUrl: PDF.intercompany + "#page=11",
                controls: [
                  { id: "acc-p3-ra-4-ctrl-1", name: "Processing Charges Against ICAs", description: "Ensure ICAs and ICA bypasses are processed in accordance with IBM guidelines", pdfUrl: PDF.intercompany + "#page=20", testTemplates: [
                    { id: "acc-p3-ra-4-tt-1", name: "IA001.P – Processing Charges", description: "Check ICA existence prior to charge processing and review ICA bypass controls", pdfUrl: PDF.intercompany + "#page=20", steps: [] },
                    { id: "acc-p3-ra-4-tt-2", name: "IA002.P – Settlement of Charges", description: "Ensure settlement of Interco charges are executed accurately and on time per authorisations", pdfUrl: PDF.intercompany + "#page=21", steps: [], similarTests: [
                      {
                        id: "sim-pc001-csr",
                        name: "PC001.P – CSR Performance Controls",
                        program: "Corporate Social Responsibility",
                        overview: "Reviews CSR KPI measurement charts, validates data accuracy against success criteria, confirms management review sign-off, and ensures exceptions have documented remediation plans.",
                        similarity: "Both tests verify that defined measurements are collected, validated against criteria, reviewed by management, and that exceptions are resolved with documented remediation. The methodology is directly transferable — the difference is domain: IA002.P covers intercompany charge settlement accuracy and timeliness, while PC001.P covers CSR/sustainability KPI performance.",
                        pdfUrl: PDF.csr + "#page=10"
                      }
                    ] },
                    { id: "acc-p3-ra-4-tt-3", name: "IA003.P – ICA Controls", description: "Verify ICA and ICA bypass controls are in place per IBM guidelines", pdfUrl: PDF.intercompany + "#page=22", steps: [] },
                  ]}
                ]
              }
            ]
          },
          ra("acc-p3-ra-5","Internal Measurement Reporting","Accuracy and timeliness of internal measurement and reporting",[
            co("acc-p3-ra-5","Internal Measurements","Determine if a complete set of measurements exists to properly reflect status and exception conditions","Accounting Controls and Measurements","Validate key indicator measurements for accuracy and management visibility","CA001.P – Measurements","Review KI measurement charts, validate data accuracy, and confirm management review and sign-off",PDF.intercompany + "#page=17")
          ]),
          {
            id: "acc-p3-ra-6",
            name: "Separation of Duties",
            description: "Adequate segregation of duties within intercompany accounting processes",
            controlObjectives: [
              {
                id: "acc-p3-ra-6-co-1",
                name: "Intercompany Transactions",
                description: "To determine if intercompany accounts are properly reconciled and that transactions are recorded in accordance with GAAP and accounting instructions.",
                fullText: "To determine if:\n• Intercompany accounts are properly reconciled and that transactions are recorded in accordance with GAAP and accounting instructions.\n• Accruals and provisions provide the proper valuation of assets, liabilities, income, and expense for the accounting period.\n• All adjustments (netting, write-offs) are processed with the proper level of authorization.\n• Controls are in place to ensure miscodes are properly reviewed.\n• Proper separation of duties exists so that no one individual can control activities within a process in a way that would result in the misuse or diversion of company funds.\n• There are adequate controls to protect against unauthorized CIAS entries.\n• Effective controls exist that assure all information passed from feeder systems to CIAS and further to the ledger.\n• Accruals are processed timely, particularly at year end.\n• Settlements of Interco charges are made accurately and on a timely basis.",
                pdfUrl: PDF.intercompany + "#page=11",
                controls: [
                  { id: "acc-p3-ra-6-ctrl-1", name: "Separation of Duties", description: "Ensure SOD assessment is performed and approved annually with conflicts resolved", pdfUrl: PDF.intercompany + "#page=26", testTemplates: [
                    {
                      id: "acc-p3-ra-6-tt-1",
                      name: "SD001.P – Separation of Duties",
                      description: "Validate SOD assessment, conflict identification, and secondary controls for intercompany accounting",
                      pdfUrl: PDF.intercompany + "#page=26",
                      steps: [],
                      stepsPerformed: [
                        "Obtain the most recent SOD assessment for the Intercompany Accounting process from the process owner",
                        "Confirm the assessment covers all key roles: CIAS entry, CIAS approval, intercompany reconciliation, and settlement",
                        "Identify all SOD conflicts flagged in the assessment and document each conflict by role and function",
                        "For each conflict, verify a secondary mitigating control is documented and operational",
                        "Select a sample of three conflicts and test whether the mitigating control was applied during the review period",
                        "Confirm the SOD assessment has been reviewed and approved by management within the last 12 months",
                        "Review user access listings and cross-reference against the SOD conflict matrix for CIAS and CLS FDW/iERP",
                        "Verify that any terminated employees have been promptly removed from system access",
                        "Confirm quarterly access recertification was completed and signed off by the access owner",
                        "Document any unmitigated conflicts or overdue recertifications as findings"
                      ],
                      dataSources: [
                        "SOD Assessment Report (Intercompany Accounting)",
                        "User Access Listing — CIAS / CLS FDW / iERP",
                        "Access Recertification Sign-off Sheets",
                        "Mitigating Control Evidence Log"
                      ],
                      evidence: [
                        "Completed SOD assessment covering all intercompany roles, approved by management",
                        "Documented secondary controls for each identified SOD conflict",
                        "Sample testing confirmation that mitigating controls operated effectively",
                        "User access listing with terminated employee removals evidenced",
                        "Quarterly access recertification completed and signed off by access owner"
                      ],
                      sameTests: [
                        {
                          id: "same-sd001-fixed-assets",
                          name: "SD001.P – Separation of Duties",
                          program: "Fixed Assets",
                          overview: "The identical SD001.P test applied to the Fixed Assets process. Covers asset creation, disposal, transfer, and depreciation adjustment roles. Steps, data sources, and evidence requirements are the same — only the in-scope process roles differ.",
                          pdfUrl: PDF.fixedAssets + "#page=18"
                        }
                      ],
                      similarTests: []
                    }
                  ]}
                ]
              }
            ]
          },
          ra("acc-p3-ra-7","Data Protection","Protection of sensitive intercompany data from unauthorised access or loss",[
            co("acc-p3-ra-7","Data Privacy","Validate controls protect against unauthorised data access per IBM data privacy guidelines","Data Protection","Review data classification, access controls, and privacy compliance","DI004.P – Data Protection","Verify data privacy controls are implemented and access is limited to authorised users only",PDF.intercompany + "#page=11")
          ]),
        ]
      },
      {
        id: "acc-prog-4",
        name: "Income Tax",
        description: "Deferred taxes, tax returns, withholding taxes, and corporate tax reporting",
        pdfUrl: PDF.incomeTax,
        riskAreas: [
          ra("acc-p4-ra-1","Compliance with Tax Regulations","Risks related to overall compliance with income tax laws and regulations",[
            co("acc-p4-ra-1","Tax Compliance","Ensure all required tax returns are accurate and filed timely","Tax Preparation and Filing Controls","Review tax return preparation, filing controls, and regulatory deadlines","TR001.P – Tax Preparation","Select sample of tax returns and verify accuracy, timeliness, and proper approval before filing",PDF.incomeTax + "#page=21")
          ]),
          ra("acc-p4-ra-2","Deferred Tax Assets and Liabilities","Risks related to accurate identification and recording of deferred taxes",[
            co("acc-p4-ra-2","Deferred Tax","Ensure required controls identify and record temporary and permanent tax differences","Test of Temporary Differences","Verify temporary differences are adequately identified and used to determine tax provision","DT001.P – Deferred Tax","Select deferred tax items and verify appropriate identification, calculation, and management review",PDF.incomeTax + "#page=15")
          ]),
          ra("acc-p4-ra-3","Withholding Taxes","Risks related to withholding tax remittance and recovery",[
            co("acc-p4-ra-3","Withholding Tax Controls","Ensure taxes are withheld on foreign payments and properly remitted","Withholding Taxes Remitted","Verify withholding taxes are remitted to tax jurisdictions accurately and on time","WT001.P – Withholding Taxes","Test sample of foreign payments and verify correct withholding, remittance, and documentation",PDF.incomeTax + "#page=27")
          ]),
          ra("acc-p4-ra-4","Income Tax Provisions","Risks related to accurate quarterly income tax provision booking",[
            co("acc-p4-ra-4","Tax Provision Accuracy","Verify accuracy of income tax provision booked by accounting on quarterly or monthly basis","Accuracy of Income Tax Provision","Review tax provision calculations and management approval process","IT001.P – Income Tax Provision","Review provision calculations, supporting documentation, and alignment with regulatory requirements",PDF.incomeTax + "#page=19")
          ]),
          ra("acc-p4-ra-5","Tax Reserves","Risks related to uncertain tax position identification under FIN48",[
            co("acc-p4-ra-5","FIN48 Analysis","Ensure controls are in place to adequately identify and evaluate Uncertain Tax Positions","Review of FIN 48 Analysis","Verify uncertain tax positions are identified, evaluated, and properly documented","FA001.P – FIN48 Review","Select uncertain tax positions and verify methodology, documentation, and management approval",PDF.incomeTax + "#page=25")
          ]),
        ]
      },
      {
        id: "acc-prog-5",
        name: "Indirect Tax",
        description: "Output taxes, input taxes, and tax return filings for VAT/GST",
        pdfUrl: PDF.indirectTax,
        riskAreas: [
          ra("acc-p5-ra-1","Output Tax","Risks related to accurate customer billing calculations for indirect taxes",[
            co("acc-p5-ra-1","Output Tax Controls","Verify billings from IBM are accurately calculated with regard to jurisdictional tax legislation","Customer Billing Calculations","Review customer billing calculations for tax accuracy and compliance","OT001.P – Customer Billing","Select sample of customer invoices and verify indirect tax calculations against applicable legislation",PDF.indirectTax + "#page=18")
          ]),
          ra("acc-p5-ra-2","Input Tax","Risks related to accurate and recoverable vendor invoice tax amounts",[
            co("acc-p5-ra-2","Input Tax Controls","Verify billings to IBM are accurately calculated and recoverable tax is properly identified","Vendor Invoice Calculations","Review vendor invoices for tax accuracy and recoverable tax identification","IT001.P – Vendor Invoices","Select sample of vendor invoices and verify indirect tax calculation accuracy and recovery process",PDF.indirectTax + "#page=21")
          ]),
          ra("acc-p5-ra-3","Tax Returns","Risks related to accurate and timely indirect tax return filing",[
            co("acc-p5-ra-3","Tax Return Filing","Ensure tax returns are submitted timely, accurately, and properly approved","Tax Returns","Review tax return preparation and filing controls for indirect taxes","TR002.P – Tax Returns","Select sample of tax returns and verify accuracy, timeliness, approvals, and payment reconciliation",PDF.indirectTax + "#page=15")
          ]),
          ra("acc-p5-ra-4","Account Reconciliation","Risks related to indirect tax balance sheet reconciliations",[
            co("acc-p5-ra-4","Reconciliation Controls","Ensure account reconciliations are performed regularly with proper management approval","Account Reconciliation Performance","Review indirect tax account reconciliations for timeliness and completeness","BS001.P – Reconciliations","Review selected reconciliations for frequency compliance, content accuracy, and management sign-off",PDF.indirectTax + "#page=23")
          ]),
        ]
      },
      {
        id: "acc-prog-6",
        name: "IBM Financing Accounting",
        description: "Lease classification, revenue recognition, account reconciliations, and residual values",
        pdfUrl: PDF.ibmFinancing,
        riskAreas: [
          ra("acc-p6-ra-1","Contract Review and Lease Classification","Risks related to correct classification and recording of financing leases",[
            co("acc-p6-ra-1","Lease Classification","Determine if an effective process exists for correct and accurate recording of leases","Classification and Recording of Leases","Review lease classification process and FASB paragraph tests on hardware","AC001.P – Lease Classification","Select sample of leases and verify classification testing, documentation, and recording accuracy",PDF.ibmFinancing + "#page=19")
          ]),
          ra("acc-p6-ra-2","Revenue and Depreciation Cost Recognition","Risks related to accurate revenue and depreciation recording for financing",[
            co("acc-p6-ra-2","Revenue Recognition","Determine if effective process exists to accurately record revenue and depreciation per GAAP","Revenue and Depreciation Cost Recognition","Review revenue and depreciation recording for financing leases","RC001.P – Revenue Recognition","Test sample of leases for accurate revenue recognition and depreciation calculation per GAAP and IBM practices",PDF.ibmFinancing + "#page=23")
          ]),
          ra("acc-p6-ra-3","Account Reconciliations","Risks related to balance sheet reconciliation completeness",[
            co("acc-p6-ra-3","Reconciliation Performance","Ensure account reconciliations are performed regularly with sufficient management oversight","Account Reconciliation Performance","Review reconciliations for timeliness, completeness, and management approval","BS001.P – Reconciliations","Select sample of financing account reconciliations and verify performance, content, and approval",PDF.ibmFinancing + "#page=10")
          ]),
          ra("acc-p6-ra-4","Ledger Entries and Accruals","Risks related to manual ledger entries and accrual controls",[
            co("acc-p6-ra-4","Manual Ledger Controls","Verify only properly authorised manual entries are posted to the general ledger","Manual Ledger Entry Controls","Test sample of journal entries for authorisation, documentation, and accuracy","PI002.P – Manual Entries","Select sample of financing journal entries and verify proper authorisation, coding, and backup documentation",PDF.ibmFinancing + "#page=14")
          ]),
          {
            id: "acc-p6-ra-5",
            name: "Access Management, SOD and Data Protection",
            description: "Risks related to system access, separation of duties, and data security in IBM Financing",
            controlObjectives: [
              {
                id: "acc-p6-ra-5-co-1",
                name: "Access Management and Data Protection",
                description: "Ensure IBM Financing system access is controlled, SOD conflicts are resolved, and sensitive data is protected.",
                pdfUrl: PDF.ibmFinancing + "#page=16",
                controls: [
                  { id: "acc-p6-ra-5-ctrl-1", name: "Access and Data Protection Controls", description: "Review system access rights, SOD assessment, and data protection measures", pdfUrl: PDF.ibmFinancing + "#page=16", testTemplates: [
                    { id: "acc-p6-ra-5-tt-1", name: "AM001.P – Access Management", description: "Review IBM Financing system access controls and periodic revalidation", pdfUrl: PDF.ibmFinancing + "#page=16", steps: [] },
                    { id: "acc-p6-ra-5-tt-2", name: "DI004.P – Data Protection", description: "Verify sensitive financing data is classified and protected per IBM privacy guidelines", pdfUrl: PDF.ibmFinancing + "#page=17", steps: [] },
                  ]}
                ]
              }
            ]
          },
          ra("acc-p6-ra-6","Revenue and Cost","Risks related to accurate revenue and cost recognition for IBM Financing products",[
            co("acc-p6-ra-6","Revenue and Cost Controls","Determine if effective controls exist for accurate revenue and cost recognition across all IBM Financing product types","Revenue and Cost Recognition","Review revenue and cost recording controls for financing products","RC001.P – Revenue and Cost","Test sample of financing transactions for accurate revenue and cost recognition per GAAP and IBM guidelines",PDF.ibmFinancing + "#page=25")
          ]),
          ra("acc-p6-ra-7","Receivable Purchasing and Inventory Financing","Risks related to receivable purchasing agreements and inventory financing controls",[
            co("acc-p6-ra-7","Receivable Purchasing Controls","Ensure receivable purchasing and inventory financing transactions are authorised, recorded, and monitored","Receivable Purchasing and Inventory Financing","Review receivable purchasing process and inventory financing controls","RC001.P – Receivable Purchasing","Select sample of receivable purchasing and inventory financing transactions and verify proper authorisation and recording",PDF.ibmFinancing + "#page=28")
          ]),
        ]
      },
      {
        id: "acc-prog-7",
        name: "Cost Accounting",
        description: "Product standard costing, inventory verification, manufacturing overhead, and inventory reserves",
        pdfUrl: PDF.costAccounting,
        riskAreas: [
          ra("acc-p7-ra-1","Product Standard Costing","Risks related to inventory valuation and cost element completeness",[
            co("acc-p7-ra-1","Product Costing","Ensure inventory values are consistent with costing methodology and all cost elements are included","Product Costing","Review costing methodology and verify all products have assigned unit cost","PC001.P – Product Costing","Select sample of products and verify cost assignment methodology, completeness, and management review",PDF.costAccounting + "#page=12")
          ]),
          ra("acc-p7-ra-2","Inventory Verification and Reconciliation","Risks related to inventory quantity accuracy and ledger reconciliation",[
            co("acc-p7-ra-2","Inventory Reconciliation","Perform inventory verification to validate quantities and reconcile logistics system to ledger","Inventory Verification and Reconciliation","Test cycle counts and ledger reconciliation for completeness and accuracy","IV001.P – Inventory Verification","Review inventory count procedures, variance investigation, and reconciliation to ledger balances",PDF.costAccounting + "#page=14")
          ]),
          ra("acc-p7-ra-3","Manufacturing Value Add and Overhead Distribution","Risks related to overhead allocation methodology",[
            co("acc-p7-ra-3","Overhead Distribution","Ensure allocation methodology for MVA/Overhead is appropriate and consistently applied","Manufacturing Value Add / Overhead Distribution","Verify overhead pools are monitored and allocation rates are reviewed and approved","MV001.P – Overhead Distribution","Test overhead allocation calculations, rate approvals, and pool balance monitoring controls",PDF.costAccounting + "#page=19")
          ]),
          ra("acc-p7-ra-4","Inventory Reserves","Risks related to adequate inventory reserve valuation",[
            co("acc-p7-ra-4","Reserve Accuracy","Ensure inventory reserves are appropriately valued, recorded, and reconciled","Inventory Reserve","Review reserve calculation methodology and management approval process","IR001.P – Inventory Reserve","Select reserve balances and verify methodology, documentation, and timely management review",PDF.costAccounting + "#page=17")
          ]),
          ra("acc-p7-ra-5","Separation of Duties","Risks related to excessive authority in cost accounting processes",[
            co("acc-p7-ra-5","SOD Controls","Validate duties are segregated adequately to deter and detect errors, waste, and fraud","Separation of Duties and Excessive Authority","Review SOD assessment and verify system authorities are limited to those needed","SO001.P – SOD","Request SOD assessment and test that no individual holds conflicting authorities in the cost accounting system",PDF.costAccounting + "#page=23")
          ]),
        ]
      },
      {
        id: "acc-prog-8",
        name: "Accounts Payable",
        description: "Vendor master file, disbursement controls, processing controls, and SOD",
        pdfUrl: PDF.accountsPayable,
        riskAreas: [
          ra("acc-p8-ra-1","Vendor Master File","Risks related to integrity of the vendor master file",[
            co("acc-p8-ra-1","VMF Integrity","Confirm sufficient controls maintain VMF integrity with SOD and DPL/USL screening","Vendor Master File Maintenance","Review VMF maintenance controls including SOD and checks against restricted party lists","SV001.P – VMF Maintenance","Select sample of VMF changes and verify proper authorisation, DPL screening, and SOD enforcement",PDF.accountsPayable + "#page=10")
          ]),
          ra("acc-p8-ra-2","Disbursement Controls","Risks related to adequate control over disbursement activities",[
            co("acc-p8-ra-2","Disbursement Controls","Determine adequate control exists over disbursement activities including negotiable instruments","Disbursement Controls","Review disbursement process for proper approvals and bank reconciliation confirmation","AC003.P – Disbursement Controls","Test disbursement transactions for proper authorisation, supporting documentation, and bank reconciliation",PDF.accountsPayable + "#page=20")
          ]),
          ra("acc-p8-ra-3","Processing Controls","Risks related to invoice processing accuracy and duplicate payment prevention",[
            co("acc-p8-ra-3","Invoice Processing","Confirm supplier invoices are processed timely and accurately with duplicate payment prevention","Processing Controls","Review invoice processing controls, validation, and exception handling","PC001.P – Processing Controls","Select sample of invoices and verify receipt matching, approval, duplicate checking, and timely payment",PDF.accountsPayable + "#page=13")
          ]),
          ra("acc-p8-ra-4","Application Management and Separation of Duties","Risks related to system access and SOD in AP processes",[
            co("acc-p8-ra-4","AP SOD","Ensure adequate separation of duties and application access controls in accounts payable","Application Management and SOD","Review AP system access and SOD assessment for conflicts","AS001.P – AP SOD","Review AP user access rights and SOD matrix and test that no individual has conflicting payment authorities",PDF.accountsPayable + "#page=24")
          ]),
          ra("acc-p8-ra-5","Accounting Controls","Risks related to AP ledger reconciliation and accuracy",[
            co("acc-p8-ra-5","Ledger Controls","Confirm payments are recorded accurately and on time with proper reconciliation","Ledger Controls","Review AP ledger reconciliation and supporting documentation","AC001.P – Ledger Controls","Review AP reconciliation between sub-ledger and general ledger and test sample transactions for accuracy",PDF.accountsPayable + "#page=20")
          ]),
          ra("acc-p8-ra-6","Business Continuity Planning","Risks related to AP process continuity during systems outages or disruptions",[
            co("acc-p8-ra-6","AP Business Continuity","Ensure a documented and tested business continuity plan exists for accounts payable operations","Business Continuity Controls","Review BCP documentation for AP processes, testing evidence, and management approval","BC001.S – Business Continuity","Verify AP BCP is documented, approved, and tested; confirm critical payment processes can continue during disruption",PDF.accountsPayable + "#page=27")
          ]),
        ]
      },
      {
        id: "acc-prog-9",
        name: "Accounts Receivable",
        description: "Debt collection, cash application, file adjustments, and business continuity",
        pdfUrl: PDF.accountsReceivable,
        riskAreas: [
          ra("acc-p9-ra-1","Debt Collection","Risks related to effective collection programme and delinquent account management",[
            co("acc-p9-ra-1","Collection Programme","Verify an effective documented collection programme is in place to achieve monthly targets","Collection Measurements and Reporting","Review delinquent dollars, write-offs, and performance tracking measurements","AR001.P – Collection Measurements","Select top delinquent accounts and verify collection plans, escalation, and management reporting",PDF.accountsReceivable + "#page=16")
          ]),
          ra("acc-p9-ra-2","Cash Application","Risks related to accurate and timely cash posting",[
            co("acc-p9-ra-2","Cash Application Controls","Determine if adequate controls ensure funds are deposited accurately and AR records updated timely","Cash Application","Review cash application process and bank reconciliation controls","CA001.P – Cash Application","Test sample of cash receipts for accurate posting, bank reconciliation, and timeliness",PDF.accountsReceivable + "#page=13")
          ]),
          ra("acc-p9-ra-3","AR File Adjustments","Risks related to write-offs, refunds, and other AR adjustments",[
            co("acc-p9-ra-3","Adjustment Controls","Determine if adequate procedures exist for processing AR adjustments with proper management approval","Write-offs","Review write-off and refund procedures for proper documentation and management approval levels","FA002.P – Write-offs","Select sample of write-offs and verify collection escalation was completed with appropriate management approval",PDF.accountsReceivable + "#page=19")
          ]),
          ra("acc-p9-ra-4","Separation of Duties","Risks related to SOD in cash and AR processes",[
            co("acc-p9-ra-4","AR SOD","Ensure no one individual has responsibilities allowing them to circumvent controls","Separation of Duties","Review SOD assessment for AR and cash application processes","SD001.P – AR SOD","Review SOD matrix for AR process and verify secondary controls are in place for any identified conflicts",PDF.accountsReceivable + "#page=28")
          ]),
        ]
      },
      {
        id: "acc-prog-10",
        name: "Payroll",
        description: "Employee validation, compensation, disbursement controls, and data privacy",
        pdfUrl: PDF.payroll,
        riskAreas: [
          ra("acc-p10-ra-1","Vendor Management","Risks related to third-party payroll provider management",[
            co("acc-p10-ra-1","Third-Party Provider","Assess management of third-party payroll providers including service delivery monitoring","Third-Party Provider or Supplier","Review vendor selection, contract terms, and ongoing performance monitoring","VM001.P – Vendor Management","Review payroll vendor contract, SLA compliance, and management oversight of third-party processing",PDF.payroll + "#page=33")
          ]),
          ra("acc-p10-ra-2","Employee Validation and Compensation","Risks related to bona fide employee payment accuracy",[
            co("acc-p10-ra-2","Employee Validation","Confirm payments are made to bona fide employees, correctly calculated, and properly approved","Employee Validation / Compensation / Movement","Review employee payroll records for accuracy, authorisation, and policy compliance","EV002.P – Employee Validation","Select sample of employees and verify compensation accuracy, approval chain, and system authorisation",PDF.payroll + "#page=12")
          ]),
          ra("acc-p10-ra-3","Internal Controls","Risks related to disbursement, data security, and input/output controls",[
            co("acc-p10-ra-3","Disbursement and Data Controls","Determine if internal controls prevent questionable disbursements and protect employee data","Disbursement Controls","Review disbursement authorisation, bank account verification, and negotiable instrument controls","IC002.P – Disbursement Controls","Test payroll disbursements for proper authorisation and verify bank account controls prevent misappropriation",PDF.payroll + "#page=18")
          ]),
          ra("acc-p10-ra-4","Separation of Duties","Risks related to SOD in payroll processes",[
            co("acc-p10-ra-4","Payroll SOD","Ensure SOD assessment is performed annually and conflicts are resolved","Separation of Duties","Review SOD assessment for payroll roles and verify mitigating controls","IC001.P – Payroll SOD","Request payroll SOD assessment and verify identified conflicts are eliminated or have effective secondary controls",PDF.payroll + "#page=18")
          ]),
        ]
      },
      {
        id: "acc-prog-11",
        name: "Travel and Expense",
        description: "Employee expense claims, legal fiscal compliance, and payment processing",
        pdfUrl: PDF.travelExpense,
        riskAreas: [
          ra("acc-p11-ra-1","Expense Claims","Risks related to accurate and policy-compliant employee expense reporting",[
            co("acc-p11-ra-1","Expense Reports","Ensure employee expenses are processed accurately with required supporting documentation","Employee Expense Reports","Assess process adherence including receipt verification and automated activity effectiveness","EP001.P – Expense Reports","Select sample of expense reports and verify receipt support, policy compliance, and management approval",PDF.travelExpense + "#page=12")
          ]),
          ra("acc-p11-ra-2","Legal Fiscal Compliance","Risks related to reimbursement guideline compliance",[
            co("acc-p11-ra-2","Expense Guidelines","Assess process to review, update, and communicate expense reimbursement guidelines","Expense Guidelines Interpretation","Review current guidelines for appropriate approval, currency, and system implementation","EP003.P – Expense Guidelines","Verify expense guidelines are current, properly approved, and timely implemented in the reimbursement system",PDF.travelExpense + "#page=14")
          ]),
          ra("acc-p11-ra-3","Access Management and Separation of Duties","Risks related to system access and SOD in T&E processes",[
            co("acc-p11-ra-3","T&E SOD","Ensure SOD assessment is performed and approved annually with conflicts addressed","Separation of Duties","Review T&E system access and SOD assessment for conflicts","SD001.P – T&E SOD","Review T&E SOD assessment and verify user access is properly controlled and conflicts are mitigated",PDF.travelExpense + "#page=16")
          ]),
        ]
      },
      {
        id: "acc-prog-12",
        name: "Management of Disbursements",
        description: "Employee expense accounts, payments, procurement bypasses, and gifts policy",
        pdfUrl: PDF.mod,
        riskAreas: [
          ra("acc-p12-ra-1","Management of Disbursements and Business Amenities","Risks related to improper payments and business gift policy compliance",[
            co("acc-p12-ra-1","Employee Expense Accounts","Ensure IBM employees follow policies for expenses with management review and clear business justification","Employee Expense Accounts","Review expense account approvals, policy compliance, and exception handling","EP001.P – Expense Accounts","Select sample of expense accounts and verify policy compliance, management approval, and business justification",PDF.mod + "#page=12")
          ]),
          ra("acc-p12-ra-2","Compliance with CTEBA","Risks related to CTEBA guidelines for transportation, entertainment, and business amenities",[
            co("acc-p12-ra-2","Business Amenities and Gifts","Ensure business amenities and gifts are reasonable, properly reported, and comply with FIN/LEG168","Business Amenities and Gifts","Review gifts and entertainment register for proper pre-approval and policy compliance","PR003.P – Business Amenities","Sample amenities and gifts transactions and verify CTEBA pre-approval, documentation, and reasonableness",PDF.mod + "#page=18")
          ]),
          ra("acc-p12-ra-3","Procurement Bypasses","Risks related to bypassing approved procurement channels",[
            co("acc-p12-ra-3","Procurement Bypass Controls","Determine if management oversight prevents procurement bypass and ensures fair value analysis","Procurement Bypasses","Review bypass identification process and supplier approval controls","PR002.P – Procurement Bypasses","Identify transactions bypassing procurement and verify management oversight and fair value justification",PDF.mod + "#page=17")
          ]),
        ]
      },
    ]
  },

  // ─────────────────────────────────────────────
  // MANUFACTURING AND PARTS
  // ─────────────────────────────────────────────
  manufacturing: {
    name: "Manufacturing and Parts",
    description: "Manufacturing operations, logistics, inventory, and trade compliance",
    color: "#0ea5e9",
    pdfUrl: PDF.manufacturing,
    programs: [
      {
        id: "mfg-prog-1",
        name: "Manufacturing",
        description: "Supply chain execution, inventory controls, supplier management, and health and safety",
        pdfUrl: PDF.manufacturing,
        riskAreas: [
          ra("mfg-p1-ra-1","Supply Chain Execution","Risks related to material requirements planning and order management",[
            co("mfg-p1-ra-1","MRP Controls","Verify MRP generated requirements are validated against forecasts and deviations escalated","Material Requirements Planning","Review MRP validation controls and escalation procedures for deviations","SE001.P – MRP","Test MRP-generated requirements against actual forecasts and verify management review of significant deviations",PDF.manufacturing + "#page=20")
          ]),
          ra("mfg-p1-ra-2","Inventory and Asset Controls","Risks related to physical security, sensitive parts, and cycle counts",[
            co("mfg-p1-ra-2","Inventory Controls","Verify inventory counts are performed per schedule with variance analysis and proper documentation","Inventory Controls and Verification","Review cycle count procedures, variance investigation, and loss detection controls","AC003.P – Inventory Controls","Observe or review inventory count procedures and test variance resolution and management approval process",PDF.manufacturing + "#page=30")
          ]),
          ra("mfg-p1-ra-3","Supplier Payment Controls","Risks related to procurement and accounts payable in manufacturing",[
            co("mfg-p1-ra-3","Supplier Payments","Validate payment controls verify supplier invoice accuracy and prevent inappropriate disbursements","Supplier Payment Controls","Review PO processing and payment authorisation controls","SP002.P – Supplier Payments","Select sample of supplier payments and verify invoice accuracy, PO matching, and proper authorisation",PDF.manufacturing + "#page=48")
          ]),
          ra("mfg-p1-ra-4","System Access and Separation of Duties","Risks related to system access controls in manufacturing",[
            co("mfg-p1-ra-4","Manufacturing SOD","Verify authorisation controls and revalidation of user access comply with IBM security standards","System Access and Separation of Duties","Review system access, revalidation, and SOD assessment","SA001.S – System Access","Review user access rights to manufacturing systems and verify periodic revalidation and SOD conflict resolution",PDF.manufacturing + "#page=33")
          ]),
        ]
      },
      {
        id: "mfg-prog-2",
        name: "GL Physical Logistics",
        description: "Distribution operations, supplier management, inventory controls, and environmental management",
        pdfUrl: PDF.physLogistics,
        riskAreas: [
          ra("mfg-p2-ra-1","Supplier Management","Risks related to logistics supplier performance, invoice accuracy, and contract management",[
            co("mfg-p2-ra-1","Supplier Performance","Verify supplier performance metrics are monitored and validated by IBM management system","Measurements","Review supplier performance metrics and management visibility controls","SM001.P – Measurements","Review logistics supplier performance reports, SLA compliance, and management action for underperformance",PDF.physLogistics + "#page=30")
          ]),
          ra("mfg-p2-ra-2","Inventory Controls","Risks related to physical security, supply chain security, and asset controls",[
            co("mfg-p2-ra-2","Inventory and Asset Controls","Verify inventory counts performed per contract with variance analysis and timely loss detection","Inventory Controls and Verification","Review physical security, cycle count procedures, and asset disposition controls","IC003.P – Inventory Controls","Test inventory count procedures, review security controls, and verify timely investigation of discrepancies",PDF.physLogistics + "#page=27")
          ]),
          ra("mfg-p2-ra-3","Distribution Operations","Risks related to receiving, shipping, and records management",[
            co("mfg-p2-ra-3","Distribution Controls","Ensure timely and safe receipt and shipment of commodities with accurate documentation","Receiving","Review receiving procedures, documentation, and return handling controls","DO001.P – Receiving","Observe or review receiving procedures and verify accuracy of documentation and handling of discrepancies",PDF.physLogistics + "#page=17")
          ]),
          ra("mfg-p2-ra-4","Environmental Management","Risks related to environmental compliance in logistics operations",[
            co("mfg-p2-ra-4","Environmental Compliance","Ensure environmental requirements compliance in supplier operations and material handling","Environmental Management","Review environmental management processes and supplier compliance controls","EM001.P – Environmental Management","Review supplier environmental assessments, compliance documentation, and management oversight",PDF.physLogistics + "#page=34")
          ]),
        ]
      },
      {
        id: "mfg-prog-3",
        name: "Parts Logistics",
        description: "Inventory and asset controls, parts planning, outsourcing management, and distribution",
        pdfUrl: PDF.partsLogistics,
        riskAreas: [
          ra("mfg-p3-ra-1","Inventory and Controls","Risks related to parts inventory accuracy and sensitive parts protection",[
            co("mfg-p3-ra-1","Parts Inventory Controls","Verify effective inventory management with controls ensuring correct accounting and loss detection","Inventory Controls and Verification","Review parts inventory count procedures, variance analysis, and sensitive parts tracking","IA001.P – Inventory Controls","Test parts inventory counts, review sensitive parts tracking, and verify loss investigation procedures",PDF.partsLogistics + "#page=29")
          ]),
          ra("mfg-p3-ra-2","Parts Planning","Risks related to supply/demand planning and excess surplus management",[
            co("mfg-p3-ra-2","Parts Planning Controls","Confirm supply/demand system is effective with all inventory sources included and demand flexibility","Supply Demand Planning","Review parts planning controls and excess/surplus identification","PP002.P – Supply Demand","Review planning system accuracy, demand flexibility controls, and management of excess and surplus parts",PDF.partsLogistics + "#page=15")
          ]),
          ra("mfg-p3-ra-3","Outsourcing Management","Risks related to third-party logistics provider contract and performance management",[
            co("mfg-p3-ra-3","Supplier Contracts","Verify contracts include detailed scope, performance measurements, and change management procedures","Scope of Work Management","Review outsourced logistics contracts for completeness and performance controls","OM001.P – Scope of Work","Select logistics supplier contracts and verify scope definition, SLA metrics, and change management controls",PDF.partsLogistics + "#page=24")
          ]),
        ]
      },
      {
        id: "mfg-prog-4",
        name: "GL Trade Compliance",
        description: "Export/import classification, customs declarations, export controls, and trade programme management",
        pdfUrl: PDF.tradeCompliance,
        riskAreas: [
          ra("mfg-p4-ra-1","Classification","Risks related to accurate customs and export commodity classification",[
            co("mfg-p4-ra-1","Customs Classification","Validate timely, accurate, consistent classification with proper approvals and duty impact tracking","Classification of Goods for Customs","Review customs classification process, approvals, and duty impact analysis","IC001.P – Classification","Select sample of classified products and verify accuracy, consistency, required approvals, and duty calculations",PDF.tradeCompliance + "#page=15")
          ]),
          ra("mfg-p4-ra-2","Customs Declaration","Risks related to accuracy and completeness of customs declarations",[
            co("mfg-p4-ra-2","Customs Declarations","Verify declarations are complete, accurate, and consistent with supporting documents","Customs Declarations","Review customs declaration preparation process and post-entry correction controls","CD001.P – Customs Declarations","Select sample of customs declarations and verify completeness, accuracy, and consistency with commercial invoices",PDF.tradeCompliance + "#page=18")
          ]),
          ra("mfg-p4-ra-3","Export Regulatory Controls","Risks related to denied party screening and boycott compliance",[
            co("mfg-p4-ra-3","Export Controls","Verify all export/re-export shipments are screened against denied party lists","Denied Parties List Screening","Review DPL screening process and suspension procedures for matches","EC001.P – DPL Screening","Test sample of export shipments and verify DPL screening was performed prior to shipment release",PDF.tradeCompliance + "#page=12")
          ]),
          ra("mfg-p4-ra-4","Customs Risk Management","Risks related to import licences, antidumping duties, and free trade programmes",[
            co("mfg-p4-ra-4","Import Licensing","Ensure valid licences/permits are in place prior to import with terms of agreement compliance","Import Licenses and Permits","Review import licensing process and validity tracking","CR001.P – Import Licenses","Select sample of imports and verify required licences are in place, current, and terms are complied with",PDF.tradeCompliance + "#page=25")
          ]),
        ]
      },
      {
        id: "mfg-prog-5",
        name: "CRM for Hardware and Software",
        description: "Sales management, pricing, contractual agreements, and solution delivery",
        pdfUrl: PDF.crmHW,
        riskAreas: [
          ra("mfg-p5-ra-1","Financial Management","Risks related to revenue recognition and customer claims",[
            co("mfg-p5-ra-1","Revenue Recognition","Validate revenue recognised per accounting policies with contract completeness and delivery confirmation","Revenue Recognition","Review revenue recognition controls for hardware and software contracts","SE004.P – Revenue Recognition","Select sample of contracts and verify revenue recognition timing, delivery evidence, and accounting accuracy",PDF.crmHW + "#page=29")
          ]),
          ra("mfg-p5-ra-2","Solution Delivery","Risks related to solution implementation, asset management, and software licence compliance",[
            co("mfg-p5-ra-2","Delivery Controls","Validate solution delivery implements customer requirements with quality assurance","Delivery Implementation","Review solution delivery process for customer requirement compliance and quality assurance","SE001.P – Delivery","Select sample of delivered solutions and verify customer requirements were met and revenue properly recognised",PDF.crmHW + "#page=26")
          ]),
          ra("mfg-p5-ra-3","Sales Management","Risks related to pricing approvals and contractual agreement controls",[
            co("mfg-p5-ra-3","Pricing Controls","Ensure solutions are correctly priced with all elements approved within delegation limits","Pricing","Review pricing approval process and documentation for hardware and software deals","SD002.P – Pricing","Select sample of deals and verify pricing authorisation, delegation compliance, and billing plan accuracy",PDF.crmHW + "#page=20")
          ]),
        ]
      },
    ]
  },

  // ─────────────────────────────────────────────
  // MARKETING
  // ─────────────────────────────────────────────
  marketing: {
    name: "Marketing",
    description: "Marketing, communications, procurement, sales incentives, and CRM for services",
    color: "#06b6d4",
    pdfUrl: PDF.marketing,
    programs: [
      {
        id: "mkt-prog-1",
        name: "Marketing",
        description: "Events management, content, disbursements, supplier management, and data privacy",
        pdfUrl: PDF.marketing,
        riskAreas: [
          ra("mkt-p1-ra-1","Events Management","Risks related to event/programme financial reconciliation and controls",[
            co("mkt-p1-ra-1","Event Controls","Verify event/programme financial information was reconciled accurately and timely","Event / Programme Reconciliation","Review event reconciliation, budget variance analysis, and supporting documentation","EM001.P – Event Reconciliation","Select sample of events and verify financial reconciliation, budget variance analysis, and documentation",PDF.marketing + "#page=14")
          ]),
          ra("mkt-p1-ra-2","Disbursements","Risks related to marketing payment validity and contract compliance",[
            co("mkt-p1-ra-2","Disbursement Controls","Confirm disbursements comply with supplier contracts, are valid and verified, and paid timely","Disbursements","Review marketing disbursement process for contract compliance and approval controls","DS001.P – Disbursements","Select sample of marketing disbursements and verify contract compliance, approvals, and payment timeliness",PDF.marketing + "#page=19")
          ]),
          ra("mkt-p1-ra-3","Supplier Management","Risks related to marketing supplier selection and performance measurement",[
            co("mkt-p1-ra-3","Supplier Controls","Validate procurement involvement in supplier selection and performance measurement","Supplier Management","Review supplier selection process and performance against service agreements","SM001.P – Supplier Management","Review marketing supplier contracts, procurement involvement, and performance measurement reports",PDF.marketing + "#page=21")
          ]),
          ra("mkt-p1-ra-4","Data Privacy and Protection","Risks related to protection of customer and IBM data in marketing activities",[
            co("mkt-p1-ra-4","Data Privacy","Verify IBM assets, sensitive information, and customer data are properly protected per guidelines","Data Privacy and Data Security","Review data classification and protection controls in marketing processes","DP001.P – Data Privacy","Review marketing data handling procedures, access controls, and compliance with IBM privacy guidelines",PDF.marketing + "#page=25")
          ]),
        ]
      },
      {
        id: "mkt-prog-2",
        name: "Communications and Brand Marketing",
        description: "External communications, issue management, financial management, and data security",
        pdfUrl: PDF.commsBrand,
        riskAreas: [
          ra("mkt-p2-ra-1","External Communications","Risks related to accuracy and approval of external communications",[
            co("mkt-p2-ra-1","External Comms Controls","Verify communications are properly approved and security controls prevent unauthorised alterations","External Communications","Review external communications approval process and version control","EC001.P – External Communications","Select sample of external communications and verify approval documentation, version control, and security controls",PDF.commsBrand + "#page=14")
          ]),
          ra("mkt-p2-ra-2","Issue Management","Risks related to timely identification and response to communications issues",[
            co("mkt-p2-ra-2","Issue Response","Confirm issues were timely identified, threat level classified correctly, and response tactics documented","Issue Management","Review issue management process and threat classification controls","IM001.P – Issue Management","Review issue log and verify timely identification, proper escalation, and documented response actions",PDF.commsBrand + "#page=16")
          ]),
          ra("mkt-p2-ra-3","Financial Management","Risks related to communications expenditure accuracy and policy compliance",[
            co("mkt-p2-ra-3","Financial Controls","Validate expenses are accurate, within budget, compliant with policies, and disbursements follow contract terms","Financial Management and Disbursements","Review budget adherence and disbursement controls for communications activities","FM001.P – Financial Management","Select sample of communications expenditures and verify budget compliance, contract terms, and approvals",PDF.commsBrand + "#page=20")
          ]),
          ra("mkt-p2-ra-4","Data Privacy and Data Security","Risks related to protection of sensitive data in communications and brand activities",[
            co("mkt-p2-ra-4","Data Security Controls","Confirm IBM assets and sensitive information are properly classified, protected, and access is controlled","Data Privacy and Data Security","Review data classification, access controls, and privacy compliance in communications","DP001.P – Data Privacy","Review data handling procedures, access controls, and GDPR compliance in communications and brand marketing",PDF.commsBrand + "#page=24")
          ]),
        ]
      },
      {
        id: "mkt-prog-3",
        name: "Procurement",
        description: "Supplier assessment, selection, contract management, purchase orders, and environmental programmes",
        pdfUrl: PDF.procurement,
        riskAreas: [
          ra("mkt-p3-ra-1","Supplier Assessment","Risks related to new supplier evaluation and integrity focus supplier checks",[
            co("mkt-p3-ra-1","Supplier Assessment Controls","Validate new suppliers are assessed against DPL/USL, financial criteria, and environmental requirements","Supplier Assessment","Review new supplier assessment process including DPL screening and RBA/SECLA requirements","SA001.P – Supplier Assessment","Select sample of new suppliers and verify assessment against DPL, financial criteria, and agreement signing",PDF.procurement + "#page=16")
          ]),
          ra("mkt-p3-ra-2","Supplier Selection and Fair Value","Risks related to competitive sourcing and fair value determination",[
            co("mkt-p3-ra-2","Sourcing Controls","Confirm appropriate sourcing techniques, fair value analysis, and required approvals were obtained","Supplier Selection and Fair Value Determination","Review sourcing process and fair value documentation","SF001.P – Supplier Selection","Select sample of procurement decisions and verify competitive sourcing, fair value analysis, and approvals",PDF.procurement + "#page=23")
          ]),
          ra("mkt-p3-ra-3","Contract Management","Risks related to contract administration and supplier deliverables",[
            co("mkt-p3-ra-3","Contract Administration","Verify contracts are accurately recorded with valid terms, supplier performance monitored, and amendments controlled","Contract Administration","Review contract management process and supplier performance monitoring","CM001.P – Contract Administration","Select sample of contracts and verify accuracy, performance monitoring, and amendment control procedures",PDF.procurement + "#page=29")
          ]),
          ra("mkt-p3-ra-4","Procurement Bypass","Risks related to bypassing approved procurement channels",[
            co("mkt-p3-ra-4","Bypass Controls","Identify instances where procurement process was bypassed and verify Blue Book requirements were followed","Procurement Bypass Identification","Review bypass identification process and management approval controls","PB001.P – Procurement Bypass","Identify procurement bypass transactions and verify management oversight and fair value justification",PDF.procurement + "#page=44")
          ]),
        ]
      },
      {
        id: "mkt-prog-4",
        name: "Global Sales Incentives",
        description: "Incentive plan deployment, manual adjustments, accruals, and access management",
        pdfUrl: PDF.salesIncentives,
        riskAreas: [
          ra("mkt-p4-ra-1","Manual Adjustments","Risks related to manual adjustment authorisation and duplicate processing",[
            co("mkt-p4-ra-1","Manual Adjustment Controls","Validate MAAs/MMCs are processed per guidelines, properly approved, and duplicates identified","Manual Adjustments","Review manual adjustment process for proper authorisation and duplicate detection","EP004.P – Manual Adjustments","Select sample of manual adjustments and verify guidelines compliance, proper approval, and duplicate checks",PDF.salesIncentives + "#page=17")
          ]),
          ra("mkt-p4-ra-2","Incentive Plan Deployment","Risks related to timely deployment of incentive plan letters",[
            co("mkt-p4-ra-2","IPL Deployment","Verify seller delays between offer/acceptance dates were justified and communicated","Incentive Plan Letter Deployment","Review IPL deployment timing and communication controls for delays","IP001.P – IPL Deployment","Select sample of IPLs and verify deployment timing, delay justification, and management communication",PDF.salesIncentives + "#page=12")
          ]),
          ra("mkt-p4-ra-3","Accruals and Deferrals","Risks related to incentive accrual accuracy and management approval",[
            co("mkt-p4-ra-3","Accrual Controls","Verify quarterly accruals/deferrals are prepared per guidelines and reconcile to source documents","Accruals and Deferrals","Review incentive accrual preparation and management approval process","AR001.P – Accruals","Select sample of incentive accruals and verify guideline compliance, management approval, and reconciliation",PDF.salesIncentives + "#page=22")
          ]),
          ra("mkt-p4-ra-4","Access Management and Data Protection","Risks related to ISI system access and GDPR compliance",[
            co("mkt-p4-ra-4","Access and Data Controls","Validate ISI system access is controlled by role and GDPR compliance is maintained","Systems Access and Separation of Duties","Review ISI system access controls and data protection compliance","DA002.P – Systems Access","Review ISI user access rights, SOD assessment, and GDPR data protection controls for sales incentive data",PDF.salesIncentives + "#page=25")
          ]),
        ]
      },
      {
        id: "mkt-prog-5",
        name: "Quote to Cash",
        description: "Order management, revenue recognition, billing, and business continuity",
        pdfUrl: PDF.quoteToCash,
        riskAreas: [
          ra("mkt-p5-ra-1","Firm Order","Risks related to order management accuracy and contract compliance",[
            co("mkt-p5-ra-1","Order Management Controls","Verify contracts are accurately recorded, credit checks performed, and contract modifications properly authorised","Contract / Order Management","Review order management process for completeness and authorisation controls","CM001.P – Contract Management","Select sample of orders and verify contract accuracy, credit checks, and authorisation of any modifications",PDF.quoteToCash + "#page=16")
          ]),
          ra("mkt-p5-ra-2","Revenue Recognition","Risks related to accurate revenue recognition for hardware, software, and services",[
            co("mkt-p5-ra-2","Revenue Recognition","Confirm fulfilment activities support revenue recognition in compliance with IBM procedures and GAAP","Revenue Recognition","Review revenue recognition process for major product and service categories","CM004.P – Revenue Recognition","Select sample of revenue transactions across all categories and verify recognition criteria and supporting evidence",PDF.quoteToCash + "#page=23")
          ]),
          ra("mkt-p5-ra-3","Billing","Risks related to billing accuracy and adjustment processing",[
            co("mkt-p5-ra-3","Billing Controls","Validate shipped items are billed accurately with reconciliation performed and adjustments authorised","Billing – Ship / Bill / Invoice Reconciliation","Review billing reconciliation process and adjustment authorisation controls","BI002.P – Billing Reconciliation","Select sample of billing transactions and verify ship/bill reconciliation, invoice accuracy, and adjustment approvals",PDF.quoteToCash + "#page=33")
          ]),
          ra("mkt-p5-ra-4","Separation of Duties","Risks related to SOD in order management and billing",[
            co("mkt-p5-ra-4","QTC SOD","Confirm conflicting duties are identified and mitigated with appropriate monitoring controls","Separation of Duties","Review SOD assessment for quote to cash processes","SD001.P – QTC SOD","Review SOD matrix for order management and billing and verify effective secondary controls are in place",PDF.quoteToCash + "#page=42")
          ]),
        ]
      },
      {
        id: "mkt-prog-6",
        name: "CRM for Services",
        description: "Solution design and delivery, financial management, data protection, and labour claiming",
        pdfUrl: PDF.crmServices,
        riskAreas: [
          ra("mkt-p6-ra-1","Solution Design","Risks related to services solution pricing, contract design, and mandatory process compliance",[
            co("mkt-p6-ra-1","Solution Design Controls","Ensure the opportunity has been progressed using mandatory IBM processes and pricing approvals","Solution Design Mandatories","Review solution design process for complexity calculation and mandatory approval controls","SD001.P – Solution Design","Select sample of service opportunities and verify mandatory process compliance, pricing, and contract design approvals",PDF.crmServices + "#page=20")
          ]),
          ra("mkt-p6-ra-2","Solution Delivery","Risks related to delivery implementation, asset management, and contract governance",[
            co("mkt-p6-ra-2","Delivery Controls","Validate solution implementation and startup activities are properly planned and executed","Solution Startup and Implementation","Review delivery implementation controls and performance monitoring","SE001.P – Delivery Implementation","Select sample of service deliveries and verify implementation planning, quality assurance, and contract compliance",PDF.crmServices + "#page=31")
          ]),
          ra("mkt-p6-ra-3","Financial Management","Risks related to revenue recognition accuracy and profitability tracking",[
            co("mkt-p6-ra-3","Financial Controls","Validate financial management, revenue recognition, and profitability tracking for services","Financial Management","Review financial management process including revenue recognition and cost tracking","FM001.P – Financial Management","Select sample of service contracts and verify revenue recognition accuracy, profitability reporting, and cost allocation",PDF.crmServices + "#page=52")
          ]),
          ra("mkt-p6-ra-4","Data Security and Privacy","Risks related to protection of PI/SPI data in services delivery",[
            co("mkt-p6-ra-4","Data Protection","Validate adequate controls protect PI/SPI data in the services delivery process","Data Protection and Privacy","Review data classification and access controls for services delivery data","DS001.P – Data Protection","Review data handling procedures for services delivery and verify PI/SPI access controls and GDPR compliance",PDF.crmServices + "#page=49")
          ]),
        ]
      },
      {
        id: "mkt-prog-7",
        name: "ESG Reporting",
        description: "Regulatory disclosures, materiality assessments, data security, and monitoring",
        pdfUrl: PDF.esgReporting,
        riskAreas: [
          ra("mkt-p7-ra-1","Regulatory Compliance and Mandatory Disclosures","Risks related to accuracy and compliance of mandatory ESG disclosures",[
            co("mkt-p7-ra-1","Mandatory Disclosure Controls","Validates externally disclosed metrics are supported by documented calculations and authorised by management","Metric Calculation and Corroboration","Review ESG metric calculation methodology and source documentation","MC001.P – Metric Calculation","Select sample of ESG disclosures and verify supporting calculations, source documentation, and management authorisation",PDF.esgReporting + "#page=12")
          ]),
          ra("mkt-p7-ra-2","Data Security and Privacy","Risks related to protection of employee and third-party PI/SPI in ESG reporting",[
            co("mkt-p7-ra-2","Data Protection Controls","Validate adequate controls protect IBM employee and third-party PI and SPI data in ESG reporting","Data Protection","Review data classification and access controls for ESG reporting data","DP001.P – Data Protection","Review ESG data handling procedures, access controls, and privacy compliance for reported metrics",PDF.esgReporting + "#page=15")
          ]),
          ra("mkt-p7-ra-3","Monitoring and Management Review","Risks related to management oversight and change management in ESG reporting",[
            co("mkt-p7-ra-3","Monitoring Controls","Validate management monitoring and review processes are documented and executed","Monitoring and Review","Review ESG management review procedures and change management controls","MM001.P – Monitoring","Review ESG monitoring documentation, management review evidence, and change management processes",PDF.esgReporting + "#page=21")
          ]),
        ]
      },
      {
        id: "mkt-prog-8",
        name: "Corporate Social Responsibility",
        description: "CSR performance measurement, KPI monitoring, management review, and reporting controls",
        pdfUrl: PDF.csr,
        riskAreas: [
          {
            id: "mkt-p8-ra-1",
            name: "KPI Measurement and Monitoring",
            description: "Risks related to accuracy, completeness, and management oversight of CSR KPI measurements",
            controlObjectives: [
              {
                id: "mkt-p8-ra-1-co-1",
                name: "CSR Performance Controls",
                description: "Ensure that a defined set of KPI measurements is collected, compared against success criteria, reviewed by management, and that any exceptions have documented remediation plans.",
                fullText: "To determine if:\n• A defined set of CSR KPI measurements is collected and reported for the period under review.\n• KPI values are compared against established success criteria and targets.\n• Management review of KPI results is documented and approved.\n• Exceptions to success criteria are identified and have documented remediation plans.\n• KPI data is sourced from reliable systems and reconciled prior to reporting.\n• Prior-period trends are assessed and material variances explained.",
                pdfUrl: PDF.csr + "#page=10",
                controls: [
                  {
                    id: "mkt-p8-ra-1-ctrl-1",
                    name: "KPI Collection and Review Controls",
                    description: "Validate KPI data collection, success criteria comparison, and management sign-off",
                    pdfUrl: PDF.csr + "#page=10",
                    testTemplates: [
                      {
                        id: "mkt-p8-ra-1-tt-1",
                        name: "PC001.P – CSR Performance Controls",
                        description: "Review CSR KPI measurement charts, validate data accuracy against success criteria, and confirm management review and exception remediation",
                        pdfUrl: PDF.csr + "#page=10",
                        steps: [],
                        stepsPerformed: [
                          "Obtain the current CSR KPI measurement report from the CSR or Sustainability lead",
                          "Verify all defined KPI items are populated and up to date for the period under review",
                          "Cross-reference each KPI value against the source system or data feed used for collection",
                          "Confirm each KPI is compared against its documented success criteria or target threshold",
                          "Identify any KPIs that did not meet their success criteria and trace to remediation documentation",
                          "Verify remediation plans for exceptions are documented, approved, and time-bound",
                          "Confirm management review sign-off is present for the full KPI report",
                          "Review prior-period KPI values to assess trend and consistency",
                          "Test three KPIs in detail — agree reported values back to source data",
                          "Document any KPIs with missing management sign-off or unresolved exceptions as findings",
                          "Summarise findings and prepare draft observations for management review"
                        ],
                        dataSources: [
                          "CSR KPI Measurement Report (current period)",
                          "Source System Extracts (HR, Operations, Environmental data feeds)",
                          "Management Sign-off Sheets",
                          "Exception and Remediation Log"
                        ],
                        evidence: [
                          "Completed KPI measurement report with all defined items populated",
                          "Management sign-off sheets evidencing review of the full KPI set",
                          "Source data tie-out for sampled KPI values",
                          "Exception log showing documented remediation plans for KPIs below target"
                        ],
                        similarTests: [
                          {
                            id: "sim-ca001-intercompany",
                            name: "CA001.P – Accounting Controls and Measurements",
                            program: "Intercompany Accounting",
                            overview: "Reviews the KI Measurement Chart for the intercompany accounting process, validating that all 11 KI items are populated, compared against ledger data, reviewed by management, and that any exceptions have resolution documentation.",
                            similarity: "Both tests ensure that a defined set of Key-Indicator (KI) or KPI measurements is collected, compared against success criteria, reviewed by management, and that any exceptions have documented remediation plans. The methodology is directly transferable — the difference is domain: CA001.P covers financial ledger KIs, while PC001.P covers CSR/sustainability KPIs.",
                            pdfUrl: PDF.intercompany + "#page=17"
                          },
                          {
                            id: "sim-ia002-intercompany",
                            name: "IA002.P – Settlement of Charges",
                            program: "Intercompany Accounting",
                            overview: "Verifies that intercompany charge settlements are executed accurately and on time per established authorisations and policies, including reconciliation of intercompany accounts.",
                            similarity: "Both tests verify that defined measurements are collected, validated against criteria, reviewed by management, and that exceptions are resolved with documented remediation. The methodology is directly transferable — the difference is domain: IA002.P covers intercompany charge settlement accuracy and timeliness, while PC001.P covers CSR/sustainability KPI performance.",
                            pdfUrl: PDF.intercompany + "#page=21"
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
    ]
  },

  // ─────────────────────────────────────────────
  // INFORMATION TECHNOLOGY
  // ─────────────────────────────────────────────
  it: {
    name: "Information Technology",
    description: "IT governance, real estate, environmental management, and opportunity management",
    color: "#1e40af",
    pdfUrl: PDF.realEstate,
    programs: [
      {
        id: "it-prog-1",
        name: "IBM Global Real Estate",
        description: "Lease transaction management, lease administration, design and construction, and facilities operations",
        pdfUrl: PDF.realEstate,
        riskAreas: [
          ra("it-p1-ra-1","Lease Transaction Management","Risks related to lease agreement authorisation and execution",[
            co("it-p1-ra-1","Leasing Approvals","Validates IBM enters into leases based on proper authorisation, approved business cases, and legal review","Leasing Approvals and Execution","Review lease approval process, business case requirements, and legal review controls","LM001.P – Leasing Approvals","Select sample of lease agreements and verify proper authorisation, business case approval, and legal review completion",PDF.realEstate + "#page=13")
          ]),
          ra("it-p1-ra-2","Lease Administration Management","Risks related to real estate payment authorisation and timely release",[
            co("it-p1-ra-2","Lease Administration","Validates that real estate payments are appropriately approved prior to payment and released timely","Leasing Administration","Review lease payment approval and release controls","LA001.P – Lease Administration","Select sample of real estate payments and verify proper authorisation, documentation, and payment timeliness",PDF.realEstate + "#page=20")
          ]),
          ra("it-p1-ra-3","Design and Construction","Risks related to construction project authorisation, specification compliance, and best value",[
            co("it-p1-ra-3","Construction Controls","Validates design and construction projects are adequately managed, authorised, and completed at best value","Design and Construction Projects","Review project management controls, authorisation, and completion at best value","DC001.P – Construction","Select sample of construction projects and verify proper authorisation, spec compliance, and value management",PDF.realEstate + "#page=22")
          ]),
          ra("it-p1-ra-4","Facilities Operations","Risks related to building maintenance, asset controls, and safety compliance",[
            co("it-p1-ra-4","Facilities Controls","Validates a framework exists for planning, scheduling, and prioritising building maintenance for safety and security","Building Maintenance and Operations","Review facilities maintenance planning and asset protection controls","BE001.P – Building Maintenance","Review maintenance planning procedures, asset inventory controls, and safety compliance documentation",PDF.realEstate + "#page=25")
          ]),
        ]
      },
      {
        id: "it-prog-2",
        name: "Environmental Management",
        description: "Regulatory compliance, incident prevention, energy management, and approved supplier use",
        pdfUrl: PDF.envMgmt,
        riskAreas: [
          ra("it-p2-ra-1","Regulatory Compliance","Risks related to meeting IBM compliance obligations including legal and permit requirements",[
            co("it-p2-ra-1","Compliance Obligations","Verifies an effective process for meeting IBM Compliance Obligations including legal and permit requirements","IBM Compliance Obligations","Review compliance obligation identification and tracking process","EM003.P – Compliance Obligations","Review compliance obligation register, permit status, and management review of compliance performance",PDF.envMgmt + "#page=18")
          ]),
          ra("it-p2-ra-2","Incident Reporting and Prevention","Risks related to environmental incident prevention and response",[
            co("it-p2-ra-2","Incident Prevention","Verifies documented process for prevention, control, and response to environmental incidents","Environmental Incident Prevention and Reporting","Review incident prevention controls and response procedures","EM005.P – Incident Prevention","Review incident prevention procedures, response plans, and investigation reports for recent incidents",PDF.envMgmt + "#page=23")
          ]),
          ra("it-p2-ra-3","Use of Approved Suppliers","Risks related to environmental evaluation and use of approved suppliers",[
            co("it-p2-ra-3","Approved Supplier Controls","Validates environmental evaluation and use of approved suppliers in compliance with IBM requirements","Environmental Evaluation and Approved Suppliers","Review supplier environmental evaluation and approval process","EM007.P – Approved Suppliers","Select sample of suppliers and verify environmental evaluation, approval status, and ongoing monitoring",PDF.envMgmt + "#page=26")
          ]),
          ra("it-p2-ra-4","Energy Management","Risks related to energy use control and cost reduction programmes",[
            co("it-p2-ra-4","Energy Controls","Verifies the location has an effective energy management programme to control energy use and cost","Energy Management","Review energy management programme, targets, and performance monitoring","EM004.P – Energy Management","Review energy management programme documentation, performance targets, and management review evidence",PDF.envMgmt + "#page=20")
          ]),
          ra("it-p2-ra-5","Measurement Monitoring and Reporting","Risks related to environmental performance measurement and management review",[
            co("it-p2-ra-5","Monitoring Controls","Validates monitoring, measurement, assessment, and management review processes are effectively implemented","Monitoring Measurement and Management Review","Review environmental performance monitoring and management review processes","EM023.P – Monitoring","Review environmental measurement methodology, data accuracy, and management review documentation",PDF.envMgmt + "#page=50")
          ]),
        ]
      },
      {
        id: "it-prog-3",
        name: "Opportunity Management",
        description: "Opportunity identification, qualification, data privacy, and financial management",
        pdfUrl: PDF.oppMgmt,
        riskAreas: [
          ra("it-p3-ra-1","Opportunity Identification and Validation","Risks related to qualifying and passing opportunities to relevant sales teams",[
            co("it-p3-ra-1","Opportunity Qualification","Ensures offerings are monitored and qualified opportunities are passed to relevant sales teams","Engage and Qualify Sales Process","Review opportunity qualification process and handoff controls","OM001.P – Opportunity Management","Select sample of opportunities and verify qualification criteria, process compliance, and timely handoff to sales",PDF.oppMgmt + "#page=11")
          ]),
          ra("it-p3-ra-2","Data Privacy and Access Management","Risks related to protection of opportunity data and system access controls",[
            co("it-p3-ra-2","Data and Access Controls","Verifies opportunity management data is safeguarded with proper access controls and SOD","Data Privacy and Access Management","Review data protection and access control procedures for opportunity management systems","AS001.S – Access Management","Review opportunity management system access rights and verify data protection controls are in place",PDF.oppMgmt + "#page=18")
          ]),
          ra("it-p3-ra-3","Financial Management","Risks related to accurate expense recovery and intercompany allocation",[
            co("it-p3-ra-3","Financial Controls","Validates expenses and costs are fully recovered and appropriately allocated through intercompany agreements","Financial Management","Review financial management process for opportunity management cost recovery","FM001.S – Financial Management","Review intercompany agreements and document of understanding for opportunity management cost allocation",PDF.oppMgmt + "#page=21")
          ]),
        ]
      },
      {
        id: "it-prog-4",
        name: "Global Compensation",
        description: "Compensation decisions, approvals, acquired employees, and data privacy",
        pdfUrl: PDF.globalComp,
        riskAreas: [
          ra("it-p4-ra-1","Data Privacy","Risks related to protection of personal information in compensation processes",[
            co("it-p4-ra-1","Compensation Data Privacy","Evaluate whether PI and SPI is protected with appropriate access controls and SOD","Data Protection","Review data protection controls for compensation data including access controls and vendor assurances","DP001.P – Data Protection","Review compensation data handling, access controls, and vendor data privacy assurances for policy compliance",PDF.globalComp + "#page=13")
          ]),
          ra("it-p4-ra-2","Compensation Decisions and Approvals","Risks related to compensation accuracy and proper management approval",[
            co("it-p4-ra-2","Compensation Process","Ensure compensation programmes are properly designed with control reports, exception reports, and management reviews","Compensation Process Design","Review compensation process controls, exception reports, and reconciliation procedures","CM001.P – Compensation","Select sample of compensation decisions and verify accuracy, exception reporting, and management approval",PDF.globalComp + "#page=10")
          ]),
          ra("it-p4-ra-3","Acquired Employees","Risks related to non-standard compensation for employees acquired through acquisitions",[
            co("it-p4-ra-3","Acquired Employee Controls","Tests if acquired employees have non-standard compensation and whether administered per applicable policies","Acquired Employees – Post Integration","Review compensation controls for acquired employees and integration compliance","CM002.P – Acquired Employees","Select sample of acquired employees and verify compensation policy compliance, system migration, and integration controls",PDF.globalComp + "#page=11")
          ]),
        ]
      },
    ]
  }
}
