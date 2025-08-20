from rest_framework import serializers
from .models import Review

class ReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)
    order_id = serializers.IntegerField(source='order.id', read_only=True)
    product_title = serializers.CharField(source='product.title', read_only=True)

    class Meta:
        model = Review
        fields = ['id', 'user_name', 'order_id', 'product_title', 'rating', 'comment', 'created_at', 'updated_at']
