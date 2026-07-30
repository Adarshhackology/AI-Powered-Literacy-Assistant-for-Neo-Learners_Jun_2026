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

// Learn with AI Module imports
import LearnWithAI from './pages/LearnWithAI';
import AILanguageSelect from './pages/AILanguageSelect';
import AIAssessment from './pages/AIAssessment';
import AIScoreResults from './pages/AIScoreResults';
import AIWeakAreas from './pages/AIWeakAreas';
import AILearningPlan from './pages/AILearningPlan';
import AIPracticeModule from './pages/AIPracticeModule';
import AISuggestions from './pages/AISuggestions';
import AIRetest from './pages/AIRetest';
import AIComparison from './pages/AIComparison';
import GamificationStore from './pages/GamificationStore';
import Leaderboard from './pages/Leaderboard';

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
        <Route path="/store" element={<GamificationStore />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Learn with AI Routes */}
        <Route path="/learn-with-ai" element={<LearnWithAI />} />
        <Route path="/learn-with-ai/language" element={<AILanguageSelect />} />
        <Route path="/learn-with-ai/assessment/:sessionId" element={<AIAssessment />} />
        <Route path="/learn-with-ai/scores/:sessionId" element={<AIScoreResults />} />
        <Route path="/learn-with-ai/weak-areas/:sessionId" element={<AIWeakAreas />} />
        <Route path="/learn-with-ai/plan/:sessionId" element={<AILearningPlan />} />
        <Route path="/learn-with-ai/practice/:sessionId/:moduleId" element={<AIPracticeModule />} />
        <Route path="/learn-with-ai/suggestions/:sessionId/:moduleId" element={<AISuggestions />} />
        <Route path="/learn-with-ai/retest/:sessionId" element={<AIRetest />} />
        <Route path="/learn-with-ai/comparison/:sessionId" element={<AIComparison />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
