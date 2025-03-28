# users/urls.py
from django.urls import path
from . import views

app_name = "users"

urlpatterns = [
    path('login/', views.phone_login, name='phone_login'),
    path('dashboard/', views.user_dashboard, name='dashboard'),
    path('settings/', views.user_settings, name='settings'),
    path('register/', views.register_user, name='register'),  # Маршрут для регистрации
]
