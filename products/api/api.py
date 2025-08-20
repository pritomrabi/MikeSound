# api/api.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Q
from ..models import Product, Slider, AdsBanner
from ..serializers import ProductSerializer, SliderSerializer, AdsBannerSerializer

@api_view(['GET'])
def product_list_api(request):
    query = request.GET.get('q', '')
    products = Product.objects.filter(status=True)
    if query:
        products = products.filter(
            Q(title__icontains=query) |
            Q(brand__name__icontains=query)
        )
    products = products.prefetch_related('images', 'variations', 'brand')
    serializer = ProductSerializer(products, many=True)

    sliders = Slider.objects.filter(status=True)
    ads = AdsBanner.objects.filter(status=True)
    sliders_serializer = SliderSerializer(sliders, many=True)
    ads_serializer = AdsBannerSerializer(ads, many=True)

    return Response({
        'products': serializer.data,
        'sliders': sliders_serializer.data,
        'ads': ads_serializer.data
    })

@api_view(['GET'])
def product_detail_api(request, product_id):
    try:
        product = Product.objects.prefetch_related('images', 'variations', 'brand').get(id=product_id, status=True)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=404)

    serializer = ProductSerializer(product)
    sliders = Slider.objects.filter(status=True)
    ads = AdsBanner.objects.filter(status=True)
    sliders_serializer = SliderSerializer(sliders, many=True)
    ads_serializer = AdsBannerSerializer(ads, many=True)

    return Response({
        'product': serializer.data,
        'sliders': sliders_serializer.data,
        'ads': ads_serializer.data
    })
