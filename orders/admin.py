from django.contrib import admin

# Register your models here.

from django.contrib import admin
from .models import Dish

@admin.register(Dish)
class DishAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'description')  # Поля, которые будут отображаться в списке
    search_fields = ('name', 'description')  # Поиск по этим полям
    list_filter = ('price',)  # Фильтрация по цене

