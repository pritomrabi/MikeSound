from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from ..models import *
from ..serializers import *
from customers.models import Coupon
# ------------------- HELPERS -------------------

def get_cart_for_user(request):
    if request.user.is_authenticated:
        cart, _ = Cart.objects.get_or_create(user=request.user)
    else:
        session_key = request.session.session_key
        if not session_key:
            request.session.create()
            session_key = request.session.session_key
        cart, _ = Cart.objects.get_or_create(session_key=session_key, user=None)
    return cart

# ------------------- CART API -------------------

@api_view(['GET'])
@permission_classes([AllowAny])
def cart_detail_api(request):
    cart = get_cart_for_user(request)
    serializer = CartSerializer(cart)
    return Response(serializer.data)

# ------------------- ORDER API -------------------

@api_view(['GET'])
@permission_classes([AllowAny])
def order_list_api(request):
    if request.user.is_staff:
        orders = Order.objects.all().order_by('-created_at')
    else:
        orders = Order.objects.filter(user=request.user).order_by('-created_at')
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def order_detail_api(request, order_id):
    order = get_object_or_404(Order, id=order_id)
    serializer = OrderSerializer(order)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([AllowAny])
def place_order_api(request):
    cart = get_cart_for_user(request)
    if not cart.items.exists():
        return Response({"error": "Cart is empty"}, status=status.HTTP_400_BAD_REQUEST)

    subtotal = sum([item.quantity * item.unit_price for item in cart.items.all()])
    shipping_fee = sum([item.quantity * 50 for item in cart.items.all()])
    discount = request.session.get('coupon_discount', 0)
    grand_total = subtotal + shipping_fee - discount

    order = Order.objects.create(
        user=request.user if request.user.is_authenticated else None,
        subtotal=subtotal,
        shipping_fee=shipping_fee,
        discount=discount,
        grand_total=grand_total,
        status='confirmed',
        payment_status='pending'
    )

    for item in cart.items.all():
        order.items.create(
            product=item.product,
            variation=item.variation,
            quantity=item.quantity,
            unit_price=item.unit_price
        )

    cart.items.all().delete()
    request.session['coupon_discount'] = 0
    request.session['coupon_code'] = None

    serializer = OrderSerializer(order)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([AllowAny])
def apply_coupon_api(request):
    code = request.data.get("code", "").strip().upper()
    try:
        coupon = Coupon.objects.get(code=code, active=True)
        return Response({
            "valid": True,
            "discount_percent": coupon.discount_percent
        })
    except Coupon.DoesNotExist:
        return Response({
            "valid": False,
            "error": "Coupon not match"
        }, status=400)