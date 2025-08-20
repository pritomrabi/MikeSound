from django.urls import path
from .views import *
from .api import *

urlpatterns = [
    path('create/<int:order_id>/<int:product_id>/', create_review, name='create_review'),
    path('update/<int:review_id>/', update_review, name='update_review'),
    path('delete/<int:review_id>/', delete_review, name='delete_review'),
    path('product/<int:product_id>/', product_reviews, name='product_reviews'),
    path('api/product/<int:product_id>/reviews/', product_reviews_list, name='api_product_reviews'),
    path('api/create/<int:order_id>/<int:product_id>/', create_review_api, name='api_create_review'),
    path('api/update/<int:review_id>/', update_review_api, name='api_update_review'),
    path('api/delete/<int:review_id>/', delete_review_api, name='api_delete_review'),
]
