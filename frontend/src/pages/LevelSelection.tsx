import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import type { SupportedLanguage } from '../utils/translationHelper';

interface LevelOption {
  levelNum: number;
  title: string;
  name: string;
  image: string;
  description: string;
  readingScore: number;
  writingScore: number;
  speakingScore: number;
  vocabScore: number;
}

const levelsList: LevelOption[] = [
  {
    levelNum: 1,
    title: 'Beginner',
    name: 'Alphabet Sounds',
    image: '/level_alphabet_1783340004005.png',
    description: 'Learn basic letters, shapes, and phone sounds.',
    readingScore: 20,
    writingScore: 10,
    speakingScore: 25,
    vocabScore: 15
  },
  {
    levelNum: 2,
    title: 'Learner',
    name: 'Simple Words',
    image: '/level_words_1783340019724.png',
    description: 'Read and spell basic 3-4 letter words (cat, dog, sun).',
    readingScore: 40,
    writingScore: 35,
    speakingScore: 45,
    vocabScore: 42
  },
  {
    levelNum: 3,
    title: 'Explorer',
    name: 'Short Sentences',
    image: '/level_sentences_1783340032385.png',
    description: 'Form and read simple daily sentences.',
    readingScore: 60,
    writingScore: 50,
    speakingScore: 58,
    vocabScore: 62
  },
  {
    levelNum: 4,
    title: 'Achiever',
    name: 'Short Stories',
    image: '/level_stories_1783340046772.png',
    description: 'Read and summarize simple short story narratives and tales.',
    readingScore: 75,
    writingScore: 65,
    speakingScore: 70,
    vocabScore: 72
  },
  {
    levelNum: 5,
    title: 'Master',
    name: 'News & Signboards',
    image: '/level_newspaper_1783340060913.png',
    description: 'Read news columns, filling out government and job forms.',
    readingScore: 88,
    writingScore: 80,
    speakingScore: 82,
    vocabScore: 85
  },
  {
    levelNum: 6,
    title: 'Expert',
    name: 'Full Proficiency',
    image: '/level_mastery_1783340074714.png',
    description: 'Advanced reading, writing and confident speaking drills.',
    readingScore: 95,
    writingScore: 92,
    speakingScore: 90,
    vocabScore: 96
  }
];

