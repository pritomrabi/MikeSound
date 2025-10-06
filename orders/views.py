from django.shortcuts import render, get_object_or_404, redirect
from .models import Cart, Address, Order, OrderItem
from django.db import transaction
from customers.models import Coupon
# Helper to get cart for both guest and logged-in user
def get_cart(request):
    if request.user.is_authenticated:
        cart, _ = Cart.objects.get_or_create(user=request.user)
    else:
        session_key = request.session.session_key
        if not session_key:
            request.session.create()
            session_key = request.session.session_key
        cart, _ = Cart.objects.get_or_create(session_key=session_key, user=None)
    return cart

# ------------------- CHECKOUT / COUPON -------------------

def checkout_view(request):
    cart = get_cart(request)
    addresses = Address.objects.filter(user=request.user) if request.user.is_authenticated else []
    subtotal = sum([item.line_total for item in cart.items.all()])
    shipping_fee = sum([item.quantity * 50 for item in cart.items.all()])

    coupon_id = request.session.get('coupon_id')
    discount = 0
    coupon = None
    if coupon_id:
        try:
            coupon = Coupon.objects.get(id=coupon_id)
            if coupon.is_valid():
                discount = coupon.discount_percent / 100 * subtotal
        except Coupon.DoesNotExist:
            pass

    grand_total = subtotal + shipping_fee - discount
    return render(request, 'orders/checkout.html', {
        'cart': cart,
        'items': cart.items.all(),
        'addresses': addresses,
        'subtotal': subtotal,
        'shipping_fee': shipping_fee,
        'discount': discount,
        'grand_total': grand_total,
        'coupon': coupon
    })

def apply_coupon(request):
    if request.method == 'POST':
        code = request.POST.get('code').strip()
        cart = get_cart(request)
        try:
            coupon = Coupon.objects.get(code=code, active=True)
            subtotal = sum([item.line_total for item in cart.items.all()])
            discount = subtotal * coupon.amount / 100 if coupon.discount_type != 'fixed' else coupon.amount

            request.session['coupon_code'] = coupon.code
            request.session['coupon_discount'] = float(discount)
        except Coupon.DoesNotExist:
            request.session['coupon_code'] = None
            request.session['coupon_discount'] = 0

    return redirect('checkout_view')

# ------------------- PLACE ORDER -------------------

def place_order(request):
    cart = get_cart(request)
    if not cart.items.exists():
        return redirect('checkout_view')

    if request.method == 'POST':
        user = request.user if request.user.is_authenticated else None

        subtotal = sum([item.line_total for item in cart.items.all()])
        shipping_fee = sum([item.quantity * 50 for item in cart.items.all()])
        discount = request.session.get('coupon_discount', 0)
        grand_total = subtotal + shipping_fee - discount

        with transaction.atomic():
            order = Order.objects.create(
                user=user,
                subtotal=subtotal,
                shipping_fee=shipping_fee,
                discount=discount,
                grand_total=grand_total,
                status='confirmed',
                payment_status='pending'
            )

            for item in cart.items.all():
                OrderItem.objects.create(
                    order=order,
                    product=item.product,
                    variation=item.variation,
                    quantity=item.quantity,
                    unit_price=item.unit_price
                )

            cart.items.all().delete()
            request.session['coupon_discount'] = 0
            request.session['coupon_code'] = None

        return redirect('order_detail', order_id=order.id)
