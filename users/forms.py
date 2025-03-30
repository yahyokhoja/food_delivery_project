# users/forms.py
import re
from django import forms
from .models import CustomUser

class PhoneAuthenticationForm(forms.Form):
    phone_number = forms.CharField(max_length=15, label='Номер телефона')
    password = forms.CharField(widget=forms.PasswordInput, label='Пароль')

    def clean_phone_number(self):
        phone_number = self.cleaned_data['phone_number']
        
        # Пример валидации для номера телефона (проверка на код страны)
        # Допустим, для Таджикистана и России номера начинаются с +992 или +7
        if not re.match(r'^\+7\d{10}$', phone_number) and not re.match(r'^\+992\d{9}$', phone_number):
            raise forms.ValidationError('Неверный формат номера телефона. Используйте формат +7XXXXXXXXXX для России или +992XXXXXXXXX для Таджикистана.')
        
        return phone_number
    

class UserSettingsForm(forms.ModelForm):
    class Meta:
        model = CustomUser
        fields = ['phone_number', 'first_name', 'last_name']  # Указываем поля, которые можно редактировать
    
    def clean_phone_number(self):
        phone_number = self.cleaned_data['phone_number']
        # Логика для валидации номера телефона (например, можно добавить проверку формата)
        if len(phone_number) < 10:
            raise forms.ValidationError('Номер телефона слишком короткий.')
        return phone_number


