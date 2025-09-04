from django.contrib import admin
from .models import *

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ['id', 'order', 'gateway', 'amount', 'status', 'reference', 'verified_at', 'created_at']
    readonly_fields = ['created_at', 'verified_at', 'raw_response']
    list_filter = ['gateway', 'status']
    search_fields = ['order__id', 'reference', 'order__user__email']

admin.site.register(AccountEntry)
admin.site.register(Expense)
admin.site.register(SalaryEntry)
admin.site.register(PaymentNumber)

