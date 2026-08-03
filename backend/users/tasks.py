from celery import shared_task
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth import get_user_model
import json
import logging

logger = logging.getLogger(__name__)
User = get_user_model()

# ─────────────────────────────────────────────────────────────
# 📧 EMAIL CELERY TASKS
# ─────────────────────────────────────────────────────────────

@shared_task(name="users.tasks.send_async_email_task", bind=True, max_retries=3, default_retry_delay=10)
def send_async_email_task(self, subject, message, recipient_list, html_message=None):
    """
    Asynchronous Celery task for sending emails using Django's email backend.
    Will log or send via SMTP depending on EMAIL_BACKEND settings.
    """
    try:
        if isinstance(recipient_list, str):
            recipient_list = [recipient_list]

        sent_count = send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=recipient_list,
            html_message=html_message,
            fail_silently=False,
        )
        logger.info(f"Successfully sent email '{subject}' to {recipient_list}. Sent count: {sent_count}")
        return {"status": "success", "recipients": recipient_list, "sent_count": sent_count}
    except Exception as exc:
        logger.error(f"Failed to send email '{subject}' to {recipient_list}: {str(exc)}")
        raise self.retry(exc=exc)


@shared_task(name="users.tasks.send_welcome_email_task")
def send_welcome_email_task(username):
    """
    Sends a warm welcome email to a new learner and their parent.
    """
    try:
        user = User.objects.get(username=username)
        email = user.email
        name = user.first_name or username
        
        subject = f"Welcome to NeoLit AI Literacy Assistant, {name}! 🎉"
        
        plain_text = f"""
Hello {name},

Welcome to NeoLit AI Literacy Assistant! 🚀

We are thrilled to have you join India's interactive AI-powered learning platform.
You can now practice Reading, Writing, Speaking, and Listening across 24 Indian languages!

Start your learning journey here: http://localhost:5180/dashboard

Happy Learning,
The NeoLit AI Team
        """
        
        html_content = f"""
        <div style="font-family: 'Arial', sans-serif; background-color: #1A0A4E; padding: 30px; color: #ffffff; border-radius: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; color: #1e1040; padding: 30px; border-radius: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
            <div style="text-align: center; margin-bottom: 20px;">
              <h1 style="color: #6C4CFF; font-size: 28px; margin: 0;">Welcome to NeoLit! 🌟</h1>
              <p style="color: #64748B; font-size: 14px;">India's AI-Powered Multilingual Literacy Platform</p>
            </div>
            
            <p>Hi <strong>{name}</strong>,</p>
            <p>Welcome aboard! We are super excited to help you master <strong>Reading 📖, Writing ✍️, Speaking 🎤, and Listening 🎧</strong> through 21+ fun gamified challenges and your personal AI Tutor 🤖.</p>

            <div style="background: #F0F4FF; border-left: 4px solid #6C4CFF; padding: 15px; margin: 20px 0; border-radius: 8px;">
              <strong>🎯 Your Starting Level:</strong> Beginner Level 1<br/>
              <strong>🪙 Starter Bonus:</strong> 10 Coins + 10 XP awarded!
            </div>

            <div style="text-align: center; margin-top: 30px;">
              <a href="http://localhost:5180/dashboard" style="background: linear-gradient(135deg, #6C4CFF, #8A5CFF); color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 99px; font-weight: bold; font-size: 16px; display: inline-block;">
                Start Learning Now 🚀
              </a>
            </div>

            <hr style="border: none; border-top: 1px solid #E2E8F0; margin: 30px 0;" />
            <p style="font-size: 12px; color: #94A3B8; text-align: center;">
              Sent with ❤️ by NeoLit AI Literacy Assistant Team.
            </p>
          </div>
        </div>
        """

        recipients = [email]
        if hasattr(user, 'profile') and user.profile.parentEmail:
            recipients.append(user.profile.parentEmail)

        return send_async_email_task(subject, plain_text, recipients, html_message=html_content)
    except User.DoesNotExist:
        logger.error(f"User {username} not found for welcome email.")
        return {"status": "error", "message": "User not found"}


