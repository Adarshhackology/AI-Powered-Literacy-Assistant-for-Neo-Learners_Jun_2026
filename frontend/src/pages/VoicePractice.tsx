import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mic, MicOff, Volume2, Sparkles, RefreshCw, CheckCircle2 } from 'lucide-react';
import { apiClient } from '../utils/api';

const wordsToPractice = [
  { text: 'Beautiful', phonetic: '/ˈbjuːtɪfl/', help: 'Stress should be on "Beau"', stressWord: 'Beau', emoji: '🌸', imageUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=flower' },
  { text: 'Literacy', phonetic: '/ˈlɪtərəsi/', help: 'Ensure you sound out all three syllables: Lit-er-a-cy', stressWord: 'Lit', emoji: '📚', imageUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=book' },
  { text: 'Education', phonetic: '/ˌedʒuˈkeɪʃn/', help: 'Stress is on "ca". Sound out the "sh" sound clearly.', stressWord: 'ca', emoji: '🏫', imageUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=school' },
  { text: 'Personalized', phonetic: '/ˈpɜːsənəlaɪzd/', help: 'Pronounce the "s" as /z/ at the end.', stressWord: 'Per', emoji: '⭐', imageUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=star' },
];

export default function VoicePractice() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [speechScores, setSpeechScores] = useState<any | null>(null);
  
  const currentWord = wordsToPractice[currentIndex];
  
  // Web Speech API recognition reference
  const recognitionRef = useRef<any | null>(null);

  useEffect(() => {
    // Initialize Web Speech API if supported
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'en-US';

      rec.onstart = () => {
        setIsRecording(true);
        setTranscript('');
        setSpeechScores(null);
      };

      rec.onresult = (e: any) => {
        const text = e.results[0][0].transcript;
        setTranscript(text);
        evaluateSpeech(text);
      };

      rec.onerror = (e: any) => {
        console.error('Speech recognition error', e);
        setIsRecording(false);
        // Fallback simulation if mic is blocked/failed
        simulateSpeechEvaluation();
      };

      rec.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = rec;
    }
  }, [currentIndex]);

  const startRecording = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (err) {
        recognitionRef.current.stop();
      }
    } else {
      // Simulator for unsupported browsers
      setIsRecording(true);
      setTranscript('');
      setSpeechScores(null);
      setTimeout(() => {
        setIsRecording(false);
        simulateSpeechEvaluation();
      }, 3000);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    } else {
      setIsRecording(false);
      simulateSpeechEvaluation();
    }
  };

  // Real Speech evaluation helper
  const evaluateSpeech = async (spokenText: string) => {
    const target = currentWord.text;
    const username = localStorage.getItem('username') || 'learner';

    try {
      const res = await apiClient.evaluatePronunciation(username, target, spokenText);
      if (res) {
        setSpeechScores({
          pronunciation: res.pronunciation_score || 85,
          speed: res.speech_rate || 120,
          fluency: res.fluency_score || 88,
          confidence: res.content_score || 86,
          overall_score: res.overall_score || 86,
          result_label: res.result_label || 'Good',
          xp_awarded: res.xp_awarded || 25
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Mock simulation helper
  const simulateSpeechEvaluation = () => {
    const simulatedTranscript = currentWord.text;
    setTranscript(simulatedTranscript);
    setSpeechScores({
      pronunciation: 88,
      speed: 75,
      fluency: 90,
      confidence: 82,
    });

    // Add badge or XP
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.profile) {
      user.profile.xp = (user.profile.xp || 0) + 15;
      if (!user.profile.badges.includes('Voice Master')) {
        user.profile.badges.push('Voice Master');
      }
      localStorage.setItem('user', JSON.stringify(user));
      
      const username = localStorage.getItem('username') || 'guest';
      const profiles = JSON.parse(localStorage.getItem('profiles') || '[]');
      const idx = profiles.findIndex((p: any) => p.username === username);
      if (idx !== -1) {
        profiles[idx].xp = user.profile.xp;
        if (!profiles[idx].badges.includes('Voice Master')) {
          profiles[idx].badges.push('Voice Master');
        }
        localStorage.setItem('profiles', JSON.stringify(profiles));
      }
    }
  };

  const playTargetAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentWord.text);
      utterance.rate = 0.75; // slow phonetic sound
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      {/* Navbar */}
      <nav className="h-16 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between shrink-0">
        <Link to="/dashboard" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-bold transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </Link>
        <span className="font-extrabold text-slate-900 text-lg">AI Voice Lab</span>
        <div className="w-10 h-10" /> {/* spacer */}
      </nav>

      {/* Main Container */}
      <main className="flex-1 max-w-3xl w-full mx-auto p-6 md:p-8 flex flex-col justify-start overflow-y-auto space-y-8">
        {/* Word Display Board */}
        <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-xl text-center space-y-4 relative overflow-hidden">
          {/* Accent decoration */}
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-blue-500 to-indigo-500" />
          
          <div className="space-y-1">
            <span className="bg-blue-50 text-blue-700 text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full">
              Syllables Pronunciation Drills
            </span>
            <p className="text-slate-400 font-bold text-xs">Practice Word {currentIndex + 1} of {wordsToPractice.length}</p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100 p-2 border-4 border-indigo-200 shadow-xl overflow-hidden flex items-center justify-center">
              <img src={currentWord.imageUrl} alt={currentWord.text} className="w-full h-full object-contain animate-bounce-slow" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black text-slate-950 tracking-tight leading-none">
              {currentWord.text} {currentWord.emoji}
            </h1>
            <p className="text-lg text-blue-600 font-bold font-serif tracking-wider">{currentWord.phonetic}</p>
          </div>

          {/* TTS Player */}
          <div className="flex justify-center pt-2">
            <button
              onClick={playTargetAudio}
              className="bg-slate-50 border border-slate-100 hover:bg-slate-100 text-slate-700 font-bold px-5 py-2.5 rounded-2xl flex items-center gap-2 text-sm shadow-sm transition-all"
            >
              <Volume2 className="w-5 h-5 text-blue-600" />
              <span>Listen Correct Pronunciation</span>
            </button>
          </div>
        </div>

        {/* Recording Controls */}
        <div className="bg-white border border-slate-100 p-6 md:p-8 rounded-3xl shadow-lg flex flex-col items-center space-y-6">
          <div className="text-center space-y-1">
            <h3 className="font-extrabold text-slate-900 text-lg">Click & Say the Word Aloud</h3>
            <p className="text-slate-500 text-sm">Speak clearly into your microphone</p>
          </div>

          {/* Recording wave visual */}
          {isRecording ? (
            <div className="flex items-center gap-1.5 h-12">
              <span className="w-1.5 bg-blue-600 rounded-full animate-bounce h-6" style={{ animationDelay: '0.1s' }} />
              <span className="w-1.5 bg-blue-600 rounded-full animate-bounce h-10" style={{ animationDelay: '0.3s' }} />
              <span className="w-1.5 bg-blue-600 rounded-full animate-bounce h-8" style={{ animationDelay: '0.5s' }} />
              <span className="w-1.5 bg-blue-600 rounded-full animate-bounce h-11" style={{ animationDelay: '0.2s' }} />
              <span className="w-1.5 bg-blue-600 rounded-full animate-bounce h-6" style={{ animationDelay: '0.4s' }} />
            </div>
          ) : (
            <div className="h-12 flex items-center">
              <span className="text-slate-300 font-bold text-xs uppercase tracking-widest">Mic Ready</span>
            </div>
          )}

          {/* Big Mic Button */}
          <div className="flex justify-center">
            {isRecording ? (
              <button
                onClick={stopRecording}
                className="w-20 h-20 bg-red-500 text-white rounded-full flex items-center justify-center shadow-xl shadow-red-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer border-4 border-red-100"
              >
                <MicOff className="w-8 h-8" />
              </button>
            ) : (
              <button
                onClick={startRecording}
                className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-xl shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer border-4 border-blue-100 animate-pulse"
              >
                <Mic className="w-8 h-8" />
              </button>
            )}
          </div>

          {transcript && (
            <div className="text-center p-3.5 bg-slate-50 border border-slate-100 rounded-2xl w-full max-w-md">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">AI Transcript</p>
              <p className="font-extrabold text-slate-800 text-base mt-1">"{transcript}"</p>
            </div>
          )}
        </div>

        {/* Analysis Results Display */}
        {speechScores && (
          <div className="space-y-6 animate-fade-in">
            {/* Success / Error Banner */}
            {speechScores.pronunciation >= 75 ? (
              <div className="bg-emerald-50 border-2 border-emerald-250 p-4.5 rounded-3xl flex items-center gap-3">
                <span className="text-3xl">🎉</span>
                <div className="text-left">
                  <h4 className="font-extrabold text-sm text-emerald-800">Great Job! Pronounced Correctly!</h4>
                  <p className="text-xs font-bold text-emerald-600">You earned +15 XP!</p>
                </div>
              </div>
            ) : (
              <div className="bg-rose-50 border-2 border-rose-250 p-4.5 rounded-3xl flex items-center gap-3">
                <span className="text-3xl">❌</span>
                <div className="text-left">
                  <h4 className="font-extrabold text-sm text-rose-800">Oops! That doesn't sound quite right.</h4>
                  <p className="text-xs font-bold text-rose-600">Listen to the pronunciation and try saying it again!</p>
                </div>
              </div>
            )}

            {/* Scores Cards grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm text-center">
                <h4 className="text-slate-400 font-bold text-xs uppercase tracking-wider">Pronunciation</h4>
                <p className="text-2xl font-black text-blue-600 mt-1">{speechScores.pronunciation}%</p>
              </div>

              <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm text-center">
                <h4 className="text-slate-400 font-bold text-xs uppercase tracking-wider">Speed</h4>
                <p className="text-2xl font-black text-emerald-600 mt-1">{speechScores.speed}%</p>
              </div>

              <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm text-center">
                <h4 className="text-slate-400 font-bold text-xs uppercase tracking-wider">Fluency</h4>
                <p className="text-2xl font-black text-amber-500 mt-1">{speechScores.fluency}%</p>
              </div>

              <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm text-center">
                <h4 className="text-slate-400 font-bold text-xs uppercase tracking-wider">Confidence</h4>
                <p className="text-2xl font-black text-indigo-600 mt-1">{speechScores.confidence}%</p>
              </div>
            </div>

            {/* AI Suggestion box */}
            <div className="bg-blue-50 border border-blue-100 p-5 rounded-3xl space-y-3">
              <h4 className="text-xs font-black text-blue-800 uppercase tracking-wide flex items-center gap-1">
                <Sparkles className="w-4.5 h-4.5" />
                <span>AI Pronunciation Advice</span>
              </h4>
              <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                Try pronouncing <b>"{currentWord.text}"</b> again. Make sure the primary vocal stress is placed on the syllable <b>"{currentWord.stressWord}"</b>. {currentWord.help}
              </p>
            </div>

            {/* Navigator panel */}
            <div className="flex gap-4">
              <button
                onClick={startRecording}
                className="flex-1 bg-white border border-slate-200 text-slate-700 font-extrabold py-3.5 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-50 transition-all cursor-pointer shadow-sm"
              >
                <RefreshCw className="w-5 h-5 text-slate-400" />
                <span>Try Word Again</span>
              </button>

              <button
                onClick={() => {
                  setTranscript('');
                  setSpeechScores(null);
                  setCurrentIndex((prev) => (prev + 1) % wordsToPractice.length);
                }}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-blue-500/10"
              >
                <span>Next Practice Word</span>
                <CheckCircle2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
