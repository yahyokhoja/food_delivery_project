from django.contrib.auth.backends import BaseBackend
from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist

class PhoneAuthenticationBackend(BaseBackend):
    def authenticate(self, request, phone_number=None, password=None):
        try:
            user = get_user_model().objects.get(phone_number=phone_number)
            if user.check_password(password):
                return user
        except ObjectDoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            return get_user_model().objects.get(pk=user_id)
        except ObjectDoesNotExist:
            return None
