from django.shortcuts import render
from django.contrib.admin.views.decorators import staff_member_required
from .models import OrderCourier, Courier

@staff_member_required
def courier_report(request):
    couriers = OrderCourier.objects.select_related('courier', 'order', 'order__address').prefetch_related('order__items', 'order__items__product').all()
    
    start_date = request.GET.get('start_date')
    end_date = request.GET.get('end_date')
    status = request.GET.get('status')
    courier_id = request.GET.get('courier')

    if start_date:
        couriers = couriers.filter(assigned_at__date__gte=start_date)
    if end_date:
        couriers = couriers.filter(assigned_at__date__lte=end_date)
    if status:
        couriers = couriers.filter(status=status)
    if courier_id:
        couriers = couriers.filter(courier_id=courier_id)

    all_couriers = Courier.objects.filter(is_active=True)

    return render(request, 'courier/report.html', {'couriers': couriers, 'all_couriers': all_couriers})
