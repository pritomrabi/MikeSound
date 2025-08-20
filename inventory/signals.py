from django.db.models.signals import post_save, pre_save, post_delete
from django.dispatch import receiver
from .models import PurchaseItem, Inventory, SupplierLedger, SupplierPayment


# Tracking old quantities and products
@receiver(pre_save, sender=PurchaseItem)
def track_old_quantity_and_product(sender, instance, **kwargs):
    if instance.pk:
        old_item = PurchaseItem.objects.get(pk=instance.pk)
        instance._old_quantity = old_item.quantity
        instance._old_product = old_item.product
    else:
        instance._old_quantity = 0
        instance._old_product = None


# Inventory update when PurchaseItem is created or updated
@receiver(post_save, sender=PurchaseItem)
def update_inventory_on_purchase(sender, instance, created, **kwargs):
    # Reduce stock from old products when product changes
    if not created and instance._old_product and instance._old_product != instance.product:
        old_inventory, _ = Inventory.objects.get_or_create(product=instance._old_product)
        old_inventory.current_stock -= instance._old_quantity
        if old_inventory.current_stock < 0:
            old_inventory.current_stock = 0
        old_inventory.save()
        instance._old_quantity = 0

    # Stock adjustment for new or updated quantity
    inventory, _ = Inventory.objects.get_or_create(product=instance.product)
    qty_diff = instance.quantity - getattr(instance, "_old_quantity", 0)
    inventory.current_stock += qty_diff
    if inventory.current_stock < 0:
        inventory.current_stock = 0
    inventory.save()

    # Ledger debit only if new
    if created:
        if not SupplierLedger.objects.filter(
            supplier=instance.purchase.supplier,
            amount=instance.line_total,
            transaction_type='debit',
            purchase=instance.purchase
        ).exists():
            SupplierLedger.objects.create(
                supplier=instance.purchase.supplier,
                amount=instance.line_total,
                transaction_type='debit',
                purchase=instance.purchase
            )


# Reduce inventory when PurchaseItem is deleted
@receiver(post_delete, sender=PurchaseItem)
def update_inventory_on_delete(sender, instance, **kwargs):
    inventory = Inventory.objects.filter(product=instance.product).first()
    if inventory:
        inventory.current_stock -= instance.quantity
        if inventory.current_stock < 0:
            inventory.current_stock = 0
        inventory.save()


# Ledger credit when SupplierPayment is created
@receiver(post_save, sender=SupplierPayment)
def update_ledger_on_payment(sender, instance, created, **kwargs):
    if created:
        if not SupplierLedger.objects.filter(
            supplier=instance.supplier,
            amount=instance.amount,
            transaction_type='credit',
            payment=instance
        ).exists():
            SupplierLedger.objects.create(
                supplier=instance.supplier,
                amount=instance.amount,
                transaction_type='credit',
                payment=instance
            )
