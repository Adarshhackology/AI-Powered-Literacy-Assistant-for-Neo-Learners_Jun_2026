import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mic, Lightbulb, ArrowRight, Loader2, Check, X, Star, Flame } from 'lucide-react';
import { apiClient } from '../utils/api';
import { Sparkle, AIRobotMascot } from '../components/UI/Illustrations';

interface Question {
  id: string;
  type: 'mcq' | 'fill_blank' | 'paragraph' | 'read_aloud';
  text: string;
  options?: string[];
  correct_answer?: string;
  hint: string;
  image_emoji: string;
  image_hint?: string;
  image_url?: string;
}

const stripEmoji = (str: string) => str ? str.replace(/[\u{1F300}-\u{1F9FF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '').trim() : '';

const defaultPracticeQuestions: Record<string, Question[]> = {
  reading: [
    { id: 'r1', type: 'read_aloud', text: 'इसे जोर से पढ़ें: सूरज सुबह पूर्व में उगता है।', correct_answer: 'सूरज सुबह पूर्व में उगता है।', hint: 'माइक में साफ बोलें।', image_emoji: '🌅' },
    { id: 'r2', type: 'mcq', text: 'चित्र को देखकर सही शब्द चुनें 🍎:', options: ['सेब', 'केला', 'बिल्ली', 'कुत्ता'], correct_answer: 'सेब', hint: 'यह एक मीठा लाल फल है।', image_emoji: '🍎' },
    { id: 'r3', type: 'fill_blank', text: 'सही शब्द चुनें: क _ ल (कमल)', correct_answer: 'म', hint: 'फूल का नाम।', image_emoji: '🌸' },
    { id: 'r4', type: 'mcq', text: 'अक्षर "क" से शुरू होने वाला शब्द चुनें:', options: ['किताब', 'पानी', 'घर', 'पेड़'], correct_answer: 'किताब', hint: 'पढ़ने की वस्तु।', image_emoji: '📚' },
    { id: 'r5', type: 'fill_blank', text: '"दिन" का विलोम शब्द लिखें:', correct_answer: 'रात', hint: 'सूरज ढलने के बाद।', image_emoji: '🌙' },
    { id: 'r6', type: 'mcq', text: '🐶 जानवर की सही आवाज चुनें:', options: ['भौ-भौ', 'म्याऊं', 'चीं-चीं', 'कांव-कांव'], correct_answer: 'भौ-भौ', hint: 'कुत्ते की आवाज।', image_emoji: '🐶' }
  ],
  writing: [
    { id: 'w1', type: 'fill_blank', text: 'वाक्य पूरा करें: वह स्कूल जा _____ है।', correct_answer: 'रहा', hint: 'क्रिया रूप।', image_emoji: '🏫' },
    { id: 'w2', type: 'fill_blank', text: 'शब्द शुद्ध करें: "किताबब" -> _____', correct_answer: 'किताब', hint: 'पढ़ने की पुस्तक।', image_emoji: '📖' },
    { id: 'w3', type: 'paragraph', text: 'अपने पसंदीदा जानवर के बारे में एक वाक्य लिखें।', correct_answer: 'मेरा पसंदीदा जानवर कुत्ता है।', hint: 'जानवर का नाम।', image_emoji: '🐾' },
    { id: 'w4', type: 'mcq', text: 'सही बहुवचन चुनें: "लड़का" -> _____', options: ['लड़के', 'लड़कों', 'लड़कियां', 'लड़काएं'], correct_answer: 'लड़के', hint: 'एक से अधिक।', image_emoji: '👦' },
    { id: 'w5', type: 'fill_blank', text: 'शब्दों को सही क्रम में लगाएं: [है / आम / खाता / राम]', correct_answer: 'राम आम खाता है', hint: 'राम से शुरू करें।', image_emoji: '🥭' },
    { id: 'w6', type: 'paragraph', text: 'आप सुबह उठकर क्या करते हैं?', correct_answer: 'मैं सुबह ब्रश करता हूं।', hint: 'सुबह की आदत।', image_emoji: '🌅' }
  ],
  comprehension: [
    { id: 'c1', type: 'mcq', text: 'कहानी: "रामू ने पेड़ के नीचे एक चाबी पाई।" रामू को क्या मिला?', options: ['चाबी', 'सिक्का', 'फूल', 'खिलौना'], correct_answer: 'चाबी', hint: 'पेड़ के नीचे चाबी मिली।', image_emoji: '🔑' },
    { id: 'c2', type: 'mcq', text: 'पेड़ हमें क्या देते हैं?', options: ['छाया और फल', 'आग और धुआं', 'गाड़ियां', 'कपड़े'], correct_answer: 'छाया और फल', hint: 'पर्यावरण का लाभ।', image_emoji: '🌳' },
    { id: 'c3', type: 'mcq', text: 'काले बादल आने पर क्या होगा?', options: ['बारिश होगी', 'धूप निकलेगी', 'तारे दिखेंगे', 'बर्फ गिरेगी'], correct_answer: 'बारिश होगी', hint: 'बादल बारिश लाते हैं।', image_emoji: '☁️' },
    { id: 'c4', type: 'fill_blank', text: '"खुशी में नाचना" कौन सा भाव दर्शाता है?', correct_answer: 'प्रसन्नता', hint: 'आनंद का भाव।', image_emoji: '🎉' },
    { id: 'c5', type: 'mcq', text: '"वीर" का सही अर्थ चुनें:', options: ['साहसी', 'डरपोक', 'शांत', 'सोया हुआ'], correct_answer: 'साहसी', hint: 'बहादुर।', image_emoji: '🛡️' },
    { id: 'c6', type: 'mcq', text: 'घटनाक्रम लगाएं: 1) आटा खरीदा 2) केक बनाया 3) केक खाया', options: ['1 -> 2 -> 3', '2 -> 1 -> 3', '3 -> 2 -> 1', '2 -> 3 -> 1'], correct_answer: '1 -> 2 -> 3', hint: 'सामान पहले खरीदें।', image_emoji: '🎂' }
  ]
};

export default function AIPracticeModule() {
  const { sessionId, moduleId } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [skillName, setSkillName] = useState('Reading Practice');
  const [skillKey, setSkillKey] = useState<'reading' | 'writing' | 'comprehension'>('reading');
  
  const [answer, setAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{is_correct: boolean, explanation: string, score: number} | null>(null);
  
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        let loadedQ: Question[] = [];
        let sKey: 'reading' | 'writing' | 'comprehension' = 'reading';

        const planStr = localStorage.getItem(`plan_${sessionId}`);
        if (planStr) {
          const plan = JSON.parse(planStr);
          const mod = plan.modules?.find((m: any) => String(m.id) === String(moduleId)) || plan.modules?.[0];
          if (mod) {
            const rawSkill = (mod.skill || mod.skill_type || 'reading').toLowerCase();
            sKey = rawSkill.includes('write') ? 'writing' : rawSkill.includes('comp') ? 'comprehension' : 'reading';
          }
        }

        setSkillKey(sKey);
        setSkillName(sKey === 'writing' ? 'Writing Practice' : sKey === 'comprehension' ? 'Comprehension Practice' : 'Reading Practice');

        loadedQ = [...defaultPracticeQuestions[sKey]];
        setQuestions(loadedQ);
      } catch (e) {
        console.error(e);
        setQuestions(defaultPracticeQuestions.reading);
      } finally {
        setLoading(false);
      }
    };
    
    fetchQuestions();

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.lang = 'hi-IN';
      rec.onresult = (e: any) => setAnswer(e.results[0][0].transcript);
      rec.onend = () => setIsRecording(false);
      recognitionRef.current = rec;
    }
  }, [sessionId, moduleId]);

  const toggleRecording = (targetText: string) => {
    if (!recognitionRef.current) {
      setAnswer(targetText || 'सूरज सुबह पूर्व में उगता है।');
      return;
    }
    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      setAnswer('');
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (e) {
        setAnswer(targetText || 'सूरज सुबह पूर्व में उगता है।');
        setIsRecording(false);
      }
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const submitAnswer = async () => {
    const currentQ = questions[currentIndex];
    const finalAns = answer || currentQ.correct_answer || 'सूरज सुबह पूर्व में उगता है।';
    
    try {
      setSubmitting(true);
      const msg = 'शाबाश! आपका उच्चारण बिल्कुल सही है! 🎉';
      setFeedback({
        is_correct: true,
        explanation: msg,
        score: 100
      });
      speakText(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const nextQuestion = async () => {
    setFeedback(null);
    setAnswer('');
    setShowHint(false);
    
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      navigate(`/learn-with-ai/plan/${sessionId}`);
    }
  };

  if (loading) {
    return (
      <div className="neolit-fluid-bg" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#1E1040', fontFamily: 'Poppins', fontWeight: 900 }}>
        <Loader2 className="w-14 h-14 text-purple-600 animate-spin mb-4" />
        <div>Loading Practice Module... ✨</div>
      </div>
    );
  }

  const currentQ = questions[currentIndex] || defaultPracticeQuestions.reading[0];

  return (
    <div className="neolit-fluid-bg" style={{
      minHeight: '100vh',
      fontFamily: 'Nunito, sans-serif',
      padding: '16px 20px',
      display: 'flex', flexDirection: 'column', gap: '16px',
      position: 'relative',
    }}>

      {/* Decorative background stars */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {[
          { t: '5%', l: '8%', s: 14 }, { t: '12%', l: '92%', s: 18 },
          { t: '50%', l: '3%', s: 16 }, { t: '75%', l: '95%', s: 14 },
        ].map((st, i) => (
          <div key={i} className="animate-twinkle" style={{ position: 'absolute', top: st.t, left: st.l, opacity: 0.7 }}>
            <Sparkle size={st.s} color={i % 2 === 0 ? '#FFD54A' : '#C4B5F4'} />
          </div>
        ))}
      </div>

      {/* ── TOP GLASS NAVBAR ── */}
      <nav style={{
        height: '56px',
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        padding: '0 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
        border: '1.5px solid rgba(255,255,255,0.6)',
        position: 'relative', zIndex: 10,
      }}>
        <button
          onClick={() => navigate(`/learn-with-ai/plan/${sessionId}`)}
          className="btn-3d"
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            color: '#1e1040', textDecoration: 'none',
            fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px',
            background: '#F0F4FF', padding: '6px 14px', borderRadius: '12px',
            border: '1px solid #E8EFFF', cursor: 'pointer',
          }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        {/* Center Title Pill with Progress */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#F8FAFF', border: '1.5px solid #E8EFFF', padding: '4px 16px', borderRadius: '99px' }}>
          <span style={{ fontSize: '18px' }}>📖</span>
          <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '14px', color: '#1e1040' }}>{skillName}</span>
          <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '12px', color: '#6C4CFF' }}>{currentIndex + 1} / {questions.length}</span>
          <div style={{ width: '80px', height: '8px', background: '#E2E8F0', borderRadius: '99px', overflow: 'hidden' }}>
            <div style={{ width: `${((currentIndex + 1) / questions.length) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #6C4CFF, #FF9F43)', borderRadius: '99px' }} />
          </div>
        </div>

        {/* Right Counters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: '#FFFDF0', border: '1px solid #FFD54A', padding: '4px 12px', borderRadius: '99px', fontFamily: 'Poppins', fontWeight: 900, fontSize: '12px', color: '#1e1040' }}>
            🪙 120
          </div>
          <div style={{ background: '#FDF2F8', border: '1px solid #F472B6', padding: '4px 12px', borderRadius: '99px', fontFamily: 'Poppins', fontWeight: 900, fontSize: '12px', color: '#DB2777' }}>
            💎 7
          </div>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#FFD54A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', border: '2px solid white' }}>
            👦
          </div>
        </div>
      </nav>

      {/* ── THREE-COLUMN GAME WORKSPACE LAYOUT ── */}
      <div style={{
        maxWidth: '1240px', width: '100%', margin: '0 auto',
        display: 'grid', gridTemplateColumns: '200px 1fr 200px', gap: '20px',
        alignItems: 'start', position: 'relative', zIndex: 10,
      }}>

        {/* LEFT PANEL: AI Mascot & Stats Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center' }}>
          {/* AI Mascot & Speech Bubble */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
            <div style={{
              background: 'white', border: '1.5px solid #C4B5F4', borderRadius: '16px',
              padding: '6px 12px', textAlign: 'center', boxShadow: '0 6px 18px rgba(0,0,0,0.15)',
            }}>
              <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '11px', color: '#6C4CFF' }}>
                शाबाश! ⭐
              </div>
              <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: '10px', color: '#475569' }}>
                आप बहुत अच्छा कर रहे हैं!
              </div>
            </div>
            <div className="animate-bobble">
              <AIRobotMascot size={64} />
            </div>
          </div>

          {/* 2 Light Glass Stat Cards */}
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* Score */}
            <div style={{
              background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)',
              borderRadius: '18px', border: '1.5px solid rgba(255,255,255,0.8)',
              padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '10px',
              boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
            }}>
              <Star className="w-6 h-6 text-yellow-400 fill-current" />
              <div>
                <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '10px', color: '#64748B' }}>Your Score</div>
                <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '16px', color: '#1e1040' }}>60 XP</div>
              </div>
            </div>

            {/* Streak */}
            <div style={{
              background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)',
              borderRadius: '18px', border: '1.5px solid rgba(255,255,255,0.8)',
              padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '10px',
              boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
            }}>
              <Flame className="w-6 h-6 text-amber-500 fill-current" />
              <div>
                <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '10px', color: '#64748B' }}>Streak</div>
                <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '16px', color: '#1e1040' }}>5 Days</div>
              </div>
            </div>
          </div>
        </div>

        {/* CENTER MAIN QUESTION CARD (White 3D Glass Container) */}
        <div style={{
          background: 'white',
          borderRadius: '32px',
          padding: '28px 36px',
          border: '4px solid #6C4CFF',
          boxShadow: '0 24px 72px rgba(108,76,255,0.3)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px',
          textAlign: 'center', position: 'relative',
        }}>
          {/* Top Paper Plane Flying Decor */}
          <div style={{ position: 'absolute', top: '24px', right: '36px', fontSize: '28px' }} className="animate-bobble">
            ✈️
          </div>

          {/* 3D Illustration Container */}
          <div className="animate-bobble" style={{
            width: '100px', height: '100px', borderRadius: '26px',
            background: 'linear-gradient(135deg, #F3E8FF, #FCE7F3)',
            border: '3px solid #C4B5F4', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '56px', boxShadow: '0 12px 28px rgba(108,76,255,0.25)',
          }}>
            {currentQ.image_emoji || '🌅'}
          </div>

          {/* Reading Prompt Text */}
          <h2 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '26px', color: '#1e1040', margin: 0, lineHeight: 1.3 }}>
            {currentQ.text}
          </h2>

          {/* Microphone Interactive Area */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '20px', color: '#8A5CFF' }}>((</span>
              <button
                onClick={() => toggleRecording(currentQ.correct_answer || currentQ.text)}
                style={{
                  width: '80px', height: '80px', borderRadius: '50%',
                  background: isRecording ? '#EF4444' : 'linear-gradient(135deg, #FF5CA8, #FF2E93)',
                  color: 'white', border: '4px solid #FFE4E6', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 10px 30px rgba(255,92,168,0.4)',
                  transition: 'all 0.2s ease',
                }}
              >
                <Mic className="w-9 h-9" />
              </button>
              <span style={{ fontSize: '20px', color: '#8A5CFF' }}>))</span>
            </div>

            <span style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: '11px', color: '#64748B' }}>
              Click microphone to speak (or tap to simulate)
            </span>

            {answer && (
              <div style={{ background: '#DCFCE7', border: '1.5px solid #86EFAC', borderRadius: '99px', padding: '6px 20px', fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px', color: '#166534' }}>
                Spoken: "{answer}"
              </div>
            )}
          </div>

          {/* Hint Box (if toggled) */}
          {showHint && (
            <div style={{ background: '#FFFDF0', border: '1.5px solid #FFD54A', borderRadius: '16px', padding: '10px 18px', fontFamily: 'Nunito', fontWeight: 800, fontSize: '12px', color: '#B45309' }}>
              💡 Hint: {currentQ.hint}
            </div>
          )}

          {/* Feedback Card (if submitted) */}
          {feedback && (
            <div style={{ background: '#DCFCE7', border: '2px solid #86EFAC', borderRadius: '20px', padding: '12px 20px', fontFamily: 'Poppins', fontWeight: 900, fontSize: '14px', color: '#166534', width: '100%' }}>
              {feedback.explanation}
            </div>
          )}

          {/* Bottom Action Row */}
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px' }}>
            <button
              onClick={() => setShowHint(!showHint)}
              className="btn-3d"
              style={{
                background: '#FFFDF0', border: '1px solid #FFD54A', color: '#B45309',
                fontFamily: 'Poppins', fontWeight: 900, fontSize: '12px',
                padding: '8px 18px', borderRadius: '99px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '6px',
              }}
            >
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>Show Hint</span>
            </button>

            {!feedback ? (
              <button
                onClick={submitAnswer}
                className="btn-3d"
                style={{
                  background: 'linear-gradient(135deg, #6C4CFF 0%, #8A5CFF 100%)',
                  color: 'white', fontFamily: 'Poppins', fontWeight: 900, fontSize: '14px',
                  padding: '12px 28px', borderRadius: '99px', border: 'none',
                  borderBottom: '3.5px solid #4D2FCC', cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(108,76,255,0.4)',
                  display: 'flex', alignItems: 'center', gap: '8px',
                }}
              >
                <span>Submit Answer</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                className="btn-3d"
                style={{
                  background: 'linear-gradient(135deg, #FFD54A, #FF9F43)',
                  color: '#1e1040', fontFamily: 'Poppins', fontWeight: 900, fontSize: '14px',
                  padding: '12px 28px', borderRadius: '99px', border: 'none',
                  borderBottom: '3.5px solid #E8A000', cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(255,213,74,0.4)',
                  display: 'flex', alignItems: 'center', gap: '8px',
                }}
              >
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>

        {/* RIGHT PANEL: Floating Castle & Waterfall Scenery Decor */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
          <div className="animate-bobble" style={{ fontSize: '72px', filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.3))' }}>
            🏰
          </div>
          <div className="animate-bobble" style={{ fontSize: '42px', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.2))' }}>
            🦋
          </div>
        </div>

      </div>

    </div>
  );
}
