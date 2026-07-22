import React from 'react'
import { Link } from 'react-router-dom'

function AskAuditPage() {
  return (
    <div className="library-page">
      <div className="library-header">
        <h1 className="library-title">Ask Audit</h1>
        <p className="library-subtitle">AI-powered audit assistant — coming soon</p>
      </div>

      <div className="ask-audit-page">
        <div className="ask-audit-card">
          <div className="ask-audit-icon">💬</div>
          <h2 className="ask-audit-heading">Ask Audit Assistant</h2>
          <p className="ask-audit-desc">
            The Ask Audit AI assistant will allow you to search for risks, controls, and test
            templates using natural language. Ask questions like:
          </p>
          <ul className="ask-audit-examples">
            <li>"What are the key risks in Accounts Payable?"</li>
            <li>"Show me test templates for journal entry controls"</li>
            <li>"What controls exist for cybersecurity?"</li>
            <li>"Find all detective controls in the Finance program"</li>
          </ul>
          <div className="ask-audit-coming-soon">
            🚧 This feature is under development
          </div>
        </div>
      </div>
    </div>
  )
}

export default AskAuditPage

// Made with Bob
