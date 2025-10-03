from django.urls import path
from .views import *
from .api import *
urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login_view, name='login'), 
    path('verify_otp/', verify_otp, name='verify_otp'),
    path('logout/', logout_view, name='logout'),
    path('forgot_password/', forgot_password, name='forgot_password'),
    path('forgot_otp/', forgot_otp, name='forgot_otp'),
    path('reset_password/', reset_password, name='reset_password'),

    # API views
    path('api/register/', register_api, name='api_register'),
    path('api/login/', login_api, name='api_login'),
    path('api/logout/', logout_api, name='api_logout'),
    path('api/verify-otp/', verify_otp_api, name='api_verify_otp'),
    path('api/forgot-password/', forgot_password_api, name='api_forgot_password'),
    path('api/forgot-verify-otp/', verify_forgot_otp_api, name='api_forgot_verify_otp'),
    path('api/reset-password/', reset_password_api, name='api_reset_password'),
]
