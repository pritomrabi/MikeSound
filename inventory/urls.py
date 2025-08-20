from django.urls import path
from .api.api import *

urlpatterns = [
    path('api/suppliers/', supplier_list_api, name='api_supplier_list'),
    path('api/suppliers/<int:supplier_id>/', supplier_detail_api, name='api_supplier_detail'),

    path('api/inventory/', inventory_list_api, name='api_inventory_list'),
    path('api/inventory/<int:inventory_id>/', inventory_detail_api, name='api_inventory_detail'),

    path('api/purchases/', purchase_list_api, name='api_purchase_list'),
    path('api/purchases/<int:purchase_id>/', purchase_detail_api, name='api_purchase_detail'),

    path('api/payments/', payment_list_api, name='api_payment_list'),
    path('api/payments/<int:payment_id>/', payment_detail_api, name='api_payment_detail'),

    path('api/ledger/', ledger_list_api, name='api_ledger_list'),
    path('api/ledger/<int:ledger_id>/', ledger_detail_api, name='api_ledger_detail'),
]
