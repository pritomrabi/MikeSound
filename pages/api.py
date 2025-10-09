from django.shortcuts import render
from django.core.mail import send_mail
from django.conf import settings
from .models import ContactMessage, FAQ, Footer
from .forms import ContactForm
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ContactMessageSerializer, FAQSerializer, FooterSerializer

# Web Views
def faqs(request):
    faqs_list = FAQ.objects.all()
    return render(request, 'pages/faqs.html', {'faqs': faqs_list})

def contact_us(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            ContactMessage.objects.create(**form.cleaned_data)
            send_mail(
                subject=form.cleaned_data['subject'],
                message=f"Name: {form.cleaned_data['name']}\nEmail: {form.cleaned_data['email']}\nPhone: {form.cleaned_data.get('phone','')}\n\nMessage:\n{form.cleaned_data['message']}",
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[settings.EMAIL_HOST_USER],
                fail_silently=False,
            )
            return render(request, 'pages/contact_form_success.html')
    else:
        form = ContactForm()
    return render(request, 'pages/contact_us.html', {'form': form})

# API Views
@api_view(['GET'])
def faqs_api(request):
    faqs_list = FAQ.objects.all()
    serializer = FAQSerializer(faqs_list, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def contact_us_api(request):
    serializer = ContactMessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        send_mail(
            subject=serializer.validated_data['subject'],
            message=f"Name: {serializer.validated_data['name']}\nEmail: {serializer.validated_data['email']}\nPhone: {serializer.validated_data.get('phone','')}\n\nMessage:\n{serializer.validated_data['message']}",
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[settings.EMAIL_HOST_USER],
            fail_silently=True,
        )
        return Response({'detail': 'Message sent successfully'})
    return Response(serializer.errors, status=400)

@api_view(['GET'])
def get_footer(request):
    footer = Footer.objects.first()
    serializer = FooterSerializer(footer)
    return Response(serializer.data)
