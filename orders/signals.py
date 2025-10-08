from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver
from django.core.mail import send_mail
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


@receiver(post_save, sender=Order)
def handle_order_confirmation(sender, instance, **kwargs):
    if instance.status == 'confirmed' and instance.payment_status == 'paid':
        for item in instance.items.all():
            adjust_inventory_item(item)
            adjust_sold_count(item, increase=True)
        # cart remove করা হয়েছে, কারণ cart app নাই


@receiver(post_save, sender=Order)
def handle_order_cancellation(sender, instance, **kwargs):
    if instance.status == 'canceled':
        for item in instance.items.all():
            adjust_inventory_item(item, increase=True)
            adjust_sold_count(item, increase=False)


@receiver(pre_delete, sender=Order)
def restore_inventory_on_delete(sender, instance, **kwargs):
    for item in instance.items.all():
        adjust_inventory_item(item, increase=True)
        adjust_sold_count(item, increase=False)


@receiver(post_save, sender=Order)
def send_order_confirmation_email(sender, instance, created, **kwargs):
    if not created and instance.status == 'confirmed' and instance.payment_status == 'paid':
        subject = f"Mikesound - Order #{instance.id} Confirmed"
        items_text = ""
        for item in instance.items.all():
            color_text = f" ({item.color})" if getattr(item, 'color', None) else ""
            items_text += f"{item.product.title} x {item.quantity}{color_text} - ${item.line_total}\n"
        message = f"""
Hello {instance.address.full_name},

Thank you for shopping with Mikesound. Your order has been confirmed.

Order Details:
{items_text}
Subtotal: ${instance.subtotal}
Shipping: ${instance.shipping_fee}
Grand Total: ${instance.grand_total}

You can visit Mikesound for more products: https://mikesound.com

Thank you for choosing Mikesound!
"""
        send_mail(
            subject,
            message,
            None,
            [instance.address.email],
            fail_silently=False
        )
