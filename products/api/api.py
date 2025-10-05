from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Q
from ..models import *
from ..serializers import *

@api_view(['GET'])
def product_list_api(request):
    query = request.GET.get('q', '')
    offer_type = request.GET.get('offer_type')
    products = Product.objects.filter(status=True)

    if offer_type:
        products = products.filter(offer_type=offer_type)

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

    products = products.select_related('brand', 'category', 'subcategory').prefetch_related('images', 'variations__color')
    serializer = ProductSerializer(products, many=True, context={'request': request})

    sliders = Slider.objects.filter(status=True)
    ads = AdsBanner.objects.filter(status=True)
    sliders_serializer = SliderSerializer(sliders, many=True, context={'request': request})
    ads_serializer = AdsBannerSerializer(ads, many=True, context={'request': request})

    return Response({
        'products': serializer.data,
        'sliders': sliders_serializer.data,
        'ads': ads_serializer.data
    })


@api_view(['GET'])
def product_detail_api(request, product_id):
    try:
        product = Product.objects.select_related('brand', 'category', 'subcategory') \
                                 .prefetch_related('images', 'variations__color') \
                                 .get(id=product_id, status=True)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=404)

    serializer = ProductSerializer(product, context={'request': request})

    sliders = Slider.objects.filter(status=True)
    ads = AdsBanner.objects.filter(status=True)
    sliders_serializer = SliderSerializer(sliders, many=True, context={'request': request})
    ads_serializer = AdsBannerSerializer(ads, many=True, context={'request': request})

    return Response({
        'product': serializer.data,
        'sliders': sliders_serializer.data,
        'ads': ads_serializer.data
    })



@api_view(['GET'])
def categories_with_count_api(request):
    categories = Category.objects.all()
    data = []
    for cat in categories:
        data.append({
            'id': cat.id,
            'name': cat.name,
            'slug': cat.slug,
            'product_count': cat.product_set.filter(status=True).count()
        })
    return Response(data)
