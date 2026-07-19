import os
import django
import json

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
if 'DATABASE_URL' not in os.environ:
    os.environ['DATABASE_URL'] = "postgresql://neondb_owner:npg_7vflxQB6qgGA@ep-bold-boat-aho98hli.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

django.setup()

from curriculum.models import Curriculum, Lesson, LessonContent

# Translation dictionary mapping common words and templates to 9 languages
# Keys: English word -> dict of languages
translations_dict = {
    "Apple": {
        "english": "Apple",
        "hindi": "सेब",
        "telugu": "ఆపిల్",
        "tamil": "ஆப்பிள்",
        "kannada": "ಆಪಲ್",
        "bengali": "আপেল",
        "marathi": "सफरचंद",
        "gujarati": "સફરજન",
        "punjabi": "ਸੇਬ"
    },
    "Banana": {
        "english": "Banana",
        "hindi": "केला",
        "telugu": "అరటిపండు",
        "tamil": "வாழைப்பழம்",
        "kannada": "ಬಾಳೆಹಣ್ಣು",
        "bengali": "কলা",
        "marathi": "केळे",
        "gujarati": "કેળું",
        "punjabi": "ਕੇਲਾ"
    },
    "Book": {
        "english": "Book",
        "hindi": "किताब",
        "telugu": "పుస్తకం",
        "tamil": "புத்தகம்",
        "kannada": "ಪುಸ್ತಕ",
        "bengali": "বই",
        "marathi": "पुस्तक",
        "gujarati": "પુસ્તક",
        "punjabi": "ਕਿਤਾਬ"
    },
    "Cat": {
        "english": "Cat",
        "hindi": "बिल्ली",
        "telugu": "పిల్లి",
        "tamil": "பூனை",
        "kannada": "ಬೆಕ್ಕು",
        "bengali": "বিড়াল",
        "marathi": "मांजर",
        "gujarati": "બિલાડી",
        "punjabi": "ਬਿੱਲੀ"
    },
    "Dog": {
        "english": "Dog",
        "hindi": "कुत्ता",
        "telugu": "కుక్క",
        "tamil": "நாய்",
        "kannada": "ನಾಯಿ",
        "bengali": "কুকুর",
        "marathi": "कुत्रा",
        "gujarati": "કૂતરો",
        "punjabi": "ਕੁੱਤਾ"
    },
    "Sun": {
        "english": "Sun",
        "hindi": "सूरज",
        "telugu": "సూర్యుడు",
        "tamil": "சூரியன்",
        "kannada": "ಸೂರ್ಯ",
        "bengali": "সূর্য",
        "marathi": "सूर्य",
        "gujarati": "સૂર્ય",
        "punjabi": "ਸੂਰਜ"
    },
    "Water": {
        "english": "Water",
        "hindi": "पानी",
        "telugu": "నీరు",
        "tamil": "தண்ணீர்",
        "kannada": "ನೀರು",
        "bengali": "জল",
        "marathi": "पाणी",
        "gujarati": "પાણી",
        "punjabi": "ਪਾਣੀ"
    },
    "School": {
        "english": "School",
        "hindi": "विद्यालय",
        "telugu": "పాఠశాల",
        "tamil": "பள்ளி",
        "kannada": "ಶಾಲೆ",
        "bengali": "বিদ্যালয়",
        "marathi": "शाळा",
        "gujarati": "શાળા",
        "punjabi": "ਸਕੂਲ"
    },
    "Hospital": {
        "english": "Hospital",
        "hindi": "अस्पताल",
        "telugu": "ఆసుపత్రి",
        "tamil": "மருத்துவமனை",
        "kannada": "ಆಸ್ಪತ್ರೆ",
        "bengali": "হাসপাতাল",
        "marathi": "रुग्णालय",
        "gujarati": "હોસ્પિટલ",
        "punjabi": "ਹਸਪਤਾਲ"
    },
    "Home": {
        "english": "Home",
        "hindi": "घर",
        "telugu": "ఇల్లు",
        "tamil": "வீடு",
        "kannada": "ಮನೆ",
        "bengali": "বাড়ি",
        "marathi": "घर",
        "gujarati": "ઘર",
        "punjabi": "ਘਰ"
    }
}

languages = ["english", "hindi", "telugu", "tamil", "kannada", "bengali", "marathi", "gujarati", "punjabi"]

def get_translated_text(word, lang):
    if word in translations_dict:
        return translations_dict[word].get(lang, word)
    return word

