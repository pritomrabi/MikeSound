from allauth.account.signals import user_logged_in
from django.dispatch import receiver
from .models import CustomUser

@receiver(user_logged_in)
def mark_social_verified(sender, request, user, **kwargs):
    user.is_verified = True
    user.save()
