from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.conf import settings
from .models import Transaction, PaymentNumber
from orders.models import Order
from inventory.models import Inventory
from .serializers import TransactionSerializer, PaymentNumberSerializer
import stripe, hmac, hashlib

stripe.api_key = getattr(settings, 'STRIPE_SECRET_KEY', None)

# List transactions
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def transaction_list_api(request):
    if request.user.is_staff:
        txns = Transaction.objects.all()
    else:
        txns = Transaction.objects.filter(order__user=request.user)
    serializer = TransactionSerializer(txns, many=True)
    return Response(serializer.data)

# Transaction detail
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def transaction_detail_api(request, txn_id):
    txn = get_object_or_404(Transaction, id=txn_id)
    if txn.order.user != request.user and not request.user.is_staff:
        return Response({'detail': 'Not allowed'}, status=403)
    serializer = TransactionSerializer(txn)
    return Response(serializer.data)

# Admin updates transaction status
@api_view(['POST'])
@permission_classes([IsAdminUser])
def transaction_update_status_api(request, txn_id):
    txn = get_object_or_404(Transaction, id=txn_id)
    status_ = request.data.get('status')
    if status_ not in ['pending', 'success', 'failed']:
        return Response({'detail': 'Invalid status'}, status=400)
    if status_ == 'success' and not txn.reference:
        return Response({'detail': 'Cannot mark success without reference'}, status=400)

    txn.status = status_
    if status_ == 'success':
        txn.verified_at = timezone.now()
        order = txn.order
        order.payment_status = 'paid'
        order.status = 'confirmed'
        order.save()
        # Adjust stock
        for item in order.items.all():
            inv = Inventory.objects.filter(product=item.product).first()
            if inv:
                inv.current_stock = max(inv.current_stock - item.quantity, 0)
                inv.save()
    txn.save()
    return Response({'detail': 'Status updated'})

# Payment numbers
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def payment_numbers_api(request):
    numbers = PaymentNumber.objects.all()
    serializer = PaymentNumberSerializer(numbers, many=True)
    return Response(serializer.data)

# Manual payment submit by user
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def manual_payment_submit_api(request, txn_id):
    txn = get_object_or_404(Transaction, id=txn_id)
    reference = request.data.get('reference', '').strip()
    if not reference:
        return Response({'detail': 'Reference required'}, status=400)

    txn.reference = reference
    txn.status = 'pending'
    txn.save()

    return Response({
        'detail': 'Manual payment submitted',
        'txn_id': txn.id,
        'order_id': txn.order.id,
        'amount': str(txn.amount),
        'gateway': txn.gateway,
        'note': f'Use Txn#{txn.id} as reference while sending money. Admin will verify.'
    })

# Stripe webhook
@api_view(['POST'])
@permission_classes([])
def stripe_webhook_api(request):
    payload = request.body
    sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
    endpoint_secret = getattr(settings, 'STRIPE_WEBHOOK_SECRET', None)
    try:
        event = stripe.Webhook.construct_event(payload, sig_header, endpoint_secret)
    except Exception:
        return Response({'detail': 'Invalid signature'}, status=400)

    if event['type'] == 'payment_intent.succeeded':
        intent = event['data']['object']
        txn_id = intent['metadata']['txn_id']
        txn = get_object_or_404(Transaction, id=txn_id)
        txn.status = 'success'
        txn.raw_response = intent
        txn.verified_at = timezone.now()
        txn.save()

        order = txn.order
        order.payment_status = 'paid'
        order.status = 'confirmed'
        order.save()
        for item in order.items.all():
            inv = Inventory.objects.filter(product=item.product).first()
            if inv:
                inv.current_stock = max(inv.current_stock - item.quantity, 0)
                inv.save()

    return Response({'detail': 'Webhook handled'})

# Manual gateway callback (bkash/nagad/rocket)
@api_view(['POST'])
@permission_classes([])
def manual_gateway_callback_api(request, txn_id):
    txn = get_object_or_404(Transaction, id=txn_id)
    data = request.data
    signature = data.pop('signature', '')
    secret = {
        'bkash': getattr(settings, 'BKASH_SECRET', ''),
        'nogod': getattr(settings, 'NOGOD_SECRET', ''),
        'rocket': getattr(settings, 'ROCKET_SECRET', '')
    }.get(txn.gateway, '')

    if not secret:
        return Response({'detail': 'Gateway secret not configured'}, status=400)

    calculated = hmac.new(
        secret.encode(),
        "&".join(f"{k}={v}" for k, v in sorted(data.items())).encode(),
        hashlib.sha256
    ).hexdigest()

    if calculated != signature or float(data.get('amount', 0)) < float(txn.amount):
        txn.status = 'failed'
        txn.save()
        return Response({'detail': 'Invalid payment'}, status=400)

    # Mark as pending for admin verification
    txn.status = 'pending'
    txn.raw_response = data
    txn.save()

    return Response({
        'detail': 'Payment received, pending admin verification',
        'txn_id': txn.id,
        'order_id': txn.order.id,
        'amount': str(txn.amount),
        'gateway': txn.gateway
    })
