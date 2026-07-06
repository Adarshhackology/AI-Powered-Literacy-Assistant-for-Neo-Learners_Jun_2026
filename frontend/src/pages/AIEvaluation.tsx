import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Award, ArrowRight, BrainCircuit, CheckCircle } from 'lucide-react';

export default function AIEvaluation() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<'loading' | 'results'>('loading');
  const [loadingStep, setLoadingStep] = useState(0);

  const [scores, setScores] = useState({
    reading: 0,
    writing: 0,
    speaking: 0,
    vocabulary: 0,
    overall: 0
  });

  const loadingMessages = [
    { title: 'Analyzing Reading Skills...', speed: 1200 },
    { title: 'Calculating Writing & Grammar Proficiency...', speed: 1200 },
    { title: 'Evaluating Comprehension & Vocabulary...', speed: 1200 },
    { title: 'Formulating Personalized Learning Curriculum...', speed: 1000 }
  ];

  useEffect(() => {
    // Load assessment results from local storage
    const assessmentStr = localStorage.getItem('assessmentResult');
    const profileStr = localStorage.getItem('user');
    
    if (assessmentStr && profileStr) {
      const assessment = JSON.parse(assessmentStr);
      const userObj = JSON.parse(profileStr);
      
      const speakingVal = parseInt(userObj.profile?.speakingConfidence || '50');
      
      setScores({
        reading: assessment.readingScore || 75,
        writing: assessment.writingScore || 45,
        speaking: speakingVal || 52,
        vocabulary: assessment.comprehensionScore || 60,
        overall: assessment.overallScore || 58
      });
    } else {
      // Fallback defaults
      setScores({
        reading: 75,
        writing: 45,
        speaking: 52,
        vocabulary: 60,
        overall: 58
      });
    }
  }, []);

  useEffect(() => {
    if (phase === 'loading') {
      if (loadingStep < loadingMessages.length) {
        const timer = setTimeout(() => {
          setLoadingStep(prev => prev + 1);
        }, loadingMessages[loadingStep].speed);
        return () => clearTimeout(timer);
      } else {
        setPhase('results');
      }
    }
  }, [loadingStep, phase]);

  const getTierName = (score: number) => {
    if (score >= 80) return 'Advanced Master';
    if (score >= 60) return 'Achiever Explorer';
    if (score >= 40) return 'Intermediate Learner';
    return 'Novice Beginner';
  };

  const getRecommendation = (score: number) => {
    if (score < 40) {
      return 'Focus 20 minutes daily on Alphabet sounds and basic trace writing lessons.';
    } else if (score < 70) {
      return 'Practice interactive voice speaking logs and sentence structure grammar drills.';
    } else {
      return 'Try reading advanced paragraph stories and writing complex summary notes.';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6 flex flex-col items-center justify-center relative">
      <div className="absolute top-10 left-10 w-48 h-48 bg-blue-300/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-indigo-300/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-xl w-full bg-white border border-slate-100 p-8 md:p-10 rounded-3xl shadow-2xl relative z-10">
        {phase === 'loading' ? (
          <div className="space-y-8 py-6">
            {/* Loading Header */}
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto shadow-md">
                <BrainCircuit className="w-8 h-8 animate-spin" />
              </div>
              <h2 className="text-2xl font-black text-slate-900">AI Tutor Analysis</h2>
              <p className="text-slate-500 font-semibold text-sm">Evaluating your assessment responses...</p>
            </div>

            {/* Steps Progress Tracker */}
            <div className="space-y-5">
              {loadingMessages.map((msg, index) => (
                <div key={index} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className={`${index <= loadingStep ? 'text-slate-800' : 'text-slate-300'}`}>
                      {msg.title}
                    </span>
                    {index < loadingStep ? (
                      <span className="text-emerald-600 font-black">✓ Done</span>
                    ) : index === loadingStep ? (
                      <span className="text-blue-600 animate-pulse">Running...</span>
                    ) : (
                      <span className="text-slate-300">Queued</span>
                    )}
                  </div>
                  <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-1000 ${
                        index < loadingStep ? 'w-full' : index === loadingStep ? 'w-2/3 animate-pulse' : 'w-0'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-fade-in">
            {/* Success Header */}
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                <Award className="w-9 h-9" />
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Your Skills Profile</h2>
              <p className="text-slate-500 font-semibold">AI Recommended Level: <span className="text-blue-600 font-black">{getTierName(scores.overall)}</span></p>
            </div>

            {/* Skills breakdown bars */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Skill Category Breakdown</h3>

              <div className="space-y-4">
                {/* Reading */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>📖 Reading Proficiency</span>
                    <span className="text-blue-600">{scores.reading}%</span>
                  </div>
                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${scores.reading}%` }} />
                  </div>
                </div>

                {/* Writing */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>✍ Writing & Spelling</span>
                    <span className="text-emerald-600">{scores.writing}%</span>
                  </div>
                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${scores.writing}%` }} />
                  </div>
                </div>

                {/* Speaking */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>🎤 Speaking Confidence</span>
                    <span className="text-amber-600">{scores.speaking}%</span>
                  </div>
                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: `${scores.speaking}%` }} />
                  </div>
                </div>

                {/* Vocabulary */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>🧠 Comprehension & Vocab</span>
                    <span className="text-indigo-600">{scores.vocabulary}%</span>
                  </div>
                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${scores.vocabulary}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Recommended Plan Alert */}
            <div className="bg-blue-50 border border-blue-100 p-5 rounded-2xl space-y-2">
              <h4 className="text-xs font-black text-blue-800 uppercase tracking-wide flex items-center gap-1">
                <Sparkles className="w-4.5 h-4.5" />
                <span>AI Tutor Daily Learning Plan</span>
              </h4>
              <p className="text-sm font-semibold text-slate-700 leading-relaxed">
                {getRecommendation(scores.overall)}
              </p>
            </div>

            {/* Dashboard redirect button */}
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-base font-extrabold py-4 rounded-2xl hover:shadow-xl hover:shadow-blue-500/20 active:scale-95 transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Go to Learner Dashboard</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
