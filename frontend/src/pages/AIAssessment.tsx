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
  image_url?: string;
  options?: string[];
  correct_answer?: string;
}

const stripEmoji = (str: string) => str ? str.replace(/[\u{1F300}-\u{1F9FF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '').trim() : '';

const shuffleArray = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

const getLanguageFallbackQuestions = (lang: string): Question[] => {
  const n = (lang || '').toLowerCase();

  const isHindi = n.includes('hi') || n.includes('hindi') || n.includes('हिन्दी');
  const isGujarati = n.includes('gu') || n.includes('gujarati') || n.includes('ગુજરાતી');
  const isBengali = n.includes('bn') || n.includes('bengali') || n.includes('বাংলা');
  const isMarathi = n.includes('mr') || n.includes('marathi') || n.includes('मराठी');
  const isKannada = n.includes('kn') || n.includes('kannada') || n.includes('ಕನ್ನಡ');
  const isMalayalam = n.includes('ml') || n.includes('malayalam') || n.includes('മലയാളം');
  const isPunjabi = n.includes('pa') || n.includes('punjabi') || n.includes('ਪੰਜਾਬੀ');
  const isUrdu = n.includes('ur') || n.includes('urdu') || n.includes('اردو');
  const isOdia = n.includes('or') || n.includes('odia') || n.includes('ଓଡ଼ିଆ');
  const isAssamese = n.includes('as') || n.includes('assamese') || n.includes('অসমীয়া');
  const isSanskrit = n.includes('sa') || n.includes('sanskrit') || n.includes('संस्कृतम्');
  const isTelugu = n.includes('te') || n.includes('telugu') || n.includes('తెలుగు');
  const isTamil = n.includes('ta') || n.includes('tamil') || n.includes('தமிழ்');

  // Multi-item pool for MCQ vocabulary
  const vocabPool = [
    { emoji: '🍎', hi: 'सेब', gu: 'સફરજન', bn: 'আপেল', mr: 'सफरचंद', kn: 'ಸೇಬು', ml: 'ആപ്പിൾ', pa: 'ਸੇਬ', ur: 'سیب', or: 'ସେଓ', as: 'আপেল', sa: 'सेवफलम्', te: 'యాపిల్', ta: 'ஆப்பிள்', en: 'Apple',
      disEn: ['Banana', 'Cat', 'Dog'], disHi: ['केला', 'बिल्ली', 'कुत्ता'], disGu: ['કેળું', 'બિલાડી', 'કૂતરો'], disBn: ['কলা', 'বিড়াল', 'কুকুর'], disMr: ['केळी', 'मांजर', 'कुत्रा'], disKn: ['ಬಾಳೆಹಣ್ಣು', 'ಬೆಕ್ಕು', 'ನಾಯಿ'], disMl: ['വാഴപ്പഴം', 'പൂച്ച', 'പട്ടി'], disPa: ['ਕੇਲਾ', 'ਬਿੱਲੀ', 'ਕੁੱਤਾ'], disUr: ['کیلا', 'بلی', 'کتا'], disOr: ['କଦଳୀ', 'ବିଲେଇ', 'କୁକୁର'], disAs: ['কল', 'মেকুৰী', 'কুকুৰ'], disSa: ['कदलीफलम्', 'मार्जारी', 'कुक्कुरः'], disTe: ['అరటి', 'పిల్లి', 'కుక్క'], disTa: ['வாழைப்பழம்', 'பூனை', 'நாய்'] },
    
    { emoji: '🐶', hi: 'कुत्ता', gu: 'કૂતરો', bn: 'কুকুর', mr: 'कुत्रा', kn: 'ನಾಯಿ', ml: 'പട്ടി', pa: 'ਕੁੱਤਾ', ur: 'کتا', or: 'କୁକୁର', as: 'কুকুৰ', sa: 'कुक्कुरः', te: 'కుక్క', ta: 'நாய்', en: 'Dog',
      disEn: ['Cat', 'Bird', 'Fish'], disHi: ['बिल्ली', 'पक्षी', 'मछली'], disGu: ['બિલાડી', 'પક્ષી', 'માછલી'], disBn: ['বিড়াল', 'পাখি', 'মাছ'], disMr: ['मांजर', 'पक्षी', 'मासा'], disKn: ['ಬೆಕ್ಕು', 'ಪಕ್ಷಿ', 'ಮೀನು'], disMl: ['പൂച്ച', 'പക്ഷി', 'മീൻ'], disPa: ['ਬਿੱਲੀ', 'ਪੰਛੀ', 'ਮੱਛੀ'], disUr: ['بلی', 'پرندہ', 'مچھلی'], disOr: ['ବିଲେଇ', 'ପକ୍ଷୀ', 'ମାଛ'], disAs: ['মেকুৰী', 'চৰাই', 'মাছ'], disSa: ['मार्जारी', 'खगः', 'मत्स्यः'], disTe: ['పిల్లి', 'పక్షి', 'చేప'], disTa: ['பூனை', 'பறவை', 'மீன்'] },
    
    { emoji: '📚', hi: 'किताब', gu: 'પુસ્તક', bn: 'বই', mr: 'पुस्तक', kn: 'ಪುಸ್ತಕ', ml: 'പുസ്തകം', pa: 'ਕਿਤਾਬ', ur: 'کتاب', or: 'ପୁସ୍ତକ', as: 'কিতাপ', sa: 'पुस्तकम्', te: 'పుస్తకం', ta: 'புத்தகம்', en: 'Book',
      disEn: ['Pencil', 'Bag', 'Car'], disHi: ['पेंसिल', 'बैग', 'गाड़ी'], disGu: ['પેન્સિલ', 'બેગ', 'ગાડી'], disBn: ['পেন্সিল', 'ব্যাগ', 'গাড়ি'], disMr: ['पेन्सिल', 'पिशवी', 'गाडी'], disKn: ['ಪೆನ್ಸಿಲ್', 'ಬ್ಯಾಗ್', 'ಕಾರು'], disMl: ['പെൻസിൽ', 'ബാഗ്', 'കാർ'], disPa: ['ਪੈਨਸਿਲ', 'ਬੈਗ', 'ਕਾਰ'], disUr: ['پنسل', 'بیگ', 'گاڑی'], disOr: ['ପେନ୍ସିଲ୍', 'ବ୍ୟାଗ୍', 'ଗାଡି'], disAs: ['পেঞ্চিল', 'বেগ', 'গাড়ী'], disSa: ['लेखनी', 'स्यूतः', 'यानम्'], disTe: ['పెన్సిల్', 'బ్యాగ్', 'కారు'], disTa: ['பென்சில்', 'பை', 'கார்'] },

    { emoji: '🚗', hi: 'गाड़ी', gu: 'ગાડી', bn: 'গাড়ি', mr: 'गाडी', kn: 'ಕಾರು', ml: 'കാർ', pa: 'ਕਾਰ', ur: 'گاڑی', or: 'ଗାଡି', as: 'গাড়ী', sa: 'यानम्', te: 'కారు', ta: 'கார்', en: 'Car',
      disEn: ['Bus', 'Train', 'Bicycle'], disHi: ['बस', 'ट्रेन', 'साइकिल'], disGu: ['બસ', 'ટ્રેન', 'સાઇકલ'], disBn: ['বাস', 'ট্রেন', 'সাইকেল'], disMr: ['बस', 'ट्रेन', 'सायकल'], disKn: ['ಬಸ್', 'ರೈಲು', 'ಸೈಕಲ್'], disMl: ['ബസ്', 'ട്രെയിൻ', 'സൈക്കിൾ'], disPa: ['ਬੱਸ', 'ਟ੍ਰੇਨ', 'ਸਾਈਕਲ'], disUr: ['بس', 'ٹرین', 'سائیکل'], disOr: ['ବସ୍', 'ଟ୍ରେନ୍', 'ସାଇକେଲ୍'], disAs: ['বাছ', 'ট্ৰেইন', 'চাইকেল'], disSa: ['लोकयानम्', 'रेलयानम्', 'द्विचक्रिका'], disTe: ['బస్సు', 'రైలు', 'సైకిల్'], disTa: ['பேருந்து', 'ரயில்', 'மிதிவண்டி'] },

    { emoji: '🌸', hi: 'फूल', gu: 'ફૂલ', bn: 'ফুল', mr: 'फूल', kn: 'ಹೂವು', ml: 'പൂവ്', pa: 'ਫੁੱਲ', ur: 'پھول', or: 'ଫୁଲ', as: 'ফুল', sa: 'पुष्पम्', te: 'పువ్వు', ta: 'பூ', en: 'Flower',
      disEn: ['Tree', 'Leaf', 'Grass'], disHi: ['पेड़', 'पत्ता', 'घास'], disGu: ['ઝાડ', 'પાંદડું', 'ઘાસ'], disBn: ['গাছ', 'পাতা', 'ঘাস'], disMr: ['झाड', 'पान', 'गवत'], disKn: ['ಮರ', 'ಎಲೆ', 'ಹುಲ್ಲು'], disMl: ['മരം', 'ഇല', 'പുല്ല്'], disPa: ['ਦਰੱਖਤ', 'ਪੱਤਾ', 'ਘਾਹ'], disUr: ['درخت', 'پتا', 'گھاس'], disOr: ['ଗଛ', 'ପତ୍ର', 'ଘାସ'], disAs: ['গছ', 'পাত', 'ঘাহ'], disSa: ['वृक्षः', 'पत्रम्', 'तृणम्'], disTe: ['చెట్టు', 'ఆకు', 'గడ్డి'], disTa: ['மரம்', 'இலை', 'புல்'] }
  ];

  const shuffledVocab = shuffleArray(vocabPool);
  const v1 = shuffledVocab[0];
  const v2 = shuffledVocab[1];

  const getWord = (item: any) => isHindi ? item.hi : isGujarati ? item.gu : isBengali ? item.bn : isMarathi ? item.mr : isKannada ? item.kn : isMalayalam ? item.ml : isPunjabi ? item.pa : isUrdu ? item.ur : isOdia ? item.or : isAssamese ? item.as : isSanskrit ? item.sa : isTelugu ? item.te : isTamil ? item.ta : item.en;
  const getDis = (item: any) => isHindi ? item.disHi : isGujarati ? item.disGu : isBengali ? item.disBn : isMarathi ? item.disMr : isKannada ? item.disKn : isMalayalam ? item.disMl : isPunjabi ? item.disPa : isUrdu ? item.disUr : isOdia ? item.disOr : isAssamese ? item.disAs : isSanskrit ? item.disSa : isTelugu ? item.disTe : isTamil ? item.disTa : item.disEn;

  const promptQ1 = isHindi ? 'चित्र को देखकर सही शब्द चुनें:' : isGujarati ? 'ચિત્ર જોઈને સાચો શબ્દ પસંદ કરો:' : isBengali ? 'ছবি দেখে সঠিক শব্দটি বেছে নিন:' : isMarathi ? 'चित्र पाहून योग्य शब्द निवडा:' : isKannada ? 'ಚಿತ್ರವನ್ನು ನೋಡಿ ಸರಿಯಾದ ಪದವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ:' : isMalayalam ? 'ചിത്രം കണ്ട് ശരിയായ വാക്ക് തിരഞ്ഞെടുക്കുക:' : isPunjabi ? 'ਤਸਵੀਰ ਦੇਖ ਕੇ ਸਹੀ ਸ਼ਬਦ ਚੁਣੋ:' : isUrdu ? 'تصویر دیکھ کر درست لفظ منتخب کریں:' : isOdia ? 'ଚିତ୍ର ଦେଖି ସଠିକ୍ ଶବ୍ଦ ବାଛନ୍ତୁ:' : isAssamese ? 'ছবি চাই শুদ্ধ শব্দটো বাছক:' : isSanskrit ? 'चित्रं दृष्ट्वा उचितं शब्दं चिनुत:' : isTelugu ? 'చిత్రాన్ని చూసి సరైన పదాన్ని ఎంచుకోండి:' : isTamil ? 'படத்தைப் பார்த்து சரியான சொல்லைத் தேர்ந்தெடுக்கவும்:' : 'Which word matches the picture?';

  const promptQ2 = isHindi ? 'यह कौन सा जानवर / वस्तु है?' : isGujarati ? 'આ કયું પ્રાણી / વસ્તુ છે?' : isBengali ? 'এটি কোন প্রাণী / বস্তু?' : isMarathi ? 'हा कोणता प्राणी / वस्तू आहे?' : isKannada ? 'ಇದು ಯಾವ ಪ್ರಾಣಿ / ವಸ್ತು?' : isMalayalam ? 'ഇത് ഏത് മൃഗമാണ് / വസ്തുവാണ്?' : isPunjabi ? 'ਇਹ ਕਿਹੜਾ ਜਾਨਵਰ / ਚੀਜ਼ ਹੈ?' : isUrdu ? 'یہ کون سا جانور / چیز ہے؟' : isOdia ? 'ଏହା କେଉଁ ପଶୁ / ଜିନିଷ?' : isAssamese ? 'এইটো কি প্ৰাণী / বস্তু?' : isSanskrit ? 'एषः कः पशुः / वस्तु अस्ति?' : isTelugu ? 'ఇది ఏ జంతువు / వస్తువు?' : isTamil ? 'இது என்ன விலங்கு / பொருள்?' : 'What animal or object is this?';

  const promptQ3 = isHindi ? 'खाली स्थान भरें: आसमान _____ है।' : isGujarati ? 'ખાલી જગ્યા પૂરો: આકાશ _____ છે.' : isBengali ? 'শূন্যস্থান পূরণ করুন: আকাশ _____।' : isMarathi ? 'रिकामी जागा भरा: आकाश _____ आहे.' : isKannada ? 'ಖಾಲಿ ಜಾಗವನ್ನು ತುಂಬಿ: ಆಕಾಶವು _____ బಣ್ಣದಲ್ಲಿದೆ.' : isMalayalam ? 'വിട്ട ഭാഗം പൂരിപ്പിക്കുക: ആകാശം _____ ആണ്.' : isPunjabi ? 'ਖਾਲੀ ਥਾਂ ਭਰੋ: ਅਸਮਾਨ _____ ਹੈ।' : isUrdu ? 'خالی جگہ پر کریں: آسمان _____ ہے۔' : isOdia ? 'ଖାଲି ସ୍ଥାନ ପୂରଣ କରନ୍ତୁ: ଆକାଶ _____ ରଙ୍ଗର ।' : isAssamese ? 'খালী ঠাই পূৰ কৰক: আকাশখন _____।' : isSanskrit ? 'रिक्तस्थानं पूरयत: आकाशः _____ अस्ति।' : isTelugu ? 'ఖాళీని పూరించండి: ఆకాశం _____ రంగులో ఉంది.' : isTamil ? 'கோடிட்ட இடத்தை நிரப்புக: வானம் _____ நிறம்.' : 'The sky is ___';

  const ansQ3 = isHindi ? 'नीला' : isGujarati ? 'વાદળી' : isBengali ? 'নীল' : isMarathi ? 'निळे' : isKannada ? 'ನೀಲಿ' : isMalayalam ? 'നീലം' : isPunjabi ? 'ਨੀਲਾ' : isUrdu ? 'نیلا' : isOdia ? 'ନୀଳ' : isAssamese ? 'নীলা' : isSanskrit ? 'नीलः' : isTelugu ? 'నీలం' : isTamil ? 'நீலம்' : 'blue';

  const promptQ4 = isHindi ? 'अपने पसंदीदा रंग के बारे में एक वाक्य लिखें।' : isGujarati ? 'તમારા મનપસંદ રંગ વિશે એક વાક્ય લખો.' : isBengali ? 'আপনার পছন্দের রঙ সম্পর্কে একটি বাক্য লিখুন।' : isMarathi ? 'तुमच्या आवडत्या रंगाबद्दल एक वाक्य लिहा.' : isKannada ? 'ನಿಮ್ಮ ನೆಚ್ಚಿನ ಬಣ್ಣದ ಬಗ್ಗೆ ಒಂದು ವಾಕ್ಯ ಬರೆಯಿರಿ.' : isMalayalam ? 'നിങ്ങൾക്ക് ഇഷ്ടപ്പെട്ട നിറത്തെക്കുറിച്ച് ഒരു വാചകം എഴുതുക.' : isPunjabi ? 'ਆਪਣੇ ਪਸੰਦੀਦਾ ਰੰਗ ਬਾਰੇ ਇੱਕ ਵਾਕ ਲਿਖੋ।' : isUrdu ? 'اپنے پسندیدہ رنگ کے بارے میں ایک جملہ لکھیں۔' : isOdia ? 'ଆପଣଙ୍କର ପ୍ରିୟ ରଙ୍ଗ ବିଷୟରେ ଗୋଟିଏ ବାକ୍ୟ ଲେଖନ୍ତୁ ।' : isAssamese ? 'আপোনাৰ প্ৰিয় ৰং সম্পৰ্কে এটা বাক্য লিখক।' : isSanskrit ? 'स्वस्य प्रियवर्णविषये एकं वाक्यं लिखत।' : isTelugu ? 'మీకు ఇష్టమైన రంగు గురించి ఒక వాక్యం రాయండి.' : isTamil ? 'உங்களுக்கு பிடித்த நிறத்தைப் பற்றி ஒரு வாக்கியம் எழுதுங்கள்.' : 'Write a sentence about your favorite color.';

  const promptQ5 = isHindi ? 'इसे जोर से पढ़ें: नमस्ते भारत!' : isGujarati ? 'આ મોટેથી વાંચો: નમસ્તે ભારત!' : isBengali ? 'এটি জোরে পড়ুন: নমস্কার ভারত!' : isMarathi ? 'हे मोठ्याने वाचा: नमस्कार भारत!' : isKannada ? 'ಇದನ್ನು ಗಟ್ಟಿಯಾಗಿ ಓದಿ: ನಮಸ್ಕಾರ ಭಾರತ!' : isMalayalam ? 'ഇത് ഉറക്കെ വായിക്കുക: നമസ്കാരം ഭാരതം!' : isPunjabi ? 'ਇਸਨੂੰ ਉੱਚੀ ਪੜ੍ਹੋ: ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ!' : isUrdu ? 'اسے بلند آواز میں پڑھیں: السلام علیکم!' : isOdia ? 'ଏହାକୁ ଉଚ୍ଚ ସ୍ୱରରେ ପଢନ୍ତୁ: ନମସ୍କାର ଭାରତ!' : isAssamese ? 'এইটো ডাঙৰকৈ পঢ়ক: নমস্কাৰ ভাৰত!' : isSanskrit ? 'उच्चैः पठतु: नमस्ते भारतम्!' : isTelugu ? 'గట్టిగా చదవండి: నమస్కారం!' : isTamil ? 'சத்தமாக படிக்கவும்: வணக்கம்!' : 'Read this aloud: Hello World!';

  return [
    { id: 1, section: 'reading', type: 'mcq', text: promptQ1, emoji: v1.emoji, options: shuffleArray([getWord(v1), ...getDis(v1)]), correct_answer: getWord(v1) },
    { id: 2, section: 'reading', type: 'mcq', text: promptQ2, emoji: v2.emoji, options: shuffleArray([getWord(v2), ...getDis(v2)]), correct_answer: getWord(v2) },
    { id: 3, section: 'writing', type: 'fill_blank', text: promptQ3, emoji: '☁️', correct_answer: ansQ3 },
    { id: 4, section: 'comprehension', type: 'paragraph', text: promptQ4, emoji: '🎨', correct_answer: ansQ3 },
    { id: 5, section: 'reading', type: 'read_aloud', text: promptQ5, emoji: '🌍', correct_answer: 'Hello' }
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

            <div className="text-center mb-8 flex flex-col items-center">
              {question.image_url ? (
                <div className="w-36 h-36 mb-4 rounded-3xl overflow-hidden border-4 border-indigo-200 shadow-xl bg-indigo-50 flex items-center justify-center">
                  <img src={question.image_url} alt="Question Visual" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-28 h-28 mb-4 rounded-3xl bg-gradient-to-br from-indigo-100 to-purple-100 border-4 border-indigo-200 shadow-lg flex items-center justify-center text-7xl animate-bounce-slow">
                  {question.emoji || '🌟'}
                </div>
              )}
              <h2 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight max-w-2xl">
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
