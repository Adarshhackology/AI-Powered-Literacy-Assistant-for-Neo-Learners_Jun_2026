import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../utils/api';
import { 
  ArrowLeft, Volume2, Mic, CheckCircle, Trophy, Sparkles 
} from 'lucide-react';
import { vocabCategories, VocabItem } from '../utils/vocabData';

export default function Vocabulary() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'guest';
  
  const [profile, setProfile] = useState<any>({ xp: 100, coins: 20 });
  const [selectedCategory, setSelectedCategory] = useState<string>('Fruits & Food');
  const [learningLang, setLearningLang] = useState<string>('hindi');
  
  // Voice Practice states
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [score, setScore] = useState<number | null>(null);
  const [practiceStatus, setPracticeStatus] = useState<string>('');
  const [unlockedItems, setUnlockedItems] = useState<string[]>([]);

  useEffect(() => {
    const savedLang = localStorage.getItem('preferredLanguage') || 'hindi';
    setLearningLang(savedLang);

    const loadProfile = async () => {
      try {
        const prof = await apiClient.getProfile(username);
        setProfile(prof);
      } catch (err) {
        console.error(err);
      }
    };
    loadProfile();
  }, [username]);

  const getTranslation = (item: VocabItem) => {
    return item.translations[learningLang] || item.translations['hindi'] || item.english;
  };

  const playAudio = (text: string, langCode = 'en-US') => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langCode;
      utterance.rate = 0.85; // slower for kids to absorb sounds
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text to speech not supported in this browser.');
    }
  };

  const handleSpeechPractice = (item: VocabItem) => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser. Try Chrome.');
      return;
    }

    window.speechSynthesis.cancel();
    setActiveItem(item.english);
    setIsListening(true);
    setScore(null);
    setPracticeStatus('Listening... Speak now! 🎙️');

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = async (event: any) => {
      const speechToText = event.results[0][0].transcript.toLowerCase().trim();
      const targetText = item.english.toLowerCase().trim();

      setIsListening(false);
      setPracticeStatus(`You said: "${speechToText}"`);

      // Simple fuzzy comparison
      if (speechToText === targetText) {
        setScore(100);
        await awardXPAchievement(item.english);
      } else if (speechToText.includes(targetText) || targetText.includes(speechToText)) {
        setScore(80);
        await awardXPAchievement(item.english);
      } else {
        setScore(40);
      }
    };

    recognition.onerror = (e: any) => {
      console.error(e);
      setIsListening(false);
      setPracticeStatus('Oops! Couldn\'t hear clearly. Try again! 🎤');
    };

    recognition.start();
  };

  const awardXPAchievement = async (itemName: string) => {
    if (unlockedItems.includes(itemName)) return;

    const newUnlocked = [...unlockedItems, itemName];
    setUnlockedItems(newUnlocked);

    try {
      const updatedProfile = {
        ...profile,
        xp: (profile.xp || 0) + 5,
        coins: (profile.coins || 0) + 1,
      };
      
      const res = await apiClient.saveProfile(username, updatedProfile);
      if (res) {
        setProfile(res);
      }
    } catch (err) {
      console.error('Failed to save profile gamification progress:', err);
    }
  };

  const getScoreBadge = (sc: number) => {
    if (sc === 100) return { label: '🎉 Awesome!', color: 'bg-green-100 text-green-800 border-green-200' };
    if (sc >= 85) return { label: '🌟 Great Job!', color: 'bg-emerald-100 text-emerald-800 border-emerald-250' };
    if (sc >= 70) return { label: '⭐ Good Try!', color: 'bg-yellow-100 text-yellow-800 border-yellow-250' };
    return { label: '💪 Keep Trying!', color: 'bg-orange-50 text-orange-850 border-orange-200' };
  };


  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* Visual Header Banner */}
      <header className="bg-white border-b-4 border-slate-100 px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/dashboard')}
            className="w-11 h-11 bg-slate-50 hover:bg-slate-100 text-slate-600 border-b-4 border-2 border-slate-150 rounded-2xl flex items-center justify-center cursor-pointer transition-all active:border-b-0 active:mt-1 hover-pop"
          >
            <ArrowLeft className="w-5 h-5 text-slate-500" />
          </button>
          <div>
            <h1 className="text-xl font-black text-slate-900 flex items-center gap-1.5 leading-none">
              <Sparkles className="w-5 h-5 text-yellow-500 animate-float" />
              NEO Sticker Album 🎨
            </h1>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider mt-1">Unlock stickers by reading and speaking aloud!</p>
          </div>
        </div>

        {/* Gamification coins / XP */}
        <div className="flex items-center gap-3 text-xs font-black">
          <span className="flex items-center gap-1.5 text-yellow-600 bg-yellow-50 border-2 border-yellow-100 px-3.5 py-2 rounded-2xl shadow-sm hover-pop">
            🪙 <span>{profile.coins}</span>
          </span>
          <span className="flex items-center gap-1.5 text-indigo-600 bg-indigo-50 border-2 border-indigo-100 px-3.5 py-2 rounded-2xl shadow-sm hover-pop">
            🏆 <span>{profile.xp} XP</span>
          </span>
        </div>
      </header>

      {/* Main Sticker Board */}
      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        
        {/* Category sticker filters */}
        <div className="bg-white border-4 border-slate-100 p-5 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.015)] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 border-2 border-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-xl font-bold shadow-sm rotate-[-3deg]">
              📂
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-800">Choose Sticker Category</h3>
              <p className="text-[10px] text-slate-400 font-extrabold">Tap a set to change dictionary items</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {Object.keys(vocabCategories).map((catName) => {
              const isActive = selectedCategory === catName;
              return (
                <button
                  key={catName}
                  onClick={() => {
                    setSelectedCategory(catName);
                    setActiveItem(null);
                    setScore(null);
                    setPracticeStatus('');
                  }}
                  className={`px-4.5 py-2.5 rounded-2xl text-xs font-black border-2 border-b-6 transition-all cursor-pointer hover-pop active:border-b-0 active:mt-1.5 ${
                    isActive 
                      ? 'bg-gradient-to-r from-indigo-500 to-blue-500 border-indigo-750 text-white shadow-md shadow-indigo-600/10' 
                      : 'bg-slate-50 border-slate-200 text-slate-650 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {catName}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bubbly Stickers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {vocabCategories[selectedCategory].map((item, idx) => {
            const isCompleted = unlockedItems.includes(item.english);
            const isPracticeFocus = activeItem === item.english;
            return (
              <div 
                key={idx}
                className={`border-4 border-b-8 rounded-[36px] p-6 flex flex-col items-center text-center relative transition-all duration-300 shadow-sm hover-pop ${
                  isCompleted 
                    ? 'border-emerald-500 bg-emerald-50/15 shadow-emerald-250/20' 
                    : isPracticeFocus 
                      ? 'border-indigo-400 bg-indigo-50/15'
                      : 'border-slate-200 bg-white hover:border-slate-350'
                }`}
              >
                {/* sticker unlocked badge */}
                {isCompleted && (
                  <span className="absolute top-4 right-4 text-emerald-600 text-[10px] font-black bg-emerald-50 border-2 border-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm rotate-[5deg]">
                    <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>LEARNT</span>
                  </span>
                )}

                {/* Big cute icon container */}
                <div className="w-24 h-24 bg-white border-4 border-slate-100 rounded-[32px] flex items-center justify-center text-5xl mb-4 shadow-sm overflow-hidden rotate-[-2deg] shrink-0 hover:rotate-[2deg] transition-all">
                  {item.image ? (
                    <img src={item.image} alt={item.english} className="w-16 h-16 object-contain" />
                  ) : (
                    <span>{item.emoji}</span>
                  )}
                </div>

                {/* Word names */}
                <div className="space-y-1.5">
                  <h3 className="text-xl font-black text-slate-850 tracking-tight leading-none">{item.english}</h3>
                  <p className="text-indigo-600 font-extrabold text-xs tracking-wide bg-indigo-50 border-2 border-indigo-100 px-3.5 py-1.5 rounded-2xl inline-block shadow-sm">
                    {getTranslation(item)}
                  </p>
                </div>

                {/* Listen and speak buttons */}
                <div className="w-full mt-6 pt-5 border-t-2 border-slate-100 flex gap-2.5">
                  <button
                    onClick={() => playAudio(item.english)}
                    className="flex-1 bg-slate-50 hover:bg-slate-100 border-2 border-b-4 border-slate-200 text-slate-650 font-black py-2.5 rounded-2xl transition-all cursor-pointer text-xs flex items-center justify-center gap-1.5 active:border-b-0 active:mt-1"
                    title="Listen to word sound"
                  >
                    <Volume2 className="w-4 h-4 text-slate-550" />
                    <span>Listen 🔊</span>
                  </button>

                  <button
                    onClick={() => handleSpeechPractice(item)}
                    disabled={isListening}
                    className="flex-1 bg-gradient-to-r from-pink-500 to-indigo-500 hover:from-pink-600 hover:to-indigo-650 text-white font-black py-2.5 border-b-4 border-indigo-700/80 rounded-2xl shadow-sm active:border-b-0 active:mt-1 transition-all cursor-pointer text-xs flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    <Mic className="w-4 h-4" />
                    <span>Speak 🎤</span>
                  </button>
                </div>

                {/* Speak Practice Score Dialog */}
                {isPracticeFocus && (
                  <div className="w-full mt-4 bg-white border-2 border-slate-150 rounded-3xl p-3.5 space-y-2 z-10 shadow-inner">
                    <p className="text-[10px] font-black text-slate-450 uppercase tracking-wide leading-none">{practiceStatus}</p>
                    {score !== null && (
                      <div className="flex flex-col items-center gap-1.5 pt-1">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border-2 ${getScoreBadge(score).color}`}>
                            {getScoreBadge(score).label}
                          </span>
                        </div>
                        {score >= 70 && (
                          <span className="text-[10px] font-black text-emerald-600 animate-bounce flex items-center gap-0.5">
                            <Trophy className="w-3.5 h-3.5" /> +5 XP Sticker!
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )}

              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
