import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../utils/api';
import { Sparkles, ArrowRight, User } from 'lucide-react';

const avatars = [
  { id: '1', emoji: '🧑‍🎓', label: 'Learner' },
  { id: '2', emoji: '👩‍🏫', label: 'Scholar' },
  { id: '3', emoji: '🧭', label: 'Explorer' },
  { id: '4', emoji: '🦉', label: 'Wise Owl' },
  { id: '5', emoji: '🤖', label: 'Techie' },
];

export default function ProfileSetup() {
  const username = localStorage.getItem('username') || 'guest';
  const navigate = useNavigate();

  const [avatar, setAvatar] = useState('1');
  const [fullName, setFullName] = useState(username);
  const [age, setAge] = useState('24');
  const [gender, setGender] = useState('Male');
  const [education, setEducation] = useState('Secondary School');
  const [occupation, setOccupation] = useState('Student');
  const [prefLang, setPrefLang] = useState(localStorage.getItem('preferredLanguage') || 'english');
  const [learningGoal, setLearningGoal] = useState('Improve Speaking & Reading');
  const [readingLevel, setReadingLevel] = useState('Beginner');
  const [writingLevel, setWritingLevel] = useState('Beginner');
  const [speakingConfidence, setSpeakingConfidence] = useState('50');
  const [dailyTime, setDailyTime] = useState('30 mins');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const profileData = {
        fullName,
        age,
        gender,
        education,
        occupation,
        preferredLanguage: prefLang,
        learningGoal,
        readingLevel,
        writingLevel,
        speakingConfidence,
        dailyLearningTime: dailyTime,
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
      
      // Send learner to level selection page with images
      navigate('/level-selection');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6 flex flex-col items-center justify-center relative">
      {/* Background decorations */}
      <div className="absolute top-10 left-10 w-48 h-48 bg-blue-300/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-indigo-300/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl w-full bg-white border border-slate-100 p-8 md:p-10 rounded-3xl shadow-2xl relative z-10">
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center gap-1 bg-blue-50 border border-blue-100 text-blue-700 font-bold px-4 py-1.5 rounded-full text-xs">
            <Sparkles className="w-4.5 h-4.5" />
            <span>Learner Setup</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create Learner Profile</h1>
          <p className="text-slate-500 font-medium">Tell us about yourself to customize your learning path.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Avatar Selector */}
          <div className="space-y-3 text-center">
            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Choose Profile Avatar</label>
            <div className="flex justify-center gap-4">
              {avatars.map((av) => (
                <div
                  key={av.id}
                  onClick={() => setAvatar(av.id)}
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl border-2 cursor-pointer transition-all hover:scale-105 ${
                    avatar === av.id
                      ? 'border-blue-600 bg-blue-50 shadow-md ring-2 ring-blue-500/10'
                      : 'border-slate-100 bg-slate-50 hover:border-slate-300'
                  }`}
                  title={av.label}
                >
                  {av.emoji}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-semibold"
                  placeholder="e.g. Adarsh Kumar"
                />
              </div>
            </div>

            {/* Age */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Age</label>
              <input
                type="number"
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-semibold"
                placeholder="Age"
              />
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-semibold"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            {/* Daily Learning Time */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Daily Study Time</label>
              <select
                value={dailyTime}
                onChange={(e) => setDailyTime(e.target.value)}
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-semibold"
              >
                <option value="15 mins">15 mins (Quick)</option>
                <option value="30 mins">30 mins (Recommended)</option>
                <option value="45 mins">45 mins (Active)</option>
                <option value="60 mins">60 mins (Intense)</option>
              </select>
            </div>

            {/* Occupation */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Occupation</label>
              <input
                type="text"
                required
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-semibold"
                placeholder="e.g. Farmer, Housewife, Shopkeeper"
              />
            </div>

            {/* Preferred Language */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Preferred Language</label>
              <select
                value={prefLang}
                onChange={(e) => setPrefLang(e.target.value)}
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-semibold"
              >
                <option value="english">English</option>
                <option value="hindi">हिंदी (Hindi)</option>
                <option value="telugu">తెలుగు (Telugu)</option>
                <option value="tamil">தமிழ் (Tamil)</option>
                <option value="kannada">ಕನ್ನಡ (Kannada)</option>
                <option value="malayalam">മലയാളം (Malayalam)</option>
                <option value="marathi">मराठी (Marathi)</option>
                <option value="bengali">বাংলা (Bengali)</option>
                <option value="gujarati">ગુજરાતી (Gujarati)</option>
                <option value="punjabi">ਪੰਜਾਬੀ (Punjabi)</option>
              </select>
            </div>
          </div>

          <hr className="border-slate-100" />

          <div className="space-y-6">
            <h3 className="font-extrabold text-slate-900 text-lg">Literacy Goals & Skill Levels</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Learning Goal */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">What is your primary learning goal?</label>
                <select
                  value={learningGoal}
                  onChange={(e) => setLearningGoal(e.target.value)}
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-semibold"
                >
                  <option value="Read newspapers and signs">Read newspapers and signs</option>
                  <option value="Write basic letters & forms">Write basic letters & forms</option>
                  <option value="Chat with family & kids">Chat with family & kids</option>
                  <option value="Prepare for job applications">Prepare for job applications</option>
                  <option value="General reading confidence">General reading confidence</option>
                </select>
              </div>

              {/* Reading Level */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Your Reading Confidence</label>
                <select
                  value={readingLevel}
                  onChange={(e) => setReadingLevel(e.target.value)}
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-semibold"
                >
                  <option value="Beginner">Beginner (Cannot read full sentences)</option>
                  <option value="Intermediate">Intermediate (Can read basic sentences)</option>
                  <option value="Advanced">Advanced (Can read full books)</option>
                </select>
              </div>

              {/* Writing Level */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Your Writing Confidence</label>
                <select
                  value={writingLevel}
                  onChange={(e) => setWritingLevel(e.target.value)}
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-semibold"
                >
                  <option value="Beginner">Beginner (Cannot write letters/words)</option>
                  <option value="Intermediate">Intermediate (Can spell basic words)</option>
                  <option value="Advanced">Advanced (Can write complete paragraphs)</option>
                </select>
              </div>

              {/* Speaking Confidence Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Speaking Confidence</label>
                  <span className="text-sm font-extrabold text-blue-600">{speakingConfidence}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={speakingConfidence}
                  onChange={(e) => setSpeakingConfidence(e.target.value)}
                  className="w-full accent-blue-600 bg-slate-100 rounded-lg cursor-pointer h-2"
                />
                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                  <span>Shy</span>
                  <span>Average</span>
                  <span>Fluent</span>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-base font-extrabold py-4 rounded-2xl hover:shadow-xl hover:shadow-blue-500/20 active:scale-95 transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>⏳ Saving...</span>
            ) : (
              <>
                <span>Create Profile & Start Assessment</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
