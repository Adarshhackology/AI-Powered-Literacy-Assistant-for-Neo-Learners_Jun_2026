import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { apiClient } from '../utils/api';
import { 
  ArrowLeft, Volume2, Bookmark, CheckCircle, 
  MessageSquare, Send, Edit
} from 'lucide-react';
import { Sparkle, AIRobotMascot } from '../components/UI/Illustrations';

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

        const bookmarks = JSON.parse(localStorage.getItem(`bookmark_${username}`) || '[]');
        setIsBookmarked(bookmarks.includes(lessonId));

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
      <div style={{ minHeight: '100vh', background: '#1A0A4E', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: 'Poppins', fontWeight: 900 }}>
        Loading lesson...
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
        
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        user.profile = updatedProfile;
        localStorage.setItem('user', JSON.stringify(user));
      }
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      navigate('/dashboard');
    }
  };

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

        {/* Top Glass Nav Bar */}
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

          <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '18px', color: '#1e1040' }}>
            NeoLit Lesson Player
          </span>

          <button
            onClick={handleBookmarkToggle}
            className="btn-3d"
            style={{
              width: '40px', height: '40px', borderRadius: '12px',
              background: isBookmarked ? '#FEF3C7' : '#F8FAFF',
              border: isBookmarked ? '1.5px solid #F59E0B' : '1.5px solid #E8EFFF',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: isBookmarked ? '#D97706' : '#94A3B8',
              cursor: 'pointer',
            }}
            title="Bookmark lesson"
          >
            <Bookmark className="w-5 h-5 fill-current" />
          </button>
        </nav>

        {/* Main Lesson Workspace Card */}
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '28px',
          padding: '32px',
          border: '2px solid rgba(255,255,255,0.6)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          display: 'flex', flexDirection: 'column', gap: '20px',
        }}>
          
          {/* Tags & Title */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                background: 'linear-gradient(135deg, #6C4CFF, #8A5CFF)', color: 'white',
                fontFamily: 'Poppins', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase',
                padding: '4px 12px', borderRadius: '99px',
              }}>
                {lesson.category}
              </span>
              <span style={{
                background: '#F1F5F9', color: '#475569',
                fontFamily: 'Poppins', fontWeight: 700, fontSize: '11px',
                padding: '4px 12px', borderRadius: '99px',
              }}>
                Est: {lesson.time}
              </span>
              <span style={{
                background: '#F1F5F9', color: '#475569',
                fontFamily: 'Poppins', fontWeight: 700, fontSize: '11px',
                padding: '4px 12px', borderRadius: '99px',
              }}>
                Difficulty: {lesson.difficulty}
              </span>
            </div>
            <h1 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '28px', color: '#1e1040', margin: 0, lineHeight: 1.2 }}>
              {lesson.title}
            </h1>
          </div>

          {/* Listen & Read Along Audio Card */}
          <div style={{
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #4D9DFF 0%, #6C4CFF 100%)',
            padding: '20px 24px',
            color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px',
            boxShadow: '0 10px 30px rgba(77,157,255,0.35)',
          }}>
            <div>
              <h4 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '18px', margin: '0 0 4px', color: 'white' }}>Listen & Read Along</h4>
              <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '13px', margin: 0, color: 'rgba(255,255,255,0.9)' }}>
                Hear the correct pronunciation of words below.
              </p>
            </div>
            <button
              onClick={handleSpeak}
              className="btn-3d"
              style={{
                width: '56px', height: '56px', borderRadius: '50%',
                background: 'white', border: 'none',
                color: '#6C4CFF', display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 8px 20px rgba(0,0,0,0.15)', cursor: 'pointer', flexShrink: 0,
              }}
            >
              <Volume2 className="w-7 h-7 fill-current text-indigo-600" />
            </button>
          </div>

          {/* Lesson Content */}
          <div style={{
            background: '#F8FAFF',
            borderRadius: '20px',
            border: '1.5px solid #E8EFFF',
            padding: '24px',
            display: 'flex', flexDirection: 'column', gap: '16px',
          }}>
            <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '17px', color: '#1e1040', lineHeight: 1.7 }}>
              {lesson.content}
            </div>

            {lesson.examples && lesson.examples.length > 0 && (
              <div style={{ background: 'white', border: '1px solid #E8EFFF', padding: '16px', borderRadius: '16px', marginTop: '8px' }}>
                <h4 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', margin: '0 0 10px' }}>Key Examples</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  {lesson.examples.map((ex: string, idx: number) => (
                    <div key={idx} style={{ background: '#F8FAFF', border: '1px solid #E8EFFF', padding: '10px', borderRadius: '12px', fontFamily: 'Poppins', fontWeight: 800, fontSize: '13px', color: '#1e1040', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#EDE7F6', color: '#6C4CFF', fontSize: '11px', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {idx + 1}
                      </span>
                      <span>{ex}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Bar (Notes Workspace & Mark Complete) */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px', borderTop: '2px solid #F1F5F9', paddingTop: '16px' }}>
            <button
              onClick={() => setIsNotesOpen(!isNotesOpen)}
              className="btn-3d"
              style={{
                background: '#F1F5F9', color: '#475569',
                fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px',
                padding: '12px 20px', borderRadius: '14px', border: 'none',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
              }}
            >
              <Edit className="w-4 h-4" />
              <span>Notes Workspace</span>
            </button>

            <button
              onClick={handleMarkComplete}
              className="btn-3d"
              style={{
                background: 'linear-gradient(135deg, #FFD54A, #FF9F43)',
                color: '#1e1040',
                fontFamily: 'Poppins', fontWeight: 900, fontSize: '15px',
                padding: '14px 32px', borderRadius: '16px',
                border: 'none', borderBottom: '4px solid #E8A000',
                cursor: 'pointer', boxShadow: '0 8px 24px rgba(255,213,74,0.5)',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}
            >
              <CheckCircle className="w-5 h-5" />
              <span>Mark Lesson Complete</span>
            </button>
          </div>

          {/* Notes Sidebar block */}
          {isNotesOpen && (
            <div style={{ background: '#FFFDF0', border: '1.5px solid #FFE082', borderRadius: '18px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '14px', color: '#1e1040', margin: 0 }}>Lesson Notes</h4>
                <span style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '11px', color: '#D97706' }}>Auto-saved to device</span>
              </div>
              <textarea
                value={notes}
                onChange={handleNotesChange}
                style={{
                  width: '100%', height: '100px', padding: '12px', background: 'white',
                  border: '1px solid #FFE082', borderRadius: '12px', outline: 'none',
                  fontFamily: 'Nunito', fontWeight: 700, fontSize: '13px', color: '#1e1040',
                }}
                placeholder="Write your study notes, spellings or summaries here..."
              />
            </div>
          )}

        </div>

        {/* Floating AI Chat Assistant Window */}
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 50, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          {isChatOpen && (
            <div style={{
              width: '340px', height: '440px', background: 'white',
              borderRadius: '24px', border: '1.5px solid #E8EFFF',
              boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
              display: 'flex', flexDirection: 'column', marginBottom: '12px',
              overflow: 'hidden',
            }}>
              {/* Header */}
              <div style={{ background: 'linear-gradient(135deg, #6C4CFF, #8A5CFF)', color: 'white', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🤖</div>
                  <div>
                    <h4 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px', margin: 0, color: 'white' }}>AI Tutor Doubts Portal</h4>
                    <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '10px', color: 'rgba(255,255,255,0.8)', margin: 0 }}>Active now</p>
                  </div>
                </div>
                <button onClick={() => setIsChatOpen(false)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '18px', cursor: 'pointer', fontWeight: 900 }}>✕</button>
              </div>

              {/* Chat Message Lists */}
              <div style={{ flex: 1, padding: '14px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', background: '#F8FAFF' }}>
                {chatMessages.map((msg, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                    <div style={{
                      padding: '10px 14px', borderRadius: '14px', maxWidth: '80%',
                      fontFamily: 'Nunito', fontWeight: 700, fontSize: '12px', lineHeight: 1.4,
                      background: msg.sender === 'user' ? '#6C4CFF' : 'white',
                      color: msg.sender === 'user' ? 'white' : '#1e1040',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                      border: msg.sender === 'user' ? 'none' : '1px solid #E8EFFF',
                    }}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {chatLoading && (
                  <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <div style={{ background: 'white', color: '#94A3B8', padding: '10px 14px', borderRadius: '14px', fontFamily: 'Nunito', fontWeight: 700, fontSize: '11px', border: '1px solid #E8EFFF' }}>
                      typing response...
                    </div>
                  </div>
                )}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSendMessage} style={{ padding: '10px 12px', background: 'white', borderTop: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask a doubt (e.g. 'What is a noun?')"
                  style={{ flex: 1, background: '#F8FAFF', border: '1px solid #E8EFFF', padding: '8px 12px', borderRadius: '12px', outline: 'none', fontFamily: 'Nunito', fontWeight: 700, fontSize: '12px', color: '#1e1040' }}
                />
                <button type="submit" style={{ width: '36px', height: '36px', borderRadius: '12px', background: '#6C4CFF', border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* Toggle Button */}
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="btn-3d"
            style={{
              background: 'linear-gradient(135deg, #6C4CFF, #8A5CFF)',
              color: 'white', fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px',
              padding: '12px 20px', borderRadius: '99px', border: 'none',
              borderBottom: '3.5px solid rgba(0,0,0,0.3)',
              boxShadow: '0 8px 24px rgba(108,76,255,0.4)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
            }}
          >
            <MessageSquare className="w-5 h-5" />
            <span>Ask Doubts</span>
          </button>
        </div>

      </div>
    </div>
  );
}
