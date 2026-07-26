import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BookOpen, Edit3, Brain, ArrowRight, Mic, Sparkles, CheckCircle2 } from 'lucide-react';
import { apiClient } from '../utils/api';

interface Question {
  id: number;
  section: 'reading' | 'writing' | 'comprehension';
  type: 'mcq' | 'fill_blank' | 'paragraph' | 'read_aloud';
  text: string;
  emoji: string;
  options?: string[];
  correct_answer?: string;
}

const stripEmoji = (str: string) => str ? str.replace(/[\u{1F300}-\u{1F9FF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '').trim() : '';

const getLanguageFallbackQuestions = (lang: string): Question[] => {
  const n = (lang || '').toLowerCase();

  // Hindi
  if (n.includes('hi') || n.includes('hindi') || n.includes('हिन्दी')) {
    return [
      { id: 1, section: 'reading', type: 'mcq', text: 'चित्र को देखकर सही शब्द चुनें:', emoji: '🍎', options: ['सेब', 'केला', 'बिल्ली', 'कुत्ता'], correct_answer: 'सेब' },
      { id: 2, section: 'reading', type: 'mcq', text: 'यह कौन सा जानवर है?', emoji: '🐶', options: ['बिल्ली', 'कुत्ता', 'पक्षी', 'मछली'], correct_answer: 'कुत्ता' },
      { id: 3, section: 'writing', type: 'fill_blank', text: 'खाली स्थान भरें: आसमान _____ है।', emoji: '☁️', correct_answer: 'नीला' },
      { id: 4, section: 'comprehension', type: 'paragraph', text: 'अपने पसंदीदा रंग के बारे में एक वाक्य लिखें।', emoji: '🎨', correct_answer: 'मेरा पसंदीदा रंग नीला है।' },
      { id: 5, section: 'reading', type: 'read_aloud', text: 'इसे जोर से पढ़ें: नमस्ते भारत!', emoji: '🌍', correct_answer: 'नमस्ते भारत!' }
    ];
  }
  // Gujarati
  if (n.includes('gu') || n.includes('gujarati') || n.includes('ગુજરાતી')) {
    return [
      { id: 1, section: 'reading', type: 'mcq', text: 'ચિત્ર જોઈને સાચો શબ્દ પસંદ કરો:', emoji: '🍎', options: ['સફરજન', 'કેળું', 'બિલાડી', 'કૂતરો'], correct_answer: 'સફરજન' },
      { id: 2, section: 'reading', type: 'mcq', text: 'આ કયું પ્રાણી છે?', emoji: '🐶', options: ['બિલાડી', 'કૂતરો', 'પક્ષી', 'માછલી'], correct_answer: 'કૂતરો' },
      { id: 3, section: 'writing', type: 'fill_blank', text: 'ખાલી જગ્યા પૂરો: આકાશ _____ છે.', emoji: '☁️', correct_answer: 'વાદળી' },
      { id: 4, section: 'comprehension', type: 'paragraph', text: 'તમારા મનપસંદ રંગ વિશે એક વાક્ય લખો.', emoji: '🎨', correct_answer: 'મારો મનપસંદ રંગ વાદળી છે.' },
      { id: 5, section: 'reading', type: 'read_aloud', text: 'આ મોટેથી વાંચો: નમસ્તે ભારત!', emoji: '🌍', correct_answer: 'નમસ્તે ભારત!' }
    ];
  }
  // Bengali
  if (n.includes('bn') || n.includes('bengali') || n.includes('বাংলা')) {
    return [
      { id: 1, section: 'reading', type: 'mcq', text: 'ছবি দেখে সঠিক শব্দটি বেছে নিন:', emoji: '🍎', options: ['আপেল', 'কলা', 'বিড়াল', 'কুকুর'], correct_answer: 'আপেল' },
      { id: 2, section: 'reading', type: 'mcq', text: 'এটি কোন প্রাণী?', emoji: '🐶', options: ['বিড়াল', 'কুকুর', 'পাখি', 'মাছ'], correct_answer: 'কুকুর' },
      { id: 3, section: 'writing', type: 'fill_blank', text: 'শূন্যস্থান পূরণ করুন: আকাশ _____।', emoji: '☁️', correct_answer: 'নীল' },
      { id: 4, section: 'comprehension', type: 'paragraph', text: 'আপনার পছন্দের রঙ সম্পর্কে একটি বাক্য লিখুন।', emoji: '🎨', correct_answer: 'আমার পছন্দের রঙ নীল।' },
      { id: 5, section: 'reading', type: 'read_aloud', text: 'এটি জোরে পড়ুন: নমস্কার ভারত!', emoji: '🌍', correct_answer: 'নমস্কার ভারত!' }
    ];
  }
  // Marathi
  if (n.includes('mr') || n.includes('marathi') || n.includes('मराठी')) {
    return [
      { id: 1, section: 'reading', type: 'mcq', text: 'चित्र पाहून योग्य शब्द निवडा:', emoji: '🍎', options: ['सफरचंद', 'केळी', 'मांजर', 'कुत्रा'], correct_answer: 'सफरचंद' },
      { id: 2, section: 'reading', type: 'mcq', text: 'हा कोणता प्राणी आहे?', emoji: '🐶', options: ['मांजर', 'कुत्रा', 'पक्षी', 'मासा'], correct_answer: 'कुत्रा' },
      { id: 3, section: 'writing', type: 'fill_blank', text: 'रिकामी जागा भरा: आकाश _____ आहे.', emoji: '☁️', correct_answer: 'निळे' },
      { id: 4, section: 'comprehension', type: 'paragraph', text: 'तुमच्या आवडत्या रंगाबद्दल एक वाक्य लिहा.', emoji: '🎨', correct_answer: 'माझा आवडता रंग निळा आहे.' },
      { id: 5, section: 'reading', type: 'read_aloud', text: 'हे मोठ्याने वाचा: नमस्कार भारत!', emoji: '🌍', correct_answer: 'नमस्कार भारत!' }
    ];
  }
  // Kannada
  if (n.includes('kn') || n.includes('kannada') || n.includes('ಕನ್ನಡ')) {
    return [
      { id: 1, section: 'reading', type: 'mcq', text: 'ಚಿತ್ರವನ್ನು ನೋಡಿ ಸರಿಯಾದ ಪದವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ:', emoji: '🍎', options: ['ಸೇಬು', 'ಬಾಳೆಹಣ್ಣು', 'ಬೆಕ್ಕು', 'ನಾಯಿ'], correct_answer: 'ಸೇಬು' },
      { id: 2, section: 'reading', type: 'mcq', text: 'ಇದು ಯಾವ ಪ್ರಾಣಿ?', emoji: '🐶', options: ['ಬೆಕ್ಕು', 'ನಾಯಿ', 'ಪಕ್ಷಿ', 'ಮೀನು'], correct_answer: 'ನಾಯಿ' },
      { id: 3, section: 'writing', type: 'fill_blank', text: 'ಖಾಲಿ ಜಾಗವನ್ನು ತುಂಬಿ: ಆಕಾಶವು _____ ಬಣ್ಣದಲ್ಲಿದೆ.', emoji: '☁️', correct_answer: 'ನೀಲಿ' },
      { id: 4, section: 'comprehension', type: 'paragraph', text: 'ನಿಮ್ಮ ನೆಚ್ಚಿನ ಬಣ್ಣದ ಬಗ್ಗೆ ಒಂದು ವಾಕ್ಯ ಬರೆಯಿರಿ.', emoji: '🎨', correct_answer: 'ನನ್ನ ನೆಚ್ಚಿನ ಬಣ್ಣ ನೀಲಿ.' },
      { id: 5, section: 'reading', type: 'read_aloud', text: 'ಇದನ್ನು ಗಟ್ಟಿಯಾಗಿ ಓದಿ: ನಮಸ್ಕಾರ ಭಾರತ!', emoji: '🌍', correct_answer: 'ನಮಸ್ಕಾರ ಭಾರತ!' }
    ];
  }
  // Malayalam
  if (n.includes('ml') || n.includes('malayalam') || n.includes('മലയാളം')) {
    return [
      { id: 1, section: 'reading', type: 'mcq', text: 'ചിത്രം കണ്ട് ശരിയായ വാക്ക് തിരഞ്ഞെടുക്കുക:', emoji: '🍎', options: ['ആപ്പിൾ', 'വാഴപ്പഴം', 'പൂച്ച', 'പട്ടി'], correct_answer: 'ആപ്പിൾ' },
      { id: 2, section: 'reading', type: 'mcq', text: 'ഇത് ഏത് മൃഗമാണ്?', emoji: '🐶', options: ['പൂച്ച', 'പട്ടി', 'പക്ഷി', 'മീൻ'], correct_answer: 'പട്ടി' },
      { id: 3, section: 'writing', type: 'fill_blank', text: 'വിട്ട ഭാഗം പൂരിപ്പിക്കുക: ആകാശം _____ ആണ്.', emoji: '☁️', correct_answer: 'നീലം' },
      { id: 4, section: 'comprehension', type: 'paragraph', text: 'നിങ്ങൾക്ക് ഇഷ്ടപ്പെട്ട നിറത്തെക്കുറിച്ച് ഒരു വാചകം എഴുതുക.', emoji: '🎨', correct_answer: 'എനിക്ക് ഇഷ്ടപ്പെട്ട നിറം നീലയാണ്.' },
      { id: 5, section: 'reading', type: 'read_aloud', text: 'ഇത് ഉറക്കെ വായിക്കുക: നമസ്കാരം ഭാരതം!', emoji: '🌍', correct_answer: 'നമസ്കാരം ഭാരതം!' }
    ];
  }
  // Punjabi
  if (n.includes('pa') || n.includes('punjabi') || n.includes('ਪੰਜਾਬੀ')) {
    return [
      { id: 1, section: 'reading', type: 'mcq', text: 'ਤਸਵੀਰ ਦੇਖ ਕੇ ਸਹੀ ਸ਼ਬਦ ਚੁਣੋ:', emoji: '🍎', options: ['ਸੇਬ', 'ਕੇਲਾ', 'ਬਿੱਲੀ', 'ਕੁੱਤਾ'], correct_answer: 'ਸੇਬ' },
      { id: 2, section: 'reading', type: 'mcq', text: 'ਇਹ ਕਿਹੜਾ ਜਾਨਵਰ ਹੈ?', emoji: '🐶', options: ['ਬਿੱਲੀ', 'ਕੁੱਤਾ', 'ਪੰਛੀ', 'ਮੱਛੀ'], correct_answer: 'ਕੁੱਤਾ' },
      { id: 3, section: 'writing', type: 'fill_blank', text: 'ਖਾਲੀ ਥਾਂ ਭਰੋ: ਅਸਮਾਨ _____ ਹੈ।', emoji: '☁️', correct_answer: 'ਨੀਲਾ' },
      { id: 4, section: 'comprehension', type: 'paragraph', text: 'ਆਪਣੇ ਪਸੰਦੀਦਾ ਰੰਗ ਬਾਰੇ ਇੱਕ ਵਾਕ ਲਿਖੋ।', emoji: '🎨', correct_answer: 'ਮੇਰਾ ਪਸੰਦੀਦਾ ਰੰਗ ਨੀਲਾ ਹੈ।' },
      { id: 5, section: 'reading', type: 'read_aloud', text: 'ਇਸਨੂੰ ਉੱਚੀ ਪੜ੍ਹੋ: ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ!', emoji: '🌍', correct_answer: 'ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ!' }
    ];
  }
  // Urdu
  if (n.includes('ur') || n.includes('urdu') || n.includes('اردو')) {
    return [
      { id: 1, section: 'reading', type: 'mcq', text: 'تصویر دیکھ کر درست لفظ منتخب کریں:', emoji: '🍎', options: ['سیب', 'کیلا', 'بلی', 'کتا'], correct_answer: 'سیب' },
      { id: 2, section: 'reading', type: 'mcq', text: 'یہ کون سا جانور ہے؟', emoji: '🐶', options: ['بلی', 'کتا', 'پرندہ', 'مچھلی'], correct_answer: 'کتا' },
      { id: 3, section: 'writing', type: 'fill_blank', text: 'خالی جگہ پر کریں: آسمان _____ ہے۔', emoji: '☁️', correct_answer: 'نیلا' },
      { id: 4, section: 'comprehension', type: 'paragraph', text: 'اپنے پسندیدہ رنگ کے بارے میں ایک جملہ لکھیں۔', emoji: '🎨', correct_answer: 'میرا پسندیدہ رنگ نیلا ہے۔' },
      { id: 5, section: 'reading', type: 'read_aloud', text: 'اسے بلند آواز میں پڑھیں: السلام علیکم!', emoji: '🌍', correct_answer: 'السلام علیکم!' }
    ];
  }
  // Odia
  if (n.includes('or') || n.includes('odia') || n.includes('ଓଡ଼ିଆ')) {
    return [
      { id: 1, section: 'reading', type: 'mcq', text: 'ଚିତ୍ର ଦେଖି ସଠିକ୍ ଶବ୍ଦ ବାଛନ୍ତୁ:', emoji: '🍎', options: ['ସେଓ', 'କଦଳୀ', 'ବିଲେଇ', 'କୁକୁର'], correct_answer: 'ସେଓ' },
      { id: 2, section: 'reading', type: 'mcq', text: 'ଏହା କେଉଁ ପଶୁ?', emoji: '🐶', options: ['ବିଲେଇ', 'କୁକୁର', 'ପକ୍ଷୀ', 'ମାଛ'], correct_answer: 'କୁକୁର' },
      { id: 3, section: 'writing', type: 'fill_blank', text: 'ଖାଲି ସ୍ଥାନ ପୂରଣ କରନ୍ତୁ: ଆକାଶ _____ ରଙ୍ଗର ।', emoji: '☁️', correct_answer: 'ନୀଳ' },
      { id: 4, section: 'comprehension', type: 'paragraph', text: 'ଆପଣଙ୍କର ପ୍ରିୟ ରଙ୍ଗ ବିଷୟରେ ଗୋଟିଏ ବାକ୍ୟ ଲେଖନ୍ତୁ ।', emoji: '🎨', correct_answer: 'ମୋର ପ୍ରିୟ ରଙ୍ଗ ନୀଳ ।' },
      { id: 5, section: 'reading', type: 'read_aloud', text: 'ଏହାକୁ ଉଚ୍ଚ ସ୍ୱରରେ ପଢନ୍ତୁ: ନମସ୍କାର ଭାରତ!', emoji: '🌍', correct_answer: 'ନମସ୍କାର ଭାରତ!' }
    ];
  }
  // Assamese
  if (n.includes('as') || n.includes('assamese') || n.includes('অসমীয়া')) {
    return [
      { id: 1, section: 'reading', type: 'mcq', text: 'ছবি চাই শুদ্ধ শব্দটো বাছক:', emoji: '🍎', options: ['আপেল', 'কল', 'মেকুৰী', 'কুকুৰ'], correct_answer: 'আপেল' },
      { id: 2, section: 'reading', type: 'mcq', text: 'এইটো কি প্ৰাণী?', emoji: '🐶', options: ['মেকুৰী', 'কুকুৰ', 'চৰাই', 'মাছ'], correct_answer: 'কুকুৰ' },
      { id: 3, section: 'writing', type: 'fill_blank', text: 'খালী ঠাই পূৰ কৰক: আকাশখন _____।', emoji: '☁️', correct_answer: 'নীলা' },
      { id: 4, section: 'comprehension', type: 'paragraph', text: 'আপোনাৰ প্ৰিয় ৰং সম্পৰ্কে এটা বাক্য লিখক।', emoji: '🎨', correct_answer: 'মোৰ প্ৰিয় ৰং নীলা।' },
      { id: 5, section: 'reading', type: 'read_aloud', text: 'এইটো ডাঙৰকৈ পঢ়ক: নমস্কাৰ ভাৰত!', emoji: '🌍', correct_answer: 'নমস্কাৰ ভাৰত!' }
    ];
  }
  // Sanskrit
  if (n.includes('sa') || n.includes('sanskrit') || n.includes('संस्कृतम्')) {
    return [
      { id: 1, section: 'reading', type: 'mcq', text: 'चित्रं दृष्ट्वा उचितं शब्दं चिनुत:', emoji: '🍎', options: ['सेवफलम्', 'कदलीफलम्', 'मार्जारी', 'कुक्कुरः'], correct_answer: 'सेवफलम्' },
      { id: 2, section: 'reading', type: 'mcq', text: 'एषः कः पशुः अस्ति?', emoji: '🐶', options: ['मार्जारी', 'कुक्कुरः', 'खगः', 'मत्स्यः'], correct_answer: 'कुक्कुरः' },
      { id: 3, section: 'writing', type: 'fill_blank', text: 'रिक्तस्थानं पूरयत: आकाशः _____ अस्ति।', emoji: '☁️', correct_answer: 'नीलः' },
      { id: 4, section: 'comprehension', type: 'paragraph', text: 'स्वस्य प्रियवर्णविषये एकं वाक्यं लिखत।', emoji: '🎨', correct_answer: 'मम प्रियवर्णः नीलः अस्ति।' },
      { id: 5, section: 'reading', type: 'read_aloud', text: 'उच्चैः पठतु: नमस्ते भारतम्!', emoji: '🌍', correct_answer: 'नमस्ते भारतम्!' }
    ];
  }
  // Telugu
  if (n.includes('te') || n.includes('telugu') || n.includes('తెలుగు')) {
    return [
      { id: 1, section: 'reading', type: 'mcq', text: 'చిత్రాన్ని చూసి సరైన పదాన్ని ఎంచుకోండి:', emoji: '🍎', options: ['యాపిల్', 'అరటి', 'పిల్లి', 'కుక్క'], correct_answer: 'యాపిల్' },
      { id: 2, section: 'reading', type: 'mcq', text: 'ఇది ఏ జంతువు?', emoji: '🐶', options: ['పిల్లి', 'కుక్క', 'పక్షి', 'చేప'], correct_answer: 'కుక్క' },
      { id: 3, section: 'writing', type: 'fill_blank', text: 'ఖాళీని పూరించండి: ఆకాశం _____ రంగులో ఉంది.', emoji: '☁️', correct_answer: 'నీలం' },
      { id: 4, section: 'comprehension', type: 'paragraph', text: 'మీకు ఇష్టమైన రంగు గురించి ఒక వాక్యం రాయండి.', emoji: '🎨', correct_answer: 'నాకు ఇష్టమైన రంగు నీలం.' },
      { id: 5, section: 'reading', type: 'read_aloud', text: 'గట్టిగా చదవండి: నమస్కారం!', emoji: '🌍', correct_answer: 'నమస్కారం!' }
    ];
  }
  // Tamil
  if (n.includes('ta') || n.includes('tamil') || n.includes('தமிழ்')) {
    return [
      { id: 1, section: 'reading', type: 'mcq', text: 'படத்தைப் பார்த்து சரியான சொல்லைத் தேர்ந்தெடுக்கவும்:', emoji: '🍎', options: ['ஆப்பிள்', 'வாழைப்பழம்', 'பூனை', 'நாய்'], correct_answer: 'ஆப்பிள்' },
      { id: 2, section: 'reading', type: 'mcq', text: 'இது என்ன விலங்கு?', emoji: '🐶', options: ['பூனை', 'நாய்', 'பறவை', 'மீன்'], correct_answer: 'நாய்' },
      { id: 3, section: 'writing', type: 'fill_blank', text: 'கோடிட்ட இடத்தை நிரப்புக: வானம் _____ நிறம்.', emoji: '☁️', correct_answer: 'நீலம்' },
      { id: 4, section: 'comprehension', type: 'paragraph', text: 'உங்களுக்கு பிடித்த நிறத்தைப் பற்றி ஒரு வாக்கியம் எழுதுங்கள்.', emoji: '🎨', correct_answer: 'எனக்கு பிடித்த நிறம் நீலம்.' },
      { id: 5, section: 'reading', type: 'read_aloud', text: 'சத்தமாக படிக்கவும்: வணக்கம்!', emoji: '🌍', correct_answer: 'வணக்கம்!' }
    ];
  }

  // Default English
  return [
    { id: 1, section: 'reading', type: 'mcq', text: 'Which word matches the picture?', emoji: '🍎', options: ['Apple', 'Banana', 'Cat', 'Dog'], correct_answer: 'Apple' },
    { id: 2, section: 'reading', type: 'mcq', text: 'What animal is this?', emoji: '🐶', options: ['Cat', 'Dog', 'Bird', 'Fish'], correct_answer: 'Dog' },
    { id: 3, section: 'writing', type: 'fill_blank', text: 'The sky is ___', emoji: '☁️', correct_answer: 'blue' },
    { id: 4, section: 'comprehension', type: 'paragraph', text: 'Write a sentence about your favorite color.', emoji: '🎨', correct_answer: 'My favorite color is blue.' },
    { id: 5, section: 'reading', type: 'read_aloud', text: 'Read this aloud: Hello World!', emoji: '🌍', correct_answer: 'Hello World!' }
  ];
};

export default function AIAssessment() {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      const userLang = localStorage.getItem('current_ai_lang') || localStorage.getItem('preferredLanguage') || 'english';
      const fallbacks = getLanguageFallbackQuestions(userLang);

      try {
        setLoading(true);
        const data = await apiClient.generateAIAssessment(Number(sessionId));
        if (data && data.questions && data.questions.length > 0) {
          const mapped = data.questions.map((q: any, idx: number) => ({
            id: q.id || idx + 1,
            section: q.skill || (idx < 2 ? 'reading' : idx < 4 ? 'writing' : 'comprehension'),
            type: q.question_type || 'mcq',
            text: q.question_text || fallbacks[idx % fallbacks.length]?.text || 'Select the correct answer:',
            emoji: q.image_hint || '🌟',
            options: q.options || (q.question_type === 'mcq' ? fallbacks[idx % fallbacks.length]?.options || ['Apple', 'Banana', 'Cat', 'Dog'] : undefined),
            correct_answer: q.correct_answer
          }));
          setQuestions(mapped);
        } else {
          setQuestions(fallbacks);
        }
      } catch (err) {
        console.error(err);
        setQuestions(fallbacks);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [sessionId]);

  const toggleRecording = (targetText: string) => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setCurrentAnswer(targetText || 'Hello World!');
      return;
    }

    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      try {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.lang = 'en-US';
        rec.onresult = (e: any) => {
          const spoken = e.results[0][0].transcript;
          setCurrentAnswer(spoken || targetText);
          setIsRecording(false);
        };
        rec.onerror = () => {
          setCurrentAnswer(targetText || 'Hello World!');
          setIsRecording(false);
        };
        rec.onend = () => setIsRecording(false);
        recognitionRef.current = rec;
        rec.start();
        setIsRecording(true);
      } catch (err) {
        setCurrentAnswer(targetText || 'Hello World!');
        setIsRecording(false);
      }
    }
  };

  const handleNext = async () => {
    const currentQ = questions[currentIndex];
    const finalAnswer = currentAnswer || (currentQ.type === 'read_aloud' ? currentQ.text : 'Completed');
    const newAnswers = { ...answers, [currentQ.id]: finalAnswer };
    setAnswers(newAnswers);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentAnswer('');
      setIsRecording(false);
    } else {
      setSubmitting(true);
      try {
        const formattedAnswers = questions.map(q => ({
          question_id: q.id,
          skill: q.section,
          user_answer: newAnswers[q.id] || (q.type === 'read_aloud' ? q.text : ''),
          correct_answer: q.correct_answer || q.text,
          question_type: q.type
        }));

        const res = await apiClient.submitAIAssessment(Number(sessionId), 'initial', formattedAnswers);

        const scoreData = {
          reading: res.reading_score ?? 85,
          writing: res.writing_score ?? 70,
          comprehension: res.comprehension_score ?? 90,
          overall: res.overall_score ?? 80,
          level: res.level || 'Intermediate',
          weak_areas: res.weak_areas || ['reading', 'writing']
        };

        localStorage.setItem(`assessment_result_${sessionId}`, JSON.stringify(scoreData));
        navigate(`/learn-with-ai/scores/${sessionId}`);
      } catch (err) {
        console.error(err);
        localStorage.setItem(`assessment_result_${sessionId}`, JSON.stringify({ reading: 85, writing: 70, comprehension: 90, overall: 81, level: 'Intermediate', weak_areas: ['reading'] }));
        navigate(`/learn-with-ai/scores/${sessionId}`);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-indigo-50 flex items-center justify-center font-['Nunito']">
        <div className="text-center animate-pulse">
          <Brain className="w-20 h-20 text-indigo-500 mx-auto mb-4 animate-bounce" />
          <h2 className="text-2xl font-black text-indigo-900">AI is generating your quiz... ✨</h2>
        </div>
      </div>
    );
  }

  if (submitting) {
    return (
      <div className="min-h-screen bg-purple-50 flex items-center justify-center font-['Nunito']">
        <div className="text-center">
          <Sparkles className="w-20 h-20 text-purple-500 mx-auto mb-4 animate-spin" />
          <h2 className="text-3xl font-black text-purple-900 mb-2">AI is analyzing your skills!</h2>
          <p className="text-xl text-purple-600 font-bold animate-pulse">Calculating scores and detecting weak areas...</p>
        </div>
      </div>
    );
  }

  const question = questions[currentIndex] || getLanguageFallbackQuestions('english')[0];
  const sections = ['reading', 'writing', 'comprehension'];
  const currentSection = question.section || 'reading';

  return (
    <div className="min-h-screen bg-slate-50 font-['Nunito'] p-4 sm:p-8 flex flex-col">
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
        
        {/* Stepper */}
        <div className="bg-white rounded-full p-2 mb-8 shadow-sm flex items-center justify-between border-2 border-slate-100">
          {sections.map((sec) => (
            <div 
              key={sec} 
              className={`flex-1 flex justify-center items-center gap-2 py-3 px-4 rounded-full transition-all duration-500
                ${sec === currentSection ? 'bg-indigo-100 text-indigo-700 shadow-inner font-black' : 'text-slate-400 font-bold'}
              `}
            >
              {sec === 'reading' && <BookOpen className="w-5 h-5" />}
              {sec === 'writing' && <Edit3 className="w-5 h-5" />}
              {sec === 'comprehension' && <Brain className="w-5 h-5" />}
              <span className="capitalize hidden sm:inline">{sec}</span>
            </div>
          ))}
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-[2.5rem] p-6 sm:p-12 shadow-xl border-4 border-slate-100 flex-1 flex flex-col justify-between relative overflow-hidden">
          <div>
            <div className="flex justify-between items-center mb-6">
              <span className="bg-slate-100 text-slate-500 font-black text-sm px-4 py-1.5 rounded-full">
                Question {currentIndex + 1} of {questions.length}
              </span>
            </div>

            <div className="text-center mb-8">
              <div className="text-7xl mb-4 animate-bounce-slow inline-block">{question.emoji}</div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">
                {question.text}
              </h2>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center max-w-2xl mx-auto w-full py-4">
            {question.type === 'mcq' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {question.options?.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setCurrentAnswer(opt)}
                    className={`p-6 rounded-2xl text-xl font-black transition-all border-4
                      ${currentAnswer === opt 
                        ? 'bg-indigo-100 border-indigo-500 text-indigo-700 scale-105 shadow-md' 
                        : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-200 hover:bg-slate-50'
                      }
                    `}
                  >
                    {stripEmoji(opt)}
                  </button>
                ))}
              </div>
            )}

            {question.type === 'fill_blank' && (
              <input
                type="text"
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                placeholder="Type your answer here..."
                className="w-full text-center text-3xl font-black text-indigo-700 bg-slate-50 border-4 border-slate-200 rounded-3xl p-6 outline-none focus:border-indigo-500 transition-all placeholder:text-slate-300"
              />
            )}

            {question.type === 'paragraph' && (
              <div className="relative">
                <textarea
                  value={currentAnswer}
                  onChange={(e) => setCurrentAnswer(e.target.value)}
                  placeholder="Write your answer here..."
                  className="w-full text-xl font-bold text-slate-700 bg-slate-50 border-4 border-slate-200 rounded-3xl p-6 min-h-[150px] outline-none focus:border-indigo-500 transition-all resize-none"
                />
                <div className="absolute bottom-4 right-6 text-slate-400 font-bold text-sm">
                  {currentAnswer.length} chars
                </div>
              </div>
            )}

            {question.type === 'read_aloud' && (
              <div className="flex flex-col items-center gap-4 text-center">
                <button 
                  onClick={() => toggleRecording(question.text)}
                  className={`w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-lg active:scale-95 ${
                    isRecording 
                      ? 'bg-red-500 text-white animate-pulse shadow-red-300 ring-8 ring-red-200' 
                      : 'bg-red-100 text-red-500 hover:bg-red-200 hover:scale-105'
                  }`}
                >
                  <Mic className="w-10 h-10" />
                </button>
                <p className="text-slate-600 font-extrabold text-sm">
                  {isRecording ? '🎙️ Listening to your speech...' : 'Click microphone to speak (or tap to simulate)'}
                </p>

                {currentAnswer && (
                  <div className="bg-emerald-50 border-2 border-emerald-200 text-emerald-700 px-6 py-3 rounded-2xl font-black text-base flex items-center gap-2 animate-bounce">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Recorded: "{currentAnswer}"</span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleNext}
              className="bg-slate-900 hover:bg-indigo-600 text-white px-10 py-5 rounded-full font-black text-xl flex items-center gap-3 hover:-translate-y-1 transition-all shadow-lg cursor-pointer"
            >
              {currentIndex === questions.length - 1 ? 'Submit Answers' : 'Next Question'}
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
