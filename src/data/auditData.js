// Hierarchical audit risk data structure
// 7 Levels: Program > Risk Area > Specific Risk > Control Objective > Control > Control Type > Test Template

export const auditData = {
  finance: {
    name: "Finance",
    description: "Financial operations and controls",
    programs: [
      {
        id: "fin-prog-1",
        name: "Financial Reporting",
        description: "Ensures accurate and timely financial reporting in compliance with accounting standards",
        riskAreas: [
          {
            id: "fin-ra-1",
            name: "Revenue Recognition",
            description: "Risks related to proper recognition and recording of revenue",
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
                                steps: ["Select random sample", "Review contracts", "Verify delivery", "Check timing"]
                              },
                              {
                                id: "fin-tt-2",
                                name: "Analytical Review",
                                description: "Compare revenue trends month-over-month",
                                steps: ["Extract revenue data", "Calculate variances", "Investigate anomalies"]
                              },
                              {
                                id: "fin-tt-3",
                                name: "Cut-off Testing",
                                description: "Test transactions around period end",
                                steps: ["Select period-end transactions", "Verify dates", "Confirm proper period"]
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
                                steps: ["Extract user list", "Review permissions", "Validate segregation"]
                              },
                              {
                                id: "fin-tt-5",
                                name: "Approval Workflow Test",
                                description: "Test approval requirements for revenue entries",
                                steps: ["Review workflow settings", "Test sample approvals", "Verify compliance"]
                              },
                              {
                                id: "fin-tt-6",
                                name: "Training Verification",
                                description: "Verify staff training on revenue policies",
                                steps: ["Review training records", "Test knowledge", "Document completion"]
                              }
                            ]
                          },
                          {
                            id: "fin-ct-3",
                            name: "Corrective Control",
                            description: "Corrects errors that have been identified",
                            testTemplates: [
                              {
                                id: "fin-tt-7",
                                name: "Error Correction Review",
                                description: "Review process for correcting revenue errors",
                                steps: ["Identify corrections made", "Review approval", "Verify accuracy"]
                              },
                              {
                                id: "fin-tt-8",
                                name: "Adjustment Testing",
                                description: "Test revenue adjustments and journal entries",
                                steps: ["Select adjustments", "Review supporting docs", "Verify authorization"]
                              },
                              {
                                id: "fin-tt-9",
                                name: "Remediation Tracking",
                                description: "Track remediation of identified issues",
                                steps: ["Review issue log", "Verify completion", "Test effectiveness"]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        id: "fin-ctrl-2",
                        name: "Contract Review Process",
                        description: "Review all contracts before revenue recognition",
                        controlTypes: [
                          {
                            id: "fin-ct-4",
                            name: "Detective Control",
                            description: "Reviews contracts for proper terms",
                            testTemplates: [
                              {
                                id: "fin-tt-10",
                                name: "Contract Compliance Test",
                                description: "Test contracts for compliance with revenue policy",
                                steps: ["Select contract sample", "Review terms", "Verify compliance"]
                              },
                              {
                                id: "fin-tt-11",
                                name: "Revenue Terms Analysis",
                                description: "Analyze revenue recognition terms in contracts",
                                steps: ["Extract contract terms", "Compare to policy", "Document findings"]
                              },
                              {
                                id: "fin-tt-12",
                                name: "Exception Review",
                                description: "Review contracts flagged as exceptions",
                                steps: ["Identify exceptions", "Review justification", "Verify approval"]
                              }
                            ]
                          },
                          {
                            id: "fin-ct-5",
                            name: "Preventive Control",
                            description: "Prevents improper contract terms",
                            testTemplates: [
                              {
                                id: "fin-tt-13",
                                name: "Template Compliance",
                                description: "Verify use of approved contract templates",
                                steps: ["Review templates", "Test usage", "Verify approvals"]
                              },
                              {
                                id: "fin-tt-14",
                                name: "Legal Review Process",
                                description: "Test legal review of contracts",
                                steps: ["Select contracts", "Verify legal review", "Check documentation"]
                              },
                              {
                                id: "fin-tt-15",
                                name: "Automated Controls Test",
                                description: "Test system controls on contract entry",
                                steps: ["Review system rules", "Test validations", "Verify effectiveness"]
                              }
                            ]
                          },
                          {
                            id: "fin-ct-6",
                            name: "Corrective Control",
                            description: "Corrects contract issues",
                            testTemplates: [
                              {
                                id: "fin-tt-16",
                                name: "Amendment Process Test",
                                description: "Test contract amendment procedures",
                                steps: ["Review amendments", "Verify approval", "Check implementation"]
                              },
                              {
                                id: "fin-tt-17",
                                name: "Rework Analysis",
                                description: "Analyze contracts requiring rework",
                                steps: ["Identify rework cases", "Analyze root causes", "Verify corrections"]
                              },
                              {
                                id: "fin-tt-18",
                                name: "Dispute Resolution",
                                description: "Test resolution of contract disputes",
                                steps: ["Review disputes", "Verify resolution", "Check documentation"]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        id: "fin-ctrl-3",
                        name: "Delivery Verification",
                        description: "Verify goods/services delivered before revenue recognition",
                        controlTypes: [
                          {
                            id: "fin-ct-7",
                            name: "Detective Control",
                            description: "Detects delivery issues",
                            testTemplates: [
                              {
                                id: "fin-tt-19",
                                name: "Delivery Documentation Review",
                                description: "Review delivery documentation for completeness",
                                steps: ["Select transactions", "Review proof of delivery", "Verify timing"]
                              },
                              {
                                id: "fin-tt-20",
                                name: "Customer Confirmation",
                                description: "Confirm delivery with customers",
                                steps: ["Select sample", "Send confirmations", "Reconcile responses"]
                              },
                              {
                                id: "fin-tt-21",
                                name: "Shipping Log Review",
                                description: "Review shipping logs for accuracy",
                                steps: ["Extract shipping data", "Compare to revenue", "Investigate variances"]
                              }
                            ]
                          },
                          {
                            id: "fin-ct-8",
                            name: "Preventive Control",
                            description: "Prevents premature revenue recognition",
                            testTemplates: [
                              {
                                id: "fin-tt-22",
                                name: "System Integration Test",
                                description: "Test integration between shipping and revenue systems",
                                steps: ["Review integration", "Test data flow", "Verify accuracy"]
                              },
                              {
                                id: "fin-tt-23",
                                name: "Automated Matching",
                                description: "Test automated matching of delivery to revenue",
                                steps: ["Review matching rules", "Test samples", "Verify effectiveness"]
                              },
                              {
                                id: "fin-tt-24",
                                name: "Hold Process Test",
                                description: "Test revenue hold process for undelivered items",
                                steps: ["Review hold criteria", "Test application", "Verify release process"]
                              }
                            ]
                          },
                          {
                            id: "fin-ct-9",
                            name: "Corrective Control",
                            description: "Corrects delivery-related issues",
                            testTemplates: [
                              {
                                id: "fin-tt-25",
                                name: "Revenue Reversal Test",
                                description: "Test reversal of premature revenue",
                                steps: ["Identify reversals", "Review justification", "Verify correction"]
                              },
                              {
                                id: "fin-tt-26",
                                name: "Redelivery Process",
                                description: "Test process for handling redeliveries",
                                steps: ["Review redelivery cases", "Verify accounting", "Check documentation"]
                              },
                              {
                                id: "fin-tt-27",
                                name: "Credit Memo Review",
                                description: "Review credit memos for delivery issues",
                                steps: ["Select credit memos", "Review reasons", "Verify processing"]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    id: "fin-co-2",
                    name: "Prevent Fictitious Revenue",
                    description: "Ensure all recorded revenue represents actual transactions",
                    controls: [
                      {
                        id: "fin-ctrl-4",
                        name: "Customer Verification",
                        description: "Verify customer existence and creditworthiness",
                        controlTypes: [
                          {
                            id: "fin-ct-10",
                            name: "Detective Control",
                            description: "Detects fictitious customers",
                            testTemplates: [
                              {
                                id: "fin-tt-28",
                                name: "Customer Master Review",
                                description: "Review customer master file for anomalies",
                                steps: ["Extract customer data", "Analyze patterns", "Investigate suspicious entries"]
                              },
                              {
                                id: "fin-tt-29",
                                name: "Duplicate Analysis",
                                description: "Analyze for duplicate customer records",
                                steps: ["Run duplicate detection", "Review matches", "Verify legitimacy"]
                              },
                              {
                                id: "fin-tt-30",
                                name: "Address Verification",
                                description: "Verify customer addresses",
                                steps: ["Select sample", "Verify addresses", "Check for PO boxes"]
                              }
                            ]
                          },
                          {
                            id: "fin-ct-11",
                            name: "Preventive Control",
                            description: "Prevents fictitious customer creation",
                            testTemplates: [
                              {
                                id: "fin-tt-31",
                                name: "New Customer Approval",
                                description: "Test new customer approval process",
                                steps: ["Review approval workflow", "Test sample approvals", "Verify documentation"]
                              },
                              {
                                id: "fin-tt-32",
                                name: "Credit Check Process",
                                description: "Test credit check procedures",
                                steps: ["Review credit policy", "Test credit checks", "Verify compliance"]
                              },
                              {
                                id: "fin-tt-33",
                                name: "Reference Verification",
                                description: "Test customer reference verification",
                                steps: ["Review reference requirements", "Test verification", "Check documentation"]
                              }
                            ]
                          },
                          {
                            id: "fin-ct-12",
                            name: "Corrective Control",
                            description: "Corrects customer data issues",
                            testTemplates: [
                              {
                                id: "fin-tt-34",
                                name: "Customer Cleanup Process",
                                description: "Test customer data cleanup procedures",
                                steps: ["Review cleanup process", "Verify execution", "Check results"]
                              },
                              {
                                id: "fin-tt-35",
                                name: "Inactive Customer Review",
                                description: "Review process for inactive customers",
                                steps: ["Identify inactive customers", "Review status", "Verify archival"]
                              },
                              {
                                id: "fin-tt-36",
                                name: "Data Quality Remediation",
                                description: "Test remediation of data quality issues",
                                steps: ["Review quality issues", "Verify corrections", "Test effectiveness"]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        id: "fin-ctrl-5",
                        name: "Transaction Authorization",
                        description: "Require proper authorization for all revenue transactions",
                        controlTypes: [
                          {
                            id: "fin-ct-13",
                            name: "Detective Control",
                            description: "Detects unauthorized transactions",
                            testTemplates: [
                              {
                                id: "fin-tt-37",
                                name: "Authorization Review",
                                description: "Review authorization on revenue transactions",
                                steps: ["Select transaction sample", "Verify authorization", "Check approval levels"]
                              },
                              {
                                id: "fin-tt-38",
                                name: "Exception Report Review",
                                description: "Review unauthorized transaction reports",
                                steps: ["Extract exception reports", "Investigate items", "Verify resolution"]
                              },
                              {
                                id: "fin-tt-39",
                                name: "Audit Trail Analysis",
                                description: "Analyze audit trails for unauthorized changes",
                                steps: ["Review audit logs", "Identify anomalies", "Investigate findings"]
                              }
                            ]
                          },
                          {
                            id: "fin-ct-14",
                            name: "Preventive Control",
                            description: "Prevents unauthorized transactions",
                            testTemplates: [
                              {
                                id: "fin-tt-40",
                                name: "System Access Controls",
                                description: "Test system access controls",
                                steps: ["Review access rights", "Test restrictions", "Verify segregation"]
                              },
                              {
                                id: "fin-tt-41",
                                name: "Approval Limits Test",
                                description: "Test approval limit enforcement",
                                steps: ["Review approval limits", "Test enforcement", "Verify escalation"]
                              },
                              {
                                id: "fin-tt-42",
                                name: "Workflow Controls",
                                description: "Test workflow control effectiveness",
                                steps: ["Review workflow design", "Test controls", "Verify compliance"]
                              }
                            ]
                          },
                          {
                            id: "fin-ct-15",
                            name: "Corrective Control",
                            description: "Corrects authorization issues",
                            testTemplates: [
                              {
                                id: "fin-tt-43",
                                name: "Unauthorized Transaction Reversal",
                                description: "Test reversal of unauthorized transactions",
                                steps: ["Identify unauthorized items", "Review reversal process", "Verify correction"]
                              },
                              {
                                id: "fin-tt-44",
                                name: "Access Rights Remediation",
                                description: "Test remediation of access rights issues",
                                steps: ["Review access violations", "Verify corrections", "Test effectiveness"]
                              },
                              {
                                id: "fin-tt-45",
                                name: "Policy Violation Response",
                                description: "Test response to policy violations",
                                steps: ["Review violations", "Verify disciplinary action", "Check prevention measures"]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        id: "fin-ctrl-6",
                        name: "Supporting Documentation",
                        description: "Maintain complete supporting documentation for all revenue",
                        controlTypes: [
                          {
                            id: "fin-ct-16",
                            name: "Detective Control",
                            description: "Detects missing documentation",
                            testTemplates: [
                              {
                                id: "fin-tt-46",
                                name: "Documentation Completeness",
                                description: "Test completeness of revenue documentation",
                                steps: ["Select transaction sample", "Review documentation", "Identify gaps"]
                              },
                              {
                                id: "fin-tt-47",
                                name: "Filing System Review",
                                description: "Review document filing and retrieval",
                                steps: ["Test document retrieval", "Review filing system", "Verify accessibility"]
                              },
                              {
                                id: "fin-tt-48",
                                name: "Retention Compliance",
                                description: "Test compliance with retention policies",
                                steps: ["Review retention policy", "Test compliance", "Verify destruction process"]
                              }
                            ]
                          },
                          {
                            id: "fin-ct-17",
                            name: "Preventive Control",
                            description: "Prevents incomplete documentation",
                            testTemplates: [
                              {
                                id: "fin-tt-49",
                                name: "Document Checklist Test",
                                description: "Test use of documentation checklists",
                                steps: ["Review checklist requirements", "Test usage", "Verify completeness"]
                              },
                              {
                                id: "fin-tt-50",
                                name: "System Validation",
                                description: "Test system validation of required documents",
                                steps: ["Review validation rules", "Test enforcement", "Verify effectiveness"]
                              },
                              {
                                id: "fin-tt-51",
                                name: "Training Effectiveness",
                                description: "Test staff training on documentation requirements",
                                steps: ["Review training materials", "Test knowledge", "Verify compliance"]
                              }
                            ]
                          },
                          {
                            id: "fin-ct-18",
                            name: "Corrective Control",
                            description: "Corrects documentation deficiencies",
                            testTemplates: [
                              {
                                id: "fin-tt-52",
                                name: "Document Reconstruction",
                                description: "Test process for reconstructing missing documents",
                                steps: ["Identify missing documents", "Review reconstruction process", "Verify completeness"]
                              },
                              {
                                id: "fin-tt-53",
                                name: "Remediation Tracking",
                                description: "Track remediation of documentation issues",
                                steps: ["Review issue log", "Verify completion", "Test effectiveness"]
                              },
                              {
                                id: "fin-tt-54",
                                name: "Process Improvement",
                                description: "Test implementation of process improvements",
                                steps: ["Review improvements", "Test implementation", "Verify effectiveness"]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    id: "fin-co-3",
                    name: "Ensure Accurate Valuation",
                    description: "Revenue is recorded at the correct amount",
                    controls: [
                      {
                        id: "fin-ctrl-7",
                        name: "Pricing Verification",
                        description: "Verify pricing accuracy for all revenue transactions",
                        controlTypes: [
                          {
                            id: "fin-ct-19",
                            name: "Detective Control",
                            description: "Detects pricing errors",
                            testTemplates: [
                              {
                                id: "fin-tt-55",
                                name: "Price Testing",
                                description: "Test pricing accuracy against approved price lists",
                                steps: ["Select transaction sample", "Compare to price list", "Investigate variances"]
                              },
                              {
                                id: "fin-tt-56",
                                name: "Discount Analysis",
                                description: "Analyze discounts for appropriateness",
                                steps: ["Extract discount data", "Review authorization", "Verify policy compliance"]
                              },
                              {
                                id: "fin-tt-57",
                                name: "Price Override Review",
                                description: "Review manual price overrides",
                                steps: ["Identify overrides", "Review justification", "Verify approval"]
                              }
                            ]
                          },
                          {
                            id: "fin-ct-20",
                            name: "Preventive Control",
                            description: "Prevents pricing errors",
                            testTemplates: [
                              {
                                id: "fin-tt-58",
                                name: "Price List Maintenance",
                                description: "Test price list update procedures",
                                steps: ["Review update process", "Test approvals", "Verify accuracy"]
                              },
                              {
                                id: "fin-tt-59",
                                name: "System Price Controls",
                                description: "Test automated pricing controls",
                                steps: ["Review pricing rules", "Test system controls", "Verify effectiveness"]
                              },
                              {
                                id: "fin-tt-60",
                                name: "Discount Authorization",
                                description: "Test discount authorization controls",
                                steps: ["Review discount policy", "Test authorization", "Verify limits"]
                              }
                            ]
                          },
                          {
                            id: "fin-ct-21",
                            name: "Corrective Control",
                            description: "Corrects pricing errors",
                            testTemplates: [
                              {
                                id: "fin-tt-61",
                                name: "Price Correction Process",
                                description: "Test process for correcting pricing errors",
                                steps: ["Identify pricing errors", "Review correction process", "Verify accuracy"]
                              },
                              {
                                id: "fin-tt-62",
                                name: "Customer Credit Process",
                                description: "Test issuance of credits for pricing errors",
                                steps: ["Review credit requests", "Verify approval", "Check processing"]
                              },
                              {
                                id: "fin-tt-63",
                                name: "Root Cause Analysis",
                                description: "Test root cause analysis of pricing errors",
                                steps: ["Review error analysis", "Verify corrective actions", "Test effectiveness"]
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
                id: "fin-sr-2",
                name: "Revenue Understatement",
                description: "Revenue not recorded or recorded at incorrect amounts",
                controlObjectives: [
                  {
                    id: "fin-co-4",
                    name: "Ensure Revenue Completeness",
                    description: "All revenue transactions are captured",
                    controls: [
                      {
                        id: "fin-ctrl-8",
                        name: "Completeness Reconciliation",
                        description: "Reconcile revenue to source documents",
                        controlTypes: [
                          {
                            id: "fin-ct-22",
                            name: "Detective Control",
                            description: "Detects missing revenue",
                            testTemplates: [
                              {
                                id: "fin-tt-64",
                                name: "Reconciliation Testing",
                                description: "Test reconciliation procedures",
                                steps: ["Review reconciliation", "Test completeness", "Verify resolution"]
                              },
                              {
                                id: "fin-tt-65",
                                name: "Gap Analysis",
                                description: "Analyze for gaps in revenue recording",
                                steps: ["Compare sources", "Identify gaps", "Investigate causes"]
                              },
                              {
                                id: "fin-tt-66",
                                name: "Sequence Testing",
                                description: "Test numerical sequence of transactions",
                                steps: ["Review sequence", "Identify breaks", "Investigate missing items"]
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
                id: "fin-sr-3",
                name: "Improper Revenue Classification",
                description: "Revenue recorded in incorrect accounts or categories",
                controlObjectives: [
                  {
                    id: "fin-co-5",
                    name: "Ensure Proper Classification",
                    description: "Revenue is classified correctly",
                    controls: [
                      {
                        id: "fin-ctrl-9",
                        name: "Account Classification Review",
                        description: "Review revenue account classifications",
                        controlTypes: [
                          {
                            id: "fin-ct-23",
                            name: "Detective Control",
                            description: "Detects classification errors",
                            testTemplates: [
                              {
                                id: "fin-tt-67",
                                name: "Classification Testing",
                                description: "Test revenue classification accuracy",
                                steps: ["Select sample", "Review classification", "Verify correctness"]
                              },
                              {
                                id: "fin-tt-68",
                                name: "Account Analysis",
                                description: "Analyze account activity for anomalies",
                                steps: ["Review account activity", "Identify unusual items", "Investigate"]
                              },
                              {
                                id: "fin-tt-69",
                                name: "Reclassification Review",
                                description: "Review reclassification entries",
                                steps: ["Identify reclassifications", "Review justification", "Verify approval"]
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
            id: "fin-ra-2",
            name: "Cash Management",
            description: "Risks related to cash handling and management",
            specificRisks: [
              {
                id: "fin-sr-4",
                name: "Cash Theft or Misappropriation",
                description: "Unauthorized access or theft of cash",
                controlObjectives: [
                  {
                    id: "fin-co-6",
                    name: "Safeguard Cash Assets",
                    description: "Protect cash from theft or loss",
                    controls: [
                      {
                        id: "fin-ctrl-10",
                        name: "Physical Security Controls",
                        description: "Secure physical access to cash",
                        controlTypes: [
                          {
                            id: "fin-ct-24",
                            name: "Preventive Control",
                            description: "Prevents unauthorized access",
                            testTemplates: [
                              {
                                id: "fin-tt-70",
                                name: "Access Control Testing",
                                description: "Test physical access controls",
                                steps: ["Review access procedures", "Test controls", "Verify effectiveness"]
                              },
                              {
                                id: "fin-tt-71",
                                name: "Safe Custody Review",
                                description: "Review safe custody procedures",
                                steps: ["Inspect safes", "Review access logs", "Test procedures"]
                              },
                              {
                                id: "fin-tt-72",
                                name: "Dual Control Testing",
                                description: "Test dual control requirements",
                                steps: ["Review dual control policy", "Test compliance", "Verify documentation"]
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
            id: "fin-ra-3",
            name: "Accounts Payable",
            description: "Risks in the accounts payable process",
            specificRisks: [
              {
                id: "fin-sr-5",
                name: "Duplicate Payments",
                description: "Same invoice paid multiple times",
                controlObjectives: [
                  {
                    id: "fin-co-7",
                    name: "Prevent Duplicate Payments",
                    description: "Ensure invoices are paid only once",
                    controls: [
                      {
                        id: "fin-ctrl-11",
                        name: "Duplicate Detection System",
                        description: "System checks for duplicate invoices",
                        controlTypes: [
                          {
                            id: "fin-ct-25",
                            name: "Preventive Control",
                            description: "Prevents duplicate entry",
                            testTemplates: [
                              {
                                id: "fin-tt-73",
                                name: "System Duplicate Check",
                                description: "Test system duplicate detection",
                                steps: ["Review detection rules", "Test with duplicates", "Verify blocking"]
                              },
                              {
                                id: "fin-tt-74",
                                name: "Invoice Matching Test",
                                description: "Test three-way matching process",
                                steps: ["Select sample", "Test matching", "Verify accuracy"]
                              },
                              {
                                id: "fin-tt-75",
                                name: "Payment Hold Review",
                                description: "Review payment hold procedures",
                                steps: ["Review hold criteria", "Test application", "Verify release"]
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
        id: "fin-prog-2",
        name: "Treasury Management",
        description: "Management of cash, investments, and financial risks",
        riskAreas: [
          {
            id: "fin-ra-4",
            name: "Investment Management",
            description: "Risks related to investment activities",
            specificRisks: [
              {
                id: "fin-sr-6",
                name: "Unauthorized Investments",
                description: "Investments made outside policy guidelines",
                controlObjectives: [
                  {
                    id: "fin-co-8",
                    name: "Ensure Investment Compliance",
                    description: "All investments comply with policy",
                    controls: [
                      {
                        id: "fin-ctrl-12",
                        name: "Investment Policy Compliance",
                        description: "Review investments against policy",
                        controlTypes: [
                          {
                            id: "fin-ct-26",
                            name: "Detective Control",
                            description: "Detects policy violations",
                            testTemplates: [
                              {
                                id: "fin-tt-76",
                                name: "Policy Compliance Review",
                                description: "Review investments for policy compliance",
                                steps: ["Review investment policy", "Test sample", "Verify compliance"]
                              },
                              {
                                id: "fin-tt-77",
                                name: "Authorization Review",
                                description: "Review investment authorizations",
                                steps: ["Select investments", "Review approvals", "Verify authority"]
                              },
                              {
                                id: "fin-tt-78",
                                name: "Exception Analysis",
                                description: "Analyze investment exceptions",
                                steps: ["Identify exceptions", "Review justification", "Verify approval"]
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
        id: "fin-prog-3",
        name: "Fixed Assets",
        description: "Management and accounting for fixed assets",
        riskAreas: [
          {
            id: "fin-ra-5",
            name: "Asset Acquisition",
            description: "Risks in acquiring fixed assets",
            specificRisks: [
              {
                id: "fin-sr-7",
                name: "Unauthorized Asset Purchases",
                description: "Assets purchased without proper authorization",
                controlObjectives: [
                  {
                    id: "fin-co-9",
                    name: "Ensure Proper Authorization",
                    description: "All asset purchases are authorized",
                    controls: [
                      {
                        id: "fin-ctrl-13",
                        name: "Purchase Authorization Process",
                        description: "Require authorization for asset purchases",
                        controlTypes: [
                          {
                            id: "fin-ct-27",
                            name: "Preventive Control",
                            description: "Prevents unauthorized purchases",
                            testTemplates: [
                              {
                                id: "fin-tt-79",
                                name: "Authorization Testing",
                                description: "Test purchase authorization process",
                                steps: ["Review authorization policy", "Test sample", "Verify compliance"]
                              },
                              {
                                id: "fin-tt-80",
                                name: "Budget Compliance",
                                description: "Test budget compliance for purchases",
                                steps: ["Review budget", "Test purchases", "Verify within budget"]
                              },
                              {
                                id: "fin-tt-81",
                                name: "Approval Workflow",
                                description: "Test approval workflow effectiveness",
                                steps: ["Review workflow", "Test controls", "Verify compliance"]
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
    programs: [
      {
        id: "mkt-prog-1",
        name: "Campaign Management",
        description: "Planning, execution, and measurement of marketing campaigns",
        riskAreas: [
          {
            id: "mkt-ra-1",
            name: "Budget Management",
            description: "Risks related to marketing budget allocation and spending",
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
                                steps: ["Extract spending data", "Compare to budget", "Investigate variances"]
                              },
                              {
                                id: "mkt-tt-2",
                                name: "Monthly Budget Review",
                                description: "Review monthly budget reports",
                                steps: ["Review reports", "Identify overruns", "Document findings"]
                              },
                              {
                                id: "mkt-tt-3",
                                name: "Trend Analysis",
                                description: "Analyze spending trends",
                                steps: ["Extract historical data", "Identify trends", "Project future spend"]
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
                                steps: ["Review approval policy", "Test enforcement", "Verify compliance"]
                              },
                              {
                                id: "mkt-tt-5",
                                name: "Purchase Order Controls",
                                description: "Test PO approval process",
                                steps: ["Review PO process", "Test approvals", "Verify budget check"]
                              },
                              {
                                id: "mkt-tt-6",
                                name: "System Budget Controls",
                                description: "Test system budget enforcement",
                                steps: ["Review system controls", "Test budget blocks", "Verify effectiveness"]
                              }
                            ]
                          },
                          {
                            id: "mkt-ct-3",
                            name: "Corrective Control",
                            description: "Corrects budget issues",
                            testTemplates: [
                              {
                                id: "mkt-tt-7",
                                name: "Budget Reallocation",
                                description: "Test budget reallocation process",
                                steps: ["Review reallocation requests", "Verify approval", "Check implementation"]
                              },
                              {
                                id: "mkt-tt-8",
                                name: "Spending Freeze Process",
                                description: "Test spending freeze procedures",
                                steps: ["Review freeze criteria", "Test implementation", "Verify effectiveness"]
                              },
                              {
                                id: "mkt-tt-9",
                                name: "Corrective Action Plans",
                                description: "Review corrective action plans",
                                steps: ["Review action plans", "Verify implementation", "Test effectiveness"]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        id: "mkt-ctrl-2",
                        name: "Vendor Contract Management",
                        description: "Manage vendor contracts and commitments",
                        controlTypes: [
                          {
                            id: "mkt-ct-4",
                            name: "Detective Control",
                            description: "Detects contract issues",
                            testTemplates: [
                              {
                                id: "mkt-tt-10",
                                name: "Contract Compliance Review",
                                description: "Review vendor contract compliance",
                                steps: ["Select contracts", "Review terms", "Verify compliance"]
                              },
                              {
                                id: "mkt-tt-11",
                                name: "Invoice Verification",
                                description: "Verify invoices against contracts",
                                steps: ["Select invoices", "Compare to contracts", "Identify discrepancies"]
                              },
                              {
                                id: "mkt-tt-12",
                                name: "Contract Expiration Review",
                                description: "Review expiring contracts",
                                steps: ["Identify expiring contracts", "Review renewal status", "Verify decisions"]
                              }
                            ]
                          },
                          {
                            id: "mkt-ct-5",
                            name: "Preventive Control",
                            description: "Prevents contract issues",
                            testTemplates: [
                              {
                                id: "mkt-tt-13",
                                name: "Contract Approval Process",
                                description: "Test contract approval procedures",
                                steps: ["Review approval policy", "Test sample contracts", "Verify compliance"]
                              },
                              {
                                id: "mkt-tt-14",
                                name: "Legal Review Process",
                                description: "Test legal review of contracts",
                                steps: ["Review legal requirements", "Test compliance", "Verify documentation"]
                              },
                              {
                                id: "mkt-tt-15",
                                name: "Contract Template Usage",
                                description: "Test use of approved templates",
                                steps: ["Review templates", "Test usage", "Verify compliance"]
                              }
                            ]
                          },
                          {
                            id: "mkt-ct-6",
                            name: "Corrective Control",
                            description: "Corrects contract issues",
                            testTemplates: [
                              {
                                id: "mkt-tt-16",
                                name: "Contract Amendment Process",
                                description: "Test contract amendment procedures",
                                steps: ["Review amendments", "Verify approval", "Check implementation"]
                              },
                              {
                                id: "mkt-tt-17",
                                name: "Dispute Resolution",
                                description: "Test vendor dispute resolution",
                                steps: ["Review disputes", "Verify resolution", "Check documentation"]
                              },
                              {
                                id: "mkt-tt-18",
                                name: "Contract Termination",
                                description: "Test contract termination process",
                                steps: ["Review terminations", "Verify procedures", "Check compliance"]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        id: "mkt-ctrl-3",
                        name: "Campaign ROI Tracking",
                        description: "Track return on investment for campaigns",
                        controlTypes: [
                          {
                            id: "mkt-ct-7",
                            name: "Detective Control",
                            description: "Detects poor ROI",
                            testTemplates: [
                              {
                                id: "mkt-tt-19",
                                name: "ROI Analysis",
                                description: "Analyze campaign ROI",
                                steps: ["Extract campaign data", "Calculate ROI", "Compare to targets"]
                              },
                              {
                                id: "mkt-tt-20",
                                name: "Performance Metrics Review",
                                description: "Review campaign performance metrics",
                                steps: ["Review metrics", "Identify underperformers", "Analyze causes"]
                              },
                              {
                                id: "mkt-tt-21",
                                name: "Attribution Analysis",
                                description: "Analyze marketing attribution",
                                steps: ["Review attribution model", "Test accuracy", "Verify calculations"]
                              }
                            ]
                          },
                          {
                            id: "mkt-ct-8",
                            name: "Preventive Control",
                            description: "Prevents poor ROI",
                            testTemplates: [
                              {
                                id: "mkt-tt-22",
                                name: "Campaign Approval Process",
                                description: "Test campaign approval requirements",
                                steps: ["Review approval criteria", "Test process", "Verify compliance"]
                              },
                              {
                                id: "mkt-tt-23",
                                name: "Target Setting Process",
                                description: "Test ROI target setting",
                                steps: ["Review target methodology", "Test reasonableness", "Verify approval"]
                              },
                              {
                                id: "mkt-tt-24",
                                name: "Pre-Campaign Analysis",
                                description: "Test pre-campaign analysis requirements",
                                steps: ["Review analysis requirements", "Test compliance", "Verify quality"]
                              }
                            ]
                          },
                          {
                            id: "mkt-ct-9",
                            name: "Corrective Control",
                            description: "Corrects ROI issues",
                            testTemplates: [
                              {
                                id: "mkt-tt-25",
                                name: "Campaign Optimization",
                                description: "Test campaign optimization process",
                                steps: ["Review optimization actions", "Verify implementation", "Test results"]
                              },
                              {
                                id: "mkt-tt-26",
                                name: "Budget Reallocation",
                                description: "Test reallocation from poor performers",
                                steps: ["Review reallocation decisions", "Verify approval", "Check implementation"]
                              },
                              {
                                id: "mkt-tt-27",
                                name: "Campaign Termination",
                                description: "Test early termination of poor campaigns",
                                steps: ["Review termination criteria", "Test decisions", "Verify execution"]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    id: "mkt-co-2",
                    name: "Ensure Budget Accuracy",
                    description: "Marketing budgets are accurate and realistic",
                    controls: [
                      {
                        id: "mkt-ctrl-4",
                        name: "Budget Planning Process",
                        description: "Structured process for budget planning",
                        controlTypes: [
                          {
                            id: "mkt-ct-10",
                            name: "Preventive Control",
                            description: "Prevents inaccurate budgets",
                            testTemplates: [
                              {
                                id: "mkt-tt-28",
                                name: "Planning Process Review",
                                description: "Review budget planning procedures",
                                steps: ["Review planning process", "Test methodology", "Verify assumptions"]
                              },
                              {
                                id: "mkt-tt-29",
                                name: "Historical Analysis",
                                description: "Test use of historical data",
                                steps: ["Review historical analysis", "Test accuracy", "Verify adjustments"]
                              },
                              {
                                id: "mkt-tt-30",
                                name: "Market Research Integration",
                                description: "Test integration of market research",
                                steps: ["Review research usage", "Test incorporation", "Verify impact"]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    id: "mkt-co-3",
                    name: "Optimize Budget Allocation",
                    description: "Budget is allocated to highest value activities",
                    controls: [
                      {
                        id: "mkt-ctrl-5",
                        name: "Portfolio Analysis",
                        description: "Analyze marketing portfolio for optimization",
                        controlTypes: [
                          {
                            id: "mkt-ct-11",
                            name: "Detective Control",
                            description: "Identifies optimization opportunities",
                            testTemplates: [
                              {
                                id: "mkt-tt-31",
                                name: "Portfolio Review",
                                description: "Review marketing portfolio mix",
                                steps: ["Analyze portfolio", "Identify opportunities", "Recommend changes"]
                              },
                              {
                                id: "mkt-tt-32",
                                name: "Channel Effectiveness",
                                description: "Analyze channel effectiveness",
                                steps: ["Review channel performance", "Compare channels", "Identify best performers"]
                              },
                              {
                                id: "mkt-tt-33",
                                name: "Competitive Analysis",
                                description: "Analyze competitive spending",
                                steps: ["Review competitive data", "Compare allocation", "Identify gaps"]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
