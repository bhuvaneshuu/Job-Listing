import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import JobsPage from './pages/JobsPage'
import CreateJobPage from './pages/CreateJobPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/jobs" replace />} />
      <Route path="/jobs" element={<JobsPage />} />
      <Route path="/jobs/new" element={<CreateJobPage />} />
    </Routes>
  )
}

export default App