def seed_curriculum():
    print("Initializing Seeding process...")
    # Get or create curriculums
    c_beg, _ = Curriculum.objects.get_or_create(level="Beginner")
    c_int, _ = Curriculum.objects.get_or_create(level="Intermediate")
    c_adv, _ = Curriculum.objects.get_or_create(level="Advanced")

    # Clear existing lessons to prevent duplicates on forced seeding
    Lesson.objects.all().delete()
    print("Cleared existing Lessons.")

    lessons_to_create = []
    contents_to_create = []

    # 1. GENERATE 100 BEGINNER LESSONS
    # Lessons 1-26: Alphabet Sounds (A-Z)
    alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    alphabet_examples = {
        'A': 'Apple', 'B': 'Banana', 'C': 'Cat', 'D': 'Dog', 'E': 'Elephant',
        'F': 'Fish', 'G': 'Grapes', 'H': 'Home', 'I': 'Ice Cream', 'J': 'Jug',
        'K': 'Kite', 'L': 'Lion', 'M': 'Monkey', 'N': 'Nest', 'O': 'Orange',
        'P': 'Pen', 'Q': 'Queen', 'R': 'Rat', 'S': 'Sun', 'T': 'Tree',
        'U': 'Umbrella', 'V': 'Van', 'W': 'Water', 'X': 'Xylophone', 'Y': 'Yak',
        'Z': 'Zebra'
    }

    for i in range(1, 101):
        if i <= 26:
            char = alphabets[i-1]
            word = alphabet_examples[char]
            title = f"Alphabet Sound: Letter {char}"
            category = "Reading"
            img = "/vocab_apple.png" if char == 'A' else "/vocab_banana.png" if char == 'B' else "/vocab_book.png"
            
            # Default content template
            content_eng = f"Let's practice the letter '{char}'. '{char}' makes the sound as in '{word}'. Say the word aloud: '{word}'."
            audio_eng = f"Letter {char} is for {word}."
            examples_list = [f"{char} - {word}"]
        elif i <= 50:
            # Double-letter blends
            blends = ["sh", "ch", "th", "ph", "oo", "ee", "ai", "ay", "qu", "ing", "ck", "wh", "ar", "or", "ur", "er", "ir", "ou", "ow", "oy", "oi", "ea", "oa", "ui"]
            blend = blends[i - 27]
            title = f"Phonetic Blend: {blend.capitalize()} Sound"
            category = "Reading"
            img = "/level_alphabet_1783340004005.png"
            content_eng = f"Practice reading the blend sound '{blend}'. Let's repeat words that contain this sound."
            audio_eng = f"Let's practice the sound {blend}."
            examples_list = [f"Blend sound: {blend}"]
        elif i <= 75:
            # Sight words
            sight_words = ["cat", "dog", "sun", "run", "map", "pen", "boy", "toy", "car", "hat", "cap", "bag", "cup", "bed", "box", "key", "man", "pig", "cow", "hen", "fox", "jam", "net", "bus", "nut"]
            w = sight_words[i - 51]
            title = f"Sight Word Practice: '{w.capitalize()}'"
            category = "Vocabulary"
            img = "/level_words_1783340019724.png"
            content_eng = f"Let's read and spell the sight word: '{w.upper()}'. '{w}' is a short and useful word."
            audio_eng = f"Sight word {w}."
            examples_list = [w.capitalize()]
        else:
            # Basic Conversational items
            topics = ["Hello", "Good Morning", "Goodbye", "Thank You", "Please", "How are you", "My Name is", "I am a boy", "Yes", "No", "Sorry", "Welcome", "Excuse me", "Come here", "Go there", "Sit down", "Stand up", "Open book", "Close book", "Look here", "Listen carefully", "Speak up", "Quiet please", "Let's play", "Happy Day"]
            topic = topics[i - 76]
            title = f"Basic Speech: '{topic}'"
            category = "Speaking"
            img = "/level_alphabet_1783340004005.png"
            content_eng = f"Let's learn how to speak the phrase: '{topic}'. Use this to talk with friends."
            audio_eng = f"Speak the phrase: {topic}."
            examples_list = [topic]

        # Add default English Lesson
        lesson = Lesson(
            curriculum=c_beg,
            title=title,
            difficulty="Beginner",
            time="10 mins",
            category=category,
            content=content_eng,
            audioText=audio_eng,
            imageUrl=img,
            examples=json.dumps(examples_list)
        )
        lessons_to_create.append(lesson)

    # 2. GENERATE 100 INTERMEDIATE LESSONS
    for i in range(1, 101):
        if i <= 30:
            title = f"Grammar Parts: Lesson {i}"
            category = "Writing"
            img = "/level_sentences_1783340032385.png"
            content_eng = f"Let's study simple sentence parts. Today we study basic grammar. Connect nouns and action verbs together."
            audio_eng = "Let's connect nouns and action verbs together."
            examples_list = ["Grammar Rules"]
        elif i <= 60:
            title = f"Situational Dialogue: Part {i - 30}"
            category = "Speaking"
            img = "/vocab_hospital.png"
            content_eng = f"Practice everyday talking in this situation. Ask questions and reply nicely to other people."
            audio_eng = "Practice speaking these useful everyday dialogue questions."
            examples_list = ["Dialogue Practice"]
        elif i <= 80:
            title = f"Children Short Story: Tale {i - 60}"
            category = "Comprehension"
            img = "/level_stories_1783340046772.png"
            content_eng = f"Once upon a time, a small mouse helped a large sleeping lion. The lion smiled and was happy. Moral: Kindness is always rewarded."
            audio_eng = "Read this moral story carefully and answer the questions."
            examples_list = ["Kindness Story"]
        else:
            title = f"Intermediate Word Builder: Part {i - 80}"
            category = "Vocabulary"
            img = "/vocab_book.png"
            content_eng = f"Improve your spelling and learn medium-sized words to increase your vocabulary count."
            audio_eng = "Spell these words correctly to increase your word vocabulary count."
            examples_list = ["Vocab Builder"]

        lesson = Lesson(
            curriculum=c_int,
            title=title,
            difficulty="Intermediate",
            time="15 mins",
            category=category,
            content=content_eng,
            audioText=audio_eng,
            imageUrl=img,
            examples=json.dumps(examples_list)
        )
        lessons_to_create.append(lesson)

    # 3. GENERATE 100 ADVANCED LESSONS
    for i in range(1, 101):
        if i <= 30:
            title = f"Paragraph Reading: Topic {i}"
            category = "Reading"
            img = "/level_newspaper_1783340060913.png"
            content_eng = f"Read this advanced paragraph about global nature and ecosystems. Pay close attention to grammar structures and clauses."
            audio_eng = "Listen and read the nature paragraph along with the audio tutor."
            examples_list = ["Advanced Reading"]
        elif i <= 60:
            title = f"Advanced Writing Practice: Part {i - 30}"
            category = "Writing"
            img = "/level_mastery_1783340074714.png"
            content_eng = f"Write down summary notes describing your own goals and plans. Use proper sentence connectors and transition words."
            audio_eng = "Draft your summary notes with correct capitalization and structure."
            examples_list = ["Writing Summary"]
        elif i <= 80:
            title = f"Situational Conversation: Dialogue {i - 60}"
            category = "Speaking"
            img = "/vocab_hospital.png"
            content_eng = f"In this formal conversational context, practice answering interview questions and speaking with confidence."
            audio_eng = "Practice your speaking confidence in a formal interview setting."
            examples_list = ["Formal Speaking"]
        else:
            title = f"Advanced Comprehension Passage: Tale {i - 80}"
            category = "Comprehension"
            img = "/level_stories_1783340046772.png"
            content_eng = f"Read the story of historical explorers charting new paths. Answer questions regarding main themes and morals."
            audio_eng = "Listen to the comprehension questions and select correct responses."
            examples_list = ["Exploration Story"]

        lesson = Lesson(
            curriculum=c_adv,
            title=title,
            difficulty="Advanced",
            time="20 mins",
            category=category,
            content=content_eng,
            audioText=audio_eng,
            imageUrl=img,
            examples=json.dumps(examples_list)
        )
        lessons_to_create.append(lesson)

    # Bulk create lessons to retrieve their IDs for contents mapping
    created_lessons = Lesson.objects.bulk_create(lessons_to_create)
    print(f"Successfully bulk created {len(created_lessons)} Lessons.")

    # 4. GENERATE LESSON CONTENT FOR ALL 9 LANGUAGES
    print("Generating translations and content mapping for all 9 languages...")
    for lesson in created_lessons:
        # Multilingual content generator helper
        for lang in languages:
            # Simple template localized sentence builders
            if lang == "english":
                content_lang = lesson.content
            else:
                # Custom translations matching for common keywords
                if "Alphabet Sound: Letter" in lesson.title:
                    char = lesson.title.split(" ")[-1]
                    word = alphabet_examples.get(char, "Book")
                    word_trans = get_translated_text(word, lang)
                    
                    if lang == "hindi":
                        content_lang = f"आइए अक्षर '{char}' का अभ्यास करें। '{char}' से '{word_trans}' जैसी आवाज निकलती है। जोर से बोलें: '{word_trans}'।"
                    elif lang == "telugu":
                        content_lang = f"మనం '{char}' అక్షరాన్ని అభ్యాసం చేద్దాం. '{char}' ధ్వని '{word_trans}' లో వస్తుంది. గట్టిగా పలకండి: '{word_trans}'."
                    elif lang == "tamil":
                        content_lang = f"வாருங்கள் '{char}' எழுத்தைப் பயிற்சி செய்வோம். '{char}' என்பது '{word_trans}' இல் வரும் ஒலி. சத்தமாகச் சொல்லுங்கள்: '{word_trans}'."
                    else:
                        content_lang = f"Practice letter '{char}'. In your chosen language it sounds like '{word_trans}'. Say: '{word_trans}'."
                else:
                    # Generic localized template mapping
                    content_lang = f"[{lang.upper()} TRANSLATION] {lesson.content} (Read in {lang})"

            contents_to_create.append(
                LessonContent(
                    lesson=lesson,
                    language=lang,
                    content=content_lang
                )
            )

    created_contents = LessonContent.objects.bulk_create(contents_to_create)
    print(f"Successfully bulk created {len(created_contents)} LessonContent entries.")
    print("Database seeding completed successfully!")

if __name__ == "__main__":
    seed_curriculum()
