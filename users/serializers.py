from djoser.serializers import UserSerializer
from users.models import User  # Убедись, что у тебя есть кастомная модель пользователя
from rest_framework import serializers

class CustomUserSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        model = User
        fields = "__all__"