import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { SupportedLanguage } from '../utils/translationHelper';
import { Sparkle } from '../components/UI/Illustrations';

interface LevelOption {
  levelNum: number;
  title: string;
  name: string;
  badgeColor: string;
  badgeBg: string;
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
    badgeColor: '#6C4CFF',
    badgeBg: '#F0E6FF',
    image: '/level_alphabet_1783340004005.png',
    description: 'Learn basic letters, shapes, and phonics sounds.',
    readingScore: 20,
    writingScore: 10,
    speakingScore: 25,
    vocabScore: 15
  },
  {
    levelNum: 2,
    title: 'Learner',
    name: 'Simple Words',
    badgeColor: '#FF9F43',
    badgeBg: '#FFF3E0',
    image: '/level_words_1783340019724.png',
    description: 'Read and spell basic 3–4 letter words (cat, dog, sun).',
    readingScore: 40,
    writingScore: 35,
    speakingScore: 45,
    vocabScore: 42
  },
  {
    levelNum: 3,
    title: 'Explorer',
    name: 'Short Sentences',
    badgeColor: '#8A5CFF',
    badgeBg: '#F3E8FF',
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
    badgeColor: '#22C55E',
    badgeBg: '#DCFCE7',
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
    badgeColor: '#3B82F6',
    badgeBg: '#DBEAFE',
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
    badgeColor: '#A855F7',
    badgeBg: '#F3E8FF',
    image: '/level_mastery_1783340074714.png',
    description: 'Advanced reading, writing and confident speaking drills.',
    readingScore: 95,
    writingScore: 92,
    speakingScore: 90,
    vocabScore: 96
  }
];

const levelTranslations: Record<string, any> = {
  english: {
    badge: "Fast Track Onboarding",
    title: "Choose Your Learning Level",
    subtitle: "Select the image that matches what you can read best. We will customize your dashboard immediately!",
    levelText: "LEVEL",
    testBtn: "I want to take a test instead",
    confirmBtn: "Confirm & Start Study",
    levels: {
      1: { title: 'Beginner', name: 'Alphabet Sounds', desc: 'Learn basic letters, shapes, and phonics sounds.' },
      2: { title: 'Learner', name: 'Simple Words', desc: 'Read and spell basic 3–4 letter words (cat, dog, sun).' },
      3: { title: 'Explorer', name: 'Short Sentences', desc: 'Form and read simple daily sentences.' },
      4: { title: 'Achiever', name: 'Short Stories', desc: 'Read and summarize simple short story narratives and tales.' },
      5: { title: 'Master', name: 'News & Signboards', desc: 'Read news columns, filling out government and job forms.' },
      6: { title: 'Expert', name: 'Full Proficiency', desc: 'Advanced reading, writing and confident speaking drills.' }
    }
  },
  hindi: {
    badge: "फास्ट ट्रैक ऑनबोर्डिंग",
    title: "अपना सीखने का स्तर चुनें",
    subtitle: "वह चित्र चुनें जो दर्शाता है कि आप क्या सबसे अच्छा पढ़ सकते हैं। हम तुरंत आपके डैशबोर्ड को कस्टमाइज़ कर देंगे!",
    levelText: "स्तर",
    testBtn: "मैं इसके बजाय एक परीक्षा लेना चाहता हूँ",
    confirmBtn: "पुष्टि करें और पढ़ाई शुरू करें",
    levels: {
      1: { title: 'शुरुआती', name: 'वर्णमाला की आवाजें', desc: 'मूल अक्षर, आकार और फोन ध्वनियां सीखें।' },
      2: { title: 'शिक्षार्थी', name: 'सरल शब्द', desc: 'बुनियादी 3-4 अक्षरों वाले शब्द (जैसे बिल्ली, कुत्ता, सूरज) पढ़ें और लिखें।' },
      3: { title: 'अन्वेषक', name: 'छोटे वाक्य', desc: 'दैनिक जीवन के सरल वाक्यों को बनाएं और पढ़ें।' },
      4: { title: 'सफल', name: 'छोटी कहानियां', desc: 'सरल लघु कहानियों के कथनों और कथाओं को पढ़ें और सारांशित करें।' },
      5: { title: 'मास्टर', name: 'समाचार और साइनबोर्ड', desc: 'समाचार कॉलम पढ़ें, सरकारी और नौकरी के फॉर्म भरना सीखें।' },
      6: { title: 'विशेषज्ञ', name: 'पूर्ण दक्षता', desc: 'उन्नत पढ़ने, लिखने और आत्मविश्वास से बोलने का अभ्यास करें।' }
    }
  }
};

