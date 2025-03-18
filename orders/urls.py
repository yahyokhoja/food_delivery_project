from django.urls import path
from .views import DishListView  # Импортируем только DishListView

urlpatterns = [
    path('api/dishes/', DishListView.as_view(), name='dish-list'),
         # Убедитесь, что этот путь есть
]