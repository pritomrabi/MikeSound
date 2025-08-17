from django.urls import path
from .views import *

urlpatterns = [
    path('about/', about_us, name='about_us'),
    path('terms/', terms_conditions, name='terms_conditions'),
    path('help/', help_center, name='help_center'),
    path('faqs/', faqs, name='faqs'),
    path('contact/', contact_us, name='contact_us'),
]
