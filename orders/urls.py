from django.urls import path
from .api.api import *

urlpatterns = [
    # ------------------- CART API -------------------
    path('api/cart/', cart_detail_api, name='api_cart_detail'),
    path("api/cart/apply-coupon/", apply_coupon_api, name="api_apply_coupon"),
    # ------------------- ORDER API -------------------
    path('api/orders/', order_list_api, name='api_order_list'),
    path('api/orders/<int:order_id>/', order_detail_api, name='api_order_detail'),
    path('api/orders/place/', place_order_api, name='api_place_order'),
]
