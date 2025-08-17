from django.urls import path
from .views import (
    payment_init, payment_callback,
    manual_start, manual_reference_submit, manual_verify, manual_done
)

urlpatterns = [
    path('init/<int:order_id>/<str:gateway>/', payment_init, name='payment_init'),
    path('callback/<int:txn_id>/', payment_callback, name='payment_callback'),

    # manual flow
    path('manual/start/<int:order_id>/<str:gateway>/', manual_start, name='payment_manual_start'),
    path('manual/submit/<int:txn_id>/', manual_reference_submit, name='payment_manual_submit'),
    path('manual/verify/<int:txn_id>/', manual_verify, name='manual_payment_verify'),
    path('manual/done/<int:txn_id>/', manual_done, name='manual_payment_done'),
     path('manual/submit/<int:txn_id>/', manual_reference_submit, name='manual_reference_submit'),
]

