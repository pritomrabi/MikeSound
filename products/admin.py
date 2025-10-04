from django.contrib import admin
from .models import *


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1
    max_num = 5


class ProductVariationInline(admin.TabularInline):
    model = ProductVariation
    extra = 0


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'brand',
        'category',
        'status',
        'discount',
        'views_count',
        'sold_count',
        'model_number',
        'power_type',
        'connector_type',
        'warranty_period'   # added here
    )
    list_filter = (
        'category',
        'brand',
        'status',
        'power_type',
        'connector_type',
        'warranty_period'   # optional, if you want filter by warranty
    )
    search_fields = (
        'title',
        'brand__name',
        'model_number',
        'body',
        'sound',
        'battery',
        'power_type',
        'connector_type',
        'warranty_period'   # optional
    )
    inlines = [ProductImageInline, ProductVariationInline]
    prepopulated_fields = {'slug': ('title',)}


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at')


@admin.register(SubCategory)
class SubCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'category')


@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ('name',)


@admin.register(Color)
class ColorAdmin(admin.ModelAdmin):
    list_display = ('name', 'hex_code')


@admin.register(Slider)
class SliderAdmin(admin.ModelAdmin):
    list_display = ('title', 'status', 'created_at')
    list_filter = ('status',)
    search_fields = ('title',)


@admin.register(AdsBanner)
class AdsBannerAdmin(admin.ModelAdmin):
    list_display = ('title', 'position', 'status', 'created_at')
    list_filter = ('position', 'status')
    search_fields = ('title', 'link')
