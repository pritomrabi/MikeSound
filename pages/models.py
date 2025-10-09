from django.db import models

# Contact Messages
class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=11, blank=True, null=True)
    subject = models.CharField(max_length=150)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.subject}"

# FAQs
class FAQ(models.Model):
    question = models.CharField(max_length=255)
    answer = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.question

# Footer
class Footer(models.Model):
    brand_logo = models.ImageField(upload_to="footer/", blank=True, null=True)
    description = models.TextField(blank=True)
    email = models.EmailField(default="eurosespabd@gmail.com")
    phone = models.CharField(max_length=20, default="+8801911552077")
    location = models.CharField(max_length=255, default="Dhaka, Bangladesh")
    facebook = models.URLField(blank=True, null=True)
    whatsapp = models.URLField(blank=True, null=True)
    messenger = models.URLField(blank=True, null=True)
    phone_link = models.CharField(max_length=20, blank=True, null=True)
    copyright = models.CharField(
        max_length=255,
        default="© 2025 Mike Sound Vai. All Rights Reserved."
    )

    def __str__(self):
        return "Footer Settings"