const levelTranslations: Record<string, any> = {
  english: {
    badge: "Fast Track Onboarding",
    title: "Choose Your Learning Level",
    subtitle: "Select the image that matches what you can read best. We will customize your dashboard immediately!",
    levelText: "Level",
    testBtn: "I want to take a test instead 📝",
    confirmBtn: "Confirm & Start Study",
    levels: {
      1: { title: 'Beginner', name: 'Alphabet Sounds', desc: 'Learn basic letters, shapes, and phone sounds.' },
      2: { title: 'Learner', name: 'Simple Words', desc: 'Read and spell basic 3-4 letter words (cat, dog, sun).' },
      3: { title: 'Explorer', name: 'Short Sentences', desc: 'Form and read simple daily sentences.' },
      4: { title: 'Achiever', name: 'Short Stories', desc: 'Read and summarize simple short story narratives and tales.' },
      5: { title: 'Master', name: 'News & Signboards', desc: 'Read news columns, filling out government and job forms.' },
      6: { title: 'Expert', name: 'Full Proficiency', desc: 'Advanced reading, writing and confident speaking drills.' }
    }
  },
  hindi: {
    badge: "फास्ट ट्रैक ऑनबोर्डिंग",
    title: "अपना सीखने का स्तर चुनें",
    subtitle: "वह चित्र चुनें जो दर्शाता है कि आप क्या सबसे अच्छा पढ़ सकते हैं। हम तुरंत आपके डैशबोर्ड को कस्टमाइज़ कर देंगे!",
    levelText: "स्तर",
    testBtn: "मैं इसके बजाय एक परीक्षा लेना चाहता हूँ 📝",
    confirmBtn: "पुष्टि करें और पढ़ाई शुरू करें",
    levels: {
      1: { title: 'शुरुआती', name: 'वर्णमाला की आवाजें', desc: 'मूल अक्षर, आकार और फोन ध्वनियां सीखें।' },
      2: { title: 'शिक्षार्थी', name: 'सरल शब्द', desc: 'बुनियादी 3-4 अक्षरों वाले शब्द (जैसे बिल्ली, कुत्ता, सूरज) पढ़ें और लिखें।' },
      3: { title: 'अन्वेषक', name: 'छोटे वाक्य', desc: 'दैनिक जीवन के सरल वाक्यों को बनाएं और पढ़ें।' },
      4: { title: 'सफल', name: 'छोटी कहानियां', desc: 'सरल लघु कहानियों के कथनों और कथाओं को पढ़ें और सारांशित करें।' },
      5: { title: 'मास्टर', name: 'समाचार और साइनबोर्ड', desc: 'समाचार कॉलम पढ़ें, सरकारी और नौकरी के फॉर्म भरना सीखें।' },
      6: { title: 'विशेषज्ञ', name: 'पूर्ण दक्षता', desc: 'उन्नत पढ़ने, लिखने और आत्मविश्वास से बोलने का अभ्यास करें।' }
    }
  },
  telugu: {
    badge: "ఫాస్ట్ ట్రాక్ ఆన్‌బోర్డింగ్",
    title: "మీ అభ్యాస స్థాయిని ఎంచుకోండి",
    subtitle: "మీరు బాగా చదవగలిగే చిత్రానికి సరిపోయేదాన్ని ఎంచుకోండి. మేము వెంటనే మీ డాష్‌బోర్డ్‌ను అనుకూలీకరిస్తాము!",
    levelText: "స్థాయి",
    testBtn: "నేను బదులుగా ఒక పరీక్ష రాయాలనుకుంటున్నాను 📝",
    confirmBtn: "ధృవీకరించి అధ్యయనం ప్రారంభించండి",
    levels: {
      1: { title: 'ప్రారంభకుడు', name: 'అక్షరాల శబ్దాలు', desc: 'ప్రాథమిక అక్షరాలు, ఆకారాలు మరియు ఫోన్ శబ్దాలు నేర్చుకోండి.' },
      2: { title: 'అభ్యాసకుడు', name: 'సరళమైన పదాలు', desc: 'ప్రాథమిక 3-4 అక్షరాల పదాలను చదవండి మరియు పలకండి (పిల్లి, కుక్క, సూర్యుడు).' },
      3: { title: 'అన్వేషకుడు', name: 'చిన్న వాక్యాలు', desc: 'సరళమైన రోజువారీ వాక్యాలను తయారు చేయండి మరియు చదవండి.' },
      4: { title: 'సాధకుడు', name: 'చిన్న కథలు', desc: 'సరళమైన చిన్న కథల కథనాలను మరియు కథలను చదవండి మరియు సంగ్రహించండి.' },
      5: { title: 'మాస్టర్', name: 'వార్తలు & సైన్‌బోర్డ్‌లు', desc: 'వార్తా కాలమ్‌లను చదవండి, ప్రభుత్వ మరియు ఉద్యోగ ఫారమ్‌లను నింపండి.' },
      6: { title: 'నిపుణుడు', name: 'పూర్తి నైపుణ్యం', desc: 'అధునాతన పఠనం, లేఖనం మరియు నమ్మకమైన సంభాషణ శిక్షణ.' }
    }
  },
  tamil: {
    badge: "ஃபாஸ்ட் டிராக் ஆன்போர்டிங்",
    title: "உங்கள் கற்றல் நிலையைத் தேர்ந்தெடுக்கவும்",
    subtitle: "உங்களால் சிறப்பாகப் படிக்க முடிந்த படத்தைத் தேர்ந்தெடுக்கவும். உங்கள் டாஷ்போர்டை நாங்கள் உடனடியாக மாற்றி அமைப்போம்!",
    levelText: "நிலை",
    testBtn: "நான் அதற்கு பதிலாக ஒரு தேர்வு எழுத விரும்புகிறேன் 📝",
    confirmBtn: "உறுதிப்படுத்தி படிப்பைத் தொடங்கவும்",
    levels: {
      1: { title: 'தொடக்கநிலை', name: 'எழுத்து ஒலிகள்', desc: 'அடிப்படை எழுத்துக்கள், வடிவங்கள் மற்றும் தொலைபேசி ஒலிகளைக் கற்றுக்கொள்ளுங்கள்.' },
      2: { title: 'கற்பவர்', name: 'எளிய சொற்கள்', desc: 'அடிப்படை 3-4 எழுத்துச் சொற்களைப் படித்து உச்சரிக்கவும் (பூனை, நாய், சூரியன்).' },
      3: { title: 'ஆராய்வாளர்', name: 'குறுகிய வாக்கியங்கள்', desc: 'எளிய தினசரி வாக்கியங்களை உருவாக்கி படிக்கவும்.' },
      4: { title: 'வெற்றியாளர்', name: 'குறுகிய கதைகள்', desc: 'எளிய சிறு கதை விவரிப்புகள் மற்றும் கதைகளைப் படித்து சுருக்கவும்.' },
      5: { title: 'மாஸ்டர்', name: 'செய்திகள் & விளம்பர பலகைகள்', desc: 'செய்தி பத்திகளைப் படிக்கவும், அரசு மற்றும் வேலை படிவங்களை நிரப்பவும்.' },
      6: { title: 'நிபுணர்', name: 'முழு தேர்ச்சி', desc: 'மேம்பட்ட வாசிப்பு, எழுதுதல் மற்றும் நம்பிக்கையான பேச்சு பயிற்சிகள்.' }
    }
  },
  kannada: {
    badge: "ಫಾಸ್ಟ್ ಟ್ರ್ಯಾಕ್ ಆನ್‌ಬೋರ್ಡಿಂಗ್",
    title: "ನಿಮ್ಮ ಕಲಿಕೆಯ ಮಟ್ಟವನ್ನು ಆರಿಸಿ",
    subtitle: "ನೀವು ಉತ್ತಮವಾಗಿ ಓದಬಹುದಾದ ಚಿತ್ರವನ್ನು ಆರಿಸಿ. ನಾವು ತಕ್ಷಣ ನಿಮ್ಮ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಅನ್ನು ಗ್ರಾಹಕೀಯಗೊಳಿಸುತ್ತೇವೆ!",
    levelText: "ಮಟ್ಟ",
    testBtn: "ನಾನು ಬದಲಿಗೆ ಪರೀಕ್ಷೆಯನ್ನು ತೆಗೆದುಕೊಳ್ಳಲು ಬಯಸುತ್ತೇನೆ 📝",
    confirmBtn: "ಖಚಿತಪಡಿಸಿ ಮತ್ತು ಅಧ್ಯಯನ ಪ್ರಾರಂಭಿಸಿ",
    levels: {
      1: { title: 'ಆರಂಭಿಕ', name: 'ಅಕ್ಷರಗಳ ಧ್ವನಿಗಳು', desc: 'ಮೂಲ ಅಕ್ಷರಗಳು, ಆಕಾರಗಳು ಮತ್ತು ಧ್ವನಿಗಳನ್ನು ಕಲಿಯಿರಿ.' },
      2: { title: 'ಕಲಿಯುವವನು', name: 'ಸರಳ ಪದಗಳು', desc: 'ಮೂಲ 3-4 ಅಕ್ಷರಗಳ ಪದಗಳನ್ನು ಓದಿ ಮತ್ತು ಉಚ್ಚರಿಸಿ (ಬೆಕ್ಕು, nಾಯಿ, ಸೂರ್ಯ).' },
      3: { title: 'ಅನ್ವೇಷಕ', name: 'ಸಣ್ಣ ವಾಕ್ಯಗಳು', desc: 'ಸರಳ ದಿನನಿತ್ಯದ ವಾಕ್ಯಗಳನ್ನು ರಚಿಸಿ ಮತ್ತು ಓದಿ.' },
      4: { title: 'ಸಾಧಕ', name: 'ಸಣ್ಣ ಕಥೆಗಳು', desc: 'ಸರಳ ಸಣ್ಣ ಕಥೆಗಳ ವಿವರಣೆಯನ್ನು ಓದಿ ಮತ್ತು ಸಾರಾಂಶ ಬರೆಯಿರಿ.' },
      5: { title: 'ಮಾಸ್ಟರ್', name: 'ಸುದ್ದಿ ಮತ್ತು ನಾಮಫಲಕಗಳು', desc: 'ಸುದ್ದಿ ಅಂಕಣಗಳನ್ನು ಓದಿ, ಸರ್ಕಾರಿ ಮತ್ತು ಉದ್ಯೋಗ ಅರ್ಜಿಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ.' },
      6: { title: 'ತಜ್ಞ', name: 'ಪೂರ್ಣ ಪ್ರಾವೀಣ್ಯತೆ', desc: 'ಸುಧಾರಿತ ಓದುವಿಕೆ, ಬರವಣಿಗೆ ಮತ್ತು ಆತ್ಮವಿಶ್ವಾಸದ ಮಾತನಾಡುವ ಅಭ್ಯಾಸ.' }
    }
  },
  bengali: {
    badge: "ফাস্ট ট্র্যাক অনবোর্ডিং",
    title: "আপনার শেখার স্তর চয়ন করুন",
    subtitle: "আপনি সবচেয়ে ভালো পড়তে পারেন এমন ছবি বেছে নিন। আমরা অবিলম্বে আপনার ড্যাশবোর্ড কাস্টমাইজ করব!",
    levelText: "স্তর",
    testBtn: "আমি তার বদলে একটি পরীক্ষা দিতে চাই 📝",
    confirmBtn: "নিশ্চিত করুন এবং পড়াশোনা শুরু করুন",
    levels: {
      1: { title: 'শুরু', name: 'বর্ণমালার শব্দ', desc: 'প্রাথমিক অক্ষর, আকার এবং ধ্বনি শিখুন।' },
      2: { title: 'শিক্ষার্থী', name: 'সহজ শব্দ', desc: 'সাধারণ ৩-৪ অক্ষরের শব্দ (যেমন বিড়াল, কুকুর, সূর্য) পড়ুন ও বানান করুন।' },
      3: { title: 'অনুসন্ধানকারী', name: 'ছোট বাক্য', desc: 'দৈনন্দিন জীবনের সহজ বাক্য তৈরি করুন এবং পড়ুন।' },
      4: { title: 'সফল', name: 'ছোট গল্প', desc: 'সহজ ছোট গল্পের বিবরণ এবং কাহিনী পড়ুন ও সংক্ষেপে লিখুন।' },
      5: { title: 'মাস্টার', name: 'খবর ও সাইনবোর্ড', desc: 'সংবাদপত্রের কলাম পড়ুন, সরকারি ও চাকরির ফর্ম পূরণ করুন।' },
      6: { title: 'বিশেষজ্ঞ', name: 'সম্পূর্ণ দক্ষতা', desc: 'উন্নত পড়া, লেখা এবং আত্মবিশ্বাসের সাথে কথা বলার অভ্যাস।' }
    }
  },
  marathi: {
    badge: "फास्ट ट्रॅक ऑनबोर्डिंग",
    title: "तुमची शिकण्याची पातळी निवडा",
    subtitle: "तुम्हाला जे सर्वात चांगले वाचता येते ते चित्र निवडा. आम्ही लगेच तुमचे डॅशबोर्ड सानुकूलित करू!",
    levelText: "पातळी",
    testBtn: "मला त्याऐवजी परीक्षा द्यायची आहे 📝",
    confirmBtn: "निश्चित करा आणि अभ्यास सुरू करा",
    levels: {
      1: { title: 'नवशिका', name: 'मुळाक्षरांचे आवाज', desc: 'मूलभूत अक्षरे, आकार आणि ध्वनी शिका।' },
      2: { title: 'विद्यार्थी', name: 'सोपे शब्द', desc: 'मूलभूत ३-४ अक्षरी शब्द (मांजर, कुत्रा, सूर्य) वाचा आणि लिहा।' },
      3: { title: 'संशोधक', name: 'सोपी वाक्ये', desc: 'सोपी वाक्ये तयार करा आणि वाचा।' },
      4: { title: 'यशस्वी', name: 'लघु कथा', desc: 'सोप्या लघु कथा वाचा आणि त्यांचा सारांश लिहा।' },
      5: { title: 'मास्टर', name: 'बातम्या आणि फलक', desc: 'बातम्यांचे रकाने वाचा, सरकारी आणि नोकरीचे फॉर्म भरणे शिका।' },
      6: { title: 'तज्ज्ञ', name: 'पूर्ण प्राविण्य', desc: 'प्रगत वाचन, लेखन आणि आत्मविश्वासाने बोलण्याचा सराव।' }
    }
  },
  gujarati: {
    badge: "ફાસ્ટ ટ્રેક ઓનબોર્ડિંગ",
    title: "તમારી શીખવાની સ્તર પસંદ કરો",
    subtitle: "તમે જે સૌથી સારું વાંચી શકો છો તે ચિત્ર પસંદ કરો. અમે તરત જ તમારું ડેશબોર્ડ કસ્ટમાઇઝ કરીશું!",
    levelText: "સ્તર",
    testBtn: "હું બદલે એક પરીક્ષા લેવા માંગુ છું 📝",
    confirmBtn: "પુષ્ટિ કરો અને અભ્યાસ શરૂ કરો",
    levels: {
      1: { title: 'શરૂઆત કરનાર', name: 'મૂળાક્ષરોના અવાજો', desc: 'મૂળભૂત અક્ષરો, આકારો અને ધ્વનિઓ શીખો।' },
      2: { title: 'વિદ્યાર્થી', name: 'સરળ શબ્દો', desc: 'મૂળભૂત ૩-૪ અક્ષરોવાળા શબ્દો (બિલાડી, કૂતરો, સૂર્ય) વાંચો અને લખો।' },
      3: { title: 'અન્વેષક', name: 'ટૂંકા વાક્યો', desc: 'દૈનિક જીવનના સરળ વાક્યો બનાવો અને વાંચો।' },
      4: { title: 'સફળ', name: 'ટૂંકી વાર્તાઓ', desc: 'સરળ ટૂંકી વાર્તાઓ અને કથાઓ વાંચો અને તેનો સારાંશ લખો।' },
      5: { title: 'માસ્ટર', name: 'સમાચાર અને સાઇનબોર્ડ', desc: 'સમાચારના કૉલમ વાંચો, સરકારી અને નોકરીના ફોર્મ ભરતા શીખો।' },
      6: { title: 'નિષ્ણાત', name: 'પૂર્ણ પ્રાવીણ્ય', desc: 'ઉન્નત વાંચન, લેખન અને આત્મવિશ્વાસપૂર્વક બોલવાની પ્રેક્ટિસ।' }
    }
  },
  punjabi: {
    badge: "ਫਾਸਟ ਟ੍ਰੈਕ ਆਨਬੋਰਡਿੰਗ",
    title: "ਆਪਣਾ ਸਿੱਖਣ ਦਾ ਪੱਧਰ ਚੁਣੋ",
    subtitle: "ਉਹ ਤਸਵੀਰ ਚੁਣੋ ਜੋ ਤੁਹਾਡੇ ਪੜ੍ਹਨ ਦੇ ਸਭ ਤੋਂ ਵਧੀਆ ਪੱਧਰ ਨਾਲ ਮੇਲ ਖਾਂਦੀ ਹੈ। ਅਸੀਂ ਤੁਰੰਤ ਤੁਹਾਡਾ ਡੈਸ਼ਬੋਰਡ ਤਿਆਰ ਕਰ ਦੇਵਾਂਗੇ!",
    levelText: "ਪੱਧਰ",
    testBtn: "ਮੈਂ ਇਸਦੀ ਬਜਾਏ ਇੱਕ ਟੈਸਟ ਦੇਣਾ ਚਾਹੁੰਦਾ ਹਾਂ 📝",
    confirmBtn: "ਪੁਸ਼ਟੀ ਕਰੋ ਅਤੇ ਪੜ੍ਹਾਈ ਸ਼ੁਰੂ ਕਰੋ",
    levels: {
      1: { title: 'ਸ਼ੁਰੂਆਤੀ', name: 'ਵਰਣਮਾਲਾ ਦੀਆਂ ਅਵਾਜ਼ਾਂ', desc: 'ਬੁਨਿਆਦੀ ਅੱਖਰ, ਆਕਾਰ ਅਤੇ ਅਵਾਜ਼ਾਂ ਸਿੱਖੋ।' },
      2: { title: 'ਸਿੱਖਣ ਵਾਲਾ', name: 'ਸਰਲ ਸ਼ਬਦ', desc: 'ਬੁਨਿਆਦੀ 3-4 ਅੱਖਰਾਂ ਵਾਲੇ ਸ਼ਬਦ (ਬਿੱਲੀ, ਕੁੱਤਾ, ਸੂਰਜ) ਪੜ੍ਹੋ ਅਤੇ ਲਿਖੋ।' },
      3: { title: 'ਖੋਜੀ', name: 'ਛੋਟੇ ਵਾਕ', desc: 'ਰੋਜ਼ਾਨਾ ਜੀਵਨ ਦੇ ਸਰਲ ਵਾਕ ਬਣਾਓ ਅਤੇ ਪੜ੍ਹੋ।' },
      4: { title: 'ਸਫਲ', name: 'ਛੋਟੀਆਂ ਕਹਾਣੀਆਂ', desc: 'ਸਰਲ ਛੋਟੀਆਂ ਕਹਾਣੀਆਂ ਅਤੇ ਕਥਾਵਾਂ ਪੜ੍ਹੋ ਅਤੇ ਉਨ੍ਹਾਂ ਦਾ ਸਾਰ ਲਿਖੋ।' },
      5: { title: 'ਮਾਸਟਰ', name: 'ਖ਼ਬਰਾਂ ਅਤੇ ਸਾਈਨਬੋਰਡ', desc: 'ਖ਼ਬਰਾਂ ਦੇ ਕਾਲਮ ਪੜ੍ਹੋ, ਸਰਕਾਰੀ ਅਤੇ ਨੌਕਰੀ ਦੇ ਫਾਰਮ ਭਰਨਾ ਸਿੱਖੋ।' },
      6: { title: 'ਮਾਹਰ', name: 'ਪੂਰੀ ਮੁਹਾਰਤ', desc: 'ਉੱਨਤ ਪੜ੍ਹਨ, ਲਿਖਣ ਅਤੇ ਆਤਮ ਵਿਸ਼ਵਾਸ ਨਾਲ ਬੋਲਣ ਦਾ ਅਭਿਆਸ।' }
    }
  }
};

