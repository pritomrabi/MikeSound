# inventory/api/api.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..models import *
from ..serializers import *

# Supplier APIs
@api_view(['GET'])
def supplier_list_api(request):
    suppliers = Supplier.objects.all()
    serializer = SupplierSerializer(suppliers, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def supplier_detail_api(request, supplier_id):
    try:
        supplier = Supplier.objects.get(id=supplier_id)
    except Supplier.DoesNotExist:
        return Response({'error': 'Supplier not found'}, status=404)
    serializer = SupplierSerializer(supplier)
    return Response(serializer.data)

# Inventory APIs
@api_view(['GET'])
def inventory_list_api(request):
    inventory = Inventory.objects.select_related('product').all()
    serializer = InventorySerializer(inventory, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def inventory_detail_api(request, inventory_id):
    try:
        inv = Inventory.objects.select_related('product').get(id=inventory_id)
    except Inventory.DoesNotExist:
        return Response({'error': 'Inventory not found'}, status=404)
    serializer = InventorySerializer(inv)
    return Response(serializer.data)

# Purchase APIs
@api_view(['GET'])
def purchase_list_api(request):
    purchases = Purchase.objects.prefetch_related('items', 'supplier').all()
    serializer = PurchaseSerializer(purchases, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def purchase_detail_api(request, purchase_id):
    try:
        purchase = Purchase.objects.prefetch_related('items', 'supplier').get(id=purchase_id)
    except Purchase.DoesNotExist:
        return Response({'error': 'Purchase not found'}, status=404)
    serializer = PurchaseSerializer(purchase)
    return Response(serializer.data)

# SupplierPayment APIs
@api_view(['GET'])
def payment_list_api(request):
    payments = SupplierPayment.objects.select_related('supplier').all()
    serializer = SupplierPaymentSerializer(payments, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def payment_detail_api(request, payment_id):
    try:
        payment = SupplierPayment.objects.select_related('supplier').get(id=payment_id)
    except SupplierPayment.DoesNotExist:
        return Response({'error': 'Payment not found'}, status=404)
    serializer = SupplierPaymentSerializer(payment)
    return Response(serializer.data)

# SupplierLedger APIs
@api_view(['GET'])
def ledger_list_api(request):
    ledger = SupplierLedger.objects.select_related('supplier', 'purchase', 'payment').all()
    serializer = SupplierLedgerSerializer(ledger, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def ledger_detail_api(request, ledger_id):
    try:
        entry = SupplierLedger.objects.select_related('supplier', 'purchase', 'payment').get(id=ledger_id)
    except SupplierLedger.DoesNotExist:
        return Response({'error': 'Ledger entry not found'}, status=404)
    serializer = SupplierLedgerSerializer(entry)
    return Response(serializer.data)
