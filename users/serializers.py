
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import FoodItem
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer





User = get_user_model()

# Сериализатор для создания пользователя
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['phone_number', 'password']  # Убираем 'username' и оставляем только 'phone_number' и 'password'
        extra_kwargs = {'password': {'write_only': True}}  # Убедимся, что пароль не будет сериализован в ответе

    def create(self, validated_data):
        # Создание пользователя с хешированием пароля
        user = User.objects.create_user(**validated_data)
        return user

    def to_representation(self, instance):
        """Отправляем URL для редиректа после регистрации"""
        response = super().to_representation(instance)
        response['redirect_url'] = '/account/dashboard/'  # URL личного кабинета
        return response


# Сериализатор для модели FoodItem (если она у вас есть)
class FoodItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodItem
        fields = ['id', 'name', 'description', 'price', 'image']


# Кастомный сериализатор для получения JWT токенов
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        # Получаем токен и добавляем дополнительную информацию
        token = super().get_token(user)
        token['phone_number'] = user.phone_number  # Вместо username используем phone_number
        return token
