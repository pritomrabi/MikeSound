from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse
from .models import Product, Slider, AdsBanner, ProductVariation
from django.db.models import Q
from django.contrib.auth.decorators import login_required

def product_list(request):
    query = request.GET.get('q', '')
    products = Product.objects.filter(status=True)
    if query:
        products = products.filter(Q(title__icontains=query) | Q(brand__name__icontains=query))
    products = products.prefetch_related('images', 'brand', 'variations')
    sliders = Slider.objects.filter(status=True)
    ads = AdsBanner.objects.filter(status=True)
    return render(request, 'products/product_list.html', {
        'products': products,
        'query': query,
        'sliders': sliders,
        'ads': ads
    })

def product_detail(request, product_id):
    product = get_object_or_404(Product.objects.prefetch_related('variations__color', 'images'), id=product_id, status=True)
    sliders = Slider.objects.filter(status=True)
    ads = AdsBanner.objects.filter(status=True)
    product.views_count += 1
    product.save(update_fields=['views_count'])
    variations = []
    out_of_stock = True
    for var in product.variations.all():
        price = product.get_discounted_price(var) if product.discount > 0 else var.price
        color_name = var.color.name if var.color else None
        available = var.stock > 0
        if available:
            out_of_stock = False
        message = ''
        if not available:
            message = 'Out of stock'
        elif color_name is None:
            message = 'Color not available'
        variations.append({
            'id': var.id,
            'size': var.size,
            'color': color_name,
            'price': price,
            'stock': var.stock,
            'available': available,
            'message': message
        })

    product_message = ''
    if not variations:
        product_message = 'This product has no variations'
    elif out_of_stock:
        product_message = 'All variations are out of stock'

    if request.GET.get('format') == 'json':
        # API response
        return JsonResponse({
            'product_id': product.id,
            'title': product.title,
            'variations': variations,
            'views_count': product.views_count,
            'sold_count': product.sold_count,
            'message': product_message
        })

    return render(request, 'products/product_detail.html', {
        'product': product,
        'sliders': sliders,
        'ads': ads,
        'variations': variations,
        'message': product_message
    })


@login_required
def add_to_wishlist(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    if request.user in product.users_wishlist.all():
        product.users_wishlist.remove(request.user)
        status = 'removed'
    else:
        product.users_wishlist.add(request.user)
        status = 'added'

    if request.GET.get('format') == 'json':
        return JsonResponse({'status': status, 'product_id': product.id})

    return redirect(request.META.get('HTTP_REFERER', '/'))
