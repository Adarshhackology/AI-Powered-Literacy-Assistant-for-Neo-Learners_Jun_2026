import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Lesson
from .serializers import LessonSerializer
from users.models import CustomUser, UserProfile
from users.serializers import UserProfileSerializer

# Seed initial lessons if table is empty
def seed_lessons_if_empty():
    if Lesson.objects.count() == 0:
        Lesson.objects.create(
            title='Alphabets & Basic Sounds',
            difficulty='Beginner',
            time='10 mins',
            category='Reading',
            content='Welcome to your first lesson! Alphabets are the building blocks of reading and writing. Let\'s practice the phonetic sounds: A says /æ/ as in Apple, B says /b/ as in Ball, C says /k/ as in Cat.',
            audioText='Phonetic sounds: A says apple, B says ball, C says cat. Try saying these words aloud.',
            examples=json.dumps(['Apple (सेब)', 'Ball (गेंदा)', 'Cat (बिल्ली)'])
        )
        Lesson.objects.create(
            title='Grammar Basics: Nouns & Verbs',
            difficulty='Beginner',
            time='15 mins',
            category='Writing',
            content='A noun is a naming word. It names a person, place, animal, or thing (e.g., Adarsh, Delhi, Tiger, Pen). A verb is an action word (e.g., Run, Write, Speak, Learn). Form simple sentences like: "Adarsh reads a book." Here, Adarsh is a noun, and reads is a verb.',
            audioText='A noun names a person, place, or thing. A verb shows action. Like: Adarsh runs. Adarsh is the noun, runs is the verb.',
            examples=json.dumps(['Nouns: Ram, School, Dog', 'Verbs: Eat, Sleep, Walk'])
        )
        Lesson.objects.create(
            title='Short Story: The Thirsty Crow',
            difficulty='Intermediate',
            time='20 mins',
            category='Comprehension',
            content='Once upon a time, a crow was very thirsty. He flew around looking for water. Finally, he saw a pitcher with a little water at the bottom. He could not reach it. He thought of a plan. He picked up small pebbles one by one and dropped them into the pitcher. The water level rose, the crow drank the water, and flew away happily. Moral: Where there is a will, there is a way.',
            audioText='The thirsty crow dropped pebbles into the pitcher to make the water level rise. He drank and flew away happily. Where there is a will, there is a way.',
            examples=json.dumps(['Pitcher (घड़ा)', 'Pebbles (कंकड़)', 'Moral (नैतिकता)'])
        )
        Lesson.objects.create(
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
