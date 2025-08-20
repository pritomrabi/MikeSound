from django.urls import path
from .views import *
from .api import *

urlpatterns = [
    path('init/<int:order_id>/<str:gateway>/', payment_init, name='payment_init'),
    path('callback/<int:txn_id>/', payment_callback, name='payment_callback'),

    # manual flow
    path('manual/start/<int:order_id>/<str:gateway>/', manual_start, name='payment_manual_start'),
    path('manual/submit/<int:txn_id>/', manual_reference_submit, name='payment_manual_submit'),
    path('manual/verify/<int:txn_id>/', manual_verify, name='manual_payment_verify'),
    path('manual/done/<int:txn_id>/', manual_done, name='manual_payment_done'),
    path('manual/submit/<int:txn_id>/', manual_reference_submit, name='manual_reference_submit'),
    path('api/transactions/', transaction_list, name='api_transaction_list'),
    path('api/transactions/<int:txn_id>/', transaction_detail, name='api_transaction_detail'),
    path('api/transactions/<int:txn_id>/update-status/', transaction_update_status, name='api_transaction_update_status'),
    path('api/payment-numbers/', payment_numbers, name='api_payment_numbers'),
    path('api/manual/submit/<int:txn_id>/', manual_payment_submit, name='api_manual_payment_submit'),
    path('api/stripe/webhook/', stripe_webhook, name='api_stripe_webhook'),
    path('api/manual/callback/<int:txn_id>/', manual_gateway_callback, name='api_manual_gateway_callback'),
]

