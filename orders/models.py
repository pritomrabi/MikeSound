from django.db import models
from django.conf import settings
from django.utils import timezone
from products.models import Product, ProductVariation

class Address(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True, related_name='addresses')
    full_name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    line1 = models.CharField(max_length=255)
    line2 = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    note = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.full_name}, {self.city}"

class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('canceled', 'Canceled'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
    ]
    PAYMENT_STATUS = [
        ('pending', 'Pending'),
        ('paid', 'Paid'),
    ]
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    address = models.ForeignKey(Address, null=True, blank=True, on_delete=models.SET_NULL)
    subtotal = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    shipping_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    discount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    grand_total = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Order #{self.id} ({self.status})"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    variation = models.ForeignKey(ProductVariation, null=True, blank=True, on_delete=models.SET_NULL)
    quantity = models.PositiveIntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    color = models.CharField(max_length=50, blank=True, null=True)
    line_total = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    image = models.CharField(max_length=255, blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.line_total:
            price = self.unit_price
            if self.product.discount > 0:
                price -= price * self.product.discount / 100
            self.line_total = round(self.quantity * price, 2)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.product.title} x {self.quantity}"

class Transaction(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('success', 'Success'),
        ('failed', 'Failed')
    ]
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='transactions')
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    gateway = models.CharField(max_length=20, default='manual')
    reference = models.CharField(max_length=255, blank=True, null=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    verified_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f"Txn#{self.id} - {self.gateway} - {self.status}"

class PaymentNumber(models.Model):
    gateway = models.CharField(max_length=20, choices=[('bkash', 'Bkash'), ('nogod', 'Nagad'), ('rocket', 'Rocket')])
    account_number = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.gateway} - {self.account_number}"
