from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Coupon
from .serializers import CouponSerializer
from django.utils import timezone

# List active coupons
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def coupon_list(request):
    coupons = Coupon.objects.filter(active=True, valid_from__lte=timezone.now(), valid_to__gte=timezone.now())
    serializer = CouponSerializer(coupons, many=True)
    return Response(serializer.data)

# Coupon detail
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def coupon_detail(request, coupon_id):
    coupon = get_object_or_404(Coupon, id=coupon_id)
    serializer = CouponSerializer(coupon)
    return Response(serializer.data)

# Apply coupon
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def coupon_apply(request):
    code = request.data.get('code', '').strip()
    if not code:
        return Response({'detail': 'Code required'}, status=400)
    coupon = get_object_or_404(Coupon, code=code)
    if not coupon.is_valid():
        return Response({'detail': 'Coupon invalid or expired'}, status=400)
    request.session['coupon_id'] = coupon.id
    return Response({'detail': 'Coupon applied', 'coupon_id': coupon.id})
