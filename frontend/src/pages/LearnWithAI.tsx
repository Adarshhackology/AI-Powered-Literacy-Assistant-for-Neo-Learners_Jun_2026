import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, History, ChevronRight, Brain, AlertCircle, ArrowLeft } from 'lucide-react';
import { Sparkle, AIRobotMascot } from '../components/UI/Illustrations';

interface Session {
  id: string;
  language: string;
  date: string;
  status: string;
  overall_score: number;
}

export default function LearnWithAI() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const username = localStorage.getItem('username') || 'guest';
        const response = await fetch(`http://127.0.0.1:8000/api/learn-ai/history/${username}/`);
        if (!response.ok) throw new Error('Failed to fetch sessions');
        const data = await response.json();
        setSessions(data.sessions || []);
      } catch (err) {
        console.error(err);
        const local = localStorage.getItem('ai_sessions');
        if (local) {
          setSessions(JSON.parse(local));
        } else {
          setError('Could not load past sessions.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="neolit-fluid-bg" style={{
      minHeight: '100vh',
      padding: '20px',
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

      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Top Nav Bar */}
        <nav style={{
          height: '64px',
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '0 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          border: '1.5px solid rgba(255,255,255,0.6)',
        }}>
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-3d"
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              color: '#1e1040', textDecoration: 'none',
              fontFamily: 'Poppins', fontWeight: 900, fontSize: '14px',
              background: '#F0F4FF', padding: '8px 16px', borderRadius: '12px',
              border: '1px solid #E8EFFF', cursor: 'pointer',
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '22px' }}>🧠</span>
            <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '18px', color: '#1e1040' }}>
              Learn with AI
            </span>
          </div>
        </nav>

        {/* Hero AI Banner Card */}
        <div style={{
          borderRadius: '28px',
          background: 'linear-gradient(135deg, #6C4CFF 0%, #8A5CFF 50%, #FF4FA3 100%)',
          padding: '32px 36px',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(108,76,255,0.4)',
          border: '2px solid rgba(255,255,255,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ maxWidth: '580px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: '#FFD54A', color: '#1e1040',
              fontFamily: 'Poppins', fontWeight: 900, fontSize: '11px',
              padding: '4px 14px', borderRadius: '99px',
              boxShadow: '0 4px 12px rgba(255,213,74,0.4)',
              width: 'fit-content',
            }}>
              <Sparkles className="w-3.5 h-3.5" /> AI LEARNING HUB
            </div>

            <h1 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '32px', color: 'white', margin: 0, lineHeight: 1.2 }}>
              AI Learning Hub! ✨
            </h1>

            <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '15px', color: 'rgba(255,255,255,0.9)', margin: 0, lineHeight: 1.5 }}>
              Ready for a magical adventure? Let our smart AI friend help you learn new languages and get super smart!
            </p>

            <button 
              onClick={() => navigate('/learn-with-ai/language')}
              className="btn-3d"
              style={{
                background: '#FFD54A',
                color: '#1e1040',
                fontFamily: 'Poppins', fontWeight: 900, fontSize: '16px',
                padding: '14px 28px', borderRadius: '16px',
                border: 'none', borderBottom: '4px solid #E8A000',
                cursor: 'pointer', width: 'fit-content',
                boxShadow: '0 8px 24px rgba(255,213,74,0.5)',
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                marginTop: '8px',
              }}
            >
              <Sparkles className="w-5 h-5 animate-pulse" />
              <span>Start New Learning Session</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* AI Robot Mascot Graphic */}
          <div className="animate-bobble" style={{ flexShrink: 0, display: 'flex', justifyContent: 'center' }}>
            <AIRobotMascot size={150} />
          </div>
        </div>

        {/* Sessions History Section */}
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '24px 28px',
          border: '1.5px solid #E8EFFF',
          boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
          display: 'flex', flexDirection: 'column', gap: '16px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '2px solid #F1F5F9', paddingBottom: '12px' }}>
            <History className="w-6 h-6 text-indigo-600" />
            <h2 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '20px', color: '#1e1040', margin: 0 }}>
              Your Learning Journey 🗺️
            </h2>
          </div>

          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
              <Brain className="w-10 h-10 text-indigo-500 animate-spin" />
            </div>
          ) : error && sessions.length === 0 ? (
            <div style={{ background: '#FEF2F2', color: '#DC2626', padding: '16px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'Nunito', fontWeight: 700 }}>
              <AlertCircle className="w-5 h-5" /> {error}
            </div>
          ) : sessions.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', background: '#F8FAFF', borderRadius: '18px', border: '2px dashed #E2E8F0' }}>
              <span style={{ fontSize: '48px', display: 'block', marginBottom: '8px' }}>🌱</span>
              <h3 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '18px', color: '#94A3B8', margin: '0 0 4px' }}>No sessions yet!</h3>
              <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '13px', color: '#64748B', margin: 0 }}>Start your first AI learning adventure above!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {sessions.map((session) => (
                <div 
                  key={session.id}
                  onClick={() => navigate(session.status === 'completed' ? `/learn-with-ai/scores/${session.id}` : `/learn-with-ai/assessment/${session.id}`)}
                  className="hover-lift"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '16px 20px', background: '#F8FAFF', borderRadius: '16px',
                    border: '1.5px solid #E8EFFF', cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                      width: '48px', height: '48px', borderRadius: '50%',
                      background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    }}>
                      {session.language === 'English' ? '🇺🇸' : '🇮🇳'}
                    </div>
                    <div>
                      <h3 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '15px', color: '#1e1040', margin: '0 0 2px' }}>{session.language} Module</h3>
                      <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '11px', color: '#94A3B8', margin: 0 }}>{new Date(session.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '11px', color: '#94A3B8', margin: 0 }}>Score</p>
                      <p style={{
                        fontFamily: 'Poppins', fontWeight: 900, fontSize: '18px', margin: 0,
                        color: session.overall_score >= 75 ? '#22C55E' : session.overall_score >= 45 ? '#F59E0B' : '#EF4444',
                      }}>
                        {session.overall_score > 0 ? `${session.overall_score}%` : '--'}
                      </p>
                    </div>
                    <div style={{
                      padding: '8px 16px', borderRadius: '12px', fontFamily: 'Poppins', fontWeight: 800, fontSize: '12px',
                      background: session.status === 'completed' ? '#DCFCE7' : '#FEF3C7',
                      color: session.status === 'completed' ? '#15803D' : '#B45309',
                    }}>
                      {session.status === 'completed' ? 'Done ✅' : 'Resume 🔄'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
