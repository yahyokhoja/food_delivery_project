from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUserManager(BaseUserManager):
    def create_user(self, phone_number, username=None, **extra_fields):
        # Убедитесь, что 'username' передается отдельно, если оно есть
        if username:
            extra_fields['username'] = username
        user = self.model(phone_number=phone_number, **extra_fields)
        user.set_password(extra_fields.get('password'))
        user.save(using=self._db)
        return user

   




class CustomUser(AbstractUser):
    username = models.CharField(max_length=150, unique=True, default='guest_user')  
    phone_number = models.CharField(max_length=15, unique=True)  

    objects = CustomUserManager()  # Добавляем менеджер



    

class FoodItem(models.Model):
    name = models.CharField(max_length=255)  # Название блюда
    description = models.TextField()  # Описание блюда
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Цена блюда
    image = models.ImageField(upload_to='food_images/', null=True, blank=True)  # Картинка блюда
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    






