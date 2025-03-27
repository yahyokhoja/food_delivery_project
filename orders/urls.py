from django.urls import path
from . import views  # Импортируем представления из views.py
from .views import FoodItemListView



urlpatterns = [
      path('', views.order_list, name='order_list'),  # Список заказов
    path('<int:id>/', views.order_detail, name='order_detail'),  # Детали заказа
    path('create/', views.create_order, name='create_order'),  # Создание заказа
     path("food-items/", FoodItemListView.as_view(), name="food-list"),
          path('<int:id>/', views.order_detail, name='order_detail'),  # Детали заказа

  path('create/', views.create_order, name='create_order'),
]