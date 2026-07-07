// Condensed audit risk data - one complete path per function for demonstration

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
            specificRisks: [
              {
                id: "fin-sr-1",
                name: "Premature Revenue Recognition",
                description: "Revenue recorded before earning criteria are met",
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
                        controlTypes: [
                          {
                            id: "fin-ct-1",
                            name: "Detective Control",
                            description: "Identifies errors after they occur",
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
                          },
                          {
                            id: "fin-ct-2",
                            name: "Preventive Control",
                            description: "Prevents errors from occurring",
                            testTemplates: [
                              {
                                id: "fin-tt-4",
                                name: "System Access Review",
                                description: "Review user access to revenue systems",
                                steps: [
                                  "Extract current user access list",
                                  "Review permissions against job roles",
                                  "Validate segregation of duties",
                                  "Document any exceptions"
                                ]
                              },
                              {
                                id: "fin-tt-5",
                                name: "Approval Workflow Test",
                                description: "Test system approval requirements",
                                steps: [
                                  "Review workflow configuration",
                                  "Test sample revenue entries",
                                  "Verify required approvals",
                                  "Check override capabilities"
                                ]
                              },
                              {
                                id: "fin-tt-6",
                                name: "Training Verification",
                                description: "Verify staff training on policies",
                                steps: [
                                  "Review training records",
                                  "Test knowledge through interviews",
                                  "Verify policy acknowledgments",
                                  "Document completion rates"
                                ]
                              }
                            ]
                          },
                          {
                            id: "fin-ct-3",
                            name: "Corrective Control",
                            description: "Corrects identified errors",
                            testTemplates: [
                              {
                                id: "fin-tt-7",
                                name: "Error Correction Review",
                                description: "Review process for correcting errors",
                                steps: [
                                  "Identify corrections made during period",
                                  "Review approval documentation",
                                  "Verify accuracy of corrections",
                                  "Assess timeliness"
                                ]
                              },
                              {
                                id: "fin-tt-8",
                                name: "Adjustment Testing",
                                description: "Test revenue adjustments",
                                steps: [
                                  "Select sample of adjustments",
                                  "Review supporting documentation",
                                  "Verify proper authorization",
                                  "Confirm accounting treatment"
                                ]
                              },
                              {
                                id: "fin-tt-9",
                                name: "Remediation Tracking",
                                description: "Track remediation of issues",
                                steps: [
                                  "Review issue tracking log",
                                  "Verify completion of actions",
                                  "Test effectiveness of measures",
                                  "Document closure"
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
            specificRisks: [
              {
                id: "acc-sr-1",
                name: "Journal Entry Errors",
                description: "Incorrect or unauthorized journal entries posted to the general ledger",
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
                        controlTypes: [
                          {
                            id: "acc-ct-1",
                            name: "Detective Control",
                            description: "Detects errors in journal entries",
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
                          },
                          {
                            id: "acc-ct-2",
                            name: "Preventive Control",
                            description: "Prevents journal entry errors",
                            testTemplates: [
                              {
                                id: "acc-tt-4",
                                name: "Approval Workflow Test",
                                description: "Test journal entry approval workflow",
                                steps: [
                                  "Review approval requirements",
                                  "Test workflow enforcement",
                                  "Verify approval levels",
                                  "Check system controls"
                                ]
                              },
                              {
                                id: "acc-tt-5",
                                name: "Access Controls Test",
                                description: "Test access to journal entry function",
                                steps: [
                                  "Review user access list",
                                  "Verify segregation of duties",
                                  "Test system restrictions",
                                  "Check override capabilities"
                                ]
                              },
                              {
                                id: "acc-tt-6",
                                name: "Standard Entry Templates",
                                description: "Test use of standard entry templates",
                                steps: [
                                  "Review template library",
                                  "Test template usage",
                                  "Verify template accuracy",
                                  "Check update process"
                                ]
                              }
                            ]
                          },
                          {
                            id: "acc-ct-3",
                            name: "Corrective Control",
                            description: "Corrects journal entry errors",
                            testTemplates: [
                              {
                                id: "acc-tt-7",
                                name: "Error Correction Process",
                                description: "Test process for correcting entry errors",
                                steps: [
                                  "Review correction procedures",
                                  "Test sample corrections",
                                  "Verify proper authorization",
                                  "Check documentation"
                                ]
                              },
                              {
                                id: "acc-tt-8",
                                name: "Reversal Testing",
                                description: "Test journal entry reversal process",
                                steps: [
                                  "Review reversal policy",
                                  "Test sample reversals",
                                  "Verify approval",
                                  "Check timing"
                                ]
                              },
                              {
                                id: "acc-tt-9",
                                name: "Reconciliation Review",
                                description: "Review account reconciliations",
                                steps: [
                                  "Select sample reconciliations",
                                  "Review for completeness",
                                  "Verify timely resolution",
                                  "Check approval"
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
            specificRisks: [
              {
                id: "mfg-sr-1",
                name: "Inventory Valuation Errors",
                description: "Inventory valued incorrectly leading to financial misstatement",
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
                        controlTypes: [
                          {
                            id: "mfg-ct-1",
                            name: "Detective Control",
                            description: "Detects inventory discrepancies",
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
                          },
                          {
                            id: "mfg-ct-2",
                            name: "Preventive Control",
                            description: "Prevents inventory errors",
                            testTemplates: [
                              {
                                id: "mfg-tt-4",
                                name: "Receiving Controls",
                                description: "Test receiving process controls",
                                steps: [
                                  "Review receiving procedures",
                                  "Test sample receipts",
                                  "Verify documentation",
                                  "Check system updates"
                                ]
                              },
                              {
                                id: "mfg-tt-5",
                                name: "Valuation Method Test",
                                description: "Test inventory valuation methodology",
                                steps: [
                                  "Review valuation policy",
                                  "Test calculation accuracy",
                                  "Verify consistency",
                                  "Check system configuration"
                                ]
                              },
                              {
                                id: "mfg-tt-6",
                                name: "Obsolescence Review",
                                description: "Test obsolete inventory identification",
                                steps: [
                                  "Review obsolescence criteria",
                                  "Test identification process",
                                  "Verify reserve calculations",
                                  "Check approval"
                                ]
                              }
                            ]
                          },
                          {
                            id: "mfg-ct-3",
                            name: "Corrective Control",
                            description: "Corrects inventory issues",
                            testTemplates: [
                              {
                                id: "mfg-tt-7",
                                name: "Adjustment Process",
                                description: "Test inventory adjustment process",
                                steps: [
                                  "Review adjustment procedures",
                                  "Test sample adjustments",
                                  "Verify authorization",
                                  "Check documentation"
                                ]
                              },
                              {
                                id: "mfg-tt-8",
                                name: "Write-off Testing",
                                description: "Test inventory write-off procedures",
                                steps: [
                                  "Review write-off policy",
                                  "Test sample write-offs",
                                  "Verify approval",
                                  "Check disposal documentation"
                                ]
                              },
                              {
                                id: "mfg-tt-9",
                                name: "Reconciliation Process",
                                description: "Test inventory reconciliation",
                                steps: [
                                  "Review reconciliation procedures",
                                  "Test sample reconciliations",
                                  "Verify timely completion",
                                  "Check resolution of differences"
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
            specificRisks: [
              {
                id: "mkt-sr-1",
                name: "Budget Overruns",
                description: "Marketing spend exceeds approved budget",
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
                        controlTypes: [
                          {
                            id: "mkt-ct-1",
                            name: "Detective Control",
                            description: "Detects budget variances",
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
                          },
                          {
                            id: "mkt-ct-2",
                            name: "Preventive Control",
                            description: "Prevents budget overruns",
                            testTemplates: [
                              {
                                id: "mkt-tt-4",
                                name: "Approval Limits Test",
                                description: "Test spending approval limits",
                                steps: [
                                  "Review approval limit policy",
                                  "Test system enforcement",
                                  "Verify escalation procedures",
                                  "Check override controls"
                                ]
                              },
                              {
                                id: "mkt-tt-5",
                                name: "Purchase Order Controls",
                                description: "Test PO approval process",
                                steps: [
                                  "Review PO approval process",
                                  "Test budget availability check",
                                  "Verify approval documentation",
                                  "Check system controls"
                                ]
                              },
                              {
                                id: "mkt-tt-6",
                                name: "System Budget Controls",
                                description: "Test system budget enforcement",
                                steps: [
                                  "Review system budget controls",
                                  "Test budget blocking",
                                  "Verify warning messages",
                                  "Check effectiveness"
                                ]
                              }
                            ]
                          },
                          {
                            id: "mkt-ct-3",
                            name: "Corrective Control",
                            description: "Corrects budget overruns",
                            testTemplates: [
                              {
                                id: "mkt-tt-7",
                                name: "Budget Reallocation",
                                description: "Test budget reallocation process",
                                steps: [
                                  "Review reallocation requests",
                                  "Verify proper approval",
                                  "Check implementation",
                                  "Assess reasonableness"
                                ]
                              },
                              {
                                id: "mkt-tt-8",
                                name: "Spending Freeze Process",
                                description: "Test spending freeze procedures",
                                steps: [
                                  "Review freeze criteria",
                                  "Test freeze implementation",
                                  "Verify communication",
                                  "Check effectiveness"
                                ]
                              },
                              {
                                id: "mkt-tt-9",
                                name: "Corrective Action Plans",
                                description: "Review corrective action plans",
                                steps: [
                                  "Review action plans",
                                  "Verify implementation",
                                  "Test effectiveness",
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
            specificRisks: [
              {
                id: "mkt-sr-2",
                name: "Inappropriate Content",
                description: "Social media content that damages brand reputation",
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
                        controlTypes: [
                          {
                            id: "mkt-ct-4",
                            name: "Detective Control",
                            description: "Detects inappropriate content",
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
                          },
                          {
                            id: "mkt-ct-5",
                            name: "Preventive Control",
                            description: "Prevents inappropriate content",
                            testTemplates: [
                              {
                                id: "mkt-tt-13",
                                name: "Approval Workflow Test",
                                description: "Test content approval workflow",
                                steps: [
                                  "Review approval process",
                                  "Test workflow enforcement",
                                  "Verify approval levels",
                                  "Check bypass controls"
                                ]
                              },
                              {
                                id: "mkt-tt-14",
                                name: "Training Effectiveness",
                                description: "Test social media training program",
                                steps: [
                                  "Review training materials",
                                  "Verify completion records",
                                  "Test knowledge retention",
                                  "Assess effectiveness"
                                ]
                              },
                              {
                                id: "mkt-tt-15",
                                name: "Brand Guidelines Test",
                                description: "Test adherence to brand guidelines",
                                steps: [
                                  "Review brand guidelines",
                                  "Test content against standards",
                                  "Verify guideline accessibility",
                                  "Check update process"
                                ]
                              }
                            ]
                          },
                          {
                            id: "mkt-ct-6",
                            name: "Corrective Control",
                            description: "Corrects content issues",
                            testTemplates: [
                              {
                                id: "mkt-tt-16",
                                name: "Content Removal Process",
                                description: "Test process for removing inappropriate content",
                                steps: [
                                  "Review removal procedures",
                                  "Test removal speed",
                                  "Verify documentation",
                                  "Check communication plan"
                                ]
                              },
                              {
                                id: "mkt-tt-17",
                                name: "Crisis Response",
                                description: "Test crisis response procedures",
                                steps: [
                                  "Review crisis response plan",
                                  "Test escalation procedures",
                                  "Verify stakeholder communication",
                                  "Check effectiveness"
                                ]
                              },
                              {
                                id: "mkt-tt-18",
                                name: "Corrective Action Plans",
                                description: "Review corrective actions for content issues",
                                steps: [
                                  "Review action plans",
                                  "Verify implementation",
                                  "Test effectiveness",
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
            specificRisks: [
              {
                id: "mkt-sr-3",
                name: "CSR Program Misalignment",
                description: "CSR initiatives not aligned with company values or community needs",
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
                        controlTypes: [
                          {
                            id: "mkt-ct-7",
                            name: "Detective Control",
                            description: "Detects CSR program issues",
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
                          },
                          {
                            id: "mkt-ct-8",
                            name: "Preventive Control",
                            description: "Prevents CSR misalignment",
                            testTemplates: [
                              {
                                id: "mkt-tt-22",
                                name: "Needs Assessment Process",
                                description: "Test community needs assessment process",
                                steps: [
                                  "Review assessment methodology",
                                  "Verify stakeholder engagement",
                                  "Check data collection",
                                  "Validate findings"
                                ]
                              },
                              {
                                id: "mkt-tt-23",
                                name: "Program Design Review",
                                description: "Review CSR program design process",
                                steps: [
                                  "Review design criteria",
                                  "Verify alignment checks",
                                  "Test approval gates",
                                  "Check documentation"
                                ]
                              },
                              {
                                id: "mkt-tt-24",
                                name: "Values Alignment Test",
                                description: "Test alignment with company values",
                                steps: [
                                  "Review company values",
                                  "Map programs to values",
                                  "Identify gaps",
                                  "Document alignment"
                                ]
                              }
                            ]
                          },
                          {
                            id: "mkt-ct-9",
                            name: "Corrective Control",
                            description: "Corrects CSR program issues",
                            testTemplates: [
                              {
                                id: "mkt-tt-25",
                                name: "Program Modification Process",
                                description: "Test process for modifying CSR programs",
                                steps: [
                                  "Review modification procedures",
                                  "Test change approval",
                                  "Verify implementation",
                                  "Check effectiveness"
                                ]
                              },
                              {
                                id: "mkt-tt-26",
                                name: "Program Termination",
                                description: "Test program termination procedures",
                                steps: [
                                  "Review termination criteria",
                                  "Test decision process",
                                  "Verify stakeholder communication",
                                  "Check documentation"
                                ]
                              },
                              {
                                id: "mkt-tt-27",
                                name: "Impact Assessment",
                                description: "Assess CSR program impact",
                                steps: [
                                  "Review impact metrics",
                                  "Analyze program outcomes",
                                  "Compare to objectives",
                                  "Document lessons learned"
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
            specificRisks: [
              {
                id: "it-sr-1",
                name: "Unauthorized Access",
                description: "Unauthorized users gain access to systems",
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
                        controlTypes: [
                          {
                            id: "it-ct-1",
                            name: "Detective Control",
                            description: "Detects inappropriate access",
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
                          },
                          {
                            id: "it-ct-2",
                            name: "Preventive Control",
                            description: "Prevents unauthorized access",
                            testTemplates: [
                              {
                                id: "it-tt-4",
                                name: "Access Request Process",
                                description: "Test access request process",
                                steps: [
                                  "Review access request policy",
                                  "Test sample requests",
                                  "Verify approvals obtained",
                                  "Check provisioning accuracy"
                                ]
                              },
                              {
                                id: "it-tt-5",
                                name: "Multi-Factor Authentication",
                                description: "Test MFA implementation",
                                steps: [
                                  "Review MFA policy",
                                  "Test MFA enforcement",
                                  "Verify coverage",
                                  "Check bypass controls"
                                ]
                              },
                              {
                                id: "it-tt-6",
                                name: "Password Policy Enforcement",
                                description: "Test password policy compliance",
                                steps: [
                                  "Review password policy",
                                  "Test system enforcement",
                                  "Verify complexity requirements",
                                  "Check expiration settings"
                                ]
                              }
                            ]
                          },
                          {
                            id: "it-ct-3",
                            name: "Corrective Control",
                            description: "Corrects access issues",
                            testTemplates: [
                              {
                                id: "it-tt-7",
                                name: "Access Remediation",
                                description: "Test remediation of access issues",
                                steps: [
                                  "Review identified access issues",
                                  "Verify remediation actions",
                                  "Test access removal",
                                  "Document completion"
                                ]
                              },
                              {
                                id: "it-tt-8",
                                name: "Account Lockout Process",
                                description: "Test account lockout procedures",
                                steps: [
                                  "Review lockout policy",
                                  "Test lockout triggers",
                                  "Verify unlock process",
                                  "Check documentation"
                                ]
                              },
                              {
                                id: "it-tt-9",
                                name: "Incident Response",
                                description: "Test response to unauthorized access",
                                steps: [
                                  "Review incident response plan",
                                  "Test incident handling",
                                  "Verify containment actions",
                                  "Check documentation"
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
        ]
      }
    ]
  }
};

// Made with Bob
