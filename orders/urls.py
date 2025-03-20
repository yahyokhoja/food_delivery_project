from django.urls import path,include
from .views import DishListView  # Импортируем только DishListView

urlpatterns = [
    path('api/dishes/', DishListView.as_view(), name='dish-list'),

path("api/auth/", include("djoser.urls")),
    path("api/auth/", include("djoser.urls.jwt")), 

         # Убедитесь, что этот путь есть
]