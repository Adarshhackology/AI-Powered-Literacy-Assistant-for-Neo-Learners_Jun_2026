from django.db import models

class Lesson(models.Model):
    title = models.CharField(max_length=150)
    difficulty = models.CharField(max_length=50) # Beginner, Intermediate, Advanced
    time = models.CharField(max_length=50) # e.g. "10 mins"
    category = models.CharField(max_length=100) # e.g. "Reading", "Writing", "Speaking"
    content = models.TextField()
    audioText = models.TextField(null=True, blank=True)
    examples = models.TextField(default="[]") # JSON list of example strings

    def __str__(self):
        return self.title
