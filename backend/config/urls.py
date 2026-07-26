from django.contrib import admin
from django.urls import path, include
from curriculum.views import (
    CurriculumListCreateView, GetLessonsByCurriculumView, 
    GenerateRecommendationView, SaveLearningPathView
)
from assessments.views import SubmitAssessmentView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),
    path('api/curriculum/', include('curriculum.urls')),
    path('api/assessments/', include('assessments.urls')),

    # Module 2 specific API endpoints
    path('api/curriculum', CurriculumListCreateView.as_view(), name='api_curriculum'),
    path('api/curriculum/', CurriculumListCreateView.as_view()),
    path('api/lessons/<int:curriculum_id>', GetLessonsByCurriculumView.as_view(), name='api_get_lessons'),
    path('api/lessons/<int:curriculum_id>/', GetLessonsByCurriculumView.as_view()),
    path('api/assessment', SubmitAssessmentView.as_view(), name='api_save_assessment'),
    path('api/assessment/', SubmitAssessmentView.as_view()),
    path('api/recommend', GenerateRecommendationView.as_view(), name='api_recommend'),
    path('api/recommend/', GenerateRecommendationView.as_view()),
    path('api/learning-path', SaveLearningPathView.as_view(), name='api_learning_path'),
    path('api/learning-path/', SaveLearningPathView.as_view()),
    path('api/learn-ai/', include('learn_ai.urls')),
]

