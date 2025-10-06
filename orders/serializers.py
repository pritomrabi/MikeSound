from rest_framework import serializers
from .models import Cart, CartItem, Order, OrderItem, Address
from products.models import Product, ProductVariation, ProductImage

# Product Images
class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image']

# Product Variation
class ProductVariationSerializer(serializers.ModelSerializer):
    color_name = serializers.SerializerMethodField()
    color_hex = serializers.SerializerMethodField()

    class Meta:
        model = ProductVariation
        fields = ['id', 'price', 'stock', 'color_name', 'color_hex']

    def get_color_name(self, obj):
        return obj.color.name if obj.color else "No Color"

    def get_color_hex(self, obj):
        return obj.color.hex_code if obj.color else None

# Product
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
            return min([v.price for v in variations])
        return 0

    def get_discount_percent(self, obj):
        return float(obj.discount or 0)

# CartItem
class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    variation = ProductVariationSerializer(read_only=True)
    line_total = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'variation', 'quantity', 'unit_price', 'line_total']

    def get_line_total(self, obj):
        price = obj.unit_price
        if obj.variation:
            try:
                price = obj.variation.product.get_discounted_price(obj.variation)
            except:
                price = obj.unit_price
        return round(price * obj.quantity, 2)

# Cart
class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['items']

# Address
class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        exclude = ['user']

# OrderItem
class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    variation = ProductVariationSerializer(read_only=True)
    line_total = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'variation', 'quantity', 'unit_price', 'line_total']

    def get_line_total(self, obj):
        price = obj.unit_price
        discount = getattr(obj.product, 'discount', 0) or 0
        return round(price * obj.quantity * (1 - discount / 100), 2)

# Order
class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    address = AddressSerializer(read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'status', 'payment_status', 'subtotal',
            'shipping_fee', 'discount', 'grand_total', 'items', 'address', 'created_at'
        ]
