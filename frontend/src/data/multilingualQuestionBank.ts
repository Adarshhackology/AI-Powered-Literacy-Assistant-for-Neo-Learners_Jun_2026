// Multilingual Standard Question Bank Schema & Generator for NeoLit Adventure

export interface StandardQuestion {
  id: string;
  language: string;
  game: string;
  level: number; // 1 to 15
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  category: 'Reading' | 'Writing' | 'Speaking' | 'Listening' | 'Grammar' | 'Vocabulary';
  topic: string;
  question: string;
  voice: string;
  image?: string;
  emoji?: string;
  options: string[];
  correct: string;
  hint: string;
  reward: number;
  streakBonus: number;
  animation: 'confetti' | 'stars' | 'fireworks';
}

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', native: 'English', flag: '🇬🇧', ttsLang: 'en-US' },
  { code: 'hi', name: 'Hindi', native: 'हिंदी', flag: '🇮🇳', ttsLang: 'hi-IN' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', flag: '🇮🇳', ttsLang: 'gu-IN' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা', flag: '🇮🇳', ttsLang: 'bn-IN' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', flag: '🇮🇳', ttsLang: 'te-IN' },
  { code: 'mr', name: 'Marathi', native: 'मराठी', flag: '🇮🇳', ttsLang: 'mr-IN' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', flag: '🇮🇳', ttsLang: 'ta-IN' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳', ttsLang: 'kn-IN' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം', flag: '🇮🇳', ttsLang: 'ml-IN' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', flag: '🇮🇳', ttsLang: 'pa-IN' },
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ', flag: '🇮🇳', ttsLang: 'or-IN' },
  { code: 'as', name: 'Assamese', native: 'অসমীয়া', flag: '🇮🇳', ttsLang: 'as-IN' },
  { code: 'ur', name: 'Urdu', native: 'اردو', flag: '🇮🇳', ttsLang: 'ur-IN' },
  { code: 'sa', name: 'Sanskrit', native: 'संस्कृतम्', flag: '🇮🇳', ttsLang: 'sa-IN' },
  { code: 'kok', name: 'Konkani', native: 'कोंकणी', flag: '🇮🇳', ttsLang: 'hi-IN' },
  { code: 'mni', name: 'Manipuri', native: 'মৈতৈলোন্', flag: '🇮🇳', ttsLang: 'bn-IN' },
  { code: 'brx', name: 'Bodo', native: 'बर’', flag: '🇮🇳', ttsLang: 'hi-IN' },
  { code: 'doi', name: 'Dogri', native: 'डोगरी', flag: '🇮🇳', ttsLang: 'hi-IN' },
  { code: 'mai', name: 'Maithili', native: 'मैथिली', flag: '🇮🇳', ttsLang: 'hi-IN' },
  { code: 'sat', name: 'Santali', native: 'ᱥᱟᱱᱛᱟᱲᱤ', flag: '🇮🇳', ttsLang: 'hi-IN' },
  { code: 'sd', name: 'Sindhi', native: 'سنڌي', flag: '🇮🇳', ttsLang: 'sd-IN' },
  { code: 'ks', name: 'Kashmiri', native: 'कॉशुर', flag: '🇮🇳', ttsLang: 'hi-IN' },
  { code: 'ne', name: 'Nepali', native: 'नेपाली', flag: '🇳🇵', ttsLang: 'ne-NP' },
];

export const DIFFICULTY_LEVELS = [
  { level: 1, name: 'Letters', desc: 'Identify individual alphabet letters' },
  { level: 2, name: 'Alphabet Sounds', desc: 'Phonics & letter sound pronunciation' },
  { level: 3, name: 'Simple Words', desc: '3-4 letter basic vocabulary' },
  { level: 4, name: 'Common Objects', desc: 'Household & classroom objects' },
  { level: 5, name: 'Animals', desc: 'Wild & domestic animals' },
  { level: 6, name: 'Fruits & Food', desc: 'Healthy fruits, vegetables & food' },
  { level: 7, name: 'Verbs & Actions', desc: 'Action words & daily activities' },
  { level: 8, name: 'Simple Sentences', desc: '3-5 word basic sentences' },
  { level: 9, name: 'Paragraph Reading', desc: 'Short story passages' },
  { level: 10, name: 'Stories & Tales', desc: 'Fairytales & moral stories' },
  { level: 11, name: 'Conversations', desc: 'Real-world dialogues & roleplay' },
  { level: 12, name: 'Grammar & Syntax', desc: 'Tenses, nouns & adjectives' },
  { level: 13, name: 'News & Signboards', desc: 'Public signs & news headlines' },
  { level: 14, name: 'Formal Writing', desc: 'Letters, essays & applications' },
  { level: 15, name: 'Advanced Fluency', desc: 'Proverbs, idioms & fast reading' },
];

