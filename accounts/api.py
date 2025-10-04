from rest_framework import serializers, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone
from datetime import timedelta
import random

from .models import CustomUser

OTP_EXPIRATION_MINUTES = 10

# -------------------- SERIALIZER --------------------
class UserSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'phone', 'is_verified', 'image', 'profile']

    def get_profile(self, obj):
        if obj.image:
            return obj.image.url
        return getattr(obj, 'profile_placeholder', None)


# -------------------- HELPER FUNCTIONS --------------------
def generate_otp():
    return random.randint(1000, 9999)


def send_otp_email(email, otp):
    try:
        subject = 'Your OTP Code'
        message = f'Your OTP code is {otp}. It is valid for {OTP_EXPIRATION_MINUTES} minutes.'
        send_mail(subject, message, settings.EMAIL_HOST_USER, [email])
    except Exception as e:
        print(f"Email error: {e}")


def otp_is_valid(user):
    if not getattr(user, 'otp_created_at', None):
        return False
    return timezone.now() <= user.otp_created_at + timedelta(minutes=OTP_EXPIRATION_MINUTES)


# -------------------- REGISTER --------------------
@api_view(['POST'])
@permission_classes([AllowAny])
def register_api(request):
    data = request.data
    name = data.get('name')
    email = data.get('email')
    phone = data.get('phone')
    password = data.get('password')
    confirm_password = data.get('confirm_password')

    # Check all fields
    if not all([name, email, phone, password, confirm_password]):
        return Response({'error': 'All fields are required.'}, status=status.HTTP_400_BAD_REQUEST)

    # Validate email format
    try:
        validate_email(email)
    except ValidationError:
        return Response({'error': 'Invalid email format.'}, status=status.HTTP_400_BAD_REQUEST)

    # Check email exists
    if CustomUser.objects.filter(email=email).exists():
        return Response({'error': 'Email already registered.'}, status=status.HTTP_400_BAD_REQUEST)

    # Password checks
    if password != confirm_password:
        return Response({'error': 'Passwords do not match.'}, status=status.HTTP_400_BAD_REQUEST)
    if len(password) < 6:
        return Response({'error': 'Password must be at least 6 characters.'}, status=status.HTTP_400_BAD_REQUEST)

    # Create user
    otp = generate_otp()
    user = CustomUser.objects.create_user(username=name, email=email, phone=phone, password=password, otp=otp)
    user.otp_created_at = timezone.now()
    user.save()
    send_otp_email(email, otp)

    return Response({'message': 'Registration successful. OTP sent to email.', 'user_id': user.id}, status=status.HTTP_201_CREATED)


# -------------------- VERIFY OTP --------------------
@api_view(['POST'])
@permission_classes([AllowAny])
def verify_otp_api(request):
    otp = request.data.get('otp')
    user_id = request.data.get('user_id')

    if not otp or not user_id:
        return Response({'error': 'OTP and user ID are required.'}, status=status.HTTP_400_BAD_REQUEST)

    user = CustomUser.objects.filter(id=user_id, otp=otp).first()
    if not user:
        return Response({'error': 'Invalid OTP or user.'}, status=status.HTTP_400_BAD_REQUEST)

    if not otp_is_valid(user):
        return Response({'error': 'OTP expired.'}, status=status.HTTP_400_BAD_REQUEST)

    user.is_verified = True
    user.otp = None
    user.otp_created_at = None
    user.save()
    login(request, user)
    serializer = UserSerializer(user, context={'request': request})
    return Response({'message': 'OTP verified. Login successful.', 'user': serializer.data}, status=status.HTTP_200_OK)


# -------------------- LOGIN --------------------
@api_view(['POST'])
@permission_classes([AllowAny])
def login_api(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({'error': 'Email and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(request, email=email, password=password)
    if user:
        if not user.is_verified:
            return Response({'error': 'Account not verified.'}, status=status.HTTP_400_BAD_REQUEST)
        login(request, user)
        serializer = UserSerializer(user, context={'request': request})
        return Response({'message': 'Login successful.', 'user': serializer.data}, status=status.HTTP_200_OK)

    if not CustomUser.objects.filter(email=email).exists():
        return Response({'error': 'Email is not valid.'}, status=status.HTTP_400_BAD_REQUEST)

    return Response({'error': 'Invalid email or password.'}, status=status.HTTP_400_BAD_REQUEST)


# -------------------- LOGOUT --------------------
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_api(request):
    logout(request)
    return Response({'message': 'Logout successful.'}, status=status.HTTP_200_OK)


# -------------------- FORGOT PASSWORD --------------------
@api_view(['POST'])
@permission_classes([AllowAny])
def forgot_password_api(request):
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required.'}, status=status.HTTP_400_BAD_REQUEST)

    # Validate email format
    try:
        validate_email(email)
    except ValidationError:
        return Response({'error': 'Invalid email format.'}, status=status.HTTP_400_BAD_REQUEST)

    user = CustomUser.objects.filter(email=email).first()
    if not user:
        return Response({'error': 'Email not found.'}, status=status.HTTP_404_NOT_FOUND)

    otp = generate_otp()
    user.otp = otp
    user.otp_created_at = timezone.now()
    user.save()
    send_otp_email(email, otp)

    return Response({'message': 'OTP sent to email.', 'user_id': user.id}, status=status.HTTP_200_OK)


# -------------------- VERIFY FORGOT OTP --------------------
@api_view(['POST'])
@permission_classes([AllowAny])
def verify_forgot_otp_api(request):
    otp = request.data.get('otp')
    user_id = request.data.get('user_id')

    if not otp or not user_id:
        return Response({'error': 'OTP and user ID are required.'}, status=status.HTTP_400_BAD_REQUEST)

    user = CustomUser.objects.filter(id=user_id, otp=otp).first()
    if not user:
        return Response({'error': 'Invalid OTP or user.'}, status=status.HTTP_400_BAD_REQUEST)

    if not otp_is_valid(user):
        return Response({'error': 'OTP expired.'}, status=status.HTTP_400_BAD_REQUEST)

    user.otp = None
    user.otp_created_at = None
    user.save()
    return Response({'message': 'OTP verified.', 'user_id': user.id}, status=status.HTTP_200_OK)


# -------------------- RESET PASSWORD --------------------
@api_view(['POST'])
@permission_classes([AllowAny])
def reset_password_api(request):
    user_id = request.data.get('user_id')
    new_password = request.data.get('new_password')
    confirm_password = request.data.get('confirm_password')

    if not all([user_id, new_password, confirm_password]):
        return Response({'error': 'All fields are required.'}, status=status.HTTP_400_BAD_REQUEST)
    if new_password != confirm_password:
        return Response({'error': 'Passwords do not match.'}, status=status.HTTP_400_BAD_REQUEST)
    if len(new_password) < 6:
        return Response({'error': 'Password must be at least 6 characters.'}, status=status.HTTP_400_BAD_REQUEST)

    user = CustomUser.objects.filter(id=user_id).first()
    if not user:
        return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

    user.set_password(new_password)
    user.save()
    return Response({'message': 'Password reset successful.'}, status=status.HTTP_200_OK)
