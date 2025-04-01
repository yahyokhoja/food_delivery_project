from django.contrib import admin

# Register your models here.
from .models import FoodItem
from .models import CustomUser  # Импортируйте вашу модель пользователя

class FoodItemAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'created_at']
    search_fields = ['name', 'description']
    list_filter = ['created_at']

# Зарегистрируйте модель пользователя

class CustomUserAdmin(admin.ModelAdmin):
    # Используйте 'phone_number' вместо 'username'
    list_display = ('phone_number', 'first_name', 'last_name', 'email', 'is_active', 'is_staff')

    # Добавьте фильтрацию и поиск по нужным полям
    search_fields = ('phone_number', 'email')
    list_filter = ('is_active', 'is_staff')

admin.site.register(CustomUser, CustomUserAdmin)


