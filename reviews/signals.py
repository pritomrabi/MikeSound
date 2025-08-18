from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Review
from products.models import Product
from django.db.models import Avg

def refresh_product_rating(product_id):
    Product.objects.filter(id=product_id).update(
        average_rating = Review.objects.filter(product_id=product_id).aggregate(avg=Avg('rating'))['avg'] or 0
    )

@receiver(post_save, sender=Review)
def on_review_save(sender, instance, created, **kwargs):
    refresh_product_rating(instance.product_id)

@receiver(post_delete, sender=Review)
def on_review_delete(sender, instance, **kwargs):
    refresh_product_rating(instance.product_id)
