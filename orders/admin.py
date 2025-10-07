from django.contrib import admin
from .models import Order, OrderItem, Transaction, Address, PaymentNumber

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'grand_total', 'status', 'payment_status', 'created_at']

@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ['order', 'product', 'variation', 'quantity', 'unit_price']

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ['id', 'order', 'amount', 'status', 'reference', 'verified_at']

@admin.register(PaymentNumber)
class PaymentNumberAdmin(admin.ModelAdmin):
    list_display = ['gateway', 'account_number']

@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'phone', 'line1', 'line2', 'city', 'postal_code']
