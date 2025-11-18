import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SwimGame from "./components/SwimGame";
import Basics from "./components/Basics";
import Strokes from "./components/Strokes";
import Breathing from "./components/Breathing";
import Safety from "./components/Safety";
import Quiz from "./components/Quiz";
import Progress from "./components/Progress";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<SwimGame />} />
          <Route path="/basics" element={<Basics />} />
          <Route path="/strokes" element={<Strokes />} />
          <Route path="/breathing" element={<Breathing />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/progress" element={<Progress />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
