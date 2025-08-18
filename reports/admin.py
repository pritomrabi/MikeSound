from django.contrib import admin
from django.urls import path
from django.shortcuts import render
from .views import sales_report_view, staff_order_report_view, order_products_report_view, dashboard_view

class ReportsAdminSite(admin.AdminSite):
    site_header = "Reports Dashboard"

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('sales/', self.admin_view(sales_report_view), name='sales_report'),
            path('staff-orders/', self.admin_view(staff_order_report_view), name='staff_order_report'),
            path('order-products/', self.admin_view(order_products_report_view), name='order_products_report'),
            path('dashboard/', self.admin_view(dashboard_view), name='reports_dashboard'),
        ]
        return custom_urls + urls

admin_site = ReportsAdminSite(name='reports_admin')