export function getLanguagePrompts(lang: string) {
  const n = (lang || '').toLowerCase();
  if (n.includes('gu') || n.includes('gujarati') || n.includes('ગુજરાતી')) {
    return {
      findApple: 'સફરજન શોધો',
      apple: 'સફરજન',
      banana: 'કેળું',
      cat: 'બિલાડી',
      dog: 'કૂતરો',
      sunshine: 'સૂર્યપ્રકાશ આપણા નાના ગલુડિયાને આનંદ આપે છે.',
      targetSentence: 'નિયો પુસ્તકો વાંચવાનું પસંદ કરે છે',
      readAloud: 'નમસ્તે! તમારો દિવસ શુભ રહે!',
      missingWord: 'સફરજન લાલ રંગનું ફળ છે',
      bossQuestion: 'કયો શબ્દ "ખૂબ ખુશ" દર્શાવે છે?',
      bossAnswer: 'આનંદી',
    };
  }
  if (n.includes('hi') || n.includes('hindi') || n.includes('हिंदी')) {
    return {
      findApple: 'सेब चुनें',
      apple: 'सेब',
      banana: 'केला',
      cat: 'बिल्ली',
      dog: 'कुत्ता',
      sunshine: 'सूरज की रोशनी हमारे छोटे पिल्ले को खुशी देती है।',
      targetSentence: 'नियो किताबें पढ़ना पसंद करता है',
      readAloud: 'नमस्ते! आपका दिन शुभ हो!',
      missingWord: 'सेब लाल रंग का फल है',
      bossQuestion: 'कौन सा शब्द "बहुत खुश" दर्शाता है?',
      bossAnswer: 'आनंदित',
    };
  }
  if (n.includes('te') || n.includes('telugu') || n.includes('తెలుగు')) {
    return {
      findApple: 'యాపిల్ ఎంచుకోండి',
      apple: 'యాపిల్',
      banana: 'అరటి',
      cat: 'పిల్లి',
      dog: 'కుక్క',
      sunshine: 'సూర్యరశ్మి మా చిన్న కుక్కపిల్లకు సంతోషాన్ని ఇస్తుంది.',
      targetSentence: 'నియో పుస్తకాలు చదవడానికి ఇష్టపడతాడు',
      readAloud: 'నమస్కారం! మీ రోజు బాగుండాలి!',
      missingWord: 'యాపిల్ ఎర్రటి పండు',
      bossQuestion: 'ఏ పదం "చాలా సంతోషం" అని అర్థం?',
      bossAnswer: 'ఆనందకరమైన',
    };
  }
  if (n.includes('ta') || n.includes('tamil') || n.includes('தமிழ்')) {
    return {
      findApple: 'ஆப்பிளைத் தேர்ந்தெடுக்கவும்',
      apple: 'ஆப்பிள்',
      banana: 'வாழைப்பழம்',
      cat: 'பூனை',
      dog: 'நாய்',
      sunshine: 'சூரிய ஒளி எங்கள் சிறிய நாய்க்குட்டிக்கு மகிழ்ச்சியைத் தருகிறது.',
      targetSentence: 'நியோ புத்தகங்களைப் படிக்க விரும்புகிறார்',
      readAloud: 'வணக்கம்! நல்வாழ்த்துக்கள்!',
      missingWord: 'ஆப்பிள் ஒரு சிவப்பு பழம்',
      bossQuestion: 'எந்த சொல் "மிகவும் மகிழ்ச்சி" என்று பொருள்?',
      bossAnswer: 'மகிழ்ச்சியான',
    };
  }
  if (n.includes('bn') || n.includes('bengali') || n.includes('বাংলা')) {
    return {
      findApple: 'আপেল খুঁজুন',
      apple: 'আপেল',
      banana: 'কলা',
      cat: 'বিড়াল',
      dog: 'কুকুর',
      sunshine: 'সূর্যের আলো আমাদের ছোট্ট কুকুরছানাটিকে আনন্দ দেয়।',
      targetSentence: 'নিও বই পড়তে ভালোবাসে',
      readAloud: 'নমস্কার! আপনার দিনটি শুভ হোক!',
      missingWord: 'আপেল একটি লাল ফল',
      bossQuestion: 'কোন শব্দটি "খুব আনন্দিত" বোঝায়?',
      bossAnswer: 'আনন্দিত',
    };
  }
  if (n.includes('mr') || n.includes('marathi') || n.includes('मराठी')) {
    return {
      findApple: 'सफरचंद शोधा',
      apple: 'सफरचंद',
      banana: 'केळी',
      cat: 'मांजर',
      dog: 'कुत्रा',
      sunshine: 'सूर्याचा प्रकाश आमच्या लहान कुत्र्याच्या पिल्लाला आनंद देतो.',
      targetSentence: 'निओला पुस्तके वाचायला आवडतात',
      readAloud: 'नमस्कार! तुमचा दिवस आनंदाचा जावो!',
      missingWord: 'सफरचंद हे लाल रंगाचे फळ आहे',
      bossQuestion: 'कोणता शब्द "खूप आनंदी" दर्शवतो?',
      bossAnswer: 'आनंदी',
    };
  }
  return {
    findApple: 'Find the Apple',
    apple: 'Apple',
    banana: 'Banana',
    cat: 'Cat',
    dog: 'Dog',
    sunshine: 'The sunshine brings joy to our little puppy.',
    targetSentence: 'Neo loves reading books',
    readAloud: 'Hello! Have a wonderful day!',
    missingWord: 'Apple is a red fruit',
    bossQuestion: 'Which word means "very happy"?',
    bossAnswer: 'Joyful',
  };
}

// Dynamic Infinite AI Question Generator
export function generateAIQuestion(language: string, category: string, level: number): StandardQuestion {
  const langName = language || 'English';
  const levelObj = DIFFICULTY_LEVELS.find(l => l.level === level) || DIFFICULTY_LEVELS[2];
  const p = getLanguagePrompts(langName);

  return {
    id: `${langName.substring(0, 2).toUpperCase()}_GEN_${Date.now()}`,
    language: langName,
    game: "AI Adaptive Quiz",
    level: level,
    difficulty: level <= 5 ? 'Easy' : level <= 10 ? 'Medium' : 'Hard',
    category: (category as any) || 'Reading',
    topic: levelObj.name,
    question: p.findApple,
    voice: p.findApple,
    emoji: '🍎',
    options: [p.apple, p.banana, p.cat, p.dog],
    correct: p.apple,
    hint: `${p.apple}`,
    reward: 10 + level * 2,
    streakBonus: 2 + Math.floor(level / 3),
    animation: 'confetti'
  };
}
