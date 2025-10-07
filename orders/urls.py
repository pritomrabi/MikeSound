from django.urls import path
from .api.api import *

urlpatterns = [
    path('api/orders/place/', place_order_api, name='api_place_order'),
    path('api/payment-numbers/', payment_numbers_api, name='payment-numbers-api'),
    path('api/orders/manual-payment/<int:txn_id>/', manual_payment_submit_api, name='api_manual_payment_submit'),
    path('api/orders/cancel/<int:order_id>/', cancel_order_api, name='api_cancel_order'),
    path('api/orders/history/', order_history_api, name='api_order_history'),
]
