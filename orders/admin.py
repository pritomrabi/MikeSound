from django.contrib import admin
from .models import *

class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 0
    readonly_fields = ['product_title', 'variation_info', 'unit_price', 'quantity', 'line_total']
    def product_title(self, obj):
        return obj.product.title if obj.product else "-"
    product_title.short_description = "Product"

    def variation_info(self, obj):
        return obj.variation.size if obj.variation else "Default"
    variation_info.short_description = "Variation"

    def line_total(self, obj):
        try:
            return obj.line_total
        except:
            return 0
    line_total.short_description = "Line Total"

@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ['user', 'created_at']
    inlines = [CartItemInline]

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ['user_name', 'product_info', 'variation_info', 'quantity', 'unit_price', 'line_total']

    def user_name(self, obj):
        return obj.order.user.username if obj.order and obj.order.user else "-"
    user_name.short_description = "User"

    def product_info(self, obj):
        return obj.product.title if obj.product else "-"
    product_info.short_description = "Product"

    def variation_info(self, obj):
        return obj.variation.size if obj.variation else "Default"
    variation_info.short_description = "Variation"

    def line_total(self, obj):
        try:
            return obj.line_total
        except:
            return 0

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = [
        'id', 'user', 'status', 'payment_status', 
        'grand_total', 'created_at', 'address_info', 'products_info'
    ]
    list_filter = ['status', 'payment_status', 'created_at']
    search_fields = ['user__username', 'id']
    inlines = [OrderItemInline]

    def address_info(self, obj):
        if obj.address:
            return f"{obj.address.line1}, {obj.address.city}, {obj.address.country}"
        return "-"
    address_info.short_description = "Shipping Address"

    def products_info(self, obj):
        items = obj.items.all()
        if not items.exists():
            return "-"
        return ", ".join([
            f"{item.product.title if item.product else '-'} ({item.variation.size if item.variation else 'Default'}) x {item.quantity}" 
            for item in items
        ])
    products_info.short_description = "Products"

@admin.register(OrderAssignment)
class OrderAssignmentAdmin(admin.ModelAdmin):
    list_display = ['order', 'staff', 'assigned_at', 'auto_assigned']

@admin.register(ShipmentTracking)
class ShipmentTrackingAdmin(admin.ModelAdmin):
    list_display = ['order', 'status', 'updated_at']

@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ['user', 'full_name', 'city', 'country', 'is_billing', 'is_shipping']
