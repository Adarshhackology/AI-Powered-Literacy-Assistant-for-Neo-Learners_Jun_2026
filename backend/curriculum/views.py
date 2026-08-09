import json
import os
import requests
import urllib.parse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Lesson, Curriculum, LessonContent, LearningPath
from .serializers import LessonSerializer, CurriculumSerializer, LessonContentSerializer, LearningPathSerializer
from users.models import CustomUser, UserProfile
from users.serializers import UserProfileSerializer
from assessments.models import AssessmentResult

# Seed initial lessons if table is empty
def seed_lessons_if_empty():
    c_beg, _ = Curriculum.objects.get_or_create(level='Beginner')
    c_int, _ = Curriculum.objects.get_or_create(level='Intermediate')
    c_adv, _ = Curriculum.objects.get_or_create(level='Advanced')

    # Update any existing lessons in the DB to link them
    Lesson.objects.filter(difficulty='Beginner', curriculum__isnull=True).update(curriculum=c_beg)
    Lesson.objects.filter(difficulty='Intermediate', curriculum__isnull=True).update(curriculum=c_int)
    Lesson.objects.filter(difficulty='Advanced', curriculum__isnull=True).update(curriculum=c_adv)

    if Lesson.objects.count() == 0:
        Lesson.objects.create(
            curriculum=c_beg,
            title='Alphabets & Basic Sounds',
            difficulty='Beginner',
            time='10 mins',
            category='Reading',
            content='Welcome to your first lesson! Alphabets are the building blocks of reading and writing. Let\'s practice the phonetic sounds: A says /æ/ as in Apple, B says /b/ as in Ball, C says /k/ as in Cat.',
            audioText='Phonetic sounds: A says apple, B says ball, C says cat. Try saying these words aloud.',
            examples=json.dumps(['Apple (सेब)', 'Ball (गेंदा)', 'Cat (बिल्ली)'])
        )
        Lesson.objects.create(
            curriculum=c_beg,
            title='Grammar Basics: Nouns & Verbs',
            difficulty='Beginner',
            time='15 mins',
            category='Writing',
            content='A noun is a naming word. It names a person, place, animal, or thing (e.g., Adarsh, Delhi, Tiger, Pen). A verb is an action word (e.g., Run, Write, Speak, Learn). Form simple sentences like: "Adarsh reads a book." Here, Adarsh is a noun, and reads is a verb.',
            audioText='A noun names a person, place, or thing. A verb shows action. Like: Adarsh runs. Adarsh is the noun, runs is the verb.',
            examples=json.dumps(['Nouns: Ram, School, Dog', 'Verbs: Eat, Sleep, Walk'])
        )
        Lesson.objects.create(
            curriculum=c_int,
            title='Short Story: The Thirsty Crow',
            difficulty='Intermediate',
            time='20 mins',
            category='Comprehension',
            content='Once upon a time, a crow was very thirsty. He flew around looking for water. Finally, he saw a pitcher with a little water at the bottom. He could not reach it. He thought of a plan. He picked up small pebbles one by one and dropped them into the pitcher. The water level rose, the crow drank the water, and flew away happily. Moral: Where there is a will, there is a way.',
            audioText='The thirsty crow dropped pebbles into the pitcher to make the water level rise. He drank and flew away happily. Where there is a will, there is a way.',
            examples=json.dumps(['Pitcher (घड़ा)', 'Pebbles (कंकड़)', 'Moral (नैतिकता)'])
        )
        Lesson.objects.create(
            curriculum=c_int,
            title='Daily Conversational English',
            difficulty='Intermediate',
            time='12 mins',
            category='Speaking',
            content='Let\'s practice common phrases. "Good morning! How are you?" - "I am doing well, thank you." "What is your name?" - "My name is Adarsh." "Where are you going?" - "I am going to the school." Practice pronouncing these sentences with correct stress.',
            audioText='Good morning! How are you? My name is Adarsh. I am learning to speak with my AI tutor.',
            examples=json.dumps(['Good Morning (शुभ प्रभात)', 'Thank You (धन्यवाद)', 'Welcome (स्वागत हे)'])
        )

