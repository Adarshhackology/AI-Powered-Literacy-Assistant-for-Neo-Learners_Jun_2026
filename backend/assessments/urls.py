from django.urls import path
from .views import SubmitAssessmentView, LeaderboardView, AdminProfilesView

urlpatterns = [
    path('submit/', SubmitAssessmentView.as_view(), name='submit_assessment'),
    path('leaderboard/', LeaderboardView.as_view(), name='leaderboard'),
    path('admin/profiles/', AdminProfilesView.as_view(), name='admin_profiles'),
]
