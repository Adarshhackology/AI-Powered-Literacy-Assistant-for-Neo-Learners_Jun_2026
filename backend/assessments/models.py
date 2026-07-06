from django.db import models
from django.conf import settings

class AssessmentResult(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='assessments')
    readingScore = models.IntegerField(default=0)
    writingScore = models.IntegerField(default=0)
    comprehensionScore = models.IntegerField(default=0)
    overallScore = models.IntegerField(default=0)
    completedAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.overallScore}% ({self.completedAt})"
