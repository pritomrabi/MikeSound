from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseForbidden
from .models import Review
from .forms import ReviewForm
from orders.models import Order
from django.utils import timezone

@login_required
def create_review(request, order_id, product_id):
    order = get_object_or_404(Order, id=order_id)
    # ownership
    if order.user_id != request.user.id:
        return HttpResponseForbidden("Order does not belong to you.")
    # block if review exists
    if hasattr(order, 'review'):
        return HttpResponseForbidden("Review for this order already exists.")
    # check order status
    if order.status not in ['confirmed','packed','shipped','delivered']:
        return HttpResponseForbidden("You can review only after order is confirmed.")
    # check product in order items
    if not order.items.filter(product_id=product_id).exists():
        return HttpResponseForbidden("Product not in this order.")

    if request.method == 'POST':
        form = ReviewForm(request.POST)
        if form.is_valid():
            rev = form.save(commit=False)
            rev.user = request.user
            rev.order = order
            rev.product_id = product_id
            rev.save()
            return redirect('order_detail', order_id=order.id)
    else:
        form = ReviewForm()
    return render(request, 'reviews/review_form.html', {'form': form, 'order': order, 'product_id': product_id})

@login_required
def update_review(request, review_id):
    review = get_object_or_404(Review, id=review_id, user=request.user)
    if not review.can_edit():
        return HttpResponseForbidden("Edit window expired.")
    if request.method == 'POST':
        form = ReviewForm(request.POST, instance=review)
        if form.is_valid():
            form.save()
            return redirect('order_detail', order_id=review.order.id)
    else:
        form = ReviewForm(instance=review)
    return render(request, 'reviews/review_form.html', {'form': form, 'review': review})

@login_required
def delete_review(request, review_id):
    review = get_object_or_404(Review, id=review_id, user=request.user)
    if not review.can_edit():
        return HttpResponseForbidden("Delete window expired.")
    if request.method == 'POST':
        order_id = review.order.id
        review.delete()
        return redirect('order_detail', order_id=order_id)
    return render(request, 'reviews/review_confirm_delete.html', {'review': review})

# product reviews list (public)
def product_reviews(request, product_id):
    from products.models import Product
    product = get_object_or_404(Product, id=product_id)
    reviews = product.reviews.select_related('user','order')
    return render(request, 'reviews/product_reviews.html', {'product': product, 'reviews': reviews})

