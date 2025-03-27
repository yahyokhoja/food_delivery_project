from django.contrib import admin

# Register your models here.
from .models import FoodItem

class FoodItemAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'created_at']
    search_fields = ['name', 'description']
    list_filter = ['created_at']

admin.site.register(FoodItem, FoodItemAdmin)