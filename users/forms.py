# users/forms.py

from django import forms
from .models import CustomUser

class UserSettingsForm(forms.ModelForm):
    class Meta:
        model = CustomUser
        fields = ['phone_number', 'first_name', 'last_name']  # Добавьте нужные поля



class PhoneAuthenticationForm(forms.Form):
    phone_number = forms.CharField(max_length=15, label='Номер телефона')

    def clean_phone_number(self):
        phone_number = self.cleaned_data['phone_number']
        # Логика для валидации номера телефона
        return phone_number