class LessonListCreateView(APIView):
    def get(self, request):
        seed_lessons_if_empty()
        lessons = Lesson.objects.all().order_by('id')
        return Response(LessonSerializer(lessons, many=True).data)

    def post(self, request):
        title = request.data.get('title')
        difficulty = request.data.get('difficulty')
        time = request.data.get('time')
        category = request.data.get('category')
        content = request.data.get('content')
        audioText = request.data.get('audioText')
        examples = request.data.get('examples', [])

        if not title or not content:
            return Response({'error': 'Title and content are required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            lesson = Lesson.objects.create(
                title=title,
                difficulty=difficulty or 'Beginner',
                time=time or '10 mins',
                category=category or 'Reading',
                content=content,
                audioText=audioText,
                examples=json.dumps(examples)
            )
            return Response(LessonSerializer(lesson).data)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class LessonDeleteView(APIView):
    def delete(self, request, id):
        try:
            lesson = Lesson.objects.get(id=id)
            lesson.delete()
            return Response({'success': True})
        except Lesson.DoesNotExist:
            return Response({'error': 'Lesson not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CompleteLessonView(APIView):
    def post(self, request):
        username = request.data.get('username')
        lessonId = request.data.get('lessonId')
        xpReward = request.data.get('xpReward', 10)
        coinsReward = request.data.get('coinsReward', 5)

        if not username or lessonId is None:
            return Response({'error': 'Username and lessonId are required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = CustomUser.objects.get(username=username)
            profile = UserProfile.objects.get(user=user)

            completed = json.loads(profile.completedLessons or '[]')
            if lessonId not in completed:
                completed.append(lessonId)
                profile.completedLessons = json.dumps(completed)

                badges = json.loads(profile.badges or '[]')
                if len(completed) == 1 and 'First Lesson' not in badges:
                    badges.append('First Lesson')
                if len(completed) == 3 and 'Reading Expert' not in badges:
                    badges.append('Reading Expert')
                profile.badges = json.dumps(badges)

                profile.xp += xpReward
                profile.coins += coinsReward

                if profile.xp >= 300:
                    profile.level = 4
                elif profile.xp >= 150:
                    profile.level = 3
                elif profile.xp >= 50:
                    profile.level = 2
                
                profile.save()

            return Response(UserProfileSerializer(profile).data)
        except CustomUser.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CurriculumListCreateView(APIView):
    def get(self, request):
        curriculums = Curriculum.objects.all().order_by('id')
        return Response(CurriculumSerializer(curriculums, many=True).data)

    def post(self, request):
        level = request.data.get('level')
        if not level:
            return Response({'error': 'Level is required'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            curriculum, created = Curriculum.objects.get_or_create(level=level)
            return Response(CurriculumSerializer(curriculum).data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class GetLessonsByCurriculumView(APIView):
    def get(self, request, curriculum_id):
        try:
            curriculum = Curriculum.objects.get(id=curriculum_id)
            lessons = Lesson.objects.filter(curriculum=curriculum).order_by('id')
            return Response(LessonSerializer(lessons, many=True).data)
        except Curriculum.DoesNotExist:
            return Response({'error': 'Curriculum not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def ask_gemini_recommendation(reading, writing, comprehension, lessons):
    api_key = os.environ.get('GEMINI_API_KEY')
    if not api_key:
        return None

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={api_key}"
    
    prompt = f"""You are an AI Literacy Tutor.

Student Assessment Scores:
- Reading Score: {reading}%
- Writing Score: {writing}%
- Comprehension Score: {comprehension}%

Available Lessons to choose from:
{chr(10).join([f"- {l.title} (Category: {l.category})" for l in lessons])}

Please analyze the student's scores, identify their weakest areas, and recommend the best next TWO lessons from the available lessons.
Do NOT invent new lessons. Choose ONLY from the list of available lessons above.

Your response must be in JSON format matching this schema:
{{
  "recommendedLessons": ["Lesson Title 1", "Lesson Title 2"]
}}
"""
    headers = {'Content-Type': 'application/json'}
    data = {
        "contents": [{
            "parts": [{"text": prompt}]
        }],
        "generationConfig": {
            "responseMimeType": "application/json"
        }
    }
    
    try:
        response = requests.post(url, headers=headers, json=data, timeout=8)
        if response.status_code == 200:
            res_json = response.json()
            text_response = res_json['candidates'][0]['content']['parts'][0]['text']
            return json.loads(text_response)
    except Exception as e:
        print(f"Gemini API Error: {e}")
    return None

def heuristic_recommendation(reading, writing, comprehension, lessons):
    # Sort categories by score to prioritize weaker categories
    scores = [
        ('Reading', reading),
        ('Writing', writing),
        ('Comprehension', comprehension)
    ]
    scores.sort(key=lambda x: x[1]) # Weakest first
    
    recommended = []
    # Try to find a lesson matching the weakest category
    for cat, _ in scores:
        for l in lessons:
            if l.category.lower() == cat.lower() or (cat == 'Comprehension' and l.category.lower() in ['comprehension', 'vocabulary', 'speaking']):
                if l.title not in recommended:
                    recommended.append(l.title)
                    if len(recommended) == 2:
                        return {"recommendedLessons": recommended}
                        
    # Fallback to the first two available lessons
    for l in lessons:
        if l.title not in recommended:
            recommended.append(l.title)
            if len(recommended) == 2:
                break
                
    return {"recommendedLessons": recommended}

class GenerateRecommendationView(APIView):
    def post(self, request):
        userId = request.data.get('userId')
        username = request.data.get('username')
        
        if not userId and not username:
            return Response({'error': 'userId or username is required'}, status=status.HTTP_400_BAD_REQUEST)
            
        try:
            if userId:
                user = CustomUser.objects.get(id=userId)
            else:
                user = CustomUser.objects.get(username=username)
                
            profile = UserProfile.objects.get(user=user)
            
            # Fetch latest assessment
            latest_assessment = AssessmentResult.objects.filter(user=user).order_by('-completedAt').first()
            if latest_assessment:
                reading = latest_assessment.readingScore
                writing = latest_assessment.writingScore
                comprehension = latest_assessment.comprehensionScore
            else:
                reading = 50
                writing = 50
                comprehension = 50
                
            # Determine Curriculum level from profile
            level_name = profile.readingLevel or 'Beginner'
            if level_name not in ['Beginner', 'Intermediate', 'Advanced']:
                level_name = 'Beginner'
                
            curriculum = Curriculum.objects.filter(level=level_name).first()
            if curriculum:
                lessons = Lesson.objects.filter(curriculum=curriculum)
            else:
                lessons = Lesson.objects.filter(difficulty=level_name)
                
            if not lessons.exists():
                lessons = Lesson.objects.all()
                
            lesson_list = list(lessons)
            
            # Call Gemini with fallback
            recommendation = ask_gemini_recommendation(reading, writing, comprehension, lesson_list)
            if not recommendation or "recommendedLessons" not in recommendation:
                recommendation = heuristic_recommendation(reading, writing, comprehension, lesson_list)
                
            return Response(recommendation)
            
        except CustomUser.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class SaveLearningPathView(APIView):
    def post(self, request):
        userId = request.data.get('userId')
        username = request.data.get('username')
        lessonId = request.data.get('lessonId')
        lessonTitle = request.data.get('lessonTitle')
        status_val = request.data.get('status', 'Pending')
        
        if not userId and not username:
            return Response({'error': 'userId or username is required'}, status=status.HTTP_400_BAD_REQUEST)
        if not lessonId and not lessonTitle:
            return Response({'error': 'lessonId or lessonTitle is required'}, status=status.HTTP_400_BAD_REQUEST)
            
        try:
            if userId:
                user = CustomUser.objects.get(id=userId)
            else:
                user = CustomUser.objects.get(username=username)
                
            if lessonId:
                lesson = Lesson.objects.get(id=lessonId)
            else:
                lesson = Lesson.objects.filter(title=lessonTitle).first()
                if not lesson:
                    return Response({'error': 'Lesson not found'}, status=status.HTTP_404_NOT_FOUND)
                    
            lp, created = LearningPath.objects.get_or_create(user=user, lesson=lesson)
            lp.status = status_val
            lp.save()
            
            return Response(LearningPathSerializer(lp).data, status=status.HTTP_201_CREATED)
            
        except CustomUser.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except Lesson.DoesNotExist:
            return Response({'error': 'Lesson not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def generate_ai_lesson_with_image(topic, difficulty='Beginner', category='Reading', language='English'):
    """
    Uses Gemini API to generate lesson text, audio script, bilingual examples, 
    and an AI image prompt, then creates a real image URL using Pollinations AI image generator.
    """
    api_key = os.environ.get('GEMINI_API_KEY')
    
    prompt = f"""You are an expert AI curriculum designer for children and literacy learners.
Generate a high-quality educational lesson on the topic: "{topic}".
Difficulty level: {difficulty}
Category: {category}
Language context: {language}

Your output must be a single, valid JSON object matching this schema:
{{
  "title": "Short catchy title (max 6 words)",
  "difficulty": "{difficulty}",
  "time": "10 mins",
  "category": "{category}",
  "content": "Rich educational text for children with phonetic rules, grammar explanations, or vocabulary (100-200 words). Include native language translations in parentheses if relevant.",
  "audioText": "Clear, slow-paced audio narration script for read-aloud practice.",
  "examples": ["Example 1 (Translation 1)", "Example 2 (Translation 2)", "Example 3 (Translation 3)"],
  "image_prompt": "Detailed 3D cartoon illustration prompt describing the lesson visual (e.g. 'Cute cartoon owl reading a book under a sunlit tree, 3D Pixar render, vibrant colors, child-friendly')"
}}
"""
    
    lesson_data = None
    if api_key:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={api_key}"
        headers = {'Content-Type': 'application/json'}
        payload = {
            "contents": [{"parts": [{"text": prompt}]}],
            "generationConfig": {"responseMimeType": "application/json"}
        }
        try:
            resp = requests.post(url, headers=headers, json=payload, timeout=12)
            if resp.status_code == 200:
                res_json = resp.json()
                text_response = res_json['candidates'][0]['content']['parts'][0]['text']
                lesson_data = json.loads(text_response)
        except Exception as e:
            print(f"Gemini API Error in lesson generation: {e}")

    # Fallback if Gemini unavailable or failed
    if not lesson_data:
        lesson_data = {
            "title": f"Learning {topic.title()}",
            "difficulty": difficulty,
            "time": "10 mins",
            "category": category,
            "content": f"Welcome to your AI lesson on {topic}! Practice reading the key words and pronouncing them aloud clearly. Knowledge builds step by step!",
            "audioText": f"Today we are learning about {topic}. Listen closely and repeat after me to improve your vocabulary.",
            "examples": [f"{topic.title()} Basics (बुनियादी नियम)", f"{topic.title()} Key Phrase (मुख्य वाक्य)", f"{topic.title()} Practice (अभ्यास)"],
            "image_prompt": f"Cute 3D illustration of {topic} for children education, vibrant colorful vector art"
        }

    # Generate real AI image URL using Pollinations AI image generator API
    raw_prompt = lesson_data.get('image_prompt') or f"Cute colorful 3D cartoon illustration of {topic} for kids learning"
    encoded_prompt = urllib.parse.quote(f"{raw_prompt}, high resolution, 3d render, vibrant colors, child friendly")
    image_url = f"https://image.pollinations.ai/prompt/{encoded_prompt}?width=800&height=500&nologo=true"
    
    lesson_data['imageUrl'] = image_url
    return lesson_data


class GenerateAILessonView(APIView):
    """
    API endpoint: POST /api/curriculum/lessons/generate/
    Generates a new lesson with AI text, bilingual examples, and AI-generated image URL.
    """
    def post(self, request):
        topic = request.data.get('topic') or 'Animals & Phonics'
        difficulty = request.data.get('difficulty') or 'Beginner'
        category = request.data.get('category') or 'Reading'
        language = request.data.get('language') or 'English'
        save_to_db = request.data.get('save', True)

        try:
            lesson_dict = generate_ai_lesson_with_image(topic, difficulty, category, language)
            
            if save_to_db:
                curriculum, _ = Curriculum.objects.get_or_create(level=difficulty)
                lesson = Lesson.objects.create(
                    curriculum=curriculum,
                    title=lesson_dict.get('title', f"Lesson on {topic}"),
                    difficulty=difficulty,
                    time=lesson_dict.get('time', '10 mins'),
                    category=category,
                    content=lesson_dict.get('content', ''),
                    audioText=lesson_dict.get('audioText', ''),
                    imageUrl=lesson_dict.get('imageUrl', ''),
                    examples=json.dumps(lesson_dict.get('examples', []))
                )
                return Response(LessonSerializer(lesson).data, status=status.HTTP_201_CREATED)
            else:
                return Response(lesson_dict, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


