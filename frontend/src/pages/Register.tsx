import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { apiClient } from '../utils/api';
import type { SupportedLanguage } from '../utils/translationHelper';
import { Sparkles, User, Mail, Phone, Lock, BookOpen, Globe, Shield, Eye, EyeOff } from 'lucide-react';

const registerTranslations: Record<string, any> = {
  english: {
    sidebarTitle: "Start Your AI-Guided Literacy Journey",
    sidebarSubtitle: "Personalized. Interactive. Intelligent. Learning made simple, for everyone.",
    feat1_title: "AI-Powered Learning",
    feat1_desc: "Get smart recommendations just for you",
    feat2_title: "Track Your Progress",
    feat2_desc: "See how you grow every day",
    feat3_title: "Learn Anytime, Anywhere",
    feat3_desc: "On any device, at your pace",
    feat4_title: "Safe & Secure",
    feat4_desc: "Your data is always protected",
    formTitle: "Create Your Learner Account",
    formSubtitle: "Join thousands of learners and build your bright future.",
    labelName: "Full Name",
    placeholderName: "e.g. Adarsh Kumar",
    labelUser: "Username",
    placeholderUser: "Unique ID e.g. adarsh12",
    labelEmail: "Email Address",
    placeholderEmail: "e.g. name@example.com",
    labelPhone: "Phone Number",
    placeholderPhone: "10-digit mobile number",
    labelPassword: "Password",
    placeholderPassword: "Create a strong password",
    labelAge: "Age",
    placeholderAge: "Your age",
    labelEducation: "Education Level",
    labelLanguage: "Preferred Language",
    privacyText: "We respect your privacy and will never share your information.",
    registerBtn: "Create Profile & Register",
    orSignWith: "or sign up with",
    googleSignup: "Sign up with Google",
    footerText: "Already have an account?",
    loginLink: "Log in",
    eduOptions: {
      "No Formal Education": "No Formal Education",
      "Primary School": "Primary School",
      "Secondary School": "Secondary School",
      "College/Higher Ed": "College/Higher Ed",
      "Self-Taught": "Self-Taught"
    }
  },
  hindi: {
    sidebarTitle: "अपनी एआई-निर्देशित साक्षरता यात्रा शुरू करें",
    sidebarSubtitle: "व्यक्तिगत। संवादात्मक। बुद्धिमान। सभी के लिए सीखना हुआ सरल।",
    feat1_title: "एआई-संचालित शिक्षण",
    feat1_desc: "विशेष रूप से आपके लिए स्मार्ट सुझाव पाएं",
    feat2_title: "अपनी प्रगति को ट्रैक करें",
    feat2_desc: "देखें कि आप हर दिन कैसे बढ़ते हैं",
    feat3_title: "कभी भी, कहीं भी सीखें",
    feat3_desc: "किसी भी डिवाइस पर, अपनी गति से",
    feat4_title: "सुरक्षित और संरक्षित",
    feat4_desc: "आपका डेटा हमेशा सुरक्षित रहता है",
    formTitle: "अपना शिक्षार्थी खाता बनाएं",
    formSubtitle: "हजारों शिक्षार्थियों से जुड़ें और अपना उज्ज्वल भविष्य बनाएं।",
    labelName: "पूरा नाम",
    placeholderName: "उदा. आदर्श कुमार",
    labelUser: "उपयोगकर्ता नाम (यूज़रनेम)",
    placeholderUser: "अद्वितीय आईडी उदा. adarsh12",
    labelEmail: "ईमेल पता",
    placeholderEmail: "उदा. name@example.com",
    labelPhone: "फ़ोन नंबर",
    placeholderPhone: "10-अंकीय मोबाइल नंबर",
    labelPassword: "पासवर्ड",
    placeholderPassword: "एक मजबूत पासवर्ड बनाएं",
    labelAge: "उम्र",
    placeholderAge: "आपकी उम्र",
    labelEducation: "शिक्षा का स्तर",
    labelLanguage: "पसंदीदा भाषा",
    privacyText: "हम आपकी गोपनीयता का सम्मान करते हैं और आपकी जानकारी कभी साझा नहीं करेंगे।",
    registerBtn: "प्रोफ़ाइल बनाएं और पंजीकरण करें",
    orSignWith: "या इसके साथ साइन अप करें",
    googleSignup: "गूगल के साथ साइन अप करें",
    footerText: "क्या आपके पास पहले से एक खाता है?",
    loginLink: "लॉग इन करें",
    eduOptions: {
      "No Formal Education": "कोई औपचारिक शिक्षा नहीं",
      "Primary School": "प्राथमिक विद्यालय",
      "Secondary School": "माध्यमिक विद्यालय",
      "College/Higher Ed": "कॉलेज/उच्च शिक्षा",
      "Self-Taught": "स्व-शिक्षित"
    }
  },
  telugu: {
    sidebarTitle: "మీ AI-ఆధారిత అక్షరాస్యత ప్రయాణాన్ని ప్రారంభించండి",
    sidebarSubtitle: "వ్యక్తిగతీకరించినది. ఇంటరాక్టివ్. తెలివైనది. అందరికీ అభ్యాసం సులభం.",
    feat1_title: "AI-ఆధారిత అభ్యాసం",
    feat1_desc: "మీ కోసం ప్రత్యేకంగా స్మార్ట్ సిఫార్సులను పొందండి",
    feat2_title: "మీ పురోగతిని ట్రాక్ చేయండి",
    feat2_desc: "మీరు ప్రతిరోజూ ఎలా ఎదుగుతున్నారో చూడండి",
    feat3_title: "ఎప్పుడైనా, ఎక్కడైనా నేర్చుకోండి",
    feat3_desc: "ఏ పరికరంలోనైనా, మీ స్వంత వేగంతో",
    feat4_title: "సురక్షితమైనది & భద్రమైనది",
    feat4_desc: "మీ డేటా ఎల్లప్పుడూ రక్షించబడుతుంది",
    formTitle: "మీ లెర్నర్ ఖాతాను సృష్టించండి",
    formSubtitle: "వేలాది మంది అభ్యాసకులతో చేరండి మరియు మీ ఉజ్వల భవిష్యత్తును నిర్మించుకోండి.",
    labelName: "పూర్తి పేరు",
    placeholderName: "ఉదా. ఆదర్ష్ కుమార్",
    labelUser: "యూజర్ నేమ్",
    placeholderUser: "ప్రత్యేక ఐడి ఉదా. adarsh12",
    labelEmail: "ఈమెయిల్ చిరునామా",
    placeholderEmail: "ఉదా. name@example.com",
    labelPhone: "ఫోన్ నంబర్",
    placeholderPhone: "10-అంకెల మొబైల్ నంబర్",
    labelPassword: "పాస్‌వర్డ్",
    placeholderPassword: "బలమైన పాస్‌వర్డ్‌ను సృష్టించండి",
    labelAge: "వయస్సు",
    placeholderAge: "మీ వయస్సు",
    labelEducation: "విద్యా స్థాయి",
    labelLanguage: "ప్రాధాన్యత భాష",
    privacyText: "మేము మీ గోప్యతను గౌరవిస్తాము మరియు మీ సమాచారాన్ని ఎప్పటికీ భాగస్వామ్యం చేయము.",
    registerBtn: "ప్రొఫైల్‌ను సృష్టించండి & నమోదు చేయండి",
    orSignWith: "లేదా దీనితో సైన్ అప్ చేయండి",
    googleSignup: "గూగుల్‌తో సైన్ అప్ చేయండి",
    footerText: "ఇప్పటికే ఖాతా ఉందా?",
    loginLink: "లాగిన్ చేయండి",
    eduOptions: {
      "No Formal Education": "అధికారిక విద్య లేదు",
      "Primary School": "ప్రాథమిక పాఠశాల",
      "Secondary School": "ఉన్నత పాఠశాల",
      "College/Higher Ed": "కళాశాల/ఉన్నత విద్య",
      "Self-Taught": "స్వయం అభ్యాసం"
    }
  },
  tamil: {
    sidebarTitle: "உங்கள் AI-வழிநடத்தப்பட்ட எழுத்தறிவுப் பயணத்தைத் தொடங்குங்கள்",
    sidebarSubtitle: "தனிப்பயனாக்கப்பட்டது. ஊடாடும். புத்திசாலித்தனமானது. கற்றல் எளிமையானது, அனைவருக்கும்.",
    feat1_title: "AI-இயங்கும் கற்றல்",
    feat1_desc: "உங்களுக்காக பிரத்யேக ஸ்மார்ட் பரிந்துரைகளைப் பெறுங்கள்",
    feat2_title: "உங்கள் முன்னேற்றத்தைக் கண்காணிக்கவும்",
    feat2_desc: "ஒவ்வொரு நாளும் நீங்கள் எவ்வாறு வளர்கிறீர்கள் என்பதைப் பாருங்கள்",
    feat3_title: "எப்போது வேண்டுமானாலும், எங்கு வேண்டுமானாலும் கற்கலாம்",
    feat3_desc: "எந்த சாதனத்திலும், உங்கள் சொந்த வேகத்தில்",
    feat4_title: "பாதுகாப்பானது & நம்பகமானது",
    feat4_desc: "உங்கள் தரவு எப்போதும் பாதுகாக்கப்படுகிறது",
    formTitle: "உங்கள் கற்பவர் கணக்கை உருவாக்குங்கள்",
    formSubtitle: "ஆயிரக்கணக்கான கற்பவர்களுடன் இணைந்து உங்கள் பிரகாசமான எதிர்காலத்தை உருவாக்குங்கள்.",
    labelName: "முழு பெயர்",
    placeholderName: "உதாரணம். ஆதர்ஷ் குமார்",
    labelUser: "பயனர் பெயர்",
    placeholderUser: "தனிப்பட்ட ஐடி உதாரணம். adarsh12",
    labelEmail: "மின்னஞ்சல் முகவரி",
    placeholderEmail: "உதாரணம். name@example.com",
    labelPhone: "தொலைபேசி எண்",
    placeholderPhone: "10 இலக்க மொபைல் எண்",
    labelPassword: "கடவுச்சொல்",
    placeholderPassword: "வலுவான கடவுச்சொல்லை உருவாக்கவும்",
    labelAge: "வயது",
    placeholderAge: "உங்கள் வயது",
    labelEducation: "கல்வி நிலை",
    labelLanguage: "விருப்பமான மொழி",
    privacyText: "உங்கள் தனியுரிமையை நாங்கள் மதிக்கிறோம் மற்றும் உங்கள் தகவலை ஒருபோதும் பகிர மாட்டோம்.",
    registerBtn: "சுயவிவரத்தை உருவாக்கி பதிவு செய்யவும்",
    orSignWith: "அல்லது இதனுடன் பதிவு செய்யவும்",
    googleSignup: "கூகுள் மூலம் பதிவு செய்யவும்",
    footerText: "ஏற்கனவே கணக்கு உள்ளதா?",
    loginLink: "உள்நுழைக",
    eduOptions: {
      "No Formal Education": "முறையான கல்வி இல்லை",
      "Primary School": "தொடக்கப் பள்ளி",
      "Secondary School": "உயர்நிலைப் பள்ளி",
      "College/Higher Ed": "கல்லூரி/உயர் கல்வி",
      "Self-Taught": "சுயமாக கற்றவர்"
    }
  },
  kannada: {
    sidebarTitle: "ನಿಮ್ಮ AI-ಮಾರ್ಗದರ್ಶಿತ ಸಾಕ್ಷರತಾ ಪ್ರಯಾಣವನ್ನು ಪ್ರಾರಂಭಿಸಿ",
    sidebarSubtitle: "ವೈಯಕ್ತಿಕಗೊಳಿಸಿದ. ಸಂವಾದಾತ್ಮಕ. ಬುದ್ಧಿವಂತ. ಕಲಿಕೆ ಎಲ್ಲರಿಗೂ ಸರಳವಾಗಿದೆ.",
    feat1_title: "AI-ಚಾಲಿತ ಕಲಿಕೆ",
    feat1_desc: "ನಿಮಗಾಗಿ ಮಾತ್ರ ಸ್ಮಾರ್ಟ್ ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಿರಿ",
    feat2_title: "ನಿಮ್ಮ ಪ್ರಗತಿಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ",
    feat2_desc: "ನೀವು ಪ್ರತಿದಿನ ಹೇಗೆ ಬೆಳೆಯುತ್ತೀರಿ ಎಂಬುದನ್ನು ನೋಡಿ",
    feat3_title: "ಯಾವಾಗ ಬೇಕಾದರೂ, ಎಲ್ಲಿ ಬೇಕಾದರೂ ಕಲಿಯಿರಿ",
    feat3_desc: "ಯಾವುದೇ ಸಾಧನದಲ್ಲಿ, ನಿಮ್ಮ ಸ್ವಂತ ವೇಗದಲ್ಲಿ",
    feat4_title: "ಸುರಕ್ಷಿತ ಮತ್ತು ಭದ್ರತೆ",
    feat4_desc: "ನಿಮ್ಮ ಡೇಟಾ ಯಾವಾಗಲೂ ರಕ್ಷಿಸಲ್ಪಟ್ಟಿರುತ್ತದೆ",
    formTitle: "ನಿಮ್ಮ ಕಲಿಯುವವರ ಖಾತೆಯನ್ನು ರಚಿಸಿ",
    formSubtitle: "ಸಾವಿರಾರು ಕಲಿಯುವವರೊಂದಿಗೆ ಸೇರಿಕೊಳ್ಳಿ ಮತ್ತು ನಿಮ್ಮ ಉಜ್ವಲ ಭವಿಷ್ಯವನ್ನು ನಿರ್ಮಿಸಿ.",
    labelName: "ಪೂರ್ಣ ಹೆಸರು",
    placeholderName: "ಉದಾ. ಆದರ್ಶ್ ಕುಮಾರ್",
    labelUser: "ಬಳಕೆದಾರ ಹೆಸರು",
    placeholderUser: "ವಿಶಿಷ್ಟ ಐಡಿ ಉದಾ. adarsh12",
    labelEmail: "ಇಮೇಲ್ ವಿಳಾಸ",
    placeholderEmail: "ಉದಾ. name@example.com",
    labelPhone: "ಫೋನ್ ಸಂಖ್ಯೆ",
    placeholderPhone: "10-ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
    labelPassword: "ಪಾಸ್ವರ್ಡ್",
    placeholderPassword: "ಬಲವಾದ ಪಾಸ್‌ವರ್ಡ್ ರಚಿಸಿ",
    labelAge: "ವಯಸ್ಸು",
    placeholderAge: "ನಿಮ್ಮ ವಯಸ್ಸು",
    labelEducation: "ಶಿಕ್ಷಣದ ಮಟ್ಟ",
    labelLanguage: "ಆದ್ಯತೆಯ ಭಾಷೆ",
    privacyText: "ನಾವು ನಿಮ್ಮ ಗೌಪ್ಯತೆಯನ್ನು ಗೌರವಿಸುತ್ತೇವೆ ಮತ್ತು ನಿಮ್ಮ ಮಾಹಿತಿಯನ್ನು ಎಂದಿಗೂ ಹಂಚಿಕೊಳ್ಳುವುದಿಲ್ಲ.",
    registerBtn: "ಪ್ರೊಫೈಲ್ ರಚಿಸಿ ಮತ್ತು ನೋಂದಾಯಿಸಿ",
    orSignWith: "ಅಥವಾ ಇದರೊಂದಿಗೆ ಸೈನ್ ಅಪ್ ಮಾಡಿ",
    googleSignup: "ಗೂಗಲ್ ಮೂಲಕ ಸೈನ್ ಅಪ್ ಮಾಡಿ",
    footerText: "ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ?",
    loginLink: "ಲಾಗಿನ್ ಮಾಡಿ",
    eduOptions: {
      "No Formal Education": "ಯಾವುದೇ ಔಪಚಾರಿಕ ಶಿಕ್ಷಣವಿಲ್ಲ",
      "Primary School": "ಪ್ರಾಥಮಿಕ ಶಾಲೆ",
      "Secondary School": "ಪ್ರೌಢಶಾಲೆ",
      "College/Higher Ed": "ಕಾಲೇಜು/ಉನ್ನತ ಶಿಕ್ಷಣ",
      "Self-Taught": "ಸ್ವಯಂ-ಕಲಿತ"
    }
  },
  bengali: {
    sidebarTitle: "আপনার এআই-নির্দেশিত সাক্ষরতার যাত্রা শুরু করুন",
    sidebarSubtitle: "ব্যক্তিগতকৃত। ইন্টারেক্টিভ। বুদ্ধিমান। সকলের জন্য সহজ উপায়ে শেখা।",
    feat1_title: "এআই-দ্বারা চালিত শিক্ষা",
    feat1_desc: "বিশেষভাবে আপনার জন্য তৈরি স্মার্ট সুপারিশ পান",
    feat2_title: "আপনার অগ্রগতি ট্র্যাক করুন",
    feat2_desc: "দেখুন প্রতিদিন আপনার কেমন উন্নতি হচ্ছে",
    feat3_title: "যেকোনো সময়, যেকোনো জায়গায় শিখুন",
    feat3_desc: "যেকোনো ডিভাইসে, আপনার নিজস্ব গতিতে",
    feat4_title: "নিরাপদ এবং সুরক্ষিত",
    feat4_desc: "আপনার ডেটা সর্বদা সুরক্ষিত থাকে",
    formTitle: "আপনার লার্নার অ্যাকাউন্ট তৈরি করুন",
    formSubtitle: "হাজার হাজার শিক্ষার্থীর সাথে যোগ দিন এবং উজ্জ্বল ভবিষ্যৎ গড়ুন।",
    labelName: "পুরো নাম",
    placeholderName: "যেমন: আদর্শ কুমার",
    labelUser: "ইউজারনেম",
    placeholderUser: "ইউনিক আইডি যেমন: adarsh12",
    labelEmail: "ইমেল ঠিকানা",
    placeholderEmail: "যেমন: name@example.com",
    labelPhone: "ফোন নম্বর",
    placeholderPhone: "১০-সংখ্যার মোবাইল নম্বর",
    labelPassword: "পাসওয়ার্ড",
    placeholderPassword: "একটি শক্তিশালী পাসওয়ার্ড তৈরি করুন",
    labelAge: "বয়স",
    placeholderAge: "আপনার বয়স",
    labelEducation: "শিক্ষাগত স্তর",
    labelLanguage: "পছন্দের ভাষা",
    privacyText: "আমরা আপনার গোপনীয়তাকে সম্মান করি এবং কখনই তথ্য শেয়ার করি না।",
    registerBtn: "প্রোফাইল তৈরি করুন এবং নিবন্ধন করুন",
    orSignWith: "অথবা এর সাথে সাইন আপ করুন",
    googleSignup: "গুগলের সাথে সাইন আপ করুন",
    footerText: "ইতিমধ্যেই একটি অ্যাকাউন্ট আছে?",
    loginLink: "লগ ইন করুন",
    eduOptions: {
      "No Formal Education": "কোন প্রাতিষ্ঠানিক শিক্ষা নেই",
      "Primary School": "প্রাথমিক বিদ্যালয়",
      "Secondary School": "মাধ্যমিক বিদ্যালয়",
      "College/Higher Ed": "কলেজ/উচ্চ শিক্ষা",
      "Self-Taught": "স্বশিক্ষিত"
    }
  },
  marathi: {
    sidebarTitle: "तुमचा एआय-मार्गदर्शित साक्षरता प्रवास सुरू करा",
    sidebarSubtitle: "वैयक्तिकृत. परस्परसंवादी. बुद्धिमान. प्रत्येकासाठी सोपे शिक्षण.",
    feat1_title: "एआय-आधारित शिक्षण",
    feat1_desc: "खास तुमच्यासाठी स्मार्ट शिफारसी मिळवा",
    feat2_title: "तुमच्या प्रगतीचा मागोवा घ्या",
    feat2_desc: "तुम्ही दररोज कशी प्रगती करत आहात ते पहा",
    feat3_title: "कधीही, कुठेही शिका",
    feat3_desc: "कोणत्याही उपकरणावर, तुमच्या गतीने",
    feat4_title: "सुरक्षित आणि संरक्षित",
    feat4_desc: "तुमचा डेटा नेहमी सुरक्षित असतो",
    formTitle: "तुमचे विद्यार्थी खाते तयार करा",
    formSubtitle: "हजारो विद्यार्थ्यांशी जोडा आणि तुमचे उज्ज्वल भविष्य बनवा.",
    labelName: "पूर्ण नाव",
    placeholderName: "उदा. आदर्श कुमार",
    labelUser: "वापरकर्तानाव (युझरनेम)",
    placeholderUser: "युनिक आयडी उदा. adarsh12",
    labelEmail: "ईमेल पत्ता",
    placeholderEmail: "उदा. name@example.com",
    labelPhone: "फोन नंबर",
    placeholderPhone: "१०-अंकी मोबाईल नंबर",
    labelPassword: "पासवर्ड",
    placeholderPassword: "एक मजबूत पासवर्ड तयार करा",
    labelAge: "वय",
    placeholderAge: "तुमचे वय",
    labelEducation: "शिक्षणाची पातळी",
    labelLanguage: "पसंदगीची भाषा",
    privacyText: "आम्ही तुमच्या गोपनीयतेचा आदर करतो आणि तुमची माहिती कधीही शेअर करणार नाही.",
    registerBtn: "प्रोफाइल बनवा आणि नोंदणी करा",
    orSignWith: "किंवा याद्वारे साइन अप करा",
    googleSignup: "गुगलसह साइन अप करा",
    footerText: "आधीच खाते आहे का?",
    loginLink: "लॉग इन करा",
    eduOptions: {
      "No Formal Education": "औपचारिक शिक्षण नाही",
      "Primary School": "प्राथमिक शाळा",
      "Secondary School": "माध्यमिक शाळा",
      "College/Higher Ed": "कॉलेज/उच्च शिक्षण",
      "Self-Taught": "स्वयं-शिक्षित"
    }
  },
  gujarati: {
    sidebarTitle: "તમારી એઆઈ-માર્ગદર્શિત સાક્ષરતા યાત્રા શરૂ કરો",
    sidebarSubtitle: "વ્યક્તિગતમાં. અરસપરસ. બુદ્ધિશાળી. દરેક માટે શીખવું સરળ બન્યું.",
    feat1_title: "એઆઈ-આધારિત શિક્ષણ",
    feat1_desc: "ખાસ તમારા માટે સ્માર્ટ ભલામણો મેળવો",
    feat2_title: "તમારી પ્રગતિને ટ્રેક કરો",
    feat2_desc: "જુઓ કે તમે દરરોજ કેવી રીતે આગળ વધો છો",
    feat3_title: "ગમે ત્યારે, ગમે ત્યાં શીખો",
    feat3_desc: "કોઈપણ ઉપકરણ પર, તમારી ગતિએ",
    feat4_title: "સુરક્ષિત અને ભરોસાપાત્ર",
    feat4_desc: "તમારો ડેટા હંમેશા સુરક્ષિત રહે છે",
    formTitle: "તમારું વિદ્યાર્થી ખાતું બનાવો",
    formSubtitle: "હજારો વિદ્યાર્થીઓ સાથે જોડાઓ અને તમારું ઉજ્જવળ ભવિષ્ય બનાવો.",
    labelName: "પૂરું નામ",
    placeholderName: "દા.ત. આદર્શ કોડ",
    labelUser: "વપરાશકર્તા નામ (યુઝરનેમ)",
    placeholderUser: "યુનિક આઈડી દા.ત. adarsh12",
    labelEmail: "ઇમેઇલ સરનામું",
    placeholderEmail: "દા.ત. name@example.com",
    labelPhone: "ફોન નંબર",
    placeholderPhone: "૧૦-આંકડાનો મોબાઈલ નંબર",
    labelPassword: "પાસવર્ડ",
    placeholderPassword: "એક મજબૂત પાસવર્ડ બનાવો",
    labelAge: "ઉંમર",
    placeholderAge: "તમારી ઉંમર",
    labelEducation: "શિક્ષણનું સ્તર",
    labelLanguage: "પસંદગીની ભાષા",
    privacyText: "અમે તમારી ગોપનીયતાનું સન્માન કરીએ છીએ અને તમારી માહિતી ક્યારેય શેર નહીં કરીએ.",
    registerBtn: "પ્રોફાઇલ બનાવો અને નોંધણી કરો",
    orSignWith: "અથવા આનાથી સાઇન અપ કરો",
    googleSignup: "ગુગલ સાથે સાઇન અપ કરો",
    footerText: "પહેલેથી જ ખાતું છે?",
    loginLink: "લોગ ઇન કરો",
    eduOptions: {
      "No Formal Education": "કોઈ ઔપચારિક શિક્ષણ નથી",
      "Primary School": "પ્રાથમಿಕ શાળા",
      "Secondary School": "માધ્યમિક શાળા",
      "College/Higher Ed": "કોલેજ/ઉચ્ચ શિક્ષણ",
      "Self-Taught": "સ્વ-શિક્ષિત"
    }
  },
  punjabi: {
    sidebarTitle: "ਆਪਣੀ ਏਆਈ-ਨਿਰਦੇਸ਼ਿਤ ਸਾਖਰਤਾ ਯਾਤਰਾ ਸ਼ੁਰੂ ਕਰੋ",
    sidebarSubtitle: "ਨਿੱਜੀ। ਇੰਟਰਐਕਟਿਵ। ਬੁੱਧੀਮਾਨ। ਸਿੱਖਣਾ ਹਰ ਕਿਸੇ ਲਈ ਆਸਾਨ ਹੋਇਆ।",
    feat1_title: "ਏਆਈ-ਸੰਚਾਲਿਤ ਸਿੱਖਿਆ",
    feat1_desc: "ਖਾਸ ਤੌਰ 'ਤੇ ਤੁਹਾਡੇ ਲਈ ਸਮਾਰਟ ਸਿਫ਼ਾਰਸ਼ਾਂ ਪ੍ਰਾਪਤ ਕਰੋ",
    feat2_title: "ਆਪਣੀ ਤਰੱਕੀ ਨੂੰ ਟ੍ਰੈਕ ਕਰੋ",
    feat2_desc: "ਦੇਖੋ ਕਿ ਤੁਸੀਂ ਹਰ ਰੋਜ਼ ਕਿਵੇਂ ਵਿਕਾਸ ਕਰਦੇ ਹੋ",
    feat3_title: "ਕਦੇ ਵੀ, ਕਿਤੇ ਵੀ ਸਿੱਖੋ",
    feat3_desc: "ਕਿਸੇ ਵੀ ਡਿਵਾਈਸ 'ਤੇ, ਆਪਣੀ ਗਤੀ ਨਾਲ",
    feat4_title: "ਸੁਰੱਖਿਅਤ ਅਤੇ ਸੁਰੱਖਿਅਤ",
    feat4_desc: "ਤੁਹਾਡਾ ਡੇਟਾ ਹਮੇਸ਼ਾ ਸੁਰੱਖਿਅਤ ਰਹਿੰਦਾ ਹੈ",
    formTitle: "ਆਪਣਾ ਸਿੱਖਣ ਵਾਲਾ ਖਾਤਾ ਬਣਾਓ",
    formSubtitle: "ਹਜ਼ਾਰਾਂ ਸਿੱਖਣ ਵਾਲਿਆਂ ਨਾਲ ਜੁੜੋ ਅਤੇ ਆਪਣਾ ਸੁਨਹਿਰੀ ਭਵਿੱਖ ਬਣਾਓ।",
    labelName: "ਪੂਰਾ ਨਾਮ",
    placeholderName: "ਉਦਾ. ਆਦਰਸ਼ ਕੁਮਾਰ",
    labelUser: "ਯੂਜ਼ਰਨਾਮ",
    placeholderUser: "ਵਿਲੱਖਣ ਆਈਡੀ ਉਦਾ. adarsh12",
    labelEmail: "ਈਮੇਲ ਪਤਾ",
    placeholderEmail: "ਉਦਾ. name@example.com",
    labelPhone: "ਫ਼ੋਨ ਨੰਬਰ",
    placeholderPhone: "10-ਅੰਕਾਂ ਦਾ ਮੋਬਾਈਲ ਨੰਬਰ",
    labelPassword: "ਪਾਸਵਰਡ",
    placeholderPassword: "ਇੱਕ ਮਜ਼ਬੂਤ ਪਾਸਵਰਡ ਬਣਾਓ",
    labelAge: "ਉਮਰ",
    placeholderAge: "ਤੁਹਾਡੀ ਉਮਰ",
    labelEducation: "ਸਿੱਖਿਆ ਦਾ ਪੱਧਰ",
    labelLanguage: "ਪਸੰਦੀਦਾ ਭਾਸ਼ਾ",
    privacyText: "ਅਸੀਂ ਤੁਹਾਡੀ ਗੋਪਨੀਯਤਾ ਦਾ ਸਤਿਕਾਰ ਕਰਦੇ ਹਾਂ ਅਤੇ ਤੁਹਾਡੀ ਜਾਣਕਾਰੀ ਕਦੇ ਸਾਂਝੀ ਨਹੀਂ ਕਰਾਂਗੇ।",
    registerBtn: "ਪ੍ਰੋਫਾਈਲ ਬਣਾਓ ਅਤੇ ਰਜਿਸਟਰ ਕਰੋ",
    orSignWith: "ਜਾਂ ਇਸ ਨਾਲ ਸਾਈਨ ਅਪ ਕਰੋ",
    googleSignup: "ਗੂਗਲ ਨਾਲ ਸਾਈਨ ਅਪ ਕਰੋ",
    footerText: "ਕੀ ਪਹਿਲਾਂ ਹੀ ਖਾਤਾ ਹੈ?",
    loginLink: "ਲੌਗ ਇਨ ਕਰੋ",
    eduOptions: {
      "No Formal Education": "ਕੋਈ ਰਸਮੀ ਸਿੱਖਿਆ ਨਹੀਂ",
      "Primary School": "ਪ੍ਰਾਇਮਰੀ ਸਕੂਲ",
      "Secondary School": "ਸੈਕੰਡਰੀ ਸਕੂਲ",
      "College/Higher Ed": "ਕਾਲਜ/ਉੱਚ ਸਿੱਖਿਆ",
      "Self-Taught": "ਸਵੈ-ਸਿੱਖਿਅਤ"
    }
  }
};

