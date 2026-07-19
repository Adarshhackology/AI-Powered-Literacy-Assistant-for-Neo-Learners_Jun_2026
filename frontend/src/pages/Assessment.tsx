import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Volume2, CheckCircle2, AlertCircle } from 'lucide-react';
import { apiClient } from '../utils/api';

const assessmentTranslations: Record<string, any> = {
  english: {
    title: "Initial Assessment 🎯",
    subtitle: "Let's play a quick game to see your reading skills!",
    reading: "Reading",
    writing: "Writing",
    comprehension: "Comprehension",
    next: "Next Section 🚀",
    submit: "All Done! View Results 🎉",
    readingHeader: "Section 1: Image Match 🍎",
    speakBtn: "Listen 🔊",
    readingQ1: "Q1. Click the word that matches the picture:",
    readingQ2: "Q2. Click the word that matches the picture:",
    optionsR1: { 'Apple': 'Apple', 'Banana': 'Banana', 'Orange': 'Orange', 'Grapes': 'Grapes' },
    optionsR2: { 'Book': 'Book', 'Pencil': 'Pencil', 'Table': 'Table', 'Bag': 'Bag' },
    writingHeader: "Section 2: Write a Word ✍️",
    writingQ: "Task: Write a simple sentence in English about what you see in the book or your favorite food.",
    writingHelp: "Write at least 3-5 words. Make sure to use capital letters and end with a period.",
    placeholder: "Type your sentence here...",
    grammarHelp: "Grammar Hints",
    grammarCaps: "Capital Letter",
    grammarPeriod: "Ends with Period (.)",
    grammarMinWords: "5+ Words Required",
    wordCount: "Word Count",
    compHeader: "Section 3: Picture Clues 🧩",
    compSpeak: "Listen Qs 🔊",
    compQ1: "Q1. What letters do you see on the toy blocks?",
    compQ2: "Q2. What is the person in the picture reading?",
    optionsC1: { 'A B C': 'A B C', 'X Y Z': 'X Y Z', '1 2 3': '1 2 3', 'D O G': 'D O G' },
    optionsC2: { 'Newspaper': 'Newspaper', 'Phone': 'Phone', 'Letter': 'Letter', 'Nothing': 'Nothing' }
  },
  hindi: {
    title: "प्रारंभिक मूल्यांकन 🎯",
    subtitle: "चलो आपके पढ़ने के कौशल को देखने के लिए एक त्वरित गेम खेलते हैं!",
    reading: "पठन (Reading)",
    writing: "लेखन (Writing)",
    comprehension: "समझ (Comprehension)",
    next: "अगला भाग 🚀",
    submit: "मूल्यांकन सबमिट करें 🎉",
    readingHeader: "भाग १: चित्र मिलान (Image Match) 🍎",
    speakBtn: "सुनें (Listen) 🔊",
    readingQ1: "प्रश्न १. उस शब्द पर क्लिक करें जो चित्र से मेल खाता है:",
    readingQ2: "प्रश्न २. उस शब्द पर क्लिक करें जो चित्र से मेल खाता है:",
    optionsR1: { 'Apple': 'सेब (Apple)', 'Banana': 'केला (Banana)', 'Orange': 'संतरा (Orange)', 'Grapes': 'अंगूर (Grapes)' },
    optionsR2: { 'Book': 'किताब (Book)', 'Pencil': 'पेंसिल (Pencil)', 'Table': 'मेज (Table)', 'Bag': 'बस्ता (Bag)' },
    writingHeader: "भाग २: लेखन अभ्यास ✍️",
    writingQ: "कार्य: किताब या अपने पसंदीदा भोजन के बारे में अंग्रेजी में एक सरल वाक्य लिखें।",
    writingHelp: "कम से कम ३-५ शब्द लिखें। बड़े अक्षरों (Capital letters) का प्रयोग करें और अंत में पूर्ण विराम (.) लगाएं।",
    placeholder: "अपना वाक्य यहाँ लिखें...",
    grammarHelp: "व्याकरण संकेत",
    grammarCaps: "बड़ा अक्षर (Capital)",
    grammarPeriod: "पूर्ण विराम (.) पर समाप्त",
    grammarMinWords: "५+ शब्दों की आवश्यकता",
    wordCount: "शब्दों की संख्या",
    compHeader: "भाग ३: चित्र सुराग (Picture Clues) 🧩",
    compSpeak: "सुनें (Listen) 🔊",
    compQ1: "प्रश्न १. आपको खिलौने के ब्लॉक पर कौन से अक्षर दिखाई दे रहे हैं?",
    compQ2: "प्रश्न २. चित्र में व्यक्ति क्या पढ़ रहा है?",
    optionsC1: { 'A B C': 'A B C', 'X Y Z': 'X Y Z', '1 2 3': '1 2 3', 'D O G': 'D O G' },
    optionsC2: { 'Newspaper': 'समाचार पत्र (Newspaper)', 'Phone': 'फ़ोन (Phone)', 'Letter': 'पत्र (Letter)', 'Nothing': 'कुछ नहीं (Nothing)' }
  },
  telugu: {
    title: "ప్రారంభ అంచనా 🎯",
    subtitle: "మీ పఠన నైపుణ్యాలను చూడటానికి ఒక చిన్న ఆట ఆడుకుందాం!",
    reading: "చదవడం",
    writing: "రాయడం",
    comprehension: "అవగాహన",
    next: "తదుపరి విభాగం 🚀",
    submit: "సమర్పించండి 🎉",
    readingHeader: "విభాగం 1: చిత్ర సరిపోలిక 🍎",
    speakBtn: "వినండి 🔊",
    readingQ1: "ప్రశ్న 1. చిత్రానికి సరిపోయే పదాన్ని క్లిక్ చేయండి:",
    readingQ2: "ప్రశ్న 2. చిత్రానికి సరిపోయే పదాన్ని క్లిక్ చేయండి:",
    optionsR1: { 'Apple': 'యాపిల్ (Apple)', 'Banana': 'అరటిపండు (Banana)', 'Orange': 'నారింజ (Orange)', 'Grapes': 'ద్రాక్ష (Grapes)' },
    optionsR2: { 'Book': 'పుస్తకం (Book)', 'Pencil': 'పెన్సిల్ (Pencil)', 'Table': 'బల్ల (Table)', 'Bag': 'సంచి (Bag)' },
    writingHeader: "విభాగం 2: రాయడం ✍️",
    writingQ: "టాస్క్: పుస్తకం లేదా మీకు ఇష్టమైన ఆహారం గురించి ఇంగ్లీష్ లో ఒక సాధారణ వాక్యం రాయండి.",
    writingHelp: "కనీసం 3-5 పదాలు రాయండి. క్యాపిటల్ లెటర్స్ వాడండి మరియు చివర ఫుల్ స్టాప్ (.) ఉంచండి.",
    placeholder: "మీ వాక్యం ఇక్కడ రాయండి...",
    grammarHelp: "వ్యాకరణ సహాయం",
    grammarCaps: "క్యాపిటల్ లెటర్",
    grammarPeriod: "ఫుల్ స్టాప్ (.) తో ముగుస్తుంది",
    grammarMinWords: "5+ పదాలు ఉండాలి",
    wordCount: "పదాల సంఖ్య",
    compHeader: "విభాగం 3: చిత్ర అవగాహన 🧩",
    compSpeak: "వినండి 🔊",
    compQ1: "ప్రశ్న 1. బొమ్మ బ్లాకులపై మీకు ఏ అక్షరాలు కనిపిస్తున్నాయి?",
    compQ2: "ప్రశ్న 2. చిత్రంలో ఉన్న వ్యక్తి ఏమి చదువుతున్నాడు?",
    optionsC1: { 'A B C': 'A B C', 'X Y Z': 'X Y Z', '1 2 3': '1 2 3', 'D O G': 'D O G' },
    optionsC2: { 'Newspaper': 'వార్తాపత్రిక (Newspaper)', 'Phone': 'ఫోన్ (Phone)', 'Letter': 'లేఖ (Letter)', 'Nothing': 'ఏమీ లేదు (Nothing)' }
  },
  tamil: {
    title: "தொடக்க மதிப்பீடு 🎯",
    subtitle: "உங்கள் வாசிப்புத் திறனைப் பார்க்க ஒரு விரைவான விளையாட்டை விளையாடுவோம்!",
    reading: "வாசிப்பு",
    writing: "எழுதுதல்",
    comprehension: "புரிந்துகொள்ளுதல்",
    next: "அடுத்த பகுதி 🚀",
    submit: "சமர்ப்பி 🎉",
    readingHeader: "பகுதி 1: படப் பொருத்தம் 🍎",
    speakBtn: "கேளுங்கள் 🔊",
    readingQ1: "கேள்வி 1. படத்திற்குப் பொருந்தும் வார்த்தையைக் கிளிக் செய்க:",
    readingQ2: "கேள்வி 2. படத்திற்குப் பொருந்தும் வார்த்தையைக் கிளிக் செய்க:",
    optionsR1: { 'Apple': 'ஆப்பிள் (Apple)', 'Banana': 'வாழைப்பழம் (Banana)', 'Orange': 'ஆரஞ்சு (Orange)', 'Grapes': 'திராட்சை (Grapes)' },
    optionsR2: { 'Book': 'புத்தகம் (Book)', 'Pencil': 'பென்சில் (Pencil)', 'Table': 'மேஜை (Table)', 'Bag': 'பள்ளிப் பை (Bag)' },
    writingHeader: "பகுதி 2: எழுதுதல் ✍️",
    writingQ: "பணி: புத்தகம் அல்லது உங்களுக்கு பிடித்த உணவு பற்றி ஆங்கிலத்தில் எளிய வாக்கியம் எழுதுங்கள்.",
    writingHelp: "குறைந்தது 3-5 வார்த்தைகள் எழுதவும். பெரிய எழுத்தில் (Capital) தொடங்கி, முற்றுப்புள்ளியுடன் (.) முடிக்கவும்.",
    placeholder: "வாக்கியத்தை இங்கே தட்டச்சு செய்யவும்...",
    grammarHelp: "இலக்கண உதவி",
    grammarCaps: "பெரிய எழுத்து (Capital)",
    grammarPeriod: "முற்றுப்புள்ளி (.) உடன் முடியும்",
    grammarMinWords: "5+ வார்த்தைகள் தேவை",
    wordCount: "வார்த்தை எண்ணிக்கை",
    compHeader: "பகுதி 3: படப் புரிதல் 🧩",
    compSpeak: "கேளுங்கள் 🔊",
    compQ1: "கேள்வி 1. பொம்மை கட்டைகளில் என்ன எழுத்துக்களைக் காண்கிறீர்கள்?",
    compQ2: "கேள்வி 2. படத்தில் உள்ள நபர் என்ன படிக்கிறார்?",
    optionsC1: { 'A B C': 'A B C', 'X Y Z': 'X Y Z', '1 2 3': '1 2 3', 'D O G': 'D O G' },
    optionsC2: { 'Newspaper': 'செய்தித்தாள் (Newspaper)', 'Phone': 'தொலைபேசி (Phone)', 'Letter': 'கடிதம் (Letter)', 'Nothing': 'ஒன்றுமில்லை (Nothing)' }
  },
  kannada: {
    title: "ಆರಂಭಿಕ ಮೌಲ್ಯಮಾಪನ 🎯",
    subtitle: "ನಿಮ್ಮ ಓದುವ ಕೌಶಲ್ಯವನ್ನು ಪರೀಕ್ಷಿಸಲು ಒಂದು ಸಣ್ಣ ಆಟ ಆಡೋಣ!",
    reading: "ಓದುವಿಕೆ",
    writing: "ಬರವಣಿಗೆ",
    comprehension: "ಗ್ರಹಿಕೆ",
    next: "ಮುಂದಿನ ವಿಭಾಗ 🚀",
    submit: "ಸಲ್ಲಿಸಿ 🎉",
    readingHeader: "ವಿಭಾಗ 1: ಚಿತ್ರ ಹೊಂದಾಣಿಕೆ 🍎",
    speakBtn: "ಕೇಳಿ 🔊",
    readingQ1: "ಪ್ರಶ್ನೆ 1. ಚಿತ್ರಕ್ಕೆ ಹೊಂದಿಕೆಯಾಗುವ ಪದವನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ:",
    readingQ2: "ಪ್ರಶ್ನೆ 2. ಚಿತ್ರಕ್ಕೆ ಹೊಂದಿಕೆಯಾಗುವ ಪದವನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ:",
    optionsR1: { 'Apple': 'ಸೇಬು (Apple)', 'Banana': 'ಬಾಳೆಹಣ್ಣು (Banana)', 'Orange': 'ಕಿತ್ತಳೆ (Orange)', 'Grapes': 'ದ್ರಾಕ್ಷಿ (Grapes)' },
    optionsR2: { 'Book': 'ಪುಸ್ತಕ (Book)', 'Pencil': 'ಪೆನ್ಸಿಲ್ (Pencil)', 'Table': 'ಮೇಜು (Table)', 'Bag': 'ಬ್ಯಾಗ್ (Bag)' },
    writingHeader: "ವಿಭಾಗ 2: ಬರವಣಿಗೆ ✍️",
    writingQ: "ಕಾರ್ಯ: ಪುಸ್ತಕ ಅಥವಾ ನಿಮ್ಮ ನೆಚ್ಚಿನ ಆಹಾರದ ಬಗ್ಗೆ ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಒಂದು ಸರಳ ವಾಕ್ಯವನ್ನು ಬರೆಯಿರಿ.",
    writingHelp: "ಕನಿಷ್ಠ 3-5 ಪದಗಳನ್ನು ಬರೆಯಿರಿ. ಕ್ಯಾಪಿಟಲ್ ಅಕ್ಷರಗಳನ್ನು ಬಳಸಿ ಮತ್ತು ಕೊನೆಯಲ್ಲಿ ಚುಕ್ಕೆ (.) ಇರಿಸಿ.",
    placeholder: "ನಿಮ್ಮ ವಾಕ್यವನ್ನು ಇಲ್ಲಿ ಬರೆಯಿರಿ...",
    grammarHelp: "ವ್ಯಾಕರಣ ಸಹಾಯ",
    grammarCaps: "ಕ್ಯಾಪಿಟಲ್ ಅಕ್ಷರ",
    grammarPeriod: "ಚುಕ್ಕೆ (.) ಯೊಂದಿಗೆ ಕೊನೆಗೊಳ್ಳುತ್ತದೆ",
    grammarMinWords: "5+ ಪದಗಳು ಬೇಕು",
    wordCount: "ಪದಗಳ ಸಂಖ್ಯೆ",
    compHeader: "ವಿಭಾಗ 3: ಚಿತ್ರ ಗ್ರಹಿಕೆ 🧩",
    compSpeak: "ಕೇಳಿ 🔊",
    compQ1: "ಪ್ರಶ್ನೆ 1. ಆಟದ ಬ್ಲಾಕ್‌ಗಳ ಮೇಲೆ ನಿಮಗೆ ಯಾವ ಅಕ್ಷರಗಳು ಕಾಣಿಸುತ್ತಿವೆ?",
    compQ2: "ಪ್ರಶ್ನೆ 2. ಚಿತ್ರದಲ್ಲಿರುವ ವ್ಯಕ್ತಿ ಏನನ್ನು ಓದುತ್ತಿದ್ದಾನೆ?",
    optionsC1: { 'A B C': 'A B C', 'X Y Z': 'X Y Z', '1 2 3': '1 2 3', 'D O G': 'D O G' },
    optionsC2: { 'Newspaper': 'ಸುದ್ದಿಪತ್ರಿಕೆ (Newspaper)', 'Phone': 'ಫೋನ್ (Phone)', 'Letter': 'ಪತ್ರ (Letter)', 'Nothing': 'ಏನೂ ಇಲ್ಲ (Nothing)' }
  },
  bengali: {
    title: "প্রারম্ভিক মূল্যায়ন 🎯",
    subtitle: "আসুন আপনার পড়ার দক্ষতা দেখতে একটি ছোট খেলা খেলি!",
    reading: "পড়া",
    writing: "লেখা",
    comprehension: "বোধগম্যতা",
    next: "পরবর্তী ভাগ 🚀",
    submit: "জমা দিন 🎉",
    readingHeader: "ভাগ ১: চিত্র মিলকরণ 🍎",
    speakBtn: "শুনুন 🔊",
    readingQ1: "প্রশ্ন ১. ছবির সাথে মিল থাকা শব্দটি ক্লিক করুন:",
    readingQ2: "প্রশ্ন ২. ছবির সাথে মিল থাকা শব্দটি ক্লিক করুন:",
    optionsR1: { 'Apple': 'আপেল (Apple)', 'Banana': 'কলা (Banana)', 'Orange': 'কমলা (Orange)', 'Grapes': 'আঙুর (Grapes)' },
    optionsR2: { 'Book': 'বই (Book)', 'Pencil': 'পেন্সিল (Pencil)', 'Table': 'টেবিল (Table)', 'Bag': 'ব্যাগ (Bag)' },
    writingHeader: "ভাগ ২: লেখা ✍️",
    writingQ: "কার্য: বই বা আপনার প্রিয় খাবার সম্পর্কে ইংরেজিতে একটি সহজ বাক্য লিখুন।",
    writingHelp: "অনূ্যন ৩-৫ শব্দ লিখুন। বড় হাতের অক্ষর দিয়ে শুরু করুন এবং শেষে ফুলস্টপ (.) দিন।",
    placeholder: "আপনার বাক্যটি এখানে লিখুন...",
    grammarHelp: "ব্যাকরণ সাহায্য",
    grammarCaps: "বড় হাতের অক্ষর",
    grammarPeriod: "ফুলস্টপ (.) দিয়ে সমাপ্ত",
    grammarMinWords: "৫+ শব্দ প্রয়োজন",
    wordCount: "শব্দ সংখ্যা",
    compHeader: "ভাগ ৩: চিত্র বোধগম্যতা 🧩",
    compSpeak: "শুনুন 🔊",
    compQ1: "প্রশ্ন ১. খেলনা ব্লকে আপনি কোন অক্ষরগুলি দেখতে পাচ্ছেন?",
    compQ2: "প্রশ্ন ২. ছবির ব্যক্তিটি কী পড়ছেন?",
    optionsC1: { 'A B C': 'A B C', 'X Y Z': 'X Y Z', '1 2 3': '1 2 3', 'D O G': 'D O G' },
    optionsC2: { 'Newspaper': 'সংবাদপত্র (Newspaper)', 'Phone': 'ফোন (Phone)', 'Letter': 'চিঠি (Letter)', 'Nothing': 'কিছু না (Nothing)' }
  },
  marathi: {
    title: "प्रारंभिक मूल्यांकन 🎯",
    subtitle: "चला तुमचे वाचन कौशल्य पाहण्यासाठी एक छोटा खेळ खेळूया!",
    reading: "वाचन",
    writing: "लेखन",
    comprehension: "आकलन",
    next: "पुढील भाग 🚀",
    submit: "सबमिट करा 🎉",
    readingHeader: "भाग १: चित्र मिलन 🍎",
    speakBtn: "ऐका 🔊",
    readingQ1: "प्रश्न १. चित्राशी जुळणाऱ्या शब्दावर क्लिक करा:",
    readingQ2: "प्रश्न २. चित्राशी जुळणाऱ्या शब्दावर क्लिक करा:",
    optionsR1: { 'Apple': 'सफरचंद (Apple)', 'Banana': 'केळे (Banana)', 'Orange': 'संत्रे (Orange)', 'Grapes': 'द्राक्षे (Grapes)' },
    optionsR2: { 'Book': 'पुस्तक (Book)', 'Pencil': 'पेन्सिल (Pencil)', 'Table': 'टेबल (Table)', 'Bag': 'दप्तर (Bag)' },
    writingHeader: "भाग २: लेखन ✍️",
    writingQ: "कार्य: पुस्तक किंवा तुमच्या आवडत्या जेवणाबद्दल इंग्रजीत सोपे वाक्य लिहा.",
    writingHelp: "किमान ३-५ शब्द लिहा. कॅपिटल अक्षराने सुरुवात करा आणि शेवटी पूर्णविराम (.) द्या.",
    placeholder: "तुमचे वाक्य इथे लिहा...",
    grammarHelp: "व्याकरण मदत",
    grammarCaps: "कॅपिटल अक्षर",
    grammarPeriod: "पूर्णविराम (.) ने शेवट",
    grammarMinWords: "५+ शब्दांची आवश्यकता",
    wordCount: "शब्द संख्या",
    compHeader: "भाग ३: चित्र आकलन 🧩",
    compSpeak: "ऐका 🔊",
    compQ1: "प्रश्न १. खेळण्याच्या ठोकळ्यांवर तुम्हाला कोणती अक्षरे दिसत आहेत?",
    compQ2: "प्रश्न २. चित्रातील व्यक्ती काय वाचत आहे?",
    optionsC1: { 'A B C': 'A B C', 'X Y Z': 'X Y Z', '1 2 3': '1 2 3', 'D O G': 'D O G' },
    optionsC2: { 'Newspaper': 'वर्तमानपत्र (Newspaper)', 'Phone': 'फोन (Phone)', 'Letter': 'पत्र (Letter)', 'Nothing': 'काही नाही (Nothing)' }
  },
  gujarati: {
    title: "પ્રારંભિક મૂલ્યાંકન 🎯",
    subtitle: "ચાલો તમારી વાંચન કુશળતા જોવા માટે એક નાની રમત રમીએ!",
    reading: "વાંચન",
    writing: "લેખન",
    comprehension: "સમજણ",
    next: "આગળનો ભાગ 🚀",
    submit: "સબમિટ કરો 🎉",
    readingHeader: "વિભાગ ૧: ચિત્ર સરખામણી 🍎",
    speakBtn: "સાંભળો 🔊",
    readingQ1: "પ્રશ્ન ૧. ચિત્ર સાથે મેળ ખાતા શબ્દ પર ક્લિક કરો:",
    readingQ2: "પ્રશ્ન ૨. ચિત્ર સાથે મેળ ખાતા શબ્દ પર ક્લિક કરો:",
    optionsR1: { 'Apple': 'સફરજન (Apple)', 'Banana': 'કેળું (Banana)', 'Orange': 'સંતરું (Orange)', 'Grapes': 'દ્રાક્ષ (Grapes)' },
    optionsR2: { 'Book': 'પુસ્તક (Book)', 'Pencil': 'પેન્સિલ (Pencil)', 'Table': 'ટેબલ (Table)', 'Bag': 'દફતર (Bag)' },
    writingHeader: "વિભાગ ૨: લેખન ✍️",
    writingQ: "કાર્ય: પુસ્તક અથવા તમારા મનપસંદ ખોરાક વિશે અંગ્રેજીમાં સરળ વાક્ય લખો.",
    writingHelp: "ઓછામાં ઓછા ૩-૫ શબ્દો લખો. કેપિટલ અક્ષરથી શરૂ કરો અને અંતે પૂર્ણવિરામ (.) મૂકો.",
    placeholder: "તમારું વાક્ય અહીં લખો...",
    grammarHelp: "વ્યાકરણ મદદ",
    grammarCaps: "કેપિટલ અક્ષર",
    grammarPeriod: "પૂર્ણવિરામ (.) થી અંત",
    grammarMinWords: "૫+ શબ્દોની જરૂર છે",
    wordCount: "શબ્દ સંખ્યા",
    compHeader: "વિભાગ ૩: ચિત્ર સમજણ 🧩",
    compSpeak: "સાંભળો 🔊",
    compQ1: "પ્રશ્ન ૧. રમકડાના બ્લોક્સ પર તમને કયા અક્ષરો દેખায় છે?",
    compQ2: "પ્રશ્ન ૨. ચિત્રમાં વ્યક્તિ શું વાંચી રહી છે?",
    optionsC1: { 'A B C': 'A B C', 'X Y Z': 'X Y Z', '1 2 3': '1 2 3', 'D O G': 'D O G' },
    optionsC2: { 'Newspaper': 'સમાચાર પત્ર (Newspaper)', 'Phone': 'ફોન (Phone)', 'Letter': 'પત્ર (Letter)', 'Nothing': 'કંઈ નહીં (Nothing)' }
  },
  punjabi: {
    title: "ਸ਼ੁਰੂਆਤੀ ਮੁਲਾਂਕਣ 🎯",
    subtitle: "ਆਓ ਤੁਹਾਡੀ ਪੜ੍ਹਨ ਦੀ ਯੋਗਤਾ ਨੂੰ ਦੇਖਣ ਲਈ ਇੱਕ ਖੇਡ ਖੇਡੀਏ!",
    reading: "ਪੜ੍ਹਨਾ",
    writing: "ਲਿਖਣਾ",
    comprehension: "ਸਮਝ",
    next: "ਅਗਲਾ ਭਾਗ 🚀",
    submit: "ਸਮਰਪਿਤ ਕਰੋ 🎉",
    readingHeader: "ਭਾਗ 1: ਤਸਵੀਰ ਮਿਲਾਨ 🍎",
    speakBtn: "ਸੁਣੋ 🔊",
    readingQ1: "ਪ੍ਰਸ਼ਨ 1. ਉਸ ਸ਼ਬਦ 'ਤੇ ਕਲਿੱਕ ਕਰੋ ਜੋ ਤਸਵੀਰ ਨਾਲ ਮੇਲ ਖਾਂਦਾ ਹੈ:",
    readingQ2: "ਪ੍ਰਸ਼ਨ 2. ਉਸ ਸ਼ਬਦ 'ਤੇ ਕਲਿੱਕ ਕਰੋ ਜੋ ਤਸਵੀਰ ਨਾਲ ਮੇਲ ਖਾਂਦਾ ਹੈ:",
    optionsR1: { 'Apple': 'ਸੇਬ (Apple)', 'Banana': 'ਕੇਲਾ (Banana)', 'Orange': 'ਸੰਤਰਾ (Orange)', 'Grapes': 'ਅੰਗੂਰ (Grapes)' },
    optionsR2: { 'Book': 'ਕਿਤਾਬ (Book)', 'Pencil': 'ਪੈਨਸਿਲ (Pencil)', 'Table': 'ਮੇਜ਼ (Table)', 'Bag': 'ਬੈਗ (Bag)' },
    writingHeader: "ਭਾਗ 2: ਲਿਖਣਾ ✍️",
    writingQ: "ਕਾਰਜ: ਕਿਤਾਬ ਜਾਂ ਆਪਣੀ ਮਨਪਸੰਦ ਖੁਰਾਕ ਬਾਰੇ ਅੰਗਰੇਜ਼ੀ ਵਿੱਚ ਇੱਕ ਸਰਲ ਵਾਕ ਲਿਖੋ।",
    writingHelp: "ਘੱਟੋ-ਘੱਟ 3-5 ਸ਼ਬਦ ਲਿਖੋ। ਕੈਪੀਟਲ ਅੱਖਰ ਨਾਲ ਸੁਰੂ ਕਰੋ ਅਤੇ ਅੰਤ ਵਿੱਚ ਬਿੰਦੀ (.) ਲਗਾਓ।",
    placeholder: "ਆਪਣਾ ਵਾਕ ਇੱਥੇ ਲਿਖੋ...",
    grammarHelp: "ਵਿਆਕਰਨ ਸਹਾਇਤਾ",
    grammarCaps: "ਕੈਪੀਟਲ ਅੱਖਰ",
    grammarPeriod: "ਬਿੰਦੀ (.) ਨਾਲ ਖ਼ਤਮ",
    grammarMinWords: "5+ ਸ਼ਬਦਾਂ ਦੀ ਲੋੜ",
    wordCount: "ਸ਼ਬਦਾਂ ਦੀ ਗਿਣਤੀ",
    compHeader: "ਭਾਗ 3: ਤਸਵੀਰ ਸਮਝ 🧩",
    compSpeak: "ਸੁਣੋ 🔊",
    compQ1: "ਪ੍ਰਸ਼ਨ 1. ਤੁਹਾਨੂੰ ਖਿਡੌਣੇ ਦੇ ਬਲਾਕਾਂ 'ਤੇ ਕਿਹੜੇ ਅੱਖਰ ਦਿਖਾਈ ਦੇ ਰਹੇ ਹਨ?",
    compQ2: "ਪ੍ਰਸ਼ਨ 2. ਤਸਵੀਰ ਵਿੱਚ ਵਿਅਕਤੀ ਕੀ ਪੜ੍ਹ ਰਿਹਾ ਹੈ?",
    optionsC1: { 'A B C': 'A B C', 'X Y Z': 'X Y Z', '1 2 3': '1 2 3', 'D O G': 'D O G' },
    optionsC2: { 'Newspaper': 'ਅਖ਼ਬਾਰ (Newspaper)', 'Phone': 'ਫ਼ੋਨ (Phone)', 'Letter': 'ਪੱਤਰ (Letter)', 'Nothing': 'ਕੁਝ ਨਹੀਂ (Nothing)' }
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

  const urlParams = new URLSearchParams(window.location.search);
  const isLevelTest = urlParams.get('levelTest') === 'true';

  const getMappedLevel = (lvl: string | null | undefined): 'Beginner' | 'Intermediate' | 'Advanced' => {
    if (!lvl) return 'Beginner';
    const lower = lvl.toLowerCase();
    if (lower === 'advanced' || lower === 'master' || lower === 'expert') return 'Advanced';
    if (lower === 'intermediate' || lower === 'explorer' || lower === 'achiever') return 'Intermediate';
    return 'Beginner';
  };

  const getStartingLevel = (): 'Beginner' | 'Intermediate' | 'Advanced' => {
    const urlLvl = urlParams.get('level');
    if (urlLvl) return getMappedLevel(urlLvl);
    
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return getMappedLevel(user.profile?.readingLevel);
  };

  const testLevel = getStartingLevel();

  const questionsConfig = {
    Beginner: {
      title: "Beginner Graduation Test 🎓",
      subtitle: "Let's check if you are ready to graduate to Level 2!",
      readingHeader: "Section 1: Image Match 🍎",
      readingQ1: "Q1. Click the word that matches the fruit picture:",
      readQ1Img: "/vocab_apple.png",
      readQ1Opts: ['Apple', 'Banana', 'Orange', 'Grapes'],
      readQ1Correct: 'Apple',
      
      readingQ2: "Q2. Click the word that matches the study tool picture:",
      readQ2Img: "/vocab_book.png",
      readQ2Opts: ['Book', 'Pencil', 'Table', 'Bag'],
      readQ2Correct: 'Book',
      
      writingHeader: "Section 2: Write a Word ✍️",
      writingQ: "Task: Write a simple sentence containing the sight word 'cat' or 'dog' (e.g. 'I see a dog.')",
      writingHelp: "Write at least 3-5 words. Make sure to use capital letters and end with a period.",
      
      compHeader: "Section 3: Simple Comprehension 🧩",
      compQ1: "Q1. What letters are showing on the alphabet block card?",
      compQ1Img: "/level_alphabet_1783340004005.png",
      compQ1Opts: ['A B C', '1 2 3', 'Red Blue', 'Cat Dog'],
      compQ1Correct: 'A B C',
      
      compQ2: "Q2. Which fruit sticker is shown on this album card?",
      compQ2Img: "/vocab_banana.png",
      compQ2Opts: ['Banana', 'Apple', 'Tomato', 'Grapes'],
      compQ2Correct: 'Banana',
    },
    Intermediate: {
      title: "Intermediate Graduation Test 🎓",
      subtitle: "Let's check if you are ready to graduate to Level 3!",
      readingHeader: "Section 1: Sentence and Place Match 🏡",
      readingQ1: "Q1. Which grammar part does this sentence-tracing illustration represent?",
      readQ1Img: "/level_sentences_1783340032385.png",
      readQ1Opts: ['Letters', 'Sentences', 'Newspaper', 'Dialogue'],
      readQ1Correct: 'Sentences',
      
      readingQ2: "Q2. Which public place sticker is showing on this card?",
      readQ2Img: "/vocab_hospital.png",
      readQ2Opts: ['Hospital', 'School', 'Market', 'Library'],
      readQ2Correct: 'Hospital',
      
      writingHeader: "Section 2: Write a Description ✍️",
      writingQ: "Task: Write a 5-word sentence describing your classroom or local town (e.g. 'My school is very big.')",
      writingHelp: "Write at least 5 words. Make sure to use capital letters and end with a period.",
      
      compHeader: "Section 3: Text & Category Match 🧩",
      compQ1: "Q1. What does this group of alphabet blocks represent?",
      compQ1Img: "/level_words_1783340019724.png",
      compQ1Opts: ['Letters', 'Words', 'Stories', 'Grammar'],
      compQ1Correct: 'Words',
      
      compQ2: "Q2. What type of children's book illustration is shown here?",
      compQ2Img: "/level_stories_1783340046772.png",
      compQ2Opts: ['Storybook', 'Newspaper', 'Calculator', 'Notebook'],
      compQ2Correct: 'Storybook',
    },
    Advanced: {
      title: "Advanced Graduation Test 🎓",
      subtitle: "Test your skills to achieve your graduation crown!",
      readingHeader: "Section 1: Media and Mastery Match 🏆",
      readingQ1: "Q1. Which reading medium does this global ecosystem illustration represent?",
      readQ1Img: "/level_newspaper_1783340060913.png",
      readQ1Opts: ['Newspaper', 'Picture Book', 'Sticker Board', 'Grammar Book'],
      readQ1Correct: 'Newspaper',
      
      readingQ2: "Q2. Which certificate stamp represents complete course mastery?",
      readQ2Img: "/level_mastery_1783340074714.png",
      readQ2Opts: ['Alphabet', 'Words', 'Sentences', 'Mastery'],
      readQ2Correct: 'Mastery',
      
      writingHeader: "Section 2: Describe Goals ✍️",
      writingQ: "Task: Write a full descriptive paragraph detailing your future learning goals (at least 8-10 words).",
      writingHelp: "Write at least 8-10 words. Make sure to use capital letters and end with a period.",
      
      compHeader: "Section 3: Sector & Story Match 🧩",
      compQ1: "Q1. Which department sector does this hospital clinic represent?",
      compQ1Img: "/vocab_hospital.png",
      compQ1Opts: ['Healthcare', 'Education', 'Shopping', 'Farming'],
      compQ1Correct: 'Healthcare',
      
      compQ2: "Q2. What category does this fable story illustration belong to?",
      compQ2Img: "/level_stories_1783340046772.png",
      compQ2Opts: ['Grammar Rules', 'Moral Story', 'Dialogue Drill', 'Sight Words'],
      compQ2Correct: 'Moral Story',
    }
  };

  const activeConfig = questionsConfig[testLevel as 'Beginner' | 'Intermediate' | 'Advanced'] || questionsConfig.Beginner;

  // Step 1: Reading state
  const [readingAns1, setReadingAns1] = useState('');
  const [readingAns2, setReadingAns2] = useState('');
  
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
      if (!readingAns1 || !readingAns2) {
        alert('Please select the answers for both pictures to continue! ⭐');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (wordsCount < 2) {
        alert('Please write down your sentence in the box! ✍️');
        return;
      }
      setStep(3);
    }
  };

  const handleSubmit = () => {
    if (!compAns1 || !compAns2) {
      alert('Please select the answers for both picture clues! 🧩');
      return;
    }

    // Calculate score
    let readingScore = 0;
    if (readingAns1 === activeConfig.readQ1Correct) readingScore += 50;
    if (readingAns2 === activeConfig.readQ2Correct) readingScore += 50;
    
    let writingScore = 0;
    if (hasMinWords) writingScore += 40;
    else if (wordsCount >= 3) writingScore += 25;
    else if (wordsCount >= 1) writingScore += 10;
    if (startsWithCapital) writingScore += 30;
    if (endsWithPeriod) writingScore += 30;

    let compScore = 0;
    if (compAns1 === activeConfig.compQ1Correct) compScore += 50;
    if (compAns2 === activeConfig.compQ2Correct) compScore += 50;

    const overallScore = Math.round((readingScore + writingScore + compScore) / 3);

    // Check if this is a Level Graduation Test
    const urlParams = new URLSearchParams(window.location.search);
    const isLevelTest = urlParams.get('levelTest') === 'true';
    const testLevel = getStartingLevel();

    if (isLevelTest) {
      const isPass = overallScore >= 70;
      if (isPass) {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user.profile) {
          let nextLevel = 2;
          if (testLevel === 'Intermediate') {
            nextLevel = 3;
          } else if (testLevel === 'Advanced') {
            nextLevel = 3;
          }
          
          user.profile.level = nextLevel;
          user.profile.xp = (user.profile.xp || 0) + 100; // Level promotion bonus!
          user.profile.coins = (user.profile.coins || 0) + 30;
          
          const levels = ['Beginner', 'Intermediate', 'Advanced'];
          user.profile.readingLevel = levels[nextLevel - 1] || 'Beginner';
          
          localStorage.setItem('user', JSON.stringify(user));
          
          const username = localStorage.getItem('username') || 'guest';
          
          // Save to server database
          try {
            apiClient.saveProfile(username, user.profile);
          } catch (e) {
            console.error('Failed to sync profile to server:', e);
          }

          const profiles = JSON.parse(localStorage.getItem('profiles') || '[]');
          const idx = profiles.findIndex((p: any) => p.username === username);
          if (idx !== -1) {
            profiles[idx] = { ...profiles[idx], ...user.profile };
            localStorage.setItem('profiles', JSON.stringify(profiles));
          }
        }
        alert(`🎉 Congratulations!\n\nYou passed the ${testLevel} Graduation Test with ${overallScore}%!\n\n🏆 You earned +100 XP & +30 Coins and unlocked the next level stages!`);
      } else {
        alert(`💪 Good try!\n\nYou scored ${overallScore}% on the ${testLevel} test.\n\nKeep practicing the stages and try again!`);
      }
      navigate('/dashboard');
      return;
    }

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
    <div className="min-h-screen bg-slate-50 py-12 px-6 flex flex-col items-center justify-center font-inter relative">
      {/* Decorative background balloons */}
      <span className="absolute top-10 left-10 text-6xl opacity-15 pointer-events-none animate-float select-none">🎈</span>
      <span className="absolute bottom-10 right-10 text-6xl opacity-15 pointer-events-none animate-float select-none">🧸</span>

      <div className="max-w-3xl w-full bg-white border-4 border-slate-100 p-8 md:p-10 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.02)] space-y-8 relative z-10">
        
        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-3.5xl font-black text-slate-900 tracking-tight leading-none">{t.title}</h1>
          <p className="text-slate-500 font-extrabold text-sm">{t.subtitle}</p>
        </div>

        {/* Playful progress board */}
        <div className="space-y-3 bg-slate-50 border-2 border-slate-100 p-4 rounded-3xl">
          <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">
            <span className={step >= 1 ? 'text-indigo-650' : ''}>🎯 {t.reading}</span>
            <span className={step >= 2 ? 'text-indigo-650' : ''}>✍️ {t.writing}</span>
            <span className={step >= 3 ? 'text-indigo-650' : ''}>🧩 {t.comprehension}</span>
          </div>
          <div className="grid grid-cols-3 gap-2.5 h-3.5">
            <div className={`rounded-full transition-all duration-300 border-b-2 ${step >= 1 ? 'bg-gradient-to-r from-blue-500 to-indigo-500 border-indigo-600' : 'bg-slate-200 border-slate-300'}`} />
            <div className={`rounded-full transition-all duration-300 border-b-2 ${step >= 2 ? 'bg-gradient-to-r from-blue-500 to-indigo-500 border-indigo-600' : 'bg-slate-200 border-slate-300'}`} />
            <div className={`rounded-full transition-all duration-300 border-b-2 ${step >= 3 ? 'bg-gradient-to-r from-blue-500 to-indigo-500 border-indigo-600' : 'bg-slate-200 border-slate-300'}`} />
          </div>
        </div>

        {/* Wizard Steps */}
        {step === 1 && (
          <div className="space-y-8">
            <div className="flex items-center justify-between border-b-2 border-slate-100 pb-3.5">
              <h2 className="text-base font-black text-slate-850 flex items-center gap-1.5">
                <span>{isLevelTest ? activeConfig.readingHeader : t.readingHeader}</span>
              </h2>
              <button
                onClick={() => handleSpeak("Look at the pictures and tap the word that matches the picture.")}
                className="bg-slate-50 hover:bg-slate-100 border-2 border-b-4 border-slate-200 text-slate-600 px-4 py-2 rounded-2xl text-xs font-black flex items-center gap-1.5 cursor-pointer active:border-b-0 active:mt-1 hover-pop"
              >
                <Volume2 className="w-4 h-4 text-indigo-500" />
                <span>{t.speakBtn}</span>
              </button>
            </div>

            {/* Q1 */}
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-6 items-center bg-slate-50/50 p-5 rounded-[32px] border-4 border-slate-100">
                <div className="w-28 h-28 rounded-3xl bg-white border-2 border-slate-100 flex items-center justify-center shrink-0 shadow-sm rotate-[-3deg]">
                  <img src={activeConfig.readQ1Img} alt="Question 1 Image" className="object-contain w-20 h-20" />
                </div>
                <div className="space-y-3.5 w-full">
                  <label className="block font-black text-slate-800 text-sm pl-1">{isLevelTest ? activeConfig.readingQ1 : t.readingQ1}</label>
                  <div className="grid grid-cols-2 gap-3">
                    {activeConfig.readQ1Opts.map((opt) => {
                      const isSelected = readingAns1 === opt;
                      return (
                        <label
                          key={opt}
                          className={`p-3.5 rounded-2xl border-2 border-b-6 flex items-center justify-between cursor-pointer transition-all active:border-b-0 active:mt-1 hover-pop ${
                            isSelected
                              ? 'border-indigo-600 bg-indigo-50/20 text-indigo-900 font-black ring-4 ring-indigo-500/5'
                              : 'border-slate-200 text-slate-700 bg-white hover:border-slate-300'
                          }`}
                        >
                          <span className="text-xs font-extrabold">{opt}</span>
                          <input
                            type="radio"
                            name="readingQ1"
                            value={opt}
                            checked={isSelected}
                            onChange={() => setReadingAns1(opt)}
                            className="w-4 h-4 text-indigo-600 border-slate-300"
                          />
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Q2 */}
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-6 items-center bg-slate-50/50 p-5 rounded-[32px] border-4 border-slate-100">
                <div className="w-28 h-28 rounded-3xl bg-white border-2 border-slate-100 flex items-center justify-center shrink-0 shadow-sm rotate-[3deg]">
                  <img src={activeConfig.readQ2Img} alt="Question 2 Image" className="object-contain w-20 h-20" />
                </div>
                <div className="space-y-3.5 w-full">
                  <label className="block font-black text-slate-800 text-sm pl-1">{isLevelTest ? activeConfig.readingQ2 : t.readingQ2}</label>
                  <div className="grid grid-cols-2 gap-3">
                    {activeConfig.readQ2Opts.map((opt) => {
                      const isSelected = readingAns2 === opt;
                      return (
                        <label
                          key={opt}
                          className={`p-3.5 rounded-2xl border-2 border-b-6 flex items-center justify-between cursor-pointer transition-all active:border-b-0 active:mt-1 hover-pop ${
                            isSelected
                              ? 'border-indigo-600 bg-indigo-50/20 text-indigo-900 font-black ring-4 ring-indigo-500/5'
                              : 'border-slate-200 text-slate-700 bg-white hover:border-slate-300'
                          }`}
                        >
                          <span className="text-xs font-extrabold">{opt}</span>
                          <input
                            type="radio"
                            name="readingQ2"
                            value={opt}
                            checked={isSelected}
                            onChange={() => setReadingAns2(opt)}
                            className="w-4 h-4 text-indigo-600 border-slate-300"
                          />
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={handleNextStep}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-blue-500 border-b-4 border-indigo-750 text-white font-black text-xs px-8 py-3.5 rounded-2xl shadow-md active:border-b-0 active:mt-1 transition-all cursor-pointer hover-pop"
              >
                <span>{t.next}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b-2 border-slate-100 pb-3.5">
              <h2 className="text-base font-black text-slate-850 flex items-center gap-1.5">
                <span>{t.writingHeader}</span>
              </h2>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-center bg-slate-50/50 p-5 rounded-[32px] border-4 border-slate-100">
              <div className="w-24 h-24 rounded-3xl bg-white border-2 border-slate-100 flex items-center justify-center shrink-0 shadow-sm rotate-[-3deg]">
                <img src="/vocab_book.png" alt="Book Illustration" className="object-contain w-16 h-16" />
              </div>
              <div className="space-y-1.5 w-full">
                <label className="block font-black text-slate-800 text-sm leading-snug">{t.writingQ}</label>
                <p className="text-slate-400 text-[10px] font-extrabold leading-normal">{t.writingHelp}</p>
              </div>
            </div>

            <div className="relative">
              <textarea
                value={writingText}
                onChange={(e) => setWritingText(e.target.value)}
                className="w-full h-32 p-4 bg-white border-2 border-slate-200 rounded-3xl focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 text-slate-800 font-extrabold text-base placeholder:text-slate-400/80"
                placeholder={t.placeholder}
              />
              <div className="absolute right-4 bottom-4 bg-white/80 backdrop-blur border border-slate-100 px-3.5 py-1 rounded-full text-[10px] font-black text-slate-550">
                {t.wordCount}: {wordsCount}
              </div>
            </div>

            {/* Grammar Hints */}
            <div className="bg-slate-50/50 p-5 rounded-[28px] border-2 border-slate-200/50 space-y-3">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">{t.grammarHelp}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="flex items-center gap-2">
                  {startsWithCapital ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-amber-500/80 shrink-0" />
                  )}
                  <span className={`text-xs font-extrabold ${startsWithCapital ? 'text-slate-700' : 'text-slate-400'}`}>{t.grammarCaps}</span>
                </div>
                <div className="flex items-center gap-2">
                  {endsWithPeriod ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-amber-500/80 shrink-0" />
                  )}
                  <span className={`text-xs font-extrabold ${endsWithPeriod ? 'text-slate-700' : 'text-slate-400'}`}>{t.grammarPeriod}</span>
                </div>
                <div className="flex items-center gap-2">
                  {hasMinWords ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-amber-500/80 shrink-0" />
                  )}
                  <span className={`text-xs font-extrabold ${hasMinWords ? 'text-slate-700' : 'text-slate-400'}`}>{t.grammarMinWords}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={handleNextStep}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-blue-500 border-b-4 border-indigo-750 text-white font-black text-xs px-8 py-3.5 rounded-2xl shadow-md active:border-b-0 active:mt-1 transition-all cursor-pointer hover-pop"
              >
                <span>{t.next}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8">
            <div className="flex items-center justify-between border-b-2 border-slate-100 pb-3.5">
              <h2 className="text-base font-black text-slate-850 flex items-center gap-1.5">
                <span>{isLevelTest ? activeConfig.compHeader : t.compHeader}</span>
              </h2>
              <button
                onClick={() => handleSpeak("Look at the pictures and tap the matching options.")}
                className="bg-slate-50 hover:bg-slate-100 border-2 border-b-4 border-slate-200 text-slate-600 px-4 py-2 rounded-2xl text-xs font-black flex items-center gap-1.5 cursor-pointer active:border-b-0 active:mt-1 hover-pop"
              >
                <Volume2 className="w-4 h-4 text-indigo-500" />
                <span>{t.compSpeak}</span>
              </button>
            </div>

            {/* Q1 */}
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-6 items-center bg-slate-50/50 p-5 rounded-[32px] border-4 border-slate-100">
                <div className="w-28 h-28 rounded-3xl bg-white border-2 border-slate-100 flex items-center justify-center shrink-0 shadow-sm rotate-[-3deg]">
                  <img src={activeConfig.compQ1Img} alt="Blocks" className="object-contain w-20 h-20" />
                </div>
                <div className="space-y-3 w-full">
                  <label className="block font-black text-slate-800 text-sm pl-1">{isLevelTest ? activeConfig.compQ1 : t.compQ1}</label>
                  <div className="grid grid-cols-2 gap-3">
                    {activeConfig.compQ1Opts.map((opt) => {
                      const isSelected = compAns1 === opt;
                      return (
                        <label
                          key={opt}
                          className={`p-3.5 rounded-2xl border-2 border-b-6 flex items-center justify-between cursor-pointer transition-all active:border-b-0 active:mt-1 hover-pop ${
                            isSelected
                              ? 'border-indigo-600 bg-indigo-50/20 text-indigo-900 font-black ring-4 ring-indigo-500/5'
                              : 'border-slate-200 text-slate-700 bg-white hover:border-slate-300'
                          }`}
                        >
                          <span className="text-xs font-extrabold">{opt}</span>
                          <input
                            type="radio"
                            name="compAns1"
                            value={opt}
                            checked={isSelected}
                            onChange={() => setCompAns1(opt)}
                            className="w-4 h-4 text-indigo-600"
                          />
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Q2 */}
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-6 items-center bg-slate-50/50 p-5 rounded-[32px] border-4 border-slate-100">
                <div className="w-28 h-28 rounded-3xl bg-white border-2 border-slate-100 flex items-center justify-center shrink-0 shadow-sm rotate-[3deg]">
                  <img src={activeConfig.compQ2Img} alt="Newspaper" className="object-contain w-20 h-20" />
                </div>
                <div className="space-y-3 w-full">
                  <label className="block font-black text-slate-800 text-sm pl-1">{isLevelTest ? activeConfig.compQ2 : t.compQ2}</label>
                  <div className="grid grid-cols-2 gap-3">
                    {activeConfig.compQ2Opts.map((opt) => {
                      const isSelected = compAns2 === opt;
                      return (
                        <label
                          key={opt}
                          className={`p-3.5 rounded-2xl border-2 border-b-6 flex items-center justify-between cursor-pointer transition-all active:border-b-0 active:mt-1 hover-pop ${
                            isSelected
                              ? 'border-indigo-600 bg-indigo-50/20 text-indigo-900 font-black ring-4 ring-indigo-500/5'
                              : 'border-slate-200 text-slate-700 bg-white hover:border-slate-300'
                          }`}
                        >
                          <span className="text-xs font-extrabold">{opt}</span>
                          <input
                            type="radio"
                            name="compAns2"
                            value={opt}
                            checked={isSelected}
                            onChange={() => setCompAns2(opt)}
                            className="w-4 h-4 text-indigo-600"
                          />
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={handleSubmit}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-500 border-b-4 border-green-700 text-white font-black text-xs px-8 py-3.5 rounded-2xl shadow-md active:border-b-0 active:mt-1 transition-all cursor-pointer hover-pop"
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
