from rest_framework import serializers
from .models import Cart, CartItem, Order, OrderItem, Address
from products.models import Product, ProductVariation, ProductImage

# Product Images
class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image']

# Product Variation with stock, color, price
class ProductVariationSerializer(serializers.ModelSerializer):
    color_name = serializers.SerializerMethodField()
    color_hex = serializers.SerializerMethodField()

    class Meta:
        model = ProductVariation
        fields = ['id', 'size', 'price', 'stock', 'color_name', 'color_hex']

    def get_color_name(self, obj):
        return obj.color.name if obj.color else "No Color"

    def get_color_hex(self, obj):
        return obj.color.hex_code if obj.color else None

# Product with variations and discount
class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    variations = ProductVariationSerializer(many=True, read_only=True)
    price = serializers.SerializerMethodField()
    discount_percent = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'title', 'slug', 'price', 'discount_percent', 'images', 'variations']

    def get_price(self, obj):
        variations = obj.variations.all()
        if variations.exists():
            # Average price calculation
            return sum(v.price for v in variations) / variations.count()
        return 0

    def get_discount_percent(self, obj):
        return float(obj.discount)

# CartItem with product + variation
class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    variation = ProductVariationSerializer(read_only=True)
    line_total = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'variation', 'quantity', 'unit_price', 'line_total']

    def get_line_total(self, obj):
        return obj.line_total

# Cart with items
class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items']

# Address serializer
class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'

# OrderItem with product + variation
class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    variation = ProductVariationSerializer(read_only=True)
    line_total = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'variation', 'quantity', 'unit_price', 'line_total']

    def get_line_total(self, obj):
        return obj.line_total

# Order with items + address
class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    address = AddressSerializer(read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'user', 'status', 'payment_status', 'subtotal', 
            'shipping_fee', 'discount', 'grand_total', 'items', 'address', 'created_at'
        ]
