
# users/urls.py
from django.urls import path
from .views import RegisterUserView  # Убедитесь, что импорт правильный
from . import views


app_name = 'users'


urlpatterns = [
    path('login/', views.phone_login, name='phone_login'),
    path('dashboard/', views.user_dashboard, name='dashboard'),
    path('settings/', views.user_settings, name='settings'),
    path('register/', RegisterUserView.as_view(), name='register'),  # Используем RegisterUserView
    # другие маршруты
]
