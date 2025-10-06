from django.shortcuts import render, get_object_or_404, redirect
from .models import Cart, CartItem, Order, OrderItem, Address
from products.models import Product, ProductVariation
from customers.models import Coupon
from django.db import transaction
from django.db.models import Sum

# helper to get cart for both guest and logged user
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

def cart_view(request):
    cart = get_cart(request)
    items = cart.items.select_related('product', 'variation').prefetch_related('product__images')

    subtotal = sum([item.line_total for item in items])
    coupon_discount = request.session.get('coupon_discount', 0)
    grand_total = subtotal - coupon_discount

    return render(request, 'orders/cart.html', {
        'cart': cart,
        'items': items,
        'subtotal': subtotal,
        'discount': coupon_discount,
        'grand_total': grand_total
    })

def add_to_cart(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    variation = None
    if 'variation_id' in request.POST:
        variation = get_object_or_404(ProductVariation, id=request.POST['variation_id'])
    quantity = int(request.POST.get('quantity', 1))
    cart = get_cart(request)
    unit_price = variation.product.get_discounted_price(variation) if variation else product.get_discounted_price()
    cart_item, created = CartItem.objects.get_or_create(
        cart=cart,
        product=product,
        variation=variation,
        defaults={'unit_price': unit_price, 'quantity': quantity}
    )
    if not created:
        cart_item.quantity += quantity
        cart_item.save()
    return redirect('cart_view')

def update_cart(request, item_id):
    cart = get_cart(request)
    item = get_object_or_404(CartItem, id=item_id, cart=cart)
    qty = int(request.POST.get('quantity', 1))

    if 'variation_id' in request.POST:
        variation_id = request.POST.get('variation_id')
        variation = get_object_or_404(ProductVariation, id=variation_id)
        item.variation = variation
        # update unit_price with discounted price
        item.unit_price = variation.product.get_discounted_price(variation)

    if qty <= 0:
        item.delete()
    else:
        item.quantity = qty
        item.save()

    return redirect('cart_view')

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
            if coupon.discount_type == 'fixed':
                discount = coupon.amount
            else:
                subtotal = sum([item.line_total for item in cart.items.all()])
                discount = subtotal * coupon.amount / 100

            request.session['coupon_code'] = coupon.code
            request.session['coupon_discount'] = float(discount)
        except Coupon.DoesNotExist:
            request.session['coupon_code'] = None
            request.session['coupon_discount'] = 0

    return redirect('checkout_view')

def update_checkout_cart(request, item_id):
    cart = get_cart(request)
    item = get_object_or_404(CartItem, id=item_id, cart=cart)

    if 'delete' in request.GET:
        item.delete()
        return redirect('checkout_view')

    if request.method == 'POST':
        qty = int(request.POST.get('quantity', 1))
        if qty <= 0:
            item.delete()
            return redirect('checkout_view')

        if request.POST.get('variation_id'):
            variation_id = request.POST['variation_id']
            variation = get_object_or_404(ProductVariation, id=variation_id)
            item.variation = variation
            # discounted price update
            item.unit_price = variation.product.get_discounted_price(variation)

        item.quantity = qty
        item.save()

    return redirect('checkout_view')

def remove_cart_item(request, item_id):
    cart = get_cart(request)
    item = get_object_or_404(CartItem, id=item_id, cart=cart)
    item.delete()
    return redirect('cart_view')

def place_order(request):
    cart = get_cart(request)
    if not cart.items.exists():
        return redirect('cart_view')

    if request.method == 'POST':
        user = request.user if request.user.is_authenticated else None

        address = Address.objects.create(
            user=user,
            full_name=request.POST.get('name'),
            phone=request.POST.get('phone'),
            line1=request.POST.get('street'),
            city=request.POST.get('city'),
            state=request.POST.get('state', ''),
            postal_code=request.POST.get('postal_code'),
            country=request.POST.get('country'),
            is_shipping=True
        )

        subtotal = sum([item.quantity * item.unit_price for item in cart.items.all()])
        shipping_fee = sum([item.quantity * 50 for item in cart.items.all()])
        discount = request.session.get('coupon_discount', 0)
        grand_total = subtotal + shipping_fee - discount

        with transaction.atomic():
            order = Order.objects.create(
                user=user,
                address=address,
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

def order_list(request):
    from django.contrib.auth.decorators import login_required
    if request.user.is_staff:
        orders = Order.objects.all().order_by('-created_at')
    else:
        orders = Order.objects.filter(user=request.user).order_by('-created_at')
    return render(request, 'orders/order_list.html', {'orders': orders})

def order_detail(request, order_id):
    order = get_object_or_404(Order, id=order_id)
    items = order.items.select_related('product', 'variation').prefetch_related('product__images')
    return render(request, 'orders/order_detail.html', {'order': order, 'items': items})

def order_history(request):
    orders = []
    if request.user.is_authenticated:
        orders = Order.objects.filter(user=request.user, status='confirmed').order_by('-created_at')
    return render(request, 'orders/order_history.html', {'orders': orders})
