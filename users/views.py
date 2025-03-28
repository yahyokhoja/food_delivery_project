# users/views.py
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login
from django.http import HttpResponse
from .forms import UserSettingsForm, PhoneAuthenticationForm  # Импортируем PhoneAuthenticationForm
from .models import CustomUser
from .models import FoodItem
from .serializers import FoodItemSerializer
from rest_framework.response import Response
from rest_framework.views import APIView 
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import CustomUser
from .serializers import UserSerializer
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.contrib.auth import get_user_model

User = get_user_model()  # Получаем твою кастомную модель CustomUser

@api_view(["POST"])
def register_user(request):
    try:
        username = request.data.get("username")
        phone_number = request.data.get("phone_number")
        password = request.data.get("password")

        if not username or not phone_number or not password:
            return Response({"message": "Все поля обязательны"}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({"message": "Пользователь уже существует"}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, phone_number=phone_number, password=password)
        return Response({"message": "Регистрация успешна"}, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({"message": f"Ошибка сервера: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)







def phone_login(request):
    """
    Авторизация через номер телефона.
    """
    if request.method == 'POST':
        form = PhoneAuthenticationForm(request, data=request.POST)
        if form.is_valid():
            # Получаем номер телефона из формы
            phone_number = form.cleaned_data.get('phone_number')
            # Пробуем найти пользователя с этим номером телефона
            user = authenticate(request, phone_number=phone_number)
            if user is not None:
                login(request, user)
                return redirect('users:dashboard')  # Перенаправляем в личный кабинет
            else:
                return HttpResponse('Неверный номер телефона')
    else:
        form = PhoneAuthenticationForm()

    return render(request, 'users/login.html', {'form': form})

@login_required
def user_dashboard(request):
    """
    Личный кабинет пользователя, где отображаются его данные и история заказов.
    """
    user = request.user
    # Здесь можно добавить логику для отображения истории заказов, если такая есть
    return render(request, 'users/dashboard.html', {'user': user})

@login_required
def user_settings(request):
    """
    Страница настроек пользователя, где он может изменить свой профиль, например, номер телефона.
    """
    user = request.user
    if request.method == 'POST':
        form = UserSettingsForm(request.POST, instance=user)
        if form.is_valid():
            form.save()
            return redirect('users:dashboard')  # Перенаправляем обратно в личный кабинет
    else:
        form = UserSettingsForm(instance=user)

    return render(request, 'users/settings.html', {'form': form})


class FoodItemListView(APIView):
    def get(self, request):
        food_items = FoodItem.objects.all()
        serializer = FoodItemSerializer(food_items, many=True)
        return Response(serializer.data)
