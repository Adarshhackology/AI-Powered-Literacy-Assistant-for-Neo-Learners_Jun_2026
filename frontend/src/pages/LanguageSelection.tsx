import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SupportedLanguage } from '../utils/translationHelper';
import { Globe, ArrowRight, CheckCircle2, Award, Zap, Target, BookOpen, Sparkles, ArrowLeft } from 'lucide-react';
import { RobotMascot } from '../components/UI/Illustrations';

interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  example: string;
  nativeExample: string;
  flag: string;
}

const languagesList: LanguageOption[] = [
  { code: 'english', name: 'English', nativeName: 'English', example: 'Hello', nativeExample: 'Hello', flag: '🇬🇧' },
  { code: 'hindi', name: 'Hindi', nativeName: 'हिंदी', example: 'Namaste', nativeExample: 'नमस्ते', flag: '🇮🇳' },
  { code: 'telugu', name: 'Telugu', nativeName: 'తెలుగు', example: 'Namaste', nativeExample: 'నమస్తే', flag: '🇮🇳' },
  { code: 'tamil', name: 'Tamil', nativeName: 'தமிழ்', example: 'Vanakkam', nativeExample: 'வணக்கம்', flag: '🇮🇳' },
  { code: 'kannada', name: 'Kannada', nativeName: 'ಕನ್ನಡ', example: 'Namaskara', nativeExample: 'ನಮಸ್ಕಾರ', flag: '🇮🇳' },
  { code: 'malayalam', name: 'Malayalam', nativeName: 'മലയാളം', example: 'Namaskaram', nativeExample: 'നമസ്കാരം', flag: '🇮🇳' },
  { code: 'marathi', name: 'Marathi', nativeName: 'मराठी', example: 'Namaskar', nativeExample: 'नमस्कार', flag: '🇮🇳' },
  { code: 'bengali', name: 'Bengali', nativeName: 'বাংলা', example: 'Nomoshkar', nativeExample: 'নমস্কার', flag: '🇮🇳' },
  { code: 'gujarati', name: 'Gujarati', nativeName: 'ગુજરાતી', example: 'Namaste', nativeExample: 'નમસ્તે', flag: '🇮🇳' },
  { code: 'punjabi', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', example: 'Sat Sri Akal', nativeExample: 'ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ', flag: '🇮🇳' }
];

const motivations = [
  { id: 'school', title: 'School & Studies 🎓', desc: 'Boost reading & writing grades' },
  { id: 'job', title: 'Career & Job Growth 💼', desc: 'Improve professional communication' },
  { id: 'brain', title: 'Brain Exercise 🧠', desc: 'Train memory & focus daily' },
  { id: 'travel', title: 'Travel & Culture ✈️', desc: 'Explore new places & languages' },
  { id: 'family', title: 'Connect with Family 👨‍👩‍👧', desc: 'Speak confidently with loved ones' },
];

const dailyGoals = [
  { id: '5', label: 'Casual', time: '5 mins / day', xp: '+10 XP' },
  { id: '10', label: 'Regular ⭐', time: '10 mins / day', xp: '+20 XP', recommended: true },
  { id: '15', label: 'Serious', time: '15 mins / day', xp: '+30 XP' },
  { id: '20', label: 'Intense 🚀', time: '20 mins / day', xp: '+50 XP' },
];

export default function LanguageSelection() {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const [selectedLang, setSelectedLang] = useState<SupportedLanguage>('english');
  const [motivation, setMotivation] = useState<string>('school');
  const [dailyGoal, setDailyGoal] = useState<string>('10');

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate('/');
    }
  };

  const handleFinishOnboarding = (startPath: string) => {
    localStorage.setItem('preferredLanguage', selectedLang);
    localStorage.setItem('learningGoal', motivation);
    localStorage.setItem('dailyLearningTime', dailyGoal);
    navigate(startPath);
  };

  return (
    <div className="neolit-fluid-bg" style={{
      minHeight: '100vh',
      fontFamily: 'Nunito, sans-serif',
      padding: '24px 16px',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ maxWidth: '800px', width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Progress Stepper Bar (Duolingo Style) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            onClick={handleBack}
            style={{
              background: '#FFFFFF', border: '1.5px solid #E2E8F0',
              width: '40px', height: '40px', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#64748B', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div style={{ flex: 1, height: '14px', background: '#E2E8F0', borderRadius: '99px', overflow: 'hidden', border: '1px solid #CBD5E1' }}>
            <div style={{
              width: `${(step / 4) * 100}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #5AD66F 0%, #10B981 100%)',
              borderRadius: '99px',
              transition: 'width 0.4s ease',
            }} />
          </div>

          <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px', color: '#6C4CFF' }}>
            STEP {step} / 4
          </div>
        </div>

        {/* ── STEP 1: SELECT LANGUAGE ── */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div className="animate-bobble" style={{
                width: '56px', height: '56px', borderRadius: '18px',
                background: 'linear-gradient(135deg, #6C4CFF, #8A5CFF)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', boxShadow: '0 8px 24px rgba(108,76,255,0.3)',
              }}>
                <RobotMascot size={40} />
              </div>
              <div>
                <h1 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '24px', color: '#1E1040', margin: 0 }}>
                  What would you like to learn? 🌍
                </h1>
                <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '14px', color: '#64748B', margin: '2px 0 0' }}>
                  Select your target language to start your adventure.
                </p>
              </div>
            </div>

            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '14px',
            }}>
              {languagesList.map((lang) => {
                const isSelected = selectedLang === lang.code;
                return (
                  <div
                    key={lang.code}
                    onClick={() => setSelectedLang(lang.code)}
                    style={{
                      background: isSelected ? '#F5F3FF' : '#FFFFFF',
                      borderRadius: '20px',
                      padding: '16px',
                      border: isSelected ? '2.5px solid #6C4CFF' : '1.5px solid #EAECF5',
                      boxShadow: isSelected ? '0 8px 24px rgba(108,76,255,0.2)' : '0 4px 16px rgba(0,0,0,0.02)',
                      cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: '14px',
                      transition: 'all 0.18s ease',
                      transform: isSelected ? 'scale(1.02)' : 'none',
                    }}
                  >
                    <span style={{ fontSize: '32px' }}>{lang.flag}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '15px', color: '#1E1040' }}>
                        {lang.name}
                      </div>
                      <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '12px', color: '#64748B' }}>
                        {lang.nativeName}
                      </div>
                    </div>
                    {isSelected && <CheckCircle2 className="w-5 h-5 text-indigo-600" />}
                  </div>
                );
              })}
            </div>

            <button
              onClick={handleNext}
              className="btn-3d"
              style={{
                background: 'linear-gradient(135deg, #5AD66F, #10B981)',
                color: 'white', border: 'none', borderBottom: '4px solid #059669',
                borderRadius: '16px', padding: '14px 28px',
                fontFamily: 'Poppins', fontWeight: 900, fontSize: '16px',
                cursor: 'pointer', width: '100%', marginTop: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                boxShadow: '0 8px 24px rgba(16,185,129,0.35)',
              }}
            >
              <span>CONTINUE →</span>
            </button>
          </div>
        )}

        {/* ── STEP 2: WHY ARE YOU LEARNING? (MOTIVATION) ── */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '56px', height: '56px', borderRadius: '18px',
                background: 'linear-gradient(135deg, #FF4FA3, #FF6B35)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '28px', boxShadow: '0 8px 24px rgba(255,79,163,0.3)',
              }}>
                💡
              </div>
              <div>
                <h1 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '24px', color: '#1E1040', margin: 0 }}>
                  Why are you learning? 🎯
                </h1>
                <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '14px', color: '#64748B', margin: '2px 0 0' }}>
                  This helps us personalize your lessons & exercise goals.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {motivations.map((m) => {
                const isSel = motivation === m.id;
                return (
                  <div
                    key={m.id}
                    onClick={() => setMotivation(m.id)}
                    style={{
                      background: isSel ? '#F5F3FF' : '#FFFFFF',
                      borderRadius: '18px',
                      padding: '16px 20px',
                      border: isSel ? '2.5px solid #6C4CFF' : '1.5px solid #EAECF5',
                      boxShadow: isSel ? '0 8px 24px rgba(108,76,255,0.18)' : '0 4px 14px rgba(0,0,0,0.02)',
                      cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      transition: 'all 0.18s ease',
                    }}
                  >
                    <div>
                      <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '16px', color: '#1E1040' }}>
                        {m.title}
                      </div>
                      <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                        {m.desc}
                      </div>
                    </div>
                    {isSel && <CheckCircle2 className="w-6 h-6 text-indigo-600" />}
                  </div>
                );
              })}
            </div>

            <button
              onClick={handleNext}
              className="btn-3d"
              style={{
                background: 'linear-gradient(135deg, #5AD66F, #10B981)',
                color: 'white', border: 'none', borderBottom: '4px solid #059669',
                borderRadius: '16px', padding: '14px 28px',
                fontFamily: 'Poppins', fontWeight: 900, fontSize: '16px',
                cursor: 'pointer', width: '100%', marginTop: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                boxShadow: '0 8px 24px rgba(16,185,129,0.35)',
              }}
            >
              <span>CONTINUE →</span>
            </button>
          </div>
        )}

        {/* ── STEP 3: DAILY COMMITMENT GOAL ── */}
        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '56px', height: '56px', borderRadius: '18px',
                background: 'linear-gradient(135deg, #FFD54A, #FF9F43)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '28px', boxShadow: '0 8px 24px rgba(255,213,74,0.4)',
              }}>
                ⏱️
              </div>
              <div>
                <h1 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '24px', color: '#1E1040', margin: 0 }}>
                  Choose your daily goal ⚡
                </h1>
                <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '14px', color: '#64748B', margin: '2px 0 0' }}>
                  You can change this anytime in your settings.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {dailyGoals.map((g) => {
                const isSel = dailyGoal === g.id;
                return (
                  <div
                    key={g.id}
                    onClick={() => setDailyGoal(g.id)}
                    style={{
                      background: isSel ? '#F5F3FF' : '#FFFFFF',
                      borderRadius: '18px',
                      padding: '16px 20px',
                      border: isSel ? '2.5px solid #6C4CFF' : '1.5px solid #EAECF5',
                      boxShadow: isSel ? '0 8px 24px rgba(108,76,255,0.18)' : '0 4px 14px rgba(0,0,0,0.02)',
                      cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      transition: 'all 0.18s ease',
                    }}
                  >
                    <div>
                      <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '16px', color: '#1E1040' }}>
                        {g.label}
                      </div>
                      <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                        {g.time}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ background: '#EFECFF', color: '#6C4CFF', fontFamily: 'Poppins', fontWeight: 900, fontSize: '12px', padding: '4px 12px', borderRadius: '99px' }}>
                        {g.xp}
                      </span>
                      {isSel && <CheckCircle2 className="w-6 h-6 text-indigo-600" />}
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={handleNext}
              className="btn-3d"
              style={{
                background: 'linear-gradient(135deg, #5AD66F, #10B981)',
                color: 'white', border: 'none', borderBottom: '4px solid #059669',
                borderRadius: '16px', padding: '14px 28px',
                fontFamily: 'Poppins', fontWeight: 900, fontSize: '16px',
                cursor: 'pointer', width: '100%', marginTop: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                boxShadow: '0 8px 24px rgba(16,185,129,0.35)',
              }}
            >
              <span>CONTINUE →</span>
            </button>
          </div>
        )}

        {/* ── STEP 4: STARTING POINT (DUOLINGO CHOICE) ── */}
        {step === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div className="animate-bobble" style={{
                width: '56px', height: '56px', borderRadius: '18px',
                background: 'linear-gradient(135deg, #3B82F6, #60A5FA)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '28px', boxShadow: '0 8px 24px rgba(59,130,246,0.3)',
              }}>
                🗺️
              </div>
              <div>
                <h1 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '24px', color: '#1E1040', margin: 0 }}>
                  Find your starting point! 🚀
                </h1>
                <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '14px', color: '#64748B', margin: '2px 0 0' }}>
                  Are you a complete beginner or looking for a placement test?
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              
              {/* Option A: Start from Scratch */}
              <div
                onClick={() => handleFinishOnboarding('/dashboard')}
                className="hover-lift"
                style={{
                  background: '#FFFFFF', borderRadius: '24px', padding: '24px',
                  border: '2px solid #E2E8F0', boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
                  cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '16px',
                }}
              >
                <div style={{ fontSize: '42px' }}>🐣</div>
                <div>
                  <h3 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '18px', color: '#1E1040', margin: 0 }}>
                    Learning for the first time?
                  </h3>
                  <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '13px', color: '#64748B', margin: '6px 0 0', lineHeight: 1.5 }}>
                    Start from Level 1 with basic alphabets, phonics, and simple picture matching.
                  </p>
                </div>
                <button style={{
                  background: '#F1F5F9', border: 'none', color: '#334155',
                  padding: '10px 16px', borderRadius: '12px',
                  fontFamily: 'Poppins', fontWeight: 800, fontSize: '13px',
                  marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '6px',
                }}>
                  <span>Start Level 1</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Option B: AI Placement Test */}
              <div
                onClick={() => handleFinishOnboarding('/learn-with-ai')}
                className="hover-lift"
                style={{
                  background: 'linear-gradient(135deg, #F5F3FF 0%, #EFF6FF 100%)',
                  borderRadius: '24px', padding: '24px',
                  border: '2.5px solid #6C4CFF', boxShadow: '0 12px 32px rgba(108,76,255,0.2)',
                  cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '16px',
                }}
              >
                <div style={{ fontSize: '42px' }}>🎯</div>
                <div>
                  <h3 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '18px', color: '#6C4CFF', margin: 0 }}>
                    Check your level with AI!
                  </h3>
                  <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '13px', color: '#475569', margin: '6px 0 0', lineHeight: 1.5 }}>
                    Take a 5-minute placement assessment. Our AI tutor will skip content you already know!
                  </p>
                </div>
                <button style={{
                  background: 'linear-gradient(135deg, #6C4CFF 0%, #8A5CFF 100%)',
                  color: 'white', border: 'none',
                  padding: '10px 16px', borderRadius: '12px',
                  fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px',
                  marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '6px',
                  boxShadow: '0 4px 14px rgba(108,76,255,0.35)',
                }}>
                  <span>Take Placement Test</span>
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
