import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Home from './pages/Home'
import Deploys from './pages/Deploys'
import Server from './pages/Server'
import Docker from './pages/Docker/Docker'

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/deploys" element={<Deploys />} />
          <Route path="/server" element={<Server />} />
          <Route path="/docker" element={<Docker />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
