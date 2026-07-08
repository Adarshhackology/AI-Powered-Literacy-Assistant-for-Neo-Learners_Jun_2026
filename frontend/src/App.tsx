import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LanguageSelection from './pages/LanguageSelection';
import Login from './pages/Login';
import Register from './pages/Register';
import ProfileSetup from './pages/ProfileSetup';
import LevelSelection from './pages/LevelSelection';
import Assessment from './pages/Assessment';
import AIEvaluation from './pages/AIEvaluation';
import Dashboard from './pages/Dashboard';
import LessonView from './pages/LessonView';
import VoicePractice from './pages/VoicePractice';
import Reports from './pages/Reports';
import AdminDashboard from './pages/AdminDashboard';
import Vocabulary from './pages/Vocabulary';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/select-language" element={<LanguageSelection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/level-selection" element={<LevelSelection />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/ai-evaluation" element={<AIEvaluation />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/lesson/:id" element={<LessonView />} />
        <Route path="/voice-practice" element={<VoicePractice />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/vocabulary" element={<Vocabulary />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
