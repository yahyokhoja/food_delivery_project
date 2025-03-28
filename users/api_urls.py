# users/api_urls.py

from django.urls import path,include
from djoser.views import UserViewSet
from rest_framework.authtoken.views import obtain_auth_token  # Для получения токена
from rest_framework.routers import DefaultRouter
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views
router = DefaultRouter()
router.register(r'users', UserViewSet)


urlpatterns = [
    path('register/', UserViewSet.as_view({'post': 'create'}), name='user-register'),
    path('login/', obtain_auth_token, name='login'),  # Логин
        # Путь для получения JWT токенов
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # Путь для обновления JWT токенов
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
     path('api/', include(router.urls)),
]


