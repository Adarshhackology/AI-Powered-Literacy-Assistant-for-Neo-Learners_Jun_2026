import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Volume2, CheckCircle2, AlertCircle } from 'lucide-react';

const assessmentTranslations: Record<string, any> = {
  english: {
    title: "Initial Assessment",
    subtitle: "Let's find out your current skill levels.",
    reading: "Reading",
    writing: "Writing",
    comprehension: "Comprehension",
    next: "Next Section",
    submit: "Submit & View Results",
    readingHeader: "Section 1: Reading",
    speakBtn: "Listen",
    readingPara: "The sun rises in the east. Birds sing in the trees. It is a beautiful morning.",
    readingQ: "Question: When does the sun rise?",
    options1: { 'Morning': 'Morning', 'Evening': 'Evening', 'Night': 'Night', 'Afternoon': 'Afternoon' },
    writingHeader: "Section 2: Writing",
    writingQ: "Task: Write a sentence about your favorite food or your home city.",
    writingHelp: "Write at least 5 words. Make sure to use capital letters and end with a period.",
    placeholder: "Type your sentence here...",
    grammarHelp: "Grammar Help Desk",
    grammarCaps: "Capital Letter",
    grammarPeriod: "Ends with Period (.)",
    grammarMinWords: "5+ Words Required",
    wordCount: "Word Count",
    compHeader: "Section 3: Comprehension",
    compSpeak: "Listen Story",
    compPara: "Rohan wanted to buy a book. The book was 50 rupees. Rohan saved 10 rupees every week. After five weeks, he had enough money to buy his book. Rohan was very happy.",
    compQ1: "Q1. How much did the book cost?",
    compQ2: "Q2. How long did Rohan take to save the money?",
    options3_1: { '10 rupees': '10 rupees', '50 rupees': '50 rupees', '100 rupees': '100 rupees', 'Free': 'Free' },
    options3_2: { '1 week': '1 week', '5 weeks': '5 weeks', '2 weeks': '2 weeks', '10 weeks': '10 weeks' }
  },
  hindi: {
    title: "प्रारंभिक मूल्यांकन",
    subtitle: "चलो आपके वर्तमान कौशल स्तरों का पता लगाएं।",
    reading: "पठन (Reading)",
    writing: "लेखन (Writing)",
    comprehension: "समझ (Comprehension)",
    next: "अगला भाग",
    submit: "मूल्यांकन जमा करें",
    readingHeader: "भाग १: पठन (Reading)",
    speakBtn: "सुनें (Listen)",
    readingPara: "The sun rises in the east. Birds sing in the trees. It is a beautiful morning.",
    readingQ: "प्रश्न: सूरज कब उगता है? (When does the sun rise?)",
    options1: { 'Morning': 'सुबह (Morning)', 'Evening': 'शाम (Evening)', 'Night': 'रात (Night)', 'Afternoon': 'दोपहर (Afternoon)' },
    writingHeader: "भाग २: लेखन (Writing)",
    writingQ: "कार्य: अपने पसंदीदा भोजन या अपने शहर के बारे में एक वाक्य अंग्रेजी में लिखें।",
    writingHelp: "कम से कम ५ शब्द लिखें। बड़े अक्षरों (Capital letters) का प्रयोग करें और अंत में पूर्ण विराम (.) लगाएं।",
    placeholder: "अपना वाक्य यहाँ लिखें...",
    grammarHelp: "व्याकरण सहायता डेस्क",
    grammarCaps: "बड़ा अक्षर (Capital Letter)",
    grammarPeriod: "पूर्ण विराम (.) पर समाप्त",
    grammarMinWords: "५+ शब्दों की आवश्यकता",
    wordCount: "शब्दों की संख्या",
    compHeader: "भाग ३: समझ (Comprehension)",
    compSpeak: "कहानी सुनें (Listen)",
    compPara: "Rohan wanted to buy a book. The book was 50 rupees. Rohan saved 10 rupees every week. After five weeks, he had enough money to buy his book. Rohan was very happy.",
    compQ1: "प्रश्न १: किताब की कीमत कितनी थी? (How much did the book cost?)",
    compQ2: "प्रश्न २: रोहन को पैसे बचाने में कितना समय लगा? (How long did he take?)",
    options3_1: { '10 rupees': '१० रुपये (10 Rs)', '50 rupees': '५० रुपये (50 Rs)', '100 rupees': '१०० रुपये (100 Rs)', 'Free': 'मुफ़्त (Free)' },
    options3_2: { '1 week': '१ सप्ताह (1 week)', '5 weeks': '५ सप्ताह (5 weeks)', '2 weeks': '२ सप्ताह (2 weeks)', '10 weeks': '१० सप्ताह (10 weeks)' }
  },
  tamil: {
    title: "தொடக்க மதிப்பீடு",
    subtitle: "உங்கள் தற்போதைய திறன்களைக் கண்டறியலாம்.",
    reading: "வாசிப்பு (Reading)",
    writing: "எழுத்து (Writing)",
    comprehension: "புரிந்துகொள்ளுதல் (Comprehension)",
    next: "அடுத்த பகுதி",
    submit: "மதிப்பீட்டைச் சமர்ப்பி",
    readingHeader: "பகுதி 1: வாசிப்பு (Reading)",
    speakBtn: "கேளுங்கள்",
    readingPara: "The sun rises in the east. Birds sing in the trees. It is a beautiful morning.",
    readingQ: "கேள்வி: சூரியன் எப்போது உதிக்கிறது? (When does the sun rise?)",
    options1: { 'Morning': 'காலை (Morning)', 'Evening': 'மாலை (Evening)', 'Night': 'இரவு (Night)', 'Afternoon': 'மதியம் (Afternoon)' },
    writingHeader: "பகுதி 2: எழுத்து (Writing)",
    writingQ: "பணி: உங்களுக்கு பிடித்த உணவு அல்லது உங்கள் ஊரைப் பற்றி ஆங்கிலத்தில் ஒரு வாக்கியம் எழுதுங்கள்.",
    writingHelp: "குறைந்தது 5 வார்த்தைகள் எழுதவும். பெரிய எழுத்தில் (Capital) தொடங்கி, முற்றுப்புள்ளியுடன் (.) முடிக்கவும்.",
    placeholder: "வாக்கியத்தை இங்கே தட்டச்சு செய்யவும்...",
    grammarHelp: "இலக்கண உதவி",
    grammarCaps: "பெரிய எழுத்து (Capital)",
    grammarPeriod: "முற்றுப்புள்ளி (.) உடன் முடியும்",
    grammarMinWords: "5+ வார்த்தைகள் தேவை",
    wordCount: "வார்த்தை எண்ணிக்கை",
    compHeader: "பகுதி 3: புரிந்துகொள்ளுதல் (Comprehension)",
    compSpeak: "கதையை கேளுங்கள்",
    compPara: "Rohan wanted to buy a book. The book was 50 rupees. Rohan saved 10 rupees every week. After five weeks, he had enough money to buy his book. Rohan was very happy.",
    compQ1: "கேள்வி 1: புத்தகத்தின் விலை எவ்வளவு? (How much did the book cost?)",
    compQ2: "கேள்வி 2: ரோகன் பணம் சேமிக்க எவ்வளவு காலம் எடுத்தது? (How long did he take?)",
    options3_1: { '10 rupees': '10 ரூபாய் (10 Rs)', '50 rupees': '50 ரூபாய் (50 Rs)', '100 rupees': '100 ரூபாய் (100 Rs)', 'Free': 'இலவசம் (Free)' },
    options3_2: { '1 week': '1 வாரம் (1 week)', '5 weeks': '5 வாரங்கள் (5 weeks)', '2 weeks': '2 வாரங்கள் (2 weeks)', '10 weeks': '10 வாரங்கள் (10 weeks)' }
  },
  telugu: {
    title: "ప్రారంభ అంచనా",
    subtitle: "మీ ప్రస్తుత నైపుణ్య స్థాయిలను తెలుసుకుందాం.",
    reading: "చదవడం (Reading)",
    writing: "రాయడం (Writing)",
    comprehension: "అవగాహన (Comprehension)",
    next: "తదుపరి విభాగం",
    submit: "సమర్పించండి",
    readingHeader: "విభాగం 1: చదవడం (Reading)",
    speakBtn: "వినండి",
    readingPara: "The sun rises in the east. Birds sing in the trees. It is a beautiful morning.",
    readingQ: "ప్రశ్న: సూర్యుడు ఎప్పుడు ఉదయిస్తాడు? (When does the sun rise?)",
    options1: { 'Morning': 'ఉదయం (Morning)', 'Evening': 'సాయంత్రం (Evening)', 'Night': 'రాత్రి (Night)', 'Afternoon': 'మధ్యాహ్నం (Afternoon)' },
    writingHeader: "విభాగం 2: రాయడం (Writing)",
    writingQ: "టాస్క్: మీకు ఇష్టమైన ఆహారం లేదా మీ స్వంత ఊరు గురించి ఇంగ్లీష్ లో ఒక వాక్యం రాయండి.",
    writingHelp: "కనీసం 5 పదాలు రాయండి. క్యాపిటల్ లెటర్స్ వాడండి మరియు చివర ఫుల్ స్టాప్ (.) ఉంచండి.",
    placeholder: "మీ వాక్యం ఇక్కడ రాయండి...",
    grammarHelp: "వ్యాకరణ సహాయం",
    grammarCaps: "క్యాపిటల్ లెటర్",
    grammarPeriod: "ఫుల్ స్టాప్ (.) తో ముగుస్తుంది",
    grammarMinWords: "5+ పదాలు ఉండాలి",
    wordCount: "పదాల సంఖ్య",
    compHeader: "విభాగం 3: అవగాహన (Comprehension)",
    compSpeak: "కథ వినండి",
    compPara: "Rohan wanted to buy a book. The book was 50 rupees. Rohan saved 10 rupees every week. After five weeks, he had enough money to buy his book. Rohan was very happy.",
    compQ1: "ప్రశ్న 1: పుస్తకం ధర ఎంత? (How much did the book cost?)",
    compQ2: "ప్రశ్న 2: రోహన్ డబ్బు దాచుకోవడానికి ఎంత సమయం పట్టింది?",
    options3_1: { '10 rupees': '10 రూపాయలు (10 Rs)', '50 rupees': '50 రూపాయలు (50 Rs)', '100 rupees': '100  రూపాయలు (100 Rs)', 'Free': 'ఉచితం (Free)' },
    options3_2: { '1 week': '1 వారం (1 week)', '5 weeks': '5 వారాలు (5 weeks)', '2 weeks': '2 వారాలు (2 weeks)', '10 weeks': '10 వారాలు (10 weeks)' }
  },
  kannada: {
    title: "ಆರಂಭಿಕ ಮೌಲ್ಯಮಾಪನ",
    subtitle: "ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಕೌಶಲ್ಯ ಮಟ್ಟವನ್ನು ಕಂಡುಹಿಡಿಯೋಣ.",
    reading: "ಓದುವಿಕೆ (Reading)",
    writing: "ಬರವಣಿಗೆ (Writing)",
    comprehension: "ಗ್ರಹಿಕೆ (Comprehension)",
    next: "ಮುಂದಿನ ವಿಭಾಗ",
    submit: "ಮೌಲ್ಯಮಾಪನ ಸಲ್ಲಿಸಿ",
    readingHeader: "ವಿಭಾಗ 1: ಓದುವಿಕೆ (Reading)",
    speakBtn: "ಕೇಳಿ (Listen)",
    readingPara: "The sun rises in the east. Birds sing in the trees. It is a beautiful morning.",
    readingQ: "ಪ್ರಶ್ನೆ: ಸೂರ್ಯನು ಯಾವಾಗ ಉದಯಿಸುತ್ತಾನೆ? (When does the sun rise?)",
    options1: { 'Morning': 'ಬೆಳಿಗ್ಗೆ (Morning)', 'Evening': 'ಸಂಜೆ (Evening)', 'Night': 'ರಾತ್ರಿ (Night)', 'Afternoon': 'ಮಧ್ಯಾಹ್ನ (Afternoon)' },
    writingHeader: "ವಿಭಾಗ 2: ಬರವಣಿಗೆ (Writing)",
    writingQ: "ಕಾರ್ಯ: ನಿಮ್ಮ ನೆಚ್ಚಿನ ಆಹಾರ ಅಥವಾ ನಿಮ್ಮ ನಗರದ ಬಗ್ಗೆ ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಒಂದು ವಾಕ್ಯವನ್ನು ಬರೆಯಿರಿ.",
    writingHelp: "ಕನಿಷ್ಠ 5 ಪದಗಳನ್ನು ಬರೆಯಿರಿ. ಕ್ಯಾಪಿಟಲ್ ಅಕ್ಷರಗಳನ್ನು ಬಳಸಿ ಮತ್ತು ಕೊನೆಯಲ್ಲಿ ಚುಕ್ಕೆ (.) ಇರಿಸಿ.",
    placeholder: "ನಿಮ್ಮ ವಾಕ್ಯವನ್ನು ಇಲ್ಲಿ ಬರೆಯಿರಿ...",
    grammarHelp: "ವ್ಯಾಕರಣ ಸಹಾಯ",
    grammarCaps: "ಕ್ಯಾಪಿಟಲ್ ಅಕ್ಷರ",
    grammarPeriod: "ಚುಕ್ಕೆ (.) ಯೊಂದಿಗೆ ಕೊನೆಗೊಳ್ಳುತ್ತದೆ",
    grammarMinWords: "5+ ಪದಗಳು ಬೇಕು",
    wordCount: "ಪದಗಳ ಸಂಖ್ಯೆ",
    compHeader: "ವಿಭಾಗ 3: ಗ್ರಹಿಕೆ (Comprehension)",
    compSpeak: "ಕಥೆಯನ್ನು ಕೇಳಿ",
    compPara: "Rohan wanted to buy a book. The book was 50 rupees. Rohan saved 10 rupees every week. After five weeks, he had enough money to buy his book. Rohan was very happy.",
    compQ1: "ಪ್ರಶ್ನೆ 1: ಪುಸ್ತಕದ ಬೆಲೆ ಎಷ್ಟು? (How much did the book cost?)",
    compQ2: "ಪ್ರಶ್ನೆ 2: ರೋಹನ್ ಹಣ ಉಳಿಸಲು ಎಷ್ಟು ಸಮಯ ತಗೆದುಕೊಂಡನು?",
    options3_1: { '10 rupees': '10 ರೂಪಾಯಿ (10 Rs)', '50 rupees': '50 ರೂಪಾಯಿ (50 Rs)', '100 rupees': '100 ರೂಪಾಯಿ (100 Rs)', 'Free': 'ಉಚಿತ (Free)' },
    options3_2: { '1 week': '1 ವಾರ (1 week)', '5 weeks': '5 ವಾರಗಳು (5 weeks)', '2 weeks': '2 ವಾರಗಳು (2 weeks)', '10 weeks': '10 ವಾರಗಳು (10 weeks)' }
  }
};

