from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from decimal import Decimal
from ..models import Order, OrderItem, Address, Transaction, PaymentNumber
from ..serializers import OrderSerializer, TransactionSerializer, AddressSerializer, PaymentNumberSerializer
from products.models import Product, ProductVariation

# ---------------------------
# Shipping Fee API
# ---------------------------
@api_view(['GET'])
@permission_classes([AllowAny])
def get_shipping_fee_api(request):
    return Response({"shipping_fee": 50})

# ---------------------------
# Place Order API
# ---------------------------
@api_view(['POST'])
@permission_classes([AllowAny])
def place_order_api(request):
    data = request.data
    address_data = data.get('address')
    items = data.get('items', [])
    shipping_fee = Decimal(str(data.get('shipping_fee', 0)))

    if not address_data or not items:
        return Response({'error': 'Address and items required'}, status=status.HTTP_400_BAD_REQUEST)

    # Create Address
    addr_serializer = AddressSerializer(data=address_data)
    if addr_serializer.is_valid():
        address = addr_serializer.save()
    else:
        return Response(addr_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Create Order
    order = Order.objects.create(
        address=address,
        shipping_fee=shipping_fee,
        subtotal=0,
        discount=0,
        grand_total=0,
        status='pending',
        payment_status='pending'
    )

    total = Decimal(0)
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
        total += line_total

    # Update order totals
    order.subtotal = total
    order.grand_total = total + shipping_fee
    order.save()

    # Create Transaction
    Transaction.objects.create(
        order=order,
        amount=order.grand_total,
        gateway='manual',
        status='pending'
    )

    return Response({
        "success": True,
        "order_id": order.id,
        "shipping_fee": float(shipping_fee),
        "grand_total": float(order.grand_total)
    }, status=status.HTTP_201_CREATED)

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

# ---------------------------
# Payment Numbers API
# ---------------------------
@api_view(['GET'])
@permission_classes([AllowAny])
def payment_numbers_api(request):
    numbers = PaymentNumber.objects.all()
    serializer = PaymentNumberSerializer(numbers, many=True)
    return Response({'payment_numbers': serializer.data})
