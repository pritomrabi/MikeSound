from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .models import AboutUs, TermsConditions, HelpCenter, FAQ, ContactMessage
from .serializers import AboutUsSerializer, TermsConditionsSerializer, HelpCenterSerializer, FAQSerializer, ContactMessageSerializer

# Static Pages (Public)
@api_view(['GET'])
def about_us_api(request):
    page = AboutUs.objects.first()
    serializer = AboutUsSerializer(page)
    return Response(serializer.data)

@api_view(['GET'])
def terms_conditions_api(request):
    page = TermsConditions.objects.first()
    serializer = TermsConditionsSerializer(page)
    return Response(serializer.data)

@api_view(['GET'])
def help_center_api(request):
    page = HelpCenter.objects.first()
    serializer = HelpCenterSerializer(page)
    return Response(serializer.data)

@api_view(['GET'])
def faqs_api(request):
    faqs_list = FAQ.objects.all()
    serializer = FAQSerializer(faqs_list, many=True)
    return Response(serializer.data)

# Contact Form (Public)
@api_view(['POST'])
def contact_us_api(request):
    serializer = ContactMessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        # Send email to admin
        from django.core.mail import send_mail
        from django.conf import settings
        send_mail(
            subject=serializer.validated_data['subject'],
            message=f"Name: {serializer.validated_data['name']}\nEmail: {serializer.validated_data['email']}\nPhone: {serializer.validated_data.get('phone','')}\n\nMessage:\n{serializer.validated_data['message']}",
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[settings.EMAIL_HOST_USER],
            fail_silently=True,
        )
        return Response({'detail':'Message sent successfully'})
    return Response(serializer.errors, status=400)
