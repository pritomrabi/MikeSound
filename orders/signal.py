from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver
from .models import Order, OrderItem
from inventory.models import Inventory

def adjust_inventory_item(item, increase=False):
    try:
        if item.variation:
            inventory = Inventory.objects.get(product=item.product, variation=item.variation)
        else:
            inventory = Inventory.objects.get(product=item.product)
        qty_change = item.quantity if not increase else -item.quantity
        inventory.current_stock -= qty_change
        if inventory.current_stock < 0:
            inventory.current_stock = 0
        inventory.save()
    except Inventory.DoesNotExist:
        pass

def adjust_sold_count(item, increase=True):
    if item.product:
        change = item.quantity if increase else -item.quantity
        item.product.sold_count += change
        if item.product.sold_count < 0:
            item.product.sold_count = 0
        item.product.save(update_fields=['sold_count'])

# Order confirmed with paid status
@receiver(post_save, sender=Order)
def handle_order_confirmation(sender, instance, **kwargs):
    if instance.status == 'confirmed' and instance.payment_status == 'paid':
        for item in instance.items.all():
            adjust_inventory_item(item)
            adjust_sold_count(item, increase=True)
        # Clear user's cart or guest session cart
        cart = None
        if instance.user:
            cart = getattr(instance.user, 'cart', None)
        else:
            from .models import Cart
            cart = Cart.objects.filter(session_key=getattr(instance, 'session_key', None)).first()
        if cart:
            cart.items.all().delete()

# Order canceled
@receiver(post_save, sender=Order)
def handle_order_cancellation(sender, instance, **kwargs):
    if instance.status == 'canceled':
        for item in instance.items.all():
            adjust_inventory_item(item, increase=True)
            adjust_sold_count(item, increase=False)

# Restore inventory if order deleted
@receiver(pre_delete, sender=Order)
def restore_inventory_on_delete(sender, instance, **kwargs):
    for item in instance.items.all():
        adjust_inventory_item(item, increase=True)
        adjust_sold_count(item, increase=False)
