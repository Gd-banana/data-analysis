import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import ThinkingModels from './pages/ThinkingModels'
import Controversies from './pages/Controversies'
import Projects from './pages/Projects'
import Tools from './pages/Tools'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#F5F7FA]">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/thinking-models" element={<ThinkingModels />} />
          <Route path="/controversies" element={<Controversies />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/tools" element={<Tools />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