export default function Register() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [age, setAge] = useState('');
  const [education, setEducation] = useState('Primary School');
  const [prefLanguage, setPrefLanguage] = useState<SupportedLanguage>('english');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setLoading(true);
    setError('');
    try {
      const response = await apiClient.googleLogin(credentialResponse.credential);
      if (response.message === 'Login successful') {
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('username', response.user.username);
        // Sign-up flow always redirects to onboarding setup questions
        navigate('/profile-setup');
      }
    } catch (err: any) {
      setError(err.message || 'Google registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedLang = localStorage.getItem('preferredLanguage') as SupportedLanguage;
    if (savedLang) {
      setPrefLanguage(savedLang);
    }
  }, []);

  const handleLanguageChange = (code: SupportedLanguage) => {
    setPrefLanguage(code);
    localStorage.setItem('preferredLanguage', code);
    // Dispatch event to sync navbar/other elements
    window.dispatchEvent(new Event('storage'));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Generate unique username from name if empty
    const finalUsername = username.trim() || name.toLowerCase().replace(/\s+/g, '') + Math.floor(Math.random() * 100);

    try {
      const response = await apiClient.register({
        name,
        username: finalUsername,
        email,
        phone,
        password,
        age,
        education,
        preferredLanguage: prefLanguage
      });
      if (response.message === 'User registered successfully') {
        navigate('/login', { state: { message: 'Registration successful! Please log in with your credentials.' } });
      }
    } catch (err: any) {
      setError(err.message || 'Error occurred during registration. Please try another username.');
    } finally {
      setLoading(false);
    }
  };

  const t = registerTranslations[prefLanguage] || registerTranslations.english;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-50 via-slate-100 to-indigo-50/30 py-12 px-4 relative font-inter overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-[-25%] right-[-15%] w-[600px] h-[600px] bg-gradient-to-tr from-blue-400/20 to-indigo-400/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-25%] left-[-15%] w-[700px] h-[700px] bg-gradient-to-br from-violet-400/15 to-purple-400/15 rounded-full blur-[160px] pointer-events-none" />

      {/* Double Panel Premium Register Container */}
      <div className="max-w-5xl w-full bg-white/95 backdrop-blur-md border border-slate-200/50 rounded-[40px] shadow-[0_30px_80px_rgba(0,0,0,0.03)] relative z-10 flex flex-col lg:flex-row overflow-hidden transition-all duration-300">
        
        {/* Left Panel - Illustration and Marketing */}
        <div className="lg:w-[42%] bg-gradient-to-b from-[#EEF2FF] via-[#F5F3FF] to-[#ECE9FC] p-8 md:p-10 flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-200/40 shrink-0">
          <div className="absolute top-[-10%] left-[-10%] w-32 h-32 bg-indigo-200/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-[20%] right-[-10%] w-40 h-40 bg-purple-200/25 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-8 relative z-10">
            {/* Logo */}
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-[0_8px_20px_rgba(99,102,241,0.08)] transition-all hover:scale-105 duration-300">
              <span className="text-2xl leading-none">📚</span>
            </div>

            {/* Sidebar Title & Subtitle */}
            <div className="space-y-3">
              <h2 className="text-2xl font-black text-slate-800 tracking-tight leading-tight">{t.sidebarTitle}</h2>
              <p className="text-slate-500 font-semibold text-xs leading-relaxed">{t.sidebarSubtitle}</p>
            </div>

            {/* Feature Checklist */}
            <div className="space-y-5 pt-2">
              <div className="flex gap-4 items-start">
                <div className="w-9 h-9 rounded-xl bg-white border border-slate-200/30 flex items-center justify-center shrink-0 shadow-sm text-indigo-600 font-bold">
                  🎓
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-800 text-xs mt-0.5">{t.feat1_title}</h4>
                  <p className="text-slate-400 font-semibold text-[10px] mt-0.5 leading-normal">{t.feat1_desc}</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-9 h-9 rounded-xl bg-white border border-slate-200/30 flex items-center justify-center shrink-0 shadow-sm text-green-600 font-bold">
                  ✅
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-800 text-xs mt-0.5">{t.feat2_title}</h4>
                  <p className="text-slate-400 font-semibold text-[10px] mt-0.5 leading-normal">{t.feat2_desc}</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-9 h-9 rounded-xl bg-white border border-slate-200/30 flex items-center justify-center shrink-0 shadow-sm text-pink-600 font-bold">
                  💖
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-800 text-xs mt-0.5">{t.feat3_title}</h4>
                  <p className="text-slate-400 font-semibold text-[10px] mt-0.5 leading-normal">{t.feat3_desc}</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-9 h-9 rounded-xl bg-white border border-slate-200/30 flex items-center justify-center shrink-0 shadow-sm text-amber-500 font-bold">
                  🛡️
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-800 text-xs mt-0.5">{t.feat4_title}</h4>
                  <p className="text-slate-400 font-semibold text-[10px] mt-0.5 leading-normal">{t.feat4_desc}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Boy illustration */}
          <div className="mt-8 flex justify-center relative z-10">
            <img
              src="/register_boy.png"
              alt="Start Study Illustration"
              className="max-h-56 object-contain pointer-events-none filter drop-shadow-md"
              onError={(e) => {
                (e.target as any).style.display = 'none';
              }}
            />
          </div>
        </div>

        {/* Right Panel - Registration Form */}
        <div className="lg:w-[58%] p-8 md:p-10 flex flex-col justify-center">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm text-blue-600 text-xl font-bold">
              👤
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">{t.formTitle}</h1>
            <p className="text-slate-500 font-semibold text-xs mt-1">{t.formSubtitle}</p>
          </div>

          {/* Errors */}
          {error && (
            <div className="bg-rose-50 border border-rose-100 text-rose-800 rounded-2xl px-4 py-3.5 mb-5 text-xs font-bold flex items-start gap-2 shadow-sm">
              <span className="text-sm leading-none mt-0.5">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">{t.labelName}</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 focus-within:text-indigo-600 transition-colors" />
                  <input
                    type="text"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200/85 focus:border-indigo-600 rounded-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 font-semibold text-sm placeholder:text-slate-400/80"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.placeholderName}
                    required
                  />
                </div>
              </div>

              {/* Username */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">{t.labelUser}</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 focus-within:text-indigo-600 transition-colors" />
                  <input
                    type="text"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200/85 focus:border-indigo-600 rounded-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 font-semibold text-sm placeholder:text-slate-400/80"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={t.placeholderUser}
                    required
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">{t.labelEmail}</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 focus-within:text-indigo-600 transition-colors" />
                  <input
                    type="email"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200/85 focus:border-indigo-600 rounded-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 font-semibold text-sm placeholder:text-slate-400/80"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.placeholderEmail}
                    required
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">{t.labelPhone}</label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 focus-within:text-indigo-600 transition-colors" />
                  <input
                    type="tel"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200/85 focus:border-indigo-600 rounded-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 font-semibold text-sm placeholder:text-slate-400/80"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t.placeholderPhone}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">{t.labelPassword}</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 focus-within:text-indigo-600 transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-12 pr-12 py-3 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200/85 focus:border-indigo-600 rounded-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 font-semibold text-sm placeholder:text-slate-400/80"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t.placeholderPassword}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer flex items-center justify-center"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Age */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">{t.labelAge}</label>
                <input
                  type="number"
                  className="w-full px-4 py-3 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200/85 focus:border-indigo-600 rounded-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 font-semibold text-sm placeholder:text-slate-400/80"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder={t.placeholderAge}
                  required
                />
              </div>

              {/* Education Level */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">{t.labelEducation}</label>
                <div className="relative group">
                  <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 focus-within:text-indigo-600 transition-colors" />
                  <select
                    className="w-full pl-12 pr-4 py-3 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200/85 focus:border-indigo-600 rounded-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 font-semibold text-sm cursor-pointer"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                  >
                    <option value="No Formal Education">{t.eduOptions["No Formal Education"]}</option>
                    <option value="Primary School">{t.eduOptions["Primary School"]}</option>
                    <option value="Secondary School">{t.eduOptions["Secondary School"]}</option>
                    <option value="College/Higher Ed">{t.eduOptions["College/Higher Ed"]}</option>
                    <option value="Self-Taught">{t.eduOptions["Self-Taught"]}</option>
                  </select>
                </div>
              </div>

              {/* Preferred Language */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">{t.labelLanguage}</label>
                <div className="relative group">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 focus-within:text-indigo-600 transition-colors" />
                  <select
                    className="w-full pl-12 pr-4 py-3 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200/85 focus:border-indigo-600 rounded-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 font-semibold text-sm cursor-pointer"
                    value={prefLanguage}
                    onChange={(e) => handleLanguageChange(e.target.value as SupportedLanguage)}
                  >
                    <option value="english">English</option>
                    <option value="hindi">हिंदी (Hindi)</option>
                    <option value="telugu">తెలుగు (Telugu)</option>
                    <option value="tamil">தமிழ் (Tamil)</option>
                    <option value="kannada">ಕನ್ನಡ (Kannada)</option>
                    <option value="malayalam">മലയാളം (Malayalam)</option>
                    <option value="marathi">मराठी (Marathi)</option>
                    <option value="bengali">বাংলা (Bengali)</option>
                    <option value="gujarati">ગુજરાતી (Gujarati)</option>
                    <option value="punjabi">ਪੰਜਾਬੀ (Punjabi)</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Privacy Shield Banner */}
            <div className="bg-[#EEF2FF] text-indigo-700 rounded-2xl px-4 py-3 text-[10px] font-bold flex items-center gap-2.5 shadow-sm border border-indigo-100/30">
              <Shield className="w-4 h-4 shrink-0 text-indigo-600" />
              <span>{t.privacyText}</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-extrabold py-3.5 rounded-2xl hover:shadow-[0_10px_25px_rgba(99,102,241,0.25)] active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {loading ? (
                <span>⏳ Registering...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{t.registerBtn}</span>
                </>
              )}
            </button>
          </form>

          {/* Separator */}
          <div className="relative my-5 text-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100" /></div>
            <span className="relative bg-white px-4 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400/80">{t.orSignWith}</span>
          </div>

          {/* Google Register Component */}
          <div className="flex justify-center mt-1">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError('Google Registration Failed.')}
              useOneTap
            />
          </div>

          {/* Footer Link */}
          <p className="mt-6 text-center text-slate-400 text-xs font-semibold">
            {t.footerText}{' '}
            <Link to="/login" className="text-indigo-600 font-extrabold hover:underline">
              {t.loginLink}
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
