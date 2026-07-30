from rest_framework import serializers
from .models import SpeechAttempt, PronunciationScore, UserGamification, AIReportRecommendation

class SpeechAttemptSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = SpeechAttempt
        fields = ['id', 'username', 'lesson', 'audio_path', 'transcript', 'confidence', 'created_at']

class PronunciationScoreSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = PronunciationScore
        fields = [
            'id', 'username', 'lesson', 'expected_text', 'learner_transcript',
            'content_score', 'pronunciation_score', 'fluency_score',
            'speech_rate', 'pause_count', 'overall_score', 'result_label', 'created_at'
        ]

class UserGamificationSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = UserGamification
        fields = ['id', 'username', 'xp', 'coins', 'streak_days', 'last_login_date', 'level', 'badges', 'claimed_rewards']

class AIReportRecommendationSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = AIReportRecommendation
        fields = ['id', 'username', 'recommendations', 'weak_skills_detected', 'created_at']
