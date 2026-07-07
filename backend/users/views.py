import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from google.oauth2 import id_token
from google.auth.transport import requests
from .models import CustomUser, UserProfile
from .serializers import UserSerializer, UserProfileSerializer

class RegisterView(APIView):
    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        name = request.data.get('name')
        age = request.data.get('age', '24')
        education = request.data.get('education', 'Primary School')
        preferredLanguage = request.data.get('preferredLanguage', 'english')

        if not username or not email or not password or not name:
            return Response({'error': 'Please provide username, email, password, and name'}, status=status.HTTP_400_BAD_REQUEST)

        if CustomUser.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
        if CustomUser.objects.filter(email=email).exists():
            return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = CustomUser.objects.create_user(
                username=username,
                email=email,
                password=password,
                first_name=name
            )

            profile = UserProfile.objects.create(
                user=user,
                fullName=name,
                age=age,
                education=education,
                preferredLanguage=preferredLanguage,
                xp=10,
                coins=10,
                streak=1,
                level=1,
                badges='[]',
                completedLessons='[]'
            )

            return Response({
                'message': 'User registered successfully',
                'user': UserSerializer(user).data
            })
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        user = authenticate(username=username, password=password)
        if user:
            return Response({
                'message': 'Login successful',
                'user': UserSerializer(user).data
            })
        else:
            return Response({'error': 'Wrong Credentials'}, status=status.HTTP_400_BAD_REQUEST)

class SaveProfileView(APIView):
    def post(self, request):
        username = request.data.get('username')
        if not username:
            return Response({'error': 'Username is required'}, status=status.HTTP_400_BAD_REQUEST)
            
        try:
            user = CustomUser.objects.get(username=username)
            profile, created = UserProfile.objects.get_or_create(user=user)
            
            # Map request fields to models
            profile.fullName = request.data.get('fullName', profile.fullName)
            profile.age = request.data.get('age', profile.age)
            profile.gender = request.data.get('gender', profile.gender)
            profile.education = request.data.get('education', profile.education)
            profile.occupation = request.data.get('occupation', profile.occupation)
            profile.preferredLanguage = request.data.get('preferredLanguage', profile.preferredLanguage)
            profile.learningGoal = request.data.get('learningGoal', profile.learningGoal)
            profile.readingLevel = request.data.get('readingLevel', profile.readingLevel)
            profile.writingLevel = request.data.get('writingLevel', profile.writingLevel)
            profile.speakingConfidence = str(request.data.get('speakingConfidence', profile.speakingConfidence))
            profile.dailyLearningTime = request.data.get('dailyLearningTime', profile.dailyLearningTime)
            profile.avatar = request.data.get('avatar', profile.avatar)
            
            if 'xp' in request.data:
                profile.xp = int(request.data.get('xp'))
            if 'coins' in request.data:
                profile.coins = int(request.data.get('coins'))
            if 'streak' in request.data:
                profile.streak = int(request.data.get('streak'))
            if 'level' in request.data:
                profile.level = int(request.data.get('level'))
            if 'badges' in request.data:
                profile.badges = json.dumps(request.data.get('badges'))
            if 'completedLessons' in request.data:
                profile.completedLessons = json.dumps(request.data.get('completedLessons'))

            profile.save()
            return Response(UserProfileSerializer(profile).data)
        except CustomUser.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class GetProfileView(APIView):
    def get(self, request, username):
        try:
            user = CustomUser.objects.get(username=username)
            profile = UserProfile.objects.get(user=user)
            return Response(UserProfileSerializer(profile).data)
        except (CustomUser.DoesNotExist, UserProfile.DoesNotExist):
            return Response({'error': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class GoogleLoginView(APIView):
    def post(self, request):
        token = request.data.get('token')
        if not token:
            return Response({'error': 'Token is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Verify direct OAuth payload with Google APIs
            idinfo = id_token.verify_oauth2_token(
                token, 
                requests.Request(), 
                '866893913282-u3aojbtk64h6fhpku8m8ckennkusnr3g.apps.googleusercontent.com'
            )
            
            email = idinfo['email']
            name = idinfo.get('name', email.split('@')[0])
            avatar = idinfo.get('picture', '🧑‍🎓')
            
            # Find user by email or generate a new one
            user, created = CustomUser.objects.get_or_create(
                email=email,
                defaults={
                    'username': email.split('@')[0],
                    'first_name': name
                }
            )
            
            # Find or build user statistics profile
            profile, profile_created = UserProfile.objects.get_or_create(
                user=user,
                defaults={
                    'fullName': name,
                    'avatar': avatar,
                    'education': 'Secondary School',
                    'preferredLanguage': 'english',
                    'xp': 100,
                    'coins': 20,
                    'streak': 1,
                    'level': 1,
                    'badges': '[]',
                    'completedLessons': '[]'
                }
            )
            
            return Response({
                'message': 'Login successful',
                'user': UserSerializer(user).data
            })
            
        except ValueError:
            return Response({'error': 'Invalid Google Token'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
