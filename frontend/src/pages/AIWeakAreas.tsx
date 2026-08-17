import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Zap, ArrowRight } from 'lucide-react';
import { Sparkle, AIRobotMascot } from '../components/UI/Illustrations';

interface SkillResult {
  name: string;
  score: number;
  icon: string;
  cardBg: string;
  cardBorder: string;
  barColor: string;
  iconBg: string;
}

export default function AIWeakAreas() {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const [skills, setSkills] = useState<SkillResult[]>([]);

  useEffect(() => {
    const local = localStorage.getItem(`assessment_result_${sessionId}`);
    let rScore = 55;
    let wScore = 80;
    let cScore = 45;

    if (local) {
      const data = JSON.parse(local);
      rScore = data.reading || 55;
      wScore = data.writing || 80;
      cScore = data.comprehension || 45;
    }

    setSkills([
      { 
        name: 'Reading', score: rScore, icon: '📖', 
        cardBg: '#FFF5F5', cardBorder: '#FFE4E6', barColor: '#EF4444', iconBg: '#FEE2E2' 
      },
      { 
        name: 'Writing', score: wScore, icon: '✏️', 
        cardBg: '#FFFBEB', cardBorder: '#FEF3C7', barColor: '#F97316', iconBg: '#FEF3C7' 
      },
      { 
        name: 'Comprehension', score: cScore, icon: '🧠', 
        cardBg: '#F0F9FF', cardBorder: '#E0F2FE', barColor: '#3B82F6', iconBg: '#DBEAFE' 
      }
    ]);
  }, [sessionId]);

  const weakCount = skills.filter(s => s.score < 99).length;

  return (
    <div className="neolit-fluid-bg" style={{
      minHeight: '100vh',
      fontFamily: 'Nunito, sans-serif',
      padding: '16px 20px',
      display: 'flex', flexDirection: 'column', gap: '16px',
      position: 'relative',
    }}>

      {/* Decorative stars */}
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

      {/* ── TOP GLASS NAVBAR ── */}
      <nav style={{
        height: '56px',
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        padding: '0 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
        border: '1.5px solid rgba(255,255,255,0.6)',
        position: 'relative', zIndex: 10,
      }}>
        <button
          onClick={() => navigate(`/learn-with-ai/scores/${sessionId}`)}
          className="btn-3d"
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            color: '#1e1040', textDecoration: 'none',
            fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px',
            background: '#F0F4FF', padding: '6px 14px', borderRadius: '12px',
            border: '1px solid #E8EFFF', cursor: 'pointer',
          }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        {/* Right Counters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: '#FFFDF0', border: '1px solid #FFD54A', padding: '4px 12px', borderRadius: '99px', fontFamily: 'Poppins', fontWeight: 900, fontSize: '12px', color: '#1e1040' }}>
            🪙 120
          </div>
          <div style={{ background: '#FDF2F8', border: '1px solid #F472B6', padding: '4px 12px', borderRadius: '99px', fontFamily: 'Poppins', fontWeight: 900, fontSize: '12px', color: '#DB2777' }}>
            💎 7
          </div>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#FFD54A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', border: '2px solid white' }}>
            👦
          </div>
        </div>
      </nav>

      {/* ── MAIN WORKSPACE CONTAINER ── */}
      <div style={{
        maxWidth: '1100px', width: '100%', margin: '0 auto',
        position: 'relative', zIndex: 10,
        display: 'flex', flexDirection: 'column', gap: '20px',
      }}>

        {/* Header Title Area */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <h1 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '38px', color: '#1E1040', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            Let's Find <span style={{ color: '#6C4CFF' }}>Where You Need</span> Practice! 🔍
          </h1>

          <div style={{
            background: 'rgba(255,255,255,0.95)',
            border: '1.5px solid rgba(255,255,255,0.6)',
            borderRadius: '99px', padding: '8px 24px',
            fontFamily: 'Nunito', fontWeight: 800, fontSize: '13px', color: '#475569',
            boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
          }}>
            Any score below 99% gets a custom AI practice module to help you reach perfection! 💪
          </div>
        </div>

        {/* ── SKILLS & MASCOT GRID CONTAINER ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: '20px', alignItems: 'center' }}>
          
          {/* 3 Skill Cards Stack */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="hover-lift"
                style={{
                  background: skill.cardBg,
                  border: `2.5px solid ${skill.cardBorder}`,
                  borderRadius: '28px',
                  padding: '20px 24px',
                  display: 'flex', alignItems: 'center', gap: '18px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
                }}
              >
                {/* 3D Icon */}
                <div style={{
                  width: '60px', height: '60px', borderRadius: '20px',
                  background: skill.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '32px', boxShadow: '0 4px 14px rgba(0,0,0,0.06)', flexShrink: 0,
                }}>
                  {skill.icon}
                </div>

                {/* Progress Content */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <h3 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '20px', color: '#1e1040', margin: 0 }}>
                    {skill.name}
                  </h3>
                  
                  {/* Score Bar */}
                  <div style={{ width: '100%', height: '14px', background: 'white', borderRadius: '99px', border: '1.5px solid #E2E8F0', overflow: 'hidden' }}>
                    <div style={{ width: `${skill.score}%`, height: '100%', background: skill.barColor, borderRadius: '99px' }} />
                  </div>

                  <span style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '11px', color: '#64748B' }}>
                    Score: <strong style={{ color: skill.barColor }}>{skill.score}</strong>/100
                  </span>
                </div>

                {/* Needs Practice Badge */}
                <div style={{
                  background: skill.iconBg, border: `1.5px solid ${skill.cardBorder}`,
                  borderRadius: '16px', padding: '8px 14px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px',
                  color: skill.barColor, textTransform: 'uppercase',
                }}>
                  <Zap className="w-5 h-5 fill-current" />
                  <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '10px', lineHeight: 1.2, textAlign: 'center' }}>
                    Needs<br />Practice
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right AI Mascot & Stacked Books Graphics */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
            <div className="animate-bobble">
              <AIRobotMascot size={130} />
            </div>

            {/* Stack of Books with Smiling Star */}
            <div style={{
              background: 'linear-gradient(135deg, #8A5CFF, #6C4CFF)',
              borderRadius: '24px', padding: '16px', textAlign: 'center',
              border: '2px solid rgba(255,255,255,0.4)',
              boxShadow: '0 12px 32px rgba(108,76,255,0.4)', color: 'white',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
            }}>
              <div style={{ fontSize: '36px' }}>📚⭐</div>
              <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '12px' }}>Personalized AI Plan</div>
            </div>
          </div>

        </div>

        {/* ── BOTTOM PURPLE BANNER CARD ── */}
        <div style={{
          borderRadius: '28px',
          background: 'linear-gradient(135deg, #6C4CFF 0%, #8A5CFF 50%, #FF4FA3 100%)',
          padding: '20px 28px',
          color: 'white',
          border: '2px solid rgba(255,255,255,0.3)',
          boxShadow: '0 16px 48px rgba(108,76,255,0.35)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontSize: '38px' }} className="animate-bobble">🚀</span>
            <div>
              <h3 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '20px', margin: '0 0 2px' }}>
                AI detected {weakCount} weak areas.
              </h3>
              <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '13px', color: 'rgba(255,255,255,0.9)', margin: 0 }}>
                Let's turn those weaknesses into super strengths! 👨‍👩‍👧
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate(`/learn-with-ai/plan/${sessionId}`)}
            className="btn-3d"
            style={{
              background: 'linear-gradient(135deg, #FFD54A, #FF9F43)',
              color: '#1e1040', fontFamily: 'Poppins', fontWeight: 900, fontSize: '15px',
              padding: '12px 28px', borderRadius: '99px', border: 'none',
              borderBottom: '3.5px solid #E8A000', cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(255,213,74,0.4)',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}
          >
            <span>Start My Learning Plan</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>

    </div>
  );
}
