from rest_framework import serializers
from .models import Product, ProductImage, ProductVariation, Category, Slider, AdsBanner

class ProductImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = ProductImage
        fields = ['id', 'image']

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return obj.image.url if obj.image else None


class ProductVariationSerializer(serializers.ModelSerializer):
    color_name = serializers.SerializerMethodField()
    discounted_price = serializers.SerializerMethodField()
    available = serializers.SerializerMethodField()
    message = serializers.SerializerMethodField()

    class Meta:
        model = ProductVariation
        fields = ['id', 'sku', 'stock', 'price', 'discounted_price', 'color_name','color_hex', 'available', 'message']

    def get_color_name(self, obj):
        return obj.color.name if obj.color else None
    def get_color_hex(self, obj):
        return obj.color.hex_code if obj.color else None
    def get_discounted_price(self, obj):
        return obj.product.get_discounted_price(obj)

    def get_available(self, obj):
        return obj.stock > 0

    def get_message(self, obj):
        if obj.stock <= 0:
            return "Out of stock"
        if obj.color is None:
            return "Color not available"
        return ""


class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    variations = ProductVariationSerializer(many=True, read_only=True)
    brand_name = serializers.CharField(source='brand.name', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    subcategory_name = serializers.CharField(source='subcategory.name', read_only=True)
    stock_by_color = serializers.SerializerMethodField()
    wishlist_status = serializers.SerializerMethodField()
    product_message = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id', 'title', 'description', 'slug', 'meta_title', 'meta_description',
            'status', 'created_at', 'updated_at', 'brand_name', 'category_name',
            'subcategory_name', 'images', 'variations', 'sold_count', 'views_count',
            'discount', 'is_featured', 'warranty_period',
            'model_number', 'body', 'sound', 'battery', 'power_type', 'connector_type',
            'stock_by_color', 'wishlist_status', 'product_message','offer_type'
        ]

    def get_stock_by_color(self, obj):
        return obj.stock_by_color()

    def get_wishlist_status(self, obj):
        user = self.context.get('request').user
        if user.is_authenticated:
            return obj.users_wishlist.filter(id=user.id).exists()
        return False

    def get_product_message(self, obj):
        variations = obj.variations.all()
        if not variations:
            return "This product has no variations"
        out_of_stock = all(v.stock <= 0 for v in variations)
        if out_of_stock:
            return "All variations are out of stock"
        return ""


class CategoryWithCountSerializer(serializers.ModelSerializer):
    product_count = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'product_count']

    def get_product_count(self, obj):
        return obj.product_set.count()


class SliderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slider
        fields = ['id', 'title', 'image', 'status']


# Serializer এ (যদি API দিয়ে পাঠাও)
class AdsBannerSerializer(serializers.ModelSerializer):
    final_link = serializers.SerializerMethodField()

    class Meta:
        model = AdsBanner
        fields = ['title', 'subtitle', 'image', 'link', 'type', 'final_link']

    def get_final_link(self, obj):
        return obj.link or 'http://localhost:3000/'
