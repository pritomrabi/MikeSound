from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver
from .models import Order, OrderItem
from inventory.models import Inventory

@receiver(post_save, sender=Order)
def adjust_inventory(sender, instance, created, **kwargs):
    if created and instance.status == 'confirmed':
        for item in instance.items.all():
            inventory = Inventory.objects.get(product=item.product)
            inventory.current_stock -= item.quantity
            if inventory.current_stock < 0:
                inventory.current_stock = 0
            inventory.save()

@receiver(pre_delete, sender=Order)
def restore_inventory(sender, instance, **kwargs):
    for item in instance.items.all():
        inventory = Inventory.objects.get(product=item.product)
        inventory.current_stock += item.quantity
        inventory.save()

@receiver(post_save, sender=OrderItem)
def increase_sold_count(sender, instance, created, **kwargs):
    if created and instance.product:
        instance.product.sold_count += instance.quantity
        instance.product.save(update_fields=['sold_count'])

@receiver(pre_delete, sender=OrderItem)
def decrease_sold_count(sender, instance, **kwargs):
    if instance.product and instance.product.sold_count >= instance.quantity:
        instance.product.sold_count -= instance.quantity
        instance.product.save(update_fields=['sold_count'])

@receiver(post_save, sender=Order)
def handle_order_cancellation(sender, instance, **kwargs):
    if instance.status == 'canceled':
        for item in instance.items.all():
            if item.product and item.product.sold_count >= item.quantity:
                item.product.sold_count -= item.quantity
                item.product.save(update_fields=['sold_count'])

@receiver(post_save, sender=Order)
def handle_order_confirmation(sender, instance, **kwargs):
    if instance.status == 'confirmed' and instance.payment_status == 'paid':
        # Inventory adjust
        for item in instance.items.all():
            try:
                inventory = Inventory.objects.get(product=item.product)
                inventory.current_stock -= item.quantity
                if inventory.current_stock < 0:
                    inventory.current_stock = 0
                inventory.save()
            except Inventory.DoesNotExist:
                pass

            # Product sold count
            if item.product:
                item.product.sold_count += item.quantity
                item.product.save(update_fields=['sold_count'])

        # Clear user's cart
        cart = getattr(instance.user, 'cart', None)
        if cart:
            cart.items.all().delete()