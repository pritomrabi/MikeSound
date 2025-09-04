from django.db import models
from django.conf import settings
from django.utils import timezone

class WholesaleCustomer(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    company_name = models.CharField(max_length=255)
    role = models.CharField(max_length=50, choices=[('retail','Retail'),('wholesale','Wholesale')])
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username

class WholesaleCustomerLedger(models.Model):
    customer = models.ForeignKey(WholesaleCustomer, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    note = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

class CustomerIPBlocker(models.Model):
    ip_address = models.GenericIPAddressField(unique=True)
    reason = models.TextField(blank=True)
    blocked_at = models.DateTimeField(auto_now_add=True)

class VisitorCount(models.Model):
    ip_address = models.GenericIPAddressField()
    visit_date = models.DateField(auto_now_add=True)
    visit_count = models.PositiveIntegerField(default=1)

class FraudChecker(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    order_id = models.IntegerField()
    reason = models.TextField()
    detected_at = models.DateTimeField(auto_now_add=True)

class Coupon(models.Model):
    code = models.CharField(max_length=20, unique=True)
    discount_percent = models.PositiveIntegerField()
    max_usage = models.PositiveIntegerField(default=1)
    used_count = models.PositiveIntegerField(default=0)
    valid_from = models.DateTimeField()
    valid_to = models.DateTimeField()
    active = models.BooleanField(default=True)

    def is_valid(self):
        now = timezone.now()
        return self.active and self.valid_from <= now <= self.valid_to and self.used_count < self.max_usage

