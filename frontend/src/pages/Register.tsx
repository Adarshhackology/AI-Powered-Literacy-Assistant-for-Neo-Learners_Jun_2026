import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { apiClient } from '../utils/api';
import type { SupportedLanguage } from '../utils/translationHelper';
import { ArrowLeft, User, Mail, Phone, Lock, Eye, EyeOff, Globe, Sparkles } from 'lucide-react';
import { Sparkle, RobotMascot } from '../components/UI/Illustrations';

const registerTranslations: Record<string, any> = {
  english: {
    sidebarTitle: "Start Your AI-Guided Literacy Journey",
    sidebarSubtitle: "Personalized. Interactive. Intelligent. Learning made simple, for everyone.",
    feat1_title: "AI-Powered Learning",
    feat1_desc: "Get smart recommendations just for you",
    feat2_title: "Track Your Progress",
    feat2_desc: "See how you grow every day",
    feat3_title: "Learn Anytime, Anywhere",
    feat3_desc: "On any device, at your pace",
    feat4_title: "Safe & Secure",
    feat4_desc: "Your data is always protected",
    formTitle: "Create Your Learner Account",
    formSubtitle: "Join thousands of learners and build your bright future.",
    labelName: "Full Name",
    placeholderName: "e.g. Adarsh Kumar",
    labelUser: "Username",
    placeholderUser: "Unique ID e.g. adarsh12",
    labelEmail: "Email Address",
    placeholderEmail: "e.g. name@example.com",
    labelPhone: "Phone Number",
    placeholderPhone: "10-digit mobile number",
    labelPassword: "Password",
    placeholderPassword: "Create a strong password",
    labelAge: "Age",
    placeholderAge: "Your age",
    labelEducation: "Education Level",
    labelLanguage: "Preferred Language",
    privacyText: "We respect your privacy and will never share your information.",
    registerBtn: "Create Profile & Register",
    orSignWith: "or sign up with",
    googleSignup: "Sign up with Google",
    footerText: "Already have an account?",
    loginLink: "Log in",
  },
  hindi: {
    sidebarTitle: "अपनी एआई-निर्देशित साक्षरता यात्रा शुरू करें",
    sidebarSubtitle: "व्यक्तिगत। संवादात्मक। बुद्धिमान। सभी के लिए सीखना हुआ सरल।",
    feat1_title: "एआई-संचालित शिक्षण",
    feat1_desc: "विशेष रूप से आपके लिए स्मार्ट सुझाव पाएं",
    feat2_title: "अपनी प्रगति को ट्रैक करें",
    feat2_desc: "देखें कि आप हर दिन कैसे बढ़ते हैं",
    feat3_title: "कभी भी, कहीं भी सीखें",
    feat3_desc: "किसी भी डिवाइस पर, अपनी गति से",
    feat4_title: "सुरक्षित और संरक्षित",
    feat4_desc: "आपका डेटा हमेशा सुरक्षित रहता है",
    formTitle: "अपना शिक्षार्थी खाता बनाएं",
    formSubtitle: "हजारों शिक्षार्थियों से जुड़ें और अपना उज्ज्वल भविष्य बनाएं।",
    labelName: "पूरा नाम",
    placeholderName: "उदा. आदर्श कुमार",
    labelUser: "उपयोगकर्ता नाम",
    placeholderUser: "अद्वितीय आईडी उदा. adarsh12",
    labelEmail: "ईमेल पता",
    placeholderEmail: "उदा. name@example.com",
    labelPhone: "फ़ोन नंबर",
    placeholderPhone: "10-अंकीय मोबाइल नंबर",
    labelPassword: "पासवर्ड",
    placeholderPassword: "एक मजबूत पासवर्ड बनाएं",
    labelAge: "उम्र",
    placeholderAge: "आपकी उम्र",
    labelEducation: "शिक्षा का स्तर",
    labelLanguage: "पसंदीदा भाषा",
    privacyText: "हम आपकी गोपनीयता का सम्मान करते हैं और आपकी जानकारी कभी साझा नहीं करेंगे।",
    registerBtn: "प्रोफ़ाइल बनाएं और पंजीकरण करें",
    orSignWith: "या इसके साथ साइन अप करें",
    googleSignup: "गूगल के साथ साइन अप करें",
    footerText: "क्या आपके पास पहले से एक खाता है?",
    loginLink: "लॉग इन करें",
  }
};

