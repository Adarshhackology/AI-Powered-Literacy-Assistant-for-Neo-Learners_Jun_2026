from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    # Base user auth fields (username, email, password, name) are inherited from AbstractUser
    def __str__(self):
        return self.username

class UserProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='profile')
    fullName = models.CharField(max_length=150)
    age = models.CharField(max_length=10, default="24")
    gender = models.CharField(max_length=50, null=True, blank=True)
    education = models.CharField(max_length=100, default="Primary School")
    occupation = models.CharField(max_length=100, null=True, blank=True)
    preferredLanguage = models.CharField(max_length=50, default="english")
    learningGoal = models.CharField(max_length=200, null=True, blank=True)
    readingLevel = models.CharField(max_length=50, default="Beginner")
    writingLevel = models.CharField(max_length=50, default="Beginner")
    speakingConfidence = models.CharField(max_length=10, default="50")
    dailyLearningTime = models.CharField(max_length=50, default="30 mins")
    avatar = models.CharField(max_length=50, default="🧑‍🎓")
    xp = models.IntegerField(default=10)
    coins = models.IntegerField(default=10)
    streak = models.IntegerField(default=1)
    level = models.IntegerField(default=1)
    badges = models.TextField(default="[]") # JSON list of strings
    completedLessons = models.TextField(default="[]") # JSON list of integers

    def __str__(self):
        return f"{self.fullName} ({self.user.username})"
