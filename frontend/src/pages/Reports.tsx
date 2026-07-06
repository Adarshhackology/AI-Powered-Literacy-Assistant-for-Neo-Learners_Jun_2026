import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Award, Calendar, ChevronRight, Download, Sparkles, TrendingUp } from 'lucide-react';
import { apiClient } from '../utils/api';

export default function Reports() {
  const username = localStorage.getItem('username') || 'guest';
  const [profile, setProfile] = useState<any>(null);
  const [showCertModal, setShowCertModal] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const prof = await apiClient.getProfile(username);
        setProfile(prof);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, [username]);

  // Activity calendar mockup (4 weeks * 7 days)
  const activityData = [
    [3, 2, 0, 1, 3, 2, 4],
    [2, 3, 1, 0, 2, 3, 1],
    [4, 2, 3, 2, 1, 3, 2],
    [3, 2, 4, 3, 2, 0, 1],
  ];

  const getColorClass = (count: number) => {
    if (count === 0) return 'bg-slate-100';
    if (count === 1) return 'bg-emerald-100';
    if (count === 2) return 'bg-emerald-300';
    if (count === 3) return 'bg-emerald-500';
    return 'bg-emerald-700';
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      {/* Navbar */}
      <nav className="h-16 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between shrink-0">
        <Link to="/dashboard" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-bold transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </Link>
        <span className="font-extrabold text-slate-900 text-lg">Progress Analytics</span>
        <div className="w-10 h-10" />
      </nav>

      {/* Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 md:p-8 space-y-8">
        
        {/* Certificate Card Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-6 md:p-8 text-white shadow-xl shadow-blue-500/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-2 relative z-10">
            <span className="bg-white/20 text-white font-bold text-xs uppercase tracking-wider px-3.5 py-1 rounded-full">
              Literacy Certification
            </span>
            <h1 className="text-3xl font-black tracking-tight">Earn Your Official Completion Certificate</h1>
            <p className="text-blue-100 font-medium max-w-md">Complete all curriculum lessons to unlock your downloadable verification PDF.</p>
          </div>

          <button
            onClick={() => setShowCertModal(true)}
            className="bg-white hover:bg-slate-100 text-blue-700 font-black px-6 py-3.5 rounded-2xl flex items-center gap-2 shadow-lg transition-all active:scale-95 shrink-0 cursor-pointer text-sm"
          >
            <Download className="w-5 h-5 text-blue-600" />
            <span>Generate Certificate</span>
          </button>
        </div>

        {/* AI Recommendations card */}
        <div className="bg-blue-50 border border-blue-100 p-6 rounded-3xl space-y-3">
          <h4 className="text-xs font-black text-blue-800 uppercase tracking-wide flex items-center gap-1.5">
            <Sparkles className="w-4.5 h-4.5" />
            <span>AI Progress Review Recommendation</span>
          </h4>
          <p className="text-sm font-semibold text-slate-800 leading-relaxed">
            Based on your scores, we recommend spending <b>20 minutes today reviewing Grammar Basics</b> and practicing speaking list syllables to increase your voice confidence metrics!
          </p>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card 1: Reading Growth Line Chart */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-extrabold text-slate-900 text-base">Reading Growth Score</h3>
              <span className="text-xs text-blue-600 font-bold bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">Line Chart</span>
            </div>

            {/* Custom SVG Line Chart */}
            <div className="h-64 flex items-end justify-center relative pt-4">
              <svg className="w-full h-full" viewBox="0 0 500 220">
                {/* Horizontal Gridlines */}
                <line x1="50" y1="20" x2="480" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="50" y1="70" x2="480" y2="70" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="50" y1="120" x2="480" y2="120" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="50" y1="170" x2="480" y2="170" stroke="#f1f5f9" strokeWidth="1" />

                {/* Score Labels on Y Axis */}
                <text x="15" y="25" className="text-[10px] font-bold text-slate-400" fill="currentColor">100%</text>
                <text x="15" y="75" className="text-[10px] font-bold text-slate-400" fill="currentColor">75%</text>
                <text x="15" y="125" className="text-[10px] font-bold text-slate-400" fill="currentColor">50%</text>
                <text x="15" y="175" className="text-[10px] font-bold text-slate-400" fill="currentColor">25%</text>

                {/* Growth Path Line */}
                <path
                  d="M 60,170 Q 140,150 200,120 T 340,70 T 460,40"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                {/* Plot Points */}
                <circle cx="60" cy="170" r="5" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
                <circle cx="150" cy="140" r="5" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
                <circle cx="240" cy="100" r="5" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
                <circle cx="340" cy="70" r="5" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
                <circle cx="460" cy="40" r="5" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />

                {/* X Axis Labels */}
                <text x="50" y="205" className="text-[10px] font-bold text-slate-400" fill="currentColor">Week 1</text>
                <text x="140" y="205" className="text-[10px] font-bold text-slate-400" fill="currentColor">Week 2</text>
                <text x="230" y="205" className="text-[10px] font-bold text-slate-400" fill="currentColor">Week 3</text>
                <text x="330" y="205" className="text-[10px] font-bold text-slate-400" fill="currentColor">Week 4</text>
                <text x="440" y="205" className="text-[10px] font-bold text-slate-400" fill="currentColor">Week 5</text>
              </svg>
            </div>
          </div>

          {/* Card 2: Writing Submissions Bar Chart */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-extrabold text-slate-900 text-base">Writing Words count</h3>
              <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">Bar Chart</span>
            </div>

            {/* Custom SVG Bar Chart */}
            <div className="h-64 flex items-end justify-center relative pt-4">
              <svg className="w-full h-full" viewBox="0 0 500 220">
                {/* Horizontal Gridlines */}
                <line x1="50" y1="20" x2="480" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="50" y1="95" x2="480" y2="95" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="50" y1="170" x2="480" y2="170" stroke="#f1f5f9" strokeWidth="1" />

                {/* Score Labels on Y Axis */}
                <text x="15" y="25" className="text-[10px] font-bold text-slate-400" fill="currentColor">100w</text>
                <text x="15" y="100" className="text-[10px] font-bold text-slate-400" fill="currentColor">50w</text>
                <text x="15" y="175" className="text-[10px] font-bold text-slate-400" fill="currentColor">0w</text>

                {/* Bar 1 */}
                <rect x="70" y="110" width="35" height="60" rx="6" fill="#10b981" />
                <text x="75" y="100" className="text-[10px] font-black text-slate-700" fill="currentColor">40w</text>

                {/* Bar 2 */}
                <rect x="150" y="80" width="35" height="90" rx="6" fill="#10b981" />
                <text x="155" y="70" className="text-[10px] font-black text-slate-700" fill="currentColor">60w</text>

                {/* Bar 3 */}
                <rect x="230" y="50" width="35" height="120" rx="6" fill="#10b981" />
                <text x="235" y="40" className="text-[10px] font-black text-slate-700" fill="currentColor">80w</text>

                {/* Bar 4 */}
                <rect x="310" y="95" width="35" height="75" rx="6" fill="#10b981" />
                <text x="315" y="85" className="text-[10px] font-black text-slate-700" fill="currentColor">50w</text>

                {/* Bar 5 */}
                <rect x="390" y="35" width="35" height="135" rx="6" fill="#10b981" />
                <text x="395" y="25" className="text-[10px] font-black text-slate-700" fill="currentColor">90w</text>

                {/* X Axis Labels */}
                <text x="75" y="200" className="text-[10px] font-bold text-slate-400" fill="currentColor">Mon</text>
                <text x="155" y="200" className="text-[10px] font-bold text-slate-400" fill="currentColor">Tue</text>
                <text x="235" y="200" className="text-[10px] font-bold text-slate-400" fill="currentColor">Wed</text>
                <text x="315" y="200" className="text-[10px] font-bold text-slate-400" fill="currentColor">Thu</text>
                <text x="395" y="200" className="text-[10px] font-bold text-slate-400" fill="currentColor">Fri</text>
              </svg>
            </div>
          </div>

          {/* Card 3: Speaking Capabilities Radar Chart */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-extrabold text-slate-900 text-base">Speaking Fluency Dimensions</h3>
              <span className="text-xs text-amber-600 font-bold bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100">Radar Plot</span>
            </div>

            {/* Custom SVG Radar Chart */}
            <div className="h-64 flex items-center justify-center relative">
              <svg className="w-64 h-64" viewBox="0 0 200 200">
                {/* Outer Web Polygons */}
                <polygon points="100,20 180,100 100,180 20,100" fill="none" stroke="#f1f5f9" strokeWidth="1" />
                <polygon points="100,40 160,100 100,160 40,100" fill="none" stroke="#f1f5f9" strokeWidth="1" />
                <polygon points="100,60 140,100 100,140 60,100" fill="none" stroke="#f1f5f9" strokeWidth="1" />
                <polygon points="100,80 120,100 100,120 80,100" fill="none" stroke="#f1f5f9" strokeWidth="1" />

                {/* Axes */}
                <line x1="100" y1="20" x2="100" y2="180" stroke="#f1f5f9" strokeWidth="1.5" />
                <line x1="20" y1="100" x2="180" y2="100" stroke="#f1f5f9" strokeWidth="1.5" />

                {/* Labels */}
                <text x="100" y="15" className="text-[9px] font-black text-slate-500 text-center" textAnchor="middle" fill="currentColor">Confidence</text>
                <text x="185" y="103" className="text-[9px] font-black text-slate-500" fill="currentColor">Fluency</text>
                <text x="100" y="195" className="text-[9px] font-black text-slate-500 text-center" textAnchor="middle" fill="currentColor">Pronunciation</text>
                <text x="5" y="103" className="text-[9px] font-black text-slate-500" fill="currentColor">Speed</text>

                {/* Filled Radar Score Area */}
                {/* Confidence: 82% (100,20 - 100,100), Fluency: 90%, Pronunciation: 88%, Speed: 75% */}
                <polygon
                  points="100,34 172,100 100,170 40,100"
                  fill="rgba(245, 158, 11, 0.2)"
                  stroke="#f59e0b"
                  strokeWidth="2.5"
                />

                {/* Data Points */}
                <circle cx="100" cy="34" r="3.5" fill="#f59e0b" />
                <circle cx="172" cy="100" r="3.5" fill="#f59e0b" />
                <circle cx="100" cy="170" r="3.5" fill="#f59e0b" />
                <circle cx="40" cy="100" r="3.5" fill="#f59e0b" />
              </svg>
            </div>
          </div>

          {/* Card 4: Daily Activity Calendar Heatmap */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-1.5">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span>Daily Activity logs</span>
              </h3>
              <p className="text-slate-400 font-semibold text-xs mt-1">Study frequencies over the last 4 weeks.</p>
            </div>

            <div className="space-y-4 py-4">
              <div className="grid grid-cols-7 gap-2 max-w-sm mx-auto">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <div key={day} className="text-[10px] font-bold text-slate-400 text-center uppercase tracking-wider">{day}</div>
                ))}

                {activityData.map((week, wIdx) => (
                  week.map((dayVal, dIdx) => (
                    <div
                      key={`${wIdx}-${dIdx}`}
                      className={`h-9 w-full rounded-lg transition-colors border border-white hover:scale-105 cursor-help ${getColorClass(dayVal)}`}
                      title={`${dayVal} tasks finished`}
                    />
                  ))
                ))}
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400">
                <span>Less</span>
                <div className="w-4.5 h-4.5 bg-slate-100 rounded" />
                <div className="w-4.5 h-4.5 bg-emerald-100 rounded" />
                <div className="w-4.5 h-4.5 bg-emerald-300 rounded" />
                <div className="w-4.5 h-4.5 bg-emerald-500 rounded" />
                <div className="w-4.5 h-4.5 bg-emerald-700 rounded" />
                <span>More</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Download Certificate Modal Simulation */}
      {showCertModal && (
        <div className="fixed inset-0 z-50 backdrop-blur bg-slate-900/60 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white max-w-2xl w-full p-8 md:p-12 rounded-3xl border-8 border-double border-blue-900 shadow-2xl relative space-y-8 text-center text-slate-800">
            {/* Seal / Decorative Top Ribbon */}
            <div className="w-16 h-16 bg-amber-500 text-white rounded-full flex items-center justify-center mx-auto text-3xl shadow-lg border-2 border-white">
              🏅
            </div>

            <div className="space-y-3">
              <p className="text-xs font-black text-blue-900 uppercase tracking-widest">Certificate of Literacy Excellence</p>
              <h2 className="text-3xl font-serif font-black text-slate-950">NeoLit AI Literacy Platform</h2>
            </div>

            <p className="text-slate-500 text-sm font-semibold italic">This is proudly presented to verify completion of training:</p>

            <h3 className="text-2xl font-black text-blue-700 tracking-wide font-serif py-1.5 border-b border-slate-100 max-w-sm mx-auto">
              {profile?.fullName || username}
            </h3>

            <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto">
              Having successfully cleared the Initial Assessment, completed all syllabus reading guides, finished speech recognition speaking loops, and achieved intermediate level goals.
            </p>

            {/* Signatures */}
            <div className="grid grid-cols-2 gap-8 pt-8 max-w-md mx-auto">
              <div className="border-t border-slate-200 pt-2 text-center text-[10px] font-bold text-slate-500">
                <p className="font-extrabold text-slate-800 italic">Neo Tutor AI</p>
                <p>AI Engine Systems Manager</p>
              </div>
              <div className="border-t border-slate-200 pt-2 text-center text-[10px] font-bold text-slate-500">
                <p className="font-extrabold text-slate-800 italic">NeoLit Org</p>
                <p>Curriculum Coordinator Director</p>
              </div>
            </div>

            <div className="flex justify-center gap-4 pt-4 shrink-0">
              <button
                onClick={() => {
                  alert('Certificate downloaded to device! (Simulated PDF download successful)');
                  setShowCertModal(false);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm px-6 py-3 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
              >
                Download PDF
              </button>
              <button
                onClick={() => setShowCertModal(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-sm px-6 py-3 rounded-xl transition-all border border-slate-200 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
