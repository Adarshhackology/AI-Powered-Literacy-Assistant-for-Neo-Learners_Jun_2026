from django.urls import path
from .views import (
    UploadSpeechView,
    EvaluatePronunciationView,
    GetSpeechHistoryView,
    GetDashboardOverviewView,
    GamificationView,
    GetLeaderboardView,
    GenerateAIReportView
)

urlpatterns = [
    path('speech/upload/', UploadSpeechView.as_view(), name='speech-upload'),
    path('speech/evaluate-pronunciation/', EvaluatePronunciationView.as_view(), name='evaluate-pronunciation'),
    path('speech/history/<str:username>/', GetSpeechHistoryView.as_view(), name='speech-history'),
    path('dashboard/overview/<str:username>/', GetDashboardOverviewView.as_view(), name='dashboard-overview'),
    path('gamification/<str:username>/', GamificationView.as_view(), name='gamification-get'),
    path('gamification/claim-reward/', GamificationView.as_view(), name='gamification-claim'),
    path('gamification/leaderboard/', GetLeaderboardView.as_view(), name='leaderboard'),
    path('reports/generate-ai-recommendations/', GenerateAIReportView.as_view(), name='generate-ai-reports'),
]
