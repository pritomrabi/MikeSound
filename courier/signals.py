from django.db.models.signals import post_save
from django.dispatch import receiver
from orders.models import Order
from .models import OrderCourier, Courier
import random

@receiver(post_save, sender=Order)
def assign_courier_after_full_payment(sender, instance, created, **kwargs):
    if instance.payment_status == 'paid' and not instance.courier_assignments.exists():
        couriers = list(Courier.objects.filter(is_active=True))
        courier = random.choice(couriers) if couriers else None
        OrderCourier.objects.create(
            order=instance,
            courier=courier,
            auto_assigned=True,
            status='assigned'
        )
