from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from ..models import Cart, CartItem, Order, OrderItem
from ..serializers import CartSerializer, OrderSerializer
from inventory.models import Inventory

# Cart APIs
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def cart_detail_api(request):
    cart, _ = Cart.objects.get_or_create(user=request.user)
    serializer = CartSerializer(cart)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def cart_add_item_api(request):
    product_id = request.data.get('product_id')
    variation_id = request.data.get('variation_id')
    quantity = int(request.data.get('quantity', 1))
    cart, _ = Cart.objects.get_or_create(user=request.user)
    cart_item, created = CartItem.objects.get_or_create(
        cart=cart,
        product_id=product_id,
        variation_id=variation_id,
        defaults={'quantity': quantity}
    )
    if not created:
        cart_item.quantity += quantity
        cart_item.save()
    serializer = CartSerializer(cart)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def cart_update_item_api(request, item_id):
    item = get_object_or_404(CartItem, id=item_id, cart__user=request.user)
    quantity = int(request.data.get('quantity', item.quantity))
    if quantity <= 0:
        item.delete()
    else:
        item.quantity = quantity
        item.save()
    serializer = CartSerializer(item.cart)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def cart_remove_item_api(request, item_id):
    item = get_object_or_404(CartItem, id=item_id, cart__user=request.user)
    item.delete()
    serializer = CartSerializer(item.cart)
    return Response(serializer.data)

# Order APIs
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def order_list_api(request):
    if request.user.is_staff:
        orders = Order.objects.all().order_by('-created_at')
    else:
        orders = Order.objects.filter(user=request.user).order_by('-created_at')
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def order_detail_api(request, order_id):
    order = get_object_or_404(Order, id=order_id)
    serializer = OrderSerializer(order)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def order_delete_item_api(request, item_id):
    item = get_object_or_404(OrderItem, id=item_id)
    # Only allow admin or staff to delete
    if request.user.is_staff:
        item.delete()
        return Response({"detail": "Item deleted"})
    return Response({"detail": "Not authorized"}, status=status.HTTP_403_FORBIDDEN)
