# from django.contrib import admin
# from .models import Courier, OrderCourier
# import csv
# from django.http import HttpResponse
# from django.utils.html import format_html

# @admin.register(Courier)
# class CourierAdmin(admin.ModelAdmin):
#     list_display = ['name', 'phone', 'is_active']
#     actions = ['export_couriers']

#     def export_couriers(self, request, queryset):
#         response = HttpResponse(content_type='text/csv')
#         response['Content-Disposition'] = 'attachment; filename="couriers.csv"'
#         writer = csv.writer(response)
#         writer.writerow(['Name', 'Phone', 'Active'])
#         for c in queryset:
#             writer.writerow([c.name, c.phone, c.is_active])
#         return response
#     export_couriers.short_description = "Export selected couriers to CSV"

# @admin.register(OrderCourier)
# class OrderCourierAdmin(admin.ModelAdmin):
#     list_display = ['order', 'courier', 'status', 'assigned_at', 'delivered_at', 'auto_assigned', 'mark_delivered']
#     list_filter = ['status', 'assigned_at', 'courier']

#     def mark_delivered(self, obj):
#         if obj.status != 'delivered':
#             return format_html('<a class="button" href="/admin/courier/ordercourier/{}/deliver/">Deliver</a>', obj.id)
#         return "Delivered"
#     mark_delivered.short_description = "Mark Delivered"
