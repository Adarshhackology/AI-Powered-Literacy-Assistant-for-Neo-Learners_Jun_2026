import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../utils/api';
import { Sparkles, ArrowRight, ArrowLeft, User, CheckCircle2 } from 'lucide-react';

const avatars = [
  { id: '1', emoji: '🧑‍🎓', label: 'Learner' },
  { id: '2', emoji: '👩‍🏫', label: 'Scholar' },
  { id: '3', emoji: '🧭', label: 'Explorer' },
  { id: '4', emoji: '🦉', label: 'Wise Owl' },
  { id: '5', emoji: '🤖', label: 'Techie' },
];

const goals = [
  { id: 'Read newspapers and signs', emoji: '📰', title: 'Read signs & news', desc: 'Understand notice boards, newspapers, and signposts.' },
  { id: 'Write basic letters & forms', emoji: '✉️', title: 'Write letters & forms', desc: 'Fill out documents, application forms, and write letters.' },
  { id: 'Chat with family & kids', emoji: '💬', title: 'Chat with family', desc: 'Message and talk confidently with children and relatives.' },
  { id: 'Prepare for job applications', emoji: '💼', title: 'Job preparation', desc: 'Write emails, read resumes, and practice basic interviews.' }
];

const readingOptions = [
  { level: 'Beginner', emoji: '🔴', label: 'Beginner', desc: 'Cannot read full sentences yet.' },
  { level: 'Intermediate', emoji: '🟡', label: 'Intermediate', desc: 'Can read basic words and simple sentences.' },
  { level: 'Advanced', emoji: '🟢', label: 'Advanced', desc: 'Can read newspaper articles and books.' }
];

const writingOptions = [
  { level: 'Beginner', emoji: '🔴', label: 'Beginner', desc: 'Cannot write letters or full words yet.' },
  { level: 'Intermediate', emoji: '🟡', label: 'Intermediate', desc: 'Can spell basic words and simple messages.' },
  { level: 'Advanced', emoji: '🟢', label: 'Advanced', desc: 'Can write complete paragraphs and letters.' }
];

const speakingOptions = [
  { level: 'Shy', value: '30', emoji: '🤐', label: 'Shy / Need practice', desc: 'I feel nervous speaking out loud.' },
  { level: 'Average', value: '60', emoji: '🙂', label: 'Average / Can talk basic', desc: 'I can speak simple everyday sentences.' },
  { level: 'Fluent', value: '95', emoji: '🗣️', label: 'Fluent / Speak easily', desc: 'I can speak and express my ideas clearly.' }
];

