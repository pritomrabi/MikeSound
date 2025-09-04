from django.urls import path
from .views import about_us, terms_conditions, help_center, faqs, contact_us
from .api import *

urlpatterns = [
    path('about/', about_us, name='about_us'),
    path('terms/', terms_conditions, name='terms_conditions'),
    path('help/', help_center, name='help_center'),
    path('faqs/', faqs, name='faqs'),
    path('contact/', contact_us, name='contact_us'),

    path('api/about/', about_us_api, name='api_about_us'),
    path('api/terms/', terms_conditions_api, name='api_terms_conditions'),
    path('api/help/', help_center_api, name='api_help_center'),
    path('api/faqs/', faqs_api, name='api_faqs'),
    path('api/contact/', contact_us_api, name='api_contact_us'),

    path('api/footer/', get_footer, name='api_footer'),
]
