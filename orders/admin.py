from django.contrib import admin

# Register your models here.
from .models import Product
from django.contrib import admin
from .models import Dish

@admin.register(Dish)
class DishAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'description')  # Поля, которые будут отображаться в списке
    search_fields = ('name', 'description')  # Поиск по этим полям
    list_filter = ('price',)  # Фильтрация по цене



class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'image')
    search_fields = ('name',)
    list_filter = ('price',)

# Правильная регистрация модели с классом администратора
admin.site.register(Product, ProductAdmin)