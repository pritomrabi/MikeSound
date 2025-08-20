from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Review
from .serializers import ReviewSerializer
from orders.models import Order
from products.models import Product
from django.utils import timezone
from datetime import timedelta

# List reviews for a product
@api_view(['GET'])
def product_reviews_list(request, product_id):
    reviews = Review.objects.filter(product_id=product_id)
    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)

# Create review
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_review_api(request, order_id, product_id):
    order = get_object_or_404(Order, id=order_id)
    if order.user_id != request.user.id:
        return Response({'detail': 'Order does not belong to you.'}, status=403)
    if hasattr(order, 'review'):
        return Response({'detail': 'Review already exists for this order.'}, status=403)
    if order.status not in ['confirmed','packed','shipped','delivered']:
        return Response({'detail': 'Order not eligible for review.'}, status=400)
    if not order.items.filter(product_id=product_id).exists():
        return Response({'detail': 'Product not in this order.'}, status=400)

    data = request.data.copy()
    data['user'] = request.user.id
    data['order'] = order.id
    data['product'] = product_id
    serializer = ReviewSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

# Update review
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_review_api(request, review_id):
    review = get_object_or_404(Review, id=review_id, user=request.user)
    if timezone.now() > (review.created_at + timedelta(days=1)):
        return Response({'detail': 'Edit window expired.'}, status=403)
    serializer = ReviewSerializer(review, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

# Delete review
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_review_api(request, review_id):
    review = get_object_or_404(Review, id=review_id, user=request.user)
    if timezone.now() > (review.created_at + timedelta(days=1)):
        return Response({'detail': 'Delete window expired.'}, status=403)
    review.delete()
    return Response({'detail': 'Review deleted'})
