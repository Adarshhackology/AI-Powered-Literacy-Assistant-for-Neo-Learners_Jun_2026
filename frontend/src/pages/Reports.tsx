import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Download, Sparkles, TrendingUp, BarChart2, Award, 
  ChevronRight, Calendar, Target, CheckCircle2, Flame, Layers, 
  Zap, Star, BookOpen, Edit3, Mic, Heart, Settings
} from 'lucide-react';
import { apiClient } from '../utils/api';
import { Sparkle, RobotMascot, DragonMascot } from '../components/UI/Illustrations';

export default function Reports() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'learner';

  const [activeTab, setActiveTab] = useState<string>('all');
  const [activeSidebarItem, setActiveSidebarItem] = useState<string>('ai_reports');
  const [reportData, setReportData] = useState<any>(null);
  const [showCertModal, setShowCertModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchAIReport = async () => {
      try {
        const data = await apiClient.generateAIReport(username);
        if (data) setReportData(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAIReport();
  }, [username]);

  const reportTabs = [
    { id: 'all', label: 'All Reports', icon: '⚡' },
    { id: 'daily', label: 'Daily Progress', icon: '📊' },
    { id: 'weekly', label: 'Weekly Trend', icon: '📈' },
    { id: 'monthly', label: 'Monthly Overview', icon: '📅' },
    { id: 'lesson_completion', label: 'Lesson Completion', icon: '🎓' },
    { id: 'reading', label: 'Reading Report', icon: '📖' },
    { id: 'writing', label: 'Writing Report', icon: '✍️' },
    { id: 'speaking', label: 'Speaking Report', icon: '🎤' },
    { id: 'pronunciation', label: 'Pronunciation', icon: '🗣️' },
    { id: 'vocabulary', label: 'Vocabulary Growth', icon: '🌱' },
    { id: 'study_time', label: 'Study Time', icon: '⏱️' },
    { id: 'weak_skills', label: 'Weak Skills', icon: '⚡' },
    { id: 'strong_skills', label: 'Strong Skills', icon: '⭐' },
    { id: 'achievements', label: 'Achievements', icon: '🏆' },
    { id: 'streak', label: 'Streak Report', icon: '🔥' },
  ];

  const sidebarNavItems = [
    { id: 'overview', label: 'Overview', icon: '🏠', path: '/dashboard' },
    { id: 'ai_reports', label: 'AI Reports', icon: '📊', active: true, path: '/reports' },
    { id: 'practice', label: 'Practice', icon: '✏️', path: '/voice-practice' },
    { id: 'learning_path', label: 'Learning Path', icon: '🗺️', path: '/learn-with-ai' },
    { id: 'achievements', label: 'Achievements', icon: '🏆', path: '/reports' },
    { id: 'streaks', label: 'Streaks', icon: '🔥', path: '/reports' },
    { id: 'certificates', label: 'Certificates', icon: '🎗️', path: '/reports' },
    { id: 'settings', label: 'Settings', icon: '⚙️', path: '/profile-setup' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#1A0A4E',
      backgroundImage: `
        radial-gradient(circle at 10% 20%, rgba(108,76,255,0.4) 0%, transparent 40%),
        radial-gradient(circle at 90% 80%, rgba(255,79,163,0.3) 0%, transparent 40%),
        radial-gradient(circle at 50% 50%, rgba(77,157,255,0.2) 0%, transparent 60%)
      `,
      padding: '16px',
      display: 'flex', gap: '16px',
      fontFamily: 'Nunito, sans-serif',
      position: 'relative',
    }}>

      {/* ── LEFT SIDEBAR ── */}
      <aside style={{
        width: '220px',
        minWidth: '220px',
        background: 'linear-gradient(180deg, #3D1D99 0%, #2D1278 50%, #1E0A5E 100%)',
        borderRadius: '24px',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        padding: '16px 12px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        border: '1.5px solid rgba(255,255,255,0.12)',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Logo / Mascot Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0 8px' }}>
            <div className="animate-bobble" style={{
              width: '42px', height: '42px', borderRadius: '14px',
              background: 'linear-gradient(135deg, #6C4CFF, #8A5CFF)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 6px 18px rgba(108,76,255,0.4)',
            }}>
              <RobotMascot size={32} />
            </div>
            <div>
              <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '18px', color: 'white', lineHeight: 1 }}>NeoLit</div>
              <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '10px', color: '#FFD54A', letterSpacing: '1px' }}>REPORTS</div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {sidebarNavItems.map((item) => {
              const isActive = item.active || activeSidebarItem === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSidebarItem(item.id);
                    if (item.path !== '/reports') navigate(item.path);
                  }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '10px 14px', borderRadius: '14px',
                    background: isActive ? 'linear-gradient(135deg, #6C4CFF 0%, #8A5CFF 100%)' : 'transparent',
                    color: isActive ? 'white' : 'rgba(255,255,255,0.7)',
                    fontFamily: 'Poppins', fontWeight: 800, fontSize: '13px',
                    border: 'none', cursor: 'pointer', textAlign: 'left',
                    boxShadow: isActive ? '0 6px 20px rgba(108,76,255,0.45)' : 'none',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span style={{ fontSize: '16px' }}>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Mascot Card */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(108,76,255,0.3), rgba(255,79,163,0.2))',
          borderRadius: '18px', padding: '12px 10px',
          textAlign: 'center', border: '1px solid rgba(255,255,255,0.15)',
        }}>
          <div className="animate-bobble" style={{ display: 'inline-block' }}>
            <DragonMascot size={54} />
          </div>
          <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '11px', color: 'white', marginTop: '4px' }}>
            Keep learning, keep growing! 🌟
          </div>
        </div>
      </aside>

      {/* ── MAIN CONTENT AREA ── */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '14px', minWidth: 0 }}>

        {/* Top Glass Header Bar */}
        <header style={{
          height: '56px',
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
              fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px',
              background: '#F0F4FF', padding: '6px 14px', borderRadius: '12px',
              border: '1px solid #E8EFFF', cursor: 'pointer',
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '20px' }}>📊</span>
            <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '17px', color: '#1e1040' }}>
              Comprehensive Learning Reports
            </span>
            <span style={{
              background: 'linear-gradient(135deg, #6C4CFF, #8A5CFF)',
              color: 'white', fontFamily: 'Poppins', fontWeight: 900, fontSize: '10px',
              padding: '3px 10px', borderRadius: '99px',
            }}>
              ⚡ Analytics
            </span>
          </div>

          <button
            onClick={() => setShowCertModal(true)}
            className="btn-3d"
            style={{
              background: 'linear-gradient(135deg, #FFD54A, #FF9F43)',
              color: '#1e1040', fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px',
              padding: '7px 18px', borderRadius: '12px',
              border: 'none', borderBottom: '3.5px solid #E8A000', cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(255,213,74,0.4)',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}
          >
            <span>🎗️ Certificate</span>
            <span>▾</span>
          </button>
        </header>

        {/* AI TUTOR RECOMMENDATIONS BANNER (Vibrant Pink/Purple Gradient) */}
        <div style={{
          borderRadius: '24px',
          background: 'linear-gradient(135deg, #7C3AED 0%, #C026D3 50%, #EC4899 100%)',
          padding: '20px 24px',
          color: 'white',
          position: 'relative',
          boxShadow: '0 16px 48px rgba(192,38,211,0.35)',
          border: '2px solid rgba(255,255,255,0.3)',
          display: 'flex', flexDirection: 'column', gap: '12px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                background: '#FFD54A', color: '#1e1040',
                fontFamily: 'Poppins', fontWeight: 900, fontSize: '10px',
                padding: '3px 12px', borderRadius: '99px',
                boxShadow: '0 4px 12px rgba(255,213,74,0.4)', width: 'fit-content',
              }}>
                ⚡ PERSONALIZED AI RECOMMENDATIONS
              </div>
              <h2 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '22px', margin: 0, color: 'white', lineHeight: 1.2 }}>
                AI Tutor Improvement Recommendations 🧠
              </h2>
              <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '12px', color: 'rgba(255,255,255,0.9)', margin: 0 }}>
                Generated from your speech analysis, lesson scores, and practice evaluations.
              </p>
            </div>
            <Sparkle size={24} color="#FFD54A" />
          </div>

          {/* 3 Action Item Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {/* Card 1 */}
            <div style={{
              background: 'rgba(255,255,255,0.18)',
              backdropFilter: 'blur(12px)',
              border: '1.5px solid rgba(255,255,255,0.3)',
              padding: '14px', borderRadius: '18px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                <div>
                  <h4 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px', color: 'white', margin: '0 0 2px' }}>
                    Practice Vowel Sounds 📣
                  </h4>
                  <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '10px', color: 'rgba(255,255,255,0.9)', margin: 0, lineHeight: 1.3 }}>
                    Strengthen vowel sounds in words like "beet", "set", "feet" for 5 mins daily.
                  </p>
                </div>
                <button
                  onClick={() => navigate('/voice-practice')}
                  className="btn-3d"
                  style={{
                    background: '#FFD54A', color: '#1e1040',
                    fontFamily: 'Poppins', fontWeight: 900, fontSize: '11px',
                    padding: '6px 12px', borderRadius: '10px', border: 'none',
                    borderBottom: '3px solid #E8A000', cursor: 'pointer', width: 'fit-content',
                  }}
                >
                  Start Practice →
                </button>
              </div>
              <div style={{ fontSize: '38px', flexShrink: 0 }}>👦</div>
            </div>

            {/* Card 2 */}
            <div style={{
              background: 'rgba(255,255,255,0.18)',
              backdropFilter: 'blur(12px)',
              border: '1.5px solid rgba(255,255,255,0.3)',
              padding: '14px', borderRadius: '18px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                <div>
                  <h4 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px', color: 'white', margin: '0 0 2px' }}>
                    Master Sentence Structure ⭐
                  </h4>
                  <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '10px', color: 'rgba(255,255,255,0.9)', margin: 0, lineHeight: 1.3 }}>
                    Complete 3+ sentence building exercises to boost subject-verb agreement.
                  </p>
                </div>
                <button
                  onClick={() => navigate('/learn-with-ai')}
                  className="btn-3d"
                  style={{
                    background: '#FFD54A', color: '#1e1040',
                    fontFamily: 'Poppins', fontWeight: 900, fontSize: '11px',
                    padding: '6px 12px', borderRadius: '10px', border: 'none',
                    borderBottom: '3.5px solid #E8A000', cursor: 'pointer', width: 'fit-content',
                  }}
                >
                  Start Practice →
                </button>
              </div>
              <div style={{ fontSize: '38px', flexShrink: 0 }}>📝</div>
            </div>

            {/* Card 3 */}
            <div style={{
              background: 'rgba(255,255,255,0.18)',
              backdropFilter: 'blur(12px)',
              border: '1.5px solid rgba(255,255,255,0.3)',
              padding: '14px', borderRadius: '18px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                <div>
                  <h4 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px', color: 'white', margin: '0 0 2px' }}>
                    Expand Active Vocabulary 📚
                  </h4>
                  <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '10px', color: 'rgba(255,255,255,0.9)', margin: 0, lineHeight: 1.3 }}>
                    Explore 5 new vocabulary words in your preferred language today.
                  </p>
                </div>
                <button
                  onClick={() => navigate('/vocabulary')}
                  className="btn-3d"
                  style={{
                    background: '#FFD54A', color: '#1e1040',
                    fontFamily: 'Poppins', fontWeight: 900, fontSize: '11px',
                    padding: '6px 12px', borderRadius: '10px', border: 'none',
                    borderBottom: '3.5px solid #E8A000', cursor: 'pointer', width: 'fit-content',
                  }}
                >
                  Start Practice →
                </button>
              </div>
              <div style={{ fontSize: '38px', flexShrink: 0 }}>📘</div>
            </div>
          </div>
        </div>

        {/* CATEGORY FILTER TABS BAR (SELECT REPORT CATEGORY - 15 DETAILED REPORTS) */}
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '14px 18px',
          border: '1.5px solid rgba(255,255,255,0.6)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
          display: 'flex', flexDirection: 'column', gap: '8px',
        }}>
          <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            SELECT REPORT CATEGORY (15 DETAILED REPORTS)
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {reportTabs.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '6px 12px', borderRadius: '99px',
                    fontFamily: 'Poppins', fontWeight: 800, fontSize: '11px',
                    cursor: 'pointer',
                    border: active ? 'none' : '1px solid #E2E8F0',
                    background: active ? 'linear-gradient(135deg, #6C4CFF, #8A5CFF)' : 'white',
                    color: active ? 'white' : '#475569',
                    boxShadow: active ? '0 4px 12px rgba(108,76,255,0.35)' : 'none',
                    transition: 'all 0.15s ease',
                    display: 'flex', alignItems: 'center', gap: '4px',
                  }}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* MAIN AI REPORT DASHBOARD CONTAINER */}
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '24px',
          border: '1.5px solid rgba(255,255,255,0.6)',
          boxShadow: '0 12px 36px rgba(0,0,0,0.1)',
          display: 'flex', flexDirection: 'column', gap: '16px',
        }}>
          {/* Section Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '20px' }}>📊</span>
              <h2 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '18px', color: '#1e1040', margin: 0 }}>
                AI Report
              </h2>
            </div>
            <span style={{
              background: '#DCFCE7', color: '#166534',
              fontFamily: 'Poppins', fontWeight: 900, fontSize: '11px',
              padding: '3px 12px', borderRadius: '99px', border: '1px solid #86EFAC',
              display: 'flex', alignItems: 'center', gap: '4px',
            }}>
              🟢 Live Verified Data
            </span>
          </div>

          {/* AI Insight Message */}
          <div style={{
            background: '#F0F4FF', border: '1px solid #C7D2FE',
            borderRadius: '14px', padding: '10px 16px',
            fontFamily: 'Nunito', fontWeight: 800, fontSize: '12px', color: '#3730A3',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <span>🤖</span>
            <span>Learner shows strong verbal confidence. Recommended next step: Complete Writing Practice module.</span>
          </div>

          {/* TOP 3 KPI CARDS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
            {/* KPI 1 */}
            <div style={{
              background: '#F8FAFF', border: '1.5px solid #E8EFFF',
              borderRadius: '18px', padding: '16px',
              display: 'flex', flexDirection: 'column', gap: '8px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '10px', color: '#6C4CFF', textTransform: 'uppercase' }}>
                  AVERAGE ACCURACY
                </span>
                <span style={{ fontSize: '20px' }}>🎯</span>
              </div>
              <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '28px', color: '#1e1040' }}>
                86%
              </div>
              <div style={{ height: '8px', background: '#E2E8F0', borderRadius: '99px', overflow: 'hidden' }}>
                <div style={{ width: '86%', height: '100%', background: 'linear-gradient(90deg, #6C4CFF, #8A5CFF)', borderRadius: '99px' }} />
              </div>
              <span style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '11px', color: '#64748B' }}>
                Excellent! Keep it up! 🚀
              </span>
            </div>

            {/* KPI 2 */}
            <div style={{
              background: '#F8FAFF', border: '1.5px solid #E8EFFF',
              borderRadius: '18px', padding: '16px',
              display: 'flex', flexDirection: 'column', gap: '8px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '10px', color: '#22C55E', textTransform: 'uppercase' }}>
                  TOTAL ACTIVE DAYS
                </span>
                <span style={{ fontSize: '20px' }}>📅</span>
              </div>
              <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '28px', color: '#1e1040' }}>
                5 Days
              </div>
              <div style={{ height: '8px', background: '#E2E8F0', borderRadius: '99px', overflow: 'hidden' }}>
                <div style={{ width: '70%', height: '100%', background: 'linear-gradient(90deg, #22C55E, #10B981)', borderRadius: '99px' }} />
              </div>
              <span style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '11px', color: '#64748B' }}>
                You're building a great habit! 🔥
              </span>
            </div>

            {/* KPI 3 */}
            <div style={{
              background: '#F8FAFF', border: '1.5px solid #E8EFFF',
              borderRadius: '18px', padding: '16px',
              display: 'flex', flexDirection: 'column', gap: '8px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '10px', color: '#FF9F43', textTransform: 'uppercase' }}>
                  LESSONS COMPLETED
                </span>
                <span style={{ fontSize: '20px' }}>🏆</span>
              </div>
              <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '28px', color: '#1e1040' }}>
                14 / 20
              </div>
              <div style={{ height: '8px', background: '#E2E8F0', borderRadius: '99px', overflow: 'hidden' }}>
                <div style={{ width: '70%', height: '100%', background: 'linear-gradient(90deg, #FF9F43, #FFD54A)', borderRadius: '99px' }} />
              </div>
              <span style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '11px', color: '#64748B' }}>
                6 more to complete the goal 💪
              </span>
            </div>
          </div>

          {/* MIDDLE ROW VISUALIZATIONS */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '14px' }}>
            {/* Accuracy Over Time Line Chart */}
            <div style={{
              background: '#F8FAFF', border: '1.5px solid #E8EFFF',
              borderRadius: '18px', padding: '16px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '12px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '12px', color: '#1e1040' }}>
                  📈 Accuracy Over Time
                </span>
                <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '11px', color: '#6C4CFF' }}>86% Today</span>
              </div>

              {/* Line Chart SVG */}
              <div style={{ width: '100%', height: '120px', position: 'relative' }}>
                <svg viewBox="0 0 300 100" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                  <path
                    d="M 10 70 Q 75 50 140 45 T 270 20"
                    fill="none"
                    stroke="#6C4CFF"
                    strokeWidth="3.5"
                  />
                  {[
                    { cx: 10, cy: 70, label: 'May 10' },
                    { cx: 75, cy: 50, label: 'May 12' },
                    { cx: 140, cy: 45, label: 'May 14' },
                    { cx: 205, cy: 35, label: 'May 16' },
                    { cx: 270, cy: 20, label: 'Today' },
                  ].map((pt, i) => (
                    <g key={i}>
                      <circle cx={pt.cx} cy={pt.cy} r="5" fill="#6C4CFF" stroke="white" strokeWidth="2" />
                    </g>
                  ))}
                </svg>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Nunito', fontWeight: 700, fontSize: '10px', color: '#94A3B8' }}>
                <span>May 10</span>
                <span>May 12</span>
                <span>May 14</span>
                <span>May 16</span>
                <span>Today</span>
              </div>
            </div>

            {/* Skill Performance Breakdown Donut Chart */}
            <div style={{
              background: '#F8FAFF', border: '1.5px solid #E8EFFF',
              borderRadius: '18px', padding: '16px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '12px',
            }}>
              <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '12px', color: '#1e1040' }}>
                📊 Skill Performance Breakdown
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                {/* Donut Circle */}
                <div style={{ position: 'relative', width: '80px', height: '80px', flexShrink: 0 }}>
                  <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E2E8F0" strokeWidth="3.8" />
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#6C4CFF" strokeWidth="3.8" strokeDasharray="86, 100" />
                  </svg>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '14px', color: '#1e1040' }}>86%</span>
                    <span style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '8px', color: '#64748B' }}>Overall</span>
                  </div>
                </div>

                {/* List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                  {[
                    { label: '🌱 Vocabulary', val: '92%' },
                    { label: '📖 Reading', val: '88%' },
                    { label: '✍️ Writing', val: '76%' },
                    { label: '🎤 Speaking', val: '82%' },
                    { label: '🗣️ Pronunciation', val: '88%' },
                  ].map((sk, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Nunito', fontWeight: 800, fontSize: '10px', color: '#334155' }}>
                      <span>{sk.label}</span>
                      <span style={{ fontWeight: 900, color: '#1e1040' }}>{sk.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Areas to Improve */}
            <div style={{
              background: '#F8FAFF', border: '1.5px solid #E8EFFF',
              borderRadius: '18px', padding: '16px',
              display: 'flex', flexDirection: 'column', gap: '10px',
            }}>
              <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '12px', color: '#1e1040' }}>
                🚀 Areas to Improve
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { title: 'Sentence Structure', score: '72%', desc: '3 more writing exercises' },
                  { title: 'Pronunciation', score: '79%', desc: 'Focus on difficult word sounds' },
                  { title: 'Vocabulary', score: '80%', desc: 'Learn and use new words daily' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => navigate('/voice-practice')}
                    className="hover-lift"
                    style={{
                      background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px',
                      padding: '8px 12px', cursor: 'pointer',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    }}
                  >
                    <div>
                      <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '11px', color: '#1e1040' }}>{item.title}</div>
                      <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '9px', color: '#64748B' }}>{item.desc}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '11px', color: '#EF4444' }}>{item.score}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* BOTTOM ROW CARDS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
            {/* Recent Achievements */}
            <div style={{
              background: '#F8FAFF', border: '1.5px solid #E8EFFF',
              borderRadius: '18px', padding: '14px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '24px' }}>🔥</span>
                <div>
                  <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '12px', color: '#1e1040' }}>5 Days Streak</div>
                  <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '10px', color: '#64748B' }}>Keep it going!</div>
                </div>
              </div>
              <span style={{ background: '#FFFDF0', color: '#B45309', border: '1px solid #FFD54A', borderRadius: '99px', padding: '3px 10px', fontFamily: 'Poppins', fontWeight: 900, fontSize: '10px' }}>
                +50 XP
              </span>
            </div>

            {/* Current Streak */}
            <div style={{
              background: '#F8FAFF', border: '1.5px solid #E8EFFF',
              borderRadius: '18px', padding: '14px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div>
                <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '12px', color: '#1e1040' }}>Current Streak</div>
                <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '10px', color: '#64748B' }}>Best: 12 Days</div>
              </div>
              <div style={{ display: 'flex', gap: '4px', fontSize: '18px' }}>
                🔥🔥🔥🔥🔥
              </div>
            </div>

            {/* Next Goal */}
            <div style={{
              background: '#F8FAFF', border: '1.5px solid #E8EFFF',
              borderRadius: '18px', padding: '14px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div>
                <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '12px', color: '#1e1040' }}>Next Goal</div>
                <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '10px', color: '#64748B' }}>Complete 5 more lessons (14/20)</div>
              </div>
              <span style={{ fontSize: '24px' }}>🎁</span>
            </div>
          </div>

        </div>

      </main>

      {/* Certificate Modal */}
      {showCertModal && (
        <div style={{
          position: 'fixed', inset: 0,
          background: 'rgba(15,23,42,0.65)',
          backdropFilter: 'blur(8px)',
          zIndex: 50,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '20px',
        }}>
          <div style={{
            background: 'white',
            borderRadius: '28px',
            padding: '32px',
            maxWidth: '480px', width: '100%',
            border: '2px solid #E8EFFF',
            boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
            textAlign: 'center',
            display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center',
          }}>
            <div style={{ fontSize: '64px', lineHeight: 1 }}>🎓</div>
            <h2 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '24px', color: '#1e1040', margin: 0 }}>
              Literacy Completion Certificate
            </h2>
            <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '13px', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
              Congratulations <b>{username}</b>! You have completed 70% of your AI Literacy path. Keep practicing to unlock your official PDF badge!
            </p>
            <button
              onClick={() => setShowCertModal(false)}
              className="btn-3d"
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #6C4CFF, #8A5CFF)',
                color: 'white',
                fontFamily: 'Poppins', fontWeight: 900, fontSize: '14px',
                padding: '12px', borderRadius: '14px',
                border: 'none', borderBottom: '3px solid rgba(0,0,0,0.3)',
                cursor: 'pointer', boxShadow: '0 4px 16px rgba(108,76,255,0.4)',
              }}
            >
              Close Preview
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
