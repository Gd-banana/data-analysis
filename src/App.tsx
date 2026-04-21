import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Home from "@/pages/Home";
import ThinkingModels from "@/pages/ThinkingModels";
import Controversies from "@/pages/Controversies";
import Projects from "@/pages/Projects";
import Tools from "@/pages/Tools";
import LearnHome from "@/pages/LearnHome";
import LearnStage from "@/pages/LearnStage";
import { useTheme } from "@/hooks/useTheme";

export default function App() {
  const { theme } = useTheme();
  
  return (
    <Router>
      <div className={`min-h-screen transition-colors ${theme}`}>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/thinking-models" element={<ThinkingModels />} />
          <Route path="/controversies" element={<Controversies />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/learn" element={<LearnHome />} />
          <Route path="/learn/stage-:stageId" element={<LearnStage />} />
        </Routes>
      </div>
    </Router>
  );
}
