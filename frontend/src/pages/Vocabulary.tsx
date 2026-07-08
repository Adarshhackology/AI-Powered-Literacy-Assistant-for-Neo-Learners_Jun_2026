import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../utils/api';
import { SupportedLanguage } from '../utils/translationHelper';
import { 
  ArrowLeft, Volume2, Mic, CheckCircle, Trophy, Sparkles, BookOpen 
} from 'lucide-react';

interface VocabItem {
  emoji: string;
  english: string;
  translations: Record<string, string>;
  image?: string;
}

const vocabCategories: Record<string, VocabItem[]> = {
  'Fruits & Food': [
    { emoji: '🍎', english: 'Apple', translations: { hindi: 'सेब (Seb)', tamil: 'ஆப்பிள் (Āppiḷ)', telugu: 'ఆపిల్ (Āpil)', kannada: 'ಸೇಬು (Sēbu)' }, image: '/vocab_apple.png' },
    { emoji: '🍌', english: 'Banana', translations: { hindi: 'केला (Kela)', tamil: 'வாழைப்பழם (Vāḻaippaḻam)', telugu: 'అరటిపండు (Araṭipaṇḍu)', kannada: 'ಬಾಳೆಹಣ್ಣು (Bāḷehaṇṇu)' }, image: '/vocab_banana.png' },
    { emoji: '🥛', english: 'Milk', translations: { hindi: 'दूध (Doodh)', tamil: 'பால் (Pāl)', telugu: 'పాలు (Pālu)', kannada: 'ಹಾಲು (Hālu)' } },
    { emoji: '🍞', english: 'Bread', translations: { hindi: 'रोटी (Roti)', tamil: 'ರொட்டி (Roṭṭi)', telugu: 'రొట్టె (Roṭṭe)', kannada: 'ರೊಟ್ಟಿ (Roṭṭi)' } },
    { emoji: '🥚', english: 'Egg', translations: { hindi: 'अंडा (Anda)', tamil: 'முட்டை (Muṭṭai)', telugu: 'గుడ్డు (Guḍḍu)', kannada: 'ಮೊಟ್ಟೆ (Moṭṭe)' } },
  ],
  'Common Objects': [
    { emoji: '🔑', english: 'Key', translations: { hindi: 'चाबी (Chabi)', tamil: 'சாவி (Cāvi)', telugu: 'తాళం (Tāḷaṁ)', kannada: 'ಕೀಲಿ (Kīli)' } },
    { emoji: '📚', english: 'Book', translations: { hindi: 'किताब (Kitab)', tamil: 'புத்தகம் (Puttakam)', telugu: 'పుస్తకం (Pustakaṁ)', kannada: 'ಪುಸ್ತಕ (Pustaka)' }, image: '/vocab_book.png' },
    { emoji: '🖊️', english: 'Pen', translations: { hindi: 'कलम (Kalam)', tamil: 'பேனா (Pēṉā)', telugu: 'పెన్ (Pen)', kannada: 'ಪೆನ್ (Pen)' } },
    { emoji: '📱', english: 'Phone', translations: { hindi: 'मोबाइल (Mobile)', tamil: 'கைபேசி (Kaipeci)', telugu: 'ఫోన్ (Phōn)', kannada: 'ಮೊಬೈಲ್ (Mobile)' } },
    { emoji: '👓', english: 'Glasses', translations: { hindi: 'चश्मा (Chashma)', tamil: 'கண்ணாடி (Kaṇṇāṭi)', telugu: 'కళ్ళజోడు (Kaḷḷajōḍu)', kannada: 'ಕನ್ನಡಕ (Kannaḍaka)' } },
  ],
  'Animals': [
    { emoji: '🐶', english: 'Dog', translations: { hindi: 'कुत्ता (Kutta)', tamil: 'நாய் (Nāy)', telugu: 'కుక్క (Kukka)', kannada: 'ನಾಯಿ (Nāyi)' } },
    { emoji: '🐱', english: 'Cat', translations: { hindi: 'बिल्ली (Billi)', tamil: 'பூனை (Pūṉai)', telugu: 'పిల్లి (Pilli)', kannada: 'ಬೆಕ್ಕು (Bekku)' } },
    { emoji: '🐮', english: 'Cow', translations: { hindi: 'गाय (Gaay)', tamil: 'பசு (Pacu)', telugu: 'ఆవు (Āvu)', kannada: 'ಹಸು (Hasu)' } },
    { emoji: '🦁', english: 'Lion', translations: { hindi: 'शेर (Sher)', tamil: 'சிங்கம் (Ciṅkam)', telugu: 'సింహం (Siṁhaṁ)', kannada: 'ಸಿಂಹ (Siṁha)' } },
  ],
  'Public Places': [
    { emoji: '🏥', english: 'Hospital', translations: { hindi: 'अस्पताल (Aspatal)', tamil: 'மருத்துவமனை (Maruttuvamaṉai)', telugu: 'ఆసుపత్రి (Āsupatri)', kannada: 'ಆಸ್ಪತ್ರೆ (Āspatre)' }, image: '/vocab_hospital.png' },
    { emoji: '🏫', english: 'School', translations: { hindi: 'स्कूल (School)', tamil: 'பள்ளி (Paḷḷi)', telugu: 'పాఠశాల (Pāṭhaśāla)', kannada: 'ಶಾಲೆ (Śāle)' } },
    { emoji: '🏪', english: 'Shop', translations: { hindi: 'दुकान (Dukan)', tamil: 'கடை (Kaṭai)', telugu: 'దుకాణం (Dukāṇaṁ)', kannada: 'ಅಂಗಡಿ (Aṅgaḍi)' } },
    { emoji: '🌳', english: 'Park', translations: { hindi: 'उद्यान / पार्क', tamil: 'பூங்கா (Pūṅkā)', telugu: 'ఉద్యానవనం (Udyānavanaṁ)', kannada: 'ಉದ್ಯಾನ (Udyāna)' } },
  ]
};

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
      utterance.rate = 0.9;
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
    setPracticeStatus('Listening... Speak now!');

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
      setPracticeStatus('Error capturing audio. Try again.');
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

  return (
    <div className="min-h-screen bg-slate-50 font-inter">
      {/* Top Banner Header */}
      <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/dashboard')}
            className="w-10 h-10 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center border border-slate-100 cursor-pointer transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-500" />
              Visual Vocabulary Explorer
            </h1>
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Learn words with pictures & voice</p>
          </div>
        </div>

        {/* Stats indicators */}
        <div className="flex items-center gap-4 text-xs font-bold">
          <span className="flex items-center gap-1.5 text-yellow-600 bg-yellow-50 px-3 py-2 rounded-full border border-yellow-100 shadow-sm">
            🪙 <span>{profile.coins}</span>
          </span>
          <span className="flex items-center gap-1.5 text-blue-600 bg-blue-50 px-3 py-2 rounded-full border border-blue-100 shadow-sm">
            🏆 <span>{profile.xp} XP</span>
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        
        {/* Filter Controls Row */}
        <div className="bg-white border border-slate-200/50 p-5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">Select Category</h3>
              <p className="text-xs text-slate-400 font-semibold">Switch sets to learn different topics</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {Object.keys(vocabCategories).map((catName) => (
              <button
                key={catName}
                onClick={() => {
                  setSelectedCategory(catName);
                  setActiveItem(null);
                  setScore(null);
                  setPracticeStatus('');
                }}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === catName 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-600/10' 
                    : 'bg-slate-50 border border-slate-200/80 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {catName}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {vocabCategories[selectedCategory].map((item, idx) => {
            const isCompleted = unlockedItems.includes(item.english);
            const isPracticeFocus = activeItem === item.english;
            
            return (
              <div 
                key={idx}
                className={`bg-white border rounded-[28px] p-6 flex flex-col items-center text-center relative transition-all duration-300 shadow-sm ${
                  isCompleted 
                    ? 'border-emerald-200 bg-emerald-50/10 ring-4 ring-emerald-500/5' 
                    : isPracticeFocus 
                      ? 'border-indigo-300 bg-indigo-50/10 ring-4 ring-indigo-500/5'
                      : 'border-slate-200/60 hover:shadow-md hover:border-slate-300'
                }`}
              >
                {/* Badge completion indicator */}
                {isCompleted && (
                  <span className="absolute top-4 right-4 text-emerald-600 text-xs font-extrabold bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-100">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Learnt</span>
                  </span>
                )}

                {/* Big Visual Symbol */}
                <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center text-5xl mb-4 shadow-inner overflow-hidden">
                  {item.image ? (
                    <img src={item.image} alt={item.english} className="w-14 h-14 object-contain" />
                  ) : (
                    <span>{item.emoji}</span>
                  )}
                </div>

                {/* Words */}
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-slate-900 tracking-tight">{item.english}</h3>
                  <p className="text-indigo-600 font-bold text-sm tracking-wide bg-indigo-50/50 px-3 py-1 rounded-xl inline-block border border-indigo-100/50">
                    {getTranslation(item)}
                  </p>
                </div>

                {/* Interactive Speech & audio */}
                <div className="w-full mt-6 pt-5 border-t border-slate-100 flex gap-2">
                  <button
                    onClick={() => playAudio(item.english)}
                    className="flex-1 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-slate-600 font-bold py-3 rounded-2xl transition-all cursor-pointer text-xs flex items-center justify-center gap-1.5"
                    title="Listen to pronunciation"
                  >
                    <Volume2 className="w-4 h-4 text-slate-500" />
                    <span>Listen</span>
                  </button>

                  <button
                    onClick={() => handleSpeechPractice(item)}
                    disabled={isListening}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 rounded-2xl shadow-sm hover:shadow-indigo-600/10 active:scale-95 transition-all cursor-pointer text-xs flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    <Mic className="w-4 h-4" />
                    <span>Practice</span>
                  </button>
                </div>

                {/* Feedback area */}
                {isPracticeFocus && (
                  <div className="w-full mt-4 bg-white border border-slate-100 rounded-2xl p-3.5 space-y-1.5 z-10 shadow-inner">
                    <p className="text-[11px] font-bold text-slate-500 leading-tight uppercase tracking-wider">{practiceStatus}</p>
                    {score !== null && (
                      <div className="flex items-center justify-center gap-1">
                        <span className={`text-xs font-black px-2.5 py-1 rounded-full border ${
                          score >= 80 
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-100' 
                            : 'bg-amber-50 text-amber-800 border-amber-100'
                        }`}>
                          Score: {score}%
                        </span>
                        {score >= 80 && (
                          <span className="text-xs font-bold text-emerald-600 animate-bounce flex items-center gap-0.5">
                            <Trophy className="w-3.5 h-3.5" /> +5 XP
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
