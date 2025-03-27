# users/urls.py
from django.urls import path
from . import views
from .views import FoodItemListView

urlpatterns = [
   path('login/', views.phone_login, name='phone_login'),
    path('dashboard/', views.user_dashboard, name='dashboard'),
    path('settings/', views.user_settings, name='settings'),
    path('api/food-items/', FoodItemListView.as_view(), name='food-item-list'),
]
