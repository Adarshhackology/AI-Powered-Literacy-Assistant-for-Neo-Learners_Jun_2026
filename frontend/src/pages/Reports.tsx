import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart2, Award, ChevronRight, Calendar, Target, CheckCircle2, Flame, 
  Sparkles, ArrowRight, Menu, ArrowLeft, ChevronDown, Download, Star, 
  BookOpen, Edit3, Mic, Heart, Settings, RefreshCw, Layers, Shield, Trophy
} from 'lucide-react';
import { apiClient } from '../utils/api';
import { RobotMascot } from '../components/UI/Illustrations';

export default function Reports() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'Adarsh';

  const [activeTab, setActiveTab] = useState<string>('all');
  const [activeSidebarItem, setActiveSidebarItem] = useState<string>('ai_reports');

  const reportTabs = [
    { id: 'all', label: 'All Reports', icon: '🎆' },
    { id: 'daily', label: 'Daily Progress', icon: '📅' },
    { id: 'weekly', label: 'Weekly Trend', icon: '📈' },
    { id: 'monthly', label: 'Monthly Overview', icon: '📊' },
    { id: 'lesson_completion', label: 'Lesson Completion', icon: '☑️' },
    { id: 'reading', label: 'Reading', icon: '📖' },
    { id: 'writing', label: 'Writing', icon: '✍️' },
    { id: 'speaking', label: 'Speaking', icon: '🎤' },
    { id: 'vocabulary', label: 'Vocabulary', icon: 'Aa' },
  ];

  const sidebarNavItems = [
    { id: 'overview', label: 'Overview', icon: '🏠', path: '/dashboard' },
    { id: 'ai_reports', label: 'AI Reports', icon: '📊', path: '/reports' },
    { id: 'practice', label: 'Practice', icon: '✍️', path: '/voice-practice' },
    { id: 'learning_path', label: 'Learning Path', icon: '🗺️', path: '/learn-with-ai' },
    { id: 'achievements', label: 'Achievements', icon: '🏆', path: '/games' },
    { id: 'streaks', label: 'Streaks', icon: '🔥', path: '/dashboard' },
    { id: 'certificates', label: 'Certificates', icon: '📜', path: '/reports' },
    { id: 'settings', label: 'Settings', icon: '⚙️', path: '/profile-setup' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#F6F8FD',
      fontFamily: 'Nunito, sans-serif',
      display: 'flex',
      color: '#1E1040',
    }}>

      {/* ── 1. LEFT SIDEBAR ── */}
      <aside style={{
        width: '250px',
        minWidth: '250px',
        background: '#FFFFFF',
        borderRight: '1px solid #EAECF5',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '24px 16px',
        position: 'sticky',
        top: 0,
        height: '100vh',
        zIndex: 20,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Logo Header */}
          <div 
            onClick={() => navigate('/dashboard')}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', paddingLeft: '8px' }}
          >
            <div style={{
              width: '42px', height: '42px', borderRadius: '14px',
              background: 'linear-gradient(135deg, #FF4FA3 0%, #FF6B35 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 6px 16px rgba(255,79,163,0.35)',
            }}>
              <RobotMascot size={32} />
            </div>
            <div>
              <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '20px', color: '#1E1040', lineHeight: 1 }}>
                NeoLit
              </div>
              <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '10px', color: '#6C4CFF', letterSpacing: '1.5px', marginTop: '2px' }}>
                REPORTS
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {sidebarNavItems.map(item => {
              const isActive = activeSidebarItem === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSidebarItem(item.id);
                    navigate(item.path);
                  }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '14px',
                    padding: '12px 16px', borderRadius: '14px', border: 'none',
                    background: isActive ? '#EFECFF' : 'transparent',
                    color: isActive ? '#6C4CFF' : '#64748B',
                    fontFamily: 'Poppins', fontWeight: isActive ? 800 : 600, fontSize: '14px',
                    cursor: 'pointer', textAlign: 'left',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span style={{ fontSize: '18px' }}>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Monster Card */}
        <div style={{
          background: 'linear-gradient(135deg, #F0F4FF 0%, #E8EFFF 100%)',
          borderRadius: '20px',
          padding: '20px 16px',
          textAlign: 'center',
          border: '1px solid #DCE6FF',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        }}>
          <div className="animate-bobble" style={{ fontSize: '42px' }}>🐉</div>
          <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px', color: '#1E1040', lineHeight: 1.3 }}>
            Keep learning,<br />keep growing! 🌟
          </div>
        </div>
      </aside>

      {/* ── 2. MAIN CONTENT AREA ── */}
      <main style={{ flex: 1, padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1400px' }}>

        {/* ── TOP GLASS NAVBAR ── */}
        <nav style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: '#FFFFFF', padding: '12px 24px', borderRadius: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid #EAECF5',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}>
              <Menu className="w-5 h-5" />
            </button>
            <button 
              onClick={() => navigate('/dashboard')}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                background: '#F1F5F9', border: 'none', padding: '6px 14px',
                borderRadius: '10px', fontFamily: 'Poppins', fontWeight: 700, fontSize: '12px',
                color: '#475569', cursor: 'pointer',
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '20px' }}>📊</span>
            <h1 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '18px', color: '#1E1040', margin: 0 }}>
              Comprehensive Learning Reports
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button style={{
              background: '#EFECFF', color: '#6C4CFF', border: 'none',
              padding: '8px 16px', borderRadius: '12px',
              fontFamily: 'Poppins', fontWeight: 800, fontSize: '13px',
              display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer',
            }}>
              <BarChart2 className="w-4 h-4" />
              <span>Analytics</span>
            </button>

            <button style={{
              background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#334155',
              padding: '8px 16px', borderRadius: '12px',
              fontFamily: 'Poppins', fontWeight: 800, fontSize: '13px',
              display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer',
            }}>
              <span>👑 Certificate</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            <div style={{
              width: '38px', height: '38px', borderRadius: '50%',
              background: '#FFD54A', border: '2px solid #FFFFFF',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', cursor: 'pointer',
            }}>
              👦
            </div>
          </div>
        </nav>

        {/* ── TOP SECTION: AI RECOMMENDATIONS BANNER & 3 CARDS ── */}
        <div style={{
          background: 'linear-gradient(135deg, #F8F5FF 0%, #FAF8FF 100%)',
          borderRadius: '24px', padding: '24px', border: '1.5px solid #EDE9FE',
          display: 'flex', flexDirection: 'column', gap: '16px',
        }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                background: '#EFECFF', color: '#6C4CFF',
                fontFamily: 'Poppins', fontWeight: 900, fontSize: '10px',
                padding: '3px 10px', borderRadius: '99px', letterSpacing: '0.5px', marginBottom: '4px',
              }}>
                ✦ AI RECOMMENDATIONS
              </div>
              <h2 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '20px', color: '#1E1040', margin: 0 }}>
                Personalized AI Tutor Recommendations 🧠
              </h2>
              <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '13px', color: '#64748B', margin: '2px 0 0' }}>
                Based on your performance, here's what to focus on next.
              </p>
            </div>

            {/* Arrows */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#FFFFFF', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B', cursor: 'pointer' }}>‹</button>
              <button style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#FFFFFF', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B', cursor: 'pointer' }}>›</button>
            </div>
          </div>

          {/* 3 Horizontal Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            
            {/* Card 1: Vowels */}
            <div style={{
              background: '#FFFFFF', borderRadius: '20px', padding: '20px',
              border: '1px solid #F1F5F9', boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px',
            }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{
                  width: '46px', height: '46px', borderRadius: '16px',
                  background: 'linear-gradient(135deg, #6C4CFF, #8A5CFF)',
                  color: 'white', fontFamily: 'Poppins', fontWeight: 900, fontSize: '18px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  Aa
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '15px', color: '#1E1040', margin: 0 }}>
                    Practice Vowel Sounds
                  </h3>
                  <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '12px', color: '#64748B', margin: '4px 0 0', lineHeight: 1.4 }}>
                    Strengthen vowel sounds in "beet", "set", "feet".
                  </p>
                </div>
                <span style={{ fontSize: '24px' }}>🥳</span>
              </div>

              <button 
                onClick={() => navigate('/learn-with-ai')}
                style={{
                  background: '#F5F3FF', color: '#6C4CFF', border: 'none',
                  padding: '8px 16px', borderRadius: '10px',
                  fontFamily: 'Poppins', fontWeight: 800, fontSize: '12px',
                  cursor: 'pointer', width: 'fit-content', display: 'flex', alignItems: 'center', gap: '6px',
                }}
              >
                <span>Start Practice</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 2: Sentence */}
            <div style={{
              background: '#FFFFFF', borderRadius: '20px', padding: '20px',
              border: '1px solid #F1F5F9', boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px',
            }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{
                  width: '46px', height: '46px', borderRadius: '16px',
                  background: 'linear-gradient(135deg, #3B82F6, #60A5FA)',
                  color: 'white', fontFamily: 'Poppins', fontWeight: 900, fontSize: '18px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  ✍️
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '15px', color: '#1E1040', margin: 0 }}>
                    Master Sentence Structure
                  </h3>
                  <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '12px', color: '#64748B', margin: '4px 0 0', lineHeight: 1.4 }}>
                    Complete 3+ sentence building exercises.
                  </p>
                </div>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#DCFCE7', color: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
                  ⭐
                </div>
              </div>

              <button 
                onClick={() => navigate('/voice-practice')}
                style={{
                  background: '#EFF6FF', color: '#2563EB', border: 'none',
                  padding: '8px 16px', borderRadius: '10px',
                  fontFamily: 'Poppins', fontWeight: 800, fontSize: '12px',
                  cursor: 'pointer', width: 'fit-content', display: 'flex', alignItems: 'center', gap: '6px',
                }}
              >
                <span>Start Practice</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 3: Vocabulary */}
            <div style={{
              background: '#FFFFFF', borderRadius: '20px', padding: '20px',
              border: '1px solid #F1F5F9', boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px',
            }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{
                  width: '46px', height: '46px', borderRadius: '16px',
                  background: 'linear-gradient(135deg, #10B981, #34D399)',
                  color: 'white', fontFamily: 'Poppins', fontWeight: 900, fontSize: '18px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  📖
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '15px', color: '#1E1040', margin: 0 }}>
                    Expand Active Vocabulary
                  </h3>
                  <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '12px', color: '#64748B', margin: '4px 0 0', lineHeight: 1.4 }}>
                    Explore 5 new words in your preferred language.
                  </p>
                </div>
                <span style={{ fontSize: '24px' }}>🚀</span>
              </div>

              <button 
                onClick={() => navigate('/vocabulary')}
                style={{
                  background: '#ECFDF5', color: '#059669', border: 'none',
                  padding: '8px 16px', borderRadius: '10px',
                  fontFamily: 'Poppins', fontWeight: 800, fontSize: '12px',
                  cursor: 'pointer', width: 'fit-content', display: 'flex', alignItems: 'center', gap: '6px',
                }}
              >
                <span>Start Practice</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

        {/* ── MIDDLE SECTION: CATEGORY TABS BAR ── */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', paddingBottom: '4px',
        }}>
          {reportTabs.map(tab => {
            const isSel = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '8px 16px', borderRadius: '12px', border: 'none',
                  background: isSel ? '#6C4CFF' : '#FFFFFF',
                  color: isSel ? '#FFFFFF' : '#64748B',
                  fontFamily: 'Poppins', fontWeight: isSel ? 800 : 600, fontSize: '13px',
                  cursor: 'pointer', whiteSpace: 'nowrap',
                  boxShadow: isSel ? '0 4px 14px rgba(108,76,255,0.35)' : '0 2px 8px rgba(0,0,0,0.02)',
                  display: 'flex', alignItems: 'center', gap: '6px',
                  transition: 'all 0.15s ease',
                }}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
          <button style={{
            padding: '8px 16px', borderRadius: '12px', background: '#FFFFFF', border: '1px solid #E2E8F0',
            color: '#64748B', fontFamily: 'Poppins', fontWeight: 700, fontSize: '13px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap',
          }}>
            <span>More</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* ── TOP 3 SUMMARY STAT CARDS ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          
          {/* Stat 1: Accuracy */}
          <div style={{
            background: '#FFFFFF', borderRadius: '20px', padding: '20px 24px',
            border: '1px solid #EAECF5', boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
            display: 'flex', flexDirection: 'column', gap: '12px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '13px', color: '#64748B' }}>Average Accuracy</span>
              <span style={{ fontSize: '20px' }}>🎯</span>
            </div>
            <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '32px', color: '#6C4CFF', lineHeight: 1 }}>
              86%
            </div>
            <div style={{ width: '100%', height: '8px', background: '#F1F5F9', borderRadius: '99px', overflow: 'hidden' }}>
              <div style={{ width: '86%', height: '100%', background: 'linear-gradient(90deg, #6C4CFF, #8A5CFF)', borderRadius: '99px' }} />
            </div>
            <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: '12px', color: '#64748B' }}>
              Excellent! Keep it up! 🚀
            </div>
          </div>

          {/* Stat 2: Active Days */}
          <div style={{
            background: '#FFFFFF', borderRadius: '20px', padding: '20px 24px',
            border: '1px solid #EAECF5', boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
            display: 'flex', flexDirection: 'column', gap: '12px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '13px', color: '#059669' }}>Total Active Days</span>
              <span style={{ fontSize: '20px' }}>📅</span>
            </div>
            <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '32px', color: '#10B981', lineHeight: 1 }}>
              5 Days
            </div>
            <div style={{ width: '100%', height: '8px', background: '#F1F5F9', borderRadius: '99px', overflow: 'hidden' }}>
              <div style={{ width: '70%', height: '100%', background: 'linear-gradient(90deg, #10B981, #34D399)', borderRadius: '99px' }} />
            </div>
            <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: '12px', color: '#64748B' }}>
              You're building a great habit! 🔥
            </div>
          </div>

          {/* Stat 3: Lessons */}
          <div style={{
            background: '#FFFFFF', borderRadius: '20px', padding: '20px 24px',
            border: '1px solid #EAECF5', boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
            display: 'flex', flexDirection: 'column', gap: '12px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '13px', color: '#D97706' }}>Lessons Completed</span>
              <span style={{ fontSize: '20px' }}>🏆</span>
            </div>
            <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '32px', color: '#F59E0B', lineHeight: 1 }}>
              14 / 20
            </div>
            <div style={{ width: '100%', height: '8px', background: '#F1F5F9', borderRadius: '99px', overflow: 'hidden' }}>
              <div style={{ width: '70%', height: '100%', background: 'linear-gradient(90deg, #F59E0B, #FBBF24)', borderRadius: '99px' }} />
            </div>
            <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: '12px', color: '#64748B' }}>
              6 more to complete the goal 💪
            </div>
          </div>

        </div>

        {/* ── MAIN DATA VISUALIZATIONS GRID (3 COLUMNS) ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.1fr 1fr', gap: '20px' }}>
          
          {/* Column 1: Accuracy Over Time Line Chart */}
          <div style={{
            background: '#FFFFFF', borderRadius: '24px', padding: '24px',
            border: '1px solid #EAECF5', boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px' }}>📈</span>
                <h3 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '16px', color: '#1E1040', margin: 0 }}>
                  Accuracy Over Time
                </h3>
              </div>
              <span style={{ background: '#F3E8FF', color: '#6C4CFF', fontFamily: 'Poppins', fontWeight: 800, fontSize: '11px', padding: '4px 10px', borderRadius: '99px' }}>
                86% Today
              </span>
            </div>

            {/* SVG Line Graph */}
            <div style={{ width: '100%', height: '160px', position: 'relative', marginTop: '10px' }}>
              <svg width="100%" height="100%" viewBox="0 0 400 150" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="lineGradRep" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6C4CFF" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#6C4CFF" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Area Fill */}
                <path d="M 30,110 Q 110,60 190,50 T 350,20 L 350,140 L 30,140 Z" fill="url(#lineGradRep)" />
                {/* Line */}
                <path d="M 30,110 Q 110,60 190,50 T 350,20" fill="none" stroke="#6C4CFF" strokeWidth="4" strokeLinecap="round" />
                {/* Points */}
                <circle cx="30" cy="110" r="5" fill="#6C4CFF" />
                <circle cx="110" cy="65" r="5" fill="#6C4CFF" />
                <circle cx="190" cy="50" r="5" fill="#6C4CFF" />
                <circle cx="270" cy="38" r="5" fill="#6C4CFF" />
                <circle cx="350" cy="20" r="6" fill="#6C4CFF" stroke="white" strokeWidth="2" />
              </svg>
              {/* Date Labels */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', fontFamily: 'Nunito', fontWeight: 700, fontSize: '11px', color: '#94A3B8' }}>
                <span>May 10</span>
                <span>May 12</span>
                <span>May 14</span>
                <span>May 16</span>
                <span style={{ color: '#6C4CFF', fontWeight: 900 }}>Today</span>
              </div>
            </div>

            {/* Bottom Callout */}
            <div style={{ background: '#F8FAFC', padding: '12px 16px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6C4CFF', fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px' }}>
                <span>↑ 12%</span>
                <span style={{ color: '#64748B', fontWeight: 700, fontSize: '11px' }}>Improvement this week</span>
              </div>
              <span style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '11px', color: '#64748B' }}>
                Great progress! You're improving consistently. 🎉
              </span>
            </div>
          </div>

          {/* Column 2: Skill Performance Breakdown Donut Chart */}
          <div style={{
            background: '#FFFFFF', borderRadius: '24px', padding: '24px',
            border: '1px solid #EAECF5', boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '18px' }}>📊</span>
              <h3 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '16px', color: '#1E1040', margin: 0 }}>
                Skill Performance Breakdown
              </h3>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              {/* Donut Ring Chart */}
              <div style={{ width: '120px', height: '120px', position: 'relative', flexShrink: 0 }}>
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="45" fill="none" stroke="#E2E8F0" strokeWidth="16" />
                  <circle cx="60" cy="60" r="45" fill="none" stroke="#0099FF" strokeWidth="16" strokeDasharray="280" strokeDashoffset="60" transform="rotate(-90 60 60)" />
                  <circle cx="60" cy="60" r="45" fill="none" stroke="#00CC88" strokeWidth="16" strokeDasharray="280" strokeDashoffset="130" transform="rotate(30 60 60)" />
                  <circle cx="60" cy="60" r="45" fill="none" stroke="#FFBB00" strokeWidth="16" strokeDasharray="280" strokeDashoffset="200" transform="rotate(110 60 60)" />
                  <circle cx="60" cy="60" r="45" fill="none" stroke="#FF4FA3" strokeWidth="16" strokeDasharray="280" strokeDashoffset="240" transform="rotate(190 60 60)" />
                </svg>
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', textAlign: 'center',
                }}>
                  <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '18px', color: '#1E1040', lineHeight: 1 }}>86%</span>
                  <span style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: '9px', color: '#94A3B8' }}>Overall</span>
                </div>
              </div>

              {/* Skill Legends */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                {[
                  { name: 'Vocabulary', val: '92%', col: '#0099FF' },
                  { name: 'Reading', val: '88%', col: '#00CC88' },
                  { name: 'Writing', val: '76%', col: '#FFBB00' },
                  { name: 'Speaking', val: '82%', col: '#FF4FA3' },
                  { name: 'Pronunciation', val: '88%', col: '#6C4CFF' },
                ].map(sk => (
                  <div key={sk.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', fontFamily: 'Nunito', fontWeight: 800 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: sk.col }} />
                      <span style={{ color: '#475569' }}>{sk.name}</span>
                    </div>
                    <span style={{ fontFamily: 'Poppins', fontWeight: 900, color: '#1E1040' }}>{sk.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Recommendation */}
            <div style={{ background: '#ECFDF5', padding: '10px 14px', borderRadius: '12px', fontSize: '11px', fontFamily: 'Poppins', fontWeight: 800, color: '#047857', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>🌱</span>
              <span>Vocabulary is your strongest skill! Keep it up! 🌟</span>
            </div>
          </div>

          {/* Column 3: Areas to Improve */}
          <div style={{
            background: '#FFFFFF', borderRadius: '24px', padding: '24px',
            border: '1px solid #EAECF5', boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '18px' }}>🚀</span>
              <h3 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '16px', color: '#1E1040', margin: 0 }}>
                Areas to Improve
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              
              {/* Item 1 */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F1F5F9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#F3E8FF', color: '#6C4CFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>
                    ✍️
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '13px', color: '#1E1040' }}>Sentence Structure</div>
                    <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '11px', color: '#94A3B8' }}>3 more writing exercises</div>
                  </div>
                </div>
                <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px', color: '#EF4444', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>72%</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>

              {/* Item 2 */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F1F5F9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>
                    🗣️
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '13px', color: '#1E1040' }}>Pronunciation</div>
                    <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '11px', color: '#94A3B8' }}>Focus on difficult vowel sounds</div>
                  </div>
                </div>
                <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px', color: '#F59E0B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>79%</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>

              {/* Item 3 */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#DCFCE7', color: '#15803D', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>
                    🌱
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '13px', color: '#1E1040' }}>Vocabulary</div>
                    <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '11px', color: '#94A3B8' }}>Learn and use new words daily</div>
                  </div>
                </div>
                <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>80%</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>

            </div>

            <button 
              onClick={() => navigate('/learn-with-ai')}
              style={{
                background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#6C4CFF',
                padding: '10px', borderRadius: '12px', width: '100%',
                fontFamily: 'Poppins', fontWeight: 800, fontSize: '12px',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
              }}
            >
              <span>View All Recommendations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* ── BOTTOM ROW: STREAK & GOALS BAR ── */}
        <div style={{
          background: '#FFFFFF', borderRadius: '24px', padding: '16px 24px',
          border: '1px solid #EAECF5', boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', alignItems: 'center',
        }}>
          
          {/* Block 1: Current Streak */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '28px' }}>🔥</span>
            <div>
              <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '12px', color: '#1E1040' }}>Current Streak</div>
              <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '11px', color: '#94A3B8' }}>Best: 12 Days</div>
            </div>
            <span style={{ background: '#FFF3E0', color: '#E65100', fontFamily: 'Poppins', fontWeight: 900, fontSize: '12px', padding: '4px 10px', borderRadius: '99px', marginLeft: 'auto' }}>
              5 Days
            </span>
          </div>

          {/* Block 2: Longest Streak */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '28px' }}>⭐</span>
            <div>
              <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '12px', color: '#1E1040' }}>Longest Streak</div>
              <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '11px', color: '#94A3B8' }}>Keep it going!</div>
            </div>
            <span style={{ background: '#E8F5E9', color: '#2E7D32', fontFamily: 'Poppins', fontWeight: 900, fontSize: '12px', padding: '4px 10px', borderRadius: '99px', marginLeft: 'auto' }}>
              12 Days
            </span>
          </div>

          {/* Block 3: Streak Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div>
              <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '12px', color: '#1E1040' }}>Streak Status</div>
              <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '11px', color: '#94A3B8' }}>Amazing consistency!</div>
            </div>
            <div style={{ display: 'flex', gap: '2px', marginLeft: 'auto', fontSize: '16px' }}>
              🔥 🔥 🔥 🔥 🔥
            </div>
          </div>

          {/* Block 4: Next Goal */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '28px' }}>🎁</span>
            <div>
              <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '12px', color: '#1E1040' }}>Next Goal</div>
              <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '11px', color: '#94A3B8' }}>Complete 5 more lessons</div>
            </div>
            <span style={{ background: '#F3E8FF', color: '#6C4CFF', fontFamily: 'Poppins', fontWeight: 900, fontSize: '12px', padding: '4px 10px', borderRadius: '99px', marginLeft: 'auto' }}>
              14 / 20
            </span>
          </div>

        </div>

      </main>

    </div>
  );
}
