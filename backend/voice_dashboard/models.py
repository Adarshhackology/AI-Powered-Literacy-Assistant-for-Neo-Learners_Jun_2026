from django.db import models
from users.models import CustomUser
from curriculum.models import Lesson

class SpeechAttempt(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='speech_attempts')
    lesson = models.ForeignKey(Lesson, on_delete=models.SET_NULL, null=True, blank=True, related_name='speech_attempts')
    audio_path = models.CharField(max_length=500, null=True, blank=True)
    transcript = models.TextField()
    confidence = models.FloatField(default=0.9)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - Speech Attempt #{self.id} ({self.confidence * 100:.0f}%)"

class PronunciationScore(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='pronunciation_scores')
    lesson = models.ForeignKey(Lesson, on_delete=models.SET_NULL, null=True, blank=True, related_name='pronunciation_scores')
    expected_text = models.TextField(default='')
    learner_transcript = models.TextField(default='')
    content_score = models.IntegerField(default=85)
    pronunciation_score = models.IntegerField(default=85)
    fluency_score = models.IntegerField(default=88)
    speech_rate = models.IntegerField(default=120) # Words per minute
    pause_count = models.IntegerField(default=1)
    overall_score = models.IntegerField(default=86)
    result_label = models.CharField(max_length=50, default='Good') # Excellent, Good, Needs Practice
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - Pronunciation {self.overall_score}% ({self.result_label})"

class UserGamification(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='gamification')
    xp = models.IntegerField(default=100)
    coins = models.IntegerField(default=50)
    streak_days = models.IntegerField(default=3)
    last_login_date = models.DateField(auto_now=True)
    level = models.IntegerField(default=1)
    badges = models.JSONField(default=list) # e.g. ["Bronze Reader", "Pronunciation Star"]
    claimed_rewards = models.JSONField(default=list) # e.g. ["avatar_wizard", "theme_cosmic"]

    def __str__(self):
        return f"{self.user.username} - Lvl {self.level} ({self.xp} XP)"

class AIReportRecommendation(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='ai_recommendations')
    recommendations = models.JSONField(default=list)
    weak_skills_detected = models.JSONField(default=list)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"AI Recommendations for {self.user.username} ({self.created_at.strftime('%Y-%m-%d')})"
