from django.urls import path
from .views import (
    RegisterView, LoginView, SaveProfileView, GetProfileView, GoogleLoginView,
    SavePushSubscriptionView, TestEmailView, TestPushView
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('google-login/', GoogleLoginView.as_view(), name='google_login'),
    path('profile/save/', SaveProfileView.as_view(), name='save_profile'),
    path('profile/<str:username>/', GetProfileView.as_view(), name='get_profile'),
    path('push-subscribe/', SavePushSubscriptionView.as_view(), name='push_subscribe'),
    path('test-email/', TestEmailView.as_view(), name='test_email'),
    path('test-push/', TestPushView.as_view(), name='test_push'),
]

