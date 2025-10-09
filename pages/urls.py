from django.urls import path
from .views import *
from .api import *

urlpatterns = [
    path('faqs/', faqs, name='faqs'),
    path('contact/', contact_us, name='contact_us'),

    path('api/faqs/', faqs_api, name='api_faqs'),
    path('api/contact/', contact_us_api, name='api_contact_us'),
    path('api/footer/', get_footer, name='api_footer'),
]
