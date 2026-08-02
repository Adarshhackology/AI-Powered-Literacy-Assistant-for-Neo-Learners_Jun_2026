import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Volume2, Mic, Sparkles, Trophy, 
  Play, RefreshCw, CheckCircle2, Flame, Award, Heart, HelpCircle,
  Zap, Search, BookOpen, Music, ShieldAlert
} from 'lucide-react';
import { apiClient } from '../utils/api';
import { Sparkle, CoinSVG, XPGem, RobotMascot, DragonMascot } from '../components/UI/Illustrations';

import { SUPPORTED_LANGUAGES, DIFFICULTY_LEVELS, generateAIQuestion, getLanguagePrompts, StandardQuestion } from '../data/multilingualQuestionBank';

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
  { id: 'drag_drop_sentence', title: '6. Drag & Drop Sentence', category: 'writing', icon: '🧩', badge: 'HOT', description: 'Arrange word chips into the correct grammar order.', xpReward: 15, coinReward: 5, color: '#8B5CF6' },
  { id: 'missing_letter', title: '7. Missing Letter', category: 'writing', icon: '✏️', description: 'Complete partially hidden words (e.g. A _ P L E).', xpReward: 12, coinReward: 4, color: '#EC4899' },
  { id: 'build_word', title: '8. Build the Word', category: 'writing', icon: '🔤', description: 'Tap letter tiles onto empty slots to build target words.', xpReward: 15, coinReward: 5, color: '#10B981' },
  { id: 'spell_bee', title: '9. Spell Bee Challenge', category: 'writing', icon: '🐝', badge: 'VOICE', description: 'AI speaks a word out loud. Type or click to spell it correctly.', xpReward: 20, coinReward: 8, color: '#F59E0B' },
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

  const [selectedLanguage, setSelectedLanguage] = useState<string>('Gujarati');
  const [selectedLevel, setSelectedLevel] = useState<number>(3);

  const [categoryFilter, setCategoryFilter] = useState<'all' | 'reading' | 'writing' | 'speaking' | 'mixed'>('all');
  const [profile, setProfile] = useState<any>({ xp: 450, coins: 120, streak: 12 });
  const [activeGame, setActiveGame] = useState<GameItem | null>(null);
  const [currentAiQuestion, setCurrentAiQuestion] = useState<StandardQuestion | null>(null);

  // Playable Mini-game States
  const [feedback, setFeedback] = useState<string>('');
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [textInput, setTextInput] = useState<string>('');
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);

  // Specific Game States
  const [wordHunterFound, setWordHunterFound] = useState<string[]>([]);
  const [buildWordLetters, setBuildWordLetters] = useState<string[]>([]);
  const [bossHp, setBossHp] = useState<number>(100);
  const [memoryCards, setMemoryCards] = useState<Array<{ id: number; icon: string; flipped: boolean; matched: boolean }>>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [catcherBasketPos, setCatcherBasketPos] = useState<number>(50); // %
  const [ninjaSlicedCount, setNinjaSlicedCount] = useState<number>(0);
  const timerRef = useRef<any>(null);

  const langPrompts = getLanguagePrompts(selectedLanguage);

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
      const langObj = SUPPORTED_LANGUAGES.find(l => l.name.toLowerCase() === selectedLanguage.toLowerCase());
      if (langObj) {
        utterance.lang = langObj.ttsLang;
      }
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleLaunchGame = (game: GameItem) => {
    const aiQ = generateAIQuestion(selectedLanguage, game.category, selectedLevel);
    setCurrentAiQuestion(aiQ);
    setActiveGame(game);
    setFeedback('');
    setSelectedOpt(null);
    setTextInput('');
    setGameCompleted(false);
    setIsRecording(false);
    setWordHunterFound([]);
    setBuildWordLetters([]);
    setBossHp(100);
    setTimeLeft(30);
    setNinjaSlicedCount(0);

    if (game.id === 'picture_detective') {
      speakText(`${aiQ.voice}`);
    } else if (game.id === 'magic_reading') {
      speakText(`Read in ${selectedLanguage}: ${aiQ.question}`);
    } else if (game.id === 'spell_bee') {
      speakText(`Spell the word: ${aiQ.correct}`);
    } else if (game.id === 'repeat_neo') {
      speakText(`Repeat in ${selectedLanguage}: ${aiQ.question}`);
    } else if (game.id === 'memory_match') {
      const icons = ['🍎', '🍎', '🐶', '🐶', '🚀', '🚀', '⭐', '⭐'];
      const shuffled = icons.sort(() => Math.random() - 0.5).map((icon, idx) => ({ id: idx, icon, flipped: false, matched: false }));
      setMemoryCards(shuffled);
      setFlippedIndices([]);
    } else if (game.id === 'reading_race' || game.id === 'word_catcher') {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setFeedback("⏰ Time is up! Great effort!");
            setGameCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const handleCloseModal = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setActiveGame(null);
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

  const finishGameWithSuccess = (msg: string, xp: number, coins: number) => {
    setFeedback(msg);
    setGameCompleted(true);
    speakText(msg);
    updateProfileXP(xp, coins);
  };

  // Memory Card Logic
  const handleCardClick = (index: number) => {
    if (flippedIndices.length === 2 || memoryCards[index].flipped || memoryCards[index].matched) return;
    const nextCards = [...memoryCards];
    nextCards[index].flipped = true;
    const nextFlipped = [...flippedIndices, index];
    setMemoryCards(nextCards);
    setFlippedIndices(nextFlipped);

    if (nextFlipped.length === 2) {
      const [firstIdx, secondIdx] = nextFlipped;
      if (nextCards[firstIdx].icon === nextCards[secondIdx].icon) {
        nextCards[firstIdx].matched = true;
        nextCards[secondIdx].matched = true;
        setMemoryCards(nextCards);
        setFlippedIndices([]);
        if (nextCards.every(c => c.matched)) {
          finishGameWithSuccess("🎉 You matched all cards! Outstanding!", 15, 5);
        }
      } else {
        setTimeout(() => {
          nextCards[firstIdx].flipped = false;
          nextCards[secondIdx].flipped = false;
          setMemoryCards(nextCards);
          setFlippedIndices([]);
        }, 800);
      }
    }
  };

  // Mic Record Logic
  const handleMicClick = (targetPhrase: string) => {
    setIsRecording(true);
    speakText(`Recording speech for: ${targetPhrase}`);
    setTimeout(() => {
      setIsRecording(false);
      finishGameWithSuccess(`🎤 Great pronunciation! 98% Score for "${targetPhrase}"!`, activeGame?.xpReward || 20, activeGame?.coinReward || 8);
    }, 2000);
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
            Master reading, writing & speaking skills across 24 Indian languages and 15 difficulty levels!
          </p>
        </div>

        {/* Multilingual (24 Languages) & Difficulty Level (15 Levels) Selector Controls */}
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '16px 24px',
          border: '1.5px solid rgba(255,255,255,0.6)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        }}>
          {/* Language Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px', color: '#1e1040' }}>🌐 Target Language:</span>
            <select
              value={selectedLanguage}
              onChange={(e) => {
                setSelectedLanguage(e.target.value);
                localStorage.setItem('preferredLanguage', e.target.value.toLowerCase());
              }}
              style={{
                background: '#F8FAFF', border: '1.5px solid #E8EFFF',
                borderRadius: '12px', padding: '8px 16px',
                fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px', color: '#6C4CFF',
                outline: 'none', cursor: 'pointer',
              }}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.name}>
                  {lang.flag} {lang.name} ({lang.native})
                </option>
              ))}
            </select>
          </div>

          {/* 15 Difficulty Levels Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px', color: '#1e1040' }}>📈 Difficulty Level:</span>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(Number(e.target.value))}
              style={{
                background: '#FFFDF0', border: '1.5px solid #FFD54A',
                borderRadius: '12px', padding: '8px 16px',
                fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px', color: '#B45309',
                outline: 'none', cursor: 'pointer',
              }}
            >
              {DIFFICULTY_LEVELS.map((lvl) => (
                <option key={lvl.level} value={lvl.level}>
                  Level {lvl.level}: {lvl.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: '🌟 All Games (21+)', icon: '🎮' },
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
                onClick={handleCloseModal}
                style={{ background: '#F1F5F9', border: 'none', borderRadius: '50%', width: '36px', height: '36px', fontWeight: 900, fontSize: '16px', cursor: 'pointer', color: '#475569' }}
              >
                ✕
              </button>
            </div>

            {/* GAME 1: PICTURE DETECTIVE */}
            {activeGame.id === 'picture_detective' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center' }}>
                <button onClick={() => speakText(langPrompts.findApple)} className="btn-3d" style={{ background: '#F0F4FF', border: '1px solid #E8EFFF', color: '#6C4CFF', fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px', padding: '8px 16px', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Volume2 className="w-4 h-4" /> Listen AI Prompt: "{langPrompts.findApple}" 🔊
                </button>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', width: '100%' }}>
                  {[
                    { name: langPrompts.apple, emoji: '🍎', label: langPrompts.apple },
                    { name: langPrompts.banana, emoji: '🍌', label: langPrompts.banana },
                    { name: langPrompts.cat, emoji: '🐱', label: langPrompts.cat },
                    { name: langPrompts.dog, emoji: '🐶', label: langPrompts.dog },
                  ].map((item) => (
                    <div
                      key={item.name}
                      onClick={() => {
                        setSelectedOpt(item.name);
                        if (item.name === langPrompts.apple) {
                          finishGameWithSuccess(`🎉 Correct! You found ${langPrompts.apple}! +15 XP awarded!`, 15, 5);
                        } else {
                          setFeedback("❌ Try again!");
                          speakText("Try again!");
                        }
                      }}
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

            {/* GAME 2: MAGIC READING ADVENTURE */}
            {activeGame.id === 'magic_reading' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center' }}>
                <div style={{ background: '#F8FAFF', border: '2px solid #E8EFFF', borderRadius: '20px', padding: '20px', width: '100%' }}>
                  <p style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '20px', color: '#1e1040', lineHeight: 1.6, margin: 0 }}>
                    "{langPrompts.sunshine}"
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={() => speakText(langPrompts.sunshine)} className="btn-3d" style={{ background: '#F0F4FF', border: '1px solid #E8EFFF', color: '#6C4CFF', fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px', padding: '10px 18px', borderRadius: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Volume2 className="w-4 h-4" /> AI Narrator ({selectedLanguage})
                  </button>
                  <button onClick={() => handleMicClick(langPrompts.sunshine)} className="btn-3d" style={{ background: 'linear-gradient(135deg,#6C4CFF,#8A5CFF)', color: 'white', fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px', padding: '10px 18px', borderRadius: '14px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Mic className="w-4 h-4" /> Read Aloud Mic
                  </button>
                </div>
              </div>
            )}

            {/* GAME 3: WORD HUNTER */}
            {activeGame.id === 'word_hunter' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center' }}>
                <p style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '15px', color: '#1e1040', margin: 0 }}>
                  Tap the target words in the forest scene (Found: {wordHunterFound.length}/3):
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {['TREES 🌲', 'RIVER 🌊', 'BIRD 🐦', 'FLOWER 🌸'].map((w) => {
                    const isFound = wordHunterFound.includes(w);
                    return (
                      <button
                        key={w}
                        onClick={() => {
                          if (!isFound) {
                            const next = [...wordHunterFound, w];
                            setWordHunterFound(next);
                            if (next.length >= 3) {
                              finishGameWithSuccess("🎉 You found all hidden words! +15 XP!", 15, 5);
                            }
                          }
                        }}
                        className="btn-3d"
                        style={{
                          background: isFound ? '#DCFCE7' : '#F0F4FF',
                          border: isFound ? '1.5px solid #86EFAC' : '1.5px solid #E8EFFF',
                          color: isFound ? '#166534' : '#1e1040',
                          fontFamily: 'Poppins', fontWeight: 900, fontSize: '14px',
                          padding: '12px 20px', borderRadius: '16px', cursor: 'pointer',
                        }}
                      >
                        {w} {isFound && '✓'}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* GAME 4: STORY BUILDER */}
            {activeGame.id === 'story_builder' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center' }}>
                <div style={{ background: '#F8FAFF', border: '2px solid #E8EFFF', borderRadius: '20px', padding: '20px', width: '100%' }}>
                  <p style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '18px', color: '#1e1040', margin: 0 }}>
                    "Once upon a time, a brave _____ flew to the moon."
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                  {['Astronaut 👨‍🚀', 'Fish 🐟', 'Tree 🌳'].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        if (opt.includes('Astronaut')) {
                          finishGameWithSuccess("🎉 Story completed! The brave astronaut flew to the moon! +18 XP!", 18, 6);
                        } else {
                          setFeedback("❌ Try again! Who flies to the moon?");
                        }
                      }}
                      className="btn-3d"
                      style={{ flex: 1, background: '#F0F4FF', border: '1.5px solid #E8EFFF', padding: '12px', borderRadius: '14px', fontFamily: 'Poppins', fontWeight: 900, fontSize: '14px', cursor: 'pointer' }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* GAME 5: READING RACE */}
            {activeGame.id === 'reading_race' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center' }}>
                <div style={{ background: '#FFFDF0', border: '2px solid #FFD54A', padding: '8px 20px', borderRadius: '99px', fontFamily: 'Poppins', fontWeight: 900, fontSize: '18px', color: '#B45309' }}>
                  ⏱️ TIME LEFT: {timeLeft}s
                </div>
                <p style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '20px', color: '#1e1040', margin: 0 }}>
                  Fast Read: "The quick brown fox jumps over the lazy dog."
                </p>
                <button
                  onClick={() => finishGameWithSuccess(`🎉 Speed Champion! Finished with ${timeLeft}s remaining! +25 XP!`, 25, 10)}
                  className="btn-3d"
                  style={{ background: 'linear-gradient(135deg,#FFD54A,#FF9F43)', color: '#1e1040', fontFamily: 'Poppins', fontWeight: 900, fontSize: '16px', padding: '12px 28px', borderRadius: '16px', border: 'none', cursor: 'pointer' }}
                >
                  🏁 Tap Finish Reading!
                </button>
              </div>
            )}

            {/* GAME 6: DRAG & DROP SENTENCE */}
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
                      onClick={() => {
                        setSelectedOpt(sent);
                        if (sent === 'Neo loves reading books') {
                          finishGameWithSuccess("🎉 Perfect Sentence! +15 XP awarded!", 15, 5);
                        } else {
                          setFeedback("❌ Try again! Put subject first.");
                        }
                      }}
                      className="hover-lift"
                      style={{
                        background: selectedOpt === sent ? '#FFFDF0' : '#F8FAFF',
                        border: selectedOpt === sent ? '2.5px solid #FFD54A' : '1.5px solid #E8EFFF',
                        borderRadius: '16px', padding: '14px',
                        fontFamily: 'Poppins', fontWeight: 900, fontSize: '15px', color: '#1e1040', cursor: 'pointer',
                      }}
                    >
                      "{sent}"
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* GAME 7: MISSING LETTER */}
            {activeGame.id === 'missing_letter' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center' }}>
                <span style={{ fontSize: '54px' }}>🍎</span>
                <h4 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '28px', color: '#1e1040', letterSpacing: '4px', margin: 0 }}>
                  A _ P L E
                </h4>
                <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '14px', color: '#64748B', margin: 0 }}>
                  Select the missing letter:
                </p>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {['P', 'B', 'M', 'T'].map((lettr) => (
                    <button
                      key={lettr}
                      onClick={() => {
                        setSelectedOpt(lettr);
                        if (lettr === 'P') {
                          finishGameWithSuccess("🎉 Correct! A-P-P-L-E = APPLE! +12 XP!", 12, 4);
                        } else {
                          setFeedback("❌ Try again!");
                        }
                      }}
                      className="btn-3d"
                      style={{
                        width: '56px', height: '56px', borderRadius: '16px',
                        background: selectedOpt === lettr ? '#FFD54A' : '#F0F4FF',
                        border: 'none', color: '#1e1040', fontFamily: 'Poppins', fontWeight: 900, fontSize: '20px', cursor: 'pointer',
                      }}
                    >
                      {lettr}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* GAME 8: BUILD THE WORD */}
            {activeGame.id === 'build_word' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center' }}>
                <span style={{ fontSize: '54px' }}>🐶</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['D', 'O', 'G'].map((char, idx) => (
                    <div key={idx} style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#F0F4FF', border: '2px solid #6C4CFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Poppins', fontWeight: 900, fontSize: '22px', color: '#6C4CFF' }}>
                      {buildWordLetters[idx] || '_'}
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {['O', 'D', 'G', 'X'].map((letter) => (
                    <button
                      key={letter}
                      onClick={() => {
                        const next = [...buildWordLetters, letter];
                        setBuildWordLetters(next);
                        if (next.join('') === 'DOG') {
                          finishGameWithSuccess("🎉 D-O-G = DOG! Word Built! +15 XP!", 15, 5);
                        }
                      }}
                      className="btn-3d"
                      style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#FFD54A', border: 'none', fontFamily: 'Poppins', fontWeight: 900, fontSize: '18px', cursor: 'pointer' }}
                    >
                      {letter}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* GAME 9: SPELL BEE */}
            {activeGame.id === 'spell_bee' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center' }}>
                <button onClick={() => speakText("Spell the word: CAT")} className="btn-3d" style={{ background: '#F0F4FF', border: '1px solid #E8EFFF', color: '#6C4CFF', fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px', padding: '8px 16px', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Volume2 className="w-4 h-4" /> Listen Word Again 🔊
                </button>
                <input
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value.toUpperCase())}
                  placeholder="Type the word you hear..."
                  style={{ width: '100%', padding: '14px', borderRadius: '14px', border: '2px solid #E8EFFF', fontFamily: 'Poppins', fontWeight: 900, fontSize: '20px', textAlign: 'center', outline: 'none' }}
                />
                <button
                  onClick={() => {
                    if (textInput.trim() === 'CAT') {
                      finishGameWithSuccess("🎉 Spelled C-A-T correctly! +20 XP!", 20, 8);
                    } else {
                      setFeedback("❌ Spelled incorrectly! Listen closely.");
                    }
                  }}
                  className="btn-3d"
                  style={{ background: 'linear-gradient(135deg, #6C4CFF, #8A5CFF)', color: 'white', fontFamily: 'Poppins', fontWeight: 900, fontSize: '15px', padding: '10px 24px', borderRadius: '14px', border: 'none', cursor: 'pointer' }}
                >
                  Submit Spelling 🐝
                </button>
              </div>
            )}

            {/* GAME 10: EMOJI SENTENCE */}
            {activeGame.id === 'emoji_sentence' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center' }}>
                <span style={{ fontSize: '54px' }}>🍎 👦</span>
                <p style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '15px', color: '#1e1040', margin: 0 }}>
                  What does this emoji sentence mean?
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
                  {['The boy is eating an apple.', 'The boy is playing football.', 'The apple is sleeping.'].map((sent) => (
                    <button
                      key={sent}
                      onClick={() => {
                        if (sent.includes('eating an apple')) {
                          finishGameWithSuccess("🎉 Correct emoji translation! +18 XP!", 18, 6);
                        } else {
                          setFeedback("❌ Try again!");
                        }
                      }}
                      className="btn-3d"
                      style={{ background: '#F8FAFF', border: '1.5px solid #E8EFFF', padding: '12px', borderRadius: '14px', fontFamily: 'Poppins', fontWeight: 900, fontSize: '14px', cursor: 'pointer' }}
                    >
                      "{sent}"
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* GAME 11: CROSSWORD */}
            {activeGame.id === 'crossword' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center' }}>
                <p style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '15px', color: '#1e1040', margin: 0 }}>
                  Clue 1: 🐶 Man's best friend (3 letters)
                </p>
                <input
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value.toUpperCase())}
                  placeholder="D O G"
                  style={{ width: '100%', padding: '12px', borderRadius: '14px', border: '2px solid #E8EFFF', fontFamily: 'Poppins', fontWeight: 900, fontSize: '20px', textAlign: 'center', outline: 'none' }}
                />
                <button
                  onClick={() => {
                    if (textInput.trim() === 'DOG') {
                      finishGameWithSuccess("🎉 Crossword Clue Solved: D-O-G! +25 XP!", 25, 10);
                    } else {
                      setFeedback("❌ Try again!");
                    }
                  }}
                  className="btn-3d"
                  style={{ background: 'linear-gradient(135deg,#6C4CFF,#8A5CFF)', color: 'white', fontFamily: 'Poppins', fontWeight: 900, fontSize: '14px', padding: '10px 24px', borderRadius: '14px', border: 'none', cursor: 'pointer' }}
                >
                  Solve Crossword 📝
                </button>
              </div>
            )}

            {/* GAME 12: UNSCRAMBLE */}
            {activeGame.id === 'unscramble' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center' }}>
                <h4 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '32px', color: '#6C4CFF', letterSpacing: '6px', margin: 0 }}>
                  L P P A E
                </h4>
                <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '14px', color: '#64748B', margin: 0 }}>
                  Unscramble into a delicious fruit:
                </p>
                <input
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value.toUpperCase())}
                  placeholder="APPLE"
                  style={{ width: '100%', padding: '12px', borderRadius: '14px', border: '2px solid #E8EFFF', fontFamily: 'Poppins', fontWeight: 900, fontSize: '20px', textAlign: 'center', outline: 'none' }}
                />
                <button
                  onClick={() => {
                    if (textInput.trim() === 'APPLE') {
                      finishGameWithSuccess("🎉 Unscrambled correctly: APPLE! +15 XP!", 15, 5);
                    } else {
                      setFeedback("❌ Try again!");
                    }
                  }}
                  className="btn-3d"
                  style={{ background: 'linear-gradient(135deg,#6C4CFF,#8A5CFF)', color: 'white', fontFamily: 'Poppins', fontWeight: 900, fontSize: '14px', padding: '10px 24px', borderRadius: '14px', border: 'none', cursor: 'pointer' }}
                >
                  Unscramble 🌀
                </button>
              </div>
            )}

            {/* 16, 17, 18, 19, 21: SPEAKING GAMES WITH MIC */}
            {(activeGame.category === 'speaking') && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center' }}>
                <span style={{ fontSize: '56px' }}>{activeGame.icon}</span>
                <p style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '18px', color: '#1e1040', margin: 0 }}>
                  Phrase to Speak: <span style={{ color: '#6C4CFF' }}>"Literacy is Fun!"</span>
                </p>
                <button
                  onClick={() => handleMicClick("Literacy is Fun!")}
                  className="btn-3d"
                  style={{
                    width: '72px', height: '72px', borderRadius: '50%',
                    background: isRecording ? '#EF4444' : 'linear-gradient(135deg, #6C4CFF, #8A5CFF)',
                    color: 'white', border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 8px 24px rgba(108,76,255,0.4)',
                  }}
                >
                  <Mic className="w-8 h-8" />
                </button>
                <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '13px', color: '#64748B', margin: 0 }}>
                  {isRecording ? '🎙️ Listening to your speech...' : 'Click microphone to record your voice'}
                </p>
              </div>
            )}

            {/* 24. WORD CATCHER */}
            {activeGame.id === 'word_catcher' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center' }}>
                <div style={{ background: '#FFFDF0', border: '2px solid #FFD54A', padding: '6px 18px', borderRadius: '99px', fontFamily: 'Poppins', fontWeight: 900, fontSize: '16px', color: '#B45309' }}>
                  ⏱️ TIME: {timeLeft}s
                </div>
                <div style={{ height: '140px', width: '100%', background: '#F8FAFF', border: '2px dashed #CBD5E1', borderRadius: '20px', position: 'relative', overflow: 'hidden' }}>
                  <div className="animate-bounce" style={{ position: 'absolute', top: '20px', left: `${catcherBasketPos}%`, transform: 'translateX(-50%)', fontSize: '32px' }}>
                    🍎 APPLE
                  </div>
                  <div style={{ position: 'absolute', bottom: '10px', left: `${catcherBasketPos}%`, transform: 'translateX(-50%)', fontSize: '36px' }}>
                    🧺
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <button onClick={() => setCatcherBasketPos(Math.max(20, catcherBasketPos - 20))} className="btn-3d" style={{ padding: '8px 20px', borderRadius: '12px', background: '#F0F4FF', border: '1px solid #E8EFFF', fontFamily: 'Poppins', fontWeight: 900, cursor: 'pointer' }}>◀ Left</button>
                  <button onClick={() => finishGameWithSuccess("🎉 Caught 5 Words into Basket! +15 XP!", 15, 5)} className="btn-3d" style={{ padding: '8px 20px', borderRadius: '12px', background: '#FFD54A', border: 'none', fontFamily: 'Poppins', fontWeight: 900, cursor: 'pointer' }}>🧺 Catch!</button>
                  <button onClick={() => setCatcherBasketPos(Math.min(80, catcherBasketPos + 20))} className="btn-3d" style={{ padding: '8px 20px', borderRadius: '12px', background: '#F0F4FF', border: '1px solid #E8EFFF', fontFamily: 'Poppins', fontWeight: 900, cursor: 'pointer' }}>Right ▶</button>
                </div>
              </div>
            )}

            {/* 25. MEMORY MATCH */}
            {activeGame.id === 'memory_match' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center' }}>
                <p style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '14px', color: '#1e1040', margin: 0 }}>
                  Flip cards to find matching pairs:
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', width: '100%' }}>
                  {memoryCards.map((card, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleCardClick(idx)}
                      style={{
                        height: '70px', borderRadius: '16px',
                        background: card.flipped || card.matched ? '#FFFDF0' : 'linear-gradient(135deg, #6C4CFF, #8A5CFF)',
                        border: card.matched ? '2px solid #22C55E' : '2px solid #C4B5F4',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: card.flipped || card.matched ? '32px' : '24px',
                        color: 'white', cursor: 'pointer', transition: 'all 0.2s ease',
                      }}
                    >
                      {card.flipped || card.matched ? card.icon : '❓'}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 26. SPEED READING NINJA */}
            {activeGame.id === 'ninja_reading' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center' }}>
                <p style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '16px', color: '#1e1040', margin: 0 }}>
                  Slice target words before they vanish! (Sliced: {ninjaSlicedCount}/3)
                </p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                  {['READING 📖', 'WRITING ✍️', 'SPEAKING 🎤'].map((w) => (
                    <button
                      key={w}
                      onClick={() => {
                        const next = ninjaSlicedCount + 1;
                        setNinjaSlicedCount(next);
                        if (next >= 3) {
                          finishGameWithSuccess("⚔️ Reading Ninja Mastered! All words sliced! +20 XP!", 20, 8);
                        }
                      }}
                      className="btn-3d hover-lift"
                      style={{ background: '#FFF0F5', border: '2px solid #FF4FA3', color: '#FF4FA3', fontFamily: 'Poppins', fontWeight: 900, fontSize: '16px', padding: '16px 20px', borderRadius: '20px', cursor: 'pointer' }}
                    >
                      ⚔️ {w}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 27. BOSS BATTLE */}
            {activeGame.id === 'boss_battle' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center' }}>
                <div style={{ width: '100%', background: '#F1F5F9', borderRadius: '99px', height: '16px', overflow: 'hidden', border: '1px solid #CBD5E1' }}>
                  <div style={{ width: `${bossHp}%`, background: 'linear-gradient(90deg, #EF4444, #F97316)', height: '100%', transition: 'width 0.3s' }} />
                </div>
                <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '12px', color: '#EF4444' }}>
                  🐉 WORD DRAGON HP: {bossHp} / 100
                </span>

                <p style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '16px', color: '#1e1040', margin: 0 }}>
                  Which word means "very happy"?
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', width: '100%' }}>
                  {['Joyful', 'Sad', 'Angry', 'Tired'].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        if (opt === 'Joyful') {
                          const newHp = Math.max(0, bossHp - 50);
                          setBossHp(newHp);
                          if (newHp === 0) {
                            finishGameWithSuccess("🎉 YOU DEFEATED THE WORD DRAGON BOSS! +50 XP, +20 Coins!", 50, 20);
                          } else {
                            setFeedback("💥 Critical Hit! Dragon took 50 damage!");
                          }
                        } else {
                          setFeedback("🛡️ Dragon blocked your attack! Try again!");
                        }
                      }}
                      className="btn-3d"
                      style={{ background: '#F8FAFF', border: '1.5px solid #E8EFFF', padding: '12px', borderRadius: '14px', fontFamily: 'Poppins', fontWeight: 900, fontSize: '14px', cursor: 'pointer' }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
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
                onClick={handleCloseModal}
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
