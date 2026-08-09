import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { apiClient } from '../utils/api';
import { SupportedLanguage, translations } from '../utils/translationHelper';
import { ArrowLeft, User, Lock, Sparkles } from 'lucide-react';
import { Sparkle, RobotMascot } from '../components/UI/Illustrations';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lang, setLang] = useState<SupportedLanguage>('english');
  
  const navigate = useNavigate();
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
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Google Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="neolit-fluid-bg" style={{
      minHeight: '100vh',
      padding: '20px',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      position: 'relative',
    }}>

      {/* Background Star Field */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {[
          { t: '5%', l: '8%', s: 12 }, { t: '12%', l: '90%', s: 16 },
          { t: '25%', l: '3%', s: 14 }, { t: '45%', l: '95%', s: 10 },
          { t: '70%', l: '4%', s: 18 }, { t: '88%', l: '92%', s: 14 },
        ].map((st, i) => (
          <div key={i} className="animate-twinkle" style={{
            position: 'absolute', top: st.t, left: st.l,
            animationDelay: `${i * 0.4}s`, opacity: 0.7,
          }}>
            <Sparkle size={st.s} color={i % 2 === 0 ? '#FFD54A' : '#C4B5F4'} />
          </div>
        ))}
      </div>

      <div style={{ maxWidth: '440px', width: '100%', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* Top Glass Nav Bar */}
        <nav style={{
          height: '60px',
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '0 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          border: '1.5px solid rgba(255,255,255,0.6)',
        }}>
          <button
            onClick={() => navigate('/')}
            className="btn-3d"
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              color: '#1e1040', textDecoration: 'none',
              fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px',
              background: '#F0F4FF', padding: '6px 14px', borderRadius: '12px',
              border: '1px solid #E8EFFF', cursor: 'pointer',
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Home</span>
          </button>

          <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '16px', color: '#1e1040' }}>
            NeoLit Login
          </span>

          <div style={{ width: '40px' }} />
        </nav>

        {/* Login Card */}
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '28px',
          padding: '32px',
          border: '2px solid rgba(255,255,255,0.6)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          display: 'flex', flexDirection: 'column', gap: '20px',
        }}>

          {/* Logo & Header */}
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '18px',
              background: 'linear-gradient(135deg, #6C4CFF, #8A5CFF)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '28px', boxShadow: '0 8px 20px rgba(108,76,255,0.3)',
            }}>
              📚
            </div>
            <h1 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '24px', color: '#1e1040', margin: '4px 0 0' }}>
              {t.login}
            </h1>
            <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '13px', color: '#64748B', margin: 0 }}>
              AI-Powered Literacy Assistant
            </p>
          </div>

          {successMessage && (
            <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', color: '#065F46', borderRadius: '12px', padding: '10px 14px', fontFamily: 'Nunito', fontWeight: 700, fontSize: '12px' }}>
              ✅ {successMessage}
            </div>
          )}

          {error && (
            <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#991B1B', borderRadius: '12px', padding: '10px 14px', fontFamily: 'Nunito', fontWeight: 700, fontSize: '12px' }}>
              ⚠️ {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter username (e.g. adarsh)"
                style={{
                  width: '100%', padding: '12px 14px', borderRadius: '14px',
                  border: '1.5px solid #E8EFFF', background: '#F8FAFF',
                  fontFamily: 'Nunito', fontWeight: 700, fontSize: '13px', color: '#1e1040', outline: 'none',
                }}
              />
            </div>

            <div>
              <label style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password"
                style={{
                  width: '100%', padding: '12px 14px', borderRadius: '14px',
                  border: '1.5px solid #E8EFFF', background: '#F8FAFF',
                  fontFamily: 'Nunito', fontWeight: 700, fontSize: '13px', color: '#1e1040', outline: 'none',
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontFamily: 'Nunito', fontWeight: 700, fontSize: '12px', color: '#64748B' }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                />
                Remember Me
              </label>
              <span style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: '12px', color: '#6C4CFF', cursor: 'pointer' }}>Forgot Password?</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-3d"
              style={{
                background: 'linear-gradient(135deg, #6C4CFF, #8A5CFF)',
                color: 'white', fontFamily: 'Poppins', fontWeight: 900, fontSize: '15px',
                padding: '12px', borderRadius: '14px', border: 'none',
                borderBottom: '3.5px solid #4D2FCC', cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 6px 18px rgba(108,76,255,0.4)', marginTop: '4px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              }}
            >
              <Sparkles className="w-4 h-4" />
              <span>{loading ? 'Logging in...' : 'Log In'}</span>
            </button>
          </form>

          {/* Social login divider */}
          <div style={{ textAlign: 'center', position: 'relative', margin: '4px 0' }}>
            <span style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '10px', color: '#94A3B8', background: 'white', padding: '0 8px', position: 'relative', zIndex: 1 }}>
              or sign in with
            </span>
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: '#E8EFFF' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError('Google login failed')}
            />
            
            <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '12px', color: '#64748B' }}>
              New here? <Link to="/register" style={{ color: '#6C4CFF', fontWeight: 900, textDecoration: 'none' }}>Register</Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