export default function ProfileSetup() {
  const username = localStorage.getItem('username') || 'guest';
  const navigate = useNavigate();

  // Onboarding wizard steps: 1 to 5
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Form states
  const [avatar, setAvatar] = useState('1');
  const [fullName, setFullName] = useState(username);
  const [age, setAge] = useState('24');
  const [learningGoal, setLearningGoal] = useState('Read newspapers and signs');
  const [readingLevel, setReadingLevel] = useState('Beginner');
  const [writingLevel, setWritingLevel] = useState('Beginner');
  const [speakingLevel, setSpeakingLevel] = useState('Average');
  const [speakingConfidence, setSpeakingConfidence] = useState('60');

  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    if (step === 1) {
      if (!fullName.trim() || !age) {
        alert('Please fill in your name and age.');
        return;
      }
    }
    setStep((prev) => (prev + 1) as any);
  };

  const handleBack = () => {
    setStep((prev) => (prev - 1) as any);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const profileData = {
        fullName,
        age,
        gender: 'Prefer not to say',
        education: 'Self-Taught',
        occupation: 'Learner',
        preferredLanguage: localStorage.getItem('preferredLanguage') || 'english',
        learningGoal,
        readingLevel,
        writingLevel,
        speakingConfidence,
        dailyLearningTime: '30 mins',
        avatar: avatars.find(a => a.id === avatar)?.emoji || '🧑‍🎓',
        xp: 20,
        coins: 10,
        streak: 1,
        level: 1,
        badges: ['First Step'],
        completedLessons: []
      };
      
      const res = await apiClient.saveProfile(username, profileData);
      
      // Update global user structure in localStorage
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      user.profile = res;
      localStorage.setItem('user', JSON.stringify(user));
      
      navigate('/level-selection');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6 flex flex-col items-center justify-center relative font-inter">
      {/* Decorative Lights */}
      <div className="absolute top-10 left-10 w-48 h-48 bg-blue-300/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-indigo-300/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl w-full bg-white border border-slate-200/50 p-8 md:p-10 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.03)] relative z-10 space-y-8">
        
        {/* Wizard Step Progress Tracker */}
        <div className="space-y-2.5">
          <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">
            <span>Step {step} of 5</span>
            <span>{Math.round((step / 5) * 100)}% Complete</span>
          </div>
          <div className="grid grid-cols-5 gap-1.5 h-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <div 
                key={s} 
                className={`rounded-full transition-all duration-300 ${
                  step >= s ? 'bg-indigo-600' : 'bg-slate-100'
                }`} 
              />
            ))}
          </div>
        </div>

        {/* STEP 1: Personal Details */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1 bg-indigo-50 border border-indigo-100 text-indigo-700 font-extrabold px-4 py-1.5 rounded-full text-xs">
                <Sparkles className="w-4.5 h-4.5" />
                <span>Learner Profile Setup</span>
              </div>
              <h2 className="text-2.5xl font-black text-slate-900 tracking-tight">Let's build your profile</h2>
              <p className="text-slate-500 font-semibold text-sm">Tell us your name and choose a character avatar.</p>
            </div>

            <div className="space-y-6 pt-4">
              {/* Avatar Picker */}
              <div className="space-y-3">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">Choose Your Avatar</label>
                <div className="flex justify-center gap-3">
                  {avatars.map((av) => (
                    <div
                      key={av.id}
                      onClick={() => setAvatar(av.id)}
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl border transition-all hover:scale-105 cursor-pointer ${
                        avatar === av.id
                          ? 'border-indigo-600 bg-indigo-50/20 shadow-md ring-4 ring-indigo-500/5'
                          : 'border-slate-100 bg-slate-50 hover:border-slate-300'
                      }`}
                      title={av.label}
                    >
                      {av.emoji}
                    </div>
                  ))}
                </div>
              </div>

              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider pl-1">What is your name?</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400/80" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all font-semibold text-sm placeholder:text-slate-400"
                    placeholder="e.g. Adarsh Kumar"
                  />
                </div>
              </div>

              {/* Age */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider pl-1">How old are you?</label>
                <input
                  type="number"
                  required
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all font-semibold text-sm placeholder:text-slate-400"
                  placeholder="Age"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm px-8 py-3.5 rounded-2xl shadow-md hover:shadow-indigo-600/10 active:scale-95 transition-all cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Learning Goal */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2.5xl font-black text-slate-900 tracking-tight">What is your learning goal?</h2>
              <p className="text-slate-500 font-semibold text-sm">Choose what you want to achieve with this assistant.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              {goals.map((g) => (
                <div
                  key={g.id}
                  onClick={() => setLearningGoal(g.id)}
                  className={`p-5 rounded-2xl border cursor-pointer text-left transition-all ${
                    learningGoal === g.id
                      ? 'border-indigo-600 bg-indigo-50/20 shadow-md ring-4 ring-indigo-500/5'
                      : 'border-slate-100 bg-white hover:border-slate-300 hover:shadow-sm'
                  }`}
                >
                  <div className="text-3xl mb-2.5">{g.emoji}</div>
                  <h4 className="font-extrabold text-slate-950 text-sm leading-snug">{g.title}</h4>
                  <p className="text-slate-400 text-xs font-semibold mt-1 leading-relaxed">{g.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-6 border-t border-slate-100">
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-900 font-bold text-sm cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm px-8 py-3.5 rounded-2xl shadow-md hover:shadow-indigo-600/10 active:scale-95 transition-all cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Reading Confidence */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2.5xl font-black text-slate-900 tracking-tight">Your Reading Confidence</h2>
              <p className="text-slate-500 font-semibold text-sm">Choose the option that describes your reading skill best.</p>
            </div>

            <div className="space-y-4 pt-4">
              {readingOptions.map((opt) => (
                <div
                  key={opt.level}
                  onClick={() => setReadingLevel(opt.level)}
                  className={`p-5 rounded-2xl border cursor-pointer flex items-center gap-4 text-left transition-all ${
                    readingLevel === opt.level
                      ? 'border-indigo-600 bg-indigo-50/20 shadow-md ring-4 ring-indigo-500/5'
                      : 'border-slate-100 bg-white hover:border-slate-300 hover:shadow-sm'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xl shrink-0">
                    {opt.emoji}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-950 text-sm leading-snug">{opt.label}</h4>
                    <p className="text-slate-400 text-xs font-semibold mt-0.5">{opt.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-6 border-t border-slate-100">
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-900 font-bold text-sm cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm px-8 py-3.5 rounded-2xl shadow-md hover:shadow-indigo-600/10 active:scale-95 transition-all cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Writing Confidence */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2.5xl font-black text-slate-900 tracking-tight">Your Writing Confidence</h2>
              <p className="text-slate-500 font-semibold text-sm">Choose the option that describes your writing skill best.</p>
            </div>

            <div className="space-y-4 pt-4">
              {writingOptions.map((opt) => (
                <div
                  key={opt.level}
                  onClick={() => setWritingLevel(opt.level)}
                  className={`p-5 rounded-2xl border cursor-pointer flex items-center gap-4 text-left transition-all ${
                    writingLevel === opt.level
                      ? 'border-indigo-600 bg-indigo-50/20 shadow-md ring-4 ring-indigo-500/5'
                      : 'border-slate-100 bg-white hover:border-slate-300 hover:shadow-sm'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xl shrink-0">
                    {opt.emoji}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-950 text-sm leading-snug">{opt.label}</h4>
                    <p className="text-slate-400 text-xs font-semibold mt-0.5">{opt.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-6 border-t border-slate-100">
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-900 font-bold text-sm cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm px-8 py-3.5 rounded-2xl shadow-md hover:shadow-indigo-600/10 active:scale-95 transition-all cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Speaking Confidence */}
        {step === 5 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2.5xl font-black text-slate-900 tracking-tight">Speaking Confidence</h2>
              <p className="text-slate-500 font-semibold text-sm">Choose how comfortable you feel speaking out loud.</p>
            </div>

            <div className="space-y-4 pt-4">
              {speakingOptions.map((opt) => (
                <div
                  key={opt.level}
                  onClick={() => {
                    setSpeakingLevel(opt.level);
                    setSpeakingConfidence(opt.value);
                  }}
                  className={`p-5 rounded-2xl border cursor-pointer flex items-center gap-4 text-left transition-all ${
                    speakingLevel === opt.level
                      ? 'border-indigo-600 bg-indigo-50/20 shadow-md ring-4 ring-indigo-500/5'
                      : 'border-slate-100 bg-white hover:border-slate-300 hover:shadow-sm'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl shrink-0">
                    {opt.emoji}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-950 text-sm leading-snug">{opt.label}</h4>
                    <p className="text-slate-400 text-xs font-semibold mt-0.5">{opt.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-6 border-t border-slate-100 items-center">
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-900 font-bold text-sm cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm px-8 py-4 rounded-2xl shadow-lg shadow-indigo-600/10 active:scale-95 transition-all cursor-pointer disabled:opacity-60"
              >
                {loading ? (
                  <span>Saving...</span>
                ) : (
                  <>
                    <span>Complete Onboarding</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
}
