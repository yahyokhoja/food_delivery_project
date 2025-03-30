from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from .models import CustomUser
from rest_framework.decorators import api_view, permission_classes


class RegisterUserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        phone_number = request.data.get('phone_number')
        password = request.data.get('password')

        # Проверка, если пользователь с таким номером уже существует
        if CustomUser.objects.filter(phone_number=phone_number).exists():
            return Response({'detail': 'Пользователь с таким номером уже существует.'}, status=status.HTTP_400_BAD_REQUEST)

        # Создаем нового пользователя
        user = CustomUser.objects.create_user(phone_number=phone_number, password=password)
        
        # Генерация токенов
        refresh = RefreshToken.for_user(user)
        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'user': {
                'id': user.id,
                'phone_number': user.phone_number
            }
        }, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def phone_login(request):
    phone_number = request.data.get('phone_number')
    password = request.data.get('password')

    if not phone_number or not password:
        return Response({'detail': 'Введите номер телефона и пароль.'}, status=status.HTTP_400_BAD_REQUEST)

    user = CustomUser.objects.filter(phone_number=phone_number).first()
    if not user or not user.check_password(password):
        return Response({'detail': 'Неверные учетные данные.'}, status=status.HTTP_400_BAD_REQUEST)

    refresh = RefreshToken.for_user(user)
    return Response({
        'access': str(refresh.access_token),
        'refresh': str(refresh),
        'user': {
            'id': user.id,
            'phone_number': user.phone_number
        }
    }, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_dashboard(request):
    user = request.user
    return Response({
        'message': 'Добро пожаловать в личный кабинет!',
        'user': {
            'id': user.id,
            'phone_number': user.phone_number,
            'name': user.first_name
        }
    })


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def user_settings(request):
    if request.method == 'GET':
        return Response({'message': 'Настройки пользователя', 'settings': {}})
    
    elif request.method == 'POST':
        # Здесь можно обработать обновление настроек пользователя
        return Response({'message': 'Настройки обновлены!'})
    

@api_view(['POST'])
def register_user(request):
    phone_number = request.data.get('phone_number')
    password = request.data.get('password')

    # Проверка, если пользователь с таким номером уже существует
    if CustomUser.objects.filter(phone_number=phone_number).exists():
        return Response({'detail': 'Пользователь с таким номером уже существует.'}, status=status.HTTP_400_BAD_REQUEST)

    # Создаем нового пользователя
    user = CustomUser.objects.create_user(phone_number=phone_number, password=password)
    
    # Генерация токенов
    refresh = RefreshToken.for_user(user)
    return Response({
        'access': str(refresh.access_token),
        'refresh': str(refresh),
        'user': {
            'id': user.id,
            'phone_number': user.phone_number
        }
    }, status=status.HTTP_201_CREATED)   


# users/views.py
from rest_framework_simplejwt.views import TokenObtainPairView

# Создаем кастомизированный класс, если нужно добавить логику
class CustomTokenObtainPairView(TokenObtainPairView):
    # Вы можете здесь добавить свою логику
    pass


 


