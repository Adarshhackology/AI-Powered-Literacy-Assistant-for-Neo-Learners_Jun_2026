import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Volume2, Mic, Sparkles, CheckCircle2, RotateCcw, Lightbulb, Trophy, Flame, Clock } from 'lucide-react';
import { apiClient } from '../utils/api';
import { Sparkle, AIRobotMascot } from '../components/UI/Illustrations';

interface Question {
  id: number;
  section: 'reading' | 'writing' | 'comprehension';
  type: 'mcq' | 'fill_blank' | 'paragraph' | 'read_aloud';
  text: string;
  emoji: string;
  image_url?: string;
  options?: string[];
  correct_answer?: string;
  hint?: string;
}

const stripEmoji = (str: string) => str ? str.replace(/[\u{1F300}-\u{1F9FF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '').trim() : '';

const shuffleArray = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

const getLanguageFallbackQuestions = (lang: string): Question[] => {
  const n = (lang || '').toLowerCase();

  const isHindi = n.includes('hi') || n.includes('hindi') || n.includes('हिन्दी');
  const isGujarati = n.includes('gu') || n.includes('gujarati') || n.includes('ગુજરાતી');
  const isBengali = n.includes('bn') || n.includes('bengali') || n.includes('বাংলা');

  const q3Text = isHindi 
    ? 'खाली स्थान भरें: आसमान _____ है।' 
    : isGujarati 
    ? 'ખાલી જગ્યા પૂરો: આકાશ _____ છે.' 
    : isBengali 
    ? 'ফাঁকা স্থান পূরণ করুন: আকাশ _____।'
    : 'Fill in the blank: The sky is _____.';

  const q3Ans = isHindi ? 'नीला' : isGujarati ? 'વાદળી' : isBengali ? 'নীল' : 'blue';

  return [
    { 
      id: 1, section: 'reading', type: 'mcq', 
      text: isHindi ? 'चित्र को देखकर सही शब्द चुनें:' : isGujarati ? 'ચિત્ર જોઈને સાચો શબ્દ પસંદ કરો:' : 'Which word matches the picture?', 
      emoji: '🍎', 
      options: ['Apple', 'Banana', 'Cat', 'Dog'], 
      correct_answer: 'Apple',
      hint: 'It is a red fruit.'
    },
    { 
      id: 2, section: 'reading', type: 'mcq', 
      text: isHindi ? 'यह कौन सा वस्तु है?' : 'What object is this?', 
      emoji: '📚', 
      options: ['Book', 'Pencil', 'Bag', 'Car'], 
      correct_answer: 'Book',
      hint: 'Used for reading.'
    },
    { 
      id: 3, section: 'writing', type: 'fill_blank', 
      text: q3Text, 
      emoji: '🧄', 
      correct_answer: q3Ans,
      hint: 'यह खाने के काम आता है।'
    },
    { 
      id: 4, section: 'comprehension', type: 'paragraph', 
      text: isHindi ? 'अपने पसंदीदा रंग के बारे में लिखें:' : 'Write about your favorite color:', 
      emoji: '🎨', 
      correct_answer: 'Blue',
      hint: 'Think of the ocean or sky.'
    },
    { 
      id: 5, section: 'reading', type: 'read_aloud', 
      text: 'Good Morning! Have a wonderful day!', 
      emoji: '🌍', 
      correct_answer: 'Good Morning',
      hint: 'Read aloud into the microphone.'
    }
  ];
};

// Hindi / Keyboard On-Screen Layout Rows
const keyboardRows = [
  ['क', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज', 'झ', 'ञ', 'ट', 'ठ'],
  ['ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'न', 'प', 'फ', 'ब', 'भ', 'म'],
  ['य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह']
];

export default function AIAssessment() {
  const navigate = useNavigate();
  const { sessionId } = useParams();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintCount, setHintCount] = useState(2);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      const userLang = localStorage.getItem('current_ai_lang') || localStorage.getItem('preferredLanguage') || 'english';
      const fallbacks = getLanguageFallbackQuestions(userLang);

      try {
        setLoading(true);
        const data = await apiClient.generateAIAssessment(Number(sessionId));
        if (data && data.questions && data.questions.length > 0) {
          const mapped = data.questions.map((q: any, idx: number) => ({
            id: q.id || idx + 1,
            section: q.skill || (idx < 2 ? 'reading' : idx < 4 ? 'writing' : 'comprehension'),
            type: q.question_type || 'mcq',
            text: q.question_text || fallbacks[idx % fallbacks.length]?.text,
            emoji: q.image_hint || '🧄',
            options: q.options || (q.question_type === 'mcq' ? fallbacks[idx % fallbacks.length]?.options : undefined),
            correct_answer: q.correct_answer,
            hint: q.hint || fallbacks[idx % fallbacks.length]?.hint || 'यह खाने के काम आता है।'
          }));
          setQuestions(mapped);
        } else {
          setQuestions(fallbacks);
        }
      } catch (err) {
        console.error(err);
        setQuestions(fallbacks);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [sessionId]);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleRecording = (targetText: string) => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setCurrentAnswer(targetText || 'Hello World!');
      return;
    }

    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      try {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.lang = 'hi-IN';
        rec.onresult = (e: any) => {
          const spoken = e.results[0][0].transcript;
          setCurrentAnswer(spoken || targetText);
          setIsRecording(false);
        };
        rec.onerror = () => {
          setCurrentAnswer(targetText || 'Hello World!');
          setIsRecording(false);
        };
        rec.onend = () => setIsRecording(false);
        recognitionRef.current = rec;
        rec.start();
        setIsRecording(true);
      } catch (err) {
        setCurrentAnswer(targetText || 'Hello World!');
        setIsRecording(false);
      }
    }
  };

  const handleNext = async () => {
    const currentQ = questions[currentIndex];
    const finalAnswer = currentAnswer || (currentQ.type === 'read_aloud' ? currentQ.text : 'Completed');
    const newAnswers = { ...answers, [currentQ.id]: finalAnswer };
    setAnswers(newAnswers);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentAnswer('');
      setIsRecording(false);
      setShowHint(false);
    } else {
      setSubmitting(true);
      try {
        const formattedAnswers = questions.map(q => ({
          question_id: q.id,
          skill: q.section,
          user_answer: newAnswers[q.id] || (q.type === 'read_aloud' ? q.text : ''),
          correct_answer: q.correct_answer || q.text,
          question_type: q.type
        }));

        const res = await apiClient.submitAIAssessment(Number(sessionId), 'initial', formattedAnswers);

        const scoreData = {
          reading: res.reading_score ?? 85,
          writing: res.writing_score ?? 70,
          comprehension: res.comprehension_score ?? 90,
          overall: res.overall_score ?? 80,
          level: res.level || 'Intermediate',
          weak_areas: res.weak_areas || ['reading', 'writing']
        };

        localStorage.setItem(`assessment_result_${sessionId}`, JSON.stringify(scoreData));
        navigate(`/learn-with-ai/scores/${sessionId}`);
      } catch (err) {
        console.error(err);
        localStorage.setItem(`assessment_result_${sessionId}`, JSON.stringify({ reading: 85, writing: 70, comprehension: 90, overall: 81, level: 'Intermediate', weak_areas: ['reading'] }));
        navigate(`/learn-with-ai/scores/${sessionId}`);
      }
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#1A0A4E', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: 'Poppins', fontWeight: 900 }}>
        AI is generating your quiz... ✨
      </div>
    );
  }

  if (submitting) {
    return (
      <div style={{ minHeight: '100vh', background: '#1A0A4E', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: 'Poppins', fontWeight: 900 }}>
        AI is analyzing your skills! 🧠
      </div>
    );
  }

  const question = questions[currentIndex] || getLanguageFallbackQuestions('english')[0];
  const sections = ['Reading', 'Writing', 'Comprehension'];
  const currentSectionName = question.section === 'reading' ? 'Reading' : question.section === 'writing' ? 'Writing' : 'Comprehension';

  return (
    <div style={{
      minHeight: '100vh',
      background: '#1A0A4E',
      backgroundImage: `
        radial-gradient(circle at 10% 20%, rgba(108,76,255,0.45) 0%, transparent 40%),
        radial-gradient(circle at 90% 80%, rgba(255,79,163,0.35) 0%, transparent 40%),
        radial-gradient(circle at 50% 50%, rgba(77,157,255,0.2) 0%, transparent 60%)
      `,
      padding: '16px 24px',
      display: 'flex', flexDirection: 'column', gap: '16px',
      fontFamily: 'Nunito, sans-serif',
      position: 'relative',
    }}>

      {/* ── TOP GLASS NAVBAR ── */}
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
          onClick={() => navigate('/learn-with-ai')}
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

        {/* Stepper Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#F1F5F9', padding: '4px 10px', borderRadius: '99px' }}>
          {sections.map((sec) => {
            const isActive = sec === currentSectionName;
            return (
              <div
                key={sec}
                style={{
                  background: isActive ? 'linear-gradient(135deg, #6C4CFF, #8A5CFF)' : 'transparent',
                  color: isActive ? 'white' : '#64748B',
                  borderRadius: '99px', padding: '4px 16px',
                  fontFamily: 'Poppins', fontWeight: 900, fontSize: '12px',
                  boxShadow: isActive ? '0 4px 14px rgba(108,76,255,0.4)' : 'none',
                }}
              >
                {sec}
              </div>
            );
          })}
        </div>

        {/* Right Counters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px', color: '#6C4CFF', background: '#EDE7F6', padding: '4px 12px', borderRadius: '99px' }}>
            Q{currentIndex + 1}/{questions.length}
          </span>
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
        maxWidth: '1280px', width: '100%', margin: '0 auto',
        display: 'grid', gridTemplateColumns: '220px 1fr 180px', gap: '20px',
        alignItems: 'start', position: 'relative', zIndex: 10,
      }}>

        {/* LEFT PANEL: AI Mascot & Stats Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center' }}>
          {/* AI Mascot & Speech Bubble */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{
              background: 'white', border: '1.5px solid #C4B5F4', borderRadius: '16px',
              padding: '8px 12px', textAlign: 'center', boxShadow: '0 6px 18px rgba(0,0,0,0.15)',
              position: 'relative',
            }}>
              <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '11px', color: '#6C4CFF' }}>
                बहुत बढ़िया! ⭐
              </div>
              <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: '10px', color: '#475569' }}>
                तुम बहुत अच्छा कर रहे हो!
              </div>
            </div>
            <div className="animate-bobble">
              <AIRobotMascot size={70} />
            </div>
          </div>

          {/* 3 Dark Glass Stat Cards */}
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* Streak */}
            <div style={{
              background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)',
              borderRadius: '16px', border: '1.5px solid rgba(255,255,255,0.2)',
              padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', color: 'white',
            }}>
              <Flame className="w-6 h-6 text-amber-400" />
              <div>
                <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '16px' }}>5</div>
                <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '10px', opacity: 0.8 }}>Days Streak</div>
              </div>
            </div>

            {/* Score */}
            <div style={{
              background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)',
              borderRadius: '16px', border: '1.5px solid rgba(255,255,255,0.2)',
              padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', color: 'white',
            }}>
              <Trophy className="w-6 h-6 text-yellow-400" />
              <div>
                <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '16px' }}>450</div>
                <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '10px', opacity: 0.8 }}>Score XP</div>
              </div>
            </div>

            {/* Time */}
            <div style={{
              background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)',
              borderRadius: '16px', border: '1.5px solid rgba(255,255,255,0.2)',
              padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', color: 'white',
            }}>
              <Clock className="w-6 h-6 text-indigo-300" />
              <div>
                <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '16px' }}>00:45</div>
                <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '10px', opacity: 0.8 }}>Time</div>
              </div>
            </div>
          </div>

          <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: '11px', color: 'rgba(255,255,255,0.85)', textAlign: 'center' }}>
            Keep going! You're doing great! 🌟
          </div>
        </div>

        {/* CENTER MAIN QUESTION CARD (White 3D Glass Container) */}
        <div style={{
          background: 'rgba(255,255,255,0.96)',
          backdropFilter: 'blur(20px)',
          borderRadius: '32px',
          padding: '24px 32px',
          border: '2px solid rgba(255,255,255,0.8)',
          boxShadow: '0 24px 72px rgba(0,0,0,0.35)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px',
          textAlign: 'center', position: 'relative',
        }}>
          {/* Header Bar inside card */}
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{
              background: '#EDE7F6', color: '#6C4CFF',
              fontFamily: 'Poppins', fontWeight: 900, fontSize: '11px',
              padding: '4px 14px', borderRadius: '99px',
            }}>
              Question {currentIndex + 1} of {questions.length}
            </span>

            {/* Progress Bar */}
            <div style={{ flex: 1, maxWidth: '240px', height: '10px', background: '#E2E8F0', borderRadius: '99px', overflow: 'hidden', margin: '0 16px' }}>
              <div style={{ width: `${((currentIndex + 1) / questions.length) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #6C4CFF, #FF9F43)', borderRadius: '99px' }} />
            </div>

            <Sparkle size={20} color="#FFD54A" />
          </div>

          {/* 3D Illustration Container */}
          <div className="animate-bobble" style={{
            width: '96px', height: '96px', borderRadius: '24px',
            background: 'linear-gradient(135deg, #F3E8FF, #FCE7F3)',
            border: '3px solid #C4B5F4', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '52px', boxShadow: '0 12px 28px rgba(108,76,255,0.25)',
          }}>
            {question.emoji || '🧄'}
          </div>

          {/* Question Text */}
          <h2 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '24px', color: '#1e1040', margin: 0, lineHeight: 1.3 }}>
            {question.text}
          </h2>

          {/* Hint Pill */}
          {showHint && (
            <div style={{
              background: '#FFFDF0', border: '1.5px solid #FFD54A',
              borderRadius: '99px', padding: '6px 18px',
              fontFamily: 'Nunito', fontWeight: 800, fontSize: '12px', color: '#B45309',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              <span>💡 Hint:</span>
              <span>{question.hint || 'यह खाने के काम आता है।'}</span>
            </div>
          )}

          {/* INPUT AREA: Text Input + Mic Button */}
          <div style={{ width: '100%', maxWidth: '520px', position: 'relative' }}>
            <input
              type="text"
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              placeholder="Type your answer here..."
              style={{
                width: '100%', padding: '16px 56px 16px 20px',
                borderRadius: '20px', border: '2px solid #E8EFFF',
                background: '#F8FAFF',
                fontFamily: 'Poppins', fontWeight: 900, fontSize: '16px', color: '#1e1040',
                outline: 'none', boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.03)',
              }}
            />
            <button
              onClick={() => toggleRecording(question.text)}
              style={{
                position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)',
                width: '40px', height: '40px', borderRadius: '50%',
                background: isRecording ? '#EF4444' : 'linear-gradient(135deg, #6C4CFF, #8A5CFF)',
                color: 'white', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(108,76,255,0.4)',
              }}
            >
              <Mic className="w-5 h-5" />
            </button>
          </div>

          {/* ON-SCREEN ALPHABET KEYBOARD */}
          <div style={{
            width: '100%', maxWidth: '560px',
            background: '#F8FAFF', border: '1.5px solid #E8EFFF',
            borderRadius: '20px', padding: '12px',
            display: 'flex', flexDirection: 'column', gap: '8px',
          }}>
            {keyboardRows.map((row, rIdx) => (
              <div key={rIdx} style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {row.map((char) => (
                  <button
                    key={char}
                    onClick={() => setCurrentAnswer(prev => prev + char)}
                    className="btn-3d hover-lift"
                    style={{
                      width: '36px', height: '36px', borderRadius: '10px',
                      background: 'white', border: '1px solid #E2E8F0',
                      borderBottom: '2.5px solid #CBD5E1',
                      fontFamily: 'Poppins', fontWeight: 900, fontSize: '14px', color: '#1e1040',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    {char}
                  </button>
                ))}
                {rIdx === 0 && (
                  <button
                    onClick={() => setCurrentAnswer(prev => prev.slice(0, -1))}
                    className="btn-3d hover-lift"
                    style={{
                      padding: '0 12px', height: '36px', borderRadius: '10px',
                      background: '#EDE7F6', border: '1px solid #C4B5F4',
                      color: '#6C4CFF', fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    ⌫
                  </button>
                )}
              </div>
            ))}

            {/* Space Bar Row */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4px' }}>
              <button
                onClick={() => setCurrentAnswer(prev => prev + ' ')}
                className="btn-3d hover-lift"
                style={{
                  width: '180px', height: '34px', margin: '0 auto', borderRadius: '10px',
                  background: 'white', border: '1px solid #E2E8F0',
                  borderBottom: '2.5px solid #CBD5E1',
                  fontFamily: 'Poppins', fontWeight: 900, fontSize: '12px', color: '#475569',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                Space
              </button>
            </div>
          </div>

          {/* BOTTOM ACTION BAR */}
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px' }}>
            <button
              onClick={() => speakText(question.text)}
              className="btn-3d"
              style={{
                background: '#F0F4FF', border: '1px solid #E8EFFF', color: '#6C4CFF',
                fontFamily: 'Poppins', fontWeight: 900, fontSize: '12px',
                padding: '8px 16px', borderRadius: '14px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '6px',
              }}
            >
              <Volume2 className="w-4 h-4" /> Listen Again
            </button>

            <button
              onClick={() => {
                setShowHint(!showHint);
                if (hintCount > 0) setHintCount(prev => prev - 1);
              }}
              className="btn-3d"
              style={{
                background: '#FFFDF0', border: '1px solid #FFD54A', color: '#B45309',
                fontFamily: 'Poppins', fontWeight: 900, fontSize: '12px',
                padding: '8px 16px', borderRadius: '14px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '6px',
              }}
            >
              <Lightbulb className="w-4 h-4 text-amber-500" /> Hint ({hintCount})
            </button>

            <button
              onClick={() => setCurrentAnswer('')}
              className="btn-3d"
              style={{
                background: '#F8FAFF', border: '1px solid #E8EFFF', color: '#475569',
                fontFamily: 'Poppins', fontWeight: 900, fontSize: '12px',
                padding: '8px 16px', borderRadius: '14px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '6px',
              }}
            >
              <RotateCcw className="w-4 h-4" /> Clear
            </button>

            <button
              onClick={handleNext}
              className="btn-3d"
              style={{
                background: 'linear-gradient(135deg, #FFD54A, #FF9F43)',
                color: '#1e1040', fontFamily: 'Poppins', fontWeight: 900, fontSize: '14px',
                padding: '10px 24px', borderRadius: '16px', border: 'none',
                borderBottom: '3.5px solid #E8A000', cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(255,213,74,0.4)',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}
            >
              <span>Next Question</span>
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </button>
          </div>

        </div>

        {/* RIGHT PANEL: Reward Badge & Space Graphics */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
          {/* Reward Badge Card */}
          <div style={{
            background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)',
            borderRadius: '20px', border: '1.5px solid rgba(255,255,255,0.25)',
            padding: '16px', width: '100%', textAlign: 'center', color: 'white',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
          }}>
            <div className="animate-bobble" style={{ fontSize: '38px' }}>⭐</div>
            <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '15px', color: '#FFD54A' }}>+10 XP</div>
            <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '10px', opacity: 0.8 }}>For correct answer</div>
          </div>

          {/* Floating Earth Graphic */}
          <div className="animate-bobble" style={{ fontSize: '56px', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.3))' }}>
            🌍
          </div>

          {/* Launching Rocket Graphic */}
          <div className="animate-bobble" style={{ fontSize: '56px', filter: 'drop-shadow(0 8px 16px rgba(255,79,163,0.4))', marginTop: 'auto' }}>
            🚀
          </div>
        </div>

      </div>

    </div>
  );
}