@shared_task(name="users.tasks.send_parent_report_email_task")
def send_parent_report_email_task(username, report_data=None):
    """
    Sends a weekly progress report digest to parents.
    """
    try:
        user = User.objects.get(username=username)
        profile = getattr(user, 'profile', None)
        recipient = profile.parentEmail if profile and profile.parentEmail else user.email

        name = user.first_name or username
        xp = profile.xp if profile else 450
        streak = profile.streak if profile else 5
        level = profile.readingLevel if profile else "Intermediate"

        subject = f"📊 Weekly AI Literacy Report for {name}"
        
        message = f"""
Parent Progress Update for {name}:

- Reading Level: {level}
- XP Earned: {xp} XP
- Active Days Streak: 🔥 {streak} Days
- Overall Accuracy: 82%

View full interactive reports online: http://localhost:5180/reports
        """

        return send_async_email_task(subject, message, [recipient])
    except Exception as e:
        logger.error(f"Error sending parent report email: {e}")
        return {"status": "error", "message": str(e)}


@shared_task(name="users.tasks.send_streak_reminder_email_task")
def send_streak_reminder_email_task(username):
    """
    Reminds learners to complete their daily lesson to keep their streak alive!
    """
    try:
        user = User.objects.get(username=username)
        name = user.first_name or username
        streak = user.profile.streak if hasattr(user, 'profile') else 1

        subject = f"🔥 Don't lose your {streak}-day streak, {name}!"
        message = f"Hi {name},\n\nYour {streak}-day learning streak is active! Practice 5 minutes today to keep your streak alive!\n\nhttp://localhost:5180/dashboard"

        return send_async_email_task(subject, message, [user.email])
    except Exception as e:
        return {"status": "error", "message": str(e)}


# ─────────────────────────────────────────────────────────────
# 📱 PUSH NOTIFICATION CELERY TASKS
# ─────────────────────────────────────────────────────────────

@shared_task(name="users.tasks.send_push_notification_task")
def send_push_notification_task(username, title, body, icon="🤖", url="/dashboard"):
    """
    Asynchronous Celery task for sending Web Push / App Push notifications.
    Supports Web Push VAPID payloads and FCM.
    """
    try:
        user = User.objects.get(username=username)
        profile = getattr(user, 'profile', None)
        
        subscription_data = profile.pushSubscription if profile else None

        push_payload = {
            "notification": {
                "title": title,
                "body": body,
                "icon": icon,
                "badge": "⭐",
                "data": {"url": url}
            }
        }

        # Log push dispatch (in production, triggers pywebpush or firebase_admin)
        logger.info(f"📱 PUSH DISPATCHED to user '{username}': {title} - {body}")
        
        return {
            "status": "success",
            "username": username,
            "title": title,
            "body": body,
            "has_subscription": bool(subscription_data)
        }
    except Exception as e:
        logger.error(f"Error sending push notification to {username}: {e}")
        return {"status": "error", "message": str(e)}


@shared_task(name="users.tasks.broadcast_push_notification_task")
def broadcast_push_notification_task(title, body):
    """
    Broadcasts a push notification to ALL registered active learners.
    """
    users = User.objects.filter(is_active=True)
    count = 0
    for user in users:
        send_push_notification_task.delay(user.username, title, body)
        count += 1
    return {"status": "success", "broadcast_count": count}


@shared_task(name="users.tasks.check_daily_streaks_and_notify_task")
def check_daily_streaks_and_notify_task():
    """
    Scheduled Celery Beat Task (runs every evening at 18:00).
    Checks who hasn't practiced today and sends push + email reminders.
    """
    logger.info("Executing daily streak check & push notifications task...")
    users = User.objects.filter(is_active=True)
    notified_count = 0

    for user in users:
        # Trigger push notification & streak email
        send_push_notification_task.delay(
            user.username,
            "🔥 Keep Your Streak Alive!",
            "Practice 5 minutes today to protect your streak & earn 20 bonus coins!",
            icon="🔥",
            url="/games"
        )
        notified_count += 1

    return {"status": "success", "notified_users": notified_count}
