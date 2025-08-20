from rest_framework import serializers
from .models import Cart, CartItem, Order, OrderItem, Address
from products.models import Product, ProductVariation, ProductImage

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image']

class ProductVariationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariation
        fields = ['id', 'size', 'price']

class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    variations = ProductVariationSerializer(many=True, read_only=True)
    price = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'title', 'slug', 'price', 'images', 'variations','price']
    
    def get_price(self, obj):
        variations = obj.variations.all()
        if variations.exists():
            return sum(v.price for v in variations) / variations.count()
        return 0

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    variation = ProductVariationSerializer(read_only=True)

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'variation', 'quantity', 'unit_price', 'line_total']

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items']

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    variation = ProductVariationSerializer(read_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'variation', 'quantity', 'unit_price', 'line_total']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    address = AddressSerializer(read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'status', 'payment_status', 'subtotal', 'shipping_fee', 'discount', 'grand_total', 'items', 'address', 'created_at']
