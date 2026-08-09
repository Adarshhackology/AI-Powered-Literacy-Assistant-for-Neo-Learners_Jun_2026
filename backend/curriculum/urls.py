from django.urls import path
from .views import LessonListCreateView, LessonDeleteView, CompleteLessonView, GenerateAILessonView

urlpatterns = [
    path('lessons/', LessonListCreateView.as_view(), name='lessons_list_create'),
    path('lessons/generate/', GenerateAILessonView.as_view(), name='lesson_generate_ai'),
    path('lessons/<int:id>/', LessonDeleteView.as_view(), name='lesson_delete'),
    path('lessons/complete/', CompleteLessonView.as_view(), name='complete_lesson'),
]
