from django.shortcuts import render, redirect
from django.contrib.auth import login as auth_login, logout as auth_logout
from django.contrib import messages
from django.contrib.auth import get_user_model
from .models import CustomUser
from django.core.mail import send_mail
from django.conf import settings
import random

def register(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        password = request.POST.get('password1')
        confirm_password = request.POST.get('password2')

        # Required fields check
        if not name or not email or not phone or not password or not confirm_password:
            messages.error(request, 'All fields are required.')
            return redirect('register')

        if password != confirm_password:
            messages.error(request, 'Passwords do not match.')
            return redirect('register')

        if CustomUser.objects.filter(email=email).exists():
            messages.error(request, 'Email already registered.')
            return redirect('register')

        otp = random.randint(1000, 9999)
        user = CustomUser.objects.create_user(
            username=name, email=email, phone=phone,
            password=password, otp=otp
        )
        user.save()
        send_registration_email(email, otp)
        messages.success(request, 'Registration successful. OTP sent to your email.')
        return redirect('verify_otp')

    return render(request, 'accounts/register.html')


def send_registration_email(email, otp):
    try:
        subject = 'Welcome to MikeSound'
        message = f'Thank you for registering. Your OTP code is {otp}.'
        send_email = settings.EMAIL_HOST_USER
        recipients_list = [email]
        send_mail(subject, message, send_email, recipients_list)
    except Exception as e:
        print(f"Error sending email: {e}")

def verify_otp(request):
    if request.method == 'POST':
        otp = request.POST.get('otp')

        if not otp:
            messages.error(request, 'OTP is required.')
            return redirect('verify_otp')

        user = CustomUser.objects.filter(otp=otp).first()
        if user:
            user.is_verified = True
            user.otp = None
            user.save()

            auth_login(request, user)
            messages.success(request, 'Registration successful. Welcome!')
            return redirect('/')
        else:
            messages.error(request, 'Invalid OTP. Please try again.')
            return redirect('verify_otp')

    return render(request, 'accounts/otp_verify.html')


def login_view(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        if not email or not password:
            messages.error(request, 'Email and password are required.')
            return redirect('login')

        User = get_user_model()
        try:
            user = User.objects.get(email=email)
            if user.check_password(password):
                if user.is_verified:
                    user.backend = 'accounts.backends.EmailBackend'
                    auth_login(request, user)
                    messages.success(request, 'Login successful.')
                    return redirect('/')
                else:
                    messages.error(request, 'Your account is not verified. Please check your email for OTP.')
            else:
                messages.error(request, 'Invalid email or password.')
        except User.DoesNotExist:
            messages.error(request, 'Invalid email or password.')

    return render(request, 'accounts/login.html')



def logout_view(request):
    auth_logout(request)
    messages.success(request, 'Logout successful.')
    return redirect('login')


def forgot_password(request):
    if request.method == 'POST':
        email = request.POST.get('email')

        if not email:
            messages.error(request, 'Email is required.')
            return redirect('forgot_password')

        try:
            user = CustomUser.objects.get(email=email)
            otp = random.randint(1000, 9999)
            user.otp = otp
            user.save()
            send_registration_email(email, otp)
            messages.success(request, 'OTP sent to your email.')
            return redirect('forgot_otp')
        except CustomUser.DoesNotExist:
            messages.error(request, 'Email not found.')

    return render(request, 'accounts/forgot_password.html')


def forgot_otp(request):
    if request.method == 'POST':
        otp = request.POST.get('otp')

        if not otp:
            messages.error(request, 'OTP is required.')
            return redirect('forgot_otp')

        user = CustomUser.objects.filter(otp=otp).first()
        if user:
            request.session['reset_user_id'] = user.id
            user.otp = None
            user.save()
            return redirect('reset_password')
        else:
            messages.error(request, 'Invalid OTP. Please try again.')
            return redirect('forgot_otp')

    return render(request, 'accounts/forgot_otp.html')


def reset_password(request):
    user_id = request.session.get('reset_user_id')
    if not user_id:
        messages.error(request, "Session expired. Please restart the password reset process.")
        return redirect('forgot_password')

    user = CustomUser.objects.filter(id=user_id).first()
    if not user:
        messages.error(request, "User not found.")
        return redirect('forgot_password')

    if request.method == 'POST':
        pass1 = request.POST.get('new_password1')
        pass2 = request.POST.get('new_password2')

        if not pass1 or not pass2:
            messages.error(request, 'Password fields cannot be empty.')
            return redirect('reset_password')

        if pass1 != pass2:
            messages.error(request, 'Passwords do not match.')
            return redirect('reset_password')

        user.set_password(pass1)
        user.save()

        request.session.pop('reset_user_id', None)
        messages.success(request, 'Password reset successful. You can now log in.')
        return redirect('login')

    return render(request, 'accounts/reset_password.html')
