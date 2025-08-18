from django.db import models
from django.contrib.auth import get_user_model

class PixelConfig(models.Model):
    name = models.CharField(max_length=100, default="default")
    fb_pixel_id = models.CharField(max_length=64, blank=True)
    enabled = models.BooleanField(default=True)

class GAConfig(models.Model):
    name = models.CharField(max_length=100, default="default")
    measurement_id = models.CharField(max_length=50)
    api_secret = models.CharField(max_length=120)
    enabled = models.BooleanField(default=True)

class TrackingEvent(models.Model):
    EVENT_CHOICES = [
        ('page_view','page_view'),
        ('view_item','view_item'),
        ('add_to_cart','add_to_cart'),
        ('begin_checkout','begin_checkout'),
        ('purchase','purchase'),
        ('payment_success','payment_success'),
        ('courier_assigned','courier_assigned'),
        ('order_delivered','order_delivered'),
    ]
    event = models.CharField(max_length=50, choices=EVENT_CHOICES)
    user = models.ForeignKey(get_user_model(), null=True, blank=True, on_delete=models.SET_NULL)
    order_id = models.IntegerField(null=True, blank=True)
    data = models.JSONField(default=dict, blank=True)
    source = models.CharField(max_length=20, default='server')
    created_at = models.DateTimeField(auto_now_add=True)

class CourierPing(models.Model):
    courier_name = models.CharField(max_length=120)
    lat = models.DecimalField(max_digits=9, decimal_places=6)
    lng = models.DecimalField(max_digits=9, decimal_places=6)
    note = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

