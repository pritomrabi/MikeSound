from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import WholesaleCustomer, WholesaleCustomerLedger, Coupon
from .forms import CouponApplyForm

@login_required
def customer_profile(request):
    customer = get_object_or_404(WholesaleCustomer, user=request.user)
    ledger = WholesaleCustomerLedger.objects.filter(customer=customer)
    return render(request, 'customers/profile.html', {'customer': customer, 'ledger': ledger})

@login_required
def apply_coupon(request):
    if request.method == 'POST':
        form = CouponApplyForm(request.POST)
        if form.is_valid():
            code = form.cleaned_data['code']
            coupon = get_object_or_404(Coupon, code=code)
            if coupon.is_valid():
                request.session['coupon_id'] = coupon.id
                return redirect('checkout_view')
    else:
        form = CouponApplyForm()
    return render(request, 'customers/apply_coupon.html', {'form': form})
