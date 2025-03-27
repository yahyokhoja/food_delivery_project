

# Сериализатор для модели Order
# orders/serializers.py
from rest_framework import serializers
from .models import Order  # Убедитесь, что импортируете модель правильно
from .models import FoodItem

class FoodItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodItem
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'user', 'dish', 'quantity', 'created_at']
