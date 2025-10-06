from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from ..models import Cart, CartItem, Order, OrderItem
from ..serializers import CartSerializer, OrderSerializer
from products.models import ProductVariation

# Cart APIs
@api_view(['GET'])
@permission_classes([AllowAny])
def cart_detail_api(request):
    cart, _ = Cart.objects.get_or_create(user=request.user)
    serializer = CartSerializer(cart)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([AllowAny])
def cart_add_item_api(request):
    product_id = request.data.get('product_id')
    variation_id = request.data.get('variation_id')
    quantity = int(request.data.get('quantity', 1))

    variation = None
    if variation_id:
        variation = get_object_or_404(ProductVariation, id=variation_id)
        if variation.stock < quantity:
            return Response({
                "error": f"{variation.size} {variation.color.name if variation.color else 'No Color'} has only {variation.stock} items in stock"
            }, status=status.HTTP_400_BAD_REQUEST)

    cart, _ = Cart.objects.get_or_create(user=request.user)
    cart_item, created = CartItem.objects.get_or_create(
        cart=cart,
        product_id=product_id,
        variation=variation,
        defaults={'quantity': quantity, 'unit_price': variation.price if variation else 0}
    )
    if not created:
        new_quantity = cart_item.quantity + quantity
        if variation and variation.stock < new_quantity:
            return Response({
                "error": f"Cannot add {quantity} more. Stock available: {variation.stock - cart_item.quantity}"
            }, status=status.HTTP_400_BAD_REQUEST)
        cart_item.quantity = new_quantity
        cart_item.save()

    serializer = CartSerializer(cart)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['PUT', 'PATCH'])
@permission_classes([AllowAny])
def cart_update_item_api(request, item_id):
    item = get_object_or_404(CartItem, id=item_id, cart__user=request.user)
    quantity = int(request.data.get('quantity', item.quantity))

    if item.variation and item.variation.stock < quantity:
        return Response({
            "error": f"Only {item.variation.stock} items available for {item.variation.size} {item.variation.color.name if item.variation.color else 'No Color'}"
        }, status=status.HTTP_400_BAD_REQUEST)

    if quantity <= 0:
        item.delete()
    else:
        item.quantity = quantity
        item.save()

    serializer = CartSerializer(item.cart)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([AllowAny])
def cart_remove_item_api(request, item_id):
    item = get_object_or_404(CartItem, id=item_id, cart__user=request.user)
    item.delete()
    serializer = CartSerializer(item.cart)
    return Response(serializer.data)

# Order APIs
@api_view(['POST'])
@permission_classes([AllowAny])
def place_order_api(request):
    cart = get_object_or_404(Cart, user=request.user)
    if not cart.items.exists():
        return Response({"error": "Cart is empty"}, status=status.HTTP_400_BAD_REQUEST)

    out_of_stock_items = []
    for item in cart.items.all():
        var = item.variation
        if var and var.stock < item.quantity:
            out_of_stock_items.append({
                "product": item.product.title,
                "variation": f"{var.size} {var.color.name if var.color else 'No Color'}",
                "available_stock": var.stock
            })

    if out_of_stock_items:
        return Response({
            "error": "Some items are out of stock",
            "details": out_of_stock_items
        }, status=status.HTTP_400_BAD_REQUEST)

    order = Order.objects.create(
        user=request.user,
        subtotal=sum([item.line_total for item in cart.items.all()]),
        shipping_fee=sum([item.quantity*50 for item in cart.items.all()]),
        discount=request.session.get('coupon_discount', 0),
        grand_total=sum([item.line_total for item in cart.items.all()]) + sum([item.quantity*50 for item in cart.items.all()]) - request.session.get('coupon_discount', 0),
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
        if item.variation:
            item.variation.stock -= item.quantity
            if item.variation.stock < 0:
                item.variation.stock = 0
            item.variation.save()

    cart.items.all().delete()
    request.session['coupon_discount'] = 0
    request.session['coupon_code'] = None

    serializer = OrderSerializer(order)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

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

@api_view(['DELETE'])
@permission_classes([AllowAny])
def order_delete_item_api(request, item_id):
    item = get_object_or_404(OrderItem, id=item_id)
    if item.order.user != request.user and not request.user.is_staff:
        return Response({'detail': 'Not allowed'}, status=403)
    item.delete()
    return Response({'detail': 'Item deleted'})
