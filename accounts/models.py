from django.contrib.auth.models import AbstractUser
from django.db import models
import random

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=11, blank=True, null=True)
    image = models.ImageField(upload_to='profile_images/', blank=True, null=True)
    is_verified = models.BooleanField(default=False)
    otp = models.CharField(max_length=4, blank=True, null=True)

    def __str__(self):
        return self.username

    @property
    def profile_placeholder(self):
        if self.image:
            return self.image.url
        first_letter = self.username[0].upper() if self.username else "U"
        colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FFC300"]
        color = random.choice(colors)
        return {"letter": first_letter, "color": color}
