from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from ..models import Order, OrderItem, Address, Transaction
from ..serializers import OrderSerializer, TransactionSerializer, AddressSerializer
from products.models import Product, ProductVariation
from decimal import Decimal
from ..models import PaymentNumber
from ..serializers import PaymentNumberSerializer
# ---------------------------
# Cart / Checkout API
# ---------------------------
@api_view(['POST'])
@permission_classes([AllowAny])
def place_order_api(request):
    data = request.data
    items = data.get('items', [])
    address_data = data.get('address', {})

    if not items or not address_data:
        return Response({'error': 'Items and address required'}, status=400)

    addr_serializer = AddressSerializer(data=address_data)
    if addr_serializer.is_valid():
        addr = addr_serializer.save(user=request.user if request.user.is_authenticated else None)
    else:
        return Response(addr_serializer.errors, status=400)

    subtotal = Decimal(0)
    for i in items:
        prod = get_object_or_404(Product, id=i['product_id'])
        var = ProductVariation.objects.filter(id=i.get('variation_id')).first()
        price = prod.get_discounted_price(var)
        subtotal += price * i['quantity']

    grand_total = subtotal  # shipping, discount can be added if needed

    order = Order.objects.create(
        user=request.user if request.user.is_authenticated else None,
        address=addr,
        subtotal=subtotal,
        shipping_fee=0,
        discount=0,
        grand_total=grand_total,
        status='pending',
        payment_status='pending'
    )

    for i in items:
        prod = get_object_or_404(Product, id=i['product_id'])
        var = ProductVariation.objects.filter(id=i.get('variation_id')).first()
        price = prod.get_discounted_price(var)
        OrderItem.objects.create(order=order, product=prod, variation=var, quantity=i['quantity'], unit_price=price)

    txn = Transaction.objects.create(order=order, amount=grand_total, gateway='manual', status='pending')

    return Response({'success': True, 'order_id': order.id, 'txn_id': txn.id})


# ---------------------------
# Order History API
# ---------------------------
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def order_history_api(request):
    orders = Order.objects.filter(user=request.user).order_by('-created_at')
    serializer = OrderSerializer(orders, many=True)
    return Response({'orders': serializer.data})


# ---------------------------
# Cancel Order API
# ---------------------------
@api_view(['POST'])
@permission_classes([AllowAny])
def cancel_order_api(request, order_id):
    if request.user.is_authenticated:
        order = get_object_or_404(Order, id=order_id, user=request.user)
    else:
        session_key = request.session.session_key or request.session.create()
        order = get_object_or_404(Order, id=order_id, session_key=session_key)

    if order.status in ['canceled', 'delivered']:
        return Response({'error': 'Cannot cancel this order'}, status=400)

    order.status = 'canceled'
    order.save()
    return Response({'success': True, 'order_id': order.id, 'new_status': order.status})


# ---------------------------
# Manual Payment Submit API
# ---------------------------
@api_view(['POST'])
@permission_classes([AllowAny])
def manual_payment_submit_api(request, txn_id):
    txn = get_object_or_404(Transaction, id=txn_id)
    reference = request.data.get('reference', '').strip()
    if not reference:
        return Response({'error': 'Reference required'}, status=400)
    txn.reference = reference
    txn.status = 'pending'
    txn.save()
    return Response({'success': True, 'txn_id': txn.id})

@api_view(['GET'])
@permission_classes([AllowAny])
def payment_numbers_api(request):
    """
    Return all payment numbers for bkash, nagad, rocket.
    """
    numbers = PaymentNumber.objects.all()
    serializer = PaymentNumberSerializer(numbers, many=True)
    return Response({'payment_numbers': serializer.data})