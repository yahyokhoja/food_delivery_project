"""
URL configuration for delivery project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""


# delivery/urls.py
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from orders.views import FoodItemViewSet, OrderViewSet
from orders.views import FoodItemViewSet, OrderViewSet
from django.views.generic import TemplateView  # Импортируем шаблон для главной страницы

router = DefaultRouter()
router.register(r'food-items', FoodItemViewSet)
router.register(r'orders', OrderViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('', TemplateView.as_view(template_name='index.html')),  # Главная страница

]# delivery/urls.py




# Создаем маршруты для API
router = DefaultRouter()
router.register(r'food-items', FoodItemViewSet)
router.register(r'orders', OrderViewSet)


   
