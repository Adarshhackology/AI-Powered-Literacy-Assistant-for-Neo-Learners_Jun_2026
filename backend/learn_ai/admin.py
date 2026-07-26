from django.contrib import admin
from .models import AISession, AIAssessmentResult, AILearningModule, AIQuestionResponse

@admin.register(AISession)
class AISessionAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'language', 'status', 'created_at')
    list_filter = ('language', 'status')
    search_fields = ('user__username', 'language')

@admin.register(AIAssessmentResult)
class AIAssessmentResultAdmin(admin.ModelAdmin):
    list_display = ('id', 'session', 'assessment_type', 'overall_score', 'level', 'created_at')
    list_filter = ('assessment_type', 'level')

@admin.register(AILearningModule)
class AILearningModuleAdmin(admin.ModelAdmin):
    list_display = ('id', 'session', 'skill', 'status', 'score', 'created_at')
    list_filter = ('skill', 'status')

@admin.register(AIQuestionResponse)
class AIQuestionResponseAdmin(admin.ModelAdmin):
    list_display = ('id', 'module', 'question_index', 'is_correct', 'score', 'created_at')
    list_filter = ('is_correct',)
