from rest_framework import serializers
from .models import Cart, CartItem, Order, OrderItem, Address
from products.models import Product, ProductVariation

# ------------------- PRODUCT -------------------

class ProductVariationSerializer(serializers.ModelSerializer):
    color_name = serializers.SerializerMethodField()
    color_hex = serializers.SerializerMethodField()

    class Meta:
        model = ProductVariation
        fields = ['id', 'price', 'stock', 'color_name', 'color_hex']

    def get_color_name(self, obj):
        return obj.color.name if getattr(obj, 'color', None) else "No Color"

    def get_color_hex(self, obj):
        return getattr(obj.color, 'hex_code', None) if getattr(obj, 'color', None) else None


class ProductSerializer(serializers.ModelSerializer):
    variations = ProductVariationSerializer(many=True, read_only=True)
    price = serializers.SerializerMethodField()
    discount_percent = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'title', 'slug', 'price', 'discount_percent', 'variations']

    def get_price(self, obj):
        variations = obj.variations.all()
        if variations.exists():
            return min([v.price for v in variations])
        return getattr(obj, 'price', 0)

    def get_discount_percent(self, obj):
        return float(getattr(obj, 'discount', 0) or 0)

# ------------------- CART -------------------

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    variation = ProductVariationSerializer(read_only=True)
    line_total = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'variation', 'quantity', 'unit_price', 'line_total']

    def get_line_total(self, obj):
        price = getattr(obj, 'unit_price', 0)
        return round(price * getattr(obj, 'quantity', 1), 2)


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['items']

# ------------------- ORDER -------------------

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        exclude = ['user']


class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    variation = ProductVariationSerializer(read_only=True)
    line_total = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'variation', 'quantity', 'unit_price', 'line_total']

    def get_line_total(self, obj):
        price = getattr(obj, 'unit_price', 0)
        discount = getattr(getattr(obj, 'product', None), 'discount', 0) or 0
        return round(price * getattr(obj, 'quantity', 1) * (1 - discount / 100), 2)


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    address = AddressSerializer(read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'status', 'payment_status', 'subtotal',
            'shipping_fee', 'discount', 'grand_total', 'items', 'address', 'created_at'
        ]
