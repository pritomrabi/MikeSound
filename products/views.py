from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse
from .models import Product, Slider, AdsBanner, ProductVariation
from django.db.models import Q
from django.contrib.auth.decorators import login_required


def product_list(request):
    query = request.GET.get('q', '')
    products = Product.objects.filter(status=True)

    if query:
        products = products.filter(
            Q(title__icontains=query) |
            Q(brand__name__icontains=query) |
            Q(model_number__icontains=query) |
            Q(body__icontains=query) |
            Q(sound__icontains=query) |
            Q(battery__icontains=query) |
            Q(power_type__icontains=query) |
            Q(connector_type__icontains=query)
        )

    products = products.select_related('brand').prefetch_related('images', 'variations')
    sliders = Slider.objects.filter(status=True)
    ads = AdsBanner.objects.filter(status=True)
    return render(request, 'products/product_list.html', {
        'products': products,
        'query': query,
        'sliders': sliders,
        'ads': ads
    })


def product_detail(request, product_id):
    product = get_object_or_404(
        Product.objects.prefetch_related('variations__color', 'images'),
        id=product_id,
        status=True
    )
    sliders = Slider.objects.filter(status=True)
    ads = AdsBanner.objects.filter(status=True)

    # Increment view count
    product.views_count += 1
    product.save(update_fields=['views_count'])

    # Build variations with auto discount logic
    variations = []
    out_of_stock = True
    for var in product.variations.all():
        # Get final price using Product method
        final_price = product.get_discounted_price(var)

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
            'sku': var.sku,
            'stock': var.stock,
            'price': float(var.price),
            'final_price': final_price,
            'discounted_price': final_price,
            'color_name': color_name,
            'color_hex': var.color.hex_code if var.color else None,
            'available': available,
            'message': message,
        })

    product_message = ''
    if not variations:
        product_message = 'This product has no variations'
    elif out_of_stock:
        product_message = 'All variations are out of stock'

    # JSON response
    if request.GET.get('format') == 'json':
        return JsonResponse({
            'product': {
                'id': product.id,
                'title': product.title,
                'description': product.description,
                'brand_name': product.brand.name if product.brand else None,
                'category_name': product.category.name if product.category else None,
                'subcategory_name': product.subcategory.name if product.subcategory else None,
                'discount': float(product.discount) if product.discount else 0,
                'images': [{'id': img.id, 'image': img.image.url} for img in product.images.all()],
                'variations': variations,
                'sold_count': product.sold_count,
                'views_count': product.views_count,
                'warranty_period': product.warranty_period,
                'model_number': product.model_number,
                'body': product.body,
                'sound': product.sound,
                'battery': product.battery,
                'power_type': product.power_type,
                'connector_type': product.connector_type,
                'wishlist_status': False,
                'product_message': product_message,
            },
            'sliders': [{'id': s.id, 'title': s.title, 'image': s.image.url} for s in sliders],
            'ads': [{'title': ad.title, 'subtitle': ad.subtitle, 'image': ad.image.url, 'link': ad.link} for ad in ads],
        })

    # Template response
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
    if product.users_wishlist.filter(id=request.user.id).exists():
        product.users_wishlist.remove(request.user)
        status = 'removed'
    else:
        product.users_wishlist.add(request.user)
        status = 'added'

    if request.GET.get('format') == 'json':
        return JsonResponse({'status': status, 'product_id': product.id})

    return redirect(request.META.get('HTTP_REFERER', '/'))
