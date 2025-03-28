# users/serializers.py
from djoser.serializers import UserCreateSerializer  # Импортируем сериализатор для создания пользователя
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import FoodItem  # Импортируем модель FoodItem, если она у вас есть


from rest_framework import serializers
from .models import CustomUser

User = get_user_model()




class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['phone_number', 'username', 'password']
    
    def create(self, validated_data):
        username = validated_data.get('username')
        return CustomUser.objects.create_user(**validated_data)






class FoodItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodItem
        fields = ['id', 'name', 'description', 'price', 'image']



