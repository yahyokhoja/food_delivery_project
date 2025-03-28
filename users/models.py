from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

from django.db import models



class CustomUserManager(BaseUserManager):
    """
    Менеджер для кастомной модели пользователя.
    """
    def create_user(self, phone_number, password=None, **extra_fields):
        """
        Создает и возвращает пользователя с номером телефона.
        """
        if not phone_number:
            raise ValueError('Пользователь должен иметь номер телефона')
        user = self.model(phone_number=phone_number, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, phone_number, password=None, **extra_fields):
        """
        Создает и возвращает суперпользователя с номером телефона.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(phone_number, password, **extra_fields)

from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    username = models.CharField(max_length=150, unique=True, default='guest_user')  # Устанавливаем значение по умолчанию
    phone_number = models.CharField(max_length=15, unique=True, null=False, blank=False)  # Исправленный отступ



    

class FoodItem(models.Model):
    name = models.CharField(max_length=255)  # Название блюда
    description = models.TextField()  # Описание блюда
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Цена блюда
    image = models.ImageField(upload_to='food_images/', null=True, blank=True)  # Картинка блюда
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    






