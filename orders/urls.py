from django.urls import path
from .views import *
from .api.api import *

urlpatterns = [
    # Frontend / HTML views
    path('cart/', cart_view, name='cart_view'),
    path('cart/add/<int:product_id>/', add_to_cart, name='add_to_cart'),
    path('cart/add/<int:product_id>/<int:variation_id>/', add_to_cart, name='add_to_cart_variation'),
    path('cart/update/<int:item_id>/', update_cart, name='update_cart'),
    path('cart/remove/<int:item_id>/', remove_cart_item, name='remove_cart_item'),

    path('checkout/', checkout_view, name='checkout_view'),
    path('checkout/apply-coupon/', apply_coupon, name='apply_coupon'),
    path('checkout/update/<int:item_id>/', update_checkout_cart, name='update_checkout_cart'),
    path('place-order/', place_order, name='place_order'),

    path('orders/', order_list, name='order_list'),
    path('orders/<int:order_id>/', order_detail, name='order_detail'),
    path('history/', order_history, name='order_history'),

    # API urls
    # Cart APIs
    path('api/cart/', cart_detail_api, name='api_cart_detail'),
    path('api/cart/add/', cart_add_item_api, name='api_cart_add'),
    path('api/cart/update/<int:item_id>/', cart_update_item_api, name='api_cart_update'),
    path('api/cart/remove/<int:item_id>/', cart_remove_item_api, name='api_cart_remove'),

    # Order APIs
    path('api/orders/', order_list_api, name='api_order_list'),
    path('api/orders/<int:order_id>/', order_detail_api, name='api_order_detail'),
    path('api/orders/item/delete/<int:item_id>/', order_delete_item_api, name='api_order_delete_item'),
]
