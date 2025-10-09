from rest_framework import serializers
from .models import ContactMessage, FAQ, Footer

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'phone', 'subject', 'message', 'created_at']

class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = ['question', 'answer', 'created_at']

class FooterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Footer
        fields = "__all__"
