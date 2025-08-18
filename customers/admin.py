from django.contrib import admin
from .models import *

@admin.register(WholesaleCustomer)
class WholesaleCustomerAdmin(admin.ModelAdmin):
    list_display = ['user', 'company_name', 'role', 'created_at']

@admin.register(WholesaleCustomerLedger)
class WholesaleCustomerLedgerAdmin(admin.ModelAdmin):
    list_display = ['customer', 'amount', 'note', 'created_at']

@admin.register(CustomerIPBlocker)
class CustomerIPBlockerAdmin(admin.ModelAdmin):
    list_display = ['ip_address', 'reason', 'blocked_at']

@admin.register(VisitorCount)
class VisitorCountAdmin(admin.ModelAdmin):
    list_display = ['ip_address', 'visit_date', 'visit_count']

@admin.register(FraudChecker)
class FraudCheckerAdmin(admin.ModelAdmin):
    list_display = ['user', 'order_id', 'reason', 'detected_at']

@admin.register(Coupon)
class CouponAdmin(admin.ModelAdmin):
    list_display = ['code', 'discount_percent', 'max_usage', 'used_count', 'valid_from', 'valid_to', 'active']
