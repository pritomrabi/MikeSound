# serializers.py
from rest_framework import serializers
from .models import Product, ProductImage, ProductVariation, Category, SubCategory, Brand, Slider, AdsBanner

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image']

class ProductVariationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariation
        fields = ['id', 'size', 'stock', 'price']

class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    variations = ProductVariationSerializer(many=True, read_only=True)
    brand_name = serializers.CharField(source='brand.name', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    subcategory_name = serializers.CharField(source='subcategory.name', read_only=True)
    price = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id', 'title', 'description', 'slug', 'meta_title', 'meta_description',
            'status', 'created_at', 'updated_at', 'brand_name', 'category_name',
            'subcategory_name', 'images', 'variations'
        ]
    def get_price(self, obj):
        variations = obj.variations.all()
        if variations.exists():
            return sum(v.price for v in variations) / variations.count()
        return 0

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class SubCategorySerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    class Meta:
        model = SubCategory
        fields = ['id', 'name', 'category_name']

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ['id', 'name']

class SliderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slider
        fields = ['id', 'title', 'image', 'link', 'status']

class AdsBannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdsBanner
        fields = ['id', 'title', 'image', 'link', 'position', 'status']
