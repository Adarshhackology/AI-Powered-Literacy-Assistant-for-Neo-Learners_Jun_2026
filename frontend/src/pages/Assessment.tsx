import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Volume2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Assessment() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const navigate = useNavigate();

  // Step 1: Reading state
  const [readingAns, setReadingAns] = useState('');
  
  // Step 2: Writing state
  const [writingText, setWritingText] = useState('');
  
  // Step 3: Comprehension state
  const [compAns1, setCompAns1] = useState('');
  const [compAns2, setCompAns2] = useState('');

  // Grammar Helper checks for writing
  const wordsCount = writingText.trim() === '' ? 0 : writingText.trim().split(/\s+/).length;
  const startsWithCapital = /^[A-Z]/.test(writingText.trim());
  const endsWithPeriod = /\.$/.test(writingText.trim());
  const hasMinWords = wordsCount >= 5;

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85; // slightly slower for learners
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Speech Synthesis not supported in this browser.');
    }
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!readingAns) {
        alert('Please choose an answer before continuing.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (wordsCount < 3) {
        alert('Please write at least a short response (3+ words) to continue.');
        return;
      }
      setStep(3);
    }
  };

  const handleSubmit = () => {
    if (!compAns1 || !compAns2) {
      alert('Please answer the comprehension questions.');
      return;
    }

    // Calculate score
    let readingScore = readingAns === 'Morning' ? 100 : 0;
    
    // Writing score out of 100 based on grammatical markers
    let writingScore = 0;
    if (hasMinWords) writingScore += 40;
    else if (wordsCount >= 3) writingScore += 20;
    if (startsWithCapital) writingScore += 30;
    if (endsWithPeriod) writingScore += 30;

    let compScore = 0;
    if (compAns1 === '50 rupees') compScore += 50;
    if (compAns2 === '5 weeks') compScore += 50;

    const overallScore = Math.round((readingScore + writingScore + compScore) / 3);

    // Save assessment results
    const results = {
      readingScore,
      writingScore,
      comprehensionScore: compScore,
      overallScore,
      completedAt: new Date().toISOString()
    };
    
    localStorage.setItem('assessmentResult', JSON.stringify(results));
    
    // Update local profile stats
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.profile) {
      user.profile.readingLevel = overallScore >= 75 ? 'Advanced' : overallScore >= 45 ? 'Intermediate' : 'Beginner';
      user.profile.writingLevel = writingScore >= 70 ? 'Advanced' : writingScore >= 40 ? 'Intermediate' : 'Beginner';
      user.profile.xp = (user.profile.xp || 0) + 50; // quiz XP bonus
      user.profile.coins = (user.profile.coins || 0) + 15;
      localStorage.setItem('user', JSON.stringify(user));
      
      // Update profiles listing in DB
      const username = localStorage.getItem('username') || 'guest';
      const profiles = JSON.parse(localStorage.getItem('profiles') || '[]');
      const idx = profiles.findIndex((p: any) => p.username === username);
      if (idx !== -1) {
        profiles[idx] = { ...profiles[idx], ...user.profile };
        localStorage.setItem('profiles', JSON.stringify(profiles));
      }
    }

    navigate('/ai-evaluation');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6 flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full bg-white border border-slate-100 p-8 md:p-10 rounded-3xl shadow-2xl space-y-8">
        
        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Initial Assessment</h1>
          <p className="text-slate-500 font-medium">Let's find out your current skill levels.</p>
        </div>

        {/* Progress bar visual */}
        <div className="space-y-3">
          <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>Reading</span>
            <span>Writing</span>
            <span>Comprehension</span>
          </div>
          <div className="grid grid-cols-3 gap-2 h-2.5">
            <div className={`rounded-full transition-all duration-300 ${step >= 1 ? 'bg-blue-600' : 'bg-slate-100'}`} />
            <div className={`rounded-full transition-all duration-300 ${step >= 2 ? 'bg-blue-600' : 'bg-slate-100'}`} />
            <div className={`rounded-full transition-all duration-300 ${step >= 3 ? 'bg-blue-600' : 'bg-slate-100'}`} />
          </div>
        </div>

        {/* Wizard Steps */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <span>📖 Section 1: Reading</span>
              </h2>
              <button
                onClick={() => handleSpeak("Identify the sentence, read carefully: The sun rises in the east. It is a beautiful morning. Question: When does the sun rise?")}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-xl text-sm font-bold flex items-center gap-1 transition-all"
                title="Listen to paragraph"
              >
                <Volume2 className="w-5 h-5 text-blue-500" />
                <span>Listen</span>
              </button>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-lg leading-relaxed text-slate-800 font-semibold font-serif text-center">
              "The sun rises in the east. Birds sing in the trees. It is a beautiful morning."
            </div>

            <div className="space-y-4">
              <label className="block font-bold text-slate-800 text-base">Question: When does the sun rise?</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Morning', 'Evening', 'Night', 'Afternoon'].map((opt) => (
                  <label
                    key={opt}
                    className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                      readingAns === opt
                        ? 'border-blue-600 bg-blue-50/50 text-blue-900 font-bold'
                        : 'border-slate-100 hover:border-slate-200 text-slate-700 bg-white'
                    }`}
                  >
                    <span>{opt}</span>
                    <input
                      type="radio"
                      name="reading"
                      value={opt}
                      checked={readingAns === opt}
                      onChange={() => setReadingAns(opt)}
                      className="w-4.5 h-4.5 text-blue-600 border-slate-300"
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={handleNextStep}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-base px-8 py-3.5 rounded-2xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all cursor-pointer"
              >
                <span>Next Section</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <span>✍ Section 2: Writing</span>
              </h2>
            </div>

            <div className="space-y-2">
              <label className="block font-bold text-slate-800 text-base">Task: Write a sentence about your favorite food or your home city.</label>
              <p className="text-slate-500 text-sm">Write at least 5 words. Make sure to use capital letters and end with a period.</p>
            </div>

            <div className="relative">
              <textarea
                value={writingText}
                onChange={(e) => setWritingText(e.target.value)}
                className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 text-slate-800 font-semibold text-lg"
                placeholder="Type your sentence here..."
              />
              <div className="absolute right-4 bottom-4 bg-white/80 backdrop-blur border border-slate-100 px-3 py-1 rounded-full text-xs font-bold text-slate-500">
                Word Count: {wordsCount}
              </div>
            </div>

            {/* Grammar Hints Visual */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Grammar Help Desk</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="flex items-center gap-2">
                  {startsWithCapital ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
                  )}
                  <span className={`text-xs font-bold ${startsWithCapital ? 'text-slate-700' : 'text-slate-400'}`}>Capital Letter</span>
                </div>
                <div className="flex items-center gap-2">
                  {endsWithPeriod ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
                  )}
                  <span className={`text-xs font-bold ${endsWithPeriod ? 'text-slate-700' : 'text-slate-400'}`}>Ends with Period (.)</span>
                </div>
                <div className="flex items-center gap-2">
                  {hasMinWords ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
                  )}
                  <span className={`text-xs font-bold ${hasMinWords ? 'text-slate-700' : 'text-slate-400'}`}>5+ Words Required</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={handleNextStep}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-base px-8 py-3.5 rounded-2xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all cursor-pointer"
              >
                <span>Next Section</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <span>📖 Section 3: Comprehension</span>
              </h2>
              <button
                onClick={() => handleSpeak("Read the story: Rohan wanted to buy a book. The book was 50 rupees. Rohan saved 10 rupees every week. After five weeks, he had enough money to buy his book. Rohan was very happy. Now answer the questions.")}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-xl text-sm font-bold flex items-center gap-1 transition-all"
              >
                <Volume2 className="w-5 h-5 text-blue-500" />
                <span>Listen Story</span>
              </button>
            </div>

            {/* Story Card */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-base leading-relaxed text-slate-800 font-semibold font-serif">
              "Rohan wanted to buy a book. The book was 50 rupees. Rohan saved 10 rupees every week. After five weeks, he had enough money to buy his book. Rohan was very happy."
            </div>

            {/* Question 1 */}
            <div className="space-y-3">
              <label className="block font-bold text-slate-800 text-base">Q1. How much did the book cost?</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['10 rupees', '50 rupees', '100 rupees', 'Free'].map((opt) => (
                  <label
                    key={opt}
                    className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center cursor-pointer text-center text-sm font-bold transition-all ${
                      compAns1 === opt
                        ? 'border-blue-600 bg-blue-50/50 text-blue-900 font-bold'
                        : 'border-slate-100 hover:border-slate-200 text-slate-700 bg-white'
                    }`}
                  >
                    <span>{opt}</span>
                    <input
                      type="radio"
                      name="comp1"
                      value={opt}
                      checked={compAns1 === opt}
                      onChange={() => setCompAns1(opt)}
                      className="sr-only"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Question 2 */}
            <div className="space-y-3">
              <label className="block font-bold text-slate-800 text-base">Q2. How long did Rohan take to save the money?</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['1 week', '5 weeks', '2 weeks', '10 weeks'].map((opt) => (
                  <label
                    key={opt}
                    className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center cursor-pointer text-center text-sm font-bold transition-all ${
                      compAns2 === opt
                        ? 'border-blue-600 bg-blue-50/50 text-blue-900 font-bold'
                        : 'border-slate-100 hover:border-slate-200 text-slate-700 bg-white'
                    }`}
                  >
                    <span>{opt}</span>
                    <input
                      type="radio"
                      name="comp2"
                      value={opt}
                      checked={compAns2 === opt}
                      onChange={() => setCompAns2(opt)}
                      className="sr-only"
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={handleSubmit}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-base px-8 py-3.5 rounded-2xl shadow-xl shadow-blue-500/20 active:scale-95 transition-all cursor-pointer"
              >
                <span>Submit & View Results</span>
                <Sparkles className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
