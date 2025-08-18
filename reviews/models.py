from django.db import models
from django.conf import settings
from django.utils import timezone
from products.models import Product
from orders.models import Order
from datetime import timedelta

User = settings.AUTH_USER_MODEL

class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name='review')  # one review per order
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    rating = models.PositiveSmallIntegerField()  # 1-5 enforced in clean
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def clean(self):
        from django.core.exceptions import ValidationError
        # rating range
        if not (1 <= self.rating <= 5):
            raise ValidationError("Rating must be between 1 and 5.")
        # order ownership
        if self.order.user_id != self.user_id:
            raise ValidationError("Order does not belong to this user.")
        # order status must be confirmed or later
        if self.order.status not in ['confirmed','packed','shipped','delivered']:
            raise ValidationError("You can review only after order is confirmed.")
        # ensure order product present in items
        if not self.order.items.filter(product_id=self.product_id).exists():
            raise ValidationError("This product is not part of the given order.")

    def can_edit(self):
        # allow edit/delete within 1 day of creation
        return timezone.now() <= (self.created_at + timedelta(days=1))

    def __str__(self):
        return f"Review #{self.id} by {self.user} for Order {self.order.id}"

