import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Volume2, Mic, CheckCircle, Sparkles, Trophy, 
  Gamepad2, Play, RefreshCw, Star, Flame, Award, Heart, HelpCircle
} from 'lucide-react';
import { apiClient } from '../utils/api';
import { Sparkle, CoinSVG, XPGem, RobotMascot, DragonMascot } from '../components/UI/Illustrations';

interface GameItem {
  id: string;
  title: string;
  category: 'reading' | 'writing' | 'speaking' | 'mixed';
  icon: string;
  badge?: string;
  description: string;
  xpReward: number;
  coinReward: number;
  color: string;
}

const gamesList: GameItem[] = [
  // 📖 Reading Games
  { id: 'picture_detective', title: '1. Picture Detective', category: 'reading', icon: '🔍', badge: 'POPULAR', description: 'Match spoken words with cute picture cards in a 2x2 grid.', xpReward: 15, coinReward: 5, color: '#6C4CFF' },
  { id: 'magic_reading', title: '2. Magic Reading Adventure', category: 'reading', icon: '📖', badge: 'AI TUTOR', description: 'Improve reading fluency with AI word highlighting & live speech.', xpReward: 20, coinReward: 8, color: '#FF4FA3' },
  { id: 'word_hunter', title: '3. Word Hunter', category: 'reading', icon: '🌲', description: 'Find target words hidden inside an illustrated forest scene.', xpReward: 15, coinReward: 5, color: '#22C55E' },
  { id: 'story_builder', title: '4. Story Builder', category: 'reading', icon: '🏰', description: 'Fill missing words inside short illustrated fairytale stories.', xpReward: 18, coinReward: 6, color: '#3B82F6' },
  { id: 'reading_race', title: '5. Reading Race', category: 'reading', icon: '🏎️', badge: 'TIMED', description: 'Timed 30-sec reading challenge! Speed & accuracy scoring.', xpReward: 25, coinReward: 10, color: '#F97316' },

  // ✍️ Writing Games
  { id: 'drag_drop_sentence', title: '6. Drag & Drop Sentence', category: 'writing', icon: '🧩', badge: 'HOT', description: 'Arrange shuffled word chips into the correct grammar order.', xpReward: 15, coinReward: 5, color: '#8B5CF6' },
  { id: 'missing_letter', title: '7. Missing Letter', category: 'writing', icon: '✏️', description: 'Complete partially hidden words (e.g. A _ P L E).', xpReward: 12, coinReward: 4, color: '#EC4899' },
  { id: 'build_word', title: '8. Build the Word', category: 'writing', icon: '🔤', description: 'Drag letters onto empty slots for 3, 5, and 8+ letter words.', xpReward: 15, coinReward: 5, color: '#10B981' },
  { id: 'spell_bee', title: '9. Spell Bee Challenge', category: 'writing', icon: '🐝', badge: 'VOICE', description: 'AI speaks a word out loud. Type or drag to spell it correctly.', xpReward: 20, coinReward: 8, color: '#F59E0B' },
  { id: 'emoji_sentence', title: '10. Emoji Sentence', category: 'writing', icon: '🍎', description: 'Convert emojis into complete written sentences.', xpReward: 18, coinReward: 6, color: '#EF4444' },
  { id: 'crossword', title: '11. Crossword Challenge', category: 'writing', icon: '📝', description: 'Kid-friendly crossword puzzle with picture clues.', xpReward: 25, coinReward: 10, color: '#06B6D4' },
  { id: 'unscramble', title: '12. Unscramble Words', category: 'writing', icon: '🌀', description: 'Arrange jumbled letters to unlock hidden vocabulary words.', xpReward: 15, coinReward: 5, color: '#6366F1' },

  // 🎤 Speaking Games
  { id: 'repeat_neo', title: '16. Repeat After Neo', category: 'speaking', icon: '🤖', badge: 'AI MASCOT', description: 'AI speaks a phrase. Repeat into mic for instant accuracy score.', xpReward: 20, coinReward: 8, color: '#6C4CFF' },
  { id: 'echo_challenge', title: '17. Echo Challenge', category: 'speaking', icon: '🔊', description: 'Echo back increasingly difficult vocabulary words clearly.', xpReward: 15, coinReward: 5, color: '#3B82F6' },
  { id: 'tongue_twister', title: '18. Tongue Twister', category: 'speaking', icon: '👅', badge: 'FUN', description: 'Master fun tongue twisters across 3 difficulty levels!', xpReward: 22, coinReward: 9, color: '#FF4FA3' },
  { id: 'speak_picture', title: '19. Speak the Picture', category: 'speaking', icon: '📸', description: 'An image appears. Speak its name out loud into the mic.', xpReward: 18, coinReward: 6, color: '#10B981' },
  { id: 'ai_conversation', title: '21. AI Conversation', category: 'speaking', icon: '💬', badge: 'LIVE CHAT', description: 'Interactive voice chat with Neo! Talk about weather, food & school.', xpReward: 30, coinReward: 12, color: '#F59E0B' },

  // 🎮 Mixed Learning Games
  { id: 'word_catcher', title: '24. Word Catcher', category: 'mixed', icon: '🧺', description: 'Catch falling correct words into your basket before time runs out!', xpReward: 15, coinReward: 5, color: '#EC4899' },
  { id: 'memory_match', title: '25. Memory Match', category: 'mixed', icon: '🃏', badge: 'ARCADE', description: 'Flip & match identical vocabulary cards in fewest moves.', xpReward: 15, coinReward: 5, color: '#8B5CF6' },
  { id: 'ninja_reading', title: '26. Speed Reading Ninja', category: 'mixed', icon: '🥷', description: 'Slice correct vocabulary words like a true reading ninja!', xpReward: 20, coinReward: 8, color: '#EF4444' },
  { id: 'boss_battle', title: '27. AI Boss Battle', category: 'mixed', icon: '👾', badge: 'BOSS', description: 'Defeat the Word Dragon Boss by answering quiz questions correctly!', xpReward: 50, coinReward: 20, color: '#8A5CFF' },
];

