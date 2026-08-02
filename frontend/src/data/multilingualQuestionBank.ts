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
  { code: 'en', name: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'Hindi', native: 'हिंदी', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', native: 'मराठी', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം', flag: '🇮🇳' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
  { code: 'as', name: 'Assamese', native: 'অসমীয়া', flag: '🇮🇳' },
  { code: 'ur', name: 'Urdu', native: 'اردو', flag: '🇮🇳' },
  { code: 'sa', name: 'Sanskrit', native: 'संस्कृतम्', flag: '🇮🇳' },
  { code: 'kok', name: 'Konkani', native: 'कोंकणी', flag: '🇮🇳' },
  { code: 'mni', name: 'Manipuri', native: 'মৈতৈলোন্', flag: '🇮🇳' },
  { code: 'brx', name: 'Bodo', native: 'बर’', flag: '🇮🇳' },
  { code: 'doi', name: 'Dogri', native: 'डोगरी', flag: '🇮🇳' },
  { code: 'mai', name: 'Maithili', native: 'मैथिली', flag: '🇮🇳' },
  { code: 'sat', name: 'Santali', native: 'ᱥᱟᱱᱛᱟᱲᱤ', flag: '🇮🇳' },
  { code: 'sd', name: 'Sindhi', native: 'سنڌي', flag: '🇮🇳' },
  { code: 'ks', name: 'Kashmiri', native: 'कॉशुर', flag: '🇮🇳' },
  { code: 'ne', name: 'Nepali', native: 'नेपाली', flag: '🇳🇵' },
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

// Core Multilingual Master Seed Questions (Standard JSON Schema)
export const masterQuestionBank: StandardQuestion[] = [
  {
    id: "EN_RD_000001",
    language: "English",
    game: "Picture Detective",
    level: 6,
    difficulty: "Easy",
    category: "Reading",
    topic: "Fruits",
    question: "Find the Apple",
    voice: "Find the Apple",
    emoji: "🍎",
    options: ["Apple", "Banana", "Orange", "Mango"],
    correct: "Apple",
    hint: "Apple is red and juicy.",
    reward: 10,
    streakBonus: 2,
    animation: "confetti"
  },
  {
    id: "HI_RD_000001",
    language: "Hindi",
    game: "Picture Detective",
    level: 6,
    difficulty: "Easy",
    category: "Reading",
    topic: "Fruits",
    question: "सेब चुनें",
    voice: "सेब चुनें",
    emoji: "🍎",
    options: ["सेब", "केला", "संतरा", "आम"],
    correct: "सेब",
    hint: "सेब लाल रंग का होता है।",
    reward: 10,
    streakBonus: 2,
    animation: "confetti"
  },
  {
    id: "GU_RD_000001",
    language: "Gujarati",
    game: "Picture Detective",
    level: 6,
    difficulty: "Easy",
    category: "Reading",
    topic: "Fruits",
    question: "સફરજન શોધો",
    voice: "સફરજન શોધો",
    emoji: "🍎",
    options: ["સફરજન", "કેળું", "નારીયળ", "કેરી"],
    correct: "સફરજન",
    hint: "સફરજન લાલ રંગનું ફળ છે.",
    reward: 10,
    streakBonus: 2,
    animation: "confetti"
  },
  {
    id: "EN_WR_000002",
    language: "English",
    game: "Drag Sentence",
    level: 8,
    difficulty: "Easy",
    category: "Writing",
    topic: "Simple Sentences",
    question: "Arrange the words into the correct sentence:",
    voice: "Arrange the words: Neo loves reading books",
    emoji: "📚",
    options: ["Neo loves reading books", "reading books loves Neo", "books Neo loves reading"],
    correct: "Neo loves reading books",
    hint: "Start with the name Neo.",
    reward: 15,
    streakBonus: 3,
    animation: "stars"
  },
  {
    id: "HI_WR_000002",
    language: "Hindi",
    game: "Drag Sentence",
    level: 8,
    difficulty: "Easy",
    category: "Writing",
    topic: "Simple Sentences",
    question: "वाक्य को सही क्रम में लगाएं:",
    voice: "नियो किताबें पढ़ना पसंद करता है",
    emoji: "📚",
    options: ["नियो किताबें पढ़ना पसंद करता है", "किताबें नियो पसंद पढ़ता है", "पढ़ता है नियो किताबें"],
    correct: "नियो किताबें पढ़ना पसंद करता है",
    hint: "नियो से शुरू करें।",
    reward: 15,
    streakBonus: 3,
    animation: "stars"
  },
  {
    id: "EN_SP_000003",
    language: "English",
    game: "Repeat After Neo",
    level: 11,
    difficulty: "Medium",
    category: "Speaking",
    topic: "Conversations",
    question: "Repeat out loud: 'Good Morning! Have a wonderful day!'",
    voice: "Good Morning! Have a wonderful day!",
    emoji: "🌞",
    options: ["Good Morning! Have a wonderful day!"],
    correct: "Good Morning! Have a wonderful day!",
    hint: "Speak clearly into the microphone.",
    reward: 20,
    streakBonus: 5,
    animation: "fireworks"
  }
];

// Dynamic Infinite AI Question Generator
export function generateAIQuestion(language: string, category: string, level: number): StandardQuestion {
  const langName = language || 'English';
  const levelObj = DIFFICULTY_LEVELS.find(l => l.level === level) || DIFFICULTY_LEVELS[2];

  const fruits: Record<string, string[]> = {
    English: ['Apple', 'Banana', 'Mango', 'Orange'],
    Hindi: ['सेब', 'केला', 'आम', 'संतरा'],
    Gujarati: ['સફરજન', 'કેળું', 'કેરી', 'નારંગી'],
    Telugu: ['యాపిల్', 'అరటి', 'మామిడి', 'నారింజ'],
    Tamil: ['ஆப்பிள்', 'வாழைப்பழம்', 'மாம்பழம்', 'ஆரஞ்சு']
  };

  const currentFruits = fruits[langName] || fruits['English'];
  const targetFruit = currentFruits[0];

  return {
    id: `${langName.substring(0, 2).toUpperCase()}_GEN_${Date.now()}`,
    language: langName,
    game: "AI Adaptive Quiz",
    level: level,
    difficulty: level <= 5 ? 'Easy' : level <= 10 ? 'Medium' : 'Hard',
    category: (category as any) || 'Reading',
    topic: levelObj.name,
    question: `[Level ${level} ${levelObj.name}] Find the correct item in ${langName}:`,
    voice: `Find ${targetFruit}`,
    emoji: '🌟',
    options: currentFruits,
    correct: targetFruit,
    hint: `Select ${targetFruit}`,
    reward: 10 + level * 2,
    streakBonus: 2 + Math.floor(level / 3),
    animation: 'confetti'
  };
}
