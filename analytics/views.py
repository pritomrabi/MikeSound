import json
import uuid
import requests
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.admin.views.decorators import staff_member_required
from django.shortcuts import render
from django.conf import settings
from .models import TrackingEvent, GAConfig, PixelConfig, CourierPing

@csrf_exempt
def track_pixel(request):
    if request.method != 'POST':
        return HttpResponse(status=204)
    try:
        payload = json.loads(request.body.decode('utf-8'))
    except Exception:
        payload = {}
    TrackingEvent.objects.create(
        event=payload.get('event','page_view'),
        user=request.user if request.user.is_authenticated else None,
        order_id=payload.get('order_id'),
        data=payload,
        source='client'
    )
    return JsonResponse({'ok': True})

@staff_member_required
def dashboard(request):
    recent = TrackingEvent.objects.order_by('-created_at')[:50]
    summary = {
        'total_events': TrackingEvent.objects.count(),
        'purchases': TrackingEvent.objects.filter(event='purchase').count(),
        'page_views': TrackingEvent.objects.filter(event='page_view').count(),
    }
    return render(request, 'analytics/dashboard.html', {'recent': recent, 'summary': summary})

@staff_member_required
def map_view(request):
    points = CourierPing.objects.order_by('-created_at')[:500]
    return render(request, 'analytics/map.html', {'points': points})

@csrf_exempt
def courier_ping(request):
    if request.method != 'POST':
        return JsonResponse({'ok': False}, status=405)
    data = json.loads(request.body.decode('utf-8'))
    CourierPing.objects.create(
        courier_name=data.get('courier_name','unknown'),
        lat=data['lat'],
        lng=data['lng'],
        note=data.get('note','')
    )
    return JsonResponse({'ok': True})

def ga4_send(event_name, params):
    cfg = GAConfig.objects.filter(enabled=True).first()
    if not cfg:
        return False
    url = f"https://www.google-analytics.com/mp/collect?measurement_id={cfg.measurement_id}&api_secret={cfg.api_secret}"
    payload = {
        'client_id': str(uuid.uuid4()),
        'events': [{'name': event_name, 'params': params}]
    }
    try:
        requests.post(url, json=payload, timeout=3)
        return True
    except Exception:
        return False

@csrf_exempt
def server_to_ga(request):
    if request.method != 'POST':
        return JsonResponse({'ok': False}, status=405)
    data = json.loads(request.body.decode('utf-8'))
    sent = ga4_send(data.get('event','page_view'), data.get('params', {}))
    return JsonResponse({'ok': sent})

