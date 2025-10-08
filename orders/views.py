from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from .models import Order, OrderItem, Address, Transaction, PaymentNumber
from products.models import Product, ProductVariation
from decimal import Decimal

# -------------------------
# Checkout: create order
# -------------------------
def place_order(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'POST required'}, status=400)

    data = request.POST
    items = data.get('items')  # [{"product_id":1,"variation_id":2,"quantity":3,"color":"red","price":100,"total_price":300,"image":"url"}, ...]
    address_data = data.get('address')  # full_name, line1, line2, city, state, postal_code, country, email, phone, note

    if not items or not address_data:
        return JsonResponse({'error': 'Items and address required'}, status=400)

    # Create Address
    addr = Address.objects.create(
        user=request.user if request.user.is_authenticated else None,
        full_name=address_data['full_name'],
        line1=address_data['line1'],
        line2=address_data.get('line2', ''),
        city=address_data['city'],
        state=address_data['state'],
        postal_code=address_data.get('postal_code', ''),
        country=address_data.get('country', ''),
        email=address_data.get('email', ''),
        phone=address_data['phone'],
        note=address_data.get('note', '')
    )

    # Calculate subtotal
    subtotal = Decimal(0)
    for i in items:
        price = Decimal(str(i.get('price', 0)))
        quantity = int(i.get('quantity', 1))
        subtotal += price * quantity

    shipping_fee = Decimal(str(data.get('shipping_fee', 0)))
    discount = Decimal(str(data.get('discount', 0)))
    grand_total = subtotal + shipping_fee - discount

    # Create Order
    order = Order.objects.create(
        user=request.user if request.user.is_authenticated else None,
        address=addr,
        subtotal=subtotal,
        shipping_fee=shipping_fee,
        discount=discount,
        grand_total=grand_total,
        status='pending',
        payment_status='pending'
    )

    # Create Order Items
    for i in items:
        prod = Product.objects.filter(id=i['product_id']).first()
        if not prod:
            continue
        var = ProductVariation.objects.filter(id=i.get('variation_id')).first() if i.get('variation_id') else None
        unit_price = Decimal(str(i.get('price', prod.get_discounted_price(var))))
        quantity = int(i.get('quantity', 1))
        line_total = Decimal(str(i.get('total_price', unit_price * quantity)))

        OrderItem.objects.create(
            order=order,
            product=prod,
            variation=var,
            quantity=quantity,
            unit_price=unit_price,
            color=i.get('color', ''),
            line_total=line_total,
            image=i.get('image', '')
        )

    # Create Transaction
    txn = Transaction.objects.create(
        order=order,
        amount=grand_total,
        gateway='manual',
        status='pending'
    )

    return JsonResponse({'success': True, 'order_id': order.id, 'txn_id': txn.id})


# -------------------------
# Manual Payment submission
# -------------------------
def manual_payment_submit(request, txn_id):
    txn = get_object_or_404(Transaction, id=txn_id)
    reference = request.POST.get('reference', '').strip()
    if not reference:
        return JsonResponse({'error': 'Reference required'}, status=400)
    txn.reference = reference
    txn.status = 'pending'
    txn.save()
    return JsonResponse({'success': True, 'txn_id': txn.id})


# -------------------------
# Cancel Order
# -------------------------
def cancel_order(request, order_id):
    if request.user.is_authenticated:
        order = get_object_or_404(Order, id=order_id, user=request.user)
    else:
        session_key = request.session.session_key or request.session.create()
        order = get_object_or_404(Order, id=order_id, session_key=session_key)

    if order.status in ['canceled', 'delivered']:
        return JsonResponse({'error': 'Cannot cancel this order'}, status=400)

    order.status = 'canceled'
    order.save()
    return JsonResponse({'success': True, 'order_id': order.id, 'new_status': order.status})


# -------------------------
# Order History
# -------------------------
def order_history(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Authentication required'}, status=401)

    orders = Order.objects.filter(user=request.user).order_by('-created_at')
    data = []
    for order in orders:
        items = []
        for item in order.items.all():
            items.append({
                'product': item.product.title,
                'variation': item.variation.color.name if item.variation and item.variation.color else None,
                'quantity': item.quantity,
                'unit_price': float(item.unit_price),
                'line_total': float(item.line_total),
                'color': item.color,
                'total_price': float(item.line_total),
                'image': item.image
            })
        data.append({
            'id': order.id,
            'status': order.status,
            'payment_status': order.payment_status,
            'grand_total': float(order.grand_total),
            'items': items,
            'created_at': order.created_at.strftime('%Y-%m-%d %H:%M:%S')
        })
    return JsonResponse({'orders': data})
