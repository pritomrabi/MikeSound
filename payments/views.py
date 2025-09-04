from django.shortcuts import render, redirect, get_object_or_404
from django.conf import settings
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.contrib.admin.views.decorators import staff_member_required
from .models import Transaction, PaymentNumber
from orders.models import Order
import stripe, hmac, hashlib, json

stripe.api_key = getattr(settings, 'STRIPE_SECRET_KEY', None)

def payment_init(request, order_id, gateway):
    order = get_object_or_404(Order, id=order_id)
    if order.payment_status == 'paid':
        return render(request, 'payment/already_paid.html', {'order': order})

    txn = Transaction.objects.create(order=order, amount=order.grand_total, gateway=gateway, status='pending')

    if gateway in ['bkash', 'nogod', 'rocket'] and getattr(settings, 'MANUAL_PAYMENT_ACCOUNTS', None):
        return redirect('payment_manual_start', order_id=order.id, gateway=gateway)

    if gateway == 'manual':
        return redirect('payment_manual_start', order_id=order.id, gateway='manual')

    if gateway == 'stripe':
        intent = stripe.PaymentIntent.create(
            amount=int(order.grand_total * 100),
            currency='usd',
            metadata={'txn_id': txn.id, 'order_id': order.id},
        )
        return render(
            request,
            'payment/stripe_redirect.html',
            {'client_secret': intent.client_secret, 'STRIPE_PUBLISHABLE_KEY': settings.STRIPE_PUBLISHABLE_KEY}
        )

    payload = {}
    gateway_url = ''
    if gateway == 'bkash':
        payload = {
            'merchant_msisdn': settings.BKASH_MERCHANT,
            'amount': str(order.grand_total),
            'order_id': txn.id,
            'callback_url': request.build_absolute_uri(f'/payment/callback/{txn.id}/')
        }
        gateway_url = settings.BKASH_URL
    elif gateway == 'nogod':
        payload = {
            'merchant_number': settings.NOGOD_MERCHANT_NUMBER,
            'order_id': txn.id,
            'amount': str(order.grand_total),
            'callback_url': request.build_absolute_uri(f'/payment/callback/{txn.id}/')
        }
        gateway_url = settings.NOGOD_URL
    elif gateway == 'sslcommerz':
        payload = {
            'store_id': settings.SSLCOMMERZ_STORE_ID,
            'store_passwd': settings.SSLCOMMERZ_STORE_PASS,
            'total_amount': str(order.grand_total),
            'currency': 'BDT',
            'tran_id': txn.id,
            'success_url': request.build_absolute_uri(f'/payment/callback/{txn.id}/'),
            'fail_url': request.build_absolute_uri(f'/payment/callback/{txn.id}/'),
        }
        gateway_url = settings.SSLCOMMERZ_URL

    return render(request, 'payment/gateway_redirect.html', {'payload': payload, 'gateway_url': gateway_url})

def manual_start(request, order_id, gateway):
    order = get_object_or_404(Order, id=order_id)
    if order.payment_status == 'paid':
        return render(request, 'payment/already_paid.html', {'order': order})

    txn = Transaction.objects.create(order=order, amount=order.grand_total, gateway=gateway, status='pending')
    payment_numbers = PaymentNumber.objects.all()

    return render(
        request,
        'payment/manual_payment.html',
        {
            'txn': txn,
            'payment_numbers': payment_numbers,
            'gateway': gateway
        }
    )

def manual_reference_submit(request, txn_id):
    txn = get_object_or_404(Transaction, id=txn_id)
    if request.method != 'POST':
        return redirect('payment_manual_start', order_id=txn.order.id, gateway=txn.gateway)

    reference = request.POST.get('reference', '').strip()
    if not reference:
        return render(request, 'payment/manual_payment.html', {
            'txn': txn,
            'payment_numbers': PaymentNumber.objects.all(),
            'gateway': txn.gateway,
            'error': 'Reference required. Use Txn ID as reference.'
        })

    txn.reference = reference
    txn.status = 'pending'  # Always pending until admin verifies
    txn.save()
    return render(request, 'payment/manual_submitted.html', {
        'txn': txn,
        'note': f'Use Txn#{txn.id} as reference when transferring. Admin will verify.'
    })


@staff_member_required
def manual_verify(request, txn_id):
    txn = get_object_or_404(Transaction, id=txn_id)
    if request.method == 'POST':
        status = request.POST.get('status')
        reference = request.POST.get('reference', '').strip()

        if reference:
            txn.reference = reference

        # Only allow admin to mark success if they verified actual payment
        if status in ['success', 'failed']:
            txn.status = status
        if status == 'success':
            txn.verified_at = timezone.now()
            order = txn.order
            order.payment_status = 'paid'
            order.status = 'confirmed'
            order.save()
            try:
                from inventory.services import decrement_stock_for_order
                decrement_stock_for_order(order)
            except Exception:
                pass

        txn.save()
        return redirect('manual_payment_done', txn_id=txn.id)

    return render(request, 'payment/manual_verify.html', {'txn': txn})


def manual_done(request, txn_id):
    txn = get_object_or_404(Transaction, id=txn_id)
    return render(request, 'payment/manual_done.html', {'txn': txn})

@csrf_exempt
def payment_callback(request, txn_id):
    txn = get_object_or_404(Transaction, id=txn_id)
    order = txn.order

    if txn.gateway == 'stripe':
        payload = request.body
        sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
        endpoint_secret = settings.STRIPE_WEBHOOK_SECRET
        try:
            event = stripe.Webhook.construct_event(payload, sig_header, endpoint_secret)
        except Exception:
            txn.status = 'failed'
            txn.save()
            return render(request, 'payment/failed.html', {'txn': txn})
        if event['type'] == 'payment_intent.succeeded':
            txn.status = 'success'
            txn.raw_response = json.loads(payload.decode())
            txn.verified_at = timezone.now()
            txn.save()

    else:
        data = request.POST.dict()
        signature = data.pop('signature', '')
        secret = {
            'bkash': getattr(settings, 'BKASH_SECRET', ''),
            'nogod': getattr(settings, 'NOGOD_SECRET', ''),
            'sslcommerz': getattr(settings, 'SSLCOMMERZ_SECRET', '')
        }.get(txn.gateway, '')
        if secret:
            calculated = hmac.new(
                secret.encode(),
                "&".join(f"{k}={v}" for k, v in sorted(data.items())).encode(),
                hashlib.sha256
            ).hexdigest()
            if calculated != signature or float(data.get('amount', 0)) < float(txn.amount):
                txn.status = 'failed'
                txn.save()
                return render(request, 'payment/failed.html', {'txn': txn})
            txn.status = 'success'
            txn.raw_response = data
            txn.verified_at = timezone.now()
            txn.save()

    if txn.status == 'success':
        order.payment_status = 'paid'
        order.status = 'confirmed'
        order.save()
        try:
            from inventory.services import decrement_stock_for_order
            decrement_stock_for_order(order)
        except Exception:
            pass
        return render(request, 'payment/success.html', {'txn': txn})

    return render(request, 'payment/failed.html', {'txn': txn})
