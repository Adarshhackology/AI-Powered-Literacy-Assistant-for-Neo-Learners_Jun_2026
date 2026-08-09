import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Trophy, ArrowRight, BarChart2, RotateCcw, BookOpen, Edit3, Brain } from 'lucide-react';
import { Sparkle, AIRobotMascot } from '../components/UI/Illustrations';

export default function AIScoreResults() {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const [scores, setScores] = useState({ reading: 55, writing: 80, comprehension: 45 });

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/learn-ai/session/${sessionId}/`);
        if (response.ok) {
          const data = await response.json();
          if (data.scores) setScores(data.scores);
        } else {
          const local = localStorage.getItem(`assessment_result_${sessionId}`);
          if (local) setScores(JSON.parse(local));
        }
      } catch (e) {
        const local = localStorage.getItem(`assessment_result_${sessionId}`);
        if (local) setScores(JSON.parse(local));
      }
    };
    fetchScores();
  }, [sessionId]);

  const overall = Math.round((scores.reading + scores.writing + scores.comprehension) / 3);

  return (
    <div className="neolit-fluid-bg" style={{
      minHeight: '100vh',
      fontFamily: 'Nunito, sans-serif',
      padding: '24px 20px',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      position: 'relative',
    }}>

      {/* Decorative background stars */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {[
          { t: '5%', l: '8%', s: 14 }, { t: '12%', l: '92%', s: 18 },
          { t: '50%', l: '3%', s: 16 }, { t: '75%', l: '95%', s: 14 },
        ].map((st, i) => (
          <div key={i} className="animate-twinkle" style={{ position: 'absolute', top: st.t, left: st.l, opacity: 0.7 }}>
            <Sparkle size={st.s} color={i % 2 === 0 ? '#FFD54A' : '#C4B5F4'} />
          </div>
        ))}
      </div>

      <div style={{ maxWidth: '1000px', width: '100%', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* Top Celebration Header */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div className="animate-bobble" style={{
            width: '64px', height: '64px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #FFFDF0, #FFF9C4)',
            border: '3px solid #FFD54A', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '32px', boxShadow: '0 8px 24px rgba(255,213,74,0.4)',
          }}>
            🏆
          </div>

          <h1 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '42px', color: '#1E1040', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            Awesome Job! 🎉
          </h1>
          <p style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: '16px', color: '#64748B', margin: 0 }}>
            Here are your magical AI results
          </p>
        </div>

        {/* ── MAIN SCORE CARD CONTAINER WITH MASCOTS ── */}
        <div style={{
          position: 'relative',
          background: 'white',
          borderRadius: '36px',
          padding: '36px 40px 30px',
          border: '4px solid #6C4CFF',
          boxShadow: '0 24px 72px rgba(108,76,255,0.35)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px',
        }}>

          {/* Left Robot Mascot Thumbs-Up */}
          <div style={{ position: 'absolute', top: '-40px', left: '-50px', zIndex: 20 }} className="animate-bobble">
            <AIRobotMascot size={110} />
          </div>

          {/* Right Cheering Boy & Golden Shield Badge */}
          <div style={{ position: 'absolute', top: '-30px', right: '-40px', zIndex: 20, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ fontSize: '72px' }}>👦</div>
            <div style={{
              background: 'linear-gradient(135deg, #FFD54A, #FF9F43)',
              borderRadius: '20px', padding: '10px 14px', textAlign: 'center',
              border: '2px solid white', boxShadow: '0 8px 20px rgba(255,159,67,0.4)',
              color: '#1e1040',
            }}>
              <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '10px', textTransform: 'uppercase' }}>You're Doing Great!</div>
              <div style={{ fontSize: '14px' }}>⭐⭐⭐</div>
            </div>
          </div>

          {/* Overall Level Ribbon Banner */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '1px' }}>
              OVERALL LEVEL
            </span>
            <div style={{
              background: 'linear-gradient(135deg, #FFFDF0, #FFF3E0)',
              border: '2.5px solid #FFD54A', borderRadius: '99px',
              padding: '6px 28px', fontFamily: 'Poppins', fontWeight: 900, fontSize: '24px', color: '#FF9F43',
              boxShadow: '0 6px 18px rgba(255,213,74,0.3)',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <span>Intermediate</span>
              <span>⭐</span>
            </div>

            {/* Overall Score Numbers */}
            <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '56px', color: '#1e1040', lineHeight: 1, marginTop: '8px' }}>
              {overall}<span style={{ fontSize: '26px', color: '#94A3B8' }}> /100</span>
            </div>
          </div>

          {/* 3 Metric Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px', width: '100%' }}>
            
            {/* Reading Card */}
            <div style={{
              background: '#FFF5F5', border: '2px solid #FFE4E6',
              borderRadius: '24px', padding: '18px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
              textAlign: 'center',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <BookOpen className="w-5 h-5 text-rose-500" />
                <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '16px', color: '#1e1040' }}>Reading</span>
              </div>

              {/* Progress Donut */}
              <div style={{ position: 'relative', width: '76px', height: '76px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="38" cy="38" r="32" stroke="#FFE4E6" strokeWidth="8" fill="none" />
                  <circle cx="38" cy="38" r="32" stroke="#F97316" strokeWidth="8" strokeDasharray="201" strokeDashoffset={201 - (201 * scores.reading) / 100} strokeLinecap="round" fill="none" />
                </svg>
                <span style={{ position: 'absolute', fontFamily: 'Poppins', fontWeight: 900, fontSize: '20px', color: '#1e1040' }}>{scores.reading}</span>
              </div>

              <div style={{ background: '#FFF0F0', border: '1px solid #FECDD3', borderRadius: '12px', padding: '8px 12px', fontFamily: 'Nunito', fontWeight: 800, fontSize: '10px', color: '#9F1239' }}>
                💡 Keep practicing! You'll improve even more!
              </div>
            </div>

            {/* Writing Card */}
            <div style={{
              background: '#F0FDF4', border: '2px solid #DCFCE7',
              borderRadius: '24px', padding: '18px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
              textAlign: 'center',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Edit3 className="w-5 h-5 text-emerald-500" />
                <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '16px', color: '#1e1040' }}>Writing</span>
              </div>

              {/* Progress Donut */}
              <div style={{ position: 'relative', width: '76px', height: '76px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="38" cy="38" r="32" stroke="#DCFCE7" strokeWidth="8" fill="none" />
                  <circle cx="38" cy="38" r="32" stroke="#10B981" strokeWidth="8" strokeDasharray="201" strokeDashoffset={201 - (201 * scores.writing) / 100} strokeLinecap="round" fill="none" />
                </svg>
                <span style={{ position: 'absolute', fontFamily: 'Poppins', fontWeight: 900, fontSize: '20px', color: '#1e1040' }}>{scores.writing}</span>
              </div>

              <div style={{ background: '#E6F4EA', border: '1px solid #A7F3D0', borderRadius: '12px', padding: '8px 12px', fontFamily: 'Nunito', fontWeight: 800, fontSize: '10px', color: '#065F46' }}>
                🎯 Excellent work! You're doing amazing!
              </div>
            </div>

            {/* Comprehension Card */}
            <div style={{
              background: '#F0F9FF', border: '2px solid #E0F2FE',
              borderRadius: '24px', padding: '18px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
              textAlign: 'center',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Brain className="w-5 h-5 text-sky-500" />
                <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '16px', color: '#1e1040' }}>Comprehension</span>
              </div>

              {/* Progress Donut */}
              <div style={{ position: 'relative', width: '76px', height: '76px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="38" cy="38" r="32" stroke="#E0F2FE" strokeWidth="8" fill="none" />
                  <circle cx="38" cy="38" r="32" stroke="#F97316" strokeWidth="8" strokeDasharray="201" strokeDashoffset={201 - (201 * scores.comprehension) / 100} strokeLinecap="round" fill="none" />
                </svg>
                <span style={{ position: 'absolute', fontFamily: 'Poppins', fontWeight: 900, fontSize: '20px', color: '#1e1040' }}>{scores.comprehension}</span>
              </div>

              <div style={{ background: '#E0F2FE', border: '1px solid #BAE6FD', borderRadius: '12px', padding: '8px 12px', fontFamily: 'Nunito', fontWeight: 800, fontSize: '10px', color: '#0369A1' }}>
                ✨ Keep it up! Practice brings progress!
              </div>
            </div>

          </div>

          {/* BOTTOM ACTION BUTTONS BAR */}
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center', justifyContent: 'center', width: '100%', paddingTop: '10px' }}>
            <button
              onClick={() => navigate('/reports')}
              className="btn-3d"
              style={{
                background: 'white', border: '1.5px solid #E8EFFF', color: '#1e1040',
                fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px',
                padding: '12px 20px', borderRadius: '99px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '6px',
                boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
              }}
            >
              <BarChart2 className="w-4 h-4 text-indigo-600" />
              <span>Detailed Report</span>
            </button>

            <button
              onClick={() => navigate(`/learn-with-ai/weak-areas/${sessionId}`)}
              className="btn-3d"
              style={{
                background: 'linear-gradient(135deg, #6C4CFF 0%, #8A5CFF 100%)',
                color: 'white', fontFamily: 'Poppins', fontWeight: 900, fontSize: '15px',
                padding: '14px 32px', borderRadius: '99px', border: 'none',
                borderBottom: '4px solid #4D2FCC', cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(108,76,255,0.4)',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}
            >
              <span>🎯 View My Weak Areas</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => navigate(`/learn-with-ai/assessment/${sessionId}`)}
              className="btn-3d"
              style={{
                background: 'white', border: '1.5px solid #E8EFFF', color: '#1e1040',
                fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px',
                padding: '12px 20px', borderRadius: '99px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '6px',
                boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
              }}
            >
              <RotateCcw className="w-4 h-4 text-slate-500" />
              <span>Try Again</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
