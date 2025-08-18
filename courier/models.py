from django.db import models
from django.contrib.auth.models import User
from orders.models import Order

class Courier(models.Model):
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class OrderCourier(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name='courier_assignment')
    courier = models.ForeignKey(Courier, on_delete=models.SET_NULL, null=True, blank=True)
    assigned_at = models.DateTimeField(auto_now_add=True)
    delivered_at = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=Order.STATUS_CHOICES, default='confirmed')
    auto_assigned = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.order.id} -> {self.courier.name if self.courier else 'Unassigned'}"
