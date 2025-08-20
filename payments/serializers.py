from rest_framework import serializers
from .models import Transaction, PaymentNumber
from orders.models import Order

class TransactionSerializer(serializers.ModelSerializer):
    order_id = serializers.IntegerField(source='order.id', read_only=True)

    class Meta:
        model = Transaction
        fields = ['id', 'order_id', 'amount', 'gateway', 'status', 'reference', 'verified_at', 'created_at']

class PaymentNumberSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentNumber
        fields = ['id', 'gateway', 'account_number']
