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
    readingHeader: "Section 1: Image Reading",
    speakBtn: "Listen",
    readingQ1: "Q1. Click the word that matches the picture:",
    readingQ2: "Q2. Click the word that matches the picture:",
    optionsR1: { 'Apple': 'Apple', 'Banana': 'Banana', 'Orange': 'Orange', 'Grapes': 'Grapes' },
    optionsR2: { 'Book': 'Book', 'Pencil': 'Pencil', 'Table': 'Table', 'Bag': 'Bag' },
    writingHeader: "Section 2: Writing",
    writingQ: "Task: Write a simple sentence in English about what you see in the book or your favorite food.",
    writingHelp: "Write at least 3-5 words. Make sure to use capital letters and end with a period.",
    placeholder: "Type your sentence here...",
    grammarHelp: "Grammar Help Desk",
    grammarCaps: "Capital Letter",
    grammarPeriod: "Ends with Period (.)",
    grammarMinWords: "5+ Words Required",
    wordCount: "Word Count",
    compHeader: "Section 3: Picture Comprehension",
    compSpeak: "Listen Qs",
    compQ1: "Q1. What letters do you see on the toy blocks?",
    compQ2: "Q2. What is the person in the picture reading?",
    optionsC1: { 'A B C': 'A B C', 'X Y Z': 'X Y Z', '1 2 3': '1 2 3', 'D O G': 'D O G' },
    optionsC2: { 'Newspaper': 'Newspaper', 'Phone': 'Phone', 'Letter': 'Letter', 'Nothing': 'Nothing' }
  },
  hindi: {
    title: "प्रारंभिक मूल्यांकन",
    subtitle: "चलो आपके वर्तमान कौशल स्तरों का पता लगाएं।",
    reading: "पठन (Reading)",
    writing: "लेखन (Writing)",
    comprehension: "समझ (Comprehension)",
    next: "अगला भाग",
    submit: "मूल्यांकन जमा करें",
    readingHeader: "भाग १: चित्र पठन (Image Reading)",
    speakBtn: "सुनें (Listen)",
    readingQ1: "प्रश्न १. उस शब्द पर क्लिक करें जो चित्र से मेल खाता है:",
    readingQ2: "प्रश्न २. उस शब्द पर क्लिक करें जो चित्र से मेल खाता है:",
    optionsR1: { 'Apple': 'सेब (Apple)', 'Banana': 'केला (Banana)', 'Orange': 'संतरा (Orange)', 'Grapes': 'अंगूर (Grapes)' },
    optionsR2: { 'Book': 'किताब (Book)', 'Pencil': 'पेंसिल (Pencil)', 'Table': 'मेज (Table)', 'Bag': 'बस्ता (Bag)' },
    writingHeader: "भाग २: लेखन (Writing)",
    writingQ: "कार्य: किताब या अपने पसंदीदा भोजन के बारे में अंग्रेजी में एक सरल वाक्य लिखें।",
    writingHelp: "कम से कम ३-५ शब्द लिखें। बड़े अक्षरों (Capital letters) का प्रयोग करें और अंत में पूर्ण विराम (.) लगाएं।",
    placeholder: "अपना वाक्य यहाँ लिखें...",
    grammarHelp: "व्याकरण सहायता डेस्क",
    grammarCaps: "बड़ा अक्षर (Capital Letter)",
    grammarPeriod: "पूर्ण विराम (.) पर समाप्त",
    grammarMinWords: "५+ शब्दों की आवश्यकता",
    wordCount: "शब्दों की संख्या",
    compHeader: "भाग ३: चित्र समझ (Picture Comprehension)",
    compSpeak: "सुनें (Listen)",
    compQ1: "प्रश्न १. आपको खिलौने के ब्लॉक पर कौन से अक्षर दिखाई दे रहे हैं?",
    compQ2: "प्रश्न २. चित्र में व्यक्ति क्या पढ़ रहा है?",
    optionsC1: { 'A B C': 'A B C', 'X Y Z': 'X Y Z', '1 2 3': '1 2 3', 'D O G': 'D O G' },
    optionsC2: { 'Newspaper': 'समाचार पत्र (Newspaper)', 'Phone': 'फ़ोन (Phone)', 'Letter': 'पत्र (Letter)', 'Nothing': 'कुछ नहीं (Nothing)' }
  },
  telugu: {
    title: "ప్రారంభ అంచనా",
    subtitle: "మీ ప్రస్తుత నైపుణ్య స్థాయిలను తెలుసుకుందాం.",
    reading: "చదవడం (Reading)",
    writing: "రాయడం (Writing)",
    comprehension: "అవగాహన (Comprehension)",
    next: "తదుపరి విభాగం",
    submit: "సమర్పించండి",
    readingHeader: "విభాగం 1: చిత్ర పఠనం (Image Reading)",
    speakBtn: "వినండి",
    readingQ1: "ప్రశ్న 1. చిత్రానికి సరిపోయే పదాన్ని క్లిక్ చేయండి:",
    readingQ2: "ప్రశ్న 2. చిత్రానికి సరిపోయే పదాన్ని క్లిక్ చేయండి:",
    optionsR1: { 'Apple': 'యాపిల్ (Apple)', 'Banana': 'అరటిపండు (Banana)', 'Orange': 'నారింజ (Orange)', 'Grapes': 'ద్రాక్ష (Grapes)' },
    optionsR2: { 'Book': 'పుస్తకం (Book)', 'Pencil': 'పెన్సిల్ (Pencil)', 'Table': 'బల్ల (Table)', 'Bag': 'సంచి (Bag)' },
    writingHeader: "విభాగం 2: రాయడం (Writing)",
    writingQ: "టాస్క్: పుస్తకం లేదా మీకు ఇష్టమైన ఆహారం గురించి ఇంగ్లీష్ లో ఒక సాధారణ వాక్యం రాయండి.",
    writingHelp: "కనీసం 3-5 పదాలు రాయండి. క్యాపిటల్ లెటర్స్ వాడండి మరియు చివర ఫుల్ స్టాప్ (.) ఉంచండి.",
    placeholder: "మీ వాక్యం ఇక్కడ రాయండి...",
    grammarHelp: "వ్యాకరణ సహాయం",
    grammarCaps: "క్యాపిటల్ లెటర్",
    grammarPeriod: "ఫుల్ స్టాప్ (.) తో ముగుస్తుంది",
    grammarMinWords: "5+ పదాలు ఉండాలి",
    wordCount: "పదాల సంఖ్య",
    compHeader: "విభాగం 3: చిత్ర అవగాహన (Picture Comprehension)",
    compSpeak: "వినండి",
    compQ1: "ప్రశ్న 1. బొమ్మ బ్లాకులపై మీకు ఏ అక్షరాలు కనిపిస్తున్నాయి?",
    compQ2: "ప్రశ్న 2. చిత్రంలో ఉన్న వ్యక్తి ఏమి చదువుతున్నాడు?",
    optionsC1: { 'A B C': 'A B C', 'X Y Z': 'X Y Z', '1 2 3': '1 2 3', 'D O G': 'D O G' },
    optionsC2: { 'Newspaper': 'వార్తాపత్రిక (Newspaper)', 'Phone': 'ఫోన్ (Phone)', 'Letter': 'లేఖ (Letter)', 'Nothing': 'ఏమీ లేదు (Nothing)' }
  },
  tamil: {
    title: "தொடக்க மதிப்பீடு",
    subtitle: "உங்கள் தற்போதைய திறன்களைக் கண்டறியலாம்.",
    reading: "வாசிப்பு (Reading)",
    writing: "எழுத்து (Writing)",
    comprehension: "புரிந்துகொள்ளுதல் (Comprehension)",
    next: "அடுத்த பகுதி",
    submit: "மதிப்பீட்டைச் சமர்ப்பி",
    readingHeader: "பகுதி 1: பட வாசிப்பு (Image Reading)",
    speakBtn: "கேளுங்கள்",
    readingQ1: "கேள்வி 1. படத்திற்குப் பொருந்தும் வார்த்தையைக் கிளிக் செய்க:",
    readingQ2: "கேள்வி 2. படத்திற்குப் பொருந்தும் வார்த்தையைக் கிளிக் செய்க:",
    optionsR1: { 'Apple': 'ஆப்பிள் (Apple)', 'Banana': 'வாழைப்பழம் (Banana)', 'Orange': 'ஆரஞ்சு (Orange)', 'Grapes': 'திராட்சை (Grapes)' },
    optionsR2: { 'Book': 'புத்தகம் (Book)', 'Pencil': 'பென்சில் (Pencil)', 'Table': 'மேஜை (Table)', 'Bag': 'பள்ளிப் பை (Bag)' },
    writingHeader: "பகுதி 2: எழுத்து (Writing)",
    writingQ: "பணி: புத்தகம் அல்லது உங்களுக்கு பிடித்த உணவு பற்றி ஆங்கிலத்தில் எளிய வாக்கியம் எழுதுங்கள்.",
    writingHelp: "குறைந்தது 3-5 வார்த்தைகள் எழுதவும். பெரிய எழுத்தில் (Capital) தொடங்கி, முற்றுப்புள்ளியுடன் (.) முடிக்கவும்.",
    placeholder: "வாக்கியத்தை இங்கே தட்டச்சு செய்யவும்...",
    grammarHelp: "இலக்கண உதவி",
    grammarCaps: "பெரிய எழுத்து (Capital)",
    grammarPeriod: "முற்றுப்புள்ளி (.) உடன் முடியும்",
    grammarMinWords: "5+ வார்த்தைகள் தேவை",
    wordCount: "வார்த்தை எண்ணிக்கை",
    compHeader: "பகுதி 3: படப் புரிதல் (Picture Comprehension)",
    compSpeak: "கேளுங்கள்",
    compQ1: "கேள்வி 1. பொம்மை கட்டைகளில் என்ன எழுத்துக்களைக் காண்கிறீர்கள்?",
    compQ2: "கேள்வி 2. படத்தில் உள்ள நபர் என்ன படிக்கிறார்?",
    optionsC1: { 'A B C': 'A B C', 'X Y Z': 'X Y Z', '1 2 3': '1 2 3', 'D O G': 'D O G' },
    optionsC2: { 'Newspaper': 'செய்தித்தாள் (Newspaper)', 'Phone': 'தொலைபேசி (Phone)', 'Letter': 'கடிதம் (Letter)', 'Nothing': 'ஒன்றுமில்லை (Nothing)' }
  },
  kannada: {
    title: "ಆರಂಭಿಕ ಮೌಲ್ಯಮಾಪನ",
    subtitle: "ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಕೌಶಲ್ಯ ಮಟ್ಟವನ್ನು ಕಂಡುಹಿಡಿಯೋಣ.",
    reading: "ಓದುವಿಕೆ (Reading)",
    writing: "ಬರವಣಿಗೆ (Writing)",
    comprehension: "ಗ್ರಹಿಕೆ (Comprehension)",
    next: "ಮುಂದಿನ ವಿಭಾಗ",
    submit: "ಮೌಲ್ಯಮಾಪನ ಸಲ್ಲಿಸಿ",
    readingHeader: "ವಿಭಾಗ 1: ಚಿತ್ರ ಓದುವಿಕೆ (Image Reading)",
    speakBtn: "ಕೇಳಿ (Listen)",
    readingQ1: "ಪ್ರಶ್ನೆ 1. ಚಿತ್ರಕ್ಕೆ ಹೊಂದಿಕೆಯಾಗುವ ಪದವನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ:",
    readingQ2: "ಪ್ರಶ್ನೆ 2. ಚಿತ್ರಕ್ಕೆ ಹೊಂದಿಕೆಯಾಗುವ ಪದವನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ:",
    optionsR1: { 'Apple': 'ಸೇಬು (Apple)', 'Banana': 'ಬಾಳೆಹಣ್ಣು (Banana)', 'Orange': 'ಕಿತ್ತಳೆ (Orange)', 'Grapes': 'ದ್ರಾಕ್ಷಿ (Grapes)' },
    optionsR2: { 'Book': 'ಪುಸ್ತಕ (Book)', 'Pencil': 'ಪೆನ್ಸಿಲ್ (Pencil)', 'Table': 'ಮೇಜು (Table)', 'Bag': 'ಬ್ಯಾಗ್ (Bag)' },
    writingHeader: "ವಿಭಾಗ 2: ಬರವಣಿಗೆ (Writing)",
    writingQ: "ಕಾರ್ಯ: ಪುಸ್ತಕ ಅಥವಾ ನಿಮ್ಮ ನೆಚ್ಚಿನ ಆಹಾರದ ಬಗ್ಗೆ ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಒಂದು ಸರಳ ವಾಕ್ಯವನ್ನು ಬರೆಯಿರಿ.",
    writingHelp: "ಕನಿಷ್ಠ 3-5 ಪದಗಳನ್ನು ಬರೆಯಿರಿ. ಕ್ಯಾಪಿಟಲ್ ಅಕ್ಷರಗಳನ್ನು ಬಳಸಿ ಮತ್ತು ಕೊನೆಯಲ್ಲಿ ಚುಕ್ಕೆ (.) ಇರಿಸಿ.",
    placeholder: "ನಿಮ್ಮ ವಾಕ್ಯವನ್ನು ಇಲ್ಲಿ ಬರೆಯಿರಿ...",
    grammarHelp: "ವ್ಯಾಕರಣ ಸಹಾಯ",
    grammarCaps: "ಕ್ಯಾಪಿಟಲ್ ಅಕ್ಷರ",
    grammarPeriod: "ಚುಕ್ಕೆ (.) ಯೊಂದಿಗೆ ಕೊನೆಗೊಳ್ಳುತ್ತದೆ",
    grammarMinWords: "5+ ಪದಗಳು ಬೇಕು",
    wordCount: "ಪದಗಳ ಸಂಖ್ಯೆ",
    compHeader: "ವಿಭಾಗ 3: ಚಿತ್ರ ಗ್ರಹಿಕೆ (Picture Comprehension)",
    compSpeak: "ಕೇಳಿ",
    compQ1: "ಪ್ರಶ್ನೆ 1. ಆಟದ ಬ್ಲಾಕ್‌ಗಳ ಮೇಲೆ ನಿಮಗೆ ಯಾವ ಅಕ್ಷರಗಳು ಕಾಣಿಸುತ್ತಿವೆ?",
    compQ2: "ಪ್ರಶ್ನೆ 2. ಚಿತ್ರದಲ್ಲಿರುವ ವ್ಯಕ್ತಿ ಏನನ್ನು ಓದುತ್ತಿದ್ದಾನೆ?",
    optionsC1: { 'A B C': 'A B C', 'X Y Z': 'X Y Z', '1 2 3': '1 2 3', 'D O G': 'D O G' },
    optionsC2: { 'Newspaper': 'ಸುದ್ದಿಪತ್ರಿಕೆ (Newspaper)', 'Phone': 'ಫೋನ್ (Phone)', 'Letter': 'ಪತ್ರ (Letter)', 'Nothing': 'ಏನೂ ಇಲ್ಲ (Nothing)' }
  },
  bengali: {
    title: "প্রারম্ভিক মূল্যায়ন",
    subtitle: "আসুন আপনার বর্তমান দক্ষতার স্তর নির্ধারণ করি।",
    reading: "পড়া",
    writing: "লেখা",
    comprehension: "বোধগম্যতা",
    next: "পরবর্তী ভাগ",
    submit: "मूल्यांकन জমা দিন",
    readingHeader: "ভাগ ১: চিত্র পঠন (Image Reading)",
    speakBtn: "শুনুন",
    readingQ1: "প্রশ্ন ১. ছবির সাথে মিল থাকা শব্দটি ক্লিক করুন:",
    readingQ2: "প্রশ্ন ২. ছবির সাথে মিল থাকা শব্দটি ক্লিক করুন:",
    optionsR1: { 'Apple': 'আপেল (Apple)', 'Banana': 'কলা (Banana)', 'Orange': 'কমলা (Orange)', 'Grapes': 'আঙুর (Grapes)' },
    optionsR2: { 'Book': 'বই (Book)', 'Pencil': 'পেন্সিল (Pencil)', 'Table': 'টেবিল (Table)', 'Bag': 'ব্যাগ (Bag)' },
    writingHeader: "ভাগ ২: লেখা (Writing)",
    writingQ: "কার্য: বই বা আপনার প্রিয় খাবার সম্পর্কে ইংরেজিতে একটি সহজ বাক্য লিখুন।",
    writingHelp: "অনূ্যন ৩-৫ শব্দ লিখুন। বড় হাতের অক্ষর দিয়ে শুরু করুন এবং শেষে ফুলস্টপ (.) দিন।",
    placeholder: "আপনার বাক্যটি এখানে লিখুন...",
    grammarHelp: "ব্যাকরণ সাহায্য",
    grammarCaps: "বড় হাতের অক্ষর",
    grammarPeriod: "ফুলস্টপ (.) দিয়ে সমাপ্ত",
    grammarMinWords: "৫+ শব্দ প্রয়োজন",
    wordCount: "শব্দ সংখ্যা",
    compHeader: "ভাগ ৩: চিত্র বোধগম্যতা (Picture Comprehension)",
    compSpeak: "শুনুন",
    compQ1: "প্রশ্ন ১. খেলনা ব্লকে আপনি কোন অক্ষরগুলি দেখতে পাচ্ছেন?",
    compQ2: "প্রশ্ন ২. ছবির ব্যক্তিটি কী পড়ছেন?",
    optionsC1: { 'A B C': 'A B C', 'X Y Z': 'X Y Z', '1 2 3': '1 2 3', 'D O G': 'D O G' },
    optionsC2: { 'Newspaper': 'সংবাদপত্র (Newspaper)', 'Phone': 'ফোন (Phone)', 'Letter': 'চিঠি (Letter)', 'Nothing': 'কিছু না (Nothing)' }
  },
  marathi: {
    title: "प्रारंभिक मूल्यांकन",
    subtitle: "चला तुमच्या सध्याच्या कौशल्याची पातळी जाणून घेऊया.",
    reading: "वाचन",
    writing: "लेखन",
    comprehension: "आकलन",
    next: "पुढील भाग",
    submit: "मूल्यांकन सबमिट करा",
    readingHeader: "भाग १: चित्र वाचन (Image Reading)",
    speakBtn: "ऐका",
    readingQ1: "प्रश्न १. चित्राशी जुळणाऱ्या शब्दावर क्लिक करा:",
    readingQ2: "प्रश्न २. चित्राशी जुळणाऱ्या शब्दावर क्लिक करा:",
    optionsR1: { 'Apple': 'सफरचंद (Apple)', 'Banana': 'केळे (Banana)', 'Orange': 'संत्रे (Orange)', 'Grapes': 'द्राक्षे (Grapes)' },
    optionsR2: { 'Book': 'पुस्तक (Book)', 'Pencil': 'पेन्सिल (Pencil)', 'Table': 'टेबल (Table)', 'Bag': 'दप्तर (Bag)' },
    writingHeader: "भाग २: लेखन (Writing)",
    writingQ: "कार्य: पुस्तक किंवा तुमच्या आवडत्या जेवणाबद्दल इंग्रजीत सोपे वाक्य लिहा.",
    writingHelp: "किमान ३-५ शब्द लिहा. कॅपिटल अक्षराने सुरुवात करा आणि शेवटी पूर्णविराम (.) द्या.",
    placeholder: "तुमचे वाक्य इथे लिहा...",
    grammarHelp: "व्याकरण मदत",
    grammarCaps: "कॅपिटल अक्षर",
    grammarPeriod: "पूर्णविराम (.) ने शेवट",
    grammarMinWords: "५+ शब्दांची आवश्यकता",
    wordCount: "शब्द संख्या",
    compHeader: "भाग ३: चित्र आकलन (Picture Comprehension)",
    compSpeak: "ऐका",
    compQ1: "प्रश्न १. खेळण्याच्या ठोकळ्यांवर तुम्हाला कोणती अक्षरे दिसत आहेत?",
    compQ2: "प्रश्न २. चित्रातील व्यक्ती काय वाचत आहे?",
    optionsC1: { 'A B C': 'A B C', 'X Y Z': 'X Y Z', '1 2 3': '1 2 3', 'D O G': 'D O G' },
    optionsC2: { 'Newspaper': 'वर्तमानपत्र (Newspaper)', 'Phone': 'फोन (Phone)', 'Letter': 'पत्र (Letter)', 'Nothing': 'काही नाही (Nothing)' }
  },
  gujarati: {
    title: "પ્રારંભિક મૂલ્યાંકન",
    subtitle: "ચાલો તમારી વર્તમાન કૌશલ્ય સ્તરો શોધી કાઢીએ.",
    reading: "વાંચન",
    writing: "લેખન",
    comprehension: "સમજણ",
    next: "આગળનો ભાગ",
    submit: "મૂલ્યાંકન સબમિટ કરો",
    readingHeader: "વિભાગ ૧: ચિત્ર વાંચન (Image Reading)",
    speakBtn: "સાંભળો",
    readingQ1: "પ્રશ્ન ૧. ચિત્ર સાથે મેળ ખાતા શબ્દ પર ક્લિક કરો:",
    readingQ2: "પ્રશ્ન ૨. ચિત્ર સાથે મેળ ખાતા શબ્દ પર ક્લિક કરો:",
    optionsR1: { 'Apple': 'સફરજન (Apple)', 'Banana': 'કેળું (Banana)', 'Orange': 'સંતરું (Orange)', 'Grapes': 'દ્રાક્ષ (Grapes)' },
    optionsR2: { 'Book': 'પુસ્તક (Book)', 'Pencil': 'પેન્સિલ (Pencil)', 'Table': 'ટેબલ (Table)', 'Bag': 'દફતર (Bag)' },
    writingHeader: "વિભાગ ૨: લેખન (Writing)",
    writingQ: "કાર્ય: પુસ્તક અથવા તમારા મનપસંદ ખોરાક વિશે અંગ્રેજીમાં સરળ વાક્ય લખો.",
    writingHelp: "ઓછામાં ઓછા ૩-૫ શબ્દો લખો. કેપિટલ અક્ષરથી શરૂ કરો અને અંતે પૂર્ણવિરામ (.) મૂકો.",
    placeholder: "તમારું વાક્ય અહીં લખો...",
    grammarHelp: "વ્યાકરણ મદદ",
    grammarCaps: "કેપિટલ અક્ષર",
    grammarPeriod: "પૂર્ણવિરામ (.) થી અંત",
    grammarMinWords: "૫+ શબ્દોની જરૂર છે",
    wordCount: "શબ્દ સંખ્યા",
    compHeader: "વિભાગ ૩: ચિત્ર સમજણ (Picture Comprehension)",
    compSpeak: "સાંભળો",
    compQ1: "પ્રશ્ન ૧. રમકડાના બ્લોક્સ પર તમને કયા અક્ષરો દેખાય છે?",
    compQ2: "પ્રશ્ન ૨. ચિત્રમાં વ્યક્તિ શું વાંચી રહી છે?",
    optionsC1: { 'A B C': 'A B C', 'X Y Z': 'X Y Z', '1 2 3': '1 2 3', 'D O G': 'D O G' },
    optionsC2: { 'Newspaper': 'સમાચાર પત્ર (Newspaper)', 'Phone': 'ફોન (Phone)', 'Letter': 'પત્ર (Letter)', 'Nothing': 'કંઈ નહીં (Nothing)' }
  },
  punjabi: {
    title: "ਸ਼ੁਰੂਆਤੀ ਮੁਲਾਂਕਣ",
    subtitle: "ਆਓ ਤੁਹਾਡੇ ਮੌਜੂਦਾ ਹੁਨਰ ਦੇ ਪੱਧਰਾਂ ਦਾ ਪਤਾ ਲਗਾਈਏ।",
    reading: "ਪੜ੍ਹਨਾ",
    writing: "ਲਿਖਣਾ",
    comprehension: "ਸਮਝ",
    next: "ਅਗਲਾ ਭਾਗ",
    submit: "ਮੁਲਾਂਕਣ ਜਮ੍ਹ ਕਰੋ",
    readingHeader: "ਭਾਗ 1: ਤਸਵੀਰ ਪੜ੍ਹਨਾ (Image Reading)",
    speakBtn: "ਸੁਣੋ",
    readingQ1: "ਪ੍ਰਸ਼ਨ 1. ਉਸ ਸ਼ਬਦ 'ਤੇ ਕਲਿੱਕ ਕਰੋ ਜੋ ਤਸਵੀਰ ਨਾਲ ਮੇਲ ਖਾਂਦਾ ਹੈ:",
    readingQ2: "ਪ੍ਰਸ਼ਨ 2. ਉਸ ਸ਼ਬਦ 'ਤੇ ਕਲਿੱਕ ਕਰੋ ਜੋ ਤਸਵੀਰ ਨਾਲ ਮੇਲ ਖਾਂਦਾ ਹੈ:",
    optionsR1: { 'Apple': 'ਸੇਬ (Apple)', 'Banana': 'ਕੇਲਾ (Banana)', 'Orange': 'ਸੰਤਰਾ (Orange)', 'Grapes': 'ਅੰਗੂਰ (Grapes)' },
    optionsR2: { 'Book': 'ਕਿਤਾਬ (Book)', 'Pencil': 'ਪੈਨਸਿਲ (Pencil)', 'Table': 'ਮੇਜ਼ (Table)', 'Bag': 'ਬੈਗ (Bag)' },
    writingHeader: "ਭਾਗ 2: ਲਿਖਣਾ (Writing)",
    writingQ: "ਕਾਰਜ: ਕਿਤਾਬ ਜਾਂ ਆਪਣੀ ਮਨਪਸੰਦ ਖੁਰਾਕ ਬਾਰੇ ਅੰਗਰੇਜ਼ੀ ਵਿੱਚ ਇੱਕ ਸਰਲ ਵਾਕ ਲਿਖੋ।",
    writingHelp: "ਘੱਟੋ-ਘੱਟ 3-5 ਸ਼ਬਦ ਲਿਖੋ। ਕੈਪੀਟਲ ਅੱਖਰ ਨਾਲ ਸੁਰੂ ਕਰੋ ਅਤੇ ਅੰਤ ਵਿੱਚ ਬਿੰਦੀ (.) ਲਗਾਓ।",
    placeholder: "ਆਪਣਾ ਵਾਕ ਇੱਥੇ ਲਿਖੋ...",
    grammarHelp: "ਵਿਆਕਰਨ ਸਹਾਇਤਾ",
    grammarCaps: "ਕੈਪੀਟਲ ਅੱਖਰ",
    grammarPeriod: "ਬਿੰਦੀ (.) ਨਾਲ ਖ਼ਤਮ",
    grammarMinWords: "5+ ਸ਼ਬਦਾਂ ਦੀ ਲੋੜ",
    wordCount: "ਸ਼ਬਦਾਂ ਦੀ ਗਿਣਤੀ",
    compHeader: "ਭਾਗ 3: ਤਸਵੀਰ ਸਮਝ (Picture Comprehension)",
    compSpeak: "ਸੁਣੋ",
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
        alert('Please answer both visual reading questions before continuing.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (wordsCount < 2) {
        alert('Please write at least a short response to continue.');
        return;
      }
      setStep(3);
    }
  };

  const handleSubmit = () => {
    if (!compAns1 || !compAns2) {
      alert('Please answer both picture comprehension questions.');
      return;
    }

    // Calculate score
    let readingScore = 0;
    if (readingAns1 === 'Apple') readingScore += 50;
    if (readingAns2 === 'Book') readingScore += 50;
    
    // Writing score out of 100 based on grammatical markers
    let writingScore = 0;
    if (hasMinWords) writingScore += 40;
    else if (wordsCount >= 3) writingScore += 25;
    else if (wordsCount >= 1) writingScore += 10;
    if (startsWithCapital) writingScore += 30;
    if (endsWithPeriod) writingScore += 30;

    let compScore = 0;
    if (compAns1 === 'A B C') compScore += 50;
    if (compAns2 === 'Newspaper') compScore += 50;

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
    <div className="min-h-screen bg-slate-50 py-12 px-6 flex flex-col items-center justify-center font-inter relative">
      {/* Decorative Lights */}
      <div className="absolute top-10 left-10 w-48 h-48 bg-blue-300/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-indigo-300/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl w-full bg-white border border-slate-200/50 p-8 md:p-10 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.03)] space-y-8 relative z-10">
        
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
          <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-black text-slate-955 flex items-center gap-2">
                <span>{t.readingHeader}</span>
              </h2>
              <button
                onClick={() => handleSpeak("Section 1: Look at the pictures and choose the matching words. Question 1: What is the word for the red fruit? Question 2: What is the word for the book?")}
                className="bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/80 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Volume2 className="w-4.5 h-4.5 text-indigo-500" />
                <span>{t.speakBtn}</span>
              </button>
            </div>

            {/* Q1: Apple */}
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-6 items-center bg-slate-50/50 p-5 rounded-3xl border border-slate-100">
                <div className="w-32 h-32 rounded-2xl overflow-hidden bg-white border border-slate-100 flex items-center justify-center shrink-0 shadow-sm">
                  <img src="/vocab_apple.png" alt="Apple" className="object-contain w-24 h-24" />
                </div>
                <div className="space-y-3.5 w-full">
                  <label className="block font-extrabold text-slate-800 text-sm pl-1">{t.readingQ1}</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Apple', 'Banana', 'Orange', 'Grapes'].map((opt) => (
                      <label
                        key={opt}
                        className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                          readingAns1 === opt
                            ? 'border-indigo-600 bg-indigo-50/20 text-indigo-900 font-bold ring-4 ring-indigo-500/5'
                            : 'border-slate-200/85 hover:border-slate-300 text-slate-700 bg-white'
                        }`}
                      >
                        <span className="text-xs font-semibold">{t.optionsR1[opt] || opt}</span>
                        <input
                          type="radio"
                          name="readingQ1"
                          value={opt}
                          checked={readingAns1 === opt}
                          onChange={() => setReadingAns1(opt)}
                          className="w-4 h-4 text-indigo-600"
                        />
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Q2: Book */}
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-6 items-center bg-slate-50/50 p-5 rounded-3xl border border-slate-100">
                <div className="w-32 h-32 rounded-2xl overflow-hidden bg-white border border-slate-100 flex items-center justify-center shrink-0 shadow-sm">
                  <img src="/vocab_book.png" alt="Book" className="object-contain w-24 h-24" />
                </div>
                <div className="space-y-3.5 w-full">
                  <label className="block font-extrabold text-slate-800 text-sm pl-1">{t.readingQ2}</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Book', 'Pencil', 'Table', 'Bag'].map((opt) => (
                      <label
                        key={opt}
                        className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                          readingAns2 === opt
                            ? 'border-indigo-600 bg-indigo-50/20 text-indigo-900 font-bold ring-4 ring-indigo-500/5'
                            : 'border-slate-200/85 hover:border-slate-300 text-slate-700 bg-white'
                        }`}
                      >
                        <span className="text-xs font-semibold">{t.optionsR2[opt] || opt}</span>
                        <input
                          type="radio"
                          name="readingQ2"
                          value={opt}
                          checked={readingAns2 === opt}
                          onChange={() => setReadingAns2(opt)}
                          className="w-4 h-4 text-indigo-600"
                        />
                      </label>
                    ))}
                  </div>
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

        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-black text-slate-955 flex items-center gap-2">
                <span>{t.writingHeader}</span>
              </h2>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-center bg-slate-50/50 p-5 rounded-3xl border border-slate-100">
              <div className="w-32 h-32 rounded-2xl overflow-hidden bg-white border border-slate-100 flex items-center justify-center shrink-0 shadow-sm">
                <img src="/vocab_book.png" alt="Book Illustration" className="object-contain w-24 h-24" />
              </div>
              <div className="space-y-2 w-full">
                <label className="block font-extrabold text-slate-800 text-sm leading-snug">{t.writingQ}</label>
                <p className="text-slate-400 text-xs font-semibold leading-relaxed">{t.writingHelp}</p>
              </div>
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
          <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-black text-slate-955 flex items-center gap-2">
                <span>{t.compHeader}</span>
              </h2>
              <button
                onClick={() => handleSpeak("Section 3: Answer questions about the picture. Question 1: What letters are on the block? Question 2: What is the person reading?")}
                className="bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/80 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Volume2 className="w-4.5 h-4.5 text-indigo-500" />
                <span>{t.compSpeak}</span>
              </button>
            </div>

            {/* Q1: ABC blocks */}
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-6 items-center bg-slate-50/50 p-5 rounded-3xl border border-slate-100">
                <div className="w-32 h-32 rounded-2xl overflow-hidden bg-white border border-slate-100 flex items-center justify-center shrink-0 shadow-sm">
                  <img src="/level_alphabet_1783340004005.png" alt="Blocks" className="object-contain w-24 h-24" />
                </div>
                <div className="space-y-3 w-full">
                  <label className="block font-extrabold text-slate-800 text-sm pl-1">{t.compQ1}</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['A B C', 'X Y Z', '1 2 3', 'D O G'].map((opt) => (
                      <label
                        key={opt}
                        className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                          compAns1 === opt
                            ? 'border-indigo-600 bg-indigo-50/20 text-indigo-900 font-bold ring-4 ring-indigo-500/5'
                            : 'border-slate-200/85 hover:border-slate-300 text-slate-700 bg-white'
                        }`}
                      >
                        <span className="text-xs font-semibold">{t.optionsC1[opt] || opt}</span>
                        <input
                          type="radio"
                          name="compAns1"
                          value={opt}
                          checked={compAns1 === opt}
                          onChange={() => setCompAns1(opt)}
                          className="w-4 h-4 text-indigo-600"
                        />
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Q2: Newspaper reader */}
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-6 items-center bg-slate-50/50 p-5 rounded-3xl border border-slate-100">
                <div className="w-32 h-32 rounded-2xl overflow-hidden bg-white border border-slate-100 flex items-center justify-center shrink-0 shadow-sm">
                  <img src="/level_newspaper_1783340060913.png" alt="Newspaper" className="object-contain w-24 h-24" />
                </div>
                <div className="space-y-3 w-full">
                  <label className="block font-extrabold text-slate-800 text-sm pl-1">{t.compQ2}</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Newspaper', 'Phone', 'Letter', 'Nothing'].map((opt) => (
                      <label
                        key={opt}
                        className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                          compAns2 === opt
                            ? 'border-indigo-600 bg-indigo-50/20 text-indigo-900 font-bold ring-4 ring-indigo-500/5'
                            : 'border-slate-200/85 hover:border-slate-300 text-slate-700 bg-white'
                        }`}
                      >
                        <span className="text-xs font-semibold">{t.optionsC2[opt] || opt}</span>
                        <input
                          type="radio"
                          name="compAns2"
                          value={opt}
                          checked={compAns2 === opt}
                          onChange={() => setCompAns2(opt)}
                          className="w-4 h-4 text-indigo-600"
                        />
                      </label>
                    ))}
                  </div>
                </div>
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
