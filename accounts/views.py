from django.shortcuts import render, redirect
from django.contrib.auth import login as auth_login, get_user_model, logout as auth_logout
from django.contrib import messages
from django.core.mail import send_mail
from django.conf import settings
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
import random
from .models import CustomUser


# ---------- REGISTER ----------
def register(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        password = request.POST.get('password1')
        confirm_password = request.POST.get('password2')

        # Empty fields check
        if not name or not email or not phone or not password or not confirm_password:
            messages.error(request, 'All fields are required.')
            return render(request, 'accounts/register.html')

        # Email format check
        try:
            validate_email(email)
        except ValidationError:
            messages.error(request, 'Enter a valid email address.')
            return render(request, 'accounts/register.html')

        # Email already exists
        if CustomUser.objects.filter(email=email).exists():
            messages.error(request, 'This email is already registered.')
            return render(request, 'accounts/register.html')

        # Password length
        if len(password) < 6:
            messages.error(request, 'Password must be at least 6 characters long.')
            return render(request, 'accounts/register.html')

        # Password match
        if password != confirm_password:
            messages.error(request, 'Passwords do not match.')
            return render(request, 'accounts/register.html')

        # Create user with OTP
        otp = random.randint(1000, 9999)
        user = CustomUser.objects.create_user(
            username=name,
            email=email,
            phone=phone,
            password=password,
            otp=otp
        )
        user.save()
        send_registration_email(email, otp)
        messages.success(request, 'Account created. Check your email for OTP.')
        return redirect('verify_otp')

    return render(request, 'accounts/register.html')


# ---------- SEND OTP EMAIL ----------
def send_registration_email(email, otp):
    try:
        subject = 'Welcome to MikeSound'
        message = f'Thank you for registering. Your OTP code is {otp}.'
        send_email = settings.EMAIL_HOST_USER
        recipients_list = [email]
        send_mail(subject, message, send_email, recipients_list)
    except Exception as e:
        print(f"Error sending email: {e}")


# ---------- VERIFY OTP ----------
def verify_otp(request):
    if request.method == 'POST':
        otp = request.POST.get('otp')
        if otp:
            user = CustomUser.objects.filter(otp=otp).first()
            if user:
                user.is_verified = True
                user.otp = None
                user.save()
                messages.success(request, 'Registration successful. You can now log in.')
                return redirect('login')
            else:
                messages.error(request, 'Invalid OTP. Please try again.')
        else:
            messages.error(request, 'OTP is required.')
    return render(request, 'accounts/otp_verify.html')


# ---------- LOGIN ----------
def login_view(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        if not email or not password:
            messages.error(request, 'Email and password are required.')
            return render(request, 'accounts/login.html')

        User = get_user_model()
        try:
            user = User.objects.get(email=email)
            if user.check_password(password):
                if user.is_verified:
                    user.backend = 'django.contrib.auth.backends.ModelBackend'
                    auth_login(request, user)
                    messages.success(request, 'Login successful.')
                    return redirect('/')
                else:
                    messages.error(request, 'Your account is not verified.')
            else:
                messages.error(request, 'Invalid email or password.')
        except User.DoesNotExist:
            messages.error(request, 'Invalid email or password.')

    return render(request, 'accounts/login.html')


# ---------- LOGOUT ----------
def logout_view(request):
    auth_logout(request)
    messages.success(request, 'Logout successful.')
    return redirect('login')


# ---------- FORGOT PASSWORD ----------
def forgot_password(request):
    if request.method == 'POST':
        email = request.POST.get('email')

        if not email:
            messages.error(request, 'Email is required.')
            return render(request, 'accounts/forgot_password.html')

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


# ---------- FORGOT PASSWORD OTP ----------
def forgot_otp(request):
    if request.method == 'POST':
        otp = request.POST.get('otp')
        if otp:
            user = CustomUser.objects.filter(otp=otp).first()
            if user:
                request.session['reset_user_id'] = user.id  # Save user ID in session
                user.otp = None  # Clear OTP
                user.save()
                return redirect('reset_password')
            else:
                messages.error(request, 'Invalid OTP. Please try again.')
        else:
            messages.error(request, 'OTP is required.')
    return render(request, 'accounts/forgot_otp.html')


# ---------- RESET PASSWORD ----------
def reset_password(request):
    user_id = request.session.get('reset_user_id')
    if not user_id:
        messages.error(request, "Session expired. Please restart the password reset process.")
        return redirect('forgot_password')

    user = CustomUser.objects.filter(id=user_id).first()

    if request.method == 'POST':
        new_pass1 = request.POST.get('new_password1')
        new_pass2 = request.POST.get('new_password2')

        if not new_pass1 or not new_pass2:
            messages.error(request, 'Both password fields are required.')
            return render(request, 'accounts/reset_password.html')

        if len(new_pass1) < 6:
            messages.error(request, 'Password must be at least 6 characters long.')
            return render(request, 'accounts/reset_password.html')

        if new_pass1 != new_pass2:
            messages.error(request, 'Passwords do not match.')
            return render(request, 'accounts/reset_password.html')

        if user:
            user.set_password(new_pass1)
            user.save()
            request.session.pop('reset_user_id', None)
            messages.success(request, 'Password reset successful. You can now log in.')
            return redirect('login')

    return render(request, 'accounts/reset_password.html')
