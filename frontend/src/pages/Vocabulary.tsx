import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../utils/api';
import { ArrowLeft, Volume2, Mic, CheckCircle, Sparkles } from 'lucide-react';
import { vocabCategories, VocabItem } from '../utils/vocabData';
import { Sparkle, BadgeSVG } from '../components/UI/Illustrations';

export default function Vocabulary() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'guest';
  
  const [profile, setProfile] = useState<any>({ xp: 100, coins: 20 });
  const [selectedCategory, setSelectedCategory] = useState<string>('Fruits & Food');
  const [learningLang, setLearningLang] = useState<string>('hindi');
  
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
      utterance.rate = 0.85;
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

  return (
    <div style={{
      minHeight: '100vh',
      background: '#1A0A4E',
      backgroundImage: `
        radial-gradient(circle at 10% 20%, rgba(108,76,255,0.4) 0%, transparent 40%),
        radial-gradient(circle at 90% 80%, rgba(255,79,163,0.3) 0%, transparent 40%),
        radial-gradient(circle at 50% 50%, rgba(77,157,255,0.2) 0%, transparent 60%)
      `,
      padding: '20px',
      position: 'relative',
    }}>

      {/* Background Star Field */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {[
          { t: '5%', l: '8%', s: 12 }, { t: '12%', l: '90%', s: 16 },
          { t: '25%', l: '3%', s: 14 }, { t: '45%', l: '95%', s: 10 },
          { t: '70%', l: '4%', s: 18 }, { t: '88%', l: '92%', s: 14 },
        ].map((st, i) => (
          <div key={i} className="animate-twinkle" style={{
            position: 'absolute', top: st.t, left: st.l,
            animationDelay: `${i * 0.4}s`, opacity: 0.7,
          }}>
            <Sparkle size={st.s} color={i % 2 === 0 ? '#FFD54A' : '#C4B5F4'} />
          </div>
        ))}
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* Top Glass Nav Bar */}
        <nav style={{
          height: '64px',
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '0 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          border: '1.5px solid rgba(255,255,255,0.6)',
        }}>
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-3d"
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              color: '#1e1040', textDecoration: 'none',
              fontFamily: 'Poppins', fontWeight: 900, fontSize: '14px',
              background: '#F0F4FF', padding: '8px 16px', borderRadius: '12px',
              border: '1px solid #E8EFFF', cursor: 'pointer',
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '22px' }}>📓</span>
            <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '18px', color: '#1e1040' }}>
              NEO Sticker Album 🎨
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: '#FFFDF0', border: '1.5px solid #FFD54A', borderRadius: '99px', padding: '4px 12px', fontFamily: 'Poppins', fontWeight: 900, fontSize: '12px', color: '#1e1040' }}>
              🪙 {profile.coins}
            </div>
            <div style={{ background: '#EDE7F6', border: '1.5px solid #6C4CFF', borderRadius: '99px', padding: '4px 12px', fontFamily: 'Poppins', fontWeight: 900, fontSize: '12px', color: '#6C4CFF' }}>
              🏆 {profile.xp} XP
            </div>
          </div>
        </nav>

        {/* Sticker Category Tabs Bar */}
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '16px 20px',
          border: '1.5px solid rgba(255,255,255,0.6)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          display: 'flex', flexDirection: 'column', gap: '12px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '20px' }}>📂</span>
            <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '15px', color: '#1e1040' }}>
              Choose Sticker Category
            </span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
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
                  className="btn-3d"
                  style={{
                    background: isActive ? 'linear-gradient(135deg, #6C4CFF, #8A5CFF)' : '#F0F4FF',
                    color: isActive ? 'white' : '#1e1040',
                    border: isActive ? 'none' : '1px solid #E8EFFF',
                    borderBottom: isActive ? '3.5px solid #4D2FCC' : '1px solid #E8EFFF',
                    borderRadius: '14px', padding: '8px 16px',
                    fontFamily: 'Poppins', fontWeight: 900, fontSize: '12px',
                    cursor: 'pointer', boxShadow: isActive ? '0 4px 14px rgba(108,76,255,0.4)' : 'none',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {catName}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sticker Cards Grid (4 Columns) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {vocabCategories[selectedCategory].map((item, idx) => {
            const isCompleted = unlockedItems.includes(item.english);
            const isPracticeFocus = activeItem === item.english;
            return (
              <div
                key={idx}
                className="hover-lift"
                style={{
                  background: 'white',
                  borderRadius: '24px',
                  padding: '20px',
                  border: isCompleted ? '2.5px solid #22C55E' : isPracticeFocus ? '2.5px solid #6C4CFF' : '1.5px solid #E8EFFF',
                  boxShadow: isCompleted ? '0 8px 24px rgba(34,197,94,0.2)' : '0 8px 24px rgba(0,0,0,0.06)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '12px',
                  position: 'relative',
                }}
              >
                {isCompleted && (
                  <span style={{
                    position: 'absolute', top: '12px', right: '12px',
                    background: '#DCFCE7', color: '#166534',
                    fontFamily: 'Poppins', fontWeight: 900, fontSize: '10px',
                    padding: '2px 8px', borderRadius: '99px', border: '1px solid #86EFAC',
                  }}>
                    ✓ LEARNT
                  </span>
                )}

                {/* Cute 3D Sticker Avatar */}
                <div className="animate-bobble" style={{
                  width: '80px', height: '80px', borderRadius: '20px',
                  background: 'linear-gradient(135deg, #EDE7F6, #FFF0F9)',
                  border: '2px solid #E8EFFF', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '42px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                }}>
                  {item.image ? (
                    <img src={item.image} alt={item.english} style={{ width: '56px', height: '56px', objectFit: 'contain' }} />
                  ) : (
                    <span>{item.emoji}</span>
                  )}
                </div>

                <div>
                  <h3 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '18px', color: '#1e1040', margin: '0 0 2px' }}>
                    {item.english}
                  </h3>
                  <div style={{
                    background: '#EDE7F6', color: '#6C4CFF',
                    fontFamily: 'Poppins', fontWeight: 800, fontSize: '12px',
                    padding: '2px 10px', borderRadius: '99px', display: 'inline-block',
                  }}>
                    {getTranslation(item)}
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', width: '100%', marginTop: '4px' }}>
                  <button
                    onClick={() => playAudio(item.english)}
                    className="btn-3d"
                    style={{
                      background: '#F0F4FF', border: '1px solid #E8EFFF',
                      color: '#1e1040', fontFamily: 'Poppins', fontWeight: 900, fontSize: '11px',
                      padding: '8px', borderRadius: '12px', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
                    }}
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Listen
                  </button>

                  <button
                    onClick={() => handleSpeechPractice(item)}
                    disabled={isListening}
                    className="btn-3d"
                    style={{
                      background: 'linear-gradient(135deg, #FF4FA3, #6C4CFF)',
                      color: 'white', fontFamily: 'Poppins', fontWeight: 900, fontSize: '11px',
                      padding: '8px', borderRadius: '12px', border: 'none',
                      cursor: isListening ? 'not-allowed' : 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
                    }}
                  >
                    <Mic className="w-3.5 h-3.5" /> Speak
                  </button>
                </div>

                {isPracticeFocus && (
                  <div style={{ background: '#FFFDF0', border: '1px solid #FFD54A', borderRadius: '12px', padding: '8px', width: '100%', fontFamily: 'Nunito', fontWeight: 800, fontSize: '11px', color: '#1e1040' }}>
                    {practiceStatus}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
