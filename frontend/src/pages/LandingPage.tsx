import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SupportedLanguage, translations } from '../utils/translationHelper';
import { Sparkle, TrophySVG, RobotMascot } from '../components/UI/Illustrations';

export default function LandingPage() {
  const navigate = useNavigate();
  const [lang, setLang] = useState<SupportedLanguage>('english');
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('preferredLanguage') as SupportedLanguage;
    if (saved) {
      setLang(saved);
    }
  }, []);

  const handleLangChange = (newLang: SupportedLanguage) => {
    setLang(newLang);
    localStorage.setItem('preferredLanguage', newLang);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      localStorage.setItem('username', email);
      localStorage.setItem('user', JSON.stringify({ username: email, first_name: email }));
    }
    navigate('/dashboard');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #E0F2FE 0%, #F0F9FF 30%, #F5F3FF 70%, #FAF5FF 100%)',
      fontFamily: 'Nunito, sans-serif',
      color: '#1E293B',
      position: 'relative',
      overflowX: 'hidden',
    }}>

      {/* ── TOP NAVBAR ── */}
      <header style={{
        height: '68px',
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(20px)',
        borderBottom: '2px solid #E2E8F0',
        padding: '0 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 50,
        boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
      }}>
        {/* Left Logo */}
        <div onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
          <div style={{
            width: '42px', height: '42px', borderRadius: '14px',
            background: 'linear-gradient(135deg, #FFD54A, #FF9F43)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '22px', boxShadow: '0 4px 14px rgba(255,159,67,0.4)',
          }}>
            📖
          </div>
          <div>
            <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '18px', color: '#1e1040', lineHeight: 1.1 }}>
              NeoLit Adventure
            </div>
            <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '9.5px', color: '#FF9F43', letterSpacing: '0.5px' }}>
              AI Literacy Adventure for Kids
            </div>
          </div>
        </div>

        {/* Center Nav Pills */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          background: '#F1F5F9', padding: '4px 8px', borderRadius: '99px',
          border: '1px solid #E2E8F0',
        }}>
          {[
            { label: 'Home', icon: '🏠', route: '/' },
            { label: 'Playground', icon: '🎯', route: '/dashboard' },
            { label: 'Features', icon: '💡', route: '/learn-with-ai' },
            { label: 'Achievements', icon: '🏅', route: '/reports' },
            { label: 'Sticker Album', icon: '📓', route: '/vocabulary' },
            { label: 'League', icon: '🏆', route: '/leaderboard' },
          ].map((item, i) => (
            <button
              key={i}
              onClick={() => navigate(item.route)}
              style={{
                background: i === 0 ? 'white' : 'transparent',
                color: i === 0 ? '#6C4CFF' : '#64748B',
                border: 'none', borderRadius: '99px',
                padding: '6px 14px',
                fontFamily: 'Poppins', fontWeight: 800, fontSize: '12px',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px',
                boxShadow: i === 0 ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.15s ease',
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Right Action buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Language Selector */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            background: '#F8FAFF', border: '1.5px solid #E2E8F0',
            borderRadius: '99px', padding: '5px 12px',
            fontFamily: 'Poppins', fontWeight: 800, fontSize: '12px', color: '#334155',
          }}>
            <span>🌐</span>
            <select
              value={lang}
              onChange={(e) => handleLangChange(e.target.value as SupportedLanguage)}
              style={{ background: 'transparent', border: 'none', outline: 'none', fontFamily: 'Poppins', fontWeight: 800, fontSize: '12px', color: '#334155', cursor: 'pointer' }}
            >
              <option value="english">English (US)</option>
              <option value="hindi">Hindi (हिंदी)</option>
              <option value="telugu">Telugu (తెలుగు)</option>
              <option value="tamil">Tamil (தமிழ்)</option>
            </select>
          </div>

          <button
            onClick={() => navigate('/login')}
            className="btn-3d"
            style={{
              background: 'white', color: '#1e1040',
              border: '1.5px solid #E2E8F0', borderRadius: '99px',
              padding: '8px 18px',
              fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            Login
          </button>

          <button
            onClick={() => navigate('/register')}
            className="btn-3d"
            style={{
              background: 'linear-gradient(135deg, #6C4CFF, #8A5CFF)', color: 'white',
              border: 'none', borderBottom: '3.5px solid #4D2FCC',
              borderRadius: '99px', padding: '8px 20px',
              fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px',
              cursor: 'pointer', boxShadow: '0 4px 14px rgba(108,76,255,0.4)',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}
          >
            <span>👤 Register</span>
          </button>
        </div>
      </header>

      {/* ── HERO MAIN SECTION (2 COLUMNS) ── */}
      <section style={{
        maxWidth: '1280px', margin: '0 auto',
        padding: '40px 24px 50px',
        display: 'grid', gridTemplateColumns: '1.2fr 1fr',
        gap: '40px', alignItems: 'center',
        position: 'relative',
      }}>

        {/* ══ COLUMN 1: Text & CTAs ══ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: '#FFFDE7', color: '#B45309',
            border: '1.5px solid #FFE082', borderRadius: '99px',
            padding: '5px 14px', width: 'fit-content',
            fontFamily: 'Poppins', fontWeight: 900, fontSize: '11px',
            boxShadow: '0 2px 8px rgba(255,213,74,0.3)',
          }}>
            ⭐ Learn. Speak. Play. Grow!
          </div>

          <h1 style={{
            fontFamily: 'Poppins', fontWeight: 900, fontSize: '42px',
            color: '#1e1040', lineHeight: 1.15, margin: 0,
          }}>
            Read, Speak & <span style={{ color: '#FF4FA3' }}>Play</span> with <span style={{ color: '#6C4CFF' }}>Words!</span>
          </h1>

          <p style={{
            fontFamily: 'Nunito', fontWeight: 700, fontSize: '14px',
            color: '#475569', lineHeight: 1.6, margin: 0,
          }}>
            Welcome to your magical literacy lab! NeoLit is an educational playground that helps you master letters, trace sentences, and practice conversations with interactive sticker rewards!
          </p>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px' }}>
            <button
              onClick={() => navigate('/register')}
              className="btn-3d"
              style={{
                background: 'linear-gradient(135deg, #6C4CFF, #8A5CFF)',
                color: 'white',
                fontFamily: 'Poppins', fontWeight: 900, fontSize: '14px',
                padding: '12px 24px', borderRadius: '16px',
                border: 'none', borderBottom: '4px solid #4D2FCC',
                cursor: 'pointer', boxShadow: '0 8px 24px rgba(108,76,255,0.4)',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}
            >
              🚀 Start Learning Now
            </button>

            <button
              onClick={() => navigate('/dashboard')}
              className="btn-3d"
              style={{
                background: 'white',
                color: '#6C4CFF',
                fontFamily: 'Poppins', fontWeight: 900, fontSize: '14px',
                padding: '12px 20px', borderRadius: '16px',
                border: '2px solid #6C4CFF',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
              }}
            >
              ▶ Explore Playground
            </button>
          </div>

          {/* Loved by learners pill */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            background: 'white', borderRadius: '99px',
            padding: '6px 14px', border: '1.5px solid #E2E8F0',
            width: 'fit-content', marginTop: '8px',
            boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
          }}>
            <div style={{ display: 'flex', marginRight: '4px' }}>
              {['boy1', 'girl1', 'boy2'].map((seed, i) => (
                <div key={i} style={{
                  width: '26px', height: '26px', borderRadius: '50%',
                  border: '2px solid white', overflow: 'hidden', marginLeft: i > 0 ? '-8px' : '0',
                }}>
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`} alt="avatar" style={{ width: '100%', height: '100%' }} />
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ color: '#FFD54A', fontSize: '12px' }}>★★★★★</span>
              <span style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: '11px', color: '#475569' }}>
                Loved by 10,000+ learners worldwide
              </span>
            </div>
          </div>
        </div>

        {/* ══ COLUMN 2: Center Hero Kids & Magic Book Illustration ══ */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          {/* Floating Let's Learn speech bubble */}
          <div className="animate-bobble" style={{
            background: 'white',
            borderRadius: '99px',
            padding: '6px 16px',
            border: '2px solid #FF4FA3',
            boxShadow: '0 6px 18px rgba(255,79,163,0.3)',
            fontFamily: 'Poppins', fontWeight: 900, fontSize: '14px', color: '#FF4FA3',
            marginBottom: '-14px', zIndex: 10,
          }}>
            Let's Learn! ✨
          </div>

          {/* SVG Illustration of Open Magical Book & Floating Letters */}
          <svg width="340" height="280" viewBox="0 0 340 280" fill="none">
            {/* Glowing aura */}
            <circle cx="170" cy="180" r="110" fill="url(#heroGlow)" opacity="0.6" />
            
            {/* Floating Letters */}
            <g className="animate-float">
              <rect x="60" y="40" width="36" height="36" rx="10" fill="#8A5CFF" />
              <text x="78" y="65" textAnchor="middle" fontSize="22" fontWeight="900" fill="white" fontFamily="Poppins">B</text>
            </g>

            <g className="animate-float" style={{ animationDelay: '1s' }}>
              <rect x="240" y="30" width="36" height="36" rx="10" fill="#FF4FA3" />
              <text x="258" y="55" textAnchor="middle" fontSize="22" fontWeight="900" fill="white" fontFamily="Poppins">C</text>
            </g>

            {/* Big A and Z on book */}
            <g className="animate-bobble">
              <text x="140" y="140" fontSize="56" fontWeight="900" fill="#FFD54A" fontFamily="Poppins" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.2))">A</text>
              <text x="190" y="145" fontSize="48" fontWeight="900" fill="#4D9DFF" fontFamily="Poppins" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.2))">Z</text>
            </g>

            {/* OPEN MAGICAL BOOK */}
            <path d="M 40 210 Q 170 185 300 210 L 300 240 Q 170 215 40 240 Z" fill="#8B4513" />
            <path d="M 46 202 Q 170 178 294 202 L 294 232 Q 170 208 46 232 Z" fill="#FFFDE7" />
            <path d="M 52 195 Q 170 172 288 195 L 288 225 Q 170 202 52 225 Z" fill="#FFFFFF" />
            <line x1="170" y1="172" x2="170" y2="225" stroke="#E2E8F0" strokeWidth="3" />

            {/* Floating Sparkles around */}
            <circle cx="100" cy="110" r="4" fill="#FFD54A" />
            <circle cx="230" cy="110" r="5" fill="#4D9DFF" />
            <circle cx="170" cy="70" r="6" fill="#FF4FA3" />

            <defs>
              <radialGradient id="heroGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFD54A" />
                <stop offset="100%" stopColor="#6C4CFF" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>

      </section>

      {/* ── MIDDLE SECTION: "EXPLORE OUR MAGICAL WORLD" ── */}
      <section style={{
        maxWidth: '1440px', margin: '0 auto',
        padding: '20px 24px 40px',
        display: 'flex', flexDirection: 'column', gap: '20px',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '24px', color: '#1e1040', margin: '0 0 4px' }}>
            ✦ Explore Our <span style={{ color: '#6C4CFF' }}>Magical World</span> ✦
          </div>
          <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '13px', color: '#64748B', margin: 0 }}>
            Tap on any activity to start your learning adventure!
          </p>
        </div>

        {/* 8 Activity Cards (2 rows of 4) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>

          {/* Card 1: Reading Matches */}
          <div className="hover-lift" onClick={() => navigate('/lesson/1')} style={{
            background: '#F0FDF4', borderRadius: '20px', border: '1.5px solid #DCFCE7',
            padding: '16px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer',
          }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>📖</div>
            <div style={{ flex: 1 }}>
              <h4 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '14px', color: '#166534', margin: '0 0 2px' }}>Reading Matches</h4>
              <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '10px', color: '#475569', margin: 0, lineHeight: 1.3 }}>
                Match cards to connect sounds, letters and words with picture sticker blocks.
              </p>
            </div>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#22C55E', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 900, flexShrink: 0 }}>→</div>
          </div>

          {/* Card 2: Tracing Sentences */}
          <div className="hover-lift" onClick={() => navigate('/lesson/2')} style={{
            background: '#FFFDF0', borderRadius: '20px', border: '1.5px solid #FEF08A',
            padding: '16px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer',
          }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#FEF08A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>✍️</div>
            <div style={{ flex: 1 }}>
              <h4 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '14px', color: '#854D0E', margin: '0 0 2px' }}>Tracing Sentences</h4>
              <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '10px', color: '#475569', margin: 0, lineHeight: 1.3 }}>
                Practice writing sentences and study capitalization rules with real-time spelling check tips.
              </p>
            </div>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#EAB308', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 900, flexShrink: 0 }}>→</div>
          </div>

          {/* Card 3: Voice Pronunciation */}
          <div className="hover-lift" onClick={() => navigate('/voice-practice')} style={{
            background: '#F0F5FF', borderRadius: '20px', border: '1.5px solid #DBEAFE',
            padding: '16px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer',
          }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>🎙️</div>
            <div style={{ flex: 1 }}>
              <h4 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '14px', color: '#1E40AF', margin: '0 0 2px' }}>Voice Pronunciation</h4>
              <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '10px', color: '#475569', margin: 0, lineHeight: 1.3 }}>
                Speak aloud into your microphone! Get immediate scores showing syllable stress advice and timing.
              </p>
            </div>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#3B82F6', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 900, flexShrink: 0 }}>→</div>
          </div>

          {/* Card 4: Smart Study Recommendations */}
          <div className="hover-lift" onClick={() => navigate('/learn-with-ai')} style={{
            background: '#FFF0F5', borderRadius: '20px', border: '1.5px solid #FCE7F3',
            padding: '16px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer',
          }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#FCE7F3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>🧠</div>
            <div style={{ flex: 1 }}>
              <h4 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '14px', color: '#9D174D', margin: '0 0 2px' }}>Smart Study Recommendations</h4>
              <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '10px', color: '#475569', margin: 0, lineHeight: 1.3 }}>
                The AI tutor checks your quiz logs and suggests the best two lessons in your level to complete next.
              </p>
            </div>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#EC4899', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 900, flexShrink: 0 }}>→</div>
          </div>

          {/* Card 5: Sticker Album */}
          <div className="hover-lift" onClick={() => navigate('/vocabulary')} style={{
            background: '#F5F3FF', borderRadius: '20px', border: '1.5px solid #DDD6FE',
            padding: '16px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer',
          }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#DDD6FE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>📓</div>
            <div style={{ flex: 1 }}>
              <h4 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '14px', color: '#5B21B6', margin: '0 0 2px' }}>Sticker Album</h4>
              <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '10px', color: '#475569', margin: 0, lineHeight: 1.3 }}>
                Unlock cool animal, fruit, and tool stickers for your profile album by passing reading and talking drills!
              </p>
            </div>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#8B5CF6', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 900, flexShrink: 0 }}>→</div>
          </div>

          {/* Card 6: Weekly Champions League */}
          <div className="hover-lift" onClick={() => navigate('/leaderboard')} style={{
            background: '#FFF7ED', borderRadius: '20px', border: '1.5px solid #FFEDD5',
            padding: '16px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer',
          }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#FFEDD5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>🏆</div>
            <div style={{ flex: 1 }}>
              <h4 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '14px', color: '#9A3412', margin: '0 0 2px' }}>Weekly Champions League</h4>
              <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '10px', color: '#475569', margin: 0, lineHeight: 1.3 }}>
                Compete with online friends, maintain your daily study streaks, and rank at the top of the leaderboards!
              </p>
            </div>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#F97316', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 900, flexShrink: 0 }}>→</div>
          </div>

          {/* Card 7: Story Time Corner */}
          <div className="hover-lift" onClick={() => navigate('/lesson/3')} style={{
            background: '#F0FDFA', borderRadius: '20px', border: '1.5px solid #CCFBF1',
            padding: '16px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer',
          }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#CCFBF1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>🏰</div>
            <div style={{ flex: 1 }}>
              <h4 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '14px', color: '#115E59', margin: '0 0 2px' }}>Story Time Corner</h4>
              <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '10px', color: '#475569', margin: 0, lineHeight: 1.3 }}>
                Read short stories, answer fun questions and collect stars to level up your reading journey!
              </p>
            </div>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#14B8A6', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 900, flexShrink: 0 }}>→</div>
          </div>

          {/* Card 8: Daily Goals */}
          <div className="hover-lift" onClick={() => navigate('/dashboard')} style={{
            background: '#FFF1F2', borderRadius: '20px', border: '1.5px solid #FFE4E6',
            padding: '16px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer',
          }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#FFE4E6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>🎯</div>
            <div style={{ flex: 1 }}>
              <h4 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '14px', color: '#9F1239', margin: '0 0 2px' }}>Daily Goals</h4>
              <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '10px', color: '#475569', margin: 0, lineHeight: 1.3 }}>
                Complete daily tasks, earn points and build your streak to become a literacy champion!
              </p>
            </div>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#F43F5E', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 900, flexShrink: 0 }}>→</div>
          </div>

        </div>
      </section>

      {/* ── BOTTOM PURPLE COUNTER BAR ── */}
      <footer style={{
        maxWidth: '1440px', margin: '0 auto 20px',
        background: 'linear-gradient(135deg, #3D1D99 0%, #2D1278 50%, #1E0A5E 100%)',
        borderRadius: '24px',
        padding: '16px 28px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        color: 'white',
        boxShadow: '0 16px 40px rgba(45,18,120,0.4)',
        border: '1.5px solid rgba(255,255,255,0.12)',
      }}>
        {/* Robot mascot on left */}
        <div className="animate-bobble" style={{ width: '60px', height: '60px', flexShrink: 0 }}>
          <RobotMascot size={60} />
        </div>

        {/* 4 Stats counters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '26px' }}>🔥</span>
            <div>
              <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '20px', lineHeight: 1 }}>12</div>
              <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '10px', opacity: 0.8 }}>Day Streak</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '26px' }}>⭐</span>
            <div>
              <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '20px', lineHeight: 1 }}>450</div>
              <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '10px', opacity: 0.8 }}>Stars Earned</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '26px' }}>📚</span>
            <div>
              <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '18px', lineHeight: 1 }}>27</div>
              <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '10px', opacity: 0.8 }}>Lessons Completed</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '26px' }}>🏅</span>
            <div>
              <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '20px', lineHeight: 1 }}>3</div>
              <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '10px', opacity: 0.8 }}>Badges Earned</div>
            </div>
          </div>
        </div>

        {/* Lion mascot & bubble on right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            background: 'white', color: '#1e1040',
            borderRadius: '99px', padding: '6px 14px',
            fontFamily: 'Poppins', fontWeight: 900, fontSize: '11px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}>
            Keep learning, keep shining! ⭐
          </div>
          <div className="animate-bobble" style={{ fontSize: '36px' }}>🦁</div>
        </div>
      </footer>

    </div>
  );
}
