from rest_framework import serializers
from .models import Order, OrderItem, Address, Transaction, PaymentNumber

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ["full_name","phone","line1","line2","city","postal_code","email","note"]

class OrderItemSerializer(serializers.ModelSerializer):
    product_title = serializers.CharField(source='product.title', read_only=True)
    variation_color = serializers.CharField(source='variation.color.name', read_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_title', 'variation', 'variation_color', 'quantity', 'unit_price', 'line_total', 'color', 'image']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    address = AddressSerializer(read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'user', 'address', 'subtotal', 'shipping_fee', 'discount',
            'grand_total', 'status', 'payment_status', 'created_at', 'updated_at',
            'items', 'user_number' 
        ]


class TransactionSerializer(serializers.ModelSerializer):
    order_id = serializers.IntegerField(source='order.id', read_only=True)

    class Meta:
        model = Transaction
        fields = ['id', 'order_id', 'amount', 'gateway', 'reference', 'status', 'created_at', 'verified_at']

class PaymentNumberSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentNumber
        fields = ['id', 'gateway', 'account_number']
