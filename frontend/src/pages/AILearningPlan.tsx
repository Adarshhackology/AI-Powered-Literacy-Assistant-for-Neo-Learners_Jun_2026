import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Loader2, CheckCircle2, Lock, Home, BookOpen, Edit3, BarChart2, Gift, User } from 'lucide-react';
import { apiClient } from '../utils/api';
import { Sparkle, AIRobotMascot } from '../components/UI/Illustrations';

interface ModuleData {
  id: string | number;
  skill: string;
  status: string;
  questions?: any[];
  score?: number;
}

export default function AILearningPlan() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [modules, setModules] = useState<ModuleData[]>([]);
  const [weakSkills, setWeakSkills] = useState<string[]>([]);

  useEffect(() => {
    const fetchAndGeneratePlan = async () => {
      try {
        setLoading(true);
        
        let loadedModules: ModuleData[] = [];
        let loadedWeak: string[] = [];

        const savedPlanStr = localStorage.getItem(`plan_${sessionId}`);
        if (savedPlanStr) {
          try {
            const savedPlan = JSON.parse(savedPlanStr);
            if (savedPlan.modules && savedPlan.modules.length > 0) {
              loadedModules = savedPlan.modules;
              loadedWeak = savedPlan.weak_skills || loadedModules.map(m => m.skill);
            }
          } catch (e) {
            console.error(e);
          }
        }

        if (loadedModules.length === 0) {
          const data = await apiClient.generateAIModules(Number(sessionId));
          if (data && data.modules && data.modules.length > 0) {
            loadedModules = data.modules;
            loadedWeak = data.weak_areas || loadedModules.map(m => m.skill);
          }
        }

        if (loadedModules.length === 0) {
          loadedModules = [
            { id: '1', skill: 'reading', status: 'pending', questions: [1,2,3,4,5,6] },
            { id: '2', skill: 'writing', status: 'pending', questions: [1,2,3,4,5,6] },
            { id: '3', skill: 'comprehension', status: 'skipped', questions: [], score: 100 }
          ];
          loadedWeak = ['reading', 'writing'];
        }

        setModules(loadedModules);
        setWeakSkills(loadedWeak);
        localStorage.setItem(`plan_${sessionId}`, JSON.stringify({ modules: loadedModules, weak_skills: loadedWeak }));
      } catch (err: any) {
        const fallback = [
          { id: '1', skill: 'reading', status: 'pending', questions: [1,2,3,4,5,6] },
          { id: '2', skill: 'writing', status: 'pending', questions: [1,2,3,4,5,6] },
          { id: '3', skill: 'comprehension', status: 'skipped', questions: [] }
        ];
        setModules(fallback);
        setWeakSkills(['reading', 'writing']);
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) {
      fetchAndGeneratePlan();
    }
  }, [sessionId]);

  const allSkills = [
    { type: 'reading', label: 'Reading', emoji: '📖' },
    { type: 'writing', label: 'Writing', emoji: '✏️' },
    { type: 'comprehension', label: 'Comprehension', emoji: '🧠' }
  ];

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#1A0A4E', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: 'Poppins', fontWeight: 900 }}>
        <Loader2 className="w-14 h-14 text-purple-400 animate-spin mb-4" />
        <div>Generating your personalized AI plan... ✨</div>
      </div>
    );
  }

  const assignedModules = modules.filter(m => (m.questions && m.questions.length > 0) || weakSkills.includes(m.skill) || m.status === 'pending' || m.status === 'completed');
  const completedCount = modules.filter(m => m.status === 'completed' && ((m.questions && m.questions.length > 0) || weakSkills.includes(m.skill))).length;
  const firstIncomplete = assignedModules.find(m => m.status !== 'completed');

  return (
    <div style={{
      minHeight: '100vh',
      background: '#1A0A4E',
      backgroundImage: `
        radial-gradient(circle at 10% 20%, rgba(108,76,255,0.45) 0%, transparent 40%),
        radial-gradient(circle at 90% 80%, rgba(255,79,163,0.35) 0%, transparent 40%),
        radial-gradient(circle at 50% 50%, rgba(77,157,255,0.2) 0%, transparent 60%)
      `,
      fontFamily: 'Nunito, sans-serif',
      padding: '16px 20px 80px',
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
          onClick={() => navigate(`/learn-with-ai/weak-areas/${sessionId}`)}
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
        maxWidth: '1140px', width: '100%', margin: '0 auto',
        position: 'relative', zIndex: 10,
        display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center',
      }}>

        {/* Title & Progress Bar */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
          <h1 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '38px', color: 'white', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            Your AI Learning Plan 📊
          </h1>
          <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: '14px', color: 'rgba(255,255,255,0.85)' }}>
            Progress: <strong style={{ color: '#FFD54A' }}>{completedCount}</strong> of <strong style={{ color: '#FFD54A' }}>{assignedModules.length}</strong> modules completed
          </div>
        </div>

        {/* Hot Air Balloon (Top Left Decor) */}
        <div style={{ position: 'absolute', top: '10px', left: '-40px', fontSize: '42px' }} className="animate-bobble">
          🎈
        </div>

        {/* Fairy-tale Castle (Top Right Decor) */}
        <div style={{ position: 'absolute', top: '10px', right: '-40px', fontSize: '46px' }} className="animate-bobble">
          🏰
        </div>

        {/* ── 3 MODULE CARDS GRID ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', width: '100%' }}>
          {allSkills.map((skill) => {
            const moduleData = modules.find(m => m.skill === skill.type);
            const isCompleted = moduleData?.status === 'completed';
            const isAssigned = moduleData ? (moduleData.status !== 'skipped' && (moduleData.status === 'pending' || moduleData.status === 'completed' || (moduleData.questions && moduleData.questions.length > 0))) : weakSkills.includes(skill.type);

            return (
              <div
                key={skill.type}
                className="hover-lift"
                style={{
                  background: 'white',
                  borderRadius: '28px',
                  padding: '24px 20px',
                  border: isAssigned ? '3px solid #6C4CFF' : '2px solid #E2E8F0',
                  boxShadow: isAssigned ? '0 12px 32px rgba(108,76,255,0.25)' : '0 6px 18px rgba(0,0,0,0.04)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px',
                  position: 'relative',
                  opacity: isAssigned ? 1 : 0.75,
                }}
              >
                {/* Badge Pill */}
                <div style={{ position: 'absolute', top: '14px', right: '14px' }}>
                  {isCompleted ? (
                    <span style={{
                      background: '#DCFCE7', color: '#166534', border: '1px solid #86EFAC',
                      borderRadius: '99px', padding: '4px 12px', fontFamily: 'Poppins', fontWeight: 900, fontSize: '10px',
                      display: 'flex', alignItems: 'center', gap: '4px',
                    }}>
                      ✓ Completed
                    </span>
                  ) : isAssigned ? (
                    <span style={{
                      background: '#EDE7F6', color: '#6C4CFF', border: '1px solid #C4B5F4',
                      borderRadius: '99px', padding: '4px 12px', fontFamily: 'Poppins', fontWeight: 900, fontSize: '10px',
                      display: 'flex', alignItems: 'center', gap: '4px',
                    }}>
                      ✓ Assigned
                    </span>
                  ) : (
                    <span style={{
                      background: '#F1F5F9', color: '#64748B', border: '1px solid #CBD5E1',
                      borderRadius: '99px', padding: '4px 12px', fontFamily: 'Poppins', fontWeight: 900, fontSize: '10px',
                      display: 'flex', alignItems: 'center', gap: '4px',
                    }}>
                      <Lock className="w-3 h-3" /> Skipped
                    </span>
                  )}
                </div>

                {/* 3D Icon Container */}
                <div className="animate-bobble" style={{
                  width: '80px', height: '80px', borderRadius: '22px',
                  background: isAssigned ? 'linear-gradient(135deg, #F3E8FF, #EDE7F6)' : '#F8FAFF',
                  border: isAssigned ? '2.5px solid #C4B5F4' : '1.5px solid #E2E8F0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '42px', boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
                  marginTop: '10px',
                }}>
                  {skill.emoji}
                </div>

                {/* Skill Title */}
                <h3 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '22px', color: '#1e1040', margin: 0 }}>
                  {skill.label}
                </h3>

                {/* Details or Skipped Note */}
                {isAssigned ? (
                  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '6px', paddingTop: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 12px', background: '#F8FAFF', borderRadius: '12px', border: '1px solid #E8EFFF', fontFamily: 'Nunito', fontWeight: 800, fontSize: '12px', color: '#475569' }}>
                      <span>❓ Questions:</span>
                      <strong style={{ color: '#6C4CFF' }}>6</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 12px', background: '#F8FAFF', borderRadius: '12px', border: '1px solid #E8EFFF', fontFamily: 'Nunito', fontWeight: 800, fontSize: '12px', color: '#475569' }}>
                      <span>⏱️ Time:</span>
                      <strong style={{ color: '#6C4CFF' }}>~10 min</strong>
                    </div>
                  </div>
                ) : (
                  <div style={{ padding: '12px', background: '#F8FAFF', borderRadius: '14px', border: '1px solid #E2E8F0', fontFamily: 'Nunito', fontWeight: 800, fontSize: '11px', color: '#64748B', textAlign: 'center', marginTop: 'auto' }}>
                    You're already great at this! ✨
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── ACTION BUTTON (CENTER) ── */}
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          {firstIncomplete ? (
            <button
              onClick={() => navigate(`/learn-with-ai/practice/${sessionId}/${firstIncomplete.id}`)}
              className="btn-3d"
              style={{
                background: 'linear-gradient(135deg, #6C4CFF 0%, #8A5CFF 100%)',
                color: 'white', fontFamily: 'Poppins', fontWeight: 900, fontSize: '18px',
                padding: '16px 36px', borderRadius: '99px', border: 'none',
                borderBottom: '4.5px solid #4D2FCC', cursor: 'pointer',
                boxShadow: '0 12px 32px rgba(108,76,255,0.45)',
                display: 'flex', alignItems: 'center', gap: '12px',
              }}
            >
              <span style={{ fontSize: '22px' }}>🚀</span>
              <span>Begin Practice Module ({firstIncomplete.skill.toUpperCase()})</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          ) : (
            <button
              onClick={() => navigate(`/learn-with-ai/retest/${sessionId}`)}
              className="btn-3d"
              style={{
                background: 'linear-gradient(135deg, #10B981, #059669)',
                color: 'white', fontFamily: 'Poppins', fontWeight: 900, fontSize: '18px',
                padding: '16px 36px', borderRadius: '99px', border: 'none',
                borderBottom: '4.5px solid #047857', cursor: 'pointer',
                boxShadow: '0 12px 32px rgba(16,185,129,0.45)',
                display: 'flex', alignItems: 'center', gap: '12px',
              }}
            >
              <span style={{ fontSize: '22px' }}>🏆</span>
              <span>Take Final Retest</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* ── TIP OF THE DAY CARD (BOTTOM CENTER) ── */}
        <div style={{
          width: '100%', maxWidth: '780px',
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px', padding: '16px 24px',
          border: '1.5px solid rgba(255,255,255,0.8)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ fontSize: '32px' }} className="animate-bobble">⭐</div>
            <div>
              <h4 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '14px', color: '#6C4CFF', margin: '0 0 2px' }}>
                Tip of the Day
              </h4>
              <p style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: '12px', color: '#475569', margin: 0 }}>
                Practice a little every day and watch yourself shine! ✨
              </p>
            </div>
          </div>

          <div style={{ fontSize: '36px' }} className="animate-bobble">
            🏆🎉
          </div>
        </div>

      </div>

      {/* ── BOTTOM FLOATING NAVIGATION DOCK ── */}
      <div style={{
        position: 'fixed', bottom: '16px', left: '50%', transform: 'translateX(-50%)',
        background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)',
        borderRadius: '99px', padding: '8px 24px',
        display: 'flex', alignItems: 'center', gap: '20px',
        boxShadow: '0 12px 36px rgba(0,0,0,0.2)',
        border: '1.5px solid rgba(255,255,255,0.8)',
        zIndex: 100,
      }}>
        {[
          { label: 'Home', icon: Home, path: '/dashboard', active: false },
          { label: 'Learn', icon: BookOpen, path: `/learn-with-ai/plan/${sessionId}`, active: true },
          { label: 'Practice', icon: Edit3, path: '/games', active: false },
          { label: 'Progress', icon: BarChart2, path: '/reports', active: false },
          { label: 'Rewards', icon: Gift, path: '/rewards', active: false },
          { label: 'Profile', icon: User, path: '/profile', active: false },
        ].map((nav) => (
          <button
            key={nav.label}
            onClick={() => navigate(nav.path)}
            style={{
              background: nav.active ? '#6C4CFF' : 'transparent',
              color: nav.active ? 'white' : '#64748B',
              border: 'none', borderRadius: '99px', padding: '6px 14px',
              fontFamily: 'Poppins', fontWeight: 900, fontSize: '11px',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
              boxShadow: nav.active ? '0 4px 12px rgba(108,76,255,0.35)' : 'none',
              transition: 'all 0.15s ease',
            }}
          >
            <nav.icon className="w-3.5 h-3.5" />
            <span>{nav.label}</span>
          </button>
        ))}
      </div>

    </div>
  );
}
