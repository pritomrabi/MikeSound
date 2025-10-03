from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import authenticate, login, logout
from .models import CustomUser
from .serializers import UserSerializer
import random
from django.core.mail import send_mail
from django.conf import settings

def send_otp_email(email, otp):
    try:
        subject = 'Your OTP Code'
        message = f'Your OTP code is {otp}.'
        send_mail(subject, message, settings.EMAIL_HOST_USER, [email])
    except Exception as e:
        print(f"Email error: {e}")


@api_view(['POST'])
@permission_classes([AllowAny])
def register_api(request):
    data = request.data
    name = data.get('name')
    email = data.get('email')
    phone = data.get('phone')
    password = data.get('password')
    confirm_password = data.get('confirm_password')

    if not all([name, email, phone, password, confirm_password]):
        return Response({'error': 'All fields are required.'}, status=400)
    if password != confirm_password:
        return Response({'error': 'Passwords do not match.'}, status=400)
    if CustomUser.objects.filter(email=email).exists():
        return Response({'error': 'Email already registered.'}, status=400)

    otp = random.randint(1000, 9999)
    user = CustomUser.objects.create_user(username=name, email=email, phone=phone, password=password, otp=otp)
    user.save()
    send_otp_email(email, otp)
    return Response({'message': 'Registration successful. OTP sent to email.', 'user_id': user.id})


@api_view(['POST'])
@permission_classes([AllowAny])
def verify_otp_api(request):
    data = request.data
    otp = data.get('otp')

    if not otp:
        return Response({'error': 'OTP required.'}, status=400)

    user = CustomUser.objects.filter(otp=otp).first()
    if user:
        user.is_verified = True
        user.otp = None
        user.save()
        login(request, user)
        serializer = UserSerializer(user, context={'request': request})
        return Response({'message': 'OTP verified. Login successful.', 'user': serializer.data})
    return Response({'error': 'Invalid OTP.'}, status=400)


@api_view(['POST'])
@permission_classes([AllowAny])
def login_api(request):
    data = request.data
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return Response({'error': 'Email and password required.'}, status=400)

    user = authenticate(request, email=email, password=password)
    if user:
        if user.is_verified:
            login(request, user)
            serializer = UserSerializer(user, context={'request': request})
            return Response({'message': 'Login successful.', 'user': serializer.data})
        return Response({'error': 'Account not verified.'}, status=400)
    return Response({'error': 'Invalid email or password.'}, status=400)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_api(request):
    logout(request)
    return Response({'message': 'Logout successful.'})


@api_view(['POST'])
@permission_classes([AllowAny])
def forgot_password_api(request):
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email required.'}, status=400)
    try:
        user = CustomUser.objects.get(email=email)
        otp = random.randint(1000, 9999)
        user.otp = otp
        user.save()
        send_otp_email(email, otp)
        return Response({'message': 'OTP sent to email.', 'user_id': user.id})
    except CustomUser.DoesNotExist:
        return Response({'error': 'Email not found.'}, status=404)


@api_view(['POST'])
@permission_classes([AllowAny])
def verify_forgot_otp_api(request):
    otp = request.data.get('otp')
    if not otp:
        return Response({'error': 'OTP required.'}, status=400)
    user = CustomUser.objects.filter(otp=otp).first()
    if user:
        user.otp = None
        user.save()
        return Response({'message': 'OTP verified.', 'user_id': user.id})
    return Response({'error': 'Invalid OTP.'}, status=400)


@api_view(['POST'])
@permission_classes([AllowAny])
def reset_password_api(request):
    user_id = request.data.get('user_id')
    new_password = request.data.get('new_password')
    confirm_password = request.data.get('confirm_password')

    if not all([user_id, new_password, confirm_password]):
        return Response({'error': 'All fields are required.'}, status=400)
    if new_password != confirm_password:
        return Response({'error': 'Passwords do not match.'}, status=400)

    user = CustomUser.objects.filter(id=user_id).first()
    if not user:
        return Response({'error': 'User not found.'}, status=404)

    user.set_password(new_password)
    user.save()
    return Response({'message': 'Password reset successful.'})
