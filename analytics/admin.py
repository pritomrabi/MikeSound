# from django.contrib import admin
# from .models import TrackingEvent, PixelConfig, GAConfig, CourierPing

# @admin.register(TrackingEvent)
# class TrackingEventAdmin(admin.ModelAdmin):
#     list_display = ['event','user','order_id','created_at']
#     list_filter = ['event','created_at','source']
#     search_fields = ['order_id','user__username']

# @admin.register(PixelConfig)
# class PixelConfigAdmin(admin.ModelAdmin):
#     list_display = ['name','fb_pixel_id','enabled']

# @admin.register(GAConfig)
# class GAConfigAdmin(admin.ModelAdmin):
#     list_display = ['name','measurement_id','enabled']

# @admin.register(CourierPing)
# class CourierPingAdmin(admin.ModelAdmin):
#     list_display = ['courier_name','lat','lng','created_at']
#     list_filter = ['courier_name','created_at']

