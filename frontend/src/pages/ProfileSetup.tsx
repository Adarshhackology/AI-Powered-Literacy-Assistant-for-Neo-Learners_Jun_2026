import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../utils/api';
import { Sparkles, ArrowRight, ArrowLeft, User, CheckCircle2, Globe } from 'lucide-react';
import type { SupportedLanguage } from '../utils/translationHelper';

const avatars = [
  { id: '1', emoji: '🧑‍🎓', label: 'Learner' },
  { id: '2', emoji: '👩‍🏫', label: 'Scholar' },
  { id: '3', emoji: '🧭', label: 'Explorer' },
  { id: '4', emoji: '🦉', label: 'Wise Owl' },
  { id: '5', emoji: '🤖', label: 'Techie' },
];

const languagesList = [
  { code: 'english', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'hindi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
  { code: 'telugu', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'tamil', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'kannada', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'bengali', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
  { code: 'marathi', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  { code: 'gujarati', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'punjabi', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' }
];

const goals = [
  { id: 'Read newspapers and signs', emoji: '📰' },
  { id: 'Write basic letters & forms', emoji: '✉️' },
  { id: 'Chat with family & kids', emoji: '💬' },
  { id: 'Prepare for job applications', emoji: '💼' }
];

const readingOptions = [
  { level: 'Beginner', emoji: '🔴' },
  { level: 'Intermediate', emoji: '🟡' },
  { level: 'Advanced', emoji: '🟢' }
];

const writingOptions = [
  { level: 'Beginner', emoji: '🔴' },
  { level: 'Intermediate', emoji: '🟡' },
  { level: 'Advanced', emoji: '🟢' }
];

const speakingOptions = [
  { level: 'Shy', value: '30', emoji: '🤐' },
  { level: 'Average', value: '60', emoji: '🙂' },
  { level: 'Fluent', value: '95', emoji: '🗣️' }
];

const profileTranslations: Record<string, any> = {
  english: {
    langTitle: "Choose Your Language",
    langSubtitle: "The entire website will translate to this language.",
    detailsTitle: "Let's build your profile",
    detailsSubtitle: "Tell us your name and choose a character avatar.",
    avatarLabel: "Choose Your Avatar",
    nameLabel: "What is your name?",
    ageLabel: "How old are you?",
    goalTitle: "What is your learning goal?",
    goalSubtitle: "Choose what you want to achieve with this assistant.",
    goals: {
      'Read newspapers and signs': { title: 'Read signs & news', desc: 'Understand notice boards, newspapers, and signposts.' },
      'Write basic letters & forms': { title: 'Write letters & forms', desc: 'Fill out documents, application forms, and write letters.' },
      'Chat with family & kids': { title: 'Chat with family', desc: 'Message and talk confidently with children and relatives.' },
      'Prepare for job applications': { title: 'Job preparation', desc: 'Write emails, read resumes, and practice basic interviews.' }
    },
    readingTitle: "Your Reading Confidence",
    readingSubtitle: "Choose the option that describes your reading skill best.",
    readingOptions: {
      'Beginner': { label: 'Beginner', desc: 'Cannot read full sentences yet.' },
      'Intermediate': { label: 'Intermediate', desc: 'Can read basic words and simple sentences.' },
      'Advanced': { label: 'Advanced', desc: 'Can read newspaper articles and books.' }
    },
    writingTitle: "Your Writing Confidence",
    writingSubtitle: "Choose the option that describes your writing skill best.",
    writingOptions: {
      'Beginner': { label: 'Beginner', desc: 'Cannot write letters or full words yet.' },
      'Intermediate': { label: 'Intermediate', desc: 'Can spell basic words and simple messages.' },
      'Advanced': { label: 'Advanced', desc: 'Can write complete paragraphs and letters.' }
    },
    speakingTitle: "Speaking Confidence",
    speakingSubtitle: "Choose how comfortable you feel speaking out loud.",
    speakingOptions: {
      'Shy': { label: 'Shy / Need practice', desc: 'I feel nervous speaking out loud.' },
      'Average': { label: 'Average / Can talk basic', desc: 'I can speak simple everyday sentences.' },
      'Fluent': { label: 'Fluent / Speak easily', desc: 'I can speak and express my ideas clearly.' }
    },
    continueText: "Continue",
    back: "Back",
    complete: "Complete Onboarding"
  },
  hindi: {
    langTitle: "अपनी भाषा चुनें",
    langSubtitle: "पूरी वेबसाइट इस भाषा में अनुवादित हो जाएगी।",
    detailsTitle: "चलो आपकी प्रोफ़ाइल बनाते हैं",
    detailsSubtitle: "हमें अपना नाम बताएं और एक अवतार चुनें।",
    avatarLabel: "अपना अवतार चुनें",
    nameLabel: "आपका नाम क्या है?",
    ageLabel: "आप कितने साल के हैं?",
    goalTitle: "आपका सीखने का उद्देश्य क्या है?",
    goalSubtitle: "चुनें कि आप इस सहायक के साथ क्या हासिल करना चाहते हैं।",
    goals: {
      'Read newspapers and signs': { title: 'संकेत और समाचार पढ़ें', desc: 'सूचना बोर्ड, समाचार पत्र और साइनपोस्ट समझें।' },
      'Write basic letters & forms': { title: 'पत्र और फॉर्म लिखें', desc: 'दस्तावेज़, आवेदन पत्र भरें और पत्र लिखें।' },
      'Chat with family & kids': { title: 'परिवार के साथ चैट करें', desc: 'बच्चों और रिश्तेदारों के साथ आत्मविश्वास से बात करें।' },
      'Prepare for job applications': { title: 'नौकरी की तैयारी', desc: 'ईमेल लिखें, रिज्यूमे पढ़ें और साक्षात्कार का अभ्यास करें।' }
    },
    readingTitle: "आपका पठन स्तर",
    readingSubtitle: "वह विकल्प चुनें जो आपके पढ़ने के कौशल को सबसे अच्छी तरह दर्शाता है।",
    readingOptions: {
      'Beginner': { label: 'शुरुआती (Beginner)', desc: 'अभी पूरे वाक्य नहीं पढ़ सकते।' },
      'Intermediate': { label: 'मध्यम (Intermediate)', desc: 'बुनियादी शब्द और सरल वाक्य पढ़ सकते हैं।' },
      'Advanced': { label: 'उन्नत (Advanced)', desc: 'समाचार पत्र के लेख और पुस्तकें पढ़ सकते हैं।' }
    },
    writingTitle: "आपका लेखन स्तर",
    writingSubtitle: "वह विकल्प चुनें जो आपके लिखने के कौशल को सबसे अच्छी तरह दर्शाता है।",
    writingOptions: {
      'Beginner': { label: 'शुरुआती (Beginner)', desc: 'अभी अक्षर या पूरे शब्द नहीं लिख सकते।' },
      'Intermediate': { label: 'मध्यम (Intermediate)', desc: 'बुनियादी शब्द और सरल संदेश लिख सकते हैं।' },
      'Advanced': { label: 'उन्नत (Advanced)', desc: 'पूरे पैराग्राफ और पत्र लिख सकते हैं।' }
    },
    speakingTitle: "आपका बोलने का आत्मविश्वास",
    speakingSubtitle: "चुनें कि आप जोर से बोलने में कितने सहज महसूस करते हैं।",
    speakingOptions: {
      'Shy': { label: 'संकोची / अभ्यास की आवश्यकता', desc: 'मुझे जोर से बोलने में घबराहट महसूस होती है।' },
      'Average': { label: 'औसत / बुनियादी बात कर सकते हैं', desc: 'मैं सरल रोज़मर्रा के वाक्य बोल सकता हूँ।' },
      'Fluent': { label: 'धाराप्रवाह / आसानी से बोलें', desc: 'मैं अपने विचारों को स्पष्ट रूप से बोल और व्यक्त कर सकता हूँ।' }
    },
    continueText: "आगे बढ़ें",
    back: "पीछे",
    complete: "पंजीकरण पूरा करें"
  },
  telugu: {
    langTitle: "మీ భాషను ఎంచుకోండి",
    langSubtitle: "వెబ్‌సైట్ మొత్తం ఈ భాషలోకి మారుతుంది.",
    detailsTitle: "మీ ప్రొఫైల్‌ను నిర్మించుకుందాం",
    detailsSubtitle: "మీ పేరు చెప్పండి మరియు ఒక అవతార్‌ను ఎంచుకోండి.",
    avatarLabel: "మీ అవతార్‌ను ఎంచుకోండి",
    nameLabel: "మీ పేరు ఏమిటి?",
    ageLabel: "మీ వయస్సు ఎంత?",
    goalTitle: "మీ అభ్యాస లక్ష్యం ఏమిటి?",
    goalSubtitle: "ఈ అసిస్టెంట్‌తో మీరు ఏమి సాధించాలనుకుంటున్నారో ఎంచుకోండి.",
    goals: {
      'Read newspapers and signs': { title: 'బోర్డులు & వార్తలు చదవండి', desc: 'నోటీసు బోర్డులు, వార్తాపత్రికలు మరియు సంకేతాలను అర్థం చేసుకోండి.' },
      'Write basic letters & forms': { title: 'లేఖలు & ఫారమ్‌లు రాయండి', desc: 'పత్రాలు, దరఖాస్తు ఫారమ్‌లు నింపండి మరియు లేఖలు రాయండి.' },
      'Chat with family & kids': { title: 'కుటుంబంతో మాట్లాడండి', desc: 'పిల్లలు మరియు బంధువులతో నమ్మకంగా మాట్లాడండి.' },
      'Prepare for job applications': { title: 'ఉద్యోగ తయారీ', desc: 'ఈమెయిల్స్ రాయడం, రెజ్యూమెలు చదవడం మరియు ప్రాక్టీస్ చేయడం.' }
    },
    readingTitle: "మీ పఠన నైపుణ్యం",
    readingSubtitle: "మీ చదివే నైపుణ్యాన్ని ఉత్తమంగా వివరించే ఎంపికను ఎంచుకోండి.",
    readingOptions: {
      'Beginner': { label: 'ప్రారంభకుడు (Beginner)', desc: 'ఇంకా పూర్తి వాక్యాలను చదవలేరు.' },
      'Intermediate': { label: 'మధ్యస్థం (Intermediate)', desc: 'ప్రాథమిక పదాలుและ సాధారణ వాక్యాలను చదవగలరు.' },
      'Advanced': { label: 'అధునాతన (Advanced)', desc: 'వార్తాపత్రిక కథనాలు మరియు పుస్తకాలను చదవగలరు.' }
    },
    writingTitle: "మీ లేఖన నైపుణ్యం",
    writingSubtitle: "మీ రాసే నైపుణ్యాన్ని ఉత్తమంగా వివరించే ఎంపికను ఎంచుకోండి.",
    writingOptions: {
      'Beginner': { label: 'ప్రారంభకుడు (Beginner)', desc: 'ఇంకా అక్షరాలు లేదా పూర్తి పదాలను రాయలేరు.' },
      'Intermediate': { label: 'మధ్యస్థం (Intermediate)', desc: 'ప్రాథమిక పదాలు మరియు సాధారణ సందేశాలను రాయగలరు.' },
      'Advanced': { label: 'అధునాతన (Advanced)', desc: 'పూర్తి పేరాలు మరియు లేఖలను రాయగలరు.' }
    },
    speakingTitle: "మాట్లాడే నైపుణ్యం",
    speakingSubtitle: "బయటకు మాట్లాడటానికి మీ సౌకర్యాన్ని ఎంచుకోండి.",
    speakingOptions: {
      'Shy': { label: 'సిగ్గుపడే / ప్రాక్టీస్ కావాలి', desc: 'నేను బయటకు మాట్లాడటానికి కొంచెం భయపడతాను.' },
      'Average': { label: 'సగటు / ప్రాథమికంగా మాట్లాడగలను', desc: 'నేను సాధారణ రోజువారీ వాక్యాలను మాట్లాడగలను.' },
      'Fluent': { label: 'ధారాళంగా మాట్లాడగలను', desc: 'నేను నా ఆలోచనలను స్పష్టంగా మాట్లాడి వ్యక్తపరచగలను.' }
    },
    continueText: "కొనసాగించండి",
    back: "వెనుకకు",
    complete: "పూర్తి చేయండి"
  },
  tamil: {
    langTitle: "உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்",
    langSubtitle: "முழு இணையதளமும் இந்த மொழிக்கு மாற்றப்படும்.",
    detailsTitle: "உங்கள் சுயவிவரத்தை உருவாக்குவோம்",
    detailsSubtitle: "உங்கள் பெயரைச் சொல்லி, ஒரு அவதாரத்தைத் தேர்ந்தெடுக்கவும்.",
    avatarLabel: "உங்கள் அவதாரத்தைத் தேர்ந்தெடுக்கவும்",
    nameLabel: "உங்கள் பெயர் என்ன?",
    ageLabel: "உங்கள் வயது என்ன?",
    goalTitle: "உங்கள் கற்றல் இலக்கு என்ன?",
    goalSubtitle: "இந்த உதவியாளருடன் நீங்கள் என்ன சாதிக்க விரும்புகிறீர்கள் என்பதைத் தேர்ந்தெடுக்கவும்.",
    goals: {
      'Read newspapers and signs': { title: 'பலகைகள் & செய்திகளைப் படிக்கவும்', desc: 'அறிவிப்பு பலகைகள், செய்தித்தாள்கள் மற்றும் பலகைகளைப் புரிந்து கொள்ளுங்கள்.' },
      'Write basic letters & forms': { title: 'கடிதங்கள் & படிவங்களை எழுதுங்கள்', desc: 'ஆவணங்கள், விண்ணப்பப் படிவங்களை நிரப்பவும் மற்றும் கடிதங்கள் எழுதவும்.' },
      'Chat with family & kids': { title: 'குடும்பத்தினருடன் அரட்டையடிக்கவும்', desc: 'குழந்தைகள் மற்றும் உறவினர்களுடன் நம்பிக்கையுடன் பேசவும்.' },
      'Prepare for job applications': { title: 'வேலை தயாரிப்பு', desc: 'மின்னஞ்சல்களை எழுதுங்கள், விண்ணப்பங்களைப் படியுங்கள்.' }
    },
    readingTitle: "உங்கள் வாசிப்புத் திறன்",
    readingSubtitle: "உங்கள் வாசிப்புத் திறனைச் சிறப்பாக விளக்கும் விருப்பத்தைத் தேர்ந்தெடுக்கவும்.",
    readingOptions: {
      'Beginner': { label: 'தொடக்கநிலை (Beginner)', desc: 'இன்னும் முழு வாக்கியங்களைப் படிக்க முடியாது.' },
      'Intermediate': { label: 'இடைநிலை (Intermediate)', desc: 'அடிப்படை சொற்கள் மற்றும் எளிய வாக்கியங்களைப் படிக்க முடியும்.' },
      'Advanced': { label: 'மேம்பட்ட நிலை (Advanced)', desc: 'செய்தித்தாள் கட்டுரைகள் மற்றும் புத்தகங்களைப் படிக்க முடியும்.' }
    },
    writingTitle: "உங்கள் எழுத்துத் திறன்",
    writingSubtitle: "உங்கள் எழுத்துத் திறனைச் சிறப்பாக விளக்கும் விருப்பத்தைத் தேர்ந்தெடுக்கவும்.",
    writingOptions: {
      'Beginner': { label: 'தொடக்கநிலை (Beginner)', desc: 'இன்னும் எழுத்துக்கள் அல்லது முழு சொற்களை எழுத முடியாது.' },
      'Intermediate': { label: 'இடைநிலை (Intermediate)', desc: 'அடிப்படை சொற்கள் மற்றும் எளிய செய்திகளை எழுத முடியும்.' },
      'Advanced': { label: 'மேம்பட்ட நிலை (Advanced)', desc: 'முழு பத்திகள் மற்றும் கடிதங்களை எழுத முடியும்.' }
    },
    speakingTitle: "பேசும் நம்பிக்கை",
    speakingSubtitle: "சத்தமாக பேசுவதில் உங்களுக்கு எவ்வளவு வசதி என்பதைத் தேர்ந்தெடுக்கவும்.",
    speakingOptions: {
      'Shy': { label: 'வெட்கப்படுபவர் / பயிற்சி தேவை', desc: 'சத்தமாக பேசுவதற்கு நான் கவலைப்படுகிறேன்.' },
      'Average': { label: 'சராசரி / அடிப்படை பேச முடியும்', desc: 'நான் எளிய அன்றாட வாக்கியங்களை பேச முடியும்.' },
      'Fluent': { label: 'சரளமாக பேச முடியும்', desc: 'நான் என் கருத்துக்களை தெளிவாக பேசவும் வெளிப்படுத்தவும் முடியும்.' }
    },
    continueText: "தொடரவும்",
    back: "பின்னால்",
    complete: "முடிந்தது"
  },
  kannada: {
    langTitle: "ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    langSubtitle: "ಇಡೀ ವೆಬ್‌ಸೈಟ್ ಈ ಭಾಷೆಗೆ ಅನುವಾದಗೊಳ್ಳುತ್ತದೆ.",
    detailsTitle: "ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಅನ್ನು ನಿರ್ಮಿಸೋಣ",
    detailsSubtitle: "ನಿಮ್ಮ ಹೆಸರನ್ನು ತಿಳಿಸಿ ಮತ್ತು ಒಂದು ಅವತಾರವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ.",
    avatarLabel: "ನಿಮ್ಮ ಅವತಾರವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    nameLabel: "ನಿಮ್ಮ ಹೆಸರೇನು?",
    ageLabel: "ನಿಮ್ಮ ವಯಸ್ಸು ಎಷ್ಟು?",
    goalTitle: "ನಿಮ್ಮ ಕಲಿಕೆಯ ಉದ್ದೇಶವೇನು?",
    goalSubtitle: "ಈ ಸಹಾಯಕನೊಂದಿಗೆ ನೀವು ಏನನ್ನು ಸಾಧಿಸಲು ಬಯಸುತ್ತೀರಿ ಎಂಬುದನ್ನು ಆಯ್ಕೆ ಮಾಡಿ.",
    goals: {
      'Read newspapers and signs': { title: 'ಸಂಕೇತಗಳು ಮತ್ತು ಸುದ್ದಿ ಓದಿ', desc: 'ಮಾಹಿತಿ ಫಲಕಗಳು, ವೃತ್ತಪತ್ರಿಕೆಗಳು ಮತ್ತು ಸಂಕೇತಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.' },
      'Write basic letters & forms': { title: 'ಪತ್ರಗಳು ಮತ್ತು ಫಾರ್ಮ್‌ಗಳನ್ನು ಬರೆಯಿರಿ', desc: 'ದಾಖಲೆಗಳು, ಅರ್ಜಿ ನಮೂನೆಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ ಮತ್ತು ಪತ್ರಗಳನ್ನು ಬರೆಯಿರಿ.' },
      'Chat with family & kids': { title: 'ಕುಟುಂಬದೊಂದಿಗೆ ಚಾಟ್ ಮಾಡಿ', desc: 'ಮಕ್ಕಳು ಮತ್ತು ಸಂಬಂಧಿಕರೊಂದಿಗೆ ಆತ್ಮವಿಶ್ವಾಸದಿಂದ ಮಾತನಾಡಿ.' },
      'Prepare for job applications': { title: 'ಕೆಲಸದ ತಯಾರಿ', desc: 'ಇಮೇಲ್‌ಗಳನ್ನು ಬರೆಯಿರಿ, ರೆಸ್ಯೂಮ್‌ಗಳನ್ನು ಓದಿ.' }
    },
    readingTitle: "ನಿಮ್ಮ ಓದುವ ಕೌಶಲ್ಯ",
    readingSubtitle: "ನಿಮ್ಮ ಓದುವ ಕೌಶಲ್ಯವನ್ನು ಉತ್ತಮವಾಗಿ ವಿವರಿಸುವ ಆಯ್ಕೆಯನ್ನು ಆರಿಸಿ.",
    readingOptions: {
      'Beginner': { label: 'ಆರಂಭಿಕ (Beginner)', desc: 'ಇನ್ನೂ ಪೂರ್ಣ ವಾಕ್ಯಗಳನ್ನು ಓದಲು ಸಾಧ್ಯವಿಲ್ಲ.' },
      'Intermediate': { label: 'ಮಧ್ಯಮ (Intermediate)', desc: 'ಮೂಲ ಪದಗಳು ಮತ್ತು ಸರಳ ವಾಕ್ಯಗಳನ್ನು ಓದಬಹುದು.' },
      'Advanced': { label: 'ಸುಧಾರಿತ (Advanced)', desc: 'ವೃತ್ತಪತ್ರಿಕೆ ಲೇಖನಗಳು ಮತ್ತು ಪುಸ್ತಕಗಳನ್ನು ಓದಬಹುದು.' }
    },
    writingTitle: "ನಿಮ್ಮ ಬರವಣಿಗೆ ಕೌಶಲ್ಯ",
    writingSubtitle: "ನಿಮ್ಮ ಬರವಣಿಗೆ ಕೌಶಲ್ಯವನ್ನು ಉತ್ತಮವಾಗಿ ವಿವರಿಸುವ ಆಯ್ಕೆಯನ್ನು ಆರಿಸಿ.",
    writingOptions: {
      'Beginner': { label: 'ಆರಂಭಿಕ (Beginner)', desc: 'ಇನ್ನೂ ಅಕ್ಷರಗಳನ್ನು ಅಥವಾ ಪೂರ್ಣ ಪದಗಳನ್ನು ಬರೆಯಲು ಸಾಧ್ಯವಿಲ್ಲ.' },
      'Intermediate': { label: 'ಮಧ್ಯಮ (Intermediate)', desc: 'ಮೂಲ ಪದಗಳು ಮತ್ತು ಸರಳ ಸಂದೇಶಗಳನ್ನು ಬರೆಯಬಹುದು.' },
      'Advanced': { label: 'ಸುಧಾರಿತ (Advanced)', desc: 'ಪೂರ್ಣ ಪ್ಯಾರಾಗಳು ಮತ್ತು ಪತ್ರಗಳನ್ನು ಬರೆಯಬಹುದು.' }
    },
    speakingTitle: "ಮಾತನಾಡುವ ಆತ್ಮವಿಶ್ವಾಸ",
    speakingSubtitle: "ಗಟ್ಟಿಯಾಗಿ ಮಾತನಾಡಲು ನಿಮ್ಮ ಅನುಕೂಲತೆಯನ್ನು ಆರಿಸಿ.",
    speakingOptions: {
      'Shy': { label: 'ನಾಚಿಕೆಪಡುವ / ಅಭ್ಯಾಸದ ಅಗತ್ಯವಿದೆ', desc: 'ನನಗೆ ಗಟ್ಟಿಯಾಗಿ ಮಾತನಾಡಲು ಗಾಬರಿಯಾಗುತ್ತದೆ.' },
      'Average': { label: 'ಸರಾಸರಿ / ಮೂಲಭೂತವಾಗಿ ಮಾತನಾಡಬಹುದು', desc: 'ನಾನು ಸರಳ ದಿನನಿತ್ಯದ ವಾಕ್ಯಗಳನ್ನು ಮಾತನಾಡಬಲ್ಲೆ.' },
      'Fluent': { label: 'ಸರಾಗವಾಗಿ ಮಾತನಾಡಬಲ್ಲೆ', desc: 'ನಾನು ನನ್ನ ಆಲೋಚನೆಗಳನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ಮಾತನಾಡಬಹುದು.' }
    },
    continueText: "ಮುಂದುವರೆಯಿರಿ",
    back: "ಹಿಂದೆ",
    complete: "ಪೂರ್ಣಗೊಳಿಸಿ"
  }
};

export default function ProfileSetup() {
  const username = localStorage.getItem('username') || 'guest';
  const navigate = useNavigate();

  // Onboarding wizard steps: 1 to 6
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [prefLang, setPrefLang] = useState<SupportedLanguage>('english');

  // Form states
  const [avatar, setAvatar] = useState('1');
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('24');
  const [learningGoal, setLearningGoal] = useState('Read newspapers and signs');
  const [readingLevel, setReadingLevel] = useState('Beginner');
  const [writingLevel, setWritingLevel] = useState('Beginner');
  const [speakingLevel, setSpeakingLevel] = useState('Average');
  const [speakingConfidence, setSpeakingConfidence] = useState('60');

  const [loading, setLoading] = useState(false);

  // Load language settings on mount
  useEffect(() => {
    const saved = (localStorage.getItem('preferredLanguage') || 'english') as SupportedLanguage;
    setPrefLang(saved);
  }, []);

  // Update fullName state when localStorage user changes
  useEffect(() => {
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const parsed = JSON.parse(userStr);
        if (parsed.first_name) {
          setFullName(parsed.first_name);
        } else if (parsed.profile && parsed.profile.fullName) {
          setFullName(parsed.profile.fullName);
        } else {
          setFullName(username);
        }
      } else {
        setFullName(username);
      }
    } catch (e) {
      setFullName(username);
    }
  }, [username]);

  const t = profileTranslations[prefLang] || profileTranslations.english;

  const handleLanguageSelect = (code: SupportedLanguage) => {
    setPrefLang(code);
    localStorage.setItem('preferredLanguage', code);
    // Dispatch custom event to let components know language changed
    window.dispatchEvent(new Event('storage'));
  };

  const handleNext = () => {
    if (step === 2) {
      if (!fullName.trim() || !age) {
        alert('Please fill in your name and age.');
        return;
      }
    }
    setStep((prev) => (prev + 1) as any);
  };

  const handleBack = () => {
    setStep((prev) => (prev - 1) as any);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const profileData = {
        fullName,
        age,
        gender: 'Prefer not to say',
        education: 'Self-Taught',
        occupation: 'Learner',
        preferredLanguage: prefLang,
        learningGoal,
        readingLevel,
        writingLevel,
        speakingConfidence,
        dailyLearningTime: '30 mins',
        avatar: avatars.find(a => a.id === avatar)?.emoji || '🧑‍🎓',
        xp: 20,
        coins: 10,
        streak: 1,
        level: 1,
        badges: ['First Step'],
        completedLessons: []
      };
      
      const res = await apiClient.saveProfile(username, profileData);
      
      // Update global user structure in localStorage
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      user.profile = res;
      localStorage.setItem('user', JSON.stringify(user));
      
      navigate('/level-selection');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Safe translations lookup
  const getGoalData = (id: string) => {
    const goalsObj = t?.goals || profileTranslations.english.goals;
    return goalsObj[id] || profileTranslations.english.goals[id] || { title: id, desc: '' };
  };

  const getReadingData = (level: string) => {
    const opts = t?.readingOptions || profileTranslations.english.readingOptions;
    return opts[level] || profileTranslations.english.readingOptions[level] || { label: level, desc: '' };
  };

  const getWritingData = (level: string) => {
    const opts = t?.writingOptions || profileTranslations.english.writingOptions;
    return opts[level] || profileTranslations.english.writingOptions[level] || { label: level, desc: '' };
  };

  const getSpeakingData = (level: string) => {
    const opts = t?.speakingOptions || profileTranslations.english.speakingOptions;
    return opts[level] || profileTranslations.english.speakingOptions[level] || { label: level, desc: '' };
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6 flex flex-col items-center justify-center relative font-inter">
      {/* Decorative Lights */}
      <div className="absolute top-10 left-10 w-48 h-48 bg-blue-300/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-indigo-300/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl w-full bg-white border border-slate-200/50 p-8 md:p-10 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.03)] relative z-10 space-y-8">
        
        {/* Wizard Step Progress Tracker */}
        <div className="space-y-2.5">
          <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">
            <span>Step {step} of 6</span>
            <span>{Math.round((step / 6) * 100)}% Complete</span>
          </div>
          <div className="grid grid-cols-6 gap-1.5 h-2">
            {[1, 2, 3, 4, 5, 6].map((s) => (
              <div 
                key={s} 
                className={`rounded-full transition-all duration-300 ${
                  step >= s ? 'bg-indigo-600' : 'bg-slate-100'
                }`} 
              />
            ))}
          </div>
        </div>

        {/* STEP 1: Select Spoken / Interface Language */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 font-extrabold px-4 py-1.5 rounded-full text-xs">
                <Globe className="w-4 h-4" />
                <span>Language Selection</span>
              </div>
              <h2 className="text-2.5xl font-black text-slate-900 tracking-tight">{t.langTitle}</h2>
              <p className="text-slate-500 font-semibold text-sm">{t.langSubtitle}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 pt-4">
              {languagesList.map((lang) => (
                <div
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.code as SupportedLanguage)}
                  className={`p-4 rounded-2xl border cursor-pointer text-center transition-all select-none hover:scale-[1.02] ${
                    prefLang === lang.code
                      ? 'border-indigo-600 bg-indigo-50/20 shadow-md ring-4 ring-indigo-500/5'
                      : 'border-slate-100 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="text-2xl mb-1">{lang.flag}</div>
                  <h4 className="font-extrabold text-slate-950 text-sm leading-none">{lang.nativeName}</h4>
                  <p className="text-[10px] text-slate-400 font-semibold mt-1">{lang.name}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm px-8 py-3.5 rounded-2xl shadow-md hover:shadow-indigo-600/10 active:scale-95 transition-all cursor-pointer"
              >
                <span>{t.continueText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Personal Details */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2.5xl font-black text-slate-900 tracking-tight">{t.detailsTitle}</h2>
              <p className="text-slate-500 font-semibold text-sm">{t.detailsSubtitle}</p>
            </div>

            <div className="space-y-6 pt-4">
              {/* Avatar Picker */}
              <div className="space-y-3">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">{t.avatarLabel}</label>
                <div className="flex justify-center gap-3">
                  {avatars.map((av) => (
                    <div
                      key={av.id}
                      onClick={() => setAvatar(av.id)}
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl border transition-all hover:scale-105 cursor-pointer ${
                        avatar === av.id
                          ? 'border-indigo-600 bg-indigo-50/20 shadow-md ring-4 ring-indigo-500/5'
                          : 'border-slate-100 bg-slate-50 hover:border-slate-300'
                      }`}
                      title={av.label}
                    >
                      {av.emoji}
                    </div>
                  ))}
                </div>
              </div>

              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider pl-1">{t.nameLabel}</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400/80" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all font-semibold text-sm placeholder:text-slate-400"
                    placeholder="e.g. Adarsh Kumar"
                  />
                </div>
              </div>

              {/* Age */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider pl-1">{t.ageLabel}</label>
                <input
                  type="number"
                  required
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all font-semibold text-sm placeholder:text-slate-400"
                  placeholder="Age"
                />
              </div>
            </div>

            <div className="flex justify-between pt-6 border-t border-slate-100">
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-900 font-bold text-sm cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t.back}</span>
              </button>
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm px-8 py-3.5 rounded-2xl shadow-md hover:shadow-indigo-600/10 active:scale-95 transition-all cursor-pointer"
              >
                <span>{t.continueText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Learning Goal */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2.5xl font-black text-slate-900 tracking-tight">{t.goalTitle}</h2>
              <p className="text-slate-500 font-semibold text-sm">{t.goalSubtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              {goals.map((g) => {
                const goalData = getGoalData(g.id);
                return (
                  <div
                    key={g.id}
                    onClick={() => setLearningGoal(g.id)}
                    className={`p-5 rounded-2xl border cursor-pointer text-left transition-all ${
                      learningGoal === g.id
                        ? 'border-indigo-600 bg-indigo-50/20 shadow-md ring-4 ring-indigo-500/5'
                        : 'border-slate-100 bg-white hover:border-slate-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="text-3xl mb-2.5">{g.emoji}</div>
                    <h4 className="font-extrabold text-slate-950 text-sm leading-snug">{goalData.title}</h4>
                    <p className="text-slate-400 text-xs font-semibold mt-1 leading-relaxed">{goalData.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between pt-6 border-t border-slate-100">
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-900 font-bold text-sm cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t.back}</span>
              </button>
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm px-8 py-3.5 rounded-2xl shadow-md hover:shadow-indigo-600/10 active:scale-95 transition-all cursor-pointer"
              >
                <span>{t.continueText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Reading Confidence */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2.5xl font-black text-slate-900 tracking-tight">{t.readingTitle}</h2>
              <p className="text-slate-500 font-semibold text-sm">{t.readingSubtitle}</p>
            </div>

            <div className="space-y-4 pt-4">
              {readingOptions.map((opt) => {
                const readingData = getReadingData(opt.level);
                return (
                  <div
                    key={opt.level}
                    onClick={() => setReadingLevel(opt.level)}
                    className={`p-5 rounded-2xl border cursor-pointer flex items-center gap-4 text-left transition-all ${
                      readingLevel === opt.level
                        ? 'border-indigo-600 bg-indigo-50/20 shadow-md ring-4 ring-indigo-500/5'
                        : 'border-slate-100 bg-white hover:border-slate-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xl shrink-0">
                      {opt.emoji}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-955 text-sm leading-snug">{readingData.label}</h4>
                      <p className="text-slate-400 text-xs font-semibold mt-0.5">{readingData.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between pt-6 border-t border-slate-100">
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-900 font-bold text-sm cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t.back}</span>
              </button>
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm px-8 py-3.5 rounded-2xl shadow-md hover:shadow-indigo-600/10 active:scale-95 transition-all cursor-pointer"
              >
                <span>{t.continueText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Writing Confidence */}
        {step === 5 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2.5xl font-black text-slate-900 tracking-tight">{t.writingTitle}</h2>
              <p className="text-slate-500 font-semibold text-sm">{t.writingSubtitle}</p>
            </div>

            <div className="space-y-4 pt-4">
              {writingOptions.map((opt) => {
                const writingData = getWritingData(opt.level);
                return (
                  <div
                    key={opt.level}
                    onClick={() => setWritingLevel(opt.level)}
                    className={`p-5 rounded-2xl border cursor-pointer flex items-center gap-4 text-left transition-all ${
                      writingLevel === opt.level
                        ? 'border-indigo-600 bg-indigo-50/20 shadow-md ring-4 ring-indigo-500/5'
                        : 'border-slate-100 bg-white hover:border-slate-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xl shrink-0">
                      {opt.emoji}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-955 text-sm leading-snug">{writingData.label}</h4>
                      <p className="text-slate-400 text-xs font-semibold mt-0.5">{writingData.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between pt-6 border-t border-slate-100">
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-900 font-bold text-sm cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t.back}</span>
              </button>
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm px-8 py-3.5 rounded-2xl shadow-md hover:shadow-indigo-600/10 active:scale-95 transition-all cursor-pointer"
              >
                <span>{t.continueText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: Speaking Confidence */}
        {step === 6 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2.5xl font-black text-slate-900 tracking-tight">{t.speakingTitle}</h2>
              <p className="text-slate-500 font-semibold text-sm">{t.speakingSubtitle}</p>
            </div>

            <div className="space-y-4 pt-4">
              {speakingOptions.map((opt) => {
                const speakingData = getSpeakingData(opt.level);
                return (
                  <div
                    key={opt.level}
                    onClick={() => {
                      setSpeakingLevel(opt.level);
                      setSpeakingConfidence(opt.value);
                    }}
                    className={`p-5 rounded-2xl border cursor-pointer flex items-center gap-4 text-left transition-all ${
                      speakingLevel === opt.level
                        ? 'border-indigo-600 bg-indigo-50/20 shadow-md ring-4 ring-indigo-500/5'
                        : 'border-slate-100 bg-white hover:border-slate-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl shrink-0">
                      {opt.emoji}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-950 text-sm leading-snug">{speakingData.label}</h4>
                      <p className="text-slate-400 text-xs font-semibold mt-0.5">{speakingData.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between pt-6 border-t border-slate-100 items-center">
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-900 font-bold text-sm cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t.back}</span>
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm px-8 py-4 rounded-2xl shadow-lg shadow-indigo-600/10 active:scale-95 transition-all cursor-pointer disabled:opacity-60"
              >
                {loading ? (
                  <span>Saving...</span>
                ) : (
                  <>
                    <span>{t.complete}</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
