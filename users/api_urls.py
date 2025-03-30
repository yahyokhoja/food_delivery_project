# users/api_urls.py
from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import CustomTokenObtainPairView

app_name = 'users_api'  # Уникальное пространство имен для API

urlpatterns = [
    path('register/', views.register_user, name='register_api'),

    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),  # Оставляем этот для стандартного токена
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path('custom-token/', CustomTokenObtainPairView.as_view(), name='custom_token_obtain_pair'),  # Изменили имя маршрута
]

