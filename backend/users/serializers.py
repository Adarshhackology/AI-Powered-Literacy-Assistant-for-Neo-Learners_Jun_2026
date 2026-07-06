import json
from rest_framework import serializers
from .models import CustomUser, UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    badges = serializers.SerializerMethodField()
    completedLessons = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = [
            'id', 'fullName', 'age', 'gender', 'education', 'occupation',
            'preferredLanguage', 'learningGoal', 'readingLevel', 'writingLevel',
            'speakingConfidence', 'dailyLearningTime', 'avatar', 'xp', 'coins',
            'streak', 'level', 'badges', 'completedLessons'
        ]

    def get_badges(self, obj):
        try:
            return json.loads(obj.badges or '[]')
        except:
            return []

    def get_completedLessons(self, obj):
        try:
            return json.loads(obj.completedLessons or '[]')
        except:
            return []

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(read_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'profile']
