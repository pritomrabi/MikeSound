from import_export import resources
from import_export.admin import ImportExportModelAdmin
from .models import *
from django.contrib import admin

class CityResource(resources.ModelResource):
    class Meta:
        model = City

class ZoneResource(resources.ModelResource):
    class Meta:
        model = Zone

class CourierResource(resources.ModelResource):
    class Meta:
        model = Courier
        fields = ('id', 'name', 'phone', 'is_active', 'zones')

class CourierAssignmentResource(resources.ModelResource):
    class Meta:
        model = CourierAssignment
        fields = ('id', 'order', 'courier', 'assigned_at', 'remarks')

@admin.register(City)
class CityAdmin(ImportExportModelAdmin):
    resource_class = CityResource
    list_display = ['name']

@admin.register(Zone)
class ZoneAdmin(ImportExportModelAdmin):
    resource_class = ZoneResource
    list_display = ['name', 'city']

@admin.register(Courier)
class CourierAdmin(ImportExportModelAdmin):
    resource_class = CourierResource
    list_display = ['name', 'phone', 'is_active']
    filter_horizontal = ['zones']

@admin.register(CourierAssignment)
class CourierAssignmentAdmin(ImportExportModelAdmin):
    resource_class = CourierAssignmentResource
    list_display = ['order', 'courier', 'assigned_at']
    search_fields = ['order__id', 'courier__name']
    list_filter = ['assigned_at', 'courier']
