from rest_framework import serializers
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField()
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'phone', 'is_verified', 'image', 'profile']

    def get_profile(self, obj):
        if obj.image:
            return obj.image.url
        return obj.profile_placeholder