export default function Assessment() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const navigate = useNavigate();
  const [userLang, setUserLang] = useState<string>('english');

  // Load language settings on mount
  useEffect(() => {
    const saved = localStorage.getItem('preferredLanguage') || 'english';
    setUserLang(saved);
  }, []);

  const t = assessmentTranslations[userLang] || assessmentTranslations.english;

  // Step 1: Reading state
  const [readingAns, setReadingAns] = useState('');
  
  // Step 2: Writing state
  const [writingText, setWritingText] = useState('');
  
  // Step 3: Comprehension state
  const [compAns1, setCompAns1] = useState('');
  const [compAns2, setCompAns2] = useState('');

  // Grammar Helper checks for writing
  const wordsCount = writingText.trim() === '' ? 0 : writingText.trim().split(/\s+/).length;
  const startsWithCapital = /^[A-Z]/.test(writingText.trim());
  const endsWithPeriod = /\.$/.test(writingText.trim());
  const hasMinWords = wordsCount >= 5;

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85; // slightly slower for learners
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Speech Synthesis not supported in this browser.');
    }
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!readingAns) {
        alert('Please choose an answer before continuing.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (wordsCount < 3) {
        alert('Please write at least a short response (3+ words) to continue.');
        return;
      }
      setStep(3);
    }
  };

  const handleSubmit = () => {
    if (!compAns1 || !compAns2) {
      alert('Please answer the comprehension questions.');
      return;
    }

    // Calculate score
    let readingScore = readingAns === 'Morning' ? 100 : 0;
    
    // Writing score out of 100 based on grammatical markers
    let writingScore = 0;
    if (hasMinWords) writingScore += 40;
    else if (wordsCount >= 3) writingScore += 20;
    if (startsWithCapital) writingScore += 30;
    if (endsWithPeriod) writingScore += 30;

    let compScore = 0;
    if (compAns1 === '50 rupees') compScore += 50;
    if (compAns2 === '5 weeks') compScore += 50;

    const overallScore = Math.round((readingScore + writingScore + compScore) / 3);

    // Save assessment results
    const results = {
      readingScore,
      writingScore,
      comprehensionScore: compScore,
      overallScore,
      completedAt: new Date().toISOString()
    };
    
    localStorage.setItem('assessmentResult', JSON.stringify(results));
    
    // Update local profile stats
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.profile) {
      user.profile.readingLevel = overallScore >= 75 ? 'Advanced' : overallScore >= 45 ? 'Intermediate' : 'Beginner';
      user.profile.writingLevel = writingScore >= 70 ? 'Advanced' : writingScore >= 40 ? 'Intermediate' : 'Beginner';
      user.profile.xp = (user.profile.xp || 0) + 50; // quiz XP bonus
      user.profile.coins = (user.profile.coins || 0) + 15;
      localStorage.setItem('user', JSON.stringify(user));
      
      // Update profiles listing in DB
      const username = localStorage.getItem('username') || 'guest';
      const profiles = JSON.parse(localStorage.getItem('profiles') || '[]');
      const idx = profiles.findIndex((p: any) => p.username === username);
      if (idx !== -1) {
        profiles[idx] = { ...profiles[idx], ...user.profile };
        localStorage.setItem('profiles', JSON.stringify(profiles));
      }
    }

    navigate('/ai-evaluation');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6 flex flex-col items-center justify-center font-inter">
      <div className="max-w-3xl w-full bg-white border border-slate-200/50 p-8 md:p-10 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.03)] space-y-8">
        
        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-3.5xl font-black text-slate-900 tracking-tight">{t.title}</h1>
          <p className="text-slate-500 font-semibold text-sm">{t.subtitle}</p>
        </div>

        {/* Progress bar visual */}
        <div className="space-y-3">
          <div className="flex justify-between text-[11px] font-bold text-slate-400 uppercase tracking-widest pl-1">
            <span>{t.reading}</span>
            <span>{t.writing}</span>
            <span>{t.comprehension}</span>
          </div>
          <div className="grid grid-cols-3 gap-2 h-2">
            <div className={`rounded-full transition-all duration-300 ${step >= 1 ? 'bg-indigo-600' : 'bg-slate-100'}`} />
            <div className={`rounded-full transition-all duration-300 ${step >= 2 ? 'bg-indigo-600' : 'bg-slate-100'}`} />
            <div className={`rounded-full transition-all duration-300 ${step >= 3 ? 'bg-indigo-600' : 'bg-slate-100'}`} />
          </div>
        </div>

        {/* Wizard Steps */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-black text-slate-950 flex items-center gap-2">
                <span>{t.readingHeader}</span>
              </h2>
              <button
                onClick={() => handleSpeak("Identify the sentence, read carefully: The sun rises in the east. It is a beautiful morning. Question: When does the sun rise?")}
                className="bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/80 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                title="Listen to paragraph"
              >
                <Volume2 className="w-4.5 h-4.5 text-indigo-500" />
                <span>{t.speakBtn}</span>
              </button>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-base leading-relaxed text-slate-800 font-semibold font-serif text-center">
              "{t.readingPara}"
            </div>

            <div className="space-y-4">
              <label className="block font-extrabold text-slate-855 text-sm uppercase tracking-wide pl-1">{t.readingQ}</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Morning', 'Evening', 'Night', 'Afternoon'].map((opt) => (
                  <label
                    key={opt}
                    className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                      readingAns === opt
                        ? 'border-indigo-600 bg-indigo-50/20 text-indigo-900 font-bold ring-4 ring-indigo-500/5'
                        : 'border-slate-200/80 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <span className="text-sm font-semibold">{t.options1[opt] || opt}</span>
                    <input
                      type="radio"
                      name="reading"
                      value={opt}
                      checked={readingAns === opt}
                      onChange={() => setReadingAns(opt)}
                      className="w-4 h-4 text-indigo-600 border-slate-300"
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={handleNextStep}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm px-8 py-3.5 rounded-2xl shadow-md hover:shadow-indigo-600/15 active:scale-95 transition-all cursor-pointer"
              >
                <span>{t.next}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-black text-slate-950 flex items-center gap-2">
                <span>{t.writingHeader}</span>
              </h2>
            </div>

            <div className="space-y-2">
              <label className="block font-extrabold text-slate-800 text-sm">{t.writingQ}</label>
              <p className="text-slate-400 text-xs font-semibold">{t.writingHelp}</p>
            </div>

            <div className="relative">
              <textarea
                value={writingText}
                onChange={(e) => setWritingText(e.target.value)}
                className="w-full h-32 p-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 text-slate-800 font-semibold text-base placeholder:text-slate-400"
                placeholder={t.placeholder}
              />
              <div className="absolute right-4 bottom-4 bg-white/80 backdrop-blur border border-slate-100 px-3 py-1 rounded-full text-[10px] font-bold text-slate-500">
                {t.wordCount}: {wordsCount}
              </div>
            </div>

            {/* Grammar Hints Visual */}
            <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-200/50 space-y-3">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">{t.grammarHelp}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="flex items-center gap-2">
                  {startsWithCapital ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-amber-500/80 shrink-0" />
                  )}
                  <span className={`text-xs font-semibold ${startsWithCapital ? 'text-slate-700' : 'text-slate-400'}`}>{t.grammarCaps}</span>
                </div>
                <div className="flex items-center gap-2">
                  {endsWithPeriod ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-amber-500/80 shrink-0" />
                  )}
                  <span className={`text-xs font-semibold ${endsWithPeriod ? 'text-slate-700' : 'text-slate-400'}`}>{t.grammarPeriod}</span>
                </div>
                <div className="flex items-center gap-2">
                  {hasMinWords ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-amber-500/80 shrink-0" />
                  )}
                  <span className={`text-xs font-semibold ${hasMinWords ? 'text-slate-700' : 'text-slate-400'}`}>{t.grammarMinWords}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={handleNextStep}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm px-8 py-3.5 rounded-2xl shadow-md hover:shadow-indigo-600/15 active:scale-95 transition-all cursor-pointer"
              >
                <span>{t.next}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-black text-slate-955 flex items-center gap-2">
                <span>{t.compHeader}</span>
              </h2>
              <button
                onClick={() => handleSpeak("Read the story: Rohan wanted to buy a book. The book was 50 rupees. Rohan saved 10 rupees every week. After five weeks, he had enough money to buy his book. Rohan was very happy. Now answer the questions.")}
                className="bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/80 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Volume2 className="w-4.5 h-4.5 text-indigo-500" />
                <span>{t.compSpeak}</span>
              </button>
            </div>

            {/* Story Card */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-base leading-relaxed text-slate-800 font-semibold font-serif">
              "{t.compPara}"
            </div>

            {/* Question 1 */}
            <div className="space-y-3">
              <label className="block font-extrabold text-slate-800 text-sm pl-1">{t.compQ1}</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['10 rupees', '50 rupees', '100 rupees', 'Free'].map((opt) => (
                  <label
                    key={opt}
                    className={`p-3.5 rounded-2xl border flex flex-col items-center justify-center cursor-pointer text-center text-xs font-bold transition-all ${
                      compAns1 === opt
                        ? 'border-indigo-600 bg-indigo-50/20 text-indigo-900 font-bold ring-4 ring-indigo-500/5'
                        : 'border-slate-200/80 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <span>{t.options3_1[opt] || opt}</span>
                    <input
                      type="radio"
                      name="comp1"
                      value={opt}
                      checked={compAns1 === opt}
                      onChange={() => setCompAns1(opt)}
                      className="sr-only"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Question 2 */}
            <div className="space-y-3">
              <label className="block font-extrabold text-slate-800 text-sm pl-1">{t.compQ2}</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['1 week', '5 weeks', '2 weeks', '10 weeks'].map((opt) => (
                  <label
                    key={opt}
                    className={`p-3.5 rounded-2xl border flex flex-col items-center justify-center cursor-pointer text-center text-xs font-bold transition-all ${
                      compAns2 === opt
                        ? 'border-indigo-600 bg-indigo-50/20 text-indigo-900 font-bold ring-4 ring-indigo-500/5'
                        : 'border-slate-200/80 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <span>{t.options3_2[opt] || opt}</span>
                    <input
                      type="radio"
                      name="comp2"
                      value={opt}
                      checked={compAns2 === opt}
                      onChange={() => setCompAns2(opt)}
                      className="sr-only"
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={handleSubmit}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm px-8 py-3.5 rounded-2xl shadow-md hover:shadow-indigo-600/15 active:scale-95 transition-all cursor-pointer"
              >
                <span>{t.submit}</span>
                <Sparkles className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
