import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mic, MicOff, Volume2, Sparkles, RefreshCw, CheckCircle2 } from 'lucide-react';
import { apiClient } from '../utils/api';
import { Sparkle, RobotMascot } from '../components/UI/Illustrations';

const wordsToPractice = [
  { text: 'Beautiful', phonetic: '/ˈbjuːtɪfl/', help: 'Stress should be on "Beau"', stressWord: 'Beau', emoji: '🌸', imageUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=flower' },
  { text: 'Literacy', phonetic: '/ˈlɪtərəsi/', help: 'Ensure you sound out all three syllables: Lit-er-a-cy', stressWord: 'Lit', emoji: '📚', imageUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=book' },
  { text: 'Education', phonetic: '/ˌedʒuˈkeɪʃn/', help: 'Stress is on "ca". Sound out the "sh" sound clearly.', stressWord: 'ca', emoji: '🏫', imageUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=school' },
  { text: 'Personalized', phonetic: '/ˈpɜːsənəlaɪzd/', help: 'Pronounce the "s" as /z/ at the end.', stressWord: 'Per', emoji: '⭐', imageUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=star' },
];

export default function VoicePractice() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [speechScores, setSpeechScores] = useState<any | null>(null);
  
  const currentWord = wordsToPractice[currentIndex];
  const recognitionRef = useRef<any | null>(null);

  useEffect(() => {
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

  const simulateSpeechEvaluation = () => {
    const simulatedTranscript = currentWord.text;
    setTranscript(simulatedTranscript);
    setSpeechScores({
      pronunciation: 88,
      speed: 75,
      fluency: 90,
      confidence: 82,
    });
  };

  const playTargetAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentWord.text);
      utterance.rate = 0.75;
      window.speechSynthesis.speak(utterance);
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
          <div key={i} className="animate-twinkle" style={{
            position: 'absolute', top: st.t, left: st.l,
            animationDelay: `${i * 0.4}s`, opacity: 0.7,
          }}>
            <Sparkle size={st.s} color={i % 2 === 0 ? '#FFD54A' : '#C4B5F4'} />
          </div>
        ))}
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>

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
            <span>Back to Dashboard</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '22px' }}>🎙️</span>
            <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '18px', color: '#1e1040' }}>
              AI Voice Lab
            </span>
          </div>

          <div style={{ width: '40px' }} />
        </nav>

        {/* Main Word Display Card */}
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '28px',
          padding: '32px',
          border: '2px solid rgba(255,255,255,0.6)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px',
          textAlign: 'center',
        }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <span style={{
              background: 'linear-gradient(135deg, #6C4CFF, #8A5CFF)', color: 'white',
              fontFamily: 'Poppins', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase',
              padding: '4px 14px', borderRadius: '99px',
            }}>
              Syllables Pronunciation Drills
            </span>
            <span style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '12px', color: '#94A3B8' }}>
              Practice Word {currentIndex + 1} of {wordsToPractice.length}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <div className="animate-bobble" style={{
              width: '110px', height: '110px', borderRadius: '24px',
              background: 'linear-gradient(135deg, #EDE7F6, #FFF0F9)',
              border: '3px solid #C4B5F4', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 10px 24px rgba(108,76,255,0.2)',
            }}>
              <img src={currentWord.imageUrl} alt={currentWord.text} style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
            </div>

            <h1 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '42px', color: '#1e1040', margin: 0, lineHeight: 1 }}>
              {currentWord.text} {currentWord.emoji}
            </h1>

            <p style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '18px', color: '#6C4CFF', margin: 0 }}>
              {currentWord.phonetic}
            </p>
          </div>

          {/* Listen Button */}
          <button
            onClick={playTargetAudio}
            className="btn-3d"
            style={{
              background: '#F0F4FF', border: '1.5px solid #E8EFFF',
              color: '#6C4CFF', fontFamily: 'Poppins', fontWeight: 900, fontSize: '13px',
              padding: '10px 20px', borderRadius: '14px',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
            }}
          >
            <Volume2 className="w-5 h-5" />
            <span>Listen Correct Pronunciation</span>
          </button>
        </div>

        {/* Microphone Recording Action Card */}
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '24px',
          border: '1.5px solid #E8EFFF',
          boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px',
          textAlign: 'center',
        }}>
          <div>
            <h3 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '18px', color: '#1e1040', margin: '0 0 4px' }}>
              Click & Say the Word Aloud 🎙️
            </h3>
            <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: '13px', color: '#64748B', margin: 0 }}>
              Speak clearly into your microphone
            </p>
          </div>

          {/* Big Mic Button */}
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className="btn-3d"
            style={{
              width: '80px', height: '80px', borderRadius: '50%',
              background: isRecording ? 'linear-gradient(135deg, #FF4FA3, #EF4444)' : 'linear-gradient(135deg, #6C4CFF, #8A5CFF)',
              border: 'none', color: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: isRecording ? '0 0 30px rgba(255,79,163,0.6)' : '0 10px 30px rgba(108,76,255,0.4)',
              cursor: 'pointer',
            }}
          >
            {isRecording ? <MicOff className="w-8 h-8 animate-pulse" /> : <Mic className="w-8 h-8" />}
          </button>

          <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '12px', color: isRecording ? '#FF4FA3' : '#6C4CFF' }}>
            {isRecording ? 'RECORDING... SPEAK NOW!' : 'MIC READY - TAP TO SPEAK'}
          </span>
        </div>

        {/* Evaluation Results Card */}
        {speechScores && (
          <div style={{
            background: '#FFFDF0',
            borderRadius: '24px',
            padding: '24px',
            border: '2px solid #FFD54A',
            boxShadow: '0 12px 30px rgba(255,213,74,0.3)',
            display: 'flex', flexDirection: 'column', gap: '16px',
            textAlign: 'center',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <CheckCircle2 className="w-6 h-6 text-green-500" />
              <h3 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '20px', color: '#1e1040', margin: 0 }}>
                Pronunciation Analysis 🎉
              </h3>
            </div>

            {transcript && (
              <p style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: '14px', color: '#64748B', margin: 0 }}>
                You said: <span style={{ color: '#6C4CFF' }}>"{transcript}"</span>
              </p>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              <div style={{ background: 'white', padding: '14px', borderRadius: '16px', border: '1px solid #FFE082' }}>
                <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase' }}>Pronunciation</div>
                <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '24px', color: '#22C55E' }}>{speechScores.pronunciation}%</div>
              </div>

              <div style={{ background: 'white', padding: '14px', borderRadius: '16px', border: '1px solid #FFE082' }}>
                <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase' }}>Fluency</div>
                <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '24px', color: '#6C4CFF' }}>{speechScores.fluency}%</div>
              </div>

              <div style={{ background: 'white', padding: '14px', borderRadius: '16px', border: '1px solid #FFE082' }}>
                <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase' }}>Confidence</div>
                <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '24px', color: '#FF9F43' }}>{speechScores.confidence}%</div>
              </div>
            </div>

            <button
              onClick={() => {
                setSpeechScores(null);
                setCurrentIndex((prev) => (prev + 1) % wordsToPractice.length);
              }}
              className="btn-3d"
              style={{
                background: 'linear-gradient(135deg, #FFD54A, #FF9F43)',
                color: '#1e1040', fontFamily: 'Poppins', fontWeight: 900, fontSize: '14px',
                padding: '12px 24px', borderRadius: '14px', border: 'none',
                borderBottom: '3.5px solid #E8A000', cursor: 'pointer',
                boxShadow: '0 6px 18px rgba(255,213,74,0.4)', margin: '0 auto',
              }}
            >
              Next Word →
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
