from django.shortcuts import render
from orders.models import Order, OrderItem
from django.contrib.auth.models import User
from django.db.models import Sum, Count, F
from django.contrib.admin.views.decorators import staff_member_required
from django.utils.dateparse import parse_date

# Sales Report
@staff_member_required
def sales_report_view(request):
    start_date = request.GET.get('start_date')
    end_date = request.GET.get('end_date')

    orders = Order.objects.filter(status='confirmed')
    if start_date:
        orders = orders.filter(created_at__date__gte=parse_date(start_date))
    if end_date:
        orders = orders.filter(created_at__date__lte=parse_date(end_date))

    total_sales = orders.aggregate(Sum('grand_total'))['grand_total__sum'] or 0
    total_orders = orders.count()

    return render(request, 'reports/sales_report.html', {
        'orders': orders,
        'total_sales': total_sales,
        'total_orders': total_orders
    })

# Staff Order Report
@staff_member_required
def staff_order_report_view(request):
    start_date = request.GET.get('start_date')
    end_date = request.GET.get('end_date')

    orders = Order.objects.filter(status='confirmed')
    if start_date:
        orders = orders.filter(created_at__date__gte=parse_date(start_date))
    if end_date:
        orders = orders.filter(created_at__date__lte=parse_date(end_date))

    staff_orders = orders.values('orderassignment__staff__id','orderassignment__staff__username') \
                         .annotate(order_count=Count('id'), sales=Sum('grand_total'))

    return render(request, 'reports/staff_order_report.html', {
        'staff_orders': staff_orders
    })

# Order Products Report
@staff_member_required
def order_products_report_view(request):
    start_date = request.GET.get('start_date')
    end_date = request.GET.get('end_date')

    items = OrderItem.objects.select_related('order', 'product', 'variation').filter(order__status='confirmed')
    if start_date:
        items = items.filter(order__created_at__date__gte=parse_date(start_date))
    if end_date:
        items = items.filter(order__created_at__date__lte=parse_date(end_date))

    product_summary = items.values('product__id','product__title','variation__size') \
                           .annotate(total_qty=Sum('quantity'), total_sales=Sum(F('quantity')*F('unit_price')))

    return render(request, 'reports/order_products_report.html', {
        'product_summary': product_summary
    })

# Dashboard
@staff_member_required
def dashboard_view(request):
    orders = Order.objects.filter(status='confirmed')
    recent_sales = orders.order_by('-created_at')[:10]
    total_sales = orders.aggregate(Sum('grand_total'))['grand_total__sum'] or 0
    total_orders = orders.count()

    return render(request, 'reports/dashboard.html', {
        'total_sales': total_sales,
        'total_orders': total_orders,
        'recent_sales': recent_sales
    })

