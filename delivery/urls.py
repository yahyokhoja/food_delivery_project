from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

def home(request):
    return HttpResponse("Добро пожаловать в Delivery!")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('orders/', include('orders.urls')),  # Путь к приложению orders
    path('', home, name='home'),  # Главная страница

    # Подключаем маршруты для пользователей
    path('users/', include('users.urls', namespace='users')),  # Обычные маршруты для пользователей

    # Подключаем API маршруты для пользователей с отдельным пространством имен
    path('api/', include('users.api_urls', namespace='users_api')),  # API для пользователей
    

]
