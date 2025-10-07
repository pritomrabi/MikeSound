from django import forms
from ckeditor.widgets import CKEditorWidget
from .models import Product

class ProductForm(forms.ModelForm):
    description = forms.CharField(widget=CKEditorWidget())
    class Meta:
        model = Product
        fields = '__all__'

