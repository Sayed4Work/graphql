import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/login.jsx";
import Dashboard from "./pages/dashboard.jsx";
import NotFoundPage from "./pages/notFound.jsx";
import './assets/css/global.css'; // Adjust the path based on where the CSS file is located

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <Dashboard />
          }
        />       
        <Route path="*" element={<NotFoundPage />} /> {/* Handles all other paths */}
      </Routes>
    </Router>
  );
}

export default App;
