from django.db import models
from users.models import CustomUser

class AISession(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='ai_sessions')
    language = models.CharField(max_length=50)
    status = models.CharField(max_length=20, default='assessment')  # assessment, learning, retest, completed
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class AIAssessmentResult(models.Model):
    session = models.ForeignKey(AISession, on_delete=models.CASCADE, related_name='assessments')
    assessment_type = models.CharField(max_length=20)  # initial, retest
    reading_score = models.IntegerField(default=0)
    writing_score = models.IntegerField(default=0)
    comprehension_score = models.IntegerField(default=0)
    overall_score = models.IntegerField(default=0)
    level = models.CharField(max_length=20, default='Beginner')
    weak_areas = models.JSONField(default=list)
    created_at = models.DateTimeField(auto_now_add=True)

class AILearningModule(models.Model):
    session = models.ForeignKey(AISession, on_delete=models.CASCADE, related_name='modules')
    skill = models.CharField(max_length=20)  # reading, writing, comprehension
    questions = models.JSONField(default=list)  # Array of 6 question objects
    status = models.CharField(max_length=20, default='pending')  # pending, in_progress, completed
    score = models.IntegerField(null=True, blank=True)
    ai_feedback = models.JSONField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

class AIQuestionResponse(models.Model):
    module = models.ForeignKey(AILearningModule, on_delete=models.CASCADE, related_name='responses')
    question_index = models.IntegerField()
    user_answer = models.TextField()
    is_correct = models.BooleanField(default=False)
    ai_explanation = models.TextField(default='')
    score = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