export default function Register() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
        localStorage.setItem('username', finalUsername);
        localStorage.setItem('user', JSON.stringify({ username: finalUsername, first_name: name }));
        navigate('/profile-setup');
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try another username.');
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
        navigate('/profile-setup');
      }
    } catch (err: any) {
      setError(err.message || 'Google login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const t = registerTranslations[prefLanguage] || registerTranslations.english;

  return (
    <div style={{
      minHeight: '100vh',
      background: '#1A0A4E',
      backgroundImage: `
        radial-gradient(circle at 10% 20%, rgba(108,76,255,0.4) 0%, transparent 40%),
        radial-gradient(circle at 90% 80%, rgba(255,79,163,0.3) 0%, transparent 40%),
        radial-gradient(circle at 50% 50%, rgba(77,157,255,0.2) 0%, transparent 60%)
      `,
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

      <div style={{ maxWidth: '1000px', width: '100%', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>

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
            <span>Back to Home</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '20px' }}>📚</span>
            <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '16px', color: '#1e1040' }}>
              NeoLit Registration
            </span>
          </div>

          <div style={{ width: '40px' }} />
        </nav>

        {/* 2-Column Card Container */}
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '28px',
          border: '2px solid rgba(255,255,255,0.6)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          display: 'grid', gridTemplateColumns: '1fr 1.2fr',
          overflow: 'hidden',
        }}>

          {/* Left Panel: AI Features */}
          <div style={{
            background: 'linear-gradient(135deg, #F0F4FF 0%, #EDE7F6 100%)',
            padding: '32px',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '24px',
            borderRight: '1.5px solid #E8EFFF',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '16px',
                background: 'linear-gradient(135deg, #6C4CFF, #8A5CFF)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '24px', boxShadow: '0 8px 20px rgba(108,76,255,0.3)',
              }}>
                📚
              </div>

              <div>
                <h2 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '22px', color: '#1e1040', margin: '0 0 6px', lineHeight: 1.2 }}>
                  {t.sidebarTitle}
                </h2>
                <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '12px', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
                  {t.sidebarSubtitle}
                </p>
              </div>

              {/* Bullet Features */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '8px' }}>
                {[
                  { icon: '🎓', title: t.feat1_title, desc: t.feat1_desc },
                  { icon: '✅', title: t.feat2_title, desc: t.feat2_desc },
                  { icon: '💖', title: t.feat3_title, desc: t.feat3_desc },
                  { icon: '🛡️', title: t.feat4_title, desc: t.feat4_desc },
                ].map((feat, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '12px', background: 'white',
                      border: '1px solid #E8EFFF', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '16px', flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    }}>
                      {feat.icon}
                    </div>
                    <div>
                      <h4 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px', color: '#1e1040', margin: 0 }}>{feat.title}</h4>
                      <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '11px', color: '#64748B', margin: 0 }}>{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Robot Mascot Footer */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'white', padding: '12px 16px', borderRadius: '18px', border: '1px solid #E8EFFF' }}>
              <RobotMascot size={40} />
              <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '11px', color: '#6C4CFF' }}>
                Join 10,000+ kids learning with AI today! 🌟
              </div>
            </div>
          </div>

          {/* Right Panel: Form */}
          <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '22px', color: '#1e1040', margin: '0 0 4px' }}>
                {t.formTitle}
              </h2>
              <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '12px', color: '#64748B', margin: 0 }}>
                {t.formSubtitle}
              </p>
            </div>

            {error && (
              <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#991B1B', borderRadius: '12px', padding: '10px 14px', fontFamily: 'Nunito', fontWeight: 700, fontSize: '12px' }}>
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                    {t.labelName}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder={t.placeholderName}
                    style={{
                      width: '100%', padding: '10px 12px', borderRadius: '12px',
                      border: '1.5px solid #E8EFFF', background: '#F8FAFF',
                      fontFamily: 'Nunito', fontWeight: 700, fontSize: '12px', color: '#1e1040', outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                    {t.labelUser}
                  </label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder={t.placeholderUser}
                    style={{
                      width: '100%', padding: '10px 12px', borderRadius: '12px',
                      border: '1.5px solid #E8EFFF', background: '#F8FAFF',
                      fontFamily: 'Nunito', fontWeight: 700, fontSize: '12px', color: '#1e1040', outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                    {t.labelEmail}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={t.placeholderEmail}
                    style={{
                      width: '100%', padding: '10px 12px', borderRadius: '12px',
                      border: '1.5px solid #E8EFFF', background: '#F8FAFF',
                      fontFamily: 'Nunito', fontWeight: 700, fontSize: '12px', color: '#1e1040', outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                    {t.labelPhone}
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder={t.placeholderPhone}
                    style={{
                      width: '100%', padding: '10px 12px', borderRadius: '12px',
                      border: '1.5px solid #E8EFFF', background: '#F8FAFF',
                      fontFamily: 'Nunito', fontWeight: 700, fontSize: '12px', color: '#1e1040', outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                    {t.labelPassword}
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder={t.placeholderPassword}
                    style={{
                      width: '100%', padding: '10px 12px', borderRadius: '12px',
                      border: '1.5px solid #E8EFFF', background: '#F8FAFF',
                      fontFamily: 'Nunito', fontWeight: 700, fontSize: '12px', color: '#1e1040', outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                    {t.labelAge}
                  </label>
                  <input
                    type="number"
                    value={age}
                    onChange={e => setAge(e.target.value)}
                    placeholder={t.placeholderAge}
                    style={{
                      width: '100%', padding: '10px 12px', borderRadius: '12px',
                      border: '1.5px solid #E8EFFF', background: '#F8FAFF',
                      fontFamily: 'Nunito', fontWeight: 700, fontSize: '12px', color: '#1e1040', outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                    {t.labelEducation}
                  </label>
                  <select
                    value={education}
                    onChange={e => setEducation(e.target.value)}
                    style={{
                      width: '100%', padding: '10px 12px', borderRadius: '12px',
                      border: '1.5px solid #E8EFFF', background: '#F8FAFF',
                      fontFamily: 'Nunito', fontWeight: 700, fontSize: '12px', color: '#1e1040', outline: 'none',
                    }}
                  >
                    <option value="Primary School">Primary School</option>
                    <option value="Secondary School">Secondary School</option>
                    <option value="Self-Taught">Self-Taught</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                    {t.labelLanguage}
                  </label>
                  <select
                    value={prefLanguage}
                    onChange={e => setPrefLanguage(e.target.value as SupportedLanguage)}
                    style={{
                      width: '100%', padding: '10px 12px', borderRadius: '12px',
                      border: '1.5px solid #E8EFFF', background: '#F8FAFF',
                      fontFamily: 'Nunito', fontWeight: 700, fontSize: '12px', color: '#1e1040', outline: 'none',
                    }}
                  >
                    <option value="english">English</option>
                    <option value="hindi">Hindi</option>
                    <option value="telugu">Telugu</option>
                    <option value="tamil">Tamil</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-3d"
                style={{
                  background: 'linear-gradient(135deg, #6C4CFF, #8A5CFF)',
                  color: 'white', fontFamily: 'Poppins', fontWeight: 900, fontSize: '14px',
                  padding: '12px', borderRadius: '14px', border: 'none',
                  borderBottom: '3.5px solid #4D2FCC', cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 6px 18px rgba(108,76,255,0.4)', marginTop: '6px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                }}
              >
                <Sparkles className="w-4 h-4" />
                <span>{loading ? 'Creating Account...' : t.registerBtn}</span>
              </button>
            </form>

            {/* Google Login */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError('Google sign up failed')}
              />
              
              <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '12px', color: '#64748B' }}>
                {t.footerText} <Link to="/login" style={{ color: '#6C4CFF', fontWeight: 900, textDecoration: 'none' }}>{t.loginLink}</Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
