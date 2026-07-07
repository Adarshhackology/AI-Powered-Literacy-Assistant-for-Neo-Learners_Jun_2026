import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { apiClient } from '../utils/api';
import { SupportedLanguage, translations } from '../utils/translationHelper';
import { ShieldCheck, Mail, Lock, Sparkles } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lang, setLang] = useState<SupportedLanguage>('english');
  
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setLoading(true);
    setError('');
    try {
      const response = await apiClient.googleLogin(credentialResponse.credential);
      if (response.message === 'Login successful') {
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('username', response.user.username);
        if (response.isNewUser) {
          navigate('/profile-setup');
        } else if (response.user.profile && response.user.profile.fullName) {
          navigate('/dashboard');
        } else {
          navigate('/profile-setup');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Google Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const location = useLocation();
  const successMessage = (location.state as any)?.message;

  useEffect(() => {
    const savedLang = localStorage.getItem('preferredLanguage') as SupportedLanguage;
    if (savedLang) {
      setLang(savedLang);
    }
  }, []);

  const t = translations[lang] || translations.english;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await apiClient.login(username, password);
      if (response.message === 'Login successful') {
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('username', response.user.username);
        // check if they already have completed profiles, else profile-setup
        if (response.user.profile && response.user.profile.fullName) {
          navigate('/dashboard');
        } else {
          navigate('/profile-setup');
        }
      }
    } catch (err: any) {
      setError('Wrong credentials. (Try username "adarsh" and password "password")');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50/50 px-4 relative font-inter">
      {/* Decorative Radial Background Lights */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-blue-400/10 to-indigo-400/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-violet-400/10 to-purple-400/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Language Toggle in Corner */}
      <div className="absolute top-6 right-6 z-20">
        <select
          value={lang}
          onChange={(e) => {
            const newL = e.target.value as SupportedLanguage;
            setLang(newL);
            localStorage.setItem('preferredLanguage', newL);
          }}
          className="bg-white/80 backdrop-blur-md border border-slate-200/80 text-slate-700 text-xs font-semibold rounded-2xl px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
        >
          <option value="english">🇬🇧 English</option>
          <option value="hindi">🇮🇳 हिंदी (Hindi)</option>
          <option value="telugu">🇮🇳 తెలుగు (Telugu)</option>
          <option value="tamil">🇮🇳 தமிழ் (Tamil)</option>
          <option value="kannada">🇮🇳 ಕನ್ನಡ (Kannada)</option>
          <option value="malayalam">🇮🇳 Malayalam</option>
          <option value="marathi">🇮🇳 Marathi</option>
          <option value="bengali">🇮🇳 Bengali</option>
          <option value="gujarati">🇮🇳 Gujarati</option>
          <option value="punjabi">🇮🇳 Punjabi</option>
        </select>
      </div>

      <div className="backdrop-blur-xl bg-white/90 border border-slate-200/50 p-8 md:p-10 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(99,102,241,0.06)] w-full max-w-md relative z-10 transition-all duration-300">
        {/* Header / Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-600/20 transition-all hover:scale-105 duration-300">
            <span className="text-3xl leading-none">📚</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-poppins">{t.login}</h1>
          <p className="text-slate-500 font-medium text-sm mt-1.5">AI-Powered Literacy Assistant</p>
        </div>

        {/* Messages */}
        {successMessage && (
          <div className="bg-emerald-50/50 border border-emerald-100/80 text-emerald-800 rounded-2xl px-4 py-3.5 mb-6 text-xs font-semibold flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {error && (
          <div className="bg-amber-50/50 border border-amber-100/80 text-amber-800 rounded-2xl px-4 py-3.5 mb-6 text-xs font-semibold flex items-start gap-2">
            <span className="text-sm leading-none mt-0.5">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider pl-1">Username</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400/80" />
              <input
                type="text"
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all duration-200 font-medium text-sm placeholder:text-slate-400"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username (e.g. adarsh)"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider pl-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400/80" />
              <input
                type="password"
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all duration-200 font-medium text-sm placeholder:text-slate-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password (e.g. password)"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-semibold pt-1">
            <label className="flex items-center gap-2 text-slate-500 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-indigo-600 border-slate-200 rounded focus:ring-indigo-500/20"
              />
              Remember Me
            </label>
            <a href="#" className="text-indigo-600 hover:underline">Forgot Password?</a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-bold py-4 rounded-2xl hover:shadow-[0_8px_20px_rgba(99,102,241,0.25)] active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span>⏳ Logging in...</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Log In</span>
              </>
            )}
          </button>
        </form>

        {/* Separator */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100" /></div>
          <span className="relative bg-[#fafafa] px-4 text-[10px] font-bold uppercase tracking-widest text-slate-400/80">or sign in with</span>
        </div>

        {/* Google OAuth Component */}
        <div className="flex justify-center mt-2">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError('Google Authentication Failed.')}
            useOneTap
          />
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-slate-400 text-xs font-semibold">
          New here?{' '}
          <Link to="/register" className="text-indigo-600 font-bold hover:underline">
            {t.register}
          </Link>
        </p>
      </div>
    </div>
  );
}
