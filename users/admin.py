from django.contrib import admin

# Register your models here.
from .models import FoodItem
from .models import CustomUser  # Импортируйте вашу модель пользователя

class FoodItemAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'created_at']
    search_fields = ['name', 'description']
    list_filter = ['created_at']

# Зарегистрируйте модель пользователя
@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'phone_number', 'email', 'is_staff', 'is_superuser', 'is_active')
    search_fields = ('username', 'phone_number', 'email')  # Добавьте поля для поиска
    list_filter = ('is_staff', 'is_superuser', 'is_active')  # Добавьте фильтрацию по этим полям



admin.site.register(FoodItem, FoodItemAdmin)