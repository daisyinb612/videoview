import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { IndicatorProvider } from './context/IndicatorContext'
import EditIndicators from './pages/EditIndicators'
import PreviewIndicators from './pages/PreviewIndicators'
import Report from './pages/Report'
import Chat from './pages/Chat'
import './App.css'

function App() {
  return (
    <IndicatorProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<EditIndicators />} />
            <Route path="/preview" element={<PreviewIndicators />} />
            <Route path="/report" element={<Report />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </IndicatorProvider>
  )
}

export default App

