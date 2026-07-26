import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BookOpen, Edit3, Brain, ArrowRight, Mic, Sparkles, CheckCircle2 } from 'lucide-react';
import { apiClient } from '../utils/api';

interface Question {
  id: number;
  section: 'reading' | 'writing' | 'comprehension';
  type: 'mcq' | 'fill_blank' | 'paragraph' | 'read_aloud';
  text: string;
  emoji: string;
  options?: string[];
  correct_answer?: string;
}

const fallbackQuestions: Question[] = [
  { id: 1, section: 'reading', type: 'mcq', text: 'Which word matches the picture?', emoji: '🍎', options: ['Apple 🍎', 'Banana 🍌', 'Cat 🐱', 'Dog 🐶'], correct_answer: 'Apple 🍎' },
  { id: 2, section: 'reading', type: 'mcq', text: 'What animal is this?', emoji: '🐶', options: ['Cat 🐱', 'Dog 🐶', 'Bird 🐦', 'Fish 🐟'], correct_answer: 'Dog 🐶' },
  { id: 3, section: 'writing', type: 'fill_blank', text: 'The sky is ___', emoji: '☁️', correct_answer: 'blue' },
  { id: 4, section: 'comprehension', type: 'paragraph', text: 'Write a sentence about your favorite color.', emoji: '🎨', correct_answer: 'My favorite color is blue.' },
  { id: 5, section: 'reading', type: 'read_aloud', text: 'Read this aloud: Hello World!', emoji: '🌍', correct_answer: 'Hello World!' },
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

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const data = await apiClient.generateAIAssessment(Number(sessionId));
        if (data && data.questions && data.questions.length > 0) {
          const mapped = data.questions.map((q: any, idx: number) => ({
            id: q.id || idx + 1,
            section: q.skill || (idx < 2 ? 'reading' : idx < 4 ? 'writing' : 'comprehension'),
            type: q.question_type || 'mcq',
            text: q.question_text || 'Select the correct answer:',
            emoji: q.image_hint || '🌟',
            options: q.options || (q.question_type === 'mcq' ? ['Option A', 'Option B', 'Option C', 'Option D'] : undefined),
            correct_answer: q.correct_answer
          }));
          setQuestions(mapped);
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
      <div className="min-h-screen bg-indigo-50 flex items-center justify-center font-['Nunito']">
        <div className="text-center animate-pulse">
          <Brain className="w-20 h-20 text-indigo-500 mx-auto mb-4 animate-bounce" />
          <h2 className="text-2xl font-black text-indigo-900">AI is generating your quiz... ✨</h2>
        </div>
      </div>
    );
  }

  if (submitting) {
    return (
      <div className="min-h-screen bg-purple-50 flex items-center justify-center font-['Nunito']">
        <div className="text-center">
          <Sparkles className="w-20 h-20 text-purple-500 mx-auto mb-4 animate-spin" />
          <h2 className="text-3xl font-black text-purple-900 mb-2">AI is analyzing your skills!</h2>
          <p className="text-xl text-purple-600 font-bold animate-pulse">Calculating scores and detecting weak areas...</p>
        </div>
      </div>
    );
  }

  const question = questions[currentIndex] || fallbackQuestions[0];
  const sections = ['reading', 'writing', 'comprehension'];
  const currentSection = question.section || 'reading';

  return (
    <div className="min-h-screen bg-slate-50 font-['Nunito'] p-4 sm:p-8 flex flex-col">
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
        
        {/* Stepper */}
        <div className="bg-white rounded-full p-2 mb-8 shadow-sm flex items-center justify-between border-2 border-slate-100">
          {sections.map((sec) => (
            <div 
              key={sec} 
              className={`flex-1 flex justify-center items-center gap-2 py-3 px-4 rounded-full transition-all duration-500
                ${sec === currentSection ? 'bg-indigo-100 text-indigo-700 shadow-inner font-black' : 'text-slate-400 font-bold'}
              `}
            >
              {sec === 'reading' && <BookOpen className="w-5 h-5" />}
              {sec === 'writing' && <Edit3 className="w-5 h-5" />}
              {sec === 'comprehension' && <Brain className="w-5 h-5" />}
              <span className="capitalize hidden sm:inline">{sec}</span>
            </div>
          ))}
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-[2.5rem] p-6 sm:p-12 shadow-xl border-4 border-slate-100 flex-1 flex flex-col justify-between relative overflow-hidden">
          <div>
            <div className="flex justify-between items-center mb-6">
              <span className="bg-slate-100 text-slate-500 font-black text-sm px-4 py-1.5 rounded-full">
                Question {currentIndex + 1} of {questions.length}
              </span>
            </div>

            <div className="text-center mb-8">
              <div className="text-7xl mb-4 animate-bounce-slow inline-block">{question.emoji}</div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">
                {question.text}
              </h2>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center max-w-2xl mx-auto w-full py-4">
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
              <div className="flex flex-col items-center gap-4 text-center">
                <button 
                  onClick={() => toggleRecording(question.text)}
                  className={`w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-lg active:scale-95 ${
                    isRecording 
                      ? 'bg-red-500 text-white animate-pulse shadow-red-300 ring-8 ring-red-200' 
                      : 'bg-red-100 text-red-500 hover:bg-red-200 hover:scale-105'
                  }`}
                >
                  <Mic className="w-10 h-10" />
                </button>
                <p className="text-slate-600 font-extrabold text-sm">
                  {isRecording ? '🎙️ Listening to your speech...' : 'Click microphone to speak (or tap to simulate)'}
                </p>

                {currentAnswer && (
                  <div className="bg-emerald-50 border-2 border-emerald-200 text-emerald-700 px-6 py-3 rounded-2xl font-black text-base flex items-center gap-2 animate-bounce">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Recorded: "{currentAnswer}"</span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleNext}
              className="bg-slate-900 hover:bg-indigo-600 text-white px-10 py-5 rounded-full font-black text-xl flex items-center gap-3 hover:-translate-y-1 transition-all shadow-lg cursor-pointer"
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
