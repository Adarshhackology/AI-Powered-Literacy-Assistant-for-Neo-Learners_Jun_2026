import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BookOpen, Edit3, Brain, ArrowRight, Mic, Sparkles, CheckCircle2, ArrowLeft } from 'lucide-react';
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
}

const stripEmoji = (str: string) => str ? str.replace(/[\u{1F300}-\u{1F9FF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '').trim() : '';

const shuffleArray = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

const getLanguageFallbackQuestions = (lang: string): Question[] => {
  const n = (lang || '').toLowerCase();

  const isHindi = n.includes('hi') || n.includes('hindi') || n.includes('हिन्दी');
  const isGujarati = n.includes('gu') || n.includes('gujarati') || n.includes('ગુજરાતી');
  const isBengali = n.includes('bn') || n.includes('bengali') || n.includes('বাংলা');
  const isMarathi = n.includes('mr') || n.includes('marathi') || n.includes('मराठी');
  const isKannada = n.includes('kn') || n.includes('kannada') || n.includes('ಕನ್ನಡ');
  const isMalayalam = n.includes('ml') || n.includes('malayalam') || n.includes('മലയാളം');
  const isPunjabi = n.includes('pa') || n.includes('punjabi') || n.includes('ਪੰਜਾਬੀ');
  const isUrdu = n.includes('ur') || n.includes('urdu') || n.includes('اردو');
  const isOdia = n.includes('or') || n.includes('odia') || n.includes('ଓଡ଼ିଆ');
  const isAssamese = n.includes('as') || n.includes('assamese') || n.includes('অসমীয়া');
  const isSanskrit = n.includes('sa') || n.includes('sanskrit') || n.includes('संस्कृतम्');
  const isTelugu = n.includes('te') || n.includes('telugu') || n.includes('తెలుగు');
  const isTamil = n.includes('ta') || n.includes('tamil') || n.includes('தமிழ்');

  const vocabPool = [
    { emoji: '🍎', hi: 'सेब', gu: 'સફરજન', bn: 'আপেল', mr: 'सफरचंद', kn: 'ಸೇಬು', ml: 'ആപ്പിൾ', pa: 'ਸੇਬ', ur: 'سیب', or: 'ସେଓ', as: 'আপেল', sa: 'सेवफलम्', te: 'యాపిల్', ta: 'ஆப்பிள்', en: 'Apple',
      disEn: ['Banana', 'Cat', 'Dog'], disHi: ['केला', 'बिल्ली', 'कुत्ता'], disGu: ['કેળું', 'બિલાડી', 'કૂતરો'], disBn: ['কলা', 'বিড়াল', 'কুকুর'], disMr: ['केळी', 'मांजर', 'कुत्रा'], disKn: ['ಬಾಳೆಹಣ್ಣು', 'ಬೆಕ್ಕು', 'ನಾಯಿ'], disMl: ['വാഴപ്പഴം', 'പൂച്ച', 'പട്ടി'], disPa: ['ਕੇਲਾ', 'ਬਿੱਲੀ', 'ਕੁੱਤਾ'], disUr: ['کیلا', 'بلی', 'کتا'], disOr: ['କଦଳୀ', 'ବିଲେଇ', 'କୁକୁର'], disAs: ['কল', 'মেকুৰী', 'কুকুৰ'], disSa: ['कदलीफलम्', 'मार्जारी', 'कुक्कुरः'], disTe: ['అరటి', 'పిల్లి', 'కుక్క'], disTa: ['வாழைப்பழம்', 'பூனை', 'நாய்'] },
    
    { emoji: '🐶', hi: 'कुत्ता', gu: 'કૂતરો', bn: 'কুকুর', mr: 'कुत्रा', kn: 'ನಾಯಿ', ml: 'പട്ടി', pa: 'ਕੁੱਤਾ', ur: 'کتا', or: 'କୁକୁର', as: 'কুকুৰ', sa: 'कुक्कुरः', te: 'కుక్క', ta: 'நாய்', en: 'Dog',
      disEn: ['Cat', 'Bird', 'Fish'], disHi: ['बिल्ली', 'पक्षी', 'मछली'], disGu: ['બિલાડી', 'પક્ષી', 'માછલી'], disBn: ['বিড়াল', 'পাখি', 'মাছ'], disMr: ['मांजर', 'पक्षी', 'मासा'], disKn: ['ಬೆಕ್ಕು', 'ಪಕ್ಷಿ', 'ಮೀನು'], disMl: ['പൂച്ച', 'പക്ഷി', 'മീൻ'], disPa: ['ਬਿੱਲੀ', 'ਪੰਛੀ', 'ਮੱਛੀ'], disUr: ['بلی', 'پرندہ', 'مچھلی'], disOr: ['ବିଲେଇ', 'ପକ୍ଷୀ', 'ମାଛ'], disAs: ['মেকুৰী', 'চৰাই', 'মাছ'], disSa: ['मार्जारी', 'खगः', 'मत्स्यः'], disTe: ['పిల్లి', 'పక్షి', 'చేప'], disTa: ['பூனை', 'பறவை', 'மீன்'] },
    
    { emoji: '📚', hi: 'किताब', gu: 'પુસ્તક', bn: 'বই', mr: 'पुस्तक', kn: 'ಪುಸ್ತಕ', ml: 'പുസ്തകം', pa: 'ਕਿਤਾਬ', ur: 'کتاب', or: 'ପୁସ୍ତକ', as: 'কিতাপ', sa: 'पुस्तकम्', te: 'పుస్తకం', ta: 'புத்தகம்', en: 'Book',
      disEn: ['Pencil', 'Bag', 'Car'], disHi: ['पेंसिल', 'बैग', 'गाड़ी'], disGu: ['પેન્સિલ', 'બેગ', 'ગાડી'], disBn: ['পেন্সিল', 'ব্যাগ', 'গাড়ি'], disMr: ['पेन्सिल', 'पिशवी', 'गाडी'], disKn: ['ಪೆನ್ಸಿಲ್', 'ಬ್ಯಾಗ್', 'ಕಾರು'], disMl: ['പെൻസിൽ', 'ബാഗ്', 'കാർ'], disPa: ['ਪੈਨਸਿਲ', 'ਬੈਗ', 'ਕਾਰ'], disUr: ['پنسل', 'بیگ', 'گاڑی'], disOr: ['ପେନ୍ସିଲ୍', 'ବ୍ୟାଗ୍', 'ଗାଡି'], disAs: ['পেঞ্চিল', 'বেগ', 'গাড়ী'], disSa: ['लेखनी', 'स्यूतः', 'यानम्'], disTe: ['పెన్సిల్', 'బ్యాగ్', 'కారు'], disTa: ['பென்சில்', 'பை', 'கார்'] },
  ];

  const shuffledVocab = shuffleArray(vocabPool);
  const v1 = shuffledVocab[0];
  const v2 = shuffledVocab[1];

  const getWord = (item: any) => isHindi ? item.hi : isGujarati ? item.gu : isBengali ? item.bn : isMarathi ? item.mr : isKannada ? item.kn : isMalayalam ? item.ml : isPunjabi ? item.pa : isUrdu ? item.ur : isOdia ? item.or : isAssamese ? item.as : isSanskrit ? item.sa : isTelugu ? item.te : isTamil ? item.ta : item.en;
  const getDis = (item: any) => isHindi ? item.disHi : isGujarati ? item.disGu : isBengali ? item.disBn : isMarathi ? item.disMr : isKannada ? item.disKn : isMalayalam ? item.disMl : isPunjabi ? item.disPa : isUrdu ? item.disUr : isOdia ? item.disOr : isAssamese ? item.disAs : isSanskrit ? item.disSa : isTelugu ? item.disTe : isTamil ? item.disTa : item.disEn;

  const promptQ1 = isHindi ? 'चित्र को देखकर सही शब्द चुनें:' : isGujarati ? 'ચિત્ર જોઈને સાચો શબ્દ પસંદ કરો:' : isBengali ? 'ছবি দেখে সঠিক শব্দটি বেছে নিন:' : isMarathi ? 'चित्र पाहून योग्य शब्द निवडा:' : isKannada ? 'ಚಿತ್ರವನ್ನು ನೋಡಿ ಸರಿಯಾದ ಪದವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ:' : isMalayalam ? 'ചിത്രം കണ്ട് ശരിയായ വാക്ക് തിരഞ്ഞെടുക്കുക:' : isPunjabi ? 'ਤਸਵੀਰ ਦੇਖ ਕੇ ਸਹੀ ਸ਼ਬਦ ਚੁਣੋ:' : isUrdu ? 'تصویر دیکھ کر درست لفظ منتخب کریں:' : isOdia ? 'ଚିତ୍ର ଦେଖି ସଠିକ୍ ଶବ୍ଦ ବାଛନ୍ତୁ:' : isAssamese ? 'ছবি চাই শুদ্ধ শব্দটো বাছক:' : isSanskrit ? 'चित्रं दृष्ट्वा उचितं शब्दं चिनुत:' : isTelugu ? 'చిత్రాన్ని చూసి సరైన పదాన్ని ఎంచుకోండి:' : isTamil ? 'படத்தைப் பார்த்து சரியான சொல்லைத் தேர்ந்தெடுக்கவும்:' : 'Which word matches the picture?';

  const promptQ2 = isHindi ? 'यह कौन सा जानवर / वस्तु है?' : isGujarati ? 'આ કયું પ્રાણી / વસ્તુ છે?' : isBengali ? 'এটি কোন প্রাণী / বস্তু?' : isMarathi ? 'हा कोणता प्राणी / वस्तू आहे?' : isKannada ? 'ಇದು ಯಾವ ಪ್ರಾಣಿ / ವಸ್ತು?' : isMalayalam ? 'ഇത് ഏത് മൃഗമാണ് / വസ്തുവാണ്?' : isPunjabi ? 'ਇਹ ਕਿਹੜਾ ਜਾਨਵਰ / ਚੀਜ਼ ਹੈ?' : isUrdu ? 'یہ کون سا جانور / چیز ہے؟' : isOdia ? 'ଏହା କେଉଁ ପଶୁ / ଜିନିଷ?' : isAssamese ? 'এইটো কি প্ৰাণী / বস্তু?' : isSanskrit ? 'एषः कः पशुः / वस्तु अस्ति?' : isTelugu ? 'ఇది ఏ జంతువు / వస్తువు?' : isTamil ? 'இது என்ன விலங்கு / பொருள்?' : 'What animal or object is this?';

  const promptQ3 = isHindi ? 'खाली स्थान भरें: आसमान _____ है।' : isGujarati ? 'ખાલી જગ્યા પૂરો: આકાશ _____ છે.' : 'The sky is ___';

  const ansQ3 = isHindi ? 'नीला' : isGujarati ? 'વાદળી' : 'blue';

  const promptQ4 = isHindi ? 'अपने पसंदीदा रंग के बारे में एक वाक्य लिखें।' : isGujarati ? 'તમારા મનપસંદ રંગ વિશે એક વાક્ય લખો.' : 'Write a sentence about your favorite color.';

  const promptQ5 = isHindi ? 'इसे जोर से पढ़ें: नमस्ते भारत!' : isGujarati ? 'આ મોટેથી વાંચો: નમસ્ਤੇ ભારત!' : 'Read this aloud: Hello World!';

  return [
    { id: 1, section: 'reading', type: 'mcq', text: promptQ1, emoji: v1.emoji, options: shuffleArray([getWord(v1), ...getDis(v1)]), correct_answer: getWord(v1) },
    { id: 2, section: 'reading', type: 'mcq', text: promptQ2, emoji: v2.emoji, options: shuffleArray([getWord(v2), ...getDis(v2)]), correct_answer: getWord(v2) },
    { id: 3, section: 'writing', type: 'fill_blank', text: promptQ3, emoji: '☁️', correct_answer: ansQ3 },
    { id: 4, section: 'comprehension', type: 'paragraph', text: promptQ4, emoji: '🎨', correct_answer: ansQ3 },
    { id: 5, section: 'reading', type: 'read_aloud', text: promptQ5, emoji: '🌍', correct_answer: 'Hello' }
  ];
};

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
            text: q.question_text || fallbacks[idx % fallbacks.length]?.text || 'Select the correct answer:',
            emoji: q.image_hint || '🌟',
            options: q.options || (q.question_type === 'mcq' ? fallbacks[idx % fallbacks.length]?.options || ['Apple', 'Banana', 'Cat', 'Dog'] : undefined),
            correct_answer: q.correct_answer
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
        rec.lang = 'en-US';
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
  const sections = ['reading', 'writing', 'comprehension'];
  const currentSection = question.section || 'reading';

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

      <div style={{ maxWidth: '840px', margin: '0 auto', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* Top Glass Nav Bar */}
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
              display: 'flex', alignItems: 'center', gap: '8px',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#F1F5F9', padding: '4px 8px', borderRadius: '99px' }}>
            {sections.map((sec) => (
              <div
                key={sec}
                style={{
                  background: sec === currentSection ? 'linear-gradient(135deg, #6C4CFF, #8A5CFF)' : 'transparent',
                  color: sec === currentSection ? 'white' : '#64748B',
                  borderRadius: '99px', padding: '4px 14px',
                  fontFamily: 'Poppins', fontWeight: 900, fontSize: '11px', textTransform: 'capitalize',
                  boxShadow: sec === currentSection ? '0 4px 12px rgba(108,76,255,0.3)' : 'none',
                }}
              >
                {sec}
              </div>
            ))}
          </div>

          <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '12px', color: '#6C4CFF' }}>
            Q{currentIndex + 1}/{questions.length}
          </span>
        </nav>

        {/* Question Card Container */}
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '28px',
          padding: '32px',
          border: '2px solid rgba(255,255,255,0.6)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px',
          textAlign: 'center',
        }}>
          
          <span style={{
            background: '#EDE7F6', color: '#6C4CFF',
            fontFamily: 'Poppins', fontWeight: 900, fontSize: '11px',
            padding: '4px 14px', borderRadius: '99px',
          }}>
            Question {currentIndex + 1} of {questions.length}
          </span>

          <div className="animate-bobble" style={{
            width: '90px', height: '90px', borderRadius: '22px',
            background: 'linear-gradient(135deg, #EDE7F6, #FFF0F9)',
            border: '2.5px solid #C4B5F4', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '46px', boxShadow: '0 8px 24px rgba(108,76,255,0.2)',
          }}>
            {question.emoji || '🍎'}
          </div>

          <h2 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '26px', color: '#1e1040', margin: 0, lineHeight: 1.3, maxWidth: '600px' }}>
            {question.text}
          </h2>

          {/* Options / Input Block */}
          <div style={{ width: '100%', maxWidth: '600px', marginTop: '8px' }}>
            {question.type === 'mcq' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                {question.options?.map((opt) => {
                  const isSelected = currentAnswer === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => setCurrentAnswer(opt)}
                      className="hover-lift"
                      style={{
                        padding: '16px 12px', borderRadius: '18px',
                        background: isSelected ? '#FFFDF0' : 'white',
                        border: isSelected ? '2.5px solid #FFD54A' : '1.5px solid #E8EFFF',
                        boxShadow: isSelected ? '0 8px 20px rgba(255,213,74,0.3)' : '0 4px 14px rgba(0,0,0,0.04)',
                        fontFamily: 'Poppins', fontWeight: 900, fontSize: '16px', color: '#1e1040',
                        cursor: 'pointer', transition: 'all 0.15s ease',
                      }}
                    >
                      {stripEmoji(opt)}
                    </button>
                  );
                })}
              </div>
            )}

            {question.type === 'fill_blank' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* Word Chips Row for Fill in the Blank */}
                <div style={{
                  background: '#F0F4FF', border: '2px dashed #C7D2FE',
                  borderRadius: '18px', padding: '14px',
                  display: 'flex', flexDirection: 'column', gap: '8px',
                }}>
                  <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '11px', color: '#6C4CFF', textTransform: 'uppercase' }}>
                    🧩 Tap correct word chip to fill blank:
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                    {(question.options && question.options.length > 0
                      ? question.options
                      : ['नीला', 'लाल', 'हरा', 'काला', 'नील', 'সাদা', 'Blue', 'Big', 'Bright']
                    ).map((word: string, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentAnswer(word)}
                        className="btn-3d hover-lift"
                        style={{
                          background: currentAnswer === word ? '#FFFDF0' : 'white',
                          border: currentAnswer === word ? '2.5px solid #FFD54A' : '1.5px solid #6C4CFF',
                          color: '#1e1040', fontFamily: 'Poppins', fontWeight: 900, fontSize: '15px',
                          padding: '10px 18px', borderRadius: '14px', cursor: 'pointer',
                          boxShadow: '0 4px 14px rgba(108,76,255,0.2)',
                        }}
                      >
                        {word}
                      </button>
                    ))}
                  </div>
                </div>

                <input
                  type="text"
                  value={currentAnswer}
                  onChange={(e) => setCurrentAnswer(e.target.value)}
                  placeholder="Type or tap a word above..."
                  style={{
                    width: '100%', padding: '16px', borderRadius: '18px',
                    border: '2px solid #E8EFFF', background: '#F8FAFF',
                    fontFamily: 'Poppins', fontWeight: 900, fontSize: '20px', color: '#1e1040',
                    textAlign: 'center', outline: 'none',
                  }}
                />
              </div>
            )}

            {question.type === 'paragraph' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* Word Chips for Paragraph Writing */}
                <div style={{
                  background: '#F0F4FF', border: '2px dashed #C7D2FE',
                  borderRadius: '18px', padding: '14px',
                  display: 'flex', flexDirection: 'column', gap: '8px',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '11px', color: '#6C4CFF', textTransform: 'uppercase' }}>
                      🧩 Tap Word Chips to Form Sentence:
                    </span>
                    {currentAnswer && (
                      <button
                        onClick={() => setCurrentAnswer('')}
                        style={{ background: '#FEE2E2', color: '#EF4444', border: 'none', borderRadius: '99px', padding: '2px 10px', fontFamily: 'Poppins', fontWeight: 800, fontSize: '10px', cursor: 'pointer' }}
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {['The', 'sky', 'is', 'blue', 'and', 'bright.', 'I', 'love', 'reading', 'books', 'every', 'day.'].map((word: string, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentAnswer(prev => prev ? `${prev} ${word}` : word)}
                        className="btn-3d hover-lift"
                        style={{
                          background: 'white', border: '1.5px solid #6C4CFF',
                          color: '#1e1040', fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px',
                          padding: '8px 14px', borderRadius: '12px', cursor: 'pointer',
                          boxShadow: '0 4px 12px rgba(108,76,255,0.15)',
                        }}
                      >
                        {word} +
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  value={currentAnswer}
                  onChange={(e) => setCurrentAnswer(e.target.value)}
                  placeholder="Write or tap word chips above to build sentence..."
                  style={{
                    width: '100%', height: '100px', padding: '16px', borderRadius: '18px',
                    border: '2px solid #E8EFFF', background: '#F8FAFF',
                    fontFamily: 'Nunito', fontWeight: 700, fontSize: '15px', color: '#1e1040',
                    outline: 'none', resize: 'none',
                  }}
                />
              </div>
            )}

            {question.type === 'read_aloud' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <button
                  onClick={() => toggleRecording(question.text)}
                  className="btn-3d"
                  style={{
                    width: '72px', height: '72px', borderRadius: '50%',
                    background: isRecording ? '#EF4444' : 'linear-gradient(135deg, #6C4CFF, #8A5CFF)',
                    border: 'none', color: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 8px 24px rgba(108,76,255,0.4)', cursor: 'pointer',
                  }}
                >
                  <Mic className="w-8 h-8" />
                </button>
                <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '13px', color: '#64748B', margin: 0 }}>
                  {isRecording ? '🎙️ Listening to your speech...' : 'Click microphone to speak'}
                </p>
              </div>
            )}
          </div>

          {/* Next Button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', borderTop: '2px solid #F1F5F9', paddingTop: '16px', marginTop: '8px' }}>
            <button
              onClick={handleNext}
              className="btn-3d"
              style={{
                background: 'linear-gradient(135deg, #FFD54A, #FF9F43)',
                color: '#1e1040', fontFamily: 'Poppins', fontWeight: 900, fontSize: '15px',
                padding: '12px 28px', borderRadius: '16px', border: 'none',
                borderBottom: '4px solid #E8A000', cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(255,213,74,0.4)',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}
            >
              <span>{currentIndex === questions.length - 1 ? 'Submit Answers 🎉' : 'Next Question'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
