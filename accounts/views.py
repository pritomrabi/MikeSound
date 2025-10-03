from django.shortcuts import redirect
from django.contrib.auth import login as auth_login, logout as auth_logout
from django.contrib.auth import get_user_model
from .models import CustomUser
from django.core.mail import send_mail
from django.conf import settings
import random
from django.http import JsonResponse

User = get_user_model()

def send_registration_email(email, otp):
    try:
        subject = 'MikeSound OTP Verification'
        message = f'Your OTP code is {otp}.'
        send_mail(subject, message, settings.EMAIL_HOST_USER, [email])
    except Exception as e:
        print(f"Error sending email: {e}")


def register(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Invalid request method.'}, status=405)

    name = request.POST.get('name')
    email = request.POST.get('email')
    phone = request.POST.get('phone')
    password = request.POST.get('password1')
    confirm_password = request.POST.get('password2')

    if not name or not email or not phone or not password or not confirm_password:
        return JsonResponse({'error': 'All fields are required.'}, status=400)

    if password != confirm_password:
        return JsonResponse({'error': 'Passwords do not match.'}, status=400)

    if len(password) < 6:
        return JsonResponse({'error': 'Password must be at least 6 characters.'}, status=400)

    if CustomUser.objects.filter(email=email).exists():
        return JsonResponse({'error': 'Email already registered.'}, status=400)

    otp = random.randint(1000, 9999)
    user = CustomUser.objects.create_user(
        username=name, email=email, phone=phone, password=password, otp=otp
    )
    user.save()
    send_registration_email(email, otp)

    return JsonResponse({'success': 'Registration successful. OTP sent to email.'}, status=201)


def verify_otp(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Invalid request method.'}, status=405)

    otp = request.POST.get('otp')
    if not otp:
        return JsonResponse({'error': 'OTP is required.'}, status=400)

    user = CustomUser.objects.filter(otp=otp).first()
    if not user:
        return JsonResponse({'error': 'Invalid OTP.'}, status=400)

    user.is_verified = True
    user.otp = None
    user.save()
    auth_login(request, user)
    return JsonResponse({'success': 'OTP verified. Login successful.'}, status=200)


def login_view(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Invalid request method.'}, status=405)

    email = request.POST.get('email')
    password = request.POST.get('password')

    if not email or not password:
        return JsonResponse({'error': 'Email and password required.'}, status=400)

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return JsonResponse({'error': 'Email is not valid.'}, status=400)

    if not user.check_password(password):
        return JsonResponse({'error': 'Invalid password.'}, status=400)

    if not user.is_verified:
        return JsonResponse({'error': 'Account not verified. Check your email for OTP.'}, status=400)

    user.backend = 'accounts.backends.EmailBackend'
    auth_login(request, user)
    return JsonResponse({'success': 'Login successful.'}, status=200)


def logout_view(request):
    auth_logout(request)
    return JsonResponse({'success': 'Logout successful.'}, status=200)


def forgot_password(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Invalid request method.'}, status=405)

    email = request.POST.get('email')
    if not email:
        return JsonResponse({'error': 'Email is required.'}, status=400)

    try:
        user = CustomUser.objects.get(email=email)
    except CustomUser.DoesNotExist:
        return JsonResponse({'error': 'Email not found.'}, status=400)

    otp = random.randint(1000, 9999)
    user.otp = otp
    user.save()
    send_registration_email(email, otp)
    return JsonResponse({'success': 'OTP sent to email.'}, status=200)


def forgot_otp(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Invalid request method.'}, status=405)

    otp = request.POST.get('otp')
    if not otp:
        return JsonResponse({'error': 'OTP is required.'}, status=400)

    user = CustomUser.objects.filter(otp=otp).first()
    if not user:
        return JsonResponse({'error': 'Invalid OTP.'}, status=400)

    request.session['reset_user_id'] = user.id
    user.otp = None
    user.save()
    return JsonResponse({'success': 'OTP verified. Proceed to reset password.'}, status=200)


def reset_password(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Invalid request method.'}, status=405)

    user_id = request.session.get('reset_user_id')
    if not user_id:
        return JsonResponse({'error': 'Session expired. Restart password reset process.'}, status=400)

    user = CustomUser.objects.filter(id=user_id).first()
    if not user:
        return JsonResponse({'error': 'User not found.'}, status=400)

    pass1 = request.POST.get('new_password1')
    pass2 = request.POST.get('new_password2')

    if not pass1 or not pass2:
        return JsonResponse({'error': 'Password fields cannot be empty.'}, status=400)

    if pass1 != pass2:
        return JsonResponse({'error': 'Passwords do not match.'}, status=400)

    if len(pass1) < 6:
        return JsonResponse({'error': 'Password must be at least 6 characters.'}, status=400)

    user.set_password(pass1)
    user.save()
    request.session.pop('reset_user_id', None)
    return JsonResponse({'success': 'Password reset successful.'}, status=200)
