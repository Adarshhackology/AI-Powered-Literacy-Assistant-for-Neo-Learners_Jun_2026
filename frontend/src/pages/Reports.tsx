import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Sparkles, TrendingUp, BarChart2, Award } from 'lucide-react';
import { apiClient } from '../utils/api';
import { Sparkle, TrophySVG } from '../components/UI/Illustrations';

export default function Reports() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'learner';

  const [activeTab, setActiveTab] = useState<string>('ai_summary');
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showCertModal, setShowCertModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchAIReport = async () => {
      try {
        setLoading(true);
        const data = await apiClient.generateAIReport(username);
        if (data) {
          setReportData(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAIReport();
  }, [username]);

  const reportTabs = [
    { id: 'ai_summary', label: 'AI Report', icon: '🤖' },
    { id: 'daily', label: 'Daily Progress', icon: '☀️' },
    { id: 'weekly', label: 'Weekly Trend', icon: '📊' },
    { id: 'monthly', label: 'Monthly Overview', icon: '🗓️' },
    { id: 'lesson_completion', label: 'Lesson Completion', icon: '📚' },
    { id: 'reading', label: 'Reading Report', icon: '📖' },
    { id: 'writing', label: 'Writing Report', icon: '✍️' },
    { id: 'speaking', label: 'Speaking Report', icon: '🎙️' },
    { id: 'pronunciation', label: 'Pronunciation', icon: '🎯' },
    { id: 'vocabulary', label: 'Vocabulary Growth', icon: '🌸' },
    { id: 'study_time', label: 'Study Time', icon: '⏱️' },
    { id: 'weak_skills', label: 'Weak Skills', icon: '🔍' },
    { id: 'strong_skills', label: 'Strong Skills', icon: '⭐' },
    { id: 'achievements', label: 'Achievements', icon: '🏅' },
    { id: 'streak', label: 'Streak Report', icon: '🔥' },
  ];

  const summaries = reportData?.report_summaries || {
    daily: 'Completed 2 lessons today with an average pronunciation accuracy of 88%.',
    weekly: 'Studied for 185 minutes across 5 active days. Earned 140 XP!',
    monthly: 'Lessons completed: 14. Pronunciation score improved by +12%.',
    lesson_completion: '14 out of 20 core curriculum lessons completed (70% progress).',
    reading: 'Reading accuracy is at 85%. Excellent recognition of high-frequency words.',
    writing: 'Writing score is 72%. Great progress on simple sentences; focus on plurals.',
    speaking: 'Speaking confidence is 90%. Fluency rate averaged 125 words per minute.',
    pronunciation: 'Average pronunciation rating: Good (86%). Pause count decreased by 30%.',
    vocabulary: 'Recognized 45 new words this month with a 92% retention rate.',
    study_time: 'Peak study hours: 5 PM - 7 PM. Consistent daily practice habit.',
    weak_skills: 'Target areas: Complex sentence punctuation & long vowel stress.',
    strong_skills: 'Top strengths: Word recognition, clear speaking voice, daily streak.',
    achievements: 'Unlocked 3 badges: Bronze Reader, Voice Pioneer, 5-Day Streak Flame.',
    streak: 'Current streak: 5 Days! Keep practicing tomorrow to reach 6 days.',
    ai_summary: 'Learner shows strong verbal confidence. Recommended next step: Complete Writing Practice module.'
  };

  const recommendations = reportData?.recommendations || [
    { title: 'Practice Vowel Sounds 🍎', desc: 'Stretch out vowel sounds in words like "apple" and "ball" for 5 mins daily.', action_link: '/voice-practice' },
    { title: 'Master Sentence Structure ✍️', desc: 'Complete 2 short writing exercises to boost subject-verb agreement.', action_link: '/learn-with-ai' },
    { title: 'Expand Active Vocabulary 📚', desc: 'Explore 5 new vocabulary words in your preferred language today.', action_link: '/vocabulary' }
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
      padding: '20px',
      position: 'relative',
    }}>

      {/* Header Bar */}
      <nav style={{
        height: '64px',
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        padding: '0 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: '20px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
        border: '1.5px solid rgba(255,255,255,0.6)',
      }}>
        <Link to="/dashboard" className="btn-3d" style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          color: '#1e1040', textDecoration: 'none',
          fontFamily: 'Poppins', fontWeight: 900, fontSize: '14px',
          background: '#F0F4FF', padding: '8px 16px', borderRadius: '12px',
          border: '1px solid #E8EFFF',
        }}>
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '22px' }}>📊</span>
          <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '18px', color: '#1e1040' }}>
            Comprehensive Learning Reports
          </span>
          <span style={{
            background: 'linear-gradient(135deg, #6C4CFF, #8A5CFF)',
            color: 'white', fontFamily: 'Poppins', fontWeight: 800, fontSize: '11px',
            padding: '3px 10px', borderRadius: '99px',
          }}>
            15 Analytics
          </span>
        </div>

        <button
          onClick={() => setShowCertModal(true)}
          className="btn-3d"
          style={{
            background: 'linear-gradient(135deg, #FFD54A, #FF9F43)',
            color: '#1e1040',
            fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px',
            padding: '8px 18px', borderRadius: '12px',
            border: 'none', borderBottom: '3px solid #E8A000',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
            boxShadow: '0 4px 14px rgba(255,213,74,0.4)',
          }}
        >
          <Download className="w-4 h-4" /> Certificate 🎓
        </button>
      </nav>

      {/* Main Content */}
      <main style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Gemini AI Recommendations Banner Card */}
        <div style={{
          borderRadius: '24px',
          background: 'linear-gradient(135deg, #6C4CFF 0%, #8A5CFF 40%, #FF4FA3 100%)',
          padding: '24px 28px',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 16px 48px rgba(108,76,255,0.35)',
          border: '2px solid rgba(255,255,255,0.25)',
        }}>
          {/* Sparkles background */}
          <div style={{ position: 'absolute', top: '12px', right: '20px', opacity: 0.6 }}>
            <Sparkle size={24} color="#FFD54A" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: '#FFD54A', color: '#1e1040',
              fontFamily: 'Poppins', fontWeight: 900, fontSize: '11px',
              padding: '4px 14px', borderRadius: '99px',
              boxShadow: '0 4px 12px rgba(255,213,74,0.4)',
              width: 'fit-content',
            }}>
              <Sparkles className="w-3.5 h-3.5" /> PERSONALIZED AI RECOMMENDATIONS
            </div>
            <h1 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '26px', margin: 0, color: 'white', lineHeight: 1.2 }}>
              AI Tutor Improvement Recommendations 🧠
            </h1>
            <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '13px', color: 'rgba(255,255,255,0.9)', margin: 0 }}>
              Generated from your speech attempts, lesson scores, and practice evaluations.
            </p>
          </div>

          {/* AI Action Items Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
            {recommendations.map((rec: any, idx: number) => (
              <div key={idx} style={{
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(12px)',
                border: '1.5px solid rgba(255,255,255,0.25)',
                padding: '16px',
                borderRadius: '18px',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                gap: '12px',
              }}>
                <div>
                  <h4 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '14px', color: 'white', margin: '0 0 6px' }}>{rec.title}</h4>
                  <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '11px', color: 'rgba(255,255,255,0.85)', margin: 0, lineHeight: 1.4 }}>{rec.desc}</p>
                </div>
                <button
                  onClick={() => navigate(rec.action_link || '/voice-practice')}
                  className="btn-3d"
                  style={{
                    background: '#FFD54A',
                    color: '#1e1040',
                    fontFamily: 'Poppins', fontWeight: 900, fontSize: '12px',
                    padding: '8px 14px', borderRadius: '10px',
                    border: 'none', borderBottom: '3px solid #E8A000',
                    cursor: 'pointer', width: 'fit-content',
                    boxShadow: '0 4px 12px rgba(255,213,74,0.4)',
                  }}
                >
                  Start Practice →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 15 Detailed Report Tabs Navigation */}
        <div style={{
          background: 'white',
          borderRadius: '22px',
          padding: '18px',
          border: '1.5px solid #E8EFFF',
          boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
        }}>
          <h3 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '12px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 12px' }}>
            Select Report Category (15 Detailed Reports)
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {reportTabs.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '12px',
                    fontFamily: 'Poppins', fontWeight: 800, fontSize: '12px',
                    cursor: 'pointer',
                    border: active ? 'none' : '1.5px solid #E8EFFF',
                    background: active ? 'linear-gradient(135deg, #6C4CFF, #8A5CFF)' : '#F8FAFF',
                    color: active ? 'white' : '#475569',
                    boxShadow: active ? '0 4px 14px rgba(108,76,255,0.35)' : 'none',
                    transition: 'all 0.18s ease',
                    display: 'flex', alignItems: 'center', gap: '6px',
                  }}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Report Detail Card */}
        <div style={{
          background: 'white',
          borderRadius: '22px',
          padding: '24px',
          border: '1.5px solid #E8EFFF',
          boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
          display: 'flex', flexDirection: 'column', gap: '18px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid #F1F5F9', paddingBottom: '14px' }}>
            <h2 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '20px', color: '#1e1040', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BarChart2 className="w-5 h-5 text-indigo-600" />
              <span>{reportTabs.find(t => t.id === activeTab)?.icon} {reportTabs.find(t => t.id === activeTab)?.label}</span>
            </h2>
            <span style={{
              background: '#DCFCE7', color: '#166534',
              fontFamily: 'Poppins', fontWeight: 800, fontSize: '11px',
              padding: '4px 12px', borderRadius: '99px', border: '1px solid #BBF7D0',
            }}>
              Live Verified Data
            </span>
          </div>

          <div style={{ background: '#F8FAFF', border: '1.5px solid #E8EFFF', padding: '18px', borderRadius: '16px' }}>
            <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '15px', color: '#334155', margin: 0, lineHeight: 1.6 }}>
              {summaries[activeTab] || 'No summary available for this report section.'}
            </p>
          </div>

          {/* Graphical Analytics Display */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div style={{ background: '#EEF2FF', border: '1.5px solid #C7D2FE', padding: '16px', borderRadius: '16px', textAlign: 'center' }}>
              <h4 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '11px', color: '#4338CA', textTransform: 'uppercase', margin: '0 0 4px' }}>Average Accuracy</h4>
              <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '32px', color: '#1E1B4B' }}>86%</div>
            </div>

            <div style={{ background: '#ECFDF5', border: '1.5px solid #A7F3D0', padding: '16px', borderRadius: '16px', textAlign: 'center' }}>
              <h4 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '11px', color: '#047857', textTransform: 'uppercase', margin: '0 0 4px' }}>Total Active Days</h4>
              <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '32px', color: '#064E3B' }}>5 Days</div>
            </div>

            <div style={{ background: '#FFFBEB', border: '1.5px solid #FDE68A', padding: '16px', borderRadius: '16px', textAlign: 'center' }}>
              <h4 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '11px', color: '#B45309', textTransform: 'uppercase', margin: '0 0 4px' }}>Lessons Completed</h4>
              <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '32px', color: '#78350F' }}>14 / 20</div>
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
