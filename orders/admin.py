from django.contrib import admin
from .models import Order, OrderItem, Transaction, Address, PaymentNumber


# ---------------------------
# OrderItem Inline
# ---------------------------
class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ['product', 'variation', 'quantity', 'unit_price', 'line_total', 'color', 'image']
    can_delete = False
    show_change_link = True


# ---------------------------
# Transaction Inline
# ---------------------------
class TransactionInline(admin.TabularInline):
    model = Transaction
    extra = 0
    readonly_fields = ['amount', 'gateway', 'status', 'reference', 'verified_at']
    can_delete = False
    show_change_link = True


# ---------------------------
# Order Admin
# ---------------------------
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'user_number', 'status', 'payment_status', 'grand_total', 'get_transaction_id', 'created_at', 'get_address']
    readonly_fields = ['subtotal', 'grand_total', 'shipping_fee', 'discount', 'get_address', 'user_number']

    inlines = [OrderItemInline, TransactionInline]

    def get_address(self, obj):
        if obj.address:
            addr = obj.address
            return f"{addr.full_name}, {addr.line1}, {addr.line2 or ''}, {addr.city}, {addr.postal_code or ''}, {addr.phone}, {addr.email}"
        return "-"
    get_address.short_description = "Address"

    def get_transaction_id(self, obj):
        txn = obj.transactions.order_by('-id').first()
        if txn:
            return txn.reference or txn.id
        return "-"
    get_transaction_id.short_description = "Transaction Reference"


# ---------------------------
# OrderItem Admin
# ---------------------------
@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ['order', 'product', 'variation', 'quantity', 'unit_price', 'line_total', 'color', 'image']
    readonly_fields = list_display


# ---------------------------
# Transaction Admin
# ---------------------------
@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ['id', 'order', 'gateway', 'amount', 'status', 'reference', 'verified_at']
    readonly_fields = list_display


# ---------------------------
# PaymentNumber Admin
# ---------------------------
@admin.register(PaymentNumber)
class PaymentNumberAdmin(admin.ModelAdmin):
    list_display = ['gateway', 'account_number', 'latest_transaction_id']
    readonly_fields = ['gateway', 'account_number', 'latest_transaction_id']

    def latest_transaction_id(self, obj):
        txn = Transaction.objects.filter(gateway=obj.gateway).order_by('-id').first()
        if txn:
            return txn.id
        return "-"
    latest_transaction_id.short_description = "Transaction ID"


# ---------------------------
# Address Admin
# ---------------------------
@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'phone', 'line1', 'line2', 'city', 'postal_code', 'email']
    readonly_fields = list_display
