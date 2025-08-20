from django.urls import path
from .api import coupon_list, coupon_detail, coupon_apply

urlpatterns = [
    path('api/coupons/', coupon_list, name='api_coupon_list'),
    path('api/coupons/<int:coupon_id>/', coupon_detail, name='api_coupon_detail'),
    path('api/coupons/apply/', coupon_apply, name='api_coupon_apply'),
]
