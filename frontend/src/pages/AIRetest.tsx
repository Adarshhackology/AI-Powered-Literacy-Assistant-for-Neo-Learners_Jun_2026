import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';

export default function AIRetest() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [answers, setAnswers] = useState<any[]>([]);
  
  useEffect(() => {
    // Mock generate retest
    setTimeout(() => {
      setQuestions([
        { id: 'r1', type: 'mcq', text: 'Select the correct spelling.', options: ['Apple', 'Appel', 'Aple', 'Apel'], image_emoji: '🍎' },
        { id: 'r2', type: 'fill_blank', text: 'I _____ to the store.', image_emoji: '🚶' }
      ]);
      setLoading(false);
    }, 1500);
  }, [sessionId]);

  const submitAnswer = () => {
    if (!answer) return;
    
    const newAnswers = [...answers, { question_id: questions[currentIndex].id, user_answer: answer }];
    setAnswers(newAnswers);
    setAnswer('');
    
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Submit full test
      setLoading(true);
      setTimeout(() => {
        navigate(`/learn-with-ai/comparison/${sessionId}`);
      }, 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-teal-50 flex flex-col items-center justify-center p-6">
        <Loader2 className="w-20 h-20 text-teal-500 animate-spin mb-6" />
        <h2 className="text-3xl font-black text-slate-700 animate-pulse text-center">
          {answers.length > 0 ? "AI is comparing your results... 🧠" : "Preparing your final challenge... ⚔️"}
        </h2>
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-white to-cyan-100 flex flex-col items-center p-4 md:p-8 font-nunito">
      
      {/* Retest Header */}
      <div className="w-full max-w-3xl flex justify-between items-center mb-8 bg-white p-4 rounded-3xl shadow-md border-b-4 border-teal-500">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-10 h-10 text-teal-500" />
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">FINAL RETEST</h1>
        </div>
        <div className="bg-teal-100 text-teal-800 font-black px-4 py-2 rounded-xl border-2 border-teal-200">
          Q {currentIndex + 1} of {questions.length}
        </div>
      </div>

      {/* Progress Stepper */}
      <div className="w-full max-w-3xl flex gap-2 mb-8">
        {questions.map((_, i) => (
          <div key={i} className={`h-3 flex-1 rounded-full transition-colors ${i < currentIndex ? 'bg-teal-500' : i === currentIndex ? 'bg-teal-300 animate-pulse' : 'bg-slate-200'}`} />
        ))}
      </div>

      {/* Question Card */}
      <div className="w-full max-w-3xl bg-white rounded-[2rem] p-10 shadow-2xl border-4 border-slate-100 flex flex-col items-center">
        <div className="text-8xl mb-6">{currentQ.image_emoji}</div>
        <h2 className="text-4xl font-black text-slate-800 mb-10 text-center leading-snug">{currentQ.text}</h2>

        <div className="w-full mb-10">
          {currentQ.type === 'mcq' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQ.options?.map((opt: string) => (
                <button
                  key={opt}
                  onClick={() => setAnswer(opt)}
                  className={`p-6 text-2xl font-bold rounded-2xl border-4 transition-all ${
                    answer === opt 
                      ? 'border-teal-500 bg-teal-50 text-teal-700 shadow-lg scale-105' 
                      : 'border-slate-200 hover:border-teal-200 bg-white'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
          {currentQ.type === 'fill_blank' && (
             <input
               type="text"
               value={answer}
               onChange={e => setAnswer(e.target.value)}
               placeholder="Type your answer..."
               className="w-full text-3xl font-bold text-center p-6 border-4 border-slate-200 rounded-2xl focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-100 transition-all"
             />
          )}
        </div>

        <button
          onClick={submitAnswer}
          disabled={!answer}
          className="w-full max-w-md bg-gradient-to-r from-teal-400 to-cyan-500 border-b-8 border-teal-600 text-white font-black text-2xl px-10 py-5 rounded-2xl shadow-xl hover:-translate-y-1 active:border-b-0 active:translate-y-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {currentIndex < questions.length - 1 ? 'Next Question' : 'Finish Retest'} <ArrowRight className="w-8 h-8" />
        </button>
      </div>

    </div>
  );
}
