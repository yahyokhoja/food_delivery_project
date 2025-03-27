# orders/models.py
from django.db import models
from django.contrib.auth.models import User
# orders/models.py
from django.db import models
from django.conf import settings  # Для доступа к AUTH_USER_MODEL
from users.models import FoodItem

class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    # другие поля модели Order





class Product(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='product_images/')
    description = models.TextField()

    def __str__(self):
        return self.name
    

class FoodItem(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    image = models.ImageField(upload_to="food_images/", null=True, blank=True)

    def __str__(self):
        return self.name    



