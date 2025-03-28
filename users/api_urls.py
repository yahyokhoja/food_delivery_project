# users/api_urls.py

from django.urls import path
from djoser.views import UserViewSet
from rest_framework.authtoken.views import obtain_auth_token  # Для получения токена

urlpatterns = [
    path('register/', UserViewSet.as_view({'post': 'create'}), name='user-register'),
    path('login/', obtain_auth_token, name='login'),  # Логин
]
