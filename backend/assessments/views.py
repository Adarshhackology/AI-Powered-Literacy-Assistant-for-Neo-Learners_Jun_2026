from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import AssessmentResult
from users.models import CustomUser, UserProfile
from users.serializers import UserProfileSerializer

class SubmitAssessmentView(APIView):
    def post(self, request):
        username = request.data.get('username')
        userId = request.data.get('userId')
        readingScore = request.data.get('readingScore', 0)
        writingScore = request.data.get('writingScore', 0)
        comprehensionScore = request.data.get('comprehensionScore', 0)
        overallScore = request.data.get('overallScore', 0)

        if not username and not userId:
            return Response({'error': 'Username or userId is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            if userId:
                user = CustomUser.objects.get(id=userId)
            else:
                user = CustomUser.objects.get(username=username)
            profile = UserProfile.objects.get(user=user)

            result = AssessmentResult.objects.create(
                user=user,
                readingScore=readingScore,
                writingScore=writingScore,
                comprehensionScore=comprehensionScore,
                overallScore=overallScore
            )

            # Update levels
            profile.readingLevel = 'Advanced' if overallScore >= 75 else 'Intermediate' if overallScore >= 45 else 'Beginner'
            profile.writingLevel = 'Advanced' if writingScore >= 70 else 'Intermediate' if writingScore >= 40 else 'Beginner'
            profile.xp += 50
            profile.coins += 15
            profile.save()

            return Response({
                'result': {
                    'id': result.id,
                    'readingScore': result.readingScore,
                    'writingScore': result.writingScore,
                    'comprehensionScore': result.comprehensionScore,
                    'overallScore': result.overallScore,
                    'completedAt': result.completedAt
                },
                'profile': UserProfileSerializer(profile).data
            })
        except CustomUser.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class LeaderboardView(APIView):
    def get(self, request):
        try:
            profiles = UserProfile.objects.all().order_by('-xp')[:10]
            formatted = [{
                'name': p.fullName,
                'xp': p.xp,
                'level': p.level,
                'streak': p.streak
            } for p in profiles]
            return Response(formatted)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AdminProfilesView(APIView):
    def get(self, request):
        try:
            profiles = UserProfile.objects.all().select_related('user')
            formatted = []
            for p in profiles:
                formatted.append({
                    'id': p.id,
                    'fullName': p.fullName,
                    'age': p.age,
                    'gender': p.gender,
                    'education': p.education,
                    'occupation': p.occupation,
                    'preferredLanguage': p.preferredLanguage,
                    'learningGoal': p.learningGoal,
                    'readingLevel': p.readingLevel,
                    'writingLevel': p.writingLevel,
                    'speakingConfidence': p.speakingConfidence,
                    'dailyLearningTime': p.dailyLearningTime,
                    'avatar': p.avatar,
                    'xp': p.xp,
                    'coins': p.coins,
                    'streak': p.streak,
                    'level': p.level,
                    'badges': p.badges, # Stored as json string
                    'completedLessons': p.completedLessons, # Stored as json string
                    'username': p.user.username,
                    'email': p.user.email
                })
            return Response(formatted)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
