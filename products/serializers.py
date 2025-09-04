from rest_framework import serializers
from .models import Product, ProductImage, ProductVariation, Category, SubCategory, Brand, Slider, AdsBanner

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image']

class ProductVariationSerializer(serializers.ModelSerializer):
    available = serializers.SerializerMethodField()
    color_name = serializers.SerializerMethodField()

    class Meta:
        model = ProductVariation
        fields = ['id', 'size', 'stock', 'price', 'available', 'color_name']

    def get_available(self, obj):
        return obj.stock > 0

    def get_color_name(self, obj):
        return obj.color.name if obj.color else None

class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    variations = ProductVariationSerializer(many=True, read_only=True)
    brand_name = serializers.CharField(source='brand.name', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    subcategory_name = serializers.CharField(source='subcategory.name', read_only=True)
    price = serializers.SerializerMethodField()
    variation_messages = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id', 'title', 'description', 'slug', 'meta_title', 'meta_description',
            'status', 'created_at', 'updated_at', 'brand_name', 'category_name',
            'subcategory_name', 'images', 'variations', 'price', 'variation_messages'
        ]

    def get_price(self, obj):
        variations = obj.variations.all()
        if variations.exists():
            return sum(v.price for v in variations) / variations.count()
        return 0

    def get_variation_messages(self, obj):
        messages = []
        for var in obj.variations.all():
            if var.stock <= 0:
                messages.append(f"{var.size} {var.color.name if var.color else ''} is out of stock")
            elif not var.color:
                messages.append(f"{var.size} has no color")
        return messages

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
        fields = ['id', 'title', 'image', 'link', 'status']

class AdsBannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdsBanner
        fields = ['id', 'title', 'image', 'link', 'position', 'status']
