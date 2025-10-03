import os
import bleach
from decimal import Decimal
from django.db import models
from django.conf import settings
from django.utils.text import slugify
from django.utils.html import strip_tags
from ckeditor.fields import RichTextField
from django.db.models.signals import post_delete
from django.dispatch import receiver

# -------------------------
# Category
# -------------------------
class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def product_count(self):
        return self.product_set.count()

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.name)
            slug = base_slug
            num = 1
            while Category.objects.filter(slug=slug).exclude(id=self.id).exists():
                slug = f"{base_slug}-{num}"
                num += 1
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


# -------------------------
# SubCategory
# -------------------------
class SubCategory(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='subcategories')
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.name)
            slug = base_slug
            num = 1
            while SubCategory.objects.filter(slug=slug).exclude(id=self.id).exists():
                slug = f"{base_slug}-{num}"
                num += 1
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


# -------------------------
# Brand
# -------------------------
class Brand(models.Model):
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


# -------------------------
# Color
# -------------------------
class Color(models.Model):
    name = models.CharField(max_length=50)
    hex_code = models.CharField(max_length=7, default="#000000")

    def __str__(self):
        return self.name


# -------------------------
# Product
# -------------------------
class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    subcategory = models.ForeignKey(SubCategory, on_delete=models.CASCADE)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = RichTextField()
    slug = models.SlugField(max_length=100, unique=True, blank=True)
    meta_title = models.CharField(max_length=255, blank=True)
    meta_description = models.TextField(blank=True)
    status = models.BooleanField(default=True)
    discount = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    users_wishlist = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='wishlist', blank=True)
    views_count = models.PositiveIntegerField(default=0)
    sold_count = models.PositiveIntegerField(default=0)
    is_featured = models.BooleanField(default=False)
    warranty_period = models.PositiveSmallIntegerField(default=0)

    # --- Frontend Specs Fields ---
    model_number = models.CharField(max_length=50, blank=True)
    body = models.CharField(max_length=255, blank=True)
    sound = models.CharField(max_length=255, blank=True)
    battery = models.CharField(max_length=255, blank=True)
    power_type = models.CharField(max_length=50, blank=True)
    connector_type = models.CharField(max_length=50, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def get_discounted_price(self, variation):
        if self.discount > 0:
            return variation.price - (variation.price * Decimal(self.discount) / Decimal(100))
        return variation.price

    @classmethod
    def latest_products(cls, limit=10):
        return cls.objects.filter(status=True).order_by('-created_at')[:limit]

    def save(self, *args, **kwargs):
        # Clean description
        allowed_tags = ['p','b','i','u','strong','em','h1','h2','h3','ul','ol','li','a','br']
        allowed_attrs = {'a':['href','title','target']}
        self.description = bleach.clean(self.description, tags=allowed_tags, attributes=allowed_attrs, strip=True)

        # Slug
        if not self.slug:
            base_slug = slugify(self.title)
            slug = base_slug
            num = 1
            while Product.objects.filter(slug=slug).exclude(id=self.id).exists():
                slug = f"{base_slug}-{num}"
                num += 1
            self.slug = slug

        # Meta fields
        if not self.meta_title:
            self.meta_title = self.title
        if not self.meta_description:
            self.meta_description = strip_tags(self.description)[:155]

        super().save(*args, **kwargs)

    def stock_by_color(self):
        colors = {}
        for variation in self.variations.select_related("color").all():
            color_name = variation.color.name if variation.color else "No Color"
            colors[color_name] = colors.get(color_name, 0) + variation.stock
        return colors

    def __str__(self):
        return self.title


# -------------------------
# ProductVariation
# -------------------------
class ProductVariation(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='variations')
    color = models.ForeignKey(Color, on_delete=models.SET_NULL, null=True, related_name='variations')
    stock = models.PositiveIntegerField(default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    sku = models.CharField(max_length=50, unique=True)

    class Meta:
        unique_together = ('product', 'color')

    def __str__(self):
        return f"{self.product.title} - {self.color.name if self.color else 'No Color'}"


# -------------------------
# ProductImage
# -------------------------
class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='product_images/', null=True, blank=True, default='product_images/default.png')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


@receiver(post_delete, sender=ProductImage)
def delete_image_file(sender, instance, **kwargs):
    if instance.image and os.path.isfile(instance.image.path):
        if not instance.image.name.endswith('default.png'):
            os.remove(instance.image.path)


# -------------------------
# Slider
# -------------------------
class Slider(models.Model):
    title = models.CharField(max_length=255, blank=True, null=True)
    image = models.ImageField(upload_to='sliders/')
    link = models.URLField(blank=True, null=True)
    status = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title if self.title else "Slider " + str(self.id)


# -------------------------
# AdsBanner
# -------------------------
class AdsBanner(models.Model):
    title = models.CharField(max_length=255, blank=True, null=True)
    subtitle = models.CharField(max_length=255, blank=True, null=True)
    image = models.ImageField(upload_to='ads/')
    link = models.URLField(blank=True, null=True)  
    type = models.CharField(max_length=50, blank=True, null=True)   
    position = models.CharField(max_length=50, blank=True, null=True)  
    status = models.BooleanField(default=True)  
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title}" if self.title else f"Ads {self.id}"