export default function LevelSelection() {
  const [selected, setSelected] = useState<number>(3);
  const [prefLang, setPrefLang] = useState<SupportedLanguage>('english');
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'guest';

  useEffect(() => {
    const saved = (localStorage.getItem('preferredLanguage') || 'english') as SupportedLanguage;
    setPrefLang(saved);
  }, []);

  const t = levelTranslations[prefLang] || levelTranslations.english;

  const handleSelectLevel = async () => {
    const selectedLevelObj = levelsList.find(l => l.levelNum === selected);
    if (!selectedLevelObj) return;

    try {
      const results = {
        readingScore: selectedLevelObj.readingScore,
        writingScore: selectedLevelObj.writingScore,
        comprehensionScore: selectedLevelObj.vocabScore,
        overallScore: Math.round((selectedLevelObj.readingScore + selectedLevelObj.writingScore + selectedLevelObj.vocabScore) / 3),
        completedAt: new Date().toISOString()
      };
      localStorage.setItem('assessmentResult', JSON.stringify(results));

      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user.profile) {
        user.profile.readingLevel = selectedLevelObj.title;
        user.profile.writingLevel = selectedLevelObj.title;
        user.profile.level = selectedLevelObj.levelNum;
        user.profile.xp = (user.profile.xp || 0) + 30;
        localStorage.setItem('user', JSON.stringify(user));
      }

      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      navigate('/dashboard');
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
      fontFamily: 'Nunito, sans-serif',
      padding: '30px 24px',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      position: 'relative',
    }}>

      {/* Decorative floating sparkles */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {[
          { t: '8%', l: '6%', s: 16 }, { t: '15%', l: '92%', s: 18 },
          { t: '45%', l: '4%', s: 14 }, { t: '75%', l: '95%', s: 16 },
        ].map((st, i) => (
          <div key={i} className="animate-twinkle" style={{ position: 'absolute', top: st.t, left: st.l, opacity: 0.7 }}>
            <Sparkle size={st.s} color={i % 2 === 0 ? '#FFD54A' : '#6C4CFF'} />
          </div>
        ))}
      </div>

      <div style={{ maxWidth: '1100px', width: '100%', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>

        {/* Header / Title Area */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'rgba(255,255,255,0.95)', border: '1.5px solid rgba(255,255,255,0.6)',
            borderRadius: '99px', padding: '6px 18px',
            fontFamily: 'Poppins', fontWeight: 900, fontSize: '12px', color: '#6C4CFF',
            boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
          }}>
            🚀 {t.badge} ✨
          </div>

          <h1 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '38px', color: 'white', margin: '4px 0 0' }}>
            Choose Your <span style={{ color: '#FF4FA3' }}>Learning</span> Level
          </h1>

          <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '14px', color: 'rgba(255,255,255,0.85)', margin: 0, maxWidth: '600px' }}>
            {t.subtitle}
          </p>
        </div>

        {/* 6 Level Cards Grid (3 cols x 2 rows) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {levelsList.map((level) => {
            const levelData = t.levels[level.levelNum] || levelTranslations.english.levels[level.levelNum];
            const isSelected = selected === level.levelNum;
            return (
              <div
                key={level.levelNum}
                onClick={() => setSelected(level.levelNum)}
                className="hover-lift"
                style={{
                  background: isSelected ? '#FAF5FF' : 'white',
                  borderRadius: '24px',
                  padding: '16px',
                  border: isSelected ? '3px solid #6C4CFF' : '1.5px solid #E2E8F0',
                  boxShadow: isSelected ? '0 12px 30px rgba(108,76,255,0.25)' : '0 6px 20px rgba(0,0,0,0.04)',
                  cursor: 'pointer',
                  display: 'flex', flexDirection: 'column', gap: '12px',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                }}
              >
                {/* Visual Image Banner */}
                <div style={{
                  width: '100%', height: '140px', borderRadius: '16px',
                  overflow: 'hidden', background: '#F8FAFF',
                  border: '1px solid #E2E8F0', position: 'relative',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <img
                    src={level.image}
                    alt={levelData.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      (e.target as any).style.display = 'none';
                    }}
                  />

                  {/* Level Number & Title Badges */}
                  <div style={{
                    position: 'absolute', bottom: '8px', left: '8px',
                    background: '#F0F4FF', border: '1px solid #DBEAFE',
                    borderRadius: '8px', padding: '2px 8px',
                    fontFamily: 'Poppins', fontWeight: 900, fontSize: '10px', color: '#3B82F6',
                  }}>
                    {t.levelText} {level.levelNum}
                  </div>

                  <div style={{
                    position: 'absolute', bottom: '8px', right: '8px',
                    background: level.badgeBg, border: `1px solid ${level.badgeColor}30`,
                    borderRadius: '99px', padding: '2px 10px',
                    fontFamily: 'Poppins', fontWeight: 900, fontSize: '11px', color: level.badgeColor,
                  }}>
                    {levelData.title}
                  </div>
                </div>

                {/* Content */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <h3 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '18px', color: '#1e1040', margin: 0 }}>
                    {levelData.name}
                  </h3>
                  <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '12px', color: '#64748B', margin: 0, lineHeight: 1.4 }}>
                    {levelData.desc}
                  </p>
                </div>

                {/* Selection Circle Badge on bottom right */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto' }}>
                  <div style={{
                    width: '24px', height: '24px', borderRadius: '50%',
                    background: isSelected ? '#6C4CFF' : 'white',
                    border: isSelected ? 'none' : '2px solid #CBD5E1',
                    color: 'white', fontFamily: 'Poppins', fontWeight: 900, fontSize: '12px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: isSelected ? '0 4px 10px rgba(108,76,255,0.4)' : 'none',
                  }}>
                    {isSelected && '✓'}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Actions Bar */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          borderTop: '2px solid #E2E8F0', paddingTop: '16px', marginTop: '8px',
        }}>
          <button
            onClick={() => navigate('/assessment')}
            className="btn-3d"
            style={{
              background: 'white', color: '#6C4CFF',
              border: '1.5px solid #E2E8F0', borderRadius: '99px',
              padding: '10px 22px', fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
              boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
            }}
          >
            <span>🎁</span>
            <span>{t.testBtn}</span>
            <span>›</span>
          </button>

          <button
            onClick={handleSelectLevel}
            className="btn-3d"
            style={{
              background: 'linear-gradient(135deg, #6C4CFF, #8A5CFF)',
              color: 'white', fontFamily: 'Poppins', fontWeight: 900, fontSize: '15px',
              padding: '12px 32px', borderRadius: '16px', border: 'none',
              borderBottom: '4px solid #4D2FCC', cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(108,76,255,0.4)',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}
          >
            <span>🚀 {t.confirmBtn}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
}