export default function LearnGames() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'learner';

  const [categoryFilter, setCategoryFilter] = useState<'all' | 'reading' | 'writing' | 'speaking' | 'mixed'>('all');
  const [profile, setProfile] = useState<any>({ xp: 450, coins: 120, streak: 12 });
  const [activeGame, setActiveGame] = useState<GameItem | null>(null);

  // Playable Mini-game state
  const [gameStep, setGameStep] = useState<number>(0);
  const [userScore, setUserScore] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const prof = await apiClient.getProfile(username);
        if (prof) setProfile(prof);
      } catch (err) {
        console.error(err);
      }
    };
    loadProfile();
  }, [username]);

  const filteredGames = gamesList.filter(g => categoryFilter === 'all' || g.category === categoryFilter);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleLaunchGame = (game: GameItem) => {
    setActiveGame(game);
    setGameStep(0);
    setUserScore(0);
    setFeedback('');
    setSelectedOpt(null);
    setGameCompleted(false);

    if (game.id === 'picture_detective') {
      speakText("Find the Apple!");
    } else if (game.id === 'repeat_neo') {
      speakText("Say: Literacy is Fun!");
    }
  };

  const handlePictureDetectiveAnswer = (ans: string) => {
    setSelectedOpt(ans);
    if (ans === 'Apple') {
      setUserScore(100);
      setFeedback('🎉 Correct! You found the Apple! +15 XP awarded!');
      speakText("Awesome job! That is an Apple!");
      setGameCompleted(true);
      updateProfileXP(15, 5);
    } else {
      setFeedback('❌ Try again! Look for the red fruit.');
      speakText("Try again!");
    }
  };

  const handleDragDropAnswer = (sentence: string) => {
    setSelectedOpt(sentence);
    if (sentence === 'Neo loves reading books') {
      setUserScore(100);
      setFeedback('🎉 Perfect Sentence! +15 XP awarded!');
      speakText("Perfect sentence! Neo loves reading books!");
      setGameCompleted(true);
      updateProfileXP(15, 5);
    }
  };

  const updateProfileXP = async (xpGain: number, coinGain: number) => {
    const updated = {
      ...profile,
      xp: (profile.xp || 0) + xpGain,
      coins: (profile.coins || 0) + coinGain,
    };
    setProfile(updated);
    try {
      await apiClient.saveProfile(username, updated);
    } catch (e) {
      console.error(e);
    }
  };

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

      {/* Background Star Field */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {[
          { t: '5%', l: '8%', s: 12 }, { t: '12%', l: '90%', s: 16 },
          { t: '25%', l: '3%', s: 14 }, { t: '45%', l: '95%', s: 10 },
          { t: '70%', l: '4%', s: 18 }, { t: '88%', l: '92%', s: 14 },
        ].map((st, i) => (
          <div key={i} className="animate-twinkle" style={{ position: 'absolute', top: st.t, left: st.l, opacity: 0.7 }}>
            <Sparkle size={st.s} color={i % 2 === 0 ? '#FFD54A' : '#C4B5F4'} />
          </div>
        ))}
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>

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
            <span>Dashboard</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '22px' }}>🎮</span>
            <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '18px', color: '#1e1040' }}>
              NeoLit Game Arcade
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: '#FFFDF0', border: '1.5px solid #FFD54A', borderRadius: '99px', padding: '4px 14px', fontFamily: 'Poppins', fontWeight: 900, fontSize: '12px', color: '#1e1040' }}>
              🪙 {profile.coins || 120} Coins
            </div>
            <div style={{ background: '#EDE7F6', border: '1.5px solid #6C4CFF', borderRadius: '99px', padding: '4px 14px', fontFamily: 'Poppins', fontWeight: 900, fontSize: '12px', color: '#6C4CFF' }}>
              🏆 {profile.xp || 450} XP
            </div>
          </div>
        </nav>

        {/* Header Banner */}
        <div style={{
          borderRadius: '24px',
          background: 'linear-gradient(135deg, #6C4CFF 0%, #8A5CFF 50%, #FF4FA3 100%)',
          padding: '24px 32px',
          color: 'white',
          textAlign: 'center',
          boxShadow: '0 16px 48px rgba(108,76,255,0.35)',
          border: '2px solid rgba(255,255,255,0.25)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <RobotMascot size={46} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ background: 'rgba(255,255,255,0.2)', padding: '2px 10px', borderRadius: '99px', fontFamily: 'Poppins', fontWeight: 900, fontSize: '10px', display: 'inline-block', marginBottom: '2px' }}>
                AI TUTOR NEO SAYS:
              </div>
              <h1 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '26px', color: 'white', margin: 0, lineHeight: 1.2 }}>
                Welcome to NeoLit Game Arcade! 🎮
              </h1>
            </div>
          </div>
          <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '14px', color: 'rgba(255,255,255,0.9)', margin: 0 }}>
            Master reading, writing & speaking skills through 25+ gamified adventures! Earn XP, Coins, and unlock Stickers!
          </p>
        </div>

        {/* Category Filter Pills */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: '🌟 All Games (22+)', icon: '🎮' },
            { id: 'reading', label: '📖 Reading Games', icon: '📖' },
            { id: 'writing', label: '✍️ Writing & Spelling', icon: '✍️' },
            { id: 'speaking', label: '🎤 Speaking & Voice', icon: '🎤' },
            { id: 'mixed', label: '🎮 Arcade & Boss Battles', icon: '👾' },
          ].map((cat) => {
            const isActive = categoryFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id as any)}
                className="btn-3d"
                style={{
                  background: isActive ? 'linear-gradient(135deg, #FFD54A, #FF9F43)' : 'rgba(255,255,255,0.95)',
                  color: isActive ? '#1e1040' : '#475569',
                  border: isActive ? 'none' : '1.5px solid rgba(255,255,255,0.6)',
                  borderBottom: isActive ? '3.5px solid #E8A000' : '1.5px solid rgba(255,255,255,0.6)',
                  borderRadius: '16px', padding: '10px 20px',
                  fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px',
                  cursor: 'pointer', boxShadow: isActive ? '0 6px 20px rgba(255,213,74,0.4)' : '0 4px 14px rgba(0,0,0,0.06)',
                  transition: 'all 0.15s ease',
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* 3-Column Games Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {filteredGames.map((game) => (
            <div
              key={game.id}
              className="hover-lift"
              style={{
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '24px',
                padding: '24px',
                border: '1.5px solid rgba(255,255,255,0.6)',
                boxShadow: '0 12px 30px rgba(0,0,0,0.1)',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className="animate-bobble" style={{
                    width: '60px', height: '60px', borderRadius: '18px',
                    background: 'linear-gradient(135deg, #EDE7F6, #FFF0F9)',
                    border: '2px solid #E8EFFF', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '32px', boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
                  }}>
                    {game.icon}
                  </div>

                  {game.badge && (
                    <span style={{
                      background: 'linear-gradient(135deg, #FF4FA3, #FF6B35)',
                      color: 'white', fontFamily: 'Poppins', fontWeight: 900, fontSize: '9px',
                      padding: '3px 10px', borderRadius: '99px', letterSpacing: '0.5px',
                    }}>
                      {game.badge}
                    </span>
                  )}
                </div>

                <div>
                  <h3 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '18px', color: '#1e1040', margin: '0 0 4px' }}>
                    {game.title}
                  </h3>
                  <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '12px', color: '#64748B', margin: 0, lineHeight: 1.4 }}>
                    {game.description}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1.5px solid #F1F5F9', paddingTop: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ background: '#EDE7F6', color: '#6C4CFF', fontFamily: 'Poppins', fontWeight: 900, fontSize: '11px', padding: '2px 8px', borderRadius: '99px' }}>
                    +{game.xpReward} XP
                  </span>
                  <span style={{ background: '#FFFDF0', color: '#B45309', fontFamily: 'Poppins', fontWeight: 900, fontSize: '11px', padding: '2px 8px', borderRadius: '99px' }}>
                    +{game.coinReward} 🪙
                  </span>
                </div>

                <button
                  onClick={() => handleLaunchGame(game)}
                  className="btn-3d"
                  style={{
                    background: 'linear-gradient(135deg, #6C4CFF, #8A5CFF)',
                    color: 'white', fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px',
                    padding: '8px 18px', borderRadius: '14px', border: 'none',
                    borderBottom: '3.5px solid #4D2FCC', cursor: 'pointer',
                    boxShadow: '0 6px 18px rgba(108,76,255,0.4)',
                    display: 'flex', alignItems: 'center', gap: '6px',
                  }}
                >
                  <Play className="w-4 h-4 fill-current" /> Play Now
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ── INTERACTIVE PLAYABLE MINI-GAME MODAL ── */}
      {activeGame && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100,
          background: 'rgba(26,10,78,0.85)', backdropFilter: 'blur(16px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
        }}>
          <div style={{
            background: 'white', borderRadius: '28px',
            maxWidth: '640px', width: '100%', padding: '32px',
            border: '2px solid rgba(255,255,255,0.6)',
            boxShadow: '0 24px 72px rgba(0,0,0,0.4)',
            display: 'flex', flexDirection: 'column', gap: '20px',
            position: 'relative',
          }}>
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #F1F5F9', paddingBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '28px' }}>{activeGame.icon}</span>
                <div>
                  <h3 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '20px', color: '#1e1040', margin: 0 }}>{activeGame.title}</h3>
                  <span style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: '12px', color: '#6C4CFF' }}>NeoLit Interactive Challenge</span>
                </div>
              </div>
              <button
                onClick={() => setActiveGame(null)}
                style={{ background: '#F1F5F9', border: 'none', borderRadius: '50%', width: '36px', height: '36px', fontWeight: 900, fontSize: '16px', cursor: 'pointer', color: '#475569' }}
              >
                ✕
              </button>
            </div>

            {/* MINI-GAME 1: PICTURE DETECTIVE */}
            {activeGame.id === 'picture_detective' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center' }}>
                <button onClick={() => speakText("Find the Apple!")} className="btn-3d" style={{ background: '#F0F4FF', border: '1px solid #E8EFFF', color: '#6C4CFF', fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px', padding: '8px 16px', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Volume2 className="w-4 h-4" /> Listen AI Prompt: "Find the Apple"
                </button>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', width: '100%' }}>
                  {[
                    { name: 'Apple', emoji: '🍎', label: 'Apple' },
                    { name: 'Banana', emoji: '🍌', label: 'Banana' },
                    { name: 'Cat', emoji: '🐱', label: 'Cat' },
                    { name: 'Dog', emoji: '🐶', label: 'Dog' },
                  ].map((item) => (
                    <div
                      key={item.name}
                      onClick={() => handlePictureDetectiveAnswer(item.name)}
                      className="hover-lift"
                      style={{
                        background: selectedOpt === item.name ? '#FFFDF0' : '#F8FAFF',
                        border: selectedOpt === item.name ? '2.5px solid #FFD54A' : '1.5px solid #E8EFFF',
                        borderRadius: '20px', padding: '20px', cursor: 'pointer',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                      }}
                    >
                      <span style={{ fontSize: '48px' }}>{item.emoji}</span>
                      <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '16px', color: '#1e1040' }}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MINI-GAME 6: DRAG & DROP SENTENCE */}
            {activeGame.id === 'drag_drop_sentence' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center' }}>
                <p style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '16px', color: '#1e1040', margin: 0 }}>
                  Select the correct sentence order:
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
                  {[
                    'Neo loves reading books',
                    'reading books loves Neo',
                    'books Neo loves reading',
                  ].map((sent) => (
                    <button
                      key={sent}
                      onClick={() => handleDragDropAnswer(sent)}
                      className="hover-lift"
                      style={{
                        background: selectedOpt === sent ? '#FFFDF0' : '#F8FAFF',
                        border: selectedOpt === sent ? '2.5px solid #FFD54A' : '1.5px solid #E8EFFF',
                        borderRadius: '16px', padding: '14px',
                        fontFamily: 'Poppins', fontWeight: 900, fontSize: '15px', color: '#1e1040',
                        cursor: 'pointer',
                      }}
                    >
                      "{sent}"
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* DEFAULT MINI-GAME FALLBACK FOR OTHER 20+ GAMES */}
            {activeGame.id !== 'picture_detective' && activeGame.id !== 'drag_drop_sentence' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center', padding: '20px 0' }}>
                <span style={{ fontSize: '56px' }}>{activeGame.icon}</span>
                <h4 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '22px', color: '#1e1040', margin: 0 }}>
                  Ready to play {activeGame.title}?
                </h4>
                <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '14px', color: '#64748B', margin: 0 }}>
                  {activeGame.description}
                </p>

                <button
                  onClick={() => {
                    setFeedback(`🎉 Challenge Completed! You earned +${activeGame.xpReward} XP!`);
                    setGameCompleted(true);
                    speakText(`Great job completing ${activeGame.title}!`);
                    updateProfileXP(activeGame.xpReward, activeGame.coinReward);
                  }}
                  className="btn-3d"
                  style={{
                    background: 'linear-gradient(135deg, #FFD54A, #FF9F43)',
                    color: '#1e1040', fontFamily: 'Poppins', fontWeight: 900, fontSize: '16px',
                    padding: '12px 32px', borderRadius: '16px', border: 'none',
                    borderBottom: '4px solid #E8A000', cursor: 'pointer',
                    boxShadow: '0 8px 24px rgba(255,213,74,0.5)', marginTop: '10px',
                  }}
                >
                  🚀 Start Challenge & Win +{activeGame.xpReward} XP
                </button>
              </div>
            )}

            {/* Feedback alert */}
            {feedback && (
              <div style={{
                background: gameCompleted ? '#DCFCE7' : '#FEF2F2',
                border: gameCompleted ? '1.5px solid #86EFAC' : '1.5px solid #FCA5A5',
                color: gameCompleted ? '#166534' : '#991B1B',
                borderRadius: '16px', padding: '14px', textAlign: 'center',
                fontFamily: 'Poppins', fontWeight: 900, fontSize: '14px',
              }}>
                {feedback}
              </div>
            )}

            {/* Modal Footer */}
            {gameCompleted && (
              <button
                onClick={() => setActiveGame(null)}
                className="btn-3d"
                style={{
                  background: 'linear-gradient(135deg, #6C4CFF, #8A5CFF)',
                  color: 'white', fontFamily: 'Poppins', fontWeight: 900, fontSize: '15px',
                  padding: '12px', borderRadius: '14px', border: 'none',
                  cursor: 'pointer', textAlign: 'center',
                }}
              >
                Back to Arcade 🎮
              </button>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
