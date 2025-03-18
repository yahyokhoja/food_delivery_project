from rest_framework import serializers
from .models import Dish, FoodItem, Order

# Сериализатор для модели Dish
class DishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dish
        fields = '__all__'  # Или можно указать конкретные поля

# Сериализатор для модели FoodItem
class FoodItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodItem
        fields = ['id', 'name', 'price']  # Укажи нужные поля для FoodItem

# Сериализатор для модели Order
class OrderSerializer(serializers.ModelSerializer):
    food_items = FoodItemSerializer(many=True)  # Для отображения связанных food_items

    class Meta:
        model = Order
        fields = ['id', 'food_items', 'customer_name', 'delivery_address', 'status']