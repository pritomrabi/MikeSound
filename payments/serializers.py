from rest_framework import serializers
from .models import Transaction, PaymentNumber
from orders.models import Order
from products.serializers import ProductSerializer

class TransactionSerializer(serializers.ModelSerializer):
    order_id = serializers.IntegerField(source='order.id', read_only=True)
    order_status = serializers.CharField(source='order.status', read_only=True)
    order_payment_status = serializers.CharField(source='order.payment_status', read_only=True)
    products = serializers.SerializerMethodField()

    class Meta:
        model = Transaction
        fields = [
            'id', 'order_id', 'order_status', 'order_payment_status', 
            'amount', 'gateway', 'status', 'reference', 'verified_at', 'created_at',
            'products'
        ]

    def get_products(self, obj):
        items = obj.order.items.all()
        return [
            {
                'product_id': item.product.id,
                'title': item.product.title,
                'variation': item.variation.size if item.variation else 'Default',
                'color': getattr(item.variation.color, 'name', None) if item.variation else None,
                'stock': item.variation.stock if item.variation else None,
                'unit_price': item.unit_price,
                'discount_percent': item.product.discount,
                'quantity': item.quantity,
                'line_total': item.line_total
            }
            for item in items
        ]

class PaymentNumberSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentNumber
        fields = ['id', 'gateway', 'account_number']
