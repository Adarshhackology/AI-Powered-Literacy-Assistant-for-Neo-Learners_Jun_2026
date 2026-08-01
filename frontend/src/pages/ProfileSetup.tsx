import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../utils/api';
import { Sparkles, ArrowRight, ArrowLeft, Globe } from 'lucide-react';
import type { SupportedLanguage } from '../utils/translationHelper';
import { Sparkle } from '../components/UI/Illustrations';

const avatars = [
  { id: '1', emoji: '🧑‍🎓', label: 'Learner' },
  { id: '2', emoji: '👩‍🏫', label: 'Scholar' },
  { id: '3', emoji: '🧭', label: 'Explorer' },
  { id: '4', emoji: '🦉', label: 'Wise Owl' },
  { id: '5', emoji: '🤖', label: 'Techie' },
];

const languagesList = [
  { code: 'english', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'hindi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
  { code: 'telugu', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'tamil', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'kannada', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'bengali', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
  { code: 'marathi', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  { code: 'gujarati', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'punjabi', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' }
];

const goals = [
  { id: 'Read newspapers and signs', emoji: '📰' },
  { id: 'Write basic letters & forms', emoji: '✉️' },
  { id: 'Chat with family & kids', emoji: '💬' },
  { id: 'Prepare for job applications', emoji: '💼' }
];

const readingOptions = [
  { level: 'Beginner', emoji: '🔴' },
  { level: 'Intermediate', emoji: '🟡' },
  { level: 'Advanced', emoji: '🟢' }
];

const writingOptions = [
  { level: 'Beginner', emoji: '🔴' },
  { level: 'Intermediate', emoji: '🟡' },
  { level: 'Advanced', emoji: '🟢' }
];

const speakingOptions = [
  { level: 'Shy', value: '30', emoji: '🤐' },
  { level: 'Average', value: '60', emoji: '🙂' },
  { level: 'Fluent', value: '95', emoji: '🗣️' }
];

const profileTranslations: Record<string, any> = {
  english: {
    langTitle: "Choose Your Language",
    langSubtitle: "The entire website will translate to this language.",
    detailsTitle: "Let's build your profile",
    detailsSubtitle: "Tell us your name and choose a character avatar.",
    avatarLabel: "Choose Your Avatar",
    nameLabel: "What is your name?",
    ageLabel: "How old are you?",
    goalTitle: "What is your learning goal?",
    goalSubtitle: "Choose what you want to achieve with this assistant.",
    goals: {
      'Read newspapers and signs': { title: 'Read signs & news', desc: 'Understand notice boards, newspapers, and signposts.' },
      'Write basic letters & forms': { title: 'Write letters & forms', desc: 'Fill out documents, application forms, and write letters.' },
      'Chat with family & kids': { title: 'Chat with family', desc: 'Message and talk confidently with children and relatives.' },
      'Prepare for job applications': { title: 'Job preparation', desc: 'Write emails, read resumes, and practice basic interviews.' }
    },
    readingTitle: "Your Reading Confidence",
    readingSubtitle: "Choose the option that describes your reading skill best.",
    readingOptions: {
      'Beginner': { label: 'Beginner', desc: 'Cannot read full sentences yet.' },
      'Intermediate': { label: 'Intermediate', desc: 'Can read basic words and simple sentences.' },
      'Advanced': { label: 'Advanced', desc: 'Can read newspaper articles and books.' }
    },
    writingTitle: "Your Writing Confidence",
    writingSubtitle: "Choose the option that describes your writing skill best.",
    writingOptions: {
      'Beginner': { label: 'Beginner', desc: 'Cannot write letters or full words yet.' },
      'Intermediate': { label: 'Intermediate', desc: 'Can spell basic words and simple messages.' },
      'Advanced': { label: 'Advanced', desc: 'Can write complete paragraphs and letters.' }
    },
    speakingTitle: "Speaking Confidence",
    speakingSubtitle: "Choose how comfortable you feel speaking out loud.",
    speakingOptions: {
      'Shy': { label: 'Shy / Need practice', desc: 'I feel nervous speaking out loud.' },
      'Average': { label: 'Average / Can talk basic', desc: 'I can speak simple everyday sentences.' },
      'Fluent': { label: 'Fluent / Speak easily', desc: 'I can speak and express my ideas clearly.' }
    },
    continueText: "Continue",
    back: "Back",
    complete: "Complete Onboarding"
  },
  hindi: {
    langTitle: "अपनी भाषा चुनें",
    langSubtitle: "पूरी वेबसाइट इस भाषा में अनुवादित हो जाएगी।",
    detailsTitle: "चलो आपकी प्रोफ़ाइल बनाते हैं",
    detailsSubtitle: "हमें अपना नाम बताएं और एक अवतार चुनें।",
    avatarLabel: "अपना अवतार चुनें",
    nameLabel: "आपका नाम क्या है?",
    ageLabel: "आप कितने साल के हैं?",
    goalTitle: "आपका सीखने का उद्देश्य क्या है?",
    goalSubtitle: "चुनें कि आप इस सहायक के साथ क्या हासिल करना चाहते हैं।",
    goals: {
      'Read newspapers and signs': { title: 'संकेत और समाचार पढ़ें', desc: 'सूचना बोर्ड, समाचार पत्र और साइनपोस्ट समझें।' },
      'Write basic letters & forms': { title: 'पत्र और फॉर्म लिखें', desc: 'दस्तावेज़, आवेदन पत्र भरें और पत्र लिखें।' },
      'Chat with family & kids': { title: 'परिवार के साथ चैट करें', desc: 'बच्चों और रिश्तेदारों के साथ आत्मविश्वास से बात करें।' },
      'Prepare for job applications': { title: 'नौकरी की तैयारी', desc: 'ईमेल लिखें, रिज्यूमे पढ़ें और साक्षात्कार का अभ्यास करें।' }
    },
    readingTitle: "आपका पठन स्तर",
    readingSubtitle: "वह विकल्प चुनें जो आपके पढ़ने के कौशल को सबसे अच्छी तरह दर्शाता है।",
    readingOptions: {
      'Beginner': { label: 'शुरुआती (Beginner)', desc: 'अभी पूरे वाक्य नहीं पढ़ सकते।' },
      'Intermediate': { label: 'मध्यम (Intermediate)', desc: 'बुनियादी शब्द और सरल वाक्य पढ़ सकते हैं।' },
      'Advanced': { label: 'उन्नत (Advanced)', desc: 'समाचार पत्र के लेख और पुस्तकें पढ़ सकते हैं।' }
    },
    writingTitle: "आपका लेखन स्तर",
    writingSubtitle: "वह विकल्प चुनें जो आपके लिखने के कौशल को सबसे अच्छी तरह दर्शाता है।",
    writingOptions: {
      'Beginner': { label: 'शुरुआती (Beginner)', desc: 'अभी अक्षर या पूरे शब्द नहीं लिख सकते।' },
      'Intermediate': { label: 'मध्यम (Intermediate)', desc: 'बुनियादी शब्द और सरल संदेश लिख सकते हैं।' },
      'Advanced': { label: 'उन्नत (Advanced)', desc: 'पूरे पैराग्राफ और पत्र लिख सकते हैं।' }
    },
    speakingTitle: "आपका बोलने का आत्मविश्वास",
    speakingSubtitle: "चुनें कि आप जोर से बोलने में कितने सहज महसूस करते हैं।",
    speakingOptions: {
      'Shy': { label: 'संकोची / अभ्यास की आवश्यकता', desc: 'मुझे जोर से बोलने में घबराहट महसूस होती है।' },
      'Average': { label: 'औसत / बुनियादी बात कर सकते हैं', desc: 'मैं सरल रोज़मर्रा के वाक्य बोल सकता हूँ।' },
      'Fluent': { label: 'धाराप्रवाह / आसानी से बोलें', desc: 'मैं अपने विचारों को स्पष्ट रूप से बोल और व्यक्त कर सकता हूँ।' }
    },
    continueText: "आगे बढ़ें",
    back: "पीछे",
    complete: "पंजीकरण पूरा करें"
  }
};

export default function ProfileSetup() {
  const username = localStorage.getItem('username') || 'guest';
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [prefLang, setPrefLang] = useState<SupportedLanguage>('english');

  const [avatar, setAvatar] = useState('1');
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [learningGoal, setLearningGoal] = useState('Read newspapers and signs');
  const [readingLevel, setReadingLevel] = useState('Beginner');
  const [writingLevel, setWritingLevel] = useState('Beginner');
  const [speakingLevel, setSpeakingLevel] = useState('Average');
  const [speakingConfidence, setSpeakingConfidence] = useState('60');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = (localStorage.getItem('preferredLanguage') || 'english') as SupportedLanguage;
    setPrefLang(saved);
  }, []);

  useEffect(() => {
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const parsed = JSON.parse(userStr);
        if (parsed.first_name && parsed.first_name !== 'google_user') {
          setFullName(parsed.first_name);
        } else if (parsed.profile && parsed.profile.fullName && parsed.profile.fullName !== 'google_user' && parsed.profile.fullName !== 'Google Learner') {
          setFullName(parsed.profile.fullName);
        } else if (username && username !== 'google_user' && username !== 'guest') {
          setFullName(username);
        }
        if (parsed.profile && parsed.profile.age) {
          setAge(parsed.profile.age);
        }
      } else if (username && username !== 'google_user' && username !== 'guest') {
        setFullName(username);
      }
    } catch (e) {
      console.error(e);
    }
  }, [username]);

  const t = profileTranslations[prefLang] || profileTranslations.english;

  const handleLanguageSelect = (code: SupportedLanguage) => {
    setPrefLang(code);
    localStorage.setItem('preferredLanguage', code);
    window.dispatchEvent(new Event('storage'));
  };

  const handleNext = () => {
    if (step === 2) {
      if (!fullName.trim() || !age) {
        alert('Please fill in your name and age.');
        return;
      }
    }
    setStep((prev) => (prev + 1) as any);
  };

  const handleBack = () => {
    setStep((prev) => (prev - 1) as any);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const profileData = {
        fullName,
        age,
        gender: 'Prefer not to say',
        education: 'Self-Taught',
        occupation: 'Learner',
        preferredLanguage: prefLang,
        learningGoal,
        readingLevel,
        writingLevel,
        speakingConfidence,
        dailyLearningTime: '30 mins',
        avatar: avatars.find(a => a.id === avatar)?.emoji || '🧑‍🎓',
        xp: 20,
        coins: 10,
        streak: 1,
        level: 1,
        badges: ['First Step'],
        completedLessons: []
      };
      
      const res = await apiClient.saveProfile(username, profileData);
      
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      user.profile = res;
      localStorage.setItem('user', JSON.stringify(user));
      
      navigate('/level-selection');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getGoalData = (id: string) => {
    const goalsObj = t?.goals || profileTranslations.english.goals;
    return goalsObj[id] || profileTranslations.english.goals[id] || { title: id, desc: '' };
  };

  const getReadingData = (level: string) => {
    const opts = t?.readingOptions || profileTranslations.english.readingOptions;
    return opts[level] || profileTranslations.english.readingOptions[level] || { label: level, desc: '' };
  };

  const getWritingData = (level: string) => {
    const opts = t?.writingOptions || profileTranslations.english.writingOptions;
    return opts[level] || profileTranslations.english.writingOptions[level] || { label: level, desc: '' };
  };

  const getSpeakingData = (level: string) => {
    const opts = t?.speakingOptions || profileTranslations.english.speakingOptions;
    return opts[level] || profileTranslations.english.speakingOptions[level] || { label: level, desc: '' };
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
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      position: 'relative',
    }}>

      {/* Background Star Field */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {[
          { t: '8%', l: '6%', s: 14 }, { t: '15%', l: '92%', s: 18 },
          { t: '40%', l: '5%', s: 12 }, { t: '65%', l: '94%', s: 16 },
        ].map((st, i) => (
          <div key={i} className="animate-twinkle" style={{
            position: 'absolute', top: st.t, left: st.l,
            animationDelay: `${i * 0.4}s`, opacity: 0.7,
          }}>
            <Sparkle size={st.s} color={i % 2 === 0 ? '#FFD54A' : '#C4B5F4'} />
          </div>
        ))}
      </div>

      <div style={{ maxWidth: '700px', width: '100%', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* Top Glass Navigation Bar */}
        <nav style={{
          height: '60px',
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
              fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px',
              background: '#F0F4FF', padding: '6px 14px', borderRadius: '12px',
              border: '1px solid #E8EFFF', cursor: 'pointer',
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '20px' }}>🌟</span>
            <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '16px', color: '#1e1040' }}>
              Profile Setup
            </span>
          </div>

          <span style={{
            background: 'linear-gradient(135deg, #6C4CFF, #8A5CFF)',
            color: 'white', fontFamily: 'Poppins', fontWeight: 800, fontSize: '11px',
            padding: '4px 12px', borderRadius: '99px',
          }}>
            Step {step} of 6
          </span>
        </nav>

        {/* Main Card Container */}
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '28px',
          padding: '32px',
          border: '2px solid rgba(255,255,255,0.6)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          display: 'flex', flexDirection: 'column', gap: '24px',
        }}>

          {/* Progress Tracker Bar */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontFamily: 'Poppins', fontWeight: 800, fontSize: '11px', color: '#94A3B8' }}>
              <span>Step {step} of 6</span>
              <span style={{ color: '#6C4CFF' }}>{Math.round((step / 6) * 100)}% Complete</span>
            </div>
            <div style={{ height: '8px', borderRadius: '99px', background: '#F1F5F9', overflow: 'hidden' }}>
              <div style={{
                height: '100%', width: `${(step / 6) * 100}%`,
                background: 'linear-gradient(90deg, #6C4CFF, #FF4FA3)',
                borderRadius: '99px', transition: 'width 0.3s ease',
              }} />
            </div>
          </div>

          {/* STEP 1: Select Language */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  background: '#EDE7F6', color: '#6C4CFF',
                  fontFamily: 'Poppins', fontWeight: 900, fontSize: '11px',
                  padding: '4px 14px', borderRadius: '99px', marginBottom: '8px',
                }}>
                  <Globe className="w-4 h-4" /> Language Selection
                </div>
                <h2 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '24px', color: '#1e1040', margin: '0 0 4px' }}>{t.langTitle}</h2>
                <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '13px', color: '#64748B', margin: 0 }}>{t.langSubtitle}</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                {languagesList.map((lang) => (
                  <div
                    key={lang.code}
                    onClick={() => handleLanguageSelect(lang.code as SupportedLanguage)}
                    className="hover-lift"
                    style={{
                      padding: '14px 10px',
                      borderRadius: '16px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      background: prefLang === lang.code ? '#FFFDF0' : '#F8FAFF',
                      border: prefLang === lang.code ? '2.5px solid #FFD54A' : '1.5px solid #E8EFFF',
                      boxShadow: prefLang === lang.code ? '0 8px 20px rgba(255,213,74,0.3)' : 'none',
                    }}
                  >
                    <div style={{ fontSize: '24px', marginBottom: '4px' }}>{lang.flag}</div>
                    <h4 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px', color: '#1e1040', margin: 0 }}>{lang.nativeName}</h4>
                    <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '10px', color: '#94A3B8', margin: '2px 0 0' }}>{lang.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Name & Age & Avatar */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ textAlign: 'center' }}>
                <h2 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '24px', color: '#1e1040', margin: '0 0 4px' }}>{t.detailsTitle}</h2>
                <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '13px', color: '#64748B', margin: 0 }}>{t.detailsSubtitle}</p>
              </div>

              {/* Avatars */}
              <div>
                <label style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '12px', color: '#1e1040', display: 'block', marginBottom: '8px' }}>
                  {t.avatarLabel}
                </label>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                  {avatars.map((a) => (
                    <div
                      key={a.id}
                      onClick={() => setAvatar(a.id)}
                      className="hover-lift"
                      style={{
                        flex: 1, padding: '12px 6px', borderRadius: '16px', textAlign: 'center', cursor: 'pointer',
                        background: avatar === a.id ? '#EDE7F6' : '#F8FAFF',
                        border: avatar === a.id ? '2.5px solid #6C4CFF' : '1.5px solid #E8EFFF',
                        boxShadow: avatar === a.id ? '0 8px 20px rgba(108,76,255,0.3)' : 'none',
                      }}
                    >
                      <div style={{ fontSize: '32px', marginBottom: '4px' }}>{a.emoji}</div>
                      <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '10px', color: '#1e1040' }}>{a.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Name & Age Inputs */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '12px', color: '#1e1040', display: 'block', marginBottom: '6px' }}>
                    {t.nameLabel}
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your name"
                    style={{
                      width: '100%', padding: '12px 16px', borderRadius: '14px',
                      border: '1.5px solid #E8EFFF', background: '#F8FAFF',
                      fontFamily: 'Nunito', fontWeight: 700, fontSize: '14px', color: '#1e1040',
                      outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '12px', color: '#1e1040', display: 'block', marginBottom: '6px' }}>
                    {t.ageLabel}
                  </label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Age"
                    style={{
                      width: '100%', padding: '12px 16px', borderRadius: '14px',
                      border: '1.5px solid #E8EFFF', background: '#F8FAFF',
                      fontFamily: 'Nunito', fontWeight: 700, fontSize: '14px', color: '#1e1040',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Goal */}
          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ textAlign: 'center' }}>
                <h2 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '24px', color: '#1e1040', margin: '0 0 4px' }}>{t.goalTitle}</h2>
                <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '13px', color: '#64748B', margin: 0 }}>{t.goalSubtitle}</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                {goals.map((g) => {
                  const data = getGoalData(g.id);
                  const isSelected = learningGoal === g.id;
                  return (
                    <div
                      key={g.id}
                      onClick={() => setLearningGoal(g.id)}
                      className="hover-lift"
                      style={{
                        padding: '16px', borderRadius: '18px', cursor: 'pointer',
                        background: isSelected ? '#FFFDF0' : '#F8FAFF',
                        border: isSelected ? '2.5px solid #FFD54A' : '1.5px solid #E8EFFF',
                        boxShadow: isSelected ? '0 8px 20px rgba(255,213,74,0.3)' : 'none',
                      }}
                    >
                      <div style={{ fontSize: '28px', marginBottom: '6px' }}>{g.emoji}</div>
                      <h4 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '14px', color: '#1e1040', margin: '0 0 2px' }}>{data.title}</h4>
                      <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '11px', color: '#64748B', margin: 0 }}>{data.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: Reading Level */}
          {step === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ textAlign: 'center' }}>
                <h2 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '24px', color: '#1e1040', margin: '0 0 4px' }}>{t.readingTitle}</h2>
                <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '13px', color: '#64748B', margin: 0 }}>{t.readingSubtitle}</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {readingOptions.map((r) => {
                  const data = getReadingData(r.level);
                  const isSelected = readingLevel === r.level;
                  return (
                    <div
                      key={r.level}
                      onClick={() => setReadingLevel(r.level)}
                      className="hover-lift"
                      style={{
                        padding: '16px 20px', borderRadius: '18px', cursor: 'pointer',
                        background: isSelected ? '#EDE7F6' : '#F8FAFF',
                        border: isSelected ? '2.5px solid #6C4CFF' : '1.5px solid #E8EFFF',
                        display: 'flex', alignItems: 'center', gap: '14px',
                      }}
                    >
                      <div style={{ fontSize: '24px' }}>{r.emoji}</div>
                      <div>
                        <h4 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '15px', color: '#1e1040', margin: 0 }}>{data.label}</h4>
                        <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '12px', color: '#64748B', margin: 0 }}>{data.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5: Writing Level */}
          {step === 5 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ textAlign: 'center' }}>
                <h2 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '24px', color: '#1e1040', margin: '0 0 4px' }}>{t.writingTitle}</h2>
                <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '13px', color: '#64748B', margin: 0 }}>{t.writingSubtitle}</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {writingOptions.map((w) => {
                  const data = getWritingData(w.level);
                  const isSelected = writingLevel === w.level;
                  return (
                    <div
                      key={w.level}
                      onClick={() => setWritingLevel(w.level)}
                      className="hover-lift"
                      style={{
                        padding: '16px 20px', borderRadius: '18px', cursor: 'pointer',
                        background: isSelected ? '#EDE7F6' : '#F8FAFF',
                        border: isSelected ? '2.5px solid #6C4CFF' : '1.5px solid #E8EFFF',
                        display: 'flex', alignItems: 'center', gap: '14px',
                      }}
                    >
                      <div style={{ fontSize: '24px' }}>{w.emoji}</div>
                      <div>
                        <h4 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '15px', color: '#1e1040', margin: 0 }}>{data.label}</h4>
                        <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '12px', color: '#64748B', margin: 0 }}>{data.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 6: Speaking Confidence */}
          {step === 6 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ textAlign: 'center' }}>
                <h2 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '24px', color: '#1e1040', margin: '0 0 4px' }}>{t.speakingTitle}</h2>
                <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '13px', color: '#64748B', margin: 0 }}>{t.speakingSubtitle}</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {speakingOptions.map((s) => {
                  const data = getSpeakingData(s.level);
                  const isSelected = speakingLevel === s.level;
                  return (
                    <div
                      key={s.level}
                      onClick={() => {
                        setSpeakingLevel(s.level);
                        setSpeakingConfidence(s.value);
                      }}
                      className="hover-lift"
                      style={{
                        padding: '16px 20px', borderRadius: '18px', cursor: 'pointer',
                        background: isSelected ? '#FFFDF0' : '#F8FAFF',
                        border: isSelected ? '2.5px solid #FFD54A' : '1.5px solid #E8EFFF',
                        display: 'flex', alignItems: 'center', gap: '14px',
                      }}
                    >
                      <div style={{ fontSize: '24px' }}>{s.emoji}</div>
                      <div>
                        <h4 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '15px', color: '#1e1040', margin: 0 }}>{data.label}</h4>
                        <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '12px', color: '#64748B', margin: 0 }}>{data.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Navigation Buttons Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px solid #F1F5F9', paddingTop: '16px' }}>
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="btn-3d"
                style={{
                  padding: '10px 20px', borderRadius: '14px',
                  background: '#F1F5F9', color: '#475569',
                  fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px',
                  border: 'none', cursor: 'pointer',
                }}
              >
                ← {t.back}
              </button>
            ) : <div />}

            {step < 6 ? (
              <button
                type="button"
                onClick={handleNext}
                className="btn-3d"
                style={{
                  padding: '12px 28px', borderRadius: '14px',
                  background: 'linear-gradient(135deg, #FFD54A, #FF9F43)',
                  color: '#1e1040',
                  fontFamily: 'Poppins', fontWeight: 900, fontSize: '14px',
                  border: 'none', borderBottom: '3.5px solid #E8A000',
                  cursor: 'pointer', boxShadow: '0 6px 18px rgba(255,213,74,0.4)',
                  display: 'flex', alignItems: 'center', gap: '8px',
                }}
              >
                <span>{t.continueText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="btn-3d"
                style={{
                  padding: '14px 32px', borderRadius: '14px',
                  background: 'linear-gradient(135deg, #6C4CFF, #8A5CFF)',
                  color: 'white',
                  fontFamily: 'Poppins', fontWeight: 900, fontSize: '15px',
                  border: 'none', borderBottom: '4px solid rgba(0,0,0,0.3)',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 8px 24px rgba(108,76,255,0.4)',
                  display: 'flex', alignItems: 'center', gap: '8px',
                }}
              >
                <Sparkles className="w-5 h-5" />
                <span>{loading ? 'Saving...' : `${t.complete} ✨`}</span>
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
