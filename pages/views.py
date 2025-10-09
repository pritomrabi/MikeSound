from django.shortcuts import render
from django.core.mail import send_mail
from django.conf import settings
from .models import *
from .forms import ContactForm



def faqs(request):
    faqs_list = FAQ.objects.all()
    return render(request, 'pages/faqs.html', {'faqs': faqs_list})

def contact_us(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            # Save to database
            ContactMessage.objects.create(**form.cleaned_data)
            # Send email to admin Gmail
            send_mail(
                subject=form.cleaned_data['subject'],
                message=f"Name: {form.cleaned_data['name']}\nEmail: {form.cleaned_data['email']}\nPhone: {form.cleaned_data.get('phone', '')}\n\nMessage:\n{form.cleaned_data['message']}",
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[settings.EMAIL_HOST_USER],
                fail_silently=False,
            )
            return render(request, 'pages/contact_form_success.html')
    else:
        form = ContactForm()
    return render(request, 'pages/contact_us.html', {'form': form})