export default function LevelSelection() {
  const [selected, setSelected] = useState<number>(2);
  const [prefLang, setPrefLang] = useState<SupportedLanguage>('english');
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'guest';

  // Load language settings on mount
  useEffect(() => {
    const saved = (localStorage.getItem('preferredLanguage') || 'english') as SupportedLanguage;
    setPrefLang(saved);
  }, []);

  const t = levelTranslations[prefLang] || levelTranslations.english;

  const handleSelectLevel = async () => {
    const selectedLevelObj = levelsList.find(l => l.levelNum === selected);
    if (!selectedLevelObj) return;

    try {
      // Save level scores to assessment results
      const results = {
        readingScore: selectedLevelObj.readingScore,
        writingScore: selectedLevelObj.writingScore,
        comprehensionScore: selectedLevelObj.vocabScore,
        overallScore: Math.round((selectedLevelObj.readingScore + selectedLevelObj.writingScore + selectedLevelObj.vocabScore) / 3),
        completedAt: new Date().toISOString()
      };
      localStorage.setItem('assessmentResult', JSON.stringify(results));

      // Get profile and save updated details
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user.profile) {
        user.profile.readingLevel = selectedLevelObj.title;
        user.profile.writingLevel = selectedLevelObj.title;
        user.profile.level = selectedLevelObj.levelNum;
        user.profile.xp = (user.profile.xp || 0) + 30; // onboarding bonus
        localStorage.setItem('user', JSON.stringify(user));

        // Update in profiles db
        const profiles = JSON.parse(localStorage.getItem('profiles') || '[]');
        const idx = profiles.findIndex((p: any) => p.username === username);
        if (idx !== -1) {
          profiles[idx] = { ...profiles[idx], ...user.profile };
          localStorage.setItem('profiles', JSON.stringify(profiles));
        }
      }

      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6 flex flex-col items-center justify-center relative font-inter">
      <div className="absolute top-10 left-10 w-48 h-48 bg-blue-300/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-indigo-300/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl w-full bg-white border border-slate-100 p-8 md:p-10 rounded-[32px] shadow-2xl relative z-10 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-100 text-blue-700 font-bold px-4 py-1.5 rounded-full text-xs">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span>{t.badge}</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">{t.title}</h1>
          <p className="text-slate-500 font-medium max-w-xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Level Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {levelsList.map((level) => {
            const levelData = t.levels[level.levelNum] || levelTranslations.english.levels[level.levelNum];
            return (
              <div
                key={level.levelNum}
                onClick={() => setSelected(level.levelNum)}
                className={`border-2 p-5 rounded-3xl cursor-pointer transition-all flex flex-col justify-between hover:scale-[1.02] duration-300 bg-white ${
                  selected === level.levelNum
                    ? 'border-blue-600 shadow-xl shadow-blue-500/10 ring-2 ring-blue-500/20'
                    : 'border-slate-100 hover:border-slate-300 shadow-sm'
                }`}
              >
                <div className="space-y-4">
                  {/* Level Image */}
                  <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center border border-slate-100">
                    <img
                      src={level.image}
                      alt={levelData.name}
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        (e.target as any).style.display = 'none';
                      }}
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        {t.levelText} {level.levelNum}
                      </span>
                      <span className="text-xs font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                        {levelData.title}
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-slate-950 leading-snug">{levelData.name}</h3>
                    <p className="text-slate-500 text-xs font-semibold leading-relaxed">{levelData.desc}</p>
                  </div>
                </div>

                {/* Selector marker */}
                <div className="pt-4 flex justify-end">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    selected === level.levelNum
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-slate-200'
                  }`}>
                    {selected === level.levelNum && '✓'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-100">
          <button
            onClick={() => navigate('/assessment')}
            className="text-sm font-extrabold text-slate-600 hover:text-blue-600 hover:underline px-4 py-2 cursor-pointer"
          >
            {t.testBtn}
          </button>

          <button
            onClick={handleSelectLevel}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-base px-8 py-3.5 rounded-2xl shadow-xl shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{t.confirmBtn}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
