import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
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

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setLoading(true);
    setError('');
    try {
      const response = await apiClient.googleLogin(credentialResponse.credential);
      if (response.message === 'Login successful') {
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('username', response.user.username);
        // Sign-up flow always redirects to onboarding setup questions
        navigate('/profile-setup');
      }
    } catch (err: any) {
      setError(err.message || 'Google registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-50 via-slate-100 to-indigo-50/30 py-12 px-4 relative font-inter overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-[-25%] right-[-15%] w-[600px] h-[600px] bg-gradient-to-tr from-blue-400/20 to-indigo-400/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-25%] left-[-15%] w-[700px] h-[700px] bg-gradient-to-br from-violet-400/15 to-purple-400/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="backdrop-blur-xl bg-white/90 border border-slate-200/50 p-8 md:p-10 rounded-[36px] shadow-[0_25px_70px_rgba(0,0,0,0.025)] hover:shadow-[0_30px_80px_rgba(99,102,241,0.06)] w-full max-w-xl relative z-10 transition-all duration-300">
        {/* Header / Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-tr from-indigo-500 to-blue-600 rounded-[22px] flex items-center justify-center mx-auto mb-4 shadow-[0_10px_25px_rgba(99,102,241,0.25)] ring-4 ring-indigo-50 transition-all hover:scale-105 duration-300">
            <span className="text-3xl leading-none filter drop-shadow-md">📚</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight font-poppins">Create Learner Account</h1>
          <p className="text-slate-500 font-semibold text-xs mt-1.5 uppercase tracking-widest pl-0.5">Start your AI-guided literacy journey today</p>
        </div>

        {/* Errors */}
        {error && (
          <div className="bg-rose-50 border border-rose-100 text-rose-800 rounded-2xl px-4 py-3.5 mb-6 text-xs font-bold flex items-start gap-2 shadow-sm">
            <span className="text-sm leading-none mt-0.5">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleRegister} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 focus-within:text-indigo-600 transition-colors" />
                <input
                  type="text"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200/85 focus:border-indigo-600 rounded-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 font-semibold text-sm placeholder:text-slate-400/80"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Adarsh Kumar"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Username</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 focus-within:text-indigo-600 transition-colors" />
                <input
                  type="text"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200/85 focus:border-indigo-600 rounded-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 font-semibold text-sm placeholder:text-slate-400/80"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Unique ID e.g. adarsh12"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 focus-within:text-indigo-600 transition-colors" />
                <input
                  type="email"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200/85 focus:border-indigo-600 rounded-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 font-semibold text-sm placeholder:text-slate-400/80"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. name@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Phone Number</label>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 focus-within:text-indigo-600 transition-colors" />
                <input
                  type="tel"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200/85 focus:border-indigo-600 rounded-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 font-semibold text-sm placeholder:text-slate-400/80"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit mobile"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 focus-within:text-indigo-600 transition-colors" />
                <input
                  type="password"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200/85 focus:border-indigo-600 rounded-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 font-semibold text-sm placeholder:text-slate-400/80"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Age</label>
              <input
                type="number"
                className="w-full px-4 py-3.5 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200/85 focus:border-indigo-600 rounded-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 font-semibold text-sm placeholder:text-slate-400/80"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Age"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Education Level</label>
              <div className="relative group">
                <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 focus-within:text-indigo-600 transition-colors" />
                <select
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200/85 focus:border-indigo-600 rounded-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 font-semibold text-sm cursor-pointer"
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

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Preferred Language</label>
              <select
                className="w-full px-4 py-3.5 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200/85 focus:border-indigo-600 rounded-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 font-semibold text-sm cursor-pointer"
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
            className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-extrabold py-4 rounded-2xl hover:shadow-[0_10px_25px_rgba(99,102,241,0.25)] active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            {loading ? (
              <span>⏳ Registering...</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Create Profile & Register</span>
              </>
            )}
          </button>
        </form>

        {/* Separator */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100" /></div>
          <span className="relative bg-white px-4 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400/80">or sign up with</span>
        </div>

        {/* Google Register Component */}
        <div className="flex justify-center mt-2">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError('Google Registration Failed.')}
            useOneTap
          />
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-slate-400 text-xs font-semibold">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 font-extrabold hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
