# users/auth_backends.py
from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.models import User
from .models import CustomUser

class PhoneAuthenticationBackend(BaseBackend):
    def authenticate(self, request, phone_number=None, password=None):
        try:
            user = CustomUser.objects.get(phone_number=phone_number)
            if user.check_password(password):
                return user
        except CustomUser.DoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            return CustomUser.objects.get(id=user_id)
        except CustomUser.DoesNotExist:
            return None
