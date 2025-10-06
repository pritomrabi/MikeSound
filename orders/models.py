from django.db import models
from django.conf import settings
from products.models import Product, ProductVariation
from inventory.models import Inventory

class Cart(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    session_key = models.CharField(max_length=40, null=True, blank=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    variation = models.ForeignKey(ProductVariation, null=True, blank=True, on_delete=models.SET_NULL)
    quantity = models.PositiveIntegerField(default=1)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    @property
    def discount_percent(self):
        return self.product.discount if self.product.discount else 0

    @property
    def discount_amount(self):
        if self.product.discount:
            return self.unit_price * self.quantity * self.product.discount / 100
        return 0

    @property
    def line_total(self):
        return self.quantity * self.unit_price - self.discount_amount

class Address(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='addresses', null=True, blank=True)
    full_name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    line1 = models.CharField(max_length=255)
    line2 = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100, blank=True)
    postal_code = models.CharField(max_length=20, blank=True)
    country = models.CharField(max_length=50)
    is_billing = models.BooleanField(default=False)
    is_shipping = models.BooleanField(default=False)

class Order(models.Model):
    STATUS_CHOICES = [
        ('pending','Pending'),
        ('confirmed','Confirmed'),
        ('archived','Archived'),
        ('packed','Packed'),
        ('shipped','Shipped'),
        ('delivered','Delivered'),
        ('canceled','Canceled')
    ]
    PAYMENT_STATUS = [
        ('pending','Pending'),
        ('partial','Partial'),
        ('paid','Paid')
    ]
    address = models.ForeignKey(Address, null=True, blank=True, on_delete=models.SET_NULL)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    subtotal = models.DecimalField(max_digits=12, decimal_places=2)
    shipping_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    discount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    grand_total = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    variation = models.ForeignKey(ProductVariation, null=True, blank=True, on_delete=models.SET_NULL)
    quantity = models.PositiveIntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)

    @property
    def line_total(self):
        price = self.unit_price
        if self.product.discount > 0:
            price = price - (price * self.product.discount / 100)
        return self.quantity * price


class OrderAssignment(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    staff = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, limit_choices_to={'is_staff': True})
    assigned_at = models.DateTimeField(auto_now_add=True)
    auto_assigned = models.BooleanField(default=True)
    remarks = models.TextField(blank=True)

class ShipmentTracking(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='tracking')
    status = models.CharField(max_length=20, choices=Order.STATUS_CHOICES)
    updated_at = models.DateTimeField(auto_now_add=True)
    remarks = models.TextField(blank=True)
