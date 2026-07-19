from django.db import models
from django.conf import settings

class Curriculum(models.Model):
    level = models.CharField(max_length=50, unique=True) # e.g. Beginner, Intermediate, Advanced

    def __str__(self):
        return self.level

class Lesson(models.Model):
    curriculum = models.ForeignKey(Curriculum, on_delete=models.CASCADE, related_name='lessons', null=True, blank=True)
    title = models.CharField(max_length=150)
    difficulty = models.CharField(max_length=50) # Beginner, Intermediate, Advanced
    time = models.CharField(max_length=50) # e.g. "10 mins"
    category = models.CharField(max_length=100) # e.g. "Reading", "Writing", "Speaking", "Vocabulary"
    content = models.TextField()
    audioText = models.TextField(null=True, blank=True)
    imageUrl = models.CharField(max_length=300, null=True, blank=True) # Optional URL or path to illustration image
    examples = models.TextField(default="[]") # JSON list of example strings

    def __str__(self):
        return self.title

class LessonContent(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name='contents')
    language = models.CharField(max_length=50) # e.g. English, Hindi, Telugu, Tamil, Kannada, Bengali, Marathi, Gujarati, Punjabi
    content = models.TextField()

    def __str__(self):
        return f"{self.lesson.title} - {self.language}"

class LearningPath(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='learning_paths')
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    status = models.CharField(max_length=50, default="Pending") # Pending, Completed

    def __str__(self):
        return f"{self.user.username} - {self.lesson.title} ({self.status})"

