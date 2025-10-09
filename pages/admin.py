from django.contrib import admin
from .models import ContactMessage, FAQ, Footer

admin.site.register(ContactMessage)
admin.site.register(FAQ)
admin.site.register(Footer)
