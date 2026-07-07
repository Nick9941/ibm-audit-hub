import React, { useState } from 'react'

function AuditChatbot() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Floating button */}
      <button
        className="chatbot-fab"
        onClick={() => setOpen(!open)}
        aria-label="Ask Audit chatbot"
      >
        {open ? '✕' : '💬'}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="chatbot-panel">
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <span className="chatbot-title">Ask Audit</span>
              <span className="chatbot-status">AI Assistant</span>
            </div>
            <button
              className="chatbot-close"
              onClick={() => setOpen(false)}
              aria-label="Close chatbot"
            >
              ✕
            </button>
          </div>

          <div className="chatbot-body">
            <div className="chatbot-message bot">
              <div className="chatbot-bubble">
                👋 Hello! I'm the <strong>Ask Audit</strong> assistant. I can help you navigate the IBM Audit Hub, find relevant risks, controls, and test templates.
              </div>
            </div>
            <div className="chatbot-message bot">
              <div className="chatbot-bubble">
                This feature is coming soon. Check back for AI-powered audit guidance.
              </div>
            </div>
          </div>

          <div className="chatbot-footer">
            <input
              type="text"
              className="chatbot-input"
              placeholder="Ask a question... (coming soon)"
              disabled
            />
            <button className="chatbot-send" disabled>→</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AuditChatbot

// Made with Bob
