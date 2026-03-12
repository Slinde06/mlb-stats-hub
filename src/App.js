import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ComparisonPage from "./pages/ComparisonPage";
import TimelinePage from "./pages/TimelinePage";

function App() {
  return (
    <Router>
      <nav class="navigationbar">
        <Link to="/">Home</Link> | 
        <Link to="/compare">Compare</Link> | 
        <Link to="/timeline">Timeline</Link>
      </nav>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/compare" element={<ComparisonPage />} />
        <Route path="/timeline" element={<TimelinePage />} />
      </Routes>
    </Router>
  );
}

export default App;

