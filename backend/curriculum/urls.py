from django.urls import path
from .views import LessonListCreateView, LessonDeleteView, CompleteLessonView

urlpatterns = [
    path('lessons/', LessonListCreateView.as_view(), name='lessons_list_create'),
    path('lessons/<int:id>/', LessonDeleteView.as_view(), name='lesson_delete'),
    path('lessons/complete/', CompleteLessonView.as_view(), name='complete_lesson'),
]
