from django import forms
from .models import Review

class ReviewForm(forms.ModelForm):
    class Meta:
        model = Review
        fields = ['rating','comment']

    def clean_rating(self):
        r = self.cleaned_data.get('rating')
        if r is None or not (1 <= r <= 5):
            raise forms.ValidationError("Rating must be 1 to 5.")
        return r
