import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Mic, MicOff, Lightbulb, ArrowRight, Loader2, Check, X, PartyPopper } from 'lucide-react';

interface Question {
  id: string;
  type: 'mcq' | 'fill_blank' | 'paragraph' | 'read_aloud';
  text: string;
  options?: string[];
  correct_answer?: string;
  hint: string;
  image_emoji: string;
}

export default function AIPracticeModule() {
  const { sessionId, moduleId } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [skillName, setSkillName] = useState('📖 Practice');
  
  // Interaction state
  const [answer, setAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  // Feedback state
  const [feedback, setFeedback] = useState<{is_correct: boolean, explanation: string, score: number} | null>(null);
  
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Mock fetching questions for now, would use GET /api/learn-ai/session/{sessionId}/
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        // Try getting session or plan data from API or localStorage
        let loadedQ: Question[] = [];
        let name = '📖 Reading Practice';

        const planStr = localStorage.getItem(`plan_${sessionId}`);
        if (planStr) {
          const plan = JSON.parse(planStr);
          const mod = plan.modules?.find((m: any) => String(m.id) === String(moduleId)) || plan.modules?.[0];
          if (mod) {
            name = mod.skill === 'writing' ? '✍️ Writing Practice' : mod.skill === 'comprehension' ? '🧠 Comprehension Practice' : '📖 Reading Practice';
            if (mod.questions && mod.questions.length > 0) {
              loadedQ = mod.questions.map((q: any, idx: number) => ({
                id: `q_${idx}`,
                type: q.question_type || (idx % 2 === 0 ? 'mcq' : 'fill_blank'),
                text: q.question_text || `Question ${idx + 1}`,
                options: q.options || ['Option A', 'Option B', 'Option C', 'Option D'],
                correct_answer: q.correct_answer || (q.options ? q.options[0] : 'correct'),
                hint: q.hint || 'Focus on the words carefully.',
                image_emoji: q.image_hint || '🌟'
              }));
            }
          }
        }

        if (loadedQ.length === 0) {
          setSkillName('📖 Reading Practice');
          loadedQ = [
            {
              id: 'q1', type: 'mcq', text: 'Which word describes the picture 🍎?',
              options: ['Apple 🍎', 'Banana 🍌', 'Cat 🐱', 'Dog 🐶'], correct_answer: 'Apple 🍎',
              hint: 'It is a red sweet fruit.', image_emoji: '🍎'
            },
            {
              id: 'q2', type: 'fill_blank', text: 'Complete the sentence: The sky is _____.',
              correct_answer: 'blue', hint: 'Color of the ocean.', image_emoji: '🌤️'
            },
            {
              id: 'q3', type: 'read_aloud', text: 'The swift blue bird sings loudly in the tree.',
              correct_answer: 'The swift blue bird sings loudly in the tree.', hint: 'Speak clearly into your microphone.', image_emoji: '🐦'
            },
            {
              id: 'q4', type: 'mcq', text: 'Select the missing letter in S _ UN (Sun)',
              options: ['U', 'O', 'A', 'E'], correct_answer: 'U',
              hint: 'Bright star in the sky.', image_emoji: '☀️'
            },
            {
              id: 'q5', type: 'fill_blank', text: 'Write the opposite word of Cold:',
              correct_answer: 'hot', hint: 'Like the sun or fire.', image_emoji: '🔥'
            },
            {
              id: 'q6', type: 'mcq', text: 'Identify the rhyming word for "Cat":',
              options: ['Hat 🎩', 'Dog 🐶', 'Fish 🐟', 'Tree 🌳'], correct_answer: 'Hat 🎩',
              hint: 'Something you wear on your head.', image_emoji: '🎩'
            }
          ];
        } else {
          setSkillName(name);
        }

        setQuestions(loadedQ);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    
    fetchQuestions();

    // Setup speech recognition
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

  const toggleRecording = () => {
    if (!recognitionRef.current) return alert('Speech recognition not supported in this browser.');
    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      setAnswer('');
      recognitionRef.current.start();
      setIsRecording(true);
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
        // Fallback mock validation
        const isCorrect = answer.toLowerCase().includes(currentQ.correct_answer?.toLowerCase() || '');
        result = {
          is_correct: isCorrect,
          explanation: isCorrect ? 'Great job! You got it right.' : `Not quite! The answer involves "${currentQ.correct_answer}".`,
          score: isCorrect ? 10 : 0
        };
      }
      
      setFeedback(result);
    } catch (e) {
      console.error(e);
      // Mock validation on error
      setFeedback({ is_correct: true, explanation: 'Offline mode: assuming correct!', score: 10 });
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
      // Complete module
      setLoading(true);
      try {
        await fetch('http://127.0.0.1:8000/api/learn-ai/complete-module/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ module_id: moduleId })
        });
      } catch (e) {
        console.error(e);
      }
      navigate(`/learn-with-ai/suggestions/${sessionId}/${moduleId}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-sky-50 flex items-center justify-center">
        <Loader2 className="w-16 h-16 text-indigo-500 animate-spin" />
      </div>
    );
  }

  if (questions.length === 0) return <div className="p-8 text-center text-2xl font-black">No questions found!</div>;

  const currentQ = questions[currentIndex];

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
      <div className="w-full max-w-3xl bg-white rounded-[2rem] p-8 shadow-2xl border-4 border-slate-100 relative overflow-hidden">
        
        {/* Question Area */}
        <div className="text-center mb-8">
          <div className="text-8xl mb-6 animate-bounce-slow">{currentQ.image_emoji}</div>
          <h2 className="text-4xl font-black text-slate-800 leading-tight mb-4">{currentQ.text}</h2>
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
                  className={`p-6 text-2xl font-bold rounded-2xl border-4 transition-all ${
                    answer === opt 
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-lg scale-[1.02]' 
                      : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:bg-slate-50'
                  } ${feedback ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {opt}
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
                className="w-full max-w-md text-3xl font-bold text-center p-6 border-4 border-slate-200 rounded-2xl focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all"
              />
            </div>
          )}

          {currentQ.type === 'paragraph' && (
            <textarea
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              disabled={!!feedback}
              placeholder="Write a few sentences..."
              rows={4}
              className="w-full text-xl font-bold p-6 border-4 border-slate-200 rounded-2xl focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all resize-none"
            />
          )}

          {currentQ.type === 'read_aloud' && (
            <div className="flex flex-col items-center gap-6">
              <button
                onClick={toggleRecording}
                disabled={!!feedback}
                className={`w-32 h-32 rounded-full flex items-center justify-center border-8 shadow-xl transition-all ${
                  isRecording 
                    ? 'bg-red-100 border-red-500 text-red-500 animate-pulse scale-110' 
                    : 'bg-indigo-50 border-indigo-500 text-indigo-600 hover:scale-105'
                }`}
              >
                {isRecording ? <MicOff className="w-12 h-12" /> : <Mic className="w-12 h-12" />}
              </button>
              {answer && (
                <div className="p-4 bg-slate-100 rounded-2xl text-xl font-bold text-slate-700 border-2 border-slate-200 w-full text-center">
                  "{answer}"
                </div>
              )}
            </div>
          )}
        </div>

        {/* Actions & Hints */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t-2 border-slate-100">
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-100 text-amber-700 font-bold hover:bg-amber-200 transition-colors"
          >
            <Lightbulb className="w-5 h-5" />
            {showHint ? 'Hide Hint' : 'Show Hint'}
          </button>
          
          {!feedback ? (
            <button
              onClick={submitAnswer}
              disabled={!answer || submitting}
              className="w-full md:w-auto bg-gradient-to-r from-emerald-400 to-green-500 border-b-4 border-emerald-600 text-white font-black text-xl px-10 py-4 rounded-2xl shadow-lg hover:-translate-y-1 active:border-b-0 active:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {submitting ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Submit Answer'}
            </button>
          ) : null}
        </div>

        {/* Hint Reveal */}
        {showHint && !feedback && (
          <div className="mt-6 p-4 bg-amber-50 border-2 border-amber-200 rounded-2xl text-amber-800 font-bold flex items-start gap-3 animate-in fade-in slide-in-from-top-4">
            <span className="text-2xl">💡</span>
            <p className="text-lg">{currentQ.hint}</p>
          </div>
        )}

      </div>

      {/* Feedback Overlay Card */}
      {feedback && (
        <div className="w-full max-w-3xl mt-6 bg-white rounded-[2rem] p-6 shadow-2xl border-4 animate-in slide-in-from-bottom-8 fade-in relative overflow-hidden z-10"
             style={{ borderColor: feedback.is_correct ? '#10b981' : '#ef4444' }}>
          
          <div className="flex flex-col md:flex-row gap-6 items-center">
            {/* Mascot */}
            <div className="text-6xl bg-slate-50 p-4 rounded-3xl border-2 border-slate-100 shadow-inner relative">
              🤖
              <div className="absolute -top-2 -right-2">
                {feedback.is_correct ? 
                  <div className="bg-green-500 text-white rounded-full p-1"><Check className="w-6 h-6" /></div> : 
                  <div className="bg-red-500 text-white rounded-full p-1"><X className="w-6 h-6" /></div>
                }
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className={`text-3xl font-black mb-2 ${feedback.is_correct ? 'text-green-600' : 'text-red-600'}`}>
                {feedback.is_correct ? 'Awesome job! 🎉' : 'Almost there! 💪'}
              </h3>
              <p className="text-xl text-slate-700 font-bold bg-slate-100 p-4 rounded-2xl rounded-tl-none border-2 border-slate-200">
                {feedback.explanation}
              </p>
              <div className="mt-3 inline-block bg-slate-800 text-white font-black px-4 py-1.5 rounded-full text-sm">
                Score: +{feedback.score}
              </div>
            </div>

            <button
              onClick={nextQuestion}
              className="bg-indigo-600 text-white font-black text-xl px-8 py-5 rounded-2xl shadow-xl hover:-translate-y-1 active:translate-y-1 transition-all flex items-center gap-2 whitespace-nowrap border-b-4 border-indigo-800 active:border-b-0"
            >
              {currentIndex < questions.length - 1 ? 'Next Question' : 'Finish Module'} <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
