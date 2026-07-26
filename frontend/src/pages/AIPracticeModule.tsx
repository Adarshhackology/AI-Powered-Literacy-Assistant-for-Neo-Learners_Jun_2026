import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Mic, Lightbulb, ArrowRight, Loader2, Check, X, CheckCircle2 } from 'lucide-react';
import { apiClient } from '../utils/api';

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
    { id: 'r1', type: 'mcq', text: 'Which word matches the picture 🍎?', options: ['Apple', 'Banana', 'Cat', 'Dog'], correct_answer: 'Apple', hint: 'It is a red sweet fruit.', image_emoji: '🍎' },
    { id: 'r2', type: 'fill_blank', text: 'Select the missing vowel: B _ LL (Ball)', correct_answer: 'A', hint: 'First letter of the alphabet.', image_emoji: '⚽' },
    { id: 'r3', type: 'read_aloud', text: 'Read aloud: The swift blue bird sings in the morning.', correct_answer: 'The swift blue bird sings in the morning.', hint: 'Speak clearly into your microphone.', image_emoji: '🐦' },
    { id: 'r4', type: 'mcq', text: 'Which word rhymes with "Cat"?', options: ['Hat', 'Dog', 'Fish', 'Sun'], correct_answer: 'Hat', hint: 'Something you wear on your head.', image_emoji: '🎩' },
    { id: 'r5', type: 'fill_blank', text: 'Write the opposite word of "Cold":', correct_answer: 'hot', hint: 'Like fire or the sun.', image_emoji: '🔥' },
    { id: 'r6', type: 'mcq', text: 'Identify the letter sound for 🐶 (Dog):', options: ['D', 'B', 'C', 'F'], correct_answer: 'D', hint: 'Starts with letter D.', image_emoji: '🐶' }
  ],
  writing: [
    { id: 'w1', type: 'fill_blank', text: 'Complete the sentence: She is _____ to school.', correct_answer: 'going', hint: 'Verb meaning walking or moving to school.', image_emoji: '🏫' },
    { id: 'w2', type: 'fill_blank', text: 'Correct the spelling mistake: "Taecher" -> _____', correct_answer: 'teacher', hint: 'A person who teaches in school.', image_emoji: '👩‍🏫' },
    { id: 'w3', type: 'paragraph', text: 'Write 1 short sentence about your pet or favorite animal.', correct_answer: 'My favorite animal is a dog.', hint: 'Mention animal name.', image_emoji: '🐾' },
    { id: 'w4', type: 'mcq', text: 'Select the correct plural form of "Child":', options: ['Children', 'Childs', 'Childes', 'Childen'], correct_answer: 'Children', hint: 'More than one child.', image_emoji: '👦👧' },
    { id: 'w5', type: 'fill_blank', text: 'Arrange words into a sentence: [blue / sky / is / The]', correct_answer: 'The sky is blue', hint: 'Start with "The".', image_emoji: '🌤️' },
    { id: 'w6', type: 'paragraph', text: 'Write what you like to do on a sunny day.', correct_answer: 'I like to play in the park.', hint: 'Share your favorite fun activity.', image_emoji: '☀️' }
  ],
  comprehension: [
    { id: 'c1', type: 'mcq', text: 'Story: "Tim found a golden key under a tree." What did Tim find?', options: ['A key', 'A coin', 'A flower', 'A toy'], correct_answer: 'A key', hint: 'Golden object under the tree.', image_emoji: '🔑' },
    { id: 'c2', type: 'mcq', text: 'What is the main idea of: "Trees give us clean air, fruits, and shade."?', options: ['Trees are helpful', 'Trees are tall', 'Trees have leaves', 'Birds live in trees'], correct_answer: 'Trees are helpful', hint: 'Focus on how trees benefit us.', image_emoji: '🌳' },
    { id: 'c3', type: 'mcq', text: 'Predict what happens next when dark clouds fill the sky:', options: ['It will rain', 'The sun will shine', 'Stars appear', 'It snows'], correct_answer: 'It will rain', hint: 'Dark clouds bring rain.', image_hint: '☁️', image_emoji: '☁️' },
    { id: 'c4', type: 'fill_blank', text: 'What feeling does "Lily jumped up and down with joy" describe?', correct_answer: 'happy', hint: 'Joy means happiness.', image_emoji: '🎉' },
    { id: 'c5', type: 'mcq', text: 'Match the meaning of "Brave":', options: ['Not afraid', 'Very quiet', 'Slow', 'Sleepy'], correct_answer: 'Not afraid', hint: 'Showing courage.', image_emoji: '🛡️' },
    { id: 'c6', type: 'mcq', text: 'Arrange events: 1) Baked cake 2) Bought flour 3) Ate cake', options: ['2 -> 1 -> 3', '1 -> 2 -> 3', '3 -> 2 -> 1', '2 -> 3 -> 1'], correct_answer: '2 -> 1 -> 3', hint: 'Buy ingredients first.', image_emoji: '🎂' }
  ]
};

