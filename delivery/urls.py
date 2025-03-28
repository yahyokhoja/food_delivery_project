# delivery/urls.py
from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

def home(request):
    return HttpResponse("Добро пожаловать в Delivery!")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('orders/', include('orders.urls')),  # Путь к приложению orders
    path('', home, name='home'),  # Главная страница

    # Подключаем маршруты для пользователей (не API)
    path('users/', include('users.urls', namespace='users')),  # Обычные маршруты для пользователей

    # Подключаем маршруты для API пользователей
    path('api/', include('users.api_urls')),  # <-- Проверьте, что этот маршрут есть!


    # Подключаем маршруты для API заказов
    path('api/orders/', include('orders.urls')),  # Путь для API заказов

   
]

