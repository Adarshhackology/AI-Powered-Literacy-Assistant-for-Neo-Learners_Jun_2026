import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BookOpen, Edit3, Brain, ArrowRight, Mic, Sparkles } from 'lucide-react';

interface Question {
  id: number;
  section: 'reading' | 'writing' | 'comprehension';
  type: 'mcq' | 'fill_blank' | 'paragraph' | 'read_aloud';
  text: string;
  emoji: string;
  options?: string[];
}

const fallbackQuestions: Question[] = [
  { id: 1, section: 'reading', type: 'mcq', text: 'Which word matches the picture?', emoji: '🍎', options: ['Apple', 'Banana', 'Cat', 'Dog'] },
  { id: 2, section: 'reading', type: 'mcq', text: 'What animal is this?', emoji: '🐶', options: ['Cat', 'Dog', 'Bird', 'Fish'] },
  { id: 3, section: 'writing', type: 'fill_blank', text: 'The sky is ___', emoji: '☁️' },
  { id: 4, section: 'comprehension', type: 'paragraph', text: 'Write a sentence about your favorite color.', emoji: '🎨' },
  { id: 5, section: 'reading', type: 'read_aloud', text: 'Read this aloud: Hello World!', emoji: '🌍' },
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

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/learn-ai/generate-assessment/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_id: sessionId })
        });
        if (response.ok) {
          const data = await response.json();
          setQuestions(data.questions && data.questions.length > 0 ? data.questions : fallbackQuestions);
        } else {
          setQuestions(fallbackQuestions);
        }
      } catch (err) {
        console.error(err);
        setQuestions(fallbackQuestions);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [sessionId]);

  const handleNext = async () => {
    const newAnswers = { ...answers, [questions[currentIndex].id]: currentAnswer };
    setAnswers(newAnswers);
    localStorage.setItem(`assessment_answers_${sessionId}`, JSON.stringify(newAnswers));

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentAnswer('');
    } else {
      setSubmitting(true);
      try {
        const response = await fetch('http://127.0.0.1:8000/api/learn-ai/submit-assessment/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_id: sessionId, answers: newAnswers })
        });
        
        let scoreData = { reading: 85, writing: 70, comprehension: 90 };
        if (response.ok) {
          const data = await response.json();
          scoreData = data.scores || scoreData;
        }
        localStorage.setItem(`assessment_result_${sessionId}`, JSON.stringify(scoreData));
        navigate(`/learn-with-ai/scores/${sessionId}`);
      } catch (err) {
        console.error(err);
        localStorage.setItem(`assessment_result_${sessionId}`, JSON.stringify({ reading: 85, writing: 70, comprehension: 90 }));
        navigate(`/learn-with-ai/scores/${sessionId}`);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-indigo-50 flex items-center justify-center font-['Nunito']">
        <div className="text-center animate-pulse">
          <Brain className="w-20 h-20 text-indigo-500 mx-auto mb-4 animate-bounce" />
          <h2 className="text-2xl font-black text-indigo-900">AI is generating your quiz...</h2>
        </div>
      </div>
    );
  }

  if (submitting) {
    return (
      <div className="min-h-screen bg-purple-50 flex items-center justify-center font-['Nunito']">
        <div className="text-center">
          <Sparkles className="w-20 h-20 text-purple-500 mx-auto mb-4 animate-spin-slow" />
          <h2 className="text-3xl font-black text-purple-900 mb-2">AI is analyzing your skills!</h2>
          <p className="text-xl text-purple-600 font-bold animate-pulse">Almost there...</p>
        </div>
      </div>
    );
  }

  const question = questions[currentIndex];
  const sections = ['reading', 'writing', 'comprehension'];
  const currentSection = question.section;

  return (
    <div className="min-h-screen bg-slate-50 font-['Nunito'] p-4 sm:p-8 flex flex-col">
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
        
        {/* Stepper */}
        <div className="bg-white rounded-full p-2 mb-8 shadow-sm flex items-center justify-between border-2 border-slate-100">
          {sections.map((sec, idx) => (
            <div 
              key={sec} 
              className={`flex-1 flex justify-center items-center gap-2 py-3 px-4 rounded-full transition-all duration-500
                ${sec === currentSection ? 'bg-indigo-100 text-indigo-700 shadow-inner' : 'text-slate-400'}
              `}
            >
              {sec === 'reading' && <BookOpen className="w-5 h-5" />}
              {sec === 'writing' && <Edit3 className="w-5 h-5" />}
              {sec === 'comprehension' && <Brain className="w-5 h-5" />}
              <span className="font-black capitalize hidden sm:block">{sec}</span>
            </div>
          ))}
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border-4 border-slate-100 flex-1 flex flex-col animate-in slide-in-from-right-8 fade-in duration-500">
          <div className="flex justify-between items-center mb-8">
            <span className="bg-slate-100 text-slate-500 px-4 py-1.5 rounded-full font-bold text-sm">
              Question {currentIndex + 1} of {questions.length}
            </span>
          </div>

          <div className="text-center mb-10">
            <div className="text-8xl mb-6 animate-bounce">{question.emoji}</div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-800 leading-tight">
              {question.text}
            </h2>
          </div>

          <div className="flex-1 flex flex-col justify-center max-w-2xl mx-auto w-full">
            {question.type === 'mcq' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {question.options?.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setCurrentAnswer(opt)}
                    className={`p-6 rounded-2xl text-xl font-black transition-all border-4
                      ${currentAnswer === opt 
                        ? 'bg-indigo-100 border-indigo-500 text-indigo-700 scale-105 shadow-md' 
                        : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-200 hover:bg-slate-50'
                      }
                    `}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {question.type === 'fill_blank' && (
              <input
                type="text"
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                placeholder="Type your answer here..."
                className="w-full text-center text-3xl font-black text-indigo-700 bg-slate-50 border-4 border-slate-200 rounded-3xl p-6 outline-none focus:border-indigo-500 transition-all placeholder:text-slate-300"
              />
            )}

            {question.type === 'paragraph' && (
              <div className="relative">
                <textarea
                  value={currentAnswer}
                  onChange={(e) => setCurrentAnswer(e.target.value)}
                  placeholder="Write your answer here..."
                  className="w-full text-xl font-bold text-slate-700 bg-slate-50 border-4 border-slate-200 rounded-3xl p-6 min-h-[150px] outline-none focus:border-indigo-500 transition-all resize-none"
                />
                <div className="absolute bottom-4 right-6 text-slate-400 font-bold text-sm">
                  {currentAnswer.length} chars
                </div>
              </div>
            )}

            {question.type === 'read_aloud' && (
              <div className="flex flex-col items-center gap-6">
                <button 
                  onClick={() => setCurrentAnswer('Read aloud complete')}
                  className="w-24 h-24 bg-red-100 text-red-500 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors animate-pulse"
                >
                  <Mic className="w-10 h-10" />
                </button>
                <p className="text-slate-500 font-bold">Click microphone to speak (Simulation)</p>
              </div>
            )}
          </div>

          <div className="mt-12 flex justify-end">
            <button
              onClick={handleNext}
              disabled={!currentAnswer && question.type !== 'read_aloud'}
              className="bg-slate-900 text-white px-10 py-5 rounded-full font-black text-xl flex items-center gap-3 hover:bg-indigo-600 hover:-translate-y-1 transition-all disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {currentIndex === questions.length - 1 ? 'Submit Answers' : 'Next Question'}
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
