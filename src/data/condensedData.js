// Condensed audit risk data - 5-level hierarchy: Program > Risk Area > Control Objective > Control > Test

export const auditData = {
  finance: {
    name: "Finance",
    description: "Financial operations and controls",
    color: "#3b82f6",
    programs: [
      {
        id: "fin-prog-1",
        name: "Financial Reporting",
        description: "Ensures accurate and timely financial reporting",
        riskAreas: [
          {
            id: "fin-ra-1",
            name: "Revenue Recognition",
            description: "Risks related to proper revenue recognition",
            controlObjectives: [
              {
                id: "fin-co-1",
                name: "Ensure Revenue Completeness",
                description: "All revenue transactions are recorded in the correct period",
                controls: [
                  {
                    id: "fin-ctrl-1",
                    name: "Monthly Revenue Reconciliation",
                    description: "Reconcile revenue accounts monthly to supporting documentation",
                    testTemplates: [
                      {
                        id: "fin-tt-1",
                        name: "Sample Revenue Transactions",
                        description: "Select sample of revenue transactions and verify supporting documentation",
                        steps: [
                          "Select random sample of 25-30 transactions",
                          "Review underlying contracts and agreements",
                          "Verify delivery of goods/services",
                          "Check timing of revenue recognition"
                        ]
                      },
                      {
                        id: "fin-tt-2",
                        name: "Analytical Review",
                        description: "Compare revenue trends month-over-month",
                        steps: [
                          "Extract monthly revenue data",
                          "Calculate variances vs prior periods",
                          "Investigate significant anomalies",
                          "Document findings"
                        ]
                      },
                      {
                        id: "fin-tt-3",
                        name: "Cut-off Testing",
                        description: "Test transactions around period end",
                        steps: [
                          "Select transactions 5 days before/after period end",
                          "Verify transaction dates",
                          "Confirm proper period allocation",
                          "Review supporting documentation"
                        ]
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
  accounting: {
    name: "Accounting",
    description: "General accounting operations and financial controls",
    color: "#60a5fa",
    programs: [
      {
        id: "acc-prog-1",
        name: "Accounting",
        description: "General accounting operations and financial controls",
        riskAreas: [
          {
            id: "acc-ra-1",
            name: "General Ledger Management",
            description: "Risks related to general ledger accuracy and completeness",
            controlObjectives: [
              {
                id: "acc-co-1",
                name: "Ensure GL Accuracy",
                description: "All journal entries are accurate, authorized, and properly recorded",
                controls: [
                  {
                    id: "acc-ctrl-1",
                    name: "Journal Entry Review",
                    description: "Review and approve all journal entries before posting",
                    testTemplates: [
                      {
                        id: "acc-tt-1",
                        name: "Journal Entry Testing",
                        description: "Test sample of journal entries for accuracy",
                        steps: [
                          "Select sample of journal entries",
                          "Review supporting documentation",
                          "Verify proper authorization",
                          "Check accounting treatment"
                        ]
                      },
                      {
                        id: "acc-tt-2",
                        name: "Unusual Entry Review",
                        description: "Review unusual or large journal entries",
                        steps: [
                          "Identify unusual entries",
                          "Review business justification",
                          "Verify approval documentation",
                          "Assess reasonableness"
                        ]
                      },
                      {
                        id: "acc-tt-3",
                        name: "Period-End Review",
                        description: "Review period-end journal entries",
                        steps: [
                          "Extract period-end entries",
                          "Review for appropriateness",
                          "Verify supporting documentation",
                          "Check timing"
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
      {
        id: "acc-prog-2",
        name: "Accounting Fixed Assets",
        description: "General accounting operations and financial controls",
        riskAreas: []
      },
      {
        id: "acc-prog-3",
        name: "Intercompany Accounting",
        description: "General accounting operations and financial controls",
        riskAreas: []
      },
      {
        id: "acc-prog-4",
        name: "Income Tax",
        description: "General accounting operations and financial controls",
        riskAreas: []
      },
      {
        id: "acc-prog-5",
        name: "Indirect Tax",
        description: "General accounting operations and financial controls",
        riskAreas: []
      },
      {
        id: "acc-prog-6",
        name: "IBM Financing Accounting",
        description: "General accounting operations and financial controls",
        riskAreas: []
      },
      {
        id: "acc-prog-7",
        name: "Cost Accounting",
        description: "General accounting operations and financial controls",
        riskAreas: []
      },
      {
        id: "acc-prog-8",
        name: "Accounts Payable",
        description: "General accounting operations and financial controls",
        riskAreas: []
      },
      {
        id: "acc-prog-9",
        name: "Accounts Recievable",
        description: "General accounting operations and financial controls",
        riskAreas: []
      },
      {
        id: "acc-prog-10",
        name: "Accounting Fixed Assets",
        description: "General accounting operations and financial controls",
        riskAreas: []
      }
    ]
  },
  manufacturing: {
    name: "Manufacturing and Parts",
    description: "Manufacturing operations and inventory management",
    color: "#0ea5e9",
    programs: [
      {
        id: "mfg-prog-1",
        name: "Manufacturing and Parts",
        description: "Manufacturing operations and inventory management",
        riskAreas: [
          {
            id: "mfg-ra-1",
            name: "Inventory Management",
            description: "Risks related to inventory accuracy and valuation",
            controlObjectives: [
              {
                id: "mfg-co-1",
                name: "Ensure Inventory Accuracy",
                description: "Inventory is accurately counted, valued, and recorded",
                controls: [
                  {
                    id: "mfg-ctrl-1",
                    name: "Physical Inventory Counts",
                    description: "Conduct periodic physical inventory counts",
                    testTemplates: [
                      {
                        id: "mfg-tt-1",
                        name: "Cycle Count Testing",
                        description: "Test cycle count procedures",
                        steps: [
                          "Observe cycle count process",
                          "Review count documentation",
                          "Test variance investigation",
                          "Verify adjustments"
                        ]
                      },
                      {
                        id: "mfg-tt-2",
                        name: "Physical Count Observation",
                        description: "Observe annual physical inventory count",
                        steps: [
                          "Attend physical count",
                          "Test count accuracy",
                          "Review count procedures",
                          "Verify completeness"
                        ]
                      },
                      {
                        id: "mfg-tt-3",
                        name: "Variance Analysis",
                        description: "Analyze inventory variances",
                        steps: [
                          "Review variance reports",
                          "Investigate significant variances",
                          "Verify root cause analysis",
                          "Check corrective actions"
                        ]
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
  marketing: {
    name: "Marketing",
    description: "Marketing operations and campaign management",
    color: "#06b6d4",
    programs: [
      {
        id: "mkt-prog-1",
        name: "Marketing",
        description: "Traditional marketing campaigns and brand management",
        riskAreas: [
          {
            id: "mkt-ra-1",
            name: "Budget Management",
            description: "Risks related to marketing budget",
            controlObjectives: [
              {
                id: "mkt-co-1",
                name: "Control Marketing Spend",
                description: "Ensure spending stays within budget",
                controls: [
                  {
                    id: "mkt-ctrl-1",
                    name: "Budget Monitoring",
                    description: "Monitor actual spend against budget",
                    testTemplates: [
                      {
                        id: "mkt-tt-1",
                        name: "Budget Variance Analysis",
                        description: "Analyze budget vs actual spending",
                        steps: [
                          "Extract spending data by campaign",
                          "Compare to approved budget",
                          "Calculate variances",
                          "Investigate significant overruns"
                        ]
                      },
                      {
                        id: "mkt-tt-2",
                        name: "Monthly Budget Review",
                        description: "Review monthly budget reports",
                        steps: [
                          "Review monthly reports",
                          "Identify budget overruns",
                          "Verify management review",
                          "Document corrective actions"
                        ]
                      },
                      {
                        id: "mkt-tt-3",
                        name: "Trend Analysis",
                        description: "Analyze spending trends",
                        steps: [
                          "Extract historical spending data",
                          "Identify spending trends",
                          "Project future spend",
                          "Compare to remaining budget"
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
      {
        id: "mkt-prog-2",
        name: "Social Media",
        description: "Social media marketing and online presence management",
        riskAreas: [
          {
            id: "mkt-ra-2",
            name: "Content Management",
            description: "Risks related to social media content creation and posting",
            controlObjectives: [
              {
                id: "mkt-co-2",
                name: "Control Content Quality",
                description: "Ensure all social media content meets brand standards",
                controls: [
                  {
                    id: "mkt-ctrl-2",
                    name: "Content Review Process",
                    description: "Review and approve content before posting",
                    testTemplates: [
                      {
                        id: "mkt-tt-10",
                        name: "Content Audit",
                        description: "Audit posted content for compliance",
                        steps: [
                          "Sample recent social media posts",
                          "Review against brand guidelines",
                          "Check approval documentation",
                          "Document findings"
                        ]
                      },
                      {
                        id: "mkt-tt-11",
                        name: "Engagement Monitoring",
                        description: "Monitor audience engagement and feedback",
                        steps: [
                          "Review comments and reactions",
                          "Identify negative sentiment",
                          "Verify response procedures",
                          "Check escalation process"
                        ]
                      },
                      {
                        id: "mkt-tt-12",
                        name: "Compliance Review",
                        description: "Review content for regulatory compliance",
                        steps: [
                          "Review content against regulations",
                          "Check disclosure requirements",
                          "Verify claim substantiation",
                          "Document compliance"
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
      {
        id: "mkt-prog-3",
        name: "CSR",
        description: "Corporate Social Responsibility and community engagement",
        riskAreas: [
          {
            id: "mkt-ra-3",
            name: "Community Relations",
            description: "Risks related to community engagement and CSR initiatives",
            controlObjectives: [
              {
                id: "mkt-co-3",
                name: "Ensure CSR Alignment",
                description: "CSR programs align with company values and community needs",
                controls: [
                  {
                    id: "mkt-ctrl-3",
                    name: "CSR Program Review",
                    description: "Review CSR programs for alignment and effectiveness",
                    testTemplates: [
                      {
                        id: "mkt-tt-19",
                        name: "Program Approval Process",
                        description: "Test CSR program approval process",
                        steps: [
                          "Review program proposals",
                          "Verify alignment assessment",
                          "Check approval documentation",
                          "Validate decision criteria"
                        ]
                      },
                      {
                        id: "mkt-tt-20",
                        name: "Stakeholder Feedback",
                        description: "Review stakeholder feedback on CSR programs",
                        steps: [
                          "Collect stakeholder feedback",
                          "Analyze feedback themes",
                          "Identify improvement areas",
                          "Document findings"
                        ]
                      },
                      {
                        id: "mkt-tt-21",
                        name: "Performance Metrics Review",
                        description: "Review CSR program performance metrics",
                        steps: [
                          "Review program metrics",
                          "Compare to objectives",
                          "Identify underperforming programs",
                          "Document results"
                        ]
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
  it: {
    name: "Information Technology",
    description: "IT operations, security, and infrastructure",
    color: "#1e40af",
    programs: [
      {
        id: "it-prog-1",
        name: "Cybersecurity",
        description: "Protection of information systems and data",
        riskAreas: [
          {
            id: "it-ra-1",
            name: "Access Management",
            description: "Risks related to user access and authentication",
            controlObjectives: [
              {
                id: "it-co-1",
                name: "Control System Access",
                description: "Ensure only authorized users can access systems",
                controls: [
                  {
                    id: "it-ctrl-1",
                    name: "User Access Reviews",
                    description: "Periodic review of user access rights",
                    testTemplates: [
                      {
                        id: "it-tt-1",
                        name: "Access Rights Review",
                        description: "Review user access rights",
                        steps: [
                          "Extract user access list",
                          "Review against job roles",
                          "Identify inappropriate access",
                          "Verify removal of excess rights"
                        ]
                      },
                      {
                        id: "it-tt-2",
                        name: "Segregation of Duties Test",
                        description: "Test segregation of duties",
                        steps: [
                          "Review SoD matrix",
                          "Test user access combinations",
                          "Identify SoD violations",
                          "Verify mitigating controls"
                        ]
                      },
                      {
                        id: "it-tt-3",
                        name: "Terminated User Review",
                        description: "Review access removal for terminated users",
                        steps: [
                          "Obtain termination list",
                          "Verify access removal",
                          "Check timing of removal",
                          "Test system access"
                        ]
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
  }
}
