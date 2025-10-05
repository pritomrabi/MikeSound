from django.urls import path
from .views import *
from django.conf import settings
from django.conf.urls.static import static
from .api.api import *

urlpatterns = [
    path('', product_list, name='product_list'),
    path('<int:product_id>/', product_detail, name='product_detail'),
    path('wishlist/<int:product_id>/', add_to_wishlist, name='add_to_wishlist'),

    # APIs
    path('api/products/', product_list_api, name='api_product_list'),
    path('api/products/<int:product_id>/', product_detail_api, name='api_product_detail'),
    path('api/subcategories/latest/', latest_subcategories_api, name='api_latest_subcategories'),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
