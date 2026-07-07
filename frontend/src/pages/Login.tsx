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
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4 relative">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-10 left-10 w-48 h-48 bg-blue-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-indigo-300/20 rounded-full blur-3xl pointer-events-none" />

      {/* Language Toggle in Corner */}
      <div className="absolute top-6 right-6">
        <select
          value={lang}
          onChange={(e) => {
            const newL = e.target.value as SupportedLanguage;
            setLang(newL);
            localStorage.setItem('preferredLanguage', newL);
          }}
          className="bg-white border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="english">🇬🇧 English</option>
          <option value="hindi">🇮🇳 हिंदी (Hindi)</option>
          <option value="telugu">🇮🇳 తెలుగు (Telugu)</option>
          <option value="tamil">🇮🇳 தமிழ் (Tamil)</option>
          <option value="kannada">🇮🇳 ಕನ್ನಡ (Kannada)</option>
          <option value="malayalam">🇮🇳 മലയാളം (Malayalam)</option>
          <option value="marathi">🇮🇳 मराठी (Marathi)</option>
          <option value="bengali">🇮🇳 বাংলা (Bengali)</option>
          <option value="gujarati">🇮🇳 ગુજરાતી (Gujarati)</option>
          <option value="punjabi">🇮🇳 ਪੰਜਾਬੀ (Punjabi)</option>
        </select>
      </div>

      <div className="backdrop-blur-md bg-white/70 border border-white/60 p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-md relative z-10 transition-all">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/25">
            <span className="text-2xl">📚</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{t.login}</h1>
          <p className="text-slate-500 font-semibold text-sm mt-1">AI-Powered Literacy Assistant</p>
        </div>

        {/* Success message */}
        {successMessage && (
          <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-2xl px-4 py-3.5 mb-6 text-xs font-semibold flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="bg-amber-50 border border-amber-100 text-amber-800 rounded-2xl px-4 py-3.5 mb-6 text-xs font-semibold">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Username</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                className="w-full pl-12 pr-4 py-4 bg-white/80 border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-semibold"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username (e.g. adarsh)"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="password"
                className="w-full pl-12 pr-4 py-4 bg-white/80 border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-semibold"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password (e.g. password)"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-600 font-semibold cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
              />
              Remember Me
            </label>
            <a href="#" className="text-blue-600 hover:underline font-semibold">Forgot Password?</a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-base font-extrabold py-4 rounded-2xl hover:shadow-xl hover:shadow-blue-500/20 active:scale-95 transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>⏳ Logging in...</span>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>🔐 Log In</span>
              </>
            )}
          </button>
        </form>

        {/* Google Sign In */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
          <span className="relative bg-slate-50 px-4 text-xs font-bold uppercase tracking-wider text-slate-400">or sign in with</span>
        </div>

        <div className="flex flex-col gap-3 justify-center items-center">
          <div className="w-full flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError('Google Authentication Failed.')}
              useOneTap
            />
          </div>

          <button
            type="button"
            onClick={() => {
              setUsername('adarsh');
              setPassword('password');
            }}
            className="w-full bg-white border border-slate-200 text-slate-700 font-bold py-3.5 rounded-2xl shadow-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
          >
            <span className="text-lg">🤖</span>
            <span>Fill Demo Credentials</span>
          </button>
        </div>

        <p className="mt-8 text-center text-slate-500 text-sm font-semibold">
          New here?{' '}
          <Link to="/register" className="text-blue-600 font-bold hover:underline">
            {t.register}
          </Link>
        </p>
      </div>
    </div>
  );
}
