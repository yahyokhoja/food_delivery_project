
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login
from django.http import HttpResponse
from .forms import UserSettingsForm, PhoneAuthenticationForm
from .models import CustomUser, FoodItem
from .serializers import CustomUserSerializer, FoodItemSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, viewsets
from rest_framework.decorators import api_view

from django.contrib.auth import get_user_model

# Получаем вашу кастомную модель пользователя
User = get_user_model()

# Регистрация нового пользователя
@api_view(["POST"])
def register_user(request):
    try:
        username = request.data.get("username")
        phone_number = request.data.get("phone_number")
        password = request.data.get("password")

        if not username or not phone_number or not password:
            return Response({"message": "Все поля обязательны"}, status=status.HTTP_400_BAD_REQUEST)

        # Проверка на существующего пользователя с таким номером телефона
        if User.objects.filter(phone_number=phone_number).exists():
            return Response({"message": "Пользователь с таким номером телефона уже существует"}, status=status.HTTP_400_BAD_REQUEST)

        # Проверка на существующего пользователя с таким именем
        if User.objects.filter(username=username).exists():
            return Response({"message": "Пользователь с таким именем уже существует"}, status=status.HTTP_400_BAD_REQUEST)

        # Создание нового пользователя
        user = User.objects.create_user(username=username, phone_number=phone_number, password=password)

        # Возвращаем сообщение и redirect_url для перенаправления в личный кабинет
        return Response({
            "message": "Пользователь успешно зарегистрирован",
            "redirect_url": "/account/dashboard/",  # URL для личного кабинета
            "user_id": user.id
        }, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({"message": f"Ошибка сервера: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Авторизация через номер телефона
def phone_login(request):
    if request.method == 'POST':
        form = PhoneAuthenticationForm(request, data=request.POST)
        if form.is_valid():
            phone_number = form.cleaned_data.get('phone_number')
            password = form.cleaned_data.get('password')

            # Используем кастомный бэкенд для аутентификации
            user = authenticate(
                request,
                phone_number=phone_number,
                password=password,
                backend='users.auth_backends.PhoneAuthenticationBackend'  # Указываем ваш кастомный бэкенд
            )
            
            if user is not None:
                login(request, user)
                return redirect('users:dashboard')  # Перенаправляем в личный кабинет
            else:
                return HttpResponse('Неверный номер телефона или пароль')
    else:
        form = PhoneAuthenticationForm()

    return render(request, 'users/login.html', {'form': form})

# Личный кабинет пользователя
@login_required
def user_dashboard(request):
    user = request.user
    return render(request, 'users/dashboard.html', {'user': user})

# Страница настроек пользователя
@login_required
def user_settings(request):
    user = request.user
    if request.method == 'POST':
        form = UserSettingsForm(request.POST, instance=user)
        if form.is_valid():
            form.save()
            return redirect('users:dashboard')  # Перенаправляем обратно в личный кабинет
    else:
        form = UserSettingsForm(instance=user)

    return render(request, 'users/settings.html', {'form': form})

# Список блюд
class FoodItemListView(APIView):
    def get(self, request):
        food_items = FoodItem.objects.all()
        serializer = FoodItemSerializer(food_items, many=True)
        return Response(serializer.data)

# Вьюсет для пользователей
class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer  # Используем правильный сериализатор
    permission_classes = [IsAuthenticated]  # Только авторизованные пользователи

