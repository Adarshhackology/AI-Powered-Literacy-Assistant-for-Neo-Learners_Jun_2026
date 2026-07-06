import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../utils/api';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface LevelOption {
  levelNum: number;
  title: string;
  name: string;
  image: string;
  description: string;
  readingScore: number;
  writingScore: number;
  speakingScore: number;
  vocabScore: number;
}

const levelsList: LevelOption[] = [
  {
    levelNum: 1,
    title: 'Beginner',
    name: 'Alphabet Sounds',
    image: '/level_alphabet_1783340004005.png',
    description: 'Learn basic letters, shapes, and phone sounds.',
    readingScore: 20,
    writingScore: 10,
    speakingScore: 25,
    vocabScore: 15
  },
  {
    levelNum: 2,
    title: 'Learner',
    name: 'Simple Words',
    image: '/level_words_1783340019724.png',
    description: 'Read and spell basic 3-4 letter words (cat, dog, sun).',
    readingScore: 40,
    writingScore: 35,
    speakingScore: 45,
    vocabScore: 42
  },
  {
    levelNum: 3,
    title: 'Explorer',
    name: 'Short Sentences',
    image: '/level_sentences_1783340032385.png',
    description: 'Form and read simple daily sentences.',
    readingScore: 60,
    writingScore: 50,
    speakingScore: 58,
    vocabScore: 62
  },
  {
    levelNum: 4,
    title: 'Achiever',
    name: 'Short Stories',
    image: '/level_stories_1783340046772.png',
    description: 'Read and summarize simple short story narratives and tales.',
    readingScore: 75,
    writingScore: 65,
    speakingScore: 70,
    vocabScore: 72
  },
  {
    levelNum: 5,
    title: 'Master',
    name: 'News & Signboards',
    image: '/level_newspaper_1783340060913.png',
    description: 'Read news columns, filling out government and job forms.',
    readingScore: 88,
    writingScore: 80,
    speakingScore: 82,
    vocabScore: 85
  },
  {
    levelNum: 6,
    title: 'Expert',
    name: 'Full Proficiency',
    image: '/level_mastery_1783340074714.png',
    description: 'Advanced reading, writing and confident speaking drills.',
    readingScore: 95,
    writingScore: 92,
    speakingScore: 90,
    vocabScore: 96
  }
];

export default function LevelSelection() {
  const [selected, setSelected] = useState<number>(2);
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'guest';

  const handleSelectLevel = async () => {
    const selectedLevelObj = levelsList.find(l => l.levelNum === selected);
    if (!selectedLevelObj) return;

    try {
      // Save level scores to assessment results
      const results = {
        readingScore: selectedLevelObj.readingScore,
        writingScore: selectedLevelObj.writingScore,
        comprehensionScore: selectedLevelObj.vocabScore,
        overallScore: Math.round((selectedLevelObj.readingScore + selectedLevelObj.writingScore + selectedLevelObj.vocabScore) / 3),
        completedAt: new Date().toISOString()
      };
      localStorage.setItem('assessmentResult', JSON.stringify(results));

      // Get profile and save updated details
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user.profile) {
        user.profile.readingLevel = selectedLevelObj.title;
        user.profile.writingLevel = selectedLevelObj.title;
        user.profile.level = selectedLevelObj.levelNum;
        user.profile.xp = (user.profile.xp || 0) + 30; // onboarding bonus
        localStorage.setItem('user', JSON.stringify(user));

        // Update in profiles db
        const profiles = JSON.parse(localStorage.getItem('profiles') || '[]');
        const idx = profiles.findIndex((p: any) => p.username === username);
        if (idx !== -1) {
          profiles[idx] = { ...profiles[idx], ...user.profile };
          localStorage.setItem('profiles', JSON.stringify(profiles));
        }
      }

      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6 flex flex-col items-center justify-center relative">
      <div className="absolute top-10 left-10 w-48 h-48 bg-blue-300/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-indigo-300/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl w-full bg-white border border-slate-100 p-8 md:p-10 rounded-3xl shadow-2xl relative z-10 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-100 text-blue-700 font-bold px-4 py-1.5 rounded-full text-xs">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span>Fast Track Onboarding</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Choose Your Learning Level</h1>
          <p className="text-slate-500 font-medium max-w-xl mx-auto">
            Select the image that matches what you can read best. We will customize your dashboard immediately!
          </p>
        </div>

        {/* Level Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {levelsList.map((level) => (
            <div
              key={level.levelNum}
              onClick={() => setSelected(level.levelNum)}
              className={`border-2 p-5 rounded-3xl cursor-pointer transition-all flex flex-col justify-between hover:scale-[1.02] duration-300 bg-white ${
                selected === level.levelNum
                  ? 'border-blue-600 shadow-xl shadow-blue-500/10 ring-2 ring-blue-500/20'
                  : 'border-slate-100 hover:border-slate-300 shadow-sm'
              }`}
            >
              <div className="space-y-4">
                {/* Level Image */}
                <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center border border-slate-100">
                  <img
                    src={level.image}
                    alt={level.name}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      // Fallback emoji if image fails to render
                      (e.target as any).style.display = 'none';
                    }}
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Level {level.levelNum}</span>
                    <span className="text-xs font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{level.title}</span>
                  </div>
                  <h3 className="text-lg font-black text-slate-950 leading-snug">{level.name}</h3>
                  <p className="text-slate-500 text-xs font-semibold leading-relaxed">{level.description}</p>
                </div>
              </div>

              {/* Selector marker */}
              <div className="pt-4 flex justify-end">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  selected === level.levelNum
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-slate-200'
                }`}>
                  {selected === level.levelNum && '✓'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-100">
          <button
            onClick={() => navigate('/assessment')}
            className="text-sm font-extrabold text-slate-600 hover:text-blue-600 hover:underline px-4 py-2"
          >
            I want to take a test instead 📝
          </button>

          <button
            onClick={handleSelectLevel}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-base px-8 py-3.5 rounded-2xl shadow-xl shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Confirm & Start Study</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
