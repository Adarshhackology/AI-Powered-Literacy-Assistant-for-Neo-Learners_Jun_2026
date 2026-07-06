import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { apiClient } from '../utils/api';
import { 
  ArrowLeft, Volume2, BookOpen, Bookmark, CheckCircle, 
  MessageSquare, Sparkles, Send, Edit, ChevronLeft, ChevronRight 
} from 'lucide-react';

export default function LessonView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const lessonId = parseInt(id || '1');
  const username = localStorage.getItem('username') || 'guest';

  const [lessons, setLessons] = useState<any[]>([]);
  const [lesson, setLesson] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  
  // Bookmarks & Notes state
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [notes, setNotes] = useState('');
  const [isNotesOpen, setIsNotesOpen] = useState(false);

  // Chat window state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<any[]>([
    { sender: 'ai', text: 'Hello! I am your AI tutor. Ask me any doubts about this lesson!' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const less = await apiClient.getLessons();
        setLessons(less);
        const current = less.find(l => l.id === lessonId) || less[0];
        setLesson(current);

        const prof = await apiClient.getProfile(username);
        setProfile(prof);

        // Load bookmark state
        const bookmarks = JSON.parse(localStorage.getItem(`bookmark_${username}`) || '[]');
        setIsBookmarked(bookmarks.includes(lessonId));

        // Load notes state
        const savedNotes = localStorage.getItem(`notes_${username}_${lessonId}`) || '';
        setNotes(savedNotes);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [lessonId, username]);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="font-extrabold text-slate-500">Loading lesson...</p>
      </div>
    );
  }

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(lesson.audioText || lesson.content);
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text to speech not supported in this browser.');
    }
  };

  const handleBookmarkToggle = () => {
    const bookmarks = JSON.parse(localStorage.getItem(`bookmark_${username}`) || '[]');
    let updated;
    if (isBookmarked) {
      updated = bookmarks.filter((b: number) => b !== lessonId);
    } else {
      updated = [...bookmarks, lessonId];
    }
    localStorage.setItem(`bookmark_${username}`, JSON.stringify(updated));
    setIsBookmarked(!isBookmarked);
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setNotes(val);
    localStorage.setItem(`notes_${username}_${lessonId}`, val);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() === '') return;

    const userMsg = { sender: 'user', text: inputMessage };
    setChatMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setChatLoading(true);

    // Simulate AI response based on keyword matching
    setTimeout(() => {
      let reply = "That is a great question! Feel free to ask me to simplify any word or phrase in Hindi or other regional language.";
      
      const query = inputMessage.toLowerCase();
      if (query.includes('verb')) {
        reply = "A verb is an action word! Like: Run, Speak, Write. In Hindi we call it 'Kriya' (क्रिया). Example: 'Ram eats apple' -> eats is the verb.";
      } else if (query.includes('noun')) {
        reply = "A noun is a naming word. It names a person, place or thing. In Hindi, it is 'Sangya' (संज्ञा). Example: 'Adarsh' or 'Delhi' are nouns.";
      } else if (query.includes('sound') || query.includes('/æ/')) {
        reply = "The sound /æ/ is short a sound, like in Apple, Cat, or Bat. It sounds like 'ऐ' in Hindi.";
      } else if (query.includes('morals') || query.includes('crow')) {
        reply = "The moral of the thirsty crow is 'Where there is a will, there is a way'. It means if you are determined to learn, you will find a way!";
      }

      setChatMessages(prev => [...prev, { sender: 'ai', text: reply }]);
      setChatLoading(false);
    }, 1000);
  };

  const handleMarkComplete = async () => {
    try {
      const updatedProfile = await apiClient.completeLesson(username, lessonId, 10, 5);
      if (updatedProfile) {
        setProfile(updatedProfile);
        
        // Update user state locally
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        user.profile = updatedProfile;
        localStorage.setItem('user', JSON.stringify(user));
      }
      // Go back to dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative text-slate-800">
      {/* Navbar */}
      <nav className="h-16 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-bold transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </Link>
        <span className="font-extrabold text-slate-900 text-lg">NeoLit Lesson Player</span>
        <div className="flex items-center gap-3">
          <button
            onClick={handleBookmarkToggle}
            className={`w-10 h-10 border rounded-xl flex items-center justify-center transition-all ${
              isBookmarked 
                ? 'border-amber-200 bg-amber-50 text-amber-500' 
                : 'border-slate-100 hover:bg-slate-50 text-slate-400'
            }`}
            title="Bookmark lesson"
          >
            <Bookmark className="w-5 h-5 fill-current" />
          </button>
        </div>
      </nav>

      {/* Main Workspace split */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0 relative">
        <div className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6 max-w-4xl mx-auto">
          {/* Header */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                {lesson.category}
              </span>
              <span className="bg-slate-100 text-slate-500 text-xs font-bold px-3 py-1 rounded-full">
                Est: {lesson.time}
              </span>
              <span className="bg-slate-100 text-slate-500 text-xs font-bold px-3 py-1 rounded-full">
                Difficulty: {lesson.difficulty}
              </span>
            </div>
            <h1 className="text-3xl font-black text-slate-950 tracking-tight leading-tight">{lesson.title}</h1>
          </div>

          {/* Player controls */}
          <div className="bg-blue-600 text-white p-6 rounded-3xl shadow-lg flex items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="font-extrabold text-base">Listen & Read Along</h4>
              <p className="text-blue-100 text-xs font-medium">Hear the correct pronunciation of words below.</p>
            </div>
            <button
              onClick={handleSpeak}
              className="w-14 h-14 bg-white text-blue-600 rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer"
            >
              <Volume2 className="w-6 h-6 fill-current text-blue-600" />
            </button>
          </div>

          {/* Lesson Text Content */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
            <div className="prose max-w-none text-slate-800 leading-relaxed text-lg font-serif">
              {lesson.content}
            </div>

            {lesson.examples && lesson.examples.length > 0 && (
              <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-3">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-wide">Key Examples</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {lesson.examples.map((ex: string, idx: number) => (
                    <div key={idx} className="bg-white border border-slate-100 p-3.5 rounded-xl font-bold text-sm text-slate-800 flex items-center gap-2">
                      <span className="w-5 h-5 bg-blue-50 text-blue-600 text-xs font-black rounded-full flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span>{ex}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actions Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
            <button
              onClick={() => setIsNotesOpen(!isNotesOpen)}
              className="w-full sm:w-auto bg-white border border-slate-200 text-slate-700 font-extrabold text-sm px-6 py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-sm hover:bg-slate-50 transition-all cursor-pointer"
            >
              <Edit className="w-5 h-5" />
              <span>Notes Workspace</span>
            </button>

            <div className="flex items-center gap-4 w-full sm:w-auto">
              <button
                onClick={handleMarkComplete}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm px-8 py-3.5 rounded-2xl shadow-xl shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle className="w-5 h-5" />
                <span>Mark Lesson Complete</span>
              </button>
            </div>
          </div>

          {/* Notes Sidebar block */}
          {isNotesOpen && (
            <div className="bg-amber-50/50 border border-amber-100 rounded-3xl p-6 space-y-3 animate-fade-in">
              <div className="flex justify-between items-center">
                <h4 className="font-extrabold text-slate-900 text-base">Lesson Notes</h4>
                <span className="text-xs text-amber-600 font-bold">Auto-saved to device</span>
              </div>
              <textarea
                value={notes}
                onChange={handleNotesChange}
                className="w-full h-32 p-4 bg-white border border-amber-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-400 text-slate-800 font-semibold"
                placeholder="Write your study notes, spellings or summaries here..."
              />
            </div>
          )}
        </div>

        {/* Floating AI Chat Assistant Window */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
          {isChatOpen ? (
            <div className="w-[360px] h-[480px] bg-white border border-slate-100 rounded-3xl shadow-2xl flex flex-col mb-4 overflow-hidden animate-fade-in">
              {/* Header */}
              <div className="bg-blue-600 text-white p-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-lg">🤖</div>
                  <div>
                    <h4 className="font-extrabold text-sm">AI Tutor Doubts Portal</h4>
                    <p className="text-[10px] text-blue-100 font-semibold">Active now</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="text-white hover:text-blue-100 text-lg font-bold px-2"
                >
                  ✕
                </button>
              </div>

              {/* Chat Message Lists */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50 text-xs">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-3 rounded-2xl max-w-[80%] font-semibold leading-relaxed shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {chatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white text-slate-500 p-3 border border-slate-100 rounded-2xl rounded-tl-none font-bold animate-pulse">
                      typing response...
                    </div>
                  </div>
                )}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-100 bg-white flex items-center gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask a doubt (e.g. 'What is a noun?')"
                  className="flex-1 bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl text-xs font-semibold focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-md cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          ) : null}

          {/* Toggle Button */}
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold p-4 rounded-full shadow-2xl flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95 transition-all"
            title="Ask AI Tutor"
          >
            <MessageSquare className="w-6 h-6" />
            {!isChatOpen && <span className="text-sm pr-1">Ask doubts</span>}
          </button>
        </div>
      </div>
    </div>
  );
}