const defaultHindiPracticeQuestions: Record<string, Question[]> = {
  reading: [
    { id: 'r1', type: 'mcq', text: 'चित्र को देखकर सही शब्द चुनें 🍎:', options: ['सेब', 'केला', 'बिल्ली', 'कुत्ता'], correct_answer: 'सेब', hint: 'यह एक मीठा लाल फल है।', image_emoji: '🍎' },
    { id: 'r2', type: 'fill_blank', text: 'सही शब्द चुनें: क _ ल (कमल)', correct_answer: 'म', hint: 'फूल का नाम।', image_emoji: '🌸' },
    { id: 'r3', type: 'read_aloud', text: 'इसे जोर से पढ़ें: सूरज सुबह पूर्व में उगता है।', correct_answer: 'सूरज सुबह पूर्व में उगता है।', hint: 'माइक में साफ बोलें।', image_emoji: '🌅' },
    { id: 'r4', type: 'mcq', text: 'अक्षर "क" से शुरू होने वाला शब्द चुनें:', options: ['किताब', 'पानी', 'घर', 'पेड़'], correct_answer: 'किताब', hint: 'पढ़ने की वस्तु।', image_emoji: '📚' },
    { id: 'r5', type: 'fill_blank', text: '"दिन" का विलोम शब्द लिखें:', correct_answer: 'रात', hint: 'सूरज ढलने के बाद।', image_emoji: '🌙' },
    { id: 'r6', type: 'mcq', text: '🐶 जानवर की सही आवाज चुनें:', options: ['भौ-भौ', 'म्याऊं', 'चीं-चीं', 'कांव-कांव'], correct_answer: 'भौ-भौ', hint: 'कुत्ते की आवाज।', image_emoji: '🐶' }
  ],
  writing: [
    { id: 'w1', type: 'fill_blank', text: 'वाक्य पूरा करें: वह स्कूल जा _____ है।', correct_answer: 'रहा', hint: 'क्रिया रूप।', image_emoji: '🏫' },
    { id: 'w2', type: 'fill_blank', text: 'शब्द शुद्ध करें: "किताबब" -> _____', correct_answer: 'किताब', hint: 'पढ़ने की पुस्तक।', image_emoji: '📖' },
    { id: 'w3', type: 'paragraph', text: 'अपने पसंदीदा जानवर के बारे में एक वाक्य लिखें।', correct_answer: 'मेरा पसंदीदा जानवर कुत्ता है।', hint: 'जानवर का नाम।', image_emoji: '🐾' },
    { id: 'w4', type: 'mcq', text: 'सही बहुवचन चुनें: "लड़का" -> _____', options: ['लड़के', 'लड़कों', 'लड़कियां', 'लड़काएं'], correct_answer: 'लड़के', hint: 'एक से अधिक।', image_emoji: '👦👦' },
    { id: 'w5', type: 'fill_blank', text: 'शब्दों को सही क्रम में लगाएं: [है / आम / खाता / राम]', correct_answer: 'राम आम खाता है', hint: 'राम से शुरू करें।', image_emoji: '🥭' },
    { id: 'w6', type: 'paragraph', text: 'आप सुबह उठकर क्या करते हैं?', correct_answer: 'मैं सुबह ब्रश करता हूं।', hint: 'सुबह की आदत।', image_emoji: '🌅' }
  ],
  comprehension: [
    { id: 'c1', type: 'mcq', text: 'कहानी: "रामू ने पेड़ के नीचे एक चाबी पाई।" रामू को क्या मिला?', options: ['चाबी', 'सिक्का', 'फूल', 'खिलौना'], correct_answer: 'चाबी', hint: 'पेड़ के नीचे चाबी मिली।', image_emoji: '🔑' },
    { id: 'c2', type: 'mcq', text: 'पेड़ हमें क्या देते हैं?', options: ['छाया और फल', 'आग और धुआं', 'गाड़ियां', 'कपड़े'], correct_answer: 'छाया और फल', hint: 'पर्यावरण का लाभ।', image_emoji: '🌳' },
    { id: 'c3', type: 'mcq', text: 'काले बादल आने पर क्या होगा?', options: ['बारिश होगी', 'धूप निकलेगी', 'तारे दिखेंगे', 'बर्फ गिरेगी'], correct_answer: 'बारिश होगी', hint: 'बादल बारिश लाते हैं।', image_hint: '☁️', image_emoji: '☁️' },
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
  const [skillName, setSkillName] = useState('📖 Reading Practice');
  const [skillKey, setSkillKey] = useState<'reading' | 'writing' | 'comprehension'>('reading');
  
  // Interaction state
  const [answer, setAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  // Feedback state
  const [feedback, setFeedback] = useState<{is_correct: boolean, explanation: string, score: number} | null>(null);
  
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      const userLang = (localStorage.getItem('current_ai_lang') || localStorage.getItem('preferredLanguage') || 'english').toLowerCase();
      const isHindi = userLang.includes('hi') || userLang.includes('hindi');
      const questionBank = isHindi ? defaultHindiPracticeQuestions : defaultPracticeQuestions;

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
            
            if (mod.questions && Array.isArray(mod.questions) && mod.questions.length > 0) {
              const valid = mod.questions.filter((q: any) => typeof q === 'object' && (q.question_text || q.text));
              if (valid.length > 0) {
                loadedQ = valid.map((q: any, idx: number) => ({
                  id: `q_${idx}`,
                  type: q.question_type || q.type || (idx % 2 === 0 ? 'mcq' : 'fill_blank'),
                  text: q.question_text || q.text,
                  options: q.options && Array.isArray(q.options) && q.options.length >= 2 && q.options[0] !== 'Option A' 
                    ? q.options 
                    : questionBank[sKey][idx % 6].options,
                  correct_answer: q.correct_answer || questionBank[sKey][idx % 6].correct_answer,
                  hint: q.hint || 'Focus on the words carefully.',
                  image_emoji: q.image_hint || q.image_emoji || questionBank[sKey][idx % 6].image_emoji
                }));
              }
            }
          }
        }

        setSkillKey(sKey);
        setSkillName(sKey === 'writing' ? '✍️ Writing Practice' : sKey === 'comprehension' ? '🧠 Comprehension Practice' : '📖 Reading Practice');

        if (loadedQ.length === 0) {
          loadedQ = [...(questionBank[sKey] || questionBank.reading)].sort(() => Math.random() - 0.5);
        } else {
          loadedQ = [...loadedQ].sort(() => Math.random() - 0.5);
        }

        // Shuffle MCQ options for every question so choices order changes every time
        loadedQ = loadedQ.map(q => q.type === 'mcq' && q.options ? { ...q, options: [...q.options].sort(() => Math.random() - 0.5) } : q);

        setQuestions(loadedQ);
      } catch (e) {
        console.error(e);
        setQuestions([...questionBank.reading].sort(() => Math.random() - 0.5));
      } finally {
        setLoading(false);
      }
    };
    
    fetchQuestions();

    // Speech recognition setup
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.lang = 'en-US';
      rec.onresult = (e: any) => setAnswer(e.results[0][0].transcript);
      rec.onend = () => setIsRecording(false);
      recognitionRef.current = rec;
    }
  }, [sessionId, moduleId]);

  const toggleRecording = (targetText: string) => {
    if (!recognitionRef.current) {
      setAnswer(targetText || 'Hello World!');
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
        setAnswer(targetText || 'Hello World!');
        setIsRecording(false);
      }
    }
  };

  const submitAnswer = async () => {
    if (!answer) return;
    const currentQ = questions[currentIndex];
    
    try {
      setSubmitting(true);
      
      const response = await fetch('http://127.0.0.1:8000/api/learn-ai/submit-answer/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          module_id: moduleId,
          question_index: currentIndex,
          user_answer: answer,
          question_text: currentQ.text,
          correct_answer: currentQ.correct_answer,
          question_type: currentQ.type
        })
      });
      
      let result;
      if (response.ok) {
        result = await response.json();
      } else {
        const isCorrect = currentQ.correct_answer ? answer.toLowerCase().includes(currentQ.correct_answer.toLowerCase()) : true;
        result = {
          is_correct: isCorrect,
          explanation: isCorrect ? 'Great job! You got it right.' : `Good try! The answer is "${currentQ.correct_answer}".`,
          score: isCorrect ? 100 : 40
        };
      }
      
      setFeedback(result);
    } catch (e) {
      const isCorrect = currentQ.correct_answer ? answer.toLowerCase().includes(currentQ.correct_answer.toLowerCase()) : true;
      setFeedback({
        is_correct: isCorrect,
        explanation: isCorrect ? 'Great job! You got it right.' : `Good try! The answer is "${currentQ.correct_answer}".`,
        score: isCorrect ? 100 : 40
      });
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
      setLoading(true);
      try {
        await apiClient.completeAIModule(Number(moduleId));
      } catch (e) {
        console.error(e);
      }

      // Update plan data in localStorage to mark module completed
      const planStr = localStorage.getItem(`plan_${sessionId}`);
      if (planStr) {
        try {
          const plan = JSON.parse(planStr);
          if (plan.modules) {
            const updated = plan.modules.map((m: any) => {
              if (String(m.id) === String(moduleId) || m.skill === skillKey) {
                return { ...m, status: 'completed', score: 85 };
              }
              return m;
            });
            localStorage.setItem(`plan_${sessionId}`, JSON.stringify({ ...plan, modules: updated }));
          }
        } catch (err) {
          console.error(err);
        }
      }

      // Return back to AI Learning Plan overview page
      navigate(`/learn-with-ai/plan/${sessionId}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-sky-50 flex items-center justify-center font-nunito">
        <Loader2 className="w-16 h-16 text-indigo-500 animate-spin" />
      </div>
    );
  }

  if (questions.length === 0) return <div className="p-8 text-center text-2xl font-black font-nunito">No questions found!</div>;

  const currentQ = questions[currentIndex] || defaultPracticeQuestions.reading[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-100 p-4 md:p-8 font-nunito flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-3xl flex justify-between items-center mb-8 bg-white p-4 rounded-3xl shadow-sm border-2 border-slate-100">
        <h1 className="text-2xl font-black text-slate-800">{skillName}</h1>
        <div className="flex items-center gap-3">
          <div className="text-lg font-bold text-slate-500">{currentIndex + 1} / {questions.length}</div>
          <div className="w-32 h-4 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-3xl bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-2xl border-4 border-slate-100 relative overflow-hidden">
        
        {/* Question Area */}
        <div className="text-center mb-8 flex flex-col items-center">
          {currentQ.image_url ? (
            <div className="w-40 h-40 mb-4 rounded-3xl overflow-hidden border-4 border-purple-200 shadow-xl bg-purple-50 flex items-center justify-center">
              <img src={currentQ.image_url} alt="Practice Visual" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-28 h-28 mb-4 rounded-3xl bg-gradient-to-br from-purple-100 to-pink-100 border-4 border-purple-200 shadow-lg flex items-center justify-center text-7xl animate-bounce-slow">
              {currentQ.image_emoji || currentQ.image_hint || '✨'}
            </div>
          )}
          <h2 className="text-3xl sm:text-4xl font-black text-slate-800 leading-tight mb-2">
            {currentQ.text}
          </h2>
        </div>

        {/* Input Area based on type */}
        <div className="mb-8">
          {currentQ.type === 'mcq' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQ.options?.map(opt => (
                <button
                  key={opt}
                  onClick={() => !feedback && setAnswer(opt)}
                  disabled={!!feedback}
                  className={`p-6 text-xl sm:text-2xl font-black rounded-2xl border-4 transition-all ${
                    answer === opt 
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-lg scale-[1.02]' 
                      : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:bg-slate-50'
                  } ${feedback ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {stripEmoji(opt)}
                </button>
              ))}
            </div>
          )}

          {currentQ.type === 'fill_blank' && (
            <div className="flex justify-center">
              <input
                type="text"
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                disabled={!!feedback}
                placeholder="Type your answer..."
                className="w-full max-w-md text-center text-3xl font-black text-indigo-700 bg-slate-50 border-4 border-slate-200 rounded-3xl p-6 outline-none focus:border-indigo-500 transition-all placeholder:text-slate-300"
              />
            </div>
          )}

          {currentQ.type === 'paragraph' && (
            <div className="relative">
              <textarea
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                disabled={!!feedback}
                placeholder="Write your response here..."
                className="w-full text-xl font-bold text-slate-700 bg-slate-50 border-4 border-slate-200 rounded-3xl p-6 min-h-[140px] outline-none focus:border-indigo-500 transition-all resize-none"
              />
            </div>
          )}

          {currentQ.type === 'read_aloud' && (
            <div className="flex flex-col items-center gap-4 text-center">
              <button
                onClick={() => toggleRecording(currentQ.correct_answer || currentQ.text)}
                disabled={!!feedback}
                className={`w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-lg active:scale-95 ${
                  isRecording 
                    ? 'bg-red-500 text-white animate-pulse shadow-red-300 ring-8 ring-red-200' 
                    : 'bg-red-100 text-red-500 hover:bg-red-200 hover:scale-105'
                }`}
              >
                <Mic className="w-10 h-10" />
              </button>
              <p className="text-slate-500 font-extrabold text-sm">
                {isRecording ? '🎙️ Listening to your speech...' : 'Click microphone to speak (or tap to simulate)'}
              </p>

              {answer && (
                <div className="bg-emerald-50 border-2 border-emerald-200 text-emerald-700 px-6 py-3 rounded-2xl font-black text-base flex items-center gap-2 animate-bounce">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Spoken: "{answer}"</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Hint Section */}
        <div className="mb-8">
          {!showHint ? (
            <button 
              onClick={() => setShowHint(true)}
              className="text-amber-600 font-bold text-sm bg-amber-50 hover:bg-amber-100 px-4 py-2 rounded-xl flex items-center gap-2 border border-amber-200 transition-colors"
            >
              <Lightbulb className="w-4 h-4" /> Show Hint
            </button>
          ) : (
            <div className="bg-amber-50 border-2 border-amber-200 text-amber-800 p-4 rounded-2xl font-extrabold text-sm flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="block font-black text-xs uppercase tracking-wider text-amber-600 mb-1">AI Tutor Hint</span>
                {currentQ.hint}
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        {!feedback && (
          <div className="flex justify-end">
            <button
              onClick={submitAnswer}
              disabled={!answer || submitting}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-black text-xl px-10 py-5 rounded-2xl shadow-lg hover:-translate-y-1 active:translate-y-0 transition-all flex items-center gap-3 cursor-pointer"
            >
              {submitting ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Submit Answer'}
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        )}

        {/* Feedback Section */}
        {feedback && (
          <div className={`mt-6 p-6 rounded-3xl border-4 animate-fade-in ${
            feedback.is_correct ? 'bg-emerald-50 border-emerald-300' : 'bg-rose-50 border-rose-300'
          }`}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 ${
                  feedback.is_correct ? 'bg-emerald-200 text-emerald-700' : 'bg-rose-200 text-rose-700'
                }`}>
                  {feedback.is_correct ? <Check className="w-8 h-8" /> : <X className="w-8 h-8" />}
                </div>
                <div>
                  <h4 className={`text-2xl font-black ${feedback.is_correct ? 'text-emerald-800' : 'text-rose-800'}`}>
                    {feedback.is_correct ? 'Awesome Job! 🎉' : 'Almost there! 💪'}
                  </h4>
                  <p className={`font-bold text-base mt-1 ${feedback.is_correct ? 'text-emerald-700' : 'text-rose-700'}`}>
                    {feedback.explanation}
                  </p>
                </div>
              </div>

              <button
                onClick={nextQuestion}
                className="bg-slate-900 hover:bg-indigo-600 text-white font-black text-lg px-8 py-4 rounded-2xl shadow-lg hover:-translate-y-1 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
              >
                {currentIndex < questions.length - 1 ? 'Next Question' : 'Complete Module'}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
