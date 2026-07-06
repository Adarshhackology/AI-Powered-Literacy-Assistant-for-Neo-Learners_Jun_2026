import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiClient } from '../utils/api';
import { SupportedLanguage } from '../utils/translationHelper';
import { Sparkles, User, Mail, Phone, Lock, BookOpen } from 'lucide-react';

export default function Register() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [education, setEducation] = useState('Primary School');
  const [prefLanguage, setPrefLanguage] = useState<SupportedLanguage>('english');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    const savedLang = localStorage.getItem('preferredLanguage') as SupportedLanguage;
    if (savedLang) {
      setPrefLanguage(savedLang);
    }
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Generate unique username from name if empty
    const finalUsername = username.trim() || name.toLowerCase().replace(/\s+/g, '') + Math.floor(Math.random() * 100);

    try {
      const response = await apiClient.register({
        name,
        username: finalUsername,
        email,
        phone,
        password,
        age,
        education,
        preferredLanguage: prefLanguage
      });
      if (response.message === 'User registered successfully') {
        navigate('/login', { state: { message: 'Registration successful! Please log in with your credentials.' } });
      }
    } catch (err: any) {
      setError(err.message || 'Error occurred during registration. Please try another username.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4 relative">
      <div className="absolute top-10 right-10 w-48 h-48 bg-blue-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-indigo-300/20 rounded-full blur-3xl pointer-events-none" />

      <div className="backdrop-blur-md bg-white/70 border border-white/60 p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-xl relative z-10 transition-all">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/25">
            <span className="text-2xl">📚</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create Learner Account</h1>
          <p className="text-slate-500 font-semibold text-sm mt-1">Start your AI-guided literacy journey today</p>
        </div>

        {error && (
          <div className="bg-amber-50 border border-amber-100 text-amber-800 rounded-2xl px-4 py-3.5 mb-6 text-xs font-semibold">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  className="w-full pl-12 pr-4 py-3.5 bg-white/80 border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-semibold"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Adarsh Kumar"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  className="w-full pl-12 pr-4 py-3.5 bg-white/80 border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-semibold"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Unique ID e.g. adarsh12"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  className="w-full pl-12 pr-4 py-3.5 bg-white/80 border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-semibold"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. name@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="tel"
                  className="w-full pl-12 pr-4 py-3.5 bg-white/80 border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-semibold"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit mobile"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  className="w-full pl-12 pr-4 py-3.5 bg-white/80 border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-semibold"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Age</label>
              <input
                type="number"
                className="w-full px-4 py-3.5 bg-white/80 border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-semibold"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Age"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Education Level</label>
              <div className="relative">
                <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <select
                  className="w-full pl-12 pr-4 py-3.5 bg-white/80 border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-semibold"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                >
                  <option value="No Formal Education">No Formal Education</option>
                  <option value="Primary School">Primary School</option>
                  <option value="Secondary School">Secondary School</option>
                  <option value="College/Higher Ed">College/Higher Ed</option>
                  <option value="Self-Taught">Self-Taught</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Preferred Language</label>
              <select
                className="w-full px-4 py-3.5 bg-white/80 border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-semibold"
                value={prefLanguage}
                onChange={(e) => setPrefLanguage(e.target.value as SupportedLanguage)}
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-base font-extrabold py-4 rounded-2xl hover:shadow-xl hover:shadow-blue-500/20 active:scale-95 transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>⏳ Registering...</span>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>📝 Create Profile & Register</span>
              </>
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-slate-500 text-sm font-semibold">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 font-bold hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
