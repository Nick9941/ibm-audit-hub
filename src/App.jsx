import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import FlowchartPage from './pages/FlowchartPage'
import DetailPage from './pages/DetailPage'
import ProgramListPage from './pages/ProgramListPage'
import RiskLibraryPage from './pages/RiskLibraryPage'
import TestLibraryPage from './pages/TestLibraryPage'
import NavMenu from './components/NavMenu'
import AuditChatbot from './components/AuditChatbot'
import AskAuditPage from './pages/AskAuditPage'
import { EditProvider } from './context/EditContext'
import ibmLogo from './assets/ibm logo.png'

function App() {
  return (
    <EditProvider>
    <div className="app">
      <header className="site-header">
        <div className="site-header-left">
          <img className="brand-logo" src={ibmLogo} alt="IBM" />
          <div className="brand-divider" />
          <span className="brand-text">Corporate Assurance & Advisory Services</span>
        </div>
        <NavMenu />
      </header>
      <div className="page-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/function/:functionId" element={<FlowchartPage />} />
          <Route path="/detail/:functionId/:path" element={<DetailPage />} />
          <Route path="/programs" element={<ProgramListPage />} />
          <Route path="/risk-library" element={<RiskLibraryPage />} />
          <Route path="/test-library" element={<TestLibraryPage />} />
          <Route path="/ask-audit" element={<AskAuditPage />} />
        </Routes>
      </div>
      <AuditChatbot />
    </div>
    </EditProvider>
  )
}

export default App

// Made with Bob
