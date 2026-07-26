from django.urls import path
from .views import (
    StartSessionView, GenerateAssessmentView, SubmitAssessmentView,
    GenerateModulesView, SubmitAnswerView, CompleteModuleView,
    GenerateRetestView, SubmitRetestView, GetSessionView, GetHistoryView
)

urlpatterns = [
    path('start-session/', StartSessionView.as_view(), name='start_session'),
    path('generate-assessment/', GenerateAssessmentView.as_view(), name='generate_assessment'),
    path('submit-assessment/', SubmitAssessmentView.as_view(), name='submit_assessment'),
    path('generate-modules/', GenerateModulesView.as_view(), name='generate_modules'),
    path('submit-answer/', SubmitAnswerView.as_view(), name='submit_answer'),
    path('complete-module/', CompleteModuleView.as_view(), name='complete_module'),
    path('generate-retest/', GenerateRetestView.as_view(), name='generate_retest'),
    path('submit-retest/', SubmitRetestView.as_view(), name='submit_retest'),
    path('session/<int:session_id>/', GetSessionView.as_view(), name='get_session'),
    path('history/<str:username>/', GetHistoryView.as_view(), name='get_history'),
]
