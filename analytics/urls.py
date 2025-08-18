from django.urls import path
from .views import *

app_name = 'analytics'

urlpatterns = [
    path('track/', track_pixel, name='track'),
    path('ga/', server_to_ga, name='server_to_ga'),
    path('dashboard/', dashboard, name='dashboard'),
    path('map/', map_view, name='map'),
    path('courier-ping/', courier_ping, name='courier_ping'),
]
