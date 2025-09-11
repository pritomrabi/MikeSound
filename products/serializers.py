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

    class Meta:
        model = ProductVariation
        fields = ['id', 'size', 'price', 'discounted_price', 'color_name']

    def get_color_name(self, obj):
        return obj.color.name if obj.color else None

    def get_discounted_price(self, obj):
        return obj.product.get_discounted_price(obj)

class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    variations = ProductVariationSerializer(many=True, read_only=True)
    brand_name = serializers.CharField(source='brand.name', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    subcategory_name = serializers.CharField(source='subcategory.name', read_only=True)
    variation_messages = serializers.SerializerMethodField()
    sold_count = serializers.IntegerField()

    class Meta:
        model = Product
        fields = [
            'id', 'title', 'description', 'slug', 'meta_title', 'meta_description',
            'status', 'created_at', 'updated_at', 'brand_name', 'category_name',
            'subcategory_name', 'images', 'variations', 'variation_messages', 'sold_count'
        ]

    def get_variation_messages(self, obj):
        messages = []
        for var in obj.variations.all():
            if not var.color:
                messages.append(f"{var.size} has no color")
        return messages

class CategoryWithCountSerializer(serializers.ModelSerializer):
    product_count = serializers.SerializerMethodField()

    class Meta:
        model = Product._meta.get_field('category').related_model
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
