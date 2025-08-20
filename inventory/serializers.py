from rest_framework import serializers
from .models import Supplier, Inventory, Purchase, PurchaseItem, SupplierPayment, SupplierLedger

class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = ['id', 'name', 'address', 'phone', 'email']

class InventorySerializer(serializers.ModelSerializer):
    product_title = serializers.CharField(source='product.title', read_only=True)
    class Meta:
        model = Inventory
        fields = ['id', 'product', 'product_title', 'current_stock', 'last_updated']

class PurchaseItemSerializer(serializers.ModelSerializer):
    product_title = serializers.CharField(source='product.title', read_only=True)
    class Meta:
        model = PurchaseItem
        fields = ['id', 'product', 'product_title', 'quantity', 'price', 'line_total']

class PurchaseSerializer(serializers.ModelSerializer):
    items = PurchaseItemSerializer(many=True, read_only=True)
    supplier_name = serializers.CharField(source='supplier.name', read_only=True)
    total_amount = serializers.DecimalField(max_digits=12, decimal_places=2, read_only=True)

    class Meta:
        model = Purchase
        fields = ['id', 'supplier', 'supplier_name', 'date', 'note', 'total_amount', 'items']

class SupplierPaymentSerializer(serializers.ModelSerializer):
    supplier_name = serializers.CharField(source='supplier.name', read_only=True)
    class Meta:
        model = SupplierPayment
        fields = ['id', 'supplier', 'supplier_name', 'method', 'account_holder', 'account_number', 'bank_name', 'bank_branch', 'transaction_id', 'amount', 'date', 'note']

class SupplierLedgerSerializer(serializers.ModelSerializer):
    supplier_name = serializers.CharField(source='supplier.name', read_only=True)
    purchase_id = serializers.IntegerField(source='purchase.id', read_only=True)
    payment_id = serializers.IntegerField(source='payment.id', read_only=True)

    class Meta:
        model = SupplierLedger
        fields = ['id', 'supplier', 'supplier_name', 'transaction_type', 'amount', 'date', 'purchase_id', 'payment_id']
