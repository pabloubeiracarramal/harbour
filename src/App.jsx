import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Login from './pages/Login/Login'
import Deploys from './pages/Deploys'
import Server from './pages/Server'
import Docker from './pages/Docker/Docker'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth/github/callback" element={<Login />} />
          {/* Add a future landing & info page */}

          {/* Protected routes */}
          <Route path="/server" element={<ProtectedRoute><Server /></ProtectedRoute>} />
          <Route path="/deploys" element={<ProtectedRoute><Deploys /></ProtectedRoute>} />
          <Route path="/docker" element={<ProtectedRoute><Docker /></ProtectedRoute>} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
