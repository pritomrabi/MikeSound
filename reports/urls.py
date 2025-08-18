from django.urls import path
from .views import *

urlpatterns = [
    path('sales/', sales_report_view, name='sales_report'),
    path('staff-orders/', staff_order_report_view, name='staff_order_report'),
    path('order-products/', order_products_report_view, name='order_products_report'),
    path('dashboard/', dashboard_view, name='reports_dashboard'),
]