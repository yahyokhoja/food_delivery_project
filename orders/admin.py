# orders/admin.py
from django.contrib import admin
from .models import Product
from .models import FoodItem

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'image')  # Поля для отображения в списке
    search_fields = ('name',)  # Поиск по имени
    list_filter = ('price',)  # Фильтрация по цене

admin.site.register(Product, ProductAdmin)  # Регистрация модели Product

admin.site.register(FoodItem)


