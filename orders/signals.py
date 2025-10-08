from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver
from .models import Order, OrderItem
from inventory.models import Inventory
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from .models import Order

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





@receiver(post_save, sender=Order)
def send_order_confirmation_email(sender, instance, created, **kwargs):
    if not created and instance.status == 'confirmed':
        email = instance.address.email
        if not email:
            return
        subject = f"Order #{instance.id} Confirmed"
        items_text = ""
        for item in instance.items.all():
            items_text += f"{item.product.title} x {item.quantity} ({item.color}) - ${item.line_total}\n"
        message = f"Hello {instance.address.full_name},\n\nYour order has been confirmed.\n\nProducts:\n{items_text}\nSubtotal: ${instance.subtotal}\nShipping: ${instance.shipping_fee}\nGrand Total: ${instance.grand_total}\n\nThank you for shopping!"
        send_mail(subject, message, None, [email], fail_silently=False)