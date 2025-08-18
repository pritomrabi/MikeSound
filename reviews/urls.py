from django.urls import path
from .views import *

urlpatterns = [
    path('create/<int:order_id>/<int:product_id>/', create_review, name='create_review'),
    path('update/<int:review_id>/', update_review, name='update_review'),
    path('delete/<int:review_id>/', delete_review, name='delete_review'),
    path('product/<int:product_id>/', product_reviews, name='product_reviews'),
]
